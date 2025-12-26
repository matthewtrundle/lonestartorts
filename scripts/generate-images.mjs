import fs from 'fs';
import path from 'path';
import https from 'https';

const OPENROUTER_API_KEY = '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';

const recipes = [
  {
    name: 'tortilla-soup',
    prompt: 'Professional food photography of authentic Mexican tortilla soup in a rustic clay bowl, topped with crispy tortilla strips, avocado, fresh cilantro, queso fresco, and lime wedge. Rich red tomato broth with shredded chicken visible. Warm lighting, overhead angle, wooden table background. Appetizing, editorial quality food photography.'
  },
  {
    name: 'birria-tacos',
    prompt: 'Professional food photography of Mexican birria tacos (quesabirria) on a rustic plate. Three crispy red-stained corn tortillas filled with tender braised beef and melted cheese, served with a small bowl of rich consomé dipping sauce. Garnished with fresh cilantro and diced onion. Warm lighting, appetizing steam rising, editorial quality food photography.'
  },
  {
    name: 'chilaquiles',
    prompt: 'Professional food photography of Mexican chilaquiles verdes on a ceramic plate. Crispy tortilla chips covered in green salsa verde, topped with a sunny side up fried egg, Mexican crema drizzle, crumbled queso fresco, sliced radish, and fresh cilantro. Breakfast setting, warm natural lighting, editorial quality food photography.'
  },
  {
    name: 'homemade-chips',
    prompt: 'Professional food photography of golden crispy homemade tortilla chips in a rustic basket lined with paper. Perfectly fried corn tortilla triangles with visible salt crystals, some chips showing bubbled texture. Side of fresh salsa and guacamole in small bowls. Natural lighting, appetizing, editorial quality food photography.'
  },
  {
    name: 'huevos-rancheros',
    prompt: 'Professional food photography of authentic huevos rancheros breakfast. Two sunny side up eggs on lightly fried corn tortillas, smothered in red ranchero sauce, topped with fresh cilantro, crumbled queso fresco, and sliced avocado. Refried beans on the side. Colorful Mexican plate, warm morning light, editorial quality food photography.'
  },
  {
    name: 'flautas',
    prompt: 'Professional food photography of crispy chicken flautas (taquitos) on a white plate. Golden fried rolled corn tortillas arranged in a row, drizzled with Mexican crema and salsa verde, topped with shredded lettuce, crumbled queso fresco. Small bowls of guacamole and sour cream on the side. Editorial quality food photography.'
  },
  {
    name: 'tostadas',
    prompt: 'Professional food photography of Mexican chicken tostadas. Flat crispy fried corn tortillas topped with refried beans, shredded chicken, lettuce, diced tomato, shredded cheese, sour cream, and sliced jalapeño. Two tostadas on a colorful Mexican plate. Bright lighting, editorial quality food photography.'
  },
  {
    name: 'bunuelos',
    prompt: 'Professional food photography of Mexican bunuelos (crispy fried dough). Golden brown thin crispy discs coated in cinnamon sugar, stacked artfully on a rustic plate. Cinnamon sticks and piloncillo cone visible in background. Warm holiday lighting, sprinkled cinnamon sugar visible, editorial quality dessert photography.'
  },
  {
    name: 'sopes',
    prompt: 'Professional food photography of authentic Mexican sopes. Thick corn masa cups with pinched edges, topped with refried beans, shredded carnitas, lettuce, crumbled queso fresco, Mexican crema drizzle, and salsa. Three sopes on a rustic plate, warm lighting, editorial quality food photography.'
  },
  {
    name: 'nachos',
    prompt: 'Professional food photography of loaded nachos supreme on a large sheet pan. Layers of golden tortilla chips covered with melted cheese, seasoned ground beef, black beans, pico de gallo, jalapeños, sour cream dollops, and guacamole. Gooey melted cheese pull visible. Overhead angle, editorial quality food photography.'
  }
];

async function generateImage(recipe) {
  console.log(`\nGenerating image for: ${recipe.name}`);

  const requestBody = JSON.stringify({
    model: 'openai/gpt-5-image',
    messages: [
      {
        role: 'user',
        content: `Generate this image: ${recipe.prompt}`
      }
    ]
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'openrouter.ai',
      port: 443,
      path: '/api/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://lonestartortillas.com',
        'X-Title': 'Lonestar Tortillas'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.error) {
            console.error(`Error for ${recipe.name}:`, response.error.message || response.error);
            reject(response.error);
          } else if (response.choices && response.choices[0]) {
            const content = response.choices[0].message?.content;
            // Check for image URL or base64 in the response
            if (content) {
              // Look for image data in the response
              const urlMatch = content.match(/https:\/\/[^\s"]+\.(png|jpg|jpeg|webp)/i);
              if (urlMatch) {
                console.log(`Found URL for ${recipe.name}`);
                resolve({ url: urlMatch[0] });
              } else {
                // Check if it's a multimodal response with image
                const parts = response.choices[0].message?.parts || response.choices[0].message?.content;
                if (Array.isArray(parts)) {
                  for (const part of parts) {
                    if (part.type === 'image' && part.image_url) {
                      resolve({ url: part.image_url.url || part.image_url });
                      return;
                    }
                  }
                }
                console.log(`Response for ${recipe.name}:`, JSON.stringify(response.choices[0].message, null, 2));
                resolve({ content });
              }
            } else {
              console.log(`Full response for ${recipe.name}:`, JSON.stringify(response, null, 2).slice(0, 500));
              reject(new Error('No content in response'));
            }
          } else {
            console.error(`Unexpected response for ${recipe.name}:`, data.slice(0, 500));
            reject(new Error('Unexpected response format'));
          }
        } catch (e) {
          console.error(`Parse error for ${recipe.name}:`, e.message);
          console.error('Raw data:', data.slice(0, 500));
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(requestBody);
    req.end();
  });
}

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    // Handle both http and https
    const protocol = url.startsWith('https') ? https : require('http');
    const file = fs.createWriteStream(filepath);

    protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Saved: ${filepath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function main() {
  const outputDir = path.join(process.cwd(), 'public/images/recipes');

  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Starting image generation with OpenRouter...');
  console.log(`Output directory: ${outputDir}`);
  console.log('Using model: openai/gpt-5-image');

  for (const recipe of recipes) {
    try {
      const result = await generateImage(recipe);

      if (result.url) {
        // Download the image
        const ext = result.url.includes('.png') ? 'png' : 'webp';
        const filepath = path.join(outputDir, `${recipe.name}.${ext}`);
        await downloadImage(result.url, filepath);
      } else if (result.content) {
        console.log(`Got text response for ${recipe.name} - model may not support direct image generation`);
      }

      // Small delay between requests to avoid rate limiting
      await new Promise(r => setTimeout(r, 3000));
    } catch (error) {
      console.error(`Failed to generate ${recipe.name}:`, error.message || error);
    }
  }

  console.log('\nImage generation complete!');
}

main().catch(console.error);
