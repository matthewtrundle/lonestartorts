'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag, Lock, Unlock } from 'lucide-react';
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
  const [showCelebration, setShowCelebration] = useState(false);

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

  // Tier lock state
  const minimumPacks = tier.packsPerMonth;
  const isUnlocked = totalPacks >= minimumPacks;
  const packsRemaining = Math.max(0, minimumPacks - totalPacks);
  const progressPercent = Math.min(100, Math.round((totalPacks / minimumPacks) * 100));

  // Detect locked → unlocked transition for celebration
  const wasLockedRef = useRef(true);
  useEffect(() => {
    if (isUnlocked && wasLockedRef.current) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 2000);
      return () => clearTimeout(timer);
    }
    wasLockedRef.current = !isUnlocked;
  }, [isUnlocked]);

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
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
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

          {/* Lock/Unlock Indicator */}
          <div className="mt-3">
            {isUnlocked ? (
              <p className="text-sm font-medium text-green-600 flex items-center gap-1.5">
                <Unlock className="w-4 h-4" />
                {tier.discountPercent}% discount unlocked!
              </p>
            ) : (
              <p className="text-sm font-medium text-amber-600 flex items-center gap-1.5">
                <Lock className="w-4 h-4" />
                Add {packsRemaining} more pack{packsRemaining !== 1 ? 's' : ''} to unlock {tier.discountPercent}% discount
              </p>
            )}
          </div>
        </div>

        {/* Progress Bar - Non-scrolling */}
        <div className="px-6 pt-4 pb-2">
          {/* Celebration Banner */}
          {showCelebration && (
            <div className="mb-3 py-2 px-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <span className="text-sm font-bold text-green-700">
                Discount Unlocked!
              </span>
            </div>
          )}

          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isUnlocked
                  ? `bg-green-500 ${showCelebration ? 'animate-pulse' : ''}`
                  : 'bg-amber-400'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-gray-500">
              {totalPacks} / {minimumPacks} packs
            </span>
            <span className="text-xs text-gray-500">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-6 pt-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tortillaProducts.map((product) => {
              const qty = quantities[product.sku] || 0;
              const wholesalePrice = getWholesalePrice(product.price, tier.discountPercent);

              return (
                <div
                  key={product.sku}
                  className={`group border rounded-xl overflow-hidden transition-all duration-300 flex flex-col ${
                    qty > 0
                      ? 'border-sunset-500 bg-sunset-50 ring-1 ring-sunset-200'
                      : 'border-gray-200 hover:border-sunset-500 hover:shadow-lg'
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
                    <div className="absolute top-2 right-2 z-10">
                      <span className="inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-green-600 text-white rounded-full shadow-lg">
                        {tier.discountPercent}% OFF
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-3 flex flex-col flex-grow">
                    <h3 className="text-sm font-semibold text-charcoal-950 leading-tight group-hover:text-sunset-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {product.tortillaCount} count &middot; {product.storage === 'refrigerated' ? 'Refrigerated' : 'Shelf Stable'}
                    </p>

                    {/* Conditional Pricing */}
                    <div className="flex items-baseline gap-2 mt-2 mb-3">
                      {isUnlocked ? (
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
                            {formatPrice(wholesalePrice)} at {minimumPacks}+ packs
                          </span>
                        </>
                      )}
                    </div>

                    {/* Spacer */}
                    <div className="flex-grow" />

                    {/* Quantity Selector */}
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide">Packs</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(product.sku, -1)}
                            disabled={qty <= 0}
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-gray-300 hover:border-sunset-500 hover:bg-sunset-50 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label={`Decrease ${product.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-base font-bold w-8 text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.sku, 1)}
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
        </div>

        {/* Footer - Running Total */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-sm text-gray-600">
                {totalPacks} pack{totalPacks !== 1 ? 's' : ''} selected
              </span>
              {totalPacks > 0 && isUnlocked && (
                <span className="text-sm text-green-600 font-medium ml-3">
                  Saving {formatPrice(totals.savings)}
                </span>
              )}
              {totalPacks > 0 && !isUnlocked && (
                <span className="text-sm text-amber-600 font-medium ml-3">
                  Add {packsRemaining} more to save {formatPrice(totals.savings)}
                </span>
              )}
            </div>
            <div className="text-right">
              {totalPacks > 0 && (
                <span className="text-2xl font-bold text-charcoal-950">
                  {formatPrice(isUnlocked ? totals.wholesaleTotal : totals.retailTotal)}
                </span>
              )}
            </div>
          </div>

          {totalPacks === 0 ? (
            <Button
              variant="cart"
              size="lg"
              disabled
              className="w-full flex items-center justify-center gap-2"
            >
              Select Products to Continue
            </Button>
          ) : !isUnlocked ? (
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 bg-amber-500 text-white font-bold py-3 px-6 rounded-lg text-sm cursor-not-allowed"
            >
              <Lock className="w-5 h-5" />
              Add {packsRemaining} More to Unlock
            </button>
          ) : (
            <Button
              variant="cart"
              size="lg"
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Add {totalPacks} Pack{totalPacks !== 1 ? 's' : ''} to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
