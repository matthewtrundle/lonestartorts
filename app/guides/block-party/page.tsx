import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Block Party Taco Bar Guide - Neighborhood Celebration Ideas',
  description: 'Plan the perfect block party taco bar! Complete guide for neighborhood gatherings with quantities for 50-200+ neighbors, potluck coordination, and outdoor setup tips.',
  keywords: 'block party food, neighborhood party ideas, block party ideas, community gathering food, street party food, neighbor potluck, HOA party ideas',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/block-party',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much food do you need for a block party?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a 100-person block party, plan 250-350 tacos if taco bar is the main food. If combined with other dishes (potluck style), reduce to 150-200 tacos. Always have neighbors contribute sides, desserts, and drinks to spread the workload and cost.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best food for a large outdoor party?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A taco bar is ideal for outdoor block parties—it\'s handheld (no utensils needed), stays warm in chafing dishes, and neighbors can serve themselves. Combine with potluck contributions for sides and desserts to create a feast without one person doing all the work.',
      },
    },
  ],
}

export default function BlockPartyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-green-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Block Party Taco Bar Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Bring the neighborhood together with great food</p>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image
            src="/images/guides/guide-block-party.webp"
            alt="Neighborhood block party taco bar"
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
              <strong>A block party taco bar</strong> brings neighbors together affordably. Coordinate potluck style—one or two households provide proteins and tortillas, others bring toppings, sides, and desserts. Plan 2-3 tacos per person if other food is available, budget $4-8/person shared across households.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              Block parties are the best way to build community—and nothing brings people together like great food! A taco bar is perfect for neighborhood gatherings: it's interactive, works outdoors, and the workload can be shared across households. Here's how to organize a taco bar that makes your block the most popular street in town.
            </p>
          </div>

          {/* Why Tacos Work */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-600 pb-2">Why Tacos Work for Block Parties</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Outdoor Party Perfect</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-green-600 mr-2">+</span>Handheld—eat while mingling</li>
                  <li><span className="text-green-600 mr-2">+</span>Self-serve reduces lines</li>
                  <li><span className="text-green-600 mr-2">+</span>Works on folding tables</li>
                  <li><span className="text-green-600 mr-2">+</span>Kid-friendly options built in</li>
                  <li><span className="text-green-600 mr-2">+</span>Easy to scale up or down</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-sunset-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Neighborhood Benefits</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-sunset-500 mr-2">+</span>Costs shared across households</li>
                  <li><span className="text-sunset-500 mr-2">+</span>Everyone can contribute</li>
                  <li><span className="text-sunset-500 mr-2">+</span>Inclusive for all ages</li>
                  <li><span className="text-sunset-500 mr-2">+</span>Conversation starter</li>
                  <li><span className="text-sunset-500 mr-2">+</span>Creates lasting memories</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quantities */}
          <section className="mb-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Block Party Quantities</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full bg-cream-50 border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border px-4 py-3 text-left">Attendance</th>
                    <th className="border px-4 py-3 text-center">Tortillas</th>
                    <th className="border px-4 py-3 text-center">Protein</th>
                    <th className="border px-4 py-3 text-center">Shared Budget*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-green-50">
                    <td className="border px-4 py-3 font-medium">50 neighbors</td>
                    <td className="border px-4 py-3 text-center">150-200</td>
                    <td className="border px-4 py-3 text-center">12-15 lbs</td>
                    <td className="border px-4 py-3 text-center">$200-400</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="border px-4 py-3 font-medium">100 neighbors</td>
                    <td className="border px-4 py-3 text-center">300-400</td>
                    <td className="border px-4 py-3 text-center">25-30 lbs</td>
                    <td className="border px-4 py-3 text-center">$400-800</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="border px-4 py-3 font-medium">150 neighbors</td>
                    <td className="border px-4 py-3 text-center">450-600</td>
                    <td className="border px-4 py-3 text-center">38-45 lbs</td>
                    <td className="border px-4 py-3 text-center">$600-1,200</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="border px-4 py-3 font-medium">200+ neighbors</td>
                    <td className="border px-4 py-3 text-center">600-800</td>
                    <td className="border px-4 py-3 text-center">50-60 lbs</td>
                    <td className="border px-4 py-3 text-center">$800-1,600</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-charcoal-600 text-sm">
              *Total food cost split across contributing households. If 20 households chip in, that's $20-40 each for 100 people!
            </p>
          </section>

          {/* Coordination */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-600 pb-2">Neighborhood Coordination</h2>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-charcoal-950 mb-4">Who Brings What</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-charcoal-950 mb-2">Organizer(s) Provide:</h4>
                  <ul className="space-y-2 text-charcoal-700 text-sm">
                    <li>• Tortillas (order in bulk)</li>
                    <li>• Main proteins (1-2 types)</li>
                    <li>• Chafing dishes/warming equipment</li>
                    <li>• Basic serving setup</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-950 mb-2">Neighbors Sign Up For:</h4>
                  <ul className="space-y-2 text-charcoal-700 text-sm">
                    <li>• Toppings (specific assignments)</li>
                    <li>• Side dishes (chips, rice, beans)</li>
                    <li>• Drinks and ice</li>
                    <li>• Desserts</li>
                    <li>• Tables, chairs, canopies</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-green-50 p-6 rounded-lg">
              <h4 className="font-bold text-green-800 mb-2">Pro Tip: Use a Sign-Up Sheet</h4>
              <p className="text-green-700 text-sm">
                Create a shared Google Doc or use SignUpGenius. Be specific: "Shredded cheese (2 lbs)" works better than "bring a topping." Send reminders 3 days and 1 day before the party.
              </p>
            </div>
          </section>

          {/* Outdoor Setup */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-600 pb-2">Outdoor Setup Tips</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Food Station</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• 2-3 folding tables in a row</li>
                  <li>• Tablecloths secured with clips</li>
                  <li>• Weights on signs (wind!)</li>
                  <li>• Chafing dishes for protein</li>
                  <li>• Cold toppings on ice</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Shade & Comfort</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Pop-up canopies over food</li>
                  <li>• Scattered seating areas</li>
                  <li>• Standing cocktail tables</li>
                  <li>• Blankets for lawn seating</li>
                  <li>• Keep food in shade</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Safety</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Street closure permit (if needed)</li>
                  <li>• Cones/barriers for cars</li>
                  <li>• First aid kit handy</li>
                  <li>• Trash/recycling stations</li>
                  <li>• Handwashing station</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Activities */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-600 pb-2">Beyond the Food</h2>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-charcoal-950 mb-4">Block Party Activities</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-charcoal-950 mb-2">For Kids</h4>
                  <ul className="space-y-2 text-charcoal-700 text-sm">
                    <li>• Chalk art on the street</li>
                    <li>• Bounce house (if space permits)</li>
                    <li>• Water balloons</li>
                    <li>• Piñata</li>
                    <li>• Bike parade</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-950 mb-2">For Everyone</h4>
                  <ul className="space-y-2 text-charcoal-700 text-sm">
                    <li>• Music/speaker setup</li>
                    <li>• Lawn games (cornhole, etc.)</li>
                    <li>• Neighborhood trivia</li>
                    <li>• Meet your neighbor name tags</li>
                    <li>• Photo booth area</li>
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
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Do we need a permit to close the street?</h3>
                <p className="text-charcoal-700">Most cities require a permit for street closures. Check with your city's special events department 4-6 weeks ahead. Some HOAs have block party provisions already. The permit is often free or low-cost for residential events.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">What if some neighbors don't contribute but still come?</h3>
                <p className="text-charcoal-700">Block parties are about building community—it's okay! Make it welcoming regardless of contribution. Some neighbors may be on fixed incomes or have other constraints. The goal is connection, not accounting.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">How do we handle cleanup?</h3>
                <p className="text-charcoal-700">Assign cleanup crews in advance. The "last hour" crew should include different households than the setup crew to share the burden. Have plenty of trash bags ready, and leave the street cleaner than you found it!</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-green-600 to-charcoal-800 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Build Community One Taco at a Time</h2>
            <p className="text-cream-200 mb-6">Authentic tortillas for your neighborhood celebration.</p>
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
