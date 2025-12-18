import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get counts
    const [
      activeClients,
      pendingInquiries,
      activeSubscriptions,
      recentInquiries,
      recentOrders,
    ] = await Promise.all([
      prisma.wholesaleClient.count({ where: { status: 'ACTIVE' } }),
      prisma.wholesaleInquiry.count({ where: { status: 'PENDING' } }),
      prisma.wholesaleSubscription.count({ where: { status: 'ACTIVE' } }),
      prisma.wholesaleInquiry.findMany({
        where: { status: { in: ['PENDING', 'UNDER_REVIEW'] } },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      prisma.wholesaleOrder.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          client: { select: { businessName: true } },
        },
      }),
    ]);

    // Calculate monthly revenue (paid orders in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const paidOrders = await prisma.wholesaleOrder.findMany({
      where: {
        paymentStatus: 'PAID',
        paidAt: { gte: thirtyDaysAgo },
      },
      select: { total: true },
    });
    const monthlyRevenue = paidOrders.reduce((sum, order) => sum + order.total, 0);

    // Calculate outstanding amount
    const outstandingOrders = await prisma.wholesaleOrder.findMany({
      where: {
        paymentStatus: { in: ['PENDING', 'OVERDUE'] },
      },
      select: { total: true },
    });
    const outstandingAmount = outstandingOrders.reduce((sum, order) => sum + order.total, 0);

    return NextResponse.json({
      activeClients,
      pendingInquiries,
      monthlyRevenue,
      outstandingAmount,
      activeSubscriptions,
      recentInquiries,
      recentOrders: recentOrders.map(order => ({
        id: order.id,
        orderNumber: order.orderNumber,
        clientName: order.client.businessName,
        total: order.total,
        paymentStatus: order.paymentStatus,
        createdAt: order.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error('Error fetching wholesale stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
