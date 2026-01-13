// Alumni chapter event tier configuration
// Base price: $20/pack = 20 tortillas per pack
// For UT alumni chapters OUTSIDE Texas who can't get H-E-B locally

export interface AlumniTier {
  id: string;
  name: string;
  tagline: string;
  description: string;

  // Volume details
  packCount: number;
  tortillaCount: number;

  // Pricing (all in cents)
  discountPercent: number;
  pricePerPack: number;
  totalPrice: number;

  // Display
  useCase: string;
  servings: string;
  isBestValue?: boolean;
  features: string[];
}

// Base retail price per pack (in cents)
export const BASE_PRICE_PER_PACK = 2000; // $20.00

export const alumniTiers: AlumniTier[] = [
  {
    id: 'tier-personal',
    name: 'Longhorn Single',
    tagline: 'For personal cravings',
    description: 'Miss those breakfast tacos? Get your fix delivered.',
    packCount: 2,
    tortillaCount: 40,
    discountPercent: 0,
    pricePerPack: 2000, // $20.00
    totalPrice: 4000, // $40.00
    useCase: 'Personal orders',
    servings: '~15-20 servings',
    features: [
      '40 tortillas delivered',
      'Free shipping at 4+ packs',
      'Vacuum sealed for freshness',
      'Freeze for months',
    ],
  },
  {
    id: 'tier-chapter-dinner',
    name: 'Chapter Dinner',
    tagline: 'Weekly chapter meals',
    description: 'Perfect for regular chapter gatherings and watch parties.',
    packCount: 8,
    tortillaCount: 160,
    discountPercent: 10,
    pricePerPack: 1800, // $18.00
    totalPrice: 14400, // $144.00
    useCase: 'Weekly chapter meals',
    servings: '~50-80 servings',
    features: [
      '160 tortillas (8 packs)',
      'Free shipping included',
      '10% chapter discount',
      'Perfect for watch parties',
    ],
  },
  {
    id: 'tier-tailgate',
    name: 'Tailgate Pack',
    tagline: 'Game day ready',
    description: 'Enough tortillas to feed the whole tailgate crew.',
    packCount: 16,
    tortillaCount: 320,
    discountPercent: 15,
    pricePerPack: 1700, // $17.00
    totalPrice: 27200, // $272.00
    useCase: 'Game day events',
    servings: '~100-150 servings',
    isBestValue: true,
    features: [
      '320 tortillas (16 packs)',
      'Free shipping included',
      '15% chapter discount',
      'Feeds a crowd',
    ],
  },
  {
    id: 'tier-formal',
    name: 'Rush/Formal',
    tagline: 'Big events',
    description: 'For rush week, formals, and major chapter events.',
    packCount: 32,
    tortillaCount: 640,
    discountPercent: 20,
    pricePerPack: 1600, // $16.00
    totalPrice: 51200, // $512.00
    useCase: 'Major chapter events',
    servings: '~200-300 servings',
    features: [
      '640 tortillas (32 packs)',
      'Free shipping included',
      '20% chapter discount',
      'Custom delivery scheduling',
      'Dedicated support',
    ],
  },
];

// Get tier by ID
export function getAlumniTier(tierId: string): AlumniTier | undefined {
  return alumniTiers.find((tier) => tier.id === tierId);
}

// Calculate price for custom pack count
export function calculateAlumniPrice(packCount: number): {
  discountPercent: number;
  pricePerPack: number;
  totalPrice: number;
  savings: number;
  tier: AlumniTier | null;
} {
  const retailTotal = packCount * BASE_PRICE_PER_PACK;

  if (packCount >= 32) {
    const totalPrice = packCount * 1600;
    return {
      discountPercent: 20,
      pricePerPack: 1600,
      totalPrice,
      savings: retailTotal - totalPrice,
      tier: alumniTiers[3],
    };
  } else if (packCount >= 16) {
    const totalPrice = packCount * 1700;
    return {
      discountPercent: 15,
      pricePerPack: 1700,
      totalPrice,
      savings: retailTotal - totalPrice,
      tier: alumniTiers[2],
    };
  } else if (packCount >= 8) {
    const totalPrice = packCount * 1800;
    return {
      discountPercent: 10,
      pricePerPack: 1800,
      totalPrice,
      savings: retailTotal - totalPrice,
      tier: alumniTiers[1],
    };
  } else {
    return {
      discountPercent: 0,
      pricePerPack: 2000,
      totalPrice: retailTotal,
      savings: 0,
      tier: alumniTiers[0],
    };
  }
}
