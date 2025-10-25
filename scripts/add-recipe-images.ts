#!/usr/bin/env tsx

/**
 * Script to add hero images to all recipe pages
 */

import fs from 'fs/promises';
import path from 'path';

const recipes = [
  { dir: 'breakfast-burritos', image: 'breakfast-burritos.webp', alt: 'Hearty breakfast burrito with eggs, beans, and melted cheese' },
  { dir: 'cheese-quesadillas', image: 'cheese-quesadillas.webp', alt: 'Golden crispy cheese quesadilla cut into wedges with melted cheese' },
  { dir: 'chicken-fajitas', image: 'chicken-fajitas.webp', alt: 'Sizzling chicken fajitas with colorful peppers and onions' },
  { dir: 'tacos-al-pastor', image: 'tacos-al-pastor.webp', alt: 'Authentic tacos al pastor with marinated pork and pineapple' },
  { dir: 'carnitas-tacos', image: 'carnitas-tacos.webp', alt: 'Tender carnitas tacos with crispy pork and fresh toppings' },
  { dir: 'carne-asada-tacos', image: 'carne-asada-tacos.webp', alt: 'Grilled carne asada tacos with charred steak and cilantro' },
  { dir: 'fish-tacos', image: 'fish-tacos.webp', alt: 'Crispy beer-battered fish tacos with cabbage slaw' },
  { dir: 'shrimp-tacos', image: 'shrimp-tacos.webp', alt: 'Grilled shrimp tacos with cilantro lime slaw' },
  { dir: 'bean-and-veggie-tacos', image: 'bean-veggie-tacos.webp', alt: 'Vegetarian bean and veggie tacos with roasted vegetables' },
  { dir: 'cheese-enchiladas', image: 'cheese-enchiladas.webp', alt: 'Cheese enchiladas with red sauce and melted cheese' },
];

const imageSection = (imagePath: string, alt: string) => `
        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/recipes/${imagePath}"
              alt="${alt}"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
`;

async function addImageToRecipePage(recipeDir: string, imagePath: string, alt: string) {
  const filePath = path.join(process.cwd(), 'app', 'recipes', recipeDir, 'page.tsx');

  try {
    let content = await fs.readFile(filePath, 'utf-8');

    // Check if Image is already imported
    if (!content.includes("import Image from 'next/image'")) {
      content = content.replace(
        "import Link from 'next/link';",
        "import Link from 'next/link';\nimport Image from 'next/image';"
      );
      console.log(`✅ Added Image import to ${recipeDir}`);
    }

    // Check if image section already exists
    if (content.includes('Hero Image') || content.includes(imagePath)) {
      console.log(`⏭️  ${recipeDir} already has image section`);
      return;
    }

    // Find the closing tag of the hero section and add image after it
    const heroSectionEnd = content.indexOf('</section>', content.indexOf('Hero Section'));
    if (heroSectionEnd === -1) {
      console.log(`❌ Could not find hero section end in ${recipeDir}`);
      return;
    }

    // Insert image section after hero section
    const insertPosition = heroSectionEnd + '</section>'.length;
    content = content.slice(0, insertPosition) +
              '\n' +
              imageSection(imagePath, alt) +
              '\n' +
              content.slice(insertPosition);

    await fs.writeFile(filePath, content, 'utf-8');
    console.log(`✅ Added hero image to ${recipeDir}`);

  } catch (error) {
    console.error(`❌ Error processing ${recipeDir}:`, error);
  }
}

async function main() {
  console.log('🎨 Adding hero images to recipe pages...\n');

  for (const recipe of recipes) {
    await addImageToRecipePage(recipe.dir, recipe.image, recipe.alt);
  }

  console.log('\n✅ Done!');
}

main();
