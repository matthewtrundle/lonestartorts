import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { WholesaleForm } from '@/components/wholesale/WholesaleForm';
import { Package, Truck, Clock, Shield, Users, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Wholesale & Bulk Orders | H-E-B Tortillas for Restaurants',
  description: 'Order H-E-B tortillas in bulk for your restaurant, food truck, or catering business. Volume discounts, long shelf life, fast shipping with overnight available.',
  keywords: 'wholesale tortillas, bulk tortilla order, restaurant tortilla supplier, H-E-B tortillas wholesale, commercial tortilla order',
  alternates: {
    canonical: 'https://lonestartortillas.com/wholesale',
  },
  openGraph: {
    title: 'Wholesale & Bulk Tortilla Orders | Lonestar Tortillas',
    description: 'Premium H-E-B tortillas for restaurants and food service. Volume pricing, reliable supply, nationwide delivery.',
    type: 'website',
  },
};

const pricingTiers = [
  {
    name: 'Starter',
    packs: '1-5 packs',
    discount: 'Standard pricing',
    ideal: 'Small cafes, home caterers',
  },
  {
    name: 'Business',
    packs: '6-15 packs',
    discount: '10% volume discount',
    ideal: 'Food trucks, small restaurants',
    popular: true,
  },
  {
    name: 'Professional',
    packs: '16-30 packs',
    discount: '15% volume discount',
    ideal: 'Busy restaurants, catering companies',
  },
  {
    name: 'Enterprise',
    packs: '30+ packs',
    discount: 'Custom pricing',
    ideal: 'Restaurant chains, large caterers',
  },
];

const benefits = [
  {
    icon: Package,
    title: 'Long Shelf Life',
    description: 'Vacuum sealed for shipping. Throw it in the freezer, and they will last for months.',
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    description: 'Multiple options available including overnight.',
  },
  {
    icon: Clock,
    title: 'Consistent Supply',
    description: 'Reliable ordering process. Never run out during your busiest service times.',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'Authentic H-E-B tortillas with the taste Texans have trusted for generations.',
  },
  {
    icon: Users,
    title: 'Customer Favorite',
    description: 'Serve the same tortillas that made Texas famous. Your customers will notice.',
  },
  {
    icon: TrendingUp,
    title: 'Volume Discounts',
    description: 'The more you order, the more you save. Built-in bulk pricing on every order.',
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
    description: 'Order H-E-B tortillas in bulk for your restaurant or food service business.',
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
      <Header />

      <main className="min-h-screen bg-cream-50 pt-24">
        {/* Hero Section */}
        <section className="bg-charcoal-950 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1 bg-sunset-500 text-white text-sm font-semibold rounded-full mb-6">
                For Restaurants & Food Service
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Wholesale & Bulk Tortilla Orders
              </h1>
              <p className="text-xl text-cream-200 mb-8">
                Premium H-E-B tortillas for your restaurant, food truck, or catering business.
                Volume discounts, consistent quality, and nationwide delivery.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#inquiry-form"
                  className="inline-flex items-center gap-2 bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-4 rounded-lg font-bold transition-colors"
                >
                  Request Wholesale Pricing
                </a>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-medium transition-colors"
                >
                  Shop Now
                </Link>
              </div>
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
                The same authentic Texas tortillas your customers love, now available in bulk for your business.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="p-6 bg-cream-50 rounded-xl">
                  <benefit.icon className="w-10 h-10 text-sunset-600 mb-4" />
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">{benefit.title}</h3>
                  <p className="text-charcoal-700">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-16 bg-cream-50">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-950 mb-4">
                Volume Pricing
              </h2>
              <p className="text-lg text-charcoal-700 max-w-2xl mx-auto">
                Order more, save more. Our tiered pricing rewards your business with better rates as you scale.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`p-6 rounded-xl ${
                    tier.popular
                      ? 'bg-sunset-500 text-white ring-4 ring-sunset-300'
                      : 'bg-white border border-charcoal-200'
                  }`}
                >
                  {tier.popular && (
                    <span className="inline-block px-3 py-1 bg-white text-sunset-600 text-xs font-bold rounded-full mb-4">
                      Most Popular
                    </span>
                  )}
                  <h3 className={`text-xl font-bold mb-2 ${tier.popular ? 'text-white' : 'text-charcoal-950'}`}>
                    {tier.name}
                  </h3>
                  <p className={`text-2xl font-bold mb-4 ${tier.popular ? 'text-white' : 'text-sunset-600'}`}>
                    {tier.packs}
                  </p>
                  <ul className={`space-y-2 text-sm ${tier.popular ? 'text-white/90' : 'text-charcoal-700'}`}>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold">Discount:</span> {tier.discount}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold">Ideal for:</span> {tier.ideal}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-center text-charcoal-600 mt-8">
              Each pack contains approximately 20 tortillas. Available in corn, flour, and butter varieties.
            </p>
          </div>
        </section>

        {/* Inquiry Form */}
        <section id="inquiry-form" className="py-16 bg-white scroll-mt-24">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-950 mb-4">
                Request Wholesale Pricing
              </h2>
              <p className="text-lg text-charcoal-700 max-w-2xl mx-auto">
                Tell us about your business and we&apos;ll get back to you with custom pricing and ordering details.
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
                From food trucks to fine dining, we&apos;ve got the tortillas your kitchen needs.
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
        <section className="py-16 bg-cream-50">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8 text-center">
              Wholesale FAQs
            </h2>
            <div className="space-y-4">
              <details className="group border border-charcoal-200 rounded-lg overflow-hidden bg-white" open>
                <summary className="w-full flex items-center justify-between p-5 text-left cursor-pointer list-none">
                  <span className="font-semibold text-charcoal-950 pr-4">What is the minimum order for wholesale pricing?</span>
                  <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-5 pt-0 border-t border-charcoal-200">
                  <p className="text-charcoal-700">
                    There&apos;s no strict minimum order. However, volume discounts start at 6 packs (approximately 120 tortillas).
                    For custom pricing on larger recurring orders, we recommend submitting an inquiry form so we can discuss your specific needs.
                  </p>
                </div>
              </details>
              <details className="group border border-charcoal-200 rounded-lg overflow-hidden bg-white">
                <summary className="w-full flex items-center justify-between p-5 text-left cursor-pointer list-none">
                  <span className="font-semibold text-charcoal-950 pr-4">Do you offer recurring order discounts?</span>
                  <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-5 pt-0 border-t border-charcoal-200">
                  <p className="text-charcoal-700">
                    Yes! For restaurants with predictable weekly or monthly needs, we offer subscription-style ordering with additional
                    discounts and priority fulfillment. Contact us to set up a recurring order schedule.
                  </p>
                </div>
              </details>
              <details className="group border border-charcoal-200 rounded-lg overflow-hidden bg-white">
                <summary className="w-full flex items-center justify-between p-5 text-left cursor-pointer list-none">
                  <span className="font-semibold text-charcoal-950 pr-4">How long do the tortillas stay fresh?</span>
                  <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-5 pt-0 border-t border-charcoal-200">
                  <p className="text-charcoal-700">
                    Our tortillas are vacuum sealed for shipping. Throw them in the freezer and they&apos;ll last for months.
                    Once thawed, most operators find packs stay fresh for 1-2 weeks under normal kitchen conditions.
                  </p>
                </div>
              </details>
              <details className="group border border-charcoal-200 rounded-lg overflow-hidden bg-white">
                <summary className="w-full flex items-center justify-between p-5 text-left cursor-pointer list-none">
                  <span className="font-semibold text-charcoal-950 pr-4">Can I get invoicing for my business?</span>
                  <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-5 pt-0 border-t border-charcoal-200">
                  <p className="text-charcoal-700">
                    Yes, we provide itemized invoices for all orders that can be used for business expense tracking.
                    For established accounts with recurring orders, we can discuss NET-15 or NET-30 payment terms.
                  </p>
                </div>
              </details>
              <details className="group border border-charcoal-200 rounded-lg overflow-hidden bg-white">
                <summary className="w-full flex items-center justify-between p-5 text-left cursor-pointer list-none">
                  <span className="font-semibold text-charcoal-950 pr-4">What varieties are available for bulk orders?</span>
                  <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-5 pt-0 border-t border-charcoal-200">
                  <p className="text-charcoal-700">
                    We offer the full H-E-B tortilla range: corn tortillas (great for street tacos, enchiladas, tostadas),
                    flour tortillas (ideal for burritos, quesadillas, fajitas), and butter flour tortillas (the Texas favorite,
                    perfect for breakfast tacos). You can mix and match varieties in your order.
                  </p>
                </div>
              </details>
              <details className="group border border-charcoal-200 rounded-lg overflow-hidden bg-white">
                <summary className="w-full flex items-center justify-between p-5 text-left cursor-pointer list-none">
                  <span className="font-semibold text-charcoal-950 pr-4">How quickly can I receive my order?</span>
                  <svg className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-5 pt-0 border-t border-charcoal-200">
                  <p className="text-charcoal-700">
                    We offer multiple shipping options including overnight delivery. For urgent needs, expedited shipping is available.
                    We recommend maintaining a 1-2 week buffer stock for restaurant operations.
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
              Join restaurants across America serving authentic Texas tortillas. Your customers will taste the difference.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#inquiry-form"
                className="inline-flex items-center gap-2 bg-white text-sunset-600 px-8 py-4 rounded-lg font-bold hover:bg-cream-50 transition-colors"
              >
                Request Pricing
              </a>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-sunset-600 hover:bg-sunset-700 text-white px-8 py-4 rounded-lg font-bold transition-colors"
              >
                Shop Now
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
