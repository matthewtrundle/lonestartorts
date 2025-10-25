import { buildFoodPhotographyPrompt } from '../lib/image-generation';

// Guide image prompts
export const guideImagePrompts = {
  'best-tortillas-for-every-dish': buildFoodPhotographyPrompt(
    'variety of different tortilla dishes beautifully arranged, tacos, burritos, quesadillas, enchiladas on rustic wooden table, food styling photography',
    'editorial'
  ),
  'corn-vs-flour-tortillas': buildFoodPhotographyPrompt(
    'side by side comparison of corn tortillas and flour tortillas, authentic handmade tortillas on traditional Mexican comal, warm lighting, clear texture differences visible',
    'photorealistic'
  ),
  'gluten-free-tortillas': buildFoodPhotographyPrompt(
    'stack of gluten-free corn tortillas on rustic plate, with fresh corn kernels and masa flour scattered around, clean bright lighting, health-focused food photography',
    'modern'
  ),
  'homemade-vs-store-bought': buildFoodPhotographyPrompt(
    'split scene showing homemade tortillas being handmade on left, store-bought packaged tortillas on right, comparison photography, lifestyle food photography',
    'editorial'
  ),
  'how-to-crisp-tortillas': buildFoodPhotographyPrompt(
    'crispy golden tortillas in cast iron skillet, some flat and some folded for taco shells, oil bubbles visible, cooking process photography, warm kitchen lighting',
    'photorealistic'
  ),
  'how-to-freeze-tortillas': buildFoodPhotographyPrompt(
    'stack of tortillas wrapped in plastic wrap and freezer bags, with parchment paper between layers, food storage photography, clean organized kitchen counter',
    'modern'
  ),
  'how-to-make-tortillas': buildFoodPhotographyPrompt(
    'hands shaping fresh tortilla dough, traditional wooden tortilla press, masa dough ball, rustic kitchen setting, artisan food making process',
    'rustic'
  ),
  'how-to-reheat-tortillas': buildFoodPhotographyPrompt(
    'warm tortillas being heated on stovetop comal, steam rising, tongs lifting a tortilla, warm kitchen ambiance, cooking process photography',
    'photorealistic'
  ),
  'how-to-store-tortillas': buildFoodPhotographyPrompt(
    'properly stored tortillas in airtight containers and resealable bags, organized pantry shelf, food storage best practices, clean organized photography',
    'modern'
  ),
  'tortilla-nutrition': buildFoodPhotographyPrompt(
    'healthy tortillas with fresh vegetables, nutritional ingredients laid out, whole grain tortillas, chia seeds, clean eating concept, bright natural lighting',
    'modern'
  ),
  'tortilla-sizes': buildFoodPhotographyPrompt(
    'various sizes of tortillas arranged from small to large, 4-inch to 12-inch tortillas displayed on wooden board, size comparison photography, overhead shot',
    'editorial'
  ),
};

// Blog image prompts
export const blogImagePrompts = {
  'marias-story': buildFoodPhotographyPrompt(
    'warm portrait-style photo of grandmother hands making tortillas in traditional Mexican kitchen, emotional storytelling photography, golden hour lighting, heartfelt family cooking scene',
    'editorial'
  ),
  'nixtamalization-science': buildFoodPhotographyPrompt(
    'scientific close-up of corn kernels transforming into masa, traditional lime water process, ingredients in glass bowls, educational food science photography, clean modern aesthetic',
    'modern'
  ),
  'texas-tortilla-traditions': buildFoodPhotographyPrompt(
    'traditional Texas-Mexican kitchen scene, cast iron comal with tortillas, Texas flag subtle in background, authentic cultural food photography, warm nostalgic lighting',
    'rustic'
  ),
};

export async function generateImage(prompt: string, filename: string): Promise<boolean> {
  try {
    console.log(`Generating: ${filename}...`);

    const response = await fetch('http://localhost:3000/api/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ custom: prompt, filename }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to generate ${filename}: ${error}`);
    }

    const data = await response.json();
    console.log(`✓ ${filename}: ${data.message}`);
    return true;
  } catch (error) {
    console.error(`✗ ${filename}:`, error);
    return false;
  }
}

async function main() {
  console.log('Starting guide image generation...\n');

  const guides = Object.entries(guideImagePrompts);
  const blogs = Object.entries(blogImagePrompts);

  let successCount = 0;
  let failCount = 0;

  // Generate guide images
  console.log('=== GUIDE IMAGES ===\n');
  for (const [name, prompt] of guides) {
    const filename = `guide-${name}.webp`;
    const success = await generateImage(prompt, filename);
    if (success) successCount++;
    else failCount++;

    // Rate limit: wait 2 seconds between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Generate blog images
  console.log('\n=== BLOG IMAGES ===\n');
  for (const [name, prompt] of blogs) {
    const filename = `blog-${name}.webp`;
    const success = await generateImage(prompt, filename);
    if (success) successCount++;
    else failCount++;

    // Rate limit: wait 2 seconds between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log(`\n✓ Complete: ${successCount} successful, ${failCount} failed`);
}

main().catch(console.error);
