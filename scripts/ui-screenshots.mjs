/**
 * UI overhaul evidence capture. Screenshots the key pages at 3 viewports.
 * Usage: node scripts/ui-screenshots.mjs <outDirName>   (e.g. baseline | after)
 * Requires the dev server on localhost:3000 (or PORT env).
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'fs';

const outName = process.argv[2] || 'baseline';
const base = process.env.BASE_URL || 'http://localhost:3000';
const outDir = `screenshots/${outName}`;
mkdirSync(outDir, { recursive: true });

const pages = [
  ['home', '/'],
  ['shop', '/shop'],
  ['product-flour', '/products/flour-tortillas'],
  ['product-corn', '/products/corn-tortillas'],
  ['subscribe', '/subscribe'],
  ['checkout', '/checkout'],
  ['buy-heb', '/buy-heb-tortillas-online'],
  ['guide', '/guides/wedding-taco-bar'],
  ['recipe', '/recipes/birria-tacos'],
  ['blog', '/blog/corn-vs-flour-guide'],
];

const viewports = [
  ['mobile', 375, 812],
  ['tablet', 768, 1024],
  ['desktop', 1440, 900],
];

const browser = await chromium.launch();
for (const [vpName, width, height] of viewports) {
  const ctx = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const [name, path] of pages) {
    try {
      await page.goto(base + path, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(800);
      await page.screenshot({ path: `${outDir}/${name}-${vpName}.png`, fullPage: true });
      console.log(`ok ${name}-${vpName}`);
    } catch (e) {
      console.error(`FAIL ${name}-${vpName}: ${e.message.slice(0, 100)}`);
    }
  }
  await ctx.close();
}
await browser.close();
console.log(`done -> ${outDir}`);
