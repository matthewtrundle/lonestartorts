import type { Metadata } from 'next';
import Link from 'next/link';
import { RecipeCard } from '@/components/RecipeCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Tortilla Recipes | Tacos, Quesadillas & More',
  description: 'Discover authentic Texas tortilla recipes. From breakfast tacos to quesadillas, learn how to make delicious meals with H-E-B® tortillas. Easy, quick, and family-friendly.',
  keywords: 'tortilla recipes, breakfast taco recipe, texas recipes, quesadilla recipe, authentic mexican recipes, H-E-B tortilla recipes, easy tortilla meals, taco recipes',
  openGraph: {
    title: 'Tortilla Recipes | Lonestar Tortillas',
    description: 'Authentic Texas tortilla recipes for breakfast, lunch, and dinner. Easy to follow with authentic ingredients.',
    type: 'website',
  },
};

const recipes = [
  {
    title: 'Texas-Style Breakfast Tacos',
    description: 'Authentic Texas breakfast tacos with scrambled eggs, crispy bacon, cheese, and fresh tortillas. Ready in 15 minutes and perfect for busy mornings.',
    href: '/recipes/breakfast-tacos',
    image: '/images/recipes/breakfast-tacos.webp',
    totalTime: '15 min',
    difficulty: 'Easy' as const,
    servings: '4 servings',
    category: 'Breakfast',
  },
  {
    title: 'Classic Cheese Quesadillas',
    description: 'Crispy, golden quesadillas filled with melted cheese. Simple, quick, and endlessly customizable with your favorite toppings.',
    href: '/recipes/cheese-quesadillas',
    image: '/images/recipes/cheese-quesadillas.webp',
    totalTime: '10 min',
    difficulty: 'Easy' as const,
    servings: '4 servings',
    category: 'Lunch',
  },
  {
    title: 'Bean & Cheese Breakfast Burritos',
    description: 'Hearty breakfast burritos packed with refried beans, scrambled eggs, and melted cheese. Perfect for meal prep and busy mornings.',
    href: '/recipes/breakfast-burritos',
    image: '/images/recipes/breakfast-burritos.webp',
    totalTime: '20 min',
    difficulty: 'Easy' as const,
    servings: '4 servings',
    category: 'Breakfast',
  },
  {
    title: 'Grilled Chicken Fajitas',
    description: 'Sizzling fajitas with marinated chicken, colorful peppers, and onions. Restaurant-quality Tex-Mex at home in just 30 minutes.',
    href: '/recipes/chicken-fajitas',
    image: '/images/recipes/chicken-fajitas.webp',
    totalTime: '30 min',
    difficulty: 'Easy' as const,
    servings: '4 servings',
    category: 'Dinner',
  },
  {
    title: 'Street-Style Tacos Al Pastor',
    description: 'Authentic tacos al pastor with chile-marinated pork, grilled pineapple, and fresh toppings. Mexican street food at its finest.',
    href: '/recipes/tacos-al-pastor',
    image: '/images/recipes/tacos-al-pastor.webp',
    totalTime: '45 min',
    difficulty: 'Medium' as const,
    servings: '12 tacos',
    category: 'Dinner',
  },
  {
    title: 'Slow-Cooked Carnitas Tacos',
    description: 'Tender, juicy pork carnitas with crispy edges and authentic Mexican flavor. Perfect for taco night and feeds a crowd.',
    href: '/recipes/carnitas-tacos',
    image: '/images/recipes/carnitas-tacos.webp',
    totalTime: '4 hours',
    difficulty: 'Medium' as const,
    servings: '8 servings',
    category: 'Dinner',
  },
  {
    title: 'Carne Asada Tacos',
    description: 'Perfectly grilled marinated steak tacos served street-style. Juicy, flavorful, and ready in under 3 hours with simple ingredients.',
    href: '/recipes/carne-asada-tacos',
    image: '/images/recipes/carne-asada-tacos.webp',
    totalTime: '2.5 hours',
    difficulty: 'Easy' as const,
    servings: '6 servings',
    category: 'Dinner',
  },
  {
    title: 'Baja Fish Tacos',
    description: 'Crispy beer-battered fish with tangy cabbage slaw and creamy sauce. The ultimate Baja-style fish tacos ready in 35 minutes.',
    href: '/recipes/fish-tacos',
    image: '/images/recipes/fish-tacos.webp',
    totalTime: '35 min',
    difficulty: 'Medium' as const,
    servings: '4 servings',
    category: 'Dinner',
  },
  {
    title: 'Spicy Grilled Shrimp Tacos',
    description: 'Quick 20-minute shrimp tacos with spicy seasoning and cilantro lime slaw. Perfect healthy weeknight dinner.',
    href: '/recipes/shrimp-tacos',
    image: '/images/recipes/shrimp-tacos.webp',
    totalTime: '20 min',
    difficulty: 'Easy' as const,
    servings: '4 servings',
    category: 'Dinner',
  },
  {
    title: 'Bean & Veggie Tacos',
    description: 'Hearty vegetarian tacos with seasoned black beans and roasted vegetables. Healthy, satisfying, and ready in 30 minutes.',
    href: '/recipes/bean-and-veggie-tacos',
    image: '/images/recipes/bean-veggie-tacos.webp',
    totalTime: '30 min',
    difficulty: 'Easy' as const,
    servings: '4 servings',
    category: 'Dinner',
  },
  {
    title: 'Classic Cheese Enchiladas',
    description: 'Authentic enchiladas rojas with homemade red sauce. Better than any restaurant and ready in 45 minutes.',
    href: '/recipes/cheese-enchiladas',
    image: '/images/recipes/cheese-enchiladas.webp',
    totalTime: '45 min',
    difficulty: 'Medium' as const,
    servings: '6 servings',
    category: 'Dinner',
  },
];

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Tortilla Recipes',
  description: 'Authentic Texas tortilla recipes for breakfast, lunch, and dinner.',
  url: 'https://lonestartortillas.com/recipes',
  hasPart: recipes.map(recipe => ({
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.description,
    url: `https://lonestartortillas.com${recipe.href}`,
    prepTime: recipe.totalTime,
  })),
};

export default function RecipesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 via-cream-100 to-masa-50">
        {/* Header */}
        <header className="bg-charcoal-950 text-cream-50 py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Recipes' },
              ]}
              className="mb-6 text-cream-300"
            />
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-display">
              Authentic Texas Tortilla Recipes & Cooking Guides
            </h1>
            <p className="text-xl text-cream-100 max-w-3xl">
              Discover authentic Texas recipes that showcase the versatility of quality tortillas.
              From quick breakfast tacos to elaborate dinner spreads, we've got you covered.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12 md:py-16 max-w-6xl">
          {/* Introduction */}
          <section className="mb-12">
            <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg">
              <h2 className="text-2xl font-bold text-charcoal-950 mb-3">
                Authentic Texas Tortilla Recipes
              </h2>
              <p className="text-lg text-charcoal-800 leading-relaxed">
                These recipes celebrate the authentic taste of Texas using quality{' '}
                <Link href="/products/flour-tortillas" className="text-sunset-600 hover:underline font-medium">
                  H-E-B® flour tortillas
                </Link>{' '}
                and{' '}
                <Link href="/products/corn-tortillas" className="text-sunset-600 hover:underline font-medium">
                  corn tortillas
                </Link>
                . Whether you're a beginner or experienced cook, you'll find recipes that are easy to follow and delicious to eat.
              </p>
            </div>
          </section>

          {/* Featured Recipes */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8">
              Featured Recipes
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.href}
                  title={recipe.title}
                  description={recipe.description}
                  href={recipe.href}
                  image={recipe.image}
                  totalTime={recipe.totalTime}
                  difficulty={recipe.difficulty}
                  servings={recipe.servings}
                  category={recipe.category}
                />
              ))}
            </div>
          </section>

          {/* Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8">
              Browse by Meal Type
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-sunrise-100 to-sunset-100 p-8 rounded-lg shadow-md">
                <div className="text-4xl mb-4">🌅</div>
                <h3 className="text-2xl font-bold text-charcoal-950 mb-3">Breakfast</h3>
                <p className="text-charcoal-700 mb-4">
                  Start your day right with hearty breakfast tacos, burritos, and more.
                </p>
                <span className="text-sunset-600 font-semibold text-sm">
                  {recipes.filter(r => r.category === 'Breakfast').length} recipe
                  {recipes.filter(r => r.category === 'Breakfast').length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="bg-gradient-to-br from-masa-100 to-sunset-100 p-8 rounded-lg shadow-md">
                <div className="text-4xl mb-4">☀️</div>
                <h3 className="text-2xl font-bold text-charcoal-950 mb-3">Lunch</h3>
                <p className="text-charcoal-700 mb-4">
                  Quick and satisfying quesadillas, tacos, and wraps for midday meals.
                </p>
                <span className="text-sunset-600 font-semibold text-sm">
                  {recipes.filter(r => r.category === 'Lunch').length} recipe
                  {recipes.filter(r => r.category === 'Lunch').length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="bg-gradient-to-br from-rust-100 to-masa-100 p-8 rounded-lg shadow-md">
                <div className="text-4xl mb-4">🌙</div>
                <h3 className="text-2xl font-bold text-charcoal-950 mb-3">Dinner</h3>
                <p className="text-charcoal-700 mb-4">
                  Impressive dinner recipes from carnitas to enchiladas for family meals.
                </p>
                <span className="text-sunset-600 font-semibold text-sm">
                  {recipes.filter(r => r.category === 'Dinner').length} recipe
                  {recipes.filter(r => r.category === 'Dinner').length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="bg-gradient-to-r from-sunset-100 to-masa-100 p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">Recipe Tips</h2>
            <div className="grid md:grid-cols-2 gap-6 text-charcoal-800">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sunset-500 text-white flex items-center justify-center font-bold">
                  💡
                </div>
                <div>
                  <h3 className="font-bold mb-1">Warm Your Tortillas</h3>
                  <p className="text-sm">Always warm tortillas before using for better texture and flavor. See our{' '}
                    <Link href="/guides/how-to-reheat-tortillas" className="text-sunset-600 hover:underline">
                      reheating guide
                    </Link>.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sunset-500 text-white flex items-center justify-center font-bold">
                  💡
                </div>
                <div>
                  <h3 className="font-bold mb-1">Use Quality Tortillas</h3>
                  <p className="text-sm">The foundation of great recipes is quality ingredients. Start with authentic H-E-B® tortillas.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sunset-500 text-white flex items-center justify-center font-bold">
                  💡
                </div>
                <div>
                  <h3 className="font-bold mb-1">Don't Overfill</h3>
                  <p className="text-sm">Less is more! Overfilled tacos and burritos are messy and harder to eat.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sunset-500 text-white flex items-center justify-center font-bold">
                  💡
                </div>
                <div>
                  <h3 className="font-bold mb-1">Fresh Toppings Matter</h3>
                  <p className="text-sm">Fresh cilantro, lime, and quality salsa elevate any tortilla-based dish.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-charcoal-950 text-cream-50 p-12 rounded-lg text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Cooking?
            </h2>
            <p className="text-xl mb-8 text-cream-100 max-w-2xl mx-auto">
              Get authentic H-E-B® tortillas delivered to your door. Perfect for all these recipes and more.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
              >
                Shop Tortillas
              </Link>
              <Link
                href="/guides"
                className="bg-transparent border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                View All Guides
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
