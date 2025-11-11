import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getProductBySku, calculateShipping } from '@/lib/products';

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? new Stripe(stripeKey, {
  apiVersion: '2025-02-24.acacia',
}) : null;

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      console.warn('Stripe not configured - checkout disabled');
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 });
    }

    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid items' }, { status: 400 });
    }

    // Build full items array with productType for shipping calculation
    const fullItems = items.map((item: { sku: string; quantity: number }) => {
      const product = getProductBySku(item.sku);
      if (!product) {
        throw new Error(`Invalid product SKU: ${item.sku}`);
      }
      return {
        quantity: item.quantity,
        productType: product.productType,
      };
    });

    // Calculate shipping based on items (handles sauce + tortilla logic)
    const shippingCost = calculateShipping(fullItems);

    // Calculate total packs for display (exclude sauce)
    const totalPacks = fullItems.filter(item => item.productType !== 'sauce').reduce((sum, item) => sum + item.quantity, 0);
    const sauceBottles = fullItems.filter(item => item.productType === 'sauce').reduce((sum, item) => sum + item.quantity, 0);

    // Create line items for Stripe with server-side validation
    const lineItems = items.map((item: { sku: string; quantity: number }) => {
      const product = getProductBySku(item.sku);
      if (!product) {
        throw new Error(`Invalid product SKU: ${item.sku}`);
      }

      // Validate quantity
      if (!item.quantity || item.quantity < 1 || item.quantity > 99) {
        throw new Error(`Invalid quantity for ${item.sku}`);
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

    // Add shipping as a line item (smart shipping based on items)
    const getShippingDisplayName = () => {
      if (totalPacks > 0 && sauceBottles > 0) {
        return `Standard Shipping (${totalPacks} tortilla ${totalPacks === 1 ? 'pack' : 'packs'} + ${sauceBottles} sauce, 2-3 days)`;
      } else if (totalPacks > 0) {
        return `Standard Shipping (${totalPacks} ${totalPacks === 1 ? 'pack' : 'packs'}, 2-3 days)`;
      } else if (sauceBottles > 0) {
        return `Standard Shipping (sauce, 2-3 days)`;
      }
      return 'Standard Shipping (2-3 days)';
    };

    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: getShippingDisplayName(),
          description: 'Fast shipping to anywhere in the US',
          metadata: {
            sku: 'SHIPPING',
          },
        },
        unit_amount: shippingCost,
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