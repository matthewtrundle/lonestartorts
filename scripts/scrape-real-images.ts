#!/usr/bin/env npx ts-node
/**
 * Scrape Real Product Images from Texas Snax
 * Downloads actual H-E-B product photos instead of AI-generated ones
 */

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'images', 'products');

// Texas Snax CDN URLs for real H-E-B products
// These are actual product images from their catalog
const realProductImages: { filename: string; url: string; description: string }[] = [
  // That Green Sauce varieties
  {
    filename: 'heb-green-sauce-mild.webp',
    url: 'https://texassnax.com/cdn/shop/products/HEBThatGreenSauceMild_1024x.jpg',
    description: 'H-E-B That Green Sauce - Mild'
  },
  {
    filename: 'heb-green-sauce.webp',
    url: 'https://texassnax.com/cdn/shop/products/HEBThatGreenSauce_1024x.jpg',
    description: 'H-E-B That Green Sauce - Original'
  },
  // Salsas
  {
    filename: 'heb-salsa-habanero.webp',
    url: 'https://texassnax.com/cdn/shop/products/HEBHabaneroSalsa_1024x.jpg',
    description: 'H-E-B Habanero Salsa'
  },
  // Chips
  {
    filename: 'heb-texas-chips.webp',
    url: 'https://texassnax.com/cdn/shop/products/HEBTexasChips_1024x.jpg',
    description: 'H-E-B Texas Shaped Tortilla Chips'
  },
  {
    filename: 'heb-jalapeno-chips.webp',
    url: 'https://texassnax.com/cdn/shop/products/HEBJalapenoChips_1024x.jpg',
    description: 'H-E-B Jalapeño Chips'
  },
  // BBQ & Seasonings
  {
    filename: 'heb-brisket-rub.webp',
    url: 'https://texassnax.com/cdn/shop/products/HEBBrisketRub_1024x.jpg',
    description: 'H-E-B Brisket Rub'
  },
  {
    filename: 'heb-texas-bbq-sauce.webp',
    url: 'https://texassnax.com/cdn/shop/products/HEBTexasBBQSauce_1024x.jpg',
    description: 'H-E-B Texas BBQ Sauce'
  },
  // Terry Blacks
  {
    filename: 'terry-blacks-bbq.webp',
    url: 'https://texassnax.com/cdn/shop/products/TerryBlacksBBQSauce_1024x.jpg',
    description: 'Terry Blacks BBQ Sauce'
  },
  // Snacks
  {
    filename: 'heb-lone-stars.webp',
    url: 'https://texassnax.com/cdn/shop/products/HEBLoneStars_1024x.jpg',
    description: 'H-E-B Lone Stars Cheddar Crackers'
  },
  {
    filename: 'heb-pica-puffs.webp',
    url: 'https://texassnax.com/cdn/shop/products/HEBPicaPuffs_1024x.jpg',
    description: 'H-E-B Pica Puffs'
  }
];

async function downloadImage(url: string, filepath: string): Promise<boolean> {
  return new Promise((resolve) => {
    console.log(`📥 Downloading: ${url}`);

    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          console.log(`↪️  Redirecting to: ${redirectUrl}`);
          downloadImage(redirectUrl, filepath).then(resolve);
          return;
        }
      }

      if (response.statusCode !== 200) {
        console.log(`❌ Failed (${response.statusCode}): ${url}`);
        fs.unlink(filepath, () => {});
        resolve(false);
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(filepath);
        console.log(`✅ Downloaded: ${filepath} (${Math.round(stats.size / 1024)}KB)`);
        resolve(true);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      console.error(`❌ Error: ${err.message}`);
      resolve(false);
    });
  });
}

async function searchTexasSnax(productName: string): Promise<string | null> {
  // Search Texas Snax for a product and return image URL
  const searchUrl = `https://texassnax.com/search?q=${encodeURIComponent(productName)}`;
  console.log(`🔍 Searching: ${searchUrl}`);

  return new Promise((resolve) => {
    https.get(searchUrl, (response) => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        // Extract CDN image URL from response
        const cdnMatch = data.match(/https:\/\/texassnax\.com\/cdn\/shop\/products\/[^"'\s]+/);
        if (cdnMatch) {
          resolve(cdnMatch[0]);
        } else {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function main() {
  console.log('🚀 Scraping real product images from Texas Snax\n');
  console.log(`📁 Output directory: ${PUBLIC_DIR}\n`);

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  let successCount = 0;
  let failCount = 0;

  for (const product of realProductImages) {
    const filepath = path.join(PUBLIC_DIR, product.filename);

    console.log(`\n📦 ${product.description}`);

    const success = await downloadImage(product.url, filepath);
    if (success) {
      successCount++;
    } else {
      failCount++;
      // Try alternate URL patterns
      const altUrls = [
        product.url.replace('_1024x', ''),
        product.url.replace('_1024x.jpg', '.jpg'),
        product.url.replace('.jpg', '.png'),
      ];

      for (const altUrl of altUrls) {
        console.log(`🔄 Trying alternate: ${altUrl}`);
        if (await downloadImage(altUrl, filepath)) {
          successCount++;
          failCount--;
          break;
        }
      }
    }

    // Rate limit
    await new Promise(r => setTimeout(r, 500));
  }

  console.log(`\n✨ Complete! Downloaded ${successCount}/${realProductImages.length} images`);
  if (failCount > 0) {
    console.log(`⚠️  ${failCount} images failed - may need manual download`);
  }
}

main().catch(console.error);
