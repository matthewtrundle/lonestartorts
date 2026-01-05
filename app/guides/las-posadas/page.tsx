import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Las Posadas Food Guide - Mexican Christmas Tradition',
  description: 'Plan an authentic Las Posadas celebration! Complete guide with traditional foods, taco party ideas, quantities for community gatherings, and cultural traditions.',
  keywords: 'las posadas food, posadas party, mexican christmas party, posadas celebration, posadas traditions, mexican holiday food, december celebration mexico',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/las-posadas',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What food is traditionally served at Las Posadas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Traditional Las Posadas foods include tamales, bunuelos (fried dough with cinnamon sugar), champurrado (chocolate atole), ponche navideño (warm fruit punch), and various antojitos. The celebration culminates on December 24th with a feast that may include pozole, mole, or a taco spread.',
      },
    },
    {
      '@type': 'Question',
      name: 'When are Las Posadas celebrated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Las Posadas are celebrated from December 16-24, representing the nine nights Mary and Joseph searched for lodging in Bethlehem. Each night, a different family hosts the procession and celebration with food, music, and prayer.',
      },
    },
  ],
}

export default function LasPosadasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-red-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Las Posadas Food Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Traditional Mexican Christmas celebration</p>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image
            src="/images/guides/guide-las-posadas.webp"
            alt="Las Posadas Christmas celebration taco feast"
            fill
            className="object-cover"
            priority
          />
        </div>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-12-30" />

          {/* Quick Answer */}
          <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>Las Posadas (December 16-24)</strong> is a Mexican Christmas tradition reenacting Mary and Joseph's journey. Traditional foods include tamales, bunuelos, champurrado, and ponche. A taco bar works beautifully for the community gathering, complementing traditional treats.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              Las Posadas brings neighbors and families together over nine nights of celebration. Each evening includes a candlelit procession, prayers, and of course, delicious food. Whether you're hosting one night or planning the final Nochebuena feast, here's your guide to feeding the celebration.
            </p>
          </div>

          {/* About the Tradition */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-red-600 pb-2">Understanding Las Posadas</h2>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">The Tradition</h3>
                  <ul className="space-y-2 text-charcoal-700">
                    <li>• Nine nights (December 16-24)</li>
                    <li>• Candlelit procession to host's home</li>
                    <li>• Songs asking for lodging (posada)</li>
                    <li>• Prayer and celebration once "admitted"</li>
                    <li>• Piñata for children</li>
                    <li>• Food and fellowship</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">Hosting a Night</h3>
                  <ul className="space-y-2 text-charcoal-700">
                    <li>• Rotate among families/neighbors</li>
                    <li>• Host provides food for group</li>
                    <li>• Can be simple or elaborate</li>
                    <li>• Community potluck style works</li>
                    <li>• Final night (Dec 24) is biggest</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Traditional Foods */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-red-600 pb-2">Traditional Posadas Foods</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-600">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Must-Haves</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• <strong>Tamales</strong> - Essential!</li>
                  <li>• <strong>Bunuelos</strong> - Fried sweet treats</li>
                  <li>• <strong>Ponche Navideño</strong> - Warm fruit punch</li>
                  <li>• <strong>Champurrado</strong> - Chocolate atole</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-600">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Main Dishes</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• <strong>Pozole</strong> - Hominy soup</li>
                  <li>• <strong>Mole</strong> - Complex sauce</li>
                  <li>• <strong><Link href="/recipes/carnitas" className="text-rust-600 hover:underline">Carnitas</Link></strong> - Pulled pork</li>
                  <li>• <strong>Taco bar</strong> - Feed the crowd</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-sunset-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Antojitos</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Empanadas</li>
                  <li>• Tostadas</li>
                  <li>• Quesadillas</li>
                  <li>• Chips & salsa</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Taco Bar for Posadas */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-red-600 pb-2">Posadas Taco Bar</h2>

            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-charcoal-950 mb-4">Feeding Your Community</h3>
              <p className="text-charcoal-700 mb-4">
                A taco bar is perfect for posadas—it feeds large groups affordably and lets neighbors help themselves while celebrating. Set up alongside traditional treats for a complete spread.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-charcoal-950 mb-2">Festive Proteins</h4>
                  <ul className="text-charcoal-700 text-sm">
                    <li>• Carnitas (traditional favorite)</li>
                    <li>• Al Pastor (festive flavors)</li>
                    <li>• Shredded chicken in red sauce</li>
                    <li>• Rajas con crema (peppers & cream)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-950 mb-2">Quantities for 50 Guests</h4>
                  <ul className="text-charcoal-700 text-sm">
                    <li>• 200-250 tortillas</li>
                    <li>• 15-20 lbs protein</li>
                    <li>• 5-6 lbs each topping</li>
                    <li>• Budget: $300-500</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Ponche Recipe */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-red-600 pb-2">Essential: Ponche Navideño</h2>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-charcoal-700 mb-4">No posada is complete without this warm, spiced fruit punch:</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-charcoal-950 mb-2">Ingredients</h4>
                  <ul className="text-charcoal-700 text-sm">
                    <li>• Tejocotes (Mexican hawthorn) or substitute apples</li>
                    <li>• Guavas, chopped</li>
                    <li>• Sugar cane pieces</li>
                    <li>• Tamarind pods</li>
                    <li>• Piloncillo (raw cane sugar)</li>
                    <li>• Cinnamon sticks</li>
                    <li>• Hibiscus flowers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-950 mb-2">Method</h4>
                  <p className="text-charcoal-700 text-sm">
                    Simmer fruits and spices in water for 1-2 hours. Add piloncillo to sweeten. Serve warm in mugs, including fruit pieces. Adults may add a splash of rum or tequila.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">How many people typically attend a posada?</h3>
                <p className="text-charcoal-700">It varies widely—intimate family gatherings might be 15-20, while neighborhood posadas can be 50-100+. Plan for flexibility, as the procession often picks up participants along the way!</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Do I need to make tamales from scratch?</h3>
                <p className="text-charcoal-700">While homemade tamales are wonderful, it's completely acceptable to order from a local tamalera or restaurant. Many families do a tamalada (tamale-making party) as a separate event and freeze extras for posadas.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-red-600 to-green-700 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Celebrate Las Posadas</h2>
            <p className="text-cream-200 mb-6">Authentic tortillas for your Christmas celebration.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-6 py-3 rounded-lg font-semibold transition-colors">Shop Tortillas</Link>
              <Link href="/guides/holiday-party" className="border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors">Holiday Party Guide</Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
