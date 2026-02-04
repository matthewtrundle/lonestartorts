import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LastUpdated } from '@/components/seo/LastUpdated';

export const metadata: Metadata = {
  title: 'Street Tacos at Home: Master Taqueria Style | Lonestar Tortillas',
  description: 'Learn to make authentic street tacos at home like a real taqueria. Complete recipes for carne asada, carnitas, and al pastor with traditional toppings and the right tortillas.',
  keywords: 'street tacos recipe, authentic street tacos, how to make street tacos, taqueria style tacos, carne asada tacos, carnitas recipe, al pastor at home, corn tortillas for tacos',
  alternates: {
    canonical: 'https://lonestartortillas.com/blog/street-tacos-at-home',
  },
  openGraph: {
    title: 'Street Tacos at Home: Master Taqueria Style',
    description: 'Complete guide to making authentic street tacos with traditional recipes and techniques.',
    type: 'article',
    images: ['/images/blog/street-tacos-hero.webp'],
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Street Tacos at Home: Master Taqueria Style',
  description: 'Complete guide to making authentic street tacos at home with recipes for carne asada, carnitas, and al pastor.',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas',
    logo: {
      '@type': 'ImageObject',
      url: 'https://lonestartortillas.com/logo.png'
    }
  },
  datePublished: '2026-02-03',
  dateModified: '2026-02-03',
  articleSection: 'Recipes',
  mainEntityOfPage: 'https://lonestartortillas.com/blog/street-tacos-at-home',
};

const recipeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Recipe',
  name: 'Authentic Street Tacos (Tacos de Carne Asada)',
  description: 'Classic street-style carne asada tacos with traditional toppings on warm corn tortillas.',
  author: {
    '@type': 'Organization',
    name: 'Lonestar Tortillas'
  },
  prepTime: 'PT30M',
  cookTime: 'PT15M',
  totalTime: 'PT45M',
  recipeYield: '12 tacos',
  recipeCategory: 'Main Course',
  recipeCuisine: 'Mexican',
  recipeIngredient: [
    '1.5 lbs flank or skirt steak',
    '24 small corn tortillas (doubled)',
    '1 white onion, diced',
    '1 bunch fresh cilantro, chopped',
    '3 limes, quartered',
    'Salsa verde',
    '4 cloves garlic, minced',
    '2 tbsp vegetable oil',
    '1 tsp cumin',
    '1 tsp chili powder',
    'Salt and pepper to taste'
  ],
  recipeInstructions: [
    {
      '@type': 'HowToStep',
      text: 'Marinate the steak with garlic, cumin, chili powder, salt, and 1 tbsp oil for at least 30 minutes or overnight.'
    },
    {
      '@type': 'HowToStep',
      text: 'Heat a cast iron skillet or grill to high heat. Cook steak 4-5 minutes per side for medium-rare.'
    },
    {
      '@type': 'HowToStep',
      text: 'Let steak rest for 5 minutes, then slice against the grain into thin strips.'
    },
    {
      '@type': 'HowToStep',
      text: 'Warm tortillas on a dry comal or skillet until soft and slightly charred.'
    },
    {
      '@type': 'HowToStep',
      text: 'Assemble tacos: double-stacked tortillas, carne asada, onion, cilantro, lime squeeze, and salsa.'
    }
  ]
};

export default function StreetTacosAtHomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        <header className="bg-charcoal-950 text-cream-50 py-12">
          <div className="container mx-auto px-6">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: 'Street Tacos at Home' },
              ]}
            />
            <div className="flex items-center gap-2 text-sunset-400 text-sm mb-3 mt-4">
              <span className="px-3 py-1 bg-sunset-900/20 rounded-full">Recipes</span>
              <span>•</span>
              <span>February 3, 2026</span>
              <span>•</span>
              <span>13 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Street Tacos at Home: Master Taqueria Style</h1>
            <p className="text-cream-300 mt-4 text-lg">Transform your kitchen into an authentic taqueria</p>
          </div>
        </header>

        <article className="container mx-auto px-6 py-12 max-w-3xl">
          <LastUpdated date="2026-02-03" />

          <div className="prose prose-lg max-w-none">
            <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-charcoal-800">
                <strong>What You&apos;ll Learn:</strong> The secrets to authentic street tacos—from choosing the right tortillas to mastering carne asada, carnitas, and al pastor at home.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">What Makes a Street Taco?</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Street tacos are the original tacos—the kind you&apos;d find at a late-night taqueria in Mexico City or a food truck in East LA. They&apos;re simple, unfussy, and absolutely delicious.
                </p>
                <p>
                  The anatomy of a perfect street taco:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Size:</strong> Small (4-6 inch) corn tortillas</li>
                  <li><strong>Doubling:</strong> Two tortillas stacked together</li>
                  <li><strong>Meat:</strong> Seasoned, usually grilled or braised</li>
                  <li><strong>Toppings:</strong> Diced white onion, fresh cilantro</li>
                  <li><strong>Finish:</strong> Lime squeeze and salsa</li>
                  <li><strong>No cheese:</strong> Traditional street tacos skip the cheese</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">The Essential Tortilla</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  This is where most home cooks go wrong. Street tacos require small corn tortillas—not the large flour tortillas you&apos;d use for burritos or American-style tacos.
                </p>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">Why Corn, Not Flour?</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Tradition:</strong> Corn tortillas are the original and authentic choice</li>
                  <li><strong>Flavor:</strong> The earthy, slightly sweet corn flavor complements grilled meats</li>
                  <li><strong>Texture:</strong> They char beautifully on a comal</li>
                  <li><strong>Size:</strong> Smaller tortillas = perfect taco proportions</li>
                </ul>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">Why Double Stack?</h3>
                <p>
                  Using two tortillas per taco isn&apos;t just tradition—it&apos;s practical. The doubled tortillas:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Hold up better to juicy fillings</li>
                  <li>Won&apos;t fall apart when you eat</li>
                  <li>Provide the perfect tortilla-to-filling ratio</li>
                  <li>Act as backup if one tears</li>
                </ul>

                <div className="bg-masa-50 p-4 rounded-lg mt-4">
                  <p className="font-semibold text-charcoal-950">Best Tortillas for Street Tacos:</p>
                  <ul className="mt-2 space-y-1">
                    <li><Link href="/shop" className="text-sunset-600 hover:underline">H-E-B Street Taco White Corn Tortillas (24 count)</Link> - Made specifically for street tacos</li>
                    <li><Link href="/shop" className="text-sunset-600 hover:underline">Mission White Corn Tortillas (24 count)</Link> - Reliable and authentic</li>
                    <li><Link href="/shop" className="text-sunset-600 hover:underline">H-E-B Mi Tienda Ready to Cook (50 count)</Link> - For the freshest taste</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Recipe 1: Tacos de Carne Asada</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  The classic. Thin-sliced grilled beef with char marks and smoky flavor.
                </p>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">Ingredients</h3>
                  <p className="text-sm text-charcoal-600 mb-2">Makes 12 tacos (serves 4)</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>1.5 lbs flank or skirt steak</li>
                    <li>24 small <Link href="/shop" className="text-sunset-600 hover:underline">corn tortillas</Link> (2 per taco)</li>
                    <li>1 white onion, finely diced</li>
                    <li>1 bunch fresh cilantro, chopped</li>
                    <li>3-4 limes, quartered</li>
                    <li><Link href="/shop" className="text-sunset-600 hover:underline">H-E-B That Green Sauce</Link></li>
                  </ul>

                  <h4 className="font-bold text-charcoal-950 mt-4 mb-2">For the marinade:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>4 cloves garlic, minced</li>
                    <li>2 tablespoons vegetable oil</li>
                    <li>1 teaspoon cumin</li>
                    <li>1 teaspoon chili powder</li>
                    <li>Juice of 2 limes</li>
                    <li>Salt and pepper to taste</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md mt-4">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">Instructions</h3>
                  <ol className="list-decimal pl-6 space-y-3">
                    <li>
                      <strong>Marinate the meat:</strong> Combine all marinade ingredients. Coat the steak and refrigerate for at least 30 minutes (overnight is better).
                    </li>
                    <li>
                      <strong>Prep your toppings:</strong> Dice the onion finely. Chop the cilantro. Quarter the limes. Have salsa ready.
                    </li>
                    <li>
                      <strong>Cook the steak:</strong> Heat a cast iron skillet or grill to high. Cook steak 4-5 minutes per side for medium-rare (internal temp 130&deg;F). Don&apos;t move it around—let it develop a good char.
                    </li>
                    <li>
                      <strong>Rest and slice:</strong> Let the steak rest for 5 minutes. Slice against the grain into thin strips, then chop into small pieces.
                    </li>
                    <li>
                      <strong>Warm the tortillas:</strong> Heat tortillas on a dry comal or skillet for 20-30 seconds per side until soft and slightly charred. Keep warm in a towel.
                    </li>
                    <li>
                      <strong>Assemble:</strong> Double-stack two tortillas. Add carne asada. Top with onion and cilantro. Squeeze lime and add salsa.
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Recipe 2: Tacos de Carnitas</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Slow-braised pork shoulder, crispy on the edges, melt-in-your-mouth tender inside.
                </p>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">Ingredients</h3>
                  <p className="text-sm text-charcoal-600 mb-2">Makes 24 tacos (serves 8)</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>3 lbs pork shoulder (bone-in preferred)</li>
                    <li>48 small corn tortillas</li>
                    <li>1 onion, quartered</li>
                    <li>1 orange, halved</li>
                    <li>4 cloves garlic</li>
                    <li>2 bay leaves</li>
                    <li>1 tablespoon cumin</li>
                    <li>1 tablespoon oregano</li>
                    <li>Salt to taste</li>
                    <li>Water or chicken broth to cover</li>
                  </ul>

                  <h4 className="font-bold text-charcoal-950 mt-4 mb-2">For serving:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Diced white onion</li>
                    <li>Fresh cilantro</li>
                    <li>Lime wedges</li>
                    <li>Salsa verde or roja</li>
                    <li>Pickled jalape&ntilde;os (optional)</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md mt-4">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">Instructions</h3>
                  <ol className="list-decimal pl-6 space-y-3">
                    <li>
                      <strong>Season the pork:</strong> Cut pork into large chunks. Season generously with salt, cumin, and oregano.
                    </li>
                    <li>
                      <strong>Braise:</strong> Place pork in a Dutch oven or slow cooker with onion, orange, garlic, and bay leaves. Add liquid to barely cover. Simmer for 3-4 hours (or 8 hours in slow cooker) until fork-tender.
                    </li>
                    <li>
                      <strong>Shred:</strong> Remove pork and shred with two forks. Discard bones and excess fat.
                    </li>
                    <li>
                      <strong>Crisp (the secret step):</strong> Spread shredded pork on a baking sheet. Drizzle with a bit of the cooking liquid. Broil for 5-8 minutes until edges are crispy.
                    </li>
                    <li>
                      <strong>Assemble:</strong> Warm tortillas, fill with crispy carnitas, top with onion, cilantro, lime, and salsa.
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Recipe 3: Tacos al Pastor (Simplified)</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Traditional al pastor uses a vertical spit, but this oven method captures the essential flavors at home.
                </p>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">Ingredients</h3>
                  <p className="text-sm text-charcoal-600 mb-2">Makes 16 tacos (serves 5-6)</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>2 lbs boneless pork shoulder, sliced thin</li>
                    <li>32 small corn tortillas</li>
                    <li>1/2 fresh pineapple, diced</li>
                    <li>3 dried guajillo chiles, rehydrated</li>
                    <li>2 chipotle peppers in adobo</li>
                    <li>4 cloves garlic</li>
                    <li>1/4 cup white vinegar</li>
                    <li>1 tablespoon achiote paste</li>
                    <li>1 teaspoon cumin</li>
                    <li>1 teaspoon oregano</li>
                    <li>Salt to taste</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md mt-4">
                  <h3 className="text-xl font-bold text-charcoal-950 mb-3">Instructions</h3>
                  <ol className="list-decimal pl-6 space-y-3">
                    <li>
                      <strong>Make the adobo:</strong> Blend rehydrated guajillos, chipotles, garlic, vinegar, achiote paste, cumin, and oregano until smooth.
                    </li>
                    <li>
                      <strong>Marinate:</strong> Coat pork slices in adobo. Refrigerate for at least 2 hours (overnight preferred).
                    </li>
                    <li>
                      <strong>Cook:</strong> Layer marinated pork on a baking sheet. Roast at 400&deg;F for 25-30 minutes, flipping once, until edges are slightly charred and caramelized.
                    </li>
                    <li>
                      <strong>Chop:</strong> Let rest briefly, then chop into small pieces.
                    </li>
                    <li>
                      <strong>Sear the pineapple:</strong> Cook diced pineapple in a hot, dry skillet until slightly charred.
                    </li>
                    <li>
                      <strong>Assemble:</strong> Warm tortillas, add al pastor meat, top with seared pineapple, onion, cilantro, and lime.
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">The Art of Warming Tortillas</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  A properly warmed tortilla is the difference between a good taco and a great one. Here&apos;s how the taquerias do it:
                </p>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">The Comal Method (Best)</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Heat a cast iron skillet or comal over medium-high heat</li>
                  <li>No oil—keep it dry</li>
                  <li>Place tortilla on the hot surface for 20-30 seconds</li>
                  <li>Flip when you see slight char spots</li>
                  <li>Cook another 15-20 seconds until soft and pliable</li>
                  <li>Stack and wrap in a clean kitchen towel</li>
                </ol>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">Open Flame Method (Authentic)</h3>
                <p>
                  If you have a gas stove, you can char tortillas directly over the flame for 5-10 seconds per side using tongs. This creates those perfect char marks you see at taquerias.
                </p>

                <div className="bg-masa-50 p-4 rounded-lg mt-4">
                  <p className="font-semibold text-charcoal-950">Pro Tip:</p>
                  <p className="mt-2">Keep warmed tortillas wrapped in a towel or tortilla warmer. They&apos;ll stay soft for 15-20 minutes this way.</p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Essential Toppings & Salsas</h2>
              <div className="text-charcoal-800 space-y-4">
                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">The Basics</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>White onion:</strong> Diced finely. Raw adds crunch and sharpness.</li>
                  <li><strong>Fresh cilantro:</strong> Coarsely chopped. Essential for authenticity.</li>
                  <li><strong>Lime:</strong> Always squeeze fresh lime on each taco.</li>
                </ul>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">The Salsas</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Salsa Verde:</strong> Tomatillo-based, tangy, and versatile. <Link href="/shop" className="text-sunset-600 hover:underline">H-E-B That Green Sauce</Link> is the easy option.</li>
                  <li><strong>Salsa Roja:</strong> Tomato and chile based. More traditional heat.</li>
                  <li><strong>Pickled jalape&ntilde;os:</strong> Common at taquerias for extra heat.</li>
                  <li><strong>Radish slices:</strong> Traditional garnish, adds freshness.</li>
                </ul>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">What NOT to Add</h3>
                <p>
                  Traditional street tacos don&apos;t include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cheese (that&apos;s more Tex-Mex)</li>
                  <li>Sour cream</li>
                  <li>Lettuce</li>
                  <li>Tomato chunks</li>
                </ul>
                <p>
                  That said—it&apos;s your taco. Add what you like. But if you want authentic, keep it simple.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-4">Hosting a Taco Night</h2>
              <div className="text-charcoal-800 space-y-4">
                <p>
                  Street tacos are perfect for entertaining. Here&apos;s how to set up a taqueria-style spread:
                </p>

                <h3 className="text-xl font-bold text-charcoal-950 mt-6 mb-3">For 8 People</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>48 small corn tortillas (2 per taco, 3 tacos per person)</li>
                  <li>2 types of meat (choose from above recipes)</li>
                  <li>2 cups diced onion</li>
                  <li>2 bunches cilantro</li>
                  <li>8 limes, quartered</li>
                  <li>2-3 types of salsa</li>
                  <li>Pickled jalape&ntilde;os</li>
                  <li>Sliced radishes</li>
                </ul>

                <p className="mt-4">
                  Use our <Link href="/tools/party-calculator" className="text-sunset-600 hover:underline">Party Calculator</Link> to get exact tortilla quantities!
                </p>
              </div>
            </section>

            <div className="bg-gradient-to-r from-rust-600 to-sunset-600 text-cream-50 rounded-xl p-8 text-center mt-12">
              <h2 className="text-3xl font-bold mb-4">Get the Right Tortillas</h2>
              <p className="text-xl mb-6 text-cream-100">
                Authentic street tacos start with authentic tortillas—shipped free to your door
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/shop"
                  className="inline-block bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Shop Corn Tortillas
                </Link>
                <Link
                  href="/tools/party-calculator"
                  className="inline-block bg-transparent border-2 border-cream-50 hover:bg-cream-50/10 text-cream-50 px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Plan Your Taco Night
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
