import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';
import {
  aggregateWeeklyDemand,
  projectNextTuesday,
  getNextTuesday,
  type OrderRecord,
} from '@/lib/inventory/forecast';
import {
  REFRIGERATED_PICKUP_DAY,
  REFRIGERATED_PICKUP_TIME,
  SHELF_STABLE_PICKUP_DAY,
  SHELF_STABLE_PICKUP_TIME,
} from '@/lib/inventory/constants';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    const twelveWeeksAgo = new Date(now);
    twelveWeeksAgo.setDate(twelveWeeksAgo.getDate() - 84);

    // 1. Historical orders (last 12 weeks)
    const historicalOrders = await prisma.order.findMany({
      where: {
        paymentStatus: 'SUCCEEDED',
        createdAt: { gte: twelveWeeksAgo },
      },
      include: { OrderItem: true },
      orderBy: { createdAt: 'desc' },
    });

    // 2. Current unfulfilled orders (retail + wholesale)
    const [unfulfilledRetail, unfulfilledWholesale] = await Promise.all([
      prisma.order.findMany({
        where: {
          status: { in: ['PENDING', 'PROCESSING'] },
          paymentStatus: 'SUCCEEDED',
        },
        include: { OrderItem: true },
      }),
      prisma.wholesaleOrder.findMany({
        where: {
          orderStatus: { in: ['PENDING', 'PROCESSING', 'READY'] },
        },
        include: { items: true },
      }),
    ]);

    // 3. Active retail subscriptions due before next Tuesday
    const nextTuesday = getNextTuesday(now);
    let subscriptionItems: { name: string; quantity: number }[] = [];
    try {
      const activeSubs = await prisma.retailSubscription.findMany({
        where: {
          status: 'ACTIVE',
          nextBillingDate: { lte: nextTuesday },
        },
      });
      for (const sub of activeSubs) {
        const items = sub.items as { name: string; quantity: number }[];
        if (Array.isArray(items)) {
          subscriptionItems.push(...items.map((i) => ({ name: i.name, quantity: i.quantity })));
        }
      }
    } catch {
      // RetailSubscription table may not exist yet — gracefully skip
    }

    // Normalize all historical orders to OrderRecord format
    const allHistorical: OrderRecord[] = historicalOrders.map((o) => ({
      createdAt: o.createdAt.toISOString(),
      items: o.OrderItem.filter((i) => i.sku !== 'SHIPPING').map((i) => ({
        name: i.name,
        quantity: i.quantity,
      })),
    }));

    // Current week orders (unfulfilled retail + wholesale)
    const currentWeekOrders: OrderRecord[] = [
      ...unfulfilledRetail.map((o) => ({
        createdAt: o.createdAt.toISOString(),
        items: o.OrderItem.filter((i) => i.sku !== 'SHIPPING').map((i) => ({
          name: i.name,
          quantity: i.quantity,
        })),
      })),
      ...unfulfilledWholesale.map((o) => ({
        createdAt: o.createdAt.toISOString(),
        items: o.items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
        })),
      })),
    ];

    // Add subscription items as a synthetic current-week order
    if (subscriptionItems.length > 0) {
      currentWeekOrders.push({
        createdAt: now.toISOString(),
        items: subscriptionItems,
      });
    }

    // Run forecast
    const historicalWeeks = aggregateWeeklyDemand(allHistorical);
    const projection = projectNextTuesday(
      historicalWeeks,
      currentWeekOrders,
      allHistorical,
      now
    );

    // Build pickup schedule
    const refrigeratedItems = projection.skuProjections.filter((s) => s.storage === 'refrigerated');
    const shelfStableItems = projection.skuProjections.filter((s) => s.storage === 'shelf_stable');

    return NextResponse.json({
      shipDate: projection.shipDate.toISOString(),
      cutoffDate: projection.cutoffDate.toISOString(),
      hoursUntilCutoff: Math.round(projection.hoursUntilCutoff * 10) / 10,
      confirmedOrders: projection.confirmedOrders,
      projectedTotalOrders: projection.projectedTotalOrders,
      growthTrend: Math.round(projection.growthTrend * 100),
      skuProjections: projection.skuProjections,
      pickupSchedule: {
        refrigerated: {
          pickupDay: REFRIGERATED_PICKUP_DAY,
          pickupTime: REFRIGERATED_PICKUP_TIME,
          items: refrigeratedItems,
        },
        shelfStable: {
          pickupDay: SHELF_STABLE_PICKUP_DAY,
          pickupTime: SHELF_STABLE_PICKUP_TIME,
          items: shelfStableItems,
        },
      },
      historicalWeeks: projection.historicalWeeks.map((w) => ({
        weekStart: w.weekStart.toISOString(),
        shipDate: w.shipDate.toISOString(),
        orderCount: w.orderCount,
        totalUnits: w.totalUnits,
      })),
    });
  } catch (error) {
    console.error('Error fetching inventory projections:', error);
    return NextResponse.json({ error: 'Failed to fetch inventory projections' }, { status: 500 });
  }
}
