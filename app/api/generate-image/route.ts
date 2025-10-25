import { NextRequest, NextResponse } from 'next/server';
import { generateImage, recipePrompts } from '@/lib/image-generation';

/**
 * API Route for generating images using OpenRouter
 *
 * POST /api/generate-image
 *
 * Body:
 * {
 *   "recipe": "carneAsadaTacos" | "fishTacos" | etc.,
 *   "custom": "optional custom prompt",
 *   "width": 1024,
 *   "height": 768
 * }
 *
 * Best practices:
 * - Rate limit this endpoint in production
 * - Cache generated images
 * - Validate inputs
 * - Log all generations for auditing
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recipe, custom, width, height, style } = body;

    // Validate input
    if (!recipe && !custom) {
      return NextResponse.json(
        { error: 'Either recipe or custom prompt is required' },
        { status: 400 }
      );
    }

    let prompt: string;

    if (recipe) {
      // Use predefined recipe prompt
      const promptFn = recipePrompts[recipe as keyof typeof recipePrompts];
      if (!promptFn) {
        return NextResponse.json(
          { error: `Unknown recipe: ${recipe}` },
          { status: 400 }
        );
      }
      prompt = promptFn();
    } else {
      // Use custom prompt
      prompt = custom;
    }

    // Generate image
    console.log(`🎨 Generating image for: ${recipe || 'custom prompt'}`);

    const result = await generateImage({
      prompt,
      width: width || 1024,
      height: height || 768,
      style: style || 'photorealistic',
    });

    return NextResponse.json({
      success: true,
      image: result,
    });

  } catch (error) {
    console.error('❌ Image generation error:', error);

    return NextResponse.json(
      {
        error: 'Failed to generate image',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to list available recipes
 */
export async function GET() {
  const availableRecipes = Object.keys(recipePrompts);

  return NextResponse.json({
    availableRecipes,
    usage: 'POST to /api/generate-image with { recipe: "name" }',
  });
}
