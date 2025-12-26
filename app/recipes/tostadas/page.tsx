import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Chicken Tostadas Recipe - Crispy Mexican Flatbread',
  description: 'Make authentic chicken tostadas with crispy fried tortillas topped with beans, chicken, lettuce, cheese, and more. Easy Mexican dinner ready in 30 minutes!',
  keywords: 'tostadas, tostadas recipe, chicken tostadas, crispy tortillas, Mexican tostadas, how to make tostadas, tostada shells',
  alternates: {
    canonical: 'https://lonestartortillas.com/recipes/tostadas',
  },
  openGraph: {
    title: 'Chicken Tostadas Recipe | Lonestar Tortillas',
    description: 'Crispy flat tortillas loaded with beans, chicken, and fresh toppings. Easy weeknight dinner!',
    type: 'article',
  },
};

export default function TostadasRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Chicken Tostadas',
    description: 'Crispy fried corn tortillas topped with refried beans, seasoned chicken, and fresh toppings',
    image: 'https://lonestartortillas.com/images/recipes/tostadas.webp',
    prepTime: 'PT15M',
    cookTime: 'PT15M',
    totalTime: 'PT30M',
    recipeYield: '8 tostadas',
    recipeCategory: 'Main Course',
    recipeCuisine: 'Mexican',
    keywords: 'tostadas, chicken tostadas, crispy tortillas',
    recipeIngredient: [
      '8 corn tortillas',
      '2 cups shredded chicken',
      '1 can refried beans',
      '2 cups shredded lettuce',
      '1 cup diced tomatoes',
      '1 cup shredded cheese',
      '1/2 cup sour cream',
      'Vegetable oil for frying',
      'Sliced jalapeños (optional)',
      'Hot sauce to taste'
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
              <span>Tostadas</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Chicken Tostadas Recipe</h1>
            <p className="text-xl text-cream-100">Crispy tortilla bases loaded with delicious toppings</p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="bg-rust-600 px-4 py-2 rounded-full">30 minutes</span>
              <span className="bg-masa-600 px-4 py-2 rounded-full">Easy</span>
              <span className="bg-sunset-600 px-4 py-2 rounded-full">8 tostadas</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/recipes/tostadas.webp"
              alt="Mexican Chicken Tostadas"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-4">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>Tostadas</strong> are flat, crispy fried corn tortillas used as an edible base for toppings. Think of them as open-faced tacos. They're typically layered with refried beans, meat, lettuce, cheese, and sour cream. The word means "toasted" in Spanish, referring to how the tortilla becomes crispy.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="prose prose-lg max-w-none text-charcoal-800">
            <p className="text-xl leading-relaxed">
              Tostadas are the ultimate build-your-own dinner. Fry up some <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortillas</Link> until crispy, set out bowls of toppings, and let everyone create their perfect combination. They're fun, customizable, and absolutely delicious.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Base</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>8 <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortillas</Link></span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Vegetable oil for frying</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1 can refried beans</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>2 cups shredded chicken</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Toppings</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Shredded lettuce</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Diced tomatoes</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Shredded cheese</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Sour cream, salsa, hot sauce</span></li>
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Fry the Tostada Shells</h3>
                  <p className="text-charcoal-700">Heat 1/2 inch of oil in a skillet to 375°F. Fry each tortilla flat for about 1-2 minutes per side until golden and crispy. They should hold their flat shape. Drain on paper towels and season with salt.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full flex-shrink-0">2</span>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Warm the Beans</h3>
                  <p className="text-charcoal-700">Heat refried beans in a small saucepan or microwave until warm and spreadable. Add a splash of water if they're too thick.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full flex-shrink-0">3</span>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Build Your Tostadas</h3>
                  <p className="text-charcoal-700">Spread a layer of beans on each tostada shell. Top with shredded chicken, lettuce, tomatoes, cheese, and sour cream. Add salsa and hot sauce to taste. Eat immediately while the shell is still crispy!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-rust-600 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make Crispy Tostadas?</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/shop" className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-8 py-3 rounded-lg font-semibold transition-colors">Shop Tortillas</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
