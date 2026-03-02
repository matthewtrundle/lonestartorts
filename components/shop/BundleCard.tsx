'use client';

import React from 'react';
import Image from 'next/image';
import { Check, ShoppingBag, Star } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { ShopBundle, getBundleSavings } from '@/lib/bundles';
import { getProductBySku } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { trackAddToCart } from '@/lib/analytics';

interface BundleCardProps {
  bundle: ShopBundle;
}

export const BundleCard: React.FC<BundleCardProps> = ({ bundle }) => {
  const { addItem } = useCart();
  const { savingsAmount, savingsPercent } = getBundleSavings(bundle);

  const handleAddBundle = () => {
    // Add each item in the bundle to the cart
    bundle.contents.forEach(({ sku, quantity }) => {
      const product = getProductBySku(sku);
      if (product) {
        // Calculate discounted price per item (proportional)
        const originalItemTotal = product.price * quantity;
        const discountRatio = bundle.bundlePrice / bundle.originalPrice;
        const discountedItemPrice = Math.round(product.price * discountRatio);

        for (let i = 0; i < quantity; i++) {
          addItem({
            sku: product.sku,
            name: product.name,
            price: discountedItemPrice,
            productType: product.productType,
            description: product.description,
            image: product.image,
          });
        }
      }
    });

    // Track analytics for bundle
    trackAddToCart({
      productId: bundle.id,
      name: bundle.name,
      price: bundle.bundlePrice / 100,
      quantity: 1,
      isBundle: true,
    });
  };

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-sunset-500 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
        <Image
          src={bundle.image}
          alt={bundle.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Best Value Badge */}
        {bundle.isBestValue && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 md:px-2.5 md:py-1 text-[9px] md:text-[10px] font-bold tracking-wider uppercase bg-sunset-600 text-white rounded-full shadow-lg">
              <Star className="w-3 h-3 fill-current" />
              Best Value
            </span>
          </div>
        )}

        {/* Savings Badge */}
        <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10">
          <span className="inline-block px-2 py-0.5 md:px-2.5 md:py-1 text-[9px] md:text-[10px] font-bold tracking-wider uppercase bg-green-100 text-green-700 rounded-full shadow-lg">
            Save {savingsPercent}%
          </span>
        </div>
      </div>

      {/* Bundle Details */}
      <div className="p-3 md:p-5 flex flex-col flex-grow">
        {/* Header */}
        <div className="mb-2 md:mb-3">
          <h3 className="text-sm md:text-lg font-bold leading-snug text-charcoal-950 group-hover:text-sunset-600 transition-colors">
            {bundle.name}
          </h3>
          <p className="text-[10px] md:text-xs text-gray-500 mt-0.5">
            {bundle.tagline}
          </p>
        </div>

        {/* Contents List */}
        <ul className="space-y-1 md:space-y-1.5 mb-3 md:mb-4">
          {bundle.features.slice(0, 4).map((feature, index) => (
            <li key={index} className="flex items-start gap-1.5 md:gap-2 text-[10px] md:text-xs text-gray-600">
              <Check className="w-3 h-3 md:w-4 md:h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Pricing */}
        <div className="mb-3 md:mb-4 flex items-baseline gap-2">
          <span className="text-lg md:text-2xl font-bold text-sunset-600">
            {formatPrice(bundle.bundlePrice)}
          </span>
          <span className="text-xs md:text-sm text-gray-400 line-through">
            {formatPrice(bundle.originalPrice)}
          </span>
          <span className="text-[10px] md:text-xs text-green-600 font-semibold">
            Save {formatPrice(savingsAmount)}
          </span>
        </div>

        {/* Shipping Info */}
        <div className="mb-2 md:mb-3 py-1.5 md:py-2 px-2 md:px-3 rounded-lg text-center text-[10px] md:text-xs bg-green-50 text-green-700 font-semibold">
          FREE shipping included!
        </div>

        {/* CTA Button */}
        <Button
          variant="cart"
          size="lg"
          onClick={handleAddBundle}
          className="w-full uppercase flex items-center justify-center gap-2 text-xs md:text-sm font-bold tracking-wide min-h-[44px] md:min-h-[48px] rounded-lg shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
        >
          <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
          Add Bundle to Cart
        </Button>
      </div>
    </div>
  );
};
