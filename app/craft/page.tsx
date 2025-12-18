'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ScrollAnimations } from '@/components/ScrollAnimations'
import { LogoFull } from '@/components/ui/Logo'
import { BackgroundMusic } from '@/components/BackgroundMusic'
import { useLanguage } from '@/lib/language-context'

export default function CraftPage() {
  const { t } = useLanguage();
  return (
    <ScrollAnimations>
      <div className="relative bg-cream-50 text-charcoal-950 overflow-hidden">
        {/* <BackgroundMusic /> */}

        {/* Header */}
        <header className="shrink-header fixed top-8 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent">
          <div className="container mx-auto px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="logo-wrapper">
                <LogoFull className="text-charcoal-950" animated />
              </Link>
              <nav className="nav-items hidden md:flex items-center gap-8">
                <Link href="/pre-sale" className="group relative overflow-hidden">
                  <span className="relative z-10 text-sm font-medium tracking-wider uppercase transition-colors group-hover:text-sunset-600">Pre-Sale</span>
                </Link>
                <Link href="/craft" className="group relative overflow-hidden">
                  <span className="relative z-10 text-sm font-medium tracking-wider uppercase text-sunset-600">Source</span>
                </Link>
                <Link href="/guides" className="group relative overflow-hidden">
                  <span className="relative z-10 text-sm font-medium tracking-wider uppercase transition-colors group-hover:text-sunset-600">Guides & Tips</span>
                </Link>
                <Link href="/recipes" className="group relative overflow-hidden">
                  <span className="relative z-10 text-sm font-medium tracking-wider uppercase transition-colors group-hover:text-sunset-600">Recipes</span>
                </Link>
                <Link href="/blog" className="group relative overflow-hidden">
                  <span className="relative z-10 text-sm font-medium tracking-wider uppercase transition-colors group-hover:text-sunset-600">Blog & Stories</span>
                </Link>
                <Link href="/story" className="group relative overflow-hidden">
                  <span className="relative z-10 text-sm font-medium tracking-wider uppercase transition-colors group-hover:text-sunset-600">Story</span>
                </Link>
                <Link href="/pre-sale" className="inline-block bg-sunset-500 text-cream-50 px-6 py-3 rounded-full font-medium text-sm tracking-wider uppercase hover:bg-sunset-600 transition-colors">
                  Join Pre-Sale
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="min-h-[70vh] relative flex items-center justify-center overflow-hidden pt-24">
          <div className="absolute inset-0 parallax-img" data-speed="0.3">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream-50/50 to-cream-50" />
            <Image
              src="/images/artisan-hands.webp"
              alt="Artisan Hands Making Tortillas"
              fill
              className="object-cover opacity-40"
              priority
            />
          </div>

          <div className="relative z-10 container mx-auto px-8 text-center">
            <h1 className="magazine-text">
              <span className="block text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[0.8] text-gradient">
                {t('craft.hero.title')}
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl font-display font-light italic text-masa-600 mt-4">
                {t('craft.hero.subtitle')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mt-8 slide-left">
              {t('craft.hero.description')}
            </p>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-20 bg-gradient-to-b from-cream-50 to-cream-100">
          <div className="container mx-auto px-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-center mb-16 reveal-text">
              {t('craft.expertise.title')}
            </h2>

            <div className="max-w-5xl mx-auto">
              {[
                {
                  step: '01',
                  title: t('craft.expertise.step1.title'),
                  desc: t('craft.expertise.step1.desc'),
                  detail: t('craft.expertise.step1.detail'),
                },
                {
                  step: '02',
                  title: t('craft.expertise.step2.title'),
                  desc: t('craft.expertise.step2.desc'),
                  detail: t('craft.expertise.step2.detail'),
                },
                {
                  step: '03',
                  title: t('craft.expertise.step3.title'),
                  desc: t('craft.expertise.step3.desc'),
                  detail: t('craft.expertise.step3.detail'),
                },
                {
                  step: '04',
                  title: t('craft.expertise.step4.title'),
                  desc: t('craft.expertise.step4.desc'),
                  detail: t('craft.expertise.step4.detail'),
                },
                {
                  step: '05',
                  title: t('craft.expertise.step5.title'),
                  desc: t('craft.expertise.step5.desc'),
                  detail: t('craft.expertise.step5.detail'),
                },
              ].map((process, i) => (
                <div key={i} className="relative mb-16 last:mb-0 slide-left" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="flex gap-8">
                    {/* Step Number */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-sunset-500 to-sunset-600 rounded-full flex items-center justify-center text-cream-50 font-bold text-2xl">
                        {process.step}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="text-3xl font-display font-bold text-charcoal-950 mb-3">
                        {process.title}
                      </h3>
                      <p className="text-lg text-charcoal-700 mb-2">
                        {process.desc}
                      </p>
                      <p className="text-sm text-masa-600 italic">
                        {process.detail}
                      </p>
                    </div>
                  </div>

                  {/* Connecting Line */}
                  {i < 4 && (
                    <div className="absolute left-10 top-24 w-0.5 h-16 bg-gradient-to-b from-sunset-300 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ingredients Section */}
        <section className="py-20 bg-gradient-to-b from-charcoal-950 to-charcoal-900 text-cream-50">
          <div className="container mx-auto px-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-center mb-16 reveal-text">
              {t('craft.whyHeb.title')}
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  ingredient: t('craft.whyHeb.quality.title'),
                  desc: t('craft.whyHeb.quality.desc'),
                  icon: '★',
                },
                {
                  ingredient: t('craft.whyHeb.trust.title'),
                  desc: t('craft.whyHeb.trust.desc'),
                  icon: '🤝',
                },
                {
                  ingredient: t('craft.whyHeb.expertise.title'),
                  desc: t('craft.whyHeb.expertise.desc'),
                  icon: '🎯',
                },
              ].map((item, i) => (
                <div key={i} className="text-center scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-2 text-gradient">{item.ingredient}</h3>
                  <p className="text-cream-300">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-2xl font-display italic text-masa-400">
                {t('craft.whyHeb.quote')}
              </p>
              <p className="text-sm text-cream-400 mt-4 tracking-wider uppercase">
                {t('craft.whyHeb.tagline')}
              </p>
            </div>
          </div>
        </section>

        {/* Freshness Guarantee Section */}
        <section className="py-20 bg-gradient-to-b from-cream-50 to-cream-100">
          <div className="container mx-auto px-8 max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-display font-black text-center mb-12 text-charcoal-950">
              {t('craft.freshness.title')}
            </h2>

            <div className="prose prose-lg max-w-none text-charcoal-700">
              <p className="text-xl leading-relaxed mb-6">
                {t('craft.freshness.intro')}
              </p>

              <h3 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">{t('craft.freshness.sourcing.title')}</h3>
              <p className="mb-6">
                {t('craft.freshness.sourcing.text')}
              </p>

              <h3 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">{t('craft.freshness.packaging.title')}</h3>
              <p className="mb-6">
                {t('craft.freshness.packaging.text')}
              </p>

              <h3 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">{t('craft.freshness.shipping.title')}</h3>
              <p className="mb-6">
                {t('craft.freshness.shipping.text')}
              </p>

              <h3 className="text-2xl font-bold text-charcoal-950 mt-8 mb-4">{t('craft.freshness.guarantee.title')}</h3>
              <p className="mb-6">
                {t('craft.freshness.guarantee.text')}
              </p>
            </div>
          </div>
        </section>

        {/* Varieties Grid */}
        <section className="py-20 bg-gradient-to-b from-cream-100 to-masa-50">
          <div className="container mx-auto px-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-center mb-16 reveal-text">
              {t('craft.selection.title')}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { name: t('craft.selection.corn'), color: 'from-sunset-400 to-sunset-600' },
                { name: t('craft.selection.butter'), color: 'from-masa-400 to-masa-600' },
                { name: t('craft.selection.flour'), color: 'from-cream-400 to-cream-600' },
                { name: t('craft.selection.wheat'), color: 'from-lime-500 to-lime-700' },
              ].map((variety, i) => (
                <div key={i} className="group hover-lift">
                  <div className={`h-64 bg-gradient-to-br ${variety.color} rounded-lg flex items-center justify-center relative overflow-hidden`}>
                    <h3 className="text-2xl font-bold text-cream-50 text-center px-4">
                      {variety.name}
                    </h3>
                    <div className="absolute inset-0 bg-charcoal-950 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-charcoal-950 text-cream-50 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-8">
            {t('craft.cta.title')}
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            {t('craft.cta.subtitle')}
          </p>
          <Link href="/pre-sale" className="inline-block bg-sunset-500 text-cream-50 px-12 py-6 text-xl font-bold tracking-wide uppercase hover:bg-sunset-600 transition-colors hover-glow">
            {t('craft.cta.button')}
          </Link>
          <p className="text-sm text-cream-400 mt-8 tracking-wider uppercase">
            {t('disclaimer.short')}
          </p>
        </section>
      </div>
    </ScrollAnimations>
  )
}