import { buildFoodPhotographyPrompt } from '../lib/image-generation';
import * as fs from 'fs';
import * as path from 'path';

// Event/Catering page image prompts
export const eventImagePrompts: Record<string, string> = {
  // Tier 1 - High Priority
  'wedding-taco-bar': buildFoodPhotographyPrompt(
    'elegant wedding taco bar setup, white linens, rose gold accents, beautiful taco station with warm tortillas, carnitas, grilled steak, fresh toppings in elegant white serving dishes, romantic outdoor venue, string lights, floral arrangements',
    'editorial'
  ),
  'quinceanera-catering': buildFoodPhotographyPrompt(
    'quinceañera celebration taco spread, pink and gold decorations, large elegant buffet setup with carnitas, barbacoa, rice and beans, beautiful presentation for Mexican celebration, warm festive lighting',
    'editorial'
  ),
  'graduation-party': buildFoodPhotographyPrompt(
    'graduation party taco bar, blue and gold school colors, festive decorations, taco station with multiple proteins, celebration setup in backyard, balloons, diploma decorations, summer party vibes',
    'modern'
  ),
  'corporate-catering': buildFoodPhotographyPrompt(
    'professional corporate taco bar in modern conference room, elegant chafing dishes, professionally labeled food stations, chicken carnitas and steak options, clean business casual setting, natural office lighting',
    'modern'
  ),
  'baby-shower-fiesta': buildFoodPhotographyPrompt(
    'baby shower taco bar with pink and gold decorations, cute cactus centerpieces, papel picado banners, colorful taco toppings arranged beautifully, festive baby celebration, bright cheerful atmosphere',
    'editorial'
  ),
  'tailgate-party': buildFoodPhotographyPrompt(
    'football tailgate taco bar setup in parking lot, portable table with taco spread, team colors decorations, slow cooker with carnitas, outdoor game day atmosphere, folding chairs, coolers, sports fans',
    'rustic'
  ),

  // Tier 2 - Medium Priority
  'sports-banquet': buildFoodPhotographyPrompt(
    'sports team banquet taco buffet in gymnasium or banquet hall, large scale taco bar setup, team trophies visible, athletes and families, multiple serving lines, generous portions of tacos and toppings',
    'editorial'
  ),
  'retirement-party': buildFoodPhotographyPrompt(
    'office retirement party taco celebration, warm festive conference room setup, farewell banners, elegant taco bar with premium toppings, colleagues gathering, celebratory atmosphere',
    'modern'
  ),
  'engagement-party': buildFoodPhotographyPrompt(
    'romantic engagement party taco bar, elegant fiesta theme, soft pink and gold decorations, fresh flowers, premium taco spread with beautiful presentation, engaged couple celebrating with family',
    'editorial'
  ),
  'company-picnic': buildFoodPhotographyPrompt(
    'outdoor company picnic taco bar under pop-up tents, large scale buffet setup, corporate employees enjoying tacos on picnic tables, sunny day, green grass, casual professional atmosphere',
    'photorealistic'
  ),
  'rehearsal-dinner': buildFoodPhotographyPrompt(
    'intimate rehearsal dinner taco bar, elegant rustic setting, warm string lights, beautiful taco spread on wooden tables, wedding party gathering, romantic pre-wedding celebration atmosphere',
    'rustic'
  ),

  // Tier 3 - Cultural/Religious
  'dia-de-los-muertos': buildFoodPhotographyPrompt(
    'Día de los Muertos taco celebration with traditional ofrenda altar, marigold flowers, sugar skulls, candles, beautiful spread of tacos and pan de muerto, purple and orange decorations, cultural Mexican celebration',
    'editorial'
  ),
  'las-posadas': buildFoodPhotographyPrompt(
    'Las Posadas Christmas celebration taco feast, Mexican holiday decorations, poinsettias, luminarias, warm ponche in cups, traditional taco spread with tamales, festive winter Mexican celebration',
    'rustic'
  ),
  'bautizo-celebration': buildFoodPhotographyPrompt(
    'baptism celebration taco party, white and light blue decorations, religious crosses, elegant family gathering, beautiful taco bar setup, tres leches cake, christening celebration atmosphere',
    'editorial'
  ),
  'first-communion': buildFoodPhotographyPrompt(
    'First Communion celebration taco party, white and gold decorations, religious motifs, family gathering around taco bar, elegant white tablecloths, celebration cake, church celebration atmosphere',
    'modern'
  ),

  // Tier 4 - Community Events
  'church-potluck': buildFoodPhotographyPrompt(
    'church fellowship hall taco potluck, community gathering around long tables with taco bar, families serving themselves, warm community atmosphere, diverse congregation enjoying meal together',
    'photorealistic'
  ),
  'school-fundraiser': buildFoodPhotographyPrompt(
    'school taco sale fundraiser in gymnasium or cafeteria, students and parents volunteering, taco assembly line, cash box, school banners, community event fundraising atmosphere',
    'photorealistic'
  ),
  'family-reunion': buildFoodPhotographyPrompt(
    'large family reunion taco bar in backyard, multiple generations gathered, long serving tables, grandparents to children, outdoor picnic setting, family banner, warm summer afternoon',
    'rustic'
  ),
  'block-party': buildFoodPhotographyPrompt(
    'neighborhood block party taco bar on closed street, folding tables with taco spread, neighbors gathering, children playing, string lights between houses, community celebration atmosphere',
    'photorealistic'
  ),
};

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const IMAGE_MODEL = 'google/gemini-2.5-flash-image';

async function generateAndSaveImage(name: string, prompt: string): Promise<boolean> {
  try {
    console.log(`\n🎨 Generating: ${name}...`);
    console.log(`   Prompt: ${prompt.substring(0, 100)}...`);

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://lonestartortillas.com',
        'X-Title': 'Lonestar Tortillas Event Images'
      },
      body: JSON.stringify({
        model: IMAGE_MODEL,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Generate a high-quality food photography image: ${prompt}. This is for a website hero image. Make it warm, inviting, and appetizing. Aspect ratio 16:9, landscape orientation.`
              }
            ]
          }
        ],
        provider: {
          order: ['Google']
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`   ❌ API Error: ${response.status} - ${errorText}`);
      return false;
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message;

    // Check for images array in the response (Gemini 2.5 format)
    if (message?.images && Array.isArray(message.images) && message.images.length > 0) {
      const imageObj = message.images[0];

      // Get the image URL from image_url.url
      let base64String = imageObj.image_url?.url || '';

      // If it's a data URI, extract the base64 part
      const dataUriMatch = base64String.match(/^data:image\/\w+;base64,(.+)$/);
      if (dataUriMatch) {
        base64String = dataUriMatch[1];
      }

      if (base64String) {
        // Save to file
        const filename = `guide-${name}.webp`;
        const filepath = path.join(process.cwd(), 'public', 'images', 'guides', filename);

        // Ensure directory exists
        const dir = path.dirname(filepath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        // Write file
        fs.writeFileSync(filepath, Buffer.from(base64String, 'base64'));
        console.log(`   ✅ Saved: ${filepath}`);
        return true;
      }
    }

    // Check for content array with image_url (older format)
    const content = message?.content;
    if (Array.isArray(content)) {
      for (const item of content) {
        if (item.type === 'image_url' && item.image_url?.url) {
          const base64Data = item.image_url.url;
          const base64Match = base64Data.match(/^data:image\/\w+;base64,(.+)$/);
          const imageData = base64Match ? base64Match[1] : base64Data;

          const filename = `guide-${name}.webp`;
          const filepath = path.join(process.cwd(), 'public', 'images', 'guides', filename);

          const dir = path.dirname(filepath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }

          fs.writeFileSync(filepath, Buffer.from(imageData, 'base64'));
          console.log(`   ✅ Saved: ${filepath}`);
          return true;
        }
      }
    }

    // If we got here, log the response for debugging
    console.log(`   ⚠️  Response structure:`, JSON.stringify(data, null, 2).substring(0, 500));
    return false;

  } catch (error) {
    console.error(`   ❌ Error generating ${name}:`, error);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting event image generation...\n');
  console.log(`Using API Key: ${OPENROUTER_API_KEY.substring(0, 20)}...`);
  console.log(`Total images to generate: ${Object.keys(eventImagePrompts).length}\n`);

  const events = Object.entries(eventImagePrompts);
  let successCount = 0;
  let failCount = 0;
  let skippedCount = 0;

  for (const [name, prompt] of events) {
    // Skip if image already exists
    const filepath = path.join(process.cwd(), 'public', 'images', 'guides', `guide-${name}.webp`);
    if (fs.existsSync(filepath)) {
      console.log(`\n⏭️  Skipping ${name} (already exists)`);
      skippedCount++;
      continue;
    }

    const success = await generateAndSaveImage(name, prompt);
    if (success) successCount++;
    else failCount++;

    // Rate limit: wait 3 seconds between requests
    console.log('   ⏳ Waiting 3 seconds...');
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  console.log(`\n✨ Complete!`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ⏭️  Skipped: ${skippedCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
}

main().catch(console.error);
