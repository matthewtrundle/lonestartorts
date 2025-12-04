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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section - Premium hierarchy */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-charcoal-950 mb-4 tracking-tight">
              Shop Our H-E-B Tortillas
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Premium Texas tortillas from H-E-B, shipped directly to your door.
            </p>

            {/* Trust Signals Bar - Premium layout */}
            <div className="max-w-4xl mx-auto mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-gray-200 hover:border-sunset-600 transition-colors">
                  <Clock className="w-6 h-6 text-sunset-600" />
                  <p className="text-sm font-semibold text-charcoal-950">Same-Day Ship</p>
                  <p className="text-xs text-gray-600">before 2pm CT</p>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-gray-200 hover:border-sunset-600 transition-colors">
                  <Shield className="w-6 h-6 text-sunset-600" />
                  <p className="text-sm font-semibold text-charcoal-950">100% Secure</p>
                  <p className="text-xs text-gray-600">encrypted</p>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-gray-200 hover:border-sunset-600 transition-colors">
                  <Truck className="w-6 h-6 text-sunset-600" />
                  <p className="text-sm font-semibold text-charcoal-950">Smart Shipping</p>
                  <p className="text-xs text-gray-600">nationwide delivery</p>
                </div>
              </div>
            </div>

            {/* Urgency Message - Subtle */}
            <div className="inline-flex items-center gap-2 bg-sunset-50 border border-sunset-200 rounded-md px-4 py-2">
              <span className="text-sunset-600 text-lg">🔥</span>
              <p className="text-sm font-medium text-sunset-700">
                Order today, ships tomorrow • Limited stock
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

          {/* Products Grid - Premium spacing */}
          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
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
            <div className="text-center py-8">
              <p className="text-gray-600 text-lg">No products available at this time.</p>
            </div>
          )}

          {/* Wholesale CTA */}
          <div className="mt-16 bg-gradient-to-r from-charcoal-900 to-charcoal-950 rounded-xl p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Ordering for a Restaurant or Business?</h2>
                <p className="text-cream-200">
                  Get volume discounts, priority fulfillment, and dedicated support for your food service needs.
                </p>
              </div>
              <a
                href="/wholesale"
                className="shrink-0 inline-flex items-center gap-2 bg-sunset-500 hover:bg-sunset-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                View Wholesale Options
              </a>
            </div>
          </div>

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

          {/* Product Details Section */}
          <div className="mt-12 bg-gradient-to-r from-masa-50 to-sunset-50 rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">About Our Tortillas</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-charcoal-950">Corn Tortillas</h3>
                <p className="text-charcoal-700 mb-4">Our corn tortillas are made with authentic nixtamalized masa, giving them that distinctive flavor that Texans love. Perfect for tacos, enchiladas, tostadas, and chilaquiles. Naturally gluten-free and packed with traditional Mexican flavor. Each tortilla is soft, pliable, and holds up beautifully whether you&apos;re frying them crisp or warming them soft.</p>
                <h3 className="font-semibold text-lg mb-3 text-charcoal-950">Flour Tortillas</h3>
                <p className="text-charcoal-700">Our premium flour tortillas are soft, stretchy, and perfect for burritos, quesadillas, and wraps. Made with simple ingredients, these tortillas stay soft and pliable, even after refrigeration. The larger size makes them ideal for loading up with your favorite fillings without worrying about tears or breaks.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3 text-charcoal-950">Butter Tortillas</h3>
                <p className="text-charcoal-700 mb-4">The crown jewel of Texas tortillas. Our butter flour tortillas have a rich, indulgent taste that elevates any dish. The buttery flavor makes them perfect for breakfast tacos, and they&apos;re incredible simply warmed and eaten on their own. These are the tortillas that Texans crave when they move away from the Lone Star State.</p>
                <h3 className="font-semibold text-lg mb-3 text-charcoal-950">Freshness Guaranteed</h3>
                <p className="text-charcoal-700">All our tortillas are shelf-stable, meaning they don&apos;t require refrigeration and arrive fresh at your door. Each package has a 60-day shelf life from production. Once opened, store in an airtight container or resealable bag for best results. Warm before serving for the ultimate tortilla experience.</p>
              </div>
            </div>
          </div>

          {/* Shopping FAQ Section */}
          <div className="mt-12 bg-white rounded-xl shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Shopping FAQs</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <details className="group border-b border-gray-200 pb-4" open>
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-charcoal-950">
                  How much does shipping cost?
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="text-charcoal-700 mt-3">Shipping is a flat rate of $12.99 for all orders. We offer free shipping on orders over $45. All orders ship via USPS Priority Mail for fast, reliable delivery.</p>
              </details>
              <details className="group border-b border-gray-200 pb-4">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-charcoal-950">
                  When will my order arrive?
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="text-charcoal-700 mt-3">Most orders arrive within 2-3 business days. Orders to Alaska and Hawaii may take 4-7 business days. We ship Monday through Friday, and orders placed before 2 PM CT ship the same day.</p>
              </details>
              <details className="group border-b border-gray-200 pb-4">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-charcoal-950">
                  Do I need to refrigerate the tortillas?
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="text-charcoal-700 mt-3">No! Our H-E-B tortillas are shelf-stable and don&apos;t require refrigeration. They maintain freshness at room temperature for 3-4 weeks unopened. After opening, you can refrigerate to extend freshness or freeze for longer storage.</p>
              </details>
              <details className="group border-b border-gray-200 pb-4">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-charcoal-950">
                  What payment methods do you accept?
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="text-charcoal-700 mt-3">We accept all major credit cards (Visa, Mastercard, American Express, Discover) as well as Apple Pay and Google Pay. All transactions are secured with industry-standard encryption.</p>
              </details>
              <details className="group border-b border-gray-200 pb-4">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-charcoal-950">
                  Can I buy in bulk for restaurants or events?
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="text-charcoal-700 mt-3">Yes! We offer quantity discounts for bulk orders. Our multi-pack options provide savings of 5-15% depending on quantity. For very large orders or restaurant accounts, please contact us directly.</p>
              </details>
              <details className="group border-b border-gray-200 pb-4">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-charcoal-950">
                  What if my tortillas arrive damaged?
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="text-charcoal-700 mt-3">We stand behind our products. If your tortillas arrive damaged or aren&apos;t up to our quality standards, contact us within 48 hours of delivery and we&apos;ll make it right with a replacement or refund.</p>
              </details>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
