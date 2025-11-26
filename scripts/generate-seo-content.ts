/**
 * SEO Content Generator using DeepSeek R1T2 Chimera via OpenRouter
 *
 * This script generates SEO-optimized city landing pages for Lonestar Tortillas.
 * Uses the free DeepSeek model to avoid burning through paid tokens.
 *
 * Usage:
 *   npx ts-node scripts/generate-seo-content.ts --city "Los Angeles" --state "California"
 *
 * Output:
 *   Creates a file at /generated/locations/[state]/[city]/page.tsx
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// OpenRouter configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const MODEL = 'tngtech/deepseek-r1t2-chimera:free';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// City data for generation
interface CityData {
  city: string;
  state: string;
  stateAbbr: string;
  population?: string;
  region: string;
  nearbyStates: string[];
  nearbyCities: string[];
  localCuisine?: string[];
}

// Prompt template for city landing pages
const CITY_PAGE_PROMPT = (data: CityData) => `
You are an expert SEO content writer for Lonestar Tortillas, a Texas-based company that ships authentic H-E-B® tortillas nationwide (except within Texas).

Write a comprehensive 2000+ word landing page for customers in ${data.city}, ${data.state}. The page should:

1. TARGET KEYWORDS:
- "tortillas ${data.city}"
- "Texas tortillas ${data.stateAbbr}"
- "H-E-B tortillas ${data.state}"
- "authentic tortillas delivery ${data.city}"
- "Mexican food ${data.city}"

2. PAGE STRUCTURE (use these exact H2/H3 headers):

## Authentic Texas Tortillas Delivered to ${data.city}
[150 word intro about getting real Texas tortillas delivered to ${data.city}]

## Why ${data.city} Residents Choose Texas Tortillas
[400 words about authenticity, quality, H-E-B heritage, what makes Texas tortillas special]

## Our Products
### Fresh Corn Tortillas
[100 words]
### Premium Flour Tortillas
[100 words]
### Butter Tortillas
[100 words]

## Shipping to ${data.city}, ${data.state}
[200 words about shipping times, costs, delivery areas in ${data.region}]

## ${data.city}'s Mexican Food Scene
[400 words about local Mexican restaurants, home cooking culture, how our tortillas elevate the experience. Reference specific neighborhoods or food traditions if known]

## Perfect Pairings: Recipes for ${data.city} Home Cooks
[300 words suggesting 4-5 recipes that work well - breakfast tacos, brisket tacos, quesadillas, etc.]

## Frequently Asked Questions
[5-6 FAQs with answers, 300 words total]
- How long does shipping take to ${data.city}?
- How should I store my tortillas?
- Are your tortillas gluten-free?
- What's the minimum order?
- Do you ship to other cities in ${data.state}?

## Order Authentic Texas Tortillas Today
[100 word closing CTA encouraging them to shop]

3. IMPORTANT REQUIREMENTS:
- Write in a warm, friendly Texas voice
- Include "Shop Now" call-to-action references
- Mention related cities: ${data.nearbyCities.join(', ')}
- Reference that we ship throughout ${data.state} and nearby states: ${data.nearbyStates.join(', ')}
- Include the mandatory disclaimer: "Independent reseller. Not affiliated with or endorsed by H-E-B®."
- Do NOT use emojis
- Write for SEO but keep it natural and readable
- Include internal link suggestions like [Link to: /shop], [Link to: /guides/how-to-store-tortillas], etc.

4. OUTPUT FORMAT:
Return ONLY the content sections, not the code. I will handle the TypeScript/React wrapper.
Start with the h2 headers and content.
`;

// Function to call OpenRouter API
async function generateContent(prompt: string): Promise<string> {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY environment variable is required');
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://lonestartortillas.com',
      'X-Title': 'Lonestar Tortillas SEO Generator',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are an expert SEO content writer specializing in food and e-commerce. Write engaging, keyword-rich content that drives conversions while maintaining readability.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 8000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || '';
}

// Function to generate TypeScript page file
function generatePageFile(city: string, state: string, content: string): string {
  const citySlug = city.toLowerCase().replace(/\s+/g, '-');
  const stateSlug = state.toLowerCase().replace(/\s+/g, '-');

  // Generate FAQ schema from content
  const faqMatches = content.match(/### (.*?\?)\n([\s\S]*?)(?=###|##|$)/g) || [];
  const faqItems = faqMatches.map(faq => {
    const lines = faq.split('\n');
    const question = lines[0].replace('### ', '').trim();
    const answer = lines.slice(1).join(' ').trim();
    return { question, answer };
  }).filter(f => f.question && f.answer);

  return `import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Authentic Texas Tortillas Delivered to ${city} | Lonestar Tortillas',
  description: 'Get authentic H-E-B® Texas tortillas shipped directly to ${city}, ${state}. Fresh flour & corn tortillas for tacos, burritos & more. Fast shipping, premium quality.',
  keywords: 'tortillas ${city}, Texas tortillas ${state}, H-E-B tortillas delivery, authentic Mexican tortillas ${city}, fresh tortillas shipped',
  alternates: {
    canonical: 'https://lonestartortillas.com/locations/${stateSlug}/${citySlug}',
  },
  openGraph: {
    title: 'Texas Tortillas Delivered to ${city} | Lonestar Tortillas',
    description: 'Authentic H-E-B® tortillas shipped fresh to ${city}. Experience the taste of Texas.',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
${faqItems.map(f => `    {
      '@type': 'Question',
      name: '${f.question.replace(/'/g, "\\'")}',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '${f.answer.replace(/'/g, "\\'").substring(0, 500)}',
      },
    }`).join(',\n')}
  ],
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Lonestar Tortillas - ${city} Delivery',
  description: 'Authentic Texas tortillas delivered to ${city}, ${state}',
  areaServed: {
    '@type': 'City',
    name: '${city}',
    containedInPlace: {
      '@type': 'State',
      name: '${state}',
    },
  },
  url: 'https://lonestartortillas.com/locations/${stateSlug}/${citySlug}',
  telephone: '+1-555-TORTILLA',
  priceRange: '$$',
}

export default function ${city.replace(/\s+/g, '')}Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        {/* Header */}
        <header className="bg-charcoal-950 text-cream-50 py-12">
          <div className="container mx-auto px-6 max-w-6xl">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Locations', href: '/locations' },
                { label: '${state}', href: '/locations/${stateSlug}' },
                { label: '${city}' },
              ]}
              className="mb-6 text-cream-300"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Authentic Texas Tortillas Delivered to ${city}
            </h1>
            <p className="text-xl text-cream-200 max-w-3xl">
              Get fresh H-E-B® tortillas shipped directly to your door in ${city}, ${state}. Experience the authentic taste of Texas.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </header>

        {/* Hero Image */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/generated/hero-tortillas.webp"
              alt="Fresh authentic Texas tortillas"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        <article className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Content will be inserted here from generated content */}
          <div className="prose prose-lg max-w-none">
            {/* GENERATED CONTENT PLACEHOLDER */}
            {/* Replace this comment block with the generated content sections */}
          </div>

          {/* Products Section */}
          <section className="my-12">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Our Products</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/products/corn-tortillas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Fresh Corn Tortillas</h3>
                <p className="text-charcoal-700 text-sm mb-4">Authentic masa flavor, gluten-free, perfect for tacos and enchiladas.</p>
                <span className="text-sunset-600 font-semibold">Shop Corn Tortillas →</span>
              </Link>
              <Link href="/products/flour-tortillas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Premium Flour Tortillas</h3>
                <p className="text-charcoal-700 text-sm mb-4">Soft and pliable, ideal for burritos, wraps, and quesadillas.</p>
                <span className="text-sunset-600 font-semibold">Shop Flour Tortillas →</span>
              </Link>
              <Link href="/products/butter-tortillas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100">
                <h3 className="text-xl font-bold text-charcoal-950 mb-2">Butter Tortillas</h3>
                <p className="text-charcoal-700 text-sm mb-4">Rich, buttery flavor that elevates any dish. A Texas favorite.</p>
                <span className="text-sunset-600 font-semibold">Shop Butter Tortillas →</span>
              </Link>
            </div>
          </section>

          {/* Disclaimer */}
          <p className="text-sm text-charcoal-500 italic mt-8">
            Independent reseller. Not affiliated with or endorsed by H-E-B®.
          </p>

          {/* Final CTA */}
          <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Taste Texas?</h2>
            <p className="text-lg mb-6 text-cream-200">
              Order authentic H-E-B® tortillas delivered fresh to ${city}.
            </p>
            <Link
              href="/shop"
              className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors inline-block"
            >
              Shop All Tortillas
            </Link>
          </section>

          {/* Related Cities */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">We Also Deliver To</h2>
            <div className="flex flex-wrap gap-3">
              {/* Add nearby city links */}
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
`;
}

// City database for batch generation
const CITIES: CityData[] = [
  // California - Priority
  { city: 'Los Angeles', state: 'California', stateAbbr: 'CA', region: 'Southern California', nearbyStates: ['Arizona', 'Nevada'], nearbyCities: ['San Diego', 'Long Beach', 'Anaheim'] },
  { city: 'San Diego', state: 'California', stateAbbr: 'CA', region: 'Southern California', nearbyStates: ['Arizona', 'Nevada'], nearbyCities: ['Los Angeles', 'Tijuana', 'Anaheim'] },
  { city: 'San Francisco', state: 'California', stateAbbr: 'CA', region: 'Bay Area', nearbyStates: ['Oregon', 'Nevada'], nearbyCities: ['Oakland', 'San Jose', 'Sacramento'] },
  { city: 'San Jose', state: 'California', stateAbbr: 'CA', region: 'Bay Area', nearbyStates: ['Oregon', 'Nevada'], nearbyCities: ['San Francisco', 'Oakland', 'Fremont'] },
  // ... Add all 100 cities here
];

// Main execution
async function main() {
  const args = process.argv.slice(2);
  let cityArg = '';
  let stateArg = '';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--city' && args[i + 1]) {
      cityArg = args[i + 1];
    }
    if (args[i] === '--state' && args[i + 1]) {
      stateArg = args[i + 1];
    }
  }

  if (!cityArg || !stateArg) {
    console.log('Usage: npx ts-node scripts/generate-seo-content.ts --city "Los Angeles" --state "California"');
    console.log('\nAvailable cities:');
    CITIES.forEach(c => console.log(`  - ${c.city}, ${c.state}`));
    process.exit(1);
  }

  const cityData = CITIES.find(c =>
    c.city.toLowerCase() === cityArg.toLowerCase() &&
    c.state.toLowerCase() === stateArg.toLowerCase()
  );

  if (!cityData) {
    // Create a temporary city data for custom cities
    const stateAbbr = stateArg.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
    const customCity: CityData = {
      city: cityArg,
      state: stateArg,
      stateAbbr,
      region: stateArg,
      nearbyStates: [],
      nearbyCities: [],
    };

    console.log(`City "${cityArg}, ${stateArg}" not in database, using custom data...`);

    await generateCityPage(customCity);
    return;
  }

  await generateCityPage(cityData);
}

async function generateCityPage(cityData: CityData) {
  console.log(`\nGenerating content for ${cityData.city}, ${cityData.state}...`);
  console.log(`Using model: ${MODEL}\n`);

  try {
    // Generate content
    const prompt = CITY_PAGE_PROMPT(cityData);
    console.log('Calling OpenRouter API...');
    const content = await generateContent(prompt);

    console.log(`\nGenerated ${content.length} characters of content.`);

    // Create output directory
    const citySlug = cityData.city.toLowerCase().replace(/\s+/g, '-');
    const stateSlug = cityData.state.toLowerCase().replace(/\s+/g, '-');
    const outputDir = path.join(__dirname, '..', 'generated', 'locations', stateSlug, citySlug);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save raw content
    const contentPath = path.join(outputDir, 'content.md');
    fs.writeFileSync(contentPath, content);
    console.log(`\nSaved raw content to: ${contentPath}`);

    // Generate page file
    const pageFile = generatePageFile(cityData.city, cityData.state, content);
    const pagePath = path.join(outputDir, 'page.tsx');
    fs.writeFileSync(pagePath, pageFile);
    console.log(`Saved page template to: ${pagePath}`);

    console.log('\n✓ Generation complete!');
    console.log('\nNext steps:');
    console.log('1. Review the generated content in content.md');
    console.log('2. Copy page.tsx to app/locations/' + stateSlug + '/' + citySlug + '/page.tsx');
    console.log('3. Insert the content sections from content.md into the page');

  } catch (error) {
    console.error('Error generating content:', error);
    process.exit(1);
  }
}

main();
