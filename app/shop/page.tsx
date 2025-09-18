'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Logo } from '@/components/ui/Logo';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'Mi Tienda Corn',
    category: 'Traditional',
    price: '$4.99',
    image: '/images/corn-tortillas.webp',
    description: 'Authentic stone-ground corn'
  },
  {
    id: 2,
    name: 'Butter Flour',
    category: 'Premium',
    price: '$5.99',
    image: '/images/flour-tortillas.webp',
    description: 'Soft, buttery perfection'
  },
  {
    id: 3,
    name: 'Artisan Blend',
    category: 'Specialty',
    price: '$7.99',
    image: '/images/product-hero.webp',
    description: 'Heritage recipe blend'
  },
  {
    id: 4,
    name: 'Texas Original',
    category: 'Traditional',
    price: '$4.99',
    image: '/images/tortilla-stack.webp',
    description: 'Classic Texas style'
  }
];

export default function ShopPage() {
  return (
    <main className="bg-[#f5f2ed] min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-sm">
        <div className="flex justify-between items-center px-12 py-8">
          <Link href="/">
            <Logo className="text-black" size="sm" />
          </Link>
          <div className="flex gap-12 text-black text-sm tracking-[0.2em] uppercase">
            <a href="/shop" className="border-b-2 border-black">Shop</a>
            <a href="/craft" className="hover:opacity-70 transition-opacity">Craft</a>
            <a href="/story" className="hover:opacity-70 transition-opacity">Story</a>
            <a href="/order" className="hover:opacity-70 transition-opacity">Order</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10vw] font-bold text-center leading-[0.9]"
        >
          SHOP
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm tracking-[0.3em] uppercase mt-8"
        >
          Premium tortillas, delivered fresh
        </motion.p>
      </section>

      {/* Product Grid */}
      <section className="px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                    {product.category}
                  </p>
                  <h3 className="text-3xl font-bold mt-2">{product.name}</h3>
                  <p className="text-gray-600 mt-2">{product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-2xl">{product.price}</p>
                    <button className="px-6 py-2 bg-black text-white text-xs uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}