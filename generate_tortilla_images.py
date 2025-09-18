#!/usr/bin/env python3
"""
Generate product images for Tortilla Rodeo Co. using the Gemini Image SDK.
"""
import sys
import os
from pathlib import Path

# Add the image generator tool path to Python path
sys.path.insert(0, '/Users/mattrundle/Documents/image-generator-tool')

# Set environment variable for the API key
os.environ['GEMINI_API_KEY'] = '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'

from gemini_image_sdk import ImageGenerator, Config

# Create output directory for generated images
output_dir = Path('/Users/mattrundle/Documents/HEBtorts/public/images')
output_dir.mkdir(parents=True, exist_ok=True)

# Initialize the generator with config
config = Config.from_env()
generator = ImageGenerator(config)

# Product image generation requests
products = [
    {
        'name': 'corn-tortillas',
        'prompt': 'Professional product photography of authentic Mexican corn tortillas stacked in a traditional style, warm golden color, on a rustic wooden surface with soft natural lighting, high resolution, commercial quality, appetizing presentation, slight steam visible suggesting freshness'
    },
    {
        'name': 'flour-tortillas',
        'prompt': 'Professional product photography of soft buttery flour tortillas in a family-sized stack, creamy white color with light golden spots, on a clean kitchen counter with warm lighting, high resolution, commercial quality, showing the soft flexible texture'
    },
    {
        'name': 'hero-banner',
        'prompt': 'Wide banner image of a Texas ranch scene at golden hour with a rustic wooden table displaying fresh tortillas, salsa bowls, and ingredients, warm inviting atmosphere, professional food photography style, wide aspect ratio 16:9'
    },
    {
        'name': 'logo',
        'prompt': 'Modern minimalist logo design for "Tortilla Rodeo Co." featuring a stylized tortilla with subtle Texas elements like a star or lasso, warm earth tones, professional branding, clean vector style, suitable for web use'
    }
]

print("🌮 Generating images for Tortilla Rodeo Co...")

for product in products:
    try:
        print(f"\n📸 Generating: {product['name']}")

        # Generate the image
        filename = f"{product['name']}.webp"
        result = generator.generate(
            prompt=product['prompt'],
            filename=filename
        )

        # Check if generation was successful
        if result.success:
            # Move the file to our public/images directory
            generated_path = Path(result.path)
            if generated_path.exists():
                target_path = output_dir / filename
                generated_path.rename(target_path)
                print(f"✅ Saved: {target_path}")
            else:
                print(f"⚠️  File not found: {result.path}")
        else:
            print(f"⚠️  Failed to generate: {product['name']}")
            if hasattr(result, 'error'):
                print(f"   Error: {result.error}")

    except Exception as e:
        print(f"❌ Error generating {product['name']}: {str(e)}")

print("\n🎉 Image generation complete!")
print(f"📁 Images saved to: {output_dir}")