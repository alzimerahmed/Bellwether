// Scrape all images from vanleeuwenicecream.com, download the highest-res
// versions available, and convert them to WebP using sharp.
//
// Usage: node scripts/scrape-images.mjs
//
// Output: downloaded-images/ (originals) + downloaded-images/webp/ (converted)

import { Buffer } from "node:buffer";
import { mkdir, writeFile, readdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = "https://vanleeuwenicecream.com";
const OUT_DIR = path.resolve("downloaded-images");
const ORIG_DIR = path.join(OUT_DIR, "originals");
const WEBP_DIR = path.join(OUT_DIR, "webp");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

// Pages to crawl (homepage + key sections that hold product/hero imagery).
const SEED_PATHS = [
  "/",
  "/product-category/van-leeuwen-ice-cream/classic-ice-cream/",
  "/product-category/van-leeuwen-ice-cream/van-leeuwen-vegan-ice-cream/",
  "/product-category/van-leeuwen-ice-cream/ice-cream-bars/",
  "/product-category/van-leeuwen-ice-cream/ice-cream-sandwiches/",
  "/product-category/merchandise/",
  "/our-story/",
  "/scoop-shops",
  "/events-and-party-packs/",
  "/events-and-party-packs/party-packs/",
  "/local-delivery/",
  "/jobs/",
  "/say-hello/",
  "/faqs/",
];

const seenUrls = new Set();
const imageUrls = new Set();
const visitedPages = new Set();

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "text/html,*/*" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

async function fetchBuffer(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "*/*" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

function absUrl(u, base) {
  try {
    return new URL(u, base).href;
  } catch {
    return null;
  }
}

// WordPress typically appends size suffixes like -1024x768.jpg. Stripping
// them yields the full-resolution original upload.
function stripWpSize(url) {
  return url.replace(/-\d+x\d+(?=\.\w+$)/, "");
}

// Extract every image reference we can find in a chunk of HTML.
function extractImages(html, baseUrl) {
  const found = [];

  // <img src> and data-src / data-lazy-src
  const imgRe = /<img\b[^>]*>/gi;
  for (const m of html.matchAll(imgRe)) {
    const tag = m[0];
    for (const attr of [
      "src",
      "data-src",
      "data-lazy-src",
      "data-original",
      "data-bg",
    ]) {
      const re = new RegExp(`${attr}=["']([^"']+)["']`, "i");
      const am = tag.match(re);
      if (am) found.push(am[1]);
    }
    // srcset: pick the widest descriptor
    const srcsetM = tag.match(/srcset=["']([^"']+)["']/i);
    if (srcsetM) {
      const candidates = srcsetM[1]
        .split(",")
        .map((c) => c.trim().split(/\s+/))
        .filter((p) => p[0])
        .map((p) => ({ url: p[0], w: parseInt((p[1] || "0w").replace("w", ""), 10) || 0 }));
      candidates.sort((a, b) => b.w - a.w);
      if (candidates[0]) found.push(candidates[0].url);
    }
  }

  // <source srcset> inside <picture>
  const sourceRe = /<source\b[^>]*srcset=["']([^"']+)["'][^>]*>/gi;
  for (const m of html.matchAll(sourceRe)) {
    const candidates = m[1]
      .split(",")
      .map((c) => c.trim().split(/\s+/))
      .filter((p) => p[0])
      .map((p) => ({ url: p[0], w: parseInt((p[1] || "0w").replace("w", ""), 10) || 0 }));
    candidates.sort((a, b) => b.w - a.w);
    if (candidates[0]) found.push(candidates[0].url);
  }

  // Open Graph / Twitter meta images
  const ogRe = /<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]+content=["']([^"']+)["']/gi;
  for (const m of html.matchAll(ogRe)) found.push(m[1]);

  // CSS background-image: url(...)
  const bgRe = /background-image:\s*url\((['"]?)([^'")]+)\1\)/gi;
  for (const m of html.matchAll(bgRe)) found.push(m[2]);

  // Inline style attributes with url()
  const styleRe = /style=["'][^"']*url\((['"]?)([^'")]+)\1\)[^"']*["']/gi;
  for (const m of html.matchAll(styleRe)) found.push(m[2]);

  const result = [];
  for (const u of found) {
    const full = absUrl(u, baseUrl);
    if (!full) continue;
    // Only keep raster image extensions (and let everything else through if it
    // looks like an image path). Skip svg sprites / data URIs / trackers.
    if (full.startsWith("data:")) continue;
    if (/\.(png|jpe?g|webp|gif|avif)(\?|$)/i.test(full)) {
      result.push(stripWpSize(full));
    }
  }
  return result;
}

// Extract same-origin links to crawl further (bounded).
function extractLinks(html, baseUrl) {
  const linkRe = /href=["']([^"']+)["']/gi;
  const links = [];
  for (const m of html.matchAll(linkRe)) {
    const full = absUrl(m[1], baseUrl);
    if (!full) continue;
    if (full.startsWith(ROOT) && !visitedPages.has(full)) {
      links.push(full);
    }
  }
  return [...new Set(links)];
}

function urlToFilename(url) {
  const u = new URL(url);
  const base = path.basename(u.pathname).replace(/\.[^.]+$/, ""); // strip ext
  const ext = path.extname(u.pathname).toLowerCase() || ".jpg";
  const safe = (base || "image").replace(/[^\w.-]+/g, "_").slice(0, 120);
  return `${safe}${ext}`;
}

async function crawl() {
  for (const p of SEED_PATHS) {
    const url = absUrl(p, ROOT);
    if (!url || visitedPages.has(url)) continue;
    visitedPages.add(url);
    try {
      console.log(`Crawling ${url}`);
      const html = await fetchText(url);
      for (const img of extractImages(html, url)) imageUrls.add(img);
      // One level deeper: follow same-origin product/links for more imagery
      const links = extractLinks(html, url).slice(0, 40);
      for (const link of links) {
        if (visitedPages.has(link)) continue;
        visitedPages.add(link);
        try {
          const sub = await fetchText(link);
          for (const img of extractImages(sub, link)) imageUrls.add(img);
        } catch (e) {
          console.warn(`  skip ${link}: ${e.message}`);
        }
      }
    } catch (e) {
      console.warn(`  FAILED ${url}: ${e.message}`);
    }
  }
}

async function downloadAll() {
  await mkdir(ORIG_DIR, { recursive: true });
  const urls = [...imageUrls];
  console.log(`\nDownloading ${urls.length} unique images...`);
  let i = 0;
  for (const url of urls) {
    i++;
    const fname = urlToFilename(url);
    const dest = path.join(ORIG_DIR, fname);
    if (existsSync(dest)) {
      console.log(`  [${i}/${urls.length}] cached ${fname}`);
      continue;
    }
    try {
      const buf = await fetchBuffer(url);
      // Skip tiny placeholder / 1x1 tracking gifs
      if (buf.length < 1024) {
        console.warn(`  [${i}/${urls.length}] too small, skip ${fname}`);
        continue;
      }
      await writeFile(dest, buf);
      console.log(`  [${i}/${urls.length}] ${fname} (${(buf.length / 1024).toFixed(0)} KB)`);
    } catch (e) {
      console.warn(`  [${i}/${urls.length}] FAILED ${url}: ${e.message}`);
    }
  }
}

async function convertAll() {
  await mkdir(WEBP_DIR, { recursive: true });
  const files = (await readdir(ORIG_DIR)).filter((f) =>
    /\.(png|jpe?g|webp|gif|avif)$/i.test(f)
  );
  console.log(`\nConverting ${files.length} images to WebP...`);
  let i = 0;
  for (const f of files) {
    i++;
    const src = path.join(ORIG_DIR, f);
    const out = path.join(WEBP_DIR, f.replace(/\.[^.]+$/, ".webp"));
    try {
      const meta = await sharp(src).metadata();
      // Preserve original resolution. sharp keeps dimensions by default.
      await sharp(src)
        .webp({ quality: 90, effort: 4 })
        .toFile(out);
      console.log(
        `  [${i}/${files.length}] ${f} -> ${path.basename(out)} (${meta.width}x${meta.height})`
      );
    } catch (e) {
      console.warn(`  [${i}/${files.length}] convert FAILED ${f}: ${e.message}`);
    }
  }
}

async function main() {
  if (existsSync(OUT_DIR)) {
    console.log(`Cleaning previous ${OUT_DIR}...`);
    await rm(OUT_DIR, { recursive: true, force: true });
  }
  await mkdir(ORIG_DIR, { recursive: true });
  await mkdir(WEBP_DIR, { recursive: true });

  await crawl();
  console.log(`\nFound ${imageUrls.size} unique image URLs`);
  await downloadAll();
  await convertAll();
  console.log("\nDone. Output:");
  console.log(`  Originals: ${ORIG_DIR}`);
  console.log(`  WebP:      ${WEBP_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
