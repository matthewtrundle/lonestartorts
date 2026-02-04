import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'How to Store Tortillas: Keep Them Fresh for Weeks | Lonestar Tortillas',
  description: 'Complete guide to storing tortillas. Learn proper storage methods for corn and flour tortillas, freezing tips, and how to revive stale tortillas. Expert advice from Texas tortilla specialists.',
  keywords: 'how to store tortillas, freeze tortillas, tortilla storage, keep tortillas fresh, how long do tortillas last, refrigerate tortillas, tortilla shelf life',
  alternates: {
    canonical: 'https://lonestartortillas.com/blog/how-to-store-tortillas',
  },
  openGraph: {
    title: 'How to Store Tortillas: Keep Them Fresh for Weeks',
    description: 'Expert tips for storing tortillas to maintain freshness and flavor.',
    type: 'article',
    images: ['/images/blog/tortilla-storage-hero.webp'],
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Store Tortillas Properly',
  description: 'Learn the best methods for storing tortillas to keep them fresh for weeks, including freezing and revival techniques.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Check the packaging',
      text: 'Unopened tortillas should be stored according to package directions - shelf-stable at room temperature, refrigerated if labeled.'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Transfer to airtight container',
      text: 'Once opened, transfer tortillas to a resealable bag or airtight container, pressing out excess air.'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Choose storage location',
      text: 'Store at room temperature for 1 week, refrigerate for 3-4 weeks, or freeze for up to 6 months.'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Freeze properly if needed',
      text: 'Place parchment paper between tortillas before freezing to prevent sticking. Double-bag for extra protection.'
    }
  ],
  totalTime: 'PT5M'
};

export default function HowToStoreTortillasPage() {
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
                { label: 'How to Store Tortillas' },
              ]}
            />
            <div className="flex items-center gap-2 text-sunset-400 text-sm mb-3 mt-4">
              <span className="px-3 py-1 bg-sunset-900/20 rounded-full">Guides</span>
              <span>•</span>
              <span>February 3, 2026</span>
              <span>•</span>
              <span>10 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">How to Store Tortillas: Keep Them Fresh for Weeks</h1>
            <p className="text-cream-300 mt-4 text-lg">Expert storage tips so you never waste a tortilla again</p>
          </div>
        </header>

        <article className="container mx-auto px-6 py-12 max-w-3xl">
          <LastUpdated date="2026-02-03" />

          <div className="prose prose-lg max-w-none">
            <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-charcoal-800">
                <strong>Quick Answer:</strong> Unopened shelf-stable tortillas last 30+ days at room temperature. Once opened, store in an airtight container: 1 week at room temp, 3-4 weeks refrigerated, or 6 months frozen.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Understanding Tortilla Types</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Before diving into storage methods, it&apos;s important to understand that not all tortillas are created equal when it comes to shelf life.
                </p>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">Shelf-Stable Tortillas</h3>
                <p>
                  Most packaged tortillas—including all the tortillas we ship at Lonestar Tortillas—are shelf-stable. They&apos;re specifically manufactured to maintain freshness at room temperature for extended periods. These include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>H-E-B Fajita Flour Tortillas</li>
                  <li>H-E-B Homestyle Flour Tortillas</li>
                  <li>H-E-B Butter Flour Tortillas</li>
                  <li>H-E-B White Corn Tortillas</li>
                  <li>H-E-B Mixla Tortillas</li>
                  <li>Mission brand tortillas</li>
                </ul>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">Fresh/Bakery Tortillas</h3>
                <p>
                  Fresh tortillas from bakeries or the refrigerated section have no preservatives and require refrigeration from day one. These include H-E-B Bakery tortillas. They have a shorter shelf life but superior texture.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Shelf-Stable Tortilla Storage</h2>
              <div className="text-charcoal-800 space-y-4">

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">Unopened Package</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Where:</strong> Cool, dry pantry or cupboard</li>
                  <li><strong>How Long:</strong> Until the &quot;best by&quot; date (typically 30-45 days)</li>
                  <li><strong>Avoid:</strong> Direct sunlight, heat sources, humidity</li>
                </ul>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">Opened Package</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Transfer to a resealable plastic bag or airtight container</li>
                  <li>Press out as much air as possible before sealing</li>
                  <li>Store at room temperature for up to 1 week</li>
                  <li>For longer storage, refrigerate or freeze</li>
                </ol>

                <div className="bg-masa-50 p-4 rounded-lg mt-4">
                  <p className="font-semibold text-charcoal-950">Pro Tip:</p>
                  <p className="mt-2">If the original package is resealable, you can keep using it. Just make sure to squeeze out air each time you close it.</p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Refrigerator Storage</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Refrigeration significantly extends tortilla life, but there&apos;s a trade-off: cold tortillas can become slightly stiff. Here&apos;s how to do it right:
                </p>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">Best Practices</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Container:</strong> Airtight bag or container (moisture is the enemy)</li>
                  <li><strong>Location:</strong> Main refrigerator compartment, not the crisper drawer</li>
                  <li><strong>Duration:</strong> 3-4 weeks past opening</li>
                  <li><strong>Temperature:</strong> Standard 35-40&deg;F</li>
                </ul>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">Bringing Refrigerated Tortillas Back to Life</h3>
                <p>
                  Cold tortillas need proper warming to regain their flexibility:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Remove from refrigerator 15-20 minutes before use</li>
                  <li>Wrap in a slightly damp paper towel</li>
                  <li>Microwave for 20-30 seconds, OR</li>
                  <li>Heat on a dry skillet for 15-20 seconds per side</li>
                </ol>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Freezing Tortillas</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Freezing is the best option for long-term storage. Done correctly, frozen tortillas maintain quality for up to 6-8 months.
                </p>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">How to Freeze Tortillas</h3>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>Separate with parchment paper:</strong> Place a small square of parchment or wax paper between each tortilla. This prevents them from freezing into an unbreakable brick.
                  </li>
                  <li>
                    <strong>Stack and bag:</strong> Place the separated tortillas in a freezer-safe bag. Press out all air before sealing.
                  </li>
                  <li>
                    <strong>Double-bag for protection:</strong> For extra protection against freezer burn, place the first bag inside a second freezer bag.
                  </li>
                  <li>
                    <strong>Label and date:</strong> Write the date on the bag so you know when they were frozen.
                  </li>
                  <li>
                    <strong>Lay flat:</strong> Store flat in the freezer to maintain shape.
                  </li>
                </ol>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">Thawing Frozen Tortillas</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Room temperature:</strong> Remove desired number and let sit for 30 minutes</li>
                  <li><strong>Refrigerator:</strong> Transfer to fridge overnight for next-day use</li>
                  <li><strong>Direct from frozen:</strong> Heat directly on a dry skillet over medium heat, flipping frequently until soft and warm</li>
                </ul>

                <div className="bg-masa-50 p-4 rounded-lg mt-4">
                  <p className="font-semibold text-charcoal-950">Important:</p>
                  <p className="mt-2">Don&apos;t microwave tortillas directly from frozen—they&apos;ll become tough and chewy. Always thaw first or use the skillet method.</p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Corn vs. Flour: Storage Differences</h2>
              <div className="text-charcoal-800 space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-charcoal-950 text-cream-50">
                        <th className="border px-4 py-3 text-left">Factor</th>
                        <th className="border px-4 py-3 text-center">Corn Tortillas</th>
                        <th className="border px-4 py-3 text-center">Flour Tortillas</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-cream-50">
                        <td className="border px-4 py-3">Room Temp (opened)</td>
                        <td className="border px-4 py-3 text-center">3-5 days</td>
                        <td className="border px-4 py-3 text-center">5-7 days</td>
                      </tr>
                      <tr className="hover:bg-cream-50">
                        <td className="border px-4 py-3">Refrigerated</td>
                        <td className="border px-4 py-3 text-center">2-3 weeks</td>
                        <td className="border px-4 py-3 text-center">3-4 weeks</td>
                      </tr>
                      <tr className="hover:bg-cream-50">
                        <td className="border px-4 py-3">Frozen</td>
                        <td className="border px-4 py-3 text-center">6-8 months</td>
                        <td className="border px-4 py-3 text-center">6-8 months</td>
                      </tr>
                      <tr className="hover:bg-cream-50">
                        <td className="border px-4 py-3">Freezes Well?</td>
                        <td className="border px-4 py-3 text-center">Yes, very well</td>
                        <td className="border px-4 py-3 text-center">Yes, very well</td>
                      </tr>
                      <tr className="hover:bg-cream-50">
                        <td className="border px-4 py-3">Prone to Staling</td>
                        <td className="border px-4 py-3 text-center">More prone</td>
                        <td className="border px-4 py-3 text-center">Less prone</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">How to Revive Stale Tortillas</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Don&apos;t throw away tortillas that have gone slightly stiff or dry. Here&apos;s how to bring them back:
                </p>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">The Steam Method</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Dampen a clean kitchen towel (not dripping wet)</li>
                  <li>Wrap tortillas in the damp towel</li>
                  <li>Microwave for 30-45 seconds</li>
                  <li>Let rest for 1 minute, still wrapped</li>
                  <li>Check flexibility—repeat if needed</li>
                </ol>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">The Skillet Method</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Wet your hands and lightly dampen each tortilla</li>
                  <li>Heat a dry skillet over medium heat</li>
                  <li>Cook for 15-20 seconds per side</li>
                  <li>The steam from the water will rehydrate the tortilla</li>
                </ol>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">When to Give Up</h3>
                <p>
                  If tortillas show visible mold, have an off smell, or are extremely brittle, it&apos;s time to discard them. However, slightly stale tortillas that are just dry can often be salvaged.
                </p>

                <div className="bg-masa-50 p-4 rounded-lg mt-4">
                  <p className="font-semibold text-charcoal-950">Creative Uses for Stale Tortillas:</p>
                  <ul className="mt-2 list-disc pl-6 space-y-1">
                    <li>Cut into triangles and bake for homemade tortilla chips</li>
                    <li>Tear into pieces for migas or chilaquiles</li>
                    <li>Cut into strips and fry for tortilla soup garnish</li>
                    <li>Make tostadas by frying whole tortillas until crisp</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Signs Your Tortillas Have Gone Bad</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Even with proper storage, tortillas don&apos;t last forever. Watch for these signs:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Visible mold:</strong> Any green, black, or white fuzzy spots mean immediate discard</li>
                  <li><strong>Off odor:</strong> Sour or musty smell indicates spoilage</li>
                  <li><strong>Slimy texture:</strong> Moisture buildup that feels slippery</li>
                  <li><strong>Discoloration:</strong> Unusual dark spots or color changes</li>
                  <li><strong>Extreme brittleness:</strong> Tortillas that crack and crumble when bent (though these might still be salvageable for chips)</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Storage Quick Reference</h2>
              <div className="text-charcoal-800 space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-5 shadow-md text-center">
                    <div className="text-4xl mb-2">🏠</div>
                    <h3 className="font-bold text-charcoal-950">Room Temperature</h3>
                    <p className="text-2xl font-bold text-sunset-600 mt-2">1 week</p>
                    <p className="text-sm text-charcoal-600 mt-1">Airtight container, cool & dry</p>
                  </div>
                  <div className="bg-white rounded-lg p-5 shadow-md text-center">
                    <div className="text-4xl mb-2">❄️</div>
                    <h3 className="font-bold text-charcoal-950">Refrigerator</h3>
                    <p className="text-2xl font-bold text-sunset-600 mt-2">3-4 weeks</p>
                    <p className="text-sm text-charcoal-600 mt-1">Sealed bag, main compartment</p>
                  </div>
                  <div className="bg-white rounded-lg p-5 shadow-md text-center">
                    <div className="text-4xl mb-2">🧊</div>
                    <h3 className="font-bold text-charcoal-950">Freezer</h3>
                    <p className="text-2xl font-bold text-sunset-600 mt-2">6-8 months</p>
                    <p className="text-sm text-charcoal-600 mt-1">Parchment between, double-bagged</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="bg-gradient-to-r from-rust-600 to-sunset-600 text-cream-50 rounded-xl p-8 text-center mt-12">
              <h2 className="text-3xl font-bold mb-4">Stock Up and Store Smart</h2>
              <p className="text-xl mb-6 text-cream-100">
                Order authentic Texas tortillas with FREE shipping—now you know how to keep them fresh!
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
