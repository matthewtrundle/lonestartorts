import type { Metadata } from 'next'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Cinco de Mayo Party Guide - Mexican Fiesta Menu & Decorations',
  description: 'Throw an authentic Cinco de Mayo party with traditional Mexican food, margaritas, decorations, and music. Complete hosting guide with recipes and shopping lists.',
  keywords: 'cinco de mayo party, cinco de mayo food, cinco de mayo menu, mexican fiesta, cinco de mayo decorations, cinco de mayo recipes, may 5th party, mexican independence',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/cinco-de-mayo-party',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What food should I serve at a Cinco de Mayo party?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Serve traditional Mexican favorites: street tacos with carnitas or carne asada, loaded nachos, guacamole and chips, Mexican rice and beans, elote (street corn), churros for dessert. Set up a margarita bar and offer Mexican beer and agua frescas.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does Cinco de Mayo celebrate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cinco de Mayo commemorates the Mexican Army\'s victory over the French Empire at the Battle of Puebla on May 5, 1862. It\'s not Mexican Independence Day (that\'s September 16). In the US, it\'s evolved into a celebration of Mexican culture and heritage.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many tacos per person for Cinco de Mayo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Plan 3-4 tacos per adult guest when tacos are the main dish. If you\'re serving multiple appetizers and sides alongside, 2-3 tacos per person is sufficient. Always have extra tortillas on hand.',
      },
    },
  ],
}

export default function CincoDeMayoPartyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-green-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Cinco de Mayo Party Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Everything you need for an authentic Mexican celebration</p>
          </div>
        </header>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-12-25" />

          {/* Quick Answer */}
          <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>Cinco de Mayo (May 5th)</strong> celebrates Mexico's victory at the Battle of Puebla in 1862. Throw an authentic fiesta with a taco bar, margaritas, festive decorations (red, green, white), and traditional music. Serve street tacos, <Link href="/recipes/nachos" className="text-rust-600 hover:underline">nachos</Link>, guacamole, and finish with churros or <Link href="/recipes/bunuelos" className="text-rust-600 hover:underline">bunuelos</Link>.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              Cinco de Mayo has become one of America's most celebrated holidays—and for good reason. It's the perfect excuse to gather friends, make incredible food, and celebrate Mexican culture. Here's how to throw a fiesta that's festive, authentic, and absolutely delicious.
            </p>
          </div>

          {/* What is Cinco de Mayo */}
          <section className="mb-12 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-4">What is Cinco de Mayo?</h2>
            <p className="text-charcoal-700 mb-4">
              <strong>Cinco de Mayo is NOT Mexican Independence Day</strong> (that's September 16th). It commemorates the Battle of Puebla on May 5, 1862, when the Mexican army unexpectedly defeated French forces despite being outnumbered.
            </p>
            <p className="text-charcoal-700">
              In the United States, it's evolved into a celebration of Mexican-American culture, heritage, and community—often with more fanfare than in Mexico itself. Either way, it's a wonderful occasion to enjoy amazing food and celebrate with loved ones.
            </p>
          </section>

          {/* Complete Menu */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-500 pb-2">Complete Cinco de Mayo Menu</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Appetizers</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• Guacamole & chips</li>
                  <li>• Queso fundido</li>
                  <li>• Pico de gallo</li>
                  <li>• <Link href="/recipes/nachos" className="text-rust-600 hover:underline">Loaded nachos</Link></li>
                  <li>• Jalapeño poppers</li>
                  <li>• <Link href="/recipes/flautas" className="text-rust-600 hover:underline">Taquitos/flautas</Link></li>
                  <li>• Ceviche tostadas</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Main Courses</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• <Link href="/recipes/street-tacos" className="text-rust-600 hover:underline">Street tacos</Link> (carnitas, asada)</li>
                  <li>• <Link href="/recipes/birria-tacos" className="text-rust-600 hover:underline">Birria tacos</Link></li>
                  <li>• <Link href="/recipes/enchiladas" className="text-rust-600 hover:underline">Enchiladas</Link></li>
                  <li>• <Link href="/recipes/tostadas" className="text-rust-600 hover:underline">Chicken tostadas</Link></li>
                  <li>• <Link href="/recipes/sopes" className="text-rust-600 hover:underline">Sopes</Link></li>
                  <li>• Tamales</li>
                  <li>• <Link href="/recipes/chilaquiles" className="text-rust-600 hover:underline">Chilaquiles</Link></li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-cream-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Sides & Desserts</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• Mexican rice</li>
                  <li>• Refried beans</li>
                  <li>• Elote (street corn)</li>
                  <li>• <Link href="/recipes/bunuelos" className="text-rust-600 hover:underline">Churros or bunuelos</Link></li>
                  <li>• Tres leches cake</li>
                  <li>• Flan</li>
                  <li>• Fresh fruit with chili-lime</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Taco Bar Setup */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-500 pb-2">Setting Up a Cinco de Mayo Taco Bar</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-xl font-bold text-charcoal-950 mb-4">For 20 Guests</h3>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">Tortillas</h4>
                  <ul className="text-charcoal-700 space-y-1">
                    <li>• 60 <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortillas</Link></li>
                    <li>• 40 <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">flour tortillas</Link></li>
                    <li>• 4 bags chips</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">Proteins</h4>
                  <ul className="text-charcoal-700 space-y-1">
                    <li>• 5 lbs carnitas</li>
                    <li>• 4 lbs carne asada</li>
                    <li>• 3 lbs chicken</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-masa-700 mb-2">Toppings</h4>
                  <ul className="text-charcoal-700 space-y-1">
                    <li>• 2 lbs onions, diced</li>
                    <li>• 2 bunches cilantro</li>
                    <li>• 2 lbs shredded cheese</li>
                    <li>• Limes (20+)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sunset-700 mb-2">Salsas</h4>
                  <ul className="text-charcoal-700 space-y-1">
                    <li>• Salsa verde (2 jars)</li>
                    <li>• Salsa roja (2 jars)</li>
                    <li>• Pico de gallo (4 cups)</li>
                    <li>• Guacamole (6 cups)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="font-bold text-green-800 mb-3">Pro Tip: Flow Matters</h4>
              <p className="text-green-700">
                Arrange your bar in order: tortillas → proteins → toppings → salsas → drinks. This prevents bottlenecks and keeps the line moving. Have plates at the start and napkins at the end.
              </p>
            </div>
          </section>

          {/* Margarita Bar */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-500 pb-2">Cinco de Mayo Drinks</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Margarita Bar Setup</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><strong>Base:</strong> Good tequila (silver for mixing), triple sec or Cointreau</li>
                  <li><strong>Citrus:</strong> Fresh lime juice (never bottled!), lemon</li>
                  <li><strong>Flavors:</strong> Strawberry puree, mango, jalapeño slices</li>
                  <li><strong>Rims:</strong> Kosher salt, Tajín, sugar for strawberry</li>
                  <li><strong>Garnishes:</strong> Lime wheels, fresh fruit</li>
                </ul>
                <p className="text-sm text-charcoal-600 mt-4">
                  <strong>Batch ratio (per 10 drinks):</strong> 2 cups tequila + 1 cup triple sec + 1 cup lime juice + simple syrup to taste
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Non-Alcoholic Options</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li><strong>Agua de Jamaica:</strong> Hibiscus tea, sweet and tangy</li>
                  <li><strong>Horchata:</strong> Creamy rice and cinnamon drink</li>
                  <li><strong>Agua de Tamarindo:</strong> Sweet-sour tamarind</li>
                  <li><strong>Limonada:</strong> Fresh Mexican-style limeade</li>
                  <li><strong>Jarritos:</strong> Assorted Mexican sodas</li>
                  <li><strong>Virgin margaritas:</strong> Lime, simple syrup, sparkling water</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-masa-50 p-6 rounded-lg">
              <h4 className="font-bold text-charcoal-950 mb-3">Beer Selection</h4>
              <p className="text-charcoal-700">
                Stock Mexican beers: Corona, Modelo, Dos Equis, Pacifico, Tecate. Serve with lime wedges. For craft options, look for Mexican-style lagers from local breweries.
              </p>
            </div>
          </section>

          {/* Decorations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-500 pb-2">Cinco de Mayo Decorations</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-charcoal-950 mb-3">Must-Have Decor</h3>
                  <ul className="space-y-2 text-charcoal-700">
                    <li>• <strong>Papel picado:</strong> Colorful perforated paper banners</li>
                    <li>• <strong>Mexican flag colors:</strong> Green, white, red everywhere</li>
                    <li>• <strong>Serape fabric:</strong> Table runners or as backdrop</li>
                    <li>• <strong>Sombreros:</strong> Hung on walls or as centerpieces</li>
                    <li>• <strong>Marigolds:</strong> Traditional Mexican flowers (fresh or paper)</li>
                    <li>• <strong>Cacti:</strong> Real or decorative</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-charcoal-950 mb-3">Table Settings</h3>
                  <ul className="space-y-2 text-charcoal-700">
                    <li>• Colorful tablecloths (one solid, one patterned)</li>
                    <li>• Talavera-style plates (or paper versions)</li>
                    <li>• Mason jars with marigolds</li>
                    <li>• Mini piñatas as centerpieces</li>
                    <li>• Candles in colorful votives</li>
                    <li>• Chili pepper string lights</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Music */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-500 pb-2">Fiesta Playlist</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-3">Traditional</h3>
                <ul className="text-sm text-charcoal-700 space-y-1">
                  <li>• Mariachi Vargas</li>
                  <li>• "Cielito Lindo"</li>
                  <li>• "La Bamba"</li>
                  <li>• "El Rey"</li>
                  <li>• "México Lindo y Querido"</li>
                </ul>
              </div>
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-3">Classic Hits</h3>
                <ul className="text-sm text-charcoal-700 space-y-1">
                  <li>• Selena</li>
                  <li>• Luis Miguel</li>
                  <li>• Juan Gabriel</li>
                  <li>• Vicente Fernández</li>
                  <li>• Los Tigres del Norte</li>
                </ul>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-3">Modern Party</h3>
                <ul className="text-sm text-charcoal-700 space-y-1">
                  <li>• Bad Bunny</li>
                  <li>• J Balvin</li>
                  <li>• Peso Pluma</li>
                  <li>• Grupo Firme</li>
                  <li>• Banda MS</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Activities */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-500 pb-2">Party Activities</h2>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For Everyone</h3>
                <ul className="grid md:grid-cols-2 gap-3 text-charcoal-700">
                  <li>• <strong>Piñata</strong> - Adults love them too! Fill with candy, mini bottles</li>
                  <li>• <strong>Salsa dancing</strong> - Clear space, play tutorials</li>
                  <li>• <strong>Lotería</strong> - Mexican bingo with prizes</li>
                  <li>• <strong>Photo booth</strong> - Sombreros, maracas, mustaches</li>
                  <li>• <strong>Taco eating contest</strong> - Timed or quantity</li>
                  <li>• <strong>Margarita taste-off</strong> - Vote on best flavor</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-500 pb-2">Party Day Timeline</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="space-y-4">
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Week Before</span>
                  <p className="text-charcoal-700">Order tortillas, buy decorations, create playlist, send final reminders to guests.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">2 Days Before</span>
                  <p className="text-charcoal-700">Buy groceries, prep salsas (they improve overnight), marinate meats.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Day Before</span>
                  <p className="text-charcoal-700">Hang decorations, set up tables, prep all toppings, make agua frescas, batch margarita mix.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Morning Of</span>
                  <p className="text-charcoal-700">Start slow cooker meats, make guacamole (cover surface with plastic), set out chips and dips.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">1 Hour Before</span>
                  <p className="text-charcoal-700">Warm tortillas, fill coolers with ice and beer, set up drink station, start music.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="bg-red-600 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Fiesta Time!</span>
                  <p className="text-charcoal-700">¡Viva México! Welcome guests with a margarita and enjoy the celebration!</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Is it cultural appropriation to throw a Cinco de Mayo party?</h3>
                <p className="text-charcoal-700">Not when done respectfully! Focus on appreciation: serve authentic food, learn about the history, and avoid offensive stereotypes. Many Mexican-Americans embrace the holiday as a celebration of their culture.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Can I have a Cinco de Mayo party on a different day?</h3>
                <p className="text-charcoal-700">Absolutely! May 5th often falls on a weekday. Hosting your fiesta the weekend before or after is totally fine. The celebration is what matters, not the exact date.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">What if guests don't like spicy food?</h3>
                <p className="text-charcoal-700">Keep spicy elements on the side! Offer mild salsa alongside hot, have cheese quesadillas for picky eaters, and label anything spicy clearly. Mexican food can be as mild or hot as you make it.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-green-600 to-red-600 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">¡Feliz Cinco de Mayo!</h2>
            <p className="text-cream-200 mb-6">Get authentic Texas tortillas for your fiesta.</p>
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
