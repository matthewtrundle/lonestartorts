'use client';

import React, { useState, useMemo } from 'react';
import { Egg, Beef, UtensilsCrossed, Flame, SlidersHorizontal } from 'lucide-react';

// Each preset defines a ratio of products (weights that get scaled by the slider)
interface Preset {
  id: string;
  label: string;
  icon: React.FC<{ className?: string }>;
  description: string;
  // SKU -> weight ratio (will be normalized and scaled by slider)
  mix: Record<string, number>;
}

const presets: Preset[] = [
  {
    id: 'breakfast',
    label: 'Breakfast Tacos',
    icon: Egg,
    description: 'Butter & flour tortillas for the morning rush',
    mix: {
      'HEB-BUTTER': 3,
      'HEB-FLOUR': 3,
      'HEB-BUTTER-SHELF': 2,
      'HEB-HOMESTYLE-FLOUR': 2,
    },
  },
  {
    id: 'burritos',
    label: 'Burritos',
    icon: Beef,
    description: 'Big flour tortillas for hearty wraps',
    mix: {
      'HEB-BURRITO-GRANDE': 4,
      'HEB-FLOUR': 3,
      'HEB-HOMESTYLE-FLOUR': 2,
      'HEB-FAJITA-FLOUR': 1,
    },
  },
  {
    id: 'taco-shop',
    label: 'Taco Shop',
    icon: UtensilsCrossed,
    description: 'Street taco corn & flour mix',
    mix: {
      'HEB-STREET-TACO': 3,
      'HEB-WHITE-CORN': 3,
      'HEB-FAJITA-FLOUR': 2,
      'HEB-MI-TIENDA': 2,
    },
  },
  {
    id: 'fajita-night',
    label: 'Fajita Night',
    icon: Flame,
    description: 'Fajita-sized flour & corn tortillas',
    mix: {
      'HEB-FAJITA-FLOUR': 4,
      'HEB-FLOUR': 3,
      'HEB-WHITE-CORN': 2,
      'HEB-STREET-TACO': 1,
    },
  },
];

// Slider stops map to tier thresholds
const SLIDER_MIN = 16;
const SLIDER_MAX = 96;
const SLIDER_STEP = 4;

interface WholesaleQuickStartProps {
  onApplyPreset: (quantities: Record<string, number>) => void;
}

export const WholesaleQuickStart: React.FC<WholesaleQuickStartProps> = ({
  onApplyPreset,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [packCount, setPackCount] = useState(16);

  const activePreset = presets.find((p) => p.id === selectedPreset) || null;

  // Compute quantities from preset + slider
  const computedQuantities = useMemo(() => {
    if (!activePreset) return {};

    const totalWeight = Object.values(activePreset.mix).reduce((s, w) => s + w, 0);
    const result: Record<string, number> = {};
    let allocated = 0;

    // Sort by weight descending so remainder goes to the biggest item
    const entries = Object.entries(activePreset.mix).sort(([, a], [, b]) => b - a);

    for (let i = 0; i < entries.length; i++) {
      const [sku, weight] = entries[i];
      if (i === entries.length - 1) {
        // Last item gets remainder to ensure exact total
        result[sku] = packCount - allocated;
      } else {
        const raw = Math.round((weight / totalWeight) * packCount);
        result[sku] = raw;
        allocated += raw;
      }
    }

    // Ensure no negative values
    for (const sku of Object.keys(result)) {
      if (result[sku] < 0) result[sku] = 0;
    }

    return result;
  }, [activePreset, packCount]);

  const handleSelect = (presetId: string) => {
    if (selectedPreset === presetId) {
      setSelectedPreset(null);
      return;
    }
    setSelectedPreset(presetId);
  };

  const handleApply = () => {
    if (!activePreset) return;
    onApplyPreset(computedQuantities);
  };

  // Tier label for current slider value
  const tierLabel = packCount >= 96
    ? 'Enterprise (25% off)'
    : packCount >= 48
      ? 'Professional (20% off)'
      : packCount >= 32
        ? 'Business (15% off)'
        : 'Starter (10% off)';

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-0.5">
        <SlidersHorizontal className="w-4 h-4 text-sunset-500" />
        <h3 className="text-sm font-bold text-charcoal-950">Quick Start</h3>
      </div>
      <p className="text-xs text-gray-500 mb-3">
        Pick a focus, set your volume, and we&apos;ll fill your cart.
      </p>

      {/* Preset Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        {presets.map((preset) => {
          const isActive = selectedPreset === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => handleSelect(preset.id)}
              className={`group flex items-center gap-2 p-2.5 rounded-lg border-2 transition-all ${
                isActive
                  ? 'border-sunset-500 bg-sunset-50'
                  : 'border-gray-200 hover:border-sunset-300 hover:bg-gray-50'
              }`}
            >
              <preset.icon
                className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-sunset-600' : 'text-gray-400 group-hover:text-sunset-500'}`}
              />
              <div className="text-left min-w-0">
                <span
                  className={`text-xs font-semibold block ${isActive ? 'text-sunset-700' : 'text-charcoal-800'}`}
                >
                  {preset.label}
                </span>
                <span className="text-[10px] text-gray-500 leading-tight block truncate">
                  {preset.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Volume Slider + Apply (only shown when preset is selected) */}
      {activePreset && (
        <div className="bg-cream-50 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-charcoal-800">Volume</span>
            <span className="text-sm font-bold text-sunset-600">
              {packCount} packs — {tierLabel}
            </span>
          </div>

          {/* Slider */}
          <div className="relative">
            <input
              type="range"
              min={SLIDER_MIN}
              max={SLIDER_MAX}
              step={SLIDER_STEP}
              value={packCount}
              onChange={(e) => setPackCount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sunset-500
                [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
                [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-sunset-500
                [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white
                [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
            />
            {/* Tier tick marks */}
            <div className="flex justify-between mt-1 px-0.5">
              {[16, 32, 48, 96].map((tick) => (
                <div
                  key={tick}
                  className="flex flex-col items-center"
                  style={{
                    position: 'absolute',
                    left: `${((tick - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100}%`,
                    transform: 'translateX(-50%)',
                  }}
                >
                  <div className={`w-1 h-1 rounded-full mt-1 ${packCount >= tick ? 'bg-sunset-500' : 'bg-gray-300'}`} />
                  <span className="text-[10px] text-gray-400 mt-0.5">{tick}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preview of what gets added */}
          <div className="pt-2">
            <p className="text-xs text-gray-500 mb-2">This will add:</p>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(computedQuantities)
                .filter(([, qty]) => qty > 0)
                .map(([sku, qty]) => {
                  // Shorten SKU for display
                  const shortName = sku.replace('HEB-', '').replace(/-/g, ' ');
                  return (
                    <span
                      key={sku}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-gray-200 rounded text-xs text-charcoal-700"
                    >
                      <span className="font-medium">{qty}x</span> {shortName}
                    </span>
                  );
                })}
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleApply}
            className="w-full mt-2 py-2.5 bg-sunset-500 hover:bg-sunset-600 text-white font-bold rounded-lg text-sm transition-colors active:scale-[0.98]"
          >
            Apply {activePreset.label} Mix ({packCount} packs)
          </button>
        </div>
      )}
    </div>
  );
};
