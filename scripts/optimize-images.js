/**
 * Image Optimization Script
 * Converts PNG product images to WebP format with 80% quality
 * Run: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images/products');
const QUALITY = 80;

async function optimizeImages() {
  console.log('Starting image optimization...\n');

  const files = fs.readdirSync(IMAGES_DIR);
  const pngFiles = files.filter(f => f.toLowerCase().endsWith('.png'));

  if (pngFiles.length === 0) {
    console.log('No PNG files found to optimize.');
    return;
  }

  console.log(`Found ${pngFiles.length} PNG files to convert:\n`);

  let totalOriginalSize = 0;
  let totalNewSize = 0;

  for (const file of pngFiles) {
    const inputPath = path.join(IMAGES_DIR, file);
    const outputName = file.replace(/\.png$/i, '.webp');
    const outputPath = path.join(IMAGES_DIR, outputName);

    try {
      const originalStats = fs.statSync(inputPath);
      totalOriginalSize += originalStats.size;

      await sharp(inputPath)
        .webp({ quality: QUALITY })
        .toFile(outputPath);

      const newStats = fs.statSync(outputPath);
      totalNewSize += newStats.size;

      const savings = ((1 - newStats.size / originalStats.size) * 100).toFixed(1);
      const originalMB = (originalStats.size / 1024 / 1024).toFixed(2);
      const newKB = (newStats.size / 1024).toFixed(0);

      console.log(`  ${file}`);
      console.log(`    ${originalMB}MB -> ${newKB}KB (${savings}% smaller)`);
    } catch (err) {
      console.error(`  Error converting ${file}:`, err.message);
    }
  }

  console.log('\n----------------------------------------');
  console.log(`Total original: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Total converted: ${(totalNewSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Overall savings: ${((1 - totalNewSize / totalOriginalSize) * 100).toFixed(1)}%`);
  console.log('\nConversion complete!');
  console.log('\nNext steps:');
  console.log('1. Update lib/products.ts to use .webp extensions');
  console.log('2. Test the site to verify images load correctly');
  console.log('3. Delete original .png files after verification');
}

optimizeImages().catch(console.error);
