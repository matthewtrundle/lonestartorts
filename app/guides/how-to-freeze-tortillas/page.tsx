import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'How to Freeze Tortillas',
  description: 'Learn how to properly freeze tortillas for long-term storage. Step-by-step guide for freezing corn and flour tortillas, plus thawing methods and storage tips.',
  keywords: 'how to freeze tortillas, can you freeze tortillas, freezing corn tortillas, freezing flour tortillas, how long do frozen tortillas last, thawing tortillas',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/how-to-freeze-tortillas',
  },
  openGraph: {
    title: 'How to Freeze Tortillas | Complete Guide',
    description: 'Extend tortilla shelf life to 6-8 months with proper freezing techniques. Complete guide with thawing tips.',
    type: 'article',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can you freeze tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Both corn and flour tortillas freeze excellently. Properly frozen tortillas last 6-8 months and maintain their quality. Use freezer bags, separate with parchment paper, and squeeze out excess air before freezing.'
      }
    },
    {
      '@type': 'Question',
      name: 'How long do frozen tortillas last?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Frozen tortillas last 6-8 months when properly stored. While safe indefinitely at 0°F, quality begins to decline after 8 months. Label bags with the freezing date to track freshness.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you need to thaw tortillas before using them?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not always! You can warm frozen tortillas directly on a skillet for 45-60 seconds per side. For best results, thaw at room temperature for 30 minutes, refrigerate overnight, or microwave for 15-20 seconds.'
      }
    }
  ]
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Freeze Tortillas',
  description: 'Complete guide to freezing both corn and flour tortillas for long-term storage, plus thawing methods and quality tips.',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  datePublished: '2025-10-24',
  dateModified: '2025-10-25',
};

export default function HowToFreezeTortillasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Guides', href: '/guides' },
              { label: 'How to Freeze Tortillas' },
            ]}
            />
            <h1 className="text-4xl md:text-5xl font-bold mt-4">How to Freeze Tortillas</h1>
            <p className="text-cream-300 mt-4 text-lg">Extend shelf life to 6-8 months with proper freezing and thawing techniques</p>
          </div>
        </header>
        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/generated/guide-how-to-freeze-tortillas.webp"
              alt="Tortillas wrapped and ready for freezer storage"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>



        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-10-25" />

          <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>Yes, you can freeze tortillas!</strong> Both corn and flour tortillas freeze excellently for 6-8 months. Place tortillas in a freezer-safe bag with parchment paper between each one, squeeze out air, seal tightly, and freeze. Thaw at room temperature for 30 minutes or warm directly from frozen on a skillet.
            </p>
          </div>

          <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Why Freeze Tortillas?</h2>
            <p className="text-charcoal-800 mb-4 text-lg">
              Freezing tortillas is perfect for:
            </p>
            <ul className="space-y-3 text-charcoal-800">
              <li className="flex items-start gap-3">
                <span className="text-sunset-600 font-bold text-xl">✓</span>
                <span><strong>Bulk buying:</strong> Buy tortillas on sale and stock up without worry</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sunset-600 font-bold text-xl">✓</span>
                <span><strong>Preventing waste:</strong> Freeze extras before they go stale</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sunset-600 font-bold text-xl">✓</span>
                <span><strong>Meal prep:</strong> Always have tortillas ready for quick meals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sunset-600 font-bold text-xl">✓</span>
                <span><strong>Long-term storage:</strong> Extends shelf life from weeks to months</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Step-by-Step Freezing Instructions</h2>

            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
              <h3 className="text-2xl font-bold text-charcoal-950 mb-4">Method 1: Whole Stack Freezing (Fastest)</h3>
              <p className="text-charcoal-800 mb-4">Best for: When you'll use the entire package at once</p>
              <ol className="space-y-4 list-decimal pl-6 text-charcoal-800">
                <li><strong>Keep sealed package intact:</strong> If unopened, tortillas can freeze in their original packaging</li>
                <li><strong>Add extra protection:</strong> Place the package inside a freezer-safe ziplock bag</li>
                <li><strong>Remove air:</strong> Squeeze out as much air as possible before sealing</li>
                <li><strong>Label and date:</strong> Write the freezing date on the bag</li>
                <li><strong>Freeze flat:</strong> Lay flat in freezer to save space and freeze evenly</li>
              </ol>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-charcoal-950 mb-4">Method 2: Individual Separation (Best Quality)</h3>
              <p className="text-charcoal-800 mb-4">Best for: Taking out just a few tortillas at a time</p>
              <ol className="space-y-4 list-decimal pl-6 text-charcoal-800">
                <li><strong>Prepare parchment paper:</strong> Cut squares slightly larger than your tortillas</li>
                <li><strong>Stack with separators:</strong> Place one sheet of parchment between each tortilla</li>
                <li><strong>Bag it up:</strong> Place the entire stack in a heavy-duty freezer-safe bag</li>
                <li><strong>Remove air:</strong> Press out air starting from the bottom, seal at the top</li>
                <li><strong>Double-bag (optional):</strong> For extra protection, use two bags</li>
                <li><strong>Label clearly:</strong> Note type (corn/flour), quantity, and date</li>
                <li><strong>Freeze promptly:</strong> Place in freezer within 2 hours of preparation</li>
              </ol>
              <p className="mt-4 text-sm italic text-charcoal-600">
                💡 Pro tip: Wax paper, aluminum foil, or plastic wrap also work as separators. Parchment paper is preferred because it doesn't stick when frozen.
              </p>
            </div>
          </section>

          <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">How Long Do Frozen Tortillas Last?</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-charcoal-200">
                    <th className="py-3 px-4">Storage Method</th>
                    <th className="py-3 px-4">Shelf Life</th>
                    <th className="py-3 px-4">Quality</th>
                  </tr>
                </thead>
                <tbody className="text-charcoal-800">
                  <tr className="border-b border-charcoal-100 bg-sunset-50">
                    <td className="py-3 px-4 font-semibold">Frozen (proper method)</td>
                    <td className="py-3 px-4">6-8 months</td>
                    <td className="py-3 px-4">Excellent</td>
                  </tr>
                  <tr className="border-b border-charcoal-100">
                    <td className="py-3 px-4 font-semibold">Frozen (simple bag)</td>
                    <td className="py-3 px-4">4-6 months</td>
                    <td className="py-3 px-4">Good</td>
                  </tr>
                  <tr className="border-b border-charcoal-100 bg-cream-100">
                    <td className="py-3 px-4 font-semibold">Refrigerated (opened)</td>
                    <td className="py-3 px-4">3-4 weeks</td>
                    <td className="py-3 px-4">Best</td>
                  </tr>
                  <tr className="border-b border-charcoal-100">
                    <td className="py-3 px-4 font-semibold">Room temp (opened)</td>
                    <td className="py-3 px-4">7-10 days</td>
                    <td className="py-3 px-4">Best</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-charcoal-600 mt-4 italic">
              Note: Frozen tortillas are safe indefinitely at 0°F, but quality starts declining after 8 months. For best taste and texture, use within 6 months.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">How to Thaw Frozen Tortillas</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-sunset-500 text-cream-50 px-3 py-1 rounded-full text-sm font-bold">BEST</span>
                  <h3 className="text-xl font-bold text-charcoal-950">Room Temperature Thawing</h3>
                </div>
                <p className="text-charcoal-800 mb-2"><strong>Time:</strong> 30 minutes</p>
                <p className="text-charcoal-800 mb-2"><strong>Method:</strong> Remove desired amount, leave on counter in bag or wrapped in towel</p>
                <p className="text-charcoal-800"><strong>Best for:</strong> Best texture preservation, ideal when you have time to plan ahead</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-masa-500 text-cream-50 px-3 py-1 rounded-full text-sm font-bold">FASTEST</span>
                  <h3 className="text-xl font-bold text-charcoal-950">Direct Skillet Method</h3>
                </div>
                <p className="text-charcoal-800 mb-2"><strong>Time:</strong> 45-60 seconds per side</p>
                <p className="text-charcoal-800 mb-2"><strong>Method:</strong> Place frozen tortilla on medium heat skillet, flip when pliable</p>
                <p className="text-charcoal-800"><strong>Best for:</strong> Emergency meals, when you need tortillas immediately, adds slight char</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Microwave Thawing</h3>
                <p className="text-charcoal-800 mb-2"><strong>Time:</strong> 15-20 seconds</p>
                <p className="text-charcoal-800 mb-2"><strong>Method:</strong> Wrap in damp paper towel, microwave in 10-second intervals</p>
                <p className="text-charcoal-800"><strong>Best for:</strong> Quick meals, when you need multiple tortillas fast</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Refrigerator Thawing</h3>
                <p className="text-charcoal-800 mb-2"><strong>Time:</strong> 8-12 hours (overnight)</p>
                <p className="text-charcoal-800 mb-2"><strong>Method:</strong> Transfer from freezer to fridge the night before</p>
                <p className="text-charcoal-800"><strong>Best for:</strong> Meal prep, maintaining maximum freshness, most even thawing</p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Corn vs Flour: Freezing Differences</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">🌽 Corn Tortillas</h3>
                <ul className="space-y-2 text-charcoal-800 text-sm">
                  <li><strong>Freeze very well</strong> - Less moisture means less ice crystal formation</li>
                  <li><strong>May become slightly brittle</strong> - Warm gently to restore flexibility</li>
                  <li><strong>Best thawed slowly</strong> - Room temp or fridge thawing preferred</li>
                  <li><strong>Tip:</strong> Warm on skillet for 10-15 seconds per side after thawing</li>
                </ul>
              </div>

              <div className="bg-sunset-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">🌾 Flour Tortillas</h3>
                <ul className="space-y-2 text-charcoal-800 text-sm">
                  <li><strong>Freeze excellently</strong> - Higher fat content protects texture</li>
                  <li><strong>Stay pliable when thawed</strong> - More forgiving than corn</li>
                  <li><strong>Can microwave directly</strong> - Higher moisture handles quick thawing</li>
                  <li><strong>Tip:</strong> Separate with parchment to prevent sticking</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Common Freezing Mistakes to Avoid</h2>
            <div className="space-y-4">
              <div className="bg-rust-50 border-l-4 border-rust-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">❌ Not Removing Air from Bags</h3>
                <p className="text-charcoal-800 text-sm">Air causes freezer burn and ice crystals. Always press out excess air before sealing.</p>
              </div>

              <div className="bg-rust-50 border-l-4 border-rust-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">❌ Skipping Separation</h3>
                <p className="text-charcoal-800 text-sm">Without parchment paper, tortillas freeze together in one solid block. You'll have to thaw the entire package.</p>
              </div>

              <div className="bg-rust-50 border-l-4 border-rust-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">❌ Freezing Already-Stale Tortillas</h3>
                <p className="text-charcoal-800 text-sm">Freezing doesn't improve quality - only preserves it. Freeze fresh tortillas for best results.</p>
              </div>

              <div className="bg-rust-50 border-l-4 border-rust-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">❌ Refreezing After Thawing</h3>
                <p className="text-charcoal-800 text-sm">Once thawed, use within a week. Don't refreeze - texture and quality deteriorate significantly.</p>
              </div>

              <div className="bg-rust-50 border-l-4 border-rust-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">❌ Not Labeling Bags</h3>
                <p className="text-charcoal-800 text-sm">Date your bags! After 8 months, quality declines. Know what you have and when it was frozen.</p>
              </div>
            </div>
          </section>

          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Buy Tortillas in Bulk & Freeze</h2>
            <p className="text-cream-100 mb-6">
              Stock up on authentic H-E-B® tortillas and freeze them for months of delicious meals. <Link href="/guides/how-to-store-tortillas" className="text-sunset-400 hover:underline">See our complete storage guide</Link> for more tips.
            </p>
            <Link href="/shop" className="inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Shop Tortillas
            </Link>
          </section>

          {/* Related Recipes */}
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Try These Recipes</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/recipes/breakfast-tacos" className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border border-charcoal-100">
                <h3 className="font-bold text-charcoal-950 hover:text-sunset-600 mb-2">Texas Breakfast Tacos →</h3>
                <p className="text-charcoal-700 text-sm">Quick weekday breakfast from frozen</p>
              </Link>
              <Link href="/recipes/cheese-quesadillas" className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border border-charcoal-100">
                <h3 className="font-bold text-charcoal-950 hover:text-sunset-600 mb-2">Classic Quesadillas →</h3>
                <p className="text-charcoal-700 text-sm">Perfect for meal prep and freezing</p>
              </Link>
              <Link href="/recipes/carnitas-tacos" className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border border-charcoal-100">
                <h3 className="font-bold text-charcoal-950 hover:text-sunset-600 mb-2">Carnitas Tacos →</h3>
                <p className="text-charcoal-700 text-sm">Freeze extra tortillas for taco night</p>
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
