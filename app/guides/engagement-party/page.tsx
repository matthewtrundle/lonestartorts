import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Engagement Party Taco Bar Guide - Celebrate the Couple!',
  description: 'Plan the perfect engagement party taco bar! Complete guide with fiesta theme ideas, quantities for 25-75 guests, romantic menu suggestions, and budget tips.',
  keywords: 'engagement party food, engagement party ideas, engagement taco bar, fiesta engagement party, engagement party catering, engagement celebration food',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/engagement-party',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What food do you serve at an engagement party?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A taco bar is perfect for engagement parties—it\'s casual, interactive, and budget-friendly while still feeling special. Serve 2-3 premium proteins, festive toppings, and pair with margaritas or champagne. The interactive nature helps guests mingle.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who pays for the engagement party food?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Traditionally, the host pays (often parents or close friends). Modern engagement parties may be hosted by friends, family, or even the couple themselves. A taco bar keeps costs reasonable at $10-15 per person.',
      },
    },
  ],
}

export default function EngagementPartyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-pink-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Engagement Party Taco Bar Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Toast to their love with a festive fiesta celebration</p>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image
            src="/images/guides/guide-engagement-party.webp"
            alt="Romantic engagement party taco bar"
            fill
            className="object-cover"
            priority
          />
        </div>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-12-30" />

          {/* Quick Answer */}
          <div className="bg-pink-50 border-l-4 border-pink-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>An engagement party taco bar</strong> creates a fun, festive atmosphere for celebrating the happy couple. Plan 3 tacos per person, serve premium proteins like carnitas and carne asada, and pair with margaritas or champagne. Budget $10-15/person for an elevated experience.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              Engagement parties should be joyful, relaxed, and all about celebrating love! A taco bar hits all the right notes—it's festive enough to feel special, casual enough for mingling, and lets guests customize their plates. Plus, it's a delicious preview if you're planning a <Link href="/guides/wedding-taco-bar" className="text-rust-600 hover:underline">wedding taco bar</Link> too!
            </p>
          </div>

          {/* Theme Ideas */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Engagement Fiesta Themes</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-pink-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Romantic Fiesta</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Soft pink & gold colors</li>
                  <li>• Rose gold decorations</li>
                  <li>• Fresh flowers on tables</li>
                  <li>• String lights ambiance</li>
                  <li>• Elegant serving dishes</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-sunset-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Festive Fiesta</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Colorful papel picado</li>
                  <li>• Bright table runners</li>
                  <li>• Taco-themed puns</li>
                  <li>• Margarita bar</li>
                  <li>• Piñata with candy</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Backyard Casual</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Outdoor string lights</li>
                  <li>• Picnic tables & blankets</li>
                  <li>• Lawn games</li>
                  <li>• Coolers with drinks</li>
                  <li>• S'mores station after</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quantities */}
          <section className="mb-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Engagement Party Quantities</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full bg-cream-50 border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border px-4 py-3 text-left">Guest Count</th>
                    <th className="border px-4 py-3 text-center">Tortillas</th>
                    <th className="border px-4 py-3 text-center">Protein</th>
                    <th className="border px-4 py-3 text-center">Budget*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">25 guests</td>
                    <td className="border px-4 py-3 text-center">90-115</td>
                    <td className="border px-4 py-3 text-center">8-10 lbs</td>
                    <td className="border px-4 py-3 text-center">$250-375</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">40 guests</td>
                    <td className="border px-4 py-3 text-center">145-185</td>
                    <td className="border px-4 py-3 text-center">12-16 lbs</td>
                    <td className="border px-4 py-3 text-center">$400-600</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">60 guests</td>
                    <td className="border px-4 py-3 text-center">215-275</td>
                    <td className="border px-4 py-3 text-center">18-24 lbs</td>
                    <td className="border px-4 py-3 text-center">$600-900</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">75 guests</td>
                    <td className="border px-4 py-3 text-center">270-340</td>
                    <td className="border px-4 py-3 text-center">22-30 lbs</td>
                    <td className="border px-4 py-3 text-center">$750-1,125</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-charcoal-600 text-sm">
              *$10-15/person for elevated engagement party experience. Include appetizers, drinks, and dessert in your overall budget.
            </p>
          </section>

          {/* Elevated Menu */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Elevated Menu Ideas</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Premium Proteins</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• <strong><Link href="/recipes/carnitas" className="text-rust-600 hover:underline">Carnitas</Link></strong> - Citrus-braised pulled pork</li>
                  <li>• <strong>Carne Asada</strong> - Grilled marinated steak</li>
                  <li>• <strong>Chicken Tinga</strong> - Smoky chipotle chicken</li>
                  <li>• <strong>Grilled Shrimp</strong> - For seafood lovers</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Drink Pairings</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• <strong>Margaritas</strong> - Classic celebration drink</li>
                  <li>• <strong>Champagne Toast</strong> - For speeches</li>
                  <li>• <strong>Agua Frescas</strong> - Non-alcoholic options</li>
                  <li>• <strong>Micheladas</strong> - Mexican beer cocktail</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Is a taco bar too casual for an engagement party?</h3>
                <p className="text-charcoal-700">Not at all! Engagement parties are meant to be fun and relaxed. Elevate the presentation with nice serving dishes, elegant signage, and premium ingredients. The casual nature helps guests mingle—which is the whole point!</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">What activities pair well with a taco bar?</h3>
                <p className="text-charcoal-700">Keep it casual: cocktail hour mingling, a toast to the couple, story sharing about how they met, and maybe a simple game like "how they met" trivia. Save formal games for the bridal shower.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-pink-500 to-rust-600 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Celebrate Their Love in Style</h2>
            <p className="text-cream-200 mb-6">Premium tortillas for an engagement celebration to remember.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-6 py-3 rounded-lg font-semibold transition-colors">Shop Tortillas</Link>
              <Link href="/guides/wedding-taco-bar" className="border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors">Wedding Taco Bar Guide</Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
