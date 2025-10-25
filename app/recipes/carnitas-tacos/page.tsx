import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { TacoIcon, ChefIcon, BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Slow-Cooked Carnitas Tacos Recipe | Authentic Mexican | Lonestar Tortillas',
  description: 'Authentic Mexican carnitas recipe with tender, slow-cooked pork. Learn how to make restaurant-quality carnitas tacos at home with simple ingredients and traditional techniques.',
  keywords: 'carnitas recipe, authentic carnitas, slow cooked pork tacos, mexican carnitas, pork tacos recipe, how to make carnitas',
  openGraph: {
    title: 'Slow-Cooked Carnitas Tacos Recipe | Lonestar Tortillas',
    description: 'Authentic carnitas with crispy edges and tender meat. Restaurant-quality Mexican tacos at home!',
    type: 'article',
  },
};

export default function CarnitasTacosRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Slow-Cooked Carnitas Tacos',
    description: 'Authentic Mexican carnitas with tender, juicy pork and crispy edges, served in warm corn tortillas',
    prepTime: 'PT15M',
    cookTime: 'PT4H',
    totalTime: 'PT4H15M',
    recipeYield: '8 servings',
    recipeCategory: 'Dinner',
    recipeCuisine: 'Mexican',
    keywords: 'carnitas, pork tacos, slow cooked pork, mexican street tacos',
    recipeIngredient: [
      '3-4 lbs pork shoulder (pork butt), cut into 2-inch chunks',
      '1 large onion, quartered',
      '6 garlic cloves, smashed',
      '2 oranges (juice and zest)',
      '1 lime (juice)',
      '2 bay leaves',
      '1 tablespoon cumin',
      '1 tablespoon oregano',
      '1 teaspoon cinnamon',
      '2 teaspoons salt',
      '1 teaspoon black pepper',
      '1/4 cup lard or vegetable oil',
      '2 cups chicken or pork stock',
      '16 corn tortillas',
      'Fresh cilantro, diced onion, lime wedges, salsa for serving'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        text: 'Season the pork chunks generously with salt, pepper, cumin, oregano, and cinnamon. Let sit for 15 minutes.'
      },
      {
        '@type': 'HowToStep',
        text: 'In a large Dutch oven or heavy pot, heat lard or oil over medium-high heat. Brown the pork chunks on all sides in batches, about 3-4 minutes per side. Remove and set aside.'
      },
      {
        '@type': 'HowToStep',
        text: 'Add onion and garlic to the pot. Sauté for 2-3 minutes until fragrant. Return pork to the pot.'
      },
      {
        '@type': 'HowToStep',
        text: 'Add orange juice, orange zest, lime juice, bay leaves, and stock. The liquid should come about halfway up the pork. Bring to a boil, then reduce to low heat.'
      },
      {
        '@type': 'HowToStep',
        text: 'Cover and simmer for 3-4 hours, turning pork occasionally, until extremely tender and falling apart. Check every hour and add more liquid if needed.'
      },
      {
        '@type': 'HowToStep',
        text: 'Remove pork from liquid. Shred with two forks. Strain cooking liquid and reserve 1 cup.'
      },
      {
        '@type': 'HowToStep',
        text: 'Heat a large skillet over high heat. Add shredded pork in a single layer. Pour 1/4 cup of reserved cooking liquid over it. Let cook undisturbed for 3-4 minutes until crispy on the bottom. Flip and repeat.'
      },
      {
        '@type': 'HowToStep',
        text: 'Warm corn tortillas and serve carnitas with cilantro, onion, lime, and your favorite salsa.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What cut of pork is best for carnitas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pork shoulder (also called pork butt or Boston butt) is the best cut for carnitas. It has the perfect balance of meat and fat, which creates tender, juicy carnitas with amazing flavor. The fat renders during the long cooking time, keeping the meat moist and flavorful.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do you get carnitas crispy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The secret to crispy carnitas is the two-step cooking process. First, slow-cook the pork until tender, then shred it and pan-fry in a hot skillet with a little of the reserved cooking liquid. Let it sit undisturbed for 3-4 minutes to develop crispy, caramelized edges, then flip and repeat. This creates the perfect contrast of crispy exterior and tender interior.'
        }
      },
      {
        '@type': 'Question',
        name: 'What tortillas should I use for carnitas tacos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Authentic carnitas tacos are traditionally served on small corn tortillas (6-inch). Double up the tortillas (use two per taco) for structural integrity and authentic street taco style. Warm them on a comal or in a dry skillet until pliable and slightly charred.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I make carnitas in a slow cooker?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Brown the pork first on the stovetop, then transfer everything to a slow cooker. Cook on low for 8 hours or high for 4-5 hours until the pork is fall-apart tender. After shredding, always finish by crisping the carnitas in a hot skillet for authentic texture and flavor.'
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
              <span>Carnitas Tacos</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Slow-Cooked Carnitas Tacos Recipe
            </h1>
            <p className="text-xl text-cream-100">
              Authentic Mexican pork tacos with crispy, tender carnitas
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="bg-rust-600 px-4 py-2 rounded-full">⏱ 4 hours</span>
              <span className="bg-masa-600 px-4 py-2 rounded-full"><ChefIcon className="inline-block text-charcoal-700" size={20} /> Medium</span>
              <span className="bg-sunset-600 px-4 py-2 rounded-full"><TacoIcon className="inline-block text-sunset-600" size={20} /> 8 servings</span>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/recipes/carnitas-tacos.webp"
              alt="Tender carnitas tacos with crispy pork and fresh toppings"
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
              Real carnitas—the kind you get from a street taco stand in Mexico—are a thing of beauty. We're talking about impossibly tender pork that's been slow-cooked until it practically melts in your mouth, with edges crisped to golden perfection. It's rich, it's juicy, it's got that irresistible combination of soft and crispy textures that makes it legendary.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              The word "carnitas" literally means "little meats" in Spanish, and this traditional Mexican dish originated in the state of Michoacán. While it takes time to make (about 4 hours), most of that is hands-off simmering time. And trust us—the wait is worth it. You'll end up with enough carnitas for tacos, burritos, nachos, or just eating straight from the pan with a tortilla in hand.
            </p>
            <p className="text-lg leading-relaxed">
              This recipe breaks down the authentic two-step process: slow-cooking the pork until it's fall-apart tender, then crisping it up in a hot skillet. It's the secret to restaurant-quality carnitas at home, and once you nail this technique, you'll never go back to dry, boring pork again.
            </p>
          </div>
        </section>

        {/* Ingredients */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Carnitas</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>3-4 lbs pork shoulder (pork butt), cut into 2-inch chunks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 large onion, quartered</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>6 garlic cloves, smashed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 oranges (juice and zest)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 lime (juice)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 bay leaves</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 tablespoon ground cumin</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 tablespoon dried oregano (Mexican oregano if possible)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 teaspoon ground cinnamon</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 teaspoons salt</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 teaspoon black pepper</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/4 cup lard (traditional) or vegetable oil</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 cups chicken or pork stock</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For Serving</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>16-24 small <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline font-medium">corn tortillas</Link> (6-inch)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Fresh cilantro, roughly chopped</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>White onion, finely diced</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Lime wedges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Salsa verde or salsa roja</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Optional: sliced radishes, pickled jalapeños</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Optional: crumbled queso fresco</span>
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Season the Pork</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Cut the pork shoulder into roughly 2-inch chunks (don't trim the fat—that's flavor!). In a large bowl, season the pork generously with salt, pepper, cumin, oregano, and cinnamon. Toss to coat every piece evenly. Let it sit at room temperature for 15 minutes while you prep the other ingredients. This gives the spices time to start flavoring the meat.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Brown the Meat</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Heat lard or oil in a large Dutch oven or heavy pot over medium-high heat. Working in batches (don't crowd the pan!), brown the pork chunks on all sides, about 3-4 minutes per side. You want a nice caramelized crust—this adds tons of flavor. Remove browned pork to a plate and set aside. Don't skip this step! The browning is crucial for developing deep, complex flavors.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Aromatics and Liquid</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    In the same pot with the rendered fat, add the quartered onion and smashed garlic. Sauté for 2-3 minutes until fragrant and slightly softened. Return all the browned pork to the pot. Add the orange juice, orange zest, lime juice, bay leaves, and stock. The liquid should come about halfway up the pork—add more stock or water if needed. Give everything a good stir.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">The Long, Slow Cook</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Bring the liquid to a boil, then immediately reduce the heat to low. Cover the pot and let it simmer gently for 3-4 hours. The pork is done when it's fall-apart tender—you should be able to shred it easily with a fork. Turn the pork chunks every hour or so, and check the liquid level. If it's getting dry, add a splash more stock or water. Low and slow is the name of the game here. Be patient—good carnitas can't be rushed.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Shred and Strain</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Using a slotted spoon, remove the pork chunks from the pot and transfer to a large bowl or cutting board. Remove and discard the bay leaves, onion, and garlic. Strain the cooking liquid through a fine-mesh sieve into a bowl—this is liquid gold! Reserve about 1 cup. Using two forks, shred the pork into bite-sized pieces. Don't shred it too fine—you want some texture and varied sizes for crispy bits.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Crisp It Up (The Secret Step!)</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Here's where magic happens. Heat a large cast-iron skillet or heavy pan over high heat. Add a portion of the shredded pork in a single layer—don't overcrowd. Pour about 1/4 cup of the reserved cooking liquid over the meat. Let it sit completely undisturbed for 3-4 minutes. Resist the urge to stir! You want the bottom to get deeply caramelized and crispy. When the bottom is golden and crispy, flip the chunks and repeat on the other side. This creates those irresistible crispy edges that make carnitas legendary. Repeat with remaining pork in batches.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Serve Street-Style</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Warm your <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortillas</Link> on a comal or dry skillet until soft and pliable with some charred spots. Double them up (use two per taco) for authenticity. Fill with a generous portion of carnitas. Top with chopped cilantro, diced white onion, and a squeeze of fresh lime. Add your favorite salsa and maybe some radishes or pickled jalapeños. Keep it simple—the carnitas are the star. Eat immediately while they're hot!
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
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Don't trim the fat from the pork—it renders during cooking and adds flavor</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Brown the meat in batches for best caramelization</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> The pork is done when it shreds easily with a fork</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Always finish by crisping in a hot skillet—this is non-negotiable!</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Save leftover cooking liquid for reheating or making rice</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Use a cast-iron skillet for the crispiest edges</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Serving Ideas</h3>
                <ul className="space-y-2">
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Classic Tacos:</strong> Corn tortillas with cilantro, onion, lime</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Burrito Bowl:</strong> Rice, beans, carnitas, all the toppings</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Tortas:</strong> Mexican sandwich on crusty bolillo roll</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Nachos:</strong> Loaded nachos with carnitas and cheese</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Breakfast Hash:</strong> Carnitas with crispy potatoes and eggs</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Quesadillas:</strong> Carnitas and cheese between <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">flour tortillas</Link></li>
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
                What cut of pork is best for carnitas?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Pork shoulder (also called pork butt or Boston butt) is hands-down the best cut for carnitas. It has the perfect balance of meat and fat, which creates incredibly tender, juicy carnitas with amazing flavor. The fat renders slowly during the long cooking time, basting the meat and keeping it moist. Don't use lean cuts like pork loin—they'll dry out and won't have the same rich flavor or tender texture.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                How do you get carnitas crispy?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                The secret is the two-step cooking process. First, slow-cook the pork until it's fall-apart tender. Then—and this is crucial—shred the meat and pan-fry it in a screaming hot skillet with a little reserved cooking liquid. The key is letting it sit undisturbed for 3-4 minutes so the bottom caramelizes and gets crispy. Flip and repeat on the other side. This creates the perfect contrast: crispy, crunchy edges with tender, juicy meat inside. It's what separates good carnitas from great carnitas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                What tortillas should I use for carnitas tacos?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Authentic carnitas tacos are traditionally served on small <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortillas</Link>, typically 6 inches. Double up the tortillas (use two per taco) for structural integrity and authentic street taco style—this prevents them from falling apart when you pile on the carnitas. Warm them on a comal or dry skillet until pliable with some charred spots. While flour tortillas work too, corn tortillas are the traditional choice that pairs best with the rich pork.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can I make carnitas in a slow cooker or Instant Pot?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Yes! For a slow cooker: brown the pork on the stovetop first (don't skip this!), then transfer everything to the slow cooker. Cook on low for 8 hours or high for 4-5 hours. For an Instant Pot: brown using the sauté function, then pressure cook on high for 45-60 minutes with natural release. Regardless of method, always finish by shredding the meat and crisping it in a hot skillet. That final step is essential for authentic texture and flavor—it's what makes carnitas carnitas!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can I freeze leftover carnitas?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Absolutely! Carnitas freeze beautifully. Let the shredded pork cool completely, then portion it into freezer bags or containers along with some of the cooking liquid (this prevents freezer burn and keeps it moist). Freeze for up to 3 months. To reheat: thaw overnight in the fridge, then crisp up in a hot skillet with a splash of the reserved liquid. You can also reheat from frozen in a covered pan over medium-low heat, adding liquid as needed. Many people say carnitas taste even better after freezing and reheating!
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
                  Quick and easy breakfast tacos with eggs, bacon, and cheese
                </p>
              </div>
            </Link>
            <Link href="/recipes/cheese-quesadillas" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Classic Cheese Quesadillas
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Simple, crispy quesadillas ready in just 10 minutes
                </p>
              </div>
            </Link>
            <Link href="/guides/corn-vs-flour-tortillas" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Corn vs Flour Tortillas
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Learn when to use each type of tortilla
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-rust-600 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make Authentic Carnitas?
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
