import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';
import { sendShippingApologyEmail } from '@/lib/email';
import { createApologyCoupon } from '@/lib/apology-coupon';

export const dynamic = 'force-dynamic';

/**
 * Send a shipping apology email (with $10 coupon) for a single order that was
 * shipped without notification. Used by the "Missed notifications" admin view.
 *
 * Only applies to retail orders for now — wholesale clients don't use
 * customer-facing coupons and have different notification expectations.
 */
export async function POST(
  _req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const order = await prisma.order.findUnique({
      where: { id: params.orderId },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.shippedEmailSentAt) {
      return NextResponse.json(
        { error: 'Shipping notification already sent for this order' },
        { status: 409 }
      );
    }

    if (!order.trackingNumber || !order.carrier) {
      return NextResponse.json(
        { error: 'Order is missing tracking number or carrier — cannot send notification' },
        { status: 400 }
      );
    }

    const customerName = order.shippingName || 'Customer';
    const deliveredDateForEmail = order.deliveredAt
      ? order.deliveredAt.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : 'your package is still in transit — track it below';

    const couponCode = await createApologyCoupon(prisma, {
      customerName,
      orderNumber: order.orderNumber,
    });

    const result = await sendShippingApologyEmail({
      to: order.email,
      orderNumber: order.orderNumber,
      customerName,
      trackingNumber: order.trackingNumber,
      carrier: order.carrier,
      deliveredDate: deliveredDateForEmail,
      couponCode,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: `Failed to send email: ${result.error || 'unknown'}` },
        { status: 500 }
      );
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { shippedEmailSentAt: new Date() },
    });

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      couponCode,
    });
  } catch (error) {
    console.error('Send missed notification error:', error);
    return NextResponse.json(
      { error: 'Failed to send missed notification' },
      { status: 500 }
    );
  }
}
