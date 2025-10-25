import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gluten-Free Tortillas Guide | Corn, Alternatives & Tips | Lonestar Tortillas',
  description: 'Complete guide to gluten-free tortillas. Learn about corn tortillas, gluten-free flour options, cross-contamination, and celiac-safe choices.',
  keywords: 'gluten free tortillas, are corn tortillas gluten free, celiac safe tortillas, gluten free flour tortillas, corn tortillas gluten, wheat free tortillas',
  openGraph: {
    title: 'Gluten-Free Tortillas Guide | Complete Guide',
    description: 'Everything you need to know about gluten-free tortillas for celiac and gluten sensitivity.',
    type: 'article',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are corn tortillas gluten-free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Authentic corn tortillas made from 100% corn masa are naturally gluten-free and safe for celiac disease. However, always check labels as some brands add wheat flour. Look for "100% corn" or certified gluten-free labels to be sure.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can people with celiac disease eat corn tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, pure corn tortillas are safe for celiac disease as they contain no gluten. However, ensure there is no cross-contamination during manufacturing. Look for certified gluten-free labels or brands that test for gluten levels below 20ppm.'
      }
    },
    {
      '@type': 'Question',
      name: 'Are there gluten-free flour tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Many brands now make gluten-free flour-style tortillas using alternative flours like rice flour, almond flour, or cassava flour. They mimic the soft, pliable texture of wheat tortillas while being completely gluten-free.'
      }
    }
  ]
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Gluten-Free Tortillas Guide',
  description: 'Complete guide to gluten-free tortillas including corn tortillas, alternatives, and safety for celiac disease.',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  datePublished: '2025-10-24',
  dateModified: '2025-10-24',
};

export default function GlutenFreeTortillasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/guides" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">← Back to Guides</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Gluten-Free Tortillas Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Everything you need to know about safe, delicious gluten-free tortillas</p>
          </div>
        </header>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>Yes, authentic corn tortillas are naturally gluten-free!</strong> Made from 100% corn masa, they're safe for celiac disease and gluten sensitivity. Always verify labels to ensure no wheat flour is added. Many brands also offer gluten-free flour-style tortillas using alternative flours like rice or almond.
            </p>
          </div>

          <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Are Corn Tortillas Gluten-Free?</h2>
            <p className="text-charcoal-800 mb-4 text-lg">
              <strong>YES!</strong> Authentic corn tortillas made from 100% corn masa (nixtamalized corn flour) are naturally gluten-free. Corn does not contain gluten, making corn tortillas safe for people with celiac disease and gluten sensitivity.
            </p>

            <div className="bg-masa-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-charcoal-950 mb-3">What to Look For:</h3>
              <ul className="space-y-2 text-charcoal-800">
                <li>✓ Ingredients list shows only: masa harina (or corn masa), water, lime (calcium hydroxide), salt</li>
                <li>✓ Label says "100% corn" or "gluten-free"</li>
                <li>✓ No wheat, wheat flour, or "enriched flour" in ingredients</li>
                <li>✓ Certified gluten-free seal (ideal for celiac disease)</li>
              </ul>
            </div>

            <div className="bg-rust-50 border-l-4 border-rust-500 p-6 rounded-r-lg">
              <h3 className="text-lg font-bold text-charcoal-950 mb-2">⚠️ Important Warning</h3>
              <p className="text-charcoal-800">Some brands add wheat flour to corn tortillas to make them more pliable or extend shelf life. <strong>Always read labels!</strong> If you see "wheat flour" or "enriched flour" in the ingredients, it's not gluten-free.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Gluten-Free Flour Tortilla Options</h2>
            <p className="text-charcoal-800 mb-6">
              Traditional flour tortillas contain wheat and are NOT gluten-free. However, many brands now make excellent gluten-free alternatives that mimic the soft, pliable texture of flour tortillas.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Rice Flour Tortillas</h3>
                <p className="text-charcoal-800 text-sm mb-3">Most common gluten-free flour tortilla. Soft, pliable, neutral flavor.</p>
                <p className="text-xs text-charcoal-600"><strong>Best for:</strong> Burritos, wraps, quesadillas</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Almond Flour Tortillas</h3>
                <p className="text-charcoal-800 text-sm mb-3">Higher protein, lower carb. Slightly nutty flavor.</p>
                <p className="text-xs text-charcoal-600"><strong>Best for:</strong> Low-carb diets, keto, added protein</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Cassava Flour Tortillas</h3>
                <p className="text-charcoal-800 text-sm mb-3">Grain-free, paleo-friendly. Most similar to wheat tortillas.</p>
                <p className="text-xs text-charcoal-600"><strong>Best for:</strong> Paleo diets, grain-free lifestyles</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Coconut Flour Tortillas</h3>
                <p className="text-charcoal-800 text-sm mb-3">High fiber, slightly sweet. Absorbs moisture well.</p>
                <p className="text-xs text-charcoal-600"><strong>Best for:</strong> High-fiber diets, unique flavor</p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Cross-Contamination Concerns</h2>
            <p className="text-charcoal-800 mb-4">
              Even if a tortilla is made from gluten-free ingredients, cross-contamination during manufacturing can make it unsafe for people with celiac disease.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-charcoal-950 mb-2">High-Risk Scenarios:</h3>
                <ul className="list-disc pl-6 text-charcoal-800 space-y-1 text-sm">
                  <li>Shared equipment with wheat products</li>
                  <li>Shared facility without dedicated gluten-free lines</li>
                  <li>Suppliers providing ingredients with gluten contamination</li>
                </ul>
              </div>

              <div className="bg-sunset-50 p-4 rounded">
                <h3 className="font-bold text-charcoal-950 mb-2">How to Stay Safe:</h3>
                <ul className="list-disc pl-6 text-charcoal-800 space-y-1 text-sm">
                  <li><strong>Look for certified gluten-free labels</strong> - These products test below 20ppm gluten</li>
                  <li>Contact manufacturers to ask about dedicated facilities</li>
                  <li>Choose brands that specialize in gluten-free products</li>
                  <li>Read labels every time—formulations can change</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Eating Out: Restaurant Safety</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-charcoal-800 mb-6">
                Restaurants can be tricky for gluten-free diners. Here's how to stay safe when ordering tortillas:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">❓</span>
                  <div>
                    <p className="font-bold text-charcoal-950">Ask Specific Questions:</p>
                    <p className="text-sm text-charcoal-800">"Are your corn tortillas 100% corn with no wheat flour added?"</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">🍳</span>
                  <div>
                    <p className="font-bold text-charcoal-950">Check Cooking Methods:</p>
                    <p className="text-sm text-charcoal-800">Are corn and flour tortillas cooked on the same griddle? Request a clean surface.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">🥘</span>
                  <div>
                    <p className="font-bold text-charcoal-950">Watch for Hidden Gluten:</p>
                    <p className="text-sm text-charcoal-800">Sauces, seasonings, and marinades may contain gluten. Ask about ingredients.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-bold text-charcoal-950">Safest Bet:</p>
                    <p className="text-sm text-charcoal-800">Simple corn tacos with grilled meat, fresh vegetables, and plain toppings.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Making Homemade Gluten-Free Tortillas</h2>
            <p className="text-charcoal-800 mb-4">
              Want complete control over ingredients? Make your own! See our <Link href="/guides/how-to-make-tortillas" className="text-sunset-600 hover:underline">tortilla-making guide</Link> for complete instructions.
            </p>

            <div className="bg-charcoal-50 p-6 rounded">
              <h3 className="font-bold text-charcoal-950 mb-3">Quick Corn Tortilla Recipe:</h3>
              <ul className="text-charcoal-800 space-y-2 text-sm">
                <li><strong>Ingredients:</strong> 2 cups masa harina (certified gluten-free), 1.5 cups warm water, 1/2 tsp salt</li>
                <li><strong>Method:</strong> Mix until dough forms. Press into thin circles. Cook on hot griddle 1 min per side.</li>
                <li><strong>Bonus:</strong> You control everything—no cross-contamination risk!</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Common Questions</h2>
            <div className="space-y-6">
              <div className="bg-charcoal-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-2">Do all Mexican restaurants use corn tortillas without wheat?</h3>
                <p className="text-charcoal-800">Not always. Some add wheat flour for softer texture or longer shelf life. Always ask! Authentic taquerías are more likely to use 100% corn, but verify.</p>
              </div>

              <div className="bg-charcoal-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-2">What about tortilla chips at restaurants?</h3>
                <p className="text-charcoal-800">If made from 100% corn tortillas and fried in dedicated fryers (not shared with wheat products), they're gluten-free. However, some restaurants season with malt vinegar or wheat-containing seasonings. Always ask.</p>
              </div>

              <div className="bg-charcoal-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-2">Are gluten-free tortillas less nutritious?</h3>
                <p className="text-charcoal-800">Not necessarily! Corn tortillas are naturally nutritious with fiber and minerals. Gluten-free flour alternatives vary—some are higher in protein (almond flour) or fiber (coconut flour). Check our <Link href="/guides/tortilla-nutrition" className="text-sunset-600 hover:underline">nutrition guide</Link> for details.</p>
              </div>
            </div>
          </section>

          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Shop Certified Gluten-Free Tortillas</h2>
            <p className="text-cream-100 mb-6">
              Our <Link href="/products/corn-tortillas" className="text-sunset-400 hover:underline">authentic corn tortillas</Link> are made from 100% corn masa—naturally gluten-free and delicious.
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
