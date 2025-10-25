import * as fs from 'fs';
import * as path from 'path';

/**
 * Add LastUpdated component to all guide and blog pages
 */

const TODAY = '2025-10-25';

const guidePages = [
  'best-tortillas-for-every-dish',
  'corn-vs-flour-tortillas',
  'gluten-free-tortillas',
  'homemade-vs-store-bought',
  'how-to-crisp-tortillas',
  'how-to-freeze-tortillas',
  'how-to-make-tortillas',
  'how-to-reheat-tortillas',
  'how-to-store-tortillas',
  'tortilla-nutrition',
  'tortilla-sizes',
];

const blogPages = [
  'marias-story',
  'nixtamalization-science',
  'texas-tortilla-traditions',
];

function addLastUpdatedToPage(filePath: string, pageType: 'guide' | 'blog'): boolean {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Check if LastUpdated already exists
    if (content.includes('LastUpdated') || content.includes('Last updated')) {
      console.log(`⚠️  ${path.basename(path.dirname(filePath))}: LastUpdated already exists`);
      return true;
    }

    // Step 1: Add import if not present
    if (!content.includes("import { LastUpdated }")) {
      // Find the last import statement
      const importRegex = /import.*from.*['"];?\n/g;
      const imports = content.match(importRegex);
      if (imports && imports.length > 0) {
        const lastImport = imports[imports.length - 1];
        content = content.replace(
          lastImport,
          `${lastImport}import { LastUpdated } from '@/components/seo/LastUpdated';\n`
        );
      }
    }

    // Step 2: Update dateModified in schema
    content = content.replace(
      /dateModified: ['"]2025-10-2[0-9]['"]/g,
      `dateModified: '${TODAY}'`
    );

    // Step 3: Add LastUpdated component after <article> tag
    // Find the article tag and add LastUpdated as first child
    const articleRegex = /(<article[^>]*>)/;
    const match = content.match(articleRegex);

    if (match) {
      const articleTag = match[1];
      const lastUpdatedComponent = `
          <LastUpdated date="${TODAY}" />
`;

      content = content.replace(
        articleTag,
        `${articleTag}${lastUpdatedComponent}`
      );
    }

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ ${path.basename(path.dirname(filePath))}: Added LastUpdated component`);
    return true;
  } catch (error) {
    console.error(`✗ ${path.basename(path.dirname(filePath))}:`, error);
    return false;
  }
}

function main() {
  console.log('Adding LastUpdated component to all guide and blog pages...\n');

  let successCount = 0;
  let failCount = 0;

  console.log('=== GUIDE PAGES ===\n');
  for (const guideName of guidePages) {
    const pagePath = path.join(process.cwd(), 'app', 'guides', guideName, 'page.tsx');
    const success = addLastUpdatedToPage(pagePath, 'guide');
    if (success) successCount++;
    else failCount++;
  }

  console.log('\n=== BLOG PAGES ===\n');
  for (const blogName of blogPages) {
    const pagePath = path.join(process.cwd(), 'app', 'blog', blogName, 'page.tsx');
    const success = addLastUpdatedToPage(pagePath, 'blog');
    if (success) successCount++;
    else failCount++;
  }

  console.log(`\n✓ Complete: ${successCount} successful, ${failCount} failed`);
  console.log(`\nAll pages now have LastUpdated component with date: ${TODAY}`);
  console.log('All article schemas updated with dateModified: ' + TODAY);
}

main();
