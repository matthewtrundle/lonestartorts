import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch unfulfilled retail orders (PENDING/PROCESSING with successful payment)
    const retailOrders = await prisma.order.findMany({
      where: {
        status: { in: ['PENDING', 'PROCESSING'] },
        paymentStatus: 'SUCCEEDED',
      },
      include: { OrderItem: true },
      orderBy: { createdAt: 'desc' },
    });

    // Fetch unfulfilled wholesale orders (PENDING/PROCESSING/READY)
    const wholesaleOrders = await prisma.wholesaleOrder.findMany({
      where: {
        orderStatus: { in: ['PENDING', 'PROCESSING', 'READY'] },
      },
      include: {
        items: true,
        client: { select: { businessName: true, contactName: true, email: true, phone: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Normalize retail orders
    const normalizedRetail = retailOrders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      type: 'retail' as const,
      name: o.shippingName || '',
      email: o.email,
      phone: o.shippingPhone || '',
      company: '',
      address1: o.shippingAddress1 || '',
      address2: o.shippingAddress2 || '',
      city: o.shippingCity || '',
      state: o.shippingState || '',
      zip: o.shippingZip || '',
      country: o.shippingCountry || 'US',
      status: o.status,
      total: o.total,
      createdAt: o.createdAt.toISOString(),
      items: o.OrderItem.filter((i) => i.sku !== 'SHIPPING').map((i) => ({
        sku: i.sku || '',
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      })),
    }));

    // Normalize wholesale orders
    const normalizedWholesale = wholesaleOrders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      type: 'wholesale' as const,
      name: o.client.contactName,
      email: o.client.email,
      phone: o.client.phone || '',
      company: o.client.businessName,
      address1: o.shippingAddress1 || '',
      address2: o.shippingAddress2 || '',
      city: o.shippingCity || '',
      state: o.shippingState || '',
      zip: o.shippingZip || '',
      country: o.shippingCountry || 'US',
      status: o.orderStatus,
      total: o.total,
      createdAt: o.createdAt.toISOString(),
      items: o.items.map((i) => ({
        sku: i.sku || '',
        name: i.name,
        quantity: i.quantity,
        price: i.unitPrice,
      })),
    }));

    const orders = [...normalizedRetail, ...normalizedWholesale].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Aggregate items by SKU (fall back to name as key when SKU is empty)
    const skuMap = new Map<string, { sku: string; name: string; totalQuantity: number; orderCount: number }>();
    for (const order of orders) {
      const orderKeys = new Set<string>();
      for (const item of order.items) {
        const key = item.sku || item.name;
        if (!key) continue;
        const existing = skuMap.get(key);
        if (existing) {
          existing.totalQuantity += item.quantity;
          if (!orderKeys.has(key)) {
            existing.orderCount += 1;
          }
        } else {
          skuMap.set(key, {
            sku: item.sku || '-',
            name: item.name,
            totalQuantity: item.quantity,
            orderCount: 1,
          });
        }
        orderKeys.add(key);
      }
    }

    const skuAggregates = Array.from(skuMap.values()).sort((a, b) => b.totalQuantity - a.totalQuantity);

    // Summary counts
    const pendingCount = orders.filter((o) => o.status === 'PENDING').length;
    const processingCount = orders.filter((o) => o.status === 'PROCESSING').length;
    const readyCount = orders.filter((o) => o.status === 'READY').length;
    const totalItemsToPack = orders.reduce(
      (sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0),
      0
    );

    return NextResponse.json({
      orders,
      skuAggregates,
      summary: {
        pendingCount,
        processingCount,
        readyCount,
        totalUnfulfilled: orders.length,
        totalItemsToPack,
      },
    });
  } catch (error) {
    console.error('Error fetching fulfillment data:', error);
    return NextResponse.json({ error: 'Failed to fetch fulfillment data' }, { status: 500 });
  }
}
