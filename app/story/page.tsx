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
              What started as a desperate midnight Google search for "H-E-B® tortillas shipped to NYC"
              became a mission to help fellow tortilla refugees nationwide.
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
                  value: 'OBSESSION',
                  desc: 'We\'re maybe a little too passionate about tortillas',
                  icon: '🌮',
                },
                {
                  value: 'DEDICATION',
                  desc: 'We\'ll go to ridiculous lengths to get you the good stuff',
                  icon: '🚗',
                },
                {
                  value: 'HONESTY',
                  desc: 'We\'re just people who really miss H-E-B® tortillas',
                  icon: '💯',
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
                "To rescue tortilla-deprived Americans from mediocre wraps"
              </p>
              <p className="text-lg text-charcoal-700 mb-12">
                Look, we get it. You moved away from Texas and suddenly realized that not all tortillas
                are created equal. We\'re here because we had the same existential crisis. Now we\'re just
                some folks who go to H-E-B®, buy tortillas, and ship them to people who understand the struggle.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mt-16">
                {[
                  { number: '50', label: 'States Rescued' },
                  { number: '100%', label: 'Real H-E-B® Tortillas' },
                  { number: '247+', label: 'Fellow Tortilla Refugees' },
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
                    Founder, Lonestar Tortillas
                  </p>
                  <p className="text-cream-300 mb-6">
                    "I moved to New York for a job. The job was fine. The tortillas? Absolute tragedy.
                    I spent six months trying every brand, every bodega, every fancy grocery store.
                    Nothing. Just sadness wrapped in disappointment."
                  </p>
                  <p className="text-cream-300">
                    "So now I'm that person who drives to Texas, fills a van with H-E-B® tortillas,
                    and ships them to fellow refugees. Is it extra? Yes. Do I have regrets? Only that
                    I didn't start sooner. We're not affiliated with H-E-B® - we're just superfans with a shipping account."
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