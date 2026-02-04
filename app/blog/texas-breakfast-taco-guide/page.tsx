import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'The Ultimate Texas Breakfast Taco Guide | Lonestar Tortillas',
  description: 'Master the art of Texas breakfast tacos with our comprehensive guide. Recipes, tortilla pairings, and tips from Austin to San Antonio. Learn what makes a perfect breakfast taco.',
  keywords: 'Texas breakfast tacos, breakfast taco recipes, Austin breakfast tacos, San Antonio breakfast tacos, migas tacos, bacon egg cheese taco, best tortillas for breakfast tacos',
  alternates: {
    canonical: 'https://lonestartortillas.com/blog/texas-breakfast-taco-guide',
  },
  openGraph: {
    title: 'The Ultimate Texas Breakfast Taco Guide',
    description: 'Everything you need to master authentic Texas breakfast tacos at home.',
    type: 'article',
    images: ['/images/blog/breakfast-taco-hero.webp'],
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Ultimate Texas Breakfast Taco Guide',
  description: 'Comprehensive guide to making authentic Texas breakfast tacos with recipes and tortilla recommendations.',
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
  articleSection: 'Recipes & Culture',
  mainEntityOfPage: 'https://lonestartortillas.com/blog/texas-breakfast-taco-guide',
};

export default function BreakfastTacoGuidePage() {
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
                { label: 'Texas Breakfast Taco Guide' },
              ]}
            />
            <div className="flex items-center gap-2 text-sunset-400 text-sm mb-3 mt-4">
              <span className="px-3 py-1 bg-sunset-900/20 rounded-full">Recipes & Culture</span>
              <span>•</span>
              <span>February 3, 2026</span>
              <span>•</span>
              <span>14 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">The Ultimate Texas Breakfast Taco Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">From Austin to San Antonio: mastering the sacred morning ritual</p>
          </div>
        </header>

        <article className="container mx-auto px-6 py-12 max-w-3xl">
          <LastUpdated date="2026-02-03" />

          <div className="prose prose-lg max-w-none">
            <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-charcoal-800 italic">
                &quot;In Texas, the breakfast taco isn&apos;t just food—it&apos;s a religion. And like any religion, there are sacred rules, fierce debates, and unwavering devotion.&quot;
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">What Makes a Texas Breakfast Taco?</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  A Texas breakfast taco isn&apos;t just eggs in a tortilla. It&apos;s a carefully constructed combination of fluffy scrambled eggs, quality protein, melted cheese, and optional toppings—all wrapped in a warm, soft flour tortilla.
                </p>
                <p>
                  The key difference from other breakfast wraps? The tortilla. In Texas, we use fresh, soft flour tortillas that become almost cloud-like when warmed. They&apos;re bigger than street taco tortillas but smaller than burritos—usually 6-8 inches of pure carb heaven.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">The Essential Tortilla</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  For breakfast tacos, flour tortillas reign supreme. The subtle wheat flavor complements eggs and cheese perfectly, and the soft texture folds without cracking around hot fillings.
                </p>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">Best Tortillas for Breakfast Tacos</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>H-E-B Bakery Flour Tortillas:</strong> The gold standard. Fresh, soft, and perfect for morning tacos.</li>
                  <li><strong>H-E-B Butter Tortillas:</strong> Extra richness that pairs amazingly with bacon and eggs.</li>
                  <li><strong>Mi Tienda Ready-to-Cook:</strong> For the ultimate fresh-made experience at home.</li>
                </ul>

                <div className="bg-masa-50 p-4 rounded-lg mt-4">
                  <p className="font-semibold text-charcoal-950">Pro Tip:</p>
                  <p className="mt-2">Always warm your tortillas before filling. A cold tortilla will make even the best ingredients taste flat. Heat on a dry comal for 15-20 seconds per side until soft and pliable.</p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Classic Texas Breakfast Taco Combinations</h2>
              <div className="text-charcoal-800 space-y-6">

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">1. The Classic: Bacon, Egg & Cheese</h3>
                  <p className="mb-3">The foundation of Texas breakfast culture. Simple, perfect, iconic.</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>2 scrambled eggs (soft, not rubbery)</li>
                    <li>3-4 strips crispy bacon, crumbled</li>
                    <li>Generous handful of shredded cheddar or Mexican blend</li>
                    <li>Warm flour tortilla</li>
                    <li>Optional: salsa on the side</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">2. Migas Taco</h3>
                  <p className="mb-3">A San Antonio specialty that uses crispy tortilla strips in the eggs.</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>2 eggs scrambled with crushed tortilla chips</li>
                    <li>Diced tomatoes and onions</li>
                    <li>Sliced jalape&ntilde;os</li>
                    <li>Shredded cheese</li>
                    <li>Warm flour tortilla</li>
                    <li>Top with <Link href="/shop" className="text-sunset-600 hover:underline">H-E-B That Green Sauce</Link></li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">3. Chorizo & Egg</h3>
                  <p className="mb-3">The spicy, savory option for those who like heat.</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>1/4 lb Mexican chorizo, crumbled and cooked</li>
                    <li>2 eggs scrambled with the chorizo</li>
                    <li>Cotija cheese crumbles</li>
                    <li>Fresh cilantro</li>
                    <li>Warm flour tortilla</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">4. Potato, Egg & Cheese</h3>
                  <p className="mb-3">The vegetarian favorite that&apos;s still incredibly satisfying.</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Diced potatoes, pan-fried until crispy</li>
                    <li>2 scrambled eggs</li>
                    <li>American or cheddar cheese</li>
                    <li>Pico de gallo</li>
                    <li>Warm flour tortilla</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">5. The Brisket Taco</h3>
                  <p className="mb-3">Using leftover BBQ brisket—a Texas innovation.</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>1/4 lb chopped brisket, warmed</li>
                    <li>2 scrambled eggs</li>
                    <li>Caramelized onions</li>
                    <li>Shredded cheddar</li>
                    <li>Warm <Link href="/shop" className="text-sunset-600 hover:underline">butter tortilla</Link></li>
                    <li>BBQ sauce or salsa verde</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">The Perfect Scrambled Eggs</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  The secret to great breakfast tacos starts with properly cooked eggs. Texans prefer them soft and fluffy, not dry or rubbery.
                </p>

                <ol className="list-decimal pl-6 space-y-3">
                  <li><strong>Use butter, not oil:</strong> Melt 1 tablespoon of butter in a non-stick pan over medium-low heat.</li>
                  <li><strong>Beat with intention:</strong> Whisk eggs vigorously with a splash of milk until fully combined and slightly frothy.</li>
                  <li><strong>Low and slow:</strong> Pour eggs into the warm butter. Let them sit for 30 seconds, then gently push from the edges toward the center.</li>
                  <li><strong>Take them off early:</strong> Remove from heat when they&apos;re still slightly wet. They&apos;ll continue cooking from residual heat.</li>
                  <li><strong>Season at the end:</strong> Salt and pepper after cooking to avoid breaking down the eggs.</li>
                </ol>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Regional Variations</h2>
              <div className="text-charcoal-800 space-y-4">

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">Austin Style</h3>
                <p>
                  Austin breakfast tacos tend to be creative and eclectic, reflecting the city&apos;s food truck culture. Expect unusual combinations like avocado crema, roasted vegetables, and fusion influences. The tortillas are usually smaller, and tacos are often served in pairs or trios.
                </p>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">San Antonio Style</h3>
                <p>
                  San Antonio keeps it traditional and generous. Portions are bigger, flour tortillas are thicker and softer, and classic combinations rule. Migas tacos originated here, and the city takes pride in its authentic Mexican-American breakfast culture.
                </p>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">Houston Style</h3>
                <p>
                  Houston&apos;s diversity shows in its breakfast tacos. You&apos;ll find Vietnamese-Tex-Mex fusion, Gulf seafood tacos (shrimp and egg!), and more adventurous combinations. Corn tortillas are more common here than in other Texas cities.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Essential Salsas & Condiments</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  A breakfast taco isn&apos;t complete without the right salsa. Here are the essentials:
                </p>

                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Salsa Verde (Green Sauce):</strong> Tangy, slightly spicy, and the most versatile option. <Link href="/shop" className="text-sunset-600 hover:underline">H-E-B That Green Sauce</Link> is legendary.</li>
                  <li><strong>Salsa Roja:</strong> Classic red salsa—tomato-based with chiles. Good for heartier fillings.</li>
                  <li><strong>Pico de Gallo:</strong> Fresh, chunky, and adds crunch. Best for lighter tacos.</li>
                  <li><strong>Cholula or Valentina:</strong> When you want heat without overwhelming flavor.</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Hosting a Breakfast Taco Bar</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Want to impress guests? Set up a build-your-own breakfast taco bar. Here&apos;s how:
                </p>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">For 10 People</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>20-30 flour tortillas (plan 2-3 per person)</li>
                  <li>18 eggs, scrambled</li>
                  <li>1 lb bacon, cooked and crumbled</li>
                  <li>1 lb breakfast sausage, cooked</li>
                  <li>2 cups shredded cheese</li>
                  <li>Various salsas and hot sauces</li>
                  <li>Sliced avocado</li>
                  <li>Pico de gallo</li>
                  <li>Sour cream</li>
                </ul>

                <p className="mt-4">
                  Keep tortillas warm in a tortilla warmer or wrapped in foil in a low oven (200&deg;F). Provide tongs for self-service and small plates for assembly.
                </p>

                <p>
                  Use our <Link href="/tools/party-calculator" className="text-sunset-600 hover:underline">Party Calculator</Link> to get exact quantities for your event!
                </p>
              </div>
            </section>

            <div className="bg-gradient-to-r from-rust-600 to-sunset-600 text-cream-50 rounded-xl p-8 text-center mt-12">
              <h2 className="text-3xl font-bold mb-4">Start Your Morning Right</h2>
              <p className="text-xl mb-6 text-cream-100">
                Get authentic Texas tortillas delivered with FREE shipping
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/shop"
                  className="inline-block bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Shop Tortillas
                </Link>
                <Link
                  href="/tools/party-calculator"
                  className="inline-block bg-transparent border-2 border-cream-50 hover:bg-cream-50/10 text-cream-50 px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Plan Your Taco Party
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
