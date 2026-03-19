import { NextResponse } from 'next/server';
import { getAuthenticatedCustomer } from '@/lib/customer-auth';

export async function GET() {
  const customer = await getAuthenticatedCustomer();

  if (!customer) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  return NextResponse.json({
    customer: {
      id: customer.id,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      stripeCustomerId: customer.stripeCustomerId,
      subscriptions: customer.RetailSubscription.map(sub => ({
        id: sub.id,
        name: sub.name,
        status: sub.status,
        interval: sub.interval,
        nextBillingDate: sub.nextBillingDate,
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
    },
  });
}
