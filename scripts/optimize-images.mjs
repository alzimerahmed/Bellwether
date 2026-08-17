import { readdir, stat, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DIRS = [
  { dir: "public/assets/vl/merch", width: 800, quality: 72 },
  { dir: "public/assets/vl/pints", width: 800, quality: 75 },
  { dir: "public/assets/vl/seasonal", width: 800, quality: 75 },
  { dir: "public/assets/vl/shops", width: 600, quality: 72 },
  { dir: "public/assets/vl/story", width: 1200, quality: 75 },
  { dir: "public/assets/vl/events", width: 1000, quality: 75 },
  { dir: "public/assets/vl/party-packs", width: 700, quality: 75 },
  { dir: "public/assets/vl/banners", width: 1600, quality: 75 },
  { dir: "public/assets/vl/delivery", width: 1200, quality: 75 },
  { dir: "public/assets/vl/bars", width: 600, quality: 75 },
];

const SIZE_THRESHOLD = 200 * 1024;

async function optimizeDir({ dir, width, quality }) {
  if (!existsSync(dir)) return;

  const files = (await readdir(dir)).filter((f) => /\.webp$/i.test(f));
  let optimized = 0;
  let skipped = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = await stat(filePath);

    if (stats.size <= SIZE_THRESHOLD) {
      skipped++;
      continue;
    }

    const buffer = await sharp(filePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();

    if (buffer.length < stats.size) {
      const outDir = path.join(dir, "_optimized");
      if (!existsSync(outDir)) await mkdir(outDir, { recursive: true });
      await writeFile(path.join(outDir, file), buffer);
      const reduction = Math.round((1 - buffer.length / stats.size) * 100);
      console.log(`  ${file}: ${(stats.size / 1024).toFixed(0)}KB -> ${(buffer.length / 1024).toFixed(0)}KB (-${reduction}%)`);
      optimized++;
    } else {
      skipped++;
    }
  }

  console.log(`  ${dir}: ${optimized} optimized, ${skipped} skipped`);
}

async function main() {
  console.log("Optimizing images...\n");
  for (const config of DIRS) {
    console.log(`\nProcessing ${config.dir} (max ${config.width}px, q${config.quality})`);
    await optimizeDir(config);
  }
  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

