// Product catalog - centralized source of truth
// Simple pricing: $20 per pack (20 tortillas each)
// Smart shipping: 1 pack = $10.60, 2-3 packs = $18.40, 4-5 packs = $22.65

export interface Product {
  sku: string;
  name: string;
  description: string;
  image: string;
  price: number; // Price in cents ($20 = 2000)
  tortillaCount: number;
  storage: 'shelf_stable' | 'refrigerated';
  category: string;
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
    tortillaType: 'Flour',
    isBestSeller: true,
  },
  {
    sku: 'HEB-BUTTER',
    name: 'H-E-B Bakery Butter Flour Tortillas',
    description: 'A flour tortilla with a buttery taste and aroma. Great for breakfast tacos or when you want something rich and softer.',
    image: '/images/products/butter-tortillas-heb.png',
    price: 2000, // $20 per pack
    tortillaCount: 20,
    storage: 'shelf_stable',
    category: 'flour',
    tortillaType: 'Flour',
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
    tortillaType: 'Wheat',
  },
];

// Helper function to get product by SKU
export function getProductBySku(sku: string) {
  return products.find((p) => p.sku === sku);
}

// Calculate smart shipping based on total packs
export function calculateShipping(totalPacks: number): number {
  if (totalPacks === 0) return 0;
  if (totalPacks === 1) return 1060; // $10.60 - Padded envelope
  if (totalPacks <= 3) return 1840; // $18.40 - Medium box (2-3 packs)
  if (totalPacks <= 5) return 2265; // $22.65 - Large flat rate box (4-5 packs)

  // For 6+ packs, calculate based on multiples of large boxes
  const largeBoxes = Math.ceil(totalPacks / 5);
  return largeBoxes * 2265;
}
