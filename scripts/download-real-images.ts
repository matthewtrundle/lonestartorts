#!/usr/bin/env npx ts-node
/**
 * Download Real Product Images from Texas Snax CDN
 * Replaces AI-generated images with actual product photos
 */

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_DIR = path.join(__dirname, '..', 'public', 'images', 'products');

// Verified Texas Snax CDN URLs (from browsing their site)
const realProductImages = [
  // That Green Sauce (original/medium)
  {
    filename: 'heb-green-sauce.webp',
    url: 'https://texassnax.com/cdn/shop/products/HEBRange_7_1024x.jpg',
    description: 'H-E-B That Green Sauce'
  },
  // Texas Shaped Chips
  {
    filename: 'heb-texas-chips.webp',
    url: 'https://texassnax.com/cdn/shop/products/HEBRange_5_1024x.jpg',
    description: 'H-E-B Texas Shaped Tortilla Chips'
  },
  // Terry Black's BBQ Sauce
  {
    filename: 'terry-blacks-bbq.webp',
    url: 'https://texassnax.com/cdn/shop/files/save_as_2024-06-28T15_58_32.738Z_1024x.png',
    description: 'Terry Black\'s BBQ Sauce'
  },
  // Lone Stars Cheddar Crackers
  {
    filename: 'heb-lone-stars.webp',
    url: 'https://texassnax.com/cdn/shop/files/PXL_2024-07-04T21_42_54.786Z_1024x.png',
    description: 'H-E-B Lone Stars Cheddar Crackers'
  },
  // H-E-B BBQ Sauce
  {
    filename: 'heb-texas-bbq-sauce.webp',
    url: 'https://texassnax.com/cdn/shop/products/TexasSnax_22_1024x.png',
    description: 'H-E-B Texas BBQ Sauce'
  },
];

async function downloadImage(url: string, filepath: string): Promise<boolean> {
  return new Promise((resolve) => {
    console.log(`\n📥 Downloading: ${url}`);

    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          console.log(`  ↪️  Redirecting...`);
          downloadImage(redirectUrl, filepath).then(resolve);
          return;
        }
      }

      if (response.statusCode !== 200) {
        console.log(`  ❌ Failed (${response.statusCode})`);
        fs.unlink(filepath, () => {});
        resolve(false);
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(filepath);
        console.log(`  ✅ Saved: ${filepath} (${Math.round(stats.size / 1024)}KB)`);
        resolve(true);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      console.error(`  ❌ Error: ${err.message}`);
      resolve(false);
    });
  });
}

async function main() {
  console.log('🚀 Downloading real product images from Texas Snax CDN\n');
  console.log(`📁 Output directory: ${PRODUCTS_DIR}\n`);

  if (!fs.existsSync(PRODUCTS_DIR)) {
    fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
  }

  let successCount = 0;
  let failCount = 0;

  for (const product of realProductImages) {
    const filepath = path.join(PRODUCTS_DIR, product.filename);
    console.log(`📦 ${product.description}`);

    const success = await downloadImage(product.url, filepath);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }

    // Rate limit
    await new Promise(r => setTimeout(r, 500));
  }

  console.log(`\n✨ Complete! Downloaded ${successCount}/${realProductImages.length} images`);
  if (failCount > 0) {
    console.log(`⚠️  ${failCount} images failed`);
  }
}

main().catch(console.error);
