'use client';

import React from 'react';
import { Truck } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';

interface FreeShippingProgressProps {
  className?: string;
  compact?: boolean;
}

export function FreeShippingProgress({ className = '', compact = false }: FreeShippingProgressProps) {
  const { isHydrated, freeShippingProgress } = useCart();

  // Don't render until hydrated to avoid hydration mismatch
  if (!isHydrated) {
    return null;
  }

  const { qualifies, amountRemaining, percentComplete } = freeShippingProgress;

  if (qualifies) {
    return (
      <div className={`bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 ${className}`}>
        <div className="flex items-center gap-2 text-sm text-green-700">
          <Truck className="w-4 h-4 flex-shrink-0" />
          <span className="font-semibold">FREE shipping on this order!</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-3 ${className}`}>
      <div className="flex items-center gap-2 text-sm text-amber-700 mb-2">
        <Truck className="w-4 h-4 flex-shrink-0" />
        <span className="font-semibold">
          Add {formatPrice(amountRemaining)} more for FREE shipping
        </span>
      </div>
      {/* Progress bar */}
      <div className="h-2 bg-amber-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-green-500 transition-all duration-500 rounded-full"
          style={{ width: `${percentComplete}%` }}
        />
      </div>
      {!compact && (
        <p className="text-[10px] text-amber-600 mt-1.5">Orders under $60 ship for $12.99</p>
      )}
    </div>
  );
}
