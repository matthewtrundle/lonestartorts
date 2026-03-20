'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { getTortillaProducts, getWholesaleSku } from '@/lib/products';
import { WholesaleTier, getWholesalePrice } from '@/lib/wholesale-tiers';

interface WholesaleProductPickerProps {
  tier: WholesaleTier;
  onClose: () => void;
}

export const WholesaleProductPicker: React.FC<WholesaleProductPickerProps> = ({
  tier,
  onClose,
}) => {
  const { addItem, setIsOpen } = useCart();
  const tortillaProducts = useMemo(() => getTortillaProducts(), []);

  // Track quantity per product SKU
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const updateQuantity = (sku: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[sku] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [sku]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [sku]: next };
    });
  };

  const totalPacks = Object.values(quantities).reduce((sum, q) => sum + q, 0);

  const totals = useMemo(() => {
    let wholesaleTotal = 0;
    let retailTotal = 0;
    for (const product of tortillaProducts) {
      const qty = quantities[product.sku] || 0;
      if (qty > 0) {
        wholesaleTotal += getWholesalePrice(product.price, tier.discountPercent) * qty;
        retailTotal += product.price * qty;
      }
    }
    return {
      wholesaleTotal,
      retailTotal,
      savings: retailTotal - wholesaleTotal,
    };
  }, [quantities, tier.discountPercent, tortillaProducts]);

  const handleAddToCart = () => {
    for (const product of tortillaProducts) {
      const qty = quantities[product.sku] || 0;
      if (qty > 0) {
        const wholesalePrice = getWholesalePrice(product.price, tier.discountPercent);
        addItem(
          {
            sku: getWholesaleSku(product.sku),
            name: `Wholesale ${product.name}`,
            price: wholesalePrice,
            productType: 'wholesale',
            description: `${tier.discountPercent}% wholesale discount`,
            image: product.image,
          },
          qty
        );
      }
    }
    onClose();
    setIsOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-charcoal-950">
              Build Your {tier.name} Order
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {tier.discountPercent}% off all products &middot; Select your tortilla mix
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tortillaProducts.map((product) => {
              const qty = quantities[product.sku] || 0;
              const wholesalePrice = getWholesalePrice(product.price, tier.discountPercent);

              return (
                <div
                  key={product.sku}
                  className={`border rounded-xl p-4 transition-all ${
                    qty > 0
                      ? 'border-sunset-500 bg-sunset-50 ring-1 ring-sunset-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Product Image & Info */}
                  <div className="flex gap-3 mb-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-charcoal-950 leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {product.tortillaCount} count &middot; {product.storage === 'refrigerated' ? 'Refrigerated' : 'Shelf Stable'}
                      </p>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-lg font-bold text-sunset-600">
                      {formatPrice(wholesalePrice)}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-green-600 font-medium">
                      Save {formatPrice(product.price - wholesalePrice)}
                    </span>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Packs</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(product.sku, -1)}
                        disabled={qty <= 0}
                        className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-300 hover:border-sunset-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label={`Decrease ${product.name}`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-base font-bold w-8 text-center">
                        {qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.sku, 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-300 hover:border-sunset-500 transition-all"
                        aria-label={`Increase ${product.name}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer - Running Total */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-sm text-gray-600">
                {totalPacks} pack{totalPacks !== 1 ? 's' : ''} selected
              </span>
              {totalPacks > 0 && (
                <span className="text-sm text-green-600 font-medium ml-3">
                  Saving {formatPrice(totals.savings)}
                </span>
              )}
            </div>
            <div className="text-right">
              {totalPacks > 0 && (
                <span className="text-2xl font-bold text-charcoal-950">
                  {formatPrice(totals.wholesaleTotal)}
                </span>
              )}
            </div>
          </div>

          <Button
            variant="cart"
            size="lg"
            onClick={handleAddToCart}
            disabled={totalPacks === 0}
            className="w-full flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalPacks === 0
              ? 'Select Products to Continue'
              : `Add ${totalPacks} Pack${totalPacks !== 1 ? 's' : ''} to Cart`}
          </Button>
        </div>
      </div>
    </div>
  );
};
