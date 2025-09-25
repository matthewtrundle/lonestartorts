'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ScrollAnimations } from '@/components/ScrollAnimations'
import { LogoFull } from '@/components/ui/Logo'

export default function StoryPage() {
  return (
    <ScrollAnimations>
      <div className="relative bg-cream-50 text-charcoal-950 overflow-hidden">
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
                  <span className="relative z-10 text-sm font-medium tracking-wider uppercase transition-colors group-hover:text-sunset-600">Source</span>
                </Link>
                <Link href="/story" className="group relative overflow-hidden">
                  <span className="relative z-10 text-sm font-medium tracking-wider uppercase text-sunset-600">Story</span>
                </Link>
                <Link href="/pre-sale" className="inline-block bg-sunset-500 text-cream-50 px-6 py-3 rounded-full font-medium text-sm tracking-wider uppercase hover:bg-sunset-600 transition-colors">
                  Join Pre-Sale
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="min-h-[80vh] relative flex items-center justify-center overflow-hidden pt-24">
          <div className="absolute inset-0 parallax-img" data-speed="0.3">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal-950/50 to-charcoal-950" />
            <Image
              src="/images/texas-field.webp"
              alt="Texas Sunset"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="relative z-10 container mx-auto px-8 text-center text-cream-50">
            <h1 className="magazine-text">
              <span className="block text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[0.8]">
                OUR STORY
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl font-display font-light italic mt-4 text-masa-400">
                begins in Texas
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mt-8 slide-left">
              Born from a love of H-E-B® tortillas, we're the trusted independent source bringing
              genuine H-E-B® products to connoisseurs nationwide.
            </p>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-gradient-to-b from-cream-50 to-cream-100">
          <div className="container mx-auto px-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-center mb-16 reveal-text">
              THE JOURNEY
            </h2>

            <div className="max-w-4xl mx-auto">
              {[
                {
                  year: '2020',
                  title: 'The Discovery',
                  desc: 'Former Texans realize H-E-B® tortillas are what everyone\'s been missing',
                  highlight: true,
                },
                {
                  year: '2021',
                  title: 'Sourcing Excellence',
                  desc: 'We establish relationships to source genuine H-E-B® products directly',
                },
                {
                  year: '2022',
                  title: 'Perfecting Logistics',
                  desc: 'Mastering nationwide shipping to preserve H-E-B® quality and freshness',
                },
                {
                  year: '2023',
                  title: 'Serving Connoisseurs',
                  desc: 'Building a community of H-E-B® enthusiasts across America',
                },
                {
                  year: '2024',
                  title: 'Trusted Source',
                  desc: 'Thousands trust us as their source for genuine H-E-B® products',
                  highlight: true,
                },
                {
                  year: 'Today',
                  title: 'For Those Who Know',
                  desc: 'Your independent source for genuine H-E-B® tortillas nationwide',
                  highlight: true,
                },
              ].map((milestone, i) => (
                <div key={i} className="relative mb-12 last:mb-0">
                  <div className="flex gap-8 slide-left" style={{ animationDelay: `${i * 0.1}s` }}>
                    {/* Year */}
                    <div className="flex-shrink-0 w-32">
                      <div className={`text-2xl font-bold ${milestone.highlight ? 'text-sunset-600' : 'text-masa-600'}`}>
                        {milestone.year}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="text-2xl font-display font-bold text-charcoal-950 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-lg text-charcoal-700">
                        {milestone.desc}
                      </p>
                    </div>
                  </div>

                  {/* Connecting Line */}
                  {i < 5 && (
                    <div className="absolute left-16 top-12 w-0.5 h-12 bg-gradient-to-b from-masa-300 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gradient-to-b from-charcoal-950 to-charcoal-900 text-cream-50">
          <div className="container mx-auto px-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-center mb-16 reveal-text">
              OUR VALUES
            </h2>

            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                {
                  value: 'AUTHENTICITY',
                  desc: 'We source only genuine H-E-B® products, never substitutes',
                  icon: '★',
                },
                {
                  value: 'EXPERTISE',
                  desc: 'We know H-E-B® quality and how to deliver it perfectly',
                  icon: '◆',
                },
                {
                  value: 'TRUST',
                  desc: 'Your reliable independent source for H-E-B® products',
                  icon: '❤',
                },
              ].map((item, i) => (
                <div key={i} className="text-center scale-in" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="text-6xl mb-6 text-sunset-500">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-gradient">{item.value}</h3>
                  <p className="text-cream-300 text-lg">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 bg-gradient-to-b from-cream-50 to-masa-50">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-8 magazine-text">
                OUR MISSION
              </h2>
              <p className="text-2xl md:text-3xl font-display italic text-masa-600 mb-8">
                "To bring genuine H-E-B® tortillas to connoisseurs nationwide"
              </p>
              <p className="text-lg text-charcoal-700 mb-12">
                We believe those who know quality deserve access to H-E-B® tortillas, no matter where they live.
                As your trusted independent source, we're proud to deliver genuine H-E-B® products
                nationwide with expert care and shelf-stable convenience.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mt-16">
                {[
                  { number: '50', label: 'States Served' },
                  { number: '100%', label: 'Genuine H-E-B® Products' },
                  { number: '1000s', label: 'Satisfied Connoisseurs' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-5xl font-bold text-sunset-600 mb-2">{stat.number}</div>
                    <div className="text-sm uppercase tracking-wider text-masa-700">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-20 bg-charcoal-950 text-cream-50">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-display font-bold mb-4 text-gradient">
                    Maria Rodriguez
                  </h3>
                  <p className="text-xl font-display italic mb-6 text-masa-400">
                    Founder, Tortilla Rodeo Co.
                  </p>
                  <p className="text-cream-300 mb-6">
                    "Growing up in San Antonio, H-E-B® tortillas were the gold standard at every gathering.
                    When I moved to New York, I couldn't find anything that compared. That's when I realized:
                    those who know tortillas need access to H-E-B®, no matter where they live."
                  </p>
                  <p className="text-cream-300">
                    "We're your independent source for genuine H-E-B® products. We know what makes
                    these tortillas special, and we deliver that Texas quality nationwide with care."
                  </p>
                </div>
                <div className="relative h-96 rounded-lg overflow-hidden">
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
        <section className="py-20 bg-gradient-to-b from-cream-50 to-cream-100 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-8">
            BE PART OF OUR STORY
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-charcoal-700">
            Join thousands of families enjoying authentic Texas tortillas delivered nationwide
          </p>
          <div className="flex gap-6 justify-center">
            <Link href="/pre-sale" className="inline-block bg-sunset-500 text-cream-50 px-12 py-6 text-xl font-bold tracking-wide uppercase hover:bg-sunset-600 transition-colors hover-lift">
              Join Pre-Sale
            </Link>
            <Link href="/craft" className="inline-block border-2 border-charcoal-950 text-charcoal-950 px-12 py-6 text-xl font-bold tracking-wide uppercase hover:bg-charcoal-950 hover:text-cream-50 transition-colors">
              Why H-E-B®?
            </Link>
          </div>
          <p className="text-sm text-charcoal-500 mt-8 tracking-wider uppercase">
            Independent reseller • Not affiliated with or endorsed by H-E-B®
          </p>
        </section>
      </div>
    </ScrollAnimations>
  )
}