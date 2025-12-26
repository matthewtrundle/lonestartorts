import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Crispy Chicken Flautas Recipe (Taquitos)',
  description: 'Make crispy chicken flautas (taquitos) with this easy recipe. Rolled corn tortillas filled with shredded chicken, fried until golden. Perfect appetizer or meal!',
  keywords: 'flautas, flautas recipe, chicken flautas, taquitos, rolled tacos, crispy tacos, Mexican appetizer, fried tacos',
  alternates: {
    canonical: 'https://lonestartortillas.com/recipes/flautas',
  },
  openGraph: {
    title: 'Crispy Chicken Flautas Recipe | Lonestar Tortillas',
    description: 'Golden, crispy rolled tacos filled with seasoned chicken. Perfect for parties or dinner!',
    type: 'article',
  },
};

export default function FlautasRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Crispy Chicken Flautas',
    description: 'Corn tortillas rolled around seasoned shredded chicken and fried until golden and crispy',
    image: 'https://lonestartortillas.com/images/recipes/flautas.webp',
    prepTime: 'PT20M',
    cookTime: 'PT15M',
    totalTime: 'PT35M',
    recipeYield: '12 flautas',
    recipeCategory: 'Appetizer',
    recipeCuisine: 'Mexican',
    keywords: 'flautas, taquitos, rolled tacos, chicken flautas',
    recipeIngredient: [
      '12 corn tortillas',
      '2 cups shredded cooked chicken',
      '1 cup shredded Mexican cheese',
      '1/2 teaspoon cumin',
      '1/2 teaspoon garlic powder',
      'Salt and pepper to taste',
      'Vegetable oil for frying',
      'Toothpicks to secure',
      'Sour cream for serving',
      'Guacamole for serving',
      'Salsa for serving'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        text: 'Mix shredded chicken with cheese, cumin, garlic powder, salt, and pepper.'
      },
      {
        '@type': 'HowToStep',
        text: 'Warm tortillas to make them pliable. Place 2-3 tablespoons of filling along one edge and roll tightly. Secure with a toothpick.'
      },
      {
        '@type': 'HowToStep',
        text: 'Heat 1/2 inch of oil to 375°F. Fry flautas seam-side down for 2-3 minutes, turning until golden all over.'
      },
      {
        '@type': 'HowToStep',
        text: 'Drain on paper towels, remove toothpicks, and serve with sour cream, guacamole, and salsa.'
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
              <span>Flautas</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Crispy Chicken Flautas Recipe</h1>
            <p className="text-xl text-cream-100">Golden rolled tacos that shatter with every bite</p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="bg-rust-600 px-4 py-2 rounded-full">35 minutes</span>
              <span className="bg-masa-600 px-4 py-2 rounded-full">Easy</span>
              <span className="bg-sunset-600 px-4 py-2 rounded-full">12 flautas</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/recipes/flautas.webp"
              alt="Crispy Chicken Flautas"
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
              <strong>Flautas</strong> (also called taquitos or rolled tacos) are corn tortillas rolled around a filling and fried until crispy. The name means "flutes" in Spanish because of their long, thin shape. They're typically filled with chicken or beef, and served with sour cream, guacamole, and salsa for dipping.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="prose prose-lg max-w-none text-charcoal-800">
            <p className="text-xl leading-relaxed mb-6">
              There's something magical about the crunch of a perfectly fried flauta. The <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortilla</Link> shell shatters as you bite through to the tender, cheesy chicken filling inside. These are the ultimate party appetizer, game day snack, or weeknight dinner.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Flautas</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>12 <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline font-medium">corn tortillas</Link></span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>2 cups shredded cooked chicken</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1 cup shredded Mexican cheese blend</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>1/2 tsp cumin, 1/2 tsp garlic powder</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Salt and pepper to taste</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Vegetable oil for frying</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For Serving</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Sour cream or Mexican crema</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Guacamole</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Salsa verde or salsa roja</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Shredded lettuce</span></li>
                  <li className="flex items-center gap-2"><BulletIcon className="inline-block text-rust-600" size={6} /><span>Crumbled queso fresco</span></li>
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Make the Filling</h3>
                  <p className="text-charcoal-700">Mix shredded chicken with cheese, cumin, garlic powder, salt, and pepper in a bowl. Use rotisserie chicken for a quick shortcut.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full flex-shrink-0">2</span>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Warm & Roll Tortillas</h3>
                  <p className="text-charcoal-700">Warm tortillas in the microwave (wrap in damp paper towel, 30 seconds) to make them pliable. Place 2-3 tablespoons of filling along one edge and roll tightly. Secure with a toothpick if needed.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full flex-shrink-0">3</span>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Fry Until Golden</h3>
                  <p className="text-charcoal-700">Heat 1/2 inch of oil to 375°F. Fry flautas seam-side down first, then turn to brown all sides evenly—about 2-3 minutes total. Drain on paper towels.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full flex-shrink-0">4</span>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Serve & Enjoy</h3>
                  <p className="text-charcoal-700">Remove toothpicks. Arrange on a platter with shredded lettuce. Drizzle with crema, sprinkle with queso fresco, and serve with guacamole and salsa for dipping.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-rust-600 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make Crispy Flautas?</h2>
            <p className="text-xl mb-8 text-cream-100">Get authentic Texas corn tortillas delivered to your door</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/shop" className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-8 py-3 rounded-lg font-semibold transition-colors">Shop Tortillas</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
