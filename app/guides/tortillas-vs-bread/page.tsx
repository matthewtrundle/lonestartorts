import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tortillas vs Bread: Which Is Healthier? Complete Comparison',
  description: 'Compare tortillas vs bread for calories, carbs, fiber, and nutrition. Learn which is healthier for weight loss, low-carb diets, and everyday eating.',
  keywords: 'tortillas vs bread, tortilla calories, bread vs tortilla, which is healthier tortilla or bread, tortilla nutrition, low carb tortilla vs bread',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/tortillas-vs-bread',
  },
  openGraph: {
    title: 'Tortillas vs Bread: The Complete Health Comparison | Lonestar Tortillas',
    description: 'Discover which is healthier - tortillas or bread. Compare calories, carbs, protein, and more.',
    type: 'article',
  },
};

export default function TortillasVsBreadGuide() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are tortillas healthier than bread?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It depends on the type. Corn tortillas are generally lower in calories (50 cal) than bread slices (70-100 cal) and contain less sodium. Flour tortillas are similar to bread nutritionally. For weight loss or low-carb diets, corn tortillas are usually the better choice.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are tortillas better than bread for weight loss?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Corn tortillas can be better for weight loss due to lower calories (50 vs 70-100 per serving), fewer carbs, and no added sugar. However, portion size matters - one tortilla replaces two slices of bread for sandwiches, so the savings depend on how you use them.'
        }
      },
      {
        '@type': 'Question',
        name: 'Which has more carbs, tortillas or bread?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A 6-inch corn tortilla has about 10-12g carbs, while a slice of white bread has 13-15g. Flour tortillas vary widely from 15-25g depending on size. For low-carb eating, small corn tortillas are your best bet among traditional options.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I substitute tortillas for bread?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Tortillas make excellent bread substitutes for wraps, sandwiches, pizza crusts, and more. They store longer than bread (weeks vs days), are more versatile, and work for both savory and sweet dishes.'
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="min-h-screen bg-cream-50">
        <section className="bg-charcoal-950 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <nav className="text-sm text-cream-300 mb-6">
              <Link href="/" className="hover:text-cream-50">Home</Link>{' '}/{' '}
              <Link href="/guides" className="hover:text-cream-50">Guides</Link>{' '}/{' '}
              <span>Tortillas vs Bread</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tortillas vs Bread: Which Is Healthier?</h1>
            <p className="text-xl text-cream-100">A complete nutritional comparison to help you choose</p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>Corn tortillas</strong> are generally healthier than bread—they have fewer calories (50 vs 70-100), less sodium, no added sugar, and are naturally gluten-free. <strong>Flour tortillas</strong> are nutritionally similar to bread but vary by size. For most diets, corn tortillas are the winner.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="prose prose-lg max-w-none text-charcoal-800">
            <p className="text-xl leading-relaxed mb-6">
              "Should I use tortillas or bread?" It's one of the most common questions for health-conscious eaters. The answer isn't as simple as "tortillas are healthier" or "bread is better"—it depends on the type, size, and how you're using them.
            </p>
            <p className="text-lg leading-relaxed">
              This guide breaks down the nutritional differences between <Link href="/guides/corn-vs-flour-tortillas" className="text-rust-600 hover:underline">corn tortillas, flour tortillas</Link>, and various types of bread so you can make the best choice for your diet and lifestyle.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Nutritional Comparison Table</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-charcoal-200 bg-charcoal-50">
                  <th className="py-4 px-4 font-bold text-charcoal-950">Per Serving</th>
                  <th className="py-4 px-4 font-bold text-charcoal-950">Corn Tortilla (6")</th>
                  <th className="py-4 px-4 font-bold text-charcoal-950">Flour Tortilla (8")</th>
                  <th className="py-4 px-4 font-bold text-charcoal-950">White Bread (1 slice)</th>
                  <th className="py-4 px-4 font-bold text-charcoal-950">Whole Wheat (1 slice)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-charcoal-100">
                  <td className="py-3 px-4 font-medium">Calories</td>
                  <td className="py-3 px-4 bg-green-50 font-semibold">50</td>
                  <td className="py-3 px-4">140</td>
                  <td className="py-3 px-4">70</td>
                  <td className="py-3 px-4">80</td>
                </tr>
                <tr className="border-b border-charcoal-100">
                  <td className="py-3 px-4 font-medium">Carbs (g)</td>
                  <td className="py-3 px-4 bg-green-50 font-semibold">10</td>
                  <td className="py-3 px-4">24</td>
                  <td className="py-3 px-4">13</td>
                  <td className="py-3 px-4">12</td>
                </tr>
                <tr className="border-b border-charcoal-100">
                  <td className="py-3 px-4 font-medium">Protein (g)</td>
                  <td className="py-3 px-4">1</td>
                  <td className="py-3 px-4">4</td>
                  <td className="py-3 px-4">2</td>
                  <td className="py-3 px-4 bg-green-50 font-semibold">4</td>
                </tr>
                <tr className="border-b border-charcoal-100">
                  <td className="py-3 px-4 font-medium">Fat (g)</td>
                  <td className="py-3 px-4 bg-green-50 font-semibold">0.5</td>
                  <td className="py-3 px-4">4</td>
                  <td className="py-3 px-4">1</td>
                  <td className="py-3 px-4">1</td>
                </tr>
                <tr className="border-b border-charcoal-100">
                  <td className="py-3 px-4 font-medium">Fiber (g)</td>
                  <td className="py-3 px-4">1</td>
                  <td className="py-3 px-4">1</td>
                  <td className="py-3 px-4">0.5</td>
                  <td className="py-3 px-4 bg-green-50 font-semibold">2</td>
                </tr>
                <tr className="border-b border-charcoal-100">
                  <td className="py-3 px-4 font-medium">Sodium (mg)</td>
                  <td className="py-3 px-4 bg-green-50 font-semibold">10</td>
                  <td className="py-3 px-4">340</td>
                  <td className="py-3 px-4">150</td>
                  <td className="py-3 px-4">130</td>
                </tr>
                <tr className="border-b border-charcoal-100">
                  <td className="py-3 px-4 font-medium">Sugar (g)</td>
                  <td className="py-3 px-4 bg-green-50 font-semibold">0</td>
                  <td className="py-3 px-4">1</td>
                  <td className="py-3 px-4">1-2</td>
                  <td className="py-3 px-4">1-2</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Gluten-Free</td>
                  <td className="py-3 px-4 bg-green-50 font-semibold">Yes</td>
                  <td className="py-3 px-4">No</td>
                  <td className="py-3 px-4">No</td>
                  <td className="py-3 px-4">No</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-charcoal-600 mt-4">*Values are approximate and vary by brand. Green highlighting indicates best-in-category.</p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-charcoal-950 mb-8">The Verdict by Diet Type</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-charcoal-950 mb-3">For Weight Loss</h3>
              <div className="text-5xl mb-4">🏆 Corn Tortillas</div>
              <p className="text-charcoal-700">At just 50 calories each, corn tortillas let you eat more for fewer calories. Two corn tortillas (100 cal) hold more filling than two slices of bread (140-160 cal) and feel more satisfying.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-charcoal-950 mb-3">For Low-Carb/Keto</h3>
              <div className="text-5xl mb-4">🏆 Corn Tortillas</div>
              <p className="text-charcoal-700">With only 10g carbs per tortilla, corn beats bread (13-15g per slice). For strict keto, consider low-carb tortilla alternatives that have 3-5g net carbs.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-charcoal-950 mb-3">For Heart Health</h3>
              <div className="text-5xl mb-4">🏆 Corn Tortillas</div>
              <p className="text-charcoal-700">Extremely low sodium (10mg vs 130-340mg) makes corn tortillas ideal for low-sodium diets. They also have no added sugars or hydrogenated oils.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-charcoal-950 mb-3">For Protein/Fiber</h3>
              <div className="text-5xl mb-4">🏆 Whole Wheat Bread</div>
              <p className="text-charcoal-700">Whole wheat bread edges out tortillas for protein (4g vs 1g) and fiber (2g vs 1g). For building muscle or staying full longer, whole grain bread wins.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-charcoal-950 mb-3">For Gluten-Free</h3>
              <div className="text-5xl mb-4">🏆 Corn Tortillas</div>
              <p className="text-charcoal-700">Corn tortillas are naturally gluten-free (verify no cross-contamination if celiac). They're the most accessible and affordable GF bread alternative.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-charcoal-950 mb-3">For Burritos/Wraps</h3>
              <div className="text-5xl mb-4">🏆 Flour Tortillas</div>
              <p className="text-charcoal-700">When you need to wrap a large amount of filling, <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">flour tortillas</Link> are unbeatable. They're pliable, strong, and won't crack or tear.</p>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-xl my-8">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">When to Choose Tortillas Over Bread</h2>
          <div className="space-y-4 text-charcoal-800">
            <div className="flex items-start gap-4 p-4 bg-masa-50 rounded-lg">
              <span className="text-2xl">✅</span>
              <div>
                <h3 className="font-bold mb-1">Wraps & Roll-Ups</h3>
                <p>Tortillas wrap around fillings cleanly without crumbling. Perfect for lunch boxes and meal prep.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-masa-50 rounded-lg">
              <span className="text-2xl">✅</span>
              <div>
                <h3 className="font-bold mb-1">Longer Shelf Life</h3>
                <p>Tortillas stay fresh for weeks refrigerated, while bread goes stale in days. Less food waste!</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-masa-50 rounded-lg">
              <span className="text-2xl">✅</span>
              <div>
                <h3 className="font-bold mb-1">Versatility</h3>
                <p>From tacos to quesadillas to chips to pizza crusts—tortillas are endlessly adaptable. Try <Link href="/recipes" className="text-rust-600 hover:underline">our recipes</Link> for ideas.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-masa-50 rounded-lg">
              <span className="text-2xl">✅</span>
              <div>
                <h3 className="font-bold mb-1">Calorie Control</h3>
                <p>When watching portions, one tortilla is a defined serving. It's harder to accidentally eat "just one more slice" of bread.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12 bg-charcoal-50 rounded-xl my-8">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">When to Choose Bread Over Tortillas</h2>
          <div className="space-y-4 text-charcoal-800">
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
              <span className="text-2xl">🍞</span>
              <div>
                <h3 className="font-bold mb-1">Classic Sandwiches</h3>
                <p>Some sandwiches just need bread—think BLTs, club sandwiches, or grilled cheese. The structure matters.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
              <span className="text-2xl">🍞</span>
              <div>
                <h3 className="font-bold mb-1">Toast & Spreads</h3>
                <p>For butter, jam, avocado toast, or eggs—toasted bread provides the ideal crispy base.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg">
              <span className="text-2xl">🍞</span>
              <div>
                <h3 className="font-bold mb-1">More Fiber Needed</h3>
                <p>If you're focused on fiber intake, whole grain bread (2-3g per slice) beats standard tortillas.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-charcoal-950 mb-2">Are tortillas healthier than bread?</h3>
              <p className="text-charcoal-700">Corn tortillas are generally healthier—lower calories, less sodium, no added sugar, and gluten-free. Flour tortillas are nutritionally similar to bread.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-charcoal-950 mb-2">Are tortillas better for weight loss?</h3>
              <p className="text-charcoal-700">Corn tortillas can help with weight loss due to fewer calories (50 vs 70-100). However, large flour tortillas (140+ calories) are similar to two slices of bread.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-charcoal-950 mb-2">Which has more carbs, tortillas or bread?</h3>
              <p className="text-charcoal-700">A corn tortilla has ~10g carbs; a slice of bread has ~13g. Large flour tortillas can have 24g+. For low-carb eating, small corn tortillas win.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-charcoal-950 mb-2">Can I substitute tortillas for bread?</h3>
              <p className="text-charcoal-700">Absolutely! Tortillas work great for wraps, sandwiches, pizza crusts, and more. They store longer and are incredibly versatile.</p>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-xl my-8">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">The Bottom Line</h2>
          <div className="prose prose-lg max-w-none text-charcoal-800">
            <p className="text-lg leading-relaxed mb-4">
              For most people, <strong>corn tortillas are the healthier choice</strong>—they're lower in calories, sodium, and carbs while being naturally gluten-free. They're especially beneficial for weight loss, heart health, and blood sugar management.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              <strong>Flour tortillas</strong> are comparable to bread nutritionally—neither is significantly healthier, so choose based on what you're making.
            </p>
            <p className="text-lg leading-relaxed">
              The best approach? Use both! Enjoy corn tortillas for <Link href="/recipes/breakfast-tacos" className="text-rust-600 hover:underline">breakfast tacos</Link>, flour tortillas for burritos, and bread for your morning toast. Variety is part of a healthy diet.
            </p>
          </div>
        </section>

        <section className="bg-rust-600 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Try Healthier Tortillas?</h2>
            <p className="text-xl mb-8 text-cream-100">Get premium Texas tortillas delivered to your door</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/shop" className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-8 py-3 rounded-lg font-semibold transition-colors">Shop Tortillas</Link>
              <Link href="/guides/are-tortillas-healthy" className="bg-transparent border-2 border-cream-50 hover:bg-cream-50 hover:text-rust-600 text-cream-50 px-8 py-3 rounded-lg font-semibold transition-colors">More Health Info</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
