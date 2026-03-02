import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getAllBundles, getBundleById, getBundleSavings } from '@/lib/bundles';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  // Get single bundle by ID
  if (id) {
    const bundle = getBundleById(id);
    if (!bundle) {
      return NextResponse.json(
        { success: false, error: 'Bundle not found' },
        { status: 404 }
      );
    }

    const savings = getBundleSavings(bundle);
    return NextResponse.json({
      success: true,
      bundle: {
        ...bundle,
        ...savings,
      },
    });
  }

  // Get all bundles with savings info
  const bundles = getAllBundles().map(bundle => ({
    ...bundle,
    ...getBundleSavings(bundle),
  }));

  return NextResponse.json({
    success: true,
    bundles,
  });
}
