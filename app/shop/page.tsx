'use client';

import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { ProductCard } from '@/components/product/ProductCard';
import { FreeShippingProgress } from '@/components/shop/FreeShippingProgress';
import { SocialProofSection } from '@/components/shop/SocialProofSection';
import { Truck, Shield, Clock, ArrowRight, Check, Package } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { products as allProducts } from '@/lib/products';

// Filter tortilla products at module level (no API call needed)
const tortillaProducts = allProducts.filter(p => p.productType === 'tortilla');

export default function ShopPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />

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

            {/* Free Shipping Banner - Holiday Special */}
            <div className="bg-gradient-to-r from-green-600 to-red-600 text-white py-3 px-6 rounded-lg shadow-md mb-8 inline-block">
              <div className="flex items-center justify-center gap-3">
                <span className="text-xl">🎄</span>
                <span className="font-semibold text-lg">Holiday Special: FREE Shipping on orders $60+</span>
                <span className="text-white/70">•</span>
                <span className="text-white/90">Save $18.40!</span>
                <span className="text-xl">🎁</span>
              </div>
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

          {/* Bulk Savings Table */}
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-charcoal-950">Bulk Savings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-charcoal-950">Quantity</th>
                    <th className="text-right py-3 px-4 font-semibold text-charcoal-950">Price</th>
                    <th className="text-right py-3 px-4 font-semibold text-charcoal-950">Shipping</th>
                    <th className="text-right py-3 px-4 font-semibold text-charcoal-950">Total</th>
                    <th className="text-right py-3 px-4 font-semibold text-charcoal-950">You Save</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-charcoal-700">1 pack (20 tortillas)</td>
                    <td className="py-3 px-4 text-right text-charcoal-700">$20.00</td>
                    <td className="py-3 px-4 text-right text-charcoal-700">$10.60</td>
                    <td className="py-3 px-4 text-right font-medium text-charcoal-950">$30.60</td>
                    <td className="py-3 px-4 text-right text-gray-400">—</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-charcoal-700">2 packs (40 tortillas)</td>
                    <td className="py-3 px-4 text-right text-charcoal-700">$40.00</td>
                    <td className="py-3 px-4 text-right text-charcoal-700">$18.40</td>
                    <td className="py-3 px-4 text-right font-medium text-charcoal-950">$58.40</td>
                    <td className="py-3 px-4 text-right text-green-600 font-medium">$2.80</td>
                  </tr>
                  <tr className="bg-green-50 border border-green-200 rounded">
                    <td className="py-3 px-4 font-semibold text-green-800 flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      3+ packs (60+ tortillas)
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-green-800">$60.00+</td>
                    <td className="py-3 px-4 text-right">
                      <span className="line-through text-gray-400 text-xs mr-1">$18.40</span>
                      <span className="font-semibold text-green-600">FREE</span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-green-800">$60.00+</td>
                    <td className="py-3 px-4 text-right font-bold text-green-600">$18.40+</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-gray-500 text-center">
              Prices shown for USPS Priority Mail (3-4 business days). FedEx 2nd Day Air available at checkout.
            </p>
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
    </>
  );
}
