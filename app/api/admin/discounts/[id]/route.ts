import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import {
  getDiscountCodeById,
  updateDiscountCode,
  deleteDiscountCode,
  getDiscountUsageStats,
} from '@/lib/discount-engine';
import { RuleType } from '@prisma/client';

// GET - Get a single discount code with usage stats
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check authentication
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const discountCode = await getDiscountCodeById(id);

    if (!discountCode) {
      return NextResponse.json({ error: 'Discount code not found' }, { status: 404 });
    }

    // Get usage statistics
    const usageStats = await getDiscountUsageStats(id);

    return NextResponse.json({
      discountCode,
      usageStats,
    });
  } catch (error) {
    console.error('Error fetching discount code:', error);
    return NextResponse.json({ error: 'Failed to fetch discount code' }, { status: 500 });
  }
}

// PUT - Update a discount code
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check authentication
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();

    // Check if discount code exists
    const existingCode = await getDiscountCodeById(id);
    if (!existingCode) {
      return NextResponse.json({ error: 'Discount code not found' }, { status: 404 });
    }

    // Validate rules if provided
    if (body.rules && Array.isArray(body.rules)) {
      for (const rule of body.rules) {
        if (!rule.type || !['PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SHIPPING', 'BOGO'].includes(rule.type)) {
          return NextResponse.json({ error: 'Invalid rule type' }, { status: 400 });
        }

        if (rule.type === 'PERCENTAGE' && rule.value !== undefined && (rule.value < 1 || rule.value > 100)) {
          return NextResponse.json({ error: 'Percentage must be between 1 and 100' }, { status: 400 });
        }

        if (rule.type === 'FIXED_AMOUNT' && rule.value !== undefined && rule.value < 1) {
          return NextResponse.json({ error: 'Fixed amount must be greater than 0' }, { status: 400 });
        }

        if (rule.type === 'BOGO') {
          if (!rule.buyProductSku || !rule.buyQuantity || !rule.getProductSku || !rule.getQuantity) {
            return NextResponse.json({ error: 'BOGO rules require buyProductSku, buyQuantity, getProductSku, and getQuantity' }, { status: 400 });
          }
        }
      }
    }

    // Update the discount code
    const updatedCode = await updateDiscountCode(id, {
      code: body.code,
      name: body.name,
      description: body.description,
      isActive: body.isActive,
      startsAt: body.startsAt ? new Date(body.startsAt) : body.startsAt === null ? null : undefined,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : body.expiresAt === null ? null : undefined,
      minOrderAmount: body.minOrderAmount,
      maxDiscountAmount: body.maxDiscountAmount,
      maxUsageTotal: body.maxUsageTotal,
      maxUsagePerEmail: body.maxUsagePerEmail,
      firstOrderOnly: body.firstOrderOnly,
      stackable: body.stackable,
      priority: body.priority,
      rules: body.rules?.map((rule: {
        type: string;
        value?: number;
        maxDiscount?: number;
        buyProductSku?: string;
        buyQuantity?: number;
        getProductSku?: string;
        getQuantity?: number;
        getDiscountPct?: number;
        minOrderAmount?: number;
        priority?: number;
      }) => ({
        type: rule.type as RuleType,
        value: rule.value,
        maxDiscount: rule.maxDiscount,
        buyProductSku: rule.buyProductSku,
        buyQuantity: rule.buyQuantity,
        getProductSku: rule.getProductSku,
        getQuantity: rule.getQuantity,
        getDiscountPct: rule.getDiscountPct ?? (rule.type === 'BOGO' ? 100 : undefined),
        minOrderAmount: rule.minOrderAmount,
        priority: rule.priority,
      })),
      restrictions: body.restrictions?.map((restriction: {
        type: string;
        value: string;
        include?: boolean;
      }) => ({
        type: restriction.type as 'PRODUCT_SKU' | 'EMAIL_DOMAIN',
        value: restriction.value,
        include: restriction.include ?? true,
      })),
    });

    return NextResponse.json({
      success: true,
      discountCode: updatedCode,
    });
  } catch (error) {
    console.error('Error updating discount code:', error);
    return NextResponse.json({ error: 'Failed to update discount code' }, { status: 500 });
  }
}

// DELETE - Delete a discount code
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check authentication
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;

    // Check if discount code exists
    const existingCode = await getDiscountCodeById(id);
    if (!existingCode) {
      return NextResponse.json({ error: 'Discount code not found' }, { status: 404 });
    }

    // Delete the discount code
    await deleteDiscountCode(id);

    return NextResponse.json({
      success: true,
      message: 'Discount code deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting discount code:', error);
    return NextResponse.json({ error: 'Failed to delete discount code' }, { status: 500 });
  }
}
