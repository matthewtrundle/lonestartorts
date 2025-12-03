import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'H-E-B Tortillas Nationwide Delivery',
  description: 'Get authentic H-E-B® tortillas delivered anywhere in the United States. Fast shipping to NYC, LA, Chicago, Seattle, Denver, and all major cities. Order Texas tortillas online today!',
  keywords: 'H-E-B tortillas nationwide, tortilla delivery USA, H-E-B tortillas shipping, Texas tortillas delivered, buy H-E-B tortillas online, tortilla shipping nationwide',
  openGraph: {
    title: 'H-E-B® Tortillas Delivered Nationwide',
    description: 'Authentic Texas tortillas shipped to your door, anywhere in America.',
    type: 'website',
  },
};

const cities = [
  {
    name: 'Los Angeles',
    slug: 'california/los-angeles',
    state: 'California',
    description: 'LA County, Orange County, Inland Empire',
    deliveryTime: '2-3 days',
    highlight: 'SoCal coverage',
  },
  {
    name: 'San Diego',
    slug: 'california/san-diego',
    state: 'California',
    description: 'San Diego County and surrounding areas',
    deliveryTime: '2-3 days',
    highlight: 'Border region',
  },
  {
    name: 'San Francisco',
    slug: 'california/san-francisco',
    state: 'California',
    description: 'SF Bay Area, Oakland, San Jose',
    deliveryTime: '2-3 days',
    highlight: 'Bay Area',
  },
  {
    name: 'Phoenix',
    slug: 'arizona/phoenix',
    state: 'Arizona',
    description: 'Phoenix metro, Scottsdale, Mesa, Tempe',
    deliveryTime: '2-3 days',
    highlight: 'Desert Southwest',
  },
  {
    name: 'Denver',
    slug: 'colorado/denver',
    state: 'Colorado',
    description: 'Denver metro, Boulder, Colorado Springs area',
    deliveryTime: '2-3 days',
    highlight: 'Mountain West',
  },
  {
    name: 'Las Vegas',
    slug: 'nevada/las-vegas',
    state: 'Nevada',
    description: 'Las Vegas Valley, Henderson, North Las Vegas',
    deliveryTime: '2-3 days',
    highlight: 'Nevada hub',
  },
  {
    name: 'Seattle',
    slug: 'washington/seattle',
    state: 'Washington',
    description: 'Seattle metro, Tacoma, Bellevue, Eastside',
    deliveryTime: '3-4 days',
    highlight: 'Pacific Northwest',
  },
  {
    name: 'Chicago',
    slug: 'illinois/chicago',
    state: 'Illinois',
    description: 'City of Chicago and Chicagoland suburbs',
    deliveryTime: '2-3 days',
    highlight: 'Midwest hub',
  },
  {
    name: 'New York City',
    slug: 'new-york/new-york-city',
    state: 'New York',
    description: 'Manhattan, Brooklyn, Queens, Bronx, Staten Island',
    deliveryTime: '2-3 days',
    highlight: 'All 5 boroughs',
  },
];

// All states with their cities
const stateData = [
  {
    name: 'Arizona',
    slug: 'arizona',
    cities: [
      { name: 'Phoenix', slug: 'phoenix' },
      { name: 'Scottsdale', slug: 'scottsdale' },
      { name: 'Tempe', slug: 'tempe' },
      { name: 'Mesa', slug: 'mesa' },
      { name: 'Chandler', slug: 'chandler' },
      { name: 'Gilbert', slug: 'gilbert' },
      { name: 'Glendale', slug: 'glendale' },
      { name: 'Tucson', slug: 'tucson' },
    ],
  },
  {
    name: 'California',
    slug: 'california',
    cities: [
      { name: 'Los Angeles', slug: 'los-angeles' },
      { name: 'San Diego', slug: 'san-diego' },
      { name: 'San Francisco', slug: 'san-francisco' },
      { name: 'San Jose', slug: 'san-jose' },
      { name: 'Sacramento', slug: 'sacramento' },
      { name: 'Oakland', slug: 'oakland' },
      { name: 'Fresno', slug: 'fresno' },
      { name: 'Long Beach', slug: 'long-beach' },
      { name: 'Bakersfield', slug: 'bakersfield' },
      { name: 'Anaheim', slug: 'anaheim' },
      { name: 'Santa Ana', slug: 'santa-ana' },
      { name: 'Riverside', slug: 'riverside' },
      { name: 'Stockton', slug: 'stockton' },
      { name: 'Irvine', slug: 'irvine' },
      { name: 'Chula Vista', slug: 'chula-vista' },
      { name: 'Fremont', slug: 'fremont' },
      { name: 'San Bernardino', slug: 'san-bernardino' },
      { name: 'Modesto', slug: 'modesto' },
      { name: 'Fontana', slug: 'fontana' },
      { name: 'Moreno Valley', slug: 'moreno-valley' },
    ],
  },
  {
    name: 'Colorado',
    slug: 'colorado',
    cities: [
      { name: 'Denver', slug: 'denver' },
      { name: 'Colorado Springs', slug: 'colorado-springs' },
      { name: 'Aurora', slug: 'aurora' },
      { name: 'Fort Collins', slug: 'fort-collins' },
      { name: 'Lakewood', slug: 'lakewood' },
      { name: 'Thornton', slug: 'thornton' },
    ],
  },
  {
    name: 'Florida',
    slug: 'florida',
    cities: [
      { name: 'Miami', slug: 'miami' },
      { name: 'Jacksonville', slug: 'jacksonville' },
      { name: 'Tampa', slug: 'tampa' },
      { name: 'Orlando', slug: 'orlando' },
      { name: 'St. Petersburg', slug: 'st-petersburg' },
      { name: 'Hialeah', slug: 'hialeah' },
      { name: 'Tallahassee', slug: 'tallahassee' },
      { name: 'Fort Lauderdale', slug: 'fort-lauderdale' },
      { name: 'Cape Coral', slug: 'cape-coral' },
      { name: 'Pembroke Pines', slug: 'pembroke-pines' },
    ],
  },
  {
    name: 'Georgia',
    slug: 'georgia',
    cities: [
      { name: 'Atlanta', slug: 'atlanta' },
      { name: 'Augusta', slug: 'augusta' },
      { name: 'Columbus', slug: 'columbus' },
      { name: 'Savannah', slug: 'savannah' },
      { name: 'Athens', slug: 'athens' },
      { name: 'Macon', slug: 'macon' },
    ],
  },
  {
    name: 'Illinois',
    slug: 'illinois',
    cities: [
      { name: 'Chicago', slug: 'chicago' },
      { name: 'Aurora', slug: 'aurora' },
      { name: 'Naperville', slug: 'naperville' },
      { name: 'Joliet', slug: 'joliet' },
      { name: 'Rockford', slug: 'rockford' },
      { name: 'Elgin', slug: 'elgin' },
      { name: 'Springfield', slug: 'springfield' },
      { name: 'Peoria', slug: 'peoria' },
    ],
  },
  {
    name: 'Maryland',
    slug: 'maryland',
    cities: [
      { name: 'Baltimore', slug: 'baltimore' },
      { name: 'Frederick', slug: 'frederick' },
      { name: 'Rockville', slug: 'rockville' },
      { name: 'Gaithersburg', slug: 'gaithersburg' },
      { name: 'Bowie', slug: 'bowie' },
      { name: 'Silver Spring', slug: 'silver-spring' },
    ],
  },
  {
    name: 'Massachusetts',
    slug: 'massachusetts',
    cities: [
      { name: 'Boston', slug: 'boston' },
      { name: 'Worcester', slug: 'worcester' },
      { name: 'Springfield', slug: 'springfield' },
      { name: 'Cambridge', slug: 'cambridge' },
      { name: 'Lowell', slug: 'lowell' },
      { name: 'Quincy', slug: 'quincy' },
    ],
  },
  {
    name: 'Michigan',
    slug: 'michigan',
    cities: [
      { name: 'Detroit', slug: 'detroit' },
      { name: 'Grand Rapids', slug: 'grand-rapids' },
      { name: 'Warren', slug: 'warren' },
      { name: 'Sterling Heights', slug: 'sterling-heights' },
      { name: 'Ann Arbor', slug: 'ann-arbor' },
      { name: 'Lansing', slug: 'lansing' },
    ],
  },
  {
    name: 'Minnesota',
    slug: 'minnesota',
    cities: [
      { name: 'Minneapolis', slug: 'minneapolis' },
      { name: 'Saint Paul', slug: 'saint-paul' },
      { name: 'Rochester', slug: 'rochester' },
      { name: 'Duluth', slug: 'duluth' },
      { name: 'Bloomington', slug: 'bloomington' },
      { name: 'Brooklyn Park', slug: 'brooklyn-park' },
    ],
  },
  {
    name: 'Nevada',
    slug: 'nevada',
    cities: [
      { name: 'Las Vegas', slug: 'las-vegas' },
      { name: 'Henderson', slug: 'henderson' },
      { name: 'Reno', slug: 'reno' },
      { name: 'North Las Vegas', slug: 'north-las-vegas' },
      { name: 'Sparks', slug: 'sparks' },
      { name: 'Carson City', slug: 'carson-city' },
    ],
  },
  {
    name: 'New Jersey',
    slug: 'new-jersey',
    cities: [
      { name: 'Newark', slug: 'newark' },
      { name: 'Jersey City', slug: 'jersey-city' },
      { name: 'Paterson', slug: 'paterson' },
      { name: 'Elizabeth', slug: 'elizabeth' },
      { name: 'Trenton', slug: 'trenton' },
      { name: 'Clifton', slug: 'clifton' },
    ],
  },
  {
    name: 'New York',
    slug: 'new-york',
    cities: [
      { name: 'New York City', slug: 'new-york-city' },
      { name: 'Buffalo', slug: 'buffalo' },
      { name: 'Rochester', slug: 'rochester' },
      { name: 'Yonkers', slug: 'yonkers' },
      { name: 'Syracuse', slug: 'syracuse' },
      { name: 'Albany', slug: 'albany' },
      { name: 'New Rochelle', slug: 'new-rochelle' },
      { name: 'Mount Vernon', slug: 'mount-vernon' },
      { name: 'Schenectady', slug: 'schenectady' },
      { name: 'Utica', slug: 'utica' },
    ],
  },
  {
    name: 'North Carolina',
    slug: 'north-carolina',
    cities: [
      { name: 'Charlotte', slug: 'charlotte' },
      { name: 'Raleigh', slug: 'raleigh' },
      { name: 'Greensboro', slug: 'greensboro' },
      { name: 'Durham', slug: 'durham' },
      { name: 'Winston-Salem', slug: 'winston-salem' },
      { name: 'Fayetteville', slug: 'fayetteville' },
    ],
  },
  {
    name: 'Ohio',
    slug: 'ohio',
    cities: [
      { name: 'Columbus', slug: 'columbus' },
      { name: 'Cleveland', slug: 'cleveland' },
      { name: 'Cincinnati', slug: 'cincinnati' },
      { name: 'Toledo', slug: 'toledo' },
      { name: 'Akron', slug: 'akron' },
      { name: 'Dayton', slug: 'dayton' },
    ],
  },
  {
    name: 'Oregon',
    slug: 'oregon',
    cities: [
      { name: 'Portland', slug: 'portland' },
      { name: 'Salem', slug: 'salem' },
      { name: 'Eugene', slug: 'eugene' },
      { name: 'Gresham', slug: 'gresham' },
      { name: 'Hillsboro', slug: 'hillsboro' },
      { name: 'Bend', slug: 'bend' },
    ],
  },
  {
    name: 'Pennsylvania',
    slug: 'pennsylvania',
    cities: [
      { name: 'Philadelphia', slug: 'philadelphia' },
      { name: 'Pittsburgh', slug: 'pittsburgh' },
      { name: 'Allentown', slug: 'allentown' },
      { name: 'Erie', slug: 'erie' },
      { name: 'Reading', slug: 'reading' },
      { name: 'Scranton', slug: 'scranton' },
    ],
  },
  {
    name: 'Tennessee',
    slug: 'tennessee',
    cities: [
      { name: 'Nashville', slug: 'nashville' },
      { name: 'Memphis', slug: 'memphis' },
      { name: 'Knoxville', slug: 'knoxville' },
      { name: 'Chattanooga', slug: 'chattanooga' },
      { name: 'Clarksville', slug: 'clarksville' },
      { name: 'Murfreesboro', slug: 'murfreesboro' },
    ],
  },
  {
    name: 'Virginia',
    slug: 'virginia',
    cities: [
      { name: 'Virginia Beach', slug: 'virginia-beach' },
      { name: 'Norfolk', slug: 'norfolk' },
      { name: 'Chesapeake', slug: 'chesapeake' },
      { name: 'Richmond', slug: 'richmond' },
      { name: 'Arlington', slug: 'arlington' },
      { name: 'Alexandria', slug: 'alexandria' },
    ],
  },
  {
    name: 'Washington',
    slug: 'washington',
    cities: [
      { name: 'Seattle', slug: 'seattle' },
      { name: 'Spokane', slug: 'spokane' },
      { name: 'Tacoma', slug: 'tacoma' },
      { name: 'Vancouver', slug: 'vancouver' },
      { name: 'Bellevue', slug: 'bellevue' },
      { name: 'Kent', slug: 'kent' },
    ],
  },
];

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'H-E-B Tortillas Delivery Locations',
  description: 'Nationwide delivery of authentic H-E-B tortillas to major US cities.',
  url: 'https://lonestartortillas.com/locations',
};

export default function LocationsPage() {
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
                { label: 'Locations' },
              ]}
              className="mb-6 text-cream-300"
            />
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-display">
              H-E-B® Tortillas Delivered Nationwide
            </h1>
            <p className="text-xl text-cream-100 max-w-3xl">
              Authentic Texas tortillas shipped to your door, anywhere in the United States.
              Fast, reliable delivery with free shipping on orders over $45.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12 md:py-16 max-w-6xl">
          {/* Introduction */}
          <section className="mb-12">
            <div className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg">
              <h2 className="text-2xl font-bold text-charcoal-950 mb-3">
                Bringing Texas to You
              </h2>
              <p className="text-lg text-charcoal-800 leading-relaxed">
                Missing authentic H-E-B® tortillas? We ship premium{' '}
                <Link href="/products/corn-tortillas" className="text-sunset-600 hover:underline font-medium">
                  corn tortillas
                </Link>
                ,{' '}
                <Link href="/products/flour-tortillas" className="text-sunset-600 hover:underline font-medium">
                  flour tortillas
                </Link>
                , and{' '}
                <Link href="/products/butter-tortillas" className="text-sunset-600 hover:underline font-medium">
                  butter tortillas
                </Link>
                {' '}to all 50 states. Our shelf-stable tortillas arrive fresh and ready to enjoy.
              </p>
            </div>
          </section>

          {/* Featured Cities */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8">
              Popular Delivery Cities
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/locations/${city.slug}`}
                  className="group block bg-white rounded-xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-sunset-400"
                >
                  <div className="text-sm text-sunset-600 font-semibold mb-2">{city.state}</div>
                  <h3 className="text-2xl font-bold text-charcoal-950 group-hover:text-sunset-600 transition-colors mb-2">
                    {city.name} →
                  </h3>
                  <p className="text-charcoal-600 text-sm mb-3">{city.state}</p>
                  <p className="text-charcoal-700 mb-4">{city.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="bg-masa-100 text-masa-700 px-3 py-1 rounded-full font-semibold">
                      {city.deliveryTime}
                    </span>
                    <span className="text-sunset-600 font-medium">{city.highlight}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Browse by State */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8">
              Browse by State
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {stateData.map((state) => (
                <div key={state.slug} className="bg-white rounded-lg p-6 shadow-md">
                  <Link
                    href={`/locations/${state.slug}`}
                    className="text-xl font-bold text-charcoal-950 hover:text-sunset-600 transition-colors"
                  >
                    {state.name} →
                  </Link>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {state.cities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/locations/${state.slug}/${city.slug}`}
                        className="text-sm text-charcoal-600 hover:text-sunset-600 transition-colors"
                      >
                        {city.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Nationwide Coverage */}
          <section className="mb-16 bg-gradient-to-r from-masa-100 to-sunset-100 p-8 rounded-lg">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-charcoal-950 mb-6 text-center">
                We Ship to All 50 States
              </h2>
              <p className="text-lg text-charcoal-800 leading-relaxed text-center mb-6">
                Don't see your city listed? No problem! We deliver authentic H-E-B® tortillas anywhere in the continental United States, Alaska, and Hawaii. Our shelf-stable tortillas are specially designed for safe, fresh delivery nationwide.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg text-center">
                  <div className="text-3xl mb-3">📦</div>
                  <h3 className="font-bold text-charcoal-950 mb-2">Fast Shipping</h3>
                  <p className="text-charcoal-700 text-sm">2-4 day delivery via USPS Priority Mail</p>
                </div>
                <div className="bg-white p-6 rounded-lg text-center">
                  <div className="text-3xl mb-3">🌡️</div>
                  <h3 className="font-bold text-charcoal-950 mb-2">Shelf-Stable</h3>
                  <p className="text-charcoal-700 text-sm">No refrigeration needed during shipping</p>
                </div>
                <div className="bg-white p-6 rounded-lg text-center">
                  <div className="text-3xl mb-3">✅</div>
                  <h3 className="font-bold text-charcoal-950 mb-2">Fresh Guarantee</h3>
                  <p className="text-charcoal-700 text-sm">30+ day shelf life upon arrival</p>
                </div>
              </div>
            </div>
          </section>

          {/* Shipping Info */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8">
              Shipping Information
            </h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-4">Delivery Times</h3>
                  <ul className="space-y-3 text-charcoal-700">
                    <li className="flex items-start gap-2">
                      <span className="text-sunset-500 mt-1">•</span>
                      <span><strong>West Coast:</strong> 2-3 business days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sunset-500 mt-1">•</span>
                      <span><strong>Midwest:</strong> 2-3 business days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sunset-500 mt-1">•</span>
                      <span><strong>East Coast:</strong> 2-3 business days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sunset-500 mt-1">•</span>
                      <span><strong>Mountain West:</strong> 2-3 business days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sunset-500 mt-1">•</span>
                      <span><strong>Alaska/Hawaii:</strong> 4-7 business days</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-950 mb-4">Shipping Rates</h3>
                  <ul className="space-y-3 text-charcoal-700">
                    <li className="flex items-start gap-2">
                      <span className="text-sunset-500 mt-1">•</span>
                      <span><strong>Free Shipping:</strong> Orders over $45</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sunset-500 mt-1">•</span>
                      <span><strong>Standard Shipping:</strong> $12.99 flat rate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sunset-500 mt-1">•</span>
                      <span><strong>Method:</strong> USPS Priority Mail</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sunset-500 mt-1">•</span>
                      <span><strong>Tracking:</strong> Included with every order</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-charcoal-950 text-cream-50 p-12 rounded-lg text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Order?
            </h2>
            <p className="text-xl mb-8 text-cream-100 max-w-2xl mx-auto">
              Get authentic H-E-B® tortillas delivered to your door. Shop our full selection of corn, flour, and butter tortillas.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
              >
                Shop All Tortillas
              </Link>
              <Link
                href="/pre-sale"
                className="bg-transparent border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Join Waitlist
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
