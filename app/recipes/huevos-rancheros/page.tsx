import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Authentic Huevos Rancheros Recipe',
  description: 'Make classic huevos rancheros with fried eggs on crispy tortillas smothered in ranchero sauce. Traditional Mexican breakfast ready in 25 minutes!',
  keywords: 'huevos rancheros, huevos rancheros recipe, Mexican eggs, ranch eggs, Mexican breakfast, ranchero sauce, eggs on tortillas',
  alternates: {
    canonical: 'https://lonestartortillas.com/recipes/huevos-rancheros',
  },
  openGraph: {
    title: 'Authentic Huevos Rancheros Recipe | Lonestar Tortillas',
    description: 'Classic Mexican ranch-style eggs on crispy tortillas with homemade ranchero sauce.',
    type: 'article',
  },
};

export default function HuevosRancherosRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Authentic Huevos Rancheros',
    description: 'Classic Mexican breakfast with fried eggs on crispy tortillas topped with spicy ranchero sauce',
    image: 'https://lonestartortillas.com/images/recipes/huevos-rancheros.webp',
    prepTime: 'PT10M',
    cookTime: 'PT15M',
    totalTime: 'PT25M',
    recipeYield: '4 servings',
    recipeCategory: 'Breakfast',
    recipeCuisine: 'Mexican',
    keywords: 'huevos rancheros, Mexican breakfast, ranch eggs',
    recipeIngredient: [
      '8 corn tortillas',
      '8 eggs',
      '2 cups ranchero sauce',
      '4 Roma tomatoes, diced',
      '1 jalapeño, seeded and minced',
      '1/2 onion, diced',
      '2 cloves garlic, minced',
      '1 teaspoon cumin',
      '1/2 cup refried beans',
      'Vegetable oil for frying',
      'Queso fresco for topping',
      'Fresh cilantro',
      'Avocado slices'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        text: 'Make ranchero sauce: Sauté onion until soft, add garlic and jalapeño for 1 minute. Add tomatoes, cumin, salt and simmer 10 minutes until thickened.'
      },
      {
        '@type': 'HowToStep',
        text: 'Fry tortillas in oil until lightly crispy but still pliable, about 30 seconds per side. Drain on paper towels.'
      },
      {
        '@type': 'HowToStep',
        text: 'Fry eggs sunny-side up in the same pan until whites are set but yolks are runny.'
      },
      {
        '@type': 'HowToStep',
        text: 'Spread refried beans on tortillas, top with eggs, and ladle warm ranchero sauce over everything. Garnish with cheese, cilantro, and avocado.'
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
        <section className="bg-charcoal-950 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <nav className="text-sm text-cream-300 mb-6">
              <Link href="/" className="hover:text-cream-50">Home</Link>
              {' '}/{' '}
              <Link href="/recipes" className="hover:text-cream-50">Recipes</Link>
              {' '}/{' '}
              <span>Huevos Rancheros</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Authentic Huevos Rancheros Recipe
            </h1>
            <p className="text-xl text-cream-100">
              Ranch-style eggs on crispy tortillas with homemade ranchero sauce
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="bg-rust-600 px-4 py-2 rounded-full">25 minutes</span>
              <span className="bg-masa-600 px-4 py-2 rounded-full">Easy</span>
              <span className="bg-sunset-600 px-4 py-2 rounded-full">4 servings</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/recipes/huevos-rancheros.webp"
              alt="Huevos Rancheros"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-4">
          <div className="bg-rust-50 border-l-4 border-rust-500 p-6 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>Huevos rancheros</strong> ("ranch-style eggs") is a classic Mexican breakfast of fried eggs served on lightly fried corn tortillas and smothered in warm ranchero sauce. The dish originated on Mexican farms where workers needed a hearty, protein-rich breakfast. It takes about 25 minutes to make and is one of the most satisfying breakfast dishes you'll ever eat.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="prose prose-lg max-w-none text-charcoal-800">
            <p className="text-xl leading-relaxed mb-6">
              Huevos rancheros is everything a breakfast should be: crispy <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortillas</Link>, perfectly fried eggs with runny yolks, creamy refried beans, and that incredible homemade ranchero sauce that ties it all together. When you cut into the egg and the yolk runs into the sauce... that's when you know you've made something special.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Dish</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>8 <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline font-medium">corn tortillas</Link></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>8 eggs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>1/2 cup refried beans</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>Vegetable oil for frying</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Ranchero Sauce</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>4 Roma tomatoes, diced (or 1 can diced)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>1 jalapeño, seeded and minced</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>1/2 onion, diced</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>2 cloves garlic, minced</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>1 tsp cumin, salt to taste</span>
                  </li>
                </ul>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3 mt-4">Toppings</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>Queso fresco, cilantro, avocado</span>
                  </li>
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
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Make Ranchero Sauce</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Heat 1 tablespoon oil in a saucepan over medium heat. Sauté onion for 3-4 minutes until soft. Add garlic and jalapeño, cook 1 minute. Add diced tomatoes, cumin, and salt. Simmer for 10 minutes, stirring occasionally, until slightly thickened. Keep warm.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Fry the Tortillas</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Heat 1/4 inch oil in a skillet over medium-high heat. Fry each tortilla for about 30 seconds per side until lightly golden and slightly crispy but still pliable. Drain on paper towels. You want them sturdy enough to hold the toppings but not cracker-crispy.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Fry the Eggs</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Drain most of the oil, leaving about 2 tablespoons. Fry eggs sunny-side up over medium heat until the whites are set but yolks are still runny, about 3 minutes. Season with salt and pepper.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Assemble & Serve</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Place 2 tortillas on each plate, slightly overlapping. Spread warm refried beans over the tortillas. Top each with a fried egg. Ladle warm ranchero sauce generously over everything. Garnish with crumbled queso fresco, fresh cilantro, and avocado slices. Serve immediately!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-xl my-8">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">More Mexican Breakfast Recipes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/recipes/chilaquiles" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">Chilaquiles</h3>
                <p className="text-charcoal-700 text-sm">Tortilla chips in salsa with eggs</p>
              </div>
            </Link>
            <Link href="/recipes/breakfast-tacos" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">Breakfast Tacos</h3>
                <p className="text-charcoal-700 text-sm">Texas-style breakfast tacos</p>
              </div>
            </Link>
            <Link href="/products/corn-tortillas" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">Shop Corn Tortillas</h3>
                <p className="text-charcoal-700 text-sm">Get authentic H-E-B corn tortillas</p>
              </div>
            </Link>
          </div>
        </section>

        <section className="bg-rust-600 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make Huevos Rancheros?</h2>
            <p className="text-xl mb-8 text-cream-100">Get authentic Texas corn tortillas delivered to your door</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/shop" className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-8 py-3 rounded-lg font-semibold transition-colors">Shop Tortillas</Link>
              <Link href="/products/corn-tortillas" className="bg-transparent border-2 border-cream-50 hover:bg-cream-50 hover:text-rust-600 text-cream-50 px-8 py-3 rounded-lg font-semibold transition-colors">View Corn Tortillas</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
