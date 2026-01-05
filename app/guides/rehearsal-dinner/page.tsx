import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Rehearsal Dinner Taco Bar Guide - Casual Pre-Wedding Celebration',
  description: 'Plan the perfect rehearsal dinner taco bar! Complete guide for intimate pre-wedding celebrations with menu ideas, quantities for 20-60 guests, and elegant presentation tips.',
  keywords: 'rehearsal dinner food, rehearsal dinner ideas, casual rehearsal dinner, taco rehearsal dinner, pre wedding dinner, rehearsal dinner catering, rehearsal dinner menu',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/rehearsal-dinner',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is a taco bar appropriate for a rehearsal dinner?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! Rehearsal dinners are meant to be more casual and intimate than the wedding. A taco bar creates a relaxed atmosphere for families to mingle before the big day. Many couples choose tacos to save budget for the wedding while still having delicious food.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a rehearsal dinner taco bar cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A rehearsal dinner taco bar costs $12-25 per person depending on proteins and service level. For a typical 30-person dinner, budget $360-750 for food. This is significantly less than traditional restaurant rehearsal dinners which average $50-100+ per person.',
      },
    },
  ],
}

export default function RehearsalDinnerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-pink-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Rehearsal Dinner Taco Bar Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">A relaxed start to your wedding weekend</p>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image
            src="/images/guides/guide-rehearsal-dinner.webp"
            alt="Intimate rehearsal dinner taco bar"
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
              <strong>A rehearsal dinner taco bar</strong> is a relaxed, budget-friendly option that lets families mingle before the big day. Plan 3-4 tacos per person, offer premium proteins, and elevate the presentation with elegant touches. Budget $12-25/person—far less than restaurant alternatives.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              The rehearsal dinner sets the tone for the wedding weekend—and it doesn't have to be stuffy! A taco bar is perfect for this intimate gathering of family and wedding party. It's casual enough for conversation, elevated enough to feel special, and saves budget for the big day.
            </p>
          </div>

          {/* Why It Works */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Why Tacos Work for Rehearsal Dinners</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-pink-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Atmosphere Benefits</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-pink-500 mr-2">+</span>Casual vibe encourages mingling</li>
                  <li><span className="text-pink-500 mr-2">+</span>Interactive—great ice-breaker</li>
                  <li><span className="text-pink-500 mr-2">+</span>Contrasts nicely with formal wedding</li>
                  <li><span className="text-pink-500 mr-2">+</span>No seating drama (buffet style)</li>
                  <li><span className="text-pink-500 mr-2">+</span>Everyone finds something they love</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Practical Benefits</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-green-500 mr-2">$</span>50-70% cheaper than restaurants</li>
                  <li><span className="text-green-500 mr-2">$</span>Easy dietary accommodation</li>
                  <li><span className="text-green-500 mr-2">$</span>Can host at home or venue</li>
                  <li><span className="text-green-500 mr-2">$</span>No menu pre-selection needed</li>
                  <li><span className="text-green-500 mr-2">$</span>Flexible timing</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quantities */}
          <section className="mb-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Rehearsal Dinner Quantities</h2>

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
                    <td className="border px-4 py-3 font-medium">20 guests</td>
                    <td className="border px-4 py-3 text-center">80-100</td>
                    <td className="border px-4 py-3 text-center">8-10 lbs</td>
                    <td className="border px-4 py-3 text-center">$240-500</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">30 guests</td>
                    <td className="border px-4 py-3 text-center">120-150</td>
                    <td className="border px-4 py-3 text-center">12-15 lbs</td>
                    <td className="border px-4 py-3 text-center">$360-750</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">40 guests</td>
                    <td className="border px-4 py-3 text-center">160-200</td>
                    <td className="border px-4 py-3 text-center">16-20 lbs</td>
                    <td className="border px-4 py-3 text-center">$480-1,000</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">60 guests</td>
                    <td className="border px-4 py-3 text-center">240-300</td>
                    <td className="border px-4 py-3 text-center">24-30 lbs</td>
                    <td className="border px-4 py-3 text-center">$720-1,500</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-charcoal-600 text-sm">
              *$12-25/person for elevated rehearsal dinner. Compare to restaurant rehearsal dinners averaging $50-100+ per person!
            </p>
          </section>

          {/* Elevated Menu */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Elevated Menu Suggestions</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-pink-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Premium Proteins</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• <strong><Link href="/recipes/carnitas" className="text-rust-600 hover:underline">Carnitas</Link></strong> - Citrus-braised pork</li>
                  <li>• <strong>Carne Asada</strong> - Grilled flank steak</li>
                  <li>• <strong>Grilled Shrimp</strong> - Lime & garlic</li>
                  <li>• <strong><Link href="/recipes/birria-tacos" className="text-rust-600 hover:underline">Birria</Link></strong> - With consomé</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-sunset-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Elegant Touches</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Fresh flowers at food station</li>
                  <li>• Cloth napkins</li>
                  <li>• Elegant serving dishes</li>
                  <li>• Professional signage</li>
                  <li>• Mood lighting</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Drink Pairings</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Batch margaritas</li>
                  <li>• Wine selection</li>
                  <li>• Mexican beer</li>
                  <li>• Sparkling water</li>
                  <li>• Agua frescas</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Venue Ideas */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Where to Host</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Casual Options</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Parent's backyard (classic!)</li>
                  <li>• Wedding venue (rehearsal + dinner)</li>
                  <li>• Local brewery/winery</li>
                  <li>• Community room/clubhouse</li>
                  <li>• Restaurant private room</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Elevated Options</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Boutique hotel courtyard</li>
                  <li>• Historic venue</li>
                  <li>• Art gallery space</li>
                  <li>• Rooftop terrace</li>
                  <li>• Family ranch/farm</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Traditions */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Rehearsal Dinner Traditions</h2>

            <div className="bg-masa-50 p-6 rounded-lg">
              <p className="text-charcoal-700 mb-4">A taco bar doesn't mean skipping meaningful moments. Include:</p>
              <ul className="space-y-2 text-charcoal-700">
                <li>• <strong>Welcome toast</strong> from hosts (usually groom's parents)</li>
                <li>• <strong>Thank you speeches</strong> to wedding party</li>
                <li>• <strong>Gift presentation</strong> for attendants</li>
                <li>• <strong>Slideshow or stories</strong> about the couple</li>
                <li>• <strong>Toast to tomorrow</strong> from couple</li>
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Who typically hosts the rehearsal dinner?</h3>
                <p className="text-charcoal-700">Traditionally, the groom's parents host. However, modern couples may split costs, have other family members host, or pay for it themselves. A taco bar makes hosting more accessible budget-wise.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">What if we're also having tacos at the wedding?</h3>
                <p className="text-charcoal-700">Vary the proteins! If the <Link href="/guides/wedding-taco-bar" className="text-rust-600 hover:underline">wedding has carnitas and chicken</Link>, do birria and shrimp at the rehearsal. Different salsas and presentations make each feel unique.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">How do we keep it from feeling too casual?</h3>
                <p className="text-charcoal-700">Elevate with presentation: real dishes, cloth napkins, professional signage, fresh flowers, good lighting. Premium proteins like grilled shrimp or birria add sophistication. It's casual-elegant!</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-pink-500 to-rust-600 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Start Your Wedding Weekend Right</h2>
            <p className="text-cream-200 mb-6">Premium tortillas for your rehearsal dinner celebration.</p>
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
