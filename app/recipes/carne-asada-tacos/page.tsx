import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { TacoIcon, ChefIcon, BulletIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Authentic Carne Asada Tacos Recipe',
  description: 'Learn to make authentic Mexican carne asada tacos with marinated grilled steak. Simple marinade, quick grilling, and served street-style on corn tortillas.',
  keywords: 'carne asada recipe, grilled steak tacos, authentic carne asada, mexican steak tacos, how to make carne asada, carne asada marinade',
  openGraph: {
    title: 'Authentic Carne Asada Tacos Recipe | Lonestar Tortillas',
    description: 'Perfectly grilled, marinated steak tacos with simple ingredients. Restaurant-quality carne asada at home!',
    type: 'article',
  },
};

export default function CarneAsadaTacosRecipe() {
  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: 'Carne Asada Tacos',
    description: 'Authentic Mexican grilled steak tacos with citrus marinade, served street-style on warm corn tortillas',
    image: 'https://lonestartortillas.com/images/recipes/carne-asada-tacos.webp',
    prepTime: 'PT2H15M',
    cookTime: 'PT10M',
    totalTime: 'PT2H25M',
    recipeYield: '6 servings',
    recipeCategory: 'Dinner',
    recipeCuisine: 'Mexican',
    keywords: 'carne asada, grilled steak tacos, mexican street tacos, marinated steak',
    recipeIngredient: [
      '2 lbs flank steak or skirt steak',
      '4 garlic cloves, minced',
      '1/4 cup fresh lime juice (about 2-3 limes)',
      '1/4 cup fresh orange juice (about 1 orange)',
      '1/3 cup olive oil',
      '1/4 cup soy sauce',
      '2 teaspoons ground cumin',
      '1 teaspoon chili powder',
      '1 teaspoon smoked paprika',
      '1 teaspoon dried oregano',
      '1/2 teaspoon black pepper',
      '1 teaspoon salt',
      '1/2 teaspoon cayenne pepper (optional, for heat)',
      '1/4 cup fresh cilantro, chopped',
      '12-18 corn tortillas (6-inch)',
      'White onion, finely diced',
      'Fresh cilantro, chopped',
      'Lime wedges',
      'Salsa verde or pico de gallo',
      'Optional: sliced radishes, grilled jalapeños, guacamole'
    ],
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        text: 'In a bowl, whisk together minced garlic, lime juice, orange juice, olive oil, soy sauce, cumin, chili powder, smoked paprika, oregano, black pepper, salt, cayenne, and half the cilantro to make the marinade.'
      },
      {
        '@type': 'HowToStep',
        text: 'Place steak in a large resealable bag or shallow dish. Pour marinade over steak, making sure it\'s completely coated. Seal bag and refrigerate for at least 2 hours, preferably 4-6 hours, turning occasionally.'
      },
      {
        '@type': 'HowToStep',
        text: 'Remove steak from refrigerator 30 minutes before grilling to bring to room temperature. Preheat grill to high heat (450-500°F).'
      },
      {
        '@type': 'HowToStep',
        text: 'Remove steak from marinade, shaking off excess. Pat dry with paper towels (this helps get a better sear).'
      },
      {
        '@type': 'HowToStep',
        text: 'Grill steak for 3-5 minutes per side for medium-rare (internal temp 130-135°F), or longer for desired doneness. Don\'t move the meat too much—let it develop a good char.'
      },
      {
        '@type': 'HowToStep',
        text: 'Transfer steak to a cutting board and let rest for 10 minutes. This allows juices to redistribute and keeps the meat tender.'
      },
      {
        '@type': 'HowToStep',
        text: 'Slice steak against the grain into thin strips, about 1/4-inch thick. This is crucial for tender bites.'
      },
      {
        '@type': 'HowToStep',
        text: 'Warm corn tortillas on the grill or in a dry skillet until pliable with charred spots. Serve carne asada on double-stacked tortillas, topped with onion, cilantro, lime, and salsa.'
      }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best cut of beef for carne asada?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Skirt steak and flank steak are the traditional cuts for carne asada. Skirt steak is the most authentic and has the best flavor and texture when grilled. Flank steak is slightly leaner and easier to find. Both cuts benefit from marinating and must be sliced against the grain after cooking for maximum tenderness.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long should I marinate carne asada?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Marinate carne asada for at least 2 hours, but ideally 4-6 hours for best flavor. You can marinate up to 12 hours, but not longer as the citrus acids can start to break down the meat too much and make it mushy. For a quick version, even 30 minutes will add some flavor, though it won\'t be as deep.'
        }
      },
      {
        '@type': 'Question',
        name: 'What does carne asada mean?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Carne asada literally translates to "grilled meat" in Spanish. It refers to grilled and sliced beef, typically marinated with citrus and spices. In Mexican cuisine, it\'s most commonly served as street tacos on small corn tortillas with simple toppings like onion, cilantro, and salsa.'
        }
      },
      {
        '@type': 'Question',
        name: 'Should I use corn or flour tortillas for carne asada tacos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Authentic carne asada tacos use small corn tortillas (6-inch), served street-style. Double-stack the tortillas (two per taco) to prevent them from falling apart. While flour tortillas can work, corn tortillas are traditional and complement the grilled beef flavor better. Warm them until pliable with some charred spots.'
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
              <span>Carne Asada Tacos</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Authentic Carne Asada Tacos Recipe
            </h1>
            <p className="text-xl text-cream-100">
              Perfectly grilled, marinated steak tacos served street-style
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <span className="bg-rust-600 px-4 py-2 rounded-full">⏱ 2.5 hours (mostly marinating)</span>
              <span className="bg-masa-600 px-4 py-2 rounded-full"><ChefIcon className="inline-block text-charcoal-700" size={20} /> Easy</span>
              <span className="bg-sunset-600 px-4 py-2 rounded-full"><TacoIcon className="inline-block text-sunset-600" size={20} /> 6 servings</span>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/recipes/carne-asada-tacos.webp"
              alt="Grilled carne asada tacos with charred steak and cilantro"
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
              Carne asada tacos are the soul of Mexican street food. Picture this: tender, juicy steak with perfectly charred edges, sliced thin and piled onto warm corn tortillas, topped with nothing but fresh onion, cilantro, a squeeze of lime, and maybe some spicy salsa. It's simple, it's authentic, and it's absolutely incredible.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              The name "carne asada" literally means "grilled meat" in Spanish, but it's so much more than that. This dish is about the perfect marriage of a citrus-based marinade and high-heat grilling that creates caramelized, smoky flavor on the outside while keeping the meat tender and juicy inside. It's a staple at taquerías throughout Mexico and the American Southwest, and once you make it at home, you'll understand why.
            </p>
            <p className="text-lg leading-relaxed">
              The secret to great carne asada isn't complicated: good meat (flank or skirt steak), a flavorful marinade with citrus and spices, a screaming hot grill, and—this is crucial—slicing against the grain. Get these basics right, and you'll have tacos that rival any taco truck or authentic Mexican restaurant. Time to fire up that grill!
            </p>
          </div>
        </section>

        {/* Ingredients */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Ingredients</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For the Marinade & Steak</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 lbs flank steak or skirt steak</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>4 garlic cloves, minced</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/4 cup fresh lime juice (2-3 limes)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/4 cup fresh orange juice (1 orange)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/3 cup olive oil</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/4 cup soy sauce</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>2 teaspoons ground cumin</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 teaspoon chili powder</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 teaspoon smoked paprika</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 teaspoon dried oregano</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/2 teaspoon black pepper</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1 teaspoon salt</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/2 teaspoon cayenne (optional)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>1/4 cup fresh cilantro, chopped</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">For Serving</h3>
                <ul className="space-y-2 text-charcoal-800">
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>12-18 small <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline font-medium">corn tortillas</Link> (6-inch)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>White onion, finely diced</span>
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
                    <span>Salsa verde or pico de gallo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Optional: sliced radishes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Optional: grilled jalapeños</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Optional: guacamole</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rust-600"><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /></span>
                    <span>Optional: crumbled cotija cheese</span>
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Make the Marinade</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    In a medium bowl, whisk together the minced garlic, lime juice, orange juice, olive oil, soy sauce, cumin, chili powder, smoked paprika, oregano, black pepper, salt, cayenne (if using), and half of the chopped cilantro. The citrus juice tenderizes the meat while the spices add layers of flavor. The soy sauce might seem unusual, but it adds umami depth and helps with browning. Give it a good whisk until everything's well combined.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Marinate the Steak</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Place the steak in a large resealable plastic bag or a shallow glass dish. Pour the marinade over the meat, making sure every inch is coated. Seal the bag (or cover the dish with plastic wrap) and massage the marinade into the meat a bit. Refrigerate for at least 2 hours, but ideally 4-6 hours for maximum flavor. Turn the bag occasionally to ensure even marinating. If you're short on time, even 30 minutes is better than nothing, but you won't get the same depth of flavor.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Prep for Grilling</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    About 30 minutes before you're ready to grill, remove the steak from the refrigerator and let it come to room temperature. This ensures even cooking. Meanwhile, preheat your grill to high heat—you want it screaming hot, around 450-500°F. If you're using a charcoal grill, wait until the coals are white-hot and glowing. For gas grills, crank all burners to high and close the lid for 10-15 minutes. Clean and oil your grill grates to prevent sticking.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Prepare the Meat</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Remove the steak from the marinade, letting excess drip off. Pat the steak dry with paper towels—this is important! Wet meat steams instead of sears, and you want that beautiful caramelized crust. Don't skip this step. The meat should be slightly tacky but not dripping wet. Discard the used marinade (never reuse it for food safety reasons).
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Grill to Perfection</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Place the steak on the hot grill and close the lid. Grill for 3-5 minutes on the first side without moving it—you want those beautiful grill marks and that char. Flip once and grill for another 3-5 minutes for medium-rare (internal temp of 130-135°F). For medium, go 5-7 minutes per side (135-145°F). Skirt and flank steak are best served medium-rare to medium—any more done and they get tough. Use a meat thermometer if you're unsure. Remember, the meat will continue to cook a bit while resting.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Rest the Meat</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Transfer the grilled steak to a cutting board and tent it loosely with aluminum foil. Let it rest for 10 minutes. This is non-negotiable! Resting allows the juices to redistribute throughout the meat. If you cut into it immediately, all those flavorful juices will run out onto your cutting board instead of staying in the meat. Be patient—these 10 minutes make a huge difference in how juicy your carne asada will be.
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Slice Against the Grain</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    Here's the secret to tender carne asada: slicing against the grain. Look at the meat and you'll see lines running through it—that's the grain (the direction of the muscle fibers). You want to slice perpendicular to those lines, cutting across them at a slight angle. This shortens the fibers and makes each bite tender. Cut the meat into thin strips, about 1/4-inch thick. If you slice with the grain instead of against it, your meat will be chewy and tough no matter how well you cooked it. This step is crucial!
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
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">Assemble Your Tacos</h3>
                  <p className="text-charcoal-700 leading-relaxed">
                    While the meat was resting, warm your <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortillas</Link> on the grill or in a dry skillet over medium-high heat for about 20-30 seconds per side. You want them pliable and slightly charred in spots. Keep them warm wrapped in a clean kitchen towel. To serve street-style, double up your tortillas (two per taco) and pile on the sliced carne asada. Top with diced white onion, chopped cilantro, a generous squeeze of lime, and your favorite salsa. Keep it simple and let the meat shine. Serve immediately and enjoy!
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
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Always slice against the grain for maximum tenderness</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Pat the meat dry before grilling for better searing</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Don't overcook—flank/skirt steak is best at medium-rare to medium</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Let the meat rest for 10 minutes before slicing</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Use fresh citrus juice, not bottled, for best flavor</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Marinate for 4-6 hours for deepest flavor penetration</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> Double-stack your corn tortillas street-style</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-950 mb-3">Serving Ideas</h3>
                <ul className="space-y-2">
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Classic Tacos:</strong> Simple with onion, cilantro, lime</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Loaded Style:</strong> Add guacamole, salsa, cheese, crema</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Burrito Bowl:</strong> Over rice with beans and toppings</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Quesadillas:</strong> With cheese in <Link href="/products/flour-tortillas" className="text-rust-600 hover:underline">flour tortillas</Link></li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Fajita Style:</strong> With grilled peppers and onions</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Carne Asada Fries:</strong> Over crispy fries with cheese and toppings</li>
                  <li><BulletIcon className="inline-block text-sunset-600 mx-2" size={6} /> <strong>Torta:</strong> Mexican sandwich on crusty roll</li>
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
                What is the best cut of beef for carne asada?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Skirt steak is the most traditional and authentic choice for carne asada—it's what you'll find at taquerías throughout Mexico. It has incredible beefy flavor and a loose grain that soaks up marinade beautifully. Flank steak is a close second and slightly more widely available. It's a bit leaner and has a tighter grain, but still makes excellent carne asada. Both cuts MUST be sliced against the grain after cooking to be tender. Avoid lean cuts like sirloin or tenderloin—they don't have the right texture or flavor for authentic carne asada.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                How long should I marinate carne asada?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                The sweet spot is 4-6 hours for the best flavor penetration without over-tenderizing. At minimum, marinate for 2 hours—anything less and you won't get much flavor beyond the surface. You can go up to 12 hours maximum, but don't exceed that. The citrus acids in the marinade will start to break down the meat fibers too much, making the texture mushy instead of tender. If you're really in a pinch, even 30 minutes of marinating will add some flavor, though it won't be as deeply seasoned. Always marinate in the refrigerator, never at room temperature.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Can I make carne asada without a grill?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Yes! While grilling gives you that authentic smoky char, you can make excellent carne asada using a cast-iron skillet or grill pan. Heat the pan over high heat until it's smoking hot. Pat the marinated steak very dry, then sear for 3-4 minutes per side for medium-rare. Don't move it around—let it develop a crust. You can also broil it in your oven: place the steak on a broiler pan 4-6 inches from the heat source and broil for 4-5 minutes per side. The key to any method is high heat and not overcooking. You want that caramelized crust with a juicy, pink interior.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Should I use corn or flour tortillas for carne asada tacos?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Authentic carne asada tacos use small <Link href="/products/corn-tortillas" className="text-rust-600 hover:underline">corn tortillas</Link>, typically 6 inches in diameter. This is the traditional street taco style you'll find throughout Mexico. Double-stack them (use two tortillas per taco) to prevent them from falling apart and to get that authentic experience. Warm the tortillas on the grill or a dry skillet until they're pliable with some charred spots—this adds flavor and makes them easier to fold. While flour tortillas work if that's what you prefer, corn is the authentic choice and complements the grilled beef flavor better.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-charcoal-950 mb-3">
                Why is slicing against the grain important?
              </h3>
              <p className="text-charcoal-700 leading-relaxed">
                Slicing against the grain is absolutely critical for tender carne asada. The "grain" refers to the direction that the muscle fibers run through the meat. When you slice against (perpendicular to) these fibers, you're shortening them, which makes each bite much more tender and easier to chew. If you slice with the grain (parallel to the fibers), you're leaving long, tough strands that are chewy and difficult to eat, no matter how perfectly you cooked the meat. Look closely at the cooked steak—you'll see lines running through it. Slice perpendicular to those lines at a slight angle, cutting thin strips about 1/4-inch thick. This one technique makes all the difference!
              </p>
            </div>
          </div>
        </section>

        {/* Related Content */}
        <section className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-xl my-8">
          <h2 className="text-2xl font-bold text-charcoal-950 mb-6">More Tortilla Recipes & Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/recipes/carnitas-tacos" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Slow-Cooked Carnitas Tacos
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Tender pork with crispy edges, slow-cooked to perfection
                </p>
              </div>
            </Link>
            <Link href="/recipes/chicken-fajitas" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  Sizzling Chicken Fajitas
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Restaurant-quality fajitas with peppers and onions
                </p>
              </div>
            </Link>
            <Link href="/guides/how-to-reheat-tortillas" className="group block">
              <div className="bg-charcoal-50 p-6 rounded-lg hover:bg-charcoal-100 transition-colors">
                <h3 className="text-lg font-semibold text-charcoal-950 group-hover:text-rust-600 transition-colors mb-2">
                  How to Reheat Tortillas
                </h3>
                <p className="text-charcoal-700 text-sm">
                  Master the best methods for warming tortillas perfectly
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-rust-600 text-cream-50 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make Authentic Carne Asada?
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
