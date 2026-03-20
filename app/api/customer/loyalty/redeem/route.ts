import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedCustomer } from '@/lib/customer-auth';

const REDEEM_COST = 200; // points
const REDEEM_VALUE = 500; // $5.00 in cents
const REDEEM_EXPIRY_DAYS = 30;

function generateRedeemCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'LOYAL-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST() {
  const customer = await getAuthenticatedCustomer();
  if (!customer) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const account = await prisma.loyaltyAccount.findUnique({
      where: { customerId: customer.id },
    });

    if (!account || account.balance < REDEEM_COST) {
      return NextResponse.json(
        { error: `Need at least ${REDEEM_COST} points to redeem. Current balance: ${account?.balance || 0}` },
        { status: 400 }
      );
    }

    // Generate unique code
    let code = generateRedeemCode();
    let attempts = 0;
    while (attempts < 5) {
      const existing = await prisma.discountCode.findUnique({ where: { code } });
      if (!existing) break;
      code = generateRedeemCode();
      attempts++;
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REDEEM_EXPIRY_DAYS);

    // Create discount code and deduct points in a transaction
    const [discountCode] = await prisma.$transaction([
      prisma.discountCode.create({
        data: {
          code,
          name: 'Loyalty Reward - $5 Off',
          description: `Redeemed ${REDEEM_COST} loyalty points`,
          source: 'LOYALTY',
          isActive: true,
          expiresAt,
          maxUsageTotal: 1,
          maxUsagePerEmail: 1,
          rules: {
            create: {
              type: 'FIXED_AMOUNT',
              value: REDEEM_VALUE,
            },
          },
        },
      }),
      prisma.loyaltyAccount.update({
        where: { customerId: customer.id },
        data: {
          balance: { decrement: REDEEM_COST },
          lifetimeRedeemed: { increment: REDEEM_COST },
        },
      }),
      prisma.loyaltyTransaction.create({
        data: {
          loyaltyAccountId: account.id,
          type: 'REDEEM',
          points: -REDEEM_COST,
          description: `Redeemed for $5 discount code: ${code}`,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      code: discountCode.code,
      value: REDEEM_VALUE,
      expiresAt: discountCode.expiresAt,
      remainingBalance: account.balance - REDEEM_COST,
    });
  } catch (error) {
    console.error('Error redeeming loyalty points:', error);
    return NextResponse.json({ error: 'Failed to redeem points' }, { status: 500 });
  }
}
