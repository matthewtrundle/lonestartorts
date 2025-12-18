import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updateStripeCustomer } from '@/lib/wholesale/stripe';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const client = await prisma.wholesaleClient.findUnique({
      where: { id },
    });

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    // Get recent orders and subscriptions
    const [orders, subscriptions] = await Promise.all([
      prisma.wholesaleOrder.findMany({
        where: { clientId: id },
        orderBy: { createdAt: 'desc' },
        take: 20,
      }),
      prisma.wholesaleSubscription.findMany({
        where: { clientId: id },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return NextResponse.json({
      client,
      orders,
      subscriptions,
    });
  } catch (error) {
    console.error('Error fetching client:', error);
    return NextResponse.json(
      { error: 'Failed to fetch client' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Get existing client
    const existingClient = await prisma.wholesaleClient.findUnique({
      where: { id },
    });

    if (!existingClient) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    // Update client in database
    const client = await prisma.wholesaleClient.update({
      where: { id },
      data: {
        businessName: body.businessName,
        contactName: body.contactName,
        email: body.email,
        phone: body.phone,
        businessType: body.businessType,
        pricingTier: body.pricingTier,
        paymentTerms: body.paymentTerms,
        discountPercent: body.discountPercent,
        status: body.status,
        accountNotes: body.accountNotes,
        shippingName: body.shippingName,
        shippingAddress1: body.shippingAddress1,
        shippingAddress2: body.shippingAddress2,
        shippingCity: body.shippingCity,
        shippingState: body.shippingState,
        shippingZip: body.shippingZip,
      },
    });

    // Update Stripe customer if exists
    if (existingClient.stripeCustomerId) {
      try {
        await updateStripeCustomer(existingClient.stripeCustomerId, {
          businessName: body.businessName,
          email: body.email,
          phone: body.phone,
          billingAddress1: body.shippingAddress1,
          billingCity: body.shippingCity,
          billingState: body.shippingState,
          billingZip: body.shippingZip,
        });
      } catch (stripeError) {
        console.error('Failed to update Stripe customer:', stripeError);
      }
    }

    return NextResponse.json({ client });
  } catch (error) {
    console.error('Error updating client:', error);
    return NextResponse.json(
      { error: 'Failed to update client' },
      { status: 500 }
    );
  }
}
