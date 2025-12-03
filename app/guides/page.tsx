import type { Metadata } from 'next';
import Link from 'next/link';
import { GuideCard } from '@/components/GuideCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Tortilla Guides & Tips',
  description: 'Expert guides on storing, reheating, and choosing tortillas. Learn how to keep your H-E-B® tortillas fresh, compare corn vs flour, and master authentic Texas techniques.',
  keywords: 'tortilla storage guide, how to reheat tortillas, corn vs flour tortillas, tortilla tips, H-E-B tortilla guide, keeping tortillas fresh, tortilla techniques',
  openGraph: {
    title: 'Tortilla Guides & Tips | Lonestar Tortillas',
    description: 'Expert guides for getting the most out of your tortillas. Storage tips, reheating methods, and more.',
    type: 'website',
  },
};

const guides = [
  {
    title: 'How to Store Tortillas',
    description: 'Learn the best ways to store tortillas for maximum freshness. Room temperature, refrigeration, freezing methods, and shelf life explained.',
    href: '/guides/how-to-store-tortillas',
    readTime: '5 min read',
    category: 'Storage',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
  },
  {
    title: 'How to Freeze Tortillas',
    description: 'Complete guide to freezing corn and flour tortillas for long-term storage. Learn proper freezing methods, thawing techniques, and storage duration.',
    href: '/guides/how-to-freeze-tortillas',
    readTime: '6 min read',
    category: 'Storage',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L9 9l-7 1 5.5 5L6 22l6-3.5L18 22l-1.5-7L22 10l-7-1-3-7z" />
      </svg>
    ),
  },
  {
    title: 'How to Reheat Tortillas',
    description: 'Master the art of warming tortillas to perfection. Discover the best methods for stovetop, microwave, oven, and more for soft, pliable results.',
    href: '/guides/how-to-reheat-tortillas',
    readTime: '4 min read',
    category: 'Technique',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
    ),
  },
  {
    title: 'How to Make Fresh Tortillas',
    description: 'Learn how to make authentic flour and corn tortillas from scratch at home. Step-by-step instructions with ingredients, techniques, and troubleshooting tips.',
    href: '/guides/how-to-make-tortillas',
    readTime: '8 min read',
    category: 'Technique',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
  {
    title: 'How to Crisp & Toast Tortillas',
    description: 'Master every method for perfectly crispy or toasted tortillas. From tostadas to tortilla chips, learn oven, stovetop, and frying techniques.',
    href: '/guides/how-to-crisp-tortillas',
    readTime: '6 min read',
    category: 'Technique',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Corn vs Flour Tortillas',
    description: 'Complete comparison guide to help you choose the right tortilla. Learn about taste, texture, nutrition, uses, and when to use each type.',
    href: '/guides/corn-vs-flour-tortillas',
    readTime: '6 min read',
    category: 'Comparison',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Best Tortillas for Every Dish',
    description: 'Never wonder which tortilla to use again. Complete guide to choosing corn vs flour for tacos, burritos, enchiladas, quesadillas, and more.',
    href: '/guides/best-tortillas-for-every-dish',
    readTime: '7 min read',
    category: 'Choosing',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: 'Tortilla Nutrition Guide',
    description: 'Complete nutritional breakdown of corn and flour tortillas. Calories, carbs, protein, fiber, and health benefits explained with comparison table.',
    href: '/guides/tortilla-nutrition',
    readTime: '6 min read',
    category: 'Nutrition',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Tortilla Size Guide',
    description: 'Learn which size tortilla to use for every dish. Complete guide for tacos, burritos, quesadillas, and more. From 6-inch to 12-inch explained.',
    href: '/guides/tortilla-sizes',
    readTime: '5 min read',
    category: 'Choosing',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
      </svg>
    ),
  },
  {
    title: 'Gluten-Free Tortillas Guide',
    description: 'Complete guide to gluten-free tortillas. Learn about corn tortillas, gluten-free flour alternatives, cross-contamination, and celiac-safe choices.',
    href: '/guides/gluten-free-tortillas',
    readTime: '6 min read',
    category: 'Health',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Texas BBQ & H-E-B® Tortillas Guide',
    description: 'The complete guide to pairing Texas BBQ with authentic H-E-B® tortillas. Learn the science, techniques, and business case for why real tortillas are essential for BBQ perfection.',
    href: '/guides/bbq-tortillas-guide',
    readTime: '15 min read',
    category: 'BBQ & Pairing',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
    ),
  },
  {
    title: 'Best Tortillas for Street Tacos',
    description: 'Discover the perfect tortillas for street tacos. Learn why small corn tortillas are essential for authentic taqueria-style tacos, plus warming tips.',
    href: '/guides/street-tacos-tortillas',
    readTime: '6 min read',
    category: 'Choosing',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
  {
    title: 'Sonoran Style Tortillas',
    description: 'Learn what makes Sonoran style flour tortillas unique. The thin, stretchy texture, lard-based recipe, and cooking techniques from Northern Mexico.',
    href: '/guides/sonoran-style-tortillas',
    readTime: '7 min read',
    category: 'Regional',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
  },
  {
    title: 'Blue Corn Tortillas Guide',
    description: 'Learn about blue corn tortillas - their unique nutrition benefits, earthy flavor, and best uses. Why blue corn tortillas are gaining popularity.',
    href: '/guides/blue-corn-tortillas',
    readTime: '6 min read',
    category: 'Nutrition',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: 'Tortilla Ingredients Guide',
    description: 'Learn what ingredients make authentic corn and flour tortillas. Understand masa, nixtamalization, lard vs oil, and quality ingredient standards.',
    href: '/guides/tortilla-ingredients',
    readTime: '7 min read',
    category: 'Education',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: 'Best Tortillas for Burritos',
    description: 'Find the best tortillas for burritos. Learn about sizes, flour vs corn, and techniques for perfect burrito rolling every time.',
    href: '/guides/best-tortillas-for-burritos',
    readTime: '6 min read',
    category: 'Choosing',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
      </svg>
    ),
  },
  {
    title: 'Homemade vs Store-Bought Tortillas',
    description: 'Compare homemade and store-bought tortillas. Cost, time, quality, and taste - find out which option is right for your kitchen.',
    href: '/guides/homemade-vs-store-bought',
    readTime: '7 min read',
    category: 'Comparison',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
];

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Tortilla Guides & Tips',
  description: 'Expert guides on storing, reheating, and choosing the best tortillas for your needs.',
  url: 'https://lonestartortillas.com/guides',
  hasPart: guides.map(guide => ({
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    url: `https://lonestartortillas.com${guide.href}`,
  })),
};

export default function GuidesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 via-cream-100 to-masa-50">
        {/* Header */}
        <header className="bg-charcoal-950 text-cream-50 py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Guides' },
              ]}
              className="mb-6 text-cream-300"
            />
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-display">
              Tortilla Guides & Tips
            </h1>
            <p className="text-xl text-cream-100 max-w-3xl">
              Master the art of tortillas with our expert guides. Learn proper storage, reheating techniques,
              and how to choose the perfect tortilla for any dish.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12 md:py-16 max-w-6xl">
          {/* Introduction */}
          <section className="mb-12">
            <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg">
              <h2 className="text-2xl font-bold text-charcoal-950 mb-3">
                Why Proper Tortilla Care Matters
              </h2>
              <p className="text-lg text-charcoal-800 leading-relaxed">
                Quality tortillas deserve proper care. Whether you're storing authentic{' '}
                <Link href="/products/flour-tortillas" className="text-sunset-600 hover:underline font-medium">
                  H-E-B® flour tortillas
                </Link>{' '}
                or traditional{' '}
                <Link href="/products/corn-tortillas" className="text-sunset-600 hover:underline font-medium">
                  corn tortillas
                </Link>
                , these guides will help you maintain their freshness, texture, and authentic taste for weeks.
              </p>
            </div>
          </section>

          {/* Guides Grid */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8">
              All Guides
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {guides.map((guide) => (
                <GuideCard
                  key={guide.href}
                  title={guide.title}
                  description={guide.description}
                  href={guide.href}
                  icon={guide.icon}
                  readTime={guide.readTime}
                  category={guide.category}
                />
              ))}
            </div>
          </section>

          {/* Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8">
              Browse by Category
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Storage Tips</h3>
                <p className="text-charcoal-700 mb-4">
                  Keep your tortillas fresh for weeks with proper storage techniques.
                </p>
                <Link
                  href="/guides/how-to-store-tortillas"
                  className="text-sunset-600 hover:text-sunset-700 font-semibold text-sm flex items-center gap-1"
                >
                  Read Storage Guide
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Cooking Techniques</h3>
                <p className="text-charcoal-700 mb-4">
                  Learn professional methods for warming and preparing tortillas.
                </p>
                <Link
                  href="/guides/how-to-reheat-tortillas"
                  className="text-sunset-600 hover:text-sunset-700 font-semibold text-sm flex items-center gap-1"
                >
                  Read Reheating Guide
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Comparison Guides</h3>
                <p className="text-charcoal-700 mb-4">
                  Understand the differences and choose the right tortilla for your needs.
                </p>
                <Link
                  href="/guides/corn-vs-flour-tortillas"
                  className="text-sunset-600 hover:text-sunset-700 font-semibold text-sm flex items-center gap-1"
                >
                  Compare Tortillas
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* Quick Tips */}
          <section className="bg-gradient-to-r from-sunset-100 to-masa-100 p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Quick Tips</h2>
            <div className="grid md:grid-cols-2 gap-6 text-charcoal-800">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sunset-500 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold mb-1">Store Properly</h3>
                  <p className="text-sm">Seal tightly after opening and keep in a cool, dry place.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sunset-500 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold mb-1">Warm Before Serving</h3>
                  <p className="text-sm">Always warm tortillas for the best texture and flavor.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sunset-500 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold mb-1">Freeze for Long Storage</h3>
                  <p className="text-sm">Tortillas freeze excellently for up to 6 months.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sunset-500 text-white flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-bold mb-1">Choose the Right Type</h3>
                  <p className="text-sm">Flour for burritos and wraps, corn for traditional tacos.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-charcoal-950 text-cream-50 p-12 rounded-lg text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Try Authentic Texas Tortillas?
            </h2>
            <p className="text-xl mb-8 text-cream-100 max-w-2xl mx-auto">
              Get authentic H-E-B® tortillas delivered to your door. Fresh, shelf-stable, and ready for your kitchen.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
              >
                Shop All Tortillas
              </Link>
              <Link
                href="/recipes/breakfast-tacos"
                className="bg-transparent border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                View Recipes
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
