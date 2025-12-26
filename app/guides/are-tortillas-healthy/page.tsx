import type { Metadata } from 'next'
import Link from 'next/link'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Are Tortillas Healthy? Nutrition Facts & Benefits Guide',
  description: 'Are tortillas healthy? Yes! Learn about tortilla nutrition, calories, health benefits, and how corn and flour tortillas fit into a balanced diet. Expert nutritional analysis.',
  keywords: 'are tortillas healthy, tortilla nutrition, tortilla calories, healthy tortillas, corn tortilla nutrition, flour tortilla calories, tortilla health benefits, are corn tortillas healthy',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/are-tortillas-healthy',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are tortillas healthy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, tortillas can be a healthy part of a balanced diet. Corn tortillas are particularly nutritious—they\'re whole grain, naturally gluten-free, low in fat, and contain about 50-60 calories per tortilla. They provide fiber, B vitamins, and minerals. Flour tortillas are higher in calories (90-120) but still fit into a healthy diet in moderation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many calories are in a tortilla?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A 6-inch corn tortilla contains 50-60 calories. A 6-inch flour tortilla contains 90-120 calories. An 8-inch flour tortilla (burrito size) contains 140-180 calories. Calorie content varies by brand and size, with corn tortillas being the lower-calorie option.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are corn tortillas healthier than flour tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Generally yes. Corn tortillas have fewer calories, less fat, more fiber, and are gluten-free and whole grain. They also contain more minerals like magnesium. However, flour tortillas provide more protein and are more versatile. Both can be part of a healthy diet—choose based on your dietary needs.',
      },
    },
  ],
}

export default function AreTortillasHealthyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-green-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">← Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Are Tortillas Healthy? A Complete Nutrition Guide</h1>
            <p className="text-cream-300 mt-4 text-lg">The truth about tortilla nutrition, calories, and health benefits</p>
          </div>
        </header>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-12-25" />

          {/* Quick Answer */}
          <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>Yes, tortillas are healthy!</strong> Corn tortillas are especially nutritious—they're whole grain, naturally gluten-free, low in fat, and contain just 50-60 calories. Flour tortillas are higher in calories but still fit a healthy diet in moderation. The key is choosing the right type for your nutritional goals and watching portion sizes.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              Tortillas have been a staple food for thousands of years, and with good reason. They're versatile, delicious, and—contrary to what some fad diets might suggest—can absolutely be part of a healthy, balanced diet. Let's dive into the nutritional facts and separate myth from reality.
            </p>
          </div>

          {/* Calorie Comparison Table */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-500 pb-2">Tortilla Nutrition at a Glance</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full bg-white shadow-lg border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border px-4 py-3 text-left">Tortilla Type</th>
                    <th className="border px-4 py-3 text-center">Calories</th>
                    <th className="border px-4 py-3 text-center">Carbs</th>
                    <th className="border px-4 py-3 text-center">Protein</th>
                    <th className="border px-4 py-3 text-center">Fat</th>
                    <th className="border px-4 py-3 text-center">Fiber</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-green-50">
                    <td className="border px-4 py-3 font-medium">Corn Tortilla (6")</td>
                    <td className="border px-4 py-3 text-center font-bold text-green-700">50-60</td>
                    <td className="border px-4 py-3 text-center">11-12g</td>
                    <td className="border px-4 py-3 text-center">1-2g</td>
                    <td className="border px-4 py-3 text-center">0.5-1g</td>
                    <td className="border px-4 py-3 text-center">1-2g</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="border px-4 py-3 font-medium">Flour Tortilla (6")</td>
                    <td className="border px-4 py-3 text-center">90-120</td>
                    <td className="border px-4 py-3 text-center">15-20g</td>
                    <td className="border px-4 py-3 text-center">3-4g</td>
                    <td className="border px-4 py-3 text-center">2-4g</td>
                    <td className="border px-4 py-3 text-center">1g</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="border px-4 py-3 font-medium">Flour Tortilla (8" burrito)</td>
                    <td className="border px-4 py-3 text-center">140-180</td>
                    <td className="border px-4 py-3 text-center">24-30g</td>
                    <td className="border px-4 py-3 text-center">4-5g</td>
                    <td className="border px-4 py-3 text-center">4-6g</td>
                    <td className="border px-4 py-3 text-center">1-2g</td>
                  </tr>
                  <tr className="hover:bg-green-50">
                    <td className="border px-4 py-3 font-medium">Whole Wheat Tortilla (8")</td>
                    <td className="border px-4 py-3 text-center">120-140</td>
                    <td className="border px-4 py-3 text-center">20-24g</td>
                    <td className="border px-4 py-3 text-center">4-5g</td>
                    <td className="border px-4 py-3 text-center">3-4g</td>
                    <td className="border px-4 py-3 text-center text-green-700 font-bold">4-5g</td>
                  </tr>
                  <tr className="bg-cream-100">
                    <td className="border px-4 py-3 font-medium italic">For comparison: Slice of bread</td>
                    <td className="border px-4 py-3 text-center">70-80</td>
                    <td className="border px-4 py-3 text-center">12-14g</td>
                    <td className="border px-4 py-3 text-center">2-3g</td>
                    <td className="border px-4 py-3 text-center">1g</td>
                    <td className="border px-4 py-3 text-center">1g</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Health Benefits */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-500 pb-2">Health Benefits of Tortillas</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Corn Tortillas</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><strong>Whole grain:</strong> Made from whole corn, preserving nutrients</li>
                  <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><strong>Gluten-free:</strong> Safe for celiac disease and gluten sensitivity</li>
                  <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><strong>Low calorie:</strong> 50-60 calories per tortilla</li>
                  <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><strong>Good fiber:</strong> 1-2g per tortilla for digestive health</li>
                  <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><strong>Rich in minerals:</strong> Magnesium, phosphorus, potassium</li>
                  <li className="flex items-start"><span className="text-green-500 mr-2">✓</span><strong>Low fat:</strong> Less than 1g per tortilla</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-masa-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">Flour Tortillas</h3>
                <ul className="space-y-2 text-charcoal-700">
                  <li className="flex items-start"><span className="text-masa-500 mr-2">✓</span><strong>More protein:</strong> 3-4g per tortilla</li>
                  <li className="flex items-start"><span className="text-masa-500 mr-2">✓</span><strong>B vitamins:</strong> Often enriched with B vitamins</li>
                  <li className="flex items-start"><span className="text-masa-500 mr-2">✓</span><strong>Iron:</strong> Enriched varieties provide iron</li>
                  <li className="flex items-start"><span className="text-masa-500 mr-2">✓</span><strong>Energy:</strong> Good source of carbohydrates for energy</li>
                  <li className="flex items-start"><span className="text-masa-500 mr-2">✓</span><strong>Versatile:</strong> Great vehicle for healthy fillings</li>
                  <li className="flex items-start"><span className="text-masa-500 mr-2">✓</span><strong>Satisfying:</strong> More filling than corn for some</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="font-bold text-green-900 mb-3">The Nixtamalization Advantage</h4>
              <p className="text-green-800">
                Corn tortillas are made through nixtamalization—an ancient process where corn is treated with lime (calcium hydroxide). This process increases calcium bioavailability by up to 750%, releases niacin (vitamin B3), and makes protein more digestible. It's why corn tortillas are nutritionally superior to regular cornmeal products.
              </p>
            </div>
          </section>

          {/* Dietary Considerations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-500 pb-2">Tortillas for Specific Diets</h2>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Weight Loss</h3>
                <p className="text-charcoal-700 mb-3">
                  Corn tortillas are excellent for weight loss—at just 50-60 calories each, you can enjoy two corn tortillas for the calories of one flour tortilla. They're also more filling relative to their calorie content thanks to fiber.
                </p>
                <p className="text-green-700 font-medium">Best choice: Corn tortillas or small (6") flour tortillas</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Gluten-Free</h3>
                <p className="text-charcoal-700 mb-3">
                  Corn tortillas are naturally gluten-free since they're made from corn, not wheat. However, check labels for cross-contamination warnings if you have celiac disease—some are processed in facilities that also handle wheat.
                </p>
                <p className="text-green-700 font-medium">Best choice: <Link href="/products/corn-tortillas" className="underline hover:text-green-900">Certified gluten-free corn tortillas</Link></p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Diabetes / Blood Sugar</h3>
                <p className="text-charcoal-700 mb-3">
                  Corn tortillas have a lower glycemic index (GI of ~52) compared to white bread (~75). The fiber content helps slow glucose absorption. Pair tortillas with protein and healthy fats to further reduce blood sugar impact.
                </p>
                <p className="text-green-700 font-medium">Best choice: Corn tortillas, eaten with protein</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Low-Carb / Keto</h3>
                <p className="text-charcoal-700 mb-3">
                  Traditional tortillas contain 11-20g of carbs each, which may not fit strict keto diets. However, corn tortillas are reasonable for moderate low-carb diets. For strict keto, look for low-carb tortilla alternatives.
                </p>
                <p className="text-green-700 font-medium">Best choice: Small corn tortillas (11g carbs) or low-carb alternatives</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">High-Protein Diets</h3>
                <p className="text-charcoal-700 mb-3">
                  While tortillas aren't high-protein foods, flour tortillas provide 3-4g protein per serving. The real protein comes from your fillings—beans, chicken, beef, eggs—making tortillas an excellent vehicle for protein-rich meals.
                </p>
                <p className="text-green-700 font-medium">Best choice: Flour tortillas with high-protein fillings</p>
              </div>
            </div>
          </section>

          {/* Myths Debunked */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-500 pb-2">Tortilla Nutrition Myths Debunked</h2>

            <div className="space-y-6">
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-red-900 mb-2">Myth: "Tortillas make you gain weight"</h3>
                <p className="text-charcoal-700">
                  <strong>Reality:</strong> No single food causes weight gain—it's total calorie intake that matters. At 50-60 calories for a corn tortilla, they're actually lower calorie than most bread. Weight gain from "Mexican food" usually comes from cheese, sour cream, and large portion sizes—not the tortillas themselves.
                </p>
              </div>

              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-red-900 mb-2">Myth: "Flour tortillas are unhealthy"</h3>
                <p className="text-charcoal-700">
                  <strong>Reality:</strong> Flour tortillas can be part of a healthy diet. They provide energy, some protein, and are often enriched with vitamins. The key is portion control and choosing what you put inside them. A burrito with beans, grilled chicken, and vegetables is a nutritious meal.
                </p>
              </div>

              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-red-900 mb-2">Myth: "Corn tortillas are 'empty carbs'"</h3>
                <p className="text-charcoal-700">
                  <strong>Reality:</strong> Corn tortillas are whole grain foods with fiber, vitamins, and minerals. They're the opposite of "empty carbs." The nixtamalization process makes nutrients more bioavailable than regular corn products. Ancient civilizations thrived on corn tortillas as a dietary staple.
                </p>
              </div>
            </div>
          </section>

          {/* Tips for Healthy Eating */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-green-500 pb-2">Tips for Eating Tortillas Healthily</h2>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <ul className="space-y-4 text-charcoal-700">
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-3">1.</span>
                  <span><strong>Watch your portion sizes:</strong> Stick to 2-3 small corn tortillas or 1 flour tortilla per meal.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-3">2.</span>
                  <span><strong>Choose corn for fewer calories:</strong> Two corn tortillas = calories of one flour tortilla.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-3">3.</span>
                  <span><strong>Fill with vegetables:</strong> Add lettuce, tomatoes, peppers, and onions for fiber and nutrients.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-3">4.</span>
                  <span><strong>Add lean protein:</strong> Grilled chicken, fish, beans, or eggs make tortillas more satisfying.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-3">5.</span>
                  <span><strong>Go easy on extras:</strong> Cheese, sour cream, and guacamole add up—use them sparingly.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-3">6.</span>
                  <span><strong>Read labels:</strong> Some tortillas have added sugars or preservatives—simpler is better.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Are tortillas healthier than bread?</h3>
                <p className="text-charcoal-700">It depends on the type. A small corn tortilla (50-60 calories) is lower in calories than a slice of bread (70-80 calories). Corn tortillas are also whole grain and gluten-free. However, a large flour tortilla has more calories than bread. Overall, corn tortillas can be a healthier choice.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">How many tortillas can I eat per day?</h3>
                <p className="text-charcoal-700">There's no strict limit—it depends on your total daily calorie needs and goals. Most nutrition guidelines suggest 6-8 servings of grains daily. 2-3 small corn tortillas or 1 flour tortilla counts as one serving. For most people, 4-6 small corn tortillas daily fits a balanced diet.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Are corn tortillas good for diabetics?</h3>
                <p className="text-charcoal-700">Yes, corn tortillas are a reasonable choice for diabetics. They have a lower glycemic index than white bread and contain fiber that helps slow glucose absorption. Pair them with protein and healthy fats for better blood sugar control. As always, consult your doctor or dietitian.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">What's the healthiest way to cook tortillas?</h3>
                <p className="text-charcoal-700">Warming tortillas on a dry griddle or in the microwave adds zero calories. Avoid frying in oil if you're watching calories. For the healthiest tacos, warm tortillas dry and fill with grilled proteins and fresh vegetables.</p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="bg-green-100 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-4">The Bottom Line</h2>
            <p className="text-lg text-charcoal-800 mb-4">
              <strong>Tortillas are a healthy food choice</strong>, especially corn tortillas. They're whole grain, provide important nutrients, and are lower in calories than many carbohydrate alternatives. The key is choosing the right type for your needs, watching portion sizes, and filling them with nutritious ingredients.
            </p>
            <p className="text-charcoal-700">
              For the healthiest option, choose <Link href="/products/corn-tortillas" className="text-green-700 font-semibold hover:underline">authentic corn tortillas</Link> made with simple ingredients: masa, water, and maybe a touch of lime. Avoid tortillas with long ingredient lists, added sugars, or preservatives.
            </p>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-green-100 to-masa-100 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Shop Healthy, Authentic Tortillas</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/products/corn-tortillas" className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-green-400">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Corn Tortillas (Healthiest) →</h3>
                <p className="text-charcoal-700 text-sm">50-60 calories, gluten-free, whole grain</p>
              </Link>
              <Link href="/products/flour-tortillas" className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-masa-400">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Flour Tortillas →</h3>
                <p className="text-charcoal-700 text-sm">More protein, great for wraps and burritos</p>
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
