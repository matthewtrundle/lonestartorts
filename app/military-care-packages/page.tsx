'use client';

import Link from 'next/link';
import Image from 'next/image';
import { GiftForm } from '@/components/campaigns/GiftForm';
import { CarePackageCard } from '@/components/campaigns/CarePackageCard';
import { carePackageBundles } from '@/lib/care-packages';
import {
  Package,
  Plane,
  Clock,
  Heart,
  Shield,
  Home,
  Star,
  CheckCircle,
  Gift,
  Globe,
} from 'lucide-react';

const benefits = [
  {
    icon: Package,
    title: 'Shelf Stable',
    description:
      'Our tortillas are vacuum sealed and shelf stable. Perfect for international shipping and long transit times.',
  },
  {
    icon: Plane,
    title: 'APO/FPO Rates',
    description:
      'Military mail uses domestic USPS rates - saving you money on international shipping.',
  },
  {
    icon: Globe,
    title: 'Ships Worldwide',
    description:
      'We ship to APO/FPO addresses and international locations. Wherever they\'re stationed, we can reach them.',
  },
  {
    icon: Heart,
    title: 'Taste of Texas',
    description:
      'Authentic H-E-B tortillas they remember from home. A comfort that means more than you know.',
  },
  {
    icon: Clock,
    title: 'Express Delivery',
    description:
      'Fast shipping to APO/FPO in 3-7 days, international in 5-10 days. Tracking included.',
  },
  {
    icon: Gift,
    title: 'Personal Touch',
    description:
      'Add a handwritten note to your care package. We\'ll include it with the shipment.',
  },
];

const testimonials = [
  {
    quote: 'My son is stationed in Germany and he said these tortillas made his whole month. Said it was like being home for breakfast.',
    author: 'Linda R.',
    location: 'Military Mom, Houston TX',
  },
  {
    quote: 'Care packages from home are everything when you\'re deployed. Real Texas tortillas hit different after months of mess hall food.',
    author: 'SGT Michael T.',
    location: 'US Army, Kuwait',
  },
  {
    quote: 'I send these to my husband every month. He shares them with his unit and now I get requests from other families!',
    author: 'Jennifer K.',
    location: 'Military Spouse, San Antonio TX',
  },
];

const faqs = [
  {
    question: 'What is an APO/FPO/DPO address?',
    answer:
      'APO (Army Post Office), FPO (Fleet Post Office), and DPO (Diplomatic Post Office) are military postal addresses that allow us to ship using domestic USPS rates, even to overseas locations. Your service member should have this address - it looks like a regular US address but with APO/FPO instead of a city.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'We use express shipping for all care packages. APO/FPO packages typically arrive in 3-7 business days. International addresses arrive in 5-10 business days. We provide tracking for all shipments so you can follow your package\'s journey.',
  },
  {
    question: 'Are the tortillas really shelf stable?',
    answer:
      'Yes! Our tortillas are vacuum sealed for shipping and remain fresh at room temperature for weeks. This makes them perfect for care packages that may sit in transit or in a mailroom before being opened.',
  },
  {
    question: 'Can I include a personal message?',
    answer:
      'Absolutely. When you place your order, you can include a personal message (up to 500 characters) that we\'ll print and include in the package. It\'s a small touch that means a lot.',
  },
  {
    question: 'What about shipping to non-APO international addresses?',
    answer:
      'We can ship to regular international addresses too - places like US bases in allied countries that don\'t use APO addresses. International shipping rates are higher but we offer competitive pricing.',
  },
  {
    question: 'Do you include the green sauce?',
    answer:
      'Unfortunately, no. The green sauce requires refrigeration and won\'t survive international shipping. We only include shelf-stable items in our care packages to ensure everything arrives in perfect condition.',
  },
  {
    question: 'Can I set up recurring shipments?',
    answer:
      'Yes! Contact us after your first order and we can set up monthly care packages. Many families send one every month to keep their service member stocked with tortillas.',
  },
];

const shippingInfo = [
  {
    type: 'APO/FPO/DPO',
    price: '$55-85',
    time: '3-7 business days',
    description: 'Express military mail delivery',
  },
  {
    type: 'International',
    price: '$60-100',
    time: '5-10 business days',
    description: 'Express international shipping',
  },
  {
    type: 'Custom (5+ packs)',
    price: 'Contact us',
    time: 'Custom quote',
    description: 'For orders over 4 packs (80 tortillas)',
  },
];

export default function MilitaryCarePackagesPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Military Care Packages - Texas Tortillas Shipped Worldwide',
    description:
      'Send authentic Texas tortillas to service members stationed overseas. APO/FPO shipping available. A taste of home for Texans serving abroad.',
    url: 'https://lonestartortillas.com/military-care-packages',
    publisher: {
      '@type': 'Organization',
      name: 'Lonestar Tortillas',
    },
  };

  const scrollToForm = () => {
    document.getElementById('gift-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-cream-50 pt-24">
        {/* Hero Section - Patriotic Theme */}
        <section className="text-white py-16 md:py-24 overflow-hidden relative">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/campaigns/hero-military-care.webp"
              alt="Patriotic Texas theme"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/75 to-transparent" />
          </div>

          {/* Star pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-8xl">★</div>
            <div className="absolute bottom-20 right-20 text-6xl">★</div>
            <div className="absolute top-1/2 left-1/4 text-4xl">★</div>
            <div className="absolute top-1/3 right-1/3 text-5xl">★</div>
          </div>

          <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-1 bg-red-500/80 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-6">
                <Shield className="w-4 h-4" />
                For Texans Serving Abroad
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                A Taste of Texas,
                <br />
                <span className="text-amber-300">Wherever They&apos;re Stationed</span>
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Send authentic H-E-B tortillas to your service member overseas.
                Shelf-stable, vacuum sealed, and shipped express to APO/FPO addresses
                worldwide. Arrives in days, not weeks. A piece of home in every package.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#packages"
                  className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-bold transition-colors"
                >
                  <Gift className="w-5 h-5" />
                  View Care Packages
                </a>
                <a
                  href="#gift-form"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-medium transition-colors"
                >
                  Send a Package Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="bg-white py-6 border-b border-gray-200">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-sm text-charcoal-700">
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Express Shipping Worldwide</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Arrives in Days, Not Weeks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Up to 4 Packs (80 Tortillas)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Value Prop Section */}
        <section className="py-16 bg-cream-50">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <Home className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal-950 mb-6">
              For Texans Who Can&apos;t Get Home
            </h2>
            <p className="text-lg text-charcoal-700 max-w-2xl mx-auto mb-8">
              When you&apos;re stationed overseas, the little things from home matter most.
              Real tortillas. The kind your mom used for breakfast tacos.
              The kind H-E-B makes. That&apos;s what we ship.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-xl mx-auto">
              <p className="text-blue-800 font-medium">
                &quot;It&apos;s not just food. It&apos;s a reminder that home is waiting
                and people are thinking of you.&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Care Package Bundles */}
        <section id="packages" className="py-16 bg-white scroll-mt-24">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-950 mb-4">
                Care Package Options
              </h2>
              <p className="text-lg text-charcoal-700 max-w-2xl mx-auto">
                Each package is carefully packed with shelf-stable items
                that survive international shipping. Choose the size that&apos;s right.
              </p>
            </div>

            {/* Bundle Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {carePackageBundles.map((bundle) => (
                <CarePackageCard
                  key={bundle.id}
                  bundle={bundle}
                  onSelect={scrollToForm}
                />
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-charcoal-600 mb-2">
                Prices shown are for the package only. Shipping calculated at checkout.
              </p>
            </div>
          </div>
        </section>

        {/* Shipping Info */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Shipping Options
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                We ship to military bases worldwide. APO/FPO addresses get domestic rates.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {shippingInfo.map((info, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">{info.type}</h3>
                  <p className="text-3xl font-bold text-amber-300 mb-2">{info.price}</p>
                  <p className="text-white/80 text-sm mb-2">{info.time} delivery</p>
                  <p className="text-white/60 text-sm">{info.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 bg-cream-50">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-950 mb-4">
                Why Families Trust Us
              </h2>
              <p className="text-lg text-charcoal-700 max-w-2xl mx-auto">
                We&apos;ve shipped care packages to service members on every continent.
                Here&apos;s what makes us different.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="p-6 bg-white rounded-xl shadow-sm">
                  <benefit.icon className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-charcoal-700">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                From Military Families
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <p className="text-white/90 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-white/70 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gift Form */}
        <section id="gift-form" className="py-16 bg-cream-50 scroll-mt-24">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-950 mb-4">
                Send a Care Package
              </h2>
              <p className="text-lg text-charcoal-700 max-w-2xl mx-auto">
                Fill out the form below to send a taste of Texas to your service member.
                We&apos;ll handle the rest.
              </p>
            </div>
            <GiftForm />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group border border-charcoal-200 rounded-lg overflow-hidden bg-cream-50"
                  open={index === 0}
                >
                  <summary className="w-full flex items-center justify-between p-5 text-left cursor-pointer list-none">
                    <span className="font-semibold text-charcoal-950 pr-4">
                      {faq.question}
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
                    <p className="text-charcoal-700">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <Shield className="w-16 h-16 text-amber-300 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Send a Taste of Home Today
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Whether they&apos;re in Germany, Japan, or the Middle East - we&apos;ll get
              authentic Texas tortillas to your service member.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#gift-form"
                className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-bold transition-colors"
              >
                <Gift className="w-5 h-5" />
                Send a Care Package
              </a>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold transition-colors"
              >
                Shop All Products
              </Link>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="py-8 bg-cream-50">
          <p className="text-sm text-charcoal-500 italic text-center max-w-2xl mx-auto px-4">
            Independent reseller. Not affiliated with or endorsed by the US Military, H-E-B, or any government agency.
            Shipping times are estimates and may vary based on military mail conditions.
          </p>
        </div>
      </main>
    </>
  );
}
