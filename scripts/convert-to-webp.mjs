import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import path from 'path';

const IMAGES_DIR = path.resolve('public/images');
const QUALITY = 85;

async function findImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findImages(fullPath));
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  const images = await findImages(IMAGES_DIR);
  console.log(`Found ${images.length} JPG/PNG images to convert\n`);

  let converted = 0;
  let skipped = 0;

  for (const imgPath of images) {
    const ext = path.extname(imgPath);
    const webpPath = imgPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

    // Check if webp already exists
    try {
      await stat(webpPath);
      console.log(`  [skip] ${path.relative(IMAGES_DIR, webpPath)} already exists`);
      skipped++;
      continue;
    } catch {
      // doesn't exist, proceed
    }

    try {
      await sharp(imgPath)
        .webp({ quality: QUALITY })
        .toFile(webpPath);

      const origStat = await stat(imgPath);
      const webpStat = await stat(webpPath);
      const savings = ((1 - webpStat.size / origStat.size) * 100).toFixed(1);

      console.log(`  [ok] ${path.relative(IMAGES_DIR, imgPath)} -> .webp (${savings}% smaller)`);
      converted++;
    } catch (err) {
      console.error(`  [err] ${path.relative(IMAGES_DIR, imgPath)}: ${err.message}`);
    }
  }

  console.log(`\nDone: ${converted} converted, ${skipped} skipped`);
}

main().catch(console.error);
