// Product catalog - centralized source of truth
// Simple pricing: $20 per pack (20 tortillas each)
// Smart shipping: 1 pack = $10.60, 2-3 packs = $18.40, 4-5 packs = $22.65
// FREE SHIPPING on orders $80+ (4 packs)

// Free shipping threshold in cents ($80 = 4 packs)
export const FREE_SHIPPING_THRESHOLD = 8000;

// Shipping method type
export type ShippingMethod = 'usps' | 'ups_ground' | 'ups_3day' | 'ups_2day' | 'ups_nextday';

// UPS flat rates (in cents) - base rate for 1 pack
// These are approximate rates that can be adjusted
const UPS_RATES = {
  ground: 2500,     // ~$25 (3-5 business days)
  threeDay: 3300,   // ~$33 (3 business days)
  secondDay: 4500,  // ~$45 (2 business days)
  nextDay: 8500,    // ~$85 (next business day)
};

export interface Product {
  sku: string;
  name: string;
  description: string;
  image: string;
  price: number; // Price in cents ($20 = 2000)
  tortillaCount: number;
  storage: 'shelf_stable' | 'refrigerated';
  category: string;
  productType?: 'tortilla' | 'sauce' | 'wholesale'; // Distinguish between product types for shipping logic
  tortillaType?: string; // "Flour", "Corn", "Wheat", etc.
  isBestSeller?: boolean; // Show "Best Seller" badge
  savingsPercent?: number; // Show savings percentage (e.g., 15 for "15% OFF")
}

export const products: Product[] = [
  {
    sku: 'HEB-FLOUR',
    name: 'H-E-B Bakery Flour Tortillas',
    description: 'Regular flour tortilla made fresh in the bakery section. Soft, wrap-friendly, very versatile.',
    image: '/images/products/flour-tortillas-heb.webp',
    price: 2000, // $20 per pack
    tortillaCount: 20,
    storage: 'shelf_stable',
    category: 'flour',
    productType: 'tortilla',
    tortillaType: 'Flour',
    isBestSeller: true,
  },
  {
    sku: 'HEB-BUTTER',
    name: 'H-E-B Bakery Butter Tortillas',
    description: 'A flour tortilla with a buttery taste and aroma. Great for breakfast tacos or when you want something rich and softer.',
    image: '/images/products/butter-tortillas-heb.webp',
    price: 2000, // $20 per pack
    tortillaCount: 20,
    storage: 'shelf_stable',
    category: 'flour',
    productType: 'tortilla',
    tortillaType: 'Butter',
  },
  {
    sku: 'HEB-WHEAT',
    name: 'H-E-B Bakery Wheat Tortillas',
    description: 'Whole wheat tortillas with wholesome grain flavor. Perfect for health-conscious meals without sacrificing taste.',
    image: '/images/products/wheat-tortillas-heb.webp',
    price: 1000, // $10 per pack
    tortillaCount: 10,
    storage: 'shelf_stable',
    category: 'wheat',
    productType: 'tortilla',
    tortillaType: 'Wheat',
  },
  {
    sku: 'HEB-GREEN-SAUCE',
    name: 'H-E-B That Green Sauce',
    description: 'The legendary H-E-B That Green Sauce. Perfect for tacos, enchiladas, and everything in between.',
    image: '/images/products/green-sauce-heb.webp',
    price: 1200, // $12 per bottle
    tortillaCount: 0, // Not a tortilla product
    storage: 'refrigerated',
    category: 'sauce',
    productType: 'sauce',
  },
];

// Wholesale products - tiered pricing with volume discounts
// All wholesale orders include free shipping
export const wholesaleProducts: Product[] = [
  {
    sku: 'WHOLESALE-TIER-STARTER',
    name: 'Wholesale Starter Pack',
    description: '10% wholesale discount - 20 tortillas per pack. Free shipping included.',
    image: '/images/products/flour-tortillas-heb.webp',
    price: 1800, // $18 per pack (10% off $20)
    tortillaCount: 20,
    storage: 'shelf_stable',
    category: 'wholesale',
    productType: 'wholesale',
    tortillaType: 'Flour',
  },
  {
    sku: 'WHOLESALE-TIER-BUSINESS',
    name: 'Wholesale Business Pack',
    description: '15% wholesale discount - 20 tortillas per pack. Free shipping included.',
    image: '/images/products/flour-tortillas-heb.webp',
    price: 1700, // $17 per pack (15% off $20)
    tortillaCount: 20,
    storage: 'shelf_stable',
    category: 'wholesale',
    productType: 'wholesale',
    tortillaType: 'Flour',
  },
  {
    sku: 'WHOLESALE-TIER-PROFESSIONAL',
    name: 'Wholesale Professional Pack',
    description: '20% wholesale discount - 20 tortillas per pack. Free shipping included.',
    image: '/images/products/flour-tortillas-heb.webp',
    price: 1600, // $16 per pack (20% off $20)
    tortillaCount: 20,
    storage: 'shelf_stable',
    category: 'wholesale',
    productType: 'wholesale',
    tortillaType: 'Flour',
  },
  {
    sku: 'WHOLESALE-TIER-ENTERPRISE',
    name: 'Wholesale Enterprise Pack',
    description: '25% wholesale discount - 20 tortillas per pack. Free shipping included.',
    image: '/images/products/flour-tortillas-heb.webp',
    price: 1500, // $15 per pack (25% off $20)
    tortillaCount: 20,
    storage: 'shelf_stable',
    category: 'wholesale',
    productType: 'wholesale',
    tortillaType: 'Flour',
  },
];

// Check if an item is a wholesale product
export function isWholesaleProduct(sku: string): boolean {
  return sku.startsWith('WHOLESALE-');
}

// Get wholesale product by SKU
export function getWholesaleProductBySku(sku: string) {
  return wholesaleProducts.find((p) => p.sku === sku);
}

// Helper function to get product by SKU
export function getProductBySku(sku: string) {
  return products.find((p) => p.sku === sku);
}

// Calculate smart shipping based on cart items
// Shipping logic:
// - FREE shipping on orders $80+ (4+ tortilla packs)
// - FREE shipping on all wholesale orders
// - Sauce-only orders: $9.99 flat rate
// - Orders with tortillas: Calculate based on tortilla pack count only (sauce ships free with tortillas)
// - Tortilla tiers: 1 pack = $10.60, 2-3 packs = $18.40, 4-5 packs = $22.65
export function calculateShipping(
  items: { productType?: string; quantity: number; sku?: string }[],
  subtotal?: number
): number {
  // FREE shipping for orders $80+
  if (subtotal !== undefined && subtotal >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }

  // FREE shipping for wholesale orders
  const hasWholesale = items.some(item => item.sku?.startsWith('WHOLESALE-') || item.productType === 'wholesale');
  if (hasWholesale) {
    return 0;
  }

  // Count tortilla packs (items that are not sauce)
  const tortillaPacks = items
    .filter(item => item.productType !== 'sauce')
    .reduce((total, item) => total + item.quantity, 0);

  // Check if there are any sauce items
  const hasSauce = items.some(item => item.productType === 'sauce');

  // If there are tortillas, calculate shipping based on tortilla count only
  if (tortillaPacks > 0) {
    if (tortillaPacks === 1) return 1060; // $10.60 - Padded envelope
    if (tortillaPacks <= 3) return 1840; // $18.40 - Medium box (2-3 packs)
    if (tortillaPacks <= 5) return 2265; // $22.65 - Large flat rate box (4-5 packs)

    // For 6+ packs, calculate based on multiples of large boxes
    const largeBoxes = Math.ceil(tortillaPacks / 5);
    return largeBoxes * 2265;
  }

  // If only sauce (no tortillas), charge sauce shipping
  if (hasSauce) {
    return 999; // $9.99 - Sauce-only shipping
  }

  // Empty cart
  return 0;
}

// Calculate what shipping WOULD be without free shipping threshold
// Used for showing "You're saving $X" messaging
export function calculateBaseShipping(items: { productType?: string; quantity: number }[]): number {
  const tortillaPacks = items
    .filter(item => item.productType !== 'sauce')
    .reduce((total, item) => total + item.quantity, 0);

  const hasSauce = items.some(item => item.productType === 'sauce');

  if (tortillaPacks > 0) {
    if (tortillaPacks === 1) return 1060;
    if (tortillaPacks <= 3) return 1840;
    if (tortillaPacks <= 5) return 2265;
    const largeBoxes = Math.ceil(tortillaPacks / 5);
    return largeBoxes * 2265;
  }

  if (hasSauce) {
    return 999;
  }

  return 0;
}

// Calculate shipping for a specific method
export function getShippingCost(
  items: { productType?: string; quantity: number }[],
  method: ShippingMethod,
  subtotal?: number
): number {
  // FREE shipping for orders $100+ (USPS only - UPS always charged)
  if (method === 'usps' && subtotal !== undefined && subtotal >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }

  // Count tortilla packs (items that are not sauce)
  const tortillaPacks = items
    .filter(item => item.productType !== 'sauce')
    .reduce((total, item) => total + item.quantity, 0);

  // Check if there are any sauce items
  const hasSauce = items.some(item => item.productType === 'sauce');

  if (method === 'usps') {
    return calculateShipping(items);
  }

  // UPS shipping - flat rates (no free shipping on expedited)
  if (tortillaPacks > 0) {
    switch (method) {
      case 'ups_ground':
        return UPS_RATES.ground;
      case 'ups_3day':
        return UPS_RATES.threeDay;
      case 'ups_2day':
        return UPS_RATES.secondDay;
      case 'ups_nextday':
        return UPS_RATES.nextDay;
      default:
        return UPS_RATES.threeDay; // Default to 3-day
    }
  }

  // Sauce-only UPS order
  if (hasSauce) {
    return 999; // $9.99 - Sauce-only shipping (same as USPS)
  }

  return 0;
}

// Get all shipping options for display
export function getShippingOptions(
  items: { productType?: string; quantity: number }[],
  subtotal?: number
): {
  usps: number;
  ups_ground: number;
  ups_3day: number;
  ups_2day: number;
  ups_nextday: number;
} {
  return {
    usps: getShippingCost(items, 'usps', subtotal),
    ups_ground: getShippingCost(items, 'ups_ground', subtotal),
    ups_3day: getShippingCost(items, 'ups_3day', subtotal),
    ups_2day: getShippingCost(items, 'ups_2day', subtotal),
    ups_nextday: getShippingCost(items, 'ups_nextday', subtotal),
  };
}

// Free shipping progress helper
export function getFreeShippingProgress(subtotal: number): {
  qualifies: boolean;
  amountRemaining: number;
  percentComplete: number;
  savedAmount: number;
} {
  const qualifies = subtotal >= FREE_SHIPPING_THRESHOLD;
  const amountRemaining = qualifies ? 0 : FREE_SHIPPING_THRESHOLD - subtotal;
  const percentComplete = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  // Estimate savings (based on 4-pack shipping cost)
  const savedAmount = qualifies ? 2265 : 0; // $22.65 for 4 packs

  return {
    qualifies,
    amountRemaining,
    percentComplete,
    savedAmount,
  };
}
