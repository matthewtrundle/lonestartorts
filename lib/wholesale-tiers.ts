// Wholesale tier configuration
// Base price: $20/pack = $1/tortilla, 20 tortillas per pack

export interface WholesaleTier {
  id: string;
  name: string;
  description: string;

  // Volume details
  packsPerWeek: number;
  packsPerMonth: number;
  tortillasPerMonth: number;

  // Pricing (all in cents)
  discountPercent: number;
  pricePerTortilla: number;
  pricePerPack: number;
  monthlyCost: number;

  // Display
  idealFor: string;
  isBestValue?: boolean;
  features: string[];
}

// Quantity adjustment increment (4 packs = 80 tortillas)
export const PACK_INCREMENT = 4;

// Base retail price per pack (in cents)
export const BASE_PRICE_PER_PACK = 2000; // $20.00

export const wholesaleTiers: WholesaleTier[] = [
  {
    id: 'tier-starter',
    name: 'Starter',
    description: 'Perfect for small cafes and food trucks getting started',
    packsPerWeek: 4,
    packsPerMonth: 16,
    tortillasPerMonth: 320,
    discountPercent: 10,
    pricePerTortilla: 90, // $0.90
    pricePerPack: 1800, // $18.00
    monthlyCost: 28800, // $288/month
    idealFor: 'Small cafes, home caterers',
    features: [
      '320 tortillas/month',
      'Weekly delivery available',
      'Free shipping on all orders',
      '10% volume discount',
    ],
  },
  {
    id: 'tier-business',
    name: 'Business',
    description: 'For growing restaurants with steady demand',
    packsPerWeek: 8,
    packsPerMonth: 32,
    tortillasPerMonth: 640,
    discountPercent: 15,
    pricePerTortilla: 85, // $0.85
    pricePerPack: 1700, // $17.00
    monthlyCost: 54400, // $544/month
    idealFor: 'Food trucks, small restaurants',
    isBestValue: true,
    features: [
      '640 tortillas/month',
      'Weekly delivery included',
      'Free shipping on all orders',
      '15% volume discount',
      'Priority fulfillment',
    ],
  },
  {
    id: 'tier-professional',
    name: 'Professional',
    description: 'High-volume solution for busy kitchens',
    packsPerWeek: 12,
    packsPerMonth: 48,
    tortillasPerMonth: 960,
    discountPercent: 20,
    pricePerTortilla: 80, // $0.80
    pricePerPack: 1600, // $16.00
    monthlyCost: 76800, // $768/month
    idealFor: 'Busy restaurants, catering companies',
    features: [
      '960 tortillas/month',
      'Weekly delivery included',
      'Free shipping on all orders',
      '20% volume discount',
      'Dedicated account support',
    ],
  },
  {
    id: 'tier-enterprise',
    name: 'Enterprise',
    description: 'Maximum savings for large-scale operations',
    packsPerWeek: 24,
    packsPerMonth: 96,
    tortillasPerMonth: 1920,
    discountPercent: 25,
    pricePerTortilla: 75, // $0.75
    pricePerPack: 1500, // $15.00
    monthlyCost: 144000, // $1,440/month
    idealFor: 'Restaurant chains, large caterers',
    features: [
      '1,920 tortillas/month',
      'Weekly delivery included',
      'Free shipping on all orders',
      '25% volume discount',
      'Custom delivery schedule',
    ],
  },
];

// Calculate price for custom quantity based on tier thresholds
export function calculateWholesalePrice(packCount: number): {
  discountPercent: number;
  pricePerPack: number;
  pricePerTortilla: number;
  totalPrice: number;
  tier: WholesaleTier | null;
  savings: number;
} {
  const monthlyPacks = packCount;
  const retailTotal = monthlyPacks * BASE_PRICE_PER_PACK;

  if (monthlyPacks >= 96) {
    const totalPrice = monthlyPacks * 1500;
    return {
      discountPercent: 25,
      pricePerPack: 1500,
      pricePerTortilla: 75,
      totalPrice,
      tier: wholesaleTiers[3],
      savings: retailTotal - totalPrice,
    };
  } else if (monthlyPacks >= 48) {
    const totalPrice = monthlyPacks * 1600;
    return {
      discountPercent: 20,
      pricePerPack: 1600,
      pricePerTortilla: 80,
      totalPrice,
      tier: wholesaleTiers[2],
      savings: retailTotal - totalPrice,
    };
  } else if (monthlyPacks >= 32) {
    const totalPrice = monthlyPacks * 1700;
    return {
      discountPercent: 15,
      pricePerPack: 1700,
      pricePerTortilla: 85,
      totalPrice,
      tier: wholesaleTiers[1],
      savings: retailTotal - totalPrice,
    };
  } else if (monthlyPacks >= 16) {
    const totalPrice = monthlyPacks * 1800;
    return {
      discountPercent: 10,
      pricePerPack: 1800,
      pricePerTortilla: 90,
      totalPrice,
      tier: wholesaleTiers[0],
      savings: retailTotal - totalPrice,
    };
  } else {
    // Below wholesale minimum - standard pricing
    return {
      discountPercent: 0,
      pricePerPack: 2000,
      pricePerTortilla: 100,
      totalPrice: retailTotal,
      tier: null,
      savings: 0,
    };
  }
}

// Get the tier that applies for a given pack count
export function getTierForPackCount(packCount: number): WholesaleTier | null {
  if (packCount >= 96) return wholesaleTiers[3];
  if (packCount >= 48) return wholesaleTiers[2];
  if (packCount >= 32) return wholesaleTiers[1];
  if (packCount >= 16) return wholesaleTiers[0];
  return null;
}
