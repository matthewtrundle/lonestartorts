import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? new Stripe(stripeKey, {
  apiVersion: '2025-02-24.acacia',
}) : null;

// Product catalog matching shared spec
const productCatalog = {
  'TTC-MT-CORN-SS': {
    name: 'Mi Tienda-style Corn Tortillas (Shelf-Stable)',
    price: 499, // Price in cents
    description: 'Authentic Texas corn tortillas with that perfect texture',
  },
  'TTC-BUTTER-FLOUR': {
    name: 'Butter Flour Tortillas (Family Pack)',
    price: 599, // Price in cents
    description: 'Soft, buttery flour tortillas perfect for the whole family',
  },
};

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      console.warn('Stripe not configured - checkout disabled');
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 });
    }

    const { items } = await req.json();

    // Create line items for Stripe
    const lineItems = items.map((item: { sku: string; quantity: number }) => {
      const product = productCatalog[item.sku as keyof typeof productCatalog];
      if (!product) {
        throw new Error(`Invalid product SKU: ${item.sku}`);
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description,
            metadata: {
              sku: item.sku,
            },
          },
          unit_amount: product.price,
        },
        quantity: item.quantity,
      };
    });

    // Add shipping as a line item
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Standard Shipping (2-3 days)',
          description: 'Fast shipping to anywhere in the US',
        },
        unit_amount: 799, // $7.99 shipping
      },
      quantity: 1,
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}`,
      metadata: {
        disclaimer: 'Independent reseller. Not affiliated with or endorsed by H-E-B®.',
      },
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'usd',
            },
            display_name: 'Shipping included in price',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 2,
              },
              maximum: {
                unit: 'business_day',
                value: 3,
              },
            },
          },
        },
      ],
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Unable to create checkout session' },
      { status: 500 }
    );
  }
}