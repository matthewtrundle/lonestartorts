import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'H-E-B® Specialty Tortillas',
  description: 'Discover H-E-B® specialty tortillas including whole wheat, spinach-herb, and tomato-basil varieties. Healthy, flavorful options delivered nationwide!',
  keywords: 'H-E-B specialty tortillas, whole wheat tortillas, spinach herb tortillas, flavored tortillas, healthy tortillas online',
};

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'H-E-B® Specialty Tortillas',
  description: 'Specialty tortilla varieties including whole wheat, spinach-herb, and tomato-basil. Healthy and flavorful options for adventurous eaters.',
  brand: { '@type': 'Brand', name: 'H-E-B' },
  image: 'https://lonestartortillas.com/images/product-hero.webp',
  offers: {
    '@type': 'Offer',
    price: '15.99',
    priceCurrency: 'USD',
    priceValidUntil: '2026-12-31',
    availability: 'https://schema.org/PreOrder',
    seller: { '@type': 'Organization', name: 'Lonestar Tortillas' }
  },
};

export default function SpecialtyTortillasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
        <nav className="container mx-auto px-8 py-6">
          <ol className="flex items-center gap-2 text-sm text-charcoal-600">
            <li><Link href="/" className="hover:text-sunset-500">Home</Link></li>
            <li>/</li>
            <li><Link href="/shop" className="hover:text-sunset-500">Products</Link></li>
            <li>/</li>
            <li className="text-charcoal-950 font-medium">Specialty Tortillas</li>
          </ol>
        </nav>

        <section className="container mx-auto px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="relative">
              <div className="aspect-square relative rounded-2xl overflow-hidden bg-gradient-to-br from-lime-100 to-masa-100 shadow-2xl">
                <Image src="/images/product-hero.webp" alt="H-E-B Specialty Tortillas - Whole wheat, spinach-herb, and flavored varieties delivered nationwide" fill className="object-cover" priority />
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <span className="inline-block px-4 py-2 bg-lime-600 text-cream-50 text-sm font-bold tracking-wider uppercase rounded-full mb-4">Specialty H-E-B®</span>
                <h1 className="text-5xl lg:text-6xl font-display font-black text-charcoal-950 mb-4">H-E-B Specialty & Whole Wheat Tortillas</h1>
                <p className="text-2xl text-masa-600 font-light italic">Unique • Healthy • Flavorful</p>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-charcoal-700 leading-relaxed">
                  Explore beyond traditional with H-E-B® specialty tortillas. From wholesome whole wheat to vibrant spinach-herb and savory tomato-basil, these unique varieties add both nutrition and flavor to your favorite dishes.
                </p>

                <h2 className="text-2xl font-display font-bold text-charcoal-950 mt-8 mb-4">Specialty Varieties</h2>
                <div className="space-y-4 text-charcoal-700">
                  <div>
                    <h3 className="font-bold text-lg text-charcoal-950">Whole Wheat Tortillas</h3>
                    <p>Made with whole grain wheat for added fiber and nutrition. Perfect for health-conscious eaters who don't want to compromise on taste.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-charcoal-950">Spinach-Herb Tortillas</h3>
                    <p>Infused with real spinach and herbs for a vibrant green color and fresh, savory flavor. Great for wraps and quesadillas.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-charcoal-950">Tomato-Basil Tortillas</h3>
                    <p>Mediterranean-inspired flavor with tomato and basil. Adds a unique twist to traditional Mexican dishes.</p>
                  </div>
                </div>

                <h2 className="text-2xl font-display font-bold text-charcoal-950 mt-8 mb-4">Why Choose Specialty Tortillas?</h2>
                <ul className="space-y-3 text-charcoal-700">
                  <li>✓ <strong>Healthier Options:</strong> Whole wheat varieties with more fiber</li>
                  <li>✓ <strong>Unique Flavors:</strong> Beyond plain flour and corn</li>
                  <li>✓ <strong>Visual Appeal:</strong> Colorful tortillas make meals pop</li>
                  <li>✓ <strong>Versatile:</strong> Great for wraps, pinwheels, and creative dishes</li>
                  <li>✓ <strong>H-E-B® Quality:</strong> Same authentic Texas standards</li>
                </ul>
              </div>

              <div className="bg-cream-100 border-2 border-lime-200 rounded-xl p-8">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-5xl font-black text-charcoal-950">$15.99</span>
                  <span className="text-lg text-charcoal-600">per package</span>
                </div>
                <p className="text-charcoal-600 mb-6">Variety rotating based on availability</p>
                <Link href="/pre-sale" className="block w-full bg-sunset-500 hover:bg-sunset-600 text-cream-50 text-center px-8 py-4 rounded-full font-bold text-lg tracking-wider uppercase transition-colors shadow-lg hover:shadow-xl">
                  Join Pre-Sale Waitlist
                </Link>
              </div>

              <p className="text-xs text-charcoal-500 uppercase tracking-wider">
                Independent reseller • Not affiliated with or endorsed by H-E-B®
              </p>
            </div>
          </div>

          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-black text-charcoal-950 mb-6">Discover Specialty Tortillas</h2>
            <div className="prose prose-lg max-w-none text-charcoal-700 space-y-4">
              <p>
                H-E-B® specialty tortillas offer exciting alternatives to traditional flour and corn varieties. Whether you're looking for healthier whole wheat options or want to add visual flair with spinach-herb tortillas, these specialty varieties deliver both nutrition and flavor.
              </p>
              <p>
                Perfect for meal prep enthusiasts who want variety in their weekly menu, or for entertaining when you want to impress guests with colorful, flavorful wraps and appetizers. Each variety maintains the quality and texture H-E-B® is known for while offering something new and exciting.
              </p>
              <p>
                Order specialty tortillas online through Lonestar Tortillas and explore the full range of H-E-B® tortilla offerings delivered anywhere in the United States.
              </p>
            </div>

            <div className="mt-16">
              <h3 className="text-2xl font-display font-bold text-charcoal-950 mb-6">Build Your Perfect Mix</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/products/corn-tortillas" className="group block bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                  <h4 className="font-bold text-lg text-charcoal-950 group-hover:text-sunset-500 transition-colors">Corn Tortillas →</h4>
                  <p className="text-charcoal-600 mt-2">Traditional corn tortillas for authentic tacos</p>
                </Link>
                <Link href="/products/flour-tortillas" className="group block bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                  <h4 className="font-bold text-lg text-charcoal-950 group-hover:text-sunset-500 transition-colors">Flour Tortillas →</h4>
                  <p className="text-charcoal-600 mt-2">Soft and versatile for burritos and wraps</p>
                </Link>
                <Link href="/products/butter-tortillas" className="group block bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                  <h4 className="font-bold text-lg text-charcoal-950 group-hover:text-sunset-500 transition-colors">Butter Tortillas →</h4>
                  <p className="text-charcoal-600 mt-2">Rich, buttery flavor for premium taste</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
