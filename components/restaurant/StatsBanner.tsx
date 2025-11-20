'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Stat {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

const restaurantStats: Stat[] = [
  { value: '10000', label: 'Restaurants Served', suffix: '+' },
  { value: '60', label: 'Day Freshness', suffix: '-Day' },
  { value: '4.9', label: 'Rating', suffix: '★' }
];

function AnimatedNumber({ target, suffix = '', prefix = '' }: { target: string; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const numericTarget = parseInt(target.replace(/[^0-9.]/g, ''));
  const isDecimal = target.includes('.');

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = numericTarget / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [numericTarget]);

  return (
    <span>
      {prefix}
      {isDecimal ? target : count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-r from-sunset-600 via-sunset-700 to-masa-600 py-6 md:py-8 overflow-hidden"
    >
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="stats-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#stats-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center text-white">
          {restaurantStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="text-4xl md:text-5xl font-display font-bold mb-1">
                <AnimatedNumber
                  target={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </div>
              <div className="text-sm md:text-base opacity-90 font-medium tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </motion.div>
  );
}
