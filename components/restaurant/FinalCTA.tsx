'use client';

import { motion } from 'framer-motion';

interface FinalCTAProps {
  headline: string;
  subhead: string;
  buttonText: string;
}

export function FinalCTA({ headline, subhead, buttonText }: FinalCTAProps) {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-sunset-600 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sunset-600 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4"
          >
            {headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-cream-100 mb-8"
          >
            {subhead}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={scrollToProducts}
            className="inline-flex items-center gap-2 bg-sunset-600 text-white px-8 py-4 rounded-lg font-bold text-lg tracking-wide hover:bg-sunset-700 hover:shadow-xl transition-all transform hover:scale-105"
          >
            {buttonText}
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.button>

          {/* Trust Badge */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm text-cream-200 mt-6"
          >
            ✓ Satisfaction Guaranteed &nbsp;&nbsp;|&nbsp;&nbsp; ✓ 2-3 Day Delivery &nbsp;&nbsp;|&nbsp;&nbsp; ✓ 60-Day Freshness
          </motion.p>
        </div>
      </div>
    </section>
  );
}
