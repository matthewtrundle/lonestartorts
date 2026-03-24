import { products } from '@/lib/products';
import { SAFETY_MARGIN, SHIP_DAY, CUTOFF_HOUR, getHebLimit, getOrdersNeeded } from './constants';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface WeeklyDemand {
  weekStart: Date;          // Wednesday
  shipDate: Date;           // Tuesday
  orderCount: number;
  itemsByName: Record<string, number>;  // product name → total units
  totalUnits: number;
}

export interface SkuProjection {
  name: string;
  storage: 'refrigerated' | 'shelf_stable';
  confirmedQty: number;
  projectedAdditionalQty: number;
  totalProjectedQty: number;
  hebLimit: number | null;
  hebOrdersNeeded: number;
  bufferStock: number;
  netToBuy: number;
}

export interface OrderRecord {
  createdAt: string;
  items: { name: string; quantity: number }[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Get the Wednesday that starts a given shipping week (Wed–Tue) */
function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun
  // Wednesday = 3. If day < 3, go back to previous Wednesday
  const diff = day >= 3 ? day - 3 : day + 4;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Get the Tuesday ship date for a given week start (Wednesday) */
function getShipDate(weekStart: Date): Date {
  const d = new Date(weekStart);
  d.setDate(d.getDate() + 6); // Wed + 6 = Tue
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Get next Tuesday from a given date */
export function getNextTuesday(from: Date): Date {
  const d = new Date(from);
  const day = d.getDay();
  const daysUntilTue = day <= SHIP_DAY ? SHIP_DAY - day : 7 - day + SHIP_DAY;
  d.setDate(d.getDate() + (daysUntilTue === 0 ? 7 : daysUntilTue));
  d.setHours(0, 0, 0, 0);
  // If it's Tuesday before cutoff, ship today
  if (day === SHIP_DAY && from.getHours() < 8) {
    return new Date(from.getFullYear(), from.getMonth(), from.getDate(), 0, 0, 0, 0);
  }
  return d;
}

/** Get the cutoff datetime (Monday 11:59 PM) for a given ship date (Tuesday) */
export function getCutoffDate(shipDate: Date): Date {
  const d = new Date(shipDate);
  d.setDate(d.getDate() - 1); // Monday
  d.setHours(CUTOFF_HOUR, 59, 0, 0);
  return d;
}

function getStorageType(productName: string): 'refrigerated' | 'shelf_stable' {
  const product = products.find((p) => productName.includes(p.name) || p.name.includes(productName));
  return product?.storage ?? 'shelf_stable';
}

// ─── Core Functions ──────────────────────────────────────────────────────────

/** Group historical orders into shipping weeks (Wed–Tue windows) */
export function aggregateWeeklyDemand(orders: OrderRecord[]): WeeklyDemand[] {
  const weekMap = new Map<string, WeeklyDemand>();

  for (const order of orders) {
    const orderDate = new Date(order.createdAt);
    const ws = getWeekStart(orderDate);
    const key = ws.toISOString();

    if (!weekMap.has(key)) {
      weekMap.set(key, {
        weekStart: ws,
        shipDate: getShipDate(ws),
        orderCount: 0,
        itemsByName: {},
        totalUnits: 0,
      });
    }

    const week = weekMap.get(key)!;
    week.orderCount += 1;

    for (const item of order.items) {
      week.itemsByName[item.name] = (week.itemsByName[item.name] || 0) + item.quantity;
      week.totalUnits += item.quantity;
    }
  }

  return Array.from(weekMap.values()).sort(
    (a, b) => a.weekStart.getTime() - b.weekStart.getTime()
  );
}

/** Weighted moving average over recent weeks. Weights: most recent = highest. */
export function calculateWMA(
  weeks: WeeklyDemand[],
  windowSize: number = 4
): Record<string, number> {
  const recent = weeks.slice(-windowSize);
  if (recent.length === 0) return {};

  // Weights: [1, 2, 3, 4] for 4 weeks, most recent = 4
  const weights = recent.map((_, i) => i + 1);
  const totalWeight = weights.reduce((s, w) => s + w, 0);

  const result: Record<string, number> = {};

  // Collect all product names
  const allNames = new Set<string>();
  for (const week of recent) {
    for (const name of Object.keys(week.itemsByName)) {
      allNames.add(name);
    }
  }

  for (const name of allNames) {
    let weightedSum = 0;
    for (let i = 0; i < recent.length; i++) {
      weightedSum += (recent[i].itemsByName[name] || 0) * weights[i];
    }
    result[name] = weightedSum / totalWeight;
  }

  return result;
}

/** Calculate order-count WMA for a window of weeks */
function calculateOrderCountWMA(weeks: WeeklyDemand[], windowSize: number = 4): number {
  const recent = weeks.slice(-windowSize);
  if (recent.length === 0) return 0;
  const weights = recent.map((_, i) => i + 1);
  const totalWeight = weights.reduce((s, w) => s + w, 0);
  let weightedSum = 0;
  for (let i = 0; i < recent.length; i++) {
    weightedSum += recent[i].orderCount * weights[i];
  }
  return weightedSum / totalWeight;
}

/** Growth factor: WMA of last 4 weeks / WMA of previous 4 weeks, capped at 1.5 */
export function calculateGrowthFactor(weeks: WeeklyDemand[]): number {
  if (weeks.length < 5) return 1.0;

  const recentWMA = calculateOrderCountWMA(weeks.slice(-4), 4);
  const previousEnd = Math.max(0, weeks.length - 4);
  const previousStart = Math.max(0, previousEnd - 4);
  const previousWeeks = weeks.slice(previousStart, previousEnd);

  if (previousWeeks.length === 0) return 1.0;
  const previousWMA = calculateOrderCountWMA(previousWeeks, previousWeeks.length);

  if (previousWMA === 0) return 1.0;
  const factor = recentWMA / previousWMA;
  return Math.min(factor, 1.5);
}

/** Day-of-week distribution: fraction of orders placed on each day (0=Sun..6=Sat) */
export function getDayOfWeekDistribution(orders: OrderRecord[]): Record<number, number> {
  const counts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  for (const order of orders) {
    const day = new Date(order.createdAt).getDay();
    counts[day] = (counts[day] || 0) + 1;
  }
  const total = orders.length || 1;
  const dist: Record<number, number> = {};
  for (let d = 0; d < 7; d++) {
    dist[d] = counts[d] / total;
  }
  return dist;
}

/**
 * Completion factor: estimate what fraction of this week's orders are still to come.
 * Looks at which days remain between now and Tuesday cutoff, and sums their
 * historical share of weekly orders.
 */
export function getCompletionFactor(
  today: Date,
  distribution: Record<number, number>
): number {
  const currentDay = today.getDay();
  const currentHour = today.getHours();

  // Shipping week is Wed(3) to Tue(2) with cutoff Mon(1) 11PM
  // Days in shipping week order: Wed(3), Thu(4), Fri(5), Sat(6), Sun(0), Mon(1), Tue(2)
  const weekDayOrder = [3, 4, 5, 6, 0, 1, 2];

  const currentIdx = weekDayOrder.indexOf(currentDay);
  if (currentIdx === -1) return 0;

  // Sum distribution for remaining days (after current)
  let remaining = 0;

  // Partial credit for current day based on hour
  const hourFraction = 1 - (currentHour / 24);
  remaining += distribution[currentDay] * hourFraction;

  // Full credit for future days up to Monday cutoff (index 5 = Monday)
  for (let i = currentIdx + 1; i <= 5; i++) {
    remaining += distribution[weekDayOrder[i]];
  }

  // Tuesday itself (ship day) — typically few orders, but include morning
  // Only a fraction of Tuesday orders before 8am pickup
  remaining += distribution[2] * 0.33;

  return remaining;
}

/** Full projection for the next Tuesday ship date */
export function projectNextTuesday(
  historicalWeeks: WeeklyDemand[],
  currentWeekOrders: OrderRecord[],
  allHistoricalOrders: OrderRecord[],
  today: Date,
  bufferStocks: Record<string, number> = {}
): {
  shipDate: Date;
  cutoffDate: Date;
  hoursUntilCutoff: number;
  confirmedOrders: number;
  projectedTotalOrders: number;
  growthTrend: number;
  skuProjections: SkuProjection[];
  historicalWeeks: WeeklyDemand[];
} {
  const shipDate = getNextTuesday(today);
  const cutoffDate = getCutoffDate(shipDate);
  const hoursUntilCutoff = Math.max(0, (cutoffDate.getTime() - today.getTime()) / (1000 * 60 * 60));

  // Confirmed orders this week
  const confirmedOrders = currentWeekOrders.length;

  // Confirmed item quantities
  const confirmedItems: Record<string, number> = {};
  for (const order of currentWeekOrders) {
    for (const item of order.items) {
      confirmedItems[item.name] = (confirmedItems[item.name] || 0) + item.quantity;
    }
  }

  // Growth factor
  const growthTrend = calculateGrowthFactor(historicalWeeks);

  // WMA per product
  const wmaPerProduct = calculateWMA(historicalWeeks, 4);

  // Day-of-week completion factor
  const distribution = getDayOfWeekDistribution(allHistoricalOrders);
  const completionFactor = getCompletionFactor(today, distribution);

  // Projected order count
  const wmaOrderCount = calculateOrderCountWMA(historicalWeeks, 4);
  const projectedTotalOrders = Math.max(
    confirmedOrders,
    Math.ceil(wmaOrderCount * growthTrend)
  );

  // Build per-SKU projections
  const allProductNames = new Set<string>();
  for (const name of Object.keys(confirmedItems)) allProductNames.add(name);
  for (const name of Object.keys(wmaPerProduct)) allProductNames.add(name);

  const skuProjections: SkuProjection[] = [];

  for (const name of allProductNames) {
    const confirmed = confirmedItems[name] || 0;
    const wmaQty = wmaPerProduct[name] || 0;
    const projectedTotal = Math.max(confirmed, Math.ceil(wmaQty * growthTrend * (1 + SAFETY_MARGIN)));

    // Additional = what we expect beyond confirmed
    const additionalFromForecast = Math.max(0, Math.ceil(projectedTotal * completionFactor));
    const totalProjected = confirmed + additionalFromForecast;

    const storage = getStorageType(name);
    const hebLimit = getHebLimit(name);
    const buffer = storage === 'shelf_stable' ? (bufferStocks[name] || 0) : 0;
    const netToBuy = Math.max(0, totalProjected - buffer);

    skuProjections.push({
      name,
      storage,
      confirmedQty: confirmed,
      projectedAdditionalQty: additionalFromForecast,
      totalProjectedQty: totalProjected,
      hebLimit,
      hebOrdersNeeded: getOrdersNeeded(netToBuy, hebLimit),
      bufferStock: buffer,
      netToBuy,
    });
  }

  // Sort by totalProjectedQty descending
  skuProjections.sort((a, b) => b.totalProjectedQty - a.totalProjectedQty);

  return {
    shipDate,
    cutoffDate,
    hoursUntilCutoff,
    confirmedOrders,
    projectedTotalOrders,
    growthTrend: growthTrend - 1, // as percentage change
    skuProjections,
    historicalWeeks,
  };
}
