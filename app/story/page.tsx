'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ScrollAnimations } from '@/components/ScrollAnimations'
import { useLanguage } from '@/lib/language-context'

export default function StoryPage() {
  const { t } = useLanguage();
  return (
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

        {/* Texas Food Culture Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-cream-50 to-cream-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-center mb-6 reveal-text">
              A Texas Tradition
            </h2>
            <p className="text-xl text-center text-charcoal-700 max-w-3xl mx-auto mb-12 md:mb-16">
              Tortillas are more than food in Texas — they&apos;re a way of life
            </p>

            <div className="max-w-4xl mx-auto">
              {[
                {
                  icon: (
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: 'Generations at the Table',
                  desc: 'In Texas homes, tortillas have brought families together for generations. From abuelitas teaching grandchildren to make masa by hand, to Sunday barbacoa breakfasts, the tortilla is the foundation of our most treasured meals and memories.',
                  highlight: true,
                },
                {
                  icon: (
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: 'The Heart of Tex-Mex',
                  desc: 'Texas created a cuisine all its own — a beautiful fusion of Mexican tradition and Texas flair. Breakfast tacos, fajitas, enchiladas, and more all start with one essential ingredient: a quality tortilla that can hold bold flavors and bring people together.',
                },
                {
                  icon: (
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: 'H-E-B: A Texas Institution',
                  desc: 'For over a century, H-E-B has been the grocery store Texans trust. Their tortillas are made with the same care and quality that has made them a household name. When Texans move away, H-E-B tortillas are what they miss most.',
                },
                {
                  icon: (
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: 'Comfort Food, Anywhere',
                  desc: 'Whether you&apos;re a Texan living far from home or someone who discovered the magic of authentic Texas tortillas, we believe everyone deserves access to this comfort. Good food connects us to our roots and to each other.',
                  highlight: true,
                },
                {
                  icon: (
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  title: 'Our Mission',
                  desc: 'We&apos;re on a mission to share the taste of Texas with tortilla lovers everywhere. Authentic H-E-B tortillas, shipped fresh to your door, no matter where you call home. Because great food shouldn&apos;t have borders.',
                  highlight: true,
                },
              ].map((item, i) => (
                <div key={i} className="relative mb-10 md:mb-14 last:mb-0">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 slide-left" style={{ animationDelay: `${i * 0.1}s` }}>
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.highlight ? 'bg-sunset-100 text-sunset-600' : 'bg-masa-100 text-masa-600'}`}>
                        {item.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-charcoal-950 mb-2 sm:mb-3">
                        {item.title}
                      </h3>
                      <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mid-page CTA */}
            <div className="text-center mt-12 md:mt-16">
              <Link
                href="/shop"
                className="inline-block bg-sunset-500 hover:bg-sunset-600 text-cream-50 px-8 sm:px-12 py-4 text-base sm:text-lg font-bold tracking-wider uppercase transition-colors shadow-lg hover:shadow-xl"
              >
                Taste the Tradition
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
  )
}