import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { LocationFAQ } from '@/components/location/LocationFAQ'

export const metadata: Metadata = {
  title: 'H-E-B Tortillas to Pembroke Pines',
  description: 'Get authentic H-E-B Texas tortillas shipped to Pembroke Pines, Florida. Fast 2-3 day shipping.',
  alternates: { canonical: 'https://lonestartortillas.com/locations/florida/pembroke-pines' },
}

export default function PembrokePinesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50">
      <header className="bg-charcoal-950 text-cream-50 py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Locations', href: '/locations' }, { label: 'Florida', href: '/locations/florida' }, { label: 'Pembroke Pines' }]} className="mb-6 text-cream-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Authentic Texas Tortillas Delivered to Pembroke Pines</h1>
          <p className="text-xl text-cream-200 max-w-3xl">Get fresh H-E-B tortillas shipped directly to Pembroke Pines.</p>
          <Link href="/shop" className="mt-6 inline-block bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors">Shop Now</Link>
        </div>
      </header>
      <section className="max-w-6xl mx-auto px-6 py-8"><div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg"><Image src="/images/generated/hero-tortillas.webp" alt="Fresh tortillas delivered to Pembroke Pines" fill className="object-cover" priority /></div></section>
      <article className="container mx-auto px-6 py-12 max-w-4xl">
        <section className="prose prose-lg max-w-none mb-12">
          <h2 className="text-3xl font-bold text-charcoal-950 mb-6">Why Pembroke Pines Loves Texas Tortillas</h2>
          <p className="text-charcoal-700 leading-relaxed">Pembroke Pines' family-friendly suburbs have attracted many Texans seeking the Florida lifestyle. These families still crave the authentic taste of H-E-B tortillas for taco nights and family meals. Now they can get genuine Texas tortillas delivered right to their Broward County home.</p>
          <p className="text-charcoal-700 leading-relaxed mt-4">Whether you're hosting a family taco night, preparing breakfast tacos for the weekend, or simply craving authentic Tex-Mex flavors, our tortillas deliver that unmistakable Texas taste. Each tortilla is made with quality ingredients and traditional methods that have made H-E-B a household name across Texas.</p>
          <p className="text-charcoal-700 leading-relaxed mt-4">Our customers in Pembroke Pines tell us they love the convenience of having authentic Texas tortillas delivered right to their door. No more settling for grocery store alternatives when you can enjoy the real thing.</p>
        </section>
        <section className="bg-sunset-50 border-l-4 border-sunset-500 p-6 rounded-r-lg mb-12">
          <h2 className="text-xl font-bold text-charcoal-950 mb-2">Pembroke Pines Shipping Details</h2>
          <ul className="text-charcoal-700 space-y-2"><li><strong>Delivery Time:</strong> 2-3 business days</li><li><strong>Free Shipping:</strong> On orders over $45</li></ul>
        </section>
        <section className="my-12">
          <h2 className="text-3xl font-bold text-charcoal-950 mb-8">Our Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/products/corn-tortillas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100"><h3 className="text-xl font-bold text-charcoal-950 mb-2">Fresh Corn Tortillas</h3><p className="text-charcoal-700 text-sm mb-4">Authentic masa flavor, gluten-free, perfect for tacos and enchiladas.</p><span className="text-sunset-600 font-semibold">Shop Corn Tortillas →</span></Link>
            <Link href="/products/flour-tortillas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100"><h3 className="text-xl font-bold text-charcoal-950 mb-2">Premium Flour Tortillas</h3><p className="text-charcoal-700 text-sm mb-4">Soft and pliable, ideal for burritos, wraps, and quesadillas.</p><span className="text-sunset-600 font-semibold">Shop Flour Tortillas →</span></Link>
            <Link href="/products/butter-tortillas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-charcoal-100"><h3 className="text-xl font-bold text-charcoal-950 mb-2">Butter Tortillas</h3><p className="text-charcoal-700 text-sm mb-4">Rich, buttery flavor that elevates any dish. A Texas favorite.</p><span className="text-sunset-600 font-semibold">Shop Butter Tortillas →</span></Link>
          </div>
        </section>
        <section className="my-12 grid md:grid-cols-3 gap-6"><Link href="/guides/how-to-store-tortillas" className="bg-cream-100 p-6 rounded-lg hover:bg-cream-200 transition-colors"><h3 className="font-bold text-charcoal-950 mb-1">Storage Guide</h3><p className="text-sm text-charcoal-600">Keep tortillas fresh</p></Link><Link href="/guides/best-tortillas-for-every-dish" className="bg-cream-100 p-6 rounded-lg hover:bg-cream-200 transition-colors"><h3 className="font-bold text-charcoal-950 mb-1">Taco Guide</h3><p className="text-sm text-charcoal-600">Choose the right tortilla</p></Link><Link href="/recipes" className="bg-cream-100 p-6 rounded-lg hover:bg-cream-200 transition-colors"><h3 className="font-bold text-charcoal-950 mb-1">Recipes</h3><p className="text-sm text-charcoal-600">Tortilla inspiration</p></Link></section>
        
        <LocationFAQ city="Pembroke Pines" state="Florida" />
        <p className="text-sm text-charcoal-500 italic mt-8">Independent reseller. Not affiliated with or endorsed by H-E-B.</p>
        <section className="bg-charcoal-950 text-cream-50 p-8 rounded-lg mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Taste Texas in Pembroke Pines?</h2>
          <Link href="/shop" className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-lg font-bold transition-colors inline-block">Shop All Tortillas</Link>
        </section>
      </article>
    </div>
  )
}
