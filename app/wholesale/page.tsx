import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { WholesaleForm } from '@/components/wholesale/WholesaleForm';
import { SalesPausedNotice } from '@/components/SalesPausedNotice';
import { getStoreStatus } from '@/lib/store-status';

export const metadata: Metadata = {
  alternates: {
    canonical: '/wholesale',
  },
  title: 'Wholesale Ordering',
  description: 'Partner with Lonestar Tortillas for wholesale pricing on premium Texas tortillas. Perfect for restaurants, caterers, and retailers.',
};
import { WholesaleOrderBuilder } from '@/components/wholesale/WholesaleOrderBuilder';
import { ShipBoxIcon, TexasStarIcon, CalendarTuesdayIcon } from '@/components/ui/Icons';

const businessTypes = [
  { name: 'Food Trucks', href: '/restaurants/food-trucks' },
  { name: 'BBQ Restaurants', href: '/restaurants/bbq' },
  { name: 'Mexican Restaurants', href: '/restaurants/mexican' },
  { name: 'Tex-Mex Restaurants', href: '/restaurants/tex-mex' },
  { name: 'Taco Shops', href: '/restaurants/taco-shops' },
  { name: 'Catering Companies', href: '/restaurants/catering' },
  { name: 'Breakfast Spots', href: '/restaurants/breakfast' },
];

export default async function WholesalePage() {
  const { salesPaused } = await getStoreStatus();
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Wholesale & Bulk Tortilla Orders',
    description:
      'Order H-E-B tortillas in bulk for your restaurant or food service business.',
    url: 'https://lonestartortillas.com/wholesale',
    publisher: {
      '@type': 'Organization',
      name: 'Lonestar Tortillas',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-cream-50 pt-24 pb-24 lg:pb-0">
        {/* Hero Section — photographic backdrop, single scrim */}
        <section className="bg-charcoal-950 text-cream-50 py-12 md:py-14 overflow-hidden relative">
          <Image
            src="/images/brand/cat-wholesale.webp"
            alt="Stacked tortillas on a restaurant kitchen pass"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Single scrim: solid left for text legibility, photo breathes right */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-charcoal-950/90 via-charcoal-950/70 to-charcoal-950/35"
          />

          <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
            <div className="flex items-center justify-between">
              <div className="max-w-3xl">
                <span className="inline-block px-4 py-1 bg-sunset-600 text-white text-sm font-semibold rounded-full mb-6">
                  For Restaurants & Food Service
                </span>
                <h1 className="font-display text-balance text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Wholesale & Bulk Tortilla Orders
                  <br />
                  <span className="text-sunset-300">Texas Tortillas, Shipped Nationwide</span>
                </h1>
                <p className="text-xl text-cream-200 mb-8">
                  Our full range of H-E-B tortillas for your restaurant, food
                  truck, or catering business. Volume discounts up to 25% off
                  apply automatically at checkout — no account, no application,
                  no waiting. Order in minutes with free shipping on every order.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#pricing"
                    className="inline-flex items-center gap-2 bg-sunset-600 hover:bg-sunset-700 text-white px-8 py-4 rounded-lg font-bold transition-colors"
                  >
                    Build Your Order — No Account Needed
                  </a>
                  <a
                    href="#inquiry-form"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-lg font-medium transition-colors text-sm"
                  >
                    100+ packs/month or NET terms? Talk to us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="bg-white py-6 border-b border-charcoal-200">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-sm text-charcoal-700">
              <div className="flex items-center gap-2">
                <ShipBoxIcon className="w-5 h-5 text-sunset-700" />
                <span className="font-medium">Free Shipping on All Orders</span>
              </div>
              <div className="flex items-center gap-2">
                <TexasStarIcon className="w-5 h-5 text-sunset-700" />
                <span className="font-medium">Up to 25% Volume Discount</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarTuesdayIcon className="w-5 h-5 text-sunset-700" />
                <span className="font-medium">Weekly Delivery Available</span>
              </div>
            </div>
          </div>
        </section>

        {/* Build Your Order */}
        <section id="pricing" className="py-10 bg-cream-50 scroll-mt-24">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <SectionHeader
              eyebrow="Tier Pricing"
              title="Build Your Wholesale Order"
              sub="Pick your products below. Your discount tier unlocks automatically as you add packs."
              align="center"
              className="mb-6"
            />

            {salesPaused ? (
              <SalesPausedNotice source="wholesale" title="Wholesale ordering is paused" />
            ) : (
              <WholesaleOrderBuilder />
            )}

            <div className="mt-8 text-center space-y-3">
              <p className="text-charcoal-600">
                Pack sizes vary by product (10-80 tortillas per pack). Checkout takes an email — that's it.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-sunset-600 hover:text-sunset-700 font-semibold underline underline-offset-4"
                >
                  Just want to try us first? Grab the Starter Pack →
                </Link>
                <a
                  href="#inquiry-form"
                  className="inline-flex items-center gap-2 text-charcoal-600 hover:text-charcoal-800 font-medium"
                >
                  Ordering 100+ packs/month or need NET terms?
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section id="inquiry-form" className="py-12 bg-white scroll-mt-24">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <SectionHeader
              eyebrow="Enterprise & NET Terms"
              title="High-Volume and Invoice Accounts"
              sub="Ordering 100+ packs a month, need NET-terms invoicing, or a custom delivery schedule? Tell us about your business and we'll set you up. Everyone else: just build your order above — discounts apply automatically."
              align="center"
            />
            <WholesaleForm />
          </div>
        </section>

        {/* Business Types */}
        <section className="py-12 bg-charcoal-950 text-white">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <SectionHeader
              eyebrow="Who We Serve"
              title="We Serve All Types of Food Businesses"
              sub="From food trucks to fine dining, we've got the tortillas your kitchen needs."
              tone="dark"
            />
            <div className="flex flex-wrap gap-4">
              {businessTypes.map((type) => (
                <Link
                  key={type.name}
                  href={type.href}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors"
                >
                  {type.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <SectionHeader
              eyebrow="Good to Know"
              title="Wholesale FAQs"
              align="center"
            />
            <div className="space-y-4">
              <details
                className="group border border-charcoal-200 rounded-lg overflow-hidden bg-cream-50"
                open
              >
                <summary className="w-full flex items-center justify-between p-5 text-left cursor-pointer list-none">
                  <span className="font-semibold text-charcoal-950 pr-4">
                    What is the minimum order for wholesale pricing?
                  </span>
                  <svg
                    className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="p-5 pt-0 border-t border-charcoal-200">
                  <p className="text-charcoal-700">
                    Wholesale pricing starts at 16 packs per month (320
                    tortillas), which qualifies for our Starter tier with 10%
                    off. You can adjust your order in increments of 4 packs to
                    find the right volume for your business.
                  </p>
                </div>
              </details>
              <details className="group border border-charcoal-200 rounded-lg overflow-hidden bg-cream-50">
                <summary className="w-full flex items-center justify-between p-5 text-left cursor-pointer list-none">
                  <span className="font-semibold text-charcoal-950 pr-4">
                    How does weekly delivery work?
                  </span>
                  <svg
                    className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="p-5 pt-0 border-t border-charcoal-200">
                  <p className="text-charcoal-700">
                    Your monthly volume is divided into weekly shipments. For
                    example, the Business tier (32 packs/month) ships as 8
                    packs each week. This keeps your kitchen stocked with fresh
                    tortillas without requiring large storage space.
                  </p>
                </div>
              </details>
              <details className="group border border-charcoal-200 rounded-lg overflow-hidden bg-cream-50">
                <summary className="w-full flex items-center justify-between p-5 text-left cursor-pointer list-none">
                  <span className="font-semibold text-charcoal-950 pr-4">
                    How long do the tortillas stay fresh?
                  </span>
                  <svg
                    className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="p-5 pt-0 border-t border-charcoal-200">
                  <p className="text-charcoal-700">
                    Our tortillas are vacuum sealed for shipping. Throw them in
                    the freezer and they&apos;ll last for months. Once thawed,
                    most operators find packs stay fresh for 1-2 weeks under
                    normal kitchen conditions.
                  </p>
                </div>
              </details>
              <details className="group border border-charcoal-200 rounded-lg overflow-hidden bg-cream-50">
                <summary className="w-full flex items-center justify-between p-5 text-left cursor-pointer list-none">
                  <span className="font-semibold text-charcoal-950 pr-4">
                    Can I get invoicing and NET terms?
                  </span>
                  <svg
                    className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="p-5 pt-0 border-t border-charcoal-200">
                  <p className="text-charcoal-700">
                    Yes! We provide itemized invoices for all orders.
                    Professional and Enterprise tier customers can request
                    NET-15 or NET-30 payment terms. Contact us to set up your
                    business account.
                  </p>
                </div>
              </details>
              <details className="group border border-charcoal-200 rounded-lg overflow-hidden bg-cream-50">
                <summary className="w-full flex items-center justify-between p-5 text-left cursor-pointer list-none">
                  <span className="font-semibold text-charcoal-950 pr-4">
                    What varieties are available for bulk orders?
                  </span>
                  <svg
                    className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="p-5 pt-0 border-t border-charcoal-200">
                  <p className="text-charcoal-700">
                    We offer the full H-E-B tortilla range — 11 varieties
                    including bakery fresh flour, butter, and wheat tortillas,
                    pantry staples like fajita flour, homestyle, and burrito
                    grande, plus white corn, street taco corn, and Mi Tienda
                    ready-to-cook tortillas. Mix and match any combination
                    in your wholesale order.
                  </p>
                </div>
              </details>
              <details className="group border border-charcoal-200 rounded-lg overflow-hidden bg-cream-50">
                <summary className="w-full flex items-center justify-between p-5 text-left cursor-pointer list-none">
                  <span className="font-semibold text-charcoal-950 pr-4">
                    Can I change my tier or cancel?
                  </span>
                  <svg
                    className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="p-5 pt-0 border-t border-charcoal-200">
                  <p className="text-charcoal-700">
                    Absolutely. You can upgrade, downgrade, or adjust your
                    volume at any time. Changes take effect on your next billing
                    cycle. There are no long-term contracts or cancellation
                    fees.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Final CTA — canonical warm band */}
        <section className="py-12 bg-gradient-to-r from-rust-600 to-sunset-600 text-white">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <h2 className="font-display text-balance text-3xl md:text-4xl font-bold mb-4">
              Ready to Elevate Your Menu?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join restaurants across America serving authentic Texas tortillas.
              Your customers will taste the difference.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 bg-white text-rust-700 px-8 py-4 rounded-lg font-bold hover:bg-cream-100 transition-colors"
              >
                View Pricing
              </a>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 border-2 border-white/70 hover:bg-white/10 text-white px-8 py-4 rounded-lg font-bold transition-colors"
              >
                Shop Retail
              </Link>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="py-8 bg-cream-50">
          <p className="text-sm text-charcoal-500 italic text-center">
            Independent reseller. Not affiliated with or endorsed by H-E-B.
          </p>
        </div>
      </main>
    </>
  );
}
