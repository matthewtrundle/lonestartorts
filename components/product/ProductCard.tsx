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
  productType?: 'tortilla' | 'sauce' | 'wholesale';
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
  productType,
  tortillaType,
  isBestSeller,
  savingsPercent,
  onAddToOrder,
}) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const storageLabel = storage === 'shelf_stable'
    ? 'Shelf Stable'
    : 'Keep Refrigerated';

  // Calculate shipping and messaging based on quantity
  // Flat-rate: $9.95 (1 pack), $19.95 (2+ packs), FREE on $80+
  const getShippingInfo = () => {
    const itemTotal = price * quantity;

    // FREE shipping threshold is $80 (8000 cents)
    if (itemTotal >= 8000) {
      return {
        message: 'FREE shipping included!',
        type: 'free' as const,
        totalWithShipping: itemTotal,
        shippingCost: 0,
      };
    }

    // Calculate how much more needed for free shipping
    const amountToFreeShipping = 8000 - itemTotal;
    const packsNeeded = Math.ceil(amountToFreeShipping / price);

    // Flat-rate shipping: $9.95 for 1 pack, $19.95 for 2+ packs
    const shippingCost = quantity === 1 ? 995 : 1995;

    // Show progress message if close to free shipping
    if (packsNeeded <= 2) {
      return {
        message: `Add ${packsNeeded} more for FREE shipping`,
        type: 'progress' as const,
        totalWithShipping: itemTotal + shippingCost,
        shippingCost,
      };
    }

    // Default: show hint about free shipping
    return {
      message: `Order $80+ for FREE shipping`,
      type: 'hint' as const,
      totalWithShipping: itemTotal + shippingCost,
      shippingCost,
    };
  };

  const shippingInfo = getShippingInfo();

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
        productType,
        description,
        image,
      });
    }

    // Track analytics
    trackAddToCart({
      productId: sku,
      name,
      price: price / 100,
      quantity,
    });

    // Reset quantity to 1 after adding
    setQuantity(1);

    // Call legacy callback if provided
    if (onAddToOrder) {
      onAddToOrder(sku);
    }
  };

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-sunset-500 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="aspect-square relative overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Best Seller Badge */}
        {isBestSeller && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-sunset-600 text-white rounded-full shadow-lg">
              Best Seller
            </span>
          </div>
        )}

        {/* Savings Badge */}
        {savingsPercent && savingsPercent >= 10 && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-block px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-green-600 text-white rounded-full shadow-lg">
              {savingsPercent}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Header: Name + Price */}
        <div className="mb-3">
          <div className="flex justify-between items-start gap-3 mb-1.5">
            <h3 className="text-base font-bold leading-snug text-charcoal-950 group-hover:text-sunset-600 transition-colors line-clamp-2 min-h-[2.5rem]">
              {name}
            </h3>
            <div className="text-right flex-shrink-0">
              <span className="text-xl font-bold text-sunset-600">
                {formatPrice(price)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            {tortillaType && <span>{tortillaType}</span>}
            {tortillaType && tortillaCount > 0 && <span>•</span>}
            {tortillaCount > 0 && <span>{tortillaCount} tortillas</span>}
            {!tortillaType && !tortillaCount && productType === 'sauce' && <span>Per bottle</span>}
          </div>
        </div>

        {/* Description - Fixed height */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 min-h-[2.5rem] mb-4">
          {description}
        </p>

        {/* Spacer to push bottom content down */}
        <div className="flex-grow" />

        {/* Quantity Selector - 44px minimum tap targets for mobile */}
        <div className="flex items-center justify-between mb-3 bg-gray-50 rounded-lg p-2">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Qty</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-11 h-11 flex items-center justify-center rounded-lg bg-white border border-gray-300 hover:border-sunset-500 hover:bg-sunset-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
              aria-label="Decrease quantity"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-lg font-bold text-charcoal-950 w-10 text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 10}
              className="w-11 h-11 flex items-center justify-center rounded-lg bg-white border border-gray-300 hover:border-sunset-500 hover:bg-sunset-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
              aria-label="Increase quantity"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Shipping Info */}
        <div className={`mb-3 py-2 px-3 rounded-lg text-center text-xs ${
          shippingInfo.type === 'free'
            ? 'bg-green-50 text-green-700 font-semibold'
            : shippingInfo.type === 'progress'
            ? 'bg-amber-50 text-amber-700'
            : 'bg-gray-50 text-gray-600'
        }`}>
          {shippingInfo.type === 'free' ? (
            <span>{formatPrice(shippingInfo.totalWithShipping)} total • FREE shipping!</span>
          ) : (
            <span>{shippingInfo.message}</span>
          )}
        </div>

        {/* CTA Button - 48px minimum height for mobile tap target */}
        <Button
          variant="cart"
          size="lg"
          onClick={handleAddToCart}
          className="w-full uppercase flex items-center justify-center gap-2 text-sm font-bold tracking-wide min-h-[48px] rounded-lg shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
        >
          <ShoppingBag className="w-5 h-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
