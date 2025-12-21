// Product catalog - centralized source of truth
// Simple pricing: $20 per pack (20 tortillas each)
// Smart shipping: 1 pack = $10.60, 2-3 packs = $18.40, 4-5 packs = $22.65
// FREE SHIPPING on orders $60+ (3 packs)

// Free shipping threshold in cents ($60)
export const FREE_SHIPPING_THRESHOLD = 6000;

// Shipping method type
export type ShippingMethod = 'usps' | 'fedex';

// FedEx 2nd Day Air flat rates (in cents) based on pack count
// Index 0 = 1 pack, Index 1 = 2 packs, etc.
const FEDEX_FLAT_RATES = [
  9000,   // 1 pack: $90
  9700,   // 2 packs: $97
  10500,  // 3 packs: $105
  11500,  // 4 packs: $115
  12500,  // 5 packs: $125
  13700,  // 6 packs: $137
];

export interface Product {
  sku: string;
  name: string;
  description: string;
  image: string;
  price: number; // Price in cents ($20 = 2000)
  tortillaCount: number;
  storage: 'shelf_stable' | 'refrigerated';
  category: string;
  productType?: 'tortilla' | 'sauce'; // Distinguish between product types for shipping logic
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
    price: 2000, // $20 per pack
    tortillaCount: 20,
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

// Helper function to get product by SKU
export function getProductBySku(sku: string) {
  return products.find((p) => p.sku === sku);
}

// Calculate smart shipping based on cart items
// Shipping logic:
// - FREE shipping on orders $60+ (3+ tortilla packs)
// - Sauce-only orders: $9.99 flat rate
// - Orders with tortillas: Calculate based on tortilla pack count only (sauce ships free with tortillas)
// - Tortilla tiers: 1 pack = $10.60, 2-3 packs = $18.40, 4-5 packs = $22.65
export function calculateShipping(
  items: { productType?: string; quantity: number }[],
  subtotal?: number
): number {
  // FREE shipping for orders $60+
  if (subtotal !== undefined && subtotal >= FREE_SHIPPING_THRESHOLD) {
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
  // FREE shipping for orders $60+ (USPS only - FedEx always charged)
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

  // FedEx 2nd Day Air - flat rates based on pack count (no free shipping)
  if (tortillaPacks > 0) {
    const index = Math.min(tortillaPacks - 1, FEDEX_FLAT_RATES.length - 1);
    return FEDEX_FLAT_RATES[index];
  }

  // Sauce-only FedEx order
  if (hasSauce) {
    return 999; // $9.99 - Sauce-only shipping (same as USPS)
  }

  return 0;
}

// Get both shipping options for display
export function getShippingOptions(
  items: { productType?: string; quantity: number }[],
  subtotal?: number
): {
  usps: number;
  fedex: number;
} {
  return {
    usps: getShippingCost(items, 'usps', subtotal),
    fedex: getShippingCost(items, 'fedex', subtotal),
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

  // Estimate savings (based on 3-pack shipping cost)
  const savedAmount = qualifies ? 1840 : 0; // $18.40 for 3 packs

  return {
    qualifies,
    amountRemaining,
    percentComplete,
    savedAmount,
  };
}
