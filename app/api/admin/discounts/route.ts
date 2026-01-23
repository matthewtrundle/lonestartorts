import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';
import { createDiscountCode, listDiscountCodes, getDiscountUsageStats } from '@/lib/discount-engine';
import { RuleType, DiscountSource } from '@prisma/client';

// Static discount codes with their details (legacy - for display only)
const STATIC_CODES = [
  { code: 'FREESHIP', type: 'free_shipping', description: 'Free shipping (first order only)', restriction: 'first_order' },
  { code: 'WELCOME', type: 'free_shipping', description: 'Welcome - Free shipping (first order)', restriction: 'first_order' },
  { code: 'FIRSTORDER', type: 'free_shipping', description: 'First order - Free shipping', restriction: 'first_order' },
  { code: 'GUYSGUYSGUYS', type: 'free_shipping', description: 'Guys rule - Free shipping (first order)', restriction: 'first_order' },
  { code: 'XMAS2025', type: 'free_shipping', description: 'Holiday 2025 - Free shipping (first order)', restriction: 'first_order' },
  { code: 'HOOKEM', type: 'percentage', amount: 10, description: 'UT Alumni - 10% off', restriction: 'none' },
  { code: 'UTALUMNI', type: 'percentage', amount: 10, description: 'UT Alumni - 10% off', restriction: 'none' },
];

// Spin wheel prize mappings
const SPIN_PRIZE_DETAILS: Record<string, { type: string; description: string; value?: number }> = {
  'five_off': { type: 'fixed', description: '$5 off', value: 500 },
  'ten_percent': { type: 'percentage', description: '10% off (max $10)', value: 10 },
  'free_shipping': { type: 'free_shipping', description: 'Free shipping' },
  'free_sauce': { type: 'product', description: 'Free sauce ($12 value)', value: 1200 },
  'bonus_tortillas': { type: 'bonus', description: '10 bonus tortillas ($5 value)', value: 500 },
  'jackpot': { type: 'percentage', description: 'Jackpot - 25% off', value: 25 },
};

export async function GET(req: NextRequest) {
  // Check authentication
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get all spin wheel entries
    const spinEntries = await prisma.spinWheelEntry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100, // Limit to recent 100
    });

    // Get all feedback coupons
    const feedbackCoupons = await prisma.customerFeedback.findMany({
      where: { couponCode: { not: null } },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    // Get drip campaign codes
    const dripCodes = await prisma.dripEmailLog.findMany({
      where: { discountCode: { not: null } },
      orderBy: { sentAt: 'desc' },
      take: 100,
    });

    // Format spin codes
    const spinCodes = spinEntries.map(entry => ({
      code: entry.code,
      type: SPIN_PRIZE_DETAILS[entry.prize]?.type || 'unknown',
      description: SPIN_PRIZE_DETAILS[entry.prize]?.description || entry.prize,
      value: SPIN_PRIZE_DETAILS[entry.prize]?.value,
      email: entry.email,
      used: entry.used,
      usedAt: entry.usedAt,
      expiresAt: entry.expiresAt,
      createdAt: entry.createdAt,
      expired: new Date() > entry.expiresAt,
    }));

    // Format feedback codes
    const formattedFeedbackCodes = feedbackCoupons.map(fb => ({
      code: fb.couponCode!,
      type: 'percentage',
      description: 'Thank you - 10% off',
      value: 10,
      email: fb.email,
      orderNumber: fb.orderNumber,
      used: fb.couponUsed,
      usedAt: fb.couponUsedAt,
      expiresAt: fb.expiresAt,
      createdAt: fb.createdAt,
      expired: new Date() > fb.expiresAt,
    }));

    // Format drip codes
    const formattedDripCodes = dripCodes.map(drip => {
      const parts = drip.discountCode!.split('-');
      const discountType = parts[1];
      let type = 'unknown';
      let description = 'Drip campaign';
      let value: number | undefined;

      if (discountType === '10OFF') {
        type = 'percentage';
        description = 'Drip - 10% off';
        value = 10;
      } else if (discountType === '5OFF') {
        type = 'fixed';
        description = 'Drip - $5 off';
        value = 500;
      } else if (discountType === 'FREESHIP') {
        type = 'free_shipping';
        description = 'Drip - Free shipping';
      }

      return {
        code: drip.discountCode!,
        type,
        description,
        value,
        emailNumber: drip.emailNumber,
        sentAt: drip.sentAt,
        campaignId: drip.dripCampaignId,
      };
    });

    // Calculate summary stats
    const spinUsed = spinCodes.filter(c => c.used).length;
    const feedbackUsed = formattedFeedbackCodes.filter(c => c.used).length;
    const totalGenerated = spinCodes.length + formattedFeedbackCodes.length + formattedDripCodes.length;
    const totalUsed = spinUsed + feedbackUsed;

    // Group spin codes by prize type for stats
    const spinByType: Record<string, { total: number; used: number }> = {};
    spinCodes.forEach(code => {
      const prize = code.description;
      if (!spinByType[prize]) {
        spinByType[prize] = { total: 0, used: 0 };
      }
      spinByType[prize].total++;
      if (code.used) spinByType[prize].used++;
    });

    // Get admin-created discount codes from new system
    const { codes: adminCodes } = await listDiscountCodes({
      source: 'ADMIN' as DiscountSource,
      includeExpired: true,
      limit: 100,
    });

    // Format admin codes for response
    const formattedAdminCodes = adminCodes.map(code => {
      // Determine discount type and value from rules
      const primaryRule = code.rules[0];
      let type = 'unknown';
      let value: number | undefined;
      let description = code.description || code.name;

      if (primaryRule) {
        switch (primaryRule.type) {
          case 'PERCENTAGE':
            type = 'percentage';
            value = primaryRule.value || undefined;
            description = `${primaryRule.value}% off`;
            if (primaryRule.maxDiscount) {
              description += ` (max $${(primaryRule.maxDiscount / 100).toFixed(2)})`;
            }
            break;
          case 'FIXED_AMOUNT':
            type = 'fixed';
            value = primaryRule.value || undefined;
            description = `$${((primaryRule.value || 0) / 100).toFixed(2)} off`;
            break;
          case 'FREE_SHIPPING':
            type = 'free_shipping';
            description = 'Free shipping';
            break;
          case 'BOGO':
            type = 'bogo';
            description = `Buy ${primaryRule.buyQuantity} ${primaryRule.buyProductSku}, get ${primaryRule.getQuantity} ${primaryRule.getProductSku}`;
            if (primaryRule.getDiscountPct === 100) {
              description += ' free';
            } else {
              description += ` at ${primaryRule.getDiscountPct}% off`;
            }
            break;
        }
      }

      // Check if code has tiered rules
      const hasTiers = code.rules.filter(r => r.type === 'PERCENTAGE' && r.minOrderAmount).length > 1;
      if (hasTiers) {
        type = 'tiered';
        description = code.rules
          .filter(r => r.type === 'PERCENTAGE')
          .sort((a, b) => (a.minOrderAmount || 0) - (b.minOrderAmount || 0))
          .map(r => `${r.value}% off $${((r.minOrderAmount || 0) / 100).toFixed(0)}+`)
          .join(', ');
      }

      return {
        id: code.id,
        code: code.code,
        name: code.name,
        type,
        value,
        description,
        isActive: code.isActive,
        startsAt: code.startsAt,
        expiresAt: code.expiresAt,
        minOrderAmount: code.minOrderAmount,
        maxDiscountAmount: code.maxDiscountAmount,
        maxUsageTotal: code.maxUsageTotal,
        maxUsagePerEmail: code.maxUsagePerEmail,
        currentUsageCount: code.currentUsageCount,
        firstOrderOnly: code.firstOrderOnly,
        stackable: code.stackable,
        createdAt: code.createdAt,
        expired: code.expiresAt ? new Date() > code.expiresAt : false,
        rules: code.rules,
        restrictions: code.restrictions,
      };
    });

    return NextResponse.json({
      staticCodes: STATIC_CODES,
      adminCodes: formattedAdminCodes,
      spinCodes,
      feedbackCodes: formattedFeedbackCodes,
      dripCodes: formattedDripCodes,
      summary: {
        totalStaticCodes: STATIC_CODES.length,
        totalAdminCodes: formattedAdminCodes.length,
        totalGeneratedCodes: totalGenerated,
        totalUsed,
        usageRate: totalGenerated > 0 ? ((totalUsed / totalGenerated) * 100).toFixed(1) : '0',
        spinStats: {
          total: spinCodes.length,
          used: spinUsed,
          expired: spinCodes.filter(c => c.expired && !c.used).length,
          byType: spinByType,
        },
        feedbackStats: {
          total: formattedFeedbackCodes.length,
          used: feedbackUsed,
          expired: formattedFeedbackCodes.filter(c => c.expired && !c.used).length,
        },
        dripStats: {
          total: formattedDripCodes.length,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching discounts:', error);
    return NextResponse.json({ error: 'Failed to fetch discounts' }, { status: 500 });
  }
}

// POST - Create a new discount code
export async function POST(req: NextRequest) {
  // Check authentication
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Validate required fields
    if (!body.code || typeof body.code !== 'string') {
      return NextResponse.json({ error: 'Discount code is required' }, { status: 400 });
    }

    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json({ error: 'Discount name is required' }, { status: 400 });
    }

    // Check if code already exists
    const existingCode = await prisma.discountCode.findUnique({
      where: { code: body.code.toUpperCase() },
    });

    if (existingCode) {
      return NextResponse.json({ error: 'A discount code with this code already exists' }, { status: 400 });
    }

    // Validate rules if provided
    if (body.rules && Array.isArray(body.rules)) {
      for (const rule of body.rules) {
        if (!rule.type || !['PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SHIPPING', 'BOGO'].includes(rule.type)) {
          return NextResponse.json({ error: 'Invalid rule type' }, { status: 400 });
        }

        if (rule.type === 'PERCENTAGE' && (!rule.value || rule.value < 1 || rule.value > 100)) {
          return NextResponse.json({ error: 'Percentage must be between 1 and 100' }, { status: 400 });
        }

        if (rule.type === 'FIXED_AMOUNT' && (!rule.value || rule.value < 1)) {
          return NextResponse.json({ error: 'Fixed amount must be greater than 0' }, { status: 400 });
        }

        if (rule.type === 'BOGO') {
          if (!rule.buyProductSku || !rule.buyQuantity || !rule.getProductSku || !rule.getQuantity) {
            return NextResponse.json({ error: 'BOGO rules require buyProductSku, buyQuantity, getProductSku, and getQuantity' }, { status: 400 });
          }
        }
      }
    }

    // Create the discount code
    const discountCode = await createDiscountCode({
      code: body.code,
      name: body.name,
      description: body.description,
      source: 'ADMIN' as DiscountSource,
      isActive: body.isActive ?? true,
      startsAt: body.startsAt ? new Date(body.startsAt) : null,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
      minOrderAmount: body.minOrderAmount,
      maxDiscountAmount: body.maxDiscountAmount,
      maxUsageTotal: body.maxUsageTotal,
      maxUsagePerEmail: body.maxUsagePerEmail ?? 1,
      firstOrderOnly: body.firstOrderOnly ?? false,
      stackable: body.stackable ?? false,
      priority: body.priority ?? 0,
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
      discountCode,
    });
  } catch (error) {
    console.error('Error creating discount code:', error);
    return NextResponse.json({ error: 'Failed to create discount code' }, { status: 500 });
  }
}
