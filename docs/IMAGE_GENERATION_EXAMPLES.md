# Image Generation Usage Examples

## Quick Examples

### 1. Generate Single Recipe Image via API

```bash
# Start the dev server
npm run dev

# Generate carne asada taco image
curl -X POST http://localhost:3000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{
    "recipe": "carneAsadaTacos",
    "width": 1024,
    "height": 768,
    "style": "rustic"
  }'
```

**Response:**
```json
{
  "success": true,
  "image": {
    "url": "https://generated-image-url.com/...",
    "prompt": "grilled carne asada tacos on corn tortillas...",
    "model": "black-forest-labs/flux-1.1-pro",
    "timestamp": 1706140800000
  }
}
```

### 2. Generate with Custom Prompt

```bash
curl -X POST http://localhost:3000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{
    "custom": "authentic Mexican street food scene, colorful tacos with fresh toppings, wooden serving board, natural lighting",
    "width": 1920,
    "height": 1080,
    "style": "editorial"
  }'
```

### 3. Generate All Recipe Images (Script)

```bash
npx tsx scripts/generate-recipe-images.ts
```

**Output:**
```
🎨 Lonestar Tortillas - Recipe Image Generation
================================================

📋 Recipes to generate: 8
   carneAsadaTacos, fishTacos, shrimpTacos, ...

🚀 Starting image generation...

📦 Processing batch 1/3
✅ Generated: carneAsadaTacos
✅ Generated: fishTacos
✅ Generated: shrimpTacos
⏳ Waiting 2 seconds before next batch...

📦 Processing batch 2/3
✅ Generated: beanVeggieTacos
✅ Generated: cheeseEnchiladas
✅ Generated: tortillaStack
...

✅ Generation Complete!
Total images generated: 8/8
```

### 4. Programmatic Usage in TypeScript

```typescript
import { generateImage, recipePrompts } from '@/lib/image-generation';

// Generate using predefined recipe prompt
async function generateCarneAsadaImage() {
  const result = await generateImage({
    prompt: recipePrompts.carneAsadaTacos(),
    width: 1024,
    height: 768,
    style: 'rustic'
  });

  console.log('Image URL:', result.url);
  return result;
}

// Generate with custom prompt
async function generateCustomImage() {
  const result = await generateImage({
    prompt: 'Close-up of melted cheese on quesadilla',
    width: 800,
    height: 600,
    style: 'photorealistic'
  });

  return result;
}
```

### 5. Batch Generation with Error Handling

```typescript
import { generateRecipeImages } from '@/lib/image-generation';

async function batchGenerate() {
  const recipes = [
    'carneAsadaTacos',
    'fishTacos',
    'shrimpTacos'
  ];

  try {
    // Generate in batches of 3 with 2-second delays
    const results = await generateRecipeImages(recipes, 3);

    results.forEach((image, recipe) => {
      console.log(`${recipe}: ${image.url}`);
    });

    return results;
  } catch (error) {
    console.error('Batch generation failed:', error);
    throw error;
  }
}
```

## Real-World Workflow

### Step 1: Generate Images

```bash
# Generate all recipe images
npx tsx scripts/generate-recipe-images.ts > generation-log.txt

# Review the log
cat generation-log.txt
```

### Step 2: Download and Organize

```bash
# Create directories
mkdir -p public/images/recipes
mkdir -p public/images/guides
mkdir -p public/images/products

# Download images (example using curl)
curl -o public/images/recipes/carne-asada-tacos.jpg \
  "https://generated-url.com/image.jpg"
```

### Step 3: Optimize Images

```bash
# Install sharp if not already
npm install sharp

# Optimize images
npx tsx scripts/optimize-images.ts
```

```typescript
// scripts/optimize-images.ts
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

async function optimizeImage(inputPath: string) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(
    path.dirname(inputPath),
    `${filename}.webp`
  );

  await sharp(inputPath)
    .resize(1024, 768, { fit: 'inside' })
    .webp({ quality: 85 })
    .toFile(outputPath);

  console.log(`✅ Optimized: ${outputPath}`);
}

// Optimize all images in recipes directory
const recipesDir = 'public/images/recipes';
const files = await fs.readdir(recipesDir);

for (const file of files) {
  if (file.endsWith('.jpg') || file.endsWith('.png')) {
    await optimizeImage(path.join(recipesDir, file));
  }
}
```

### Step 4: Update Recipe Pages

```typescript
// app/recipes/carne-asada-tacos/page.tsx

export default function CarneAsadaTacos() {
  return (
    <main>
      {/* Add generated image */}
      <Image
        src="/images/recipes/carne-asada-tacos.webp"
        alt="Carne asada tacos with grilled steak and fresh toppings"
        width={1024}
        height={768}
        priority
        className="rounded-lg"
      />
      {/* Rest of the content */}
    </main>
  );
}
```

## Testing the API Route

### List Available Recipes

```bash
curl http://localhost:3000/api/generate-image
```

**Response:**
```json
{
  "availableRecipes": [
    "carneAsadaTacos",
    "fishTacos",
    "shrimpTacos",
    "beanVeggieTacos",
    "cheeseEnchiladas",
    "tortillaStack",
    "flourTortillas",
    "tortillaProcess"
  ],
  "usage": "POST to /api/generate-image with { recipe: \"name\" }"
}
```

### Generate Specific Recipe

```bash
# Carne Asada Tacos
curl -X POST http://localhost:3000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{"recipe": "carneAsadaTacos"}'

# Fish Tacos with custom size
curl -X POST http://localhost:3000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{
    "recipe": "fishTacos",
    "width": 1920,
    "height": 1080
  }'

# Custom prompt with editorial style
curl -X POST http://localhost:3000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{
    "custom": "artisanal flour tortillas on marble counter, natural light",
    "style": "editorial"
  }'
```

## Advanced Patterns

### Retry with Exponential Backoff

```typescript
async function generateWithRetry(
  options: ImageGenerationOptions,
  maxRetries = 3
) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await generateImage(options);
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(`Failed after ${maxRetries} attempts: ${error}`);
      }

      const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
      console.log(`⏳ Retry ${attempt}/${maxRetries} in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

### Parallel Generation with Concurrency Limit

```typescript
import pLimit from 'p-limit';

async function generateInParallel(recipes: string[]) {
  const limit = pLimit(3); // Max 3 concurrent requests

  const promises = recipes.map(recipe =>
    limit(async () => {
      try {
        const prompt = recipePrompts[recipe]();
        const result = await generateImage({ prompt });
        console.log(`✅ ${recipe}`);
        return { recipe, result };
      } catch (error) {
        console.error(`❌ ${recipe}:`, error);
        return { recipe, error };
      }
    })
  );

  return await Promise.all(promises);
}
```

## Cost Tracking

```typescript
let totalCost = 0;
const COST_PER_IMAGE = 0.04; // Flux 1.1 Pro pricing

async function trackGeneration(recipe: string) {
  console.log(`🎨 Generating ${recipe}...`);

  const result = await generateImage({
    prompt: recipePrompts[recipe]()
  });

  totalCost += COST_PER_IMAGE;

  console.log(`✅ ${recipe} - Total cost: $${totalCost.toFixed(2)}`);

  return result;
}
```

## Common Troubleshooting

### Issue: "API key invalid"

```bash
# Check environment variable
echo $OPENROUTER_API_KEY

# Or in Node.js
node -e "console.log(process.env.OPENROUTER_API_KEY)"
```

**Solution:** Ensure API key is set in `.env.local`

### Issue: "Rate limit exceeded"

**Solution:** Add delays between requests:

```typescript
// Add 2-second delay between batches
await new Promise(resolve => setTimeout(resolve, 2000));
```

### Issue: "Generated image looks wrong"

**Solution:** Refine the prompt:

```typescript
// Too vague ❌
"taco"

// Better ✅
"grilled carne asada taco on corn tortilla with cilantro and onion, rustic wooden table, natural lighting, professional food photography"
```

## Next Steps

1. Generate images for all 11 recipes
2. Optimize and convert to WebP
3. Update recipe pages with image components
4. Test performance with Lighthouse
5. Deploy to production

---

**See also:**
- [IMAGE_GENERATION.md](./IMAGE_GENERATION.md) - Full best practices guide
- [/lib/image-generation.ts](../lib/image-generation.ts) - Implementation
- [/scripts/generate-recipe-images.ts](../scripts/generate-recipe-images.ts) - Batch script
