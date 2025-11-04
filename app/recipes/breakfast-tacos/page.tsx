import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { TacoIcon, BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Texas-Style Breakfast Tacos Recipe',
  description: 'Learn how to make authentic Texas breakfast tacos with our easy recipe. Perfect scrambled eggs, bacon, cheese, and fresh tortillas. Ready in 15 minutes!',
  keywords: 'breakfast tacos recipe, texas breakfast tacos, how to make breakfast tacos, easy breakfast taco recipe, authentic breakfast tacos, texas style breakfast',
  openGraph: {
    title: 'Texas-Style Breakfast Tacos Recipe | Lonestar Tortillas',
    description: 'Authentic Texas breakfast tacos recipe. Quick, easy, and delicious. Ready in 15 minutes!',
    type: 'article',
  },
};

export default function BreakfastTacosRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Texas-Style Breakfast Tacos',
    description: 'Authentic Texas breakfast tacos with scrambled eggs, bacon, cheese, and fresh tortillas',
    prepTime: 'PT5M',
    cookTime: 'PT10M',
    totalTime: 'PT15M',
    recipeYield: '4 servings',
    recipeCategory: 'Breakfast',
    recipeCuisine: 'Tex-Mex',
    keywords: 'breakfast tacos, texas breakfast, easy breakfast recipe',
    recipeIngredient: [
      '8 flour tortillas',
      '8 large eggs',
      '8 strips bacon',
      '1 cup shredded cheese',
      '2 tablespoons butter',
      'Salt and pepper to taste',
      'Optional: salsa, avocado, cilantro'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        text: 'Cook bacon in a large skillet until crispy. Remove and drain on paper towels.'
      },
      {
        '@type': 'HowToStep',
        text: 'Whisk eggs with salt and pepper in a bowl.'
      },
      {
        '@type': 'HowToStep',
        text: 'Melt butter in the same skillet. Pour in eggs and scramble until just set.'
      },
      {
        '@type': 'HowToStep',
        text: 'Warm tortillas on a comal or in microwave.'
      },
      {
        '@type': 'HowToStep',
        text: 'Fill each tortilla with scrambled eggs, bacon, and cheese. Add toppings if desired.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What tortillas are best for breakfast tacos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Flour tortillas are the traditional choice for Texas-style breakfast tacos. They are soft, pliable, and hold up well with eggs and fillings. Lonestar flour or butter tortillas work perfectly.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long does it take to make breakfast tacos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Breakfast tacos take about 15 minutes total - 5 minutes prep and 10 minutes cooking time. They are a quick and easy breakfast option perfect for busy mornings.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
              <span>Breakfast Tacos</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Texas-Style Breakfast Tacos Recipe
            </h1>
            <p className="text-xl text-cream-100">
              Authentic, easy, and ready in 15 minutes
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="bg-rust-600 px-4 py-2 rounded-full">⏱ 15 minutes</span>
              <span className="bg-masa-600 px-4 py-2 rounded-full">🍳 Easy</span>
              <span className="bg-sunset-600 px-4 py-2 rounded-full"><TacoIcon className="inline-block text-sunset-600" size={20} /> 4 servings</span>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/recipes/breakfast-tacos.webp"
              alt="Texas-style breakfast tacos with scrambled eggs, bacon, and cheese"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Introduction */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="prose prose-lg max-w-none text-charcoal-800">
            <p className="text-xl leading-relaxed mb-6">
              If you've never had a real Texas breakfast taco, you're missing out on one of the greatest breakfast creations known to mankind. We're talking warm, soft <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">flour tortillas</Link> filled with fluffy scrambled eggs, crispy bacon, melted cheese, and all the toppings your heart desires.
            </p>
            <p className="text-lg leading-relaxed">
              This isn't some fancy restaurant dish—this is what Texans eat on weekday mornings before work, on lazy Saturday afternoons, and after late nights out. It's simple, it's fast, and it's absolutely delicious.
            </p>
          </div>
        </section>

        {/* Ingredients */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Main Ingredients</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>8 <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline font-medium">flour tortillas</Link> (or <Link href="/products/butter-tortillas" className="text-rust-600 hover:underline font-medium">butter tortillas</Link>)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>8 large eggs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>8 strips bacon (or chorizo for authentic Tex-Mex)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 cup shredded cheddar or Mexican blend cheese</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 tablespoons butter</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Salt and pepper to taste</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Optional Toppings</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Fresh salsa or pico de gallo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Sliced avocado or guacamole</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Fresh cilantro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Sour cream</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Hot sauce (Cholula or Valentina)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Refried beans (for breakfast tacos con todo)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Instructions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Cook the Bacon</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Heat a large skillet over medium heat. Add bacon strips and cook until crispy, about 5-7 minutes, flipping halfway through. Remove bacon and drain on paper towels. Chop into bite-sized pieces once cooled slightly.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Scramble the Eggs</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Crack eggs into a bowl and whisk with a pinch of salt and pepper. Drain most of the bacon grease from the skillet (leave about 1 tablespoon for flavor). Add butter and let it melt. Pour in the eggs and use a spatula to gently scramble, stirring every 20-30 seconds. Cook until just set—don't overcook them! They should be soft and slightly glossy.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Warm the Tortillas</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    While the eggs cook, warm your tortillas. You can do this on a comal (griddle) over medium heat for 20-30 seconds per side, or wrap them in a damp paper towel and microwave for 30 seconds. The goal is soft, pliable tortillas that won't crack when you fold them. <em>Pro tip:</em> Keep them wrapped in a clean kitchen towel to stay warm.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Assemble the Tacos</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Lay a warm tortilla flat. Add a generous scoop of scrambled eggs down the center. Top with chopped bacon and a sprinkle of shredded cheese (the heat from the eggs will melt it). Add any additional toppings—salsa, avocado, cilantro, hot sauce—whatever your heart desires. Fold the tortilla in half or roll it up burrito-style.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full">5</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Serve Immediately</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Breakfast tacos are best enjoyed hot and fresh. Serve with extra salsa, hot sauce, and a strong cup of coffee. That's it—you've just made authentic Texas breakfast tacos!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips & Variations */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-charcoal-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Tips & Variations</h2>
            <div className="grid md:grid-cols-2 gap-6 text-charcoal-800">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Pro Tips</h3>
                <ul className="space-y-2">
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Don't overcook the eggs—they should be soft and creamy</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Warm tortillas are essential—cold tortillas will crack</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Use <Link href="/products/butter-tortillas" className="text-rust-600 hover:underline">butter tortillas</Link> for extra richness</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Make extra bacon—it disappears fast</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Prep toppings the night before for quick assembly</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Variations</h3>
                <ul className="space-y-2">
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Chorizo & Egg:</strong> Swap bacon for Mexican chorizo</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Potato & Egg:</strong> Add crispy diced potatoes</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Bean & Cheese:</strong> Add refried beans for heartiness</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Migas:</strong> Mix crushed tortilla chips into the eggs</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Veggie:</strong> Add bell peppers, onions, spinach</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-charcoal-950 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                What tortillas are best for breakfast tacos?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Flour tortillas are the traditional choice for Texas-style breakfast tacos. They're soft, pliable, and hold up well with eggs and fillings. Our <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">Lonestar flour tortillas</Link> or <Link href="/products/butter-tortillas" className="text-rust-600 hover:underline">butter tortillas</Link> work perfectly. Corn tortillas can be used, but they're less traditional for breakfast tacos in Texas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                How long does it take to make breakfast tacos?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Breakfast tacos take about 15 minutes total—5 minutes prep and 10 minutes cooking time. They're a quick and easy breakfast option perfect for busy mornings. You can prep ingredients the night before to make it even faster.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can I make breakfast tacos ahead of time?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                While breakfast tacos are best fresh, you can prep components ahead. Cook bacon and store in the fridge. Chop toppings the night before. Scramble eggs fresh in the morning for best texture. You can also make full tacos, wrap in foil, and reheat—they won't be quite as good as fresh, but still tasty!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                What's the difference between a breakfast taco and a breakfast burrito?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                A breakfast taco is smaller, typically made with a 6-inch tortilla, folded in half (like a taco), and meant to be eaten with your hands. A breakfast burrito uses a larger tortilla (8-10 inches), is rolled closed, and often has more fillings including beans and potatoes. Breakfast tacos are a Texas staple—simple, quick, and perfect for on-the-go.
              </p>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <section className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-xl my-8">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">More Tortilla Recipes & Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/guides/how-to-reheat-tortillas" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  How to Reheat Tortillas
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Learn the best methods for warming tortillas to perfection
                </p>
              </div>
            </Link>
            <Link href="/guides/how-to-store-tortillas" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  How to Store Tortillas
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Keep your tortillas fresh with proper storage techniques
                </p>
              </div>
            </Link>
            <Link href="/products/flour-tortillas" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Shop Flour Tortillas
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Get authentic H-E-B flour tortillas delivered nationwide
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-rust-600 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make Authentic Breakfast Tacos?
            </h2>
            <p className="text-xl mb-8 text-cream-100">
              Get authentic Texas tortillas delivered to your door
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Shop Tortillas
              </Link>
              <Link
                href="/products/flour-tortillas"
                className="bg-transparent border-2 border-cream-50 hover:bg-cream-50 hover:text-rust-600 text-cream-50 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                View Flour Tortillas
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
