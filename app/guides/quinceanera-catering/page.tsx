import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Quinceañera Food Guide - Traditional Menu & Catering Ideas',
  description: 'Plan the perfect quinceañera food menu! Traditional dishes, quantities for 100-500 guests, catering tips, budget breakdown, and authentic Mexican recipes for your celebration.',
  keywords: 'quinceañera food, quinceañera menu, quince años catering, quinceañera party food, mexican quinceañera, quinceañera food ideas, how much food for quinceañera, quinceañera taco bar',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/quinceanera-catering',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much food do I need for a quinceañera?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Plan for 1 lb of food per adult guest and 0.5 lb per child. For a quinceañera of 200 guests, you\'ll need approximately 150-175 lbs of food total. This includes proteins, rice, beans, tortillas, and appetizers. Always prepare 15-20% extra.',
      },
    },
    {
      '@type': 'Question',
      name: 'What food is traditionally served at a quinceañera?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Traditional quinceañera food includes carnitas or birria, Mexican rice, refried beans, tortillas, tamales, mole, enchiladas, and pozole. Modern celebrations often add taco bars, fajita stations, and trendy options like birria tacos. Tres leches cake is the classic dessert.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does quinceañera catering cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Quinceañera catering typically costs $15-45 per person depending on menu complexity and service style. DIY family-style cooking costs $8-15 per person. For 200 guests, budget $3,000-9,000 for food. Many families reduce costs by having relatives prepare traditional dishes.',
      },
    },
  ],
}

export default function QuinceaneraPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-pink-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Quinceañera Food & Catering Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Create a memorable celebration with authentic Mexican cuisine</p>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image
            src="/images/guides/guide-quinceanera-catering.webp"
            alt="Quinceañera celebration taco spread with elegant decorations"
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
              <strong>Quinceañera food</strong> typically includes traditional Mexican dishes like carnitas, birria, tamales, and mole alongside rice and beans. Plan 1 lb of food per adult guest. For 200 guests, budget $3,000-9,000 for catering. Many families save by having relatives prepare signature dishes.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              The quinceañera is one of the most important celebrations in a young woman's life—a beautiful tradition marking the transition from childhood to adulthood. The food at this celebration should honor your family's heritage while creating lasting memories for your daughter and all your guests.
            </p>
          </div>

          {/* What is Quinceañera */}
          <section className="mb-12 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-4">Understanding the Quinceañera Tradition</h2>
            <p className="text-charcoal-700 mb-4">
              The quinceañera (quince años) celebrates a girl's 15th birthday and her transition to womanhood. This tradition has roots in Aztec coming-of-age ceremonies and Spanish colonial customs. The celebration typically includes a religious ceremony (misa), followed by a reception (fiesta) with food, music, and dancing.
            </p>
            <p className="text-charcoal-700">
              Food plays a central role, often featuring dishes passed down through generations. The meal brings together extended family, padrinos (godparents), and the entire community to celebrate this milestone.
            </p>
          </section>

          {/* Traditional Menu */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Traditional Quinceañera Menu</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-pink-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Classic Main Dishes</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• <strong>Carnitas</strong> - Slow-roasted pork, family favorite</li>
                  <li>• <strong><Link href="/recipes/birria-tacos" className="text-rust-600 hover:underline">Birria</Link></strong> - Braised beef in rich sauce</li>
                  <li>• <strong>Mole Poblano</strong> - Chicken in complex chocolate sauce</li>
                  <li>• <strong>Tamales</strong> - Traditional, often made by family</li>
                  <li>• <strong>Enchiladas</strong> - Red or green, cheese or chicken</li>
                  <li>• <strong>Pozole</strong> - Hominy soup (regional favorite)</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-masa-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Essential Sides</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• <strong>Mexican Rice</strong> - Red rice with tomatoes</li>
                  <li>• <strong>Refried Beans</strong> - Creamy, topped with cheese</li>
                  <li>• <strong><Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">Flour Tortillas</Link></strong> - Fresh, warm</li>
                  <li>• <strong><Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">Corn Tortillas</Link></strong> - For traditional tacos</li>
                  <li>• <strong>Guacamole & Chips</strong> - Appetizer essential</li>
                  <li>• <strong>Salsas</strong> - Verde, roja, pico de gallo</li>
                </ul>
              </div>
            </div>

            <div className="bg-pink-100 p-6 rounded-lg">
              <h4 className="font-bold text-pink-800 mb-2">Modern Quinceañera Additions</h4>
              <p className="text-pink-700">
                Many families now incorporate taco bars, <Link href="/recipes/nachos" className="underline">nacho stations</Link>, fajita bars, or <Link href="/recipes/birria-tacos" className="underline">birria taco</Link> stations alongside traditional dishes. This gives guests variety while honoring tradition.
              </p>
            </div>
          </section>

          {/* Quantities */}
          <section className="mb-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Quinceañera Food Quantities</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full bg-cream-50 border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border px-4 py-3 text-left">Guests</th>
                    <th className="border px-4 py-3 text-center">Main Protein</th>
                    <th className="border px-4 py-3 text-center">Rice</th>
                    <th className="border px-4 py-3 text-center">Beans</th>
                    <th className="border px-4 py-3 text-center">Tortillas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">100 guests</td>
                    <td className="border px-4 py-3 text-center">25-30 lbs</td>
                    <td className="border px-4 py-3 text-center">15 lbs (dry)</td>
                    <td className="border px-4 py-3 text-center">10 lbs (dry)</td>
                    <td className="border px-4 py-3 text-center">300-400</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">150 guests</td>
                    <td className="border px-4 py-3 text-center">38-45 lbs</td>
                    <td className="border px-4 py-3 text-center">22 lbs (dry)</td>
                    <td className="border px-4 py-3 text-center">15 lbs (dry)</td>
                    <td className="border px-4 py-3 text-center">450-600</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">200 guests</td>
                    <td className="border px-4 py-3 text-center">50-60 lbs</td>
                    <td className="border px-4 py-3 text-center">30 lbs (dry)</td>
                    <td className="border px-4 py-3 text-center">20 lbs (dry)</td>
                    <td className="border px-4 py-3 text-center">600-800</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">300 guests</td>
                    <td className="border px-4 py-3 text-center">75-90 lbs</td>
                    <td className="border px-4 py-3 text-center">45 lbs (dry)</td>
                    <td className="border px-4 py-3 text-center">30 lbs (dry)</td>
                    <td className="border px-4 py-3 text-center">900-1200</td>
                  </tr>
                  <tr className="hover:bg-pink-50">
                    <td className="border px-4 py-3 font-medium">500 guests</td>
                    <td className="border px-4 py-3 text-center">125-150 lbs</td>
                    <td className="border px-4 py-3 text-center">75 lbs (dry)</td>
                    <td className="border px-4 py-3 text-center">50 lbs (dry)</td>
                    <td className="border px-4 py-3 text-center">1500-2000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-charcoal-600 text-sm">
              <strong>Note:</strong> These quantities assume a buffet-style meal with multiple protein options. For sit-down plated service, reduce by 20%. Always prepare 15-20% extra—quinceañeras are known for generous hospitality!
            </p>
          </section>

          {/* Budget */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Quinceañera Food Budget</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">Family-Made</h3>
                <p className="text-3xl font-bold text-green-700 mb-2">$8-15/person</p>
                <ul className="text-sm text-charcoal-700 space-y-1">
                  <li>+ Most affordable option</li>
                  <li>+ Authentic family recipes</li>
                  <li>+ Special family bonding</li>
                  <li>- Requires many helpers</li>
                  <li>- Very time consuming</li>
                </ul>
              </div>

              <div className="bg-pink-50 p-6 rounded-lg border-2 border-pink-200">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">Catered Buffet</h3>
                <p className="text-3xl font-bold text-pink-700 mb-2">$20-35/person</p>
                <ul className="text-sm text-charcoal-700 space-y-1">
                  <li>+ Professional service</li>
                  <li>+ Less family stress</li>
                  <li>+ Includes equipment</li>
                  <li>- Less personal touch</li>
                  <li>- Menu limitations</li>
                </ul>
              </div>

              <div className="bg-masa-50 p-6 rounded-lg border-2 border-masa-200">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">Hybrid Approach</h3>
                <p className="text-3xl font-bold text-masa-700 mb-2">$12-22/person</p>
                <ul className="text-sm text-charcoal-700 space-y-1">
                  <li>+ Family makes signature dish</li>
                  <li>+ Caterer handles basics</li>
                  <li>+ Best of both worlds</li>
                  <li>+ Balance of tradition/ease</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-charcoal-100 p-6 rounded-lg">
              <h4 className="font-bold text-charcoal-950 mb-2">Padrino System</h4>
              <p className="text-charcoal-700">Many families use the padrino (godparent/sponsor) system where different padrinos sponsor specific items: one for the cake, another for the music, another for the food. This distributes costs and involves the community in the celebration.</p>
            </div>
          </section>

          {/* Roles */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Coordinating Quinceañera Food</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-pink-100 text-pink-600 font-bold text-xl rounded-full flex-shrink-0">1</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Designate a Food Coordinator</h3>
                    <p className="text-charcoal-700">Choose one trusted person (not a parent of the quinceañera) to manage all food logistics. This person coordinates with caterers, family cooks, the venue, and ensures everything runs smoothly day-of.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-pink-100 text-pink-600 font-bold text-xl rounded-full flex-shrink-0">2</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Assign Family Dishes</h3>
                    <p className="text-charcoal-700">If family members are cooking, assign specific dishes early. Abuela's famous tamales, Tía's rice recipe, etc. Get commitments 2-3 months ahead and have backup plans for each dish.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-pink-100 text-pink-600 font-bold text-xl rounded-full flex-shrink-0">3</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Coordinate with Venue</h3>
                    <p className="text-charcoal-700">Confirm kitchen access, warming equipment, serving area setup, and food delivery timing. Many quinceañera venues (banquet halls, church halls) have specific requirements.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-pink-100 text-pink-600 font-bold text-xl rounded-full flex-shrink-0">4</span>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Plan the Service Flow</h3>
                    <p className="text-charcoal-700">Traditional order: appetizers during cocktail hour → main meal after mass/ceremony → cake cutting → late-night snacks during dancing. Plan 2-3 hours for main dinner service.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Quinceañera Food Planning Timeline</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="space-y-4">
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">6 Months</span>
                  <p className="text-charcoal-700">Set food budget, decide DIY vs catered, book caterer if using, secure padrinos for food costs.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">3 Months</span>
                  <p className="text-charcoal-700">Finalize menu, assign family dishes, do catering tastings, order specialty items (tortillas, tamales).</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">1 Month</span>
                  <p className="text-charcoal-700">Confirm final guest count with caterer, create shopping lists, confirm family cooking assignments.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">1 Week</span>
                  <p className="text-charcoal-700">Shop for non-perishables, confirm all deliveries, finalize venue setup plans, prep what can be frozen.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">2 Days Before</span>
                  <p className="text-charcoal-700">Begin making tamales (family tradition!), prep salsas, marinate meats, buy fresh produce.</p>
                </div>
                <div className="flex gap-4 items-start border-b pb-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Day Before</span>
                  <p className="text-charcoal-700">Cook rice, beans, slow-roast carnitas, finish tamales, prep all toppings, organize serving equipment.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="bg-rust-600 text-white px-3 py-1 rounded font-bold text-sm whitespace-nowrap">Day Of</span>
                  <p className="text-charcoal-700">Finish any last cooking, transport food safely, set up buffet 2 hours before guests, keep everything hot!</p>
                </div>
              </div>
            </div>
          </section>

          {/* Dessert */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Quinceañera Desserts</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">The Quinceañera Cake</h3>
                <p className="text-charcoal-700 mb-3">
                  The cake is a centerpiece of the celebration. Traditionally multi-tiered and elaborately decorated to match the party theme and quinceañera's dress color.
                </p>
                <ul className="text-sm text-charcoal-600 space-y-1">
                  <li>• <strong>Traditional:</strong> Tres leches cake (most authentic)</li>
                  <li>• <strong>Popular:</strong> Vanilla with fondant decoration</li>
                  <li>• <strong>Regional:</strong> Chocoflan (chocolate + flan)</li>
                  <li>• <strong>Modern:</strong> Tower of cupcakes or cake pops</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Additional Sweets</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• <strong><Link href="/recipes/bunuelos" className="text-rust-600 hover:underline">Bunuelos</Link></strong> - Crispy cinnamon treats</li>
                  <li>• <strong>Churros</strong> - With chocolate dipping sauce</li>
                  <li>• <strong>Flan</strong> - Individual servings</li>
                  <li>• <strong>Arroz con Leche</strong> - Rice pudding</li>
                  <li>• <strong>Candy Table</strong> - Mexican candies for guests</li>
                  <li>• <strong>Fruit Display</strong> - Fresh fruit with chili-lime</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-pink-500 pb-2">Pro Tips for Quinceañera Food</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Plan for Late-Nighters</h3>
                <p className="text-charcoal-700 text-sm">Quinceañera parties often go until midnight or later. Plan a late-night snack (tacos, <Link href="/recipes/nachos" className="text-rust-600 hover:underline">nachos</Link>, or leftover appetizers) for dancers around 10-11 PM.</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Chambelanes & Damas</h3>
                <p className="text-charcoal-700 text-sm">The court (chambelanes and damas) often gets hungry during photos and rehearsals. Have snacks available for them before the main event begins.</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Children's Options</h3>
                <p className="text-charcoal-700 text-sm">Many quinceañeras have lots of young guests. Offer kid-friendly options like cheese quesadillas, plain chicken, and churros. Set up a kids' table area.</p>
              </div>
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Take-Home Containers</h3>
                <p className="text-charcoal-700 text-sm">It's traditional to send guests home with leftover food. Have to-go containers ready and encourage guests to take plates home—it's generous Mexican hospitality!</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Do I have to serve traditional Mexican food?</h3>
                <p className="text-charcoal-700">While traditional food honors the cultural significance, modern quinceañeras increasingly feature diverse menus including Italian, American BBQ, or fusion options. The celebration is about your family's preferences.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">How do I handle dietary restrictions?</h3>
                <p className="text-charcoal-700">Traditional Mexican food naturally accommodates many diets: corn tortillas are gluten-free, beans provide vegetarian protein, and most dishes can be prepared without common allergens. Label dishes clearly and have alternatives available.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Should we serve alcohol?</h3>
                <p className="text-charcoal-700">This depends on your family's preferences and venue rules. Many quinceañeras offer agua frescas, horchata, and jarritos for all guests, with a separate bar area for adults. Remember the quinceañera herself is only 15!</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-pink-500 to-rust-600 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Make Her Quinceañera Unforgettable</h2>
            <p className="text-cream-200 mb-6">Get authentic Texas tortillas delivered for your celebration.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-6 py-3 rounded-lg font-semibold transition-colors">Shop Tortillas</Link>
              <Link href="/tools/party-calculator" className="border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors">Party Calculator</Link>
              <Link href="/wholesale" className="border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors">Wholesale Orders</Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
