// Shared shipping utilities for carrier detection, tracking URLs, and weight/dimension calculation

/**
 * Auto-detect carrier from tracking number format
 */
export function detectCarrier(trackingNumber: string): string | null {
  const trimmed = trackingNumber.trim().toUpperCase();
  if (!trimmed) return null;

  // UPS: starts with 1Z + 16 alphanumeric (18 total)
  if (/^1Z[A-Z0-9]{16}$/i.test(trimmed)) return 'UPS';

  // FedEx: 12, 15, or 20 digits (all numeric)
  if (/^\d{12}$/.test(trimmed) || /^\d{15}$/.test(trimmed) || /^\d{20}$/.test(trimmed)) return 'FedEx';

  // USPS: 20-22 digit numeric
  if (/^\d{20,22}$/.test(trimmed)) return 'USPS';

  // USPS: 13 char international format (e.g., EJ123456780US)
  if (/^[A-Z]{2}\d{9}[A-Z]{2}$/.test(trimmed)) return 'USPS';

  // USPS: starts with 9400, 9200, 9300, 9500 (common USPS prefixes, 20+ digits)
  if (/^9[2345]\d{18,20}$/.test(trimmed)) return 'USPS';

  return null;
}

/**
 * Generate carrier-specific tracking URL
 */
export function getTrackingUrl(carrier: string | null, trackingNumber: string): string {
  if (!carrier) return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`;

  const normalizedCarrier = carrier.toLowerCase();

  if (normalizedCarrier.includes('ups')) {
    return `https://www.ups.com/track?tracknum=${trackingNumber}`;
  } else if (normalizedCarrier.includes('fedex')) {
    return `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`;
  } else {
    // Default to USPS
    return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`;
  }
}

/**
 * Weight map for SKUs (in ounces).
 * Tortilla packs vary by count, sauces/salsas are per bottle/jar.
 */
const SKU_WEIGHT_OZ: Record<string, number> = {
  // Bakery fresh (refrigerated, heavier)
  'HEB-FLOUR': 32,        // 20-count flour
  'HEB-BUTTER': 32,       // 20-count butter
  'HEB-WHEAT': 16,        // 10-count wheat

  // Pantry staples
  'HEB-FAJITA-FLOUR': 24, // 20-count fajita
  'HEB-HOMESTYLE-FLOUR': 24, // 20-count homestyle
  'HEB-BUTTER-SHELF': 24, // 20-count butter shelf
  'HEB-BURRITO-GRANDE': 24, // 10-count but large
  'HEB-WHOLE-WHEAT': 20,  // 12-count
  'HEB-WHITE-CORN': 48,   // 80-count corn
  'HEB-STREET-TACO': 16,  // 24-count small
  'HEB-MI-TIENDA': 40,    // 50-count

  // Sauces & salsas
  'HEB-GREEN-SAUCE': 20,  // bottle
  'HEB-RED-SAUCE': 20,    // bottle
  'HEB-SALSA-MILD': 24,   // jar
  'HEB-SALSA-MEDIUM': 24, // jar
  'HEB-SALSA-HOT': 24,    // jar
};

const DEFAULT_WEIGHT_OZ = 32;

/**
 * Name-based weight lookup for orders where SKU is empty.
 * Matches partial product name to approximate weight.
 */
const NAME_WEIGHT_PATTERNS: [RegExp, number][] = [
  [/white corn.*texas|80.?count/i, 48],
  [/mi tienda|50.?count/i, 40],
  [/bakery.*flour|bakery.*butter/i, 32],
  [/burrito grande/i, 24],
  [/fajita|homestyle|butter.*shelf|butter flour/i, 24],
  [/whole wheat|wheat/i, 20],
  [/street taco/i, 16],
  [/green sauce|red sauce/i, 20],
  [/salsa/i, 24],
];

function getWeightByName(name: string): number {
  for (const [pattern, weight] of NAME_WEIGHT_PATTERNS) {
    if (pattern.test(name)) return weight;
  }
  return DEFAULT_WEIGHT_OZ;
}

/**
 * Calculate total weight in ounces for an order's items
 */
export function calculateOrderWeightOz(items: { sku?: string | null; name?: string; quantity: number }[]): number {
  return items.reduce((total, item) => {
    const baseSku = item.sku?.replace('WHOLESALE-', '') || '';
    const weight = (baseSku && SKU_WEIGHT_OZ[baseSku]) || (item.name ? getWeightByName(item.name) : DEFAULT_WEIGHT_OZ);
    return total + weight * item.quantity;
  }, 0);
}

/**
 * Calculate package dimensions based on total item count.
 * Returns [length, width, height] in inches.
 */
export function calculateDimensions(totalItemCount: number): [number, number, number] {
  if (totalItemCount <= 2) return [12, 12, 4];   // small flat rate
  if (totalItemCount <= 5) return [12, 12, 8];   // medium box
  return [16, 16, 12];                            // large box
}
