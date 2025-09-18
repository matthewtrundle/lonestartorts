'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Truck, Package, Clock } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// Product data matching shared spec
const products = [
  {
    sku: 'TTC-MT-CORN-SS',
    name: 'Mi Tienda-style Corn Tortillas',
    price: 4.99,
    image: '/images/corn-tortillas.webp',
    description: 'Authentic Texas corn tortillas with that perfect texture',
    storage: 'shelf_stable' as const,
  },
  {
    sku: 'TTC-BUTTER-FLOUR',
    name: 'Butter Flour Tortillas (Family Pack)',
    price: 5.99,
    image: '/images/flour-tortillas.webp',
    description: 'Soft, buttery flour tortillas perfect for the whole family',
    storage: 'shelf_stable' as const,
  },
];

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCheckout = async (sku: string) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{ sku, quantity: 1 }],
        }),
      });

      const { sessionId } = await response.json();

      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error('Stripe error:', error);
          alert('Something went wrong. Please try again.');
        }
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Unable to process checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 bg-white">
      {/* Premium Minimal Header */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          isScrolled ? 'bg-white/95 backdrop-blur-xs shadow-subtle' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-12">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center">
              <h1 className="text-2xl font-light tracking-wider uppercase">
                Tortilla Rodeo Co.
              </h1>
            </div>

            <nav className="hidden md:flex items-center space-x-12">
              <a
                href="#products"
                className="text-sm font-medium tracking-widest uppercase text-black hover:text-gray-dark transition-colors duration-300"
              >
                Products
              </a>
              <a
                href="#story"
                className="text-sm font-medium tracking-widest uppercase text-black hover:text-gray-dark transition-colors duration-300"
              >
                Our Story
              </a>
              <a
                href="/track"
                className="text-sm font-medium tracking-widest uppercase text-black hover:text-gray-dark transition-colors duration-300"
              >
                Track Order
              </a>
              <button
                onClick={() => window.location.href = '/track'}
                className="px-8 py-3 bg-black text-white text-sm tracking-widest uppercase hover:bg-charcoal transition-all duration-300"
              >
                Order Now
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Premium Hero Section - Full Screen */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 z-10" />

        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-8 animate-fade-up">
          <h2 className="font-display text-6xl md:text-6xl lg:text-6xl font-light leading-tight mb-6">
            Texas Tortillas
          </h2>
          <p className="text-xl md:text-2xl font-light tracking-wider mb-12 opacity-90">
            Shipped anywhere the salsa flows
          </p>
          <a
            href="#products"
            className="inline-block px-12 py-4 border-2 border-white text-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500"
          >
            Shop Collection
          </a>
        </div>

        {/* Background Pattern or Image */}
        <div className="absolute inset-0 bg-light-gray">
          {/* Add premium tortilla photography here */}
          <div className="w-full h-full bg-gradient-to-br from-medium-gray to-light-gray" />
        </div>
      </section>

      {/* Minimalist Value Props */}
      <section className="py-24 bg-off-white">
        <div className="max-w-[1440px] mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center">
              <div className="mb-6">
                <Package className="h-8 w-8 mx-auto stroke-1" />
              </div>
              <h3 className="text-xs font-medium tracking-widest uppercase mb-4">Authentic Texas</h3>
              <p className="text-gray-dark font-light leading-relaxed">
                Genuine tortillas from the heart of Texas, delivered nationwide
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <Truck className="h-8 w-8 mx-auto stroke-1" />
              </div>
              <h3 className="text-xs font-medium tracking-widest uppercase mb-4">Fresh Delivery</h3>
              <p className="text-gray-dark font-light leading-relaxed">
                2-3 day shipping ensures maximum freshness to your door
              </p>
            </div>

            <div className="text-center">
              <div className="mb-6">
                <Clock className="h-8 w-8 mx-auto stroke-1" />
              </div>
              <h3 className="text-xs font-medium tracking-widest uppercase mb-4">Shelf Stable</h3>
              <p className="text-gray-dark font-light leading-relaxed">
                No refrigeration needed, maintaining quality and convenience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Products Section */}
      <section id="products" className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-12">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-light mb-4">Our Collection</h2>
            <p className="text-gray-dark text-lg font-light">
              Curated tortillas for the discerning palate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <div
                key={product.sku}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard
                  {...product}
                  onAddToOrder={handleCheckout}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Story Section */}
      <section id="story" className="py-24 bg-off-white">
        <div className="max-w-[1440px] mx-auto px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="font-display text-3xl font-light mb-6">
                From Texas, With Pride
              </h3>
              <p className="text-gray-dark font-light leading-relaxed mb-6">
                Every tortilla tells a story of Texas tradition. We source authentic tortillas
                from the heart of the Lone Star State, ensuring each package carries the genuine
                taste that Texans have loved for generations.
              </p>
              <p className="text-gray-dark font-light leading-relaxed mb-8">
                Our commitment to quality means selecting only the finest tortillas,
                packaged with care and shipped fresh to preserve their authentic flavor
                and texture. Because great meals start with great ingredients.
              </p>
              <a
                href="#products"
                className="inline-block text-sm font-medium tracking-widest uppercase border-b-2 border-black pb-1 hover:border-gray-dark transition-colors duration-300"
              >
                Explore Products
              </a>
            </div>

            <div className="order-1 lg:order-2">
              <div className="aspect-[4/5] bg-medium-gray rounded-sm overflow-hidden">
                {/* Premium tortilla lifestyle image here */}
                <div className="w-full h-full bg-gradient-to-br from-light-gray to-medium-gray" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section - Subtle but Present */}
      <DisclaimerBanner />

      {/* Premium Minimal Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-[1440px] mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-medium tracking-widest uppercase mb-6">
                Tortilla Rodeo Co.
              </h3>
              <p className="text-gray font-light text-sm leading-relaxed">
                Texas tortillas, shipped anywhere the salsa flows.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-medium tracking-widest uppercase mb-6">Shop</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#products" className="text-gray hover:text-white text-sm font-light transition-colors">
                    All Products
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray hover:text-white text-sm font-light transition-colors">
                    Corn Tortillas
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray hover:text-white text-sm font-light transition-colors">
                    Flour Tortillas
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-medium tracking-widest uppercase mb-6">Customer Care</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/track" className="text-gray hover:text-white text-sm font-light transition-colors">
                    Track Order
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray hover:text-white text-sm font-light transition-colors">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray hover:text-white text-sm font-light transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-medium tracking-widest uppercase mb-6">Legal</h4>
              <p className="text-gray text-sm font-light leading-relaxed mb-4">
                Independent reseller. Not affiliated with or endorsed by H-E-B®.
              </p>
              <p className="text-gray text-xs font-light">
                © 2024 Tortilla Rodeo Co.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}