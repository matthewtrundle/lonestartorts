import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Church Potluck Taco Bar Guide - Congregation Dinner Ideas',
  description: 'Plan the perfect church potluck taco bar! Complete guide with quantities for 50-200+ congregants, budget-friendly tips, and easy setup for fellowship halls.',
  keywords: 'church potluck food, congregation dinner, church taco bar, fellowship meal ideas, church dinner, potluck ideas large group, church fellowship food',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/church-potluck',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much food do you need for a church potluck of 100 people?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For 100 people at a church potluck taco bar, plan 300-400 tacos (3-4 per person), 25-30 lbs of protein, and 8-10 lbs of each topping. Budget $500-800 if the church provides all food, or coordinate potluck contributions to split costs among families.',
      },
    },
    {
      '@type': 'Question',
      name: 'What food is good for a large church gathering?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A taco bar is ideal for large church gatherings—it serves itself, accommodates dietary restrictions, scales easily, and is budget-friendly. Set up multiple serving lines for crowds over 75, and keep the toppings simple to reduce complexity and cost.',
      },
    },
  ],
}

export default function ChurchPotluckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Church Potluck Taco Bar Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Feed the congregation with fellowship and food</p>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image
            src="/images/guides/guide-church-potluck.webp"
            alt="Church fellowship hall taco potluck"
            fill
            className="object-cover"
            priority
          />
        </div>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-12-30" />

          {/* Quick Answer */}
          <div className="bg-masa-50 border-l-4 border-masa-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>A church potluck taco bar</strong> brings the congregation together affordably. Plan 3 tacos per person, coordinate contributions (church provides proteins, families bring sides/toppings), and set up multiple serving lines for large groups. Budget $5-8/person for a complete meal.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              Church potlucks and fellowship meals bring communities together. A taco bar is perfect for congregations of any size—it's self-serve, budget-friendly, and creates a festive atmosphere. Here's how to plan a church dinner that feeds everyone without straining the budget.
            </p>
          </div>

          {/* Why Tacos Work */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-masa-500 pb-2">Why Tacos Work for Church Events</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-masa-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Practical Benefits</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-masa-500 mr-2">+</span>Self-serve reduces volunteers needed</li>
                  <li><span className="text-masa-500 mr-2">+</span>Scales from 50 to 500 people</li>
                  <li><span className="text-masa-500 mr-2">+</span>Fellowship hall friendly</li>
                  <li><span className="text-masa-500 mr-2">+</span>Easy potluck coordination</li>
                  <li><span className="text-masa-500 mr-2">+</span>Kid-friendly options built in</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Budget Benefits</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-green-500 mr-2">$</span>$5-8 per person possible</li>
                  <li><span className="text-green-500 mr-2">$</span>Potluck style splits costs</li>
                  <li><span className="text-green-500 mr-2">$</span>Uses existing kitchen/fellowship hall</li>
                  <li><span className="text-green-500 mr-2">$</span>Volunteer-based serving</li>
                  <li><span className="text-green-500 mr-2">$</span>Leftovers easy to distribute</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quantities */}
          <section className="mb-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Church Event Quantities</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full bg-cream-50 border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border px-4 py-3 text-left">Congregation Size</th>
                    <th className="border px-4 py-3 text-center">Tortillas</th>
                    <th className="border px-4 py-3 text-center">Protein</th>
                    <th className="border px-4 py-3 text-center">Serving Lines</th>
                    <th className="border px-4 py-3 text-center">Budget*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-masa-50">
                    <td className="border px-4 py-3 font-medium">50 people</td>
                    <td className="border px-4 py-3 text-center">175-225</td>
                    <td className="border px-4 py-3 text-center">15-18 lbs</td>
                    <td className="border px-4 py-3 text-center">1</td>
                    <td className="border px-4 py-3 text-center">$250-400</td>
                  </tr>
                  <tr className="hover:bg-masa-50">
                    <td className="border px-4 py-3 font-medium">100 people</td>
                    <td className="border px-4 py-3 text-center">350-450</td>
                    <td className="border px-4 py-3 text-center">30-36 lbs</td>
                    <td className="border px-4 py-3 text-center">2</td>
                    <td className="border px-4 py-3 text-center">$500-800</td>
                  </tr>
                  <tr className="hover:bg-masa-50">
                    <td className="border px-4 py-3 font-medium">150 people</td>
                    <td className="border px-4 py-3 text-center">525-675</td>
                    <td className="border px-4 py-3 text-center">45-55 lbs</td>
                    <td className="border px-4 py-3 text-center">2-3</td>
                    <td className="border px-4 py-3 text-center">$750-1,200</td>
                  </tr>
                  <tr className="hover:bg-masa-50">
                    <td className="border px-4 py-3 font-medium">200+ people</td>
                    <td className="border px-4 py-3 text-center">700-900</td>
                    <td className="border px-4 py-3 text-center">60-75 lbs</td>
                    <td className="border px-4 py-3 text-center">3-4</td>
                    <td className="border px-4 py-3 text-center">$1,000-1,600</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-charcoal-600 text-sm">
              *Costs if church provides everything. Potluck style can reduce this by 50% or more.
            </p>
          </section>

          {/* Potluck Coordination */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-masa-500 pb-2">Potluck Coordination</h2>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-charcoal-950 mb-4">Suggested Sign-Up System</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-charcoal-950 mb-2">Church Provides:</h4>
                  <ul className="space-y-2 text-charcoal-700 text-sm">
                    <li>• Tortillas (buy in bulk)</li>
                    <li>• Main proteins (1-2 types)</li>
                    <li>• Paper goods and utensils</li>
                    <li>• Drinks</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-950 mb-2">Families Sign Up For:</h4>
                  <ul className="space-y-2 text-charcoal-700 text-sm">
                    <li>• Toppings (assign: cheese, lettuce, tomato, etc.)</li>
                    <li>• Side dishes (rice, beans, chips)</li>
                    <li>• Salsa and guacamole</li>
                    <li>• Desserts</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">How do we keep food safe for a long fellowship meal?</h3>
                <p className="text-charcoal-700">Use chafing dishes with Sterno for proteins (keeps food above 140°F). Keep cold toppings on ice. Replace items every 2 hours if the meal stretches longer. The church kitchen can hold backups ready to swap in.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">What about members with food allergies?</h3>
                <p className="text-charcoal-700">Label all items clearly with ingredients. Corn tortillas are naturally gluten-free. Keep vegetarian options separate. For severe allergies, consider having those members bring their own safe dish that they can enjoy.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-masa-500 to-rust-600 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Feed Your Congregation</h2>
            <p className="text-cream-200 mb-6">Bulk tortillas for church events at great prices.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-6 py-3 rounded-lg font-semibold transition-colors">Shop Tortillas</Link>
              <Link href="/wholesale" className="border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors">Wholesale Inquiry</Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
