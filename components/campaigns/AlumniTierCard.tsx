'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Minus, ShoppingBag, Check, Star } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import {
  AlumniTier,
  BASE_PRICE_PER_PACK,
  calculateAlumniPrice,
} from '@/lib/alumni-tiers';

interface AlumniTierCardProps {
  tier: AlumniTier;
}

// Pack increment for quantity changes
const PACK_INCREMENT = 4;

export function AlumniTierCard({ tier }: AlumniTierCardProps) {
  const { addItem, setIsOpen } = useCart();
  const [quantity, setQuantity] = useState(tier.packCount);

  // Variety selection state
  const [flourPacks, setFlourPacks] = useState(Math.ceil(tier.packCount / 2));
  const [butterPacks, setButterPacks] = useState(Math.floor(tier.packCount / 2));

  // Sync variety split when quantity changes
  useEffect(() => {
    setFlourPacks(Math.ceil(quantity / 2));
    setButterPacks(Math.floor(quantity / 2));
  }, [quantity]);

  // Calculate pricing based on quantity
  const pricing = calculateAlumniPrice(quantity);
  const totalTortillas = quantity * 20;
  const retailTotal = quantity * BASE_PRICE_PER_PACK;
  const savings = retailTotal - pricing.totalPrice;

  // Format price from cents to dollars
  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  // Quantity must be in increments of 4 packs
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(
      PACK_INCREMENT,
      quantity + delta * PACK_INCREMENT
    );
    setQuantity(newQuantity);
  };

  // Handle variety changes - flour adjusts, butter fills remainder
  const handleFlourChange = (delta: number) => {
    const newFlour = Math.max(0, Math.min(quantity, flourPacks + delta));
    setFlourPacks(newFlour);
    setButterPacks(quantity - newFlour);
  };

  const handleAddToCart = () => {
    const discountDesc = pricing.discountPercent > 0
      ? `${pricing.discountPercent}% chapter discount - 20 tortillas per pack`
      : '20 tortillas per pack';

    // Add flour packs
    if (flourPacks > 0) {
      addItem({
        sku: 'HEB-FLOUR',
        name: 'H-E-B Flour Tortillas',
        price: pricing.pricePerPack,
        productType: 'tortilla',
        description: discountDesc,
        image: '/images/products/flour-tortillas-heb.webp',
      }, flourPacks);
    }

    // Add butter packs
    if (butterPacks > 0) {
      addItem({
        sku: 'HEB-BUTTER',
        name: 'H-E-B Butter Tortillas',
        price: pricing.pricePerPack,
        productType: 'tortilla',
        description: discountDesc,
        image: '/images/products/butter-tortillas-heb.webp',
      }, butterPacks);
    }

    setIsOpen(true);
  };

  return (
    <div
      className={`group relative bg-white rounded-xl overflow-hidden border-2 ${
        tier.isBestValue
          ? 'border-orange-500 ring-4 ring-orange-100'
          : 'border-gray-200 hover:border-orange-400'
      } hover:shadow-xl transition-all duration-300 flex flex-col h-full`}
    >
      {/* Best Value Badge */}
      {tier.isBestValue && (
        <div className="absolute top-0 left-0 right-0 bg-orange-500 text-white text-center py-2 text-sm font-bold z-10 flex items-center justify-center gap-1">
          <Star className="w-4 h-4" />
          Best Value
        </div>
      )}

      <div
        className={`p-6 flex flex-col flex-grow ${tier.isBestValue ? 'pt-12' : ''}`}
      >
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-charcoal-950">{tier.name}</h3>
          <p className="text-sm text-orange-600 font-medium">{tier.tagline}</p>
          <p className="text-sm text-gray-600 mt-1">{tier.description}</p>
        </div>

        {/* Pricing */}
        <div className="mb-4 p-4 bg-orange-50 rounded-lg">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-orange-600">
              {formatPrice(pricing.pricePerPack)}
            </span>
            <span className="text-gray-600">/pack</span>
          </div>
          {pricing.discountPercent > 0 && (
            <div className="text-sm text-green-600 font-medium mt-1">
              {pricing.discountPercent}% chapter discount
            </div>
          )}
          <div className="text-xs text-gray-500 mt-1">
            20 tortillas per pack
          </div>
        </div>

        {/* Servings Info */}
        <div className="bg-cream-50 rounded-lg p-3 mb-4 text-center">
          <p className="text-sm font-medium text-charcoal-800">{tier.servings}</p>
          <p className="text-xs text-charcoal-600">{tier.useCase}</p>
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
              Packs
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= PACK_INCREMENT}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-300 hover:border-orange-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Decrease quantity by 4 packs"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-bold w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-300 hover:border-orange-500 transition-all"
                aria-label="Increase quantity by 4 packs"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="text-xs text-gray-500 text-center">
            {totalTortillas.toLocaleString()} tortillas total
          </div>
        </div>

        {/* Variety Selector */}
        <div className="bg-orange-50 rounded-lg p-3 mb-4">
          <div className="text-xs font-semibold text-gray-600 uppercase mb-3">
            Variety Mix
          </div>

          {/* Flour */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-charcoal-800">Flour</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleFlourChange(-1)}
                disabled={flourPacks <= 0}
                className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-300 hover:border-orange-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Decrease flour packs"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-sm font-bold w-8 text-center">
                {flourPacks}
              </span>
              <button
                onClick={() => handleFlourChange(1)}
                disabled={flourPacks >= quantity}
                className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-300 hover:border-orange-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Increase flour packs"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Butter */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-charcoal-800">Butter</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleFlourChange(1)}
                disabled={butterPacks <= 0}
                className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-300 hover:border-orange-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Decrease butter packs"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-sm font-bold w-8 text-center">
                {butterPacks}
              </span>
              <button
                onClick={() => handleFlourChange(-1)}
                disabled={butterPacks >= quantity}
                className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-300 hover:border-orange-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Increase butter packs"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="bg-charcoal-950 text-white rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-cream-200">Order Total</span>
            <span className="text-2xl font-bold">{formatPrice(pricing.totalPrice)}</span>
          </div>
          {savings > 0 && (
            <div className="text-green-400 text-sm mt-1">
              You save {formatPrice(savings)}
            </div>
          )}
        </div>

        {/* CTA */}
        <Button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold"
        >
          <ShoppingBag className="w-5 h-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
