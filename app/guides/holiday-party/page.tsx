import type { Metadata } from 'next'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Holiday Party Guide - Christmas, Thanksgiving & New Year\'s Mexican Menu Ideas',
  description: 'Elevate your holiday entertaining with Mexican-inspired menus. Christmas tamales, Thanksgiving with tortillas, New Year\'s Eve fiesta ideas, and complete party planning guides.',
  keywords: 'holiday party, christmas tamales, mexican christmas, thanksgiving tacos, new years eve party, holiday appetizers, christmas dinner, mexican holiday food, holiday entertaining',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/holiday-party',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What Mexican food is traditional for Christmas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Traditional Mexican Christmas foods include tamales, pozole, bunuelos (fried sweet dough), champurrado (chocolate atole), ponche (fruit punch), and romeritos. Tamales are especially iconic—families gather for "tamaladas" (tamale-making parties) in the weeks before Christmas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I serve tacos for Thanksgiving?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! Turkey tacos are delicious, and a Tex-Mex Thanksgiving spread is increasingly popular. Offer traditional dishes alongside a taco bar with turkey, stuffing quesadillas, and cranberry salsa. It\'s a fun alternative that feeds crowds easily.',
      },
    },
    {
      '@type': 'Question',
      name: 'What appetizers are good for holiday parties?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mexican holiday appetizers include loaded nachos, taquitos/flautas, queso fundido, guacamole with chips, mini sopes, and shrimp cocktail. These are all finger-friendly and can be made ahead, perfect for entertaining.',
      },
    },
  ],
}

export default function HolidayPartyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-rust-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Holiday Entertaining Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Mexican-inspired menus for every celebration</p>
          </div>
        </header>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-12-25" />

          {/* Quick Answer */}
          <div className="bg-rust-50 border-l-4 border-rust-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>Mexican food shines at holiday parties.</strong> Tamales are the iconic Christmas tradition. For Thanksgiving, turkey tacos and cranberry salsa are crowd-pleasers. New Year's Eve calls for a festive taco bar and margaritas. All holidays benefit from easy-to-serve appetizers like <Link href="/recipes/nachos" className="text-rust-600 hover:underline">nachos</Link>, <Link href="/recipes/flautas" className="text-rust-600 hover:underline">taquitos</Link>, and guacamole.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              Whether you're hosting Christmas dinner, a Thanksgiving feast, or ringing in the New Year, Mexican-inspired dishes bring warmth, flavor, and festivity to any gathering. Here's your complete guide to holiday entertaining with tortillas, tamales, and all the trimmings.
            </p>
          </div>

          {/* Christmas Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-600 pb-2">
              <span className="text-green-600">Christmas</span> & Las Posadas
            </h2>

            <div className="bg-gradient-to-r from-green-50 to-red-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-charcoal-950 mb-3">The Tamalada Tradition</h3>
              <p className="text-charcoal-700">
                In Mexican culture, families gather for <strong>tamaladas</strong>—tamale-making parties—in the weeks before Christmas. It's a communal tradition where everyone helps spread masa, add fillings, wrap, and steam tamales. The result? Dozens (or hundreds!) of tamales for Christmas Eve and beyond.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Traditional Mexican Christmas</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• <strong>Tamales</strong> - Pork, chicken, cheese, sweet</li>
                  <li>• <strong>Pozole</strong> - Hominy soup with pork or chicken</li>
                  <li>• <strong><Link href="/recipes/bunuelos" className="text-rust-600 hover:underline">Bunuelos</Link></strong> - Crispy cinnamon sugar treats</li>
                  <li>• <strong>Champurrado</strong> - Thick chocolate atole</li>
                  <li>• <strong>Ponche Navideño</strong> - Warm fruit punch</li>
                  <li>• <strong>Romeritos</strong> - Dried shrimp in mole</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Tex-Mex Christmas Dinner</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• <strong>Enchiladas</strong> - Red or green sauce</li>
                  <li>• <strong>Tamales</strong> - Store-bought is OK!</li>
                  <li>• <strong>Mexican rice</strong> - Festive red color</li>
                  <li>• <strong>Refried beans</strong> - Topped with cheese</li>
                  <li>• <strong>Guacamole & chips</strong> - Appetizer station</li>
                  <li>• <strong>Tres leches cake</strong> - Dessert</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-100 p-6 rounded-lg">
              <h4 className="font-bold text-green-800 mb-2">Hosting Tip:</h4>
              <p className="text-green-700">
                Don't have time to make tamales? Order from a local tamale vendor or Mexican restaurant. Focus your energy on sides, decorations, and enjoying time with family. Nobody will judge store-bought tamales!
              </p>
            </div>
          </section>

          {/* Thanksgiving Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-sunset-500 pb-2">
              <span className="text-sunset-600">Thanksgiving</span> with Tortillas
            </h2>

            <div className="bg-sunset-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-charcoal-950 mb-3">Why Tex-Mex Thanksgiving Works</h3>
              <p className="text-charcoal-700">
                Tired of the same turkey and stuffing? A Tex-Mex Thanksgiving feeds large crowds easily, accommodates picky eaters with DIY taco bars, and offers a fun twist that guests remember. Plus, turkey makes amazing tacos!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Turkey Taco Bar</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• <strong>Shredded turkey</strong> - Toss with taco seasoning</li>
                  <li>• <strong>Warm <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn</Link> & <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">flour tortillas</Link></strong></li>
                  <li>• <strong>Cranberry salsa</strong> - Cranberries + jalapeño</li>
                  <li>• <strong>Stuffing quesadillas</strong> - With leftover stuffing</li>
                  <li>• <strong>Sweet potato mash</strong> - Topped with pepitas</li>
                  <li>• <strong>Green bean casserole nachos</strong> - Trust us!</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Mexican-Inspired Sides</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• <strong>Elote (street corn)</strong> - Festive and colorful</li>
                  <li>• <strong>Jalapeño cornbread</strong> - Replaces rolls</li>
                  <li>• <strong>Chorizo stuffing</strong> - With peppers and onions</li>
                  <li>• <strong>Black bean salad</strong> - Fresh and light</li>
                  <li>• <strong>Chipotle mashed sweet potatoes</strong></li>
                  <li>• <strong>Mexican hot chocolate</strong> - Drink option</li>
                </ul>
              </div>
            </div>

            <div className="bg-masa-100 p-6 rounded-lg">
              <h4 className="font-bold text-masa-800 mb-2">Cranberry Salsa Recipe (Quick!)</h4>
              <p className="text-masa-700 text-sm">
                1 bag cranberries + 1 jalapeño + 1/2 bunch cilantro + 1/4 onion + juice of 1 lime + 2 tbsp sugar. Pulse in food processor. Let sit 30 minutes. Perfect on turkey tacos!
              </p>
            </div>
          </section>

          {/* New Year's Eve Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-charcoal-400 pb-2">
              <span className="text-charcoal-700">New Year's Eve</span> Fiesta
            </h2>

            <div className="bg-charcoal-100 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-charcoal-950 mb-3">Ring in the New Year</h3>
              <p className="text-charcoal-700">
                New Year's Eve calls for finger foods, champagne (or sparkling margaritas!), and food that keeps guests energized until midnight. A festive taco bar and appetizer spread does exactly that.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Appetizers</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• <Link href="/recipes/nachos" className="text-rust-600 hover:underline">Loaded nachos</Link></li>
                  <li>• <Link href="/recipes/flautas" className="text-rust-600 hover:underline">Taquitos</Link> with dipping sauces</li>
                  <li>• Queso fundido</li>
                  <li>• Shrimp cocktail</li>
                  <li>• Mini <Link href="/recipes/tostadas" className="text-rust-600 hover:underline">tostadas</Link></li>
                  <li>• <Link href="/recipes/sopes" className="text-rust-600 hover:underline">Sopes</Link> trio</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Late-Night Bites</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• <Link href="/recipes/street-tacos" className="text-rust-600 hover:underline">Street tacos</Link> (build your own)</li>
                  <li>• <Link href="/recipes/birria-tacos" className="text-rust-600 hover:underline">Birria tacos</Link> with consomé</li>
                  <li>• Quesadillas station</li>
                  <li>• <Link href="/recipes/breakfast-tacos" className="text-rust-600 hover:underline">Breakfast tacos</Link> for late crowd</li>
                  <li>• <Link href="/recipes/chilaquiles" className="text-rust-600 hover:underline">Chilaquiles</Link> bar</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Drinks</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Sparkling margaritas</li>
                  <li>• Champagne with hibiscus</li>
                  <li>• Mexican martini</li>
                  <li>• Palomas</li>
                  <li>• Midnight champagne toast</li>
                  <li>• Coffee bar for late night</li>
                </ul>
              </div>
            </div>

            <div className="bg-charcoal-950 text-cream-50 p-6 rounded-lg">
              <h4 className="font-bold mb-2">12 Grapes Tradition</h4>
              <p className="text-cream-200 text-sm">
                In Mexican and Spanish culture, it's tradition to eat 12 grapes at midnight—one for each chime of the clock. Each grape represents a month of good luck in the new year. Set out small bowls of grapes for guests as midnight approaches!
              </p>
            </div>
          </section>

          {/* Easter Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-400 pb-2">
              <span className="text-pink-600">Easter</span> Brunch
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-pink-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Easter Brunch Menu</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• <Link href="/recipes/huevos-rancheros" className="text-rust-600 hover:underline">Huevos rancheros</Link> station</li>
                  <li>• <Link href="/recipes/chilaquiles" className="text-rust-600 hover:underline">Chilaquiles</Link> bar</li>
                  <li>• <Link href="/recipes/breakfast-tacos" className="text-rust-600 hover:underline">Breakfast tacos</Link></li>
                  <li>• Fresh fruit with chili-lime</li>
                  <li>• Champurrado or Mexican hot chocolate</li>
                  <li>• Conchas and pan dulce</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-charcoal-950 mb-4">Traditional Mexican Easter</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• <strong>Capirotada</strong> - Mexican bread pudding</li>
                  <li>• <strong>Romeritos</strong> - Dried shrimp cakes in mole</li>
                  <li>• <strong>Tortas de camarón</strong> - Shrimp patties</li>
                  <li>• <strong>Chiles rellenos</strong> - Stuffed peppers</li>
                  <li>• <strong>Lentil soup</strong> - Lenten tradition</li>
                  <li>• <strong>Fish tacos</strong> - Friday tradition</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Appetizer Ideas for Any Holiday */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-masa-500 pb-2">Easy Holiday Appetizers</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-charcoal-700 mb-6">
                These crowd-pleasers work for any holiday gathering—Christmas Eve, Thanksgiving appetizers, New Year's Eve, or Easter brunch.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-charcoal-950 mb-3">Hot Appetizers</h4>
                  <ul className="space-y-2 text-charcoal-700 text-sm">
                    <li>• <strong>Queso fundido</strong> - Melted cheese with chorizo</li>
                    <li>• <strong><Link href="/recipes/flautas" className="text-rust-600 hover:underline">Taquitos</Link></strong> - With multiple dipping sauces</li>
                    <li>• <strong>Mini quesadillas</strong> - Cut into wedges</li>
                    <li>• <strong>Jalapeño poppers</strong> - Cream cheese filled</li>
                    <li>• <strong><Link href="/recipes/nachos" className="text-rust-600 hover:underline">Nachos supreme</Link></strong> - Build-your-own station</li>
                    <li>• <strong>Mini tamales</strong> - Bite-sized</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal-950 mb-3">Cold Appetizers</h4>
                  <ul className="space-y-2 text-charcoal-700 text-sm">
                    <li>• <strong>Guacamole trio</strong> - Classic, mango, roasted garlic</li>
                    <li>• <strong>Seven-layer dip</strong> - Always a hit</li>
                    <li>• <strong>Shrimp cocktail</strong> - Mexican style with lime</li>
                    <li>• <strong>Ceviche</strong> - In cucumber cups or <Link href="/recipes/tostadas" className="text-rust-600 hover:underline">tostadas</Link></li>
                    <li>• <strong>Fresh salsa trio</strong> - Verde, roja, pico</li>
                    <li>• <strong>Elote dip</strong> - Street corn flavors</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Quantities */}
          <section className="mb-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Holiday Party Quantities</h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-cream-50 border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border px-4 py-3 text-left">Item</th>
                    <th className="border px-4 py-3 text-center">10 guests</th>
                    <th className="border px-4 py-3 text-center">25 guests</th>
                    <th className="border px-4 py-3 text-center">50 guests</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-masa-50">
                    <td className="border px-4 py-3 font-medium">Tamales (if main)</td>
                    <td className="border px-4 py-3 text-center">25-30</td>
                    <td className="border px-4 py-3 text-center">60-75</td>
                    <td className="border px-4 py-3 text-center">120-150</td>
                  </tr>
                  <tr className="hover:bg-masa-50">
                    <td className="border px-4 py-3 font-medium">Tortillas (taco bar)</td>
                    <td className="border px-4 py-3 text-center">30-40</td>
                    <td className="border px-4 py-3 text-center">75-100</td>
                    <td className="border px-4 py-3 text-center">150-200</td>
                  </tr>
                  <tr className="hover:bg-masa-50">
                    <td className="border px-4 py-3 font-medium">Chips (appetizers)</td>
                    <td className="border px-4 py-3 text-center">2 bags</td>
                    <td className="border px-4 py-3 text-center">5 bags</td>
                    <td className="border px-4 py-3 text-center">10 bags</td>
                  </tr>
                  <tr className="hover:bg-masa-50">
                    <td className="border px-4 py-3 font-medium">Guacamole</td>
                    <td className="border px-4 py-3 text-center">3 cups</td>
                    <td className="border px-4 py-3 text-center">7 cups</td>
                    <td className="border px-4 py-3 text-center">14 cups</td>
                  </tr>
                  <tr className="hover:bg-masa-50">
                    <td className="border px-4 py-3 font-medium">Meat for tacos</td>
                    <td className="border px-4 py-3 text-center">3-4 lbs</td>
                    <td className="border px-4 py-3 text-center">8-10 lbs</td>
                    <td className="border px-4 py-3 text-center">16-20 lbs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Can I make tamales ahead of time?</h3>
                <p className="text-charcoal-700">Yes! Tamales freeze beautifully for up to 3 months. Steam them frozen for about 30-40 minutes until heated through. Or refrigerate up to 5 days and re-steam for 15-20 minutes.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">How do I keep food warm for a party?</h3>
                <p className="text-charcoal-700">Use slow cookers on "warm" for meats, beans, and queso. Wrap tortillas in foil and keep in a 200°F oven. Chafing dishes work for larger parties. Make guacamole last by pressing plastic wrap directly on the surface.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">What Mexican food works for vegetarian guests?</h3>
                <p className="text-charcoal-700">Plenty! Cheese enchiladas, bean and cheese tacos, vegetable fajitas, cheese quesadillas, rice and beans, chile rellenos, guacamole, <Link href="/recipes/sopes" className="text-rust-600 hover:underline">sopes</Link> with beans, and most appetizers like nachos and queso.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-green-700 via-cream-50 to-rust-600 text-charcoal-950 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Make Every Holiday a Fiesta</h2>
            <p className="text-charcoal-700 mb-6">Get authentic Texas tortillas delivered for your celebration.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="bg-charcoal-950 hover:bg-charcoal-800 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors">Shop Tortillas</Link>
              <Link href="/tools/party-calculator" className="border-2 border-charcoal-950 hover:bg-charcoal-950 hover:text-cream-50 text-charcoal-950 px-6 py-3 rounded-lg font-semibold transition-colors">Party Calculator</Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
