// Wholesale tier configuration
// Tiers are based on total packs ordered per month
// Discount percentage applies to each product's retail price

export interface WholesaleTier {
  id: string;
  name: string;
  description: string;

  // Volume details
  packsPerWeek: number;
  packsPerMonth: number;

  // Pricing
  discountPercent: number;

  // Display
  idealFor: string;
  isBestValue?: boolean;
  features: string[];
}

// Quantity adjustment increment (4 packs)
export const PACK_INCREMENT = 4;

// Calculate wholesale price for a product given its retail price and tier discount
export function getWholesalePrice(retailPriceCents: number, discountPercent: number): number {
  return Math.round(retailPriceCents * (1 - discountPercent / 100));
}

export const wholesaleTiers: WholesaleTier[] = [
  {
    id: 'tier-starter',
    name: 'Starter',
    description: 'Perfect for small cafes and food trucks getting started',
    packsPerWeek: 4,
    packsPerMonth: 16,
    discountPercent: 10,
    idealFor: 'Small cafes, home caterers',
    features: [
      '10% off all products',
      'Weekly delivery available',
      'Free shipping on all orders',
      'Choose from full tortilla catalog',
    ],
  },
  {
    id: 'tier-business',
    name: 'Business',
    description: 'For growing restaurants with steady demand',
    packsPerWeek: 8,
    packsPerMonth: 32,
    discountPercent: 15,
    idealFor: 'Food trucks, small restaurants',
    isBestValue: true,
    features: [
      '15% off all products',
      'Weekly delivery included',
      'Free shipping on all orders',
      'Choose from full tortilla catalog',
      'Priority fulfillment',
    ],
  },
  {
    id: 'tier-professional',
    name: 'Professional',
    description: 'High-volume solution for busy kitchens',
    packsPerWeek: 12,
    packsPerMonth: 48,
    discountPercent: 20,
    idealFor: 'Busy restaurants, catering companies',
    features: [
      '20% off all products',
      'Weekly delivery included',
      'Free shipping on all orders',
      'Choose from full tortilla catalog',
      'Dedicated account support',
    ],
  },
  {
    id: 'tier-enterprise',
    name: 'Enterprise',
    description: 'Maximum savings for large-scale operations',
    packsPerWeek: 24,
    packsPerMonth: 96,
    discountPercent: 25,
    idealFor: 'Restaurant chains, large caterers',
    features: [
      '25% off all products',
      'Weekly delivery included',
      'Free shipping on all orders',
      'Choose from full tortilla catalog',
      'Custom delivery schedule',
    ],
  },
];

// Calculate discount info for a given pack count based on tier thresholds
export function calculateWholesalePrice(packCount: number): {
  discountPercent: number;
  tier: WholesaleTier | null;
} {
  if (packCount >= 96) {
    return { discountPercent: 25, tier: wholesaleTiers[3] };
  } else if (packCount >= 48) {
    return { discountPercent: 20, tier: wholesaleTiers[2] };
  } else if (packCount >= 32) {
    return { discountPercent: 15, tier: wholesaleTiers[1] };
  } else if (packCount >= 16) {
    return { discountPercent: 10, tier: wholesaleTiers[0] };
  } else {
    return { discountPercent: 0, tier: null };
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
