'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { trackAddToCart } from '@/lib/analytics';

interface ProductCardProps {
  sku: string;
  name: string;
  image: string;
  description: string;
  price: number;
  tortillaCount: number;
  storage: 'shelf_stable' | 'refrigerated';
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
      {/* Premium Image Container */}
      <div className="aspect-[4/5] relative overflow-hidden bg-light-gray">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Product Details */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold leading-snug mb-1 text-charcoal-950">
              {name}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-xs font-medium tracking-wide uppercase text-charcoal-600">
                {storageLabel}
              </p>
              <span className="text-charcoal-300">•</span>
              <p className="text-xs font-medium tracking-wide text-charcoal-600">
                {tortillaCount} tortillas
              </p>
            </div>
          </div>
          <div className="text-right ml-4">
            <span className="text-2xl font-bold text-charcoal-950 block">
              {formatPrice(price)}
            </span>
            <span className="text-xs text-charcoal-500">per pack</span>
          </div>
        </div>

        <p className="text-sm text-charcoal-700 leading-relaxed mb-4">
          {description}
        </p>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between mb-3 bg-cream-50 rounded-lg p-3">
          <span className="text-sm font-semibold text-charcoal-950">Quantity</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-charcoal-300 hover:border-charcoal-950 hover:bg-charcoal-950 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-charcoal-300 disabled:hover:bg-transparent disabled:hover:text-charcoal-950"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-lg font-bold text-charcoal-950 min-w-[2ch] text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 10}
              className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-charcoal-300 hover:border-charcoal-950 hover:bg-charcoal-950 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-charcoal-300 disabled:hover:bg-transparent disabled:hover:text-charcoal-950"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Shipping Savings Message */}
        {getShippingMessage() && (
          <div className="mb-3 text-center">
            <p className="text-xs font-semibold text-sunset-600 bg-sunset-50 px-3 py-2 rounded-full">
              {getShippingMessage()}
            </p>
          </div>
        )}

        {/* Always-Visible CTA Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-charcoal-950 text-white py-4 px-6 rounded-full font-semibold text-sm tracking-wide uppercase hover:bg-sunset-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <ShoppingBag className="w-4 h-4" />
          Add {quantity > 1 ? `${quantity} Packs` : ''} to Cart
        </button>

        {/* Bundle Pricing Hint */}
        <div className="mt-3 text-center">
          <p className="text-xs text-charcoal-600">
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
          <p className="text-xs text-charcoal-500 mt-4 text-center italic">
            Store in a cool, dry place
          </p>
        )}
      </div>
    </div>
  );
};
