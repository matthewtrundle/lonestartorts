// Product catalog - centralized source of truth
// Pricing: 4x markup on all products
// Shipping: FREE on orders $60+, flat $12.99 under $60

// No minimum order amount (removed)
export const MINIMUM_ORDER_AMOUNT = 0;

// Free shipping threshold in cents ($60)
export const FREE_SHIPPING_THRESHOLD = 6000;

// Flat shipping rate for orders under $60 ($12.99)
export const FLAT_SHIPPING_RATE = 1299;

// Legacy shipping rates (kept for reference)
export const SHIPPING_RATES = {
  small: 1299,
  large: 1299,
  sauce: 1299,
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
  productType?: 'tortilla' | 'sauce' | 'wholesale' | 'chips' | 'salsa' | 'seasoning'; // Distinguish between product types for shipping logic
  tortillaType?: string; // "Flour", "Corn", "Wheat", etc.
  isBestSeller?: boolean; // Show "Best Seller" badge
  savingsPercent?: number; // Show savings percentage (e.g., 15 for "15% OFF")
  collection?: 'bakery' | 'pantry' | 'texas-brands'; // Product collection for shop sections
  brand?: 'heb' | 'mission' | 'la-banderita'; // Brand identifier for Texas brands section
  bundleOnly?: boolean; // Product only available in bundles (not sold standalone)
}

export const products: Product[] = [
  // ============================================
  // BAKERY FRESH COLLECTION - Premium Products
  // ============================================
  {
    sku: 'HEB-FLOUR',
    name: 'H-E-B Bakery Flour Tortillas',
    description: 'Regular flour tortilla made fresh in the bakery section. Soft, wrap-friendly, very versatile.',
    image: '/images/products/flour-tortillas-heb.webp',
    price: 2000, // $20 per pack
    tortillaCount: 20,
    storage: 'refrigerated',
    category: 'flour',
    productType: 'tortilla',
    tortillaType: 'Flour',
    isBestSeller: true,
    collection: 'bakery',
  },
  {
    sku: 'HEB-BUTTER',
    name: 'H-E-B Bakery Butter Tortillas',
    description: 'A flour tortilla with a buttery taste and aroma. Great for breakfast tacos or when you want something rich and softer.',
    image: '/images/products/butter-tortillas-heb.webp',
    price: 2000, // $20 per pack
    tortillaCount: 20,
    storage: 'refrigerated',
    category: 'flour',
    productType: 'tortilla',
    tortillaType: 'Butter',
    collection: 'bakery',
  },
  {
    sku: 'HEB-WHEAT',
    name: 'H-E-B Bakery Wheat Tortillas',
    description: 'Whole wheat tortillas with wholesome grain flavor. Perfect for health-conscious meals without sacrificing taste.',
    image: '/images/products/wheat-tortillas-heb.webp',
    price: 1000, // $10 per pack
    tortillaCount: 10,
    storage: 'refrigerated',
    category: 'wheat',
    productType: 'tortilla',
    tortillaType: 'Wheat',
    collection: 'bakery',
  },
  // ============================================
  // PANTRY STAPLES - Shelf-Stable Products
  // ============================================
  {
    sku: 'HEB-FAJITA-FLOUR',
    name: 'H-E-B Fajita Flour Tortillas',
    description: 'Classic fajita-sized flour tortillas. Soft and pliable, perfect for fajitas and tacos.',
    image: '/images/products/heb-fajita-flour.webp',
    price: 1000, // $10
    tortillaCount: 20,
    storage: 'shelf_stable',
    category: 'flour',
    productType: 'tortilla',
    tortillaType: 'Flour',
    collection: 'pantry',
  },
  {
    sku: 'HEB-HOMESTYLE-FLOUR',
    name: 'H-E-B Homestyle Flour Tortillas',
    description: 'Homestyle flour tortillas with traditional taste. Fluffy & soft, 20 count pack.',
    image: '/images/products/heb-homestyle-flour.webp',
    price: 1200, // $12 (4x markup from $2.98 H-E-B price)
    tortillaCount: 20,
    storage: 'shelf_stable',
    category: 'flour',
    productType: 'tortilla',
    tortillaType: 'Flour',
    collection: 'pantry',
  },
  {
    sku: 'HEB-BUTTER-SHELF',
    name: 'H-E-B Butter Flour Tortillas',
    description: 'Rich, buttery flour tortillas. Perfect for breakfast tacos and quesadillas.',
    image: '/images/products/heb-butter.webp',
    price: 1100, // $11 (4x markup from $2.68 H-E-B price)
    tortillaCount: 20,
    storage: 'shelf_stable',
    category: 'flour',
    productType: 'tortilla',
    tortillaType: 'Butter',
    collection: 'pantry',
  },
  {
    sku: 'HEB-BURRITO-GRANDE',
    name: 'H-E-B Burrito Grande Flour Tortillas',
    description: 'Extra-large flour tortillas for hearty burritos. Big enough for all your favorite fillings.',
    image: '/images/products/heb-burrito-grande.webp',
    price: 1000, // $10
    tortillaCount: 10,
    storage: 'shelf_stable',
    category: 'flour',
    productType: 'tortilla',
    tortillaType: 'Flour',
    collection: 'pantry',
  },
  {
    sku: 'HEB-WHOLE-WHEAT',
    name: 'H-E-B 100% Whole Wheat Tortillas',
    description: 'Wholesome whole wheat tortillas for health-conscious meals.',
    image: '/images/products/wheat-tortillas-heb.webp',
    price: 900, // $9
    tortillaCount: 12,
    storage: 'shelf_stable',
    category: 'wheat',
    productType: 'tortilla',
    tortillaType: 'Wheat',
    collection: 'pantry',
  },
  {
    sku: 'HEB-WHITE-CORN',
    name: 'H-E-B White Corn Tortillas - Texas Size',
    description: 'Premium white corn tortillas in a Texas-sized 80-count pack. Perfect for families and meal prep.',
    image: '/images/products/heb-white-corn.webp',
    price: 1300, // $13
    tortillaCount: 80,
    storage: 'shelf_stable',
    category: 'corn',
    productType: 'tortilla',
    tortillaType: 'Corn',
    collection: 'pantry',
  },
  {
    sku: 'HEB-STREET-TACO',
    name: 'H-E-B Street Taco White Corn Tortillas',
    description: 'Small white corn tortillas sized perfectly for authentic street tacos. 24-count pack.',
    image: '/images/products/heb-street-taco.webp',
    price: 600, // $6
    tortillaCount: 24,
    storage: 'shelf_stable',
    category: 'corn',
    productType: 'tortilla',
    tortillaType: 'Corn',
    collection: 'pantry',
  },
  {
    sku: 'HEB-MI-TIENDA',
    name: 'H-E-B Mi Tienda Ready to Cook Street Taco Flour Tortillas',
    description: 'Authentic ready-to-cook street taco tortillas from Mi Tienda. Cook fresh on your comal for that homemade taste. 50 count value pack.',
    image: '/images/products/heb-mi-tienda.webp',
    price: 1800, // $18 (4x markup from $4.38 H-E-B price)
    tortillaCount: 50,
    storage: 'refrigerated',
    category: 'flour',
    productType: 'tortilla',
    tortillaType: 'Flour',
    collection: 'pantry',
  },
  // ============================================
  // SAUCES
  // ============================================
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
  // ============================================
  // TEX-MEX EXTRAS - Chips, Salsas, Seasonings
  // ============================================
  {
    sku: 'HEB-RED-SAUCE',
    name: 'H-E-B That Red Sauce',
    description: 'The perfect complement to That Green Sauce. Smoky, tangy, and irresistible on breakfast tacos.',
    image: '/images/products/heb-red-sauce.webp',
    price: 1200, // $12 per bottle
    tortillaCount: 0,
    storage: 'shelf_stable',
    category: 'sauce',
    productType: 'sauce',
  },
  {
    sku: 'HEB-SALSA-MILD',
    name: 'H-E-B Restaurant Salsa - Mild',
    description: 'Authentic restaurant-style salsa with fresh tomatoes, peppers, and cilantro. Mild heat, big flavor.',
    image: '/images/products/heb-salsa-mild.webp',
    price: 1000, // $10 per jar
    tortillaCount: 0,
    storage: 'shelf_stable',
    category: 'salsa',
    productType: 'salsa',
  },
  {
    sku: 'HEB-SALSA-MEDIUM',
    name: 'H-E-B Restaurant Salsa - Medium',
    description: 'Restaurant-style salsa with the perfect balance of flavor and heat. A Texas kitchen staple.',
    image: '/images/products/heb-salsa-medium.webp',
    price: 1000, // $10 per jar
    tortillaCount: 0,
    storage: 'shelf_stable',
    category: 'salsa',
    productType: 'salsa',
  },
  {
    sku: 'HEB-SALSA-HOT',
    name: 'H-E-B Restaurant Salsa - Hot',
    description: 'For those who like it hot. Authentic restaurant salsa with serious kick and bold flavor.',
    image: '/images/products/heb-salsa-hot.webp',
    price: 1000, // $10 per jar
    tortillaCount: 0,
    storage: 'shelf_stable',
    category: 'salsa',
    productType: 'salsa',
  },
];

// Get all tortilla products (for wholesale product picker)
export function getTortillaProducts(): Product[] {
  return products.filter((p) => p.productType === 'tortilla');
}

// Generate wholesale SKU from retail SKU
export function getWholesaleSku(retailSku: string): string {
  return `WHOLESALE-${retailSku}`;
}

// Extract retail SKU from wholesale SKU, returns null if not a valid wholesale SKU
export function getRetailSkuFromWholesale(wholesaleSku: string): string | null {
  if (!wholesaleSku.startsWith('WHOLESALE-')) return null;
  const retailSku = wholesaleSku.replace('WHOLESALE-', '');
  const retailProduct = products.find((p) => p.sku === retailSku);
  return retailProduct ? retailSku : null;
}

// Check if an item is a wholesale product
export function isWholesaleProduct(sku: string): boolean {
  return sku.startsWith('WHOLESALE-');
}

// Get wholesale product by SKU — dynamically resolves from retail catalog
// Returns a wholesale-typed copy of the retail product with WHOLESALE- prefix SKU
export function getWholesaleProductBySku(sku: string): Product | undefined {
  const retailSku = getRetailSkuFromWholesale(sku);
  if (!retailSku) return undefined;
  const retailProduct = products.find((p) => p.sku === retailSku);
  if (!retailProduct) return undefined;
  return {
    ...retailProduct,
    sku,
    name: `Wholesale ${retailProduct.name}`,
    productType: 'wholesale',
    category: 'wholesale',
  };
}

// Helper function to get product by SKU
export function getProductBySku(sku: string) {
  return products.find((p) => p.sku === sku);
}

// Generate display name with count for tortilla products
export function getDisplayName(product: { name: string; tortillaCount?: number }): string {
  if (product.tortillaCount && product.tortillaCount > 0) {
    return `${product.name} ${product.tortillaCount} count`;
  }
  return product.name;
}

// Calculate shipping - FREE on orders $60+, flat $12.99 under $60
export function calculateShipping(
  items: { productType?: string; quantity: number; sku?: string }[],
  subtotal?: number
): number {
  if (subtotal !== undefined && subtotal >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }
  return FLAT_SHIPPING_RATE;
}

// Calculate what shipping WOULD be without free shipping threshold
// Used for showing "You're saving $X" messaging
export function calculateBaseShipping(_items: { productType?: string; quantity: number }[]): number {
  return FLAT_SHIPPING_RATE;
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
  const percentComplete = FREE_SHIPPING_THRESHOLD > 0
    ? Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100))
    : 100;

  // Savings = flat shipping rate when qualifying for free shipping
  const savedAmount = qualifies ? FLAT_SHIPPING_RATE : 0;

  return {
    qualifies,
    amountRemaining,
    percentComplete,
    savedAmount,
  };
}

/**
 * Get complementary product suggestions based on what was ordered.
 * - If order has only tortillas → suggest sauces/salsas
 * - If order has only sauces/salsas → suggest best-selling tortillas
 * - If order has both → suggest items from categories not in order
 * Returns up to 3 products.
 */
export function getComplementaryProducts(orderSkus: string[]): Product[] {
  const orderedProducts = orderSkus
    .map(sku => {
      // Handle wholesale SKUs
      const retailSku = sku.startsWith('WHOLESALE-') ? sku.replace('WHOLESALE-', '') : sku;
      return products.find(p => p.sku === retailSku);
    })
    .filter(Boolean) as Product[];

  const orderedTypes = new Set(orderedProducts.map(p => p.productType));
  const orderedSkus = new Set(orderSkus.map(sku =>
    sku.startsWith('WHOLESALE-') ? sku.replace('WHOLESALE-', '') : sku
  ));

  let suggestions: Product[] = [];

  if (orderedTypes.has('tortilla') && !orderedTypes.has('sauce') && !orderedTypes.has('salsa')) {
    // Ordered only tortillas → suggest sauces and salsas
    suggestions = products.filter(p =>
      (p.productType === 'sauce' || p.productType === 'salsa') && !orderedSkus.has(p.sku)
    );
  } else if (!orderedTypes.has('tortilla') && (orderedTypes.has('sauce') || orderedTypes.has('salsa'))) {
    // Ordered only sauces/salsas → suggest best-selling tortillas
    suggestions = products.filter(p =>
      p.productType === 'tortilla' && p.isBestSeller && !orderedSkus.has(p.sku)
    );
    if (suggestions.length < 3) {
      const more = products.filter(p =>
        p.productType === 'tortilla' && !p.isBestSeller && !orderedSkus.has(p.sku)
      );
      suggestions = [...suggestions, ...more];
    }
  } else {
    // Mixed order → suggest items from categories not in order
    suggestions = products.filter(p => !orderedTypes.has(p.productType) && !orderedSkus.has(p.sku));
    if (suggestions.length === 0) {
      suggestions = products.filter(p => !orderedSkus.has(p.sku) && p.productType !== 'wholesale');
    }
  }

  return suggestions.slice(0, 3);
}
