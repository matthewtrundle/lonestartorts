'use client';

import React from 'react';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';
import { TexasStarIcon } from '@/components/ui/Icons';

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
      <div className={`bg-cream-50 border border-cream-300 rounded-lg p-3 ${className}`}>
        <div className="flex items-center gap-2 text-sm text-lime-700">
          <TexasStarIcon className="w-4 h-4 shrink-0" />
          <span className="font-semibold">Free shipping unlocked</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-cream-50 border border-cream-300 rounded-lg p-3 ${className}`}>
      <p className="text-sm text-charcoal-700 mb-2">
        You&apos;re{' '}
        <span className="font-display font-bold text-sunset-700">{formatPrice(amountRemaining)}</span>{' '}
        from our $80 minimum &mdash; ships free
      </p>
      {/* Progress bar */}
      <div className="h-2 bg-masa-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-rust-600 to-sunset-600 transition-all duration-500 rounded-full"
          style={{ width: `${percentComplete}%` }}
        />
      </div>
      {!compact && (
        <p className="text-[10px] text-charcoal-500 mt-1.5">$80 minimum order &mdash; every order ships free</p>
      )}
    </div>
  );
}
