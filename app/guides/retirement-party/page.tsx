import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Retirement Party Taco Bar Guide - Office Celebration Ideas',
  description: 'Plan the perfect retirement party taco bar! Complete guide with menu ideas, quantities for 20-75 coworkers, budget tips, and heartfelt celebration suggestions.',
  keywords: 'retirement party food, office retirement party, retirement celebration catering, coworker retirement party ideas, work retirement lunch, retirement party menu',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/retirement-party',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What food is good for a retirement party?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A taco bar is ideal for retirement parties—it\'s casual, interactive, accommodates all diets, and works within office budgets. It creates a festive atmosphere while being easy to serve. Add a themed dessert or cake for the guest of honor.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a retirement party cost per person?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A DIY retirement taco bar costs $8-12 per person for food. Catered options run $15-25 per person. For a 30-person office party, budget $240-750 total for food depending on whether you DIY or cater.',
      },
    },
  ],
}

export default function RetirementPartyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-sunset-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Retirement Party Taco Bar Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Send them off with a fiesta they'll remember</p>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image
            src="/images/guides/guide-retirement-party.webp"
            alt="Office retirement party taco celebration"
            fill
            className="object-cover"
            priority
          />
        </div>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-12-30" />

          {/* Quick Answer */}
          <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>A retirement party taco bar</strong> creates a festive, casual atmosphere for celebrating a colleague's career milestone. Plan 2-3 tacos per person for a lunch gathering, set up in a conference room or break area, and budget $8-15/person. Add a themed cake and heartfelt speeches!
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              After decades of hard work, your colleague deserves a proper send-off! A retirement party taco bar strikes the perfect balance between celebratory and practical—it's festive enough for the occasion but easy to pull off during a work day. Here's how to plan a retirement celebration they'll never forget.
            </p>
          </div>

          {/* Why It Works */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-sunset-500 pb-2">Why Tacos Work for Retirement Parties</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-sunset-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Office-Friendly</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-sunset-500 mr-2">+</span>Works during lunch hours</li>
                  <li><span className="text-sunset-500 mr-2">+</span>Easy conference room setup</li>
                  <li><span className="text-sunset-500 mr-2">+</span>People can eat and mingle</li>
                  <li><span className="text-sunset-500 mr-2">+</span>Accommodates all dietary needs</li>
                  <li><span className="text-sunset-500 mr-2">+</span>Minimal cleanup required</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Budget-Conscious</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-green-500 mr-2">$</span>$8-15 per person typical</li>
                  <li><span className="text-green-500 mr-2">$</span>Can be funded by collection</li>
                  <li><span className="text-green-500 mr-2">$</span>Scales to any team size</li>
                  <li><span className="text-green-500 mr-2">$</span>Company may cover some cost</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quantities */}
          <section className="mb-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Retirement Party Quantities</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full bg-cream-50 border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border px-4 py-3 text-left">Team Size</th>
                    <th className="border px-4 py-3 text-center">Tortillas</th>
                    <th className="border px-4 py-3 text-center">Protein</th>
                    <th className="border px-4 py-3 text-center">Budget*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-sunset-50">
                    <td className="border px-4 py-3 font-medium">20 people</td>
                    <td className="border px-4 py-3 text-center">60-80</td>
                    <td className="border px-4 py-3 text-center">6-8 lbs</td>
                    <td className="border px-4 py-3 text-center">$160-300</td>
                  </tr>
                  <tr className="hover:bg-sunset-50">
                    <td className="border px-4 py-3 font-medium">35 people</td>
                    <td className="border px-4 py-3 text-center">105-140</td>
                    <td className="border px-4 py-3 text-center">10-14 lbs</td>
                    <td className="border px-4 py-3 text-center">$280-525</td>
                  </tr>
                  <tr className="hover:bg-sunset-50">
                    <td className="border px-4 py-3 font-medium">50 people</td>
                    <td className="border px-4 py-3 text-center">150-200</td>
                    <td className="border px-4 py-3 text-center">15-20 lbs</td>
                    <td className="border px-4 py-3 text-center">$400-750</td>
                  </tr>
                  <tr className="hover:bg-sunset-50">
                    <td className="border px-4 py-3 font-medium">75 people</td>
                    <td className="border px-4 py-3 text-center">225-300</td>
                    <td className="border px-4 py-3 text-center">22-30 lbs</td>
                    <td className="border px-4 py-3 text-center">$600-1,125</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-charcoal-600 text-sm">
              *$8-15/person range. Lunch gatherings typically 2-3 tacos/person. Add $50-100 for cake and decorations.
            </p>
          </section>

          {/* Celebration Ideas */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-sunset-500 pb-2">Making It Special</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Personalized Touches</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Custom "Happy Retirement [Name]" banner</li>
                  <li>• Photo timeline of their career</li>
                  <li>• Memory cards from coworkers</li>
                  <li>• Their favorite taco toppings featured</li>
                  <li>• Theme based on retirement plans (travel, golf, etc.)</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Speeches & Toasts</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Keep speeches short (2-3 min each)</li>
                  <li>• Manager gives formal thank you</li>
                  <li>• Close colleagues share memories</li>
                  <li>• Let the retiree say a few words</li>
                  <li>• Toast with sparkling cider or lemonade</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Should the retiree help plan their own party?</h3>
                <p className="text-charcoal-700">Generally no—surprises are nice! But do discreetly ask about food allergies, dietary restrictions, and whether they prefer low-key or big celebrations. Some people don't like being the center of attention.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">When should we have the party?</h3>
                <p className="text-charcoal-700">Their last week or last day works best. Lunch timing (11:30am-1pm) is ideal—people can step away from work, enjoy the celebration, and still get back to their day.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-sunset-500 to-rust-600 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Celebrate Their Career in Style</h2>
            <p className="text-cream-200 mb-6">Get authentic Texas tortillas for a retirement celebration to remember.</p>
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
