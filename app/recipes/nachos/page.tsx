import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Ultimate Loaded Nachos Recipe - Nachos Supreme',
  description: 'Make the ultimate loaded nachos with homemade tortilla chips, seasoned beef, cheese sauce, and all the toppings. Perfect for game day, parties, or movie night!',
  keywords: 'nachos, nachos recipe, loaded nachos, nachos supreme, game day nachos, party nachos, tortilla chips, cheese nachos',
  alternates: {
    canonical: 'https://lonestartortillas.com/recipes/nachos',
  },
  openGraph: {
    title: 'Ultimate Loaded Nachos Recipe | Lonestar Tortillas',
    description: 'Crispy tortilla chips piled high with cheese, seasoned meat, and fresh toppings. The ultimate crowd-pleaser!',
    type: 'article',
  },
};

export default function NachosRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Ultimate Loaded Nachos Supreme',
    description: 'Layers of crispy tortilla chips loaded with seasoned beef, melted cheese, beans, and fresh toppings',
    image: 'https://lonestartortillas.com/images/recipes/nachos.webp',
    prepTime: 'PT20M',
    cookTime: 'PT15M',
    totalTime: 'PT35M',
    recipeYield: '8 servings',
    recipeCategory: 'Appetizer',
    recipeCuisine: 'Mexican-American',
    keywords: 'nachos, loaded nachos, nachos supreme, game day food',
    recipeIngredient: [
      '1 large bag tortilla chips (or homemade)',
      '1 pound ground beef',
      '1 packet taco seasoning',
      '1 can black beans, drained',
      '2 cups shredded Mexican cheese blend',
      '1 cup queso dip or cheese sauce',
      '1 cup pico de gallo',
      '1/2 cup sour cream',
      '1/2 cup guacamole',
      '1/4 cup sliced jalapeños',
      '1/4 cup sliced black olives',
      'Fresh cilantro for garnish',
      'Lime wedges for serving'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        text: 'Preheat oven to 400°F. Spread tortilla chips in a single layer on a large sheet pan.'
      },
      {
        '@type': 'HowToStep',
        text: 'Brown ground beef, drain fat, and stir in taco seasoning with 1/4 cup water. Simmer until thickened.'
      },
      {
        '@type': 'HowToStep',
        text: 'Layer chips with seasoned beef, black beans, and shredded cheese. Repeat layers.'
      },
      {
        '@type': 'HowToStep',
        text: 'Bake 8-10 minutes until cheese is melted and bubbly.'
      },
      {
        '@type': 'HowToStep',
        text: 'Drizzle with queso, add pico de gallo, sour cream, guacamole, jalapeños, and olives. Serve immediately.'
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
              <span>Nachos</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Ultimate Loaded Nachos Recipe</h1>
            <p className="text-xl text-cream-100">The crowd-pleasing appetizer everyone loves</p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="bg-rust-600 px-4 py-2 rounded-full">35 minutes</span>
              <span className="bg-masa-600 px-4 py-2 rounded-full">Easy</span>
              <span className="bg-sunset-600 px-4 py-2 rounded-full">8 servings</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/recipes/nachos.webp"
              alt="Loaded Nachos Supreme"
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
              <strong>Loaded nachos</strong> (or nachos supreme) are tortilla chips layered with seasoned meat, cheese, beans, and fresh toppings, then baked until the cheese melts. The secret to great nachos is layering the toppings throughout—not just piling everything on top—so every chip gets loaded with flavor.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="prose prose-lg max-w-none text-charcoal-800">
            <p className="text-xl leading-relaxed mb-6">
              There's nothing quite like a perfectly made plate of loaded nachos. When made right—with layers of seasoned meat, gooey melted cheese, and fresh toppings—every single chip is a flavor bomb. The key is using quality <Link href="/recipes/homemade-chips" className="text-rust-600 hover:underline">homemade tortilla chips</Link> or thick restaurant-style chips that can handle all those toppings without getting soggy.
            </p>
            <p className="text-lg leading-relaxed">
              This recipe takes nachos to the next level with proper layering technique, ensuring nobody fights over the loaded chips while someone else gets stuck with the naked ones.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Base & Meat</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1 large bag tortilla chips (or <Link href="/recipes/homemade-chips" className="text-rust-600 hover:underline">homemade</Link>)</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1 lb ground beef</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1 packet taco seasoning</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1 can black beans, drained and rinsed</span></li>
                </ul>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3 mt-6">Cheese</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>2 cups shredded Mexican blend</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1 cup queso dip or nacho cheese</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Fresh Toppings</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1 cup pico de gallo or fresh salsa</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1/2 cup sour cream</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1/2 cup guacamole</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1/4 cup sliced jalapeños (pickled or fresh)</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1/4 cup sliced black olives</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Fresh cilantro, chopped</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Lime wedges</span></li>
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Prep the Meat</h3>
                  <p className="text-charcoal-700">Brown ground beef in a large skillet over medium-high heat, breaking it up as it cooks. Drain excess fat. Stir in taco seasoning and 1/4 cup water. Simmer 5 minutes until thickened. Set aside.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full flex-shrink-0">2</span>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Create the First Layer</h3>
                  <p className="text-charcoal-700">Preheat oven to 400°F. Spread half the tortilla chips on a large sheet pan in a single layer. Top with half the seasoned beef, half the black beans, and half the shredded cheese.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full flex-shrink-0">3</span>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Add Second Layer</h3>
                  <p className="text-charcoal-700">Add remaining chips on top, then layer with remaining beef, beans, and cheese. This layering ensures every chip gets toppings—no sad naked chips at the bottom!</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full flex-shrink-0">4</span>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Bake Until Melty</h3>
                  <p className="text-charcoal-700">Bake for 8-10 minutes until cheese is fully melted and bubbly. Watch carefully—you want melted cheese, not burnt chips. Remove from oven.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full flex-shrink-0">5</span>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Top & Serve Immediately</h3>
                  <p className="text-charcoal-700">Drizzle warm queso over the nachos. Add dollops of sour cream and guacamole. Scatter pico de gallo, jalapeños, olives, and cilantro on top. Serve with lime wedges. Eat fast—these are best hot!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-xl my-8">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Nacho Variations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-rust-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Chicken Nachos</h3>
              <p className="text-charcoal-700 text-sm">Swap ground beef for shredded rotisserie chicken mixed with a little salsa verde. Lighter and just as delicious.</p>
            </div>
            <div className="bg-rust-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-charcoal-950 mb-2">BBQ Pulled Pork Nachos</h3>
              <p className="text-charcoal-700 text-sm">Use leftover pulled pork with BBQ sauce, add pickled red onions and a drizzle of ranch. Texas meets Tex-Mex!</p>
            </div>
            <div className="bg-rust-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Breakfast Nachos</h3>
              <p className="text-charcoal-700 text-sm">Scrambled eggs, chorizo, cheese, and pico. Top with a drizzle of hot sauce. Perfect for game day brunches.</p>
            </div>
            <div className="bg-rust-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Veggie Nachos</h3>
              <p className="text-charcoal-700 text-sm">Skip the meat, double the beans, add roasted corn and diced bell peppers. Still fully loaded and satisfying.</p>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12 bg-charcoal-50 rounded-xl my-8">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Pro Tips for Perfect Nachos</h2>
          <ul className="space-y-4 text-charcoal-800">
            <li className="flex items-start gap-3">
              <span className="text-rust-600 font-bold">1.</span>
              <span><strong>Use thick chips:</strong> Thin chips will get soggy. Restaurant-style or <Link href="/recipes/homemade-chips" className="text-rust-600 hover:underline">homemade chips</Link> hold up best.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-rust-600 font-bold">2.</span>
              <span><strong>Layer, don't pile:</strong> Building in layers ensures every chip gets toppings and cheese.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-rust-600 font-bold">3.</span>
              <span><strong>Add cold toppings after baking:</strong> Pico, guac, sour cream, and cilantro go on AFTER the oven. They provide fresh contrast to the hot melted cheese.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-rust-600 font-bold">4.</span>
              <span><strong>Serve immediately:</strong> Nachos have about a 10-minute window before they get soggy. Make them right before serving.</span>
            </li>
          </ul>
        </section>

        <section className="bg-rust-600 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Game Day?</h2>
            <p className="text-xl mb-8 text-cream-100">Make your own chips for the ultimate nachos experience</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/recipes/homemade-chips" className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-8 py-3 rounded-lg font-semibold transition-colors">Homemade Chips Recipe</Link>
              <Link href="/shop" className="bg-transparent border-2 border-cream-50 hover:bg-cream-50 hover:text-rust-600 text-cream-50 px-8 py-3 rounded-lg font-semibold transition-colors">Shop Tortillas</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
