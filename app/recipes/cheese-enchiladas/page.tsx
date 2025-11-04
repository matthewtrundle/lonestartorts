import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChefIcon, BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Classic Cheese Enchiladas Recipe',
  description: 'Learn how to make authentic cheese enchiladas with homemade red sauce. Easy step-by-step recipe for classic Mexican enchiladas rojas ready in 45 minutes.',
  keywords: 'cheese enchiladas recipe, enchiladas rojas, red sauce enchiladas, how to make enchiladas, easy enchiladas, mexican enchiladas',
  openGraph: {
    title: 'Classic Cheese Enchiladas Recipe | Lonestar Tortillas',
    description: 'Authentic cheese enchiladas with homemade red sauce. Better than any restaurant!',
    type: 'article',
  },
};

export default function CheeseEnchiladasRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Classic Cheese Enchiladas',
    description: 'Traditional Mexican cheese enchiladas with homemade red sauce, rolled in corn tortillas and baked until bubbly',
    prepTime: 'PT20M',
    cookTime: 'PT25M',
    totalTime: 'PT45M',
    recipeYield: '6 servings',
    recipeCategory: 'Dinner',
    recipeCuisine: 'Mexican',
    keywords: 'cheese enchiladas, enchiladas rojas, red enchiladas, baked enchiladas',
    recipeIngredient: [
      '12 corn tortillas (6-inch)',
      '3 cups shredded cheese (Mexican blend, cheddar, or Monterey Jack)',
      '2 tablespoons vegetable oil',
      '2 tablespoons all-purpose flour',
      '3 tablespoons chili powder',
      '1 teaspoon ground cumin',
      '1/2 teaspoon garlic powder',
      '1/4 teaspoon dried oregano',
      '1/4 teaspoon salt',
      '2 cups chicken or vegetable broth',
      '1 can (8 oz) tomato sauce',
      '1 small onion, diced',
      'Optional toppings: sour cream, cilantro, diced onion, sliced jalapeños'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        text: 'Preheat oven to 375°F. Lightly grease a 9x13-inch baking dish.'
      },
      {
        '@type': 'HowToStep',
        text: 'Make the enchilada sauce: Heat oil in a saucepan over medium heat. Whisk in flour and cook for 1 minute. Add chili powder, cumin, garlic powder, oregano, and salt. Whisk constantly for 30 seconds until fragrant.'
      },
      {
        '@type': 'HowToStep',
        text: 'Gradually whisk in broth and tomato sauce. Bring to a simmer and cook for 8-10 minutes, stirring occasionally, until thickened to gravy consistency. Taste and adjust seasoning.'
      },
      {
        '@type': 'HowToStep',
        text: 'Soften tortillas: Wrap tortillas in damp paper towels and microwave for 45-60 seconds until warm and pliable. Or dip each tortilla briefly in the warm enchilada sauce to soften.'
      },
      {
        '@type': 'HowToStep',
        text: 'Spread 1/2 cup enchilada sauce in the bottom of the prepared baking dish.'
      },
      {
        '@type': 'HowToStep',
        text: 'Assemble enchiladas: Place about 1/4 cup shredded cheese and 1 tablespoon diced onion down the center of each tortilla. Roll tightly and place seam-side down in the baking dish. Repeat with all tortillas, arranging snugly in a single layer.'
      },
      {
        '@type': 'HowToStep',
        text: 'Pour remaining enchilada sauce over the rolled tortillas, covering completely. Sprinkle remaining cheese over the top.'
      },
      {
        '@type': 'HowToStep',
        text: 'Bake uncovered for 20-25 minutes until cheese is melted, bubbly, and starting to brown. Let rest for 5 minutes before serving. Garnish with cilantro, sour cream, and additional diced onion.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do you use corn or flour tortillas for enchiladas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Authentic Mexican enchiladas traditionally use corn tortillas. Corn tortillas hold their structure better when soaked in sauce and baked, and their flavor complements the enchilada sauce perfectly. Flour tortillas can work but tend to get mushy. Always use corn tortillas (6-inch) for best results and authentic taste.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do you keep enchiladas from getting soggy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Key tips: 1) Don\'t oversoak tortillas—just warm them enough to be pliable. 2) Roll them tightly so less sauce seeps inside. 3) Place seam-side down so they don\'t unroll. 4) Don\'t use too much sauce—just enough to coat. 5) Bake uncovered so steam can escape. 6) Use day-old tortillas, which are sturdier than fresh.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I make enchiladas ahead of time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Assemble enchiladas completely, cover tightly with foil, and refrigerate for up to 24 hours before baking. Add 5-10 minutes to baking time if baking from cold. You can also freeze assembled unbaked enchiladas for up to 3 months. Thaw overnight in fridge before baking, or bake from frozen adding 15-20 minutes.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the difference between enchiladas and burritos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Enchiladas are rolled corn tortillas filled with cheese, meat, or beans, covered in sauce, and baked in the oven. They\'re served smothered in sauce with cheese on top. Burritos use large flour tortillas, are filled with more ingredients (rice, beans, meat, etc.), and are NOT covered in sauce or baked—they\'re served as-is, wrapped and portable.'
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
              <span>Cheese Enchiladas</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Classic Cheese Enchiladas Recipe
            </h1>
            <p className="text-xl text-cream-100">
              Authentic enchiladas rojas with homemade red sauce
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="bg-rust-600 px-4 py-2 rounded-full">⏱ 45 minutes</span>
              <span className="bg-masa-600 px-4 py-2 rounded-full"><ChefIcon className="inline-block text-charcoal-700" size={20} /> Medium</span>
              <span className="bg-sunset-600 px-4 py-2 rounded-full">🍽️ 6 servings</span>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/recipes/cheese-enchiladas.webp"
              alt="Cheese enchiladas with red sauce and melted cheese"
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
              Enchiladas are Mexican comfort food at its finest. We're talking about corn tortillas stuffed with cheese (or your filling of choice), rolled up tight, smothered in rich red enchilada sauce, topped with even more cheese, and baked until everything is bubbling and golden. It's the kind of dish that makes your kitchen smell incredible and has everyone hovering around the oven asking "Is it ready yet?"
            </p>
            <p className="text-lg leading-relaxed mb-4">
              The word "enchilada" comes from the Spanish verb "enchilar," meaning "to add chili pepper to." That's exactly what enchiladas are about—tortillas enhanced with flavorful chili sauce. This recipe features enchiladas rojas (red enchiladas), the most classic version made with a smooth red chili sauce. While there are endless variations—green sauce, mole, creamy sauces—this traditional red enchilada is the perfect place to start your enchilada journey.
            </p>
            <p className="text-lg leading-relaxed">
              What makes these enchiladas special is the homemade sauce. Sure, you could use canned enchilada sauce, but making it from scratch takes just 15 minutes and tastes infinitely better. It's a simple roux-based sauce loaded with chili powder, cumin, and garlic that comes together quickly and has so much more depth than anything from a can. Once you taste homemade, you'll never go back. Let's make some magic!
            </p>
          </div>
        </section>

        {/* Ingredients */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Enchilada Sauce</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 tablespoons vegetable oil</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 tablespoons all-purpose flour</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>3 tablespoons chili powder (use good quality!)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 teaspoon ground cumin</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/2 teaspoon garlic powder</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/4 teaspoon dried oregano</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/4 teaspoon salt (more to taste)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 cups chicken broth or vegetable broth</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 can (8 oz) tomato sauce</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Enchiladas</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>12 <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline font-medium">corn tortillas</Link> (6-inch)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>3 cups shredded cheese, divided (Mexican blend, cheddar, or Monterey Jack)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 small onion, finely diced</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Cooking spray or oil for the baking dish</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-charcoal-950 mt-6 mb-3">Optional Toppings</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Sour cream or Mexican crema</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Fresh cilantro, chopped</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Diced white onion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Sliced jalapeños</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Sliced avocado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Crumbled cotija cheese</span>
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Prep and Preheat</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Preheat your oven to 375°F. Lightly grease a 9x13-inch baking dish with cooking spray or a little oil—this prevents sticking and makes cleanup easier. Have your cheese shredded and onion diced so everything's ready to go. Organization is key when assembling enchiladas!
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Make the Enchilada Sauce</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    This is easier than you think! Heat the vegetable oil in a medium saucepan over medium heat. Once hot, whisk in the flour to create a roux. Cook for about 1 minute, whisking constantly—you want it blonde, not brown. Now add all your spices: chili powder, cumin, garlic powder, oregano, and salt. Whisk constantly for about 30 seconds. The spices will bloom in the hot oil and smell amazing. This step is crucial for developing deep flavor, so don't skip it or rush it!
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Finish the Sauce</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Gradually whisk in the chicken broth and tomato sauce. Start slow to avoid lumps, then whisk it all in. Bring the mixture to a simmer and let it cook for 8-10 minutes, stirring occasionally, until it thickens to a gravy-like consistency—it should coat the back of a spoon nicely. Taste and adjust seasoning. It should be flavorful and slightly spicy. If it's too thick, thin with a bit more broth. If too thin, simmer longer. Set aside about 1.5 cups for topping; you'll use the rest for dipping tortillas or spreading in the pan.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Soften the Tortillas</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">Corn tortillas</Link> need to be softened or they'll crack when you roll them. Two methods: (1) Wrap all the tortillas in damp paper towels and microwave for 45-60 seconds until warm and pliable. Or (2) my preferred method: quickly dip each tortilla in the warm enchilada sauce for a few seconds per side. This softens them AND adds flavor. Work quickly so they don't tear. Keep them warm by covering with a towel.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Prep the Baking Dish</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Spread about 1/2 cup of the enchilada sauce evenly across the bottom of your prepared baking dish. This thin layer of sauce prevents the enchiladas from sticking to the pan and adds flavor to the bottom of each enchilada. Don't skip this step—it makes serving so much easier!
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Roll the Enchiladas</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Now for the fun part! Take a softened tortilla and place about 1/4 cup of shredded cheese down the center in a line. Add about 1 tablespoon of diced onion on top of the cheese. Roll the tortilla tightly around the filling—not too tight or it'll tear, but snug enough that it holds together. Place it seam-side down in the baking dish. Repeat with remaining tortillas, arranging them snugly side-by-side in the dish. Pack them close together so they support each other and don't unroll during baking. You should fit all 12 enchiladas in a 9x13-inch dish.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full">7</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Sauce and Cheese</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Pour the remaining enchilada sauce evenly over all the rolled enchiladas. Use a spoon or spatula to spread it around so every enchilada is covered—you want them swimming in that delicious sauce. Don't worry about being too precise; it'll all melt together beautifully. Now sprinkle the remaining shredded cheese generously over the top. Don't be shy with the cheese—this is enchiladas, after all! The cheese on top will get golden and bubbly in the oven.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rust-600">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-rust-100 text-rust-600 font-bold text-xl rounded-full">8</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Bake to Perfection</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Bake uncovered in your preheated 375°F oven for 20-25 minutes. You're looking for the cheese on top to be melted, bubbly, and starting to turn golden brown in spots. The sauce around the edges should be bubbling. If the cheese isn't browning after 25 minutes, you can briefly broil for 1-2 minutes—but watch closely so it doesn't burn! Let the enchiladas rest for 5 minutes after coming out of the oven. This lets the sauce thicken slightly and makes them easier to serve. Garnish with your favorite toppings: sour cream, cilantro, diced onion, and maybe some sliced jalapeños if you like heat. Serve hot and enjoy the cheesy, saucy goodness!
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
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Day-old tortillas work better—they're sturdier and less likely to tear</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Roll enchiladas tightly and place seam-side down to prevent unrolling</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Don't oversoak tortillas in sauce—just warm them enough to be pliable</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Pack enchiladas close together in the pan for mutual support</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Make sauce ahead—it keeps for 5 days in the fridge or 3 months frozen</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Use good quality chili powder—it makes a huge difference</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Let enchiladas rest 5 minutes before serving for easier cutting</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Filling Variations</h3>
                <ul className="space-y-2">
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Chicken:</strong> Add shredded rotisserie chicken with the cheese</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Beef:</strong> Use seasoned ground beef or shredded beef</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Bean:</strong> Refried beans or black beans for vegetarian</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Spinach:</strong> Sautéed spinach with cheese</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Mixed:</strong> Combine cheese with chicken, beans, or vegetables</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Enchiladas Verdes:</strong> Use green salsa instead of red sauce</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Sour Cream:</strong> Mix sour cream into cheese filling for creaminess</li>
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
                Do you use corn or flour tortillas for enchiladas?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Authentic Mexican enchiladas always use <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortillas</Link>, typically 6 inches in diameter. Corn tortillas are traditional for several good reasons: they hold their structure better when soaked in sauce and baked, they don't get as mushy as flour tortillas, and their earthy corn flavor complements enchilada sauce perfectly. Flour tortillas can work in a pinch, but they tend to get soggy and lose their texture. They're also not traditional. For authentic, delicious enchiladas that hold together beautifully, always use corn tortillas. Just make sure to soften them before rolling so they don't crack!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                How do you keep enchiladas from getting soggy?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Several key techniques prevent soggy enchiladas: (1) Don't oversoak the tortillas—just warm them enough to make them pliable, not waterlogged. Quick dip in sauce or microwave in damp towels. (2) Roll them tightly so less sauce seeps inside the roll. (3) Place seam-side down so they don't unroll and absorb too much sauce. (4) Don't drown them in sauce—use just enough to coat them. (5) Bake uncovered so steam can escape instead of making them soggy. (6) Use day-old tortillas if possible—they're sturdier than fresh ones. (7) Let them rest 5 minutes after baking to firm up. Follow these tips and your enchiladas will have perfect texture every time!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can I make enchiladas ahead of time?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Yes! Enchiladas are perfect make-ahead food. Assemble them completely (sauce, cheese, everything), cover the baking dish tightly with aluminum foil, and refrigerate for up to 24 hours before baking. When ready to bake, you can bake straight from the fridge—just add 5-10 minutes to the baking time since they're starting cold. For longer storage, you can freeze assembled unbaked enchiladas for up to 3 months. Wrap the baking dish tightly in plastic wrap, then aluminum foil. To bake from frozen: thaw overnight in the refrigerator first, then bake as directed. Or bake directly from frozen, adding 15-20 minutes to the baking time and covering with foil for the first half of baking. The sauce and filling also freeze separately!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                What is the difference between enchiladas and burritos?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                They're completely different dishes! Enchiladas use small corn tortillas (6 inches), are rolled around a simple filling (usually just cheese, meat, or beans), covered completely in sauce, topped with cheese, and baked in the oven. They're served hot, smothered in sauce, on a plate with a fork and knife. Burritos use large flour tortillas (10-12 inches), are stuffed with many ingredients (rice, beans, meat, cheese, sour cream, salsa, lettuce, etc.), and are NOT covered in sauce or baked—they're wrapped up and served as-is, meant to be eaten with your hands like a wrap. Burritos are portable; enchiladas are not. Think of it this way: burritos are lunch on-the-go, enchiladas are a sit-down dinner!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can I use canned enchilada sauce?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                You can, but I really recommend making it from scratch—it's so much better and takes only 15 minutes! Canned enchilada sauce is convenient but often tastes bland, one-dimensional, or overly salty. Homemade sauce has deeper flavor, better spice balance, and fresher taste. Plus, you control the heat level and seasoning. That said, if you're in a pinch, canned sauce works. Buy two 10-ounce cans (you'll need about 2.5 cups total). Look for brands with simple ingredients and good reviews. To improve canned sauce: simmer it for a few minutes with extra cumin, a pinch of oregano, and a squeeze of lime juice. Add a splash of chicken broth if it's too thick. It won't be as good as homemade, but it'll be better than straight from the can!
              </p>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <section className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-xl my-8">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">More Tortilla Recipes & Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
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
            <Link href="/recipes/bean-and-veggie-tacos" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Bean & Veggie Tacos
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Hearty vegetarian tacos with roasted vegetables
                </p>
              </div>
            </Link>
            <Link href="/guides/best-tortillas-for-every-dish" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Best Tortillas for Every Dish
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Choose the perfect tortilla for any recipe
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-rust-600 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make Cheese Enchiladas?
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
