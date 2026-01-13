'use client';

import Link from 'next/link';
import { Star, Check } from 'lucide-react';
import { AlumniTier } from '@/lib/alumni-tiers';

interface EventTierCardProps {
  tier: AlumniTier;
}

export function EventTierCard({ tier }: EventTierCardProps) {
  // Format price from cents to dollars
  const formatPrice = (cents: number) => {
    return (cents / 100).toFixed(0);
  };

  return (
    <div
      className={`relative bg-white rounded-xl border-2 ${
        tier.isBestValue ? 'border-orange-500 shadow-lg' : 'border-charcoal-200'
      } p-6 flex flex-col h-full transition-shadow hover:shadow-lg`}
    >
      {/* Best Value Badge */}
      {tier.isBestValue && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            <Star className="w-3 h-3" />
            Best Value
          </span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-charcoal-950">{tier.name}</h3>
        <p className="text-sm text-orange-600 font-medium">{tier.tagline}</p>
      </div>

      {/* Pricing */}
      <div className="text-center mb-4">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-charcoal-950">
            ${formatPrice(tier.totalPrice)}
          </span>
        </div>
        <p className="text-sm text-charcoal-600 mt-1">
          {tier.packCount} packs ({tier.tortillaCount} tortillas)
        </p>
        {tier.discountPercent > 0 && (
          <p className="text-sm text-green-600 font-medium mt-1">
            {tier.discountPercent}% chapter discount
          </p>
        )}
      </div>

      {/* Servings */}
      <div className="bg-orange-50 rounded-lg p-3 mb-4 text-center">
        <p className="text-sm font-medium text-orange-800">{tier.servings}</p>
        <p className="text-xs text-orange-600">{tier.useCase}</p>
      </div>

      {/* Features */}
      <ul className="space-y-2 mb-6 flex-grow">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-charcoal-700">
            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/shop"
        className={`block w-full text-center py-3 px-4 rounded-lg font-semibold transition-colors ${
          tier.isBestValue
            ? 'bg-orange-600 hover:bg-orange-700 text-white'
            : 'bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-900'
        }`}
      >
        Order Now
      </Link>
    </div>
  );
}
