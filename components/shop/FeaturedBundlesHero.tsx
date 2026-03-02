'use client';

import React from 'react';
import { Package, Gift } from 'lucide-react';
import { BundleCard } from './BundleCard';
import { getAllBundles } from '@/lib/bundles';

export const FeaturedBundlesHero: React.FC = () => {
  const bundles = getAllBundles();

  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-cream-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 bg-sunset-100 text-sunset-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Gift className="w-4 h-4" />
            Care Packages
          </div>
          <h2 className="text-xl md:text-3xl font-bold text-charcoal-950 mb-2">
            Texas Care Packages
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Everything you need for authentic Tex-Mex meals, bundled together and shipped fresh.
            Perfect for gifts or stocking your own kitchen.
          </p>
        </div>

        {/* Desktop: 4-column grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {bundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>

        {/* Tablet: 2x2 grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-5">
          {bundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>

        {/* Mobile: Horizontal scroll carousel with snap */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
            {bundles.map((bundle) => (
              <div
                key={bundle.id}
                className="flex-shrink-0 w-[280px] snap-start"
              >
                <BundleCard bundle={bundle} />
              </div>
            ))}
          </div>
          {/* Scroll indicator dots */}
          <div className="flex justify-center gap-2 mt-3">
            {bundles.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300"
              />
            ))}
          </div>
        </div>

        {/* Trust message */}
        <div className="mt-6 md:mt-8 text-center">
          <p className="text-xs md:text-sm text-gray-500 flex items-center justify-center gap-2">
            <Package className="w-4 h-4" />
            All bundles include FREE shipping and arrive fresh within 2-3 days
          </p>
        </div>
      </div>
    </section>
  );
};
