'use client';

import React, { useState } from 'react';
import { ShoppingBag, Check, Calendar, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WholesaleTier } from '@/lib/wholesale-tiers';
import { WholesaleProductPicker } from './WholesaleProductPicker';

interface WholesaleTierCardProps {
  tier: WholesaleTier;
}

export const WholesaleTierCard: React.FC<WholesaleTierCardProps> = ({
  tier,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <>
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
                {tier.discountPercent}%
              </span>
              <span className="text-gray-600">off all products</span>
            </div>
            <div className="text-sm text-green-600 font-medium mt-1">
              On every tortilla in our catalog
            </div>
          </div>

          {/* Volume Details */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Calendar className="w-4 h-4 text-sunset-500 flex-shrink-0" />
              <span className="font-medium">
                {tier.packsPerWeek} packs/week ({tier.packsPerMonth}/month)
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Truck className="w-4 h-4 text-sunset-500 flex-shrink-0" />
              <span>Free shipping on all orders</span>
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

          {/* Ideal For */}
          <div className="text-xs text-gray-500 mb-4">
            Ideal for: {tier.idealFor}
          </div>

          {/* CTA */}
          <Button
            variant="cart"
            size="lg"
            onClick={() => setShowPicker(true)}
            className="w-full flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            Build Your Order
          </Button>
        </div>
      </div>

      {/* Product Picker Modal */}
      {showPicker && (
        <WholesaleProductPicker
          tier={tier}
          onClose={() => setShowPicker(false)}
        />
      )}
    </>
  );
};
