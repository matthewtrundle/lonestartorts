#!/usr/bin/env npx ts-node
/**
 * Image Generation Script for Lonestar Tortillas
 * Generates product and bundle images using OpenRouter + Gemini
 */

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OPENROUTER_API_KEY = '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const IMAGE_MODEL = 'google/gemini-2.5-flash-image';

const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'images');

// Product images to generate
const productImages = [
  {
    filename: 'heb-green-sauce-mild.webp',
    prompt: 'H-E-B That Green Sauce bottle with MILD label, creamy green jalapeño sauce, glass bottle, green cap, product photography on marble counter, soft studio lighting'
  },
  {
    filename: 'heb-salsa-smoky-citrus.webp',
    prompt: 'H-E-B specialty salsa jar, smoky chipotle salsa with citrus notes, chunky salsa visible through glass jar, product photography, clean white background'
  },
  {
    filename: 'heb-salsa-habanero.webp',
    prompt: 'H-E-B habanero salsa jar, fiery orange-red salsa, glass jar with orange label, habanero peppers nearby, product photography, dramatic lighting'
  },
  {
    filename: 'heb-street-corn-chips.webp',
    prompt: 'H-E-B Mexican street corn tortilla chips bag, elote flavored chips, yellow bag with corn imagery, tortilla chips spilling out, product photography'
  },
  {
    filename: 'heb-jalapeno-chips.webp',
    prompt: 'H-E-B spicy jalapeño tortilla chips bag, green bag with jalapeño peppers, crispy chips visible, product photography, vibrant colors'
  },
  {
    filename: 'heb-taco-chips.webp',
    prompt: 'H-E-B crunchy taco tortilla chips bag, orange/red bag, taco-seasoned chips, product photography, appetizing presentation'
  },
  {
    filename: 'heb-spicy-bbq-chips.webp',
    prompt: 'H-E-B Texas corn chips spicy BBQ flavor, red and orange bag, barbecue seasoned corn chips, Texas themed packaging, product photography'
  },
  {
    filename: 'heb-lone-stars.webp',
    prompt: 'H-E-B Lone Stars cheddar crackers box, Texas star-shaped orange cheese crackers, red box with Texas star design, crackers spilling out, product photography'
  },
  {
    filename: 'heb-pica-puffs.webp',
    prompt: 'H-E-B Pica Puffs spicy puffed corn snacks, red bag with flames, bright orange spicy puffs, product photography, dynamic angle'
  },
  {
    filename: 'heb-brisket-rub.webp',
    prompt: 'H-E-B Texas Originals brisket rub spice container, brown spice blend, black and orange label, rustic wooden background with raw brisket nearby'
  },
  {
    filename: 'heb-texas-bbq-sauce.webp',
    prompt: 'H-E-B Texas style BBQ sauce bottle, dark rich sauce, Texas themed label, glass bottle, product photography with grilled meat in background'
  },
  {
    filename: 'terry-blacks-bbq.webp',
    prompt: 'Terry Blacks BBQ sauce bottle, Austin Texas barbecue sauce, dark bottle with Terry Blacks branding, authentic pit barbecue style, rustic wood background'
  }
];

// Bundle images to generate
const bundleImages = [
  {
    filename: 'taco-night-kit.webp',
    prompt: 'Texas taco night care package flat lay, stack of flour tortillas, jar of salsa, bag of Texas-shaped tortilla chips, taco seasoning packet, arranged on rustic wood table, warm lighting, gift box presentation, no text on products'
  },
  {
    filename: 'breakfast-taco-box.webp',
    prompt: 'Texas breakfast taco gift box flat lay, stack of butter flour tortillas, bottle of green sauce, bottle of red sauce, arranged on marble surface, morning light, care package presentation, no text on products'
  },
  {
    filename: 'fajita-fiesta.webp',
    prompt: 'Texas fajita fiesta care package flat lay, two stacks of flour tortillas, fajita seasoning packet, jar of hot salsa, sizzling fajita ingredients in background, rustic presentation, no text on products'
  },
  {
    filename: 'ultimate-texas-box.webp',
    prompt: 'Ultimate Texas care package flat lay, flour tortillas, butter tortillas, green sauce bottle, red sauce bottle, Texas-shaped chips bag, salsa jar, arranged beautifully in gift box, premium presentation, Texas flag colors accent, no text on products'
  },
  {
    filename: 'texas-legends-box.webp',
    prompt: 'Premium Texas Legends mega care package flat lay, multiple tortilla stacks (flour, butter, wheat), two sauce bottles (green and red), two salsa jars, Texas-shaped chips, seasoning packets, arranged in large gift box, premium luxury presentation, warm Texas sunset colors, best value bundle, no text on products'
  }
];

async function generateImage(prompt: string): Promise<string | null> {
  const fullPrompt = `Generate a photorealistic product image: ${prompt}. Professional food photography style, high resolution, appetizing, commercial quality, no watermarks, no text overlays, no brand logos visible.`;

  console.log(`\n🎨 Generating: ${prompt.substring(0, 50)}...`);

  try {
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
            content: fullPrompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ API Error: ${response.status} - ${errorText}`);
      return null;
    }

    const data = await response.json();
    console.log('📦 Response:', JSON.stringify(data, null, 2).substring(0, 500));

    // Extract image from response
    const message = data.choices?.[0]?.message;

    // Check various response formats
    if (message?.images && message.images.length > 0) {
      return message.images[0].image_url?.url || message.images[0].url || message.images[0];
    }

    // Check for base64 image in content
    if (message?.content && message.content.startsWith('data:image')) {
      return message.content;
    }

    // Check for URL in content
    if (message?.content && message.content.includes('http')) {
      const urlMatch = message.content.match(/https?:\/\/[^\s"']+/);
      if (urlMatch) return urlMatch[0];
    }

    console.error('❌ No image found in response');
    return null;

  } catch (error) {
    console.error('❌ Generation failed:', error);
    return null;
  }
}

async function downloadImage(url: string, filepath: string): Promise<boolean> {
  return new Promise((resolve) => {
    // Handle base64 images
    if (url.startsWith('data:image')) {
      const base64Data = url.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(filepath, buffer);
      console.log(`✅ Saved base64 image to ${filepath}`);
      resolve(true);
      return;
    }

    // Handle URL images
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);

    protocol.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          downloadImage(redirectUrl, filepath).then(resolve);
          return;
        }
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded to ${filepath}`);
        resolve(true);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete partial file
      console.error(`❌ Download failed: ${err.message}`);
      resolve(false);
    });
  });
}

async function main() {
  console.log('🚀 Starting image generation for Lonestar Tortillas\n');
  console.log(`📁 Output directory: ${PUBLIC_DIR}`);

  // Ensure directories exist
  const productsDir = path.join(PUBLIC_DIR, 'products');
  const bundlesDir = path.join(PUBLIC_DIR, 'bundles');

  if (!fs.existsSync(productsDir)) fs.mkdirSync(productsDir, { recursive: true });
  if (!fs.existsSync(bundlesDir)) fs.mkdirSync(bundlesDir, { recursive: true });

  // Generate product images
  console.log('\n📦 GENERATING PRODUCT IMAGES\n' + '='.repeat(40));

  for (const product of productImages) {
    const filepath = path.join(productsDir, product.filename);

    // Skip if already exists
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  Skipping ${product.filename} (already exists)`);
      continue;
    }

    const imageUrl = await generateImage(product.prompt);

    if (imageUrl) {
      await downloadImage(imageUrl, filepath);
    } else {
      console.log(`⚠️  Failed to generate ${product.filename}`);
    }

    // Rate limit: wait 2 seconds between requests
    await new Promise(r => setTimeout(r, 2000));
  }

  // Generate bundle images
  console.log('\n🎁 GENERATING BUNDLE IMAGES\n' + '='.repeat(40));

  for (const bundle of bundleImages) {
    const filepath = path.join(bundlesDir, bundle.filename);

    // Always regenerate bundle images (they had wrong content)
    const imageUrl = await generateImage(bundle.prompt);

    if (imageUrl) {
      await downloadImage(imageUrl, filepath);
    } else {
      console.log(`⚠️  Failed to generate ${bundle.filename}`);
    }

    // Rate limit
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('\n✨ Image generation complete!');
}

main().catch(console.error);
