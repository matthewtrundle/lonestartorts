'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Truck, Package, Clock } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ProductCard } from '@/components/product/ProductCard';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Logo, LogoFull } from '@/components/ui/Logo';
import { useScrollAnimation, useParallaxScroll } from '@/hooks/useScrollAnimation';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

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
  const { scrollY } = useScroll();

  // Parallax transforms
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  // Scroll animations
  const heroSection = useScrollAnimation({ threshold: 0.2 });
  const valueProps = useScrollAnimation({ threshold: 0.3 });
  const productsSection = useScrollAnimation({ threshold: 0.2 });
  const storySection = useScrollAnimation({ threshold: 0.3 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCheckout = async (sku: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ sku, quantity: 1 }] }),
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
    <>
      <LoadingScreen />

      <main className="flex-1 bg-white overflow-x-hidden">
        {/* Premium Header with Logo */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`fixed top-0 z-50 w-full transition-all duration-500 ${
            isScrolled ? 'bg-white/95 backdrop-blur-md shadow-subtle' : 'bg-transparent'
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-12">
            <div className="flex justify-between items-center h-24">
              <LogoFull className={isScrolled ? 'text-black' : 'text-white'} animated />

              <nav className="hidden md:flex items-center space-x-12">
                {['Products', 'Story', 'Track'].map((item, i) => (
                  <motion.a
                    key={item}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    href={item === 'Track' ? '/track' : `#${item.toLowerCase()}`}
                    className={`text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:scale-105 ${
                      isScrolled ? 'text-black hover:text-gray-dark' : 'text-white hover:text-white/80'
                    }`}
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  onClick={() => window.location.href = '/track'}
                  className={`px-8 py-3 text-sm tracking-widest uppercase transition-all duration-500 hover:scale-105 ${
                    isScrolled ? 'bg-black text-white hover:bg-charcoal' : 'bg-white text-black hover:bg-white/90'
                  }`}
                >
                  Order Now
                </motion.button>
              </nav>
            </div>
          </div>
        </motion.header>

        {/* Hero Section with Parallax */}
        <section ref={heroSection.ref} className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            style={{ y: heroY, scale: heroScale }}
            className="absolute inset-0"
          >
            <motion.div
              style={{ opacity: heroOpacity }}
              className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60 z-10"
            />
            <div className="absolute inset-0 bg-black">
              <Image
                src="/images/hero-banner.webp"
                alt="Texas Tortillas"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
            className="relative z-20 text-center text-white max-w-4xl mx-auto px-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-6"
            >
              Texas Tortillas
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-xl md:text-2xl font-light tracking-wider mb-12 opacity-90"
            >
              Shipped anywhere the salsa flows
            </motion.p>
            <motion.a
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#products"
              className="inline-block px-12 py-4 border-2 border-white text-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500"
            >
              Shop Collection
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Value Props with Stagger Animation */}
        <section ref={valueProps.ref} className="py-24 bg-off-white">
          <div className="max-w-[1440px] mx-auto px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { icon: Package, title: 'Authentic Texas', desc: 'Genuine tortillas from the heart of Texas, delivered nationwide' },
                { icon: Truck, title: 'Fresh Delivery', desc: '2-3 day shipping ensures maximum freshness to your door' },
                { icon: Clock, title: 'Shelf Stable', desc: 'No refrigeration needed, maintaining quality and convenience' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={valueProps.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="mb-6"
                  >
                    <item.icon className="h-8 w-8 mx-auto stroke-1" />
                  </motion.div>
                  <h3 className="text-xs font-medium tracking-widest uppercase mb-4">{item.title}</h3>
                  <p className="text-gray-dark font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section with Reveal Animation */}
        <section id="products" ref={productsSection.ref} className="py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={productsSection.isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl font-light mb-4">Our Collection</h2>
              <p className="text-gray-dark text-lg font-light">
                Curated tortillas for the discerning palate
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.sku}
                  initial={{ opacity: 0, y: 50 }}
                  animate={productsSection.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.3, duration: 0.8 }}
                >
                  <ProductCard
                    {...product}
                    onAddToOrder={handleCheckout}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section with Parallax Image */}
        <section id="story" ref={storySection.ref} className="py-24 bg-off-white">
          <div className="max-w-[1440px] mx-auto px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={storySection.isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="order-2 lg:order-1"
              >
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
                <motion.a
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  href="#products"
                  className="inline-block text-sm font-medium tracking-widest uppercase border-b-2 border-black pb-1 hover:border-gray-dark transition-colors duration-300"
                >
                  Explore Products →
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={storySection.isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="order-1 lg:order-2"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="aspect-[4/5] relative overflow-hidden rounded-sm"
                >
                  <Image
                    src="/images/flour-tortillas.webp"
                    alt="Premium Tortillas"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <DisclaimerBanner />

        {/* Footer remains the same but with fade-in animation */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-black text-white py-16"
        >
          <div className="max-w-[1440px] mx-auto px-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <LogoFull className="text-white mb-4" />
                <p className="text-gray font-light text-sm leading-relaxed">
                  Texas tortillas, shipped anywhere the salsa flows.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-medium tracking-widest uppercase mb-6">Shop</h4>
                <ul className="space-y-3">
                  {['All Products', 'Corn Tortillas', 'Flour Tortillas'].map((item) => (
                    <li key={item}>
                      <a href="#products" className="text-gray hover:text-white text-sm font-light transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-medium tracking-widest uppercase mb-6">Customer Care</h4>
                <ul className="space-y-3">
                  {['Track Order', 'Shipping Info', 'Contact'].map((item) => (
                    <li key={item}>
                      <a href={item === 'Track Order' ? '/track' : '#'} className="text-gray hover:text-white text-sm font-light transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
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
        </motion.footer>
      </main>
    </>
  );
}