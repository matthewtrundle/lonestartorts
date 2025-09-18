import React from 'react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  sku: string;
  name: string;
  price: number;
  image: string;
  description: string;
  storage: 'shelf_stable' | 'refrigerated';
  onAddToOrder: (sku: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  sku,
  name,
  price,
  image,
  description,
  storage,
  onAddToOrder,
}) => {
  const storageLabel = storage === 'shelf_stable'
    ? 'Shelf Stable'
    : 'Keep Refrigerated';

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
            onClick={() => onAddToOrder(sku)}
            className="px-8 py-3 border-2 border-white text-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
          >
            Add to Order
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="pt-6 pb-2">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-medium leading-snug mb-1">{name}</h3>
            <p className="text-xs font-light tracking-widest uppercase text-gray-dark">
              {storageLabel}
            </p>
          </div>
          <span className="text-xl font-light">
            {formatPrice(price)}
          </span>
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