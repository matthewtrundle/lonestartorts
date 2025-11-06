'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { trackAddToCart } from '@/lib/analytics';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  sku: string;
  name: string;
  image: string;
  description: string;
  price: number;
  tortillaCount: number;
  storage: 'shelf_stable' | 'refrigerated';
  tortillaType?: string;
  isBestSeller?: boolean;
  savingsPercent?: number;
  onAddToOrder?: (sku: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  sku,
  name,
  image,
  description,
  price,
  tortillaCount,
  storage,
  tortillaType,
  isBestSeller,
  savingsPercent,
  onAddToOrder,
}) => {
  const { addItem, setIsOpen } = useCart();
  const [quantity, setQuantity] = useState(1);

  const storageLabel = storage === 'shelf_stable'
    ? 'Shelf Stable'
    : 'Keep Refrigerated';

  // Calculate shipping savings based on quantity
  const getShippingMessage = () => {
    if (quantity === 1) {
      return 'Add 2 more for discounted shipping';
    } else if (quantity === 2) {
      return 'Add 1 more to save $2.20 on shipping';
    } else if (quantity >= 3 && quantity < 5) {
      return `Save $2.20 on shipping • ${5 - quantity} more for max savings`;
    } else if (quantity >= 5) {
      return 'Maximum shipping savings applied!';
    }
    return '';
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(10, quantity + delta));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    // Add items to cart (loop for quantity)
    for (let i = 0; i < quantity; i++) {
      addItem({
        sku,
        name,
        price,
        description,
        image,
      });
    }

    // Track analytics
    trackAddToCart({
      id: sku,
      name,
      price: price / 100,
      quantity,
    });

    // Auto-open cart immediately (no toast delay)
    setIsOpen(true);

    // Reset quantity to 1 after adding
    setQuantity(1);

    // Call legacy callback if provided
    if (onAddToOrder) {
      onAddToOrder(sku);
    }
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Premium Image Container - Smaller aspect ratio */}
      <div className="aspect-[3/2] relative overflow-hidden bg-light-gray">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Best Seller Badge - Top Left */}
        {isBestSeller && (
          <div className="absolute top-2 left-2 z-10">
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-sunset-600 text-white rounded-full shadow-md">
              Best Seller
            </span>
          </div>
        )}

        {/* Savings Badge - Top Right */}
        {savingsPercent && (
          <div className="absolute top-2 right-2 z-10">
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-green-600 text-white rounded-full shadow-md">
              {savingsPercent}% OFF
            </span>
          </div>
        )}

        {/* Storage Badge - Bottom Right (if no savings badge) */}
        {!savingsPercent && (
          <div className="absolute bottom-2 right-2 z-10">
            <span className="px-2 py-0.5 text-[10px] font-medium tracking-wide bg-white/90 backdrop-blur-sm rounded-full text-charcoal-700 shadow-sm">
              {storageLabel}
            </span>
          </div>
        )}
      </div>

      {/* Product Details - More compact */}
      <div className="p-3">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="text-base font-semibold leading-tight mb-1 text-charcoal-950">
              {name}
            </h3>
            <div className="flex items-center gap-1.5 flex-wrap">
              {tortillaType && (
                <>
                  <p className="text-[10px] font-medium tracking-wide text-charcoal-600">
                    {tortillaType}
                  </p>
                  <span className="text-charcoal-300 text-xs">•</span>
                </>
              )}
              <p className="text-[10px] font-medium tracking-wide text-charcoal-600">
                {tortillaCount} tortillas
              </p>
              {savingsPercent && (
                <>
                  <span className="text-charcoal-300 text-xs">•</span>
                  <p className="text-[10px] font-medium tracking-wide uppercase text-charcoal-600">
                    {storageLabel}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="text-right ml-3">
            <span className="text-xl font-bold text-sunset-600 block">
              {formatPrice(price)}
            </span>
            <span className="text-[10px] text-charcoal-500">per pack</span>
          </div>
        </div>

        <p className="text-xs text-charcoal-700 leading-snug mb-3">
          {description}
        </p>

        {/* Quantity Selector - Compact */}
        <div className="flex items-center justify-between mb-2 bg-cream-50 rounded-lg p-2">
          <span className="text-xs font-semibold text-charcoal-950">Quantity</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-charcoal-300 hover:border-charcoal-950 hover:bg-charcoal-950 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-charcoal-300 disabled:hover:bg-transparent disabled:hover:text-charcoal-950"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-base font-bold text-charcoal-950 min-w-[2ch] text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 10}
              className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-charcoal-300 hover:border-charcoal-950 hover:bg-charcoal-950 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-charcoal-300 disabled:hover:bg-transparent disabled:hover:text-charcoal-950"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Shipping Savings Message - Compact */}
        {getShippingMessage() && (
          <div className="mb-2 text-center">
            <p className="text-[10px] font-semibold text-sunset-600 bg-sunset-50 px-2 py-1 rounded-full">
              {getShippingMessage()}
            </p>
          </div>
        )}

        {/* Always-Visible CTA Button - Compact */}
        <Button
          variant="cart"
          size="default"
          onClick={handleAddToCart}
          className="w-full rounded-full uppercase flex items-center justify-center gap-1.5 text-xs py-2"
          aria-label={`Add ${quantity > 1 ? `${quantity} packs of ` : ''}${name} to cart`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          Add {quantity > 1 ? `${quantity} Packs` : ''} to Cart
        </Button>

        {/* Bundle Pricing Hint - Compact */}
        <div className="mt-2 text-center">
          <p className="text-[10px] text-charcoal-600">
            {quantity >= 3 ? (
              <span className="font-semibold text-green-700">
                ✓ Bulk order discount applied
              </span>
            ) : (
              <>
                Buy 3+ packs for <span className="font-semibold">discounted shipping</span>
              </>
            )}
          </p>
        </div>

        {storage === 'shelf_stable' && (
          <p className="text-[10px] text-charcoal-500 mt-2 text-center italic">
            Store in a cool, dry place
          </p>
        )}
      </div>
    </div>
  );
};
