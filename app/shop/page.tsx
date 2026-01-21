'use client';

import Image from 'next/image';
import { Suspense, useEffect, useRef } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { SocialProofSection } from '@/components/shop/SocialProofSection';
import { SpinTheWheel } from '@/components/shop/SpinTheWheel';
import { StickyCartBar } from '@/components/shop/StickyCartBar';
import { ShipsTodayCountdown } from '@/components/shop/ShipsTodayCountdown';
import { Truck, Shield, Clock, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { useCart } from '@/lib/cart-context';
import { products as allProducts } from '@/lib/products';
import { useSearchParams } from 'next/navigation';

// Filter tortilla products at module level
const tortillaProducts = allProducts.filter(p => p.productType === 'tortilla');

// Wrap the main content to use useSearchParams
function ShopContent() {
  const { t } = useLanguage();
  const { showSpinWheel, setShowSpinWheel, hasTriggeredSpin } = useCart();
  const searchParams = useSearchParams();
  const isTikTok = searchParams.get('utm_source') === 'tiktok';
  const isGoogleAds = searchParams.get('utm_source') === 'google' || searchParams.get('gclid') !== null;
  const spinTriggeredRef = useRef(false);

  // Spin wheel trigger for TikTok users: 25% scroll OR 8 second timer (whichever first)
  useEffect(() => {
    if (!isTikTok || hasTriggeredSpin || spinTriggeredRef.current) return;

    const triggerSpin = () => {
      if (spinTriggeredRef.current) return;
      spinTriggeredRef.current = true;
      setShowSpinWheel(true);
    };

    // 8 second fallback timer
    const timer = setTimeout(triggerSpin, 8000);

    // Scroll trigger at 25% down
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= 25) {
        triggerSpin();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isTikTok, hasTriggeredSpin, setShowSpinWheel]);

  // TikTok variant - ultra minimal for fast conversion
  if (isTikTok) {
    return (
      <>
        {/* Spin The Wheel Modal for TikTok users */}
        <SpinTheWheel
          isOpen={showSpinWheel}
          onClose={() => setShowSpinWheel(false)}
          utmSource="tiktok"
        />

        <main className="min-h-screen bg-white pt-[100px]">
          {/* Bold Free Shipping Banner for TikTok */}
          <div className="bg-sunset-600 text-white py-4 px-4 text-center">
            <p className="text-xl md:text-2xl font-bold">
              FREE Shipping on orders $80+
            </p>
            <p className="text-sm opacity-90 mt-1">Authentic H-E-B® tortillas delivered to your door</p>
          </div>

          <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Products Grid - Immediately visible */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

            {/* Simple trust line */}
            <div className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center gap-4 flex-wrap">
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4" /> Fast Shipping
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" /> Secure Checkout
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> Ships Same Day
              </span>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Google Ads variant - clean, conversion-focused
  if (isGoogleAds) {
    return (
      <main className="min-h-screen bg-white pt-[100px]">
        {/* Bold Free Shipping Banner for Google Ads */}
        <div className="bg-sunset-600 text-white py-4 px-4 text-center">
          <p className="text-xl md:text-2xl font-bold">
            FREE Shipping on orders $80+
          </p>
          <p className="text-sm opacity-90 mt-1">Authentic H-E-B® tortillas delivered to your door</p>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Products Grid - Immediately visible */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

          {/* Simple trust line */}
          <div className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center gap-4 flex-wrap">
            <span className="flex items-center gap-1">
              <Truck className="w-4 h-4" /> Fast Shipping
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4" /> Secure Checkout
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> Ships Same Day
            </span>
          </div>
        </div>
      </main>
    );
  }

  // Main shop page - conversion-focused design
  return (
    <main className="min-h-screen bg-white pb-24 md:pb-0">
      {/* Hero Section - Bold and direct */}
      <section className="text-white py-10 md:py-14 overflow-hidden relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/campaigns/hero-hook-em.png"
            alt="Texas sunset skyline"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/90 via-charcoal-900/80 to-charcoal-800/60" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Premium H-E-B® Tortillas
              <br />
              <span className="text-sunset-400">Shipped Nationwide</span>
            </h1>
            <p className="text-lg text-white/90 mb-5">
              Authentic Texas tortillas delivered fresh to your door
            </p>
            {/* Free Shipping CTA */}
            <div className="inline-flex items-center gap-3 bg-sunset-600 text-white py-3 px-5 rounded-lg font-bold text-lg shadow-lg">
              <Truck className="w-5 h-5" />
              FREE Shipping on $80+ Orders
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-cream-50 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-charcoal-700">
            <ShipsTodayCountdown />
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-green-600" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>Fast Nationwide Shipping</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal-950 mb-2">Shop Our Tortillas</h2>
          <p className="text-gray-600">Choose your favorites • Order 4+ packs for FREE shipping</p>
        </div>

        {/* Products Grid - Tighter, more prominent */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
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

        {/* Best Value Banner - More prominent */}
        <div className="mt-10 bg-sunset-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold mb-1">Best Value: Order 4+ Packs</h2>
              <p className="text-sunset-100">
                Get FREE shipping and save $22.65 on your order
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full">
                <Check className="w-4 h-4" />
                80+ tortillas
              </div>
              <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full">
                <Check className="w-4 h-4" />
                ~$1/tortilla
              </div>
            </div>
          </div>
        </div>

        {/* Other Products + Wholesale - Inline */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <Link
            href="/shop/heb-products"
            className="inline-flex items-center gap-2 text-charcoal-700 hover:text-sunset-600 font-medium transition-colors group"
          >
            Shop Other H-E-B Products
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <span className="hidden sm:block text-gray-300">|</span>
          <Link
            href="/wholesale"
            className="inline-flex items-center gap-2 text-charcoal-700 hover:text-sunset-600 font-medium transition-colors group"
          >
            Wholesale Pricing
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Contact - Compact */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Questions? <a href="sms:+17372280037" className="text-sunset-600 hover:underline">(737) 228-0037</a>
          {' • '}
          <a href="mailto:howdy@lonestartortillas.com" className="text-sunset-600 hover:underline">howdy@lonestartortillas.com</a>
        </div>

        {/* FAQ Section - Compact */}
        <details className="mt-10 bg-cream-50 rounded-xl p-5">
          <summary className="text-lg font-bold text-charcoal-950 cursor-pointer list-none flex justify-between items-center">
            Frequently Asked Questions
            <svg className="w-5 h-5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="grid md:grid-cols-2 gap-4 mt-5">
            <div className="bg-white rounded-lg p-4">
              <p className="font-medium text-charcoal-950 text-sm">{t('shop.faq.shippingCostQ')}</p>
              <p className="text-gray-600 text-sm mt-1">{t('shop.faq.shippingCostA')}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="font-medium text-charcoal-950 text-sm">{t('shop.faq.arrivalQ')}</p>
              <p className="text-gray-600 text-sm mt-1">{t('shop.faq.arrivalA')}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="font-medium text-charcoal-950 text-sm">{t('shop.faq.refrigerationQ')}</p>
              <p className="text-gray-600 text-sm mt-1">{t('shop.faq.refrigerationA')}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="font-medium text-charcoal-950 text-sm">{t('shop.faq.paymentQ')}</p>
              <p className="text-gray-600 text-sm mt-1">{t('shop.faq.paymentA')}</p>
            </div>
          </div>
        </details>
      </div>

      {/* Social Proof */}
      <SocialProofSection className="mt-8" />

      {/* Sticky Cart Bar - Mobile only */}
      <StickyCartBar />
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </main>
    }>
      <ShopContent />
    </Suspense>
  );
}
