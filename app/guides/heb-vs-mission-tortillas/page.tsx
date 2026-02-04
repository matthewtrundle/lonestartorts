import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BulletIcon } from '@/components/ui/Icons';
import { LastUpdated } from '@/components/seo/LastUpdated';
import { PageViewTracker } from '@/components/analytics/PageViewTracker';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: 'H-E-B vs Mission Tortillas: Which is Better?',
  description: 'Complete comparison of H-E-B vs Mission tortillas. Compare taste, texture, ingredients, price, and availability. Find the best tortilla brand for your needs.',
  keywords: 'HEB vs Mission tortillas, H-E-B tortillas vs Mission, best tortilla brand, tortilla comparison, HEB tortillas review, Mission tortillas review',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/heb-vs-mission-tortillas',
  },
  openGraph: {
    title: 'H-E-B vs Mission Tortillas: Complete Comparison Guide',
    description: 'Which tortilla brand is better? We compare H-E-B and Mission tortillas on taste, texture, ingredients, and value.',
    type: 'article',
  },
};

// FAQ Schema for voice search
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Which is better, H-E-B or Mission tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'H-E-B tortillas are generally considered superior for taste and texture, made fresh in Texas bakeries with simple ingredients. Mission tortillas are more widely available nationwide but often contain more preservatives. For authentic Texas flavor, H-E-B is the preferred choice among tortilla enthusiasts.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are H-E-B tortillas made in Texas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, H-E-B tortillas are made fresh in H-E-B bakeries throughout Texas. This fresh, local production is one reason they have superior taste and texture compared to mass-produced national brands.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you buy H-E-B tortillas outside Texas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Through independent resellers like Lonestar Tortillas, you can now order authentic H-E-B tortillas and have them shipped nationwide. This allows tortilla lovers everywhere to enjoy Texas-quality tortillas.',
      },
    },
    {
      '@type': 'Question',
      name: 'What ingredients are in H-E-B vs Mission tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'H-E-B tortillas typically contain simple ingredients: enriched flour, water, vegetable oil, salt, and leavening. Mission tortillas often contain additional preservatives, dough conditioners, and stabilizers for extended shelf life. H-E-B\'s simpler ingredient list appeals to those seeking cleaner eating options.',
      },
    },
  ],
};

// Article Schema
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'H-E-B vs Mission Tortillas: Complete Comparison Guide',
  description: 'Comprehensive comparison of H-E-B and Mission tortillas covering taste, texture, ingredients, price, and availability.',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  datePublished: '2025-02-04',
  dateModified: '2025-02-04',
};

// Comparison Schema
const comparisonSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'H-E-B vs Mission Tortillas Comparison',
  description: 'Side-by-side comparison of two popular tortilla brands',
  numberOfItems: 2,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Product',
        name: 'H-E-B Bakery Flour Tortillas',
        brand: { '@type': 'Brand', name: 'H-E-B' },
        description: 'Fresh-baked Texas tortillas with simple ingredients',
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Product',
        name: 'Mission Flour Tortillas',
        brand: { '@type': 'Brand', name: 'Mission' },
        description: 'Nationally distributed flour tortillas',
      },
    },
  ],
};

export default function HEBvsMissionPage() {
  return (
    <>
      <PageViewTracker
        type="guide"
        slug="heb-vs-mission-tortillas"
        title="H-E-B vs Mission Tortillas"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        {/* Header */}
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Breadcrumbs
              items={[
                { label: 'Guides', href: '/guides' },
                { label: 'H-E-B vs Mission Tortillas' },
              ]}
              className="text-cream-300 mb-4"
            />
            <h1 className="text-4xl md:text-5xl font-bold mt-2">
              H-E-B vs Mission Tortillas: Which is Better?
            </h1>
            <p className="text-cream-300 mt-4 text-lg">
              The definitive comparison of two popular tortilla brands
            </p>
          </div>
        </header>

        {/* Main Content */}
        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-02-04" />

          {/* Quick Answer Box - Featured Snippet Target */}
          <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>H-E-B tortillas are generally considered superior</strong> for taste and texture, made fresh
              in Texas with simple, clean ingredients. Mission tortillas offer wider availability but contain
              more preservatives. For authentic Texas-style tortillas, H-E-B is the preferred choice among
              tortilla enthusiasts—and you can now get them{' '}
              <Link href="/shop" className="text-sunset-600 hover:text-sunset-700 font-medium">
                shipped nationwide
              </Link>.
            </p>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              When it comes to tortillas, two brands dominate the conversation: <strong>H-E-B</strong> and{' '}
              <strong>Mission</strong>. If you've ever lived in Texas, you know that H-E-B tortillas have a
              cult-like following. But how do they stack up against Mission, the largest tortilla manufacturer
              in the world? Let's break it down.
            </p>
          </div>

          {/* Comparison Table */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-sunset-500 pb-2">
              Side-by-Side Comparison
            </h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="px-6 py-4 text-left font-bold">Category</th>
                    <th className="px-6 py-4 text-center font-bold bg-sunset-600">H-E-B</th>
                    <th className="px-6 py-4 text-center font-bold">Mission</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-200">
                  <tr className="hover:bg-cream-50">
                    <td className="px-6 py-4 font-medium">Taste</td>
                    <td className="px-6 py-4 text-center bg-sunset-50">
                      <span className="text-sunset-600 font-bold">★★★★★</span>
                      <br /><span className="text-sm text-charcoal-600">Fresh, authentic flavor</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold">★★★☆☆</span>
                      <br /><span className="text-sm text-charcoal-600">Standard, consistent</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-cream-50">
                    <td className="px-6 py-4 font-medium">Texture</td>
                    <td className="px-6 py-4 text-center bg-sunset-50">
                      <span className="text-sunset-600 font-bold">★★★★★</span>
                      <br /><span className="text-sm text-charcoal-600">Soft, pliable, fresh</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold">★★★☆☆</span>
                      <br /><span className="text-sm text-charcoal-600">Can be stiff or chewy</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-cream-50">
                    <td className="px-6 py-4 font-medium">Ingredients</td>
                    <td className="px-6 py-4 text-center bg-sunset-50">
                      <span className="text-sunset-600 font-bold">★★★★★</span>
                      <br /><span className="text-sm text-charcoal-600">Simple, clean label</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold">★★☆☆☆</span>
                      <br /><span className="text-sm text-charcoal-600">More preservatives</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-cream-50">
                    <td className="px-6 py-4 font-medium">Availability</td>
                    <td className="px-6 py-4 text-center bg-sunset-50">
                      <span className="text-sunset-600 font-bold">★★★☆☆</span>
                      <br /><span className="text-sm text-charcoal-600">Texas + nationwide via Lonestar</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold">★★★★★</span>
                      <br /><span className="text-sm text-charcoal-600">Available everywhere</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-cream-50">
                    <td className="px-6 py-4 font-medium">Price</td>
                    <td className="px-6 py-4 text-center bg-sunset-50">
                      <span className="text-sunset-600 font-bold">$$</span>
                      <br /><span className="text-sm text-charcoal-600">Premium quality</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold">$-$$</span>
                      <br /><span className="text-sm text-charcoal-600">Budget to mid-range</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-cream-50">
                    <td className="px-6 py-4 font-medium">Variety</td>
                    <td className="px-6 py-4 text-center bg-sunset-50">
                      <span className="text-sunset-600 font-bold">★★★★☆</span>
                      <br /><span className="text-sm text-charcoal-600">Flour, Butter, Wheat, Corn</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold">★★★★★</span>
                      <br /><span className="text-sm text-charcoal-600">Many varieties/sizes</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Detailed Analysis */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-sunset-500 pb-2">
              Detailed Breakdown
            </h2>

            {/* Taste & Texture */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-charcoal-950 mb-4">Taste & Texture</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-sunset-50 p-6 rounded-lg border-2 border-sunset-200">
                  <h4 className="font-bold text-sunset-700 mb-3">H-E-B Tortillas</h4>
                  <ul className="space-y-2 text-charcoal-700">
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Fresh-baked taste with subtle sweetness</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Soft and pliable—never cracks when folded</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Authentic homemade tortilla flavor</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Butter variety has rich, delicious taste</li>
                  </ul>
                </div>
                <div className="bg-charcoal-50 p-6 rounded-lg border-2 border-charcoal-200">
                  <h4 className="font-bold text-charcoal-700 mb-3">Mission Tortillas</h4>
                  <ul className="space-y-2 text-charcoal-700">
                    <li><BulletIcon className="inline-block text-charcoal-400 mx-2" size={6} /> Consistent but somewhat bland flavor</li>
                    <li><BulletIcon className="inline-block text-charcoal-400 mx-2" size={6} /> Can be stiff or tough depending on freshness</li>
                    <li><BulletIcon className="inline-block text-charcoal-400 mx-2" size={6} /> Mass-produced taste</li>
                    <li><BulletIcon className="inline-block text-charcoal-400 mx-2" size={6} /> Works fine for everyday use</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-charcoal-700">
                <strong>Winner: H-E-B.</strong> The difference in taste and texture is immediately noticeable.
                H-E-B tortillas have that fresh-from-the-bakery quality that Mission simply can't match.
              </p>
            </div>

            {/* Ingredients */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-charcoal-950 mb-4">Ingredients</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                  <h4 className="font-bold text-green-700 mb-3">H-E-B Flour Tortillas</h4>
                  <p className="text-sm text-charcoal-700 mb-2">Typical ingredients:</p>
                  <ul className="text-charcoal-700 text-sm space-y-1">
                    <li>• Enriched bleached flour</li>
                    <li>• Water</li>
                    <li>• Vegetable shortening</li>
                    <li>• Salt</li>
                    <li>• Baking powder</li>
                    <li>• Sodium propionate (preservative)</li>
                  </ul>
                  <p className="mt-3 text-green-700 font-medium">~6 simple ingredients</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
                  <h4 className="font-bold text-yellow-700 mb-3">Mission Flour Tortillas</h4>
                  <p className="text-sm text-charcoal-700 mb-2">Typical ingredients:</p>
                  <ul className="text-charcoal-700 text-sm space-y-1">
                    <li>• Enriched bleached flour</li>
                    <li>• Water</li>
                    <li>• Vegetable shortening</li>
                    <li>• Salt, sugar</li>
                    <li>• Sodium aluminum sulfate</li>
                    <li>• Monoglycerides, calcium sulfate</li>
                    <li>• Fumaric acid, potassium sorbate</li>
                    <li>• Sodium metabisulfite...</li>
                  </ul>
                  <p className="mt-3 text-yellow-700 font-medium">12+ ingredients with additives</p>
                </div>
              </div>
              <p className="mt-4 text-charcoal-700">
                <strong>Winner: H-E-B.</strong> If you prefer clean-label products with fewer additives and
                preservatives, H-E-B is the clear choice. Their simpler ingredient list reflects their
                fresh-baked approach.
              </p>
            </div>

            {/* Availability */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-charcoal-950 mb-4">Availability</h3>
              <p className="text-charcoal-700 mb-4">
                <strong>Mission wins on availability</strong>—they're the largest tortilla producer in the world
                and available at virtually every grocery store nationwide.
              </p>
              <p className="text-charcoal-700 mb-4">
                <strong>H-E-B tortillas</strong> were traditionally only available in Texas at H-E-B stores.
                However, through independent resellers like{' '}
                <Link href="/shop" className="text-sunset-600 hover:text-sunset-700 font-medium">
                  Lonestar Tortillas
                </Link>, you can now order authentic H-E-B tortillas and have them shipped anywhere in the US.
              </p>
              <div className="bg-masa-100 border-l-4 border-masa-600 p-5">
                <p className="text-charcoal-800">
                  <strong>Good news for tortilla lovers:</strong> You no longer have to live in Texas to enjoy
                  H-E-B tortillas. Lonestar Tortillas ships shelf-stable H-E-B tortillas nationwide with 2-3
                  day delivery.
                </p>
              </div>
            </div>

            {/* Best For */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-charcoal-950 mb-4">Which Should You Choose?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-sunset-50 p-6 rounded-lg">
                  <h4 className="font-bold text-sunset-700 mb-3">Choose H-E-B If You Want:</h4>
                  <ul className="space-y-2 text-charcoal-700">
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Best possible taste and texture</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Cleaner ingredient list</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Authentic Texas tortilla experience</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Premium quality for special meals</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> To impress guests at taco night</li>
                  </ul>
                </div>
                <div className="bg-charcoal-50 p-6 rounded-lg">
                  <h4 className="font-bold text-charcoal-700 mb-3">Choose Mission If You Want:</h4>
                  <ul className="space-y-2 text-charcoal-700">
                    <li><BulletIcon className="inline-block text-charcoal-400 mx-2" size={6} /> Easy local availability</li>
                    <li><BulletIcon className="inline-block text-charcoal-400 mx-2" size={6} /> Budget-friendly option</li>
                    <li><BulletIcon className="inline-block text-charcoal-400 mx-2" size={6} /> Specific specialty varieties</li>
                    <li><BulletIcon className="inline-block text-charcoal-400 mx-2" size={6} /> Longer shelf life with preservatives</li>
                    <li><BulletIcon className="inline-block text-charcoal-400 mx-2" size={6} /> Quick grocery store pickup</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* The Verdict */}
          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold mb-4">The Verdict</h2>
            <p className="text-lg leading-relaxed mb-4">
              If you prioritize <strong>taste, texture, and clean ingredients</strong>, H-E-B is the clear
              winner. There's a reason Texans are fiercely loyal to H-E-B tortillas—they're simply better.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Mission tortillas are perfectly fine for everyday use and have the advantage of being available
              everywhere. But once you've tried H-E-B, it's hard to go back.
            </p>
            <p className="text-lg leading-relaxed">
              The good news? You can now get H-E-B tortillas shipped to your door anywhere in the US.
              Experience the Texas difference for yourself.
            </p>
            <div className="mt-6">
              <Link
                href="/shop"
                className="inline-block bg-sunset-500 hover:bg-sunset-600 text-cream-50 px-8 py-3 rounded-lg font-bold transition-colors"
              >
                Shop H-E-B Tortillas →
              </Link>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">
                  Which is better, H-E-B or Mission tortillas?
                </h3>
                <p className="text-charcoal-700">
                  H-E-B tortillas are generally considered superior for taste and texture. They're made fresh
                  in Texas bakeries with simple ingredients, while Mission tortillas are mass-produced with
                  more preservatives. For the best eating experience, H-E-B wins.
                </p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">
                  Are H-E-B tortillas made in Texas?
                </h3>
                <p className="text-charcoal-700">
                  Yes! H-E-B tortillas are made fresh in H-E-B bakeries throughout Texas. This local,
                  fresh production is why they taste so much better than nationally distributed brands.
                </p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">
                  Can I buy H-E-B tortillas outside of Texas?
                </h3>
                <p className="text-charcoal-700">
                  Yes! Through{' '}
                  <Link href="/shop" className="text-sunset-600 hover:text-sunset-700 font-medium">
                    Lonestar Tortillas
                  </Link>, you can order authentic H-E-B tortillas and have them shipped anywhere in the
                  United States. Enjoy Texas-quality tortillas no matter where you live.
                </p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">
                  What ingredients are in H-E-B vs Mission tortillas?
                </h3>
                <p className="text-charcoal-700">
                  H-E-B tortillas contain about 6 simple ingredients: flour, water, shortening, salt, and
                  leavening. Mission tortillas typically contain 12+ ingredients including various
                  preservatives, dough conditioners, and stabilizers for extended shelf life.
                </p>
              </div>
            </div>
          </section>

          {/* Related Content */}
          <section className="bg-gradient-to-r from-sunset-100 to-masa-100 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Related Guides</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/guides/corn-vs-flour-tortillas"
                className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Corn vs Flour Tortillas →</h3>
                <p className="text-charcoal-700 text-sm">
                  Which type is best for your dish?
                </p>
              </Link>

              <Link
                href="/guides/how-to-store-tortillas"
                className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">How to Store Tortillas →</h3>
                <p className="text-charcoal-700 text-sm">
                  Keep them fresh for weeks
                </p>
              </Link>

              <Link
                href="/shop"
                className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-400"
              >
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Shop H-E-B Tortillas →</h3>
                <p className="text-charcoal-700 text-sm">
                  Get them shipped nationwide
                </p>
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
