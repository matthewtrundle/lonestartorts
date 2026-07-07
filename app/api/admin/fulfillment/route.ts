import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';
import { getNextShipDate, formatShipDate } from '@/lib/shipping-schedule';
import { products, getProductBySku } from '@/lib/products';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Replacement orders can be scheduled for a future ship week — hold them out
    // of the queue until their week is the upcoming batch. Orders with no
    // scheduledShipDate (the normal case) always show.
    const nextShip = getNextShipDate();

    // Fetch unfulfilled retail orders (PENDING/PROCESSING with successful payment)
    const retailOrders = await prisma.order.findMany({
      where: {
        status: { in: ['PENDING', 'PROCESSING'] },
        paymentStatus: 'SUCCEEDED',
        OR: [
          { scheduledShipDate: null },
          { scheduledShipDate: { lte: nextShip } },
        ],
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
      isSubscription: o.retailSubscriptionId != null,
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
      isSubscription: false,
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

    // Resolve each line item to its canonical catalog product so the buy list
    // groups by the real product, not the raw stored SKU. This matters because
    // the same tortilla can reach us under different SKU strings depending on
    // how the order was created — checkout reads the SKU from Stripe price
    // metadata (blank when a price is missing it), while subscription orders
    // carry the SKU frozen into the subscription. Without this, e.g. butter
    // tortillas split into two identical-named rows (one per SKU spelling),
    // which throws off the HEB per-order limit math (the count that decides how
    // many separate HEB purchases a product needs).
    const canonicalize = (item: { sku: string; name: string }) => {
      const product = getProductBySku(item.sku) || products.find((p) => p.name === item.name);
      if (product) return { key: product.sku, sku: product.sku, name: product.name };
      // Unknown item (e.g. wholesale-only SKU): fall back to prior behavior.
      return { key: item.sku || item.name, sku: item.sku || '-', name: item.name };
    };

    // Aggregate items by canonical product.
    const skuMap = new Map<string, { sku: string; name: string; totalQuantity: number; orderCount: number }>();
    for (const order of orders) {
      const orderKeys = new Set<string>();
      for (const item of order.items) {
        const { key, sku, name } = canonicalize(item);
        if (!key) continue;
        const existing = skuMap.get(key);
        if (existing) {
          existing.totalQuantity += item.quantity;
          if (!orderKeys.has(key)) {
            existing.orderCount += 1;
          }
        } else {
          skuMap.set(key, {
            sku,
            name,
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
    const subscriptionCount = orders.filter((o) => o.isSubscription).length;
    const totalItemsToPack = orders.reduce(
      (sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0),
      0
    );

    // All unfulfilled orders ship on the same upcoming ship day (Tuesdays, Central).
    // This is the actionable date for fulfillment — not the backdated charge date.
    const nextShipDate = getNextShipDate();

    return NextResponse.json({
      orders,
      skuAggregates,
      summary: {
        pendingCount,
        processingCount,
        readyCount,
        subscriptionCount,
        totalUnfulfilled: orders.length,
        totalItemsToPack,
        nextShipDate: nextShipDate.toISOString(),
        shipByDisplay: formatShipDate(nextShipDate),
      },
    });
  } catch (error) {
    console.error('Error fetching fulfillment data:', error);
    return NextResponse.json({ error: 'Failed to fetch fulfillment data' }, { status: 500 });
  }
}
