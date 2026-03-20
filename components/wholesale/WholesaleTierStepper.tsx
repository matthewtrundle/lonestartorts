'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { wholesaleTiers, WholesaleTier } from '@/lib/wholesale-tiers';

// Sub-component for each tier circle with hover tooltip
const TierNode: React.FC<{
  tier: WholesaleTier;
  isCompleted: boolean;
  isActive: boolean;
  isFuture: boolean;
}> = ({ tier, isCompleted, isActive, isFuture }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative z-10 flex flex-col items-center flex-1">
      {/* Circle */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 cursor-pointer ${
          isCompleted && !isActive
            ? 'bg-green-500 border-green-500 text-white'
            : isActive
              ? 'bg-sunset-500 border-sunset-500 text-white ring-4 ring-sunset-200'
              : 'bg-white border-gray-300 text-gray-400 hover:border-sunset-300'
        }`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {isCompleted && !isActive ? (
          <Check className="w-5 h-5" />
        ) : (
          <span className="text-sm font-bold">{tier.discountPercent}%</span>
        )}
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-full mt-8 left-1/2 -translate-x-1/2 w-56 bg-charcoal-950 text-white rounded-lg shadow-xl p-3 z-50 pointer-events-none">
          {/* Arrow */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-charcoal-950 rotate-45" />
          <div className="relative z-10">
            <p className="font-bold text-sm mb-1">
              {tier.name} — {tier.discountPercent}% Off
            </p>
            <p className="text-xs text-gray-300 mb-2">{tier.description}</p>
            <div className="text-xs text-gray-400 space-y-0.5">
              <p>{tier.packsPerWeek} packs/week ({tier.packsPerMonth}/month)</p>
              <p>Ideal for: {tier.idealFor}</p>
            </div>
            <div className="mt-2 pt-2 border-t border-white/10">
              <ul className="text-xs text-gray-300 space-y-0.5">
                {tier.features.slice(0, 3).map((f, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Label */}
      <span
        className={`mt-2 text-sm font-semibold ${
          isActive
            ? 'text-sunset-600'
            : isCompleted
              ? 'text-green-600'
              : 'text-gray-400'
        }`}
      >
        {tier.name}
      </span>

      {/* Threshold */}
      <span className={`text-xs ${isFuture ? 'text-gray-400' : 'text-gray-500'}`}>
        {tier.packsPerMonth}+ packs
      </span>
    </div>
  );
};

interface WholesaleTierStepperProps {
  totalPacks: number;
  currentTier: WholesaleTier | null;
}

export const WholesaleTierStepper: React.FC<WholesaleTierStepperProps> = ({
  totalPacks,
  currentTier,
}) => {
  // Find index of the next tier the user hasn't reached yet
  const currentTierIndex = currentTier
    ? wholesaleTiers.findIndex((t) => t.id === currentTier.id)
    : -1;

  const nextTier = currentTierIndex < wholesaleTiers.length - 1
    ? wholesaleTiers[currentTierIndex + 1]
    : null;

  const packsToNext = nextTier
    ? nextTier.packsPerMonth - totalPacks
    : 0;

  return (
    <div className="w-full">
      {/* Desktop Stepper */}
      <div className="hidden md:block">
        <div className="relative flex items-center justify-between">
          {/* Connecting line (background) */}
          <div className="absolute top-5 left-[calc(12.5%)] right-[calc(12.5%)] h-1 bg-gray-200 rounded-full" />
          {/* Connecting line (filled) */}
          <div
            className="absolute top-5 left-[calc(12.5%)] h-1 bg-green-500 rounded-full transition-all duration-700 ease-out"
            style={{
              width: currentTierIndex >= 0
                ? `${Math.min(100, ((currentTierIndex + 1) / wholesaleTiers.length) * 100)}%`
                : '0%',
              maxWidth: `${((wholesaleTiers.length - 1) / wholesaleTiers.length) * 100}%`,
            }}
          />

          {wholesaleTiers.map((tier, index) => {
            const isCompleted = currentTierIndex >= index;
            const isActive = currentTierIndex === index;
            const isFuture = currentTierIndex < index;

            return (
              <TierNode
                key={tier.id}
                tier={tier}
                isCompleted={isCompleted}
                isActive={isActive}
                isFuture={isFuture}
              />
            );
          })}
        </div>

        {/* Nudge text */}
        {nextTier && totalPacks > 0 && (
          <div className="mt-4 text-center">
            <p className="text-sm font-medium text-amber-600 bg-amber-50 inline-block px-4 py-1.5 rounded-full">
              Add {packsToNext} more pack{packsToNext !== 1 ? 's' : ''} to unlock {nextTier.discountPercent}% off
            </p>
          </div>
        )}
        {!currentTier && totalPacks === 0 && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Add products below to start building your wholesale order
            </p>
          </div>
        )}
        {!currentTier && totalPacks > 0 && (
          <div className="mt-4 text-center">
            <p className="text-sm font-medium text-amber-600 bg-amber-50 inline-block px-4 py-1.5 rounded-full">
              Add {16 - totalPacks} more pack{16 - totalPacks !== 1 ? 's' : ''} to unlock 10% off
            </p>
          </div>
        )}
      </div>

      {/* Mobile Compact Progress */}
      <div className="md:hidden">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              {currentTier ? (
                <span className="text-sm font-bold text-sunset-600">
                  {currentTier.name} Tier — {currentTier.discountPercent}% Off
                </span>
              ) : (
                <span className="text-sm font-bold text-gray-600">
                  No Tier Yet
                </span>
              )}
            </div>
            {nextTier && (
              <span className="text-xs text-gray-500">
                Next: {nextTier.name} ({nextTier.packsPerMonth} packs)
              </span>
            )}
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                currentTier ? 'bg-sunset-500' : 'bg-gray-400'
              }`}
              style={{
                width: `${Math.min(100, (totalPacks / (nextTier?.packsPerMonth || 96)) * 100)}%`,
              }}
            />
          </div>

          {/* Nudge */}
          {nextTier && totalPacks > 0 && (
            <p className="text-xs text-amber-600 font-medium mt-1.5">
              {currentTier
                ? `${packsToNext} more to unlock ${nextTier.discountPercent}% off`
                : `${16 - totalPacks} more to unlock wholesale pricing`}
            </p>
          )}
          {totalPacks === 0 && (
            <p className="text-xs text-gray-500 mt-1.5">
              Add products to start building your order
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
