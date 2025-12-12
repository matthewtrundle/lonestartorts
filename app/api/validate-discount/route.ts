import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Valid discount codes for free shipping on first order
// Can be moved to environment variable or database later
const VALID_DISCOUNT_CODES = ['FREESHIP', 'WELCOME', 'FIRSTORDER', 'GUYSGUYSGUYS', 'XMAS2025'];

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

    // Check if discount code is valid
    const normalizedCode = discountCode.trim().toUpperCase();
    if (!VALID_DISCOUNT_CODES.includes(normalizedCode)) {
      return NextResponse.json(
        { valid: false, error: 'Invalid discount code' },
        { status: 200 }
      );
    }

    // Check if email has any previous orders
    const normalizedEmail = email.trim().toLowerCase();
    const existingOrderCount = await prisma.order.count({
      where: { email: normalizedEmail },
    });

    if (existingOrderCount > 0) {
      return NextResponse.json(
        { valid: false, error: 'This code is only valid for first-time orders' },
        { status: 200 }
      );
    }

    // All checks passed - discount is valid
    return NextResponse.json({
      valid: true,
      discount: {
        type: 'free_shipping',
        description: 'Free shipping on your first order',
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
