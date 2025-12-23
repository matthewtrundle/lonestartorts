import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendFeedbackRequestEmail } from '@/lib/email';
import { randomUUID } from 'crypto';

/**
 * POST /api/admin/orders/:id/feedback
 * Send a feedback request email to the customer
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;

    // Get the order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        CustomerFeedback: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Check if order has been shipped
    if (order.status !== 'SHIPPED' && order.status !== 'DELIVERED') {
      return NextResponse.json(
        { error: 'Order must be shipped or delivered to request feedback' },
        { status: 400 }
      );
    }

    // Check if feedback request was already sent
    if (order.CustomerFeedback) {
      return NextResponse.json(
        { error: 'Feedback request already sent for this order' },
        { status: 400 }
      );
    }

    // Generate unique token for feedback URL
    const feedbackToken = randomUUID();

    // Set expiration to 30 days from now
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    // Create the feedback record
    const feedback = await prisma.customerFeedback.create({
      data: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        email: order.email,
        customerName: order.shippingName,
        feedbackToken,
        emailSentAt: new Date(),
        expiresAt,
      },
    });

    // Send the feedback request email
    const emailResult = await sendFeedbackRequestEmail({
      to: order.email,
      customerName: order.shippingName || 'Customer',
      orderNumber: order.orderNumber,
      feedbackToken,
    });

    if (!emailResult.success) {
      // Delete the feedback record if email failed
      await prisma.customerFeedback.delete({
        where: { id: feedback.id },
      });
      return NextResponse.json(
        { error: 'Failed to send feedback email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Feedback request email sent successfully',
      feedbackId: feedback.id,
    });
  } catch (error) {
    console.error('Error sending feedback request:', error);
    return NextResponse.json(
      { error: 'Failed to send feedback request' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/orders/:id/feedback
 * Get feedback status for an order
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;

    const feedback = await prisma.customerFeedback.findUnique({
      where: { orderId },
    });

    if (!feedback) {
      return NextResponse.json({ hasFeedback: false });
    }

    return NextResponse.json({
      hasFeedback: true,
      feedback: {
        id: feedback.id,
        emailSentAt: feedback.emailSentAt,
        rating: feedback.rating,
        submittedAt: feedback.submittedAt,
        couponCode: feedback.couponCode,
        couponUsed: feedback.couponUsed,
        expiresAt: feedback.expiresAt,
      },
    });
  } catch (error) {
    console.error('Error getting feedback status:', error);
    return NextResponse.json(
      { error: 'Failed to get feedback status' },
      { status: 500 }
    );
  }
}
