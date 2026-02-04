'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChapterForm } from '@/components/campaigns/ChapterForm';
import { AlumniTierCard } from '@/components/campaigns/AlumniTierCard';
import { alumniTiers } from '@/lib/alumni-tiers';
import {
  Package,
  Truck,
  MapPin,
  Heart,
  Users,
  Calendar,
  Star,
  CheckCircle,
  ShoppingCart,
} from 'lucide-react';

const benefits = [
  {
    icon: MapPin,
    title: "Can't Get It Locally",
    description:
      "H-E-B doesn't exist outside Texas. We ship the tortillas you've been missing right to your door.",
  },
  {
    icon: Package,
    title: 'Freezes Perfectly',
    description:
      'Vacuum sealed for shipping. Pop them in the freezer and they thaw in minutes - taste just like fresh.',
  },
  {
    icon: Truck,
    title: 'Nationwide Shipping',
    description:
      'Free shipping on orders of 4+ packs. We deliver authentic Texas tortillas anywhere in the US.',
  },
  {
    icon: Heart,
    title: 'Taste of Home',
    description:
      'The same H-E-B tortillas you grew up with. Perfect for breakfast tacos, quesadillas, and more.',
  },
  {
    icon: Users,
    title: 'Chapter Discounts',
    description:
      'Ordering for your chapter? Get up to 20% off with our bulk pricing tiers.',
  },
  {
    icon: Calendar,
    title: 'Event Ready',
    description:
      'From watch parties to formals, we help chapters across the country bring Texas to their events.',
  },
];

const testimonials = [
  {
    quote: "Finally found a way to make real breakfast tacos in NYC. My roommates from California don't understand, but my Texas friends get it.",
    author: 'Sarah M.',
    location: 'UT Austin \'19, now in New York',
  },
  {
    quote: 'Our Denver alumni chapter orders every month for our watch parties. Nothing brings Longhorns together like good tortillas.',
    author: 'Mike T.',
    location: 'Phi Gamma Delta Alumni - Denver',
  },
  {
    quote: "I didn't realize how much I missed H-E-B tortillas until I moved to Seattle. These are exactly what I remember.",
    author: 'Jessica L.',
    location: 'UT Austin \'17, now in Seattle',
  },
];

const faqs = [
  {
    question: 'Why would I order tortillas online?',
    answer:
      "If you're a Texan living outside Texas, you know the struggle. H-E-B doesn't exist in other states, and grocery store tortillas just aren't the same. We ship authentic H-E-B tortillas nationwide so you can make real Texas tacos wherever you live.",
  },
  {
    question: 'How do I get the chapter discount?',
    answer:
      "Fill out the chapter inquiry form and we'll create a custom discount code for your chapter. The more you order, the bigger the discount - up to 20% off for large events. Codes can be reused for recurring orders.",
  },
  {
    question: 'How long do the tortillas last?',
    answer:
      'Our tortillas are vacuum sealed for shipping. Keep them in the freezer for months, or in the pantry for 2-3 weeks. They thaw quickly and taste just as fresh.',
  },
  {
    question: 'What if I just want tortillas for myself?',
    answer:
      "No chapter, no problem! Head to our shop to order individual packs. Free shipping on all orders!",
  },
  {
    question: 'Do you ship to Alaska and Hawaii?',
    answer:
      'Yes! We ship to all 50 states. Shipping to Alaska and Hawaii may take a few extra days, but we got you covered.',
  },
  {
    question: 'Can I order different types of tortillas?',
    answer:
      'Absolutely. We carry flour tortillas (the classic), butter flour tortillas (the Texas favorite for breakfast tacos), and wheat tortillas. Mix and match to your heart\'s content.',
  },
];

export default function HookEmTortillasPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'UT Longhorn Tortillas - Shipped Nationwide',
    description:
      'H-E-B tortillas shipped to University of Texas alumni living outside Texas. Perfect for UT chapter events, Longhorn watch parties, and homesick Horns.',
    url: 'https://lonestartortillas.com/hook-em-tortillas',
    publisher: {
      '@type': 'Organization',
      name: 'Lonestar Tortillas',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-cream-50 pt-24">
        {/* Campaign Banner - Tortas for the Tip-Off (UT Basketball) */}
        <div className="relative bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 text-white overflow-hidden border-b-4 border-orange-800">
          {/* Animated shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />

          {/* Basketball pattern background */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-1 left-[5%] text-4xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>🏀</div>
            <div className="absolute top-2 left-[25%] text-2xl animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '2.5s' }}>🏀</div>
            <div className="absolute bottom-1 right-[10%] text-3xl animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '2.2s' }}>🏀</div>
            <div className="absolute top-1/2 right-[30%] text-2xl animate-bounce" style={{ animationDelay: '0.9s', animationDuration: '2.8s' }}>🏀</div>
            <div className="absolute bottom-2 left-[40%] text-xl animate-bounce" style={{ animationDelay: '1.2s', animationDuration: '2.3s' }}>🏀</div>
          </div>

          <div className="container mx-auto px-4 py-5 md:py-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-center">
              {/* Basketball icon with glow */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/25 backdrop-blur-sm shadow-lg shadow-orange-900/30 animate-pulse">
                <span className="text-3xl">🏀</span>
              </div>

              {/* Campaign text */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-amber-200 text-lg">★</span>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight drop-shadow-lg">
                    Tortas for the Tip-Off
                  </h2>
                  <span className="text-amber-200 text-lg">★</span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-sm md:text-base">
                  <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full font-semibold">
                    🚚 FREE Shipping
                  </span>
                  <span className="inline-flex items-center gap-1 bg-green-500/80 backdrop-blur-sm px-3 py-1 rounded-full font-semibold">
                    🎉 Extra 5% Off All Tiers
                  </span>
                </div>
              </div>

              {/* CTA with animation */}
              <a
                href="#pricing"
                className="mt-2 md:mt-0 md:ml-4 inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-amber-50 px-6 py-3 rounded-full text-base font-bold transition-all hover:scale-105 shadow-lg"
              >
                Shop Now
                <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Hero Section - Burnt Orange Theme */}
        <section className="text-white py-16 md:py-24 overflow-hidden relative">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/campaigns/hero-hook-em.webp"
              alt="Texas sunset skyline"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 via-orange-800/70 to-transparent" />
          </div>

          {/* Texas star pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-8xl">★</div>
            <div className="absolute bottom-20 right-20 text-6xl">★</div>
            <div className="absolute top-1/2 left-1/4 text-4xl">★</div>
          </div>

          <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-6">
                For UT Longhorns Living Outside Texas
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Hook &apos;em, Hungry Horns!
                <br />
                <span className="text-amber-200">Texas Tortillas, Shipped Nationwide</span>
              </h1>
              <p className="text-xl text-white/90 mb-8">
                You left Austin, but your taste for real tortillas didn&apos;t. H-E-B doesn&apos;t exist where you live now.
                We ship authentic Texas tortillas to Longhorns nationwide - perfect for chapter events, watch parties, and homesick alumni.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-bold hover:bg-cream-50 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Shop Individual Packs
                </Link>
                <a
                  href="#chapter-form"
                  className="inline-flex items-center gap-2 bg-orange-700 hover:bg-orange-800 text-white px-8 py-4 rounded-lg font-medium transition-colors"
                >
                  Request Chapter Pricing
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="bg-white py-6 border-b border-gray-200">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-sm text-charcoal-700">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-orange-500" />
                <span className="font-medium">Free Shipping at 4+ Packs</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-orange-500" />
                <span className="font-medium">Up to 20% Chapter Discount</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-orange-500" />
                <span className="font-medium">Ships to All 50 States</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section id="pricing" className="py-16 bg-white scroll-mt-24">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-950 mb-4">
                Chapter Event Pricing
              </h2>
              <p className="text-lg text-charcoal-700 max-w-2xl mx-auto">
                Ordering for your chapter? The more you order, the more you save.
                Perfect for watch parties, tailgates, formals, and more.
              </p>
            </div>

            {/* Tier Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {alumniTiers.map((tier) => (
                <AlumniTierCard key={tier.id} tier={tier} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-charcoal-600 mb-4">
                Need a custom volume or have special requests?
              </p>
              <a
                href="#chapter-form"
                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold underline underline-offset-4"
              >
                Request a Custom Quote
              </a>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 bg-cream-50">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-950 mb-4">
                Why UT Longhorns Order From Us
              </h2>
              <p className="text-lg text-charcoal-700 max-w-2xl mx-auto">
                We solve a problem only Longhorns living outside Texas understand.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="p-6 bg-white rounded-xl shadow-sm">
                  <benefit.icon className="w-10 h-10 text-orange-600 mb-4" />
                  <h3 className="text-xl font-bold text-charcoal-950 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-charcoal-700">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-orange-600 text-white">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Fellow Longhorns Are Saying
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <p className="text-white/90 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-white/70 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chapter Inquiry Form */}
        <section id="chapter-form" className="py-16 bg-cream-50 scroll-mt-24">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-950 mb-4">
                Request Chapter Pricing
              </h2>
              <p className="text-lg text-charcoal-700 max-w-2xl mx-auto">
                Tell us about your chapter and event, and we&apos;ll set you up with
                a custom discount code. Perfect for recurring orders.
              </p>
            </div>
            <ChapterForm />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-charcoal-950 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group border border-charcoal-200 rounded-lg overflow-hidden bg-cream-50"
                  open={index === 0}
                >
                  <summary className="w-full flex items-center justify-between p-5 text-left cursor-pointer list-none">
                    <span className="font-semibold text-charcoal-950 pr-4">
                      {faq.question}
                    </span>
                    <svg
                      className="w-5 h-5 text-charcoal-600 flex-shrink-0 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="p-5 pt-0 border-t border-charcoal-200">
                    <p className="text-charcoal-700">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-amber-500 text-white">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Real Texas Tortillas?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of UT Longhorns who&apos;ve brought a taste of Austin to their new city.
              Your breakfast tacos will thank you. Hook &apos;em! 🤘
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-bold hover:bg-cream-50 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Shop Now
              </Link>
              <a
                href="#chapter-form"
                className="inline-flex items-center gap-2 bg-orange-700 hover:bg-orange-800 text-white px-8 py-4 rounded-lg font-bold transition-colors"
              >
                Get Chapter Discount
              </a>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="py-8 bg-cream-50">
          <p className="text-sm text-charcoal-500 italic text-center max-w-2xl mx-auto px-4">
            Independent reseller. Not affiliated with or endorsed by the University of Texas or H-E-B.
            &quot;Hook &apos;em&quot; is used colloquially and is not intended to imply official affiliation.
          </p>
        </div>
      </main>
    </>
  );
}
