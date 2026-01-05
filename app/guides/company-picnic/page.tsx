import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Company Picnic Taco Bar Guide - Corporate Outdoor Events',
  description: 'Plan the perfect company picnic taco bar! Complete guide for outdoor corporate events with quantities for 50-300+ employees, setup tips, and budget-friendly options.',
  keywords: 'company picnic food, corporate picnic catering, company outing food, outdoor corporate event, employee picnic ideas, company bbq alternatives, work picnic catering',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/company-picnic',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much food do you need for a company picnic?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a company picnic, plan 3-4 tacos per adult and 2 per child. A company of 100 employees plus 100 family members needs approximately 500-600 tacos, 40-50 lbs of protein, and proportional toppings. Always add 15% buffer for big eaters.',
      },
    },
    {
      '@type': 'Question',
      name: 'What food is best for an outdoor company event?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tacos are ideal for outdoor corporate events—they\'re handheld (no tables required), stay warm in chafing dishes, accommodate all diets, and are interactive. Plus, they\'re budget-friendly at $8-15 per person depending on service level.',
      },
    },
  ],
}

export default function CompanyPicnicPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-green-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Company Picnic Taco Bar Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Feed the whole team at your outdoor corporate event</p>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image
            src="/images/guides/guide-company-picnic.webp"
            alt="Outdoor company picnic taco bar"
            fill
            className="object-cover"
            priority
          />
        </div>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-12-30" />

          {/* Quick Answer */}
          <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>A company picnic taco bar</strong> is perfect for outdoor corporate events—it's handheld, feeds large crowds efficiently, and works within corporate catering budgets at $8-15/person. Plan 3-4 tacos per adult, 2 per child, and set up multiple serving lines for crowds over 100.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              Company picnics bring teams together, and great food makes them memorable. A taco bar is an excellent alternative to traditional BBQ—it's interactive, accommodates dietary restrictions, and scales easily from 50 to 500+ attendees. Here's how to plan your corporate outdoor fiesta.
            </p>
          </div>

          {/* Why Tacos Work */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-600 pb-2">Why Tacos Beat Traditional Picnic Food</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Outdoor Advantages</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-green-600 mr-2">+</span>Handheld—no utensils needed</li>
                  <li><span className="text-green-600 mr-2">+</span>Guests can eat standing/walking</li>
                  <li><span className="text-green-600 mr-2">+</span>Proteins stay warm for hours</li>
                  <li><span className="text-green-600 mr-2">+</span>Less mess than BBQ ribs</li>
                  <li><span className="text-green-600 mr-2">+</span>Accommodates all dietary needs</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Corporate Benefits</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-blue-500 mr-2">+</span>Scales to any company size</li>
                  <li><span className="text-blue-500 mr-2">+</span>Budget-friendly per head</li>
                  <li><span className="text-blue-500 mr-2">+</span>Easy for caterers to manage</li>
                  <li><span className="text-blue-500 mr-2">+</span>Interactive team-building element</li>
                  <li><span className="text-blue-500 mr-2">+</span>Family-friendly options</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quantities */}
          <section className="mb-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Company Picnic Quantities</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full bg-cream-50 border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border px-4 py-3 text-left">Company Size</th>
                    <th className="border px-4 py-3 text-center">Tortillas</th>
                    <th className="border px-4 py-3 text-center">Protein</th>
                    <th className="border px-4 py-3 text-center">Serving Lines</th>
                    <th className="border px-4 py-3 text-center">Budget*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-green-50">
                    <td className="border px-4 py-3 font-medium">50 employees</td>
                    <td className="border px-4 py-3 text-center">200-250</td>
                    <td className="border px-4 py-3 text-center">15-20 lbs</td>
                    <td className="border px-4 py-3 text-center">1</td>
                    <td className="border px-4 py-3 text-center">$400-750</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="border px-4 py-3 font-medium">100 + families</td>
                    <td className="border px-4 py-3 text-center">500-600</td>
                    <td className="border px-4 py-3 text-center">40-50 lbs</td>
                    <td className="border px-4 py-3 text-center">2</td>
                    <td className="border px-4 py-3 text-center">$1,600-3,000</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="border px-4 py-3 font-medium">200 + families</td>
                    <td className="border px-4 py-3 text-center">1000-1200</td>
                    <td className="border px-4 py-3 text-center">80-100 lbs</td>
                    <td className="border px-4 py-3 text-center">3-4</td>
                    <td className="border px-4 py-3 text-center">$3,200-6,000</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="border px-4 py-3 font-medium">300+ + families</td>
                    <td className="border px-4 py-3 text-center">1500-2000</td>
                    <td className="border px-4 py-3 text-center">120-150 lbs</td>
                    <td className="border px-4 py-3 text-center">4-6</td>
                    <td className="border px-4 py-3 text-center">$4,800-9,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-charcoal-600 text-sm">
              *$8-15/person depending on service level. "Families" assumes 50% additional guests (spouses + children).
            </p>
          </section>

          {/* Setup for Large Crowds */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-600 pb-2">Large Event Setup</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Multiple Serving Lines</h3>
                <p className="text-charcoal-700 text-sm mb-3">For crowds over 100, set up multiple identical taco bars to prevent long lines. Rule of thumb:</p>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• 50-100 guests: 1-2 lines</li>
                  <li>• 100-200 guests: 2-3 lines</li>
                  <li>• 200-300 guests: 3-4 lines</li>
                  <li>• 300+ guests: 4-6 lines</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Staggered Serving</h3>
                <p className="text-charcoal-700 text-sm mb-3">Consider staggering eating times by department or table number. This prevents everyone rushing the buffet at once and gives caterers time to replenish.</p>
              </div>
            </div>
          </section>

          {/* Weather Considerations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-600 pb-2">Outdoor Event Tips</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Hot Weather</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Keep cold toppings on ice</li>
                  <li>• Tent/shade over food</li>
                  <li>• Refresh items every 45 min</li>
                  <li>• Extra hydration stations</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Cool Weather</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Extra chafing fuel</li>
                  <li>• Hot chocolate station</li>
                  <li>• Keep tortillas covered</li>
                  <li>• Indoor backup plan</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-charcoal-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Rain Plan</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Pop-up tents over food</li>
                  <li>• Indoor backup location</li>
                  <li>• Covers for all dishes</li>
                  <li>• Weather monitoring</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Should we hire a caterer or DIY?</h3>
                <p className="text-charcoal-700">For 50+ people, professional catering is recommended. It removes liability, ensures proper food safety, and lets your team enjoy the event. For smaller teams, DIY with volunteer help can work.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">How do we handle food allergies company-wide?</h3>
                <p className="text-charcoal-700">Send allergy survey with RSVP. Label all items clearly at the buffet. Corn tortillas are naturally gluten-free. Keep vegetarian options separate. Have caterer prepare allergen-free portions if needed.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-green-600 to-charcoal-800 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Plan Your Company Picnic</h2>
            <p className="text-cream-200 mb-6">Premium tortillas for corporate events of any size.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-6 py-3 rounded-lg font-semibold transition-colors">Shop Tortillas</Link>
              <Link href="/wholesale" className="border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors">Wholesale Inquiry</Link>
              <Link href="/guides/corporate-catering" className="border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors">Corporate Catering</Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
