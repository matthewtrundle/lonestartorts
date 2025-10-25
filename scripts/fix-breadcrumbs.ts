import * as fs from 'fs';
import * as path from 'path';

interface BreadcrumbFix {
  filePath: string;
  breadcrumbs: string;
}

const fixes: BreadcrumbFix[] = [
  {
    filePath: 'app/blog/page.tsx',
    breadcrumbs: `items={[
              { label: 'Home', href: '/' },
              { label: 'Blog' },
            ]}`
  },
  {
    filePath: 'app/blog/marias-story/page.tsx',
    breadcrumbs: `items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: "Maria's Story" },
            ]}`
  },
  {
    filePath: 'app/blog/nixtamalization-science/page.tsx',
    breadcrumbs: `items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'The Science of Nixtamalization' },
            ]}`
  },
  {
    filePath: 'app/blog/texas-tortilla-traditions/page.tsx',
    breadcrumbs: `items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'Texas Tortilla Traditions' },
            ]}`
  },
  {
    filePath: 'app/guides/page.tsx',
    breadcrumbs: `items={[
              { label: 'Home', href: '/' },
              { label: 'Guides' },
            ]}`
  },
  {
    filePath: 'app/guides/how-to-freeze-tortillas/page.tsx',
    breadcrumbs: `items={[
              { label: 'Home', href: '/' },
              { label: 'Guides', href: '/guides' },
              { label: 'How to Freeze Tortillas' },
            ]}`
  },
  {
    filePath: 'app/recipes/page.tsx',
    breadcrumbs: `items={[
              { label: 'Home', href: '/' },
              { label: 'Recipes' },
            ]}`
  },
  {
    filePath: 'app/faq/page.tsx',
    breadcrumbs: `items={[
              { label: 'Home', href: '/' },
              { label: 'FAQ' },
            ]}`
  },
];

for (const fix of fixes) {
  const fullPath = path.join(process.cwd(), fix.filePath);
  let content = fs.readFileSync(fullPath, 'utf-8');

  // Replace <Breadcrumbs /> with <Breadcrumbs items={...} />
  content = content.replace(
    /<Breadcrumbs\s*\/>/,
    `<Breadcrumbs\n            ${fix.breadcrumbs}\n            />`
  );

  fs.writeFileSync(fullPath, content);
  console.log(`✓ Fixed breadcrumbs in ${fix.filePath}`);
}

console.log(`\n✓ Fixed breadcrumbs in ${fixes.length} files`);
