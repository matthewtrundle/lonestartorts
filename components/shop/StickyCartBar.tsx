'use client';

import { useCart } from '@/lib/cart-context';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export function StickyCartBar() {
  const { itemCount, subtotal, setIsOpen, freeShippingProgress } = useCart();

  // Don't show if cart is empty
  if (itemCount === 0) return null;

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const { amountRemaining, qualifies } = freeShippingProgress;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] md:hidden">
      {/* Free shipping nudge */}
      {!qualifies && subtotal > 0 && (
        <div className="bg-amber-50 px-4 py-2 text-center text-sm border-t border-amber-200">
          <div className="flex items-center justify-center gap-2 text-amber-700">
            <span className="font-medium">
              Add {formatPrice(amountRemaining)} more for FREE shipping
            </span>
          </div>
          <div className="mt-1 h-1.5 bg-amber-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-green-500 transition-all duration-300"
              style={{ width: `${freeShippingProgress.percentComplete}%` }}
            />
          </div>
        </div>
      )}

      {/* Main cart bar */}
      <div className="bg-charcoal-950 text-white px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 flex-1"
        >
          <div className="relative">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-sunset-500 rounded-full text-xs font-bold flex items-center justify-center">
              {itemCount}
            </span>
          </div>
          <div className="text-left">
            <div className="text-sm text-cream-200">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </div>
            <div className="font-bold text-lg">
              {formatPrice(subtotal)}
            </div>
          </div>
        </button>

        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-colors min-h-[48px] bg-sunset-500 hover:bg-sunset-600 text-white"
        >
          Checkout
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
