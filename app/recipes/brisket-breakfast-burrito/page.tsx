import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { TacoIcon, ChefIcon, BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Brisket Breakfast Burrito Recipe with H-E-B® Tortillas',
  description: 'The ultimate Texas breakfast: smoked brisket, scrambled eggs, cheese, and crispy potatoes wrapped in authentic H-E-B® flour tortillas. Perfect for using leftover brisket!',
  keywords: 'brisket breakfast burrito, Texas breakfast, smoked brisket breakfast, H-E-B tortillas breakfast, leftover brisket recipe',
  openGraph: {
    title: 'Brisket Breakfast Burrito Recipe | Lonestar Tortillas',
    description: 'The ultimate Texas breakfast burrito with smoked brisket and H-E-B® tortillas.',
    type: 'article',
  },
};

export default function BrisketBreakfastBurritoRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Brisket Breakfast Burrito',
    description: 'Texas-style breakfast burrito loaded with smoked brisket, scrambled eggs, cheese, crispy potatoes, and salsa, wrapped in H-E-B® flour tortillas',
    prepTime: 'PT15M',
    cookTime: 'PT20M',
    totalTime: 'PT35M',
    recipeYield: '4 servings',
    recipeCategory: 'Breakfast',
    recipeCuisine: 'Tex-Mex',
    keywords: 'brisket breakfast burrito, Texas breakfast, smoked brisket eggs',
    recipeIngredient: [
      '1 lb smoked brisket, chopped',
      '4 large H-E-B® flour tortillas (burrito size, 10-12 inch)',
      '8 large eggs',
      '2 tablespoons butter',
      '2 cups diced potatoes',
      '1 cup shredded cheddar cheese',
      '1/2 cup salsa or pico de gallo',
      '1/4 cup sour cream',
      '2 tablespoons vegetable oil',
      'Salt and pepper to taste',
      'Optional: jalapeños, hot sauce, cilantro, avocado'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        name: 'Cook Breakfast Potatoes',
        text: 'Heat vegetable oil in a large skillet over medium-high heat. Add diced potatoes and cook for 12-15 minutes, stirring occasionally, until golden brown and crispy. Season with salt and pepper. Transfer to a plate.'
      },
      {
        '@type': 'HowToStep',
        name: 'Reheat Brisket',
        text: 'In the same skillet, add chopped brisket with a splash of beef broth or water. Heat for 5-7 minutes until warmed through. Set aside and keep warm.'
      },
      {
        '@type': 'HowToStep',
        name: 'Scramble Eggs',
        text: 'In a bowl, whisk eggs with salt and pepper. In a clean skillet over medium-low heat, melt butter. Add eggs and cook slowly, stirring gently, until soft scrambled. Remove from heat while still slightly wet—they\'ll continue cooking.'
      },
      {
        '@type': 'HowToStep',
        name: 'Warm Tortillas',
        text: 'Warm H-E-B® flour tortillas on a dry skillet or comal for 15-20 seconds per side until pliable. This step is crucial for easy rolling without tearing.'
      },
      {
        '@type': 'HowToStep',
        name: 'Assemble Burritos',
        text: 'Place a warm tortilla on a clean surface. In the center, layer: cheese (this creates a moisture barrier), scrambled eggs, brisket chunks, crispy potatoes, and a spoonful of salsa. Don\'t overfill—leave 2 inches on each side.'
      },
      {
        '@type': 'HowToStep',
        name: 'Roll Burrito',
        text: 'Fold left and right sides of tortilla toward center. Then fold bottom edge over filling, tuck tightly, and roll away from you into a tight cylinder. The H-E-B® tortilla\'s strength is essential here.'
      },
      {
        '@type': 'HowToStep',
        name: 'Optional Toasting',
        text: 'For extra texture, place burrito seam-side down on a hot skillet for 1-2 minutes to seal and crisp the outside. Serve immediately with sour cream and extra salsa.'
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '94'
    },
    nutrition: {
      '@type': 'NutritionInformation',
      calories: '720 calories',
      proteinContent: '42g',
      fatContent: '38g',
      carbohydrateContent: '52g'
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        {/* Hero Section */}
        <header className="relative bg-gradient-to-br from-rust-900 via-charcoal-900 to-charcoal-950 text-cream-50 py-16 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <nav className="flex items-center gap-2 text-sm text-cream-300 mb-6">
              <Link href="/" className="hover:text-sunset-400 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/recipes" className="hover:text-sunset-400 transition-colors">Recipes</Link>
              <span>/</span>
              <span>Brisket Breakfast Burrito</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-sunset-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Breakfast & BBQ</span>
                <span className="text-cream-300 text-sm">• 35 minutes</span>
                <span className="text-cream-300 text-sm">• Serves 4</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
                Brisket Breakfast Burrito
              </h1>

              <p className="text-xl text-cream-100 mb-8">
                The ultimate Texas breakfast: 14-hour smoked brisket meets fluffy scrambled eggs in the only tortilla that can handle it. This is not a diet food—this is breakfast done right.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-cream-50/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                  <div className="text-sunset-400 text-sm font-semibold mb-1">Prep Time</div>
                  <div className="text-2xl font-bold">15 min</div>
                </div>
                <div className="bg-cream-50/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                  <div className="text-sunset-400 text-sm font-semibold mb-1">Cook Time</div>
                  <div className="text-2xl font-bold">20 min</div>
                </div>
                <div className="bg-cream-50/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                  <div className="text-sunset-400 text-sm font-semibold mb-1">Total Time</div>
                  <div className="text-2xl font-bold">35 min</div>
                </div>
                <div className="bg-cream-50/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                  <div className="text-sunset-400 text-sm font-semibold mb-1">Servings</div>
                  <div className="text-2xl font-bold">4 burritos</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Recipe Image */}
        <section className="container mx-auto px-6 -mt-8 relative z-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-rust-800 to-charcoal-900 rounded-2xl shadow-2xl h-[400px] flex items-center justify-center text-cream-300 text-2xl font-bold">
              Brisket Breakfast Burrito Hero Image
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Why This Recipe Works */}
          <section className="mb-12 bg-sunset-50 border-l-4 border-sunset-500 p-8 rounded-r-lg">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-4">Why You Can't Make This Without H-E-B® Tortillas</h2>
            <div className="text-charcoal-800 space-y-3">
              <p>
                Let's be direct: <strong>you absolutely cannot make a proper brisket breakfast burrito without authentic H-E-B® flour tortillas</strong>. We're not being dramatic—this is physics.
              </p>
              <p>
                A loaded breakfast burrito with brisket, eggs, potatoes, cheese, and salsa weighs about 12-14 ounces. That's nearly a pound of hot, juicy, moisture-rich filling wrapped in a single tortilla. Cheap grocery store tortillas will tear, leak, and fall apart before you finish rolling.
              </p>
              <p>
                H-E-B®{' '}
                <Link href="/products/butter-tortillas" className="text-sunset-600 hover:underline font-medium">
                  butter flour tortillas
                </Link>
                {' '}are engineered for this exact scenario. Their structure, moisture content, and pliability make them the ONLY tortillas capable of handling serious breakfast burrito duty. Read the full explanation in our{' '}
                <Link href="/blog/brisket-breakfast-burrito" className="text-sunset-600 hover:underline font-medium">
                  brisket breakfast burrito article
                </Link>
                .
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
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Main Components</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                    <span>1 lb smoked brisket, chopped</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                    <span>4 large{' '}
                      <Link href="/products/butter-tortillas" className="text-sunset-600 hover:underline font-medium">
                        H-E-B® butter flour tortillas
                      </Link>{' '}(burrito size, 10-12 inch)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                    <span>8 large eggs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                    <span>2 tablespoons butter (for eggs)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                    <span>2 cups diced potatoes (russet or Yukon gold)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                    <span>2 tablespoons vegetable oil (for potatoes)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-charcoal-950 mb-4">Fillings & Toppings</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                    <span>1 cup shredded sharp cheddar cheese</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                    <span>1/2 cup salsa or pico de gallo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                    <span>1/4 cup sour cream</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                    <span>Salt and black pepper to taste</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BulletIcon className="w-5 h-5 text-sunset-500 mt-0.5 flex-shrink-0" />
                    <span>Optional: jalapeños, hot sauce, cilantro, avocado, refried beans</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-masa-50 p-6 rounded-lg">
              <h4 className="font-bold text-charcoal-950 mb-2">🥩 About the Brisket</h4>
              <p className="text-charcoal-800 text-sm mb-2">
                This recipe is PERFECT for leftover brisket. You can also buy brisket by the pound from your favorite Texas BBQ joint. For 4 burritos, you need about 1 lb (16 oz) of chopped brisket—that's 4 oz per burrito.
              </p>
              <p className="text-charcoal-800 text-sm">
                <strong>Pro tip:</strong> Include some fatty pieces. The rendered fat is what makes these burritos so incredible. Don't trim it away—embrace it.
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
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Cook Perfect Breakfast Potatoes</h3>
                    <p className="text-charcoal-700 mb-3">
                      Heat 2 tablespoons vegetable oil in a large skillet over medium-high heat. Add diced potatoes in a single layer (don't overcrowd). Cook for 12-15 minutes, stirring occasionally, until golden brown and crispy on the outside, tender on the inside.
                    </p>
                    <p className="text-charcoal-700">
                      Season generously with salt and pepper. The potatoes should be CRISPY—this provides textural contrast to the soft eggs and tender brisket. Transfer to a plate and set aside.
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
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Reheat Brisket Properly</h3>
                    <p className="text-charcoal-700">
                      In the same skillet (no need to clean it—those potato bits add flavor), add your chopped brisket with a splash of beef broth or water. Heat over medium for 5-7 minutes, stirring occasionally, until warmed through. The liquid will keep the brisket moist and create a delicious jus. Set aside and keep warm.
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
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Master the Soft Scramble</h3>
                    <p className="text-charcoal-700 mb-3">
                      In a bowl, whisk 8 eggs with a pinch of salt and pepper. In a clean skillet over medium-LOW heat (this is crucial), melt 2 tablespoons butter. Add eggs and cook SLOWLY, stirring gently with a spatula every 30 seconds.
                    </p>
                    <p className="text-charcoal-700">
                      Remove from heat when eggs are still slightly wet and glossy—they'll continue cooking from residual heat. Overcooked, rubbery eggs ruin breakfast burritos. Soft, creamy scrambled eggs make them legendary.
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
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Warm the Tortillas (Don't Skip!)</h3>
                    <p className="text-charcoal-700 mb-3">
                      This step is NON-NEGOTIABLE. Cold tortillas will crack when you try to roll them. Warm each{' '}
                      <Link href="/products/butter-tortillas" className="text-sunset-600 hover:underline font-medium">
                        H-E-B® tortilla
                      </Link>
                      {' '}on a dry skillet or comal over medium-high heat for 15-20 seconds per side until pliable and slightly puffy.
                    </p>
                    <p className="text-charcoal-700">
                      Stack them in a clean kitchen towel to keep warm. This makes rolling SO much easier. See our{' '}
                      <Link href="/guides/how-to-reheat-tortillas" className="text-sunset-600 hover:underline">
                        tortilla warming guide
                      </Link>
                      {' '}for more techniques.
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
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Assemble in the Right Order</h3>
                    <p className="text-charcoal-700 mb-3">
                      Place a warm tortilla on a clean surface. In the CENTER ONLY (leave 2-3 inches on all sides), layer ingredients in this specific order:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1 text-charcoal-700 text-sm">
                      <li><strong>Cheese first</strong> (creates moisture barrier against tortilla)</li>
                      <li>Scrambled eggs (while still warm)</li>
                      <li>Brisket chunks (4 oz, about 1/2 cup)</li>
                      <li>Crispy potatoes (about 1/2 cup)</li>
                      <li>2 tablespoons salsa (don't overdo it—too much makes it soggy)</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="bg-sunset-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    6
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">The Critical Rolling Technique</h3>
                    <p className="text-charcoal-700 mb-3">
                      <strong>Fold left and right sides</strong> of the tortilla toward the center, covering about 2 inches of filling on each side. This seals the ends.
                    </p>
                    <p className="text-charcoal-700 mb-3">
                      <strong>Fold the bottom edge</strong> up and over the filling. Pull it tight to compress everything (but not so tight the tortilla tears). Tuck the edge under the filling.
                    </p>
                    <p className="text-charcoal-700">
                      <strong>Continue rolling away from you</strong> into a tight cylinder, keeping tension throughout. The strength of H-E-B® tortillas is what allows you to roll this tightly without tearing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-start gap-4">
                  <div className="bg-sunset-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    7
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-950 mb-2">Optional: Toast for Perfection</h3>
                    <p className="text-charcoal-700">
                      For next-level texture, place the rolled burrito seam-side down on a hot skillet for 1-2 minutes. This seals the seam and creates a lightly crispy exterior that contrasts beautifully with the soft interior. Serve immediately with sour cream and extra salsa on the side.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section className="mb-12 bg-gradient-to-br from-masa-50 to-sunset-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Pro Tips from Texas Breakfast Experts</h2>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">🥚 The Low-and-Slow Scramble</h3>
                <p className="text-charcoal-700 text-sm">
                  Medium-LOW heat is the secret to creamy scrambled eggs. High heat makes rubbery eggs. Take your time—good eggs take 5-7 minutes, not 2 minutes.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">🧀 Cheese as a Moisture Barrier</h3>
                <p className="text-charcoal-700 text-sm">
                  Always put cheese down first, directly on the tortilla. As it melts, it creates a barrier that prevents the eggs and salsa from making the tortilla soggy. This is a professional technique that makes a huge difference.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">📏 Don't Overfill</h3>
                <p className="text-charcoal-700 text-sm">
                  The #1 mistake is overfilling. Even H-E-B® tortillas have limits. Stick to 1-1.5 cups total filling. It seems like not enough until you try to roll it. Trust the process.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">🌯 Make-Ahead & Freeze</h3>
                <p className="text-charcoal-700 text-sm">
                  These freeze beautifully! Wrap each burrito in foil, then plastic wrap. Freeze for up to 3 months. Reheat from frozen: unwrap plastic, keep foil on, bake at 350°F for 20-25 minutes. H-E-B® tortillas maintain texture even after freezing—another reason they're essential.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-charcoal-950 mb-2">🥩 Brisket Quality Matters</h3>
                <p className="text-charcoal-700 text-sm">
                  Don't use dry, overcooked brisket. You want moist, fatty brisket with good smoke flavor. If buying from a BBQ joint, ask for "moist brisket" and make sure to get some of the fat cap included. The fat is what makes this breakfast burrito legendary.
                </p>
              </div>
            </div>
          </section>

          {/* Variations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Variations & Customizations</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-sunset-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">🔥 Spicy Brisket Burrito</h3>
                <p className="text-charcoal-700 text-sm">
                  Add diced jalapeños to the eggs while scrambling. Use pepper jack cheese instead of cheddar. Top with hot sauce or make a spicy crema (sour cream + hot sauce + lime juice).
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-masa-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">🫘 Loaded Texas Burrito</h3>
                <p className="text-charcoal-700 text-sm">
                  Add a layer of refried beans before the eggs. This adds creaminess and helps bind everything together. Use half the potatoes to make room for the beans.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-rust-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">🥓 The Triple Meat</h3>
                <p className="text-charcoal-700 text-sm">
                  Go all in: brisket, bacon, AND chorizo. Split the meat (2 oz brisket, 1 strip bacon, 1 oz chorizo per burrito). Yes, it's excessive. Yes, it's incredible.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-sunset-500">
                <h3 className="text-xl font-bold text-charcoal-950 mb-3">🥑 California-Texas Fusion</h3>
                <p className="text-charcoal-700 text-sm">
                  Add sliced avocado or guacamole. The creamy avocado complements the smoky brisket beautifully. Just don't tell anyone from Texas we suggested this.
                </p>
              </div>
            </div>
          </section>

          {/* Related Content */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">You May Also Like</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/recipes/brisket-tacos" className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-charcoal-950 group-hover:text-sunset-600 mb-2">
                    Brisket Tacos →
                  </h3>
                  <p className="text-charcoal-700 text-sm">Another great use for brisket</p>
                  <span className="text-sunset-500 text-xs font-semibold mt-2 inline-block">25 min</span>
                </div>
              </Link>

              <Link href="/recipes/breakfast-tacos" className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-charcoal-950 group-hover:text-sunset-600 mb-2">
                    Breakfast Tacos →
                  </h3>
                  <p className="text-charcoal-700 text-sm">Lighter breakfast option</p>
                  <span className="text-sunset-500 text-xs font-semibold mt-2 inline-block">15 min</span>
                </div>
              </Link>

              <Link href="/blog/brisket-breakfast-burrito" className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-charcoal-950 group-hover:text-sunset-600 mb-2">
                    Burrito Deep Dive →
                  </h3>
                  <p className="text-charcoal-700 text-sm">Full guide & science</p>
                  <span className="text-sunset-500 text-xs font-semibold mt-2 inline-block">10 min read</span>
                </div>
              </Link>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-4">Ready for the Ultimate Breakfast Burrito?</h2>
            <p className="text-cream-200 mb-6 max-w-2xl mx-auto">
              You need authentic H-E-B® butter flour tortillas. They're the ONLY tortillas that can handle a fully-loaded brisket breakfast burrito without falling apart.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
              >
                Shop H-E-B® Tortillas
              </Link>
              <Link
                href="/blog/bbq-meets-tortillas"
                className="bg-transparent border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                BBQ Guide
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
