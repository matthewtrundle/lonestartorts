import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Bunuelos Recipe - Crispy Mexican Cinnamon Sugar Treats',
  description: 'Make authentic Mexican bunuelos with this easy recipe. Crispy fried dough discs coated in cinnamon sugar. Perfect holiday dessert or anytime treat!',
  keywords: 'bunuelos, bunuelos recipe, Mexican dessert, cinnamon sugar, fried dough, Mexican Christmas, buñuelos',
  alternates: {
    canonical: 'https://lonestartortillas.com/recipes/bunuelos',
  },
  openGraph: {
    title: 'Bunuelos Recipe - Mexican Cinnamon Sugar Treats | Lonestar Tortillas',
    description: 'Crispy, golden fried dough covered in cinnamon sugar. Traditional Mexican holiday dessert!',
    type: 'article',
  },
};

export default function BunuelosRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Mexican Bunuelos',
    description: 'Crispy fried dough discs coated in cinnamon sugar - a beloved Mexican holiday treat',
    image: 'https://lonestartortillas.com/images/recipes/bunuelos.webp',
    prepTime: 'PT30M',
    cookTime: 'PT20M',
    totalTime: 'PT50M',
    recipeYield: '24 bunuelos',
    recipeCategory: 'Dessert',
    recipeCuisine: 'Mexican',
    keywords: 'bunuelos, buñuelos, Mexican dessert, cinnamon sugar, holiday treat',
    recipeIngredient: [
      '4 cups all-purpose flour',
      '1 teaspoon baking powder',
      '1 teaspoon salt',
      '2 tablespoons sugar',
      '2 eggs',
      '1 cup warm milk',
      '1/4 cup melted butter',
      '1 teaspoon vanilla extract',
      'Vegetable oil for frying',
      '1 cup sugar for coating',
      '2 tablespoons ground cinnamon'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        text: 'Mix flour, baking powder, salt, and 2 tablespoons sugar in a large bowl. Create a well in the center.'
      },
      {
        '@type': 'HowToStep',
        text: 'Add eggs, warm milk, melted butter, and vanilla to the well. Mix until a soft dough forms.'
      },
      {
        '@type': 'HowToStep',
        text: 'Knead the dough for 5-10 minutes until smooth and elastic. Cover and rest for 30 minutes.'
      },
      {
        '@type': 'HowToStep',
        text: 'Divide into 24 balls and roll each paper-thin (about 6 inches in diameter).'
      },
      {
        '@type': 'HowToStep',
        text: 'Heat oil to 375°F. Fry each bunuelo for 30-45 seconds per side until golden and bubbly.'
      },
      {
        '@type': 'HowToStep',
        text: 'Drain on paper towels, then immediately coat in cinnamon sugar mixture while still warm.'
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }} />

      <main className="min-h-screen bg-cream-50">
        <section className="bg-charcoal-950 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <nav className="text-sm text-cream-300 mb-6">
              <Link href="/" className="hover:text-cream-50">Home</Link>{' '}/{' '}
              <Link href="/recipes" className="hover:text-cream-50">Recipes</Link>{' '}/{' '}
              <span>Bunuelos</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Mexican Bunuelos Recipe</h1>
            <p className="text-xl text-cream-100">Crispy, golden treats dusted with cinnamon sugar</p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="bg-rust-600 px-4 py-2 rounded-full">50 minutes</span>
              <span className="bg-masa-600 px-4 py-2 rounded-full">Moderate</span>
              <span className="bg-sunset-600 px-4 py-2 rounded-full">24 bunuelos</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/recipes/bunuelos.webp"
              alt="Mexican Bunuelos"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-4">
          <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>Bunuelos</strong> (buñuelos) are thin, crispy fried dough discs coated in cinnamon sugar. They're a beloved Mexican dessert traditionally served during Christmas and New Year celebrations. Unlike donuts, bunuelos are flat and shatteringly crisp, with a delicate sweetness that makes them irresistible.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="prose prose-lg max-w-none text-charcoal-800">
            <p className="text-xl leading-relaxed mb-6">
              There's something magical about the crunch of a freshly fried bunuelo, still warm and glistening with cinnamon sugar. These crispy treats are a Mexican holiday tradition, but honestly, they're too delicious to limit to just once a year. The dough is similar to what you'd use for homemade <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">flour tortillas</Link>—but thinner, sweeter, and transformed by frying into something extraordinary.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Dough</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>4 cups all-purpose flour</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1 tsp baking powder</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1 tsp salt</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>2 tbsp sugar</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>2 eggs, beaten</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1 cup warm milk</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1/4 cup melted butter</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1 tsp vanilla extract</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For Coating & Frying</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Vegetable oil for frying</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1 cup granulated sugar</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>2 tbsp ground cinnamon</span></li>
                </ul>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3 mt-6">Optional Toppings</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Piloncillo syrup</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Honey drizzle</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Powdered sugar</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Instructions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full flex-shrink-0">1</span>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Make the Dough</h3>
                  <p className="text-charcoal-700">In a large bowl, whisk together flour, baking powder, salt, and 2 tablespoons sugar. Create a well in the center and add eggs, warm milk, melted butter, and vanilla. Mix with a fork until it comes together, then knead for 5-10 minutes until smooth and elastic.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full flex-shrink-0">2</span>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Rest the Dough</h3>
                  <p className="text-charcoal-700">Cover the dough with a damp towel or plastic wrap and let it rest for at least 30 minutes. This relaxes the gluten and makes rolling much easier.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full flex-shrink-0">3</span>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Roll Paper-Thin</h3>
                  <p className="text-charcoal-700">Divide dough into 24 equal balls. On a lightly floured surface, roll each ball paper-thin (about 6 inches in diameter). The thinner, the crispier! You should almost be able to see through them.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full flex-shrink-0">4</span>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Fry Until Golden</h3>
                  <p className="text-charcoal-700">Heat 1-2 inches of oil to 375°F. Fry each bunuelo for 30-45 seconds per side until golden brown and bubbly. They puff up slightly and develop crispy blisters. Don't overcrowd—fry one at a time.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full flex-shrink-0">5</span>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Coat in Cinnamon Sugar</h3>
                  <p className="text-charcoal-700">Mix 1 cup sugar with 2 tablespoons cinnamon in a shallow dish. While bunuelos are still warm, dip both sides in the cinnamon sugar mixture, coating generously. The residual heat helps the sugar stick.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-xl my-8">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Pro Tips for Perfect Bunuelos</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-masa-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Roll Thin!</h3>
              <p className="text-charcoal-700 text-sm">The thinner you roll, the crispier your bunuelos. They should be almost translucent before frying.</p>
            </div>
            <div className="bg-masa-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Oil Temperature</h3>
              <p className="text-charcoal-700 text-sm">Keep oil at 375°F. Too cool and they'll absorb oil; too hot and they'll burn before cooking through.</p>
            </div>
            <div className="bg-masa-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Coat While Warm</h3>
              <p className="text-charcoal-700 text-sm">Sugar sticks best to warm bunuelos. Coat immediately after draining for maximum cinnamon-sugar goodness.</p>
            </div>
            <div className="bg-masa-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Store Properly</h3>
              <p className="text-charcoal-700 text-sm">Keep in a single layer in an airtight container for up to 3 days. They lose crispness over time, so eat fresh!</p>
            </div>
          </div>
        </section>

        <section className="bg-rust-600 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">More Mexican Dessert Ideas</h2>
            <p className="text-xl mb-8 text-cream-100">Try our other sweet tortilla recipes</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/recipes" className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-8 py-3 rounded-lg font-semibold transition-colors">Browse All Recipes</Link>
              <Link href="/shop" className="bg-transparent border-2 border-cream-50 hover:bg-cream-50 hover:text-rust-600 text-cream-50 px-8 py-3 rounded-lg font-semibold transition-colors">Shop Tortillas</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
