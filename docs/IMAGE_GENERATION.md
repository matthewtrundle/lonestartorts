# Image Generation Best Practices

## Overview

Lonestar Tortillas uses **OpenRouter API** for generating high-quality food photography images for recipes, guides, and product pages. This document outlines our best practices and implementation.

## Quick Start

### Environment Setup

Add to `.env.local`:
```bash
OPENROUTER_API_KEY=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
```

### Generate Images via API

```bash
# List available recipes
curl http://localhost:3000/api/generate-image

# Generate a specific recipe image
curl -X POST http://localhost:3000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{"recipe": "carneAsadaTacos", "width": 1024, "height": 768}'
```

### Generate All Recipe Images

```bash
npx tsx scripts/generate-recipe-images.ts
```

## Best Practices

### 1. Prompt Engineering for Food Photography

**Good prompts are:**
- ✅ Specific and detailed
- ✅ Include technical specifications
- ✅ Describe lighting and composition
- ✅ Specify quality requirements
- ✅ Avoid copyrighted terms/brands

**Example Prompt Structure:**
```
[Subject], professional food photography, natural lighting,
shallow depth of field, macro detail, appetizing presentation,
high resolution, 8K quality, sharp focus, vibrant colors,
no text, no watermarks, no logos
```

**Our Template:**
```typescript
buildFoodPhotographyPrompt(
  'grilled carne asada tacos on corn tortillas, charred steak',
  'rustic' // style: photorealistic | editorial | rustic | modern
)
```

### 2. Rate Limiting

**Respect API limits:**
- Process in batches (3-5 images at a time)
- Add 2-3 second delays between batches
- Implement exponential backoff for retries

**Implementation:**
```typescript
// Generate in batches of 3
for (let i = 0; i < recipes.length; i += 3) {
  await Promise.all(batch);
  await sleep(2000); // Wait between batches
}
```

### 3. Image Specifications

**Dimensions:**
- Hero images: `1920x1080` (16:9)
- Recipe cards: `1024x768` (4:3)
- Product shots: `1024x1024` (1:1)
- Mobile optimized: `800x600` (4:3)

**Quality:**
- Request high resolution (1024px minimum)
- Specify "8K quality, sharp focus"
- Use professional models (flux-1.1-pro recommended)

### 4. File Management

**Naming Convention:**
```
/public/images/
  ├── recipes/
  │   ├── carne-asada-tacos-hero.webp
  │   ├── fish-tacos-step-1.webp
  │   └── shrimp-tacos-final.webp
  ├── guides/
  │   └── how-to-freeze-tortillas-header.webp
  └── products/
      ├── corn-tortillas-stack.webp
      └── flour-tortillas-closeup.webp
```

**Optimization Pipeline:**
1. Download from OpenRouter URL
2. Compress (use Sharp or imagemin)
3. Convert to WebP format
4. Generate multiple sizes (srcset)
5. Add to Next.js public directory

### 5. Error Handling

**Graceful Degradation:**
```typescript
try {
  const image = await generateImage(options);
  return image.url;
} catch (error) {
  console.error('Image generation failed:', error);
  // Return placeholder image
  return '/images/placeholder-recipe.webp';
}
```

**Retry Strategy:**
```typescript
async function generateWithRetry(options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await generateImage(options);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(Math.pow(2, i) * 1000); // Exponential backoff
    }
  }
}
```

## Available Recipe Prompts

Our library includes optimized prompts for:

- `carneAsadaTacos` - Grilled steak tacos
- `fishTacos` - Beer-battered fish tacos
- `shrimpTacos` - Grilled shrimp tacos
- `beanVeggieTacos` - Vegetarian tacos
- `cheeseEnchiladas` - Baked enchiladas
- `tortillaStack` - Corn tortilla stack
- `flourTortillas` - Flour tortilla stack
- `tortillaProcess` - Making tortillas

## Style Options

### Photorealistic
Best for: Recipe hero images, product shots
```
Professional food photography, natural lighting, shallow depth of field
```

### Editorial
Best for: Magazine-style content, featured recipes
```
Magazine-quality, styled composition, clean aesthetic, high-end
```

### Rustic
Best for: Traditional recipes, homestyle content
```
Rustic setting, wooden table, natural textures, warm lighting
```

### Modern
Best for: Contemporary recipes, clean presentation
```
Modern minimalist, clean white background, bright lighting
```

## Image Quality Checklist

Before using a generated image:

- [ ] Subject is in sharp focus
- [ ] Lighting is natural and appealing
- [ ] Colors are vibrant but realistic
- [ ] Composition follows rule of thirds
- [ ] No text, watermarks, or logos visible
- [ ] No unintended objects in frame
- [ ] Food looks appetizing and fresh
- [ ] Image resolution is adequate (1024px+)

## Common Issues

### Issue: Images look artificial
**Solution:** Add more natural descriptors to prompt:
```
"imperfect, organic, natural imperfections, realistic food styling"
```

### Issue: Wrong composition
**Solution:** Specify camera angle and framing:
```
"overhead view, 45-degree angle, centered composition"
```

### Issue: Poor lighting
**Solution:** Be explicit about lighting:
```
"natural window light, soft shadows, golden hour, diffused lighting"
```

### Issue: Food doesn't look appetizing
**Solution:** Use action words and steam/freshness indicators:
```
"freshly cooked, steam rising, glistening, juicy, vibrant colors"
```

## Production Workflow

### 1. Generate Images
```bash
npm run generate:images
```

### 2. Download and Optimize
```bash
npm run optimize:images
```

### 3. Update Image References
Update recipe/guide pages with new image paths

### 4. Test Performance
```bash
npm run lighthouse -- --url=/recipes/carne-asada-tacos
```

### 5. Deploy
Images automatically deployed with Next.js build

## Cost Management

**OpenRouter Pricing:**
- Flux 1.1 Pro: ~$0.04 per image
- Stable Diffusion XL: ~$0.002 per image

**Budget Recommendations:**
- Generate images in batches
- Cache generated images (never regenerate)
- Use cheaper models for thumbnails
- Use expensive models for hero images only

**Example Budget:**
- 11 recipes × 2 images each = 22 images
- 10 guides × 1 image each = 10 images
- 2 product pages × 3 images each = 6 images
- **Total: ~38 images × $0.04 = ~$1.52**

## Security Best Practices

1. **Never commit API keys** - Use environment variables
2. **Rate limit the API route** - Prevent abuse
3. **Validate all inputs** - Sanitize prompts
4. **Log all generations** - Audit trail for debugging
5. **Implement CORS** - Restrict API access to your domain

## Future Improvements

- [ ] Automatic image optimization pipeline
- [ ] Multi-resolution generation (srcset)
- [ ] A/B testing different prompts
- [ ] User feedback loop for image quality
- [ ] Automated alt text generation
- [ ] Image CDN integration
- [ ] Lazy loading implementation
- [ ] Progressive image loading (blur-up)

## Resources

- [OpenRouter Docs](https://openrouter.ai/docs)
- [Flux 1.1 Pro Model](https://openrouter.ai/models/black-forest-labs/flux-1.1-pro)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [WebP Optimization Guide](https://developers.google.com/speed/webp)

## Support

For issues with image generation:
1. Check OpenRouter API status
2. Verify API key is valid
3. Review error logs in console
4. Check rate limits haven't been exceeded
5. Try with simpler prompt first

---

**Last Updated:** 2025-01-24
**Maintained By:** Lonestar Tortillas Dev Team
