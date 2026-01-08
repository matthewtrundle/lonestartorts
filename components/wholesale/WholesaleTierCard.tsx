'use client';

import React, { useState } from 'react';
import { Plus, Minus, ShoppingBag, Check, Calendar, Truck } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import {
  WholesaleTier,
  PACK_INCREMENT,
  BASE_PRICE_PER_PACK,
} from '@/lib/wholesale-tiers';

interface WholesaleTierCardProps {
  tier: WholesaleTier;
}

export const WholesaleTierCard: React.FC<WholesaleTierCardProps> = ({
  tier,
}) => {
  const { addItem, setIsOpen } = useCart();
  const [quantity, setQuantity] = useState(tier.packsPerMonth);

  // Quantity must be in increments of 4 packs
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(
      PACK_INCREMENT,
      quantity + delta * PACK_INCREMENT
    );
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    // Add wholesale items to cart
    for (let i = 0; i < quantity; i++) {
      addItem({
        sku: `WHOLESALE-${tier.id.toUpperCase()}`,
        name: `Wholesale ${tier.name} Pack`,
        price: tier.pricePerPack,
        productType: 'tortilla',
        description: `${tier.discountPercent}% wholesale discount - 20 tortillas per pack`,
        image: '/images/products/flour-tortillas-heb.webp',
      });
    }
    setIsOpen(true);
  };

  const weeklyPacks = Math.ceil(quantity / 4);
  const monthlyTortillas = quantity * 20;
  const totalPrice = quantity * tier.pricePerPack;
  const retailTotal = quantity * BASE_PRICE_PER_PACK;
  const savings = retailTotal - totalPrice;

  return (
    <div
      className={`group relative bg-white rounded-xl overflow-hidden border-2 ${
        tier.isBestValue
          ? 'border-sunset-500 ring-4 ring-sunset-100'
          : 'border-gray-200 hover:border-sunset-400'
      } hover:shadow-xl transition-all duration-300 flex flex-col h-full`}
    >
      {/* Best Value Badge */}
      {tier.isBestValue && (
        <div className="absolute top-0 left-0 right-0 bg-sunset-500 text-white text-center py-2 text-sm font-bold z-10">
          Most Popular
        </div>
      )}

      <div
        className={`p-6 flex flex-col flex-grow ${tier.isBestValue ? 'pt-12' : ''}`}
      >
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-charcoal-950">{tier.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{tier.description}</p>
        </div>

        {/* Pricing */}
        <div className="mb-4 p-4 bg-cream-50 rounded-lg">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-sunset-600">
              {formatPrice(tier.pricePerTortilla)}
            </span>
            <span className="text-gray-600">/tortilla</span>
          </div>
          <div className="text-sm text-green-600 font-medium mt-1">
            {tier.discountPercent}% off regular price
          </div>
        </div>

        {/* Volume Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Calendar className="w-4 h-4 text-sunset-500 flex-shrink-0" />
            <span className="font-medium">
              {(tier.packsPerWeek * 20).toLocaleString()} tortillas/week
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Truck className="w-4 h-4 text-sunset-500 flex-shrink-0" />
            <span>{tier.tortillasPerMonth.toLocaleString()} tortillas/month</span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-2 mb-4 flex-grow">
          {tier.features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-sm text-gray-600"
            >
              <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Quantity Selector */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-600 uppercase">
              Monthly Packs
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= PACK_INCREMENT}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-300 hover:border-sunset-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Decrease quantity by 4 packs"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-bold w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-300 hover:border-sunset-500 transition-all"
                aria-label="Increase quantity by 4 packs"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="text-xs text-gray-500 text-center">
            {(weeklyPacks * 20).toLocaleString()} tortillas/week ({monthlyTortillas.toLocaleString()}/month)
          </div>
        </div>

        {/* Total */}
        <div className="bg-charcoal-950 text-white rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-cream-200">Monthly Total</span>
            <span className="text-2xl font-bold">{formatPrice(totalPrice)}</span>
          </div>
          {savings > 0 && (
            <div className="text-green-400 text-sm mt-1">
              You save {formatPrice(savings)}/month
            </div>
          )}
        </div>

        {/* CTA */}
        <Button
          variant="cart"
          size="lg"
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
