/**
 * OpenRouter API Client for GPT-5 Image Mini
 * Generates images for restaurant landing pages
 */

export interface ImageGenerationOptions {
  prompt: string;
  size?: '1024x1024' | '1792x1024' | '1024x1792';
  quality?: 'standard' | 'hd';
  style?: 'vivid' | 'natural';
}

export interface GeneratedImage {
  url: string;
  revised_prompt?: string;
}

/**
 * Generate an image using OpenRouter's Image Generation API
 */
export async function generateImage(
  options: ImageGenerationOptions
): Promise<GeneratedImage> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not set in environment variables');
  }

  // Determine aspect ratio from size option
  let aspectRatio = '16:9'; // Default for 1792x1024
  if (options.size === '1024x1024') {
    aspectRatio = '1:1';
  } else if (options.size === '1024x1792') {
    aspectRatio = '9:16';
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://lonestartortillas.com',
      'X-Title': 'Lonestar Tortillas',
    },
    body: JSON.stringify({
      model: 'openai/gpt-5-image-mini',
      messages: [
        {
          role: 'user',
          content: options.prompt,
        },
      ],
      modalities: ['image', 'text'],
      image_config: {
        aspect_ratio: aspectRatio,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
  }

  const data = await response.json();

  // Images come in the choices[0].message.images array
  if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.images || !data.choices[0].message.images[0]) {
    throw new Error('Invalid response from OpenRouter API: ' + JSON.stringify(data));
  }

  const imageData = data.choices[0].message.images[0];

  // Handle different response formats
  let imageDataUrl: string;
  if (typeof imageData === 'string') {
    // Already a data URL
    imageDataUrl = imageData;
  } else {
    // Check for nested image_url structure
    const nestedUrl = imageData?.image_url?.url;
    if (typeof nestedUrl === 'string') {
      imageDataUrl = nestedUrl;
    } else if (typeof imageData?.url === 'string') {
      // Image data in .url property
      imageDataUrl = imageData.url;
    } else if (typeof imageData?.data === 'string') {
      // Base64 data in .data property
      imageDataUrl = `data:image/png;base64,${imageData.data}`;
    } else {
      throw new Error('Unexpected image data format: ' + JSON.stringify(imageData));
    }
  }

  return {
    url: imageDataUrl,
    revised_prompt: data.choices[0].message.content || undefined,
  };
}

/**
 * Download image from base64 data URL and save to public/images
 */
export async function downloadImage(
  imageDataUrl: string,
  filename: string
): Promise<string> {
  const fs = require('fs');
  const path = require('path');

  // Extract base64 data from data URL (format: data:image/png;base64,...)
  const base64Data = imageDataUrl.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');

  const outputPath = path.join(process.cwd(), 'public', 'images', 'restaurants', filename);

  // Ensure directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, buffer);

  return `/images/restaurants/${filename}`;
}

/**
 * Generate and save an image for a restaurant type
 */
export async function generateRestaurantImage(
  restaurantType: string,
  imageType: 'hero' | 'product-in-use' | 'trust',
  customPrompt?: string
): Promise<string> {
  const prompts = {
    'food-trucks': {
      hero: 'Professional food photography of a vibrant Texas food truck with fresh flour tortillas being prepared on a flat-top grill, warm sunset lighting, people lined up, appetizing and authentic, editorial food photography style',
      'product-in-use': 'Close-up food photography of hands assembling a gourmet street taco with fresh flour tortilla, premium ingredients, food truck setting, shallow depth of field, professional commercial photography',
      trust: 'Artisan hands pressing fresh masa for tortillas, warm professional kitchen lighting, authentic Texas craftsmanship, close-up detail shot, premium quality aesthetic',
    },
    'bbq': {
      hero: 'Professional photo of a rustic Texas BBQ restaurant interior, fresh flour tortillas on a wooden table next to smoked brisket, warm ambient lighting, authentic Texas atmosphere, editorial restaurant photography',
      'product-in-use': 'Close-up food photography of tender smoked brisket being wrapped in a fresh flour tortilla, rustic wood table, BBQ sauce glistening, professional food styling, shallow depth of field',
      trust: 'Wide shot of a traditional Texas smokehouse with tortillas warming on the grill, smoke rising, golden hour lighting, authentic and appetizing',
    },
    'mexican': {
      hero: 'Professional photo of an authentic Mexican restaurant kitchen, fresh flour tortillas stacked on comal, vibrant colors, warm lighting, traditional cookware, editorial food photography style',
      'product-in-use': 'Close-up food photography of carne asada tacos being assembled with fresh flour tortillas, lime wedges, cilantro, onions, professional food styling, vibrant and appetizing',
      trust: 'Traditional Mexican abuela hands making fresh tortillas on a comal, warm kitchen lighting, authentic cultural heritage, close-up detail, emotional storytelling',
    },
    'tex-mex': {
      hero: 'Professional photo of a bustling Tex-Mex restaurant, sizzling fajitas arriving at table with stack of fresh flour tortillas, vibrant atmosphere, warm lighting, editorial restaurant photography',
      'product-in-use': 'Close-up food photography of sizzling chicken fajitas with peppers and onions, fresh flour tortillas on the side, steam rising, professional commercial food photography',
      trust: 'Wide shot of a modern Tex-Mex kitchen with chef preparing fresh tortillas, stainless steel equipment, professional atmosphere, clean and appetizing',
    },
    'taco-shops': {
      hero: 'Professional photo of a modern taco shop counter, fresh flour tortillas being hand-pressed, colorful toppings displayed, bright natural lighting, fast-casual dining atmosphere, editorial photography',
      'product-in-use': 'Close-up food photography of three gourmet tacos with fresh flour tortillas, creative toppings, garnished beautifully, white plate presentation, professional food styling',
      trust: 'Overhead shot of taco assembly station with fresh tortillas, colorful ingredients in stainless containers, professional kitchen organization, clean and appetizing',
    },
    'catering': {
      hero: 'Professional photo of an elegant catering setup with large platters of fresh flour tortillas, beautiful food presentation, event venue setting, sophisticated lighting, editorial event photography',
      'product-in-use': 'Wide shot of catering team assembling tacos with fresh flour tortillas for a large event, professional kitchen, organized workflow, high-volume food prep, professional photography',
      trust: 'Professional photo of catering truck or kitchen with bulk packages of fresh tortillas, commercial equipment, organized and efficient, trustworthy business aesthetic',
    },
    'breakfast': {
      hero: 'Professional photo of a cozy breakfast cafe, fresh flour tortillas on a griddle next to eggs and bacon, morning sunlight streaming through windows, warm and inviting atmosphere, editorial food photography',
      'product-in-use': 'Close-up food photography of breakfast tacos with scrambled eggs, crispy bacon, and cheese in fresh flour tortillas, morning light, professional food styling, appetizing steam',
      trust: 'Morning scene of a breakfast kitchen with chef preparing fresh tortillas for morning rush, warm lighting, professional and efficient, appetizing breakfast atmosphere',
    },
  };

  const prompt = customPrompt || prompts[restaurantType as keyof typeof prompts]?.[imageType];

  if (!prompt) {
    throw new Error(`No prompt found for ${restaurantType} - ${imageType}`);
  }

  console.log(`Generating ${imageType} image for ${restaurantType}...`);
  console.log(`Prompt: ${prompt}`);

  const image = await generateImage({
    prompt,
    size: imageType === 'hero' ? '1792x1024' : '1024x1024',
    quality: 'hd',
    style: 'vivid',
  });

  const filename = `${restaurantType}-${imageType}.png`;
  const savedPath = await downloadImage(image.url, filename);

  console.log(`✓ Saved: ${savedPath}`);

  return savedPath;
}
