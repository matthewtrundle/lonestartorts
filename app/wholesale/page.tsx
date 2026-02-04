'use client';

import Link from 'next/link';
import Image from 'next/image';
import { WholesaleForm } from '@/components/wholesale/WholesaleForm';
import { WholesaleTierCard } from '@/components/wholesale/WholesaleTierCard';
import { wholesaleTiers } from '@/lib/wholesale-tiers';
import {
  Package,
  Truck,
  Clock,
  Shield,
  Users,
  TrendingUp,
  Star,
  CheckCircle,
} from 'lucide-react';

const benefits = [
  {
    icon: Package,
    title: 'Long Shelf Life',
    description:
      'Vacuum sealed for shipping. Throw it in the freezer, and they will last for months.',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description:
      'All wholesale orders ship free. Weekly delivery keeps your kitchen stocked.',
  },
  {
    icon: Clock,
    title: 'Consistent Supply',
    description:
      'Reliable ordering process. Never run out during your busiest service times.',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description:
      'Authentic H-E-B tortillas with the taste Texans have trusted for generations.',
  },
  {
    icon: Users,
    title: 'Customer Favorite',
    description:
      'Serve the same tortillas that made Texas famous. Your customers will notice.',
  },
  {
    icon: TrendingUp,
    title: 'Volume Discounts',
    description:
      'The more you order, the more you save. Up to 25% off with our tier pricing.',
  },
];

const businessTypes = [
  { name: 'Food Trucks', href: '/restaurants/food-trucks' },
  { name: 'BBQ Restaurants', href: '/restaurants/bbq' },
  { name: 'Mexican Restaurants', href: '/restaurants/mexican' },
  { name: 'Tex-Mex Restaurants', href: '/restaurants/tex-mex' },
  { name: 'Taco Shops', href: '/restaurants/taco-shops' },
  { name: 'Catering Companies', href: '/restaurants/catering' },
  { name: 'Breakfast Spots', href: '/restaurants/breakfast' },
];

export default function WholesalePage() {
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

      <main className="min-h-screen bg-cream-50 pt-24">
        {/* Hero Section */}
        <section className="text-white py-16 md:py-24 overflow-hidden relative">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/campaigns/hero-hook-em.webp"
              alt="Texas sunset skyline"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/90 via-charcoal-900/80 to-transparent" />
          </div>

          {/* Texas star pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-8xl">★</div>
            <div className="absolute bottom-20 right-20 text-6xl">★</div>
            <div className="absolute top-1/2 left-1/4 text-4xl">★</div>
          </div>

          <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
            <div className="flex items-center justify-between">
              <div className="max-w-3xl">
                <span className="inline-block px-4 py-1 bg-sunset-500 text-white text-sm font-semibold rounded-full mb-6">
                  For Restaurants & Food Service
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Wholesale & Bulk Tortilla Orders
                  <br />
                  <span className="text-sunset-300">Texas Tortillas, Shipped Nationwide</span>
                </h1>
                <p className="text-xl text-cream-200 mb-8">
                  Premium H-E-B tortillas for your restaurant, food truck, or
                  catering business. Volume discounts up to 25% off, weekly
                  delivery, and free shipping on every order.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#pricing"
                    className="inline-flex items-center gap-2 bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-4 rounded-lg font-bold transition-colors"
                  >
                    View Pricing Tiers
                  </a>
                  <a
                    href="#inquiry-form"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-medium transition-colors"
                  >
                    Request Custom Quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="bg-white py-6 border-b border-gray-200">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-sm text-charcoal-700">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-sunset-500" />
                <span className="font-medium">Free Shipping on All Orders</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-sunset-500" />
                <span className="font-medium">Up to 25% Volume Discount</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-sunset-500" />
                <span className="font-medium">Weekly Delivery Available</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Tiers - Shop Style */}
        <section id="pricing" className="py-16 bg-cream-50 scroll-mt-24">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-950 mb-4">
                Volume Pricing Tiers
              </h2>
              <p className="text-lg text-charcoal-700 max-w-2xl mx-auto">
                Choose your monthly volume and save. Adjust quantity in
                increments of 4 packs (80 tortillas). All tiers include free
                shipping and weekly delivery options.
              </p>
            </div>

            {/* Tier Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wholesaleTiers.map((tier) => (
                <WholesaleTierCard key={tier.id} tier={tier} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-charcoal-600 mb-4">
                Each pack contains 20 tortillas. Need a custom volume or mixed
                varieties?
              </p>
              <a
                href="#inquiry-form"
                className="inline-flex items-center gap-2 text-sunset-600 hover:text-sunset-700 font-semibold underline underline-offset-4"
              >
                Request a Custom Quote
              </a>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-950 mb-4">
                Why Restaurants Choose H-E-B Tortillas
              </h2>
              <p className="text-lg text-charcoal-700 max-w-2xl mx-auto">
                The same authentic Texas tortillas your customers love, now
                available in bulk for your business.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="p-6 bg-cream-50 rounded-xl">
                  <benefit.icon className="w-10 h-10 text-sunset-600 mb-4" />
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-charcoal-700">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section id="inquiry-form" className="py-16 bg-cream-50 scroll-mt-24">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-950 mb-4">
                Request Custom Pricing
              </h2>
              <p className="text-lg text-charcoal-700 max-w-2xl mx-auto">
                Need a custom volume, mixed varieties, or special delivery
                schedule? Tell us about your business and we&apos;ll create a
                tailored solution.
              </p>
            </div>
            <WholesaleForm />
          </div>
        </section>

        {/* Business Types */}
        <section className="py-16 bg-charcoal-950 text-white">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                We Serve All Types of Food Businesses
              </h2>
              <p className="text-lg text-cream-200 max-w-2xl mx-auto">
                From food trucks to fine dining, we&apos;ve got the tortillas
                your kitchen needs.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8 text-center">
              Wholesale FAQs
            </h2>
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
                    We offer the full H-E-B tortilla range: flour tortillas
                    (ideal for burritos, quesadillas, fajitas) and butter flour
                    tortillas (the Texas favorite, perfect for breakfast tacos).
                    Contact us for mixed variety orders.
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

        {/* Final CTA */}
        <section className="py-16 bg-sunset-500 text-white">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Elevate Your Menu?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join restaurants across America serving authentic Texas tortillas.
              Your customers will taste the difference.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 bg-white text-sunset-600 px-8 py-4 rounded-lg font-bold hover:bg-cream-50 transition-colors"
              >
                View Pricing
              </a>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-sunset-600 hover:bg-sunset-700 text-white px-8 py-4 rounded-lg font-bold transition-colors"
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
