// Military care package bundle configuration
// For Texan service members stationed OUTSIDE Texas
// Shelf-stable products only (no green sauce)

export interface CarePackageBundle {
  id: string;
  name: string;
  tagline: string;
  description: string;

  // Contents
  packCount: number;
  tortillaCount: number;
  includesExtras: boolean;
  extras?: string[];

  // Pricing (all in cents)
  price: number;
  shippingNote: string;

  // Display
  useCase: string;
  isBestValue?: boolean;
  isCustom?: boolean;
  features: string[];
}

export const carePackageBundles: CarePackageBundle[] = [
  {
    id: 'bundle-taste',
    name: 'Taste of Home',
    tagline: 'A little piece of Texas',
    description: 'Perfect for a personal treat or first-time gift.',
    packCount: 1,
    tortillaCount: 20,
    includesExtras: false,
    price: 2500, // $25.00
    shippingNote: 'Express shipping: $55-$65',
    useCase: 'Personal treat',
    features: [
      '1 pack flour tortillas (20 count)',
      'Vacuum sealed for freshness',
      'Handwritten note option',
      'Fast international delivery',
    ],
  },
  {
    id: 'bundle-care',
    name: 'Texas Care Package',
    tagline: 'The complete care package',
    description: 'Our most popular gift - enough to share and enjoy.',
    packCount: 2,
    tortillaCount: 40,
    includesExtras: true,
    extras: ['Texas seasoning blend', 'Recipe cards'],
    price: 4500, // $45.00
    shippingNote: 'Express shipping: $65-$80',
    useCase: 'Standard gift',
    isBestValue: true,
    features: [
      '2 packs flour tortillas (40 count)',
      'Texas seasoning blend included',
      'Recipe cards for easy meals',
      'Handwritten note option',
      'Fast international delivery',
    ],
  },
  {
    id: 'bundle-squad',
    name: 'Squad Pack',
    tagline: 'Maximum standard order',
    description: 'Our largest standard package - share with your crew.',
    packCount: 4,
    tortillaCount: 80,
    includesExtras: true,
    extras: ['Texas seasoning blend x2', 'Recipe cards', 'Hot sauce packets'],
    price: 7500, // $75.00
    shippingNote: 'Express shipping: $85-$100',
    useCase: 'Share with unit',
    features: [
      '4 packs flour tortillas (80 count)',
      'Texas seasoning blend x2',
      'Hot sauce packet variety',
      'Recipe cards included',
      'Fast international delivery',
    ],
  },
  {
    id: 'bundle-custom',
    name: 'Custom Order',
    tagline: 'Need more than 4 packs?',
    description: 'Contact us for custom large orders for your unit.',
    packCount: 5,
    tortillaCount: 100,
    includesExtras: true,
    extras: ['Custom configuration available'],
    price: 0, // Custom quote
    shippingNote: 'Contact for custom shipping quote',
    useCase: 'Large group orders (5+ packs)',
    isCustom: true,
    features: [
      '5+ packs (100+ tortillas)',
      'Custom configuration',
      'Custom shipping quote',
      'Dedicated coordination',
      'Contact us to order',
    ],
  },
];

// Shipping cost estimates (in cents) - Express delivery only
export const shippingRates = {
  apo_fpo: {
    small: 5500, // 1 pack: ~$55
    medium: 6500, // 2 packs: ~$65
    large: 8500, // 4 packs: ~$85
    xlarge: 0, // 5+ packs: Custom quote
  },
  international: {
    small: 6000, // 1 pack: ~$60
    medium: 7500, // 2 packs: ~$75
    large: 9500, // 4 packs: ~$95
    xlarge: 0, // 5+ packs: Custom quote
  },
  express_international: {
    small: 6500, // 1 pack: ~$65
    medium: 8000, // 2 packs: ~$80
    large: 10000, // 4 packs: ~$100
    xlarge: 0, // 5+ packs: Custom quote
  },
};

// Get bundle by ID
export function getCarePackageBundle(bundleId: string): CarePackageBundle | undefined {
  return carePackageBundles.find((bundle) => bundle.id === bundleId);
}

// Calculate shipping based on address type and pack count
export function calculateMilitaryShipping(
  packCount: number,
  addressType: 'apo_fpo' | 'international' | 'express_international'
): number {
  const rates = shippingRates[addressType];

  if (packCount >= 8) return rates.xlarge;
  if (packCount >= 4) return rates.large;
  if (packCount >= 2) return rates.medium;
  return rates.small;
}

// Validate APO/FPO address format
export function isApoFpoAddress(address: string): boolean {
  const apoFpoRegex = /\b(APO|FPO|DPO)\s*(AA|AE|AP)\s*\d{5}/i;
  return apoFpoRegex.test(address);
}

// Get shipping method display name
export function getShippingMethodName(method: 'apo_fpo' | 'international' | 'express_international'): string {
  switch (method) {
    case 'apo_fpo':
      return 'USPS Military Mail (APO/FPO)';
    case 'international':
      return 'USPS Priority International';
    case 'express_international':
      return 'USPS Express International';
    default:
      return 'Standard Shipping';
  }
}

// Get estimated delivery time - All express shipping
export function getDeliveryEstimate(method: 'apo_fpo' | 'international' | 'express_international'): string {
  switch (method) {
    case 'apo_fpo':
      return '3-7 business days';
    case 'international':
      return '5-10 business days';
    case 'express_international':
      return '3-5 business days';
    default:
      return '5-10 business days';
  }
}
