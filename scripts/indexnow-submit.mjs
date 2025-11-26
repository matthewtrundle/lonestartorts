#!/usr/bin/env node
/**
 * IndexNow URL Submission Script
 *
 * Submits URLs to IndexNow API for instant indexing by:
 * - Bing
 * - Yandex
 * - Naver
 * - Seznam.cz
 *
 * Usage:
 *   node scripts/indexnow-submit.mjs <url1> [url2] [url3] ...
 *   node scripts/indexnow-submit.mjs https://lonestartortillas.com/guides/new-guide
 *
 * Submit all sitemap URLs:
 *   node scripts/indexnow-submit.mjs $(grep -o 'https://[^<]*' public/sitemap.xml)
 *
 * Environment Variables (in .env.local):
 *   INDEXNOW_KEY - Your 32-character IndexNow key
 *   SITE_HOST - Your domain (default: lonestartortillas.com)
 */

import { config } from 'dotenv';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// Load environment variables from .env.local (Next.js style)
const envLocalPath = resolve(process.cwd(), '.env.local');
const envPath = resolve(process.cwd(), '.env');

if (existsSync(envLocalPath)) {
  config({ path: envLocalPath });
} else if (existsSync(envPath)) {
  config({ path: envPath });
}

// Configuration
const CONFIG = {
  host: process.env.SITE_HOST || 'lonestartortillas.com',
  key: process.env.INDEXNOW_KEY,
  get keyLocation() {
    return `https://${this.host}/${this.key}.txt`;
  },
  endpoint: 'https://api.indexnow.org/indexnow',
  batchSize: 100,
};

/**
 * Validate configuration
 */
function validateConfig() {
  if (!CONFIG.key) {
    console.error('\n❌ Error: INDEXNOW_KEY not found in environment variables.\n');
    console.log('Setup required:');
    console.log('  1. Run: node scripts/generate-indexnow-key.mjs');
    console.log('  2. Add INDEXNOW_KEY to your .env.local file');
    console.log('  3. Create the key file in public/ directory\n');
    process.exit(1);
  }

  if (CONFIG.key.length !== 32 || !/^[a-f0-9]+$/i.test(CONFIG.key)) {
    console.error('\n❌ Error: INDEXNOW_KEY must be a 32-character hexadecimal string.\n');
    process.exit(1);
  }
}

/**
 * Submit a batch of URLs to IndexNow API
 * @param {string[]} urls - Array of URLs to submit
 * @returns {Promise<boolean>} - Success status
 */
async function submitBatch(urls) {
  const payload = {
    host: CONFIG.host,
    key: CONFIG.key,
    keyLocation: CONFIG.keyLocation,
    urlList: urls,
  };

  try {
    const response = await fetch(CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const status = response.status;

    if (status === 200 || status === 202) {
      console.log(`✅ Successfully submitted ${urls.length} URL(s) (Status: ${status})`);
      return true;
    } else if (status === 403) {
      console.error(`❌ Error 403: Key file not accessible at ${CONFIG.keyLocation}`);
      console.log('   Make sure the key file is deployed and accessible.');
      return false;
    } else if (status === 400) {
      const errorText = await response.text();
      console.error(`❌ Error 400: Bad request - ${errorText}`);
      return false;
    } else if (status === 422) {
      console.error('❌ Error 422: Invalid URL(s) in the request');
      return false;
    } else {
      const errorText = await response.text();
      console.error(`❌ Error ${status}: ${errorText}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Network error: ${error.message}`);
    return false;
  }
}

/**
 * Submit URLs in batches
 * @param {string[]} urls - Array of URLs to submit
 */
async function submitUrls(urls) {
  console.log(`\n📤 Submitting ${urls.length} URL(s) to IndexNow...\n`);
  console.log(`   Host: ${CONFIG.host}`);
  console.log(`   Key Location: ${CONFIG.keyLocation}\n`);

  let successCount = 0;
  let failCount = 0;

  // Process URLs in batches
  for (let i = 0; i < urls.length; i += CONFIG.batchSize) {
    const batch = urls.slice(i, i + CONFIG.batchSize);
    const batchNum = Math.floor(i / CONFIG.batchSize) + 1;
    const totalBatches = Math.ceil(urls.length / CONFIG.batchSize);

    if (totalBatches > 1) {
      console.log(`\n📦 Processing batch ${batchNum}/${totalBatches}...`);
    }

    const success = await submitBatch(batch);
    if (success) {
      successCount += batch.length;
    } else {
      failCount += batch.length;
    }

    // Rate limiting: wait 1 second between batches
    if (i + CONFIG.batchSize < urls.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Summary
  console.log('\n========================================');
  console.log('   IndexNow Submission Complete');
  console.log('========================================');
  console.log(`   Total URLs: ${urls.length}`);
  console.log(`   Successful: ${successCount}`);
  console.log(`   Failed: ${failCount}`);
  console.log('========================================\n');

  if (successCount > 0) {
    console.log('📊 Search engines notified:');
    console.log('   - Bing');
    console.log('   - Yandex');
    console.log('   - Naver');
    console.log('   - Seznam.cz\n');
    console.log('💡 Pages typically appear in search results within hours.\n');
  }
}

/**
 * Extract URLs from sitemap.xml
 * @param {string} sitemapPath - Path to sitemap.xml
 * @returns {string[]} - Array of URLs
 */
function extractFromSitemap(sitemapPath) {
  try {
    const content = readFileSync(sitemapPath, 'utf-8');
    const urlRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
    const urls = [];
    let match;

    while ((match = urlRegex.exec(content)) !== null) {
      urls.push(match[1]);
    }

    return urls;
  } catch (error) {
    console.error(`❌ Error reading sitemap: ${error.message}`);
    return [];
  }
}

/**
 * Main execution
 */
async function main() {
  // Validate configuration
  validateConfig();

  // Get URLs from command line arguments
  let urls = process.argv.slice(2);

  // Check for --sitemap flag
  const sitemapIndex = urls.indexOf('--sitemap');
  if (sitemapIndex !== -1) {
    const sitemapPath = urls[sitemapIndex + 1] || 'public/sitemap.xml';
    console.log(`📄 Reading URLs from sitemap: ${sitemapPath}`);
    urls = extractFromSitemap(sitemapPath);
  }

  // Check for --priority flag (submit priority URLs from JSON file)
  const priorityIndex = urls.indexOf('--priority');
  if (priorityIndex !== -1) {
    const priorityPath = urls[priorityIndex + 1] || 'scripts/indexnow-priority-urls.json';
    try {
      const content = readFileSync(priorityPath, 'utf-8');
      urls = JSON.parse(content);
      console.log(`📄 Reading URLs from priority file: ${priorityPath}`);
    } catch (error) {
      console.error(`❌ Error reading priority file: ${error.message}`);
      process.exit(1);
    }
  }

  if (urls.length === 0) {
    console.log('\n📝 IndexNow URL Submission Script\n');
    console.log('Usage:');
    console.log('  Submit specific URLs:');
    console.log('    node scripts/indexnow-submit.mjs <url1> [url2] [url3] ...\n');
    console.log('  Submit from sitemap:');
    console.log('    node scripts/indexnow-submit.mjs --sitemap [path/to/sitemap.xml]\n');
    console.log('  Submit priority URLs:');
    console.log('    node scripts/indexnow-submit.mjs --priority [path/to/urls.json]\n');
    console.log('Examples:');
    console.log('  node scripts/indexnow-submit.mjs https://lonestartortillas.com/guides/new-guide');
    console.log('  node scripts/indexnow-submit.mjs --sitemap public/sitemap.xml');
    console.log('  node scripts/indexnow-submit.mjs $(grep -o "https://[^<]*" public/sitemap.xml)\n');
    process.exit(0);
  }

  // Filter and validate URLs
  const validUrls = urls.filter(url => {
    try {
      new URL(url);
      return true;
    } catch {
      console.warn(`⚠️  Skipping invalid URL: ${url}`);
      return false;
    }
  });

  if (validUrls.length === 0) {
    console.error('\n❌ No valid URLs to submit.\n');
    process.exit(1);
  }

  // Submit URLs
  await submitUrls(validUrls);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
