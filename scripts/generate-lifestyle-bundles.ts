#!/usr/bin/env npx ts-node
/**
 * Generate Lifestyle/Party-Themed Bundle Images
 * Creates engaging party/gathering scenes for care packages
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

// Lifestyle bundle images - PEOPLE-focused party/gathering themes
// IMPORTANT: These prompts emphasize people and gatherings, NOT product packaging
const lifestyleBundles = [
  {
    filename: 'taco-night-kit.webp',
    prompt: 'FOCUS ON PEOPLE: Heartwarming family taco night, mother and father with two children ages 8 and 12, all smiling and laughing together around a rustic wooden dining table, the family is building tacos with their hands, tortillas and colorful toppings visible but NO product packaging or labels visible, warm edison bulb lighting overhead, authentic candid moment of family togetherness, professional lifestyle photography, shallow depth of field on happy faces'
  },
  {
    filename: 'breakfast-taco-box.webp',
    prompt: 'FOCUS ON PEOPLE: Young couple in their 30s cooking breakfast tacos together in a bright modern kitchen, morning golden hour sunlight streaming through windows, man flipping tortilla on comal while woman cracks eggs, both smiling at each other lovingly, coffee steam rising, cozy intimate moment, NO visible product labels or packaging, lifestyle photography, authentic romance'
  },
  {
    filename: 'fajita-fiesta.webp',
    prompt: 'FOCUS ON PEOPLE: Five diverse friends in their 30s gathered around an outdoor grill at sunset, one person grilling sizzling fajitas, others holding drinks and laughing, string lights above, Texas backyard setting, tortillas on a plate nearby, people are the main focus NOT the food, warm golden hour lighting, authentic friendship moment, lifestyle photography'
  },
  {
    filename: 'ultimate-texas-box.webp',
    prompt: 'FOCUS ON PEOPLE: Group of six diverse friends watching football on TV, sitting on a comfortable sectional couch, cheering with arms raised, some holding tacos and chips, genuine excitement and joy on their faces, living room with Texas decor, sports game visible on TV, coffee table with food spread but NO visible product labels, lifestyle photography, game day celebration'
  },
  {
    filename: 'texas-legends-box.webp',
    prompt: 'FOCUS ON PEOPLE: Large Texas backyard BBQ gathering with 15 people across three generations, grandparents, parents, and children, some playing lawn games, others at picnic tables eating, pitmaster at smoker in background, Texas flag visible, golden sunset lighting, authentic multigenerational celebration, NO visible product packaging or labels, professional lifestyle photography capturing joy of community'
  }
];

async function generateImage(prompt: string): Promise<string | null> {
  const fullPrompt = `Generate a photorealistic lifestyle image: ${prompt}. CRITICAL REQUIREMENTS: Focus primarily on PEOPLE and their emotions, NOT on products. Do NOT generate any product packaging, bottles, bags, boxes, or labels. Do NOT include any text, brand names, or logos in the image. Show authentic human moments - families, friends, gatherings. Professional lifestyle photography style, shallow depth of field on people's faces, warm natural colors, high resolution.`;

  console.log(`\n🎨 Generating: ${prompt.substring(0, 60)}...`);

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

    // Extract image from response
    const message = data.choices?.[0]?.message;

    // Check for base64 image in images array
    if (message?.images && message.images.length > 0) {
      const img = message.images[0];
      if (img.b64_json) {
        return `data:image/png;base64,${img.b64_json}`;
      }
      return img.image_url?.url || img.url || img;
    }

    // Check for base64 in content
    if (message?.content && message.content.startsWith('data:image')) {
      return message.content;
    }

    console.error('❌ No image found in response');
    console.log('Response:', JSON.stringify(data, null, 2).substring(0, 500));
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
  console.log('🎉 Generating lifestyle bundle images\n');
  console.log(`📁 Output directory: ${BUNDLES_DIR}\n`);

  if (!fs.existsSync(BUNDLES_DIR)) {
    fs.mkdirSync(BUNDLES_DIR, { recursive: true });
  }

  let successCount = 0;

  for (const bundle of lifestyleBundles) {
    const filepath = path.join(BUNDLES_DIR, bundle.filename);

    const imageUrl = await generateImage(bundle.prompt);

    if (imageUrl) {
      const saved = await saveImage(imageUrl, filepath);
      if (saved) successCount++;
    } else {
      console.log(`⚠️  Failed to generate ${bundle.filename}`);
    }

    // Rate limit: wait 3 seconds between requests
    await new Promise(r => setTimeout(r, 3000));
  }

  console.log(`\n✨ Complete! Generated ${successCount}/${lifestyleBundles.length} lifestyle images`);
}

main().catch(console.error);
