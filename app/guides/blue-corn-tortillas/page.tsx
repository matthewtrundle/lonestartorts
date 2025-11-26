import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { TacoIcon, BulletIcon } from '@/components/ui/Icons';
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Blue Corn Tortillas | Nutrition, Flavor & Uses | Complete Guide',
  description: 'Learn about blue corn tortillas - their unique nutrition benefits, earthy flavor, and best uses. Discover why blue corn tortillas are gaining popularity.',
  keywords: 'blue corn tortillas, blue tortillas, blue corn nutrition, heirloom corn tortillas, purple corn tortillas, blue corn vs yellow corn',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/blue-corn-tortillas',
  },
  openGraph: {
    title: 'Blue Corn Tortillas: Nutrition, Flavor & Uses',
    description: 'Complete guide to blue corn tortillas - nutrition benefits, flavor profile, and how to use them in your cooking.',
    type: 'article',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are blue corn tortillas healthier than regular corn tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Blue corn tortillas have some nutritional advantages over yellow corn tortillas. They contain 20% more protein, more anthocyanins (antioxidants that give them their blue color), and have a lower glycemic index. However, both are healthy whole grain options.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do blue corn tortillas taste like?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Blue corn tortillas have a nuttier, earthier, and slightly sweeter flavor compared to yellow corn tortillas. The taste is more complex with subtle hints of berry-like undertones from the anthocyanins. Many describe it as a more robust corn flavor.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why are blue corn tortillas blue?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Blue corn tortillas get their color from anthocyanins, the same antioxidant compounds found in blueberries, blackberries, and red cabbage. These pigments are present in heirloom blue corn varieties native to the American Southwest and Mexico.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are blue corn tortillas best used for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Blue corn tortillas are excellent for tacos, tostadas, enchiladas, and chips. Their distinctive color makes beautiful presentations, and their robust flavor pairs well with bold ingredients like mole, carnitas, and black beans.',
      },
    },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Blue Corn Tortillas: Complete Guide',
  description: 'Everything you need to know about blue corn tortillas - nutrition, flavor, and best uses.',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  datePublished: '2025-11-26',
  dateModified: '2025-11-26',
}

export default function BlueCornTortillasPage() {
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
              <span>Blue Corn Tortillas</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blue Corn Tortillas
            </h1>
            <p className="text-xl text-cream-200 max-w-2xl">
              Discover the nutrition, flavor, and culinary uses of this heirloom corn variety.
            </p>
            <LastUpdated date="November 26, 2025" className="mt-4" />
          </div>
        </header>

        {/* Hero Image */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/generated/hero-tortillas.webp"
              alt="Blue corn tortillas"
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
              Blue corn tortillas have been a staple in the American Southwest and Mexico for thousands of years. Made from heirloom blue corn varieties, these distinctive tortillas offer unique nutrition benefits, complex flavor, and stunning visual appeal that&apos;s making them increasingly popular nationwide.
            </p>

            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6 flex items-center gap-3">
              <TacoIcon className="w-8 h-8 text-sunset-500" />
              What Makes Blue Corn Special
            </h2>

            <p className="text-charcoal-700 leading-relaxed mb-6">
              Blue corn isn&apos;t just regular corn with food coloring—it&apos;s a distinct heirloom variety with genuine nutritional and culinary differences:
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Anthocyanin-Rich:</strong>
                  <span className="text-charcoal-700"> The blue-purple color comes from anthocyanins, powerful antioxidants also found in blueberries. These compounds may support heart health and reduce inflammation.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Higher Protein:</strong>
                  <span className="text-charcoal-700"> Blue corn contains approximately 20% more protein than yellow corn, making tortillas more satisfying and nutritious.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Lower Glycemic Index:</strong>
                  <span className="text-charcoal-700"> Blue corn has a lower glycemic index than yellow corn, meaning it causes a slower rise in blood sugar levels.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Complex Flavor:</strong>
                  <span className="text-charcoal-700"> Blue corn has a nuttier, earthier taste with subtle sweet undertones that yellow corn lacks.</span>
                </div>
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6">
              Nutritional Comparison: Blue vs Yellow Corn
            </h2>

            <div className="bg-white rounded-lg shadow-md border border-charcoal-100 overflow-hidden mb-8">
              <table className="w-full">
                <thead className="bg-charcoal-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-charcoal-900 font-bold">Nutrient</th>
                    <th className="px-4 py-3 text-left text-charcoal-900 font-bold">Blue Corn</th>
                    <th className="px-4 py-3 text-left text-charcoal-900 font-bold">Yellow Corn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-100">
                  <tr>
                    <td className="px-4 py-3 text-charcoal-700">Protein</td>
                    <td className="px-4 py-3 text-charcoal-700">~8g per 100g</td>
                    <td className="px-4 py-3 text-charcoal-700">~6.5g per 100g</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-charcoal-700">Anthocyanins</td>
                    <td className="px-4 py-3 text-charcoal-700">High</td>
                    <td className="px-4 py-3 text-charcoal-700">None</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-charcoal-700">Glycemic Index</td>
                    <td className="px-4 py-3 text-charcoal-700">Lower</td>
                    <td className="px-4 py-3 text-charcoal-700">Higher</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-charcoal-700">Fiber</td>
                    <td className="px-4 py-3 text-charcoal-700">Similar</td>
                    <td className="px-4 py-3 text-charcoal-700">Similar</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg my-8">
              <h3 className="text-xl font-bold text-charcoal-950 mb-2">Cultural Heritage</h3>
              <p className="text-charcoal-700">
                Blue corn has been cultivated by Hopi, Navajo, and other Pueblo peoples for over 1,000 years. For these communities, blue corn holds sacred significance and remains central to traditional ceremonies and daily meals. The nixtamalization process used to make masa was developed by indigenous peoples thousands of years ago.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6">
              Best Uses for Blue Corn Tortillas
            </h2>

            <p className="text-charcoal-700 leading-relaxed mb-6">
              Blue corn tortillas work well in most applications where you&apos;d use yellow corn tortillas, but they particularly shine in certain dishes:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Tacos</h3>
                <p className="text-charcoal-600 text-sm">The earthy flavor pairs beautifully with carnitas, barbacoa, and vegetarian fillings. The color contrast makes for stunning presentation.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Enchiladas</h3>
                <p className="text-charcoal-600 text-sm">Blue corn&apos;s robust flavor stands up well to bold mole and chile sauces. Traditional in New Mexican cuisine.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Tostadas</h3>
                <p className="text-charcoal-600 text-sm">Fried or baked into crispy tostadas, blue corn adds visual appeal and extra crunch to topped creations.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Chips & Nachos</h3>
                <p className="text-charcoal-600 text-sm">Blue corn chips have become popular nationwide for their distinctive color and nuttier taste with salsas and dips.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6">
              How to Store Blue Corn Tortillas
            </h2>

            <p className="text-charcoal-700 leading-relaxed mb-6">
              Blue corn tortillas should be stored the same way as yellow corn tortillas:
            </p>

            <ol className="space-y-4 mb-8 list-decimal list-inside">
              <li className="text-charcoal-700 leading-relaxed">
                <strong>Refrigerate after opening</strong>—store in the original packaging or an airtight container for up to 2 weeks.
              </li>
              <li className="text-charcoal-700 leading-relaxed">
                <strong>Freeze for longer storage</strong>—blue corn tortillas freeze well for up to 6 months. Separate with parchment paper for easy thawing.
              </li>
              <li className="text-charcoal-700 leading-relaxed">
                <strong>Bring to room temperature</strong> before warming for best texture and pliability.
              </li>
              <li className="text-charcoal-700 leading-relaxed">
                <strong>Warm on a dry comal</strong> or in a skillet for 30 seconds per side before serving.
              </li>
            </ol>

            {/* FAQ Section */}
            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-charcoal-100">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">Are blue corn tortillas healthier than regular corn tortillas?</h3>
                <p className="text-charcoal-700">Blue corn tortillas have some nutritional advantages over yellow corn tortillas. They contain 20% more protein, more anthocyanins (antioxidants that give them their blue color), and have a lower glycemic index. However, both are healthy whole grain options.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-charcoal-100">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">What do blue corn tortillas taste like?</h3>
                <p className="text-charcoal-700">Blue corn tortillas have a nuttier, earthier, and slightly sweeter flavor compared to yellow corn tortillas. The taste is more complex with subtle hints of berry-like undertones from the anthocyanins. Many describe it as a more robust corn flavor.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-charcoal-100">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">Why are blue corn tortillas blue?</h3>
                <p className="text-charcoal-700">Blue corn tortillas get their color from anthocyanins, the same antioxidant compounds found in blueberries, blackberries, and red cabbage. These pigments are present in heirloom blue corn varieties native to the American Southwest and Mexico.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-charcoal-100">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">What are blue corn tortillas best used for?</h3>
                <p className="text-charcoal-700">Blue corn tortillas are excellent for tacos, tostadas, enchiladas, and chips. Their distinctive color makes beautiful presentations, and their robust flavor pairs well with bold ingredients like mole, carnitas, and black beans.</p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-sm text-charcoal-500 italic mt-12">
            Independent reseller. Not affiliated with or endorsed by H-E-B.
          </p>

          {/* CTA Section */}
          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Try Authentic Texas Corn Tortillas</h2>
            <p className="text-cream-200 mb-6">Our H-E-B corn tortillas bring authentic Texas taste made with quality masa and traditional methods.</p>
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
              <Link href="/guides/tortilla-ingredients" className="bg-white p-4 rounded-lg shadow-sm border border-charcoal-100 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-charcoal-950">Tortilla Ingredients</h3>
                <p className="text-charcoal-600 text-sm">What goes into quality tortillas</p>
              </Link>
              <Link href="/guides/how-to-store-tortillas" className="bg-white p-4 rounded-lg shadow-sm border border-charcoal-100 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-charcoal-950">How to Store Tortillas</h3>
                <p className="text-charcoal-600 text-sm">Keep them fresh longer</p>
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
