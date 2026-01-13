#!/usr/bin/env node
/**
 * Generate campaign images using OpenRouter API with Flux 2 Max
 * Usage: node scripts/generate-campaign-images.js
 */

const fs = require('fs');
const path = require('path');

const OPENROUTER_API_KEY = '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';
const MODEL = 'black-forest-labs/flux.2-max';
const OUTPUT_DIR = path.join(__dirname, '../public/images/campaigns');

// Image prompts for each campaign
const imagePrompts = [
  // UT Alumni Campaign Images
  {
    filename: 'hero-hook-em.png',
    prompt: `A stunning hero image for a Texas food website. Warm burnt orange sunset gradient sky over the Austin Texas skyline silhouette. The Texas state outline subtly integrated. Soft golden light, warm and inviting atmosphere. No text, no logos, no people. Professional food marketing photography style. Wide aspect ratio suitable for website hero banner. 1920x600 aspect ratio.`,
  },
  {
    filename: 'product-breakfast-tacos.png',
    prompt: `Professional food photography of authentic Texas breakfast tacos on a rustic wooden table. Warm flour tortillas filled with scrambled eggs, crispy bacon, and melted cheese. Morning sunlight streaming in. Warm, appetizing colors. Texas farmhouse kitchen aesthetic. No text, no logos. Square composition. 800x600 aspect ratio.`,
  },
  // Military Care Package Campaign Images
  {
    filename: 'hero-military-care.png',
    prompt: `A patriotic hero image combining Texas pride with American military themes. Subtle American flag elements with a lone star of Texas. Deep navy blue and red color palette with gold/amber accents. Abstract, elegant design suitable for a food company shipping care packages to military. No text, no logos, no people. Warm, emotional, patriotic feeling. 1920x600 aspect ratio.`,
  },
  {
    filename: 'product-care-package.png',
    prompt: `Professional product photography of a care package being prepared. Brown cardboard shipping box filled with vacuum-sealed tortilla packages, arranged neatly with red white and blue tissue paper. A handwritten note visible. Warm lighting, heartfelt feeling. Clean background. No text visible on products. 800x600 aspect ratio.`,
  },
];

async function generateImage(prompt, filename) {
  console.log(`\n🎨 Generating: ${filename}`);
  console.log(`   Prompt: ${prompt.substring(0, 80)}...`);

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://lonestartortillas.com',
        'X-Title': 'Lonestar Tortillas Campaign Images',
      },
      body: JSON.stringify({
        model: MODEL,
        modalities: ['image', 'text'],
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log(`   Response received`);

    // Extract image from response
    const message = data.choices?.[0]?.message;
    if (!message) {
      throw new Error('No message in response');
    }

    // Look for image in content array or images array
    let imageUrl = null;

    if (message.content && Array.isArray(message.content)) {
      for (const item of message.content) {
        if (item.type === 'image_url' && item.image_url?.url) {
          imageUrl = item.image_url.url;
          break;
        }
      }
    }

    if (!imageUrl && message.images && Array.isArray(message.images)) {
      for (const item of message.images) {
        if (item.image_url?.url) {
          imageUrl = item.image_url.url;
          break;
        }
      }
    }

    if (!imageUrl) {
      console.log('   Response structure:', JSON.stringify(data, null, 2).substring(0, 500));
      throw new Error('No image URL found in response');
    }

    // Extract base64 data
    const base64Match = imageUrl.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!base64Match) {
      throw new Error('Invalid image URL format');
    }

    const [, format, base64Data] = base64Match;
    const buffer = Buffer.from(base64Data, 'base64');

    // Save to file
    const outputPath = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(outputPath, buffer);

    console.log(`   ✅ Saved: ${outputPath}`);
    console.log(`   Size: ${(buffer.length / 1024).toFixed(1)} KB`);

    return true;
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting campaign image generation');
  console.log(`   Model: ${MODEL}`);
  console.log(`   Output: ${OUTPUT_DIR}`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let successCount = 0;
  let failCount = 0;

  for (const image of imagePrompts) {
    const success = await generateImage(image.prompt, image.filename);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }

    // Add delay between requests to avoid rate limiting
    if (imagePrompts.indexOf(image) < imagePrompts.length - 1) {
      console.log('   Waiting 2 seconds before next request...');
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  console.log(`\n📊 Summary: ${successCount} succeeded, ${failCount} failed`);
}

main().catch(console.error);
