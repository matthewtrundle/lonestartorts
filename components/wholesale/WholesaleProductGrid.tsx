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
    <div className="space-y-2">
      {tortillaProducts.map((product: Product) => {
        const qty = quantities[product.sku] || 0;
        const wholesalePrice = getWholesalePrice(product.price, discountPercent);
        const isSelected = qty > 0;

        return (
          <div
            key={product.sku}
            className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all ${
              isSelected
                ? 'border-sunset-500 bg-sunset-50/50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Thumbnail */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="64px"
              />
              {hasTier && (
                <div className="absolute inset-0 flex items-start justify-end p-0.5">
                  <span className="px-1 py-px text-[8px] font-bold bg-green-600 text-white rounded">
                    -{discountPercent}%
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-charcoal-950 truncate">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500">
                {product.tortillaCount} ct &middot;{' '}
                {product.storage === 'refrigerated' ? 'Fridge' : 'Shelf'}
              </p>
              {/* Price */}
              <div className="flex items-baseline gap-1.5 mt-0.5">
                {hasTier ? (
                  <>
                    <span className="text-sm font-bold text-sunset-600">
                      {formatPrice(wholesalePrice)}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-bold text-charcoal-950">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      <Lock className="w-2.5 h-2.5 inline -mt-0.5" />
                      {formatPrice(getWholesalePrice(product.price, 10))} w/ 16+
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => onUpdateQuantity(product.sku, -1)}
                disabled={qty <= 0}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-300 hover:border-sunset-500 hover:bg-sunset-50 active:scale-95 transition-all disabled:opacity-25 disabled:cursor-not-allowed"
                aria-label={`Decrease ${product.name}`}
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className={`text-sm font-bold w-7 text-center ${isSelected ? 'text-sunset-600' : 'text-gray-400'}`}>
                {qty}
              </span>
              <button
                onClick={() => onUpdateQuantity(product.sku, 1)}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-300 hover:border-sunset-500 hover:bg-sunset-50 active:scale-95 transition-all"
                aria-label={`Increase ${product.name}`}
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
