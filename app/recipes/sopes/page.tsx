import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Authentic Sopes Recipe - Mexican Thick Corn Cakes',
  description: 'Learn to make authentic Mexican sopes with this easy recipe. Thick corn masa cakes with pinched edges topped with beans, meat, and fresh garnishes!',
  keywords: 'sopes, sopes recipe, Mexican sopes, gorditas, masa cakes, Mexican appetizer, antojitos, picaditas',
  alternates: {
    canonical: 'https://lonestartortillas.com/recipes/sopes',
  },
  openGraph: {
    title: 'Authentic Sopes Recipe | Lonestar Tortillas',
    description: 'Thick corn masa cakes with pinched edges loaded with beans, meat, and toppings. Classic Mexican street food!',
    type: 'article',
  },
};

export default function SopesRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Authentic Mexican Sopes',
    description: 'Thick corn masa cakes with pinched edges, topped with refried beans, meat, lettuce, cheese, and crema',
    image: 'https://lonestartortillas.com/images/recipes/sopes.webp',
    prepTime: 'PT25M',
    cookTime: 'PT20M',
    totalTime: 'PT45M',
    recipeYield: '12 sopes',
    recipeCategory: 'Appetizer',
    recipeCuisine: 'Mexican',
    keywords: 'sopes, Mexican sopes, masa cakes, antojitos',
    recipeIngredient: [
      '2 cups masa harina',
      '1 1/4 cups warm water',
      '1/2 teaspoon salt',
      '1 tablespoon vegetable oil',
      '1 cup refried beans',
      '1 cup shredded cooked chicken or carnitas',
      '1 cup shredded lettuce',
      '1/2 cup crumbled queso fresco',
      '1/2 cup Mexican crema',
      '1/2 cup salsa verde or roja',
      'Sliced radishes for garnish',
      'Fresh cilantro for garnish'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        text: 'Mix masa harina with salt. Gradually add warm water and oil, kneading until smooth and pliable. Let rest 10 minutes.'
      },
      {
        '@type': 'HowToStep',
        text: 'Divide into 12 balls. Flatten each into a 3-inch disc about 1/4 inch thick—thicker than tortillas.'
      },
      {
        '@type': 'HowToStep',
        text: 'Cook on a hot comal or skillet for 2-3 minutes per side until cooked through with light brown spots.'
      },
      {
        '@type': 'HowToStep',
        text: 'While still warm, pinch the edges to form a raised border around each sope.'
      },
      {
        '@type': 'HowToStep',
        text: 'Lightly fry in oil for 30 seconds per side (optional), then top with beans, meat, lettuce, cheese, crema, and salsa.'
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
              <span>Sopes</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Authentic Mexican Sopes Recipe</h1>
            <p className="text-xl text-cream-100">Thick masa cups loaded with delicious toppings</p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="bg-rust-600 px-4 py-2 rounded-full">45 minutes</span>
              <span className="bg-masa-600 px-4 py-2 rounded-full">Easy</span>
              <span className="bg-sunset-600 px-4 py-2 rounded-full">12 sopes</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/recipes/sopes.webp"
              alt="Mexican Sopes"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-4">
          <div className="bg-masa-50 border-l-4 border-masa-500 p-6 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>Sopes</strong> are thick corn masa cakes with pinched-up edges that create a shallow cup to hold toppings. They're one of Mexico's most beloved "antojitos" (little cravings). Think of them as a cross between a thick tortilla and a small boat—sturdy enough to hold beans, meat, lettuce, cheese, and crema without falling apart.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="prose prose-lg max-w-none text-charcoal-800">
            <p className="text-xl leading-relaxed mb-6">
              Sopes are street food magic. That thick, slightly crispy masa base with soft, pillowy interior creates the perfect vehicle for all your favorite toppings. Unlike <Link href="/recipes/tostadas" className="text-rust-600 hover:underline">tostadas</Link> which shatter when you bite them, sopes are sturdy and satisfying. The raised edges keep everything contained, making them ideal for parties or a fun family dinner.
            </p>
            <p className="text-lg leading-relaxed">
              The key is the same quality <Link href="/guides/masa-harina" className="text-rust-600 hover:underline">masa harina</Link> you'd use for tortillas—you just form it thicker and add those iconic pinched edges while still warm.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Sopes</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>2 cups masa harina</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1 1/4 cups warm water</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1/2 tsp salt</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1 tbsp vegetable oil (for dough)</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Oil for frying (optional)</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Toppings</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1 cup refried beans (warmed)</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1 cup shredded chicken or carnitas</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Shredded lettuce</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Crumbled queso fresco</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Mexican crema or sour cream</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Salsa verde or roja</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Sliced radishes, fresh cilantro</span></li>
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Make the Masa Dough</h3>
                  <p className="text-charcoal-700">Combine masa harina and salt in a bowl. Gradually add warm water and oil, mixing until a smooth dough forms. It should be moist but not sticky—like Play-Doh. If too dry, add water by the teaspoon. Cover and let rest 10 minutes.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full flex-shrink-0">2</span>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Form the Sope Discs</h3>
                  <p className="text-charcoal-700">Divide dough into 12 equal balls (about 2 tablespoons each). Flatten each ball into a 3-inch disc about 1/4 inch thick—much thicker than a tortilla. Keep unused dough covered to prevent drying.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full flex-shrink-0">3</span>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Cook on the Comal</h3>
                  <p className="text-charcoal-700">Heat a dry comal or cast iron skillet over medium-high heat. Cook each disc for 2-3 minutes per side until cooked through with light brown spots. They should be firm but not crunchy.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full flex-shrink-0">4</span>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Pinch the Edges</h3>
                  <p className="text-charcoal-700">This is the crucial step! While the sopes are still warm (but cool enough to handle), pinch the edges all around to form a 1/2-inch raised border. This creates the "cup" that holds your toppings.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full flex-shrink-0">5</span>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Fry (Optional) & Top</h3>
                  <p className="text-charcoal-700">For extra crispness, lightly fry in 1/4 inch of oil for 30 seconds per side. Then layer: spread refried beans first (they act as "glue"), add meat, lettuce, cheese, crema, and salsa. Garnish with radishes and cilantro.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-xl my-8">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Sopes vs. Similar Dishes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-charcoal-200">
                  <th className="py-3 px-4 font-bold text-charcoal-950">Dish</th>
                  <th className="py-3 px-4 font-bold text-charcoal-950">Thickness</th>
                  <th className="py-3 px-4 font-bold text-charcoal-950">Edges</th>
                  <th className="py-3 px-4 font-bold text-charcoal-950">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-charcoal-100">
                  <td className="py-3 px-4 font-medium">Sopes</td>
                  <td className="py-3 px-4">1/4 inch</td>
                  <td className="py-3 px-4">Pinched up</td>
                  <td className="py-3 px-4">Loaded toppings</td>
                </tr>
                <tr className="border-b border-charcoal-100">
                  <td className="py-3 px-4 font-medium">Gorditas</td>
                  <td className="py-3 px-4">1/2 inch</td>
                  <td className="py-3 px-4">Split open</td>
                  <td className="py-3 px-4">Stuffed fillings</td>
                </tr>
                <tr className="border-b border-charcoal-100">
                  <td className="py-3 px-4 font-medium"><Link href="/recipes/tostadas" className="text-rust-600 hover:underline">Tostadas</Link></td>
                  <td className="py-3 px-4">Thin</td>
                  <td className="py-3 px-4">Flat, crispy</td>
                  <td className="py-3 px-4">Crunchy base</td>
                </tr>
                <tr className="border-b border-charcoal-100">
                  <td className="py-3 px-4 font-medium">Huaraches</td>
                  <td className="py-3 px-4">1/4 inch</td>
                  <td className="py-3 px-4">Oval/flat</td>
                  <td className="py-3 px-4">Open-face topped</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-rust-600 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make Sopes?</h2>
            <p className="text-xl mb-8 text-cream-100">Get quality masa harina and tortillas for all your Mexican cooking</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/shop" className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-8 py-3 rounded-lg font-semibold transition-colors">Shop Now</Link>
              <Link href="/recipes" className="bg-transparent border-2 border-cream-50 hover:bg-cream-50 hover:text-rust-600 text-cream-50 px-8 py-3 rounded-lg font-semibold transition-colors">More Recipes</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
