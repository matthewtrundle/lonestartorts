import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Bautizo Party Food Guide - Baptism Celebration Ideas',
  description: 'Plan the perfect bautizo celebration! Complete guide with traditional Mexican baptism party foods, taco bar ideas, quantities for family gatherings, and padrino traditions.',
  keywords: 'bautizo food, baptism party food, mexican baptism party, bautizo celebration, christening party ideas, baptism catering, padrinos de bautizo',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/bautizo-celebration',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What food is served at a Mexican baptism party?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Traditional bautizo celebrations typically feature a large meal for extended family, including tacos, mole, carnitas, tamales, rice and beans, and a decorated baptism cake. The celebration may be held at home or a rented hall, with food reflecting the family\'s regional traditions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who pays for the baptism party food?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Traditionally, the padrinos (godparents) may contribute significantly to the celebration costs, though this varies by family. Some families split costs, while others follow specific regional traditions. It\'s best to discuss expectations openly with the padrinos early in planning.',
      },
    },
  ],
}

export default function BautizoCelebrationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-blue-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">&larr; Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Bautizo Celebration Food Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Welcome your little one with a beautiful celebration</p>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
          <Image
            src="/images/guides/guide-bautizo-celebration.webp"
            alt="Baptism celebration taco party"
            fill
            className="object-cover"
            priority
          />
        </div>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-12-30" />

          {/* Quick Answer */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>A bautizo (baptism) celebration</strong> brings family together to welcome a child into faith. Traditional foods include tacos, mole, carnitas, and a decorated cake. A taco bar feeds 30-75+ guests affordably at $8-12/person, allowing the family to focus on celebrating this blessed occasion.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              A bautizo is one of the most important celebrations in a child's life—a joyful gathering of family to celebrate faith and community. Whether you're hosting an intimate family lunch or a large reception, here's how to plan food that honors the tradition and feeds your loved ones.
            </p>
          </div>

          {/* Understanding the Celebration */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-blue-500 pb-2">Understanding Bautizo Traditions</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">The Celebration</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• Church ceremony first, party after</li>
                  <li>• Extended family gathering</li>
                  <li>• Padrinos (godparents) play key role</li>
                  <li>• Often 30-100+ guests</li>
                  <li>• White/light blue/pink decor themes</li>
                  <li>• Photo displays of the baby</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-pink-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Padrino Traditions</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• May sponsor ceremony items</li>
                  <li>• Often contribute to food costs</li>
                  <li>• Honored at the celebration</li>
                  <li>• Sit at head table with family</li>
                  <li>• Discuss expectations early</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quantities */}
          <section className="mb-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Bautizo Party Quantities</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full bg-cream-50 border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border px-4 py-3 text-left">Guest Count</th>
                    <th className="border px-4 py-3 text-center">Tortillas</th>
                    <th className="border px-4 py-3 text-center">Protein</th>
                    <th className="border px-4 py-3 text-center">Budget*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-blue-50">
                    <td className="border px-4 py-3 font-medium">30 guests</td>
                    <td className="border px-4 py-3 text-center">120-150</td>
                    <td className="border px-4 py-3 text-center">10-12 lbs</td>
                    <td className="border px-4 py-3 text-center">$240-360</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="border px-4 py-3 font-medium">50 guests</td>
                    <td className="border px-4 py-3 text-center">200-250</td>
                    <td className="border px-4 py-3 text-center">15-20 lbs</td>
                    <td className="border px-4 py-3 text-center">$400-600</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="border px-4 py-3 font-medium">75 guests</td>
                    <td className="border px-4 py-3 text-center">300-375</td>
                    <td className="border px-4 py-3 text-center">22-30 lbs</td>
                    <td className="border px-4 py-3 text-center">$600-900</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="border px-4 py-3 font-medium">100 guests</td>
                    <td className="border px-4 py-3 text-center">400-500</td>
                    <td className="border px-4 py-3 text-center">30-40 lbs</td>
                    <td className="border px-4 py-3 text-center">$800-1,200</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-charcoal-600 text-sm">
              *DIY food costs at $8-12/person. Add cake, decorations, and venue rental separately.
            </p>
          </section>

          {/* Menu Ideas */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-blue-500 pb-2">Bautizo Menu Ideas</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Classic Taco Bar</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• <Link href="/recipes/carnitas" className="text-rust-600 hover:underline">Carnitas</Link></li>
                  <li>• Shredded chicken</li>
                  <li>• Black beans</li>
                  <li>• Rice & beans sides</li>
                  <li>• All the toppings</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-pink-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Traditional Options</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Mole with chicken</li>
                  <li>• Pozole</li>
                  <li>• Tamales</li>
                  <li>• Enchiladas</li>
                  <li>• Tostadas</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-sunset-500">
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Desserts</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• Baptism cake (tres leches popular)</li>
                  <li>• Pastelitos</li>
                  <li>• Flan</li>
                  <li>• Fruit cups</li>
                  <li>• Candy table</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Decorations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-blue-500 pb-2">Bautizo Decorations</h2>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-charcoal-950 mb-3">Color Themes</h3>
                  <ul className="space-y-2 text-charcoal-700 text-sm">
                    <li>• <strong>Classic:</strong> White, gold, light blue</li>
                    <li>• <strong>For girls:</strong> White, pink, gold</li>
                    <li>• <strong>For boys:</strong> White, light blue, silver</li>
                    <li>• Angel and dove motifs</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-charcoal-950 mb-3">Table Decor</h3>
                  <ul className="space-y-2 text-charcoal-700 text-sm">
                    <li>• Baby photo centerpieces</li>
                    <li>• Cross decorations</li>
                    <li>• Personalized banners</li>
                    <li>• Balloon arches</li>
                    <li>• Guest book table</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Should the party be before or after the church ceremony?</h3>
                <p className="text-charcoal-700">Always after! The family and guests attend the church ceremony first, then proceed to the celebration venue. Plan food service to begin 1-2 hours after the ceremony start time to allow for travel and photos.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">How do we split food responsibilities with padrinos?</h3>
                <p className="text-charcoal-700">Have an open conversation early. Some padrinos sponsor the entire meal, others contribute a specific amount or item (like the cake). Clear communication prevents awkwardness—there's no single "right" way.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-blue-500 to-pink-500 text-cream-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Celebrate Your Little One's Bautizo</h2>
            <p className="text-cream-200 mb-6">Authentic tortillas for your family celebration.</p>
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
