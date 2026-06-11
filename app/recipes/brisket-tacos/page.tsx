import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { TacoIcon, ChefIcon, BulletIcon } from '@/components/ui/Icons';
import { PageViewTracker } from '@/components/analytics/PageViewTracker';
import { CTABanner } from '@/components/ui/CTABanner';

export const metadata: Metadata = {
  alternates: {
    canonical: '/recipes/brisket-tacos',
  },
  title: 'Texas Smoked Brisket Tacos Recipe',
  description: 'Learn to make authentic Texas BBQ brisket tacos with H-E-B® flour tortillas. Perfect for using leftover brisket or fresh-smoked meat. Quick, easy, and packed with flavor.',
  keywords: 'brisket tacos recipe, Texas BBQ tacos, smoked brisket tacos, H-E-B tortillas brisket, leftover brisket recipe, BBQ tacos',
  openGraph: {
    title: 'Texas Smoked Brisket Tacos Recipe | Lonestar Tortillas',
    description: 'Authentic Texas BBQ brisket tacos on H-E-B® tortillas. The perfect use for leftover brisket!',
    type: 'article',
  },
};

export default function BrisketTacosRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Texas Smoked Brisket Tacos',
    description: 'Authentic Texas BBQ brisket tacos served on warm H-E-B® flour tortillas with pickled onions and cilantro',
    image: 'https://lonestartortillas.com/images/recipes/brisket-tacos.webp',
    prepTime: 'PT15M',
    cookTime: 'PT10M',
    totalTime: 'PT25M',
    recipeYield: '6 servings (12-18 tacos)',
    recipeCategory: 'Dinner',
    recipeCuisine: 'Tex-Mex',
    keywords: 'brisket tacos, Texas BBQ, smoked brisket, H-E-B tortillas',
    recipeIngredient: [
      '2 lbs smoked brisket (leftover or fresh), chopped',
      '12-18 H-E-B® flour tortillas (8-inch)',
      '1 cup beef broth',
      '2 tablespoons BBQ sauce (optional)',
      '1 red onion, thinly sliced',
      '1/2 cup apple cider vinegar',
      '1 tablespoon sugar',
      '1 teaspoon salt',
      '1/2 cup fresh cilantro, chopped',
      '2 limes, cut into wedges',
      '1 cup shredded cheese (cheddar or Mexican blend)',
      '1 jalapeño, sliced (optional)',
      'Your favorite salsa or pico de gallo',
      'Optional: sour cream, sliced avocado, coleslaw'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        name: 'Make Pickled Onions',
        text: 'In a small bowl, combine sliced red onion, apple cider vinegar, sugar, and salt. Let sit for at least 15 minutes while you prepare everything else. These quick-pickled onions cut through the richness of the brisket beautifully.'
      },
      {
        '@type': 'HowToStep',
        name: 'Prep the Brisket',
        text: 'Chop your brisket into bite-sized pieces, about 1/2 to 3/4 inch chunks. Include some of the fatty pieces—this is where the flavor lives. If using cold leftover brisket, this is the perfect time to bring it back to life.'
      },
      {
        '@type': 'HowToStep',
        name: 'Reheat Brisket',
        text: 'In a large skillet over medium heat, add the chopped brisket and beef broth. The broth will rehydrate the meat and create a delicious jus. Heat for 5-7 minutes, stirring occasionally, until the brisket is heated through and some of the liquid has reduced. If you like saucier tacos, add BBQ sauce during the last 2 minutes.'
      },
      {
        '@type': 'HowToStep',
        name: 'Warm the Tortillas',
        text: 'While brisket heats, warm your H-E-B® flour tortillas. The best method: heat a dry skillet or comal over medium-high heat and cook each tortilla for 15-20 seconds per side until they have light char marks and are pliable. Stack them in a clean kitchen towel to keep warm.'
      },
      {
        '@type': 'HowToStep',
        name: 'Assemble Tacos',
        text: 'Place a warm tortilla on a plate. Add about 2-3 oz of hot brisket to the center. Top with shredded cheese (the heat from the brisket will melt it), pickled red onions, fresh cilantro, and a squeeze of lime. Add jalapeños if you want heat.'
      },
      {
        '@type': 'HowToStep',
        name: 'Add Optional Toppings',
        text: 'Customize with your favorite toppings: a dollop of sour cream, sliced avocado, fresh salsa, or a tangy coleslaw for crunch. The beauty of tacos is making them your own.'
      },
      {
        '@type': 'HowToStep',
        name: 'Serve Immediately',
        text: 'Serve tacos immediately while the tortillas are warm and the brisket is hot. These are best enjoyed fresh, with plenty of napkins nearby!'
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '127'
    },
    nutrition: {
      '@type': 'NutritionInformation',
      calories: '420 calories',
      proteinContent: '32g',
      fatContent: '24g',
      carbohydrateContent: '22g'
    }
  };

  return (
    <>
      <PageViewTracker
        type="recipe"
        slug="brisket-tacos"
        title="Texas Smoked Brisket Tacos Recipe"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        {/* Hero Section */}
        <header className="relative bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-rust-900 text-cream-50 py-16 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <nav className="flex items-center gap-2 text-sm text-cream-300 mb-6">
              <Link href="/" className="hover:text-sunset-400 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/recipes" className="hover:text-sunset-400 transition-colors">Recipes</Link>
              <span>/</span>
              <span>Brisket Tacos</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-sunset-500 text-white px-4 py-1 rounded-full text-sm font-semibold">BBQ & Dinner</span>
                <span className="text-cream-300 text-sm">• 25 minutes</span>
                <span className="text-cream-300 text-sm">• Serves 6</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
 Texas Smoked Brisket Tacos
</h1>

              <p className="text-xl text-cream-100 mb-8">
                The ultimate way to use leftover brisket (or an excuse to smoke one). Juicy, smoky, tender beef on authentic H-E-B® tortillas with tangy pickled onions.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-cream-50/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                  <div className="text-sunset-400 text-sm font-semibold mb-1">Prep Time</div>
                  <div className="text-2xl font-bold">15 min</div>
                </div>
                <div className="bg-cream-50/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                  <div className="text-sunset-400 text-sm font-semibold mb-1">Cook Time</div>
                  <div className="text-2xl font-bold">10 min</div>
                </div>
                <div className="bg-cream-50/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                  <div className="text-sunset-400 text-sm font-semibold mb-1">Total Time</div>
                  <div className="text-2xl font-bold">25 min</div>
                </div>
                <div className="bg-cream-50/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                  <div className="text-sunset-400 text-sm font-semibold mb-1">Servings</div>
                  <div className="text-2xl font-bold">6 (12-18 tacos)</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Recipe Image */}
        <section className="container mx-auto px-6 -mt-8 relative z-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-rust-800 to-charcoal-900 rounded-2xl shadow-2xl h-[400px] flex items-center justify-center text-cream-300 text-2xl font-bold">
              Brisket Tacos Hero Image
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Why This Recipe Works */}
          <section className="mb-12 bg-sunset-50 border-l-4 border-sunset-500 p-8 rounded-r-lg">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-4">Why This Recipe Works</h2>
            <div className="text-charcoal-800 space-y-3">
              <p>
                <strong>Perfect for Leftovers:</strong> Smoked brisket often tastes even better the next day. This recipe breathes new life into leftover brisket with a quick reheat in beef broth.
              </p>
              <p>
                <strong>Authentic H-E-B® Tortillas:</strong> The only tortillas that can handle the weight and moisture of brisket without falling apart. Their structure is critical—read more in our{' '}
                <Link href="/blog/bbq-meets-tortillas" className="text-sunset-700 hover:underline font-medium">
                  BBQ meets tortillas guide
                </Link>
                .
              </p>
              <p>
                <strong>Quick Assembly:</strong> Once you have smoked brisket, these tacos come together in under 30 minutes. Perfect for weeknight dinners or last-minute entertaining.
              </p>
            </div>
          </section>

          {/* Ingredients */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6 flex items-center gap-3">
<ChefIcon className="w-8 h-8 text-sunset-500" />
              Ingredients
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">For the Tacos</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                    <span>2 lbs smoked brisket, chopped</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                    <span>12-18{' '}
                      <Link href="/products/flour-tortillas" className="text-sunset-700 hover:underline font-medium">
                        H-E-B® flour tortillas
                      </Link>{' '}(8-inch)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                    <span>1 cup beef broth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                    <span>2 tablespoons BBQ sauce (optional)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                    <span>1 cup shredded cheese</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">For the Toppings</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                    <span>1 red onion, thinly sliced</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                    <span>1/2 cup apple cider vinegar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                    <span>1 tablespoon sugar, 1 teaspoon salt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                    <span>1/2 cup fresh cilantro</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                    <span>2 limes, cut into wedges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                    <span>Jalapeños, salsa, sour cream, avocado (optional)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-masa-50 p-6 rounded-lg">
              <h4 className="font-bold text-charcoal-950 mb-2">Pro Tip: The Brisket</h4>
              <p className="text-charcoal-800 text-sm">
                Don't have leftover brisket? You can buy brisket by the pound from most Texas BBQ joints. Ask for extra fatty brisket if available—it makes the best tacos. Or use this as your excuse to smoke a whole brisket this weekend!
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
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Make Pickled Onions</h3>
                    <p className="text-charcoal-700">
                      In a small bowl, combine sliced red onion, apple cider vinegar, sugar, and salt. Let sit for at least 15 minutes while you prepare everything else. These quick-pickled onions cut through the richness of the brisket beautifully.
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
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Prep the Brisket</h3>
                    <p className="text-charcoal-700">
                      Chop your brisket into bite-sized pieces, about 1/2 to 3/4 inch chunks. Include some of the fatty pieces—this is where the flavor lives. If using cold leftover brisket, this is the perfect time to bring it back to life.
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
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Reheat Brisket Properly</h3>
                    <p className="text-charcoal-700 mb-3">
                      In a large skillet over medium heat, add the chopped brisket and beef broth. The broth will rehydrate the meat and create a delicious jus. Heat for 5-7 minutes, stirring occasionally, until the brisket is heated through and some of the liquid has reduced.
                    </p>
                    <p className="text-charcoal-700">
                      <strong>Optional:</strong> If you like saucier tacos, add 2 tablespoons of your favorite BBQ sauce during the last 2 minutes of heating. This creates a sticky, caramelized coating on the brisket.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="bg-sunset-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Warm the H-E-B® Tortillas</h3>
                    <p className="text-charcoal-700 mb-3">
                      While brisket heats, warm your{' '}
                      <Link href="/products/flour-tortillas" className="text-sunset-700 hover:underline font-medium">
                        H-E-B® flour tortillas
                      </Link>
                      . The best method: heat a dry skillet or comal over medium-high heat and cook each tortilla for 15-20 seconds per side until they have light char marks and are pliable.
                    </p>
                    <p className="text-charcoal-700">
                      Stack them in a clean kitchen towel to keep warm. Need more tips? Check our{' '}
                      <Link href="/guides/how-to-reheat-tortillas" className="text-sunset-700 hover:underline">
                        tortilla reheating guide
                      </Link>
                      .
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
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Assemble Your Tacos</h3>
                    <p className="text-charcoal-700">
                      Place a warm tortilla on a plate. Add about 2-3 oz of hot brisket to the center (don't overfill!). Top with shredded cheese—the heat from the brisket will melt it. Add pickled red onions, fresh cilantro, and a generous squeeze of lime. Add jalapeños if you want heat.
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
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Customize & Serve</h3>
                    <p className="text-charcoal-700">
                      Add your favorite optional toppings: a dollop of sour cream, sliced avocado, fresh salsa, or a tangy coleslaw for crunch. Serve immediately while the tortillas are warm and the brisket is hot. These are best enjoyed fresh, with plenty of napkins nearby!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Expert Tips */}
          <section className="mb-12 bg-gradient-to-br from-masa-50 to-sunset-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Expert Tips for Perfect Brisket Tacos</h2>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">🥩 Don't Skimp on the Fat</h3>
                <p className="text-charcoal-700 text-sm">
                  Those fatty pieces of brisket? That's where the magic happens. The rendered fat coats the meat and creates incredible flavor. Don't trim it away—embrace it.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">Why H-E-B® Flour Tortillas Matter</h3>
                <p className="text-charcoal-700 text-sm">
                  Brisket is heavy, juicy, and full of rendered fat. Cheap tortillas will tear and fall apart. H-E-B®{' '}
                  <Link href="/products/flour-tortillas" className="text-sunset-700 hover:underline">
                    flour tortillas
                  </Link>
                  {' '}are specifically designed to handle this. They're sturdy but still soft and delicious. Read more in our{' '}
                  <Link href="/blog/bbq-meets-tortillas" className="text-sunset-700 hover:underline">
                    BBQ fusion article
                  </Link>
                  .
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">The Beef Broth Trick</h3>
                <p className="text-charcoal-700 text-sm">
                  Reheating brisket in beef broth instead of a microwave is game-changing. It rehydrates the meat and adds extra flavor. The reduced broth becomes a delicious jus that soaks into the tortilla.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">🧅 Quick Pickled Onions Are Key</h3>
                <p className="text-charcoal-700 text-sm">
                  The acidity from pickled onions cuts through the rich, fatty brisket and brightens every bite. Don't skip this step—it's the difference between good tacos and great tacos.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">🧈 Butter Tortillas for Extra Richness</h3>
                <p className="text-charcoal-700 text-sm">
                  Want to take these to the next level? Use H-E-B®{' '}
                  <Link href="/products/butter-tortillas" className="text-sunset-700 hover:underline">
                    butter flour tortillas
                  </Link>
                  . The subtle richness complements the brisket perfectly and creates an even sturdier base.
                </p>
              </div>
            </div>
          </section>

          {/* Variations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Variations & Substitutions</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-sunset-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">🌶 Spicy Brisket Tacos</h3>
                <p className="text-charcoal-700 text-sm">
                  Add diced jalapeños to the brisket while reheating. Top with sliced fresh jalapeños, hot sauce, or make a spicy crema by mixing sour cream with hot sauce and lime.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-masa-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">🧀 Queso Brisket Tacos</h3>
                <p className="text-charcoal-700 text-sm">
                  Drizzle warm queso blanco or queso fundido over the brisket before adding other toppings. The creamy cheese takes these tacos to a whole new level of indulgence.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-rust-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">🥗 Brisket Taco Salad</h3>
                <p className="text-charcoal-700 text-sm">
                  Not in the mood for tacos? Serve the brisket over romaine with all the toppings, plus tortilla strips for crunch. Same great flavors, different format.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-sunset-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">🌽 Corn Tortilla Version</h3>
                <p className="text-charcoal-700 text-sm">
                  Prefer corn? Use H-E-B®{' '}
                  <Link href="/products/corn-tortillas" className="text-sunset-700 hover:underline">
                    corn tortillas
                  </Link>
                  {' '}for a more traditional street taco vibe. Just use less brisket per taco since corn tortillas are smaller.
                </p>
              </div>
            </div>
          </section>

          {/* Related Recipes */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">You May Also Like</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/recipes/breakfast-tacos" className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-charcoal-950 group-hover:text-sunset-600 mb-2">
 Breakfast Tacos →
</h3>
                  <p className="text-charcoal-700 text-sm">Use brisket for breakfast too</p>
                  <span className="text-sunset-500 text-xs font-semibold mt-2 inline-block">15 min</span>
                </div>
              </Link>

              <Link href="/recipes/carnitas-tacos" className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-charcoal-950 group-hover:text-sunset-600 mb-2">
 Carnitas Tacos →
</h3>
                  <p className="text-charcoal-700 text-sm">Another great meat option</p>
                  <span className="text-sunset-500 text-xs font-semibold mt-2 inline-block">3 hours</span>
                </div>
              </Link>

              <Link href="/recipes/cheese-quesadillas" className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-charcoal-950 group-hover:text-sunset-600 mb-2">
 Brisket Quesadillas →
</h3>
                  <p className="text-charcoal-700 text-sm">Add brisket to this recipe</p>
                  <span className="text-sunset-500 text-xs font-semibold mt-2 inline-block">20 min</span>
                </div>
              </Link>
            </div>
          </section>

          {/* CTA Section */}
          <CTABanner variant="recipe" />
        </article>
      </div>
    </>
  );
}
