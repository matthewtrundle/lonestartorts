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
  productType?: 'tortilla' | 'sauce';
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
    <div className="group relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-sunset-600 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Premium Image Container - Smaller aspect ratio */}
      <div className="aspect-[3/2] relative overflow-hidden bg-gray-50">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Best Seller Badge - Minimal */}
        {isBestSeller && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-sunset-600 text-white shadow-md">
              Best Seller
            </span>
          </div>
        )}

        {/* Savings Badge - Only if significant */}
        {savingsPercent && savingsPercent >= 10 && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-green-600 text-white shadow-md">
              {savingsPercent}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Product Details - Premium spacing */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold leading-tight mb-2 text-charcoal-950 group-hover:text-sunset-600 transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-2 flex-wrap text-xs text-gray-600">
              {tortillaType && (
                <>
                  <span className="font-medium">{tortillaType}</span>
                  <span className="text-gray-300">•</span>
                </>
              )}
              {tortillaCount > 0 && (
                <span className="font-medium">{tortillaCount} tortillas</span>
              )}
              {tortillaCount > 0 && savingsPercent && (
                <span className="text-gray-300">•</span>
              )}
              {savingsPercent && (
                <span className="uppercase tracking-wide">{storageLabel}</span>
              )}
            </div>
          </div>
          <div className="text-right ml-4">
            <span className="text-2xl font-bold text-sunset-600 block">
              {formatPrice(price)}
            </span>
            <span className="text-xs text-gray-500">
              {productType === 'sauce' ? 'per bottle' : 'per pack'}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          {description}
        </p>

        {/* Quantity Selector - Cleaner design */}
        <div className="flex items-center justify-between mb-3 bg-gray-50 rounded-md p-3 border border-gray-200 mt-auto">
          <span className="text-sm font-medium text-gray-700">Quantity</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:border-sunset-600 hover:bg-sunset-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-lg font-semibold text-charcoal-950 min-w-[2ch] text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 10}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:border-sunset-600 hover:bg-sunset-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Shipping Savings Message - Only show for tortillas */}
        {productType === 'tortilla' && quantity >= 3 && (
          <div className="mb-3 text-center">
            <p className="text-xs font-medium text-green-700 bg-green-50 px-3 py-2 rounded-md border border-green-200">
              ✓ Optimized Shipping Unlocked
            </p>
          </div>
        )}

        {/* Sauce shipping message */}
        {productType === 'sauce' && (
          <div className="mb-3 text-center">
            <p className="text-xs font-medium text-blue-700 bg-blue-50 px-3 py-2 rounded-md border border-blue-200">
              Ships free with tortillas • $9.99 flat rate alone
            </p>
          </div>
        )}

        {/* Premium CTA Button */}
        <Button
          variant="cart"
          size="lg"
          onClick={handleAddToCart}
          className="w-full uppercase flex items-center justify-center gap-2 text-sm font-semibold py-3 shadow-md hover:shadow-lg transition-all"
          aria-label={`Add ${quantity > 1 ? `${quantity} ${productType === 'sauce' ? 'bottles' : 'packs'} of ` : ''}${name} to cart`}
        >
          <ShoppingBag className="w-4 h-4" />
          Add {quantity > 1 ? `${quantity} ${productType === 'sauce' ? 'Bottles' : 'Packs'}` : ''} to Cart
        </Button>
      </div>
    </div>
  );
};
