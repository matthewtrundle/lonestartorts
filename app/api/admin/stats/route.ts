import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get date ranges
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const previous30Days = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    // Get all orders for calculations
    const [
      todayOrders,
      last30DaysOrders,
      previous30DaysOrders,
      pendingOrders,
      processingOrders,
      allOrders,
    ] = await Promise.all([
      // Today's orders
      prisma.order.findMany({
        where: {
          createdAt: { gte: todayStart },
          paymentStatus: 'SUCCEEDED',
        },
      }),
      // Last 30 days
      prisma.order.findMany({
        where: {
          createdAt: { gte: last30Days },
        },
      }),
      // Previous 30 days (for comparison)
      prisma.order.findMany({
        where: {
          createdAt: {
            gte: previous30Days,
            lt: last30Days,
          },
        },
      }),
      // Pending orders
      prisma.order.count({
        where: { status: 'PENDING' },
      }),
      // Processing orders (to ship)
      prisma.order.count({
        where: { status: 'PROCESSING' },
      }),
      // All successful orders
      prisma.order.findMany({
        where: {
          paymentStatus: 'SUCCEEDED',
        },
      }),
    ]);

    // Calculate metrics
    const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders30Days = last30DaysOrders.length;
    const totalOrdersPrevious30Days = previous30DaysOrders.length;

    // Calculate order trend
    const orderTrend = totalOrdersPrevious30Days > 0
      ? ((totalOrders30Days - totalOrdersPrevious30Days) / totalOrdersPrevious30Days) * 100
      : 0;

    // Calculate average order value
    const avgOrderValue = allOrders.length > 0
      ? allOrders.reduce((sum, order) => sum + order.total, 0) / allOrders.length
      : 0;

    // Get top product from all orders
    const productCounts: Record<string, { count: number; name: string }> = {};
    allOrders.forEach((order) => {
      const items = order.items as any[];
      items.forEach((item: any) => {
        if (item.sku && item.sku !== 'SHIPPING') {
          if (!productCounts[item.sku]) {
            productCounts[item.sku] = { count: 0, name: item.name || item.sku };
          }
          productCounts[item.sku].count += item.quantity || 1;
        }
      });
    });

    const topProduct = Object.entries(productCounts)
      .sort((a, b) => b[1].count - a[1].count)[0];

    // Get recent orders (last 10)
    const recentOrders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        orderNumber: true,
        customerName: true,
        email: true,
        total: true,
        status: true,
        paymentStatus: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      metrics: {
        todayRevenue: {
          value: todayRevenue,
          formatted: `$${(todayRevenue / 100).toFixed(2)}`,
        },
        pendingOrders: {
          value: pendingOrders,
        },
        ordersToShip: {
          value: processingOrders,
        },
        totalOrders: {
          value: totalOrders30Days,
          trend: {
            value: Math.round(orderTrend),
            direction: orderTrend > 0 ? 'up' : orderTrend < 0 ? 'down' : 'neutral',
          },
        },
        avgOrderValue: {
          value: avgOrderValue,
          formatted: `$${(avgOrderValue / 100).toFixed(2)}`,
        },
        topProduct: topProduct
          ? {
              name: topProduct[1].name,
              count: topProduct[1].count,
            }
          : null,
      },
      recentOrders,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    const errorDetails: Record<string, unknown> = {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
    };
    if (error && typeof error === 'object' && 'code' in error) {
      errorDetails.prismaCode = (error as any).code;
    }
    console.error('Error details:', errorDetails);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
