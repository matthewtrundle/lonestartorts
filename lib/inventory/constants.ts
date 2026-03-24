// Shared inventory constants — used by both fulfillment and inventory pages

// H-E-B per-order quantity limits (product name substring → max per order)
export const HEB_ORDER_LIMITS: Record<string, number> = {
  'Bakery Butter': 10,
  'Bakery Flour': 10,
  'Bakery Wheat': 10,
  'Burrito Grande': 20,
  'Mi Tienda': 10,
  'White Corn': 10,
};

export const SHIP_DAY = 2;        // Tuesday (0=Sun)
export const CUTOFF_DAY = 1;      // Monday
export const CUTOFF_HOUR = 23;    // 11 PM CT
export const SAFETY_MARGIN = 0.10; // 10% buffer

// Pickup schedule — change these to adjust when each category is bought
export const REFRIGERATED_PICKUP_DAY = 'Monday';
export const REFRIGERATED_PICKUP_TIME = 'Anytime';
export const SHELF_STABLE_PICKUP_DAY = 'Monday';
export const SHELF_STABLE_PICKUP_TIME = 'Anytime';

export function getHebLimit(productName: string): number | null {
  for (const [key, limit] of Object.entries(HEB_ORDER_LIMITS)) {
    if (productName.includes(key)) return limit;
  }
  return null;
}

export function getOrdersNeeded(qty: number, limit: number | null): number {
  if (!limit || qty <= limit) return 1;
  return Math.ceil(qty / limit);
}
