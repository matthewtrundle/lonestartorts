import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'School Fundraiser Taco Sale Guide - PTA Fundraising Ideas',
  description: 'Plan a profitable school taco sale fundraiser! Complete guide with profit margins, pricing strategies, volunteer coordination, and quantities for school events.',
  keywords: 'school fundraiser food, taco sale fundraiser, PTA fundraiser ideas, school food sale, fundraiser dinner ideas, taco night fundraiser, school event food',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/school-fundraiser',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How profitable is a taco sale fundraiser?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A taco sale can have 50-65% profit margins. If tacos cost $1.50-2.00 to make and sell for $4-5 each, a sale of 300 tacos yields $600-900 in profit. Add drinks and desserts for additional revenue. Key is volunteer labor and donated toppings.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many tacos do you need for a school fundraiser?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Plan to sell 2-3 tacos per expected attendee. A school with 400 students expecting 50% family turnout should prepare 400-600 tacos. Always have extra—selling out is good but disappointing customers hurts future sales.',
      },
    },
  ],
}

export default function SchoolFundraiserPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-green-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">School Fundraiser Taco Sale Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Raise funds while bringing the school community together</p>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image
            src="/images/guides/guide-school-fundraiser.webp"
            alt="School taco sale fundraiser"
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
              <strong>A school taco sale fundraiser</strong> can earn 50-65% profit margins. Sell tacos for $4-5 each (cost $1.50-2.00 to make), plan for 2-3 tacos per attendee, and add drinks/desserts for extra revenue. A 300-taco sale nets $600-900 profit with volunteer labor.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              Taco sales are one of the most profitable and popular school fundraisers. They bring families together, cost less than carnival-style events, and can be repeated successfully. Here's your complete guide to running a profitable taco night fundraiser.
            </p>
          </div>

          {/* Profit Breakdown */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-600 pb-2">Profit Potential</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-xl font-bold text-charcoal-950 mb-4">Sample 300-Taco Sale</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-4 rounded">
                  <h4 className="font-bold text-charcoal-950 mb-2">Costs</h4>
                  <ul className="space-y-1 text-charcoal-700 text-sm">
                    <li>Tortillas (400): ~$40</li>
                    <li>Proteins (20 lbs): ~$100</li>
                    <li>Toppings/cheese: ~$60</li>
                    <li>Supplies: ~$50</li>
                    <li className="font-bold pt-2 border-t">Total Cost: ~$250</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <h4 className="font-bold text-charcoal-950 mb-2">Revenue @ $4/taco</h4>
                  <ul className="space-y-1 text-charcoal-700 text-sm">
                    <li>300 tacos @ $4: $1,200</li>
                    <li>Drinks (100 @ $2): $200</li>
                    <li>Desserts: $100</li>
                    <li className="font-bold pt-2 border-t">Total Revenue: $1,500</li>
                    <li className="font-bold text-green-700">PROFIT: ~$1,250</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-100 p-4 rounded">
              <p className="text-green-800 font-semibold">Key to profit: Volunteer labor + donated toppings from families!</p>
            </div>
          </section>

          {/* Planning Guide */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-600 pb-2">Planning Your Sale</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Pricing Strategy</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• <strong>Single taco:</strong> $4-5</li>
                  <li>• <strong>Taco plate (2 + rice/beans):</strong> $8-10</li>
                  <li>• <strong>Family pack (8 tacos):</strong> $28-32</li>
                  <li>• <strong>Drinks:</strong> $1-2</li>
                  <li>• <strong>Dessert:</strong> $2-3</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Volunteer Needs</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• <strong>Setup crew:</strong> 4-6 people</li>
                  <li>• <strong>Cooking/assembly:</strong> 6-10 people</li>
                  <li>• <strong>Serving/cashiers:</strong> 4-6 people</li>
                  <li>• <strong>Cleanup:</strong> 4-6 people</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quantities */}
          <section className="mb-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Fundraiser Quantities</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full bg-cream-50 border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border px-4 py-3 text-left">Expected Attendance</th>
                    <th className="border px-4 py-3 text-center">Tacos to Prep</th>
                    <th className="border px-4 py-3 text-center">Tortillas</th>
                    <th className="border px-4 py-3 text-center">Protein</th>
                    <th className="border px-4 py-3 text-center">Potential Profit*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-green-50">
                    <td className="border px-4 py-3 font-medium">100 people</td>
                    <td className="border px-4 py-3 text-center">250-300</td>
                    <td className="border px-4 py-3 text-center">350-400</td>
                    <td className="border px-4 py-3 text-center">18-22 lbs</td>
                    <td className="border px-4 py-3 text-center text-green-700 font-bold">$700-1,000</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="border px-4 py-3 font-medium">200 people</td>
                    <td className="border px-4 py-3 text-center">500-600</td>
                    <td className="border px-4 py-3 text-center">700-800</td>
                    <td className="border px-4 py-3 text-center">35-45 lbs</td>
                    <td className="border px-4 py-3 text-center text-green-700 font-bold">$1,500-2,100</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="border px-4 py-3 font-medium">300 people</td>
                    <td className="border px-4 py-3 text-center">750-900</td>
                    <td className="border px-4 py-3 text-center">1000-1200</td>
                    <td className="border px-4 py-3 text-center">55-70 lbs</td>
                    <td className="border px-4 py-3 text-center text-green-700 font-bold">$2,200-3,200</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-charcoal-600 text-sm">
              *Profit assumes $4/taco sales price, volunteer labor, and some donated supplies. Add drinks/desserts for 20-30% more revenue.
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Do we need permits for a school taco sale?</h3>
                <p className="text-charcoal-700">Usually not if held on school property as a fundraiser. Check with your school administration and local health department. Some areas require temporary food permits even for nonprofit events.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Should we pre-sell tickets or have walk-up sales?</h3>
                <p className="text-charcoal-700">Both! Pre-sales guarantee minimum revenue and help with planning. Walk-up sales capture impulse buyers. Consider a small discount for pre-sale tickets to encourage advance purchases.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-green-600 to-charcoal-800 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Stock Up for Your Fundraiser</h2>
            <p className="text-cream-200 mb-6">Bulk tortillas at prices that maximize your profit.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-6 py-3 rounded-lg font-semibold transition-colors">Shop Tortillas</Link>
              <Link href="/wholesale" className="border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors">Wholesale Pricing</Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
