'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { trackAddToCart } from '@/lib/analytics';

interface TexMexExtraCardProps {
  product: Product;
}

// Category-specific accent colors
const getCategoryStyles = (productType: string | undefined) => {
  switch (productType) {
    case 'chips':
      return {
        badge: 'bg-amber-100 text-amber-700',
        border: 'hover:border-amber-400',
        label: 'Chips',
      };
    case 'salsa':
      return {
        badge: 'bg-sunset-100 text-sunset-700',
        border: 'hover:border-sunset-400',
        label: 'Salsa',
      };
    case 'seasoning':
      return {
        badge: 'bg-lime-100 text-lime-700',
        border: 'hover:border-lime-500',
        label: 'Seasoning',
      };
    case 'sauce':
      return {
        badge: 'bg-red-100 text-red-700',
        border: 'hover:border-red-400',
        label: 'Sauce',
      };
    default:
      return {
        badge: 'bg-gray-100 text-gray-700',
        border: 'hover:border-gray-400',
        label: 'Extra',
      };
  }
};

export const TexMexExtraCard: React.FC<TexMexExtraCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const styles = getCategoryStyles(product.productType);

  const handleAddToCart = () => {
    addItem({
      sku: product.sku,
      name: product.name,
      price: product.price,
      productType: product.productType,
      description: product.description,
      image: product.image,
    });

    trackAddToCart({
      productId: product.sku,
      name: product.name,
      price: product.price / 100,
      quantity: 1,
    });
  };

  return (
    <div className={`group relative bg-white rounded-xl overflow-hidden border border-gray-200 ${styles.border} shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full`}>
      {/* Image Container - Compact */}
      <div className="aspect-square relative overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

        {/* Category Badge */}
        <div className="absolute top-2 left-2 z-10">
          <span className={`inline-block px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase ${styles.badge} rounded-full`}>
            {styles.label}
          </span>
        </div>

        {/* Bundle Only Badge */}
        {product.bundleOnly && (
          <div className="absolute bottom-2 left-2 z-10">
            <span className="inline-block px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase bg-charcoal-800 text-white rounded-full">
              Bundle Only
            </span>
          </div>
        )}
      </div>

      {/* Image disclaimer */}
      <p className="text-[8px] text-gray-400 px-3 pt-1">
        *Image is illustrative
      </p>

      {/* Product Details - Compact */}
      <div className="p-3 flex flex-col flex-grow">
        {/* Name */}
        <h3 className="text-xs md:text-sm font-semibold leading-snug text-charcoal-950 group-hover:text-sunset-600 transition-colors line-clamp-2 mb-1">
          {product.name}
        </h3>

        {/* Description - truncated */}
        <p className="text-[10px] md:text-xs text-gray-500 line-clamp-2 mb-2 flex-grow">
          {product.description}
        </p>

        {/* Price + Button Row */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          <span className="text-sm md:text-base font-bold text-sunset-600">
            {formatPrice(product.price)}
          </span>
          {product.bundleOnly ? (
            <a
              href="#bundles"
              className="flex items-center gap-1 text-[10px] md:text-xs font-semibold px-2 md:px-3 py-1.5 md:py-2 rounded-lg bg-charcoal-800 text-white hover:bg-charcoal-700 transition-colors"
            >
              <span>Bundles</span>
            </a>
          ) : (
            <Button
              variant="cart"
              size="sm"
              onClick={handleAddToCart}
              className="flex items-center gap-1 text-[10px] md:text-xs font-semibold px-2 md:px-3 py-1.5 md:py-2 rounded-lg"
            >
              <ShoppingBag className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Add</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
