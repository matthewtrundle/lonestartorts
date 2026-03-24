import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { prisma } from '@/lib/prisma';
import { hashPassword, setCustomerAuthCookie } from '@/lib/customer-auth';
import { sendWholesaleWelcomeEmail } from '@/lib/email';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as Stripe.LatestApiVersion,
});

export async function POST(request: NextRequest) {
  try {
    const { email: rawEmail, password, firstName, lastName, isWholesale, businessName, businessType } = await request.json();

    if (!rawEmail || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const email = rawEmail.toLowerCase().trim();

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    // Check if customer exists
    const existing = await prisma.customer.findUnique({ where: { email } });

    if (existing?.passwordHash) {
      return NextResponse.json({ error: 'An account with this email already exists. Please log in.' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);

    // Validate wholesale fields
    if (isWholesale && !businessName) {
      return NextResponse.json({ error: 'Business name is required for wholesale accounts' }, { status: 400 });
    }

    // Reuse existing Stripe customer or create new one
    let stripeCustomerId = existing?.stripeCustomerId;
    if (!stripeCustomerId) {
      const stripeCustomer = await stripe.customers.create({
        email,
        name: [firstName, lastName].filter(Boolean).join(' ') || undefined,
        metadata: { type: isWholesale ? 'wholesale' : 'retail_subscription' },
      });
      stripeCustomerId = stripeCustomer.id;
    }

    let customer;
    let wholesaleClient = null;
    try {
      if (existing) {
        // Upgrade guest account to full account
        customer = await prisma.customer.update({
          where: { email },
          data: {
            passwordHash,
            firstName: firstName || existing.firstName,
            lastName: lastName || existing.lastName,
            stripeCustomerId,
            signupSource: isWholesale ? 'wholesale' : (existing.signupSource === 'checkout' ? 'checkout_upgraded' : 'subscription'),
            isWholesale: isWholesale || existing.isWholesale || false,
            lastLoginAt: new Date(),
            updatedAt: new Date(),
          },
        });
      } else {
        customer = await prisma.customer.create({
          data: {
            id: randomUUID(),
            clerkUserId: `sub_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            email,
            passwordHash,
            firstName: firstName || null,
            lastName: lastName || null,
            stripeCustomerId,
            signupSource: isWholesale ? 'wholesale' : 'subscription',
            isWholesale: isWholesale || false,
            lastLoginAt: new Date(),
            updatedAt: new Date(),
          },
        });
      }

      // Create linked WholesaleClient if wholesale signup
      if (isWholesale && !customer.wholesaleClientId) {
        wholesaleClient = await prisma.wholesaleClient.create({
          data: {
            businessName: businessName,
            contactName: [firstName, lastName].filter(Boolean).join(' ') || businessName,
            email,
            businessType: businessType || 'Other',
            stripeCustomerId,
            status: 'ACTIVE',
            pricingTier: 'STANDARD',
            paymentTerms: 'DUE_ON_RECEIPT',
          },
        });

        // Link customer to wholesale client
        customer = await prisma.customer.update({
          where: { id: customer.id },
          data: { wholesaleClientId: wholesaleClient.id },
        });

        // Send wholesale welcome email (non-blocking)
        sendWholesaleWelcomeEmail({
          to: email,
          contactName: [firstName, lastName].filter(Boolean).join(' ') || businessName,
          businessName,
        }).catch(err => console.error('Failed to send wholesale welcome email:', err));
      }
    } catch (dbError) {
      // Clean up Stripe customer if DB write failed and we created a new one
      if (!existing?.stripeCustomerId && stripeCustomerId) {
        try { await stripe.customers.del(stripeCustomerId); } catch { /* best effort */ }
      }
      throw dbError;
    }

    await setCustomerAuthCookie(customer.id, customer.email);

    return NextResponse.json({
      customer: {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        isWholesale: customer.isWholesale,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
