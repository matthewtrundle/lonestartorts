import type { Metadata } from 'next'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'BBQ Party Guide - Texas Backyard Cookout with Tacos & Tortillas',
  description: 'Host the ultimate Texas BBQ party with brisket tacos, smoked meat tortillas, and backyard cookout ideas. Complete guide for summer BBQs, 4th of July, and Labor Day.',
  keywords: 'bbq party, texas bbq, brisket tacos, smoked meat tacos, backyard cookout, summer bbq, 4th of july party, labor day bbq, bbq taco bar',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/bbq-party',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What tortillas are best for BBQ tacos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Flour tortillas are ideal for BBQ tacos because they\'re sturdy enough to hold hearty brisket, pulled pork, or smoked sausage. Use 6-inch tortillas for street taco style or 8-inch for full-size tacos. Warm them on the grill for extra smoky flavor.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I make brisket tacos from leftover BBQ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chop or shred leftover brisket and warm it in its juices. Warm flour tortillas on the grill or in a skillet. Top with pickled onions, cilantro, and your favorite BBQ sauce or salsa verde. The smoky brisket with tangy toppings is incredible.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many tortillas per person for a BBQ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Plan 3-4 tortillas per person when BBQ tacos are the main course alongside sides. If serving alongside traditional BBQ (sliced brisket, ribs), plan 2 tortillas per person for making impromptu tacos.',
      },
    },
  ],
}

export default function BBQPartyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Texas BBQ Party Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Smoked meats, tortillas, and backyard perfection</p>
          </div>
        </header>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-12-25" />

          {/* Quick Answer */}
          <div className="bg-masa-100 border-l-4 border-masa-600 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>The best BBQ party combines Texas smoked meats with warm tortillas.</strong> Serve brisket, pulled pork, or smoked chicken with <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">flour tortillas</Link> for DIY tacos. Plan 3-4 tortillas per guest, keep them warm in foil on the cooler part of the grill, and offer BBQ sauce, salsa verde, and pickled onions as toppings.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              In Texas, BBQ and tortillas are a match made in heaven. There's nothing quite like wrapping tender smoked brisket in a warm flour tortilla with some pickled onions and a splash of salsa. Whether you're hosting a summer cookout, 4th of July celebration, or Labor Day party, here's how to do it right.
            </p>
          </div>

          {/* BBQ + Tortilla Pairings */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-masa-500 pb-2">BBQ + Tortilla Pairings</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Brisket Tacos</h3>
                <p className="text-charcoal-700 mb-3">The king of Texas BBQ tacos. Chop the brisket (don't shred!) to preserve the bark texture.</p>
                <ul className="text-sm text-charcoal-600 space-y-1">
                  <li><strong>Tortilla:</strong> 6" flour or 8" flour</li>
                  <li><strong>Top with:</strong> Pickled red onions, cilantro, salsa verde</li>
                  <li><strong>Sauce:</strong> BBQ sauce on the side or none at all</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Pulled Pork Tacos</h3>
                <p className="text-charcoal-700 mb-3">Shredded smoked pork shoulder is juicy and flavorful in tortillas.</p>
                <ul className="text-sm text-charcoal-600 space-y-1">
                  <li><strong>Tortilla:</strong> Flour or corn, your choice</li>
                  <li><strong>Top with:</strong> Coleslaw, pickled jalapeños</li>
                  <li><strong>Sauce:</strong> Vinegar-based Carolina or sweet KC style</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Smoked Chicken Tacos</h3>
                <p className="text-charcoal-700 mb-3">Lighter option that's still packed with smoky flavor.</p>
                <ul className="text-sm text-charcoal-600 space-y-1">
                  <li><strong>Tortilla:</strong> <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">Corn tortillas</Link></li>
                  <li><strong>Top with:</strong> Avocado, pico de gallo, queso fresco</li>
                  <li><strong>Sauce:</strong> Creamy jalapeño or salsa verde</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Sausage Tacos</h3>
                <p className="text-charcoal-700 mb-3">Smoked sausage links sliced and wrapped in tortillas.</p>
                <ul className="text-sm text-charcoal-600 space-y-1">
                  <li><strong>Tortilla:</strong> Flour tortillas</li>
                  <li><strong>Top with:</strong> Grilled peppers and onions, cheese</li>
                  <li><strong>Sauce:</strong> Mustard-based or spicy BBQ</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quantities */}
          <section className="mb-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">BBQ Party Quantities</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full bg-cream-50 border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border px-4 py-3 text-left">Item</th>
                    <th className="border px-4 py-3 text-center">10 guests</th>
                    <th className="border px-4 py-3 text-center">20 guests</th>
                    <th className="border px-4 py-3 text-center">30 guests</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-masa-50">
                    <td className="border px-4 py-3 font-medium">Brisket</td>
                    <td className="border px-4 py-3 text-center">5-6 lbs</td>
                    <td className="border px-4 py-3 text-center">10-12 lbs</td>
                    <td className="border px-4 py-3 text-center">15-18 lbs</td>
                  </tr>
                  <tr className="hover:bg-masa-50">
                    <td className="border px-4 py-3 font-medium">Tortillas</td>
                    <td className="border px-4 py-3 text-center">30-40</td>
                    <td className="border px-4 py-3 text-center">60-80</td>
                    <td className="border px-4 py-3 text-center">90-120</td>
                  </tr>
                  <tr className="hover:bg-masa-50">
                    <td className="border px-4 py-3 font-medium">Sausage links</td>
                    <td className="border px-4 py-3 text-center">10 links</td>
                    <td className="border px-4 py-3 text-center">20 links</td>
                    <td className="border px-4 py-3 text-center">30 links</td>
                  </tr>
                  <tr className="hover:bg-masa-50">
                    <td className="border px-4 py-3 font-medium">Pulled pork</td>
                    <td className="border px-4 py-3 text-center">4 lbs</td>
                    <td className="border px-4 py-3 text-center">8 lbs</td>
                    <td className="border px-4 py-3 text-center">12 lbs</td>
                  </tr>
                  <tr className="hover:bg-masa-50">
                    <td className="border px-4 py-3 font-medium">Sides (each)</td>
                    <td className="border px-4 py-3 text-center">2 quarts</td>
                    <td className="border px-4 py-3 text-center">1 gallon</td>
                    <td className="border px-4 py-3 text-center">1.5 gallons</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-charcoal-600 text-sm">
              <strong>Pro tip:</strong> Brisket loses about 40% of its weight during cooking. A 15 lb raw brisket yields about 9 lbs cooked meat.
            </p>
          </section>

          {/* Setting Up */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-masa-500 pb-2">Setting Up Your BBQ Taco Bar</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-masa-100 text-masa-700 font-bold text-xl rounded-full flex-shrink-0">1</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Warm Tortillas on the Grill</h3>
                    <p className="text-charcoal-700">Stack tortillas in foil and place on the cool side of the grill. They'll stay warm and pick up subtle smoky flavor. Keep the foil packet closed until serving.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-masa-100 text-masa-700 font-bold text-xl rounded-full flex-shrink-0">2</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Meat Station</h3>
                    <p className="text-charcoal-700">Rest brisket for at least 30 minutes before slicing. Chop (don't shred) for tacos. Keep pulled pork in a foil pan with a bit of its juices to stay moist.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-masa-100 text-masa-700 font-bold text-xl rounded-full flex-shrink-0">3</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Topping Spread</h3>
                    <p className="text-charcoal-700">Set up: pickled red onions, fresh cilantro, diced white onion, sliced jalapeños, shredded cheese, lime wedges. Keep cold items on ice.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-masa-100 text-masa-700 font-bold text-xl rounded-full flex-shrink-0">4</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Sauce Selection</h3>
                    <p className="text-charcoal-700">Offer multiple options: your house BBQ sauce, salsa verde (pairs amazing with brisket), salsa roja, ranch or white sauce, and hot sauce for heat lovers.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Holiday-Specific */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-masa-500 pb-2">BBQ Parties by Occasion</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-red-50 to-blue-50 p-6 rounded-lg border-2 border-red-200">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">4th of July Cookout</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• Red, white, and blue decorations</li>
                  <li>• Start smoking morning of (brisket takes 12+ hrs)</li>
                  <li>• Classic sides: coleslaw, baked beans, potato salad</li>
                  <li>• Watermelon and berry desserts</li>
                  <li>• Cold beer and lemonade station</li>
                  <li>• Plan around fireworks timing</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg border-2 border-amber-200">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Labor Day Bash</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• Last hurrah of summer!</li>
                  <li>• Go all out with multiple meats</li>
                  <li>• Pool party + BBQ combo</li>
                  <li>• Football-themed if season starts</li>
                  <li>• Batch cocktails (margaritas, ranch water)</li>
                  <li>• Lawn games: cornhole, horseshoes</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Summer Backyard BBQ</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• Casual, relaxed vibe</li>
                  <li>• Mix of smoked and grilled items</li>
                  <li>• Fresh corn on the cob (make <Link href="/recipes/elote" className="text-rust-600 hover:underline">elote</Link>!)</li>
                  <li>• Kids' activities: sprinklers, slip-n-slide</li>
                  <li>• Citronella candles for bugs</li>
                  <li>• String lights for evening ambiance</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-lg border-2 border-gray-200">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Memorial Day Kickoff</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• Opening of BBQ season</li>
                  <li>• Honor veterans with thoughtful touches</li>
                  <li>• Weather backup plan essential</li>
                  <li>• Mix of crowd-pleasers</li>
                  <li>• Patriotic color scheme</li>
                  <li>• Family-friendly focus</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Classic Sides */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-masa-500 pb-2">Classic BBQ Sides</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-charcoal-950 mb-3">Texas Classics</h4>
                  <ul className="text-charcoal-700 space-y-1">
                    <li>• Pinto beans</li>
                    <li>• Coleslaw (creamy or vinegar)</li>
                    <li>• Potato salad</li>
                    <li>• White bread slices</li>
                    <li>• Pickles, onions, jalapeños</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal-950 mb-3">Tex-Mex Additions</h4>
                  <ul className="text-charcoal-700 space-y-1">
                    <li>• Mexican rice</li>
                    <li>• Refried beans</li>
                    <li>• Elote (Mexican street corn)</li>
                    <li>• <Link href="/recipes/nachos" className="text-rust-600 hover:underline">Loaded nachos</Link></li>
                    <li>• Fresh guacamole</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal-950 mb-3">Fresh & Light</h4>
                  <ul className="text-charcoal-700 space-y-1">
                    <li>• Watermelon slices</li>
                    <li>• Corn on the cob</li>
                    <li>• Garden salad</li>
                    <li>• Cucumber salad</li>
                    <li>• Fresh fruit</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-masa-500 pb-2">BBQ Party Pro Tips</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Start Early</h3>
                <p className="text-charcoal-700 text-sm">Brisket takes 1-1.5 hours per pound at 225°F. A 12 lb brisket needs 12-18 hours. Start the night before or very early morning.</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Rest Your Meat</h3>
                <p className="text-charcoal-700 text-sm">Let brisket rest 30-60 minutes wrapped in butcher paper and a cooler. The meat will stay hot for hours and get more tender.</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Double Tortillas</h3>
                <p className="text-charcoal-700 text-sm">BBQ juices can soak through one tortilla. Stack two together street-taco style, or use extra-sturdy flour tortillas.</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Make Pickled Onions</h3>
                <p className="text-charcoal-700 text-sm">Slice red onion, cover with lime juice, pinch of salt. Let sit 30 min. These bright, tangy onions are perfect on brisket tacos.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Can I use store-bought BBQ for a taco bar?</h3>
                <p className="text-charcoal-700">Absolutely! Pick up brisket and sausage from your favorite BBQ joint. It's about the party, not proving your pitmaster skills. Just keep it warm and have plenty of tortillas ready.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Should I chop or slice brisket for tacos?</h3>
                <p className="text-charcoal-700">Chop it! Chopping keeps pieces of the flavorful bark distributed throughout and makes it easier to eat in a taco. Save the pretty slices for plating on the side.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">What drinks pair with BBQ tacos?</h3>
                <p className="text-charcoal-700">Cold beer (Mexican lagers work great), margaritas, ranch water (tequila + Topo Chico + lime), sweet tea, and lemonade. Keep everything ice cold!</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-masa-600 to-charcoal-950 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Fire Up the Grill</h2>
            <p className="text-cream-200 mb-6">Get authentic Texas tortillas for your next BBQ.</p>
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
