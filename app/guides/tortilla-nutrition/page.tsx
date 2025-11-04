import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Tortilla Nutrition Guide',
  description: 'Complete nutritional breakdown of corn and flour tortillas. Calories, carbs, protein, fiber, and health benefits explained. Make informed choices.',
  keywords: 'tortilla nutrition, tortilla calories, corn tortilla nutrition, flour tortilla nutrition, tortilla carbs, healthy tortillas, tortilla health benefits',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/tortilla-nutrition',
  },
  openGraph: {
    title: 'Tortilla Nutrition Guide | Complete Nutritional Facts',
    description: 'Everything you need to know about tortilla nutrition, from calories to health benefits.',
    type: 'article',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many calories are in a tortilla?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A typical 6-inch corn tortilla has 50-60 calories, while an 8-inch flour tortilla has 140-160 calories. Larger 10-inch flour tortillas (burrito size) contain 210-240 calories. Calories vary by brand and ingredients.'
      }
    },
    {
      '@type': 'Question',
      name: 'Are corn or flour tortillas healthier?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Corn tortillas are generally considered healthier. They have fewer calories (50-60 vs 140-160), more fiber, are naturally gluten-free, and contain more minerals. However, both can be part of a healthy diet when consumed in moderation with nutritious fillings.'
      }
    },
    {
      '@type': 'Question',
      name: 'Are tortillas high in carbs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, tortillas are a carbohydrate source. A corn tortilla has 10-12g carbs, while a flour tortilla has 20-25g carbs. However, they provide energy and, especially corn tortillas, contain fiber. Choose whole grain options for more fiber and nutrients.'
      }
    }
  ]
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Tortilla Nutrition Guide',
  description: 'Complete nutritional information for corn and flour tortillas including calories, macros, and health benefits.',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  datePublished: '2025-10-24',
  dateModified: '2025-10-25',
};

export default function TortillaNutritionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/guides" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">← Back to Guides</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Tortilla Nutrition Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">Complete nutritional facts for corn and flour tortillas</p>
          </div>
        </header>
        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/generated/guide-tortilla-nutrition.webp"
              alt="Healthy tortillas with fresh vegetables and ingredients"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>



        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-10-25" />

          <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Facts</h2>
            <p className="text-lg text-charcoal-800">
              <strong>Corn tortilla (6-inch):</strong> ~52 calories, 11g carbs, 1.4g protein, 1.5g fiber. <strong>Flour tortilla (8-inch):</strong> ~146 calories, 24g carbs, 4g protein, 1.6g fiber. Corn tortillas are lower in calories and naturally gluten-free. Both can fit into a healthy, balanced diet.
            </p>
          </div>

          <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Nutritional Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-charcoal-200">
                    <th className="py-3 px-4">Nutrient</th>
                    <th className="py-3 px-4">Corn (6")</th>
                    <th className="py-3 px-4">Flour (8")</th>
                  </tr>
                </thead>
                <tbody className="text-charcoal-800">
                  <tr className="border-b border-charcoal-100"><td className="py-3 px-4 font-semibold">Calories</td><td className="py-3 px-4">52</td><td className="py-3 px-4">146</td></tr>
                  <tr className="border-b border-charcoal-100"><td className="py-3 px-4 font-semibold">Total Carbs</td><td className="py-3 px-4">11g</td><td className="py-3 px-4">24g</td></tr>
                  <tr className="border-b border-charcoal-100"><td className="py-3 px-4 font-semibold">Fiber</td><td className="py-3 px-4">1.5g</td><td className="py-3 px-4">1.6g</td></tr>
                  <tr className="border-b border-charcoal-100"><td className="py-3 px-4 font-semibold">Protein</td><td className="py-3 px-4">1.4g</td><td className="py-3 px-4">4g</td></tr>
                  <tr className="border-b border-charcoal-100"><td className="py-3 px-4 font-semibold">Fat</td><td className="py-3 px-4">0.7g</td><td className="py-3 px-4">3.5g</td></tr>
                  <tr className="border-b border-charcoal-100"><td className="py-3 px-4 font-semibold">Sodium</td><td className="py-3 px-4">11mg</td><td className="py-3 px-4">238mg</td></tr>
                  <tr className="border-b border-charcoal-100"><td className="py-3 px-4 font-semibold">Calcium</td><td className="py-3 px-4">46mg</td><td className="py-3 px-4">44mg</td></tr>
                  <tr><td className="py-3 px-4 font-semibold">Iron</td><td className="py-3 px-4">0.4mg</td><td className="py-3 px-4">1.6mg</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-charcoal-600 mt-4 italic">*Values are approximate and vary by brand and preparation method</p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Health Benefits of Tortillas</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Corn Tortillas</h3>
                <ul className="space-y-2 text-charcoal-800 text-sm">
                  <li>✓ Lower in calories and fat</li>
                  <li>✓ Naturally gluten-free</li>
                  <li>✓ Higher in fiber per calorie</li>
                  <li>✓ Contains beneficial minerals (magnesium, phosphorus)</li>
                  <li>✓ Made from whole grain corn</li>
                  <li>✓ Rich in antioxidants from nixtamalization</li>
                </ul>
              </div>
              <div className="bg-sunset-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Flour Tortillas</h3>
                <ul className="space-y-2 text-charcoal-800 text-sm">
                  <li>✓ Higher in protein</li>
                  <li>✓ More iron (often enriched)</li>
                  <li>✓ Soft and pliable texture</li>
                  <li>✓ Satisfying and filling</li>
                  <li>✓ Good source of B vitamins</li>
                  <li>✓ Whole wheat versions add more fiber</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Making Tortillas Healthier</h2>
            <div className="space-y-4 text-charcoal-800">
              <div>
                <h3 className="font-bold text-lg mb-2">1. Watch Portion Sizes</h3>
                <p>Use smaller tortillas for tacos (6-inch) and save larger ones for when you need them. Two small corn tortillas often satisfy as much as one large flour.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">2. Choose Whole Grain Options</h3>
                <p>Whole wheat flour tortillas and 100% corn tortillas provide more fiber and nutrients than refined white flour versions.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">3. Load Up on Vegetables</h3>
                <p>The tortilla is just the vessel! Fill with grilled vegetables, lettuce, tomatoes, and other nutrient-dense ingredients.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">4. Balance Your Plate</h3>
                <p>Pair tortillas with lean proteins, healthy fats (avocado), and plenty of vegetables for a complete, balanced meal.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">5. Mind Your Cooking Method</h3>
                <p>Toast or warm tortillas instead of frying to save calories. When you do fry for dishes like tostadas, use heart-healthy oils.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Special Dietary Considerations</h2>
            <div className="space-y-6">
              <div className="bg-charcoal-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For Weight Management</h3>
                <p className="text-charcoal-800">Choose corn tortillas for fewer calories. A taco with two small corn tortillas (100 calories total) vs one large flour tortilla (200+ calories) saves significant calories while still being satisfying.</p>
              </div>
              <div className="bg-charcoal-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For Gluten-Free Diets</h3>
                <p className="text-charcoal-800">Corn tortillas are naturally gluten-free and safe for celiac disease and gluten sensitivity. Always check labels to ensure no wheat flour is added. See our <Link href="/guides/gluten-free-tortillas" className="text-sunset-600 hover:underline">gluten-free guide</Link> for more.</p>
              </div>
              <div className="bg-charcoal-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For Diabetes Management</h3>
                <p className="text-charcoal-800">Both corn and flour tortillas contain carbohydrates. Choose smaller portions, pair with protein and fiber-rich foods, and monitor portion sizes. Whole grain options provide more fiber, which helps slow blood sugar spikes.</p>
              </div>
              <div className="bg-charcoal-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For Heart Health</h3>
                <p className="text-charcoal-800">Corn tortillas are lower in sodium and saturated fat. Look for flour tortillas made with healthier fats (vegetable oil vs lard). The fiber in both types supports heart health.</p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Common Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-2">Are tortillas bad for you?</h3>
                <p className="text-charcoal-800">No! Tortillas can be part of a healthy diet. They provide carbohydrates for energy, some fiber and protein, and are relatively low in fat (especially corn tortillas). The key is portion control and what you fill them with.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-2">Can I eat tortillas on a low-carb diet?</h3>
                <p className="text-charcoal-800">Standard tortillas are not low-carb. However, many brands now offer low-carb tortillas made with modified wheat starch or alternative flours, containing 3-6g net carbs. Corn tortillas are lower in total carbs than flour (11g vs 24g).</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-2">Do tortillas have nutritional value?</h3>
                <p className="text-charcoal-800">Yes! Both corn and flour tortillas provide carbohydrates, some protein, fiber, B vitamins, and minerals like iron and calcium. Corn tortillas made through nixtamalization also contain beneficial antioxidants and make calcium more bioavailable.</p>
              </div>
            </div>
          </section>

          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Choose Quality Tortillas</h2>
            <p className="text-cream-100 mb-6">
              Start with authentic, quality tortillas for the best nutrition and taste. Our H-E-B® tortillas use simple, quality ingredients.
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
