/**
 * Comprehensive Image Optimization Script
 * Converts PNG and JPG images to WebP format across all directories
 * Run: node scripts/optimize-all-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const QUALITY = 80;
const PUBLIC_DIR = path.join(__dirname, '../public/images');

// Directories to process
const DIRECTORIES = [
  '', // root images folder
  'restaurants',
  'campaigns',
  'Cards',
  'shop',
];

// Files/patterns to skip (already optimized or shouldn't be converted)
const SKIP_PATTERNS = [
  /\.webp$/i,
  /favicon/i,
  /og-image/i,
];

async function getImageFiles(dir) {
  const fullPath = path.join(PUBLIC_DIR, dir);

  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const files = fs.readdirSync(fullPath);
  return files.filter(f => {
    const ext = path.extname(f).toLowerCase();
    const isImage = ['.png', '.jpg', '.jpeg'].includes(ext);
    const shouldSkip = SKIP_PATTERNS.some(pattern => pattern.test(f));
    return isImage && !shouldSkip;
  }).map(f => ({
    name: f,
    dir: dir,
    inputPath: path.join(fullPath, f),
    outputPath: path.join(fullPath, f.replace(/\.(png|jpg|jpeg)$/i, '.webp')),
  }));
}

async function optimizeImage(file) {
  try {
    const originalStats = fs.statSync(file.inputPath);

    await sharp(file.inputPath)
      .webp({ quality: QUALITY })
      .toFile(file.outputPath);

    const newStats = fs.statSync(file.outputPath);
    const savings = ((1 - newStats.size / originalStats.size) * 100).toFixed(1);
    const originalMB = (originalStats.size / 1024 / 1024).toFixed(2);
    const newKB = (newStats.size / 1024).toFixed(0);

    return {
      success: true,
      file: file.name,
      dir: file.dir || 'root',
      originalSize: originalStats.size,
      newSize: newStats.size,
      savings,
      message: `${originalMB}MB -> ${newKB}KB (${savings}% smaller)`
    };
  } catch (err) {
    return {
      success: false,
      file: file.name,
      dir: file.dir || 'root',
      error: err.message
    };
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('COMPREHENSIVE IMAGE OPTIMIZATION');
  console.log('='.repeat(60));
  console.log('');

  let totalOriginalSize = 0;
  let totalNewSize = 0;
  let totalFiles = 0;
  let successCount = 0;
  const results = [];

  for (const dir of DIRECTORIES) {
    const files = await getImageFiles(dir);

    if (files.length === 0) continue;

    const dirName = dir || 'root';
    console.log(`\n[${dirName}] Found ${files.length} images to convert:`);
    console.log('-'.repeat(50));

    for (const file of files) {
      const result = await optimizeImage(file);
      results.push(result);
      totalFiles++;

      if (result.success) {
        successCount++;
        totalOriginalSize += result.originalSize;
        totalNewSize += result.newSize;
        console.log(`  ✓ ${result.file}`);
        console.log(`    ${result.message}`);
      } else {
        console.log(`  ✗ ${result.file}: ${result.error}`);
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Files processed: ${totalFiles}`);
  console.log(`Successful: ${successCount}`);
  console.log(`Failed: ${totalFiles - successCount}`);
  console.log(`\nTotal original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Total new size: ${(totalNewSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Overall savings: ${((1 - totalNewSize / totalOriginalSize) * 100).toFixed(1)}%`);
  console.log(`Space saved: ${((totalOriginalSize - totalNewSize) / 1024 / 1024).toFixed(2)}MB`);

  console.log('\n' + '='.repeat(60));
  console.log('NEXT STEPS');
  console.log('='.repeat(60));
  console.log('1. Update any hardcoded image paths from .png/.jpg to .webp');
  console.log('2. Test the site to verify images load correctly');
  console.log('3. Delete original files after verification:');
  console.log('   find public/images -name "*.png" -o -name "*.jpg" | xargs rm');
  console.log('');
}

main().catch(console.error);
