import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedCustomer } from '@/lib/customer-auth';
import { createCustomerPortalSession } from '@/lib/subscription/stripe';

export async function POST(request: NextRequest) {
  try {
    const customer = await getAuthenticatedCustomer();
    if (!customer) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    if (!customer.stripeCustomerId) {
      return NextResponse.json({ error: 'No payment profile found' }, { status: 400 });
    }

    const origin = request.headers.get('origin') || 'https://lonestartortillas.com';
    const session = await createCustomerPortalSession(
      customer.stripeCustomerId,
      `${origin}/account`
    );

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Portal error:', error);
    return NextResponse.json({ error: 'Failed to create portal session' }, { status: 500 });
  }
}
