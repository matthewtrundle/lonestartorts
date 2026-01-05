import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'First Communion Party Food Guide - Celebration Ideas',
  description: 'Plan the perfect First Communion celebration! Complete guide with party food ideas, taco bar options, quantities for family gatherings, and decoration suggestions.',
  keywords: 'first communion party food, first communion celebration, primera comunion party, communion party ideas, first communion catering, communion party menu',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/first-communion',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What food do you serve at a First Communion party?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'First Communion parties typically feature a family-style meal after the church ceremony. Popular options include a taco bar, pasta dishes, sandwiches, or traditional cultural foods. The meal should be easy to serve to groups of 25-75+ guests and accommodate dietary restrictions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many guests attend a First Communion party?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most First Communion parties host 30-75 guests, including close family, godparents, and friends. Some families keep it intimate (15-25), while others celebrate with larger extended family gatherings (75-100+). Plan food quantities based on your confirmed guest count.',
      },
    },
  ],
}

export default function FirstCommunionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-pink-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">First Communion Party Food Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Celebrate this blessed milestone with family</p>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image
            src="/images/guides/guide-first-communion.webp"
            alt="First Communion celebration taco party"
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
              <strong>A First Communion party</strong> celebrates a child's important religious milestone with family and friends. A taco bar is ideal—it's budget-friendly ($8-12/person), feeds 30-75 guests easily, and lets everyone enjoy time together rather than worrying about complicated food service.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              First Communion (Primera Comunión) is a significant religious milestone for children and families. The celebration after the church ceremony brings loved ones together for food, fellowship, and honoring this special day. Here's how to plan a memorable meal without stress.
            </p>
          </div>

          {/* Understanding the Celebration */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Planning the Celebration</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-pink-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Event Timeline</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• Church ceremony (morning/early afternoon)</li>
                  <li>• Photos after Mass</li>
                  <li>• Party starts 1-2 hours after ceremony</li>
                  <li>• Lunch/brunch timing most common</li>
                  <li>• 2-4 hour celebration typical</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Guest Considerations</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• Typically 30-75 guests</li>
                  <li>• Mix of adults and children</li>
                  <li>• Grandparents/elderly family</li>
                  <li>• Child's school friends sometimes</li>
                  <li>• Padrinos/godparents honored</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quantities */}
          <section className="mb-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">First Communion Quantities</h2>

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
                    <td className="border px-4 py-3 text-center">$200-300</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">40 guests</td>
                    <td className="border px-4 py-3 text-center">145-185</td>
                    <td className="border px-4 py-3 text-center">12-16 lbs</td>
                    <td className="border px-4 py-3 text-center">$320-480</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">60 guests</td>
                    <td className="border px-4 py-3 text-center">215-275</td>
                    <td className="border px-4 py-3 text-center">18-24 lbs</td>
                    <td className="border px-4 py-3 text-center">$480-720</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">75 guests</td>
                    <td className="border px-4 py-3 text-center">270-340</td>
                    <td className="border px-4 py-3 text-center">22-30 lbs</td>
                    <td className="border px-4 py-3 text-center">$600-900</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-charcoal-600 text-sm">
              *DIY food costs at $8-12/person. Note: children typically eat 1-2 tacos, adults 3. Account for kid-friendly options.
            </p>
          </section>

          {/* Menu Ideas */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Family-Friendly Menu</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-pink-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Kid-Approved Proteins</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Seasoned ground beef</li>
                  <li>• Plain shredded chicken</li>
                  <li>• Cheese quesadillas</li>
                  <li>• Black beans</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Adult Options</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• <Link href="/recipes/carnitas" className="text-rust-600 hover:underline">Carnitas</Link></li>
                  <li>• Chicken tinga</li>
                  <li>• Carne asada</li>
                  <li>• Spicier salsas on side</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-sunset-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Kid-Friendly Sides</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Chips & mild salsa</li>
                  <li>• Mexican rice</li>
                  <li>• Fresh fruit</li>
                  <li>• Juice boxes/sodas</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-pink-50 p-6 rounded-lg">
              <h4 className="font-bold text-pink-800 mb-2">Dessert Ideas</h4>
              <p className="text-pink-700 text-sm">
                A decorated First Communion cake (cross, chalice, or dove theme) is traditional. Add churros, cupcakes, or a candy table. Tres leches cake is a popular choice that feeds large groups easily.
              </p>
            </div>
          </section>

          {/* Decorations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Celebration Decor</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Color Themes</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• <strong>Girls:</strong> White, pink, gold</li>
                  <li>• <strong>Boys:</strong> White, blue, silver</li>
                  <li>• Cross and dove motifs</li>
                  <li>• Chalice decorations</li>
                  <li>• Religious symbols</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Special Touches</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• Photo display of the child</li>
                  <li>• Guest book for blessings</li>
                  <li>• Favor bags with rosaries/crosses</li>
                  <li>• Personalized banners</li>
                  <li>• Balloon arrangements</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Should I include the child's friends from school?</h3>
                <p className="text-charcoal-700">Many families invite just immediate family and close relatives. If inviting school friends, consider having them come for cake/dessert only to manage numbers. The child should feel special without the party becoming overwhelming.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Can we do a combined party for siblings receiving communion together?</h3>
                <p className="text-charcoal-700">Absolutely! Combined celebrations are common and practical. Give each child their own cake or section of a large cake, and make sure both feel equally honored. This also helps with costs.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-pink-500 to-blue-500 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Celebrate Their First Communion</h2>
            <p className="text-cream-200 mb-6">Authentic tortillas for your family celebration.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-6 py-3 rounded-lg font-semibold transition-colors">Shop Tortillas</Link>
              <Link href="/tools/party-calculator" className="border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors">Party Calculator</Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
