'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { Plus, Minus, Lock } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { getTortillaProducts, Product } from '@/lib/products';
import { WholesaleTier, getWholesalePrice } from '@/lib/wholesale-tiers';

interface WholesaleProductGridProps {
  quantities: Record<string, number>;
  currentTier: WholesaleTier | null;
  onUpdateQuantity: (sku: string, delta: number) => void;
}

export const WholesaleProductGrid: React.FC<WholesaleProductGridProps> = ({
  quantities,
  currentTier,
  onUpdateQuantity,
}) => {
  const tortillaProducts = useMemo(() => getTortillaProducts(), []);
  const discountPercent = currentTier?.discountPercent || 0;
  const hasTier = currentTier !== null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {tortillaProducts.map((product: Product) => {
        const qty = quantities[product.sku] || 0;
        const wholesalePrice = getWholesalePrice(product.price, discountPercent);
        const isSelected = qty > 0;

        return (
          <div
            key={product.sku}
            className={`group border rounded-xl overflow-hidden transition-all duration-300 flex flex-col ${
              isSelected
                ? 'border-sunset-500 bg-sunset-50 ring-1 ring-sunset-200'
                : 'border-gray-200 hover:border-sunset-400 hover:shadow-lg'
            }`}
          >
            {/* Product Image */}
            <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Discount Badge */}
              {hasTier && (
                <div className="absolute top-2 right-2 z-10">
                  <span className="inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-green-600 text-white rounded-full shadow-lg">
                    {discountPercent}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-3 flex flex-col flex-grow">
              <h3 className="text-sm font-semibold text-charcoal-950 leading-tight group-hover:text-sunset-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {product.tortillaCount} count &middot;{' '}
                {product.storage === 'refrigerated' ? 'Refrigerated' : 'Shelf Stable'}
              </p>

              {/* Conditional Pricing */}
              <div className="flex items-baseline gap-2 mt-2 mb-3">
                {hasTier ? (
                  <>
                    <span className="text-lg font-bold text-sunset-600">
                      {formatPrice(wholesalePrice)}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-green-600 font-medium">
                      Save {formatPrice(product.price - wholesalePrice)}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-lg font-bold text-charcoal-950">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-gray-400">
                      <Lock className="w-3 h-3 inline mr-0.5 -mt-0.5" />
                      {formatPrice(getWholesalePrice(product.price, 10))} at 16+ packs
                    </span>
                  </>
                )}
              </div>

              {/* Spacer */}
              <div className="flex-grow" />

              {/* Quantity Selector */}
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide">
                    Packs
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(product.sku, -1)}
                      disabled={qty <= 0}
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-gray-300 hover:border-sunset-500 hover:bg-sunset-50 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label={`Decrease ${product.name}`}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-base font-bold w-8 text-center">{qty}</span>
                    <button
                      onClick={() => onUpdateQuantity(product.sku, 1)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-gray-300 hover:border-sunset-500 hover:bg-sunset-50 active:scale-95 transition-all"
                      aria-label={`Increase ${product.name}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
