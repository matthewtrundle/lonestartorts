// Product catalog - centralized source of truth
// Simple pricing: $20 per pack (20 tortillas each)
// Smart shipping: 1 pack = $10.60, 2-3 packs = $18.40, 4-5 packs = $22.65

// Shipping method type
export type ShippingMethod = 'usps' | 'fedex';

// FedEx 2nd Day extra costs (in cents) based on bag count
// Index 0 = 1 bag, Index 1 = 2 bags, etc. Index 14+ = 15+ bags
const FEDEX_EXTRA_COSTS = [
  900,   // 1 bag: +$9
  1000,  // 2 bags: +$10
  1200,  // 3 bags: +$12
  1400,  // 4 bags: +$14
  1600,  // 5 bags: +$16
  1900,  // 6 bags: +$19
  2200,  // 7 bags: +$22
  2500,  // 8 bags: +$25
  2700,  // 9 bags: +$27
  2900,  // 10 bags: +$29
  3100,  // 11 bags: +$31
  3300,  // 12 bags: +$33
  3500,  // 13 bags: +$35
  3700,  // 14 bags: +$37
  3900,  // 15+ bags: +$39
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
    image: '/images/products/flour-tortillas-heb.png',
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
    image: '/images/products/butter-tortillas-heb.png',
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
    image: '/images/products/wheat-tortillas-heb.png',
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
    image: '/images/products/green-sauce-heb.png',
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
// - Sauce-only orders: $9.99 flat rate
// - Orders with tortillas: Calculate based on tortilla pack count only (sauce ships free with tortillas)
// - Tortilla tiers: 1 pack = $10.60, 2-3 packs = $18.40, 4-5 packs = $22.65
export function calculateShipping(items: { productType?: string; quantity: number }[]): number {
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

// Get FedEx extra cost based on bag count (tortilla packs only)
export function getFedExExtraCost(bagCount: number): number {
  if (bagCount <= 0) return 0;
  const index = Math.min(bagCount - 1, FEDEX_EXTRA_COSTS.length - 1);
  return FEDEX_EXTRA_COSTS[index];
}

// Calculate shipping for a specific method
export function getShippingCost(
  items: { productType?: string; quantity: number }[],
  method: ShippingMethod
): number {
  const uspsShipping = calculateShipping(items);

  if (method === 'usps') {
    return uspsShipping;
  }

  // FedEx: USPS base + extra cost based on bag count
  const tortillaPacks = items
    .filter(item => item.productType !== 'sauce')
    .reduce((total, item) => total + item.quantity, 0);

  const fedexExtra = getFedExExtraCost(tortillaPacks);
  return uspsShipping + fedexExtra;
}

// Get both shipping options for display
export function getShippingOptions(items: { productType?: string; quantity: number }[]): {
  usps: number;
  fedex: number;
} {
  return {
    usps: getShippingCost(items, 'usps'),
    fedex: getShippingCost(items, 'fedex'),
  };
}
