import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';

/**
 * Fetch placeholder images from Unsplash Source API
 * No authentication required for basic usage
 */

interface ImageMapping {
  filename: string;
  keywords: string;
  description: string;
}

const guideImages: ImageMapping[] = [
  {
    filename: 'guide-best-tortillas-for-every-dish.webp',
    keywords: 'tacos,mexican food,tortillas',
    description: 'Best Tortillas for Every Dish'
  },
  {
    filename: 'guide-corn-vs-flour-tortillas.webp',
    keywords: 'corn tortilla,flour tortilla',
    description: 'Corn vs Flour Tortillas'
  },
  {
    filename: 'guide-gluten-free-tortillas.webp',
    keywords: 'gluten free,healthy food,corn tortillas',
    description: 'Gluten-Free Tortillas'
  },
  {
    filename: 'guide-homemade-vs-store-bought.webp',
    keywords: 'homemade tortillas,cooking,kitchen',
    description: 'Homemade vs Store-Bought'
  },
  {
    filename: 'guide-how-to-crisp-tortillas.webp',
    keywords: 'crispy tacos,taco shells,cooking',
    description: 'How to Crisp Tortillas'
  },
  {
    filename: 'guide-how-to-freeze-tortillas.webp',
    keywords: 'food storage,kitchen organization',
    description: 'How to Freeze Tortillas'
  },
  {
    filename: 'guide-how-to-make-tortillas.webp',
    keywords: 'making tortillas,cooking process,hands',
    description: 'How to Make Tortillas'
  },
  {
    filename: 'guide-how-to-reheat-tortillas.webp',
    keywords: 'cooking tortillas,stovetop,kitchen',
    description: 'How to Reheat Tortillas'
  },
  {
    filename: 'guide-how-to-store-tortillas.webp',
    keywords: 'food storage,pantry,organization',
    description: 'How to Store Tortillas'
  },
  {
    filename: 'guide-tortilla-nutrition.webp',
    keywords: 'healthy food,nutrition,vegetables',
    description: 'Tortilla Nutrition'
  },
  {
    filename: 'guide-tortilla-sizes.webp',
    keywords: 'tortillas,variety,flatbread',
    description: 'Tortilla Sizes'
  },
];

const blogImages: ImageMapping[] = [
  {
    filename: 'blog-marias-story.webp',
    keywords: 'grandmother,cooking,traditional kitchen',
    description: "Maria's Story"
  },
  {
    filename: 'blog-nixtamalization-science.webp',
    keywords: 'corn,ingredients,food science',
    description: 'Nixtamalization Science'
  },
  {
    filename: 'blog-texas-tortilla-traditions.webp',
    keywords: 'texas,mexican food,traditional cooking',
    description: 'Texas Tortilla Traditions'
  },
];

async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file if error
      reject(err);
    });
  });
}

async function fetchPlaceholderImage(mapping: ImageMapping): Promise<boolean> {
  try {
    console.log(`Fetching: ${mapping.description}...`);

    // Unsplash Source API - get a 1024x768 image matching keywords
    const unsplashUrl = `https://source.unsplash.com/1024x768/?${mapping.keywords}`;

    const outputPath = path.join(process.cwd(), 'public', 'images', 'generated', mapping.filename);

    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await downloadImage(unsplashUrl, outputPath);

    console.log(`✓ ${mapping.filename}: Downloaded successfully`);
    return true;
  } catch (error) {
    console.error(`✗ ${mapping.filename}:`, error);
    return false;
  }
}

async function main() {
  console.log('Fetching placeholder images from Unsplash...\n');

  const allImages = [...guideImages, ...blogImages];
  let successCount = 0;
  let failCount = 0;

  console.log('=== GUIDE IMAGES ===\n');
  for (const mapping of guideImages) {
    const success = await fetchPlaceholderImage(mapping);
    if (success) successCount++;
    else failCount++;

    // Rate limit: wait 1 second between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n=== BLOG IMAGES ===\n');
  for (const mapping of blogImages) {
    const success = await fetchPlaceholderImage(mapping);
    if (success) successCount++;
    else failCount++;

    // Rate limit: wait 1 second between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log(`\n✓ Complete: ${successCount} successful, ${failCount} failed`);
  console.log('\nNote: These are placeholder images from Unsplash.');
  console.log('You can replace them with custom generated images when OpenRouter API is configured.');
}

main().catch(console.error);
