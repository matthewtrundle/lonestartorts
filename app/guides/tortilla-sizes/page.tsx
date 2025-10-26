import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { TacoIcon, BurritoIcon, CheeseIcon, BulletIcon } from '@/components/ui/Icons';
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Tortilla Size Guide | Which Size for Tacos, Burritos & More',
  description: 'Complete guide to tortilla sizes. Learn which size tortilla to use for tacos, burritos, quesadillas, and more. 6-inch, 8-inch, 10-inch, and 12-inch explained.',
  keywords: 'tortilla sizes, tortilla size guide, taco size tortilla, burrito size tortilla, quesadilla tortilla size, 6 inch tortilla, 8 inch tortilla',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/tortilla-sizes',
  },
  openGraph: {
    title: 'Tortilla Size Guide | Complete Guide',
    description: 'Never wonder which tortilla size to use again. Complete guide for every dish.',
    type: 'article',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What size tortilla is best for tacos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '6-inch tortillas are perfect for street-style tacos. Use 8-inch flour tortillas for larger American-style tacos. For authentic street tacos, double up two 6-inch corn tortillas per taco for structural integrity.'
      }
    },
    {
      '@type': 'Question',
      name: 'What size tortilla do I need for burritos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use 10-inch or 12-inch flour tortillas for burritos. These "burrito-size" tortillas are large enough to hold generous fillings and still fold completely closed. 10-inch works for standard burritos, while 12-inch is best for fully-loaded burritos.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can you use any size tortilla for quesadillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '8-inch or 10-inch flour tortillas work best for quesadillas. They provide enough surface area for cheese and fillings while still being manageable to flip. Smaller sizes work for appetizers, larger for meal-sized quesadillas.'
      }
    }
  ]
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Tortilla Size Guide',
  description: 'Complete guide to choosing the right tortilla size for every dish from tacos to burritos.',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  datePublished: '2025-10-24',
  dateModified: '2025-10-25',
};

export default function TortillaSizesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/guides" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">← Back to Guides</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Tortilla Size Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Choose the perfect tortilla size for every dish</p>
          </div>
        </header>
        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/generated/guide-tortilla-sizes.webp"
              alt="Various sizes of tortillas from small to large"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>



        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-10-25" />

          <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Reference</h2>
            <p className="text-lg text-charcoal-800">
              <strong>Tacos:</strong> 6-inch <BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Soft tacos/Wraps:</strong> 8-inch <BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Quesadillas:</strong> 8-10 inch <BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Burritos:</strong> 10-12 inch <BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Fajitas:</strong> 8-inch <BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Enchiladas:</strong> 6-8 inch
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Complete Size Breakdown</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-charcoal-950">4-5 Inch (Mini/Slider)</h3>
                  <span className="bg-sunset-100 text-sunset-700 px-4 py-1 rounded-full text-sm font-semibold">Specialty</span>
                </div>
                <p className="text-charcoal-800 mb-3">The smallest tortilla size, perfect for appetizers and party snacks.</p>
                <div className="bg-charcoal-50 p-4 rounded">
                  <p className="font-semibold text-charcoal-950 mb-2">Best for:</p>
                  <ul className="text-charcoal-800 space-y-1 text-sm">
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Mini tacos and sliders</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Appetizer portions</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Kids' meals</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Taco party platters</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-charcoal-950">6 Inch (Street Taco)</h3>
                  <span className="bg-masa-100 text-masa-700 px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                </div>
                <p className="text-charcoal-800 mb-3">The authentic street taco size. Small enough for two-per-serving, large enough to hold flavorful fillings.</p>
                <div className="bg-charcoal-50 p-4 rounded">
                  <p className="font-semibold text-charcoal-950 mb-2">Best for:</p>
                  <ul className="text-charcoal-800 space-y-1 text-sm">
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Street tacos</strong> (double up for authentic style)</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Corn tortilla tacos</strong> - traditional size</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Small soft tacos</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Enchiladas</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Taquitos (rolled and fried)</li>
                  </ul>
                </div>
                <p className="text-sm text-charcoal-600 mt-3 italic">💡 Pro tip: Use two 6-inch tortillas per taco for structural integrity, just like authentic taquerías.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-charcoal-950">8 Inch (Standard/Taco)</h3>
                  <span className="bg-sunset-100 text-sunset-700 px-4 py-1 rounded-full text-sm font-semibold">Versatile</span>
                </div>
                <p className="text-charcoal-800 mb-3">The most versatile size. Perfect for classic American tacos, quesadillas, and wraps.</p>
                <div className="bg-charcoal-50 p-4 rounded">
                  <p className="font-semibold text-charcoal-950 mb-2">Best for:</p>
                  <ul className="text-charcoal-800 space-y-1 text-sm">
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Classic tacos</strong> - American style with more filling</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Quesadillas</strong> - perfect size for folding in half</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Fajitas</strong> - traditional fajita size</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Soft tacos</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Personal pizzas</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Enchiladas (larger version)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-charcoal-950">10 Inch (Burrito/Large)</h3>
                  <span className="bg-rust-100 text-rust-700 px-4 py-1 rounded-full text-sm font-semibold">Burrito Size</span>
                </div>
                <p className="text-charcoal-800 mb-3">The go-to burrito size. Large enough for generous fillings while still manageable to roll and eat.</p>
                <div className="bg-charcoal-50 p-4 rounded">
                  <p className="font-semibold text-charcoal-950 mb-2">Best for:</p>
                  <ul className="text-charcoal-800 space-y-1 text-sm">
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Burritos</strong> - standard burrito size</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Large quesadillas</strong> - meal-sized portions</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Wraps and roll-ups</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Chimichangas</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Breakfast burritos</li>
                  </ul>
                </div>
                <p className="text-sm text-charcoal-600 mt-3 italic">💡 This size is often labeled "burrito size" or "large" at the store.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-charcoal-950">12 Inch (Extra Large/Burrito)</h3>
                  <span className="bg-charcoal-100 text-charcoal-700 px-4 py-1 rounded-full text-sm font-semibold">XXL</span>
                </div>
                <p className="text-charcoal-800 mb-3">The largest standard size. For seriously loaded burritos and wraps that need maximum capacity.</p>
                <div className="bg-charcoal-50 p-4 rounded">
                  <p className="font-semibold text-charcoal-950 mb-2">Best for:</p>
                  <ul className="text-charcoal-800 space-y-1 text-sm">
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Fully loaded burritos</strong> - California-style with everything</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Mission-style burritos</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Large wraps and roll-ups</li>
                    <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Party-size quesadillas (cut into wedges)</li>
                  </ul>
                </div>
                <p className="text-sm text-charcoal-600 mt-3 italic">⚠️ Warning: These are huge! Make sure you're hungry.</p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Size Selection by Dish</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b border-charcoal-100">
                <span className="text-3xl"><TacoIcon className="inline-block text-sunset-600" size={20} /></span>
                <div className="flex-1">
                  <h3 className="font-bold text-charcoal-950 mb-1">Tacos</h3>
                  <p className="text-charcoal-800 text-sm"><strong>6-inch corn</strong> for authentic street tacos (use 2 per taco) <BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>8-inch flour</strong> for American-style tacos</p>
                </div>
              </div>
              <div className="flex items-start gap-4 pb-4 border-b border-charcoal-100">
                <span className="text-3xl"><BurritoIcon className="inline-block text-masa-600" size={20} /></span>
                <div className="flex-1">
                  <h3 className="font-bold text-charcoal-950 mb-1">Burritos</h3>
                  <p className="text-charcoal-800 text-sm"><strong>10-inch</strong> for standard burritos <BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>12-inch</strong> for loaded/California-style burritos</p>
                </div>
              </div>
              <div className="flex items-start gap-4 pb-4 border-b border-charcoal-100">
                <span className="text-3xl"><CheeseIcon className="inline-block text-yellow-500" size={18} /></span>
                <div className="flex-1">
                  <h3 className="font-bold text-charcoal-950 mb-1">Quesadillas</h3>
                  <p className="text-charcoal-800 text-sm"><strong>8-inch</strong> for standard <BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>10-inch</strong> for meal-sized <BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Both flour tortillas</p>
                </div>
              </div>
              <div className="flex items-start gap-4 pb-4 border-b border-charcoal-100">
                <span className="text-3xl">🫓</span>
                <div className="flex-1">
                  <h3 className="font-bold text-charcoal-950 mb-1">Fajitas</h3>
                  <p className="text-charcoal-800 text-sm"><strong>8-inch flour</strong> tortillas - traditional fajita size</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-3xl">🫔</span>
                <div className="flex-1">
                  <h3 className="font-bold text-charcoal-950 mb-1">Enchiladas</h3>
                  <p className="text-charcoal-800 text-sm"><strong>6-inch corn</strong> for traditional <BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>8-inch</strong> for larger enchiladas</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Common Questions</h2>
            <div className="space-y-6">
              <div className="bg-charcoal-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-2">Can I substitute sizes?</h3>
                <p className="text-charcoal-800">Yes, but it changes the eating experience. Using a smaller tortilla means less filling or multiple tacos. Using a larger tortilla makes it harder to eat handheld. Stick to recommended sizes for best results.</p>
              </div>
              <div className="bg-charcoal-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-2">Are corn and flour tortillas the same size?</h3>
                <p className="text-charcoal-800">Not usually. Corn tortillas are typically 5-6 inches, while flour tortillas range from 6-12 inches. Corn tortillas are smaller because the dough is less elastic and harder to roll thin in large sizes.</p>
              </div>
              <div className="bg-charcoal-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-2">Why do street tacos use two small tortillas?</h3>
                <p className="text-charcoal-800">Doubling up provides structural integrity—the tortilla won't tear from the weight and moisture of the fillings. It's also traditional in Mexican street food culture. Plus, you get more of that delicious tortilla flavor!</p>
              </div>
            </div>
          </section>

          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Find the Right Size</h2>
            <p className="text-cream-100 mb-6">
              Shop our selection of <Link href="/products/corn-tortillas" className="text-sunset-400 hover:underline">corn</Link> and <Link href="/products/flour-tortillas" className="text-sunset-400 hover:underline">flour tortillas</Link> in all the standard sizes.
            </p>
            <Link href="/shop" className="inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Shop Tortillas
            </Link>
          </section>
        </article>
      </div>
    </>
  );
}
