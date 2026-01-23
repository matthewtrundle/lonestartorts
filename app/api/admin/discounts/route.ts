import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

// Static discount codes with their details
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

    return NextResponse.json({
      staticCodes: STATIC_CODES,
      spinCodes,
      feedbackCodes: formattedFeedbackCodes,
      dripCodes: formattedDripCodes,
      summary: {
        totalStaticCodes: STATIC_CODES.length,
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
