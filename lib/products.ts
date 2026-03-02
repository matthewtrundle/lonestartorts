// Product catalog - centralized source of truth
// Pricing: 4x markup on all products
// Shipping: FREE on all orders (minimum order $40)

// Minimum order amount in cents ($40)
export const MINIMUM_ORDER_AMOUNT = 4000;

// Legacy constants (kept for compatibility)
export const FREE_SHIPPING_THRESHOLD = 0; // Free shipping on all orders

// Legacy shipping rates (not used - free shipping)
export const SHIPPING_RATES = {
  small: 0,
  large: 0,
  sauce: 0,
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
    sku: 'HEB-MIXLA',
    name: 'H-E-B Mixla Corn & Flour Blend Tortillas',
    description: 'Best of both worlds - corn and flour blend. Flexible yet authentic taste.',
    image: '/images/products/heb-mixla.webp',
    price: 1500, // $15
    tortillaCount: 24,
    storage: 'shelf_stable',
    category: 'corn',
    productType: 'tortilla',
    tortillaType: 'Corn & Flour',
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
  // TEXAS-BORN FAVORITES - Mission & La Banderita
  // ============================================
  {
    sku: 'MISSION-SOFT-TACO',
    name: 'Mission Soft Taco Flour Tortillas',
    description: 'Super soft flour tortillas perfect for tacos and wraps. A Texas classic from San Antonio.',
    image: '/images/products/mission-soft-taco-flour.webp',
    price: 800, // $8
    tortillaCount: 10,
    storage: 'shelf_stable',
    category: 'flour',
    productType: 'tortilla',
    tortillaType: 'Flour',
    collection: 'texas-brands',
    brand: 'mission',
  },
  {
    sku: 'MISSION-WHITE-CORN',
    name: 'Mission White Corn Tortillas',
    description: 'Authentic white corn tortillas. Gluten-free and perfect for street tacos.',
    image: '/images/products/mission-white-corn.webp',
    price: 800, // $8
    tortillaCount: 24,
    storage: 'shelf_stable',
    category: 'corn',
    productType: 'tortilla',
    tortillaType: 'Corn',
    collection: 'texas-brands',
    brand: 'mission',
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
    sku: 'HEB-TEXAS-CHIPS',
    name: 'H-E-B Texas-Shaped Tortilla Chips',
    description: 'Crispy tortilla chips in the shape of Texas. Perfect for dipping or snacking with true Lone Star pride.',
    image: '/images/products/heb-texas-chips.webp',
    price: 1000, // $10 per bag
    tortillaCount: 0,
    storage: 'shelf_stable',
    category: 'chips',
    productType: 'chips',
    bundleOnly: true, // High volume/low density - shipping economics
  },
  {
    sku: 'HEB-BAKERY-CHIPS',
    name: 'H-E-B Bakery Style Tortilla Chips',
    description: 'Thick-cut bakery style chips with authentic restaurant taste. Sturdy enough for any salsa or queso.',
    image: '/images/products/heb-bakery-chips.webp',
    price: 1200, // $12 per bag
    tortillaCount: 0,
    storage: 'shelf_stable',
    category: 'chips',
    productType: 'chips',
    bundleOnly: true, // High volume/low density - shipping economics
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
  {
    sku: 'HEB-FAJITA-SEASON',
    name: 'H-E-B Fajita Seasoning',
    description: 'The secret to perfect fajitas. Authentic Texas blend of spices for chicken, beef, or shrimp.',
    image: '/images/products/heb-fajita-seasoning.webp',
    price: 800, // $8 per packet
    tortillaCount: 0,
    storage: 'shelf_stable',
    category: 'seasoning',
    productType: 'seasoning',
  },
  {
    sku: 'HEB-TACO-SEASON',
    name: 'H-E-B Taco Seasoning',
    description: 'Classic taco seasoning for authentic Tex-Mex flavor. No MSG, no artificial flavors.',
    image: '/images/products/heb-taco-seasoning.webp',
    price: 800, // $8 per packet
    tortillaCount: 0,
    storage: 'shelf_stable',
    category: 'seasoning',
    productType: 'seasoning',
  },
  // ============================================
  // NEW PRODUCTS - Expanded Texas Favorites
  // ============================================
  {
    sku: 'HEB-GREEN-SAUCE-MILD',
    name: 'H-E-B That Green Sauce - Mild',
    description: 'The legendary green sauce in a milder heat level. Same great jalapeño-poblano flavor, easier on the heat.',
    image: '/images/products/heb-green-sauce-mild.webp',
    price: 1200, // $12 per bottle
    tortillaCount: 0,
    storage: 'shelf_stable',
    category: 'sauce',
    productType: 'sauce',
  },
  {
    sku: 'HEB-SALSA-SMOKY-CITRUS',
    name: 'H-E-B Specialty Salsa - Smoky Citrus',
    description: 'A unique blend of smoky chipotle and bright citrus. South Texas flavor in every bite.',
    image: '/images/products/heb-salsa-smoky-citrus.webp',
    price: 1000, // $10 per jar
    tortillaCount: 0,
    storage: 'shelf_stable',
    category: 'salsa',
    productType: 'salsa',
  },
  {
    sku: 'HEB-SALSA-HABANERO',
    name: 'H-E-B Specialty Salsa - Habanero',
    description: 'For serious heat seekers. Fiery habanero salsa with authentic Texas attitude.',
    image: '/images/products/heb-salsa-habanero.webp',
    price: 1000, // $10 per jar
    tortillaCount: 0,
    storage: 'shelf_stable',
    category: 'salsa',
    productType: 'salsa',
  },
  {
    sku: 'HEB-STREET-CORN-CHIPS',
    name: 'H-E-B Mexican Street Corn Chips',
    description: 'Inspired by elote! Roasted corn and smoky cheese flavor. Gluten-free.',
    image: '/images/products/heb-street-corn-chips.webp',
    price: 1000, // $10 per bag
    tortillaCount: 0,
    storage: 'shelf_stable',
    category: 'chips',
    productType: 'chips',
    bundleOnly: true,
  },
  {
    sku: 'HEB-JALAPENO-CHIPS',
    name: 'H-E-B Spicy Jalapeño Chips',
    description: 'Fire up your taste buds with these spicy jalapeño tortilla chips. Perfect with salsa or queso.',
    image: '/images/products/heb-jalapeno-chips.webp',
    price: 1000, // $10 per bag
    tortillaCount: 0,
    storage: 'shelf_stable',
    category: 'chips',
    productType: 'chips',
    bundleOnly: true,
  },
  {
    sku: 'HEB-TACO-CHIPS',
    name: 'H-E-B Crunchy Taco Chips',
    description: 'Tortilla chips seasoned with authentic taco flavor. Gluten-free snacking perfection.',
    image: '/images/products/heb-taco-chips.webp',
    price: 1000, // $10 per bag
    tortillaCount: 0,
    storage: 'shelf_stable',
    category: 'chips',
    productType: 'chips',
    bundleOnly: true,
  },
  {
    sku: 'HEB-SPICY-BBQ-CHIPS',
    name: 'H-E-B Texas Corn Chips - Spicy BBQ',
    description: 'Smoky barbecue meets Texas heat. Bold BBQ flavor with an extra kick.',
    image: '/images/products/heb-spicy-bbq-chips.webp',
    price: 1000, // $10 per bag
    tortillaCount: 0,
    storage: 'shelf_stable',
    category: 'chips',
    productType: 'chips',
    bundleOnly: true,
  },
  {
    sku: 'HEB-LONE-STARS',
    name: 'H-E-B Lone Stars Cheddar Crackers',
    description: 'Texas-shaped cheddar crackers. The iconic Lone Star snack that Texans grew up with.',
    image: '/images/products/heb-lone-stars.webp',
    price: 1000, // $10 per box
    tortillaCount: 0,
    storage: 'shelf_stable',
    category: 'snacks',
    productType: 'chips',
  },
  {
    sku: 'HEB-PICA-PUFFS',
    name: 'H-E-B Pica Puffs',
    description: 'Spicy puffed corn snacks with a cult following. The Texas answer to hot chips.',
    image: '/images/products/heb-pica-puffs.webp',
    price: 1000, // $10 per bag
    tortillaCount: 0,
    storage: 'shelf_stable',
    category: 'snacks',
    productType: 'chips',
  },
  {
    sku: 'HEB-BRISKET-RUB',
    name: 'H-E-B Texas Originals Brisket Rub',
    description: 'The authentic Texas brisket seasoning. Salt, pepper, and secret spices for perfect bark.',
    image: '/images/products/heb-brisket-rub.webp',
    price: 1000, // $10 per container
    tortillaCount: 0,
    storage: 'shelf_stable',
    category: 'seasoning',
    productType: 'seasoning',
  },
  {
    sku: 'HEB-TEXAS-BBQ-SAUCE',
    name: 'H-E-B Texas Style BBQ Sauce',
    description: 'Robust Texas BBQ sauce with heat and black pepper. Not for the meek.',
    image: '/images/products/heb-texas-bbq-sauce.webp',
    price: 1000, // $10 per bottle
    tortillaCount: 0,
    storage: 'shelf_stable',
    category: 'sauce',
    productType: 'sauce',
  },
  {
    sku: 'TERRY-BLACKS-BBQ',
    name: "Terry Black's BBQ Sauce",
    description: 'From the legendary Austin BBQ joint. Authentic pit-master flavor in every bottle.',
    image: '/images/products/terry-blacks-bbq.webp',
    price: 1200, // $12 per bottle
    tortillaCount: 0,
    storage: 'shelf_stable',
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

// Calculate shipping - FREE SHIPPING ON ALL ORDERS
// Policy: Free shipping on all orders (minimum order $40)
export function calculateShipping(
  items: { productType?: string; quantity: number; sku?: string }[],
  subtotal?: number
): number {
  // FREE shipping on all orders
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
