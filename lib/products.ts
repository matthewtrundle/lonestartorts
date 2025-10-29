// Product catalog - centralized source of truth
// Each package contains 20 tortillas
export const products = [
  // CORN TORTILLAS
  {
    sku: 'CORN-1PK',
    name: 'Corn Tortillas - Single Pack',
    price: 999, // $9.99
    description: 'Authentic Texas corn tortillas. 20 tortillas per pack.',
    image: '/images/products/corn-tortillas.jpg',
    storage: 'shelf_stable' as const,
    category: 'corn',
    packSize: 1,
    tortillaCount: 20,
    pricePerTortilla: 50, // cents
  },
  {
    sku: 'CORN-2PK',
    name: 'Corn Tortillas - 2 Pack Bundle',
    price: 1899, // $18.99 (5% savings vs buying 2 singles)
    description: 'Stock up and save! 40 tortillas total (2 packs of 20).',
    image: '/images/products/corn-tortillas.jpg',
    storage: 'shelf_stable' as const,
    category: 'corn',
    packSize: 2,
    tortillaCount: 40,
    pricePerTortilla: 47, // cents
    savingsPercent: 5,
  },
  {
    sku: 'CORN-4PK',
    name: 'Corn Tortillas - 4 Pack Bundle',
    price: 3599, // $35.99 (10% savings)
    description: 'Great value! 80 tortillas total (4 packs of 20).',
    image: '/images/products/corn-tortillas.jpg',
    storage: 'shelf_stable' as const,
    category: 'corn',
    packSize: 4,
    tortillaCount: 80,
    pricePerTortilla: 45, // cents
    savingsPercent: 10,
  },
  {
    sku: 'CORN-10PK',
    name: 'Corn Tortillas - 10 Pack Bulk',
    price: 8499, // $84.99 (15% savings)
    description: 'Best value! 200 tortillas total (10 packs of 20).',
    image: '/images/products/corn-tortillas.jpg',
    storage: 'shelf_stable' as const,
    category: 'corn',
    packSize: 10,
    tortillaCount: 200,
    pricePerTortilla: 42, // cents
    savingsPercent: 15,
  },

  // FLOUR TORTILLAS
  {
    sku: 'FLOUR-1PK',
    name: 'Flour Tortillas - Single Pack',
    price: 1299, // $12.99
    description: 'Soft, buttery flour tortillas. 20 tortillas per pack.',
    image: '/images/products/butter-tortillas.jpg',
    storage: 'shelf_stable' as const,
    category: 'flour',
    packSize: 1,
    tortillaCount: 20,
    pricePerTortilla: 65, // cents
  },
  {
    sku: 'FLOUR-2PK',
    name: 'Flour Tortillas - 2 Pack Bundle',
    price: 2499, // $24.99 (4% savings)
    description: 'Stock up and save! 40 tortillas total (2 packs of 20).',
    image: '/images/products/butter-tortillas.jpg',
    storage: 'shelf_stable' as const,
    category: 'flour',
    packSize: 2,
    tortillaCount: 40,
    pricePerTortilla: 62, // cents
    savingsPercent: 4,
  },
  {
    sku: 'FLOUR-4PK',
    name: 'Flour Tortillas - 4 Pack Bundle',
    price: 4799, // $47.99 (8% savings)
    description: 'Great value! 80 tortillas total (4 packs of 20).',
    image: '/images/products/butter-tortillas.jpg',
    storage: 'shelf_stable' as const,
    category: 'flour',
    packSize: 4,
    tortillaCount: 80,
    pricePerTortilla: 60, // cents
    savingsPercent: 8,
  },
  {
    sku: 'FLOUR-10PK',
    name: 'Flour Tortillas - 10 Pack Bulk',
    price: 10999, // $109.99 (15% savings)
    description: 'Best value! 200 tortillas total (10 packs of 20).',
    image: '/images/products/butter-tortillas.jpg',
    storage: 'shelf_stable' as const,
    category: 'flour',
    packSize: 10,
    tortillaCount: 200,
    pricePerTortilla: 55, // cents
    savingsPercent: 15,
  },
];

// Helper function to get product by SKU (for server-side use)
export function getProductBySku(sku: string) {
  return products.find((p) => p.sku === sku);
}
