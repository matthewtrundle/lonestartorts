'use client';

import React from 'react';
import { Truck } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

interface FreeShippingProgressProps {
  className?: string;
  compact?: boolean;
}

export function FreeShippingProgress({ className = '', compact = false }: FreeShippingProgressProps) {
  const { isHydrated } = useCart();

  // Don't render until hydrated to avoid hydration mismatch
  if (!isHydrated) {
    return null;
  }

  // Always show free shipping message
  return (
    <div className={`bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 ${className}`}>
      <div className="flex items-center gap-2 text-sm text-green-700">
        <Truck className="w-4 h-4 flex-shrink-0" />
        <span className="font-semibold">FREE shipping on all orders</span>
      </div>
    </div>
  );
}
