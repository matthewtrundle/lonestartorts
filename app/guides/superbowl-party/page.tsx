import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Super Bowl Party Food Guide - Ultimate Taco Bar & Mexican Appetizers',
  description: 'Plan the ultimate Super Bowl party with a taco bar, nachos, and Mexican appetizers. How many tortillas for game day, menu ideas, setup tips, and recipes for your football party.',
  keywords: 'super bowl party food, super bowl taco bar, game day tacos, football party food, super bowl nachos, super bowl appetizers, mexican game day food, how many tortillas for super bowl',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/superbowl-party',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many tortillas do I need for a Super Bowl party?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Plan for 3-4 tacos per person for a main meal, or 2 tacos per person if serving as appetizers alongside other foods. For a party of 20 with tacos as the main food, you\'ll need 60-80 corn tortillas or 40-60 flour tortillas.',
      },
    },
    {
      '@type': 'Question',
      name: 'What Mexican food is best for Super Bowl parties?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The best Super Bowl Mexican foods are finger-friendly and easy to eat while watching the game: loaded nachos, street tacos, taquitos/flautas, quesadilla wedges, and tostadas. Avoid messy burritos that require utensils.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I set up a taco bar for a Super Bowl party?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Set up your taco bar in serving order: warm tortillas first (kept warm in a towel-lined container), then proteins, then toppings (onions, cilantro, lettuce, cheese, tomatoes), then sauces (salsa, hot sauce, lime wedges). Use slow cookers to keep meats warm throughout the game.',
      },
    },
  ],
}

export default function SuperBowlPartyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-rust-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Super Bowl Party Food Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">The ultimate game day taco bar & Mexican appetizers playbook</p>
          </div>
        </header>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-12-25" />

          {/* Quick Answer */}
          <div className="bg-rust-50 border-l-4 border-rust-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>For the ultimate Super Bowl party:</strong> Set up a build-your-own taco bar with warm tortillas, 2-3 protein options, and plenty of toppings. Plan for 3-4 tacos per guest. Keep everything warm in slow cookers and serve finger-friendly foods like nachos, taquitos, and quesadilla wedges alongside your taco spread.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              Super Bowl Sunday is the second-biggest eating day in America (after Thanksgiving). And nothing beats a spread of tacos, nachos, and Mexican appetizers for feeding a crowd while keeping eyes on the game. Here's your complete playbook for hosting an epic football food party.
            </p>
          </div>

          {/* Tortilla Calculator */}
          <section className="mb-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">How Many Tortillas Do You Need?</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full bg-cream-50 border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border px-4 py-3 text-left">Party Size</th>
                    <th className="border px-4 py-3 text-center">Tacos as Main</th>
                    <th className="border px-4 py-3 text-center">Tacos as Appetizer</th>
                    <th className="border px-4 py-3 text-center">Nachos (Chips)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-masa-50">
                    <td className="border px-4 py-3 font-medium">10 guests</td>
                    <td className="border px-4 py-3 text-center">30-40 tortillas</td>
                    <td className="border px-4 py-3 text-center">20 tortillas</td>
                    <td className="border px-4 py-3 text-center">2-3 bags chips</td>
                  </tr>
                  <tr className="hover:bg-masa-50">
                    <td className="border px-4 py-3 font-medium">20 guests</td>
                    <td className="border px-4 py-3 text-center">60-80 tortillas</td>
                    <td className="border px-4 py-3 text-center">40 tortillas</td>
                    <td className="border px-4 py-3 text-center">4-5 bags chips</td>
                  </tr>
                  <tr className="hover:bg-masa-50">
                    <td className="border px-4 py-3 font-medium">30 guests</td>
                    <td className="border px-4 py-3 text-center">90-120 tortillas</td>
                    <td className="border px-4 py-3 text-center">60 tortillas</td>
                    <td className="border px-4 py-3 text-center">6-7 bags chips</td>
                  </tr>
                  <tr className="hover:bg-masa-50">
                    <td className="border px-4 py-3 font-medium">50 guests</td>
                    <td className="border px-4 py-3 text-center">150-200 tortillas</td>
                    <td className="border px-4 py-3 text-center">100 tortillas</td>
                    <td className="border px-4 py-3 text-center">10-12 bags chips</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-charcoal-600 text-sm">
              <strong>Pro tip:</strong> Always buy 20% extra—hungry football fans eat more than you expect, especially during overtime!
            </p>
          </section>

          {/* Best Game Day Foods */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-rust-500 pb-2">Best Super Bowl Mexican Foods</h2>

            <p className="text-charcoal-700 mb-6">
              The key to great game day food: easy to eat with one hand while watching the TV. Skip anything that needs a fork.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">MVP Picks (Easy to Eat)</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li className="flex items-start"><span className="text-green-500 mr-2">★</span><Link href="/recipes/nachos" className="text-rust-600 hover:underline">Loaded Nachos</Link> - The #1 Super Bowl food</li>
                  <li className="flex items-start"><span className="text-green-500 mr-2">★</span><Link href="/recipes/street-tacos" className="text-rust-600 hover:underline">Street Tacos</Link> - Small, 2-3 bites each</li>
                  <li className="flex items-start"><span className="text-green-500 mr-2">★</span><Link href="/recipes/flautas" className="text-rust-600 hover:underline">Taquitos/Flautas</Link> - Crispy, dippable</li>
                  <li className="flex items-start"><span className="text-green-500 mr-2">★</span>Quesadilla wedges - Cut into triangles</li>
                  <li className="flex items-start"><span className="text-green-500 mr-2">★</span><Link href="/recipes/tostadas" className="text-rust-600 hover:underline">Mini Tostadas</Link> - Like flat tacos</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Solid Second String</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li className="flex items-start"><span className="text-yellow-500 mr-2">•</span>Guacamole & chips</li>
                  <li className="flex items-start"><span className="text-yellow-500 mr-2">•</span>Queso dip</li>
                  <li className="flex items-start"><span className="text-yellow-500 mr-2">•</span>7-layer dip</li>
                  <li className="flex items-start"><span className="text-yellow-500 mr-2">•</span>Jalapeño poppers</li>
                  <li className="flex items-start"><span className="text-yellow-500 mr-2">•</span>Elote (street corn)</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg mt-6">
              <h4 className="font-bold text-red-800">Avoid for Game Day:</h4>
              <p className="text-red-700">Giant burritos (too messy), wet burritos with sauce (need a fork), and anything requiring plates and utensils. Save those for Taco Tuesday when you can sit at a table.</p>
            </div>
          </section>

          {/* Taco Bar Setup */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-rust-500 pb-2">How to Set Up a Game Day Taco Bar</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full flex-shrink-0">1</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Tortillas First</h3>
                    <p className="text-charcoal-700">Warm your <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn</Link> or <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">flour tortillas</Link> and keep them in a tortilla warmer or towel-lined basket. Corn for authentic street tacos, flour for bigger appetites.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full flex-shrink-0">2</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Proteins in Slow Cookers</h3>
                    <p className="text-charcoal-700">Keep meats warm throughout the game in slow cookers on "warm" setting. Great options: carnitas (pulled pork), carne asada, shredded chicken, or <Link href="/recipes/birria-tacos" className="text-rust-600 hover:underline">birria</Link>. Offer 2-3 protein choices.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full flex-shrink-0">3</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Toppings Station</h3>
                    <p className="text-charcoal-700">Arrange in order of use: diced onions, fresh cilantro, shredded lettuce, shredded cheese, diced tomatoes, pickled jalapeños, sliced radishes.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full flex-shrink-0">4</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Salsas & Sauces</h3>
                    <p className="text-charcoal-700">Offer multiple heat levels: mild pico de gallo, medium salsa verde, hot red salsa. Add lime wedges, sour cream, and guacamole. Label the spicy ones!</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Menu Ideas */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-rust-500 pb-2">Complete Super Bowl Menu Ideas</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Classic Taco Bar (20 guests)</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• 80 <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortillas</Link></li>
                  <li>• 5 lbs carnitas (pulled pork)</li>
                  <li>• 3 lbs carne asada</li>
                  <li>• 1 lb each: onions, cilantro, tomatoes</li>
                  <li>• 2 lbs shredded cheese</li>
                  <li>• 3 jars salsa (various heat)</li>
                  <li>• 2 containers sour cream</li>
                  <li>• 4 avocados for guac</li>
                  <li>• Limes, jalapeños</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-rust-50 to-rust-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Nacho Supreme Station (20 guests)</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• 5 large bags tortilla chips</li>
                  <li>• 3 lbs seasoned ground beef</li>
                  <li>• 2 cans refried beans</li>
                  <li>• 2 jars cheese sauce (keep warm)</li>
                  <li>• 2 lbs shredded cheese</li>
                  <li>• Jalapeños, black olives</li>
                  <li>• Pico de gallo, sour cream</li>
                  <li>• Guacamole</li>
                  <li>• Baking sheets for serving</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-masa-50 to-masa-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Finger Food Fiesta (20 guests)</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• 40 <Link href="/recipes/flautas" className="text-rust-600 hover:underline">taquitos/flautas</Link></li>
                  <li>• 30 quesadilla wedges</li>
                  <li>• 20 <Link href="/recipes/tostadas" className="text-rust-600 hover:underline">mini tostadas</Link></li>
                  <li>• Big batch <Link href="/recipes/nachos" className="text-rust-600 hover:underline">loaded nachos</Link></li>
                  <li>• Guacamole & chips</li>
                  <li>• Queso dip</li>
                  <li>• Salsa trio</li>
                  <li>• Jalapeño poppers</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-sunset-50 to-sunset-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Birria Bar (Trending!)</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• 80 <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortillas</Link></li>
                  <li>• 6 lbs <Link href="/recipes/birria-tacos" className="text-rust-600 hover:underline">birria beef</Link></li>
                  <li>• 2 quarts consomé (dipping broth)</li>
                  <li>• 2 lbs Oaxaca cheese</li>
                  <li>• Fresh cilantro, onions</li>
                  <li>• Lime wedges</li>
                  <li>• Radishes for garnish</li>
                  <li>• Individual consomé cups</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-rust-500 pb-2">Game Day Timeline</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="space-y-4">
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-charcoal-950 text-cream-50 px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Day Before</span>
                  <p className="text-charcoal-700">Prep all toppings (chop onions, cilantro, tomatoes). Make salsa. Marinate meats. Thaw tortillas if frozen.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-charcoal-950 text-cream-50 px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Morning</span>
                  <p className="text-charcoal-700">Start slow cooker meats (carnitas need 8 hours, birria needs 4-6). Make guacamole (cover with plastic wrap touching surface).</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-charcoal-950 text-cream-50 px-3 py-1 rounded font-bold text-sm whitespace-nowrap">2 Hours Before</span>
                  <p className="text-charcoal-700">Set up taco bar station. Arrange toppings in bowls. Put cheese sauce in slow cooker on warm.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-charcoal-950 text-cream-50 px-3 py-1 rounded font-bold text-sm whitespace-nowrap">30 Min Before</span>
                  <p className="text-charcoal-700">Warm tortillas. Shred meats. Put out chips and dips. Fill drink coolers with ice.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="bg-rust-600 text-cream-50 px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Kickoff!</span>
                  <p className="text-charcoal-700">Everything's ready! Replenish tortillas and toppings during halftime. Enjoy the game!</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-rust-500 pb-2">Pro Tips for Super Bowl Hosting</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Keep Tortillas Warm</h3>
                <p className="text-charcoal-700 text-sm">Wrap batches of warmed tortillas in foil or a clean kitchen towel. Refresh in microwave during halftime. Cold tortillas = sad tacos.</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Label Everything</h3>
                <p className="text-charcoal-700 text-sm">Especially spice levels! Use tent cards: "Mild," "Medium," "HOT." Label meats for guests with dietary restrictions.</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Double the Guac</h3>
                <p className="text-charcoal-700 text-sm">Whatever you think you need, double it. Guacamole disappears first at every party. Every. Single. Time.</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Halftime Refresh</h3>
                <p className="text-charcoal-700 text-sm">Use halftime to warm more tortillas, refill toppings, and put out a fresh batch of nachos. Your guests will love you.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Should I use corn or flour tortillas for a taco bar?</h3>
                <p className="text-charcoal-700">Offer both! Corn tortillas are authentic for street tacos and are gluten-free. Flour tortillas are better for bigger appetites and hold more fillings. Most hosts do 60% corn, 40% flour.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Can I make tacos ahead of time?</h3>
                <p className="text-charcoal-700">Don't pre-make assembled tacos—they get soggy. Instead, prep all components ahead and let guests build their own. Meats can stay warm in slow cookers for hours.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">What if I have vegetarian guests?</h3>
                <p className="text-charcoal-700">Add a vegetarian protein option like seasoned black beans, grilled peppers and onions, or sofritas (spiced tofu). Keep it in a separate slow cooker. Clearly label it!</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-rust-600 to-charcoal-950 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Stock Up for Game Day</h2>
            <p className="text-cream-200 mb-6">Get authentic Texas tortillas delivered before the big game.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-6 py-3 rounded-lg font-semibold transition-colors">Shop All Tortillas</Link>
              <Link href="/tools/party-calculator" className="border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors">Party Calculator</Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
