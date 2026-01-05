import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Sports Banquet Taco Bar Guide - Team Celebration Food',
  description: 'Plan the perfect sports banquet taco bar! Complete guide for feeding teams of 25-100+ athletes, coaches, and families with budget-friendly quantities and setup tips.',
  keywords: 'sports banquet food, team banquet catering, athletic banquet ideas, end of season party food, team dinner ideas, sports team celebration, youth sports banquet',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/sports-banquet',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much food do you need for a sports banquet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Athletes eat more than average! Plan 4-5 tacos per player, 2-3 per adult guest. For a team of 20 players plus 40 family members, budget around 180-220 tacos total. Always add 20% extra—hungry athletes will go back for seconds and thirds.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the cheapest food for a sports banquet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A DIY taco bar is one of the most budget-friendly banquet options at $6-10 per person. Chicken and ground beef are the most affordable proteins. Have parents contribute sides potluck-style to reduce costs further. Avoid individual plated meals which cost $15-30+ per person.',
      },
    },
  ],
}

export default function SportsBanquetPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-blue-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Sports Banquet Taco Bar Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Feed champions without breaking the team budget</p>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image
            src="/images/guides/guide-sports-banquet.webp"
            alt="Sports team banquet taco buffet"
            fill
            className="object-cover"
            priority
          />
        </div>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-12-30" />

          {/* Quick Answer */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>A sports banquet taco bar</strong> feeds hungry athletes affordably at $6-10/person. Plan 4-5 tacos per athlete (they eat BIG) and 2-3 per parent/coach. Works perfectly for teams of any size, accommodates dietary needs, and lets everyone customize their meal. Set up buffet-style for efficient serving.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              End-of-season banquets, championship celebrations, or team appreciation dinners—athletes and their families need serious food. A taco bar delivers the volume hungry players need while staying within booster club budgets. Here's how to pull off a winning team feast.
            </p>
          </div>

          {/* Why Tacos Work */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-blue-600 pb-2">Why Taco Bars Win for Sports Banquets</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Perfect for Athletes</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-blue-600 mr-2">+</span>High-protein options for muscle recovery</li>
                  <li><span className="text-blue-600 mr-2">+</span>Carbs from tortillas for energy</li>
                  <li><span className="text-blue-600 mr-2">+</span>Customizable for any diet</li>
                  <li><span className="text-blue-600 mr-2">+</span>Easy seconds and thirds</li>
                  <li><span className="text-blue-600 mr-2">+</span>No waiting for plated service</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Budget-Friendly</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-green-500 mr-2">$</span>$6-10 per person DIY</li>
                  <li><span className="text-green-500 mr-2">$</span>Parents can bring sides</li>
                  <li><span className="text-green-500 mr-2">$</span>Scales easily for any size</li>
                  <li><span className="text-green-500 mr-2">$</span>Leftovers go home with families</li>
                  <li><span className="text-green-500 mr-2">$</span>No expensive catering needed</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quantities */}
          <section className="mb-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Sports Banquet Quantities</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full bg-cream-50 border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border px-4 py-3 text-left">Event Size</th>
                    <th className="border px-4 py-3 text-center">Tortillas</th>
                    <th className="border px-4 py-3 text-center">Protein</th>
                    <th className="border px-4 py-3 text-center">Budget*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-blue-50">
                    <td className="border px-4 py-3 font-medium">Small team (15 + 30 guests)</td>
                    <td className="border px-4 py-3 text-center">180-220</td>
                    <td className="border px-4 py-3 text-center">12-15 lbs</td>
                    <td className="border px-4 py-3 text-center">$270-450</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="border px-4 py-3 font-medium">Medium team (25 + 50 guests)</td>
                    <td className="border px-4 py-3 text-center">300-375</td>
                    <td className="border px-4 py-3 text-center">20-25 lbs</td>
                    <td className="border px-4 py-3 text-center">$450-750</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="border px-4 py-3 font-medium">Large team (40 + 80 guests)</td>
                    <td className="border px-4 py-3 text-center">480-600</td>
                    <td className="border px-4 py-3 text-center">32-40 lbs</td>
                    <td className="border px-4 py-3 text-center">$720-1,200</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="border px-4 py-3 font-medium">XL event (60 + 120 guests)</td>
                    <td className="border px-4 py-3 text-center">720-900</td>
                    <td className="border px-4 py-3 text-center">48-60 lbs</td>
                    <td className="border px-4 py-3 text-center">$1,080-1,800</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-charcoal-600 text-sm">
              *DIY costs. Athletes eat 4-5 tacos each; adults 2-3. Add 20% buffer for hungry players.
            </p>
          </section>

          {/* Menu Ideas */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-blue-600 pb-2">Team-Friendly Menu</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Protein Options</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• <strong>Grilled Chicken</strong> - Lean & popular</li>
                  <li>• <strong>Ground Beef</strong> - Budget-friendly classic</li>
                  <li>• <strong><Link href="/recipes/carnitas" className="text-rust-600 hover:underline">Carnitas</Link></strong> - Feeds crowds well</li>
                  <li>• <strong>Black Beans</strong> - Vegetarian protein</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Easy Sides</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Mexican rice (make in bulk)</li>
                  <li>• Refried beans</li>
                  <li>• Chips & salsa</li>
                  <li>• Fresh fruit trays</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-sunset-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Parent Potluck</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Assign desserts to families</li>
                  <li>• Drinks split among parents</li>
                  <li>• Side dishes contributed</li>
                  <li>• Paper goods shared</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Setup Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-blue-600 pb-2">Banquet Setup Tips</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Two-Line Setup</h3>
                <p className="text-charcoal-700 text-sm">For 50+ guests, set up two identical taco lines on opposite sides of the table. This cuts wait time in half—important when you have awards to give out!</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Team Volunteers</h3>
                <p className="text-charcoal-700 text-sm">Assign parent volunteers to monitor and refill the buffet. Rotate 2-3 parents per hour so everyone gets to enjoy the celebration.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">How do I accommodate athlete dietary restrictions?</h3>
                <p className="text-charcoal-700">Taco bars naturally accommodate most diets. Corn tortillas are gluten-free, black beans work for vegetarians, and you can offer lettuce wraps for low-carb athletes. Label everything clearly!</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">When should we serve food at a banquet?</h3>
                <p className="text-charcoal-700">Serve food first, then do awards and speeches while people eat and digest. Hungry athletes can't focus on ceremony—feed them first, celebrate second!</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-blue-600 to-charcoal-800 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Feed Your Champions Right</h2>
            <p className="text-cream-200 mb-6">Order premium tortillas for your team celebration.</p>
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
