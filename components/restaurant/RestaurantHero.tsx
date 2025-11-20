'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { WaveDivider } from '@/components/svg/WaveDivider';
import { ScrollIndicator } from '@/components/svg/ScrollIndicator';

interface RestaurantHeroProps {
  headline: string;
  subhead: string;
  image: string;
  cta: string;
}

export function RestaurantHero({ headline, subhead, image, cta }: RestaurantHeroProps) {
  return (
    <section className="relative h-[40vh] md:h-[50vh] min-h-[400px] overflow-hidden bg-charcoal-950">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={headline}
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/80 via-charcoal-950/60 to-charcoal-950/90" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 leading-tight"
            >
              {headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl md:text-2xl text-sunset-500 font-semibold mb-6"
            >
              {subhead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href="#products"
                className="inline-flex items-center gap-2 bg-sunset-600 text-white px-6 py-3 rounded-lg font-semibold text-base tracking-wide hover:bg-sunset-700 hover:shadow-lg transition-all transform hover:scale-105"
              >
                {cta}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <ScrollIndicator targetId="products" />

      {/* Wave Divider */}
      <WaveDivider color="#FEFDFB" />
    </section>
  );
}
