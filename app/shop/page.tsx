'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';
import { ProductCard } from '@/components/product/ProductCard';
import { Truck, Shield, Star, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

import type { Product } from '@/lib/products';

export default function ShopPage() {
  const { t } = useLanguage();
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
              {t('shop.title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              {t('shop.subtitle')}
            </p>

            {/* Trust Signals Bar - Premium layout */}
            <div className="max-w-4xl mx-auto mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-gray-200 hover:border-sunset-600 transition-colors">
                  <Clock className="w-6 h-6 text-sunset-600" />
                  <p className="text-sm font-semibold text-charcoal-950">{t('shop.trustSignals.sameDay')}</p>
                  <p className="text-xs text-gray-600">{t('shop.trustSignals.sameDaySub')}</p>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-gray-200 hover:border-sunset-600 transition-colors">
                  <Shield className="w-6 h-6 text-sunset-600" />
                  <p className="text-sm font-semibold text-charcoal-950">{t('shop.trustSignals.secure')}</p>
                  <p className="text-xs text-gray-600">{t('shop.trustSignals.secureSub')}</p>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg border border-gray-200 hover:border-sunset-600 transition-colors">
                  <Truck className="w-6 h-6 text-sunset-600" />
                  <p className="text-sm font-semibold text-charcoal-950">{t('shop.trustSignals.smartShipping')}</p>
                  <p className="text-xs text-gray-600">{t('shop.trustSignals.smartShippingSub')}</p>
                </div>
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
              <p className="text-gray-600 text-lg">{t('shop.emptyState')}</p>
            </div>
          )}

          {/* Wholesale CTA */}
          <div className="mt-16 bg-gradient-to-r from-charcoal-900 to-charcoal-950 rounded-xl p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{t('shop.wholesale.title')}</h2>
                <p className="text-cream-200">
                  {t('shop.wholesale.subtitle')}
                </p>
              </div>
              <a
                href="/wholesale"
                className="shrink-0 inline-flex items-center gap-2 bg-sunset-500 hover:bg-sunset-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                {t('shop.wholesale.cta')}
              </a>
            </div>
          </div>

          {/* Additional Info Section - Moved closer */}
          <div className="mt-16 bg-white rounded-xl shadow-sm p-6 md:p-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display font-bold text-texas-brown mb-6">
                {t('shop.whyChoose.title')}
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t('shop.whyChoose.premium')}</h3>
                  <p className="text-gray-600">
                    {t('shop.whyChoose.premiumText')}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t('shop.whyChoose.fast')}</h3>
                  <p className="text-gray-600">
                    {t('shop.whyChoose.fastText')}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t('shop.whyChoose.shelfStable')}</h3>
                  <p className="text-gray-600">
                    {t('shop.whyChoose.shelfStableText')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="mt-12 bg-gradient-to-r from-masa-50 to-sunset-50 rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">{t('shop.aboutTortillas.title')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-charcoal-950">{t('shop.aboutTortillas.corn')}</h3>
                <p className="text-charcoal-700 mb-4">{t('shop.aboutTortillas.cornText')}</p>
                <h3 className="font-semibold text-lg mb-3 text-charcoal-950">{t('shop.aboutTortillas.flour')}</h3>
                <p className="text-charcoal-700">{t('shop.aboutTortillas.flourText')}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3 text-charcoal-950">{t('shop.aboutTortillas.butter')}</h3>
                <p className="text-charcoal-700 mb-4">{t('shop.aboutTortillas.butterText')}</p>
                <h3 className="font-semibold text-lg mb-3 text-charcoal-950">{t('shop.aboutTortillas.freshness')}</h3>
                <p className="text-charcoal-700">{t('shop.aboutTortillas.freshnessText')}</p>
              </div>
            </div>
          </div>

          {/* Shopping FAQ Section */}
          <div className="mt-12 bg-white rounded-xl shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">{t('shop.faq.title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <details className="group border-b border-gray-200 pb-4" open>
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-charcoal-950">
                  {t('shop.faq.shippingCostQ')}
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="text-charcoal-700 mt-3">{t('shop.faq.shippingCostA')}</p>
              </details>
              <details className="group border-b border-gray-200 pb-4">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-charcoal-950">
                  {t('shop.faq.arrivalQ')}
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="text-charcoal-700 mt-3">{t('shop.faq.arrivalA')}</p>
              </details>
              <details className="group border-b border-gray-200 pb-4">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-charcoal-950">
                  {t('shop.faq.refrigerationQ')}
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="text-charcoal-700 mt-3">{t('shop.faq.refrigerationA')}</p>
              </details>
              <details className="group border-b border-gray-200 pb-4">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-charcoal-950">
                  {t('shop.faq.paymentQ')}
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="text-charcoal-700 mt-3">{t('shop.faq.paymentA')}</p>
              </details>
              <details className="group border-b border-gray-200 pb-4">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-charcoal-950">
                  {t('shop.faq.bulkQ')}
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="text-charcoal-700 mt-3">{t('shop.faq.bulkA')}</p>
              </details>
              <details className="group border-b border-gray-200 pb-4">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-charcoal-950">
                  {t('shop.faq.damagedQ')}
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="text-charcoal-700 mt-3">{t('shop.faq.damagedA')}</p>
              </details>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
