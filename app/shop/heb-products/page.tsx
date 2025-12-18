'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { ProductCard } from '@/components/product/ProductCard';
import { ArrowLeft, Truck, Shield } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

import type { Product } from '@/lib/products';

export default function HEBProductsPage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products?type=other')
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
      <Header />

      <main className="min-h-screen bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-36">
          {/* Back Link */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-charcoal-700 hover:text-sunset-600 font-medium mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Tortillas
          </Link>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-charcoal-950 mb-4 tracking-tight">
              Other H-E-B Products
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Texas favorites beyond tortillas - sauces, salsas, and more authentic H-E-B products shipped nationwide.
            </p>

            {/* Trust Signals */}
            <div className="flex justify-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-5 h-5 text-green-600" />
                <span>Authentic H-E-B Products</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="w-5 h-5 text-blue-600" />
                <span>Ships with tortilla orders or $9.99 alone</span>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-sunset-orange border-r-transparent"></div>
              <p className="mt-4 text-gray-600">{t('common.loading')}</p>
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

          {/* Products Grid */}
          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 max-w-4xl mx-auto">
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
                  productType={product.productType}
                  tortillaType={product.tortillaType}
                  isBestSeller={product.isBestSeller}
                  savingsPercent={product.savingsPercent}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">More H-E-B products coming soon!</p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-sunset-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sunset-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Shop Tortillas
              </Link>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-sunset-50 to-masa-50 rounded-xl p-6 md:p-8 text-center">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-3">
              Looking for Tortillas?
            </h2>
            <p className="text-gray-600 mb-6">
              Check out our full selection of authentic H-E-B tortillas - flour, butter, wheat, and more.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-sunset-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-sunset-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Shop Tortillas
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
