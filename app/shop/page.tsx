'use client';

import Image from 'next/image';
import { ProductCard } from '@/components/product/ProductCard';
import { FreeShippingProgress } from '@/components/shop/FreeShippingProgress';
import { SocialProofSection } from '@/components/shop/SocialProofSection';
import { Truck, Shield, Clock, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { products as allProducts } from '@/lib/products';
import { useEffect, useState } from 'react';

// Firework particle component
function Firework({ delay, left }: { delay: number; left: number }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        bottom: '0',
        animation: `firework-rise 1.5s ease-out ${delay}s infinite`,
      }}
    >
      {/* Rising trail */}
      <div className="w-1 h-1 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50" />
      {/* Explosion particles */}
      <div
        className="absolute -top-2 -left-2"
        style={{
          animation: `firework-burst 1.5s ease-out ${delay + 0.8}s infinite`,
          opacity: 0,
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: ['#FFD700', '#FF6B6B', '#4ECDC4', '#FF69B4', '#00CED1'][i % 5],
              transform: `rotate(${i * 45}deg) translateY(-20px)`,
              animation: `firework-particle 0.7s ease-out ${delay + 0.8}s infinite`,
              boxShadow: `0 0 6px ${['#FFD700', '#FF6B6B', '#4ECDC4', '#FF69B4', '#00CED1'][i % 5]}`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Filter tortilla products at module level (no API call needed)
const tortillaProducts = allProducts.filter(p => p.productType === 'tortilla');

export default function ShopPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-cream-50">
        {/* Hero Image Section - Compact */}
        <div className="w-full mb-6">
          <div className="relative w-full h-[180px] md:h-[240px] overflow-hidden">
            <Image
              src="/images/shop/texas-tortillas-hero.webp"
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
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              {t('shop.subtitle')}
            </p>

            {/* Free Shipping Banner - New Year's Special with Fireworks */}
            <div className="relative bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white py-4 px-8 rounded-lg shadow-lg mb-8 inline-block overflow-hidden">
              {/* Fireworks animation container */}
              <div className="absolute inset-0 overflow-hidden">
                <Firework delay={0} left={10} />
                <Firework delay={0.5} left={25} />
                <Firework delay={1} left={50} />
                <Firework delay={0.3} left={75} />
                <Firework delay={0.8} left={90} />
              </div>
              {/* Sparkle overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)] animate-pulse" />
              {/* Content */}
              <div className="relative flex items-center justify-center gap-3">
                <span className="text-2xl animate-bounce" style={{ animationDuration: '2s' }}>🎆</span>
                <span className="font-bold text-lg bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                  New Year&apos;s Special: FREE Shipping on orders $80+
                </span>
                <span className="text-white/50">•</span>
                <span className="text-yellow-300 font-semibold">Save $22.65!</span>
                <span className="text-2xl animate-bounce" style={{ animationDuration: '2s', animationDelay: '0.5s' }}>🎇</span>
              </div>
              {/* CSS Animations */}
              <style jsx>{`
                @keyframes firework-rise {
                  0% { transform: translateY(0); opacity: 1; }
                  50% { transform: translateY(-60px); opacity: 1; }
                  60% { transform: translateY(-60px); opacity: 0; }
                  100% { transform: translateY(-60px); opacity: 0; }
                }
                @keyframes firework-burst {
                  0% { opacity: 0; transform: scale(0); }
                  50% { opacity: 1; transform: scale(1); }
                  100% { opacity: 0; transform: scale(1.5); }
                }
                @keyframes firework-particle {
                  0% { transform: rotate(var(--rotation)) translateY(-10px); opacity: 1; }
                  100% { transform: rotate(var(--rotation)) translateY(-30px); opacity: 0; }
                }
              `}</style>
            </div>

            {/* Trust Signals Bar - Centered Premium layout */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex flex-wrap justify-center gap-4 md:gap-6">
                <div className="flex flex-col items-center gap-3 p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-sunset-200 transition-all min-w-[140px]">
                  <div className="w-12 h-12 rounded-full bg-sunset-50 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-sunset-600" />
                  </div>
                  <p className="text-sm font-bold text-charcoal-950">{t('shop.trustSignals.sameDay')}</p>
                  <p className="text-xs text-gray-500">{t('shop.trustSignals.sameDaySub')}</p>
                </div>
                <div className="flex flex-col items-center gap-3 p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-sunset-200 transition-all min-w-[140px]">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm font-bold text-charcoal-950">{t('shop.trustSignals.secure')}</p>
                  <p className="text-xs text-gray-500">{t('shop.trustSignals.secureSub')}</p>
                </div>
                <div className="flex flex-col items-center gap-3 p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-sunset-200 transition-all min-w-[140px]">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-bold text-charcoal-950">{t('shop.trustSignals.smartShipping')}</p>
                  <p className="text-xs text-gray-500">{t('shop.trustSignals.smartShippingSub')}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Products Grid - Premium spacing */}
          <h2 className="sr-only">Available Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {tortillaProducts.map((product) => (
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

          {/* Best Value Callout */}
          <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-sm border border-indigo-200 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <span className="text-2xl">🎇</span>
                  <h2 className="text-xl font-bold text-indigo-800">Best Value: Order 4 Packs</h2>
                </div>
                <p className="text-indigo-700 mb-3">
                  Get <span className="font-bold">FREE shipping</span> and pay just <span className="font-bold text-indigo-800">$1.00 per tortilla</span>
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-600" />
                    <span className="text-gray-700">80 tortillas for $80</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-600" />
                    <span className="text-gray-700">Save $22.65 on shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-600" />
                    <span className="text-gray-700">35% cheaper per tortilla</span>
                  </div>
                </div>
              </div>
              <div className="text-center bg-white rounded-lg p-4 border border-indigo-200 shadow-sm">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Single pack price</p>
                <p className="text-2xl font-bold text-gray-400 line-through">$1.53/ea</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide mt-2 mb-1">4-pack price</p>
                <p className="text-3xl font-bold text-indigo-600">$1.00/ea</p>
              </div>
            </div>
          </div>

          {/* Contact Callout */}
          <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href="sms:+17372280037"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-sunset-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm">Text us: <span className="font-semibold">(737) 228-0037</span></span>
            </a>
            <span className="hidden sm:inline text-gray-300">|</span>
            <a
              href="mailto:howdy@lonestartortillas.com"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-sunset-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm"><span className="font-semibold">howdy@lonestartortillas.com</span></span>
            </a>
          </div>

          {/* Other HEB Products Link */}
          <div className="mt-10 text-center">
            <Link
              href="/shop/heb-products"
              className="inline-flex items-center gap-2 text-sunset-600 hover:text-sunset-700 font-semibold text-lg transition-colors group"
            >
              Shop Other H-E-B Products
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="text-gray-500 text-sm mt-1">Sauces, salsas, and more Texas favorites</p>
          </div>

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

        {/* Social Proof Section */}
        <SocialProofSection className="mt-16" />
      </main>
  );
}
