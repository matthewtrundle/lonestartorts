import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';
import { sendOrderConfirmationEmail } from '@/lib/email';
import { getShipDateDisplay, formatShipDate } from '@/lib/shipping-schedule';

export async function POST() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get today's orders (UTC start of day adjusted for CST ~ UTC-6)
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const orders = await prisma.order.findMany({
      where: {
        createdAt: { gte: todayStart },
        paymentStatus: 'SUCCEEDED',
      },
      include: { OrderItem: true },
      orderBy: { createdAt: 'asc' },
    });

    if (orders.length === 0) {
      return NextResponse.json({ message: 'No orders found for today', sent: 0 });
    }

    const results = [];

    for (const order of orders) {
      try {
        await sendOrderConfirmationEmail({
          to: order.email,
          orderNumber: order.orderNumber,
          customerName: order.shippingName || 'Guest',
          items: order.OrderItem.map((item) => ({
            name: item.name,
            sku: item.sku || '',
            price: item.price,
            quantity: item.quantity,
          })),
          subtotal: order.subtotal,
          shipping: order.shipping,
          tax: order.tax,
          total: order.total,
          shippingAddress: {
            street: order.shippingAddress1 || undefined,
            city: order.shippingCity || undefined,
            state: order.shippingState || undefined,
            zip: order.shippingZip || undefined,
            country: order.shippingCountry || undefined,
          },
          estimatedShipDate: order.shippedAt
            ? formatShipDate(order.shippedAt)
            : getShipDateDisplay(),
        });
        results.push({ orderNumber: order.orderNumber, email: order.email, status: 'sent' });
      } catch (err) {
        results.push({ orderNumber: order.orderNumber, email: order.email, status: 'failed', error: String(err) });
      }
    }

    const sent = results.filter((r) => r.status === 'sent').length;
    const failed = results.filter((r) => r.status === 'failed').length;

    return NextResponse.json({ message: `Resent ${sent} confirmation emails (${failed} failed)`, sent, failed, results });
  } catch (error) {
    console.error('Resend confirmations error:', error);
    return NextResponse.json({ error: 'Failed to resend confirmations' }, { status: 500 });
  }
}
