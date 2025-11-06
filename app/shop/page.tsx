'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';
import { ProductCard } from '@/components/product/ProductCard';
import { Truck, Shield, Star, Clock } from 'lucide-react';

import type { Product } from '@/lib/products';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
        } else {
          setError('Failed to load products');
        }
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setError('Unable to load products');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <DisclaimerBanner />
      <Header />

      <main className="min-h-screen bg-cream-50">
        {/* Hero Image Section - Compact */}
        <div className="w-full mb-6">
          <div className="relative w-full h-[180px] md:h-[240px] overflow-hidden">
            <Image
              src="/images/shop/texas-tortillas-hero.png"
              alt="H-E-B Tortillas with Texas Flag - Butter, Southwest Style, Flour, and Corn Tortillas"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/5" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Hero Section - Compact */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-texas-brown mb-3">
              Shop Our Tortillas
            </h1>
            <p className="text-base text-gray-700 max-w-2xl mx-auto mb-4">
              Premium Texas tortillas, shipped directly to your door.
            </p>

            {/* Trust Signals Bar - Compact */}
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex flex-col items-center gap-1 p-3 bg-white rounded-lg shadow-sm">
                  <Truck className="w-5 h-5 text-sunset-600" />
                  <p className="text-xs font-semibold text-charcoal-950">Free Shipping</p>
                  <p className="text-[10px] text-charcoal-600">orders 3+ packs</p>
                </div>
                <div className="flex flex-col items-center gap-1 p-3 bg-white rounded-lg shadow-sm">
                  <Clock className="w-5 h-5 text-sunset-600" />
                  <p className="text-xs font-semibold text-charcoal-950">Same-Day Ship</p>
                  <p className="text-[10px] text-charcoal-600">before 2pm CT</p>
                </div>
                <div className="flex flex-col items-center gap-1 p-3 bg-white rounded-lg shadow-sm">
                  <Shield className="w-5 h-5 text-sunset-600" />
                  <p className="text-xs font-semibold text-charcoal-950">100% Secure</p>
                  <p className="text-[10px] text-charcoal-600">encrypted</p>
                </div>
                <div className="flex flex-col items-center gap-1 p-3 bg-white rounded-lg shadow-sm">
                  <Star className="w-5 h-5 text-sunset-600" />
                  <p className="text-xs font-semibold text-charcoal-950">4.8/5 Stars</p>
                  <p className="text-[10px] text-charcoal-600">500+ reviews</p>
                </div>
              </div>
            </div>

            {/* Urgency Message - Compact */}
            <div className="mt-4 inline-block bg-sunset-50 border-2 border-sunset-200 rounded-full px-4 py-1.5">
              <p className="text-xs font-semibold text-sunset-700">
                🔥 Order today, ships tomorrow • Limited stock
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-sunset-orange border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Products Grid - Tighter spacing */}
          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.sku}
                  sku={product.sku}
                  name={product.name}
                  description={product.description}
                  image={product.image}
                  price={product.price}
                  tortillaCount={product.tortillaCount}
                  storage={product.storage}
                  tortillaType={product.tortillaType}
                  isBestSeller={product.isBestSeller}
                  savingsPercent={product.savingsPercent}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && products.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600 text-lg">No products available at this time.</p>
            </div>
          )}

          {/* Additional Info Section - Moved closer */}
          <div className="mt-16 bg-white rounded-xl shadow-sm p-6 md:p-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display font-bold text-texas-brown mb-6">
                Why Choose Lonestar Tortillas?
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
                  <p className="text-gray-600">
                    Authentic Texas-style tortillas made with quality ingredients
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Fast Shipping</h3>
                  <p className="text-gray-600">
                    2-3 day delivery anywhere in the US
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Shelf Stable</h3>
                  <p className="text-gray-600">
                    Long-lasting freshness without refrigeration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
