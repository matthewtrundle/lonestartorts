// Product catalog - centralized source of truth
// Pack sizes: 1-pack (20 tortillas) = $20, 2-pack (40 tortillas) = $32
// Users select pack size, then adjust quantity in cart

export interface PackSize {
  size: 1 | 2;
  price: number; // Price in cents
  tortillaCount: number;
  sku: string; // Unique SKU for this pack size variant
}

export interface Product {
  baseId: string; // Base product identifier
  name: string;
  description: string;
  image: string;
  storage: 'shelf_stable' | 'refrigerated';
  category: string;
  packSizes: PackSize[];
}

export const products: Product[] = [
  {
    baseId: 'HEB-BUTTER-FLOUR',
    name: 'H-E-B Bakery Butter Flour Tortillas',
    description: 'A flour tortilla with a buttery taste and aroma. Great for breakfast tacos or when you want something rich and softer.',
    image: '/images/products/butter-flour-tortillas.jpg',
    storage: 'shelf_stable',
    category: 'flour',
    packSizes: [
      { size: 1, price: 2000, tortillaCount: 20, sku: 'HEB-BUTTER-FLOUR-1PK' },
      { size: 2, price: 3200, tortillaCount: 40, sku: 'HEB-BUTTER-FLOUR-2PK' },
    ],
  },
  {
    baseId: 'HEB-BAKERY-FLOUR',
    name: 'H-E-B Bakery Flour Tortillas',
    description: 'Regular flour tortilla made fresh in the bakery section. Soft, wrap-friendly, very versatile.',
    image: '/images/products/bakery-flour-tortillas.jpg',
    storage: 'shelf_stable',
    category: 'flour',
    packSizes: [
      { size: 1, price: 2000, tortillaCount: 20, sku: 'HEB-BAKERY-FLOUR-1PK' },
      { size: 2, price: 3200, tortillaCount: 40, sku: 'HEB-BAKERY-FLOUR-2PK' },
    ],
  },
  {
    baseId: 'HEB-HOMESTYLE-FLOUR',
    name: 'H-E-B Homestyle Flour Tortillas',
    description: 'A flour version labeled "homestyle" (7-inch diameter) for tacos and fajitas with a soft, fluffy texture.',
    image: '/images/products/homestyle-flour-tortillas.jpg',
    storage: 'shelf_stable',
    category: 'flour',
    packSizes: [
      { size: 1, price: 2000, tortillaCount: 20, sku: 'HEB-HOMESTYLE-FLOUR-1PK' },
      { size: 2, price: 3200, tortillaCount: 40, sku: 'HEB-HOMESTYLE-FLOUR-2PK' },
    ],
  },
  {
    baseId: 'HEB-YELLOW-CORN',
    name: 'H-E-B Yellow Corn Tortillas',
    description: 'Traditional corn tortillas (yellow corn) made for street-taco style. Smaller diameter and corn-based.',
    image: '/images/products/yellow-corn-tortillas.jpg',
    storage: 'shelf_stable',
    category: 'corn',
    packSizes: [
      { size: 1, price: 2000, tortillaCount: 20, sku: 'HEB-YELLOW-CORN-1PK' },
      { size: 2, price: 3200, tortillaCount: 40, sku: 'HEB-YELLOW-CORN-2PK' },
    ],
  },
  {
    baseId: 'HEB-MIXLA-BLEND',
    name: 'H-E-B Mixla Corn & Flour Blend Tortillas',
    description: 'A blend of corn and flour (50/50 mix). Good compromise if you like some corn flavor with flour flexibility.',
    image: '/images/products/mixla-blend-tortillas.jpg',
    storage: 'shelf_stable',
    category: 'blend',
    packSizes: [
      { size: 1, price: 2000, tortillaCount: 20, sku: 'HEB-MIXLA-BLEND-1PK' },
      { size: 2, price: 3200, tortillaCount: 40, sku: 'HEB-MIXLA-BLEND-2PK' },
    ],
  },
  {
    baseId: 'HEB-WHEAT',
    name: 'H-E-B Fresh Wheat Tortillas',
    description: 'Wheat flour version for when you want something a little more whole-grain with a different texture.',
    image: '/images/products/wheat-tortillas.jpg',
    storage: 'shelf_stable',
    category: 'wheat',
    packSizes: [
      { size: 1, price: 2000, tortillaCount: 20, sku: 'HEB-WHEAT-1PK' },
      { size: 2, price: 3200, tortillaCount: 40, sku: 'HEB-WHEAT-2PK' },
    ],
  },
  {
    baseId: 'HEB-CARB-SENSE',
    name: 'H-E-B Carb Sense Flour Tortillas',
    description: 'A low-carb flour tortilla alternative with only 4g net carbs each. Good if you\'re watching carbs.',
    image: '/images/products/carb-sense-tortillas.jpg',
    storage: 'shelf_stable',
    category: 'low-carb',
    packSizes: [
      { size: 1, price: 2000, tortillaCount: 20, sku: 'HEB-CARB-SENSE-1PK' },
      { size: 2, price: 3200, tortillaCount: 40, sku: 'HEB-CARB-SENSE-2PK' },
    ],
  },
  {
    baseId: 'HEB-SOUTHWESTERN',
    name: 'H-E-B Bakery Southwestern Flour Tortillas',
    description: 'A flavored variant of flour tortilla with Southwestern seasoning for something with a twist.',
    image: '/images/products/southwestern-tortillas.jpg',
    storage: 'shelf_stable',
    category: 'flour',
    packSizes: [
      { size: 1, price: 2000, tortillaCount: 20, sku: 'HEB-SOUTHWESTERN-1PK' },
      { size: 2, price: 3200, tortillaCount: 40, sku: 'HEB-SOUTHWESTERN-2PK' },
    ],
  },
];

// Helper function to get product by SKU (for server-side use)
export function getProductBySku(sku: string) {
  for (const product of products) {
    const packSize = product.packSizes.find((ps) => ps.sku === sku);
    if (packSize) {
      return {
        ...product,
        selectedPackSize: packSize,
        sku: packSize.sku,
        price: packSize.price,
        tortillaCount: packSize.tortillaCount,
      };
    }
  }
  return undefined;
}

// Helper to get all product variants (for APIs that need flat list)
export function getAllProductVariants() {
  return products.flatMap((product) =>
    product.packSizes.map((packSize) => ({
      sku: packSize.sku,
      name: `${product.name} (${packSize.size}-Pack)`,
      price: packSize.price,
      description: product.description,
      image: product.image,
      storage: product.storage,
      category: product.category,
      packSize: packSize.size,
      tortillaCount: packSize.tortillaCount,
    }))
  );
}
