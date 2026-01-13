'use client';

import { Star, Check, Package } from 'lucide-react';
import { CarePackageBundle } from '@/lib/care-packages';

interface CarePackageCardProps {
  bundle: CarePackageBundle;
  onSelect?: (bundleId: string) => void;
}

export function CarePackageCard({ bundle, onSelect }: CarePackageCardProps) {
  // Format price from cents to dollars
  const formatPrice = (cents: number) => {
    if (cents === 0) return 'Custom';
    return `$${(cents / 100).toFixed(0)}`;
  };

  return (
    <div
      className={`relative bg-white rounded-xl border-2 ${
        bundle.isBestValue ? 'border-blue-500 shadow-lg' : 'border-charcoal-200'
      } p-6 flex flex-col h-full transition-shadow hover:shadow-lg`}
    >
      {/* Best Value Badge */}
      {bundle.isBestValue && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            <Star className="w-3 h-3" />
            Most Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-4">
        <Package className="w-10 h-10 text-blue-600 mx-auto mb-2" />
        <h3 className="text-xl font-bold text-charcoal-950">{bundle.name}</h3>
        <p className="text-sm text-blue-600 font-medium">{bundle.tagline}</p>
      </div>

      {/* Pricing */}
      <div className="text-center mb-4">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-charcoal-950">
            {formatPrice(bundle.price)}
          </span>
          {bundle.price > 0 && (
            <span className="text-charcoal-600 text-sm">+ shipping</span>
          )}
        </div>
        <p className="text-sm text-charcoal-600 mt-1">
          {bundle.tortillaCount} tortillas ({bundle.packCount} pack{bundle.packCount > 1 ? 's' : ''})
        </p>
      </div>

      {/* Shipping Note */}
      <div className="bg-blue-50 rounded-lg p-3 mb-4 text-center">
        <p className="text-xs text-blue-800">{bundle.shippingNote}</p>
      </div>

      {/* Extras */}
      {bundle.includesExtras && bundle.extras && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-charcoal-500 uppercase mb-2">Includes:</p>
          <ul className="space-y-1">
            {bundle.extras.map((extra, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-charcoal-700">
                <span className="text-blue-500">+</span>
                <span>{extra}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Features */}
      <ul className="space-y-2 mb-6 flex-grow">
        {bundle.features.slice(0, 4).map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-charcoal-700">
            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      {bundle.isCustom ? (
        <a
          href="#gift-form"
          className="block w-full text-center py-3 px-4 rounded-lg font-semibold bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-900 transition-colors"
        >
          Contact for Quote
        </a>
      ) : (
        <button
          onClick={() => onSelect?.(bundle.id)}
          className={`block w-full text-center py-3 px-4 rounded-lg font-semibold transition-colors ${
            bundle.isBestValue
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-900'
          }`}
        >
          Select Package
        </button>
      )}
    </div>
  );
}
