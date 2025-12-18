'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ScrollAnimations } from '@/components/ScrollAnimations'
import { Header } from '@/components/layout/Header'
import { useLanguage } from '@/lib/language-context'

// SVG Icons as components
const ShieldIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
)

const TruckIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
)

const CheckBadgeIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
)

const StarIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
)

const HeartHandIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
)

const TargetIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
)

const PackageIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const SparklesIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
)

export default function CraftPage() {
  const { t } = useLanguage();

  const processSteps = [
    {
      step: '01',
      title: 'Premium Selection',
      desc: 'We carefully select only the finest authentic Texas tortillas that meet our exacting quality standards.',
      detail: 'Every product is verified for freshness and authenticity',
      icon: <ShieldIcon />,
    },
    {
      step: '02',
      title: 'Quality Inspection',
      desc: 'Each batch undergoes thorough inspection to ensure it meets our standards for freshness and quality.',
      detail: 'Only the freshest products make it to our inventory',
      icon: <CheckBadgeIcon />,
    },
    {
      step: '03',
      title: 'Expert Packaging',
      desc: 'Products are carefully packaged to maintain quality during nationwide shipping.',
      detail: 'Shelf-stable packaging preserves authentic taste and texture',
      icon: <PackageIcon />,
    },
    {
      step: '04',
      title: 'Rapid Fulfillment',
      desc: 'Orders are processed same-day and shipped via our optimized logistics network.',
      detail: '2-3 day delivery ensures peak freshness',
      icon: <ClockIcon />,
    },
    {
      step: '05',
      title: 'Satisfaction Guaranteed',
      desc: 'We stand behind every product we ship with our 100% satisfaction guarantee.',
      detail: 'Your trust is our top priority',
      icon: <SparklesIcon />,
    },
  ];

  const whyChooseUs = [
    {
      title: 'Premium Quality',
      desc: 'Texas-made tortillas that set the standard for excellence',
      icon: <StarIcon />,
    },
    {
      title: 'Trusted Source',
      desc: 'The tortillas Texans have relied on for generations',
      icon: <HeartHandIcon />,
    },
    {
      title: 'Expert Curation',
      desc: 'We know how to source and ship premium tortillas perfectly',
      icon: <TargetIcon />,
    },
  ];

  const productVarieties = [
    { name: 'Mi Tienda Corn', color: 'from-sunset-400 to-sunset-600' },
    { name: 'Butter Tortillas', color: 'from-masa-400 to-masa-600' },
    { name: 'Flour Tortillas', color: 'from-cream-400 to-cream-600' },
    { name: 'Whole Wheat', color: 'from-charcoal-400 to-charcoal-600' },
  ];

  return (
    <>
      <Header />
      <ScrollAnimations>
        <div className="relative bg-cream-50 text-charcoal-950 overflow-hidden">

          {/* Hero Section */}
          <section className="min-h-[70vh] relative flex items-center justify-center overflow-hidden pt-32">
            <div className="absolute inset-0 parallax-img" data-speed="0.3">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream-50/60 to-cream-50" />
              <Image
                src="/images/artisan-hands.webp"
                alt="Artisan Hands Making Tortillas"
                fill
                className="object-cover opacity-30"
                priority
              />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="mb-6">
                <span className="text-xs font-bold tracking-[0.4em] uppercase text-masa-600">
                  Our Process
                </span>
              </div>
              <h1 className="mb-8">
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[0.85] text-charcoal-950">
                  THE SOURCE
                </span>
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-light italic text-sunset-600 mt-4">
                  of excellence
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-charcoal-700 leading-relaxed">
                We're expert curators bringing authentic Texas tortillas to connoisseurs nationwide who won't settle for anything less.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Link
                  href="/shop"
                  className="bg-sunset-500 hover:bg-sunset-600 text-cream-50 px-8 sm:px-12 py-4 text-base sm:text-lg font-bold tracking-wider uppercase transition-colors shadow-lg hover:shadow-xl"
                >
                  Shop Now
                </Link>
                <Link
                  href="/story"
                  className="border-2 border-charcoal-950 text-charcoal-950 hover:bg-charcoal-950 hover:text-cream-50 px-8 sm:px-12 py-4 text-base sm:text-lg font-bold tracking-wider uppercase transition-colors"
                >
                  Our Story
                </Link>
              </div>
            </div>
          </section>

          {/* Process Timeline */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-cream-50 to-cream-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-center mb-12 md:mb-16 reveal-text">
                Our Expertise
              </h2>

              <div className="max-w-4xl mx-auto">
                {processSteps.map((process, i) => (
                  <div key={i} className="relative mb-12 md:mb-16 last:mb-0 slide-left" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                      {/* Step Number & Icon */}
                      <div className="flex-shrink-0 flex items-start gap-4 sm:block">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-sunset-500 to-sunset-600 rounded-full flex items-center justify-center text-cream-50 font-bold text-xl sm:text-2xl shadow-lg">
                          {process.step}
                        </div>
                        <div className="sm:hidden text-sunset-600">
                          {process.icon}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-950">
                            {process.title}
                          </h3>
                          <div className="hidden sm:block text-sunset-600">
                            {process.icon}
                          </div>
                        </div>
                        <p className="text-base sm:text-lg text-charcoal-700 mb-2 leading-relaxed">
                          {process.desc}
                        </p>
                        <p className="text-sm text-masa-600 italic">
                          {process.detail}
                        </p>
                      </div>
                    </div>

                    {/* Connecting Line */}
                    {i < processSteps.length - 1 && (
                      <div className="hidden sm:block absolute left-10 top-24 w-0.5 h-16 bg-gradient-to-b from-sunset-300 to-transparent" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-charcoal-950 to-charcoal-900 text-cream-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-center mb-12 md:mb-16 reveal-text">
                Why Choose Us
              </h2>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
                {whyChooseUs.map((item, i) => (
                  <div key={i} className="text-center scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-sunset-400 to-sunset-600 rounded-2xl flex items-center justify-center text-cream-50 shadow-lg">
                      {item.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gradient">{item.title}</h3>
                    <p className="text-cream-300 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 md:mt-16 text-center">
                <p className="text-xl sm:text-2xl font-display italic text-masa-400">
                  "Premium Texas tortillas, delivered with care."
                </p>
                <p className="text-sm text-cream-400 mt-4 tracking-wider uppercase">
                  The choice of tortilla connoisseurs
                </p>
              </div>
            </div>
          </section>

          {/* Freshness Guarantee Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-cream-50 to-cream-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-center mb-10 md:mb-12 text-charcoal-950">
                Our Freshness Promise
              </h2>

              <div className="prose prose-lg max-w-none text-charcoal-700">
                <p className="text-lg sm:text-xl leading-relaxed mb-8">
                  At Lonestar Tortillas, we understand that freshness is everything. That's why we've developed a sourcing and shipping process that ensures every package arrives at your door with the same quality you'd find on store shelves in Texas.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mt-10">
                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-sunset-500">
                    <h3 className="text-xl font-bold text-charcoal-950 mb-3">Direct Sourcing</h3>
                    <p className="text-charcoal-700 text-base leading-relaxed">
                      We source our tortillas directly from Texas, selecting only products with optimal freshness dates. Our team regularly rotates inventory to ensure maximum shelf life.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-masa-500">
                    <h3 className="text-xl font-bold text-charcoal-950 mb-3">Shelf-Stable Quality</h3>
                    <p className="text-charcoal-700 text-base leading-relaxed">
                      Our tortillas are designed for extended shelf life at room temperature. No refrigeration required during shipping, and they arrive ready to use with 30-45 day freshness.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-sunset-500">
                    <h3 className="text-xl font-bold text-charcoal-950 mb-3">Fast Shipping</h3>
                    <p className="text-charcoal-700 text-base leading-relaxed">
                      Orders ship within 24 hours via USPS Priority or UPS Ground, arriving in 2-3 business days. Each package is carefully padded to prevent transit damage.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-masa-500">
                    <h3 className="text-xl font-bold text-charcoal-950 mb-3">Satisfaction Guaranteed</h3>
                    <p className="text-charcoal-700 text-base leading-relaxed">
                      If you receive damaged tortillas or are unsatisfied for any reason, contact us within 7 days for a full replacement or refund. We stand behind every product.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Varieties Grid */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-cream-100 to-masa-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-center mb-12 md:mb-16 reveal-text">
                Our Selection
              </h2>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
                {productVarieties.map((variety, i) => (
                  <Link href="/shop" key={i} className="group hover-lift block">
                    <div className={`h-48 sm:h-64 bg-gradient-to-br ${variety.color} rounded-lg flex items-center justify-center relative overflow-hidden shadow-lg`}>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-cream-50 text-center px-4">
                        {variety.name}
                      </h3>
                      <div className="absolute inset-0 bg-charcoal-950 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-24 bg-charcoal-950 text-cream-50 text-center relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-sunset-500/10 to-transparent blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-radial from-masa-500/10 to-transparent blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black mb-6 md:mb-8">
                Taste the Difference
              </h2>
              <p className="text-lg sm:text-xl mb-10 md:mb-12 max-w-2xl mx-auto text-cream-300 leading-relaxed">
                Experience premium Texas tortillas, now available nationwide with fast, reliable shipping.
              </p>

              {/* Primary CTA */}
              <div className="mb-8">
                <Link
                  href="/shop"
                  className="inline-block bg-sunset-500 text-cream-50 px-10 sm:px-16 py-5 sm:py-6 text-lg sm:text-2xl font-bold tracking-wide uppercase hover:bg-sunset-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  Shop Now
                </Link>
              </div>

              <p className="text-xs sm:text-sm text-cream-500 mt-8 tracking-wider uppercase">
                {t('disclaimer.short')}
              </p>
            </div>
          </section>
        </div>
      </ScrollAnimations>
    </>
  )
}
