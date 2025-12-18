import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createStripeCustomer } from '@/lib/wholesale/stripe';
import { PricingTier, PaymentTerms, ClientStatus } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const pricingTier = searchParams.get('pricingTier');
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '50');

    const where: Record<string, unknown> = {};
    if (status) {
      where.status = status;
    }
    if (pricingTier) {
      where.pricingTier = pricingTier;
    }

    const [clients, total] = await Promise.all([
      prisma.wholesaleClient.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * perPage,
        take: perPage,
        include: {
          _count: {
            select: {
              orders: true,
              subscriptions: true,
            },
          },
        },
      }),
      prisma.wholesaleClient.count({ where }),
    ]);

    // Calculate total revenue for each client
    const clientsWithRevenue = await Promise.all(
      clients.map(async (client) => {
        const paidOrders = await prisma.wholesaleOrder.aggregate({
          where: {
            clientId: client.id,
            paymentStatus: 'PAID',
          },
          _sum: {
            total: true,
          },
        });
        return {
          ...client,
          totalRevenue: paidOrders._sum.total || 0,
        };
      })
    );

    return NextResponse.json({
      clients: clientsWithRevenue,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      businessName,
      contactName,
      email,
      phone,
      businessType,
      pricingTier,
      paymentTerms,
      discountPercent,
      shippingAddress1,
      shippingAddress2,
      shippingCity,
      shippingState,
      shippingZip,
    } = body;

    // Validate required fields
    if (!businessName || !contactName || !email || !businessType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for existing client
    const existingClient = await prisma.wholesaleClient.findUnique({
      where: { email },
    });

    if (existingClient) {
      return NextResponse.json(
        { error: 'A client with this email already exists' },
        { status: 400 }
      );
    }

    // Create Stripe customer
    let stripeCustomerId: string | null = null;
    try {
      stripeCustomerId = await createStripeCustomer({
        businessName,
        email,
        phone,
        billingAddress1: shippingAddress1,
        billingCity: shippingCity,
        billingState: shippingState,
        billingZip: shippingZip,
      });
    } catch (stripeError) {
      console.error('Failed to create Stripe customer:', stripeError);
    }

    // Create client
    const client = await prisma.wholesaleClient.create({
      data: {
        businessName,
        contactName,
        email,
        phone: phone || null,
        businessType,
        stripeCustomerId,
        pricingTier: (pricingTier as PricingTier) || 'STANDARD',
        paymentTerms: (paymentTerms as PaymentTerms) || 'DUE_ON_RECEIPT',
        discountPercent: pricingTier === 'CUSTOM' ? (discountPercent || 0) : 0,
        status: 'ACTIVE',
        approvedAt: new Date(),
        shippingAddress1: shippingAddress1 || null,
        shippingAddress2: shippingAddress2 || null,
        shippingCity: shippingCity || null,
        shippingState: shippingState || null,
        shippingZip: shippingZip || null,
      },
    });

    return NextResponse.json({ client });
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json(
      { error: 'Failed to create client' },
      { status: 500 }
    );
  }
}
