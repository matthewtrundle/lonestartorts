#!/usr/bin/env tsx

/**
 * Recipe Image Generation Script
 *
 * Usage: npx tsx scripts/generate-recipe-images.ts
 *
 * Generates high-quality images for all recipes using OpenRouter API
 * Following best practices for food photography and image generation
 */

import { generateRecipeImages, recipePrompts } from '../lib/image-generation';

async function main() {
  console.log('🎨 Lonestar Tortillas - Recipe Image Generation');
  console.log('================================================\n');

  // List all recipes that need images
  const recipesToGenerate = [
    'breakfastTacos',
    'breakfastBurritos',
    'cheeseQuesadillas',
    'chickenFajitas',
    'tacosAlPastor',
    'carnitasTacos',
    'carneAsadaTacos',
    'fishTacos',
    'shrimpTacos',
    'beanVeggieTacos',
    'cheeseEnchiladas',
    'tortillaStack',
    'flourTortillas',
    'tortillaProcess',
  ];

  console.log(`📋 Recipes to generate: ${recipesToGenerate.length}`);
  console.log(`   ${recipesToGenerate.join(', ')}\n`);

  console.log('🚀 Starting image generation...\n');

  try {
    const results = await generateRecipeImages(recipesToGenerate, 3);

    console.log('\n✅ Generation Complete!');
    console.log('========================\n');
    console.log(`Total images generated: ${results.size}/${recipesToGenerate.length}`);

    // Display results
    results.forEach((image, recipe) => {
      console.log(`\n${recipe}:`);
      console.log(`  URL: ${image.url}`);
      console.log(`  Model: ${image.model}`);
      console.log(`  Timestamp: ${new Date(image.timestamp).toLocaleString()}`);
    });

    // Next steps
    console.log('\n📝 Next Steps:');
    console.log('1. Download images from URLs');
    console.log('2. Optimize images (compress, convert to WebP)');
    console.log('3. Save to /public/images/recipes/');
    console.log('4. Update recipe pages with new image paths');

  } catch (error) {
    console.error('\n❌ Generation failed:', error);
    process.exit(1);
  }
}

main();
