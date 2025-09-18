#!/usr/bin/env python3
"""
Generate epic, cinematic images for Tortilla Rodeo Co.
"""
import sys
import os
from pathlib import Path
import shutil

# Add the image generator tool path to Python path
sys.path.insert(0, '/Users/mattrundle/Documents/image-generator-tool')

# Set environment variable for the API key
os.environ['GEMINI_API_KEY'] = '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'

from gemini_image_sdk import ImageGenerator, Config

# Create output directory for generated images
output_dir = Path('/Users/mattrundle/Documents/HEBtorts/public/images')
output_dir.mkdir(parents=True, exist_ok=True)

# Epic image generation requests
epic_images = [
    {
        'name': 'masa-preparation',
        'prompt': 'Cinematic close-up of hands preparing traditional corn masa dough, dramatic lighting, artisanal process, steam rising, golden hour lighting, professional food photography, shallow depth of field, premium quality, 8k resolution'
    },
    {
        'name': 'texas-field',
        'prompt': 'Epic wide shot of golden corn fields in Texas at sunset, dramatic sky, lone windmill silhouette, cinematic landscape photography, warm golden tones, professional grade, atmospheric haze, ultra high resolution'
    },
    {
        'name': 'tortilla-stack',
        'prompt': 'Artistic macro shot of perfectly stacked fresh corn tortillas with visible texture and char marks, dramatic side lighting creating shadows, minimalist black background, premium product photography, ultra sharp detail'
    },
    {
        'name': 'artisan-hands',
        'prompt': 'Black and white photograph of weathered artisan hands pressing tortilla dough on traditional comal, dramatic contrast, fine art photography style, capturing the craft and tradition, professional lighting'
    },
    {
        'name': 'fresh-ingredients',
        'prompt': 'Overhead flat lay of premium tortilla ingredients - heirloom corn, lime, salt arranged artistically on dark slate, moody lighting, editorial food photography style, rich textures, professional styling'
    },
    {
        'name': 'cooking-flame',
        'prompt': 'Dramatic shot of tortilla cooking over open flame on traditional comal, fire glow, smoke wisps, dark moody background, cinematic lighting, capturing the authentic cooking process, high contrast'
    },
    {
        'name': 'heritage-kitchen',
        'prompt': 'Atmospheric wide shot of traditional Texas kitchen with hanging dried corn, vintage tools, warm window light streaming in, rustic authentic setting, documentary style photography, rich warm tones'
    },
    {
        'name': 'product-hero',
        'prompt': 'Premium product shot of tortillas arranged in elegant spiral pattern on marble surface, professional studio lighting, minimalist aesthetic, luxury food photography, perfect for hero section'
    },
    {
        'name': 'texture-detail',
        'prompt': 'Extreme macro shot showing the beautiful texture and bubbles of a perfectly cooked flour tortilla, artistic lighting highlighting every detail, abstract food art photography, museum quality'
    },
    {
        'name': 'ranch-sunset',
        'prompt': 'Epic cinematic shot of Texas ranch at golden hour with rustic barn and fence in foreground, vast sky with dramatic clouds, warm nostalgic tones, professional landscape photography, establishing shot feel'
    }
]

print("🎬 Generating epic imagery for Tortilla Rodeo Co...")
print("=" * 60)

success_count = 0
failed_images = []

for i, image in enumerate(epic_images, 1):
    try:
        print(f"\n📸 [{i}/{len(epic_images)}] Generating: {image['name']}")
        print(f"   Style: Cinematic & Premium")

        # Reinitialize for each image to avoid event loop issues
        config = Config.from_env()
        generator = ImageGenerator(config)

        # Generate the image
        filename = f"{image['name']}.webp"
        result = generator.generate(
            prompt=image['prompt'],
            filename=filename
        )

        # Check if generation was successful
        if result.success:
            # Copy the file to our public/images directory
            generated_path = Path(result.path)
            if generated_path.exists():
                target_path = output_dir / filename
                shutil.copy2(generated_path, target_path)
                print(f"   ✅ Success! Saved to: {target_path.name}")
                success_count += 1
            else:
                print(f"   ⚠️  File not found: {result.path}")
                failed_images.append(image['name'])
        else:
            print(f"   ❌ Generation failed")
            if hasattr(result, 'error'):
                print(f"      Error: {result.error}")
            failed_images.append(image['name'])

    except Exception as e:
        print(f"   ❌ Error: {str(e)}")
        failed_images.append(image['name'])

print("\n" + "=" * 60)
print("🎬 Epic Image Generation Complete!")
print(f"✅ Successfully generated: {success_count}/{len(epic_images)} images")

if failed_images:
    print(f"⚠️  Failed images: {', '.join(failed_images)}")

print(f"📁 All images saved to: {output_dir}")
print("\n🌮 Your cinematic tortilla imagery is ready!")