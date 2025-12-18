import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createStripeCustomer } from '@/lib/wholesale/stripe';
import { PricingTier, PaymentTerms } from '@prisma/client';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { pricingTier, paymentTerms, discountPercent, notes } = body;

    // Get the inquiry
    const inquiry = await prisma.wholesaleInquiry.findUnique({
      where: { id },
    });

    if (!inquiry) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    if (inquiry.status === 'APPROVED') {
      return NextResponse.json(
        { error: 'Inquiry already approved' },
        { status: 400 }
      );
    }

    // Check if a client already exists with this email
    const existingClient = await prisma.wholesaleClient.findUnique({
      where: { email: inquiry.email },
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
        businessName: inquiry.businessName,
        email: inquiry.email,
        phone: inquiry.phone,
      });
    } catch (stripeError) {
      console.error('Failed to create Stripe customer:', stripeError);
      // Continue without Stripe customer ID - can be added later
    }

    // Create the wholesale client
    const client = await prisma.wholesaleClient.create({
      data: {
        businessName: inquiry.businessName,
        contactName: inquiry.contactName,
        email: inquiry.email,
        phone: inquiry.phone,
        businessType: inquiry.businessType,
        stripeCustomerId,
        pricingTier: (pricingTier as PricingTier) || 'STANDARD',
        paymentTerms: (paymentTerms as PaymentTerms) || 'DUE_ON_RECEIPT',
        discountPercent: pricingTier === 'CUSTOM' ? (discountPercent || 0) : 0,
        status: 'ACTIVE',
        approvedAt: new Date(),
        inquiryId: inquiry.id,
      },
    });

    // Update inquiry status
    await prisma.wholesaleInquiry.update({
      where: { id },
      data: {
        status: 'APPROVED',
        reviewedAt: new Date(),
        notes: notes || inquiry.notes,
      },
    });

    // TODO: Send welcome email to client

    return NextResponse.json({
      success: true,
      clientId: client.id,
      client,
    });
  } catch (error) {
    console.error('Error approving inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to approve inquiry' },
      { status: 500 }
    );
  }
}
