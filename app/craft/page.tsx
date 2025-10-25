'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ScrollAnimations } from '@/components/ScrollAnimations'
import { LogoFull } from '@/components/ui/Logo'
import { BackgroundMusic } from '@/components/BackgroundMusic'

export default function CraftPage() {
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
                THE SOURCE
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl font-display font-light italic text-masa-600 mt-4">
                of excellence
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mt-8 slide-left">
              Those who know tortillas know H-E-B®. We're expert curators bringing genuine H-E-B® products
              to connoisseurs nationwide who won't settle for anything less.
            </p>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-20 bg-gradient-to-b from-cream-50 to-cream-100">
          <div className="container mx-auto px-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-center mb-16 reveal-text">
              OUR EXPERTISE
            </h2>

            <div className="max-w-5xl mx-auto">
              {[
                {
                  step: '01',
                  title: 'PRODUCT SELECTION',
                  desc: 'We source only genuine H-E-B® tortillas, the gold standard that Texas locals trust for authentic quality',
                  detail: 'Every product is verified authentic H-E-B® merchandise',
                },
                {
                  step: '02',
                  title: 'QUALITY ASSURANCE',
                  desc: 'Each batch is inspected to ensure it meets H-E-B® standards and our exacting requirements for freshness',
                  detail: 'Only the freshest products make it to our inventory',
                },
                {
                  step: '03',
                  title: 'EXPERT PACKAGING',
                  desc: 'Products are carefully repackaged to maintain H-E-B® quality during nationwide shipping',
                  detail: 'Shelf-stable packaging preserves authentic taste and texture',
                },
                {
                  step: '04',
                  title: 'RAPID FULFILLMENT',
                  desc: 'Orders are processed same-day and shipped via our optimized logistics network for maximum freshness',
                  detail: '2-3 day delivery ensures you get H-E-B® quality at its peak',
                },
                {
                  step: '05',
                  title: 'CUSTOMER SATISFACTION',
                  desc: 'We stand behind every H-E-B® product we ship with our satisfaction guarantee',
                  detail: 'Your trust in our curation expertise is our top priority',
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
              WHY H-E-B®?
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  ingredient: 'QUALITY',
                  desc: 'H-E-B® sets the standard for tortilla excellence in Texas',
                  icon: '★',
                },
                {
                  ingredient: 'TRUST',
                  desc: 'The brand Texans have relied on for generations',
                  icon: '🤝',
                },
                {
                  ingredient: 'EXPERTISE',
                  desc: 'We know how to source and ship H-E-B® products perfectly',
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
                "Those who know, know H-E-B® tortillas."
              </p>
              <p className="text-sm text-cream-400 mt-4 tracking-wider uppercase">
                The choice of tortilla connoisseurs
              </p>
            </div>
          </div>
        </section>

        {/* Varieties Grid */}
        <section className="py-20 bg-gradient-to-b from-cream-50 to-masa-50">
          <div className="container mx-auto px-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-center mb-16 reveal-text">
              H-E-B® SELECTION
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { name: 'H-E-B® Mi Tienda Corn', color: 'from-sunset-400 to-sunset-600' },
                { name: 'H-E-B® Butter Tortillas', color: 'from-masa-400 to-masa-600' },
                { name: 'H-E-B® Flour Tortillas', color: 'from-cream-400 to-cream-600' },
                { name: 'H-E-B® Whole Wheat', color: 'from-lime-500 to-lime-700' },
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
            TASTE THE DIFFERENCE
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Experience why H-E-B® tortillas are the gold standard - now available nationwide
          </p>
          <Link href="/pre-sale" className="inline-block bg-sunset-500 text-cream-50 px-12 py-6 text-xl font-bold tracking-wide uppercase hover:bg-sunset-600 transition-colors hover-glow">
            Join Pre-Sale List
          </Link>
          <p className="text-sm text-cream-400 mt-8 tracking-wider uppercase">
            Independent reseller • Not affiliated with or endorsed by H-E-B®
          </p>
        </section>
      </div>
    </ScrollAnimations>
  )
}