'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';
import { ProductCard } from '@/components/product/ProductCard';

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
        {/* Hero Image Section */}
        <div className="w-full mb-12">
          <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
            <Image
              src="/images/shop/texas-tortillas-hero.png"
              alt="H-E-B Tortillas with Texas Flag - Butter, Southwest Style, Flour, and Corn Tortillas"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-texas-brown mb-6">
              Shop Our Tortillas
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Premium Texas tortillas, shipped directly to your door.
              Fresh from the Lone Star State.
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-sunset-orange border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && products.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No products available at this time.</p>
            </div>
          )}

          {/* Additional Info Section */}
          <div className="mt-24 bg-white rounded-xl shadow-sm p-8 md:p-12">
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
