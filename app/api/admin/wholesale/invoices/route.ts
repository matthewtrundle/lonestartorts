import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createWholesaleInvoice, sendInvoice } from '@/lib/wholesale/stripe';

// Generate order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substring(2, 4).toUpperCase();
  return `WS-${timestamp}${random}`;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get('clientId');
    const paymentStatus = searchParams.get('paymentStatus');
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '50');

    const where: Record<string, unknown> = {};
    if (clientId) {
      where.clientId = clientId;
    }
    if (paymentStatus) {
      where.paymentStatus = paymentStatus;
    }

    const [orders, total] = await Promise.all([
      prisma.wholesaleOrder.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * perPage,
        take: perPage,
        include: {
          client: {
            select: {
              businessName: true,
              contactName: true,
              email: true,
            },
          },
          items: true,
        },
      }),
      prisma.wholesaleOrder.count({ where }),
    ]);

    return NextResponse.json({
      invoices: orders,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientId, items, discount, shipping, customerNotes, internalNotes, autoSend } = body;

    // Validate
    if (!clientId || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Client ID and items are required' },
        { status: 400 }
      );
    }

    // Get client
    const client = await prisma.wholesaleClient.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    if (!client.stripeCustomerId) {
      return NextResponse.json(
        { error: 'Client does not have a Stripe customer ID' },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: { quantity: number; unitPrice: number }) =>
      sum + (item.quantity * item.unitPrice), 0
    );
    const total = subtotal - (discount || 0) + (shipping || 0);

    // Create Stripe invoice
    const stripeInvoice = await createWholesaleInvoice({
      stripeCustomerId: client.stripeCustomerId,
      items: items.map((item: { name: string; description?: string; quantity: number; unitPrice: number }) => ({
        name: item.name,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      discount: discount || 0,
      shipping: shipping || 0,
      paymentTerms: client.paymentTerms,
      metadata: {
        clientId: client.id,
        clientName: client.businessName,
      },
    });

    // Calculate due date based on payment terms
    const daysUntilDue: Record<string, number> = {
      DUE_ON_RECEIPT: 0,
      NET_7: 7,
      NET_15: 15,
      NET_30: 30,
      NET_45: 45,
      NET_60: 60,
    };
    const dueDays = daysUntilDue[client.paymentTerms] || 0;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + dueDays);

    // Create order in database
    const order = await prisma.wholesaleOrder.create({
      data: {
        orderNumber: generateOrderNumber(),
        clientId: client.id,
        stripeInvoiceId: stripeInvoice.id,
        subtotal,
        discount: discount || 0,
        shipping: shipping || 0,
        tax: 0,
        total,
        paymentStatus: 'DRAFT',
        paymentTerms: client.paymentTerms,
        dueDate,
        orderStatus: 'PENDING',
        shippingName: client.shippingName || client.contactName,
        shippingAddress1: client.shippingAddress1,
        shippingAddress2: client.shippingAddress2,
        shippingCity: client.shippingCity,
        shippingState: client.shippingState,
        shippingZip: client.shippingZip,
        shippingCountry: client.shippingCountry,
        customerNotes: customerNotes || null,
        internalNotes: internalNotes || null,
        items: {
          create: items.map((item: { name: string; description?: string; quantity: number; unitPrice: number; sku?: string }) => ({
            name: item.name,
            description: item.description || null,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.quantity * item.unitPrice,
            sku: item.sku || null,
          })),
        },
      },
      include: {
        items: true,
        client: true,
      },
    });

    // Send invoice if requested
    if (autoSend) {
      try {
        const sentInvoice = await sendInvoice(stripeInvoice.id);

        // Update order with sent status
        await prisma.wholesaleOrder.update({
          where: { id: order.id },
          data: {
            paymentStatus: 'PENDING',
            stripeInvoiceUrl: sentInvoice.hosted_invoice_url,
            stripeInvoiceNumber: sentInvoice.number,
            invoiceSentAt: new Date(),
          },
        });
      } catch (sendError) {
        console.error('Failed to send invoice:', sendError);
        // Invoice created but not sent - user can send later
      }
    }

    return NextResponse.json({ invoice: order });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    );
  }
}
