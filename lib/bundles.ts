// Bundle catalog - curated Texas care packages
// Pricing: 4 tiers from $99 to $499

import { getProductBySku } from './products';

export interface BundleItem {
  sku: string;
  quantity: number;
}

export interface ShopBundle {
  id: string;
  name: string;
  tagline: string;
  image: string;
  bundlePrice: number;    // Discounted price (cents)
  originalPrice: number;  // Sum of individual items (cents)
  contents: BundleItem[];
  isBestValue?: boolean;
  features: string[];
  servings?: string;      // "Feeds X-Y people"
}

// Calculate savings percentage
export function calculateSavingsPercent(original: number, bundle: number): number {
  return Math.round(((original - bundle) / original) * 100);
}

export const bundles: ShopBundle[] = [
  {
    id: 'texas-essentials',
    name: 'Texas Essentials',
    tagline: 'The perfect starter pack for Tex-Mex lovers',
    image: '/images/bundles/taco-night-kit.png',
    bundlePrice: 12000, // $120 (0% discount)
    originalPrice: 12000, // $120 value
    contents: [
      { sku: 'HEB-FLOUR', quantity: 2 },       // $40
      { sku: 'HEB-BUTTER', quantity: 1 },      // $20
      { sku: 'HEB-GREEN-SAUCE', quantity: 1 }, // $12
      { sku: 'HEB-RED-SAUCE', quantity: 1 },   // $12
      { sku: 'HEB-SALSA-MEDIUM', quantity: 1 },// $10
      { sku: 'HEB-TEXAS-CHIPS', quantity: 1 }, // $10
      { sku: 'HEB-TACO-SEASON', quantity: 1 }, // $8
      { sku: 'HEB-FAJITA-SEASON', quantity: 1 },// $8
    ],
    servings: 'Feeds 4-6 people',
    features: [
      '60 premium tortillas (flour & butter)',
      'Both legendary sauces (green & red)',
      'Restaurant-style salsa',
      'Texas-shaped chips',
      'Taco & fajita seasonings',
      'Perfect for date nights & small gatherings',
    ],
  },
  {
    id: 'family-fiesta',
    name: 'Family Fiesta',
    tagline: 'Everything your family needs for authentic Tex-Mex nights',
    image: '/images/bundles/breakfast-taco-box.png',
    bundlePrice: 23000, // $230 (5% discount)
    originalPrice: 24200, // $242 value
    contents: [
      { sku: 'HEB-FLOUR', quantity: 4 },       // $80
      { sku: 'HEB-BUTTER', quantity: 2 },      // $40
      { sku: 'HEB-WHEAT', quantity: 1 },       // $10
      { sku: 'HEB-GREEN-SAUCE', quantity: 2 }, // $24
      { sku: 'HEB-RED-SAUCE', quantity: 1 },   // $12
      { sku: 'HEB-SALSA-MEDIUM', quantity: 1 },// $10
      { sku: 'HEB-SALSA-HOT', quantity: 1 },   // $10
      { sku: 'HEB-TEXAS-CHIPS', quantity: 2 }, // $20
      { sku: 'HEB-BAKERY-CHIPS', quantity: 1 },// $12
      { sku: 'HEB-TACO-SEASON', quantity: 2 }, // $16
      { sku: 'HEB-FAJITA-SEASON', quantity: 1 },// $8
    ],
    servings: 'Feeds 8-12 people',
    features: [
      '130 premium tortillas (3 varieties)',
      'Extra green sauce (family favorite)',
      'Medium & hot salsas',
      'Texas chips variety pack',
      'Multiple seasonings for all your meals',
      'Great for weekly family dinners',
    ],
  },
  {
    id: 'party-pack',
    name: 'Party Pack',
    tagline: 'Host the ultimate Texas-themed party',
    image: '/images/bundles/fajita-fiesta.png',
    bundlePrice: 41500, // $415 (10% discount)
    originalPrice: 45900, // $459 value
    isBestValue: true,
    contents: [
      { sku: 'HEB-FLOUR', quantity: 6 },       // $120
      { sku: 'HEB-BUTTER', quantity: 4 },      // $80
      { sku: 'HEB-WHEAT', quantity: 2 },       // $20
      { sku: 'HEB-WHITE-CORN', quantity: 1 },  // $13 (fixed SKU)
      { sku: 'HEB-GREEN-SAUCE', quantity: 3 }, // $36
      { sku: 'HEB-RED-SAUCE', quantity: 2 },   // $24
      { sku: 'HEB-SALSA-MEDIUM', quantity: 2 },// $20
      { sku: 'HEB-SALSA-HOT', quantity: 2 },   // $20
      { sku: 'HEB-TEXAS-CHIPS', quantity: 3 }, // $30
      { sku: 'HEB-BAKERY-CHIPS', quantity: 2 },// $24
      { sku: 'HEB-LONE-STARS', quantity: 1 },  // $10
      { sku: 'HEB-PICA-PUFFS', quantity: 1 },  // $10
      { sku: 'HEB-TACO-SEASON', quantity: 2 }, // $16
      { sku: 'HEB-FAJITA-SEASON', quantity: 2 },// $16
      { sku: 'HEB-BRISKET-RUB', quantity: 1 }, // $10
      { sku: 'HEB-TEXAS-BBQ-SAUCE', quantity: 1 },// $10
    ],
    servings: 'Feeds 15-20 people',
    features: [
      '220+ tortillas (flour, butter, wheat & corn)',
      'Sauces & salsas galore',
      'Complete snack spread (4 varieties)',
      'Full seasoning collection',
      'BBQ essentials included',
      'Perfect for parties & game day',
    ],
  },
  {
    id: 'ultimate-texas',
    name: 'Ultimate Texas Experience',
    tagline: 'The complete Tex-Mex catering solution',
    image: '/images/bundles/ultimate-texas-box.png',
    bundlePrice: 73500, // $735 (15% discount)
    originalPrice: 86400, // $864 value
    contents: [
      { sku: 'HEB-FLOUR', quantity: 10 },      // $200
      { sku: 'HEB-BUTTER', quantity: 6 },      // $120
      { sku: 'HEB-WHEAT', quantity: 4 },       // $40
      { sku: 'HEB-WHITE-CORN', quantity: 2 },  // $26 (fixed SKU)
      { sku: 'HEB-MI-TIENDA', quantity: 2 },   // $36 (fixed SKU)
      { sku: 'HEB-GREEN-SAUCE', quantity: 4 }, // $48
      { sku: 'HEB-RED-SAUCE', quantity: 3 },   // $36
      { sku: 'HEB-GREEN-SAUCE-MILD', quantity: 1 },// $12
      { sku: 'HEB-SALSA-MEDIUM', quantity: 3 },// $30
      { sku: 'HEB-SALSA-HOT', quantity: 3 },   // $30
      { sku: 'HEB-SALSA-SMOKY-CITRUS', quantity: 1 },// $10 (fixed SKU)
      { sku: 'HEB-SALSA-HABANERO', quantity: 1 },// $10
      { sku: 'HEB-TEXAS-CHIPS', quantity: 4 }, // $40
      { sku: 'HEB-BAKERY-CHIPS', quantity: 3 },// $36
      { sku: 'HEB-LONE-STARS', quantity: 2 },  // $20
      { sku: 'HEB-PICA-PUFFS', quantity: 2 },  // $20
      { sku: 'HEB-TACO-SEASON', quantity: 3 }, // $24
      { sku: 'HEB-FAJITA-SEASON', quantity: 3 },// $24
      { sku: 'HEB-BRISKET-RUB', quantity: 2 }, // $20
      { sku: 'HEB-TEXAS-BBQ-SAUCE', quantity: 2 },// $20
      { sku: 'TERRY-BLACKS-BBQ', quantity: 1 },// $12
    ],
    servings: 'Feeds 30-40 people',
    features: [
      '460+ tortillas (all 5 varieties)',
      'Complete sauce collection (8 items)',
      'Every salsa heat level',
      'Massive snack spread (11 bags)',
      'Full seasoning & BBQ arsenal',
      'Perfect for weddings, reunions & large events',
    ],
  },
];

// Get bundle by ID
export function getBundleById(id: string): ShopBundle | undefined {
  return bundles.find(b => b.id === id);
}

// Get all bundles
export function getAllBundles(): ShopBundle[] {
  return bundles;
}

// Get bundle contents with full product details
export function getBundleWithProducts(bundle: ShopBundle) {
  return {
    ...bundle,
    products: bundle.contents.map(item => ({
      ...item,
      product: getProductBySku(item.sku),
    })),
  };
}

// Calculate actual bundle savings
export function getBundleSavings(bundle: ShopBundle): {
  savingsAmount: number;
  savingsPercent: number;
} {
  const savingsAmount = bundle.originalPrice - bundle.bundlePrice;
  const savingsPercent = calculateSavingsPercent(bundle.originalPrice, bundle.bundlePrice);
  return { savingsAmount, savingsPercent };
}
