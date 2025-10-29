// Product catalog - centralized source of truth
// Each package contains 20 tortillas
// Pricing: $15 for first pack, $10 for each additional pack (applied in cart)
export const products = [
  {
    sku: 'HEB-BUTTER-FLOUR',
    name: 'H-E-B Bakery Butter Flour Tortillas',
    price: 1500, // $15 base price (tiered pricing applied in cart)
    description: 'A flour tortilla with a buttery taste and aroma. Great for breakfast tacos or when you want something rich and softer. 20 tortillas per pack.',
    image: '/images/products/butter-flour-tortillas.jpg',
    storage: 'shelf_stable' as const,
    category: 'flour',
    tortillaCount: 20,
  },
  {
    sku: 'HEB-BAKERY-FLOUR',
    name: 'H-E-B Bakery Flour Tortillas',
    price: 1500,
    description: 'Regular flour tortilla made fresh in the bakery section. Soft, wrap-friendly, very versatile. 20 tortillas per pack.',
    image: '/images/products/bakery-flour-tortillas.jpg',
    storage: 'shelf_stable' as const,
    category: 'flour',
    tortillaCount: 20,
  },
  {
    sku: 'HEB-HOMESTYLE-FLOUR',
    name: 'H-E-B Homestyle Flour Tortillas',
    price: 1500,
    description: 'A flour version labeled "homestyle" (7-inch diameter) for tacos and fajitas with a soft, fluffy texture. 20 tortillas per pack.',
    image: '/images/products/homestyle-flour-tortillas.jpg',
    storage: 'shelf_stable' as const,
    category: 'flour',
    tortillaCount: 20,
  },
  {
    sku: 'HEB-YELLOW-CORN',
    name: 'H-E-B Yellow Corn Tortillas',
    price: 1500,
    description: 'Traditional corn tortillas (yellow corn) made for street-taco style. Smaller diameter and corn-based. 20 tortillas per pack.',
    image: '/images/products/yellow-corn-tortillas.jpg',
    storage: 'shelf_stable' as const,
    category: 'corn',
    tortillaCount: 20,
  },
  {
    sku: 'HEB-MIXLA-BLEND',
    name: 'H-E-B Mixla Corn & Flour Blend Tortillas',
    price: 1500,
    description: 'A blend of corn and flour (50/50 mix). Good compromise if you like some corn flavor with flour flexibility. 20 tortillas per pack.',
    image: '/images/products/mixla-blend-tortillas.jpg',
    storage: 'shelf_stable' as const,
    category: 'blend',
    tortillaCount: 20,
  },
  {
    sku: 'HEB-WHEAT',
    name: 'H-E-B Fresh Wheat Tortillas',
    price: 1500,
    description: 'Wheat flour version for when you want something a little more whole-grain with a different texture. 20 tortillas per pack.',
    image: '/images/products/wheat-tortillas.jpg',
    storage: 'shelf_stable' as const,
    category: 'wheat',
    tortillaCount: 20,
  },
  {
    sku: 'HEB-CARB-SENSE',
    name: 'H-E-B Carb Sense Flour Tortillas',
    price: 1500,
    description: 'A low-carb flour tortilla alternative with only 4g net carbs each. Good if you\'re watching carbs. 20 tortillas per pack.',
    image: '/images/products/carb-sense-tortillas.jpg',
    storage: 'shelf_stable' as const,
    category: 'low-carb',
    tortillaCount: 20,
  },
  {
    sku: 'HEB-SOUTHWESTERN',
    name: 'H-E-B Bakery Southwestern Flour Tortillas',
    price: 1500,
    description: 'A flavored variant of flour tortilla with Southwestern seasoning for something with a twist. 20 tortillas per pack.',
    image: '/images/products/southwestern-tortillas.jpg',
    storage: 'shelf_stable' as const,
    category: 'flour',
    tortillaCount: 20,
  },
];

// Helper function to get product by SKU (for server-side use)
export function getProductBySku(sku: string) {
  return products.find((p) => p.sku === sku);
}
