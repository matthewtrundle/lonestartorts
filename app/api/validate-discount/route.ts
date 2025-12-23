import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Valid discount codes for free shipping on first order
// Each code has a custom success message
const DISCOUNT_CODES: Record<string, string> = {
  'FREESHIP': 'Free shipping unlocked!',
  'WELCOME': 'Welcome to the tortilla family!',
  'FIRSTORDER': 'First order = free shipping!',
  'GUYSGUYSGUYS': 'Guys rule! Free shipping for you!',
  'XMAS2025': 'Have a wonderful holiday season!',
};

export async function POST(req: NextRequest) {
  try {
    const { email, discountCode } = await req.json();

    // Validate inputs
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { valid: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!discountCode || typeof discountCode !== 'string') {
      return NextResponse.json(
        { valid: false, error: 'Discount code is required' },
        { status: 400 }
      );
    }

    const normalizedCode = discountCode.trim().toUpperCase();
    const normalizedEmail = email.trim().toLowerCase();

    // First, check if it's a feedback coupon (THANKS-XXXXXX format)
    if (normalizedCode.startsWith('THANKS-')) {
      const feedbackCoupon = await prisma.customerFeedback.findUnique({
        where: { couponCode: normalizedCode },
      });

      if (feedbackCoupon) {
        // Check if coupon is already used
        if (feedbackCoupon.couponUsed) {
          return NextResponse.json(
            { valid: false, error: 'This discount code has already been used' },
            { status: 200 }
          );
        }

        // Check if coupon is expired
        if (new Date() > feedbackCoupon.expiresAt) {
          return NextResponse.json(
            { valid: false, error: 'This discount code has expired' },
            { status: 200 }
          );
        }

        // Feedback coupon is valid - 10% off, no first-order restriction
        return NextResponse.json({
          valid: true,
          message: 'Thank you discount applied! 10% off your order.',
          discount: {
            type: 'percentage',
            amount: 10,
            code: normalizedCode,
          },
        });
      }
    }

    // Check if it's a first-order free shipping code
    const successMessage = DISCOUNT_CODES[normalizedCode];

    if (!successMessage) {
      return NextResponse.json(
        { valid: false, error: 'Invalid discount code' },
        { status: 200 }
      );
    }

    // Check if email has any previous orders (first-order codes only)
    const existingOrderCount = await prisma.order.count({
      where: { email: normalizedEmail },
    });

    if (existingOrderCount > 0) {
      return NextResponse.json(
        { valid: false, error: 'This code is only valid for first-time orders' },
        { status: 200 }
      );
    }

    // All checks passed - free shipping discount is valid
    return NextResponse.json({
      valid: true,
      message: successMessage,
      discount: {
        type: 'free_shipping',
        code: normalizedCode,
      },
    });
  } catch (error) {
    console.error('Validate discount error:', error);
    return NextResponse.json(
      { valid: false, error: 'Failed to validate discount code' },
      { status: 500 }
    );
  }
}
