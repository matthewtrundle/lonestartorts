'use client';

import Image from 'next/image';
import { Suspense } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { SocialProofSection } from '@/components/shop/SocialProofSection';
import { StickyCartBar } from '@/components/shop/StickyCartBar';
import { ShipsTodayCountdown } from '@/components/shop/ShipsTodayCountdown';
import { Truck, Shield, Clock, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { products as allProducts } from '@/lib/products';
import { useSearchParams } from 'next/navigation';
import { ProductGridSkeleton } from '@/components/product/ProductCardSkeleton';

// Filter tortilla products by collection at module level
const bakeryProducts = allProducts.filter(p => p.productType === 'tortilla' && p.collection === 'bakery');
const pantryProducts = allProducts.filter(p => p.productType === 'tortilla' && p.collection === 'pantry');
const texasBrandsProducts = allProducts.filter(p => p.productType === 'tortilla' && p.collection === 'texas-brands');

// All tortilla products for schema
const allTortillaProducts = allProducts.filter(p => p.productType === 'tortilla');

// ItemList schema for product collection rich snippets
const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Premium Texas Tortillas',
  description: 'Shop authentic H-E-B tortillas and Texas-born brands shipped nationwide with free shipping.',
  numberOfItems: allTortillaProducts.length,
  itemListElement: allTortillaProducts.map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: `https://lonestartortillas.com${product.image}`,
      url: `https://lonestartortillas.com/shop#${product.sku}`,
      offers: {
        '@type': 'Offer',
        price: (product.price / 100).toFixed(2),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'Lonestar Tortillas'
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '0',
            currency: 'USD'
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 0,
              maxValue: 1,
              unitCode: 'DAY'
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 2,
              maxValue: 5,
              unitCode: 'DAY'
            }
          }
        }
      }
    }
  }))
};

// Wrap the main content to use useSearchParams
function ShopContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const isTikTok = searchParams.get('utm_source') === 'tiktok';
  const isGoogleAds = searchParams.get('utm_source') === 'google' || searchParams.get('gclid') !== null;

  // TikTok variant - ultra minimal for fast conversion (spin wheel disabled)
  if (isTikTok) {
    return (
      <main className="min-h-screen bg-white pt-[100px]">
          {/* Bold Free Shipping Banner for TikTok */}
          <div className="bg-sunset-600 text-white py-4 px-4 text-center">
            <p className="text-xl md:text-2xl font-bold">
              FREE Shipping on ALL Orders
            </p>
            <p className="text-sm opacity-90 mt-1">Authentic H-E-B® tortillas delivered to your door</p>
          </div>

          <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Bakery Fresh Section */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-charcoal-950 mb-1">Bakery Fresh Collection</h3>
              <p className="text-sm text-gray-600 mb-4">Handcrafted daily. No preservatives.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {bakeryProducts.map((product) => (
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
            </div>

            {/* Pantry Staples Section */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-charcoal-950 mb-1">Pantry Staples</h3>
              <p className="text-sm text-gray-600 mb-4">Shelf-stable Texas favorites</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {pantryProducts.map((product) => (
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
            </div>

            {/* Texas-Born Favorites Section */}
            <div>
              <h3 className="text-lg font-bold text-charcoal-950 mb-1">Texas-Born Favorites</h3>
              <p className="text-sm text-gray-600 mb-4">Premium brands from the Lone Star State</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {texasBrandsProducts.map((product) => (
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

          {/* Sticky Cart Bar - Critical for mobile checkout */}
          <StickyCartBar />
        </main>
    );
  }

  // Google Ads variant - clean, conversion-focused
  if (isGoogleAds) {
    return (
      <main className="min-h-screen bg-white pt-[100px]">
        {/* Bold Free Shipping Banner for Google Ads */}
        <div className="bg-sunset-600 text-white py-4 px-4 text-center">
          <p className="text-xl md:text-2xl font-bold">
            FREE Shipping on ALL Orders
          </p>
          <p className="text-sm opacity-90 mt-1">Authentic H-E-B® tortillas delivered to your door</p>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Bakery Fresh Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-charcoal-950 mb-1">Bakery Fresh Collection</h3>
            <p className="text-sm text-gray-600 mb-4">Handcrafted daily. No preservatives.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bakeryProducts.map((product) => (
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
          </div>

          {/* Pantry Staples Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-charcoal-950 mb-1">Pantry Staples</h3>
            <p className="text-sm text-gray-600 mb-4">Shelf-stable Texas favorites</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pantryProducts.map((product) => (
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
          </div>

          {/* Texas-Born Favorites Section */}
          <div>
            <h3 className="text-lg font-bold text-charcoal-950 mb-1">Texas-Born Favorites</h3>
            <p className="text-sm text-gray-600 mb-4">Premium brands from the Lone Star State</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {texasBrandsProducts.map((product) => (
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

        {/* Sticky Cart Bar - Critical for mobile checkout */}
        <StickyCartBar />
      </main>
    );
  }

  // Main shop page - conversion-focused design
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <main className="min-h-screen bg-white pb-24 md:pb-0">
      {/* Hero Section - Compact on mobile, proper spacing on desktop */}
      <section className="text-white pt-24 pb-6 md:pt-24 md:pb-8 overflow-hidden relative">
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
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 leading-tight">
              Premium H-E-B® Tortillas
              <br className="hidden md:block" />
              <span className="text-sunset-400">Shipped Nationwide</span>
            </h1>
            <p className="text-sm md:text-lg text-white/90 mb-3 md:mb-5">
              Authentic Texas tortillas delivered fresh to your door
            </p>
            {/* Free Shipping CTA */}
            <div className="inline-flex items-center gap-2 bg-sunset-600 text-white py-2 px-4 md:py-3 md:px-5 rounded-lg font-bold text-sm md:text-lg shadow-lg">
              <Truck className="w-4 h-4 md:w-5 md:h-5" />
              FREE Shipping
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar - Compact on mobile */}
      <div className="bg-cream-50 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-8 text-xs md:text-sm text-charcoal-700">
            <ShipsTodayCountdown />
            <div className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
              <span>Fast Shipping</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5">
        {/* Section Header - Compact on mobile */}
        <div className="text-center mb-4 md:mb-5">
          <h2 className="text-xl md:text-3xl font-bold text-charcoal-950 mb-1">Shop Our Tortillas</h2>
          <p className="text-sm md:text-base text-gray-600">Order 4+ packs for FREE shipping</p>
        </div>

        {/* Bakery Fresh Collection */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-charcoal-950 mb-1">Bakery Fresh Collection</h3>
          <p className="text-sm text-gray-600 mb-4">Handcrafted daily. No preservatives.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {bakeryProducts.map((product) => (
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
        </div>

        {/* Pantry Staples */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-charcoal-950 mb-1">Pantry Staples</h3>
          <p className="text-sm text-gray-600 mb-4">Shelf-stable Texas favorites</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {pantryProducts.map((product) => (
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
        </div>

        {/* Texas-Born Favorites */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-charcoal-950 mb-1">Texas-Born Favorites</h3>
          <p className="text-sm text-gray-600 mb-4">Premium brands from the Lone Star State</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {texasBrandsProducts.map((product) => (
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
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white pt-24 pb-24">
        {/* Hero skeleton */}
        <div className="bg-charcoal-950 h-48 mb-8" />

        {/* Content skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center mb-8">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-2 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse" />
          </div>
          <ProductGridSkeleton count={6} />
        </div>
      </main>
    }>
      <ShopContent />
    </Suspense>
  );
}
