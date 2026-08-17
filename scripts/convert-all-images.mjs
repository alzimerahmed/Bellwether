import { readdir, stat, writeFile, rm, rename, chmod } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = "public/assets";

// Per-directory resize/quality config
const DIR_CONFIG = {
  "hero": { width: 800, quality: 80 },
  "about": { width: 1200, quality: 75 },
  "avatars": { width: 200, quality: 72 },
  "contact": { width: 1200, quality: 75 },
  "menu": { width: 1200, quality: 75 },
  "flavors": { width: 800, quality: 75 },
  "bucket": { width: 800, quality: 75 },
  "pints": { width: 800, quality: 75 },
  "vl/merch": { width: 800, quality: 72 },
  "vl/pints": { width: 800, quality: 75 },
  "vl/seasonal": { width: 800, quality: 75 },
  "vl/shops": { width: 600, quality: 72 },
  "vl/story": { width: 1200, quality: 75 },
  "vl/events": { width: 1000, quality: 75 },
  "vl/party-packs": { width: 700, quality: 75 },
  "vl/banners": { width: 1600, quality: 75 },
  "vl/delivery": { width: 1200, quality: 75 },
  "vl/bars": { width: 600, quality: 75 },
};

const SIZE_THRESHOLD = 150 * 1024; // 150KB — re-compress anything larger

async function safeWrite(filePath, buffer) {
  const tmpPath = filePath + ".tmp";
  try {
    await writeFile(tmpPath, buffer);
    await rename(tmpPath, filePath);
  } catch (e) {
    try { await rm(tmpPath); } catch {}
    console.log(`  SKIP (locked): ${path.basename(filePath)}`);
  }
}

async function safeDelete(filePath) {
  try {
    await rm(filePath);
  } catch {
    console.log(`  SKIP DELETE (locked): ${path.basename(filePath)}`);
  }
}

async function processDir(dirRel) {
  const dirAbs = path.join(ROOT, dirRel);
  if (!existsSync(dirAbs)) return;

  const files = await readdir(dirAbs);
  const config = DIR_CONFIG[dirRel] || { width: 1200, quality: 75 };

  for (const file of files) {
    const filePath = path.join(dirAbs, file);
    const stats = await stat(filePath);

    if (stats.isDirectory()) continue;

    const isWebp = /\.webp$/i.test(file);
    const isRaster = /\.(png|jpe?g)$/i.test(file);

    if (!isWebp && !isRaster) continue;

    // Convert PNG/JPG to WebP
    if (isRaster) {
      const outPath = filePath.replace(/\.(png|jpe?g)$/i, ".webp");
      const buffer = await sharp(filePath)
        .resize({ width: config.width, withoutEnlargement: true })
        .webp({ quality: config.quality })
        .toBuffer();

      await safeWrite(outPath, buffer);
      const reduction = Math.round((1 - buffer.length / stats.size) * 100);
      console.log(`  CONVERT ${file} -> ${path.basename(outPath)}: ${(stats.size / 1024).toFixed(0)}KB -> ${(buffer.length / 1024).toFixed(0)}KB (-${reduction}%)`);

      // Delete original
      await safeDelete(filePath);
      continue;
    }

    // Compress oversized WebP
    if (isWebp && stats.size > SIZE_THRESHOLD) {
      const buffer = await sharp(filePath)
        .resize({ width: config.width, withoutEnlargement: true })
        .webp({ quality: config.quality })
        .toBuffer();

      if (buffer.length < stats.size) {
        await safeWrite(filePath, buffer);
        const reduction = Math.round((1 - buffer.length / stats.size) * 100);
        console.log(`  COMPRESS ${file}: ${(stats.size / 1024).toFixed(0)}KB -> ${(buffer.length / 1024).toFixed(0)}KB (-${reduction}%)`);
      }
    }
  }
}

async function walkDirs(dirRel) {
  const dirAbs = path.join(ROOT, dirRel);
  if (!existsSync(dirAbs)) return;

  // Process this directory if it has a config or contains images
  await processDir(dirRel);

  // Recurse into subdirectories
  const entries = await readdir(dirAbs, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory() && entry.name !== "_optimized") {
      await walkDirs(path.join(dirRel, entry.name));
    }
  }
}

async function main() {
  console.log("Converting and compressing all images to WebP...\n");

  // Process top-level dirs
  const topDirs = await readdir(ROOT, { withFileTypes: true });
  for (const entry of topDirs) {
    if (entry.isDirectory()) {
      await walkDirs(entry.name);
    } else if (entry.isFile()) {
      // Process files directly in ROOT
    }
  }

  // Also process files directly in ROOT
  await processDir("");

  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
