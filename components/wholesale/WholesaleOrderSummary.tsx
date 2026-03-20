'use client';

import React, { useState } from 'react';
import {
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  Truck,
  Lock,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { WholesaleTier } from '@/lib/wholesale-tiers';
import { getTortillaProducts } from '@/lib/products';
import { WholesaleAuthGate } from './WholesaleAuthGate';

interface OrderTotals {
  wholesaleTotal: number;
  retailTotal: number;
  savings: number;
}

interface WholesaleCustomer {
  id: string;
  email: string;
  firstName: string | null;
  isWholesale: boolean;
}

interface WholesaleOrderSummaryProps {
  quantities: Record<string, number>;
  totalPacks: number;
  currentTier: WholesaleTier | null;
  nextTier: WholesaleTier | null;
  totals: OrderTotals;
  onAddToCart: () => void;
  customer: WholesaleCustomer | null;
  authChecked?: boolean;
  onAuthenticated: (customer: WholesaleCustomer) => void;
}

export const WholesaleOrderSummary: React.FC<WholesaleOrderSummaryProps> = ({
  quantities,
  totalPacks,
  currentTier,
  nextTier,
  totals,
  onAddToCart,
  customer,
  onAuthenticated,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAuthGate, setShowAuthGate] = useState(false);
  const hasTier = currentTier !== null;
  const packsToMinimum = Math.max(0, 16 - totalPacks);
  const packsToNext = nextTier ? nextTier.packsPerMonth - totalPacks : 0;

  // Get selected items for the collapsible list
  const tortillaProducts = getTortillaProducts();
  const selectedItems = tortillaProducts
    .filter((p) => (quantities[p.sku] || 0) > 0)
    .map((p) => ({ name: p.name, qty: quantities[p.sku] }));

  const displayTotal = hasTier ? totals.wholesaleTotal : totals.retailTotal;

  const isAuthenticated = !!customer;
  const canAddToCart = hasTier && totalPacks > 0;

  const handleCartClick = () => {
    if (!canAddToCart) return;
    if (isAuthenticated) {
      onAddToCart();
    } else {
      setShowAuthGate(true);
    }
  };

  // Render the action button area (shared between desktop and mobile)
  const renderDesktopAction = () => {
    if (totalPacks === 0) {
      return (
        <button
          disabled
          className="w-full flex items-center justify-center gap-2 bg-gray-300 text-gray-500 font-bold py-3.5 px-6 rounded-lg text-sm cursor-not-allowed"
        >
          Select Products to Continue
        </button>
      );
    }
    if (!hasTier) {
      return (
        <button
          disabled
          className="w-full flex items-center justify-center gap-2 bg-amber-500 text-white font-bold py-3.5 px-6 rounded-lg text-sm cursor-not-allowed"
        >
          <Lock className="w-4 h-4" />
          Add {packsToMinimum} More to Unlock
        </button>
      );
    }
    if (showAuthGate && !isAuthenticated) {
      return (
        <div className="space-y-3">
          <WholesaleAuthGate onAuthenticated={onAuthenticated} />
        </div>
      );
    }
    return (
      <button
        onClick={handleCartClick}
        className="w-full flex items-center justify-center gap-2 bg-sunset-500 hover:bg-sunset-600 text-white font-bold py-3.5 px-6 rounded-lg text-sm transition-colors active:scale-[0.98]"
      >
        <ShoppingBag className="w-5 h-5" />
        Add {totalPacks} Pack{totalPacks !== 1 ? 's' : ''} to Cart
      </button>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-28 bg-white rounded-xl border border-gray-200 shadow-lg p-6">
          {/* Authenticated User Badge */}
          {isAuthenticated && (
            <div className="mb-3 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5 font-medium">
              Signed in as {customer!.firstName || customer!.email}
            </div>
          )}

          {/* Current Tier Badge */}
          <div className="mb-4">
            {currentTier ? (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sunset-50 text-sunset-700 rounded-full text-sm font-semibold border border-sunset-200">
                {currentTier.name} Tier — {currentTier.discountPercent}% Off
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                No tier yet
              </div>
            )}
          </div>

          {/* Pack Count */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Total Packs</span>
            <span className="text-lg font-bold text-charcoal-950">{totalPacks}</span>
          </div>

          {/* Collapsible Item List */}
          {selectedItems.length > 0 && (
            <div className="mb-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-sm text-sunset-600 hover:text-sunset-700 font-medium"
              >
                {selectedItems.length} product{selectedItems.length !== 1 ? 's' : ''} selected
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {isExpanded && (
                <ul className="mt-2 space-y-1.5">
                  {selectedItems.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between text-xs text-gray-600"
                    >
                      <span className="truncate pr-2">{item.name}</span>
                      <span className="font-medium text-charcoal-950 flex-shrink-0">
                        x{item.qty}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-200 my-4" />

          {/* Subtotal */}
          {totalPacks > 0 && (
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="text-lg font-bold text-charcoal-950">
                  {formatPrice(displayTotal)}
                </span>
              </div>
              {hasTier && totals.savings > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600">You save</span>
                  <span className="text-sm font-semibold text-green-600">
                    {formatPrice(totals.savings)}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Next Tier Nudge */}
          {nextTier && totalPacks > 0 && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs font-medium text-amber-700">
                Add {packsToNext} more pack{packsToNext !== 1 ? 's' : ''} to unlock{' '}
                {nextTier.name} tier ({nextTier.discountPercent}% off)
              </p>
            </div>
          )}

          {/* Free Shipping Callout */}
          <div className="flex items-center gap-2 mb-5 text-sm text-green-600">
            <Truck className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium">Free shipping on all wholesale orders</span>
          </div>

          {/* Action Area */}
          {renderDesktopAction()}
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        {/* Mobile Auth Gate - slides up above the bottom bar */}
        {showAuthGate && !isAuthenticated && canAddToCart && (
          <div className="bg-white border-t border-gray-200 px-4 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
            <div className="max-w-lg mx-auto">
              <WholesaleAuthGate onAuthenticated={onAuthenticated} />
            </div>
          </div>
        )}

        <div className="bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3">
          <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
            {/* Left: Pack count and total */}
            <div className="flex-shrink-0">
              <div className="text-xs text-gray-500">
                {totalPacks} pack{totalPacks !== 1 ? 's' : ''}
                {hasTier && (
                  <span className="text-green-600 ml-1">
                    ({currentTier!.discountPercent}% off)
                  </span>
                )}
              </div>
              {totalPacks > 0 && (
                <div className="text-lg font-bold text-charcoal-950">
                  {formatPrice(displayTotal)}
                </div>
              )}
            </div>

            {/* Right: Button */}
            {totalPacks === 0 ? (
              <button
                disabled
                className="flex-1 max-w-[200px] flex items-center justify-center gap-2 bg-gray-300 text-gray-500 font-bold py-3 px-4 rounded-lg text-sm cursor-not-allowed"
              >
                Add Products
              </button>
            ) : !hasTier ? (
              <button
                disabled
                className="flex-1 max-w-[200px] flex items-center justify-center gap-1.5 bg-amber-500 text-white font-bold py-3 px-4 rounded-lg text-sm cursor-not-allowed"
              >
                <Lock className="w-4 h-4" />
                {packsToMinimum} More
              </button>
            ) : (
              <button
                onClick={handleCartClick}
                className="flex-1 max-w-[200px] flex items-center justify-center gap-2 bg-sunset-500 hover:bg-sunset-600 text-white font-bold py-3 px-4 rounded-lg text-sm transition-colors active:scale-[0.98]"
              >
                <ShoppingBag className="w-4 h-4" />
                {showAuthGate && !isAuthenticated ? 'Sign In Above' : 'Add to Cart'}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
