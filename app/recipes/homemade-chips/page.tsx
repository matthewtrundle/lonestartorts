import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Homemade Tortilla Chips Recipe (Crispy & Perfect)',
  description: 'Make crispy homemade tortilla chips that beat any store-bought bag. Fried or baked, seasoned your way. Ready in 15 minutes! Perfect for nachos, salsa, and guacamole.',
  keywords: 'homemade tortilla chips, fried tortilla chips, baked tortilla chips, how to make tortilla chips, crispy tortilla chips, tortilla chip recipe, corn chips, totopos',
  alternates: {
    canonical: 'https://lonestartortillas.com/recipes/homemade-chips',
  },
  openGraph: {
    title: 'Homemade Tortilla Chips Recipe | Lonestar Tortillas',
    description: 'Crispy homemade tortilla chips - fried or baked. Better than store-bought, ready in 15 minutes!',
    type: 'article',
  },
};

export default function HomemadeChipsRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Homemade Tortilla Chips',
    description: 'Crispy homemade corn tortilla chips, fried or baked to golden perfection',
    image: 'https://lonestartortillas.com/images/recipes/homemade-chips.webp',
    prepTime: 'PT5M',
    cookTime: 'PT10M',
    totalTime: 'PT15M',
    recipeYield: '48 chips (4 servings)',
    recipeCategory: 'Snack',
    recipeCuisine: 'Mexican',
    keywords: 'tortilla chips, homemade chips, totopos, corn chips',
    recipeIngredient: [
      '8 corn tortillas',
      'Vegetable oil for frying (about 2 cups)',
      'Salt to taste',
      'Optional: lime zest, chili powder, cumin, garlic powder'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        text: 'Stack corn tortillas and cut into 6 triangles each (like cutting a pizza).'
      },
      {
        '@type': 'HowToStep',
        text: 'For fried chips: Heat 1/2 inch of vegetable oil in a large skillet to 350°F. Fry tortilla triangles in batches for 2-3 minutes until golden and crispy. Drain on paper towels.'
      },
      {
        '@type': 'HowToStep',
        text: 'For baked chips: Brush tortilla triangles lightly with oil, arrange on baking sheet, and bake at 400°F for 8-10 minutes until crispy.'
      },
      {
        '@type': 'HowToStep',
        text: 'Season immediately with salt and any additional seasonings while still warm.'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
      />

      <main className="min-h-screen bg-cream-50">
        {/* Hero Section */}
        <section className="bg-charcoal-950 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <nav className="text-sm text-cream-300 mb-6">
              <Link href="/" className="hover:text-cream-50">Home</Link>
              {' '}/{' '}
              <Link href="/recipes" className="hover:text-cream-50">Recipes</Link>
              {' '}/{' '}
              <span>Homemade Tortilla Chips</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Homemade Tortilla Chips Recipe
            </h1>
            <p className="text-xl text-cream-100">
              Crispy, golden, and better than any bag you'll ever buy
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="bg-rust-600 px-4 py-2 rounded-full">15 minutes</span>
              <span className="bg-masa-600 px-4 py-2 rounded-full">Easy</span>
              <span className="bg-sunset-600 px-4 py-2 rounded-full">4 servings</span>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/recipes/homemade-chips.webp"
              alt="Homemade Tortilla Chips"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Quick Answer */}
        <section className="max-w-4xl mx-auto px-6 py-4">
          <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>Homemade tortilla chips</strong> are incredibly easy: cut corn tortillas into triangles, then either fry them in oil for 2-3 minutes or bake at 400°F for 8-10 minutes. Season with salt while hot. They're crispier, fresher, and more flavorful than store-bought, plus you can customize seasonings. Use day-old tortillas for the crispiest results.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="prose prose-lg max-w-none text-charcoal-800">
            <p className="text-xl leading-relaxed mb-6">
              Once you make homemade tortilla chips, you'll never go back to store-bought. The difference is dramatic—these chips are crispier, more flavorful, and you can season them exactly how you like. Plus, they're the perfect way to use up <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortillas</Link> before they go stale.
            </p>
            <p className="text-lg leading-relaxed">
              I'll show you two methods: traditional fried chips (crispiest and most authentic) and baked chips (lighter and healthier). Both are delicious, and both are ready in about 15 minutes.
            </p>
          </div>
        </section>

        {/* Method Comparison */}
        <section className="max-w-4xl mx-auto px-6 py-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-rust-50 p-6 rounded-lg border-l-4 border-rust-500">
              <h3 className="text-xl font-bold text-charcoal-950 mb-3">🔥 Fried Method</h3>
              <ul className="text-charcoal-700 space-y-2">
                <li>• Crispiest results, restaurant-quality</li>
                <li>• Best for nachos and dipping</li>
                <li>• More authentic flavor</li>
                <li>• Slightly more calories</li>
                <li>• Takes 2-3 minutes per batch</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-charcoal-950 mb-3">🌡️ Baked Method</h3>
              <ul className="text-charcoal-700 space-y-2">
                <li>• Lighter and healthier option</li>
                <li>• Easier cleanup</li>
                <li>• Great for meal prep</li>
                <li>• Fewer calories and less fat</li>
                <li>• Takes 8-10 minutes total</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Ingredients */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Basic Chips</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>8 <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline font-medium">corn tortillas</Link></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>Vegetable oil (for frying) or cooking spray (for baking)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>Salt to taste</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Optional Seasonings</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>Lime zest + salt (lime chips)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>Chili powder + cumin (spicy)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>Garlic powder + parsley (ranch-style)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>Cinnamon + sugar (dessert chips)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>Tajín seasoning (tangy and spicy)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Fried Method Instructions */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Method 1: Fried Tortilla Chips (Classic)</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Cut the Tortillas</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Stack 4 tortillas at a time and cut into 6 triangles (like cutting a pizza). You'll have 48 chip triangles from 8 tortillas. If your tortillas are fresh, let them sit out for 15-30 minutes to dry slightly—this helps them crisp up better.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Heat the Oil</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Pour about 1/2 inch of vegetable oil into a large, deep skillet or pot. Heat over medium-high until the oil reaches 350°F. If you don't have a thermometer, drop in a small piece of tortilla—it should sizzle immediately and float to the top.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Fry in Batches</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Add tortilla triangles in batches—don't crowd the pan! Fry for 2-3 minutes, flipping once with a slotted spoon, until golden brown and crispy. The bubbling will slow down when they're done. Transfer to a paper towel-lined plate immediately.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Season Immediately</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    While the chips are still hot and slightly oily, sprinkle generously with salt and any other seasonings. The seasoning will stick better while warm. Continue frying remaining batches, maintaining oil temperature between batches.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Baked Method Instructions */}
        <section className="max-w-4xl mx-auto px-6 py-12 bg-green-50 rounded-lg my-8">
          <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Method 2: Baked Tortilla Chips (Healthier)</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-green-100 text-green-600 font-bold text-xl rounded-full">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Preheat and Prep</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Preheat oven to 400°F (200°C). Line two baking sheets with parchment paper. Cut tortillas into triangles as described above.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-green-100 text-green-600 font-bold text-xl rounded-full">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Oil and Arrange</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Lightly brush both sides of each triangle with oil, or spray with cooking spray. Arrange in a single layer on baking sheets—don't overlap! Sprinkle with salt.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-green-100 text-green-600 font-bold text-xl rounded-full">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Bake Until Crispy</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Bake for 8-10 minutes, flipping halfway through, until golden and crispy. Watch carefully the last few minutes—they can burn quickly! Remove and add additional seasonings while warm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seasoning Ideas */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Seasoning Ideas</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-rust-50 p-4 rounded-lg">
                <h3 className="font-bold text-charcoal-950">Classic Salt</h3>
                <p className="text-sm text-charcoal-700">Fine sea salt or kosher salt</p>
              </div>
              <div className="bg-sunset-50 p-4 rounded-lg">
                <h3 className="font-bold text-charcoal-950">Lime & Salt</h3>
                <p className="text-sm text-charcoal-700">Lime zest + salt + squeeze of lime</p>
              </div>
              <div className="bg-rust-50 p-4 rounded-lg">
                <h3 className="font-bold text-charcoal-950">Chili Lime</h3>
                <p className="text-sm text-charcoal-700">Tajín seasoning or chili + lime + salt</p>
              </div>
              <div className="bg-masa-50 p-4 rounded-lg">
                <h3 className="font-bold text-charcoal-950">Ranch Style</h3>
                <p className="text-sm text-charcoal-700">Garlic powder + onion powder + parsley</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-charcoal-950">Cumin Spiced</h3>
                <p className="text-sm text-charcoal-700">Cumin + coriander + salt</p>
              </div>
              <div className="bg-sunset-50 p-4 rounded-lg">
                <h3 className="font-bold text-charcoal-950">Cinnamon Sugar</h3>
                <p className="text-sm text-charcoal-700">Cinnamon + sugar for dessert chips</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-charcoal-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Pro Tips for Perfect Chips</h2>
            <ul className="space-y-3 text-charcoal-800">
              <li className="flex items-start gap-2">
                <BulletIcon className="inline-block text-rust-600 mt-1.5" size={6} />
                <span><strong>Use day-old tortillas:</strong> They have less moisture and fry up crispier. Fresh tortillas can be dried by leaving them uncovered for 30 minutes.</span>
              </li>
              <li className="flex items-start gap-2">
                <BulletIcon className="inline-block text-rust-600 mt-1.5" size={6} />
                <span><strong>Don't crowd the pan:</strong> Chips need room to cook evenly. Crowding leads to soggy chips.</span>
              </li>
              <li className="flex items-start gap-2">
                <BulletIcon className="inline-block text-rust-600 mt-1.5" size={6} />
                <span><strong>Maintain oil temperature:</strong> If oil cools too much, chips absorb more grease. Let oil reheat between batches.</span>
              </li>
              <li className="flex items-start gap-2">
                <BulletIcon className="inline-block text-rust-600 mt-1.5" size={6} />
                <span><strong>Season while hot:</strong> Salt and seasonings stick better to warm, slightly oily chips.</span>
              </li>
              <li className="flex items-start gap-2">
                <BulletIcon className="inline-block text-rust-600 mt-1.5" size={6} />
                <span><strong>Store in paper bag:</strong> Keeps chips crispy for 2-3 days. Plastic bags make them soggy.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Uses */}
        <section className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-xl my-8">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Ways to Use Homemade Chips</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/recipes/tortilla-soup" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Tortilla Soup Topping
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Top your soup with crispy strips
                </p>
              </div>
            </Link>
            <Link href="/recipes/chilaquiles" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Chilaquiles
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Simmer in salsa for breakfast
                </p>
              </div>
            </Link>
            <Link href="/recipes/nachos" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Loaded Nachos
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Build the ultimate nacho platter
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-rust-600 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make Crispy Homemade Chips?
            </h2>
            <p className="text-xl mb-8 text-cream-100">
              Get authentic Texas corn tortillas delivered to your door
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Shop Tortillas
              </Link>
              <Link
                href="/products/corn-tortillas"
                className="bg-transparent border-2 border-cream-50 hover:bg-cream-50 hover:text-rust-600 text-cream-50 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                View Corn Tortillas
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
