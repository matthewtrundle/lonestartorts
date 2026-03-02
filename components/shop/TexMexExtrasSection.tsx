'use client';

import React, { useState, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { TexMexExtraCard } from './TexMexExtraCard';
import { products } from '@/lib/products';

type CategoryFilter = 'all' | 'chips' | 'salsa' | 'seasoning' | 'sauce';

interface CategoryTab {
  id: CategoryFilter;
  label: string;
  color: string;
  activeColor: string;
}

const categoryTabs: CategoryTab[] = [
  { id: 'all', label: 'All', color: 'bg-gray-100 text-gray-700', activeColor: 'bg-charcoal-900 text-white' },
  { id: 'chips', label: 'Chips', color: 'bg-amber-50 text-amber-700', activeColor: 'bg-amber-500 text-white' },
  { id: 'salsa', label: 'Salsas', color: 'bg-sunset-50 text-sunset-700', activeColor: 'bg-sunset-500 text-white' },
  { id: 'seasoning', label: 'Seasonings', color: 'bg-lime-50 text-lime-700', activeColor: 'bg-lime-600 text-white' },
  { id: 'sauce', label: 'Sauces', color: 'bg-red-50 text-red-700', activeColor: 'bg-red-500 text-white' },
];

export const TexMexExtrasSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  // Get all extras products (chips, salsa, seasoning, sauce)
  const extrasProducts = useMemo(() => {
    return products.filter(p =>
      p.productType === 'chips' ||
      p.productType === 'salsa' ||
      p.productType === 'seasoning' ||
      p.productType === 'sauce'
    );
  }, []);

  // Filter by selected category
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return extrasProducts;
    }
    return extrasProducts.filter(p => p.productType === activeCategory);
  }, [extrasProducts, activeCategory]);

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-lime-100 text-lime-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Sparkles className="w-4 h-4" />
            Complete Your Meal
          </div>
          <h2 className="text-xl md:text-3xl font-bold text-charcoal-950 mb-2">
            Tex-Mex Extras
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Chips, salsas, seasonings, and sauces to complete your Texas kitchen
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8">
          {categoryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 ${
                activeCategory === tab.id
                  ? tab.activeColor
                  : `${tab.color} hover:opacity-80`
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {filteredProducts.map((product) => (
            <TexMexExtraCard key={product.sku} product={product} />
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No products found in this category.
          </div>
        )}

        {/* Cross-sell message */}
        <div className="mt-6 md:mt-8 text-center">
          <p className="text-xs md:text-sm text-gray-500">
            Add extras to any order for the complete Tex-Mex experience!
          </p>
        </div>
      </div>
    </section>
  );
};
