// Product catalog - centralized source of truth
export const products = [
  {
    sku: 'TTC-MT-CORN-SS',
    name: 'Mi Tienda-style Corn Tortillas (Shelf-Stable)',
    price: 999, // Price in cents ($9.99)
    description: 'Authentic Texas corn tortillas with that perfect texture',
    image: '/images/products/corn-tortillas.jpg',
    storage: 'shelf_stable' as const,
    category: 'corn',
  },
  {
    sku: 'TTC-BUTTER-FLOUR',
    name: 'Butter Flour Tortillas (Family Pack)',
    price: 1299, // Price in cents ($12.99)
    description: 'Soft, buttery flour tortillas perfect for the whole family',
    image: '/images/products/butter-tortillas.jpg',
    storage: 'shelf_stable' as const,
    category: 'butter',
  },
];

// Helper function to get product by SKU (for server-side use)
export function getProductBySku(sku: string) {
  return products.find((p) => p.sku === sku);
}
