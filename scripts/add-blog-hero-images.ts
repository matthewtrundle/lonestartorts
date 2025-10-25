import * as fs from 'fs';
import * as path from 'path';

/**
 * Add hero image sections to all blog pages
 */

const blogPages = [
  'marias-story',
  'nixtamalization-science',
  'texas-tortilla-traditions',
];

const imageDescriptions: Record<string, string> = {
  'marias-story': 'Grandmother hands making traditional tortillas in Mexican kitchen',
  'nixtamalization-science': 'Corn kernels and masa in the nixtamalization process',
  'texas-tortilla-traditions': 'Traditional Texas-Mexican cooking with tortillas on comal',
};

function addHeroImageToBlogPage(blogName: string): boolean {
  try {
    const pagePath = path.join(process.cwd(), 'app', 'blog', blogName, 'page.tsx');
    let content = fs.readFileSync(pagePath, 'utf-8');

    // Check if Image import already exists
    if (!content.includes("import Image from 'next/image'")) {
      // Add Image import after the Link import
      content = content.replace(
        /import Link from 'next\/link';/,
        "import Link from 'next/link';\nimport Image from 'next/image';"
      );
    }

    // Check if hero image section already exists
    if (content.includes('Hero Image') || content.includes('/images/generated/')) {
      console.log(`⚠️  ${blogName}: Hero image section already exists`);
      return true;
    }

    // Find the closing </header> tag and insert hero image section after it
    const heroImageSection = `
        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/generated/blog-${blogName}.webp"
              alt="${imageDescriptions[blogName]}"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

`;

    // Insert the hero image section after the closing </header> tag
    content = content.replace(
      /(<\/header>)/,
      `$1${heroImageSection}`
    );

    fs.writeFileSync(pagePath, content, 'utf-8');
    console.log(`✓ ${blogName}: Hero image section added`);
    return true;
  } catch (error) {
    console.error(`✗ ${blogName}:`, error);
    return false;
  }
}

function main() {
  console.log('Adding hero image sections to blog pages...\n');

  let successCount = 0;
  let failCount = 0;

  for (const blogName of blogPages) {
    const success = addHeroImageToBlogPage(blogName);
    if (success) successCount++;
    else failCount++;
  }

  console.log(`\n✓ Complete: ${successCount} successful, ${failCount} failed`);
}

main();
