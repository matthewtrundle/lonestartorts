import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Generate a unique coupon code
 * Format: THANKS-XXXXXX (6 random alphanumeric characters)
 */
function generateCouponCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excludes I, O, 0, 1 for readability
  let code = 'THANKS-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * GET /api/feedback?token=xxx
 * Validate a feedback token and return order info
 */
export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    const feedback = await prisma.customerFeedback.findUnique({
      where: { feedbackToken: token },
    });

    if (!feedback) {
      return NextResponse.json(
        { error: 'Invalid or expired feedback link' },
        { status: 404 }
      );
    }

    // Check if expired
    if (new Date() > feedback.expiresAt) {
      return NextResponse.json(
        { error: 'This feedback link has expired' },
        { status: 410 }
      );
    }

    // Check if already submitted
    if (feedback.rating !== null) {
      return NextResponse.json({
        alreadySubmitted: true,
        orderNumber: feedback.orderNumber,
        rating: feedback.rating,
        couponCode: feedback.couponCode,
      });
    }

    return NextResponse.json({
      valid: true,
      orderNumber: feedback.orderNumber,
      customerName: feedback.customerName,
    });
  } catch (error) {
    console.error('Error validating feedback token:', error);
    return NextResponse.json(
      { error: 'Failed to validate feedback token' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/feedback
 * Submit feedback rating and generate coupon
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, rating } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Validate rating
    const ratingNum = parseInt(rating, 10);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const feedback = await prisma.customerFeedback.findUnique({
      where: { feedbackToken: token },
    });

    if (!feedback) {
      return NextResponse.json(
        { error: 'Invalid or expired feedback link' },
        { status: 404 }
      );
    }

    // Check if expired
    if (new Date() > feedback.expiresAt) {
      return NextResponse.json(
        { error: 'This feedback link has expired' },
        { status: 410 }
      );
    }

    // Check if already submitted
    if (feedback.rating !== null) {
      return NextResponse.json({
        alreadySubmitted: true,
        message: 'Feedback already submitted for this order',
        couponCode: feedback.couponCode,
      });
    }

    // Generate unique coupon code with retry for collisions
    let couponCode = generateCouponCode();
    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
      const existing = await prisma.customerFeedback.findUnique({
        where: { couponCode },
      });
      if (!existing) break;
      couponCode = generateCouponCode();
      attempts++;
    }

    if (attempts >= maxAttempts) {
      console.error('Failed to generate unique coupon code after max attempts');
      return NextResponse.json(
        { error: 'Failed to generate coupon code. Please try again.' },
        { status: 500 }
      );
    }

    // Update the feedback record
    const updatedFeedback = await prisma.customerFeedback.update({
      where: { id: feedback.id },
      data: {
        rating: ratingNum,
        submittedAt: new Date(),
        couponCode,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your feedback!',
      couponCode,
      rating: ratingNum,
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}
