import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedCustomer } from '@/lib/customer-auth';

function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substring(2, 4).toUpperCase();
  return `WS-${timestamp}${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const customer = await getAuthenticatedCustomer();
    if (!customer) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    if (!customer.isWholesale || !customer.wholesaleClientId) {
      return NextResponse.json({ error: 'Wholesale account required' }, { status: 403 });
    }

    const wholesaleClient = await prisma.wholesaleClient.findUnique({
      where: { id: customer.wholesaleClientId },
    });

    if (!wholesaleClient) {
      return NextResponse.json({ error: 'Wholesale client not found' }, { status: 404 });
    }

    // Only allow NET terms customers to use this endpoint
    if (wholesaleClient.paymentTerms === 'DUE_ON_RECEIPT') {
      return NextResponse.json(
        { error: 'This endpoint is for NET terms customers only. Please use standard checkout.' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { items, customerNotes } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Items are required' }, { status: 400 });
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems: Array<{
      name: string;
      sku: string | null;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
    }> = [];

    for (const item of items) {
      if (!item.name || !item.quantity || !item.price) {
        return NextResponse.json(
          { error: 'Each item must have name, quantity, and price' },
          { status: 400 }
        );
      }
      const totalPrice = item.price * item.quantity;
      subtotal += totalPrice;
      orderItems.push({
        name: item.name,
        sku: item.sku || null,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice,
      });
    }

    // Calculate tax and due date
    const tax = Math.round(subtotal * 0.0825);
    const total = subtotal + tax; // Free shipping for wholesale

    // Calculate due date based on payment terms
    const termsToDay: Record<string, number> = {
      NET_7: 7,
      NET_15: 15,
      NET_30: 30,
      NET_45: 45,
      NET_60: 60,
    };
    const daysUntilDue = termsToDay[wholesaleClient.paymentTerms] || 30;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + daysUntilDue);

    // Create the order
    const order = await prisma.wholesaleOrder.create({
      data: {
        orderNumber: generateOrderNumber(),
        clientId: wholesaleClient.id,
        subtotal,
        tax,
        total,
        shipping: 0,
        paymentStatus: 'PENDING',
        paymentTerms: wholesaleClient.paymentTerms,
        dueDate,
        customerNotes: customerNotes || null,
        shippingName: wholesaleClient.shippingName,
        shippingAddress1: wholesaleClient.shippingAddress1,
        shippingAddress2: wholesaleClient.shippingAddress2,
        shippingCity: wholesaleClient.shippingCity,
        shippingState: wholesaleClient.shippingState,
        shippingZip: wholesaleClient.shippingZip,
        shippingCountry: wholesaleClient.shippingCountry,
        items: {
          create: orderItems.map((item) => ({
            name: item.name,
            sku: item.sku,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        total: order.total,
        paymentTerms: order.paymentTerms,
        dueDate: order.dueDate,
      },
    });
  } catch (error) {
    console.error('Failed to place wholesale order:', error);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}
