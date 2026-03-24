import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';
import { products } from '@/lib/products';
import { aggregateWeeklyDemand, calculateGrowthFactor } from '@/lib/inventory/forecast';

export const dynamic = 'force-dynamic';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getCogsPerUnit(sku: string | null, itemName: string, itemPrice: number): number {
  // Try to find product by SKU first
  let product = sku ? products.find((p) => p.sku === sku) : undefined;
  // Fallback: match by name substring
  if (!product) {
    product = products.find(
      (p) => itemName.includes(p.name) || p.name.includes(itemName)
    );
  }
  // If found, COGS = product.price / 4 (4x markup)
  if (product) return Math.round(product.price / 4);
  // Fallback: estimate 25% of selling price
  return Math.round(itemPrice * 0.25);
}

function monthKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

function getOrderSizeBucket(totalCents: number): string {
  if (totalCents < 4000) return 'Under $40';
  if (totalCents < 6000) return '$40-59';
  if (totalCents < 8000) return '$60-79';
  if (totalCents < 10000) return '$80-99';
  return '$100+';
}

const BUCKET_ORDER = ['Under $40', '$40-59', '$60-79', '$80-99', '$100+'];

// ─── Cost Constants ──────────────────────────────────────────────────────────
const CAC_CENTS = 1269; // $12.69 avg cost per conversion (Google Ads)
const LABOR_RATE_PER_HOUR = 2500; // $25/hr in cents
const LABOR_MINUTES_PER_ORDER = 10; // 10 min to pack each order (flat, doesn't scale with items)
const LABOR_PER_ORDER_CENTS = Math.round((LABOR_RATE_PER_HOUR * LABOR_MINUTES_PER_ORDER) / 60); // ~$4.17
const PACKAGING_CENTS = 200; // $2.00 per shipment

function getFiveIncrementBucket(totalCents: number): string {
  if (totalCents < 2500) return 'Under $25';
  const lower = Math.floor(totalCents / 500) * 5;
  const upper = lower + 4;
  if (lower >= 100) return '$100+';
  return `$${lower}-${upper}`;
}

function getFiveIncrementBucketOrder(): string[] {
  const buckets: string[] = ['Under $25'];
  for (let i = 25; i < 100; i += 5) {
    buckets.push(`$${i}-${i + 4}`);
  }
  buckets.push('$100+');
  return buckets;
}

// ─── GET Handler ─────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // Parallel DB queries
    const [succeededOrders, orderItems] = await Promise.all([
      prisma.order.findMany({
        where: { paymentStatus: 'SUCCEEDED' },
        select: {
          id: true,
          total: true,
          subtotal: true,
          shipping: true,
          tax: true,
          shippingCost: true,
          createdAt: true,
          email: true,
          shippingName: true,
        },
        orderBy: { createdAt: 'asc' },
      }),
      prisma.orderItem.findMany({
        where: {
          Order: { paymentStatus: 'SUCCEEDED' },
          sku: { not: 'SHIPPING' },
        },
        select: {
          orderId: true,
          name: true,
          sku: true,
          price: true,
          quantity: true,
        },
      }),
    ]);

    // ─── Overview ──────────────────────────────────────────────────────────────

    const totalRevenue = succeededOrders.reduce((s, o) => s + o.total, 0);
    const thisMonthOrders = succeededOrders.filter(
      (o) => o.createdAt >= thisMonthStart
    );
    const thisMonthRevenue = thisMonthOrders.reduce((s, o) => s + o.total, 0);
    const totalOrders = succeededOrders.length;
    const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    // Build a map of orderId -> items for COGS
    const itemsByOrder = new Map<string, typeof orderItems>();
    for (const item of orderItems) {
      const list = itemsByOrder.get(item.orderId) ?? [];
      list.push(item);
      itemsByOrder.set(item.orderId, list);
    }

    // Total COGS
    let totalCogs = 0;
    for (const item of orderItems) {
      totalCogs += getCogsPerUnit(item.sku, item.name, item.price) * item.quantity;
    }

    const grossMarginPct =
      totalRevenue > 0
        ? Math.round(((totalRevenue - totalCogs) / totalRevenue) * 1000) / 10
        : 0;

    // ─── Monthly P&L ──────────────────────────────────────────────────────────

    const monthlyMap = new Map<
      string,
      {
        revenue: number;
        cogs: number;
        shippingCost: number;
        orderCount: number;
      }
    >();

    for (const order of succeededOrders) {
      const mk = monthKey(order.createdAt);
      const entry = monthlyMap.get(mk) ?? {
        revenue: 0,
        cogs: 0,
        shippingCost: 0,
        orderCount: 0,
      };
      entry.revenue += order.total;
      entry.shippingCost += order.shippingCost ?? 0;
      entry.orderCount += 1;

      // COGS for this order's items
      const items = itemsByOrder.get(order.id) ?? [];
      for (const item of items) {
        entry.cogs += getCogsPerUnit(item.sku, item.name, item.price) * item.quantity;
      }

      monthlyMap.set(mk, entry);
    }

    const monthlyPnL = Array.from(monthlyMap.entries())
      .map(([month, data]) => {
        const grossProfit = data.revenue - data.cogs - data.shippingCost;
        return {
          month,
          revenue: data.revenue,
          cogs: data.cogs,
          shippingCost: data.shippingCost,
          grossProfit,
          marginPct:
            data.revenue > 0
              ? Math.round((grossProfit / data.revenue) * 1000) / 10
              : 0,
          orderCount: data.orderCount,
          avgOrderValue:
            data.orderCount > 0 ? Math.round(data.revenue / data.orderCount) : 0,
        };
      })
      .sort((a, b) => b.month.localeCompare(a.month));

    // ─── Product Breakdown ────────────────────────────────────────────────────

    const productMap = new Map<
      string,
      { name: string; sku: string; unitsSold: number; revenue: number; cogs: number }
    >();

    for (const item of orderItems) {
      const key = item.sku ?? item.name;
      const entry = productMap.get(key) ?? {
        name: item.name,
        sku: item.sku ?? '',
        unitsSold: 0,
        revenue: 0,
        cogs: 0,
      };
      entry.unitsSold += item.quantity;
      entry.revenue += item.price * item.quantity;
      entry.cogs += getCogsPerUnit(item.sku, item.name, item.price) * item.quantity;
      productMap.set(key, entry);
    }

    const productBreakdown = Array.from(productMap.values())
      .map((p) => ({
        name: p.name,
        sku: p.sku,
        unitsSold: p.unitsSold,
        revenue: p.revenue,
        cogs: p.cogs,
        grossProfit: p.revenue - p.cogs,
        marginPct:
          p.revenue > 0
            ? Math.round(((p.revenue - p.cogs) / p.revenue) * 1000) / 10
            : 0,
      }))
      .sort((a, b) => b.revenue - a.revenue);

    // ─── Customer Insights ────────────────────────────────────────────────────

    const customerMap = new Map<
      string,
      {
        name: string;
        email: string;
        orderCount: number;
        totalSpent: number;
        firstOrder: Date;
        lastOrder: Date;
      }
    >();

    for (const order of succeededOrders) {
      const email = order.email.toLowerCase();
      const entry = customerMap.get(email) ?? {
        name: order.shippingName ?? '',
        email: order.email,
        orderCount: 0,
        totalSpent: 0,
        firstOrder: order.createdAt,
        lastOrder: order.createdAt,
      };
      entry.orderCount += 1;
      entry.totalSpent += order.total;
      if (order.createdAt < entry.firstOrder) entry.firstOrder = order.createdAt;
      if (order.createdAt > entry.lastOrder) entry.lastOrder = order.createdAt;
      // Keep latest name
      if (order.shippingName) entry.name = order.shippingName;
      customerMap.set(email, entry);
    }

    const allCustomers = Array.from(customerMap.values());
    const totalCustomers = allCustomers.length;
    const repeatCustomers = allCustomers.filter((c) => c.orderCount > 1).length;
    const repeatRate =
      totalCustomers > 0
        ? Math.round((repeatCustomers / totalCustomers) * 1000) / 10
        : 0;

    // Average days between orders for repeat customers
    let totalDaysBetween = 0;
    let repeatPairs = 0;
    for (const c of allCustomers) {
      if (c.orderCount > 1) {
        const daysBetween =
          (c.lastOrder.getTime() - c.firstOrder.getTime()) /
          (1000 * 60 * 60 * 24) /
          (c.orderCount - 1);
        totalDaysBetween += daysBetween;
        repeatPairs += 1;
      }
    }
    const avgDaysBetweenOrders =
      repeatPairs > 0 ? Math.round(totalDaysBetween / repeatPairs) : null;

    const topCustomers = allCustomers
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 10)
      .map((c) => ({
        name: c.name,
        email: c.email,
        orderCount: c.orderCount,
        totalSpent: c.totalSpent,
        firstOrder: c.firstOrder.toISOString(),
        lastOrder: c.lastOrder.toISOString(),
      }));

    // ─── Growth Metrics ───────────────────────────────────────────────────────

    // Monthly trend (sorted oldest first for charts)
    const monthlyTrend = Array.from(monthlyMap.entries())
      .map(([month, data]) => ({
        month,
        orders: data.orderCount,
        revenue: data.revenue,
      }))
      .sort((a, b) => a.month.localeCompare(b.month));

    // New vs Repeat by month
    // First, find each customer's first-order month
    const customerFirstMonth = new Map<string, string>();
    for (const order of succeededOrders) {
      const email = order.email.toLowerCase();
      const mk = monthKey(order.createdAt);
      const existing = customerFirstMonth.get(email);
      if (!existing || mk < existing) {
        customerFirstMonth.set(email, mk);
      }
    }

    const newVsRepeatMap = new Map<
      string,
      { newCustomers: Set<string>; repeatCustomers: Set<string> }
    >();

    for (const order of succeededOrders) {
      const email = order.email.toLowerCase();
      const mk = monthKey(order.createdAt);
      const entry = newVsRepeatMap.get(mk) ?? {
        newCustomers: new Set<string>(),
        repeatCustomers: new Set<string>(),
      };
      if (customerFirstMonth.get(email) === mk) {
        entry.newCustomers.add(email);
      } else {
        entry.repeatCustomers.add(email);
      }
      newVsRepeatMap.set(mk, entry);
    }

    const newVsRepeat = Array.from(newVsRepeatMap.entries())
      .map(([month, data]) => ({
        month,
        newCustomers: data.newCustomers.size,
        repeatCustomers: data.repeatCustomers.size,
      }))
      .sort((a, b) => a.month.localeCompare(b.month));

    // Forecast using inventory forecast module
    const forecastOrders = succeededOrders.map((o) => ({
      createdAt: o.createdAt.toISOString(),
      items: (itemsByOrder.get(o.id) ?? []).map((i) => ({
        name: i.name,
        quantity: i.quantity,
      })),
    }));

    const weeklyDemand = aggregateWeeklyDemand(forecastOrders);
    const growthFactor = calculateGrowthFactor(weeklyDemand);

    const avgWeeklyOrders =
      weeklyDemand.length > 0
        ? weeklyDemand.slice(-4).reduce((s, w) => s + w.orderCount, 0) /
          Math.min(4, weeklyDemand.length)
        : 0;

    const next4WeeksOrders = Math.round(avgWeeklyOrders * growthFactor * 4);
    const next4WeeksRevenue = next4WeeksOrders * avgOrderValue;
    const projectedMonthlyRevenue = Math.round(next4WeeksRevenue * (30 / 28));

    // ─── Shipping Analysis ────────────────────────────────────────────────────

    const ordersWithShipping = succeededOrders.filter(
      (o) => o.shippingCost != null && o.shippingCost > 0
    );
    const totalShippingSpend = ordersWithShipping.reduce(
      (s, o) => s + (o.shippingCost ?? 0),
      0
    );
    const avgShippingCost =
      ordersWithShipping.length > 0
        ? Math.round(totalShippingSpend / ordersWithShipping.length)
        : 0;
    const shippingAsPctRevenue =
      totalRevenue > 0
        ? Math.round((totalShippingSpend / totalRevenue) * 1000) / 10
        : 0;

    // Shipping by order size bucket
    const shippingByBucket = new Map<
      string,
      { totalShipping: number; count: number }
    >();

    for (const order of ordersWithShipping) {
      const bucket = getOrderSizeBucket(order.total);
      const entry = shippingByBucket.get(bucket) ?? {
        totalShipping: 0,
        count: 0,
      };
      entry.totalShipping += order.shippingCost ?? 0;
      entry.count += 1;
      shippingByBucket.set(bucket, entry);
    }

    const byOrderSize = BUCKET_ORDER.filter((b) => shippingByBucket.has(b)).map(
      (range) => {
        const data = shippingByBucket.get(range)!;
        return {
          range,
          avgShipping: Math.round(data.totalShipping / data.count),
          orderCount: data.count,
        };
      }
    );

    // ─── Order Size Distribution ──────────────────────────────────────────────

    const sizeBucketMap = new Map<
      string,
      {
        orderCount: number;
        totalRevenue: number;
        totalTotal: number;
        totalCogs: number;
      }
    >();

    for (const order of succeededOrders) {
      const bucket = getOrderSizeBucket(order.total);
      const entry = sizeBucketMap.get(bucket) ?? {
        orderCount: 0,
        totalRevenue: 0,
        totalTotal: 0,
        totalCogs: 0,
      };
      entry.orderCount += 1;
      entry.totalRevenue += order.total;
      entry.totalTotal += order.total;

      const items = itemsByOrder.get(order.id) ?? [];
      for (const item of items) {
        entry.totalCogs +=
          getCogsPerUnit(item.sku, item.name, item.price) * item.quantity;
      }

      sizeBucketMap.set(bucket, entry);
    }

    const orderSizeDistribution = BUCKET_ORDER.filter((b) =>
      sizeBucketMap.has(b)
    ).map((range) => {
      const data = sizeBucketMap.get(range)!;
      const avgTotal = Math.round(data.totalTotal / data.orderCount);
      const avgCogs = Math.round(data.totalCogs / data.orderCount);
      const avgMarginPct =
        avgTotal > 0
          ? Math.round(((avgTotal - avgCogs) / avgTotal) * 1000) / 10
          : 0;
      return {
        range,
        orderCount: data.orderCount,
        avgTotal,
        totalRevenue: data.totalRevenue,
        avgCogs,
        avgMarginPct,
      };
    });

    // ─── True Cost Margin Analysis ($5 increments) ────────────────────────────

    const fiveBucketOrder = getFiveIncrementBucketOrder();
    const fiveBucketMap = new Map<
      string,
      {
        orderCount: number;
        totalRevenue: number;
        totalCogs: number;
        totalShipping: number;
        totalItems: number;
      }
    >();

    for (const order of succeededOrders) {
      const bucket = getFiveIncrementBucket(order.total);
      const entry = fiveBucketMap.get(bucket) ?? {
        orderCount: 0,
        totalRevenue: 0,
        totalCogs: 0,
        totalShipping: 0,
        totalItems: 0,
      };
      entry.orderCount += 1;
      entry.totalRevenue += order.total;
      entry.totalShipping += order.shippingCost ?? 0;

      const items = itemsByOrder.get(order.id) ?? [];
      for (const item of items) {
        entry.totalCogs +=
          getCogsPerUnit(item.sku, item.name, item.price) * item.quantity;
        entry.totalItems += item.quantity;
      }

      fiveBucketMap.set(bucket, entry);
    }

    const trueCostAnalysis = fiveBucketOrder
      .filter((b) => fiveBucketMap.has(b))
      .map((range) => {
        const d = fiveBucketMap.get(range)!;
        const avgRevenue = Math.round(d.totalRevenue / d.orderCount);
        const avgCogs = Math.round(d.totalCogs / d.orderCount);
        const avgShipping = Math.round(d.totalShipping / d.orderCount);
        const avgItems = d.totalItems / d.orderCount;
        const avgLabor = LABOR_PER_ORDER_CENTS; // flat per order
        const totalCostPerOrder =
          avgCogs + avgShipping + CAC_CENTS + avgLabor + PACKAGING_CENTS;
        const netProfit = avgRevenue - totalCostPerOrder;
        const netMarginPct =
          avgRevenue > 0
            ? Math.round((netProfit / avgRevenue) * 1000) / 10
            : 0;

        return {
          range,
          orderCount: d.orderCount,
          avgRevenue,
          avgCogs,
          avgShipping,
          avgAdCost: CAC_CENTS,
          avgLabor,
          avgPackaging: PACKAGING_CENTS,
          avgItems: Math.round(avgItems * 10) / 10,
          netProfit,
          netMarginPct,
        };
      });

    // ─── Response ─────────────────────────────────────────────────────────────

    return NextResponse.json({
      overview: {
        totalRevenue,
        thisMonthRevenue,
        totalOrders,
        thisMonthOrders: thisMonthOrders.length,
        avgOrderValue,
        grossMarginPct,
      },
      monthlyPnL,
      productBreakdown,
      customerInsights: {
        totalCustomers,
        repeatCustomers,
        repeatRate,
        avgDaysBetweenOrders,
        topCustomers,
      },
      growthMetrics: {
        monthlyTrend,
        newVsRepeat,
        forecast: {
          next4WeeksOrders,
          next4WeeksRevenue,
          projectedMonthlyRevenue,
        },
      },
      shippingAnalysis: {
        avgShippingCost,
        shippingAsPctRevenue,
        totalShippingSpend,
        ordersWithShippingData: ordersWithShipping.length,
        byOrderSize,
      },
      orderSizeDistribution,
      trueCostAnalysis,
      costConstants: {
        cacPerOrder: CAC_CENTS,
        laborPerOrder: LABOR_PER_ORDER_CENTS,
        packagingPerShipment: PACKAGING_CENTS,
        laborRate: LABOR_RATE_PER_HOUR,
        laborMinutesPerOrder: LABOR_MINUTES_PER_ORDER,
      },
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
