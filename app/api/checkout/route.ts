import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getProductBySku, getShippingCost, ShippingMethod } from '@/lib/products';
import { prisma } from '@/lib/prisma';

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? new Stripe(stripeKey, {
  apiVersion: '2025-02-24.acacia',
}) : null;

// Valid discount codes for free shipping on first order
const VALID_DISCOUNT_CODES = ['FREESHIP', 'WELCOME', 'FIRSTORDER', 'GUYSGUYSGUYS', 'XMAS2025'] as const;

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      console.warn('Stripe not configured - checkout disabled');
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 });
    }

    const { items, shippingMethod: rawShippingMethod, email, discountCode } = await req.json();

    // Validate and default shipping method
    const shippingMethod: ShippingMethod = rawShippingMethod === 'fedex' ? 'fedex' : 'usps';

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

    // Calculate shipping based on items and selected method
    let shippingCost = getShippingCost(fullItems, shippingMethod);
    let freeShippingApplied = false;

    // Validate discount code if provided (server-side re-validation)
    if (email && discountCode) {
      const normalizedCode = discountCode.trim().toUpperCase();
      const normalizedEmail = email.trim().toLowerCase();

      // Check if code is valid and email has no previous orders
      if (VALID_DISCOUNT_CODES.includes(normalizedCode)) {
        const existingOrderCount = await prisma.order.count({
          where: { email: normalizedEmail },
        });

        if (existingOrderCount === 0) {
          // Valid first-order discount - apply free shipping
          shippingCost = 0;
          freeShippingApplied = true;
          console.log(`Free shipping applied for first order: ${normalizedEmail}`);
        }
      }
    }

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

    // Build shipping display name
    const getShippingDisplayName = () => {
      const methodName = shippingMethod === 'usps' ? 'USPS Priority Mail' : 'FedEx 2nd Day Air';
      const baseLabel = (() => {
        if (totalPacks > 0 && sauceBottles > 0) {
          return `${totalPacks} tortilla ${totalPacks === 1 ? 'pack' : 'packs'} + ${sauceBottles} sauce`;
        } else if (totalPacks > 0) {
          return `${totalPacks} ${totalPacks === 1 ? 'pack' : 'packs'}`;
        } else if (sauceBottles > 0) {
          return `sauce`;
        }
        return '';
      })();

      if (freeShippingApplied) {
        return baseLabel ? `FREE ${methodName} (${baseLabel}) - First Order Discount` : `FREE ${methodName} - First Order Discount`;
      }
      return baseLabel ? `${methodName} (${baseLabel})` : methodName;
    };

    // Create Stripe checkout session with shipping as actual shipping rate (not a line item)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}`,
      metadata: {
        disclaimer: 'Independent reseller. Not affiliated with or endorsed by H-E-B®.',
        shippingMethod, // Store shipping method (usps or fedex)
        shippingCost: shippingCost.toString(), // Store for webhook reference
        ...(freeShippingApplied && {
          discountCode: discountCode?.trim().toUpperCase(),
          discountType: 'free_shipping',
          discountEmail: email?.trim().toLowerCase(),
        }),
      },
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: shippingCost, // Actual shipping cost
              currency: 'usd',
            },
            display_name: getShippingDisplayName(),
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 2,
              },
              maximum: {
                unit: 'business_day',
                value: shippingMethod === 'usps' ? 3 : 2, // USPS: 2-3 days, FedEx: 2 days
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