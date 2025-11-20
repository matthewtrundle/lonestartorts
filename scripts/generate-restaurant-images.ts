/**
 * Script to generate all restaurant landing page images using OpenRouter GPT-5 Image Mini
 *
 * Usage:
 * OPENROUTER_API_KEY=sk-or-v1-... npx tsx scripts/generate-restaurant-images.ts
 */

import { generateRestaurantImage } from '../lib/openrouter';

const restaurantTypes = [
  'food-trucks',
  'bbq',
  'mexican',
  'tex-mex',
  'taco-shops',
  'catering',
  'breakfast',
];

const imageTypes: ('hero' | 'product-in-use' | 'trust')[] = [
  'hero',
  'product-in-use',
  'trust',
];

async function generateAllImages() {
  console.log('🎨 Starting restaurant image generation...\n');
  console.log(`Generating ${restaurantTypes.length * imageTypes.length} images total\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const restaurantType of restaurantTypes) {
    console.log(`\n📸 Generating images for: ${restaurantType}`);
    console.log('─'.repeat(50));

    for (const imageType of imageTypes) {
      try {
        const path = await generateRestaurantImage(restaurantType, imageType);
        console.log(`✓ ${imageType}: ${path}`);
        successCount++;

        // Small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`✗ ${imageType} failed:`, error);
        errorCount++;
      }
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Generation Summary');
  console.log('='.repeat(50));
  console.log(`✓ Successful: ${successCount}`);
  console.log(`✗ Failed: ${errorCount}`);
  console.log(`📁 Images saved to: public/images/restaurants/`);
  console.log('\nDone! 🎉');
}

// Check for API key
if (!process.env.OPENROUTER_API_KEY) {
  console.error('❌ Error: OPENROUTER_API_KEY environment variable is not set');
  console.log('\nUsage:');
  console.log('OPENROUTER_API_KEY=sk-or-v1-... npx tsx scripts/generate-restaurant-images.ts');
  process.exit(1);
}

// Run the script
generateAllImages().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
