import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CheeseIcon, BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Classic Cheese Quesadillas Recipe',
  description: 'Learn how to make perfect cheese quesadillas with our easy recipe. Crispy outside, melted cheese inside. Ready in just 10 minutes with simple ingredients!',
  keywords: 'cheese quesadillas recipe, how to make quesadillas, easy quesadilla recipe, quick lunch recipe, quesadilla variations, melted cheese tortilla',
  openGraph: {
    title: 'Classic Cheese Quesadillas Recipe | Lonestar Tortillas',
    description: 'Perfect cheese quesadillas recipe. Crispy, cheesy, and ready in 10 minutes!',
    type: 'article',
  },
};

export default function CheeseQuesadillasRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Classic Cheese Quesadillas',
    description: 'Simple cheese quesadillas with crispy tortillas and perfectly melted cheese',
    image: 'https://lonestartortillas.com/images/recipes/cheese-quesadillas.webp',
    prepTime: 'PT5M',
    cookTime: 'PT5M',
    totalTime: 'PT10M',
    recipeYield: '4 servings',
    recipeCategory: 'Lunch',
    recipeCuisine: 'Tex-Mex',
    keywords: 'quesadillas, cheese quesadillas, quick lunch, easy recipe',
    recipeIngredient: [
      '8 flour tortillas (8-inch)',
      '3 cups shredded cheese (Mexican blend or cheddar)',
      '2 tablespoons butter or oil',
      'Optional: sour cream for serving',
      'Optional: salsa or pico de gallo',
      'Optional: guacamole'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        text: 'Heat a large skillet or griddle over medium heat.'
      },
      {
        '@type': 'HowToStep',
        text: 'Place one tortilla flat in the skillet. Sprinkle about 3/4 cup shredded cheese evenly over half of the tortilla.'
      },
      {
        '@type': 'HowToStep',
        text: 'Fold the tortilla in half over the cheese, creating a half-moon shape. Press down gently with a spatula.'
      },
      {
        '@type': 'HowToStep',
        text: 'Cook for 2-3 minutes until the bottom is golden brown and crispy. Flip carefully and cook the other side for another 2 minutes until golden and cheese is fully melted.'
      },
      {
        '@type': 'HowToStep',
        text: 'Remove from skillet and let rest for 1 minute before cutting into wedges. Repeat with remaining tortillas.'
      },
      {
        '@type': 'HowToStep',
        text: 'Serve hot with sour cream, salsa, and guacamole.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What type of tortillas are best for quesadillas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Flour tortillas are the traditional choice for quesadillas. Use 8-inch or 10-inch flour tortillas for best results. They crisp up beautifully and have the perfect texture to hold melted cheese. Lonestar flour tortillas work perfectly for authentic quesadillas.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the best cheese for quesadillas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mexican blend cheese (a mix of Monterey Jack, cheddar, asadero, and queso quesadilla) melts perfectly and has authentic flavor. Cheddar, Monterey Jack, or Oaxaca cheese also work great. Use freshly shredded cheese rather than pre-shredded for better melting.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I get crispy quesadillas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The key to crispy quesadillas is using medium heat (not too high), a thin layer of butter or oil, and not overfilling with cheese. Press down gently with a spatula while cooking. Cook until golden brown on each side, about 2-3 minutes per side.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I add other ingredients to cheese quesadillas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! Popular additions include cooked chicken, sautéed peppers and onions, black beans, corn, jalapeños, or mushrooms. Add fillings on top of the cheese before folding. Just don\'t overfill or the quesadilla becomes difficult to flip and eat.'
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
              <span>Cheese Quesadillas</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Classic Cheese Quesadillas Recipe
            </h1>
            <p className="text-xl text-cream-100">
              Crispy, cheesy, and ready in just 10 minutes
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="bg-rust-600 px-4 py-2 rounded-full">⏱ 10 minutes</span>
              <span className="bg-masa-600 px-4 py-2 rounded-full">😊 Easy</span>
              <span className="bg-sunset-600 px-4 py-2 rounded-full"><CheeseIcon className="inline-block text-yellow-500" size={18} /> 4 servings</span>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/recipes/cheese-quesadillas.webp"
              alt="Golden crispy cheese quesadilla cut into wedges with melted cheese"
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
              Sometimes the simplest recipes are the best. A classic cheese quesadilla is exactly that—warm, crispy <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">flour tortillas</Link> filled with perfectly melted cheese. That's it. No fancy ingredients, no complicated techniques, just pure comfort food that takes 10 minutes from start to finish.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Whether you're feeding hungry kids after school, need a quick lunch, or want a midnight snack, quesadillas are the answer. They're so simple that even beginners can nail them on the first try. And once you master the basic cheese version, you can add any fillings your heart desires.
            </p>
            <p className="text-lg leading-relaxed">
              This is the foundation recipe—the one you'll make a hundred times. Perfect for busy weeknights, lazy weekends, or anytime you need something delicious right now.
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
                    <span>8 <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline font-medium">flour tortillas</Link> (8-inch size)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>3 cups shredded cheese (Mexican blend, cheddar, or Monterey Jack)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 tablespoons butter or vegetable oil</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For Serving</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Sour cream</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Salsa or pico de gallo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Guacamole</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Fresh cilantro (optional)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Pickled jalapeños (optional)</span>
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Heat Your Skillet</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Place a large skillet or griddle over medium heat. Let it warm up for about 1-2 minutes. Medium heat is key—too high and the tortilla will burn before the cheese melts; too low and it won't get crispy. You can lightly brush the skillet with butter or oil, or wait to add it when you place the tortilla.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Add Cheese to Tortilla</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Place one tortilla flat in the heated skillet. Immediately sprinkle about 3/4 cup of shredded cheese evenly over half of the tortilla. Don't overfill—too much cheese will leak out when you fold it. Leave a small border around the edge. <em>Pro tip:</em> Use freshly shredded cheese rather than pre-shredded—it melts much better.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Fold and Press</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Using a spatula, carefully fold the empty half of the tortilla over the cheese-covered half, creating a half-moon shape. Press down gently but firmly with the spatula to seal the quesadilla and help the cheese start melting. The heat will begin crisping up the bottom while the cheese melts inside.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Cook Until Golden</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Cook for 2-3 minutes without moving it. You want the bottom to turn golden brown and crispy. Peek underneath with your spatula to check—it should be toasted and have those beautiful golden-brown spots. Once the bottom is crispy, carefully flip the quesadilla to the other side using a wide spatula.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Finish and Slice</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Cook the second side for another 2 minutes until golden brown and the cheese is fully melted. You should see a little cheese starting to ooze out at the edges—that's perfect! Remove from the skillet and place on a cutting board. Let it rest for about 30 seconds to 1 minute (this lets the cheese set slightly and makes cutting easier), then slice into 3-4 wedges using a sharp knife or pizza cutter.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Repeat and Serve</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Repeat the process with the remaining tortillas and cheese. You can keep finished quesadillas warm in a 200°F oven on a baking sheet while you cook the rest. Serve hot with sour cream, salsa, and guacamole on the side for dipping. Quesadillas are best enjoyed immediately while the cheese is still gooey and the tortillas are crispy!
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
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Use freshly shredded cheese for better melting</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Don't overfill—less is more with quesadillas</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Medium heat is crucial for crispy tortillas without burning</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Let quesadillas rest 30 seconds before cutting</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Use a pizza cutter for clean, easy slicing</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">Fresh tortillas</Link> make all the difference</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Delicious Variations</h3>
                <ul className="space-y-2">
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Chicken Quesadilla:</strong> Add shredded rotisserie chicken</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Veggie Quesadilla:</strong> Sautéed peppers, onions, mushrooms</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Black Bean:</strong> Add seasoned black beans and corn</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Jalapeño Popper:</strong> Cream cheese, cheddar, jalapeños</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Breakfast Quesadilla:</strong> Scrambled eggs and bacon</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Pizza Quesadilla:</strong> Mozzarella, pepperoni, marinara for dipping</li>
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
                What type of tortillas are best for quesadillas?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Flour tortillas are the traditional and best choice for quesadillas. Use 8-inch or 10-inch <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">flour tortillas</Link> for perfect results. They crisp up beautifully on the outside while staying soft enough to fold and bite into. Corn tortillas can be used but they're more fragile and don't crisp up the same way.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                What is the best cheese for quesadillas?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Mexican blend cheese is ideal—it typically contains Monterey Jack, cheddar, asadero, and queso quesadilla, all of which melt beautifully. You can also use straight cheddar, Monterey Jack, Oaxaca cheese, or even mozzarella. The key is using cheese that melts well. Always use freshly shredded cheese rather than pre-shredded, as pre-shredded cheese contains anti-caking agents that prevent smooth melting.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                How do I get crispy quesadillas without burning them?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                The secret is medium heat—not too high, not too low. Too high and the tortilla burns before the cheese melts; too low and it gets chewy instead of crispy. Use a thin layer of butter or oil in your skillet, press down gently with a spatula while cooking, and give each side 2-3 minutes. You want golden brown spots, not black. Be patient and resist the urge to crank up the heat!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can I add other ingredients to cheese quesadillas?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Absolutely! Quesadillas are incredibly versatile. Popular additions include cooked chicken, sautéed peppers and onions, black beans, corn, jalapeños, mushrooms, spinach, or cooked ground beef. Just remember: add fillings on top of the first layer of cheese before folding, and don't overfill. Too many ingredients make the quesadilla difficult to flip and the filling falls out when you eat it. When in doubt, less is more.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can I make quesadillas ahead of time?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Quesadillas are really best made fresh, but you can reheat them if needed. To reheat: place them in a 350°F oven for 5-7 minutes, or back in a skillet over medium heat for 1-2 minutes per side. The microwave will make them soggy, so avoid that. For meal prep, you can prep all your ingredients (shredded cheese, cooked fillings) ahead of time and assemble quesadillas fresh when ready to eat—they only take 5 minutes to cook!
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
                  Authentic breakfast tacos with eggs, bacon, and cheese
                </p>
              </div>
            </Link>
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
            <Link href="/guides/corn-vs-flour-tortillas" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Corn vs Flour Tortillas
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Learn the differences and when to use each type
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-rust-600 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make Perfect Quesadillas?
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
