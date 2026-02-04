import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Corn vs Flour vs Specialty: The Complete Tortilla Guide | Lonestar Tortillas',
  description: 'Comprehensive guide comparing corn, flour, and specialty tortillas. Learn which tortilla is best for tacos, burritos, quesadillas, and more. Expert tips from Texas tortilla specialists.',
  keywords: 'corn vs flour tortillas, tortilla comparison, best tortilla for tacos, tortilla types, corn tortilla vs flour tortilla, specialty tortillas, mixla tortillas',
  alternates: {
    canonical: 'https://lonestartortillas.com/blog/corn-vs-flour-guide',
  },
  openGraph: {
    title: 'Corn vs Flour vs Specialty: The Complete Tortilla Guide',
    description: 'Everything you need to know about choosing the right tortilla for any dish.',
    type: 'article',
    images: ['/images/blog/corn-vs-flour-hero.webp'],
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Corn vs Flour vs Specialty: The Complete Tortilla Guide',
  description: 'Comprehensive guide comparing corn, flour, and specialty tortillas for different dishes and occasions.',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
    logo: {
      '@type': 'ImageObject',
      url: 'https://lonestartortillas.com/logo.png'
    }
  },
  datePublished: '2026-02-03',
  dateModified: '2026-02-03',
  articleSection: 'Product Education',
  mainEntityOfPage: 'https://lonestartortillas.com/blog/corn-vs-flour-guide',
};

export default function CornVsFlourGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        <header className="bg-charcoal-950 text-cream-50 py-12">
          <div className="container mx-auto px-6">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: 'Corn vs Flour Guide' },
              ]}
            />
            <div className="flex items-center gap-2 text-sunset-400 text-sm mb-3 mt-4">
              <span className="px-3 py-1 bg-sunset-900/20 rounded-full">Product Education</span>
              <span>•</span>
              <span>February 3, 2026</span>
              <span>•</span>
              <span>12 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Corn vs Flour vs Specialty: The Complete Tortilla Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Everything you need to know to choose the perfect tortilla for any dish</p>
          </div>
        </header>

        <article className="container mx-auto px-6 py-12 max-w-3xl">
          <LastUpdated date="2026-02-03" />

          <div className="prose prose-lg max-w-none">
            <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-charcoal-800">
                <strong>Quick Answer:</strong> Use corn tortillas for authentic street tacos and enchiladas. Use flour tortillas for burritos, quesadillas, and breakfast tacos. Use specialty blends like Mixla when you want the best of both worlds.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">The Great Tortilla Debate</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Walk into any Texas taqueria and you&apos;ll face the eternal question: corn or flour? It&apos;s not just a matter of taste—it&apos;s about tradition, texture, and the perfect marriage between tortilla and filling.
                </p>
                <p>
                  After years of shipping authentic Texas tortillas nationwide, we&apos;ve learned that choosing the right tortilla can transform a good meal into an unforgettable one. This guide breaks down everything you need to know.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Corn Tortillas: The Authentic Choice</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Corn tortillas are the original, dating back over 10,000 years to ancient Mesoamerica. Made from nixtamalized corn (masa), they offer an earthy, slightly sweet flavor that&apos;s unmistakably authentic.
                </p>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">Best Uses for Corn Tortillas</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Street Tacos:</strong> The traditional choice. Small 4-6 inch corn tortillas, often doubled up, are the foundation of authentic tacos al pastor, carnitas, and carne asada.</li>
                  <li><strong>Enchiladas:</strong> Corn tortillas absorb sauce beautifully without becoming too soggy.</li>
                  <li><strong>Tostadas:</strong> Fry or bake corn tortillas for the perfect crispy base.</li>
                  <li><strong>Chilaquiles:</strong> Cut and fried corn tortillas simmered in salsa—a Mexican breakfast staple.</li>
                </ul>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">Corn Tortilla Nutrition</h3>
                <p>
                  A 6-inch corn tortilla contains approximately 50-60 calories, is naturally gluten-free, and provides fiber, calcium, and iron from the nixtamalization process. They&apos;re the lighter option if you&apos;re watching calories.
                </p>

                <div className="bg-masa-50 p-4 rounded-lg mt-4">
                  <p className="font-semibold text-charcoal-950">Shop our corn tortillas:</p>
                  <ul className="mt-2 space-y-1">
                    <li><Link href="/shop" className="text-sunset-600 hover:underline">H-E-B White Corn Tortillas - Texas Size (80 count)</Link></li>
                    <li><Link href="/shop" className="text-sunset-600 hover:underline">H-E-B Street Taco White Corn Tortillas (24 count)</Link></li>
                    <li><Link href="/shop" className="text-sunset-600 hover:underline">Mission White Corn Tortillas (24 count)</Link></li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Flour Tortillas: The Tex-Mex Essential</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Flour tortillas emerged in northern Mexico where wheat was more available than corn. They became the foundation of Tex-Mex cuisine and remain the tortilla of choice for many Texas dishes.
                </p>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">Best Uses for Flour Tortillas</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Burritos:</strong> Large flour tortillas (10-12 inch) are essential—they fold without cracking and hold heavy fillings.</li>
                  <li><strong>Breakfast Tacos:</strong> A Texas tradition. Flour tortillas pair perfectly with eggs, bacon, and cheese.</li>
                  <li><strong>Quesadillas:</strong> Flour tortillas get that perfect golden crisp while staying soft inside.</li>
                  <li><strong>Fajitas:</strong> Soft flour tortillas are the classic pairing for sizzling fajita meat.</li>
                  <li><strong>Wraps:</strong> The flexibility of flour tortillas makes them ideal for sandwich-style wraps.</li>
                </ul>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">Flour Tortilla Varieties</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Regular Flour:</strong> The classic, soft and pliable with a mild wheat flavor.</li>
                  <li><strong>Butter Flour:</strong> Rich and slightly indulgent—perfect for breakfast tacos.</li>
                  <li><strong>Whole Wheat:</strong> Heartier flavor with more fiber for health-conscious eaters.</li>
                  <li><strong>Homestyle:</strong> Thicker and fluffier, mimicking homemade texture.</li>
                </ul>

                <div className="bg-masa-50 p-4 rounded-lg mt-4">
                  <p className="font-semibold text-charcoal-950">Shop our flour tortillas:</p>
                  <ul className="mt-2 space-y-1">
                    <li><Link href="/shop" className="text-sunset-600 hover:underline">H-E-B Bakery Flour Tortillas (20 count) - Best Seller</Link></li>
                    <li><Link href="/shop" className="text-sunset-600 hover:underline">H-E-B Bakery Butter Tortillas (20 count)</Link></li>
                    <li><Link href="/shop" className="text-sunset-600 hover:underline">Mission Soft Taco Flour Tortillas (10 count)</Link></li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Specialty Tortillas: The Best of Both Worlds</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Can&apos;t decide between corn and flour? Specialty blend tortillas offer unique characteristics that combine the best of both—or introduce entirely new flavors.
                </p>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">Mixla (Corn & Flour Blend)</h3>
                <p>
                  Mixla tortillas combine corn masa with wheat flour, creating a tortilla that has the authentic corn flavor but the flexibility of flour. They won&apos;t crack when folded and hold together better than pure corn tortillas while maintaining that traditional taste.
                </p>
                <p>
                  <strong>Best for:</strong> Tacos when you want authentic flavor with better structural integrity. Great for taco trucks and home cooks who want easier handling.
                </p>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">Mi Tienda Ready-to-Cook</h3>
                <p>
                  These uncooked flour tortillas let you experience the magic of fresh-off-the-comal tortillas at home. The transformation from raw dough to hot, puffy tortilla is genuinely satisfying.
                </p>
                <p>
                  <strong>Best for:</strong> Special occasions, impressing guests, or when you want that just-made flavor and aroma.
                </p>

                <div className="bg-masa-50 p-4 rounded-lg mt-4">
                  <p className="font-semibold text-charcoal-950">Shop specialty tortillas:</p>
                  <ul className="mt-2 space-y-1">
                    <li><Link href="/shop" className="text-sunset-600 hover:underline">H-E-B Mixla Corn & Flour Blend (24 count)</Link></li>
                    <li><Link href="/shop" className="text-sunset-600 hover:underline">H-E-B Mi Tienda Ready to Cook Street Taco Tortillas (50 count)</Link></li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Quick Reference: Which Tortilla for What?</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-charcoal-800">
                  <thead>
                    <tr className="bg-charcoal-950 text-cream-50">
                      <th className="border px-4 py-3 text-left">Dish</th>
                      <th className="border px-4 py-3 text-center">Best Tortilla</th>
                      <th className="border px-4 py-3 text-left">Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-cream-50">
                      <td className="border px-4 py-3">Street Tacos</td>
                      <td className="border px-4 py-3 text-center font-bold text-sunset-600">Corn</td>
                      <td className="border px-4 py-3">Traditional, authentic flavor</td>
                    </tr>
                    <tr className="hover:bg-cream-50">
                      <td className="border px-4 py-3">Breakfast Tacos</td>
                      <td className="border px-4 py-3 text-center font-bold text-sunset-600">Flour</td>
                      <td className="border px-4 py-3">Pairs with eggs and cheese</td>
                    </tr>
                    <tr className="hover:bg-cream-50">
                      <td className="border px-4 py-3">Burritos</td>
                      <td className="border px-4 py-3 text-center font-bold text-sunset-600">Flour (Large)</td>
                      <td className="border px-4 py-3">Folds without cracking</td>
                    </tr>
                    <tr className="hover:bg-cream-50">
                      <td className="border px-4 py-3">Quesadillas</td>
                      <td className="border px-4 py-3 text-center font-bold text-sunset-600">Flour</td>
                      <td className="border px-4 py-3">Crisps perfectly, melts cheese well</td>
                    </tr>
                    <tr className="hover:bg-cream-50">
                      <td className="border px-4 py-3">Enchiladas</td>
                      <td className="border px-4 py-3 text-center font-bold text-sunset-600">Corn</td>
                      <td className="border px-4 py-3">Absorbs sauce without falling apart</td>
                    </tr>
                    <tr className="hover:bg-cream-50">
                      <td className="border px-4 py-3">Fajitas</td>
                      <td className="border px-4 py-3 text-center font-bold text-sunset-600">Flour</td>
                      <td className="border px-4 py-3">Traditional Tex-Mex pairing</td>
                    </tr>
                    <tr className="hover:bg-cream-50">
                      <td className="border px-4 py-3">Tacos (flexible)</td>
                      <td className="border px-4 py-3 text-center font-bold text-sunset-600">Mixla</td>
                      <td className="border px-4 py-3">Authentic taste, better hold</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Heating Tips for Best Results</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  No matter which tortilla you choose, proper heating is essential. A cold tortilla—even the best one—will disappoint.
                </p>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">For Corn Tortillas</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Heat on a dry comal or skillet over medium-high heat for 30 seconds per side</li>
                  <li>Look for light char marks and puffing—that&apos;s how you know they&apos;re perfect</li>
                  <li>Keep warm in a towel-lined tortilla warmer or wrapped in foil</li>
                </ul>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">For Flour Tortillas</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Heat on a dry skillet over medium heat for 15-20 seconds per side</li>
                  <li>They should puff slightly and show golden spots</li>
                  <li>Microwave works in a pinch: wrap in damp paper towel, 30 seconds</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">The Bottom Line</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  There&apos;s no single &quot;best&quot; tortilla—only the best tortilla for what you&apos;re making. Keep both corn and flour on hand, and you&apos;ll always be ready for whatever you&apos;re craving.
                </p>
                <p>
                  The real secret? Use quality tortillas. The difference between a mass-produced grocery store tortilla and authentic H-E-B tortillas is the difference between a good meal and a great one.
                </p>
              </div>
            </section>

            <div className="bg-gradient-to-r from-rust-600 to-sunset-600 text-cream-50 rounded-xl p-8 text-center mt-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Taste the Difference?</h2>
              <p className="text-xl mb-6 text-cream-100">
                Shop authentic Texas tortillas with FREE shipping on all orders
              </p>
              <Link
                href="/shop"
                className="inline-block bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Shop Tortillas Now
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
