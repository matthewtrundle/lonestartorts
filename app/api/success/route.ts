import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// Get order by Stripe session ID
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Session ID required' },
        { status: 400 }
      );
    }

    // Find order by Stripe session ID or payment intent ID
    // The webhook stores either payment_intent or session.id in stripePaymentId
    const order = await prisma.order.findFirst({
      where: {
        stripePaymentId: sessionId,
      },
      include: {
        orderItems: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        orderNumber: order.orderNumber,
        email: order.email,
        customerName: order.shippingName,
        items: order.orderItems,
        subtotal: order.subtotal,
        shipping: order.shipping,
        tax: order.tax,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
        shippingAddress: {
          name: order.shippingName,
          address1: order.shippingAddress1,
          address2: order.shippingAddress2,
          city: order.shippingCity,
          state: order.shippingState,
          zip: order.shippingZip,
          country: order.shippingCountry,
        },
      },
    });
  } catch (error) {
    console.error('Success page order fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve order' },
      { status: 500 }
    );
  }
}
