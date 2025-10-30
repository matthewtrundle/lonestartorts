'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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
  const [showToast, setShowToast] = useState(false);

  const storageLabel = storage === 'shelf_stable'
    ? 'Shelf Stable'
    : 'Keep Refrigerated';

  const handleAddToCart = () => {
    // Add item to cart
    addItem({
      sku,
      name,
      price,
      description,
      image,
    });

    // Track analytics
    trackAddToCart({
      id: sku,
      name,
      price: price / 100,
      quantity: 1,
    });

    // Show toast notification
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    // Call legacy callback if provided
    if (onAddToOrder) {
      onAddToOrder(sku);
    }
  };

  return (
    <div className="group relative bg-white">
      {/* Premium Image Container */}
      <div className="aspect-[4/5] relative overflow-hidden bg-light-gray">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <button
            onClick={handleAddToCart}
            className="px-8 py-3 border-2 border-white text-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
          >
            Add to Cart
          </button>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="absolute top-4 left-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg flex items-center justify-between z-10 animate-fade-in">
            <span className="text-sm font-medium">Added to cart!</span>
            <button
              onClick={() => setIsOpen(true)}
              className="text-xs underline hover:no-underline"
            >
              View Cart
            </button>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="pt-6 pb-2">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-medium leading-snug mb-1">{name}</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-xs font-light tracking-widest uppercase text-gray-dark">
                {storageLabel}
              </p>
              <span className="text-gray-400">•</span>
              <p className="text-xs font-light tracking-wide text-gray-dark">
                {tortillaCount} tortillas
              </p>
            </div>
          </div>
          <div className="text-right ml-4">
            <span className="text-xl font-light block">
              {formatPrice(price)}
            </span>
          </div>
        </div>

        <p className="text-sm font-light text-gray-dark leading-relaxed">
          {description}
        </p>

        {storage === 'shelf_stable' && (
          <p className="text-xs font-light text-gray-dark mt-4 tracking-wide">
            Store in a cool, dry place
          </p>
        )}
      </div>
    </div>
  );
};