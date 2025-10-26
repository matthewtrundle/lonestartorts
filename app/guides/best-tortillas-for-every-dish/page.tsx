import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { TacoIcon, BurritoIcon, CheeseIcon, FlameIcon, PepperIcon } from '@/components/ui/Icons';
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Best Tortillas for Every Dish | Corn vs Flour Guide',
  description: 'Learn which tortilla type to use for tacos, burritos, enchiladas, quesadillas, and more. Complete guide to choosing corn vs flour tortillas for any dish.',
  keywords: 'best tortillas for tacos, corn vs flour tortillas, tortilla for enchiladas, tortilla for quesadillas, which tortilla to use',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/best-tortillas-for-every-dish',
  },
  openGraph: {
    title: 'Best Tortillas for Every Dish | Complete Guide',
    description: 'Never wonder which tortilla to use again. Complete guide for every dish.',
    type: 'article',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Should I use corn or flour tortillas for tacos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use corn tortillas for authentic Mexican street tacos. They have better flavor and texture for traditional fillings like carne asada, al pastor, and carnitas. Use flour tortillas for Tex-Mex style tacos with heavier fillings like fajitas or breakfast tacos.'
      }
    },
    {
      '@type': 'Question',
      name: 'What tortillas are best for burritos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Always use flour tortillas for burritos. Their pliability and strength make them perfect for wrapping and holding heavy fillings without tearing. Use 10-inch or 12-inch burrito-size flour tortillas. Corn tortillas are too small and will crack when rolled.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can you use flour tortillas for enchiladas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'While traditionally made with corn tortillas, you can use flour tortillas for enchiladas if you prefer softer texture. Corn tortillas are authentic and hold up better to sauce without getting soggy. If using flour, choose smaller 6-8 inch tortillas.'
      }
    }
  ]
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best Tortillas for Every Dish',
  description: 'Complete guide to choosing the right tortilla type for every Mexican and Tex-Mex dish.',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  datePublished: '2025-10-24',
  dateModified: '2025-10-25',
};

export default function BestTortillasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/guides" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">← Back to Guides</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Best Tortillas for Every Dish</h1>
            <p className="text-cream-300 mt-4 text-lg">The ultimate guide to choosing corn vs flour for any recipe</p>
          </div>
        </header>
        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/generated/guide-best-tortillas-for-every-dish.webp"
              alt="Variety of tortilla dishes including tacos, burritos, and quesadillas"
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
              <strong>Use corn tortillas for:</strong> Street tacos, enchiladas, tostadas, taquitos, authentic Mexican dishes. <strong>Use flour tortillas for:</strong> Burritos, quesadillas, fajitas, soft tacos, wraps, Tex-Mex dishes. <strong>Either works for:</strong> Breakfast tacos, chimichangas.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">The Definitive Guide</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl"><TacoIcon className="inline-block text-sunset-600" size={20} /></span>
                  <h3 className="text-2xl font-bold text-charcoal-950">Tacos</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-masa-50 p-4 rounded">
                    <p className="font-bold text-charcoal-950 mb-2">✓ Corn Tortillas (Preferred)</p>
                    <p className="text-sm text-charcoal-800">Authentic Mexican street tacos with carne asada, al pastor, carnitas, barbacoa, fish. The traditional choice that lets the filling shine.</p>
                  </div>
                  <div className="bg-sunset-50 p-4 rounded">
                    <p className="font-bold text-charcoal-950 mb-2">✓ Flour Tortillas (Alternative)</p>
                    <p className="text-sm text-charcoal-800">Tex-Mex style, breakfast tacos, fajita tacos. Better for heavier, saucier fillings that might soak through corn.</p>
                  </div>
                </div>
                <p className="text-xs text-charcoal-600 mt-3 italic">💡 Pro tip: For street tacos, use two small <Link href="/products/corn-tortillas" className="text-sunset-600 hover:underline">corn tortillas</Link> per taco like in Mexico!</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl"><BurritoIcon className="inline-block text-masa-600" size={20} /></span>
                  <h3 className="text-2xl font-bold text-charcoal-950">Burritos</h3>
                </div>
                <div className="bg-sunset-50 p-4 rounded">
                  <p className="font-bold text-charcoal-950 mb-2">✓ Flour Tortillas ONLY</p>
                  <p className="text-sm text-charcoal-800 mb-2">
                    Flour tortillas are the ONLY choice for burritos. Their pliability and strength make them perfect for wrapping without tearing. Corn tortillas will crack and can't hold the generous fillings.
                  </p>
                  <p className="text-xs text-charcoal-600"><strong>Size:</strong> 10-12 inch burrito-size <Link href="/products/flour-tortillas" className="text-sunset-600 hover:underline">flour tortillas</Link></p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl"><CheeseIcon className="inline-block text-yellow-500" size={18} /></span>
                  <h3 className="text-2xl font-bold text-charcoal-950">Quesadillas</h3>
                </div>
                <div className="bg-sunset-50 p-4 rounded">
                  <p className="font-bold text-charcoal-950 mb-2">✓ Flour Tortillas (Strongly Preferred)</p>
                  <p className="text-sm text-charcoal-800 mb-2">
                    Flour tortillas create the perfect melty, gooey quesadilla. They crisp up beautifully while staying soft enough to bite through. Corn tortillas can work but are more prone to cracking and don't melt cheese as well.
                  </p>
                  <p className="text-xs text-charcoal-600"><strong>Size:</strong> 8-10 inch flour tortillas</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">🫔</span>
                  <h3 className="text-2xl font-bold text-charcoal-950">Enchiladas</h3>
                </div>
                <div className="bg-masa-50 p-4 rounded">
                  <p className="font-bold text-charcoal-950 mb-2">✓ Corn Tortillas (Traditional)</p>
                  <p className="text-sm text-charcoal-800 mb-2">
                    Corn tortillas are traditional for enchiladas. They hold up better to sauce without getting soggy and have authentic flavor. Lightly frying them first makes them even more resilient. Flour tortillas work but can get mushy.
                  </p>
                  <p className="text-xs text-charcoal-600"><strong>Size:</strong> 6-inch corn tortillas</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">🫓</span>
                  <h3 className="text-2xl font-bold text-charcoal-950">Fajitas</h3>
                </div>
                <div className="bg-sunset-50 p-4 rounded">
                  <p className="font-bold text-charcoal-950 mb-2">✓ Flour Tortillas</p>
                  <p className="text-sm text-charcoal-800 mb-2">
                    Fajitas are Tex-Mex, and flour tortillas are the traditional choice. They're perfect for wrapping the sizzling peppers, onions, and meat without tearing. The soft texture complements the crunchy vegetables.
                  </p>
                  <p className="text-xs text-charcoal-600"><strong>Size:</strong> 8-inch flour tortillas. See our <Link href="/recipes/chicken-fajitas" className="text-sunset-600 hover:underline">fajitas recipe</Link>!</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">🍳</span>
                  <h3 className="text-2xl font-bold text-charcoal-950">Breakfast Tacos</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-sunset-50 p-4 rounded">
                    <p className="font-bold text-charcoal-950 mb-2">✓ Flour (Texas Style)</p>
                    <p className="text-sm text-charcoal-800">The traditional Texas breakfast taco uses soft flour tortillas. Perfect for eggs, bacon, and breakfast fillings.</p>
                  </div>
                  <div className="bg-masa-50 p-4 rounded">
                    <p className="font-bold text-charcoal-950 mb-2">✓ Corn (Alternative)</p>
                    <p className="text-sm text-charcoal-800">Authentic Mexican breakfast uses corn tortillas. Works great with beans, eggs, and salsa.</p>
                  </div>
                </div>
                <p className="text-xs text-charcoal-600 mt-3">Both work—it's personal preference! Try our <Link href="/recipes/breakfast-tacos" className="text-sunset-600 hover:underline">breakfast taco recipe</Link>.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl"><TacoIcon className="inline-block text-sunset-600" size={20} /></span>
                  <h3 className="text-2xl font-bold text-charcoal-950">Tostadas</h3>
                </div>
                <div className="bg-masa-50 p-4 rounded">
                  <p className="font-bold text-charcoal-950 mb-2">✓ Corn Tortillas ONLY</p>
                  <p className="text-sm text-charcoal-800">
                    Tostadas are fried flat corn tortillas. Flour tortillas don't crisp up the same way and won't give you that authentic crunchy base. Use 6-inch corn tortillas and fry or bake until crispy.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl"><TacoIcon className="inline-block text-sunset-600" size={20} /></span>
                  <h3 className="text-2xl font-bold text-charcoal-950">Taquitos / Flautas</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-masa-50 p-4 rounded">
                    <p className="font-bold text-charcoal-950 mb-2">✓ Corn (Taquitos)</p>
                    <p className="text-sm text-charcoal-800">Small, rolled, fried corn tortillas. Traditional and authentic with crispy texture.</p>
                  </div>
                  <div className="bg-sunset-50 p-4 rounded">
                    <p className="font-bold text-charcoal-950 mb-2">✓ Flour (Flautas)</p>
                    <p className="text-sm text-charcoal-800">Larger rolled tortillas. Flour creates a different texture—softer and flakier when fried.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl"><PepperIcon className="inline-block text-red-600" size={18} /></span>
                  <h3 className="text-2xl font-bold text-charcoal-950">Chimichangas</h3>
                </div>
                <div className="bg-sunset-50 p-4 rounded">
                  <p className="font-bold text-charcoal-950 mb-2">✓ Flour Tortillas</p>
                  <p className="text-sm text-charcoal-800">
                    These deep-fried burritos require flour tortillas. The flour creates that perfect golden, crispy exterior while staying soft inside. Use burrito-size (10-12 inch) flour tortillas.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">General Rules of Thumb</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🇲🇽</span>
                <div>
                  <p className="font-bold text-charcoal-950">Mexican dishes → Corn Tortillas</p>
                  <p className="text-sm text-charcoal-800">Street tacos, enchiladas, tostadas, traditional Mexican cuisine favors corn.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🤠</span>
                <div>
                  <p className="font-bold text-charcoal-950">Tex-Mex dishes → Flour Tortillas</p>
                  <p className="text-sm text-charcoal-800">Burritos, fajitas, quesadillas, chimichangas—Texas style uses flour.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">💧</span>
                <div>
                  <p className="font-bold text-charcoal-950">Heavy/saucy fillings → Flour Tortillas</p>
                  <p className="text-sm text-charcoal-800">Flour holds up better to moisture and weight without tearing.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0"><FlameIcon className="inline-block text-orange-500" size={18} /></span>
                <div>
                  <p className="font-bold text-charcoal-950">Grilled/charred flavor → Corn Tortillas</p>
                  <p className="text-sm text-charcoal-800">Corn tortillas develop amazing char and toasted flavor.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🌾</span>
                <div>
                  <p className="font-bold text-charcoal-950">Gluten-free → Corn Tortillas</p>
                  <p className="text-sm text-charcoal-800">100% corn tortillas are naturally gluten-free. See our <Link href="/guides/gluten-free-tortillas" className="text-sunset-600 hover:underline">gluten-free guide</Link>.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Still Not Sure? Here's How to Decide</h2>
            <div className="bg-charcoal-50 p-8 rounded-lg">
              <div className="space-y-4">
                <p className="text-charcoal-800"><strong>Ask yourself these questions:</strong></p>
                <ol className="list-decimal pl-6 space-y-3 text-charcoal-800">
                  <li><strong>Is it a wrapped/rolled dish?</strong> → Use flour (burritos, wraps, chimichangas)</li>
                  <li><strong>Is it a traditional Mexican street food?</strong> → Use corn (street tacos, tostadas)</li>
                  <li><strong>Does it need to hold a lot of filling?</strong> → Use flour (sturdier, more pliable)</li>
                  <li><strong>Will it get fried or crisped?</strong> → Corn crisps better, flour gets flakier</li>
                  <li><strong>Is flavor or texture more important?</strong> → Corn for flavor, flour for softness</li>
                </ol>
                <p className="text-sm text-charcoal-600 italic mt-6">When in doubt, go with tradition! Mexican = corn, Tex-Mex = flour.</p>
              </div>
            </div>
          </section>

          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Stock Up on Both!</h2>
            <p className="text-cream-100 mb-6">
              Keep both <Link href="/products/corn-tortillas" className="text-sunset-400 hover:underline">corn</Link> and <Link href="/products/flour-tortillas" className="text-sunset-400 hover:underline">flour tortillas</Link> on hand so you're ready for any dish.
            </p>
            <Link href="/shop" className="inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Shop All Tortillas
            </Link>
          </section>
        </article>
      </div>
    </>
  );
}
