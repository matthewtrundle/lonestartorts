import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Family Reunion Taco Bar Guide - Large Family Gathering Food',
  description: 'Plan the perfect family reunion taco bar! Complete guide with quantities for 30-150+ family members, potluck coordination, and multigenerational menu ideas.',
  keywords: 'family reunion food, family reunion ideas, large family gathering food, family picnic food, reunion catering, family reunion menu, feeding large families',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/family-reunion',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much food do you need for a family reunion of 75 people?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For 75 family members, plan 250-300 tacos (accounting for various appetites from kids to adults), 20-25 lbs of protein, and proportional toppings. Budget $450-750 if providing everything, or coordinate family contributions to split costs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What food is easiest for a large family reunion?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A taco bar is ideal for family reunions—it feeds all ages, accommodates dietary restrictions, allows family members to contribute different items, and creates an interactive experience. Self-serve style reduces need for formal serving.',
      },
    },
  ],
}

export default function FamilyReunionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-sunset-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Family Reunion Taco Bar Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Bring generations together over good food</p>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image
            src="/images/guides/guide-family-reunion.webp"
            alt="Family reunion taco bar"
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
              <strong>A family reunion taco bar</strong> feeds all generations easily. Plan 3 tacos per adult and 1.5 per child, coordinate contributions across family branches, and include mild options for kids and elders. Budget $6-10/person for a complete spread.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              Family reunions bring together everyone from babies to great-grandparents. A taco bar is the perfect solution—everyone can customize their plate, costs can be shared across family branches, and the interactive nature gives people something to do while they reconnect.
            </p>
          </div>

          {/* Why Tacos Work */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-sunset-500 pb-2">Why Tacos Work for Reunions</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-sunset-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Multigenerational Appeal</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-sunset-500 mr-2">+</span>Kids love simple cheese tacos</li>
                  <li><span className="text-sunset-500 mr-2">+</span>Elders can avoid spicy options</li>
                  <li><span className="text-sunset-500 mr-2">+</span>Dietary restrictions handled easily</li>
                  <li><span className="text-sunset-500 mr-2">+</span>Everyone finds something they like</li>
                  <li><span className="text-sunset-500 mr-2">+</span>No complicated plated service</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Practical Benefits</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-green-500 mr-2">+</span>Costs split across branches</li>
                  <li><span className="text-green-500 mr-2">+</span>Works indoors or outdoors</li>
                  <li><span className="text-green-500 mr-2">+</span>Scales to any family size</li>
                  <li><span className="text-green-500 mr-2">+</span>Interactive conversation starter</li>
                  <li><span className="text-green-500 mr-2">+</span>Everyone can help serve</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quantities */}
          <section className="mb-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Family Reunion Quantities</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full bg-cream-50 border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border px-4 py-3 text-left">Family Size</th>
                    <th className="border px-4 py-3 text-center">Tortillas</th>
                    <th className="border px-4 py-3 text-center">Protein</th>
                    <th className="border px-4 py-3 text-center">Budget*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-sunset-50">
                    <td className="border px-4 py-3 font-medium">30 members</td>
                    <td className="border px-4 py-3 text-center">100-130</td>
                    <td className="border px-4 py-3 text-center">8-12 lbs</td>
                    <td className="border px-4 py-3 text-center">$180-300</td>
                  </tr>
                  <tr className="hover:bg-sunset-50">
                    <td className="border px-4 py-3 font-medium">50 members</td>
                    <td className="border px-4 py-3 text-center">165-215</td>
                    <td className="border px-4 py-3 text-center">14-18 lbs</td>
                    <td className="border px-4 py-3 text-center">$300-500</td>
                  </tr>
                  <tr className="hover:bg-sunset-50">
                    <td className="border px-4 py-3 font-medium">75 members</td>
                    <td className="border px-4 py-3 text-center">250-325</td>
                    <td className="border px-4 py-3 text-center">20-25 lbs</td>
                    <td className="border px-4 py-3 text-center">$450-750</td>
                  </tr>
                  <tr className="hover:bg-sunset-50">
                    <td className="border px-4 py-3 font-medium">100 members</td>
                    <td className="border px-4 py-3 text-center">330-430</td>
                    <td className="border px-4 py-3 text-center">28-35 lbs</td>
                    <td className="border px-4 py-3 text-center">$600-1,000</td>
                  </tr>
                  <tr className="hover:bg-sunset-50">
                    <td className="border px-4 py-3 font-medium">150+ members</td>
                    <td className="border px-4 py-3 text-center">500-650</td>
                    <td className="border px-4 py-3 text-center">40-50 lbs</td>
                    <td className="border px-4 py-3 text-center">$900-1,500</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-charcoal-600 text-sm">
              *DIY costs at $6-10/person. Assumes 40% are children (who eat less). Split costs by family branch!
            </p>
          </section>

          {/* Cost Sharing */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-sunset-500 pb-2">Splitting Costs Fairly</h2>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-charcoal-950 mb-4">Fair Contribution Methods</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-charcoal-950 mb-2">Option 1: Per Head</h4>
                  <p className="text-charcoal-700 text-sm">Each family pays $5-10 per person attending. Simple and fair, though larger families pay more.</p>
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-950 mb-2">Option 2: By Branch</h4>
                  <p className="text-charcoal-700 text-sm">Split total cost equally among family branches (grandma's kids' families). Each branch coordinates internally.</p>
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-950 mb-2">Option 3: Assignment</h4>
                  <p className="text-charcoal-700 text-sm">Each branch brings specific items: Branch A = proteins, Branch B = tortillas & toppings, Branch C = drinks & desserts.</p>
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-950 mb-2">Option 4: Host Covers</h4>
                  <p className="text-charcoal-700 text-sm">Hosting family provides main meal; others bring sides, desserts, and drinks. Host rotates yearly.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Multigenerational Menu */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-sunset-500 pb-2">Multigenerational Menu Tips</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">For Kids</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Plain seasoned ground beef</li>
                  <li>• Shredded cheese option</li>
                  <li>• Mild salsa only</li>
                  <li>• Quesadillas as alternative</li>
                  <li>• Taco shells for fun</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-sunset-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">For Adults</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• <Link href="/recipes/carnitas" className="text-rust-600 hover:underline">Carnitas</Link></li>
                  <li>• Carne asada</li>
                  <li>• Chicken tinga</li>
                  <li>• Variety of salsas</li>
                  <li>• Fresh jalapeños</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">For Elders</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Soft tortillas (easier to chew)</li>
                  <li>• Mild, well-cooked proteins</li>
                  <li>• Low-sodium options labeled</li>
                  <li>• Chairs at food station</li>
                  <li>• Offer to fix plates for them</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">How do we coordinate when families are traveling from far away?</h3>
                <p className="text-charcoal-700">Create a shared spreadsheet or use a free app like SignUpGenius. Local families handle perishables; traveling families can contribute money or bring non-perishables/desserts. Order tortillas in advance to be delivered to the venue.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">What if the reunion spans multiple days?</h3>
                <p className="text-charcoal-700">Do taco bar for one main meal and simpler fare (sandwiches, potluck breakfast) for others. Leftover proteins can be repurposed into quesadillas, nachos, or breakfast tacos the next morning!</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-sunset-500 to-rust-600 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Bring Your Family Together</h2>
            <p className="text-cream-200 mb-6">Authentic tortillas for your family gathering.</p>
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
