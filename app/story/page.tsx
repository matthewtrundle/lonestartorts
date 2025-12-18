'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ScrollAnimations } from '@/components/ScrollAnimations'
import { useLanguage } from '@/lib/language-context'
import { Header } from '@/components/layout/Header'

export default function StoryPage() {
  const { t } = useLanguage();
  return (
    <>
      <Header />
      <ScrollAnimations>
        <div className="relative bg-cream-50 text-charcoal-950 overflow-hidden">
          {/* Hero Section with Animated Background */}
          <section className="min-h-screen relative flex items-center justify-center overflow-hidden pt-32">
            {/* Multi-layer Animated Background System */}
            <div className="absolute inset-0 hero-background-system">
              {/* Layer 1: Deep background with texture */}
              <div className="absolute inset-0 parallax-layer" data-speed="0.1">
                <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-cream-100/80 to-masa-50" />
                <div className="absolute inset-0 premium-grain-texture" />
              </div>

              {/* Layer 2: Atmospheric gradients */}
              <div className="absolute inset-0 parallax-layer" data-speed="0.2">
                <div className="absolute top-[-50%] left-[-25%] w-[150%] h-[150%] bg-gradient-radial from-sunset-200/30 via-sunset-100/10 to-transparent blur-[100px] animate-float-slow" />
                <div className="absolute bottom-[-50%] right-[-25%] w-[150%] h-[150%] bg-gradient-radial from-masa-200/20 via-masa-100/10 to-transparent blur-[120px] animate-float-slow-reverse" />
              </div>

              {/* Layer 3: Background Video */}
              <div className="absolute inset-0 parallax-layer" data-speed="0.3" data-rotation="2">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                >
                  <source src="/hero-background_compressed.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream-50/40 to-cream-50/95" />
                <div className="absolute inset-0 bg-gradient-to-t from-cream-50/50 via-transparent to-transparent" />
                <div className="absolute inset-0 backdrop-blur-[0.5px]" />
              </div>

              {/* Layer 4: Animated light rays */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="light-ray light-ray-1" />
                <div className="light-ray light-ray-2" />
                <div className="light-ray light-ray-3" />
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none hidden md:block">
              <div className="particle particle-1" />
              <div className="particle particle-2" />
              <div className="particle particle-3" />
              <div className="absolute top-[15%] left-[10%] float-element opacity-20">
                <svg width="80" height="80" viewBox="0 0 100 100" className="text-sunset-300 rotate-slow">
                  <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </svg>
              </div>
              <div className="absolute bottom-[20%] right-[10%] float-element opacity-15" style={{ animationDelay: '2s' }}>
                <svg width="60" height="60" viewBox="0 0 80 80" className="text-masa-400">
                  <circle cx="40" cy="40" r="38" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 10" />
                </svg>
              </div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              {/* Quality Badge */}
              <div className="mb-6 reveal-text">
                <span className="text-xs font-bold tracking-[0.4em] uppercase text-masa-600">
                  {t('story.hero.badge') || 'Our Journey'}
                </span>
              </div>

              {/* Main Title */}
              <h1 className="mb-8">
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[0.85] text-charcoal-950">
                  {t('story.hero.title')}
                </span>
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-light italic mt-4 text-sunset-600">
                  {t('story.hero.subtitle')}
                </span>
              </h1>

              {/* Divider */}
              <div className="flex items-center justify-center gap-4 my-8">
                <span className="block w-16 sm:w-20 h-px bg-charcoal-300"></span>
                <span className="text-sunset-500 text-2xl">✦</span>
                <span className="block w-16 sm:w-20 h-px bg-charcoal-300"></span>
              </div>

              {/* Description */}
              <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-charcoal-700 leading-relaxed slide-left">
                {t('story.hero.description')}
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
                  href="/craft"
                  className="border-2 border-charcoal-950 text-charcoal-950 hover:bg-charcoal-950 hover:text-cream-50 px-8 sm:px-12 py-4 text-base sm:text-lg font-bold tracking-wider uppercase transition-colors"
                >
                  {t('story.cta.whyHeb') || 'Why H-E-B?'}
                </Link>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
                <svg className="w-6 h-6 text-charcoal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </section>

        {/* Timeline Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-cream-50 to-cream-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-center mb-12 md:mb-16 reveal-text">
              {t('story.timeline.title')}
            </h2>

            <div className="max-w-4xl mx-auto">
              {[
                {
                  year: '2020',
                  title: 'The Great Tortilla Crisis',
                  desc: 'Moved to Brooklyn. Tried local tortillas. Immediately regretted life choices.',
                  highlight: true,
                },
                {
                  year: '2021',
                  title: 'The Pilgrimage',
                  desc: 'Drove 1,800 miles to Texas just to stock up on H-E-B® tortillas. Worth it.',
                },
                {
                  year: '2022',
                  title: 'The Lightbulb Moment',
                  desc: 'Wait... what if we just... buy them and ship them to people? Genius!',
                },
                {
                  year: '2023',
                  title: 'The Underground Network',
                  desc: 'Fellow tortilla enthusiasts start sliding into our DMs. "You got the goods?"',
                },
                {
                  year: '2024',
                  title: 'Going Legit',
                  desc: 'Turns out we\'re not the only ones with this problem. Who knew?',
                  highlight: true,
                },
                {
                  year: 'Today',
                  title: 'Living the Dream',
                  desc: 'Helping tortilla-deprived Americans, one H-E-B® package at a time',
                  highlight: true,
                },
              ].map((milestone, i) => (
                <div key={i} className="relative mb-8 md:mb-12 last:mb-0">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 slide-left" style={{ animationDelay: `${i * 0.1}s` }}>
                    {/* Year */}
                    <div className="flex-shrink-0 sm:w-32">
                      <div className={`text-xl sm:text-2xl font-bold ${milestone.highlight ? 'text-sunset-600' : 'text-masa-600'}`}>
                        {milestone.year}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow pl-4 sm:pl-0 border-l-2 sm:border-l-0 border-masa-200 sm:border-transparent">
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-charcoal-950 mb-1 sm:mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-base sm:text-lg text-charcoal-700">
                        {milestone.desc}
                      </p>
                    </div>
                  </div>

                  {/* Connecting Line - Hidden on mobile */}
                  {i < 5 && (
                    <div className="hidden sm:block absolute left-16 top-12 w-0.5 h-12 bg-gradient-to-b from-masa-300 to-transparent" />
                  )}
                </div>
              ))}
            </div>

            {/* Mid-page CTA */}
            <div className="text-center mt-12 md:mt-16">
              <Link
                href="/shop"
                className="inline-block bg-sunset-500 hover:bg-sunset-600 text-cream-50 px-8 sm:px-12 py-4 text-base sm:text-lg font-bold tracking-wider uppercase transition-colors shadow-lg hover:shadow-xl"
              >
                Shop H-E-B Tortillas
              </Link>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-charcoal-950 to-charcoal-900 text-cream-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-center mb-12 md:mb-16 reveal-text">
              {t('story.values.title')}
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
              {[
                {
                  value: 'OBSESSION',
                  desc: 'We\'re maybe a little too passionate about tortillas',
                  icon: (
                    <svg className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" opacity="0.3"/>
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      <circle cx="12" cy="11" r="2" fill="currentColor"/>
                    </svg>
                  ),
                },
                {
                  value: 'DEDICATION',
                  desc: 'We\'ll go to ridiculous lengths to get you the good stuff',
                  icon: (
                    <svg className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" opacity="0.3"/>
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                  ),
                },
                {
                  value: 'HONESTY',
                  desc: 'We\'re just people who really miss H-E-B® tortillas',
                  icon: (
                    <svg className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="currentColor" opacity="0.3"/>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"/>
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <div key={i} className="text-center scale-in group" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-sunset-400 to-sunset-600 rounded-2xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <div className="text-cream-50">{item.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gradient">{item.value}</h3>
                  <p className="text-cream-300 text-lg">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-cream-50 to-masa-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black mb-6 md:mb-8 magazine-text">
                {t('story.mission.title')}
              </h2>
              <p className="text-xl sm:text-2xl md:text-3xl font-display italic text-masa-600 mb-6 md:mb-8">
                {t('story.mission.quote')}
              </p>
              <p className="text-base sm:text-lg text-charcoal-700 mb-10 md:mb-12 leading-relaxed">
                {t('story.mission.description')}
              </p>

              <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-10 md:mt-16">
                {[
                  { number: '50', label: 'States Rescued' },
                  { number: '100%', label: 'Real H-E-B® Tortillas' },
                  { number: '247+', label: 'Fellow Tortilla Refugees' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-sunset-600 mb-1 sm:mb-2">{stat.number}</div>
                    <div className="text-xs sm:text-sm uppercase tracking-wider text-masa-700">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-16 md:py-20 bg-charcoal-950 text-cream-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl sm:text-3xl font-display font-bold mb-3 md:mb-4 text-gradient">
                    Maria Rodriguez
                  </h3>
                  <p className="text-lg sm:text-xl font-display italic mb-4 md:mb-6 text-masa-400">
                    Founder, Lonestar Tortillas
                  </p>
                  <p className="text-cream-300 mb-4 md:mb-6 text-sm sm:text-base leading-relaxed">
                    "I moved to New York for a job. The job was fine. The tortillas? Absolute tragedy.
                    I spent six months trying every brand, every bodega, every fancy grocery store.
                    Nothing. Just sadness wrapped in disappointment."
                  </p>
                  <p className="text-cream-300 text-sm sm:text-base leading-relaxed">
                    "So now I'm that person who drives to Texas, fills a van with H-E-B® tortillas,
                    and ships them to fellow refugees. Is it extra? Yes. Do I have regrets? Only that
                    I didn't start sooner. We're not affiliated with H-E-B® - we're just superfans with a shipping account."
                  </p>
                </div>
                <div className="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden order-1 md:order-2">
                  <Image
                    src="/images/product-hero.webp"
                    alt="Tortilla Making"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-cream-50 to-sunset-50 text-center relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-sunset-200/30 to-transparent blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-radial from-masa-200/20 to-transparent blur-3xl" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black mb-6 md:mb-8">
              {t('story.cta.title')}
            </h2>
            <p className="text-lg sm:text-xl mb-8 md:mb-12 max-w-2xl mx-auto text-charcoal-700 leading-relaxed">
              {t('story.cta.subtitle')}
            </p>

            {/* Primary CTA - Large and Prominent */}
            <div className="mb-8">
              <Link
                href="/shop"
                className="inline-block bg-sunset-500 text-cream-50 px-10 sm:px-16 py-5 sm:py-6 text-lg sm:text-2xl font-bold tracking-wide uppercase hover:bg-sunset-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Shop Now
              </Link>
            </div>

            {/* Secondary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/craft"
                className="inline-block border-2 border-charcoal-950 text-charcoal-950 px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold tracking-wide uppercase hover:bg-charcoal-950 hover:text-cream-50 transition-colors"
              >
                {t('story.cta.whyHeb') || 'Why H-E-B?'}
              </Link>
              <Link
                href="/guides"
                className="inline-block border-2 border-masa-600 text-masa-700 px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold tracking-wide uppercase hover:bg-masa-600 hover:text-cream-50 transition-colors"
              >
                View Guides
              </Link>
            </div>

            <p className="text-xs sm:text-sm text-charcoal-500 mt-8 md:mt-10 tracking-wider uppercase">
              {t('disclaimer.short')}
            </p>
          </div>
        </section>
      </div>
    </ScrollAnimations>
    </>
  )
}