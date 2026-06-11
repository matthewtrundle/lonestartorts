import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ShipBoxIcon, TortillaStackIcon, TexasStarIcon } from '@/components/ui/Icons';
import { categoryHeroes, locationHero } from '@/lib/hero-images';

export const metadata: Metadata = {
  alternates: {
    canonical: '/locations',
  },
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
        <PageHero
          image={categoryHeroes.locations.image}
          imageAlt={categoryHeroes.locations.alt}
          className="md:py-16"
          title="H-E-B® Tortillas Delivered Nationwide"
          sub="Authentic Texas tortillas shipped to your door, anywhere in the United States. Fast, reliable delivery with free shipping on orders $80+."
          breadcrumbs={
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Locations' },
              ]}
            />
          }
        />

        {/* Main Content */}
        <main className="container mx-auto px-6 py-10 md:py-14 max-w-6xl">
          {/* Introduction */}
          <section className="mb-12">
            <SectionHeader
              eyebrow="Nationwide Delivery"
              title="Bringing Texas to You"
              className="mb-4"
            />
            <p className="max-w-3xl text-lg text-charcoal-700 leading-relaxed text-pretty">
              Missing authentic H-E-B® tortillas? We ship premium{' '}
              <Link href="/products/corn-tortillas" className="text-sunset-700 hover:underline font-medium">
                corn tortillas
              </Link>
              ,{' '}
              <Link href="/products/flour-tortillas" className="text-sunset-700 hover:underline font-medium">
                flour tortillas
              </Link>
              , and{' '}
              <Link href="/products/butter-tortillas" className="text-sunset-700 hover:underline font-medium">
                butter tortillas
              </Link>
              {' '}to all 50 states. Our shelf-stable tortillas arrive fresh and ready to enjoy.
            </p>
          </section>

          {/* Popular Destinations */}
          <section className="mb-14">
            <SectionHeader
              eyebrow="Popular Destinations"
              title="Popular Delivery Cities"
              sub="The routes we run most — from the Gulf Coast to all five boroughs."
            />
            <div className="grid md:grid-cols-2 gap-x-10 border-t border-charcoal-200">
              {cities.map((city) => {
                const region = locationHero(city.slug.split('/')[0]);
                return (
                  <Link
                    key={city.slug}
                    href={`/locations/${city.slug}`}
                    className="group flex items-center gap-4 py-4 border-b border-charcoal-200"
                  >
                    <Image
                      src={region.image}
                      alt={region.alt}
                      width={64}
                      height={64}
                      className="h-16 w-16 flex-shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold uppercase tracking-widest text-sunset-700">
                        {city.state}
                      </p>
                      <h3 className="font-semibold text-lg text-charcoal-950 transition-colors group-hover:text-sunset-600">
                        {city.name}
                      </h3>
                      <p className="truncate text-sm text-charcoal-600">{city.description}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-sm font-semibold text-charcoal-950">{city.deliveryTime}</p>
                      <p className="text-xs text-charcoal-500">{city.highlight}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Browse by State */}
          <section className="mb-14">
            <SectionHeader
              eyebrow="Every Route We Run"
              title="Browse by State"
            />
            <ul className="columns-2 md:columns-4 gap-x-8">
              {stateData.map((state) => (
                <li key={state.slug} className="break-inside-avoid py-1.5">
                  <Link
                    href={`/locations/${state.slug}`}
                    className="group inline-flex items-baseline gap-2"
                  >
                    <span className="font-semibold text-charcoal-950 transition-colors group-hover:text-sunset-600">
                      {state.name}
                    </span>
                    <span className="text-sm text-charcoal-500">
                      {state.cities.length} {state.cities.length === 1 ? 'city' : 'cities'}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Nationwide Coverage */}
          <section className="mb-14 rounded-2xl bg-masa-100 p-8 md:p-10">
            <div className="max-w-4xl mx-auto">
              <SectionHeader
                align="center"
                title="We Ship to All 50 States"
                className="mb-4"
              />
              <p className="text-lg text-charcoal-800 leading-relaxed text-center text-pretty mb-8">
                Don't see your city listed? No problem! We deliver authentic H-E-B® tortillas anywhere in the continental United States, Alaska, and Hawaii. Our shelf-stable tortillas are specially designed for safe, fresh delivery nationwide.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="rounded-xl bg-cream-50 p-6 text-center">
                  <ShipBoxIcon className="mx-auto mb-3 h-8 w-8 text-sunset-600" />
                  <h3 className="font-bold text-charcoal-950 mb-2">Fast Shipping</h3>
                  <p className="text-charcoal-700 text-sm">2-4 day delivery via USPS Priority Mail</p>
                </div>
                <div className="rounded-xl bg-cream-50 p-6 text-center">
                  <TortillaStackIcon className="mx-auto mb-3 h-8 w-8 text-sunset-600" />
                  <h3 className="font-bold text-charcoal-950 mb-2">Shelf-Stable</h3>
                  <p className="text-charcoal-700 text-sm">No refrigeration needed during shipping</p>
                </div>
                <div className="rounded-xl bg-cream-50 p-6 text-center">
                  <TexasStarIcon className="mx-auto mb-3 h-8 w-8 text-sunset-600" />
                  <h3 className="font-bold text-charcoal-950 mb-2">Fresh Guarantee</h3>
                  <p className="text-charcoal-700 text-sm">30+ day shelf life upon arrival</p>
                </div>
              </div>
            </div>
          </section>

          {/* Shipping Info */}
          <section className="mb-14">
            <SectionHeader
              eyebrow="The Fine Print"
              title="Shipping Information"
            />
            <div className="rounded-xl border border-charcoal-200 bg-white p-8 shadow-soft">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-xl text-charcoal-950 mb-4">Delivery Times</h3>
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
                  <h3 className="font-semibold text-xl text-charcoal-950 mb-4">Shipping Rates</h3>
                  <ul className="space-y-3 text-charcoal-700">
                    <li className="flex items-start gap-2">
                      <span className="text-sunset-500 mt-1">•</span>
                      <span><strong>Free Shipping:</strong> Orders $80+</span>
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
          <section className="rounded-2xl bg-charcoal-950 p-10 md:p-12 text-center text-cream-50">
            <h2 className="font-display text-balance text-3xl md:text-4xl font-bold mb-4">
              Texas flavor, wherever you are
            </h2>
            <p className="text-xl mb-8 text-cream-200 max-w-2xl mx-auto text-pretty">
              Get authentic H-E-B® tortillas delivered to your door. Shop our full selection of corn, flour, and butter tortillas.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-sunset-600 hover:bg-sunset-700 text-white px-8 py-3 rounded-lg font-bold transition-colors"
              >
                Shop All Tortillas
              </Link>
              <Link
                href="/pre-sale"
                className="bg-transparent border-2 border-cream-50 hover:bg-cream-50 hover:text-charcoal-950 text-cream-50 px-8 py-3 rounded-lg font-bold transition-colors"
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
