import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BurritoIcon, BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Bean & Cheese Breakfast Burritos',
  description: 'Hearty bean and cheese breakfast burritos with scrambled eggs, refried beans, and melted cheese. Learn how to make the perfect breakfast burrito in 20 minutes!',
  keywords: 'breakfast burrito recipe, bean and cheese burrito, easy breakfast burrito, refried beans breakfast, how to make breakfast burritos',
  openGraph: {
    title: 'Bean & Cheese Breakfast Burritos Recipe | Lonestar Tortillas',
    description: 'Hearty breakfast burritos with beans, eggs, and cheese. Perfect for busy mornings!',
    type: 'article',
  },
};

export default function BreakfastBurritosRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Bean & Cheese Breakfast Burritos',
    description: 'Hearty breakfast burritos filled with scrambled eggs, refried beans, melted cheese, and salsa wrapped in warm flour tortillas',
    prepTime: 'PT10M',
    cookTime: 'PT10M',
    totalTime: 'PT20M',
    recipeYield: '4 servings',
    recipeCategory: 'Breakfast',
    recipeCuisine: 'Tex-Mex',
    keywords: 'breakfast burrito, bean and cheese, eggs and beans, tex-mex breakfast',
    recipeIngredient: [
      '4 large flour tortillas (10-inch burrito size)',
      '8 large eggs',
      '1 can (16 oz) refried beans',
      '1.5 cups shredded cheese (cheddar or Mexican blend)',
      '2 tablespoons butter',
      '1/2 cup salsa',
      'Salt and pepper to taste',
      'Optional: avocado, sour cream, hot sauce, cilantro'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        text: 'Warm the refried beans in a small pot over medium heat, stirring occasionally until hot and smooth. You can add a splash of water if they are too thick.'
      },
      {
        '@type': 'HowToStep',
        text: 'Crack eggs into a bowl and whisk with salt and pepper. Melt butter in a large skillet over medium heat. Pour in eggs and scramble gently until just set and still slightly glossy.'
      },
      {
        '@type': 'HowToStep',
        text: 'Warm the tortillas in a dry skillet or microwave until soft and pliable. This prevents them from cracking when you roll them.'
      },
      {
        '@type': 'HowToStep',
        text: 'Assemble burritos: Spread 1/4 of the refried beans down the center of each tortilla. Top with scrambled eggs, shredded cheese, and salsa.'
      },
      {
        '@type': 'HowToStep',
        text: 'Fold in the sides of the tortilla, then roll tightly from the bottom up, tucking as you go to create a tight burrito.'
      },
      {
        '@type': 'HowToStep',
        text: 'Optional: For crispy burritos, place seam-side down in a hot skillet and cook for 2-3 minutes per side until golden and crispy. Serve immediately with extra salsa, sour cream, and avocado.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What size tortillas are best for breakfast burritos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use large 10-inch or 12-inch flour tortillas for breakfast burritos. They need to be big enough to hold all the filling and roll up without breaking. Burrito-size flour tortillas work perfectly and are specifically designed for this purpose.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I make breakfast burritos ahead of time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Breakfast burritos are perfect for meal prep. Assemble them fully, wrap individually in foil or plastic wrap, and refrigerate for up to 3 days or freeze for up to 3 months. Reheat from frozen in the microwave for 2-3 minutes or in a 350°F oven for 20-25 minutes.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do you fold a burrito so it doesn\'t fall apart?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The key is proper folding technique: place filling in the center, fold in both sides about 2 inches, then roll tightly from the bottom up, tucking as you go. Don\'t overfill—leave space at the edges. A warm, pliable tortilla is essential so it doesn\'t crack.'
        }
      },
      {
        '@type': 'Question',
        name: 'What else can I add to bean and cheese breakfast burritos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Popular additions include cooked bacon or sausage, sautéed peppers and onions, hash browns or crispy potatoes, avocado or guacamole, jalapeños for heat, and different types of salsa. You can customize them however you like!'
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
              <span>Breakfast Burritos</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bean & Cheese Breakfast Burritos Recipe
            </h1>
            <p className="text-xl text-cream-100">
              Hearty, filling breakfast burritos ready in 20 minutes
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="bg-rust-600 px-4 py-2 rounded-full">⏱ 20 minutes</span>
              <span className="bg-masa-600 px-4 py-2 rounded-full">😊 Easy</span>
              <span className="bg-sunset-600 px-4 py-2 rounded-full"><BurritoIcon className="inline-block text-masa-600" size={20} /> 4 servings</span>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/recipes/breakfast-burritos.webp"
              alt="Hearty breakfast burrito with eggs, beans, and melted cheese"
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
              A good breakfast burrito is a beautiful thing—portable, filling, and absolutely delicious. This bean and cheese version is a Tex-Mex classic that combines creamy refried beans, fluffy scrambled eggs, melted cheese, and salsa all wrapped up in a warm <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">flour tortilla</Link>. It's comfort food you can eat with your hands, and it'll keep you full until lunch.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              What makes this recipe special is its versatility. It's perfect for busy weekday mornings when you need something quick and substantial. It's ideal for meal prep—make a batch on Sunday and you're set for the week. And it's endlessly customizable—add bacon, potatoes, jalapeños, or whatever you're craving. The bean and cheese version is the foundation, a classic that never gets old.
            </p>
            <p className="text-lg leading-relaxed">
              The secret to a great breakfast burrito is getting the ratios right, proper folding technique (so it doesn't fall apart), and optional crisping at the end for that irresistible golden-brown exterior. Let's make some breakfast magic!
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
                    <span>4 large <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline font-medium">flour tortillas</Link> (10-inch burrito size)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>8 large eggs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 can (16 oz) refried beans (pinto or black beans)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1.5 cups shredded cheese (cheddar, Monterey Jack, or Mexican blend)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 tablespoons butter</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/2 cup salsa (your favorite kind)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Salt and pepper to taste</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Optional Add-Ins & Toppings</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Cooked bacon or breakfast sausage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Crispy hash browns or diced potatoes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Sautéed peppers and onions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Sliced avocado or guacamole</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Sour cream</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Hot sauce (Cholula, Tabasco, or Valentina)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Fresh cilantro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Pickled jalapeños</span>
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Warm the Beans</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Open your can of refried beans and transfer them to a small pot. Heat over medium heat, stirring occasionally, until hot and smooth, about 5 minutes. If they seem too thick and paste-like, add a splash of water or chicken broth to thin them out to a spreadable consistency. You want them creamy, not stiff. Keep them warm on low heat while you prep everything else. Season with a pinch of salt and cumin if desired.
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
                    Crack 8 eggs into a bowl and whisk them together with a generous pinch of salt and pepper. Heat a large non-stick skillet over medium heat and add the butter. Once the butter is melted and foaming, pour in the eggs. Using a spatula, gently push the eggs from the edges toward the center, letting the uncooked eggs flow to the edges. Continue scrambling gently until the eggs are just set but still slightly glossy—don't overcook them! They should be soft and creamy. Remove from heat immediately.
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
                    This step is crucial—cold tortillas will crack when you try to roll them! Warm your <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">flour tortillas</Link> one of three ways: (1) heat them in a dry skillet for 20-30 seconds per side until soft and pliable, (2) wrap them in a damp paper towel and microwave for 30 seconds, or (3) wrap in foil and heat in a 350°F oven for 10 minutes. Keep them wrapped in a clean kitchen towel to stay warm while you assemble.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Assemble the Burritos</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Lay a warm tortilla flat on a clean work surface. Spread about 1/4 to 1/3 cup of warm refried beans in a horizontal line down the center of the tortilla, leaving about 2 inches on each side and 3 inches at the top and bottom. Top with a generous portion of scrambled eggs (about 1/4 of the batch), then sprinkle with shredded cheese and add a couple spoonfuls of salsa. Don't overfill or the burrito will be impossible to roll! If adding optional ingredients like bacon or avocado, layer them on now.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">The Perfect Burrito Fold</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Here's the technique that keeps your burrito from falling apart: First, fold in the left and right sides of the tortilla about 2 inches over the filling—this creates sealed ends. Then, starting from the bottom (the side closest to you), fold the tortilla up and over the filling. Tuck it tightly under the filling, creating tension. Continue rolling away from you, keeping it tight as you go. The tighter you roll, the better it holds together. Place the burrito seam-side down on a plate.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full">6</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Optional: Toast for Crispy Exterior</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    For an extra-delicious crispy exterior (highly recommended!), heat a clean skillet over medium heat. Place the burrito seam-side down in the dry skillet. Cook for 2-3 minutes without moving it until the bottom is golden brown and crispy. Carefully flip and cook the other side for another 2-3 minutes. The heat will also melt the cheese inside. Remove from the skillet and let rest for 1 minute before cutting in half. Serve immediately with extra salsa, sour cream, hot sauce, and avocado on the side. Enjoy your perfect breakfast burrito!
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
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Always warm tortillas before assembling—cold ones crack!</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Don't overfill—less is more for easy rolling</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Keep scrambled eggs slightly undercooked—they finish cooking in the burrito</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Thin the refried beans slightly for easier spreading</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Place seam-side down while eating to prevent unrolling</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Perfect for meal prep—freeze up to 3 months!</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Delicious Variations</h3>
                <ul className="space-y-2">
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Meat Lover's:</strong> Add bacon, sausage, or chorizo</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Potato & Egg:</strong> Add crispy hash browns or home fries</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Veggie Loaded:</strong> Sautéed peppers, onions, spinach</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Spicy:</strong> Add jalapeños, hot sauce, or pepper jack cheese</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>California Style:</strong> Add avocado, tomatoes, sour cream</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Denver Burrito:</strong> Ham, peppers, onions, cheese</li>
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
                What size tortillas are best for breakfast burritos?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Use large 10-inch or 12-inch <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">flour tortillas</Link> specifically labeled as "burrito size." They need to be big enough to hold all the filling and still have room to fold in the sides. Regular 8-inch tortillas are too small and will result in overstuffed, hard-to-roll burritos. Burrito-size tortillas are thicker and sturdier, designed specifically to hold generous fillings without tearing. You can find them in most grocery stores near the regular tortillas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can I make breakfast burritos ahead of time?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Absolutely! Breakfast burritos are perfect for meal prep and make-ahead breakfasts. Assemble them fully (but skip the toasting step), then wrap each burrito tightly in foil or plastic wrap. Refrigerate for up to 3 days, or freeze for up to 3 months. To reheat from the fridge: unwrap and microwave for 1-2 minutes. To reheat from frozen: microwave for 2-3 minutes (flip halfway through), or wrap in foil and bake at 350°F for 20-25 minutes. Many people make a batch of 10-12 burritos on Sunday for easy grab-and-go breakfasts all week!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                How do you fold a burrito so it doesn't fall apart?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Proper folding technique is crucial! First, don't overfill—leave 2 inches of space on the sides and 3 inches at the top/bottom. Place filling in a horizontal line across the center. Fold in the left and right sides about 2 inches over the filling—these become your sealed ends. Then fold the bottom edge up and over the filling, tucking it tightly underneath. Continue rolling away from you, keeping tension as you roll. The key is that initial tight tuck—it creates the structure. Also, always use a warm, pliable tortilla. Cold tortillas crack and won't seal properly. Practice makes perfect!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                What else can I add to bean and cheese breakfast burritos?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                The possibilities are endless! Popular additions include cooked bacon or breakfast sausage for meat lovers, crispy hash browns or diced breakfast potatoes for extra heartiness, sautéed bell peppers and onions for vegetables, sliced avocado or guacamole for creaminess, jalapeños or green chiles for heat, and different salsas (verde, roja, or pico de gallo) for flavor. You can also swap the refried beans for black beans, add chorizo for authentic Mexican flavor, or include spinach or kale for a healthier version. Just remember: don't overfill or the burrito becomes difficult to roll and eat!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                What's the difference between a breakfast burrito and a breakfast taco?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                A breakfast burrito uses a large flour tortilla (10-12 inches) and is completely rolled and closed, making it portable and easy to eat on the go. It typically has more filling and multiple ingredients. A <Link href="/recipes/breakfast-tacos" className="text-rust-600 hover:underline">breakfast taco</Link> uses a smaller tortilla (6-8 inches), is folded in half like a taco (open at the top), and usually has fewer, simpler ingredients. Breakfast tacos are eaten with both hands and are messier, while burritos are wrapped and can be eaten one-handed. In Texas, breakfast tacos are more common in San Antonio and South Texas, while breakfast burritos are popular everywhere!
              </p>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <section className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-xl my-8">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">More Tortilla Recipes & Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/recipes/breakfast-tacos" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Texas-Style Breakfast Tacos
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Quick and easy breakfast tacos with eggs and bacon
                </p>
              </div>
            </Link>
            <Link href="/recipes/cheese-quesadillas" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Classic Cheese Quesadillas
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Simple, crispy quesadillas ready in 10 minutes
                </p>
              </div>
            </Link>
            <Link href="/guides/how-to-store-tortillas" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  How to Store Tortillas
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Keep your tortillas fresh with proper storage
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-rust-600 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make Perfect Breakfast Burritos?
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
