'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { trackAddToCart } from '@/lib/analytics';
import type { PackSize } from '@/lib/products';

interface ProductCardProps {
  baseId: string;
  name: string;
  image: string;
  description: string;
  storage: 'shelf_stable' | 'refrigerated';
  packSizes: PackSize[];
  onAddToOrder?: (sku: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  baseId,
  name,
  image,
  description,
  storage,
  packSizes,
  onAddToOrder,
}) => {
  const { addItem, setIsOpen } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [selectedPackSize, setSelectedPackSize] = useState<PackSize>(packSizes[0]);

  const storageLabel = storage === 'shelf_stable'
    ? 'Shelf Stable'
    : 'Keep Refrigerated';

  const handleAddToCart = () => {
    // Add item to cart with selected pack size
    addItem({
      sku: selectedPackSize.sku,
      name: `${name} (${selectedPackSize.size}-Pack)`,
      price: selectedPackSize.price,
      description,
      image,
    });

    // Track analytics
    trackAddToCart({
      id: selectedPackSize.sku,
      name: `${name} (${selectedPackSize.size}-Pack)`,
      price: selectedPackSize.price / 100,
      quantity: 1,
    });

    // Show toast notification
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    // Call legacy callback if provided
    if (onAddToOrder) {
      onAddToOrder(selectedPackSize.sku);
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
        <div className="mb-3">
          <h3 className="text-lg font-medium leading-snug mb-1">{name}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-xs font-light tracking-widest uppercase text-gray-dark">
              {storageLabel}
            </p>
            <span className="text-gray-400">•</span>
            <p className="text-xs font-light tracking-wide text-gray-dark">
              {selectedPackSize.tortillaCount} tortillas
            </p>
          </div>
        </div>

        <p className="text-sm font-light text-gray-dark leading-relaxed mb-4">
          {description}
        </p>

        {/* Pack Size Selector */}
        <div className="mb-4">
          <label className="text-xs font-medium text-gray-700 mb-2 block">
            Select Pack Size:
          </label>
          <div className="flex gap-2">
            {packSizes.map((pack) => (
              <button
                key={pack.sku}
                onClick={() => setSelectedPackSize(pack)}
                className={`flex-1 py-3 px-4 border-2 rounded transition-all ${
                  selectedPackSize.sku === pack.sku
                    ? 'border-sunset-500 bg-sunset-50 text-sunset-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-sm font-medium">{pack.size}-Pack</div>
                <div className="text-xs text-gray-600 mt-1">
                  {formatPrice(pack.price)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {storage === 'shelf_stable' && (
          <p className="text-xs font-light text-gray-dark tracking-wide">
            Store in a cool, dry place
          </p>
        )}
      </div>
    </div>
  );
};