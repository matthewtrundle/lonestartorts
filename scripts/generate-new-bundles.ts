#!/usr/bin/env npx ts-node
/**
 * Generate images for new bundle options
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OPENROUTER_API_KEY = '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const IMAGE_MODEL = 'google/gemini-2.5-flash-image';

const BUNDLES_DIR = path.join(__dirname, '..', 'public', 'images', 'bundles');

const newBundles = [
  {
    filename: 'snack-attack-box.webp',
    prompt: 'Game day snack spread on coffee table, diverse friends watching football on TV, Texas-shaped tortilla chips in bowl, cheddar star crackers, spicy cheese puffs, salsa and queso dips, hands reaching for snacks, excitement and laughter, casual living room party setting, lifestyle photography'
  },
  {
    filename: 'bbq-pitmaster-box.webp',
    prompt: 'Texas backyard BBQ scene, experienced pitmaster checking brisket on smoker, BBQ sauce bottles and spice rubs on weathered wooden table, stack of warm flour tortillas in basket, cast iron and rustic elements, authentic Texas smokehouse atmosphere, golden hour sunlight, lifestyle photography, proud craftsman moment'
  }
];

async function generateImage(prompt: string): Promise<string | null> {
  const fullPrompt = `Generate a photorealistic lifestyle image: ${prompt}. Professional lifestyle photography style, authentic emotions, warm inviting colors, high resolution, no watermarks, no text overlays, no visible brand logos.`;

  console.log(`\n🎨 Generating: ${prompt.substring(0, 50)}...`);

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://lonestartortillas.com',
        'X-Title': 'Lonestar Tortillas Bundle Images'
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
    const message = data.choices?.[0]?.message;

    if (message?.images && message.images.length > 0) {
      const img = message.images[0];
      if (img.b64_json) {
        return `data:image/png;base64,${img.b64_json}`;
      }
      return img.image_url?.url || img.url || img;
    }

    if (message?.content && message.content.startsWith('data:image')) {
      return message.content;
    }

    console.error('❌ No image found');
    return null;

  } catch (error) {
    console.error('❌ Generation failed:', error);
    return null;
  }
}

async function saveImage(url: string, filepath: string): Promise<boolean> {
  if (url.startsWith('data:image')) {
    const base64Data = url.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(filepath, buffer);
    const stats = fs.statSync(filepath);
    console.log(`✅ Saved: ${filepath} (${Math.round(stats.size / 1024)}KB)`);
    return true;
  }
  return false;
}

async function main() {
  console.log('🎉 Generating new bundle images\n');

  if (!fs.existsSync(BUNDLES_DIR)) {
    fs.mkdirSync(BUNDLES_DIR, { recursive: true });
  }

  for (const bundle of newBundles) {
    const filepath = path.join(BUNDLES_DIR, bundle.filename);
    const imageUrl = await generateImage(bundle.prompt);

    if (imageUrl) {
      await saveImage(imageUrl, filepath);
    } else {
      console.log(`⚠️  Failed: ${bundle.filename}`);
    }

    await new Promise(r => setTimeout(r, 3000));
  }

  console.log('\n✨ Done!');
}

main().catch(console.error);
