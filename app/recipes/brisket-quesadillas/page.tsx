import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { TacoIcon, ChefIcon, BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Crispy Brisket Quesadillas Recipe',
  description: 'Transform leftover brisket into crispy, cheesy quesadillas with H-E-B® flour tortillas. Quick 15-minute recipe that turns BBQ into comfort food perfection.',
  keywords: 'brisket quesadillas, BBQ quesadillas, leftover brisket recipe, H-E-B tortillas quesadillas, Texas quesadillas',
  openGraph: {
    title: 'Crispy Brisket Quesadillas Recipe | Lonestar Tortillas',
    description: 'The best use for leftover brisket: crispy, cheesy quesadillas on H-E-B® tortillas.',
    type: 'article',
  },
};

export default function BrisketQuesadillasRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Brisket Quesadillas',
    description: 'Crispy quesadillas loaded with smoked brisket and melted cheese, made with authentic H-E-B® flour tortillas',
    image: 'https://lonestartortillas.com/images/recipes/brisket-quesadillas.webp',
    prepTime: 'PT10M',
    cookTime: 'PT15M',
    totalTime: 'PT25M',
    recipeYield: '4 servings',
    recipeCategory: 'Lunch/Dinner',
    recipeCuisine: 'Tex-Mex',
    keywords: 'brisket quesadillas, BBQ quesadillas, cheesy brisket',
    recipeIngredient: [
      '8 H-E-B® flour tortillas (8-10 inch)',
      '1 lb smoked brisket, chopped',
      '2 cups shredded cheese (cheddar, Monterey Jack, or Mexican blend)',
      '2 tablespoons butter',
      '1/2 cup caramelized onions (optional)',
      '2 jalapeños, sliced (optional)',
      'Sour cream for serving',
      'Salsa for serving',
      'Guacamole for serving (optional)'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        name: 'Prep Ingredients',
        text: 'Chop brisket into small pieces. Shred cheese if using block cheese. Have all ingredients ready—quesadillas cook fast.'
      },
      {
        '@type': 'HowToStep',
        name: 'Heat Skillet',
        text: 'Heat a large skillet or griddle over medium heat. Add a small pat of butter and let it melt, coating the pan.'
      },
      {
        '@type': 'HowToStep',
        name: 'Assemble Quesadilla',
        text: 'Place one H-E-B® tortilla in the skillet. Quickly add cheese to half the tortilla, then brisket, then more cheese on top. Add optional jalapeños or onions. Fold tortilla in half to create a half-moon shape.'
      },
      {
        '@type': 'HowToStep',
        name: 'Cook Until Golden',
        text: 'Cook for 2-3 minutes until the bottom is golden brown and crispy. Carefully flip and cook another 2-3 minutes until the second side is golden and cheese is fully melted.'
      },
      {
        '@type': 'HowToStep',
        name: 'Slice and Serve',
        text: 'Transfer to a cutting board and let cool for 1 minute. Slice into 3 wedges. Serve immediately with sour cream, salsa, and guacamole.'
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '156'
    },
    nutrition: {
      '@type': 'NutritionInformation',
      calories: '520 calories',
      proteinContent: '36g',
      fatContent: '32g',
      carbohydrateContent: '28g'
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        {/* Hero Section */}
        <header className="relative bg-gradient-to-br from-charcoal-950 via-rust-900 to-charcoal-900 text-cream-50 py-16 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <nav className="flex items-center gap-2 text-sm text-cream-300 mb-6">
              <Link href="/" className="hover:text-sunset-400 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/recipes" className="hover:text-sunset-400 transition-colors">Recipes</Link>
              <span>/</span>
              <span>Brisket Quesadillas</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-sunset-500 text-white px-4 py-1 rounded-full text-sm font-semibold">BBQ & Quick Meals</span>
                <span className="text-cream-300 text-sm">• 25 minutes</span>
                <span className="text-cream-300 text-sm">• Serves 4</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
                Crispy Brisket Quesadillas
              </h1>

              <p className="text-xl text-cream-100 mb-8">
                The absolute best way to use leftover brisket. Crispy on the outside, loaded with melted cheese and smoky beef on the inside. Ready in 15 minutes.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-cream-50/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                  <div className="text-sunset-400 text-sm font-semibold mb-1">Prep Time</div>
                  <div className="text-2xl font-bold">10 min</div>
                </div>
                <div className="bg-cream-50/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                  <div className="text-sunset-400 text-sm font-semibold mb-1">Cook Time</div>
                  <div className="text-2xl font-bold">15 min</div>
                </div>
                <div className="bg-cream-50/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                  <div className="text-sunset-400 text-sm font-semibold mb-1">Difficulty</div>
                  <div className="text-2xl font-bold">Easy</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Recipe Image */}
        <section className="container mx-auto px-6 -mt-8 relative z-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-rust-800 to-charcoal-900 rounded-2xl shadow-2xl h-[400px] flex items-center justify-center text-cream-300 text-2xl font-bold">
              Brisket Quesadillas Hero Image
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Why This Recipe Works */}
          <section className="mb-12 bg-sunset-50 border-l-4 border-sunset-500 p-8 rounded-r-lg">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-4">The Perfect Leftover Brisket Recipe</h2>
            <div className="text-charcoal-800 space-y-3">
              <p>
                Smoked a brisket over the weekend? Day 2 and 3 brisket is often BETTER than day 1—the flavors have melded, the smoke has penetrated deeper. But eating brisket the same way gets old. Enter: brisket quesadillas.
              </p>
              <p>
                This recipe transforms leftover brisket into something completely different but equally delicious. The crispy{' '}
                <Link href="/products/flour-tortillas" className="text-sunset-600 hover:underline font-medium">
                  H-E-B® tortilla
                </Link>
                {' '}exterior, the gooey melted cheese, the chunks of smoky brisket—it's comfort food meets BBQ perfection.
              </p>
              <p>
                <strong>Why H-E-B® tortillas matter:</strong> Cheap tortillas get soggy when you butter and grill them. H-E-B® tortillas crisp up beautifully while staying structurally sound. They can handle the weight of cheese and brisket without falling apart. There's a reason every taqueria in Texas uses these.
              </p>
            </div>
          </section>

          {/* Ingredients */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 flex items-center gap-3">
              <ChefIcon className="w-8 h-8 text-sunset-500" />
              Ingredients
            </h2>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                  <span><strong>8{' '}
                    <Link href="/products/flour-tortillas" className="text-sunset-600 hover:underline font-medium">
                      H-E-B® flour tortillas
                    </Link></strong> (8-10 inch) - Use{' '}
                    <Link href="/products/butter-tortillas" className="text-sunset-600 hover:underline font-medium">
                      butter tortillas
                    </Link>
                    {' '}for extra richness</span>
                </li>
                <li className="flex items-start gap-3">
                  <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                  <span><strong>1 lb smoked brisket, chopped</strong> - Preferably with some fat included</span>
                </li>
                <li className="flex items-start gap-3">
                  <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                  <span><strong>2 cups shredded cheese</strong> - Sharp cheddar, Monterey Jack, or Mexican blend (or mix all three!)</span>
                </li>
                <li className="flex items-start gap-3">
                  <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                  <span><strong>2 tablespoons butter</strong> - For grilling the quesadillas to golden perfection</span>
                </li>
                <li className="flex items-start gap-3">
                  <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                  <span><strong>1/2 cup caramelized onions</strong> (optional) - Sweet contrast to smoky brisket</span>
                </li>
                <li className="flex items-start gap-3">
                  <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                  <span><strong>2 jalapeños, sliced</strong> (optional) - Fresh or pickled</span>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-charcoal-200">
                <h4 className="font-bold text-charcoal-950 mb-3">For Serving:</h4>
                <ul className="space-y-2 text-charcoal-700">
                  <li>• Sour cream</li>
                  <li>• Your favorite salsa (verde, roja, or pico de gallo)</li>
                  <li>• Guacamole (optional but highly recommended)</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-masa-50 p-6 rounded-lg">
              <h4 className="font-bold text-charcoal-950 mb-2">🧀 Cheese Pro Tip</h4>
              <p className="text-charcoal-800 text-sm">
                Use freshly shredded cheese from a block—NOT pre-shredded bagged cheese. Pre-shredded cheese is coated with anti-caking agents that prevent proper melting. Freshly shredded melts into creamy, gooey perfection. It's worth the extra 2 minutes.
              </p>
            </div>
          </section>

          {/* Instructions */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Step-by-Step Instructions</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="bg-sunset-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Prep Your Ingredients</h3>
                    <p className="text-charcoal-700">
                      Chop brisket into small, bite-sized pieces (about 1/4 to 1/2 inch). If using block cheese, shred it. Have everything measured and ready to go—quesadillas cook FAST, and you don't want to be scrambling for ingredients mid-cook.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="bg-sunset-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Heat Your Cooking Surface</h3>
                    <p className="text-charcoal-700 mb-3">
                      Heat a large skillet, griddle, or comal over medium heat. Not too hot—medium is key. Too high and the tortilla burns before the cheese melts. Too low and you don't get that crispy exterior.
                    </p>
                    <p className="text-charcoal-700">
                      Add a small pat of butter (about 1/2 tablespoon) and let it melt, tilting the pan to coat the surface. The butter is what creates that golden, crispy exterior on the tortilla.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="bg-sunset-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Assemble the Quesadilla</h3>
                    <p className="text-charcoal-700 mb-3">
                      Place one H-E-B® tortilla flat in the buttered skillet. Working QUICKLY (you're on the clock):
                    </p>
                    <ol className="list-decimal pl-5 space-y-1 text-charcoal-700 text-sm">
                      <li>Sprinkle cheese on half the tortilla (about 1/3 cup)</li>
                      <li>Add chopped brisket (about 2-3 oz)</li>
                      <li>Add optional ingredients (caramelized onions, jalapeños)</li>
                      <li>Top with another layer of cheese (helps bind everything)</li>
                      <li>Fold the empty half over to create a half-moon</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="bg-sunset-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Cook to Golden Perfection</h3>
                    <p className="text-charcoal-700 mb-3">
                      Cook for 2-3 minutes without moving it. You'll know it's ready to flip when:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-charcoal-700 text-sm mb-3">
                      <li>The bottom tortilla is golden brown (peek with a spatula)</li>
                      <li>Cheese is starting to melt and ooze slightly</li>
                      <li>The quesadilla holds together when you slide a spatula under it</li>
                    </ul>
                    <p className="text-charcoal-700">
                      Carefully flip with a large spatula. Cook another 2-3 minutes until the second side is golden and crispy, and cheese is fully melted and gooey.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="bg-sunset-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Slice and Serve Immediately</h3>
                    <p className="text-charcoal-700 mb-3">
                      Transfer to a cutting board and let cool for 1 minute—this lets the cheese set slightly so it doesn't all pour out when you slice. Cut into 3 wedges with a sharp knife or pizza cutter.
                    </p>
                    <p className="text-charcoal-700">
                      Serve immediately with sour cream, salsa, and guacamole on the side. Quesadillas are best eaten fresh and hot—the crispy exterior gets soggy if they sit too long.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="bg-sunset-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    6
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Repeat for Remaining Quesadillas</h3>
                    <p className="text-charcoal-700">
                      Add more butter to the skillet between each quesadilla. The recipe makes 4 quesadillas (8 tortillas total, 2 per person). Keep finished quesadillas warm in a 200°F oven while you cook the rest, or serve as you cook—your call!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section className="mb-12 bg-gradient-to-br from-masa-50 to-sunset-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Expert Quesadilla Tips</h2>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">🔥 Temperature is Everything</h3>
                <p className="text-charcoal-700 text-sm">
                  Medium heat is non-negotiable. High heat burns the tortilla before the cheese melts. Low heat makes a limp, pale quesadilla. Medium gives you that perfect golden crust with melted, gooey cheese.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">🧈 Butter Every Time</h3>
                <p className="text-charcoal-700 text-sm">
                  Don't skip the butter between quesadillas. Each one needs its own pat of butter for that crispy, golden exterior. You can use oil instead, but butter tastes better and browns more evenly.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">📦 Don't Overstuff</h3>
                <p className="text-charcoal-700 text-sm">
                  More filling ≠ better quesadilla. Overstuffed quesadillas don't seal properly, cheese oozes out, and they're impossible to flip. Stick to 2-3 oz brisket and 2/3 cup cheese per quesadilla. Trust the process.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">🥩 Cold Brisket is Fine</h3>
                <p className="text-charcoal-700 text-sm">
                  No need to pre-heat the brisket—it'll warm up while the quesadilla cooks. Cold brisket actually works better because it doesn't add extra moisture that could make the tortilla soggy.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">🌶️ Add Heat Strategically</h3>
                <p className="text-charcoal-700 text-sm">
                  If using jalapeños, pickled work better than fresh—they're already soft and won't create crunchy pockets that break the seal. Fresh jalapeños need to be sliced very thin.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">🍴 The Spatula Matters</h3>
                <p className="text-charcoal-700 text-sm">
                  Use a wide, sturdy spatula for flipping. A small, flimsy spatula will cause the quesadilla to fold or break. Support the entire half-moon when flipping for best results.
                </p>
              </div>
            </div>
          </section>

          {/* Variations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Delicious Variations</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-sunset-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">🧀 Four-Cheese Brisket</h3>
                <p className="text-charcoal-700 text-sm">
                  Mix cheddar, Monterey Jack, mozzarella, and pepper jack. Each cheese brings something different: sharpness, meltability, stretch, and heat. The ultimate cheese pull.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-masa-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">🍺 BBQ Sauce Drizzle</h3>
                <p className="text-charcoal-700 text-sm">
                  Drizzle a thin layer of BBQ sauce on the cheese before adding brisket. Don't overdo it (makes it soggy), but a little BBQ sauce adds tangy sweetness that's incredible.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-rust-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">🌽 Corn & Black Bean</h3>
                <p className="text-charcoal-700 text-sm">
                  Add corn kernels and black beans for texture and substance. Rinse and drain the beans well—excess moisture is the enemy. This makes it more of a complete meal.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-sunset-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">🥓 Burnt Ends Special</h3>
                <p className="text-charcoal-700 text-sm">
                  Got burnt ends? Even better! The crispy, caramelized pieces of bark add incredible texture. Chop them small so they distribute evenly. This is peak BBQ quesadilla.
                </p>
              </div>
            </div>
          </section>

          {/* Serving Suggestions */}
          <section className="mb-12 bg-charcoal-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">What to Serve With Brisket Quesadillas</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Classic Pairings:</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• <strong>Mexican Rice</strong> - Absorbs those cheesy drips</li>
                  <li>• <strong>Refried Beans</strong> - Creamy, comforting side</li>
                  <li>• <strong>Chips & Guacamole</strong> - Keep it simple</li>
                  <li>• <strong>Coleslaw</strong> - Crunchy, tangy contrast</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-charcoal-950 mb-3">Elevated Options:</h3>
                <ul className="space-y-2 text-charcoal-700 text-sm">
                  <li>• <strong>Elote (Mexican Street Corn)</strong> - Sweet & spicy</li>
                  <li>• <strong>Black Bean Salad</strong> - Fresh and light</li>
                  <li>• <strong>Queso Fundido</strong> - Double cheese? Yes.</li>
                  <li>• <strong>Pickled Jalapeños</strong> - Extra kick</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Related Content */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">More Brisket Recipes</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/recipes/brisket-tacos" className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-charcoal-950 group-hover:text-sunset-600 mb-2">
                    Brisket Tacos →
                  </h3>
                  <p className="text-charcoal-700 text-sm">Classic brisket tacos</p>
                  <span className="text-sunset-500 text-xs font-semibold mt-2 inline-block">25 min</span>
                </div>
              </Link>

              <Link href="/recipes/brisket-breakfast-burrito" className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-charcoal-950 group-hover:text-sunset-600 mb-2">
                    Breakfast Burrito →
                  </h3>
                  <p className="text-charcoal-700 text-sm">Morning brisket magic</p>
                  <span className="text-sunset-500 text-xs font-semibold mt-2 inline-block">35 min</span>
                </div>
              </Link>

              <Link href="/recipes/cheese-quesadillas" className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-charcoal-950 group-hover:text-sunset-600 mb-2">
                    Classic Quesadillas →
                  </h3>
                  <p className="text-charcoal-700 text-sm">The original recipe</p>
                  <span className="text-sunset-500 text-xs font-semibold mt-2 inline-block">15 min</span>
                </div>
              </Link>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-4">Make Perfect Quesadillas Every Time</h2>
            <p className="text-cream-200 mb-6 max-w-2xl mx-auto">
              Get authentic H-E-B® flour tortillas delivered. The only tortillas that crisp up beautifully while holding all that brisket and cheese without falling apart.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
              >
                Shop Tortillas
              </Link>
              <Link
                href="/blog/bbq-meets-tortillas"
                className="bg-transparent border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                BBQ & Tortillas Guide
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
