import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { TacoIcon, BulletIcon } from '@/components/ui/Icons';
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Tortilla Ingredients | What Goes Into Authentic Tortillas | Guide',
  description: 'What makes authentic corn and flour tortillas. Learn about masa, nixtamalization, lard vs oil, and quality ingredients.',
  keywords: 'tortilla ingredients, what is in tortillas, masa harina, nixtamalization, tortilla recipe ingredients, corn tortilla ingredients, flour tortilla ingredients',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/tortilla-ingredients',
  },
  openGraph: {
    title: 'Tortilla Ingredients: What Goes Into Authentic Tortillas',
    description: 'Complete guide to tortilla ingredients - from masa and nixtamalization to the difference between lard and oil in flour tortillas.',
    type: 'article',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are the ingredients in corn tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Traditional corn tortillas contain just three ingredients: masa harina (nixtamalized corn flour), water, and salt. Some brands add lime (calcium hydroxide) if not already present in the masa. Quality corn tortillas avoid preservatives and additives.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the ingredients in flour tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Traditional flour tortillas contain flour, water, fat (lard or vegetable oil), salt, and a leavening agent like baking powder. Authentic recipes use lard for flavor and texture, while modern versions often substitute vegetable shortening or oil.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is nixtamalization?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nixtamalization is an ancient process of soaking dried corn in an alkaline solution (lime water). This softens the kernels, removes the hull, and transforms the corn chemically—making nutrients more bioavailable and giving masa its distinctive flavor and aroma.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do flour tortillas use lard?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lard gives flour tortillas their signature flaky texture, rich flavor, and exceptional pliability. The fat coats flour proteins to create tender layers. While vegetable shortening is a common substitute, many consider lard essential for authentic flavor.',
      },
    },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Tortilla Ingredients: What Goes Into Authentic Tortillas',
  description: 'Complete guide to understanding tortilla ingredients for both corn and flour varieties.',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  datePublished: '2025-11-26',
  dateModified: '2025-11-26',
}

export default function TortillaIngredientsPage() {
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
              <span>Tortilla Ingredients</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tortilla Ingredients
            </h1>
            <p className="text-xl text-cream-200 max-w-2xl">
              Understand what goes into authentic corn and flour tortillas.
            </p>
            <LastUpdated date="November 26, 2025" className="mt-4" />
          </div>
        </header>

        {/* Hero Image */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/generated/hero-tortillas.webp"
              alt="Fresh tortillas and ingredients"
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
              The best tortillas are made with simple, quality ingredients—often just three or four components. Understanding what goes into tortillas helps you choose better products and appreciate the craft behind this essential food.
            </p>

            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6 flex items-center gap-3">
              <TacoIcon className="w-8 h-8 text-sunset-500" />
              Corn Tortilla Ingredients
            </h2>

            <p className="text-charcoal-700 leading-relaxed mb-6">
              Traditional corn tortillas are remarkably simple. The magic is in the process, not a long ingredient list:
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Masa Harina (Nixtamalized Corn Flour):</strong>
                  <span className="text-charcoal-700"> This isn&apos;t regular cornmeal—it&apos;s corn that has been treated with lime (calcium hydroxide), ground, and dried. This process, called nixtamalization, is essential for authentic flavor and nutrition.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Water:</strong>
                  <span className="text-charcoal-700"> Combined with masa harina to form pliable dough. The ratio matters—too little water makes dry, crumbly tortillas; too much makes them sticky.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Salt:</strong>
                  <span className="text-charcoal-700"> Optional but traditional. A small amount enhances the corn flavor without making tortillas taste salty.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Lime (Calcium Hydroxide):</strong>
                  <span className="text-charcoal-700"> If not already in the masa, some recipes add cal (lime) for authentic flavor and to boost calcium content.</span>
                </div>
              </li>
            </ul>

            <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg my-8">
              <h3 className="text-xl font-bold text-charcoal-950 mb-2">The Nixtamalization Process</h3>
              <p className="text-charcoal-700">
                Nixtamalization was developed by Mesoamerican peoples over 3,500 years ago. Dried corn kernels are soaked and cooked in an alkaline solution (water mixed with calcium hydroxide or wood ash). This process removes the hull, softens the kernel, and causes chemical changes that make nutrients like niacin bioavailable—preventing deficiency diseases that affected populations eating untreated corn.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6">
              Flour Tortilla Ingredients
            </h2>

            <p className="text-charcoal-700 leading-relaxed mb-6">
              Flour tortillas have more ingredients than corn tortillas, but quality versions still keep it simple:
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">All-Purpose Flour:</strong>
                  <span className="text-charcoal-700"> Wheat flour provides structure and the characteristic soft, chewy texture. Some recipes use bread flour for extra chewiness.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Fat (Lard, Shortening, or Oil):</strong>
                  <span className="text-charcoal-700"> Fat creates flaky layers and tender texture. Traditional recipes use lard (manteca) for the best flavor; modern versions often use vegetable shortening or oil.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Salt:</strong>
                  <span className="text-charcoal-700"> Essential for flavor development. Flour tortillas taste flat without adequate salt.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Baking Powder:</strong>
                  <span className="text-charcoal-700"> A small amount creates slight puffiness and lighter texture. Not all recipes include this.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Warm Water:</strong>
                  <span className="text-charcoal-700"> Helps dissolve salt, activates baking powder, and creates pliable dough. Warm (not hot) water works best.</span>
                </div>
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6">
              Lard vs. Vegetable Shortening vs. Oil
            </h2>

            <p className="text-charcoal-700 leading-relaxed mb-6">
              The fat you use in flour tortillas significantly impacts flavor and texture:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Lard (Manteca)</h3>
                <p className="text-charcoal-600 text-sm mb-3">The traditional choice. Provides rich flavor, flaky layers, and the most pliable texture. Considered essential for authentic Northern Mexican tortillas.</p>
                <p className="text-sunset-600 font-semibold text-sm">Best for: Authenticity</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Vegetable Shortening</h3>
                <p className="text-charcoal-600 text-sm mb-3">Common substitute for lard. Creates similar flaky texture but with neutral flavor. Vegetarian-friendly option that&apos;s widely available.</p>
                <p className="text-sunset-600 font-semibold text-sm">Best for: Vegetarian diets</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Oil</h3>
                <p className="text-charcoal-600 text-sm mb-3">Creates softer, less flaky tortillas. Easier to work with and lighter. Common in health-conscious recipes using olive or avocado oil.</p>
                <p className="text-sunset-600 font-semibold text-sm">Best for: Softer texture</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6">
              What to Avoid in Store-Bought Tortillas
            </h2>

            <p className="text-charcoal-700 leading-relaxed mb-6">
              While some additives help with shelf life, quality tortillas should have minimal ingredients. Watch out for:
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Long ingredient lists:</strong>
                  <span className="text-charcoal-700"> If there are more than 8-10 ingredients, the tortillas likely contain many preservatives and additives.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Dough conditioners:</strong>
                  <span className="text-charcoal-700"> Ingredients like sodium stearoyl lactylate and mono/diglycerides extend shelf life but aren&apos;t traditional.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <BulletIcon className="w-6 h-6 text-sunset-500 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-charcoal-900">Added sugars:</strong>
                  <span className="text-charcoal-700"> Some brands add sugar or corn syrup to flour tortillas. Traditional recipes don&apos;t include sweeteners.</span>
                </div>
              </li>
            </ul>

            <div className="bg-white rounded-lg shadow-md border border-charcoal-100 p-6 mb-8">
              <h3 className="text-xl font-bold text-charcoal-950 mb-4">Ingredient Comparison: Ideal vs. Typical</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-charcoal-900 mb-2">Quality Corn Tortilla</h4>
                  <p className="text-charcoal-600 text-sm">Corn masa flour, water, lime</p>
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-900 mb-2">Quality Flour Tortilla</h4>
                  <p className="text-charcoal-600 text-sm">Flour, water, lard or oil, salt, baking powder</p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <h2 className="text-3xl font-bold text-charcoal-950 mt-12 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-charcoal-100">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">What are the ingredients in corn tortillas?</h3>
                <p className="text-charcoal-700">Traditional corn tortillas contain just three ingredients: masa harina (nixtamalized corn flour), water, and salt. Some brands add lime (calcium hydroxide) if not already present in the masa. Quality corn tortillas avoid preservatives and additives.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-charcoal-100">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">What are the ingredients in flour tortillas?</h3>
                <p className="text-charcoal-700">Traditional flour tortillas contain flour, water, fat (lard or vegetable oil), salt, and a leavening agent like baking powder. Authentic recipes use lard for flavor and texture, while modern versions often substitute vegetable shortening or oil.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-charcoal-100">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">What is nixtamalization?</h3>
                <p className="text-charcoal-700">Nixtamalization is an ancient process of soaking dried corn in an alkaline solution (lime water). This softens the kernels, removes the hull, and transforms the corn chemically—making nutrients more bioavailable and giving masa its distinctive flavor and aroma.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-charcoal-100">
                <h3 className="text-lg font-bold text-charcoal-950 mb-2">Why do flour tortillas use lard?</h3>
                <p className="text-charcoal-700">Lard gives flour tortillas their signature flaky texture, rich flavor, and exceptional pliability. The fat coats flour proteins to create tender layers. While vegetable shortening is a common substitute, many consider lard essential for authentic flavor.</p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-sm text-charcoal-500 italic mt-12">
            Independent reseller. Not affiliated with or endorsed by H-E-B.
          </p>

          {/* CTA Section */}
          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Try Quality Tortillas with Simple Ingredients</h2>
            <p className="text-cream-200 mb-6">Our H-E-B tortillas are made with quality ingredients for authentic Texas taste.</p>
            <Link
              href="/shop"
              className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors inline-block"
            >
              Shop All Tortillas
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
              <Link href="/guides/blue-corn-tortillas" className="bg-white p-4 rounded-lg shadow-sm border border-charcoal-100 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-charcoal-950">Blue Corn Tortillas</h3>
                <p className="text-charcoal-600 text-sm">Nutrition and flavor guide</p>
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
