import * as fs from 'fs';
import * as path from 'path';

/**
 * Add hero image sections to all guide pages
 */

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

const imageDescriptions: Record<string, string> = {
  'best-tortillas-for-every-dish': 'Variety of tortilla dishes including tacos, burritos, and quesadillas',
  'corn-vs-flour-tortillas': 'Side by side comparison of corn and flour tortillas',
  'gluten-free-tortillas': 'Stack of gluten-free corn tortillas with fresh corn',
  'homemade-vs-store-bought': 'Comparison of homemade and store-bought tortillas',
  'how-to-crisp-tortillas': 'Crispy golden tortillas in a cast iron skillet',
  'how-to-freeze-tortillas': 'Tortillas wrapped and ready for freezer storage',
  'how-to-make-tortillas': 'Hands making fresh tortillas with traditional press',
  'how-to-reheat-tortillas': 'Warming tortillas on a stovetop comal',
  'how-to-store-tortillas': 'Properly stored tortillas in airtight containers',
  'tortilla-nutrition': 'Healthy tortillas with fresh vegetables and ingredients',
  'tortilla-sizes': 'Various sizes of tortillas from small to large',
};

function addHeroImageToGuidePage(guideName: string): boolean {
  try {
    const pagePath = path.join(process.cwd(), 'app', 'guides', guideName, 'page.tsx');
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
      console.log(`⚠️  ${guideName}: Hero image section already exists`);
      return true;
    }

    // Find the closing </header> tag and insert hero image section after it
    const heroImageSection = `
        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/generated/guide-${guideName}.webp"
              alt="${imageDescriptions[guideName]}"
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
    console.log(`✓ ${guideName}: Hero image section added`);
    return true;
  } catch (error) {
    console.error(`✗ ${guideName}:`, error);
    return false;
  }
}

function main() {
  console.log('Adding hero image sections to guide pages...\n');

  let successCount = 0;
  let failCount = 0;

  for (const guideName of guidePages) {
    const success = addHeroImageToGuidePage(guideName);
    if (success) successCount++;
    else failCount++;
  }

  console.log(`\n✓ Complete: ${successCount} successful, ${failCount} failed`);
}

main();
