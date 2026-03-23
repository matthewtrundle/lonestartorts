import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';
import { calculateOrderWeightOz, calculateDimensions } from '@/lib/shipping';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orderIdsParam = req.nextUrl.searchParams.get('orderIds');
    const orderIds = orderIdsParam ? orderIdsParam.split(',').map((id) => id.trim()) : null;

    // Fetch retail orders
    const retailWhere: any = {
      status: { in: ['PENDING', 'PROCESSING'] },
      paymentStatus: 'SUCCEEDED',
    };
    if (orderIds) {
      retailWhere.id = { in: orderIds };
    }

    const retailOrders = await prisma.order.findMany({
      where: retailWhere,
      include: { OrderItem: true },
    });

    // Fetch wholesale orders
    const wholesaleWhere: any = {
      orderStatus: { in: ['PENDING', 'PROCESSING', 'READY'] },
    };
    if (orderIds) {
      wholesaleWhere.id = { in: orderIds };
    }

    const wholesaleOrders = await prisma.wholesaleOrder.findMany({
      where: wholesaleWhere,
      include: {
        items: true,
        client: { select: { businessName: true, contactName: true, email: true, phone: true } },
      },
    });

    // Build CSV rows
    const rows: string[][] = [];

    for (const o of retailOrders) {
      const productItems = o.OrderItem.filter((i) => i.sku !== 'SHIPPING');
      const totalItemCount = productItems.reduce((s, i) => s + i.quantity, 0);
      const weightOz = calculateOrderWeightOz(productItems);
      const [length, width, height] = calculateDimensions(totalItemCount);
      const description = productItems.map((i) => `${i.name} x${i.quantity}`).join(', ');

      rows.push([
        o.orderNumber,
        o.shippingName || '',
        '', // company
        o.shippingAddress1 || '',
        o.shippingAddress2 || '',
        o.shippingCity || '',
        o.shippingState || '',
        o.shippingZip || '',
        o.shippingCountry || 'US',
        o.shippingPhone || '',
        o.email,
        String(weightOz),
        String(length),
        String(width),
        String(height),
        description,
        String(totalItemCount),
      ]);
    }

    for (const o of wholesaleOrders) {
      const totalItemCount = o.items.reduce((s, i) => s + i.quantity, 0);
      const weightOz = calculateOrderWeightOz(o.items);
      const [length, width, height] = calculateDimensions(totalItemCount);
      const description = o.items.map((i) => `${i.name} x${i.quantity}`).join(', ');

      rows.push([
        o.orderNumber,
        o.shippingName || o.client.contactName,
        o.client.businessName,
        o.shippingAddress1 || '',
        o.shippingAddress2 || '',
        o.shippingCity || '',
        o.shippingState || '',
        o.shippingZip || '',
        o.shippingCountry || 'US',
        o.client.phone || '',
        o.client.email,
        String(weightOz),
        String(length),
        String(width),
        String(height),
        description,
        String(totalItemCount),
      ]);
    }

    // Build CSV
    const header = [
      'Order Number', 'Name', 'Company', 'Address 1', 'Address 2',
      'City', 'State', 'Zip', 'Country', 'Phone', 'Email',
      'Weight (oz)', 'Length', 'Width', 'Height',
      'Item Description', 'Item Quantity',
    ];

    const escapeCsv = (val: string) => {
      if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    };

    const csvLines = [
      header.map(escapeCsv).join(','),
      ...rows.map((row) => row.map(escapeCsv).join(',')),
    ];
    const csv = csvLines.join('\n');

    const date = new Date().toISOString().split('T')[0];

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="pirate-ship-${date}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting CSV:', error);
    return NextResponse.json({ error: 'Failed to export CSV' }, { status: 500 });
  }
}
