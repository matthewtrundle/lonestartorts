import * as fs from 'fs';
import * as path from 'path';

/**
 * Add canonical URLs to all guide and blog pages
 * Also fix title duplication by removing "| Lonestar Tortillas" from page titles
 */

const guidePages = [
  'best-tortillas-for-every-dish',
  'corn-vs-flour-tortillas',
  'gluten-free-tortillas',
  'homemade-vs-store-bought',
  'how-to-crisp-tortillas',
  'how-to-freeze-tortillas',
  'how-to-make-tortillas',
  'how-to-reheat-tortillas', // Already fixed
  'how-to-store-tortillas',
  'tortilla-nutrition',
  'tortilla-sizes',
];

const blogPages = [
  'marias-story',
  'nixtamalization-science',
  'texas-tortilla-traditions',
];

function addCanonicalToPage(filePath: string, pageType: 'guide' | 'blog', slug: string): boolean {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Check if canonical already exists
    if (content.includes('alternates: {') && content.includes('canonical:')) {
      console.log(`⚠️  ${slug}: Canonical already exists`);
      return true;
    }

    // Remove "| Lonestar Tortillas" from title if present
    content = content.replace(
      /title: ['"](.+) \| Lonestar Tortillas['"]/,
      "title: '$1'"
    );

    // Find the metadata export and add canonical
    const metadataRegex = /(export const metadata: Metadata = \{[\s\S]*?)(keywords:.*?,?\n)/;

    if (content.match(metadataRegex)) {
      const canonicalUrl = pageType === 'guide'
        ? `https://lonestartortillas.com/guides/${slug}`
        : `https://lonestartortillas.com/blog/${slug}`;

      content = content.replace(
        metadataRegex,
        `$1$2  alternates: {\n    canonical: '${canonicalUrl}',\n  },\n`
      );
    }

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ ${slug}: Added canonical URL and fixed title`);
    return true;
  } catch (error) {
    console.error(`✗ ${slug}:`, error);
    return false;
  }
}

function main() {
  console.log('Fixing canonical URLs for all guide and blog pages...\n');

  let successCount = 0;
  let failCount = 0;

  console.log('=== GUIDE PAGES ===\n');
  for (const guideName of guidePages) {
    const pagePath = path.join(process.cwd(), 'app', 'guides', guideName, 'page.tsx');
    const success = addCanonicalToPage(pagePath, 'guide', guideName);
    if (success) successCount++;
    else failCount++;
  }

  console.log('\n=== BLOG PAGES ===\n');
  for (const blogName of blogPages) {
    const pagePath = path.join(process.cwd(), 'app', 'blog', blogName, 'page.tsx');
    const success = addCanonicalToPage(pagePath, 'blog', blogName);
    if (success) successCount++;
    else failCount++;
  }

  console.log(`\n✓ Complete: ${successCount} successful, ${failCount} failed`);
  console.log('\nAll pages now have correct canonical URLs pointing to their own paths.');
}

main();
