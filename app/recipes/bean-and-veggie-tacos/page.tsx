import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { TacoIcon, ChefIcon, BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Vegetarian Bean & Veggie Tacos Recipe | Easy Meatless Tacos | Lonestar Tortillas',
  description: 'Delicious vegetarian tacos with seasoned black beans and roasted vegetables. Easy, healthy, and packed with flavor. Perfect meatless Mexican meal in 30 minutes.',
  keywords: 'vegetarian tacos, bean tacos, veggie tacos, meatless tacos, black bean tacos recipe, vegetarian mexican food, easy vegetarian dinner',
  openGraph: {
    title: 'Vegetarian Bean & Veggie Tacos Recipe | Lonestar Tortillas',
    description: 'Flavorful vegetarian tacos with seasoned beans and roasted veggies. Healthy, satisfying, and ready in 30 minutes!',
    type: 'article',
  },
};

export default function BeanVeggieTacosRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Bean & Veggie Tacos',
    description: 'Hearty vegetarian tacos with seasoned black beans, roasted vegetables, and fresh toppings',
    prepTime: 'PT15M',
    cookTime: 'PT15M',
    totalTime: 'PT30M',
    recipeYield: '4 servings',
    recipeCategory: 'Dinner',
    recipeCuisine: 'Mexican',
    keywords: 'vegetarian tacos, black bean tacos, veggie tacos, meatless dinner',
    recipeIngredient: [
      '2 cans (15 oz each) black beans, drained and rinsed',
      '1 tablespoon olive oil',
      '1 small onion, diced',
      '3 garlic cloves, minced',
      '1 tablespoon cumin',
      '1 tablespoon chili powder',
      '1 teaspoon smoked paprika',
      '1/2 teaspoon oregano',
      '1 teaspoon salt',
      '1/2 teaspoon black pepper',
      '1/2 cup vegetable broth or water',
      '1 tablespoon lime juice',
      '1 red bell pepper, sliced',
      '1 yellow bell pepper, sliced',
      '1 zucchini, sliced',
      '1 red onion, sliced',
      '2 tablespoons olive oil',
      '1 teaspoon cumin',
      '1 teaspoon chili powder',
      'Salt and pepper to taste',
      '12 corn tortillas (6-inch)',
      'Toppings: avocado, pico de gallo, cilantro, lime, crema, cotija cheese, lettuce'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        text: 'Preheat oven to 425°F. Toss bell peppers, zucchini, and red onion with 2 tablespoons olive oil, 1 teaspoon cumin, 1 teaspoon chili powder, salt, and pepper. Spread on a baking sheet and roast for 15-20 minutes until charred and tender.'
      },
      {
        '@type': 'HowToStep',
        text: 'While vegetables roast, heat 1 tablespoon olive oil in a large skillet over medium heat. Add diced onion and cook until softened, about 5 minutes. Add garlic and cook for 1 minute until fragrant.'
      },
      {
        '@type': 'HowToStep',
        text: 'Add black beans, cumin, chili powder, smoked paprika, oregano, salt, and pepper to the skillet. Stir to combine.'
      },
      {
        '@type': 'HowToStep',
        text: 'Add vegetable broth and bring to a simmer. Using a potato masher or fork, mash about half the beans to create a creamy texture while leaving some whole. Simmer for 5-7 minutes until thickened.'
      },
      {
        '@type': 'HowToStep',
        text: 'Remove from heat and stir in lime juice. Taste and adjust seasoning with salt, pepper, or more cumin if needed.'
      },
      {
        '@type': 'HowToStep',
        text: 'Warm corn tortillas on a dry skillet for 20-30 seconds per side until pliable and slightly charred.'
      },
      {
        '@type': 'HowToStep',
        text: 'Assemble tacos: double-stack tortillas, add seasoned black beans, top with roasted vegetables, and add your favorite toppings. Serve immediately with lime wedges.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are bean and veggie tacos healthy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! These tacos are very healthy. Black beans provide protein, fiber, and nutrients. The vegetables add vitamins and antioxidants. Using corn tortillas keeps them naturally gluten-free. They\'re lower in saturated fat than meat tacos and high in plant-based nutrition. A complete, balanced meatless meal.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I use pinto beans instead of black beans?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! Pinto beans work perfectly in this recipe. They have similar texture and cook the same way. You can also use kidney beans, white beans, or chickpeas. Even better: use a mix of beans for variety in texture and flavor. Refried beans also work great for a creamier taco.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do you make vegetarian tacos taste like meat tacos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The key is bold seasoning and proper textures. Use plenty of cumin, chili powder, and smoked paprika for depth. Mashing some of the beans creates a meaty texture. Roasting vegetables adds char and caramelization. Add umami with soy sauce or nutritional yeast. Top with creamy avocado and sharp cheese for richness and satisfaction.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I make these tacos vegan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! These tacos are naturally vegan if you skip the cheese and use vegan crema or cashew cream instead of sour cream. The base recipe with beans, vegetables, and corn tortillas is already vegan. Just choose vegan toppings: avocado, pico de gallo, cilantro, lime, and vegan cheese or cashew cream.'
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
              <span>Bean & Veggie Tacos</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Vegetarian Bean & Veggie Tacos Recipe
            </h1>
            <p className="text-xl text-cream-100">
              Hearty, flavorful meatless tacos everyone will love
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="bg-rust-600 px-4 py-2 rounded-full">⏱ 30 minutes</span>
              <span className="bg-masa-600 px-4 py-2 rounded-full"><ChefIcon className="inline-block text-charcoal-700" size={20} /> Easy</span>
              <span className="bg-sunset-600 px-4 py-2 rounded-full"><TacoIcon className="inline-block text-sunset-600" size={20} /> 4 servings</span>
              <span className="bg-lime-600 px-4 py-2 rounded-full">🌱 Vegetarian</span>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/recipes/bean-veggie-tacos.webp"
              alt="Vegetarian bean and veggie tacos with roasted vegetables"
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
              Who says tacos need meat to be delicious? These vegetarian bean and veggie tacos prove that plant-based can be just as satisfying, flavorful, and craveable as any carnitas or carne asada. We're talking about perfectly seasoned black beans with just the right amount of creaminess, roasted vegetables with caramelized edges, and all the fresh toppings that make tacos irresistible—wrapped in warm corn tortillas. Even meat-lovers go back for seconds.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              The secret to amazing vegetarian tacos isn't trying to replicate meat—it's embracing what beans and vegetables do best. Black beans, when properly seasoned and partially mashed, create a rich, creamy filling with incredible texture. Roasted bell peppers, zucchini, and onions bring smoky sweetness and that satisfying char. Together with bold spices, fresh toppings, and a squeeze of lime, you get complex flavors and varied textures that keep every bite interesting.
            </p>
            <p className="text-lg leading-relaxed">
              These tacos are also incredibly versatile and forgiving. You can roast whatever vegetables you have on hand, use any type of beans you like, and customize the toppings endlessly. They're naturally gluten-free, can easily be made vegan, and they're budget-friendly too. Plus, they come together in about 30 minutes, making them perfect for weeknight dinners when you want something healthy, delicious, and satisfying without spending hours in the kitchen.
            </p>
          </div>
        </section>

        {/* Ingredients */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Seasoned Beans</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 cans (15 oz each) black beans, drained and rinsed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 tablespoon olive oil</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 small onion, finely diced</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>3 garlic cloves, minced</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 tablespoon ground cumin</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 tablespoon chili powder</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 teaspoon smoked paprika</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/2 teaspoon dried oregano</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 teaspoon salt</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/2 teaspoon black pepper</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/2 cup vegetable broth or water</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 tablespoon lime juice</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Roasted Vegetables</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 red bell pepper, cut into strips</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 yellow or orange bell pepper, cut into strips</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 medium zucchini, sliced into half-moons</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 red onion, sliced into wedges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 tablespoons olive oil</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 teaspoon ground cumin</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 teaspoon chili powder</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Salt and pepper to taste</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-charcoal-950 mt-6 mb-3">For Serving</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>12-16 <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline font-medium">corn tortillas</Link> (6-inch)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Avocado slices or guacamole</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Pico de gallo or salsa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Fresh cilantro, chopped</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Lime wedges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Sour cream or Mexican crema</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Optional: crumbled cotija or feta cheese, shredded lettuce, pickled jalapeños</span>
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Roast the Vegetables</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Preheat your oven to 425°F—you want it nice and hot for proper roasting. While it heats, prep your vegetables: cut bell peppers into strips, slice zucchini into half-moons about 1/4-inch thick, and cut the red onion into wedges. In a large bowl, toss all the vegetables with 2 tablespoons of olive oil, 1 teaspoon cumin, 1 teaspoon chili powder, and a good pinch of salt and pepper. Make sure every piece is coated. Spread them out in a single layer on a large baking sheet—don't overcrowd or they'll steam instead of roast. Roast for 15-20 minutes, flipping halfway through, until the vegetables are tender with charred, caramelized edges. Those charred bits are flavor gold!
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Start the Beans</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    While the vegetables roast, make the beans. Heat 1 tablespoon of olive oil in a large skillet over medium heat. Add the diced onion and cook, stirring occasionally, for about 5 minutes until it's soft and translucent. Don't rush this—cooked onions add sweetness and depth. Add the minced garlic and cook for 1 more minute until fragrant. Be careful not to burn the garlic; if your pan is too hot, lower the heat.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Season and Simmer</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Add the drained and rinsed black beans to the skillet along with the cumin, chili powder, smoked paprika, oregano, salt, and black pepper. Stir everything together so the beans are coated in all those aromatic spices. The spices will bloom in the oil, releasing their flavors—your kitchen should smell amazing right now. Pour in the vegetable broth (or water if that's what you have) and bring everything to a simmer. Turn the heat down to medium-low and let it bubble gently.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Mash for Creaminess</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Here's the trick to great bean tacos: texture variation. Using a potato masher or the back of a fork, mash about half of the beans right in the pan. This creates a creamy, almost refried texture that holds the taco together, while the whole beans add texture and bite. Don't mash them all—you want that mix. Let the beans simmer for 5-7 minutes, stirring occasionally, until the mixture thickens up nicely. If it gets too thick, add a splash more broth. If it's too thin, let it cook a bit longer.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Finish with Lime</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Remove the beans from heat and stir in the fresh lime juice. This brightens everything up and cuts through the richness of the beans. Taste and adjust the seasoning—add more salt if needed, another squeeze of lime for brightness, or extra cumin for earthiness. The beans should be flavorful enough to be delicious on their own. If they taste bland, they'll taste bland in the taco, so season with confidence!
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Warm Your Tortillas</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Heat your <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortillas</Link> on a dry skillet or comal over medium-high heat, about 20-30 seconds per side. You want them warm, pliable, and ideally with a few charred spots for extra flavor. Don't skip this step—cold tortillas will crack and break when you fold them. Stack the warmed tortillas and wrap them in a clean kitchen towel to keep them soft and warm while you finish prepping.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Build Your Tacos</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Time to assemble! Double-stack your tortillas (two per taco) for structural integrity—beans and veggies can get heavy. Spoon a generous amount of the seasoned black beans onto each taco. Top with the roasted vegetables—pile them high! Add your favorite toppings: creamy avocado slices (or guacamole), a spoonful of fresh pico de gallo, chopped cilantro, and a dollop of sour cream or crema. A sprinkle of crumbled cotija or feta adds nice saltiness. Don't forget to serve with lime wedges on the side—a final squeeze of lime right before eating brings everything together. Dig in while they're hot!
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
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Mash only half the beans for best texture contrast</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Don't overcrowd the roasting pan—gives better caramelization</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Season beans boldly—they need more flavor than meat</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Fresh lime juice at the end is essential for brightness</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Make beans ahead—they're even better the next day</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Double-stack tortillas to prevent breaking</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Roast vegetables until charred for maximum flavor</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Variations</h3>
                <ul className="space-y-2">
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Different Beans:</strong> Try pinto, kidney, or chickpeas</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Sweet Potato:</strong> Add roasted sweet potato cubes</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Corn:</strong> Toss in fresh or frozen corn kernels with veggies</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Spicy:</strong> Add jalapeños or chipotle in adobo to beans</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Mushrooms:</strong> Add sliced mushrooms for meatier texture</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Fajita Style:</strong> Use <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">flour tortillas</Link> and skip mashing beans</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Vegan:</strong> Skip cheese, use cashew cream instead of sour cream</li>
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
                Are bean and veggie tacos healthy?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Yes, these tacos are incredibly healthy! Black beans are nutritional powerhouses—loaded with protein (about 15g per cup), fiber (15g per cup), iron, magnesium, and folate. They're also low in fat and calories. The roasted vegetables provide vitamins A and C, antioxidants, and more fiber. Corn tortillas are naturally gluten-free and lower in calories than flour tortillas. Together, you get a complete, balanced meal that's naturally low in saturated fat, high in plant-based nutrition, and will keep you full for hours. Even better: skip the cheese and sour cream for a lighter version, or use Greek yogurt instead of sour cream for added protein. These tacos prove that healthy eating doesn't mean sacrificing flavor!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can I use pinto beans instead of black beans?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Absolutely! Pinto beans work just as well as black beans in this recipe—they have similar texture and cook the same way. In fact, pinto beans are traditional in many Mexican dishes. You can also try kidney beans (heartier and firmer), white beans (creamier and milder), or even chickpeas for a different texture and flavor. For extra convenience, use refried beans (canned or homemade) straight from the can—just heat them up with some spices and you're done. Or get creative and use a mix of different beans for variety in both texture and appearance. The cooking method and seasonings work with any beans you choose!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                How do you make vegetarian tacos taste meaty and satisfying?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                The secret is layers of flavor and varied textures. First: bold, generous seasoning—use plenty of cumin, smoked paprika, and chili powder. These spices add depth and that "umami" savory quality. Second: proper cooking technique. Roasting vegetables until they're charred creates caramelization that adds sweetness and complexity. Mashing some beans while leaving others whole creates a texture contrast that mimics ground meat. Third: richness from fats—avocado, cheese, sour cream add satisfaction. Fourth: umami boosters like a splash of soy sauce in the beans or nutritional yeast for cheesy flavor. Finally: don't skip the toppings! Creamy, crunchy, tangy elements create a complete sensory experience. Even meat-lovers won't miss the meat!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can I make these tacos vegan?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Yes! These tacos are super easy to make vegan. The base recipe—beans, roasted vegetables, and corn tortillas—is already completely plant-based. Just choose vegan toppings: skip the cheese and sour cream, or use vegan alternatives. Vegan sour cream or cashew cream work beautifully (make cashew cream by blending soaked cashews with lime juice, garlic, and water until smooth). Load up on avocado or guacamole for creaminess. Nutritional yeast sprinkled on top adds a cheesy, umami flavor. The tacos are still incredibly flavorful and satisfying without any animal products. Many people actually prefer the lighter, fresher taste of the vegan version!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can I meal prep these tacos?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Yes, these are excellent for meal prep! Make the seasoned beans and roasted vegetables ahead and store them separately in airtight containers in the refrigerator for up to 4 days. When you're ready to eat, reheat the beans in a skillet with a splash of water and warm the vegetables in the oven or skillet. Prep your toppings ahead too—dice onions and tomatoes, chop cilantro, slice avocado (toss with lime to prevent browning). Store each component separately for best results. Assemble the tacos fresh when you're ready to eat—this keeps the tortillas from getting soggy. The beans actually taste even better the next day as the flavors meld. You can also freeze the cooked beans for up to 3 months. Warm tortillas fresh each time for best texture.
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
            <Link href="/recipes/breakfast-tacos" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Texas Breakfast Tacos
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Quick morning tacos with eggs and cheese
                </p>
              </div>
            </Link>
            <Link href="/guides/tortilla-nutrition" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Tortilla Nutrition Guide
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Complete nutritional breakdown and health benefits
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-rust-600 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make Bean & Veggie Tacos?
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
