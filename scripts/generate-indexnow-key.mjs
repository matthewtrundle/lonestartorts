#!/usr/bin/env node
/**
 * IndexNow Key Generator
 *
 * Generates a secure 32-character hexadecimal key for IndexNow authentication.
 * Run this once when setting up IndexNow for your site.
 *
 * Usage: node scripts/generate-indexnow-key.mjs
 */

import crypto from 'crypto';

// Generate a secure 32-character hexadecimal key
const key = crypto.randomBytes(16).toString('hex');

console.log('\n========================================');
console.log('   IndexNow Key Generated Successfully');
console.log('========================================\n');

console.log(`Your IndexNow Key: ${key}\n`);

console.log('Setup Steps:');
console.log('------------\n');

console.log('1. Add to your .env.local file:');
console.log(`   INDEXNOW_KEY=${key}\n`);

console.log('2. Create key verification file:');
console.log(`   echo "${key}" > public/${key}.txt\n`);

console.log('3. Commit and deploy:');
console.log(`   git add public/${key}.txt`);
console.log('   git commit -m "feat: add IndexNow key file"');
console.log('   git push\n');

console.log('4. After deployment, test with:');
console.log('   node scripts/indexnow-submit.mjs https://lonestartortillas.com/\n');

console.log('========================================\n');
