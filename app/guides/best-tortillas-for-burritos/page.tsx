import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { TacoIcon, BulletIcon } from '@/components/ui/Icons';
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Best Tortillas for Burritos Guide',
  description: 'Find the best tortillas for burritos. Learn about burrito tortilla sizes, flour vs corn, and the techniques for perfect burrito rolling every time.',
  keywords: 'best tortillas for burritos, burrito tortillas, large flour tortillas, burrito size tortillas, how to wrap a burrito, burrito wrapping technique',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/best-tortillas-for-burritos',
  },
  openGraph: {
    title: 'Best Tortillas for Burritos: Complete Guide',
    description: 'Expert guide to choosing the perfect tortillas for burritos - size, flexibility, and wrapping techniques.',
    type: 'article',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What size tortillas are best for burritos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For standard burritos, use 10-12 inch flour tortillas. These provide enough surface area to hold generous fillings while allowing proper folding. For larger "mission-style" burritos, use 12-14 inch tortillas. Smaller 8-inch tortillas work for breakfast burritos with lighter fillings.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should burritos use flour or corn tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Flour tortillas are the traditional and practical choice for burritos. They are more pliable, less likely to crack when folded, and can stretch to accommodate large fillings. Corn tortillas are too brittle and small for traditional burritos, though they work for smaller "burrito bowls" or tacos.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you keep tortillas from tearing when rolling burritos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Warm your tortillas before rolling—cold tortillas crack easily. Heat them on a dry skillet for 15-30 seconds per side until pliable. Don\'t overfill—leave 2-3 inches of space at the edges. Fold the bottom up first, then fold in the sides before rolling away from you.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why are burrito tortillas so big?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Burrito tortillas need to be large (10-14 inches) to fully enclose substantial fillings like rice, beans, meat, cheese, and toppings. The large size also allows for proper folding technique where the sides fold in and the bottom folds up to create a sealed pocket that holds everything inside.',
      },
    },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best Tortillas for Burritos: Complete Guide',
  description: 'Expert guide to choosing and using the perfect tortillas for homemade burritos.',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  datePublished: '2025-11-26',
  dateModified: '2025-11-26',
}

export default function BestTortillasForBurritosPage() {
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
              <span>Best Tortillas for Burritos</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Best Tortillas for Burritos
            </h1>
            <p className="text-xl text-cream-200 max-w-2xl">
              Master the art of the perfect burrito with the right tortillas and techniques.
            </p>
            <LastUpdated date="November 26, 2025" className="mt-4" />
          </div>
        </header>

        {/* Hero Image */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/generated/hero-tortillas.webp"
              alt="Large flour tortillas for burritos"
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
              A great burrito starts with the right tortilla. Too small, and your fillings spill out. Too thick, and the tortilla overpowers everything else. The perfect burrito tortilla is large, thin, flexible, and strong enough to hold a pound of delicious filling without tearing.
            </p>

            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6 flex items-center gap-3">
              <TacoIcon className="w-8 h-8 text-sunset-500" />
              What Makes a Great Burrito Tortilla
            </h2>

            <p className="text-charcoal-700 leading-relaxed mb-6">
              Not all tortillas are suited for burritos. Here&apos;s what to look for:
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Size (10-14 inches):</strong>
                  <span className="text-charcoal-700"> The tortilla must be large enough to fully enclose your fillings with room for proper folding. Standard burritos need 10-12 inches; mission-style needs 12-14 inches.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Flexibility:</strong>
                  <span className="text-charcoal-700"> The tortilla should fold without cracking. This is why flour tortillas are preferred—they&apos;re naturally more pliable than corn, especially when warmed.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Strength:</strong>
                  <span className="text-charcoal-700"> A good burrito tortilla holds together under the weight of rice, beans, meat, and toppings without tearing or becoming soggy too quickly.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Neutral Flavor:</strong>
                  <span className="text-charcoal-700"> Flour tortillas have a mild taste that complements rather than competes with bold burrito fillings.</span>
                </div>
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6">
              Tortilla Size Guide by Burrito Type
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Breakfast Burritos</h3>
                <p className="text-sunset-600 font-semibold mb-2">8-10 inch tortillas</p>
                <p className="text-charcoal-600 text-sm">Lighter fillings like eggs, cheese, and bacon don&apos;t need as much surface area. Smaller tortillas create a better ratio.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Standard Burritos</h3>
                <p className="text-sunset-600 font-semibold mb-2">10-12 inch tortillas</p>
                <p className="text-charcoal-600 text-sm">The versatile middle ground. Handles rice, beans, meat, cheese, and standard toppings without being overwhelming.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Mission-Style Burritos</h3>
                <p className="text-sunset-600 font-semibold mb-2">12-14 inch tortillas</p>
                <p className="text-charcoal-600 text-sm">San Francisco&apos;s famous overstuffed burritos need maximum real estate. These hold over a pound of fillings.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Wet Burritos</h3>
                <p className="text-sunset-600 font-semibold mb-2">10-12 inch tortillas</p>
                <p className="text-charcoal-600 text-sm">Smothered in sauce and eaten with a fork. Standard size works since you&apos;re not carrying the burrito.</p>
              </div>
            </div>

            <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg my-8">
              <h3 className="text-xl font-bold text-charcoal-950 mb-2">Why Not Corn Tortillas?</h3>
              <p className="text-charcoal-700">
                While corn tortillas are perfect for tacos and enchiladas, they&apos;re not ideal for burritos. Corn tortillas are smaller (typically 6 inches), more brittle, and crack easily when folded around large fillings. They also absorb moisture faster, becoming soggy. For the occasional &quot;burrito&quot; craving with corn, try making enchiladas instead.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6">
              How to Warm Tortillas for Burritos
            </h2>

            <p className="text-charcoal-700 leading-relaxed mb-6">
              Cold tortillas crack. Always warm your tortillas before rolling burritos:
            </p>

            <ol className="space-y-4 mb-8 list-decimal list-inside">
              <li className="text-charcoal-700 leading-relaxed">
                <strong>Skillet Method (Best):</strong> Heat a dry skillet over medium heat. Warm each tortilla for 15-30 seconds per side until soft and pliable with a few light brown spots.
              </li>
              <li className="text-charcoal-700 leading-relaxed">
                <strong>Direct Flame:</strong> For gas stoves, briefly wave the tortilla over a low flame for 5-10 seconds per side. Watch carefully to avoid burning.
              </li>
              <li className="text-charcoal-700 leading-relaxed">
                <strong>Microwave:</strong> Wrap tortillas in a damp paper towel and microwave for 20-30 seconds. Less ideal but works in a pinch.
              </li>
              <li className="text-charcoal-700 leading-relaxed">
                <strong>Keep Warm:</strong> Stack warmed tortillas under a clean kitchen towel or in a tortilla warmer while you prepare other tortillas and fillings.
              </li>
            </ol>

            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6">
              Perfect Burrito Rolling Technique
            </h2>

            <p className="text-charcoal-700 leading-relaxed mb-6">
              The difference between a burrito that holds together and one that falls apart is all in the folding:
            </p>

            <ol className="space-y-4 mb-8 list-decimal list-inside">
              <li className="text-charcoal-700 leading-relaxed">
                <strong>Place fillings in the center</strong>—leave 2-3 inches of space on all sides. A common mistake is overfilling.
              </li>
              <li className="text-charcoal-700 leading-relaxed">
                <strong>Fold the bottom edge up</strong> and over the fillings, tucking it slightly under them.
              </li>
              <li className="text-charcoal-700 leading-relaxed">
                <strong>Fold both sides in</strong> toward the center, creating a pocket that prevents filling escape.
              </li>
              <li className="text-charcoal-700 leading-relaxed">
                <strong>Roll away from you</strong> tightly, keeping the sides tucked in as you go.
              </li>
              <li className="text-charcoal-700 leading-relaxed">
                <strong>Optional: Toast the seam</strong> on a hot skillet for 30 seconds to seal the burrito closed.
              </li>
            </ol>

            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6">
              Common Burrito Tortilla Mistakes
            </h2>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Using cold tortillas:</strong>
                  <span className="text-charcoal-700"> This is the number one cause of torn burritos. Always warm your tortillas.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Overfilling:</strong>
                  <span className="text-charcoal-700"> It&apos;s tempting to add more, but overfilled burritos can&apos;t fold properly. Use portion control.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Too much liquid:</strong>
                  <span className="text-charcoal-700"> Drain wet ingredients like salsa before adding. Excess liquid makes tortillas soggy and weak.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Wrong size tortilla:</strong>
                  <span className="text-charcoal-700"> Using tortillas too small for your intended fillings. Match your tortilla size to your filling volume.</span>
                </div>
              </li>
            </ul>

            {/* FAQ Section */}
            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-charcoal-100">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">What size tortillas are best for burritos?</h3>
                <p className="text-charcoal-700">For standard burritos, use 10-12 inch flour tortillas. These provide enough surface area to hold generous fillings while allowing proper folding. For larger &quot;mission-style&quot; burritos, use 12-14 inch tortillas. Smaller 8-inch tortillas work for breakfast burritos with lighter fillings.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-charcoal-100">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">Should burritos use flour or corn tortillas?</h3>
                <p className="text-charcoal-700">Flour tortillas are the traditional and practical choice for burritos. They are more pliable, less likely to crack when folded, and can stretch to accommodate large fillings. Corn tortillas are too brittle and small for traditional burritos, though they work for smaller &quot;burrito bowls&quot; or tacos.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-charcoal-100">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">How do you keep tortillas from tearing when rolling burritos?</h3>
                <p className="text-charcoal-700">Warm your tortillas before rolling—cold tortillas crack easily. Heat them on a dry skillet for 15-30 seconds per side until pliable. Don&apos;t overfill—leave 2-3 inches of space at the edges. Fold the bottom up first, then fold in the sides before rolling away from you.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-charcoal-100">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">Why are burrito tortillas so big?</h3>
                <p className="text-charcoal-700">Burrito tortillas need to be large (10-14 inches) to fully enclose substantial fillings like rice, beans, meat, cheese, and toppings. The large size also allows for proper folding technique where the sides fold in and the bottom folds up to create a sealed pocket that holds everything inside.</p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-sm text-charcoal-500 italic mt-12">
            Independent reseller. Not affiliated with or endorsed by H-E-B.
          </p>

          {/* CTA Section */}
          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Get Burrito-Ready Flour Tortillas</h2>
            <p className="text-cream-200 mb-6">Our H-E-B flour tortillas are perfect for rolling restaurant-quality burritos at home.</p>
            <Link
              href="/shop"
              className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors inline-block"
            >
              Shop Flour Tortillas
            </Link>
          </section>

          {/* Related Links */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Related Guides</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/guides/sonoran-style-tortillas" className="bg-white p-4 rounded-lg shadow-sm border border-charcoal-100 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-charcoal-950">Sonoran Style Tortillas</h3>
                <p className="text-charcoal-600 text-sm">Thin, stretchy flour tortillas</p>
              </Link>
              <Link href="/guides/corn-vs-flour-tortillas" className="bg-white p-4 rounded-lg shadow-sm border border-charcoal-100 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-charcoal-950">Corn vs Flour Tortillas</h3>
                <p className="text-charcoal-600 text-sm">When to use each type</p>
              </Link>
              <Link href="/guides/how-to-reheat-tortillas" className="bg-white p-4 rounded-lg shadow-sm border border-charcoal-100 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-charcoal-950">How to Reheat Tortillas</h3>
                <p className="text-charcoal-600 text-sm">Perfect warming techniques</p>
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
