import type { Metadata } from 'next';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { StickyCartBar } from '@/components/shop/StickyCartBar';
import { Truck, Shield, Clock } from 'lucide-react';
import { products as allProducts } from '@/lib/products';

// Statically rendered ad-traffic variant of /shop. Middleware rewrites
// /shop?utm_source=tiktok|google (or gclid) here so the main /shop page can
// stay fully static too. Served under the /shop URL — never linked directly.
export const metadata: Metadata = {
  title: 'Shop Texas Tortillas',
  description:
    'Browse and order premium Texas tortillas delivered straight to your door. Fresh flour and corn tortillas made the Lone Star way.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/shop' },
};

const bakeryProducts = allProducts.filter(p => p.productType === 'tortilla' && p.collection === 'bakery');
const pantryProducts = allProducts.filter(p => p.productType === 'tortilla' && p.collection === 'pantry');
const texasBrandsProducts = allProducts.filter(p => p.productType === 'tortilla' && p.collection === 'texas-brands');

export default function ShopAdVariantPage() {
  return (
    <div className="min-h-screen bg-white pt-[100px]">
      {/* Bold Free Shipping Banner */}
      <div className="bg-sunset-600 text-white py-4 px-4 text-center">
        <h1 className="text-xl md:text-2xl font-bold">
          FREE Shipping on Orders $80+
        </h1>
        <p className="text-sm opacity-90 mt-1">Authentic H-E-B® tortillas delivered to your door</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Bakery Fresh Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-charcoal-950 mb-1">Bakery Fresh Collection</h2>
          <p className="text-sm text-gray-600 mb-4">Handcrafted daily. No preservatives.</p>
          <ProductGrid products={bakeryProducts} />
        </div>

        {/* Pantry Staples Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-charcoal-950 mb-1">Pantry Staples</h2>
          <p className="text-sm text-gray-600 mb-4">Shelf-stable Texas favorites</p>
          <ProductGrid products={pantryProducts} cols={4} />
        </div>

        {/* Texas-Born Favorites Section */}
        <div>
          <h2 className="text-lg font-bold text-charcoal-950 mb-1">Texas-Born Favorites</h2>
          <p className="text-sm text-gray-600 mb-4">Premium brands from the Lone Star State</p>
          <ProductGrid products={texasBrandsProducts} />
        </div>

        {/* Simple trust line */}
        <div className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center gap-4 flex-wrap">
          <span className="flex items-center gap-1">
            <Truck className="w-4 h-4" aria-hidden="true" /> Freshness First Shipping
          </span>
          <span className="flex items-center gap-1">
            <Shield className="w-4 h-4" aria-hidden="true" /> Secure Checkout
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" aria-hidden="true" /> Ships Tuesdays
          </span>
        </div>
      </div>

      {/* Sticky Cart Bar - Critical for mobile checkout */}
      <StickyCartBar />
    </div>
  );
}
