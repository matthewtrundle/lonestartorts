import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Leftover Brisket: 7 Days of Meals',
  description: 'Transform leftover brisket into a week of incredible meals. Storage tips, reheating methods, and creative recipes using H-E-B® tortillas. Never waste brisket again.',
  keywords: 'leftover brisket recipes, brisket meal prep, how to store brisket, reheat brisket, brisket tacos, brisket breakfast, H-E-B tortillas, brisket quesadillas',
  openGraph: {
    title: 'The Ultimate Guide to Leftover Brisket | 7 Days of Meals',
    description: 'Transform leftover brisket into a week of incredible meals with H-E-B® tortillas.',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Ultimate Guide to Leftover Brisket: 7 Days of Meals with H-E-B® Tortillas',
  description: 'Complete guide to storing, reheating, and transforming leftover brisket into incredible meals',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  datePublished: '2025-11-04',
  dateModified: '2025-11-04',
};

export default function LeftoverBrisketGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        {/* Hero Section */}
        <header className="bg-gradient-to-r from-charcoal-950 via-rust-900 to-charcoal-950 text-cream-50 py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: 'Leftover Brisket Guide' },
              ]}
              className="mb-6 text-cream-300"
            />

            <div className="flex items-center gap-3 mb-4">
              <span className="bg-masa-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                Meal Planning
              </span>
              <span className="text-cream-300 text-sm">16 min read • November 4, 2025</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display">
              The Ultimate Guide to Leftover Brisket: 7 Days of Meals with H-E-B® Tortillas
            </h1>

            <p className="text-xl text-cream-100 leading-relaxed">
              You smoked a 12-pound brisket. Now you have 8 pounds left. Don't let it go to waste. Transform it into a week of incredible meals using H-E-B® tortillas and these pro techniques.
            </p>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Introduction */}
          <section className="mb-12">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
              <Image
                src="/images/blog/leftover-brisket-hero.webp"
                alt="Leftover brisket transformed into multiple meals"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="bg-sunset-50 border-l-4 border-sunset-500 p-8 rounded-r-lg mb-8">
              <p className="text-lg text-charcoal-800">
                <strong>Here's the truth about brisket:</strong> A 12-14 pound packer brisket feeds 6-8 people for one meal. But most of us smoke brisket for 2-4 people. That means you'll have 5-8 pounds of leftovers. This isn't a problem—it's an opportunity.
              </p>
            </div>

            <p className="text-charcoal-800 leading-relaxed mb-4">
              Properly stored and handled, leftover brisket can be transformed into at least 7 different meals over the course of a week. The secret? H-E-B® tortillas. They're the perfect vehicle for brisket because they:
            </p>

            <ul className="list-disc list-inside space-y-2 text-charcoal-800 mb-6 ml-4">
              <li>Handle the high fat content without getting soggy</li>
              <li>Maintain structural integrity when loaded with heavy protein</li>
              <li>Reheat beautifully alongside the brisket</li>
              <li>Transform a simple leftover into a restaurant-quality meal</li>
            </ul>

            <p className="text-charcoal-800 leading-relaxed">
              This guide covers everything: proper storage, reheating techniques, and 7 days of meal ideas that will make you WANT to have leftover brisket.
            </p>
          </section>

          {/* Section 1: Storage */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 pb-2 border-b-4 border-sunset-500">
              Proper Storage: The Foundation
            </h2>

            <p className="text-charcoal-800 leading-relaxed mb-6">
              <strong>Critical rule:</strong> Brisket quality degrades FAST if stored improperly. Follow these exact steps:
            </p>

            <div className="space-y-6">
              {/* Immediate Storage */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🕐</span>
                  Immediate Storage (Within 2 Hours of Cooking)
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-2">Step 1: Cool Properly</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-charcoal-800 ml-4">
                      <li>Let brisket rest wrapped in butcher paper or foil for 30-60 minutes</li>
                      <li>DON'T leave at room temperature longer than 2 hours total</li>
                      <li>Transfer to refrigerator while still slightly warm (130-140°F is okay)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-2">Step 2: Portion Smart</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-charcoal-800 ml-4">
                      <li>Slice or chop only what you're eating immediately</li>
                      <li>Store remaining brisket in large chunks (easier to keep moist)</li>
                      <li>Separate lean from fatty portions for different uses</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-charcoal-900 mb-2">Step 3: Protect from Air</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-charcoal-800 ml-4">
                      <li>Wrap tightly in plastic wrap, then foil (double wrap prevents freezer burn)</li>
                      <li>Or use vacuum sealer for best results (gold standard)</li>
                      <li>Or place in airtight containers with minimal air space</li>
                      <li>Add 2-3 tablespoons of reserved juices/au jus to each container</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Refrigerator Storage */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4 flex items-center gap-2">
                  <span className="text-2xl">❄️</span>
                  Refrigerator Storage (Short-Term: 3-5 Days)
                </h3>

                <div className="bg-sunset-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-charcoal-800">
                    <strong>Ideal for:</strong> Brisket you'll eat within the week. This is your meal prep zone.
                  </p>
                </div>

                <ul className="space-y-2 text-sm text-charcoal-800 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span><strong>Temperature:</strong> 34-38°F (coldest part of fridge, usually bottom shelf)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span><strong>Duration:</strong> 3-5 days maximum for best quality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span><strong>Storage method:</strong> Airtight containers with juices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span><strong>Pro tip:</strong> Store in single-meal portions for easy grab-and-go</span>
                  </li>
                </ul>
              </div>

              {/* Freezer Storage */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🧊</span>
                  Freezer Storage (Long-Term: 2-3 Months)
                </h3>

                <div className="bg-sunset-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-charcoal-800">
                    <strong>Ideal for:</strong> Brisket you won't eat within 5 days. Perfect for future meal prep.
                  </p>
                </div>

                <ul className="space-y-2 text-sm text-charcoal-800 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span><strong>Temperature:</strong> 0°F or below (deep freeze, not frost-free cycle zone)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span><strong>Duration:</strong> 2-3 months for best quality (safe up to 6 months, but quality degrades)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span><strong>Packaging:</strong> Vacuum seal or heavy-duty freezer wrap + foil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span><strong>Label:</strong> Date, cut (flat vs point), weight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sunset-600 font-bold">→</span>
                    <span><strong>Pro tip:</strong> Freeze in 1-2 lb portions for easier thawing</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-rust-100 to-sunset-100 p-6 rounded-lg mt-8">
              <h3 className="text-xl font-bold text-charcoal-950 mb-3">⚠️ Warning Signs: Don't Eat If...</h3>
              <ul className="space-y-2 text-sm text-charcoal-800">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Slimy texture or sticky feel</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Sour or rancid smell (brisket should smell smoky/savory)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Visible mold (white, green, or black spots)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Gray or greenish discoloration (brown/red is normal oxidation)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Stored in fridge longer than 5 days</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: Reheating */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 pb-2 border-b-4 border-sunset-500">
              Reheating Techniques: Keep It Moist
            </h2>

            <p className="text-charcoal-800 leading-relaxed mb-6">
              <strong>The challenge:</strong> Brisket dries out when reheated improperly. Here are four proven methods ranked by quality:
            </p>

            <div className="space-y-6">
              {/* Method 1: Sous Vide */}
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-500">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">BEST</span>
                  <h3 className="text-xl font-bold text-charcoal-950">Method 1: Sous Vide (Gold Standard)</h3>
                </div>

                <p className="text-sm text-charcoal-800 mb-4">
                  <strong>Result:</strong> Perfectly moist, evenly heated, impossible to dry out. Professional quality.
                </p>

                <div className="space-y-3 text-sm text-charcoal-800">
                  <div>
                    <p className="font-bold mb-1">Steps:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-4">
                      <li>Vacuum seal brisket with 2-3 Tbsp beef broth or au jus</li>
                      <li>Set sous vide to 150°F</li>
                      <li>Submerge bag, heat for 45-60 minutes</li>
                      <li>Remove, pat dry, sear briefly on hot griddle (optional)</li>
                      <li>Serve immediately with warm H-E-B® tortillas</li>
                    </ol>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <p className="font-bold text-green-800">Why it works: Water bath provides gentle, even heat. Vacuum seal traps moisture. Perfect for tacos and quesadillas.</p>
                  </div>
                </div>
              </div>

              {/* Method 2: Oven with Liquid */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-sunset-500 text-white px-3 py-1 rounded-full text-xs font-bold">EXCELLENT</span>
                  <h3 className="text-xl font-bold text-charcoal-950">Method 2: Oven with Liquid</h3>
                </div>

                <p className="text-sm text-charcoal-800 mb-4">
                  <strong>Result:</strong> Nearly as good as sous vide, more convenient. Great for larger portions.
                </p>

                <div className="space-y-3 text-sm text-charcoal-800">
                  <div>
                    <p className="font-bold mb-1">Steps:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-4">
                      <li>Preheat oven to 325°F</li>
                      <li>Place brisket in baking dish, add 1/2 cup beef broth</li>
                      <li>Cover tightly with foil (double layer for best results)</li>
                      <li>Heat for 20-30 minutes until internal temp hits 150°F</li>
                      <li>Rest 5 minutes, then serve with H-E-B® tortillas</li>
                    </ol>
                  </div>
                  <div className="bg-sunset-50 p-3 rounded">
                    <p className="font-bold text-sunset-800">Pro tip: Add thinly sliced onions to the pan for extra moisture and flavor boost.</p>
                  </div>
                </div>
              </div>

              {/* Method 3: Stovetop */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-masa-500 text-white px-3 py-1 rounded-full text-xs font-bold">GOOD</span>
                  <h3 className="text-xl font-bold text-charcoal-950">Method 3: Stovetop Sauté</h3>
                </div>

                <p className="text-sm text-charcoal-800 mb-4">
                  <strong>Result:</strong> Quick, adds crispy edges, good for chopped brisket tacos.
                </p>

                <div className="space-y-3 text-sm text-charcoal-800">
                  <div>
                    <p className="font-bold mb-1">Steps:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-4">
                      <li>Chop brisket into 1/2-inch pieces</li>
                      <li>Heat cast iron skillet to medium-high, add 1 Tbsp butter</li>
                      <li>Add brisket, spread in single layer</li>
                      <li>Add 1/4 cup beef broth, cover immediately</li>
                      <li>Steam for 3-4 minutes, uncover, toss, serve</li>
                    </ol>
                  </div>
                  <div className="bg-masa-50 p-3 rounded">
                    <p className="font-bold text-masa-800">Perfect for: Quick breakfast tacos when you're in a rush.</p>
                  </div>
                </div>
              </div>

              {/* Method 4: Microwave */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-charcoal-400 text-white px-3 py-1 rounded-full text-xs font-bold">ACCEPTABLE</span>
                  <h3 className="text-xl font-bold text-charcoal-950">Method 4: Microwave (Last Resort)</h3>
                </div>

                <p className="text-sm text-charcoal-800 mb-4">
                  <strong>Result:</strong> Fast but can dry out. Use only when time-constrained.
                </p>

                <div className="space-y-3 text-sm text-charcoal-800">
                  <div>
                    <p className="font-bold mb-1">Steps:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-4">
                      <li>Place brisket in microwave-safe dish</li>
                      <li>Add 3-4 Tbsp beef broth or water</li>
                      <li>Cover with microwave-safe lid (NOT plastic wrap—traps steam)</li>
                      <li>Heat on 50% power for 2 minutes, check, repeat if needed</li>
                      <li>Let stand 1 minute before serving</li>
                    </ol>
                  </div>
                  <div className="bg-charcoal-100 p-3 rounded">
                    <p className="font-bold text-charcoal-800">⚠️ Never microwave on full power—creates hot spots and dries edges.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: 7-Day Meal Plan */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 pb-2 border-b-4 border-sunset-500">
              7 Days of Brisket Meals with H-E-B® Tortillas
            </h2>

            <p className="text-charcoal-800 leading-relaxed mb-8">
              Here's a complete week of meals using that leftover brisket. Each meal takes 15-30 minutes max and showcases H-E-B® tortillas in different applications.
            </p>

            <div className="space-y-8">
              {/* Day 1 */}
              <div className="bg-gradient-to-r from-sunset-50 to-masa-50 p-6 rounded-lg border-l-4 border-rust-600">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-rust-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">1</span>
                  <div>
                    <h3 className="text-2xl font-bold text-charcoal-950">Classic Brisket Tacos</h3>
                    <p className="text-sm text-charcoal-700">Monday Dinner • 20 minutes</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="font-bold text-charcoal-900 mb-1">Ingredients:</p>
                    <ul className="text-sm text-charcoal-800 list-disc list-inside ml-4">
                      <li>8 oz sliced brisket (reheated)</li>
                      <li>6 H-E-B® flour tortillas (8-inch)</li>
                      <li>Pickled red onions, fresh cilantro, lime wedges</li>
                    </ul>
                  </div>
                  <Link href="/recipes/brisket-tacos" className="inline-block text-sunset-600 hover:text-sunset-700 font-semibold text-sm">
                    View Full Recipe →
                  </Link>
                </div>
              </div>

              {/* Day 2 */}
              <div className="bg-gradient-to-r from-masa-50 to-cream-100 p-6 rounded-lg border-l-4 border-sunset-600">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-sunset-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">2</span>
                  <div>
                    <h3 className="text-2xl font-bold text-charcoal-950">Brisket Breakfast Burrito</h3>
                    <p className="text-sm text-charcoal-700">Tuesday Breakfast • 25 minutes</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="font-bold text-charcoal-900 mb-1">Ingredients:</p>
                    <ul className="text-sm text-charcoal-800 list-disc list-inside ml-4">
                      <li>6 oz chopped brisket (reheated)</li>
                      <li>4 H-E-B® flour tortillas (10-12 inch)</li>
                      <li>8 eggs (scrambled), crispy potatoes, cheese, salsa</li>
                    </ul>
                  </div>
                  <Link href="/recipes/brisket-breakfast-burrito" className="inline-block text-sunset-600 hover:text-sunset-700 font-semibold text-sm">
                    View Full Recipe →
                  </Link>
                </div>
              </div>

              {/* Day 3 */}
              <div className="bg-gradient-to-r from-rust-50 to-sunset-50 p-6 rounded-lg border-l-4 border-masa-600">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-masa-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">3</span>
                  <div>
                    <h3 className="text-2xl font-bold text-charcoal-950">Crispy Brisket Quesadillas</h3>
                    <p className="text-sm text-charcoal-700">Wednesday Lunch • 15 minutes</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="font-bold text-charcoal-900 mb-1">Ingredients:</p>
                    <ul className="text-sm text-charcoal-800 list-disc list-inside ml-4">
                      <li>8 oz chopped brisket (reheated)</li>
                      <li>8 H-E-B® flour tortillas (8-inch)</li>
                      <li>2 cups shredded cheese, butter for grilling</li>
                    </ul>
                  </div>
                  <Link href="/recipes/brisket-quesadillas" className="inline-block text-sunset-600 hover:text-sunset-700 font-semibold text-sm">
                    View Full Recipe →
                  </Link>
                </div>
              </div>

              {/* Day 4 */}
              <div className="bg-gradient-to-r from-cream-100 to-sunset-50 p-6 rounded-lg border-l-4 border-rust-600">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-rust-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">4</span>
                  <div>
                    <h3 className="text-2xl font-bold text-charcoal-950">BBQ Brisket Nachos</h3>
                    <p className="text-sm text-charcoal-700">Thursday Dinner • 20 minutes</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="font-bold text-charcoal-900 mb-1">Ingredients:</p>
                    <ul className="text-sm text-charcoal-800 list-disc list-inside ml-4">
                      <li>10 oz chopped brisket (reheated with BBQ sauce)</li>
                      <li>H-E-B® corn tortillas (cut into chips, fried)</li>
                      <li>Cheese sauce, jalapeños, sour cream, cilantro</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-sm text-charcoal-800">
                    <p className="font-bold mb-1">Pro Tip:</p>
                    <p>Cut H-E-B® corn tortillas into triangles, fry at 350°F for 2-3 minutes. Way better than bagged chips.</p>
                  </div>
                </div>
              </div>

              {/* Day 5 */}
              <div className="bg-gradient-to-r from-sunset-50 to-masa-50 p-6 rounded-lg border-l-4 border-sunset-600">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-sunset-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">5</span>
                  <div>
                    <h3 className="text-2xl font-bold text-charcoal-950">Brisket & Egg Tacos</h3>
                    <p className="text-sm text-charcoal-700">Friday Breakfast • 15 minutes</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="font-bold text-charcoal-900 mb-1">Ingredients:</p>
                    <ul className="text-sm text-charcoal-800 list-disc list-inside ml-4">
                      <li>6 oz chopped brisket (reheated)</li>
                      <li>6 H-E-B® flour tortillas (8-inch)</li>
                      <li>6 eggs (scrambled or fried), cheese, hot sauce</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-sm text-charcoal-800">
                    <p className="font-bold mb-1">Quick Version:</p>
                    <p>Reheat brisket and eggs simultaneously in same pan. 8 minutes start to finish.</p>
                  </div>
                </div>
              </div>

              {/* Day 6 */}
              <div className="bg-gradient-to-r from-masa-50 to-cream-100 p-6 rounded-lg border-l-4 border-masa-600">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-masa-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">6</span>
                  <div>
                    <h3 className="text-2xl font-bold text-charcoal-950">Brisket Fajitas</h3>
                    <p className="text-sm text-charcoal-700">Saturday Dinner • 25 minutes</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="font-bold text-charcoal-900 mb-1">Ingredients:</p>
                    <ul className="text-sm text-charcoal-800 list-disc list-inside ml-4">
                      <li>10 oz sliced brisket (reheated)</li>
                      <li>8 H-E-B® flour tortillas (8-inch, warmed)</li>
                      <li>Sautéed peppers & onions, guacamole, sour cream</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-sm text-charcoal-800">
                    <p className="font-bold mb-1">Presentation:</p>
                    <p>Serve on a sizzling cast iron skillet for restaurant-style fajitas at home.</p>
                  </div>
                </div>
              </div>

              {/* Day 7 */}
              <div className="bg-gradient-to-r from-rust-50 to-sunset-50 p-6 rounded-lg border-l-4 border-rust-600">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-rust-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">7</span>
                  <div>
                    <h3 className="text-2xl font-bold text-charcoal-950">Brisket Taco Salad Bowls</h3>
                    <p className="text-sm text-charcoal-700">Sunday Lunch • 20 minutes</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="font-bold text-charcoal-900 mb-1">Ingredients:</p>
                    <ul className="text-sm text-charcoal-800 list-disc list-inside ml-4">
                      <li>Remaining brisket (reheated, chopped)</li>
                      <li>H-E-B® flour tortillas (10-inch, shaped into bowls)</li>
                      <li>Romaine, black beans, corn, pico de gallo, ranch dressing</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-sm text-charcoal-800">
                    <p className="font-bold mb-1">How to Make Bowls:</p>
                    <p>Drape tortilla over inverted oven-safe bowl. Bake at 375°F for 10 minutes until crispy and bowl-shaped.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Meal Prep Strategy */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 pb-2 border-b-4 border-sunset-500">
              Sunday Meal Prep Strategy
            </h2>

            <div className="bg-gradient-to-r from-sunset-100 to-masa-100 p-8 rounded-lg">
              <p className="text-lg text-charcoal-800 mb-6">
                <strong>Pro strategy:</strong> Spend 45 minutes on Sunday prepping brisket portions for the week. Makes weeknight dinners effortless.
              </p>

              <div className="space-y-4">
                <div className="bg-white p-5 rounded-lg">
                  <h3 className="font-bold text-charcoal-950 mb-2">Portioning System</h3>
                  <ul className="text-sm text-charcoal-800 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-sunset-600">→</span>
                      <span><strong>Container 1:</strong> 1 lb chopped brisket (for tacos, quesadillas, nachos)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-sunset-600">→</span>
                      <span><strong>Container 2:</strong> 1 lb sliced brisket (for fajitas, sandwiches)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-sunset-600">→</span>
                      <span><strong>Container 3:</strong> 1 lb mixed (breakfast burritos, eggs)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-sunset-600">→</span>
                      <span><strong>Freezer:</strong> Remaining brisket in vacuum-sealed 1 lb portions</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg">
                  <h3 className="font-bold text-charcoal-950 mb-2">Label Everything</h3>
                  <p className="text-sm text-charcoal-800 mb-3">
                    Use masking tape and permanent marker. Include:
                  </p>
                  <ul className="text-sm text-charcoal-800 list-disc list-inside ml-4 space-y-1">
                    <li>"Brisket - Chopped" or "Brisket - Sliced"</li>
                    <li>Date packaged</li>
                    <li>Weight (helpful for meal planning)</li>
                    <li>"Use by" date (fridge: 5 days, freezer: 2-3 months)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Related Content */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Master Your Brisket Game</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/recipes/brisket-tacos" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Brisket Tacos Recipe</h3>
                <p className="text-charcoal-700 text-sm mb-3">Classic recipe that started it all.</p>
                <span className="text-sunset-600 font-semibold text-sm">View Recipe →</span>
              </Link>

              <Link href="/guides/bbq-tortillas-guide" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">BBQ & Tortillas Guide</h3>
                <p className="text-charcoal-700 text-sm mb-3">Master BBQ pairings with tortillas.</p>
                <span className="text-sunset-600 font-semibold text-sm">Read Guide →</span>
              </Link>

              <Link href="/guides/how-to-store-tortillas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Tortilla Storage Guide</h3>
                <p className="text-charcoal-700 text-sm mb-3">Keep H-E-B tortillas fresh for weeks.</p>
                <span className="text-sunset-600 font-semibold text-sm">Read Guide →</span>
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-charcoal-950 text-cream-50 p-12 rounded-lg text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stock Up on H-E-B® Tortillas</h2>
            <p className="text-xl mb-8 text-cream-100 max-w-2xl mx-auto">
              Never let leftover brisket go to waste. Get authentic H-E-B® tortillas delivered and transform BBQ leftovers into a week of incredible meals.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
            >
              Shop H-E-B® Tortillas
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}
