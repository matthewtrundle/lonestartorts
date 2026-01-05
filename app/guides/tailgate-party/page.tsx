import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Tailgate Taco Bar Guide - Game Day Food Ideas',
  description: 'Plan the ultimate tailgate taco bar! Complete guide with portable setup tips, quantities for 10-50 fans, make-ahead recipes, and parking lot cooking hacks.',
  keywords: 'tailgate food, tailgate tacos, game day taco bar, football tailgate food, tailgate party ideas, portable taco bar, stadium food, tailgating recipes',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/tailgate-party',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do you make tacos at a tailgate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pre-cook proteins at home and transport in insulated containers or slow cookers. Set up a portable taco bar on a folding table with toppings in sealed containers. Keep tortillas warm in a foil-lined cooler or electric tortilla warmer powered by your car or generator. Assemble tacos fresh on-site.',
      },
    },
    {
      '@type': 'Question',
      name: 'What food stays good for tailgating?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Slow-cooked proteins like carnitas, barbacoa, and shredded chicken stay warm for hours in insulated containers. Make toppings the night before and transport cold. Corn and flour tortillas travel well. Avoid mayo-based items and keep perishables under 40°F in coolers with ice packs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much food do I need for a tailgate of 20 people?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For 20 tailgaters, plan 3-4 tacos per person (60-80 tacos total). You\'ll need about 100 tortillas, 10-12 lbs of protein, and 3-4 lbs of each topping. Budget $120-200 for food. Always bring extra—hungry fans and neighbors will want some!',
      },
    },
  ],
}

export default function TailgatePartyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-green-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Tailgate Taco Bar Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Bring the taco truck experience to the parking lot</p>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image
            src="/images/guides/guide-tailgate-party.webp"
            alt="Football tailgate taco bar setup"
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
              <strong>A tailgate taco bar</strong> is the ultimate game day food—pre-cook proteins at home, transport in insulated containers, and assemble fresh tacos in the parking lot. Plan 3-4 tacos per person, bring a portable table for your setup, and keep tortillas warm. Budget $6-10/person for a crowd-pleasing spread.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              Forget soggy hot dogs and expensive stadium food—a tailgate taco bar makes you the MVP of the parking lot. Whether you're cheering for college football, the NFL, or any game day event, tacos are portable, crowd-friendly, and taste incredible. Here's how to pull off the perfect tailgate taco spread.
            </p>
          </div>

          {/* Why Tacos for Tailgates */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-600 pb-2">Why Tacos Win at Tailgates</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Tailgate Advantages</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-green-600 mr-2">+</span>Handheld—no plates or utensils needed</li>
                  <li><span className="text-green-600 mr-2">+</span>Proteins stay hot for hours</li>
                  <li><span className="text-green-600 mr-2">+</span>Easy to prep ahead at home</li>
                  <li><span className="text-green-600 mr-2">+</span>Everyone builds their own</li>
                  <li><span className="text-green-600 mr-2">+</span>Neighbors will be jealous</li>
                  <li><span className="text-green-600 mr-2">+</span>Way better than stadium prices</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Perfect For</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-rust-600 mr-2">•</span>Football games (college & NFL)</li>
                  <li><span className="text-rust-600 mr-2">•</span>Baseball parking lot parties</li>
                  <li><span className="text-rust-600 mr-2">•</span>Soccer match watch parties</li>
                  <li><span className="text-rust-600 mr-2">•</span>Concert parking lot hangs</li>
                  <li><span className="text-rust-600 mr-2">•</span>Camping trips</li>
                  <li><span className="text-rust-600 mr-2">•</span>RV gatherings</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Equipment List */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-600 pb-2">Essential Tailgate Taco Gear</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-600">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Keeping Food Hot</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Portable slow cooker (for proteins)</li>
                  <li>• Insulated food carriers</li>
                  <li>• Sterno chafing dishes</li>
                  <li>• Cambro containers</li>
                  <li>• Foil-lined cooler (for tortillas)</li>
                  <li>• Heated lunch bag</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Keeping Food Cold</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Quality cooler with ice</li>
                  <li>• Ice packs for toppings</li>
                  <li>• Separate cooler for drinks</li>
                  <li>• Sealed containers for toppings</li>
                  <li>• Thermometer to check temps</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-rust-600">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Setup Essentials</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Folding table</li>
                  <li>• Tablecloth or grip mat</li>
                  <li>• Serving utensils</li>
                  <li>• Paper plates & napkins</li>
                  <li>• Trash bags</li>
                  <li>• Hand sanitizer & wet wipes</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-green-50 p-6 rounded-lg">
              <h4 className="font-bold text-green-800 mb-2">Power Options</h4>
              <p className="text-green-700 text-sm">
                <strong>No power?</strong> Use Sterno chafing dishes and pre-warmed insulated containers. <strong>Have power?</strong> Portable generators or inverters let you use slow cookers and electric warmers. Some stadiums have parking spots with outlets—ask ahead!
              </p>
            </div>
          </section>

          {/* Quantities Calculator */}
          <section className="mb-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Tailgate Quantities Guide</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full bg-cream-50 border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border px-4 py-3 text-left">Tailgate Size</th>
                    <th className="border px-4 py-3 text-center">Tortillas</th>
                    <th className="border px-4 py-3 text-center">Protein</th>
                    <th className="border px-4 py-3 text-center">Toppings</th>
                    <th className="border px-4 py-3 text-center">Budget*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-green-50">
                    <td className="border px-4 py-3 font-medium">10 fans</td>
                    <td className="border px-4 py-3 text-center">40-50</td>
                    <td className="border px-4 py-3 text-center">5-6 lbs</td>
                    <td className="border px-4 py-3 text-center">2 lbs each</td>
                    <td className="border px-4 py-3 text-center">$60-100</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="border px-4 py-3 font-medium">20 fans</td>
                    <td className="border px-4 py-3 text-center">80-100</td>
                    <td className="border px-4 py-3 text-center">10-12 lbs</td>
                    <td className="border px-4 py-3 text-center">3-4 lbs each</td>
                    <td className="border px-4 py-3 text-center">$120-200</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="border px-4 py-3 font-medium">30 fans</td>
                    <td className="border px-4 py-3 text-center">120-150</td>
                    <td className="border px-4 py-3 text-center">15-18 lbs</td>
                    <td className="border px-4 py-3 text-center">5-6 lbs each</td>
                    <td className="border px-4 py-3 text-center">$180-300</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="border px-4 py-3 font-medium">50 fans</td>
                    <td className="border px-4 py-3 text-center">200-250</td>
                    <td className="border px-4 py-3 text-center">25-30 lbs</td>
                    <td className="border px-4 py-3 text-center">8-10 lbs each</td>
                    <td className="border px-4 py-3 text-center">$300-500</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-charcoal-600 text-sm">
              *Food costs only. Tailgaters eat heartily (3-4 tacos each). Always bring 20% extra—neighbors will want in!
            </p>
          </section>

          {/* Best Proteins */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-600 pb-2">Best Tailgate Taco Proteins</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Prep-Ahead Winners</h3>
                <ul className="space-y-3 text-charcoal-700">
                  <li><strong><Link href="/recipes/carnitas" className="text-rust-600 hover:underline">Carnitas</Link></strong> - Stays moist for hours in its own juices</li>
                  <li><strong>Barbacoa</strong> - Slow-cook overnight, transport hot</li>
                  <li><strong>Shredded Chicken</strong> - Mix with salsa to keep moist</li>
                  <li><strong><Link href="/recipes/birria-tacos" className="text-rust-600 hover:underline">Birria</Link></strong> - Bring consomé in a thermos for dipping</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Cook On-Site Options</h3>
                <ul className="space-y-3 text-charcoal-700">
                  <li><strong>Carne Asada</strong> - Grill fresh on a portable grill</li>
                  <li><strong>Chorizo</strong> - Quick to cook on a flat-top</li>
                  <li><strong>Breakfast Tacos</strong> - Eggs cook fast for early games</li>
                  <li><strong>Al Pastor</strong> - If you have a trompo setup!</li>
                </ul>
              </div>
            </div>

            <div className="bg-sunset-50 p-6 rounded-lg">
              <h4 className="font-bold text-sunset-800 mb-2">MVP Move: The Two-Protein Setup</h4>
              <p className="text-sunset-700 text-sm">
                Bring one prep-ahead protein (carnitas or barbacoa in a slow cooker) plus one you can grill fresh (carne asada or chorizo). Hot off the grill + tender slow-cooked = legendary tailgate status.
              </p>
            </div>
          </section>

          {/* Toppings */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-600 pb-2">Portable Toppings Bar</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Prep Night Before</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Shredded cheese (bag it)</li>
                  <li>• Pico de gallo (sealed container)</li>
                  <li>• Shredded lettuce</li>
                  <li>• Diced onion</li>
                  <li>• Cilantro (whole, chop on-site)</li>
                  <li>• Pickled jalapeños</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Make On-Site</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Guacamole (cut avocados there)</li>
                  <li>• Fresh lime wedges</li>
                  <li>• Quick pickled onions</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Buy Pre-Made</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Sour cream</li>
                  <li>• Bottled salsas (green & red)</li>
                  <li>• Hot sauce variety</li>
                  <li>• Chips & queso</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-600 pb-2">Tailgate Taco Timeline</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="space-y-4">
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">2-3 Days Before</span>
                  <p className="text-charcoal-700">Shop for ingredients, start marinating meats if needed, check all equipment works.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Day Before</span>
                  <p className="text-charcoal-700">Start slow-cooking carnitas/barbacoa. Prep all toppings. Charge any battery-powered equipment. Pack non-perishables.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Morning Of</span>
                  <p className="text-charcoal-700">Transfer hot proteins to transport containers. Pack coolers with ice and cold toppings. Load the car—don't forget the tortillas!</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Arrive at Lot</span>
                  <p className="text-charcoal-700">Set up table and canopy (if allowed). Arrange proteins, start warming tortillas, lay out toppings on ice.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">2 Hours Pre-Game</span>
                  <p className="text-charcoal-700">Prime taco time! Make guacamole, fire up the grill if cooking fresh proteins, start serving.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="bg-rust-600 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Game Time!</span>
                  <p className="text-charcoal-700">Pack up responsibly, take your trash, enjoy the game knowing you crushed the tailgate!</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-600 pb-2">Parking Lot Pro Tips</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Double-Wrap Those Tortillas</h3>
                <p className="text-charcoal-700 text-sm">Wrap tortillas in foil, then towels, then put in an insulated bag or cooler lined with more towels. Cold tortillas ruin everything—keep them warm at all costs!</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Bring Backup Everything</h3>
                <p className="text-charcoal-700 text-sm">Extra napkins, extra tongs, extra bags for trash. Things get lost, borrowed, or blown away. The prepared tailgater is the happy tailgater.</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Make Friends with Neighbors</h3>
                <p className="text-charcoal-700 text-sm">Bring extra tacos—seriously. Sharing food is the best way to make tailgate friends. Trade tacos for beer, sides, or just good vibes.</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Check Stadium Rules</h3>
                <p className="text-charcoal-700 text-sm">Some venues restrict grills, generators, or tent sizes. Check the parking rules before you load up. Nothing worse than having gear confiscated at the gate.</p>
              </div>
            </div>
          </section>

          {/* Weather Contingencies */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-600 pb-2">Game Day Weather Plans</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Hot Weather</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Keep toppings on double ice</li>
                  <li>• Refresh perishables hourly</li>
                  <li>• Use a canopy for shade</li>
                  <li>• Serve cold agua fresca</li>
                  <li>• Don't leave dairy out long</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Cold Weather</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Insulated containers essential</li>
                  <li>• Extra Sterno for heat</li>
                  <li>• Hot coffee/cocoa station</li>
                  <li>• Warm tortillas are critical</li>
                  <li>• Soup/consomé is a plus</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-charcoal-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Rain Plan</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Bring a pop-up canopy</li>
                  <li>• Cover food with lids</li>
                  <li>• Use windproof setup</li>
                  <li>• Keep backup in the car</li>
                  <li>• Embrace the chaos!</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">How early should I start cooking?</h3>
                <p className="text-charcoal-700">Start slow-cooking proteins 8-12 hours before game time (overnight is perfect). For fresh-grilled meats, fire up the grill 2-3 hours before kickoff. Allow 30-45 minutes for setup once you arrive at the lot.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">What if my stadium doesn't allow grills?</h3>
                <p className="text-charcoal-700">Go all-in on prep-ahead proteins! Carnitas, barbacoa, and shredded chicken taste even better when they've had time to absorb flavors. Transport in insulated containers and you're golden.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Can I do breakfast tacos for early games?</h3>
                <p className="text-charcoal-700">Absolutely! <Link href="/recipes/breakfast-tacos" className="text-rust-600 hover:underline">Breakfast tacos</Link> are perfect for early kickoffs. Pre-scramble eggs with chorizo, keep warm in a covered pan, and let people build their own. Add potatoes, bacon, and plenty of cheese.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-green-600 to-charcoal-800 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Win the Tailgate with Premium Tortillas</h2>
            <p className="text-cream-200 mb-6">Stock up on authentic Texas tortillas before game day.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-6 py-3 rounded-lg font-semibold transition-colors">Shop Tortillas</Link>
              <Link href="/tools/party-calculator" className="border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors">Party Calculator</Link>
              <Link href="/guides/superbowl-party" className="border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors">Super Bowl Guide</Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
