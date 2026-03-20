import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedCustomer } from '@/lib/customer-auth';

export async function GET() {
  const customer = await getAuthenticatedCustomer();
  if (!customer) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const account = await prisma.loyaltyAccount.findUnique({
      where: { customerId: customer.id },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });

    if (!account) {
      return NextResponse.json({
        balance: 0,
        lifetimeEarned: 0,
        lifetimeRedeemed: 0,
        transactions: [],
        canRedeem: false,
        nextRedemptionAt: 200,
      });
    }

    return NextResponse.json({
      balance: account.balance,
      lifetimeEarned: account.lifetimeEarned,
      lifetimeRedeemed: account.lifetimeRedeemed,
      transactions: account.transactions.map(t => ({
        id: t.id,
        type: t.type,
        points: t.points,
        description: t.description,
        createdAt: t.createdAt,
      })),
      canRedeem: account.balance >= 200,
      nextRedemptionAt: Math.max(0, 200 - account.balance),
    });
  } catch (error) {
    console.error('Error fetching loyalty data:', error);
    return NextResponse.json({ error: 'Failed to fetch loyalty data' }, { status: 500 });
  }
}
