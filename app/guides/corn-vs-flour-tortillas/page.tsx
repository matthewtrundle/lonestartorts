import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Corn vs Flour Tortillas Guide',
  description: 'Corn or flour tortillas? Compare taste, texture, nutrition, and best uses. Learn which tortilla is right for your tacos, burritos, and quesadillas. Complete guide with expert tips.',
  keywords: 'corn vs flour tortillas, difference between corn and flour tortillas, corn or flour tortillas, which tortilla is better, tortilla comparison, corn tortilla vs flour',
  alternates: {
    canonical: 'https://lonestartortillas.com/guides/corn-vs-flour-tortillas',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between corn and flour tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Corn tortillas are made from masa harina (corn flour) and water, giving them a distinct corn flavor and slightly grainy texture. Flour tortillas are made from wheat flour, fat, and leavening, making them soft, pliable, and neutral in flavor. Corn tortillas are gluten-free and lower in calories, while flour tortillas are more flexible and better for wrapping.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which is healthier: corn or flour tortillas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Corn tortillas are generally healthier with fewer calories (50-60 vs 90-120), less fat, more fiber, and they are gluten-free. A 6-inch corn tortilla has about 50 calories while a flour tortilla has 90-120 calories. Corn tortillas also have more magnesium and are considered a whole grain.',
      },
    },
  ],
}

export default function CornVsFlourPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        <header className="bg-charcoal-950 text-cream-50 py-8">
          <div className="container mx-auto px-6">
            <Link href="/" className="text-sunset-400 hover:text-sunset-300 mb-4 inline-block">← Back to Home</Link>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Corn vs Flour Tortillas: Complete Comparison</h1>
            <p className="text-cream-300 mt-4 text-lg">Everything you need to know to choose the right tortilla</p>
          </div>
        </header>
        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/generated/guide-corn-vs-flour-tortillas.webp"
              alt="Side by side comparison of corn and flour tortillas"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>



        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <LastUpdated date="2025-10-25" />

          {/* Quick Answer */}
          <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>Corn tortillas</strong> are made from masa (corn flour), are gluten-free, have fewer calories, and offer authentic flavor perfect for tacos and tostadas. <strong>Flour tortillas</strong> are made from wheat flour, are more pliable, hold more filling, and work best for burritos, wraps, and quesadillas. Choose corn for traditional Mexican dishes and healthier options; choose flour for versatility and ease of use.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-charcoal-700 leading-relaxed">
              The debate between corn and flour tortillas has been going on for generations. Both have their place in Mexican and Tex-Mex cuisine, but they're surprisingly different in taste, texture, nutrition, and best uses. This comprehensive guide breaks down everything you need to know to choose the right tortilla for your needs.
            </p>
          </div>

          {/* Quick Visual Comparison */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Quick Visual Comparison</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-sunset-100 to-sunset-200 p-8 rounded-lg border-4 border-sunset-400">
                <h3 className="text-2xl font-bold text-charcoal-950 mb-4">🌽 Corn Tortillas</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li>✓ Made from masa harina</li>
                  <li>✓ Gluten-free</li>
                  <li>✓ 50-60 calories</li>
                  <li>✓ Distinct corn flavor</li>
                  <li>✓ Less pliable</li>
                  <li>✓ Best for: Tacos, tostadas</li>
                </ul>
                <Link href="/products/corn-tortillas" className="mt-6 inline-block bg-sunset-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-sunset-700">
                  Shop Corn Tortillas →
                </Link>
              </div>

              <div className="bg-gradient-to-br from-masa-100 to-masa-200 p-8 rounded-lg border-4 border-masa-400">
                <h3 className="text-2xl font-bold text-charcoal-950 mb-4">🌾 Flour Tortillas</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li>✓ Made from wheat flour</li>
                  <li>✓ Contains gluten</li>
                  <li>✓ 90-120 calories</li>
                  <li>✓ Mild, neutral flavor</li>
                  <li>✓ Very pliable</li>
                  <li>✓ Best for: Burritos, wraps</li>
                </ul>
                <Link href="/products/flour-tortillas" className="mt-6 inline-block bg-masa-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-masa-700">
                  Shop Flour Tortillas →
                </Link>
              </div>
            </div>
          </section>

          {/* Ingredients */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-sunset-500 pb-2">Ingredients Breakdown</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-charcoal-950 mb-4">Corn Tortillas</h3>
                <ul className="space-y-3 text-charcoal-700">
                  <li className="flex items-start"><span className="text-sunset-500 mr-2">•</span><span><strong>Masa harina:</strong> Nixtamalized corn flour (corn treated with lime)</span></li>
                  <li className="flex items-start"><span className="text-sunset-500 mr-2">•</span><span><strong>Water:</strong> To form the dough</span></li>
                  <li className="flex items-start"><span className="text-sunset-500 mr-2">•</span><span><strong>Salt:</strong> For flavor (sometimes omitted)</span></li>
                </ul>
                <p className="mt-4 text-sm text-charcoal-600 italic">That's it! Just 2-3 ingredients make authentic corn tortillas.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-charcoal-950 mb-4">Flour Tortillas</h3>
                <ul className="space-y-3 text-charcoal-700">
                  <li className="flex items-start"><span className="text-masa-500 mr-2">•</span><span><strong>Wheat flour:</strong> All-purpose or bread flour</span></li>
                  <li className="flex items-start"><span className="text-masa-500 mr-2">•</span><span><strong>Fat:</strong> Lard, butter, or vegetable oil</span></li>
                  <li className="flex items-start"><span className="text-masa-500 mr-2">•</span><span><strong>Baking powder:</strong> For lightness</span></li>
                  <li className="flex items-start"><span className="text-masa-500 mr-2">•</span><span><strong>Salt:</strong> Essential for flavor</span></li>
                  <li className="flex items-start"><span className="text-masa-500 mr-2">•</span><span><strong>Water:</strong> To bind ingredients</span></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Nutrition Comparison */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-sunset-500 pb-2">Nutrition Comparison</h2>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full bg-white shadow-lg border-collapse">
                <thead>
                  <tr className="bg-charcoal-950 text-cream-50">
                    <th className="border px-4 py-3 text-left">Nutrient (per 6-inch tortilla)</th>
                    <th className="border px-4 py-3 text-center">Corn</th>
                    <th className="border px-4 py-3 text-center">Flour</th>
                    <th className="border px-4 py-3 text-left">Winner</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-cream-50">
                    <td className="border px-4 py-3 font-medium">Calories</td>
                    <td className="border px-4 py-3 text-center">50-60</td>
                    <td className="border px-4 py-3 text-center">90-120</td>
                    <td className="border px-4 py-3 text-green-700 font-bold">Corn 🏆</td>
                  </tr>
                  <tr className="hover:bg-cream-50">
                    <td className="border px-4 py-3 font-medium">Carbs</td>
                    <td className="border px-4 py-3 text-center">11-12g</td>
                    <td className="border px-4 py-3 text-center">15-20g</td>
                    <td className="border px-4 py-3 text-green-700 font-bold">Corn 🏆</td>
                  </tr>
                  <tr className="hover:bg-cream-50">
                    <td className="border px-4 py-3 font-medium">Protein</td>
                    <td className="border px-4 py-3 text-center">1-2g</td>
                    <td className="border px-4 py-3 text-center">3-4g</td>
                    <td className="border px-4 py-3 text-green-700 font-bold">Flour 🏆</td>
                  </tr>
                  <tr className="hover:bg-cream-50">
                    <td className="border px-4 py-3 font-medium">Fat</td>
                    <td className="border px-4 py-3 text-center">0.5-1g</td>
                    <td className="border px-4 py-3 text-center">2-4g</td>
                    <td className="border px-4 py-3 text-green-700 font-bold">Corn 🏆</td>
                  </tr>
                  <tr className="hover:bg-cream-50">
                    <td className="border px-4 py-3 font-medium">Fiber</td>
                    <td className="border px-4 py-3 text-center">1-2g</td>
                    <td className="border px-4 py-3 text-center">1g</td>
                    <td className="border px-4 py-3 text-green-700 font-bold">Corn 🏆</td>
                  </tr>
                  <tr className="hover:bg-cream-50">
                    <td className="border px-4 py-3 font-medium">Sodium</td>
                    <td className="border px-4 py-3 text-center">10-20mg</td>
                    <td className="border px-4 py-3 text-center">150-200mg</td>
                    <td className="border px-4 py-3 text-green-700 font-bold">Corn 🏆</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="font-bold text-green-900 mb-3">🏆 Nutritional Winner: Corn Tortillas</h3>
              <p className="text-green-800">
                Corn tortillas win on almost every nutritional metric - fewer calories, less fat, more fiber, lower sodium, and they're gluten-free. They're also considered a whole grain, providing more nutrients and minerals like magnesium and phosphorus.
              </p>
            </div>
          </section>

          {/* Taste & Texture */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-sunset-500 pb-2">Taste & Texture</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div className="bg-sunset-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">🌽 Corn Tortillas</h3>
                <p className="text-charcoal-700 mb-4"><strong>Taste:</strong> Distinct, earthy corn flavor that's slightly sweet and nutty. The nixtamalization process gives them a unique taste you can't replicate with flour.</p>
                <p className="text-charcoal-700 mb-4"><strong>Texture:</strong> Slightly grainy, less elastic, and more brittle when cold. When heated properly, they become soft and pliable but still have a bit of structure.</p>
                <p className="text-charcoal-700"><strong>Mouthfeel:</strong> Toothsome with a pleasant chew. The corn flavor shines through and complements fillings rather than masking them.</p>
              </div>

              <div className="bg-masa-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">🌾 Flour Tortillas</h3>
                <p className="text-charcoal-700 mb-4"><strong>Taste:</strong> Mild, neutral, slightly wheaty flavor with a hint of richness from the fat. Acts as a blank canvas for fillings.</p>
                <p className="text-charcoal-700 mb-4"><strong>Texture:</strong> Soft, pillowy, and very elastic. Tears less easily and can be stretched without breaking. Stays pliable even when cool.</p>
                <p className="text-charcoal-700"><strong>Mouthfeel:</strong> Tender and fluffy with a slight chew. The fat content makes them feel richer and more satisfying.</p>
              </div>
            </div>

            <div className="bg-cream-100 p-6 rounded-lg">
              <h4 className="font-bold text-charcoal-950 mb-3">Which Tastes Better?</h4>
              <p className="text-charcoal-800">
                It's entirely subjective! <strong>Corn tortillas</strong> have more character and authentic Mexican flavor, perfect for those who want the tortilla to be part of the dish's flavor profile. <strong>Flour tortillas</strong> are more versatile and user-friendly, letting your fillings shine. Most Mexican restaurants in Mexico use corn, while Tex-Mex restaurants often prefer flour.
              </p>
            </div>
          </section>

          {/* Best Uses */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-sunset-500 pb-2">Best Uses: When to Use Which</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-sunset-500">
                <h3 className="text-2xl font-bold text-charcoal-950 mb-4">🌽 Use Corn Tortillas For:</h3>
                <ul className="space-y-3 text-charcoal-700">
                  <li className="flex items-start"><span className="text-sunset-500 font-bold mr-3">✓</span><span><strong>Street Tacos:</strong> The traditional choice - small tortillas with 2-3 ingredients</span></li>
                  <li className="flex items-start"><span className="text-sunset-500 font-bold mr-3">✓</span><span><strong>Enchiladas:</strong> Hold up better when soaked in sauce</span></li>
                  <li className="flex items-start"><span className="text-sunset-500 font-bold mr-3">✓</span><span><strong>Tostadas:</strong> Fry flat for a crispy base</span></li>
                  <li className="flex items-start"><span className="text-sunset-500 font-bold mr-3">✓</span><span><strong>Tortilla Chips:</strong> Cut and fry for authentic chips</span></li>
                  <li className="flex items-start"><span className="text-sunset-500 font-bold mr-3">✓</span><span><strong>Authentic Mexican Dishes:</strong> Anything traditional (carnitas, barbacoa, etc.)</span></li>
                  <li className="flex items-start"><span className="text-sunset-500 font-bold mr-3">✓</span><span><strong>Chilaquiles:</strong> Cut and simmer in salsa</span></li>
                  <li className="flex items-start"><span className="text-sunset-500 font-bold mr-3">✓</span><span><strong>Gluten-Free Needs:</strong> Perfect for celiacs or gluten sensitivity</span></li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-masa-500">
                <h3 className="text-2xl font-bold text-charcoal-950 mb-4">🌾 Use Flour Tortillas For:</h3>
                <ul className="space-y-3 text-charcoal-700">
                  <li className="flex items-start"><span className="text-masa-500 font-bold mr-3">✓</span><span><strong>Burritos:</strong> Large size and flexibility holds heavy fillings</span></li>
                  <li className="flex items-start"><span className="text-masa-500 font-bold mr-3">✓</span><span><strong>Quesadillas:</strong> Melts cheese evenly, folds nicely</span></li>
                  <li className="flex items-start"><span className="text-masa-500 font-bold mr-3">✓</span><span><strong>Wraps & Roll-ups:</strong> Won't crack when rolled tight</span></li>
                  <li className="flex items-start"><span className="text-masa-500 font-bold mr-3">✓</span><span><strong>Fajitas:</strong> Tex-Mex tradition uses flour</span></li>
                  <li className="flex items-start"><span className="text-masa-500 font-bold mr-3">✓</span><span><strong>Soft Tacos:</strong> When you want a softer, milder taco</span></li>
                  <li className="flex items-start"><span className="text-masa-500 font-bold mr-3">✓</span><span><strong>Breakfast Burritos:</strong> Heartier and holds eggs well</span></li>
                  <li className="flex items-start"><span className="text-masa-500 font-bold mr-3">✓</span><span><strong>Kids' Meals:</strong> More familiar flavor, easier to eat</span></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cultural Context */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-sunset-500 pb-2">Cultural & Historical Context</h2>

            <div className="bg-sunset-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-charcoal-950 mb-3">🌽 Corn Tortillas: Ancient Tradition</h3>
              <p className="text-charcoal-700 leading-relaxed">
                Corn tortillas have been a staple of Mexican cuisine for over <strong>10,000 years</strong>. The Mayans and Aztecs developed nixtamalization - treating corn with lime (calcium hydroxide) - which makes the nutrients more bioavailable and creates the unique masa flavor. In Mexico, corn tortillas are still the default choice and are eaten at nearly every meal.
              </p>
            </div>

            <div className="bg-masa-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-charcoal-950 mb-3">🌾 Flour Tortillas: Northern Evolution</h3>
              <p className="text-charcoal-700 leading-relaxed">
                Flour tortillas originated in <strong>Northern Mexico</strong> in the 16th century after Spanish colonizers introduced wheat. They became popular in states like Sonora and Chihuahua, where wheat grows better than corn. In Texas and the Southwest US, flour tortillas dominate due to this Northern Mexican influence. They're now synonymous with Tex-Mex cuisine.
              </p>
            </div>
          </section>

          {/* Pros & Cons */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 border-b-2 border-sunset-500 pb-2">Complete Pros & Cons</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-charcoal-950 mb-4">🌽 Corn Tortillas</h3>
                <div className="bg-green-50 p-5 rounded-lg mb-4 border-l-4 border-green-500">
                  <h4 className="font-bold text-green-900 mb-2">Advantages:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Lower calories & carbs</li>
                    <li>• Gluten-free (celiac-safe)</li>
                    <li>• Authentic Mexican flavor</li>
                    <li>• Whole grain nutrition</li>
                    <li>• More fiber & minerals</li>
                    <li>• Traditional & authentic</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-5 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-bold text-red-900 mb-2">Disadvantages:</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Less flexible/pliable</li>
                    <li>• Can crack when cold</li>
                    <li>• Smaller sizes available</li>
                    <li>• Harder to roll tightly</li>
                    <li>• Acquired taste for some</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-charcoal-950 mb-4">🌾 Flour Tortillas</h3>
                <div className="bg-green-50 p-5 rounded-lg mb-4 border-l-4 border-green-500">
                  <h4 className="font-bold text-green-900 mb-2">Advantages:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Very flexible & pliable</li>
                    <li>• Larger sizes available</li>
                    <li>• Stays soft when cold</li>
                    <li>• Mild, versatile flavor</li>
                    <li>• Better for wrapping</li>
                    <li>• Kid-friendly taste</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-5 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-bold text-red-900 mb-2">Disadvantages:</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Higher calories & fat</li>
                    <li>• Contains gluten</li>
                    <li>• More processed</li>
                    <li>• Less nutritious</li>
                    <li>• Higher sodium</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Can I substitute one for the other?</h3>
                <p className="text-charcoal-700">Yes, but results vary. Corn tortillas work in most flour tortilla recipes but may crack in burritos. Flour tortillas can replace corn in tacos but won't have the authentic flavor. When possible, use the traditional choice for best results.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Do restaurants in Mexico use corn or flour?</h3>
                <p className="text-charcoal-700">Central and Southern Mexico predominantly use corn tortillas (90%+). Northern Mexico (Sonora, Chihuahua) uses more flour tortillas due to wheat agriculture. Street tacos and traditional dishes almost always use corn.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Which tortilla is better for weight loss?</h3>
                <p className="text-charcoal-700">Corn tortillas are better for weight loss - they have 40-60 fewer calories per tortilla, less fat, and more fiber which helps you feel full longer. Two corn tortillas equal the calories of one flour tortilla.</p>
              </div>

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Are corn tortillas always gluten-free?</h3>
                <p className="text-charcoal-700">Corn tortillas are naturally gluten-free since they're made from corn. However, check labels for cross-contamination warnings if you have celiac disease, especially if manufactured in facilities that also process wheat products.</p>
              </div>
            </div>
          </section>

          {/* Final Recommendation */}
          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Recommendation</h2>
            <p className="text-lg leading-relaxed mb-4">
              <strong>Don't choose - use both!</strong> Keep{' '}
              <Link href="/products/corn-tortillas" className="text-sunset-400 hover:text-sunset-300 underline">corn tortillas</Link>{' '}
              for authentic tacos and healthier options, and{' '}
              <Link href="/products/flour-tortillas" className="text-sunset-400 hover:text-sunset-300 underline">flour tortillas</Link>{' '}
              for burritos and quesadillas. Each has its place in a well-stocked kitchen.
            </p>
            <p className="text-lg leading-relaxed">
              If you must choose one: <strong>Go with corn</strong> for authentic flavor and better nutrition, or <strong>go with flour</strong> for versatility and ease of use.
            </p>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-sunset-100 to-masa-100 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Try Both Authentic H-E-B® Tortillas</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/products/corn-tortillas" className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-sunset-400">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Shop Corn Tortillas →</h3>
                <p className="text-charcoal-700 text-sm">Authentic masa flavor, gluten-free, perfect for tacos</p>
              </Link>
              <Link href="/products/flour-tortillas" className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border-2 border-masa-400">
                <h3 className="font-bold text-charcoal-950 mb-2 text-lg">Shop Flour Tortillas →</h3>
                <p className="text-charcoal-700 text-sm">Soft & pliable, perfect for burritos and wraps</p>
              </Link>
            </div>
          </section>

          {/* Related Recipes */}
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Try These Recipes</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/recipes/carne-asada-tacos" className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border border-charcoal-100">
                <span className="inline-block px-2 py-1 bg-masa-100 text-masa-700 text-xs font-semibold rounded mb-2">CORN</span>
                <h3 className="font-bold text-charcoal-950 hover:text-sunset-600 mb-2">Carne Asada Tacos →</h3>
                <p className="text-charcoal-700 text-sm">Classic street-style with corn tortillas</p>
              </Link>
              <Link href="/recipes/breakfast-burritos" className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border border-charcoal-100">
                <span className="inline-block px-2 py-1 bg-sunset-100 text-sunset-700 text-xs font-semibold rounded mb-2">FLOUR</span>
                <h3 className="font-bold text-charcoal-950 hover:text-sunset-600 mb-2">Breakfast Burritos →</h3>
                <p className="text-charcoal-700 text-sm">Hearty flour tortilla breakfast wraps</p>
              </Link>
              <Link href="/recipes/fish-tacos" className="bg-white p-6 rounded-lg hover:shadow-xl transition-shadow border border-charcoal-100">
                <span className="inline-block px-2 py-1 bg-masa-100 text-masa-700 text-xs font-semibold rounded mb-2">CORN</span>
                <h3 className="font-bold text-charcoal-950 hover:text-sunset-600 mb-2">Baja Fish Tacos →</h3>
                <p className="text-charcoal-700 text-sm">Crispy fish with corn tortillas</p>
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
