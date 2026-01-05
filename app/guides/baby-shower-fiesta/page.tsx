import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Taco Baby Shower Guide - Taco \'Bout a Baby Party Ideas',
  description: 'Plan the perfect taco-themed baby shower! Complete guide with "Taco \'Bout a Baby" decoration ideas, menu suggestions, quantities for 20-75 guests, and budget tips.',
  keywords: 'taco baby shower, taco bout a baby, baby shower taco bar, fiesta baby shower, Mexican baby shower theme, baby shower food ideas, taco bout a baby decorations, baby shower catering',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/baby-shower-fiesta',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a "Taco \'Bout a Baby" shower?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A "Taco \'Bout a Baby" shower is a popular baby shower theme featuring a taco bar, fiesta decorations, and playful taco-themed puns. It\'s perfect for casual, co-ed baby showers and is budget-friendly while still being fun and memorable. The theme works for any season and accommodates all dietary needs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a taco bar baby shower cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A DIY taco bar baby shower costs $6-10 per person for food. For 30 guests, budget $180-300 for food plus $50-100 for themed decorations. Catered taco bars run $12-20 per person. The taco bar theme is one of the most budget-friendly baby shower options while still feeling special and festive.',
      },
    },
    {
      '@type': 'Question',
      name: 'What food do you serve at a taco baby shower?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Serve a build-your-own taco bar with 2-3 protein options (chicken, carnitas, black beans), both corn and flour tortillas, and a variety of toppings. Add chips and guacamole, Mexican rice, and finish with themed desserts like churros or a "Taco \'Bout a Baby" cake. Consider virgin margaritas or agua frescas for drinks.',
      },
    },
  ],
}

export default function BabyShowerFiestaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-pink-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Taco Baby Shower Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Let's taco 'bout a baby with the perfect fiesta shower!</p>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image
            src="/images/guides/guide-baby-shower-fiesta.webp"
            alt="Baby shower taco bar with festive decorations"
            fill
            className="object-cover"
            priority
          />
        </div>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-12-30" />

          {/* Quick Answer */}
          <div className="bg-pink-50 border-l-4 border-pink-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>A "Taco 'Bout a Baby" shower</strong> is a fun, budget-friendly baby shower theme featuring a DIY taco bar, fiesta decorations, and playful puns. Plan 2-3 tacos per guest, use colorful papel picado and cacti decor, and add themed desserts. Perfect for co-ed showers and costs $6-12/person for food.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              The "Taco 'Bout a Baby" theme has become one of the most popular baby shower ideas—and for good reason! It's festive, affordable, and appeals to everyone. Whether you're hosting a traditional ladies' shower or a co-ed fiesta, a taco bar is the perfect centerpiece for celebrating the parents-to-be.
            </p>
          </div>

          {/* Why It Works */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Why Taco Baby Showers Are So Popular</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-pink-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Perfect for Modern Showers</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-pink-500 mr-2">+</span>Works for co-ed "couples" showers</li>
                  <li><span className="text-pink-500 mr-2">+</span>Gender-neutral (great for surprises!)</li>
                  <li><span className="text-pink-500 mr-2">+</span>Casual vibe puts everyone at ease</li>
                  <li><span className="text-pink-500 mr-2">+</span>Interactive food station guests love</li>
                  <li><span className="text-pink-500 mr-2">+</span>Tons of punny decor options</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Budget-Friendly Benefits</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><span className="text-green-500 mr-2">$</span>DIY food: $6-10/person</li>
                  <li><span className="text-green-500 mr-2">$</span>Decor is colorful & cheap</li>
                  <li><span className="text-green-500 mr-2">$</span>No expensive catering needed</li>
                  <li><span className="text-green-500 mr-2">$</span>Feeds any crowd size easily</li>
                  <li><span className="text-green-500 mr-2">$</span>Accommodates all diets</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Theme & Decorations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Taco Baby Shower Decorations</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-sunset-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Fiesta Essentials</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Papel picado banners</li>
                  <li>• Colorful tissue paper flowers</li>
                  <li>• Mini cacti centerpieces</li>
                  <li>• Serape table runners</li>
                  <li>• Festive balloon arch</li>
                  <li>• String lights/Twinkle lights</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-pink-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Punny Signs & Banners</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• "Taco 'Bout a Baby" banner</li>
                  <li>• "Holy Guacamole!"</li>
                  <li>• "Let's Taco 'Bout Baby [Name]"</li>
                  <li>• "A Little Cutie is on the Way"</li>
                  <li>• "Nacho Average Baby"</li>
                  <li>• "One in a Melon" (for drinks)</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Table Settings</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Bright solid tablecloths</li>
                  <li>• Cactus or taco shaped plates</li>
                  <li>• Fiesta-pattern napkins</li>
                  <li>• Mini sombrero centerpieces</li>
                  <li>• Succulent party favors</li>
                  <li>• Custom taco bar labels</li>
                </ul>
              </div>
            </div>

            <div className="bg-pink-50 p-6 rounded-lg">
              <h4 className="font-bold text-pink-800 mb-2">Color Scheme Ideas</h4>
              <p className="text-pink-700 text-sm">
                <strong>For Girls:</strong> Pink, coral, gold with cacti and flowers. <strong>For Boys:</strong> Blue, green, orange with taco and nacho motifs. <strong>Gender Neutral:</strong> Yellow, green, terracotta—full fiesta vibes! Mix colors freely for the most festive look.
              </p>
            </div>
          </section>

          {/* Quantities Calculator */}
          <section className="mb-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Baby Shower Quantities Guide</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full bg-cream-50 border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border px-4 py-3 text-left">Guests</th>
                    <th className="border px-4 py-3 text-center">Tortillas</th>
                    <th className="border px-4 py-3 text-center">Protein</th>
                    <th className="border px-4 py-3 text-center">Toppings</th>
                    <th className="border px-4 py-3 text-center">Budget*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">20 guests</td>
                    <td className="border px-4 py-3 text-center">60-80</td>
                    <td className="border px-4 py-3 text-center">5-7 lbs</td>
                    <td className="border px-4 py-3 text-center">2-3 lbs each</td>
                    <td className="border px-4 py-3 text-center">$120-200</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">30 guests</td>
                    <td className="border px-4 py-3 text-center">90-120</td>
                    <td className="border px-4 py-3 text-center">8-10 lbs</td>
                    <td className="border px-4 py-3 text-center">3-4 lbs each</td>
                    <td className="border px-4 py-3 text-center">$180-300</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">50 guests</td>
                    <td className="border px-4 py-3 text-center">150-200</td>
                    <td className="border px-4 py-3 text-center">12-15 lbs</td>
                    <td className="border px-4 py-3 text-center">5-6 lbs each</td>
                    <td className="border px-4 py-3 text-center">$300-500</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">75 guests</td>
                    <td className="border px-4 py-3 text-center">225-300</td>
                    <td className="border px-4 py-3 text-center">18-22 lbs</td>
                    <td className="border px-4 py-3 text-center">7-9 lbs each</td>
                    <td className="border px-4 py-3 text-center">$450-750</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-charcoal-600 text-sm">
              *Food costs only. Add $50-150 for decorations. Baby showers typically have lighter eating (2-3 tacos/person) since there are often other snacks and desserts.
            </p>
          </section>

          {/* Menu Ideas */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Baby Shower Taco Bar Menu</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Protein Options</h3>
                <p className="text-sm text-charcoal-600 mb-3">Offer 2-3 choices:</p>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• <strong>Shredded Chicken</strong> - Crowd favorite</li>
                  <li>• <strong>Carnitas</strong> - <Link href="/recipes/carnitas" className="text-rust-600 hover:underline">Slow-roasted pork</Link></li>
                  <li>• <strong>Ground Beef</strong> - Classic option</li>
                  <li>• <strong>Black Beans</strong> - Vegetarian</li>
                  <li>• <strong>Grilled Veggies</strong> - Vegan option</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-pink-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Toppings Bar</h3>
                <p className="text-sm text-charcoal-600 mb-3">Keep it colorful:</p>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Fresh pico de gallo</li>
                  <li>• Guacamole (make fresh!)</li>
                  <li>• Shredded cheese</li>
                  <li>• Sour cream</li>
                  <li>• Cilantro & onion</li>
                  <li>• Lime wedges</li>
                  <li>• Jalapeños (on the side)</li>
                  <li>• Mild & hot salsa</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-masa-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Sides & Starters</h3>
                <p className="text-sm text-charcoal-600 mb-3">Round out the menu:</p>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• <Link href="/recipes/homemade-chips" className="text-rust-600 hover:underline">Tortilla chips</Link> & salsa</li>
                  <li>• Queso dip</li>
                  <li>• Mexican street corn</li>
                  <li>• Cilantro lime rice</li>
                  <li>• Refried beans</li>
                  <li>• Fresh fruit platter</li>
                </ul>
              </div>
            </div>

            <div className="bg-sunset-50 p-6 rounded-lg">
              <h4 className="font-bold text-sunset-800 mb-2">Themed Desserts</h4>
              <p className="text-sunset-700 text-sm">
                <strong>Must-haves:</strong> "Taco 'Bout a Baby" cake or cupcakes, churros with chocolate sauce, cinnamon-sugar sopapillas, Mexican wedding cookies, fruit cups shaped like cacti, or a tres leches cake. Keep it fun and on-theme!
              </p>
            </div>
          </section>

          {/* Drinks */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Fiesta Drink Station</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Virgin Drink Ideas</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• <strong>Virgin Margaritas</strong> - Lime, triple sec syrup, sparkling water</li>
                  <li>• <strong>Agua Frescas</strong> - Watermelon, horchata, jamaica</li>
                  <li>• <strong>Mocktail Palomas</strong> - Grapefruit soda, lime</li>
                  <li>• <strong>Sparkling Limeade</strong> - Classic and refreshing</li>
                  <li>• <strong>Mexican Hot Chocolate</strong> - For fall/winter showers</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Fun Drink Labels</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• "Mama-rita" (for the mom-to-be's virgin version)</li>
                  <li>• "Holy Guacamole Punch"</li>
                  <li>• "Taco 'Bout Thirsty!"</li>
                  <li>• "Baby's First Agua Fresca"</li>
                  <li>• "Nine Month Mocktails"</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Baby Shower Prep Timeline</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="space-y-4">
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">4 Weeks Before</span>
                  <p className="text-charcoal-700">Set date, send invitations, order themed decorations online, plan menu.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">2 Weeks Before</span>
                  <p className="text-charcoal-700">Confirm RSVPs, finalize food quantities, order specialty tortillas, plan games.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">3 Days Before</span>
                  <p className="text-charcoal-700">Shop for all ingredients, prep what you can (marinades, salsas that keep).</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Day Before</span>
                  <p className="text-charcoal-700">Start slow-cooking proteins, chop toppings (except avocado), decorate venue, set up stations.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Morning Of</span>
                  <p className="text-charcoal-700">Make guacamole, finish cooking, warm tortillas, arrange buffet, final touches on decor.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="bg-rust-600 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Party Time!</span>
                  <p className="text-charcoal-700">Welcome guests, enjoy the fiesta, celebrate the mom-to-be!</p>
                </div>
              </div>
            </div>
          </section>

          {/* Games */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Taco-Themed Shower Games</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">"Taco 'Bout Baby" Mad Libs</h3>
                <p className="text-charcoal-700 text-sm">Create fill-in-the-blank stories about the baby using taco/fiesta vocabulary. Share the funniest results!</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Baby Food Taste Test</h3>
                <p className="text-charcoal-700 text-sm">Guests guess baby food flavors while blindfolded. Winner gets a fiesta prize!</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Guess the Baby Bump</h3>
                <p className="text-charcoal-700 text-sm">Measure ribbon around belly—closest guess wins. Use papel picado ribbon for on-theme prizes.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">"Don't Say Baby" Cactus</h3>
                <p className="text-charcoal-700 text-sm">Guests wear cactus or taco pins. If caught saying "baby," lose your pin. Most pins wins!</p>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Pro Tips for a Perfect Shower</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Spice Levels Matter</h3>
                <p className="text-charcoal-700 text-sm">Pregnant guests and elderly relatives may have heartburn sensitivities. Offer mild options and keep spicy salsas clearly labeled on the side.</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Set Up a Photo Area</h3>
                <p className="text-charcoal-700 text-sm">Create a fiesta photo booth with props—mini sombreros, paper taco cutouts, themed signs. Great for memories and social sharing!</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Prep a To-Go Station</h3>
                <p className="text-charcoal-700 text-sm">Have small containers so guests can take leftover tacos home. Less waste and everyone's happy!</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Succulent Party Favors</h3>
                <p className="text-charcoal-700 text-sm">Small succulents in terra cotta pots with "Thanks for coming, cactus wait to meet Baby [Name]!" tags make perfect on-theme takeaways.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Is a taco baby shower too casual?</h3>
                <p className="text-charcoal-700">Not at all! The beauty of this theme is that it can be as casual or elevated as you want. Add cloth napkins, elegant serving dishes, and upscale proteins like carnitas or barbacoa to make it feel special while keeping the fun, festive vibe.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">How do I keep food warm for a 3-hour shower?</h3>
                <p className="text-charcoal-700">Use chafing dishes with Sterno for proteins, keep tortillas wrapped in insulated containers, and refresh toppings from the fridge every hour. Assign a helper to monitor the food station while you enjoy the party.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Can this work for a gender reveal party?</h3>
                <p className="text-charcoal-700">Absolutely! Use neutral fiesta colors, then reveal with pink or blue salsa, colored churro sugar, or a "What's Cookin'?" themed reveal cake. "Taco 'Bout a Surprise!" makes a great reveal party banner.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-pink-500 to-sunset-500 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Let's Taco 'Bout Your Baby Shower!</h2>
            <p className="text-cream-200 mb-6">Get authentic Texas tortillas delivered for your celebration.</p>
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
