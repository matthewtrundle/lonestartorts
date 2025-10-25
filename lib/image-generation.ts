/**
 * OpenRouter Image Generation Utility
 * Uses OpenRouter API for generating high-quality images for recipes and guides
 */

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Google's Gemini 2.5 Flash Image - State-of-the-art image generation
// Released August 2025, nicknamed "nano-banana"
// $0.039 per image (1290 tokens @ $30 per 1M tokens)
const IMAGE_MODEL = 'google/gemini-2.5-flash-image'; // Google's latest image generation model

export interface ImageGenerationOptions {
  prompt: string;
  width?: number;
  height?: number;
  style?: 'photorealistic' | 'editorial' | 'rustic' | 'modern';
  aspectRatio?: '1:1' | '4:3' | '16:9';
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  model: string;
  timestamp: number;
}

/**
 * Generate a detailed prompt for food photography following best practices
 */
function buildFoodPhotographyPrompt(
  subject: string,
  style: 'photorealistic' | 'editorial' | 'rustic' | 'modern' = 'photorealistic'
): string {
  const styleDescriptions = {
    photorealistic: 'professional food photography, natural lighting, shallow depth of field, macro detail, appetizing presentation',
    editorial: 'magazine-quality food photography, styled composition, clean aesthetic, high-end presentation, commercial quality',
    rustic: 'rustic food photography, wooden table, natural textures, warm lighting, homestyle presentation',
    modern: 'modern minimalist food photography, clean white background, bright lighting, contemporary plating'
  };

  const commonElements = [
    'high resolution',
    '8K quality',
    'sharp focus',
    'vibrant colors',
    'professional composition',
    'food styling',
    'appetizing appearance'
  ];

  return `${subject}, ${styleDescriptions[style]}, ${commonElements.join(', ')}, no text, no watermarks, no logos`;
}

/**
 * Generate prompts for specific recipe types
 */
export const recipePrompts = {
  breakfastTacos: () => buildFoodPhotographyPrompt(
    'Texas-style breakfast tacos on flour tortillas, scrambled eggs, crispy bacon strips, melted cheddar cheese, fresh salsa, rustic wooden table',
    'rustic'
  ),

  breakfastBurritos: () => buildFoodPhotographyPrompt(
    'hearty breakfast burrito cut in half, scrambled eggs, refried beans, melted cheese visible inside, flour tortilla, fresh salsa on the side',
    'photorealistic'
  ),

  cheeseQuesadillas: () => buildFoodPhotographyPrompt(
    'golden crispy cheese quesadilla cut into wedges, melted cheese stretching, served with sour cream and salsa, bright and appetizing',
    'modern'
  ),

  chickenFajitas: () => buildFoodPhotographyPrompt(
    'sizzling chicken fajitas platter, grilled marinated chicken strips, colorful bell peppers and onions, flour tortillas, guacamole and sour cream, hot cast iron skillet',
    'editorial'
  ),

  tacosAlPastor: () => buildFoodPhotographyPrompt(
    'authentic tacos al pastor on corn tortillas, marinated pork with char marks, grilled pineapple chunks, fresh cilantro, diced onions, lime wedges, Mexican street food style',
    'photorealistic'
  ),

  carnitasTacos: () => buildFoodPhotographyPrompt(
    'authentic carnitas tacos on corn tortillas, tender pulled pork with crispy edges, fresh cilantro, diced white onion, lime wedges, rustic presentation',
    'rustic'
  ),

  carneAsadaTacos: () => buildFoodPhotographyPrompt(
    'grilled carne asada tacos on corn tortillas, charred steak slices, fresh cilantro, diced white onion, lime wedges, rustic wooden table',
    'rustic'
  ),

  fishTacos: () => buildFoodPhotographyPrompt(
    'crispy beer-battered fish tacos, golden fried fish, purple cabbage slaw, white crema drizzle, corn tortillas, lime wedges',
    'photorealistic'
  ),

  shrimpTacos: () => buildFoodPhotographyPrompt(
    'grilled shrimp tacos with cilantro lime slaw, pink shrimp with char marks, fresh toppings, corn tortillas, bright and fresh',
    'modern'
  ),

  beanVeggieTacos: () => buildFoodPhotographyPrompt(
    'vegetarian bean and veggie tacos, seasoned black beans, colorful roasted bell peppers and zucchini, avocado slices, fresh toppings',
    'photorealistic'
  ),

  cheeseEnchiladas: () => buildFoodPhotographyPrompt(
    'cheese enchiladas in baking dish, red enchilada sauce, melted cheese bubbling, topped with cilantro, overhead view',
    'rustic'
  ),

  tortillaStack: () => buildFoodPhotographyPrompt(
    'stack of fresh corn tortillas on a wooden board, warm golden color, rustic kitchen setting, natural lighting',
    'rustic'
  ),

  flourTortillas: () => buildFoodPhotographyPrompt(
    'stack of soft flour tortillas, warm and pillowy, on rustic wooden surface, kitchen towel, warm lighting',
    'rustic'
  ),

  tortillaProcess: () => buildFoodPhotographyPrompt(
    'fresh tortillas being made, hands pressing dough, traditional comal, authentic Mexican kitchen scene',
    'editorial'
  ),
};

/**
 * Generate an image using OpenRouter API
 *
 * Best practices:
 * - Use descriptive, specific prompts
 * - Specify technical requirements (resolution, style)
 * - Handle errors gracefully
 * - Log generation for debugging
 */
export async function generateImage(
  options: ImageGenerationOptions
): Promise<GeneratedImage> {
  const {
    prompt,
    width = 1024,
    height = 1024,
    style = 'photorealistic'
  } = options;

  try {
    console.log('🎨 Generating image with OpenRouter...');
    console.log('Prompt:', prompt);

    // Build the full prompt with style enhancements
    const fullPrompt = prompt.includes('food photography')
      ? prompt
      : buildFoodPhotographyPrompt(prompt, style);

    // Make request to OpenRouter
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://lonestartortillas.com',
        'X-Title': 'Lonestar Tortillas Image Generation'
      },
      body: JSON.stringify({
        model: IMAGE_MODEL,
        messages: [
          {
            role: 'user',
            content: `Generate an image: ${fullPrompt}. Image dimensions: ${width}x${height}px.`
          }
        ],
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    // Extract image URL from response
    // Gemini 2.5 Flash Image returns images in message.images array
    const message = data.choices?.[0]?.message;
    let imageUrl = '';

    // Check if image is in the images array (Gemini format)
    if (message?.images && message.images.length > 0) {
      imageUrl = message.images[0].image_url?.url || '';
    } else {
      // Fallback to content field for other models
      imageUrl = message?.content || '';
    }

    if (!imageUrl) {
      console.error('❌ Response structure:', JSON.stringify(data, null, 2));
      throw new Error('No image URL in response');
    }

    console.log('✅ Image URL format:', imageUrl.substring(0, 50) + '...');

    const result: GeneratedImage = {
      url: imageUrl,
      prompt: fullPrompt,
      model: IMAGE_MODEL,
      timestamp: Date.now()
    };

    console.log('✅ Image generated successfully');
    return result;

  } catch (error) {
    console.error('❌ Image generation failed:', error);
    throw error;
  }
}

/**
 * Generate images for all recipes
 * Best practice: Generate in batches to avoid rate limits
 */
export async function generateRecipeImages(
  recipes: string[],
  batchSize = 3
): Promise<Map<string, GeneratedImage>> {
  const results = new Map<string, GeneratedImage>();

  // Process in batches to respect rate limits
  for (let i = 0; i < recipes.length; i += batchSize) {
    const batch = recipes.slice(i, i + batchSize);

    console.log(`\n📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(recipes.length / batchSize)}`);

    const batchPromises = batch.map(async (recipeKey) => {
      try {
        // Get prompt for this recipe
        const promptFn = recipePrompts[recipeKey as keyof typeof recipePrompts];
        if (!promptFn) {
          console.warn(`⚠️  No prompt defined for ${recipeKey}`);
          return;
        }

        const image = await generateImage({
          prompt: promptFn(),
          width: 1024,
          height: 768,
          aspectRatio: '4:3'
        });

        results.set(recipeKey, image);
        console.log(`✅ Generated: ${recipeKey}`);

      } catch (error) {
        console.error(`❌ Failed to generate ${recipeKey}:`, error);
      }
    });

    await Promise.all(batchPromises);

    // Wait between batches to respect rate limits
    if (i + batchSize < recipes.length) {
      console.log('⏳ Waiting 2 seconds before next batch...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  return results;
}

/**
 * Save generated image to public directory
 * Best practice: Use descriptive filenames and organize by type
 */
export async function saveImageToPublic(
  imageData: GeneratedImage,
  filename: string,
  directory: 'recipes' | 'guides' | 'products' = 'recipes'
): Promise<string> {
  try {
    // In a real implementation, you would:
    // 1. Download the image from the URL
    // 2. Optimize it (compress, resize if needed)
    // 3. Save to /public/images/{directory}/{filename}
    // 4. Return the public URL

    const publicPath = `/images/${directory}/${filename}`;
    console.log(`💾 Would save image to: ${publicPath}`);

    // For now, return the generated URL
    // In production, implement actual file saving
    return imageData.url;

  } catch (error) {
    console.error('❌ Failed to save image:', error);
    throw error;
  }
}

/**
 * Best practices summary:
 *
 * 1. Prompt Engineering:
 *    - Be specific and detailed
 *    - Include technical specs (resolution, style, lighting)
 *    - Avoid copyrighted terms and brands
 *    - Specify "no text, no watermarks, no logos"
 *
 * 2. Rate Limiting:
 *    - Batch requests (3-5 at a time)
 *    - Add delays between batches (2-3 seconds)
 *    - Handle errors gracefully with retries
 *
 * 3. Image Quality:
 *    - Request high resolution (1024x1024 or larger)
 *    - Specify aspect ratios appropriate for use case
 *    - Use professional models (flux-1.1-pro, stable-diffusion-xl)
 *
 * 4. File Management:
 *    - Save with descriptive, SEO-friendly names
 *    - Organize in directories by type
 *    - Optimize images (compress, resize) before serving
 *    - Use WebP format for web delivery
 *
 * 5. Error Handling:
 *    - Log all attempts and failures
 *    - Implement fallbacks (placeholder images)
 *    - Retry failed generations with exponential backoff
 */
