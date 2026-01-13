'use client';

import Image from 'next/image';
import { Suspense, useEffect, useRef } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { SocialProofSection } from '@/components/shop/SocialProofSection';
import { SpinTheWheel } from '@/components/shop/SpinTheWheel';
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

  // Main shop page - cleaner design
  return (
    <main className="min-h-screen bg-cream-50">
      {/* Hero Section - Matching hook-em style */}
      <section className="text-white py-16 md:py-20 overflow-hidden relative">
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
          <div className="absolute inset-0 bg-gradient-to-r from-sunset-900/85 via-sunset-800/75 to-transparent" />
        </div>

        {/* Texas star pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">★</div>
          <div className="absolute bottom-20 right-20 text-6xl">★</div>
          <div className="absolute top-1/2 left-1/4 text-4xl">★</div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {t('shop.title')}
              <br />
              <span className="text-sunset-200">Texas Tortillas, Shipped Nationwide</span>
            </h1>
            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              {t('shop.subtitle')}
            </p>
            {/* Free Shipping Banner */}
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white py-3 px-6 rounded-lg">
              <span className="font-semibold">FREE Shipping on orders $80+ — Save $22.65!</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Compact Trust Signals */}
        <div className="flex justify-center gap-6 mb-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-sunset-600" />
            <span>Same Day Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Secure Checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-blue-600" />
            <span>Nationwide Delivery</span>
          </div>
        </div>

        {/* Products Grid */}
        <h2 className="sr-only">Available Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Best Value Callout - Simplified */}
        <div className="mt-10 bg-gradient-to-r from-sunset-50 to-cream-100 rounded-xl border border-sunset-200 p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-lg font-bold text-charcoal-950 mb-1">Best Value: Order 4+ Packs</h2>
              <p className="text-gray-600">
                Get <span className="font-semibold text-sunset-600">FREE shipping</span> and save $22.65
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1 text-gray-600">
                <Check className="w-4 h-4 text-green-600" />
                80+ tortillas
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Check className="w-4 h-4 text-green-600" />
                ~$1/tortilla
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Questions? <a href="sms:+17372280037" className="text-sunset-600 hover:underline">(737) 228-0037</a>
          {' • '}
          <a href="mailto:howdy@lonestartortillas.com" className="text-sunset-600 hover:underline">howdy@lonestartortillas.com</a>
        </div>

        {/* Other Products Link */}
        <div className="mt-8 text-center">
          <Link
            href="/shop/heb-products"
            className="inline-flex items-center gap-2 text-sunset-600 hover:text-sunset-700 font-medium transition-colors group"
          >
            Shop Other H-E-B Products
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Wholesale CTA */}
        <div className="mt-12 bg-charcoal-900 rounded-xl p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold mb-1">{t('shop.wholesale.title')}</h2>
              <p className="text-cream-200 text-sm">{t('shop.wholesale.subtitle')}</p>
            </div>
            <a
              href="/wholesale"
              className="shrink-0 bg-sunset-500 hover:bg-sunset-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors"
            >
              {t('shop.wholesale.cta')}
            </a>
          </div>
        </div>

        {/* FAQ Section - Collapsed by default */}
        <details className="mt-12 bg-white rounded-xl shadow-sm p-6">
          <summary className="text-xl font-bold text-charcoal-950 cursor-pointer list-none flex justify-between items-center">
            {t('shop.faq.title')}
            <svg className="w-5 h-5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="border-b border-gray-100 pb-3">
              <p className="font-medium text-charcoal-950">{t('shop.faq.shippingCostQ')}</p>
              <p className="text-gray-600 text-sm mt-1">{t('shop.faq.shippingCostA')}</p>
            </div>
            <div className="border-b border-gray-100 pb-3">
              <p className="font-medium text-charcoal-950">{t('shop.faq.arrivalQ')}</p>
              <p className="text-gray-600 text-sm mt-1">{t('shop.faq.arrivalA')}</p>
            </div>
            <div className="border-b border-gray-100 pb-3">
              <p className="font-medium text-charcoal-950">{t('shop.faq.refrigerationQ')}</p>
              <p className="text-gray-600 text-sm mt-1">{t('shop.faq.refrigerationA')}</p>
            </div>
            <div className="border-b border-gray-100 pb-3">
              <p className="font-medium text-charcoal-950">{t('shop.faq.paymentQ')}</p>
              <p className="text-gray-600 text-sm mt-1">{t('shop.faq.paymentA')}</p>
            </div>
          </div>
        </details>
      </div>

      {/* Social Proof - Only on main page */}
      <SocialProofSection className="mt-12" />
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
