import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Día de los Muertos Food Guide - Day of the Dead Celebration',
  description: 'Plan an authentic Día de los Muertos celebration! Complete guide with traditional foods, altar offerings, taco party ideas, and cultural traditions for Day of the Dead.',
  keywords: 'dia de los muertos food, day of the dead food, dia de los muertos party, ofrenda food, mexican day of the dead, november 1 2 celebration, dia de muertos traditions',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/dia-de-los-muertos',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What food is traditionally served on Día de los Muertos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Traditional Día de los Muertos foods include pan de muerto (sweet bread), sugar skulls (calaveras de azúcar), tamales, mole, and the favorite foods of departed loved ones. Tortillas are essential as a staple and can be used to make tacos, enchiladas, or simply served alongside traditional dishes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you have a taco bar for Día de los Muertos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! While maintaining traditional elements like pan de muerto and ofrenda offerings, a taco bar works perfectly for Day of the Dead gatherings. Focus on traditional flavors like carnitas, barbacoa, or mole, and incorporate festive decorations like marigolds, papel picado, and sugar skull motifs.',
      },
    },
  ],
}

export default function DiaDeMuertosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-charcoal-950 to-purple-950">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Día de los Muertos Food Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Honor loved ones with traditional foods and celebration</p>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image
            src="/images/guides/guide-dia-de-los-muertos.webp"
            alt="Día de los Muertos taco celebration"
            fill
            className="object-cover"
            priority
          />
        </div>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-12-30" />

          {/* Quick Answer */}
          <div className="bg-purple-900/50 border-l-4 border-sunset-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-cream-50 mb-3">Quick Answer</h2>
            <p className="text-lg text-cream-200">
              <strong>Día de los Muertos (November 1-2)</strong> is a celebration honoring departed loved ones. Traditional foods include pan de muerto, tamales, mole, and favorite dishes of those being remembered. A taco bar with traditional flavors like carnitas and barbacoa makes a wonderful gathering centerpiece alongside ofrenda offerings.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-cream-300 leading-relaxed">
              Día de los Muertos is a beautiful celebration of life, death, and family connection. Food plays a central role—both as offerings on the ofrenda and as nourishment for the living who gather to remember. Here's how to incorporate tortillas and tacos into your Day of the Dead celebration.
            </p>
          </div>

          {/* About the Holiday */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-cream-50 mb-6 border-b-2 border-sunset-500 pb-2">Understanding Día de los Muertos</h2>

            <div className="bg-charcoal-900/50 p-6 rounded-lg mb-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-cream-50 mb-3">When & Why</h3>
                  <ul className="space-y-2 text-cream-300">
                    <li>• November 1: Día de los Angelitos (children)</li>
                    <li>• November 2: Día de los Muertos (adults)</li>
                    <li>• Celebrates life and death connection</li>
                    <li>• Pre-Hispanic roots mixed with Catholic traditions</li>
                    <li>• UNESCO Intangible Cultural Heritage</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-cream-50 mb-3">Key Traditions</h3>
                  <ul className="space-y-2 text-cream-300">
                    <li>• Build an ofrenda (altar) for loved ones</li>
                    <li>• Decorate with cempasúchil (marigolds)</li>
                    <li>• Share favorite foods of the departed</li>
                    <li>• Visit graves with flowers and food</li>
                    <li>• Create sugar skulls (calaveras)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Traditional Foods */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-cream-50 mb-6 border-b-2 border-sunset-500 pb-2">Traditional Día de los Muertos Foods</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-charcoal-900/50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-cream-50 mb-3">For the Ofrenda</h3>
                <ul className="space-y-2 text-cream-300 text-sm">
                  <li>• <strong>Pan de Muerto</strong> - Sweet bread with bone shapes</li>
                  <li>• <strong>Sugar Skulls</strong> - Decorated calaveras</li>
                  <li>• <strong>Mole</strong> - Complex chocolate-chile sauce</li>
                  <li>• <strong>Tamales</strong> - Traditional wrapped masa</li>
                  <li>• <strong>Favorite foods</strong> - What your loved ones enjoyed</li>
                  <li>• <strong>Agua/Beverages</strong> - For thirsty spirits</li>
                </ul>
              </div>
              <div className="bg-charcoal-900/50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-cream-50 mb-3">For the Gathering</h3>
                <ul className="space-y-2 text-cream-300 text-sm">
                  <li>• <strong><Link href="/recipes/carnitas" className="text-sunset-400 hover:underline">Carnitas</Link></strong> - Traditional slow-cooked pork</li>
                  <li>• <strong>Barbacoa</strong> - Slow-braised beef</li>
                  <li>• <strong>Pozole</strong> - Hominy soup</li>
                  <li>• <strong>Atole</strong> - Warm masa beverage</li>
                  <li>• <strong>Mexican hot chocolate</strong> - Champurrado</li>
                  <li>• <strong>Fresh tortillas</strong> - Foundation of the meal</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Taco Bar Ideas */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-cream-50 mb-6 border-b-2 border-sunset-500 pb-2">Día de los Muertos Taco Gathering</h2>

            <div className="bg-charcoal-900/50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-cream-50 mb-4">Respecting Tradition + Feeding Guests</h3>
              <p className="text-cream-300 mb-4">
                A taco bar can complement (not replace) traditional elements. Set up your ofrenda with pan de muerto and offerings, then serve a taco bar for the living to enjoy while remembering loved ones together.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-purple-900/30 p-4 rounded">
                  <h4 className="font-bold text-sunset-400 mb-2">Traditional Proteins</h4>
                  <ul className="text-cream-300 text-sm">
                    <li>• Carnitas</li>
                    <li>• Barbacoa</li>
                    <li>• Mole chicken</li>
                    <li>• Rajas con crema</li>
                  </ul>
                </div>
                <div className="bg-purple-900/30 p-4 rounded">
                  <h4 className="font-bold text-sunset-400 mb-2">Authentic Toppings</h4>
                  <ul className="text-cream-300 text-sm">
                    <li>• Salsa roja/verde</li>
                    <li>• Pickled onions</li>
                    <li>• Cilantro & lime</li>
                    <li>• Queso fresco</li>
                  </ul>
                </div>
                <div className="bg-purple-900/30 p-4 rounded">
                  <h4 className="font-bold text-sunset-400 mb-2">Tortilla Options</h4>
                  <ul className="text-cream-300 text-sm">
                    <li>• <Link href="/products/corn-tortillas" className="text-sunset-400 hover:underline">Corn tortillas</Link></li>
                    <li>• Fresh is best</li>
                    <li>• Keep warm</li>
                    <li>• Honor tradition</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Decorations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-cream-50 mb-6 border-b-2 border-sunset-500 pb-2">Festive Decorations</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-charcoal-900/50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-cream-50 mb-3">Essential Elements</h3>
                <ul className="space-y-2 text-cream-300 text-sm">
                  <li>• <strong>Cempasúchil (marigolds)</strong> - Guide spirits home</li>
                  <li>• <strong>Papel picado</strong> - Colorful cut paper</li>
                  <li>• <strong>Candles</strong> - Light the way</li>
                  <li>• <strong>Photos of loved ones</strong> - Center of ofrenda</li>
                  <li>• <strong>Purple & orange</strong> - Traditional colors</li>
                </ul>
              </div>
              <div className="bg-charcoal-900/50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-cream-50 mb-3">Food Table Decor</h3>
                <ul className="space-y-2 text-cream-300 text-sm">
                  <li>• Sugar skull table scatter</li>
                  <li>• Marigold runners</li>
                  <li>• Calavera-themed napkins</li>
                  <li>• Colorful serape fabric</li>
                  <li>• Candles for ambiance</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-cream-50 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-charcoal-900/50 p-6 rounded-lg">
                <h3 className="font-bold text-cream-50 mb-2 text-lg">Is it disrespectful to have a Día de los Muertos party if I'm not Mexican?</h3>
                <p className="text-cream-300">If approached with respect and understanding, celebrating Día de los Muertos can be a beautiful way to honor the dead from any culture. Focus on the meaning—remembering loved ones—rather than treating it as a costume party. Learn about the traditions and their significance.</p>
              </div>

              <div className="bg-charcoal-900/50 p-6 rounded-lg">
                <h3 className="font-bold text-cream-50 mb-2 text-lg">What time should a Día de los Muertos gathering be?</h3>
                <p className="text-cream-300">Traditionally, celebrations begin at sunset when spirits are believed to return. Evening gatherings with candlelight create the most authentic atmosphere. Food can be served anytime, but evening settings honor the tradition best.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-purple-800 to-sunset-600 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Honor Your Loved Ones</h2>
            <p className="text-cream-200 mb-6">Authentic tortillas for your Día de los Muertos celebration.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-6 py-3 rounded-lg font-semibold transition-colors">Shop Tortillas</Link>
              <Link href="/recipes" className="border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors">Traditional Recipes</Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
