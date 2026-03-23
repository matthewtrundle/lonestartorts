import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';
import { detectCarrier } from '@/lib/shipping';
import { sendOrderShippedEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const sendEmails = formData.get('sendEmails') === 'true';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const text = await file.text();
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);

    if (lines.length < 2) {
      return NextResponse.json({ error: 'CSV must have a header row and at least one data row' }, { status: 400 });
    }

    // Parse header
    const header = lines[0].split(',').map((h) => h.trim().toLowerCase());
    const orderNumberIdx = header.findIndex((h) => h.includes('order'));
    const trackingIdx = header.findIndex((h) => h.includes('tracking'));
    const carrierIdx = header.findIndex((h) => h.includes('carrier'));

    if (orderNumberIdx === -1 || trackingIdx === -1) {
      return NextResponse.json(
        { error: 'CSV must have "Order Number" and "Tracking Number" columns' },
        { status: 400 }
      );
    }

    const results: { updated: number; errors: { orderNumber: string; error: string }[]; skipped: number } = {
      updated: 0,
      errors: [],
      skipped: 0,
    };

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map((c) => c.trim());
      const orderNumber = cols[orderNumberIdx];
      const trackingNumber = cols[trackingIdx];
      const csvCarrier = carrierIdx !== -1 ? cols[carrierIdx] : '';

      if (!orderNumber || !trackingNumber) {
        results.skipped++;
        continue;
      }

      const carrier = csvCarrier || detectCarrier(trackingNumber) || 'USPS';

      try {
        if (orderNumber.startsWith('WS-')) {
          // Wholesale order
          const order = await prisma.wholesaleOrder.findUnique({
            where: { orderNumber },
            include: { items: true, client: true },
          });

          if (!order) {
            results.errors.push({ orderNumber, error: 'Order not found' });
            continue;
          }

          await prisma.wholesaleOrder.update({
            where: { orderNumber },
            data: {
              orderStatus: 'SHIPPED',
              trackingNumber,
              carrier,
              shippedAt: new Date(),
            },
          });

          if (sendEmails && order.client.email) {
            await sendOrderShippedEmail({
              to: order.client.email,
              orderNumber: order.orderNumber,
              customerName: order.client.contactName,
              trackingNumber,
              carrier,
              items: order.items
                .filter((item) => item.sku !== 'SHIPPING')
                .map((item) => ({ name: item.name, quantity: item.quantity, price: item.unitPrice })),
            });
          }

          results.updated++;
        } else {
          // Retail order
          const order = await prisma.order.findUnique({
            where: { orderNumber },
            include: { OrderItem: true },
          });

          if (!order) {
            results.errors.push({ orderNumber, error: 'Order not found' });
            continue;
          }

          await prisma.order.update({
            where: { orderNumber },
            data: {
              status: 'SHIPPED',
              trackingNumber,
              carrier,
              shippedAt: new Date(),
            },
          });

          if (sendEmails) {
            await sendOrderShippedEmail({
              to: order.email,
              orderNumber: order.orderNumber,
              customerName: order.shippingName || 'Customer',
              trackingNumber,
              carrier,
              items: order.OrderItem.filter((item) => item.sku !== 'SHIPPING'),
            });
          }

          results.updated++;
        }
      } catch (err: any) {
        results.errors.push({ orderNumber, error: err.message || 'Unknown error' });
      }
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error importing tracking:', error);
    return NextResponse.json({ error: 'Failed to import tracking data' }, { status: 500 });
  }
}
