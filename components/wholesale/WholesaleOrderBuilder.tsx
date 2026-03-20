'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useCart } from '@/lib/cart-context';
import { getTortillaProducts, getWholesaleSku } from '@/lib/products';
import {
  getTierForPackCount,
  getWholesalePrice,
  wholesaleTiers,
} from '@/lib/wholesale-tiers';
import { WholesaleTierStepper } from './WholesaleTierStepper';
import { WholesaleQuickStart } from './WholesaleQuickStart';
import { WholesaleProductGrid } from './WholesaleProductGrid';
import { WholesaleOrderSummary } from './WholesaleOrderSummary';

export const WholesaleOrderBuilder: React.FC = () => {
  const { addItem, setIsOpen } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [showCelebration, setShowCelebration] = useState(false);

  const tortillaProducts = useMemo(() => getTortillaProducts(), []);

  // Derived state
  const totalPacks = Object.values(quantities).reduce((sum, q) => sum + q, 0);
  const currentTier = getTierForPackCount(totalPacks);
  const currentTierIndex = currentTier
    ? wholesaleTiers.findIndex((t) => t.id === currentTier.id)
    : -1;
  const nextTier =
    currentTierIndex < wholesaleTiers.length - 1
      ? wholesaleTiers[currentTierIndex + 1]
      : null;

  const discountPercent = currentTier?.discountPercent || 0;

  // Calculate totals
  const totals = useMemo(() => {
    let wholesaleTotal = 0;
    let retailTotal = 0;
    for (const product of tortillaProducts) {
      const qty = quantities[product.sku] || 0;
      if (qty > 0) {
        wholesaleTotal += getWholesalePrice(product.price, discountPercent) * qty;
        retailTotal += product.price * qty;
      }
    }
    return {
      wholesaleTotal,
      retailTotal,
      savings: retailTotal - wholesaleTotal,
    };
  }, [quantities, discountPercent, tortillaProducts]);

  // Celebrate tier unlock transitions
  const prevTierRef = useRef<string | null>(null);
  useEffect(() => {
    const currentTierId = currentTier?.id || null;
    if (
      currentTierId &&
      prevTierRef.current !== currentTierId &&
      prevTierRef.current !== null
    ) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 2500);
      return () => clearTimeout(timer);
    }
    if (currentTierId && prevTierRef.current === null && totalPacks >= 16) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 2500);
      prevTierRef.current = currentTierId;
      return () => clearTimeout(timer);
    }
    prevTierRef.current = currentTierId;
  }, [currentTier, totalPacks]);

  const applyPreset = (presetQuantities: Record<string, number>) => {
    setQuantities(presetQuantities);
  };

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

  const handleAddToCart = () => {
    if (!currentTier) return;

    for (const product of tortillaProducts) {
      const qty = quantities[product.sku] || 0;
      if (qty > 0) {
        const wholesalePrice = getWholesalePrice(product.price, currentTier.discountPercent);
        addItem(
          {
            sku: getWholesaleSku(product.sku),
            name: `Wholesale ${product.name}`,
            price: wholesalePrice,
            productType: 'wholesale',
            description: `${currentTier.discountPercent}% wholesale discount`,
            image: product.image,
          },
          qty
        );
      }
    }

    setQuantities({});
    setIsOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Celebration Banner */}
      {showCelebration && currentTier && (
        <div className="animate-pulse py-3 px-6 bg-green-50 border border-green-200 rounded-xl text-center">
          <span className="text-sm font-bold text-green-700">
            {currentTier.name} Tier Unlocked — {currentTier.discountPercent}% Off All Products!
          </span>
        </div>
      )}

      {/* Tier Stepper */}
      <WholesaleTierStepper totalPacks={totalPacks} currentTier={currentTier} />

      {/* Quick Start Presets */}
      <WholesaleQuickStart onApplyPreset={applyPreset} />

      {/* Product Grid + Sidebar Layout */}
      <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-8">
        <WholesaleProductGrid
          quantities={quantities}
          currentTier={currentTier}
          onUpdateQuantity={updateQuantity}
        />

        <WholesaleOrderSummary
          quantities={quantities}
          totalPacks={totalPacks}
          currentTier={currentTier}
          nextTier={nextTier}
          totals={totals}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
};
