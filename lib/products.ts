// Product catalog - centralized source of truth
// Simple pricing: $20 per pack (20 tortillas each)
// Simplified flat-rate shipping: 1 pack = $9.95, 2+ packs = $19.95
// FREE SHIPPING on orders $80+ (4 packs)

// Free shipping threshold in cents ($80 = 4 packs)
export const FREE_SHIPPING_THRESHOLD = 8000;

// Simplified flat-rate shipping (in cents)
export const SHIPPING_RATES = {
  small: 995,    // $9.95 for 1 pack (small box)
  large: 1995,   // $19.95 for 2+ packs (large box)
  sauce: 999,    // $9.99 for sauce-only orders
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

// Calculate flat-rate shipping based on cart items
// Shipping logic:
// - FREE shipping on orders $80+
// - FREE shipping on all wholesale orders
// - 1 pack: $9.95 (small box)
// - 2+ packs: $19.95 (large box)
// - Sauce-only: $9.99
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

  // Flat-rate shipping based on pack count
  if (tortillaPacks > 0) {
    // 1 pack = small box ($9.95), 2+ packs = large box ($19.95)
    return tortillaPacks === 1 ? SHIPPING_RATES.small : SHIPPING_RATES.large;
  }

  // If only sauce (no tortillas), charge sauce shipping
  if (hasSauce) {
    return SHIPPING_RATES.sauce;
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
    // Flat rate: 1 pack = $9.95, 2+ packs = $19.95
    return tortillaPacks === 1 ? SHIPPING_RATES.small : SHIPPING_RATES.large;
  }

  if (hasSauce) {
    return SHIPPING_RATES.sauce;
  }

  return 0;
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

  // Estimate savings (based on large box shipping cost)
  const savedAmount = qualifies ? SHIPPING_RATES.large : 0; // $19.95 for 2+ packs

  return {
    qualifies,
    amountRemaining,
    percentComplete,
    savedAmount,
  };
}
