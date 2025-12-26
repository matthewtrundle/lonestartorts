import type { Metadata } from 'next'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Birthday Fiesta Party Guide - Mexican Theme Birthday Ideas',
  description: 'Plan an unforgettable Mexican fiesta birthday party! Taco bars, decorations, kid-friendly menus, and authentic recipes. Complete planning guide for all ages.',
  keywords: 'fiesta birthday party, mexican birthday party, taco birthday party, fiesta theme party, mexican party ideas, birthday taco bar, fiesta decorations, kids mexican party',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/birthday-fiesta',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I throw a Mexican fiesta birthday party?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Set up a colorful taco bar with papel picado decorations, offer both kid-friendly and adult options, play festive music, and consider a piñata for activities. Plan 2-3 tacos per adult and 1-2 per child, with sides like rice, beans, and chips with guacamole.',
      },
    },
    {
      '@type': 'Question',
      name: 'What Mexican food is best for kids birthday parties?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Kids love mild options: cheese quesadillas, plain chicken tacos, beef tacos with just cheese, chips and mild salsa, Mexican rice, churros for dessert, and horchata to drink. Skip the spicy salsas or serve them on the side for adults.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many tacos do I need for a birthday party?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a birthday party, plan 2-3 tacos per adult and 1-2 per child. A party of 20 guests (10 adults, 10 kids) needs about 40-50 tortillas. Factor in that kids often prefer quesadillas over tacos.',
      },
    },
  ],
}

export default function BirthdayFiestaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-sunset-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Birthday Fiesta Party Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Plan the ultimate Mexican-themed birthday celebration</p>
          </div>
        </header>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-12-25" />

          {/* Quick Answer */}
          <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>A fiesta birthday party</strong> combines colorful decorations (papel picado, sombreros, cacti), a build-your-own taco bar, festive music, and fun activities like piñatas. Plan 2-3 tacos per adult and 1-2 per child. Include kid-friendly mild options alongside spicier adult choices.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              A Mexican fiesta theme works for any age—from a first birthday to a 50th celebration. The vibrant colors, delicious food, and festive atmosphere create memories that last a lifetime. Here's everything you need to throw an unforgettable fiesta birthday party.
            </p>
          </div>

          {/* Party Themes by Age */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-sunset-500 pb-2">Fiesta Themes by Age</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-pink-400">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Kids Party (Ages 1-10)</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><strong>Theme:</strong> "Uno" (first birthday), "Taco 'Bout Awesome," or Coco-inspired</li>
                  <li><strong>Colors:</strong> Bright rainbow, pink and turquoise</li>
                  <li><strong>Activities:</strong> Piñata, musical chairs to mariachi, sombrero decorating</li>
                  <li><strong>Food focus:</strong> Mild quesadillas, chicken tacos, churros</li>
                  <li><strong>Cake:</strong> Piñata cake, cactus cake, or sombrero cupcakes</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-400">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Tween/Teen Party (Ages 11-17)</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><strong>Theme:</strong> "Taco Tuesday Birthday," Nacho Average Party</li>
                  <li><strong>Colors:</strong> Neon fiesta, black and gold Mexican folk art</li>
                  <li><strong>Activities:</strong> Taco eating contest, salsa tasting, photo booth</li>
                  <li><strong>Food focus:</strong> Build-your-own taco bar, loaded nachos</li>
                  <li><strong>Drinks:</strong> Jarritos sodas, agua frescas, virgin margaritas</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-400">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Adult Fiesta (21+)</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><strong>Theme:</strong> Elegant Mexican, cantina style, desert oasis</li>
                  <li><strong>Colors:</strong> Terra cotta, sage green, rust, cream</li>
                  <li><strong>Activities:</strong> Margarita bar, tequila tasting, live mariachi</li>
                  <li><strong>Food focus:</strong> Upscale tacos, <Link href="/recipes/birria-tacos" className="text-rust-600 hover:underline">birria</Link>, ceviche</li>
                  <li><strong>Drinks:</strong> Margaritas, palomas, Mexican beer, mezcal</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-400">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Milestone Birthdays (30, 40, 50+)</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><strong>Theme:</strong> "Taco 'Bout 30!" "40 and Fabulous Fiesta"</li>
                  <li><strong>Colors:</strong> Gold accents, sophisticated color palette</li>
                  <li><strong>Activities:</strong> Memory board, roast/toast, dancing</li>
                  <li><strong>Food focus:</strong> Full taco bar + appetizer stations</li>
                  <li><strong>Special touch:</strong> Custom piñata shaped like the number</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Food Planning */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-sunset-500 pb-2">Birthday Fiesta Food Planning</h2>

            {/* Quantities Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full bg-white shadow-lg border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border px-4 py-3 text-left">Item</th>
                    <th className="border px-4 py-3 text-center">Per Adult</th>
                    <th className="border px-4 py-3 text-center">Per Child</th>
                    <th className="border px-4 py-3 text-center">Party of 20*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-sunset-50">
                    <td className="border px-4 py-3 font-medium">Tortillas</td>
                    <td className="border px-4 py-3 text-center">3-4</td>
                    <td className="border px-4 py-3 text-center">1-2</td>
                    <td className="border px-4 py-3 text-center">45-60</td>
                  </tr>
                  <tr className="hover:bg-sunset-50">
                    <td className="border px-4 py-3 font-medium">Meat (lbs)</td>
                    <td className="border px-4 py-3 text-center">1/3 lb</td>
                    <td className="border px-4 py-3 text-center">1/6 lb</td>
                    <td className="border px-4 py-3 text-center">5 lbs</td>
                  </tr>
                  <tr className="hover:bg-sunset-50">
                    <td className="border px-4 py-3 font-medium">Rice & Beans</td>
                    <td className="border px-4 py-3 text-center">1/2 cup each</td>
                    <td className="border px-4 py-3 text-center">1/4 cup each</td>
                    <td className="border px-4 py-3 text-center">2 batches each</td>
                  </tr>
                  <tr className="hover:bg-sunset-50">
                    <td className="border px-4 py-3 font-medium">Chips</td>
                    <td className="border px-4 py-3 text-center">2 oz</td>
                    <td className="border px-4 py-3 text-center">1 oz</td>
                    <td className="border px-4 py-3 text-center">3-4 bags</td>
                  </tr>
                  <tr className="hover:bg-sunset-50">
                    <td className="border px-4 py-3 font-medium">Guacamole</td>
                    <td className="border px-4 py-3 text-center">3-4 oz</td>
                    <td className="border px-4 py-3 text-center">2 oz</td>
                    <td className="border px-4 py-3 text-center">4 cups</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-charcoal-600 mt-2">*Assumes 10 adults and 10 children</p>
            </div>

            {/* Kids vs Adults Menu */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-pink-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Kid-Friendly Menu</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• Cheese quesadillas (always a hit!)</li>
                  <li>• Plain chicken tacos with cheese</li>
                  <li>• Ground beef tacos, mild seasoning</li>
                  <li>• Buttered <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">flour tortillas</Link> rolled up</li>
                  <li>• Chips with mild salsa or queso</li>
                  <li>• Mexican rice</li>
                  <li>• Fresh fruit (watermelon, mango)</li>
                  <li>• <Link href="/recipes/bunuelos" className="text-rust-600 hover:underline">Churros</Link> or bunuelos for dessert</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Adult-Friendly Menu</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• <Link href="/recipes/street-tacos" className="text-rust-600 hover:underline">Street tacos</Link> with all the fixings</li>
                  <li>• <Link href="/recipes/birria-tacos" className="text-rust-600 hover:underline">Birria tacos</Link> with consomé</li>
                  <li>• Carnitas, carne asada options</li>
                  <li>• Spicy salsas and pickled jalapeños</li>
                  <li>• <Link href="/recipes/nachos" className="text-rust-600 hover:underline">Loaded nachos</Link></li>
                  <li>• Elote (street corn)</li>
                  <li>• Guacamole and pico de gallo</li>
                  <li>• Tres leches cake</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Decorations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-sunset-500 pb-2">Fiesta Decorations</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-xl font-bold text-charcoal-950 mb-4">Essential Fiesta Decor</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-charcoal-950 mb-2">Must-Haves</h4>
                  <ul className="text-sm text-charcoal-700 space-y-1">
                    <li>• Papel picado banners</li>
                    <li>• Colorful tablecloths</li>
                    <li>• Fresh flowers (marigolds!)</li>
                    <li>• Serape table runners</li>
                    <li>• Piñata (star or custom shape)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal-950 mb-2">Nice to Have</h4>
                  <ul className="text-sm text-charcoal-700 space-y-1">
                    <li>• Mini sombreros</li>
                    <li>• Cactus decorations</li>
                    <li>• Talavera-style plates</li>
                    <li>• String lights</li>
                    <li>• Photo booth props</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal-950 mb-2">DIY Options</h4>
                  <ul className="text-sm text-charcoal-700 space-y-1">
                    <li>• Paper flower backdrop</li>
                    <li>• Mason jar luminaries</li>
                    <li>• Tissue paper garlands</li>
                    <li>• Painted cacti centerpieces</li>
                    <li>• Custom papel picado</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-sunset-100 p-6 rounded-lg">
              <h4 className="font-bold text-charcoal-950 mb-3">Color Palettes by Style</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Classic Fiesta:</span>
                  <p className="text-charcoal-700">Red, green, yellow, orange, pink, turquoise (all the colors!)</p>
                </div>
                <div>
                  <span className="font-semibold">Modern Fiesta:</span>
                  <p className="text-charcoal-700">Coral, mint, gold, white</p>
                </div>
                <div>
                  <span className="font-semibold">Elegant Fiesta:</span>
                  <p className="text-charcoal-700">Terra cotta, sage, cream, gold</p>
                </div>
              </div>
            </div>
          </section>

          {/* Activities */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-sunset-500 pb-2">Party Activities & Games</h2>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For Kids</h3>
                <ul className="grid md:grid-cols-2 gap-3 text-charcoal-700">
                  <li>• <strong>Piñata</strong> - The classic! Fill with candy and small toys</li>
                  <li>• <strong>Musical Sombreros</strong> - Like musical chairs with hats</li>
                  <li>• <strong>Maracas craft</strong> - Decorate paper plate maracas</li>
                  <li>• <strong>Limbo</strong> - Play to mariachi music</li>
                  <li>• <strong>Face painting</strong> - Sugar skulls, butterflies</li>
                  <li>• <strong>Sombrero decorating</strong> - Stickers, gems, ribbon</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For Adults</h3>
                <ul className="grid md:grid-cols-2 gap-3 text-charcoal-700">
                  <li>• <strong>Margarita/tequila tasting</strong> - Rate different varieties</li>
                  <li>• <strong>Salsa tasting contest</strong> - Blind taste test salsas</li>
                  <li>• <strong>Photo booth</strong> - Sombreros, maracas, mustaches</li>
                  <li>• <strong>Lotería (Mexican bingo)</strong> - With small prizes</li>
                  <li>• <strong>Dance lesson</strong> - Salsa or cumbia basics</li>
                  <li>• <strong>Adult piñata</strong> - Fill with mini bottles!</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-sunset-500 pb-2">Party Day Timeline</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="space-y-4">
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-sunset-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">1 Week Before</span>
                  <p className="text-charcoal-700">Order tortillas, confirm guest count, buy decorations, plan activities.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-sunset-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">2 Days Before</span>
                  <p className="text-charcoal-700">Shop for groceries, prep any do-ahead items, charge camera batteries.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-sunset-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Day Before</span>
                  <p className="text-charcoal-700">Set up decorations, prep taco toppings, make salsas, fill piñata.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-sunset-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Morning Of</span>
                  <p className="text-charcoal-700">Start slow cooker meats, set up food stations, make guacamole, hang piñata.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-sunset-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">1 Hour Before</span>
                  <p className="text-charcoal-700">Warm tortillas, put out cold toppings, set up drink station, start music.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="bg-rust-600 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Party Time!</span>
                  <p className="text-charcoal-700">Food → Games → Piñata → Cake → More tacos!</p>
                </div>
              </div>
            </div>
          </section>

          {/* Music Playlist */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-sunset-500 pb-2">Fiesta Playlist Ideas</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-3">Kid-Friendly Fiesta</h3>
                <ul className="text-sm text-charcoal-700 space-y-1">
                  <li>• "Coco" Soundtrack</li>
                  <li>• "La Bamba"</li>
                  <li>• Kidz Bop Latin hits</li>
                  <li>• "Macarena"</li>
                  <li>• "Livin' La Vida Loca"</li>
                </ul>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-3">Adult Fiesta</h3>
                <ul className="text-sm text-charcoal-700 space-y-1">
                  <li>• Cumbia classics</li>
                  <li>• Selena hits</li>
                  <li>• Traditional mariachi</li>
                  <li>• Bad Bunny / J Balvin</li>
                  <li>• Mexican rock en español</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Is a fiesta theme appropriate for any age?</h3>
                <p className="text-charcoal-700">Absolutely! Fiesta themes work from first birthdays to milestone 50th, 60th, and beyond. Just adjust the food spice level, activities, and decorations to suit your crowd.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">How do I make a fiesta party work indoors?</h3>
                <p className="text-charcoal-700">Clear furniture for dancing and games, hang papel picado from the ceiling, use battery-operated string lights for ambiance, and set up a designated food area. Indoor piñatas work great—just give kids plenty of room!</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">What desserts work for a fiesta birthday?</h3>
                <p className="text-charcoal-700">Traditional options include tres leches cake, churros, <Link href="/recipes/bunuelos" className="text-rust-600 hover:underline">bunuelos</Link>, Mexican hot chocolate cupcakes, or a regular birthday cake decorated with papel picado and sombrero toppers.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-sunset-500 to-rust-600 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Make Your Fiesta Unforgettable</h2>
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
