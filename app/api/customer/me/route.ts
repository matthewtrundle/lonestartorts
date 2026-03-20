import { NextResponse } from 'next/server';
import { getAuthenticatedCustomer } from '@/lib/customer-auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const customer = await getAuthenticatedCustomer();

  if (!customer) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Fetch wholesale data if customer is a wholesale account
  let wholesaleData = null;
  if (customer.isWholesale && customer.wholesaleClientId) {
    const wholesaleClient = await prisma.wholesaleClient.findUnique({
      where: { id: customer.wholesaleClientId },
      include: {
        orders: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: { items: true },
        },
      },
    });

    if (wholesaleClient) {
      wholesaleData = {
        businessName: wholesaleClient.businessName,
        pricingTier: wholesaleClient.pricingTier,
        paymentTerms: wholesaleClient.paymentTerms,
        status: wholesaleClient.status,
        orders: wholesaleClient.orders.map(order => ({
          id: order.id,
          orderNumber: order.orderNumber,
          total: order.total,
          paymentStatus: order.paymentStatus,
          orderStatus: order.orderStatus,
          createdAt: order.createdAt,
          items: order.items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
          })),
        })),
      };
    }
  }

  // Fetch loyalty data
  let loyaltyData = null;
  try {
    const loyaltyAccount = await prisma.loyaltyAccount.findUnique({
      where: { customerId: customer.id },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });
    if (loyaltyAccount) {
      loyaltyData = {
        balance: loyaltyAccount.balance,
        lifetimeEarned: loyaltyAccount.lifetimeEarned,
        lifetimeRedeemed: loyaltyAccount.lifetimeRedeemed,
        canRedeem: loyaltyAccount.balance >= 200,
        nextRedemptionAt: Math.max(0, 200 - loyaltyAccount.balance),
        recentTransactions: loyaltyAccount.transactions.map(t => ({
          id: t.id,
          type: t.type,
          points: t.points,
          description: t.description,
          createdAt: t.createdAt,
        })),
      };
    }
  } catch (loyaltyError) {
    console.error('Failed to fetch loyalty data:', loyaltyError);
  }

  return NextResponse.json({
    customer: {
      id: customer.id,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      stripeCustomerId: customer.stripeCustomerId,
      isWholesale: customer.isWholesale,
      subscriptions: customer.RetailSubscription.map(sub => ({
        id: sub.id,
        name: sub.name,
        status: sub.status,
        interval: sub.interval,
        nextBillingDate: sub.nextBillingDate,
        preferredShippingDay: sub.preferredShippingDay,
        pausedUntil: sub.pausedUntil,
        items: sub.items,
        total: sub.total,
      })),
      recentOrders: customer.Order.map(order => ({
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        total: order.total,
        createdAt: order.createdAt,
      })),
      ...(wholesaleData && { wholesale: wholesaleData }),
      ...(loyaltyData && { loyalty: loyaltyData }),
    },
  });
}
