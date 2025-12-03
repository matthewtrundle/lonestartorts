import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { TacoIcon, BulletIcon } from '@/components/ui/Icons';
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Best Tortillas for Street Tacos',
  description: 'Discover the perfect tortillas for street tacos. Learn why small corn tortillas are essential for authentic taqueria-style tacos, plus tips for warming and serving.',
  keywords: 'street tacos tortillas, street taco tortillas, small corn tortillas for tacos, taqueria style tortillas, authentic taco tortillas, best tortillas for street tacos',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/street-tacos-tortillas',
  },
  openGraph: {
    title: 'Best Tortillas for Street Tacos: Authentic Taqueria Guide',
    description: 'Expert guide to choosing the perfect tortillas for authentic street tacos. Small corn tortillas, warming techniques, and taqueria secrets.',
    type: 'article',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What size tortillas are best for street tacos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Authentic street tacos use small 4-5 inch corn tortillas. This size is traditional in Mexican taquerias and allows the perfect meat-to-tortilla ratio. Many street taco vendors double up tortillas to prevent tearing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should street tacos use corn or flour tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Traditional street tacos always use corn tortillas. The corn flavor complements meats like carne asada, al pastor, and carnitas. Flour tortillas are typically reserved for burritos and Northern Mexican dishes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do street tacos have two tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Street tacos use two stacked tortillas (double-stacked) for structural support. The juices from meats and salsas can make a single thin tortilla fall apart. Two tortillas ensure your taco holds together from first bite to last.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do taquerias warm their tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Authentic taquerias warm tortillas on a flat-top griddle (comal) until they develop light char marks and become pliable. This takes about 30 seconds per side. Some also briefly dip tortillas in oil before griddling for extra flavor.',
      },
    },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best Tortillas for Street Tacos: Complete Guide',
  description: 'Expert guide to choosing and preparing authentic street taco tortillas like a professional taqueria.',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  datePublished: '2025-11-26',
  dateModified: '2025-11-26',
}

export default function StreetTacosTortillasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        {/* Header */}
        <header className="bg-charcoal-950 text-cream-50 py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-cream-300 mb-4">
              <Link href="/" className="hover:text-sunset-400">Home</Link>
              <span>/</span>
              <Link href="/guides" className="hover:text-sunset-400">Guides</Link>
              <span>/</span>
              <span>Street Tacos Tortillas</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Best Tortillas for Street Tacos
            </h1>
            <p className="text-xl text-cream-200 max-w-2xl">
              Learn the secrets to authentic taqueria-style tacos with the perfect tortillas.
            </p>
            <LastUpdated date="November 26, 2025" className="mt-4" />
          </div>
        </header>

        {/* Hero Image */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/generated/hero-tortillas.webp"
              alt="Authentic street tacos with small corn tortillas"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Main Content */}
        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-charcoal-700 leading-relaxed mb-8">
              Walk up to any taqueria in Mexico or a truly authentic Mexican restaurant, and you&apos;ll notice something immediately: the tortillas are small, soft corn discs that cradle perfectly seasoned meats. These aren&apos;t the large flour tortillas from chain restaurants—they&apos;re the real thing.
            </p>

            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6 flex items-center gap-3">
              <TacoIcon className="w-8 h-8 text-sunset-500" />
              What Makes Street Taco Tortillas Special
            </h2>

            <p className="text-charcoal-700 leading-relaxed mb-6">
              Authentic street taco tortillas have specific characteristics that set them apart from grocery store varieties:
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Small Size (4-5 inches):</strong>
                  <span className="text-charcoal-700"> The compact size is intentional—it creates the perfect meat-to-tortilla ratio and makes tacos easy to eat standing up.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">100% Corn:</strong>
                  <span className="text-charcoal-700"> True street tacos always use corn tortillas. The earthy corn flavor pairs perfectly with carne asada, al pastor, carnitas, and other traditional fillings.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Thin and Pliable:</strong>
                  <span className="text-charcoal-700"> Street taco tortillas are thinner than standard corn tortillas, making them more flexible when warmed properly.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Double-Stacked:</strong>
                  <span className="text-charcoal-700"> Taquerias serve two tortillas per taco. This prevents tearing and soaking through from meat juices and salsa.</span>
                </div>
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6">
              Why Corn Tortillas for Street Tacos?
            </h2>

            <p className="text-charcoal-700 leading-relaxed mb-6">
              There&apos;s a reason street vendors across Mexico have used corn tortillas for generations. The masa (corn dough) is made through nixtamalization—a process that gives corn tortillas their distinctive flavor and nutritional benefits.
            </p>

            <p className="text-charcoal-700 leading-relaxed mb-6">
              Corn tortillas provide the perfect base that doesn&apos;t compete with the main attraction: the meat. A quality flour tortilla has its place (burritos, quesadillas, Northern Mexican cuisine), but for street tacos, corn is king.
            </p>

            <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg my-8">
              <h3 className="text-xl font-bold text-charcoal-950 mb-2">Pro Tip: The Double-Stack Technique</h3>
              <p className="text-charcoal-700">
                Always use two tortillas per taco. Heat them together on a dry griddle for 30-45 seconds per side. The bottom tortilla catches any drips while the top stays intact. This is how every authentic taqueria serves their tacos.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6">
              How to Warm Street Taco Tortillas
            </h2>

            <p className="text-charcoal-700 leading-relaxed mb-6">
              The warming method makes a huge difference. Cold corn tortillas will crack and crumble. Properly warmed tortillas become soft, pliable, and slightly charred—exactly how they should be.
            </p>

            <ol className="space-y-4 mb-8 list-decimal list-inside">
              <li className="text-charcoal-700 leading-relaxed">
                <strong>Heat a dry comal or cast iron skillet</strong> over medium-high heat until very hot.
              </li>
              <li className="text-charcoal-700 leading-relaxed">
                <strong>Place tortillas directly on the hot surface</strong> without oil. Let them heat for 30-45 seconds.
              </li>
              <li className="text-charcoal-700 leading-relaxed">
                <strong>Flip when you see small bubbles</strong> or char spots forming. Heat the other side for another 30 seconds.
              </li>
              <li className="text-charcoal-700 leading-relaxed">
                <strong>Stack warmed tortillas in a towel-lined basket</strong> or tortilla warmer to keep them soft while you prepare more.
              </li>
            </ol>

            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6">
              Classic Street Taco Fillings
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Carne Asada</h3>
                <p className="text-charcoal-600 text-sm">Grilled, marinated skirt or flank steak. Chopped and topped with cilantro, onion, and lime.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Al Pastor</h3>
                <p className="text-charcoal-600 text-sm">Marinated pork cooked on a vertical spit. Topped with pineapple, cilantro, and onion.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Carnitas</h3>
                <p className="text-charcoal-600 text-sm">Slow-braised, crispy pork. Served with salsa verde, cilantro, and onion.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Barbacoa</h3>
                <p className="text-charcoal-600 text-sm">Slow-cooked beef cheeks or head. Rich, tender, and topped with cilantro and onion.</p>
              </div>
            </div>

            {/* FAQ Section */}
            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-charcoal-100">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">What size tortillas are best for street tacos?</h3>
                <p className="text-charcoal-700">Authentic street tacos use small 4-5 inch corn tortillas. This size is traditional in Mexican taquerias and allows the perfect meat-to-tortilla ratio. Many street taco vendors double up tortillas to prevent tearing.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-charcoal-100">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">Should street tacos use corn or flour tortillas?</h3>
                <p className="text-charcoal-700">Traditional street tacos always use corn tortillas. The corn flavor complements meats like carne asada, al pastor, and carnitas. Flour tortillas are typically reserved for burritos and Northern Mexican dishes.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-charcoal-100">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">Why do street tacos have two tortillas?</h3>
                <p className="text-charcoal-700">Street tacos use two stacked tortillas (double-stacked) for structural support. The juices from meats and salsas can make a single thin tortilla fall apart. Two tortillas ensure your taco holds together from first bite to last.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-charcoal-100">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">How do taquerias warm their tortillas?</h3>
                <p className="text-charcoal-700">Authentic taquerias warm tortillas on a flat-top griddle (comal) until they develop light char marks and become pliable. This takes about 30 seconds per side. Some also briefly dip tortillas in oil before griddling for extra flavor.</p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-sm text-charcoal-500 italic mt-12">
            Independent reseller. Not affiliated with or endorsed by H-E-B.
          </p>

          {/* CTA Section */}
          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready for Authentic Street Taco Tortillas?</h2>
            <p className="text-cream-200 mb-6">Our H-E-B corn tortillas are perfect for creating taqueria-quality street tacos at home.</p>
            <Link
              href="/shop"
              className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors inline-block"
            >
              Shop Corn Tortillas
            </Link>
          </section>

          {/* Related Links */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Related Guides</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/guides/corn-vs-flour-tortillas" className="bg-white p-4 rounded-lg shadow-sm border border-charcoal-100 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-charcoal-950">Corn vs Flour Tortillas</h3>
                <p className="text-charcoal-600 text-sm">When to use each type</p>
              </Link>
              <Link href="/guides/how-to-reheat-tortillas" className="bg-white p-4 rounded-lg shadow-sm border border-charcoal-100 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-charcoal-950">How to Reheat Tortillas</h3>
                <p className="text-charcoal-600 text-sm">Perfect warming techniques</p>
              </Link>
              <Link href="/recipes/carne-asada-tacos" className="bg-white p-4 rounded-lg shadow-sm border border-charcoal-100 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-charcoal-950">Carne Asada Tacos</h3>
                <p className="text-charcoal-600 text-sm">Classic street taco recipe</p>
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
