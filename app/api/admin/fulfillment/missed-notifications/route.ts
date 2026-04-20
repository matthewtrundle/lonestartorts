import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

/**
 * List orders that have been marked SHIPPED or DELIVERED but never had a
 * shipping notification email recorded as sent.
 *
 * This is the safety net for the Tuesday-shipment notification bug:
 * any order here is one we shipped without telling the customer.
 */
export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const retail = await prisma.order.findMany({
      where: {
        status: { in: ['SHIPPED', 'DELIVERED'] },
        shippedEmailSentAt: null,
        paymentStatus: 'SUCCEEDED',
      },
      orderBy: { shippedAt: 'desc' },
      select: {
        id: true,
        orderNumber: true,
        email: true,
        shippingName: true,
        status: true,
        shippedAt: true,
        deliveredAt: true,
        trackingNumber: true,
        carrier: true,
        total: true,
      },
    });

    const wholesale = await prisma.wholesaleOrder.findMany({
      where: {
        orderStatus: { in: ['SHIPPED', 'DELIVERED'] },
        shippedEmailSentAt: null,
      },
      orderBy: { shippedAt: 'desc' },
      include: {
        client: { select: { email: true, contactName: true, businessName: true } },
      },
    });

    return NextResponse.json({
      retail: retail.map((o) => ({
        id: o.id,
        type: 'retail' as const,
        orderNumber: o.orderNumber,
        email: o.email,
        customerName: o.shippingName || 'Customer',
        status: o.status,
        shippedAt: o.shippedAt,
        deliveredAt: o.deliveredAt,
        trackingNumber: o.trackingNumber,
        carrier: o.carrier,
        total: o.total,
      })),
      wholesale: wholesale.map((o) => ({
        id: o.id,
        type: 'wholesale' as const,
        orderNumber: o.orderNumber,
        email: o.client.email,
        customerName: o.client.contactName,
        businessName: o.client.businessName,
        status: o.orderStatus,
        shippedAt: o.shippedAt,
        deliveredAt: o.deliveredAt,
        trackingNumber: o.trackingNumber,
        carrier: o.carrier,
        total: o.total,
      })),
    });
  } catch (error) {
    console.error('Missed-notifications list error:', error);
    return NextResponse.json({ error: 'Failed to load missed notifications' }, { status: 500 });
  }
}
