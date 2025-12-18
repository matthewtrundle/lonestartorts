import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { products } from '@/lib/products';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type');

  let filteredProducts = products;

  // Filter by product type if specified
  if (type === 'tortilla') {
    filteredProducts = products.filter(p => p.productType === 'tortilla');
  } else if (type === 'other') {
    filteredProducts = products.filter(p => p.productType !== 'tortilla');
  }

  return NextResponse.json({
    success: true,
    products: filteredProducts,
  });
}
