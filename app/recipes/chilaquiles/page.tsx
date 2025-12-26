import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Authentic Chilaquiles Recipe (Red & Green)',
  description: 'Make authentic Mexican chilaquiles with crispy tortilla chips simmered in salsa, topped with eggs, cheese, and crema. The ultimate Mexican breakfast! Ready in 25 minutes.',
  keywords: 'chilaquiles, chilaquiles recipe, Mexican breakfast, chilaquiles rojos, chilaquiles verdes, tortilla chips breakfast, authentic chilaquiles, how to make chilaquiles',
  alternates: {
    canonical: 'https://lonestartortillas.com/recipes/chilaquiles',
  },
  openGraph: {
    title: 'Authentic Chilaquiles Recipe | Lonestar Tortillas',
    description: 'Crispy tortilla chips simmered in salsa with eggs, cheese, and crema. The ultimate Mexican breakfast!',
    type: 'article',
  },
};

export default function ChilaquilesRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Authentic Mexican Chilaquiles',
    description: 'Crispy corn tortilla chips simmered in red or green salsa, topped with fried eggs, queso fresco, and Mexican crema',
    image: 'https://lonestartortillas.com/images/recipes/chilaquiles.webp',
    prepTime: 'PT10M',
    cookTime: 'PT15M',
    totalTime: 'PT25M',
    recipeYield: '4 servings',
    recipeCategory: 'Breakfast',
    recipeCuisine: 'Mexican',
    keywords: 'chilaquiles, Mexican breakfast, tortilla chips, salsa',
    recipeIngredient: [
      '8 corn tortillas, cut into triangles',
      'Vegetable oil for frying',
      '2 cups red salsa (salsa roja) or green salsa (salsa verde)',
      '4 eggs',
      '1/2 cup crumbled queso fresco',
      '1/4 cup Mexican crema or sour cream',
      '1/4 white onion, thinly sliced',
      'Fresh cilantro for garnish',
      'Sliced radishes (optional)',
      'Refried beans for serving (optional)'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        text: 'Cut corn tortillas into triangles. Fry in batches in 1/2 inch of vegetable oil until golden and crispy. Drain on paper towels and season with salt.'
      },
      {
        '@type': 'HowToStep',
        text: 'Heat your salsa in a large skillet over medium heat until simmering.'
      },
      {
        '@type': 'HowToStep',
        text: 'Add the tortilla chips to the salsa, tossing to coat. Cook for 1-2 minutes - the chips should soften slightly but still have some crunch.'
      },
      {
        '@type': 'HowToStep',
        text: 'In a separate pan, fry eggs sunny-side up or to your preference.'
      },
      {
        '@type': 'HowToStep',
        text: 'Transfer chilaquiles to plates, top with fried eggs, drizzle with crema, and garnish with queso fresco, onion, cilantro, and radishes.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are chilaquiles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Chilaquiles are a traditional Mexican breakfast dish made from fried corn tortilla chips (totopos) simmered in red or green salsa until slightly softened. They\'re typically topped with eggs, cheese, crema, and onions. It\'s one of the best ways to use day-old tortillas.'
        }
      },
      {
        '@type': 'Question',
        name: 'Should chilaquiles be crunchy or soft?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Chilaquiles should have a balance - the edges should stay slightly crunchy while the chips absorb some salsa and soften in the center. This creates a perfect texture contrast. Don\'t let them simmer too long or they\'ll become completely soggy.'
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
              <span>Chilaquiles</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Authentic Mexican Chilaquiles Recipe
            </h1>
            <p className="text-xl text-cream-100">
              Crispy tortilla chips in salsa with eggs, cheese, and crema
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="bg-rust-600 px-4 py-2 rounded-full">25 minutes</span>
              <span className="bg-masa-600 px-4 py-2 rounded-full">Easy</span>
              <span className="bg-sunset-600 px-4 py-2 rounded-full">4 servings</span>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/recipes/chilaquiles.webp"
              alt="Mexican Chilaquiles"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Quick Answer Box */}
        <section className="max-w-4xl mx-auto px-6 py-4">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h2 className="text-xl font-bold text-charcoal-950 mb-3">Quick Answer</h2>
            <p className="text-lg text-charcoal-800">
              <strong>Chilaquiles</strong> are a traditional Mexican breakfast dish made from fried corn tortilla chips simmered briefly in red or green salsa. They're topped with fried eggs, queso fresco, crema, onions, and cilantro. The dish takes about 25 minutes to make and is the perfect way to use day-old tortillas. Choose <strong>chilaquiles rojos</strong> (red salsa) for a rich, tomato-chile flavor or <strong>chilaquiles verdes</strong> (green salsa) for a tangy, tomatillo taste.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="prose prose-lg max-w-none text-charcoal-800">
            <p className="text-xl leading-relaxed mb-6">
              Chilaquiles might just be the greatest breakfast dish ever invented. Imagine perfectly crispy <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortilla</Link> chips, quickly simmered in your favorite salsa until they're just softened but still have some crunch, then topped with a runny fried egg, tangy crema, and crumbled queso fresco. It's the ultimate hangover cure and the best way to start any morning.
            </p>
            <p className="text-lg leading-relaxed">
              This is a dish born from practicality—Mexican home cooks have been making chilaquiles for generations as a way to use up day-old tortillas. But somewhere along the way, it became so delicious that people started making fresh tortilla chips just for this purpose.
            </p>
          </div>
        </section>

        {/* Red vs Green */}
        <section className="max-w-4xl mx-auto px-6 py-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-rust-50 p-6 rounded-lg border-l-4 border-rust-500">
              <h3 className="text-xl font-bold text-charcoal-950 mb-3">Chilaquiles Rojos (Red)</h3>
              <p className="text-charcoal-700">Made with red salsa from tomatoes, dried chiles (guajillo, ancho), and spices. Rich, slightly sweet, and deeply savory. The most common style in Central Mexico.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-charcoal-950 mb-3">Chilaquiles Verdes (Green)</h3>
              <p className="text-charcoal-700">Made with green salsa from tomatillos, green chiles, and cilantro. Tangy, bright, and slightly acidic. Popular in Northern Mexico and perfect with chicken.</p>
            </div>
          </div>
        </section>

        {/* Ingredients */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Chilaquiles</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>8 <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline font-medium">corn tortillas</Link>, cut into triangles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>Vegetable oil for frying</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>2 cups red or green salsa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>Salt to taste</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For Topping</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>4 eggs (fried sunny-side up)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>1/2 cup crumbled queso fresco</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>1/4 cup Mexican crema or sour cream</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>1/4 white onion, thinly sliced</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>Fresh cilantro, chopped</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>Sliced radishes (optional)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BulletIcon className="inline-block text-rust-600" size={6} />
                    <span>Refried beans (for serving)</span>
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Make the Tortilla Chips</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Stack your corn tortillas and cut them into 6 triangles each (like cutting a pizza). Heat about 1/2 inch of vegetable oil in a large skillet over medium-high heat until shimmering. Fry the tortilla triangles in batches, turning once, until golden brown and crispy—about 2-3 minutes per batch. Transfer to a paper towel-lined plate and immediately season with salt.
                  </p>
                  <p className="text-charcoal-600 text-sm mt-2 italic">Pro tip: Use day-old tortillas for crispier chips, or let fresh tortillas dry out for 30 minutes before cutting.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Heat the Salsa</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Pour your chosen salsa (red or green) into a large, deep skillet or sauté pan. Heat over medium heat until the salsa is simmering and heated through, about 3-4 minutes. If using store-bought salsa, you can enhance it by adding a touch of cumin or simmering with a few extra chiles.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Combine Chips and Salsa</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Add the fried tortilla chips to the simmering salsa. Gently toss to coat all the chips evenly, being careful not to break them. Cook for just 1-2 minutes—the chips should absorb some salsa and soften slightly, but still have texture. Don't let them get completely soggy!
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Fry the Eggs</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    While the chips simmer, fry your eggs in a separate pan with a bit of butter or oil. Sunny-side up is traditional—the runny yolk becomes part of the sauce when you cut into it. You can also do over-easy or scrambled if you prefer.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Plate and Top</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Transfer the chilaquiles to plates or a serving platter. Top each portion with a fried egg. Drizzle generously with crema in a zigzag pattern. Scatter crumbled queso fresco over the top, then add the sliced onions, fresh cilantro, and radishes if using. Serve immediately with a side of refried beans.
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
                  <li><BulletIcon className="inline-block text-rust-600 mx-2" size={6} /> Use day-old tortillas for crispier chips</li>
                  <li><BulletIcon className="inline-block text-rust-600 mx-2" size={6} /> Don't overcook—some crunch is essential</li>
                  <li><BulletIcon className="inline-block text-rust-600 mx-2" size={6} /> Work quickly once chips hit the salsa</li>
                  <li><BulletIcon className="inline-block text-rust-600 mx-2" size={6} /> Use good quality salsa—it's the star</li>
                  <li><BulletIcon className="inline-block text-rust-600 mx-2" size={6} /> Serve immediately for best texture</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Variations</h3>
                <ul className="space-y-2">
                  <li><BulletIcon className="inline-block text-rust-600 mx-2" size={6} /> <strong>Con Pollo:</strong> Add shredded chicken for protein</li>
                  <li><BulletIcon className="inline-block text-rust-600 mx-2" size={6} /> <strong>Con Chorizo:</strong> Top with crispy Mexican chorizo</li>
                  <li><BulletIcon className="inline-block text-rust-600 mx-2" size={6} /> <strong>Baked:</strong> Bake chips at 350°F for 10 min before adding salsa</li>
                  <li><BulletIcon className="inline-block text-rust-600 mx-2" size={6} /> <strong>Cheesy:</strong> Add melted Oaxaca cheese on top</li>
                  <li><BulletIcon className="inline-block text-rust-600 mx-2" size={6} /> <strong>Vegetarian:</strong> Skip eggs, add black beans</li>
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
                What are chilaquiles?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Chilaquiles are a traditional Mexican breakfast dish made from fried <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortilla</Link> chips (called totopos) simmered briefly in red or green salsa. They're topped with eggs, cheese, crema, onions, and cilantro. It's one of the most beloved Mexican breakfast dishes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Should chilaquiles be crunchy or soft?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                The perfect chilaquiles should have a balance of textures—the edges and some chips should stay slightly crunchy while the centers absorb salsa and soften. This texture contrast is what makes them special. Don't let them simmer too long or they'll become completely soggy.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can I use store-bought tortilla chips?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Yes, but homemade chips are better! Store-bought chips work in a pinch—look for thick-cut restaurant-style chips rather than thin, crispy ones. The thicker chips hold up better to the salsa. Just avoid flavored chips.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                What's the difference between chilaquiles and nachos?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                While both use tortilla chips, chilaquiles are simmered in salsa which softens them and infuses them with flavor. Nachos are baked dry with toppings added on top. Chilaquiles are a breakfast dish; nachos are a snack or appetizer. Different dishes, different purposes!
              </p>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <section className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-xl my-8">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">More Mexican Breakfast Recipes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/recipes/huevos-rancheros" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Huevos Rancheros
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Fried eggs on crispy tortillas with ranchero sauce
                </p>
              </div>
            </Link>
            <Link href="/recipes/breakfast-tacos" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Breakfast Tacos
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Classic Texas-style breakfast tacos
                </p>
              </div>
            </Link>
            <Link href="/products/corn-tortillas" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Shop Corn Tortillas
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Get authentic H-E-B corn tortillas delivered
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-rust-600 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make Authentic Chilaquiles?
            </h2>
            <p className="text-xl mb-8 text-cream-100">
              Get authentic Texas corn tortillas delivered to your door
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-cream-50 hover:bg-cream-100 text-charcoal-950 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Shop Tortillas
              </Link>
              <Link
                href="/products/corn-tortillas"
                className="bg-transparent border-2 border-cream-50 hover:bg-cream-50 hover:text-rust-600 text-cream-50 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                View Corn Tortillas
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
