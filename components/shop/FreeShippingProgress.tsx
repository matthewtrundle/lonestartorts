'use client';

import React from 'react';
import { Truck, Check } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';

interface FreeShippingProgressProps {
  className?: string;
  compact?: boolean;
}

export function FreeShippingProgress({ className = '', compact = false }: FreeShippingProgressProps) {
  const { subtotal, freeShippingProgress, baseShipping, isHydrated } = useCart();
  const { qualifies, amountRemaining, percentComplete } = freeShippingProgress;

  // Don't render until hydrated to avoid hydration mismatch
  if (!isHydrated) {
    return null;
  }

  // Empty cart - show static message
  if (subtotal === 0) {
    return (
      <div className={`bg-sunset-50 border border-sunset-200 rounded-lg p-3 ${className}`}>
        <div className="flex items-center gap-2 text-sm text-sunset-700">
          <Truck className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">FREE shipping on orders $60+</span>
        </div>
      </div>
    );
  }

  // Qualified for free shipping
  if (qualifies) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-3 ${className}`}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm text-green-700">
            <Check className="w-4 h-4 flex-shrink-0" />
            <span className="font-semibold">FREE shipping unlocked!</span>
          </div>
          <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded">
            Saving {formatPrice(baseShipping)}
          </span>
        </div>
        {!compact && (
          <div className="mt-2 h-2 bg-green-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full w-full" />
          </div>
        )}
      </div>
    );
  }

  // In progress toward free shipping
  return (
    <div className={`bg-amber-50 border border-amber-200 rounded-lg p-3 ${className}`}>
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 text-sm text-amber-700">
          <Truck className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">
            Add {formatPrice(amountRemaining)} more for FREE shipping
          </span>
        </div>
        <span className="text-xs text-amber-600">
          {formatPrice(subtotal)} / $60
        </span>
      </div>
      {!compact && (
        <div className="h-2 bg-amber-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-300"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      )}
    </div>
  );
}
