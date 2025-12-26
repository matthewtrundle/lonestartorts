import type { Metadata } from 'next'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'How to Throw a Proper Texas Party - BBQ, Tacos & Lone Star Hospitality',
  description: 'Learn how to throw an authentic Texas party with BBQ, tacos, cold beer, and genuine Lone Star hospitality. Complete guide to Texas-style entertaining for any occasion.',
  keywords: 'texas party, texas bbq party, lone star party, texas hospitality, texas food, cowboy party, western party, texas tailgate, texas theme party, how to throw a texas party',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/texas-party',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What food is served at a Texas party?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A proper Texas party features BBQ (brisket, ribs, sausage), tacos, queso and chips, fresh tortillas, cold beer, sweet tea, and pie or cobbler for dessert. The key is abundance—Texans never run out of food.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes a Texas party different?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Texas parties are defined by genuine hospitality, generous portions, outdoor spaces, and a mix of BBQ and Tex-Mex influences. The vibe is casual and welcoming—boots are acceptable, pretense is not. Everyone gets fed, no one leaves hungry.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I decorate for a Texas theme party?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Incorporate Texas flag colors (red, white, blue), Lone Star motifs, cacti, cowboy boots as vases, mason jars for drinks, string lights, bandana napkins, and rustic wood elements. Keep it authentic and not too kitschy.',
      },
    },
  ],
}

export default function TexasPartyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">How to Throw a Proper Texas Party</h1>
            <p className="text-cream-300 mt-4 text-lg">BBQ, tacos, cold beer & genuine Lone Star hospitality</p>
          </div>
        </header>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-12-25" />

          {/* Quick Answer */}
          <div className="bg-masa-100 border-l-4 border-rust-600 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>A proper Texas party</strong> means generous hospitality, excellent BBQ, plenty of tacos, cold beer, and making every guest feel like family. Cook more than you think you need, keep the drinks iced, and don't stress—Texans care about good company, not perfection.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              In Texas, we don't just throw parties—we throw <em>proper</em> parties. That means brisket that's been smoking since dawn, <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">flour tortillas</Link> warm off the griddle, coolers full of Lone Star and sweet tea, and enough food to feed the whole county. Here's how to host like a true Texan.
            </p>
          </div>

          {/* The Texas Party Philosophy */}
          <section className="mb-12 bg-charcoal-950 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">The Texas Party Philosophy</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-sunset-400 mb-3">The Rules</h3>
                <ul className="space-y-2 text-cream-200">
                  <li>• <strong>More is more.</strong> Run out of beer before brisket, never the other way around.</li>
                  <li>• <strong>Come as you are.</strong> Boots and jeans are always acceptable.</li>
                  <li>• <strong>Everyone eats.</strong> Feed vegetarians, kids, and the neighbor who "just stopped by."</li>
                  <li>• <strong>Cold drinks matter.</strong> Ice is not optional.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-sunset-400 mb-3">The Vibes</h3>
                <ul className="space-y-2 text-cream-200">
                  <li>• <strong>Relaxed.</strong> No rushing, no schedules. Food's ready when it's ready.</li>
                  <li>• <strong>Welcoming.</strong> "Y'all come on in" energy.</li>
                  <li>• <strong>Outdoors when possible.</strong> Porch, patio, backyard, tailgate.</li>
                  <li>• <strong>Music playing.</strong> Country, Tejano, classic rock—dealer's choice.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Food Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-rust-500 pb-2">The Essential Texas Party Menu</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">BBQ Essentials</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• <strong>Brisket</strong> - The king. Smoked low and slow.</li>
                  <li>• <strong>Ribs</strong> - Pork or beef, your call.</li>
                  <li>• <strong>Sausage links</strong> - Hot guts, jalapeño cheddar, or classic.</li>
                  <li>• <strong>Pulled pork</strong> - For sandwiches or tacos.</li>
                  <li>• <strong>Smoked turkey</strong> - For the non-beef crowd.</li>
                  <li>• <strong>Burnt ends</strong> - The prize pieces.</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Tex-Mex Side</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• <strong><Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">Warm flour tortillas</Link></strong> - For wrapping brisket.</li>
                  <li>• <strong>Queso & chips</strong> - Yellow, white, or both.</li>
                  <li>• <strong>Guacamole</strong> - Fresh made.</li>
                  <li>• <strong><Link href="/recipes/street-tacos" className="text-rust-600 hover:underline">Street tacos</Link></strong> - Meat options from the smoker.</li>
                  <li>• <strong>Pico de gallo</strong> - With jalapeños.</li>
                  <li>• <strong>Mexican rice & beans</strong> - Classic sides.</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-masa-50 p-4 rounded-lg">
                <h4 className="font-bold text-charcoal-950 mb-2">Classic Sides</h4>
                <ul className="text-sm text-charcoal-700 space-y-1">
                  <li>• Potato salad</li>
                  <li>• Coleslaw</li>
                  <li>• Pinto beans</li>
                  <li>• Mac and cheese</li>
                  <li>• Corn on the cob</li>
                  <li>• Pickles, onions, jalapeños</li>
                </ul>
              </div>
              <div className="bg-masa-50 p-4 rounded-lg">
                <h4 className="font-bold text-charcoal-950 mb-2">Bread Basket</h4>
                <ul className="text-sm text-charcoal-700 space-y-1">
                  <li>• <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">Flour tortillas</Link> (most important!)</li>
                  <li>• <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">Corn tortillas</Link></li>
                  <li>• White bread (yes, plain)</li>
                  <li>• Jalapeño cornbread</li>
                </ul>
              </div>
              <div className="bg-masa-50 p-4 rounded-lg">
                <h4 className="font-bold text-charcoal-950 mb-2">Desserts</h4>
                <ul className="text-sm text-charcoal-700 space-y-1">
                  <li>• Pecan pie</li>
                  <li>• Peach cobbler</li>
                  <li>• Tres leches cake</li>
                  <li>• Blue Bell ice cream</li>
                  <li>• <Link href="/recipes/bunuelos" className="text-rust-600 hover:underline">Bunuelos</Link></li>
                </ul>
              </div>
            </div>

            <div className="bg-rust-50 p-6 rounded-lg">
              <h4 className="font-bold text-rust-800 mb-2">The Brisket-in-Tortilla Move</h4>
              <p className="text-rust-700">
                At any proper Texas party, someone will take a warm flour tortilla, pile on chopped brisket, add a little pickled jalapeño, maybe some onion and BBQ sauce, and make the most perfect brisket taco. This is the way.
              </p>
            </div>
          </section>

          {/* Drinks */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-rust-500 pb-2">Texas Party Drinks</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">The Essentials</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• <strong>Lone Star</strong> - The National Beer of Texas.</li>
                  <li>• <strong>Shiner Bock</strong> - From the little brewery in Shiner.</li>
                  <li>• <strong>Sweet tea</strong> - The sweeter the better.</li>
                  <li>• <strong>Ranch Water</strong> - Tequila, Topo Chico, lime.</li>
                  <li>• <strong>Margaritas</strong> - Frozen or on the rocks.</li>
                  <li>• <strong>Dr Pepper</strong> - It was invented in Texas.</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">The Setup</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• <strong>Coolers full of ice</strong> - Multiple, clearly labeled.</li>
                  <li>• <strong>Beer trough</strong> - Galvanized tub with drainage.</li>
                  <li>• <strong>Sweet tea dispenser</strong> - Big glass jar with spigot.</li>
                  <li>• <strong>Lemonade</strong> - For the kids and designated drivers.</li>
                  <li>• <strong>Bottled water</strong> - Texas heat is no joke.</li>
                  <li>• <strong>Topo Chico</strong> - For Ranch Water or straight.</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-charcoal-100 p-6 rounded-lg">
              <h4 className="font-bold text-charcoal-950 mb-2">Ranch Water Recipe</h4>
              <p className="text-charcoal-700 text-sm">
                2 oz tequila blanco + juice of 1 lime + Topo Chico mineral water to fill. Serve over ice in a highball glass. The official drink of Texas summers.
              </p>
            </div>
          </section>

          {/* Decorations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-rust-500 pb-2">Texas Party Decorations</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <p className="text-charcoal-700 mb-4">
                Keep it authentic—think rustic ranch, not Halloween costume shop. The goal is "lived-in Texas" not "tourist trap Texas."
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-charcoal-950 mb-3">Do This</h4>
                  <ul className="text-sm text-charcoal-700 space-y-1">
                    <li>• Texas flag (tasteful, not overkill)</li>
                    <li>• Mason jars for drinks & flowers</li>
                    <li>• String lights</li>
                    <li>• Bandana napkins</li>
                    <li>• Galvanized metal accents</li>
                    <li>• Potted cacti & succulents</li>
                    <li>• Cowboy boots as vases</li>
                    <li>• Rustic wood signs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal-950 mb-3">Skip This</h4>
                  <ul className="text-sm text-charcoal-700 space-y-1">
                    <li>• Plastic cowboy hats</li>
                    <li>• "Yeehaw" everything</li>
                    <li>• Fake tumbleweeds</li>
                    <li>• Oil derrick centerpieces</li>
                    <li>• Excessive rhinestones</li>
                    <li>• Sheriff star badges</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal-950 mb-3">Color Palette</h4>
                  <ul className="text-sm text-charcoal-700 space-y-1">
                    <li>• Burnt orange</li>
                    <li>• Turquoise</li>
                    <li>• Rust red</li>
                    <li>• Natural cream/tan</li>
                    <li>• Sage green</li>
                    <li>• Weathered wood tones</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Music */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-rust-500 pb-2">The Texas Party Playlist</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-3">Texas Country</h3>
                <ul className="text-sm text-charcoal-700 space-y-1">
                  <li>• George Strait</li>
                  <li>• Willie Nelson</li>
                  <li>• Waylon Jennings</li>
                  <li>• Koe Wetzel</li>
                  <li>• Randy Rogers Band</li>
                  <li>• Pat Green</li>
                  <li>• Turnpike Troubadours</li>
                </ul>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-3">Tejano & Conjunto</h3>
                <ul className="text-sm text-charcoal-700 space-y-1">
                  <li>• Selena</li>
                  <li>• Los Tigres del Norte</li>
                  <li>• Grupo Mazz</li>
                  <li>• La Mafia</li>
                  <li>• Intocable</li>
                  <li>• Ramón Ayala</li>
                </ul>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-3">Texas Rock & Blues</h3>
                <ul className="text-sm text-charcoal-700 space-y-1">
                  <li>• Stevie Ray Vaughan</li>
                  <li>• ZZ Top</li>
                  <li>• Gary Clark Jr.</li>
                  <li>• Black Pumas</li>
                  <li>• Robert Earl Keen</li>
                  <li>• Hayes Carll</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Types of Texas Parties */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-rust-500 pb-2">Types of Texas Parties</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">The Backyard BBQ</h3>
                <p className="text-charcoal-700 mb-2">The most common Texas gathering. Smoker going, cooler full, lawn chairs out.</p>
                <p className="text-sm text-charcoal-600"><strong>Dress code:</strong> Jeans, boots optional. | <strong>Key element:</strong> That one guy who won't leave the smoker.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">The Tailgate</h3>
                <p className="text-charcoal-700 mb-2">Truck beds down, portable grills out, hours before (or instead of) the game.</p>
                <p className="text-sm text-charcoal-600"><strong>Dress code:</strong> Team colors required. | <strong>Key element:</strong> A working sound system and folding chairs.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">The Porch Party</h3>
                <p className="text-charcoal-700 mb-2">Smaller, more intimate. Hanging on the porch, watching the sun set, good conversation.</p>
                <p className="text-sm text-charcoal-600"><strong>Dress code:</strong> Whatever you were already wearing. | <strong>Key element:</strong> Rocking chairs and citronella candles.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">The Quinceañera / Big Family Gathering</h3>
                <p className="text-charcoal-700 mb-2">Multi-generational, lots of food, probably in a VFW hall or church gymnasium.</p>
                <p className="text-sm text-charcoal-600"><strong>Dress code:</strong> Church clothes to casual. | <strong>Key element:</strong> A table for abuela to hold court.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">The Ranch Party</h3>
                <p className="text-charcoal-700 mb-2">If you're lucky enough to have land or know someone who does. Bonfires, stargazing, space to spread out.</p>
                <p className="text-sm text-charcoal-600"><strong>Dress code:</strong> Boots actually needed. | <strong>Key element:</strong> A bonfire and clear sky.</p>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-rust-500 pb-2">Texas Party Pro Tips</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-rust-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Beat the Heat</h3>
                <p className="text-charcoal-700 text-sm">Texas summer parties need shade, fans, misters, and LOTS of ice. Start later (5pm+) when the sun isn't brutal. Keep water everywhere.</p>
              </div>
              <div className="bg-rust-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Plan for More</h3>
                <p className="text-charcoal-700 text-sm">Texans bring friends. And their friend's cousins. Always prep 20% more food than your headcount. It's the Texas way.</p>
              </div>
              <div className="bg-rust-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Set Up Self-Serve</h3>
                <p className="text-charcoal-700 text-sm">Coolers, drink stations, buffet-style food. Let guests help themselves. You shouldn't be playing bartender all night.</p>
              </div>
              <div className="bg-rust-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Keep Tortillas Warm</h3>
                <p className="text-charcoal-700 text-sm">Wrap in foil, keep in a 200°F oven or cooler side of the grill. Cold tortillas are a crime against hospitality.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">I'm not from Texas—can I still throw a Texas party?</h3>
                <p className="text-charcoal-700">Absolutely! Texas welcomes everyone. Focus on the hospitality, the food, and making people feel at home. That's more Texan than any decoration.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">What if I can't smoke brisket?</h3>
                <p className="text-charcoal-700">Order from a BBQ restaurant or grocery store. No shame in it. Plenty of Texans buy their BBQ. Focus on great tortillas, cold drinks, and good company. That's what matters.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">What's the minimum for a "proper" Texas party?</h3>
                <p className="text-charcoal-700">Good meat (smoked, grilled, or store-bought), warm <Link href="/shop" className="text-rust-600 hover:underline">tortillas</Link>, cold beer, and genuine hospitality. Everything else is extra. Texas is about attitude, not perfection.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-charcoal-950 to-rust-800 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Y'all Come Back Now</h2>
            <p className="text-cream-200 mb-6">Get authentic Texas tortillas for your next gathering.</p>
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
