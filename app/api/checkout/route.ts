import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getProductBySku, getShippingCost, calculateBaseShipping, FREE_SHIPPING_THRESHOLD, ShippingMethod } from '@/lib/products';
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
    const validMethods: ShippingMethod[] = ['usps', 'ups_ground', 'ups_3day', 'ups_2day', 'ups_nextday'];
    const shippingMethod: ShippingMethod = validMethods.includes(rawShippingMethod) ? rawShippingMethod : 'usps';

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid items' }, { status: 400 });
    }

    // Build full items array with productType and price for shipping calculation
    const fullItems = items.map((item: { sku: string; quantity: number }) => {
      const product = getProductBySku(item.sku);
      if (!product) {
        throw new Error(`Invalid product SKU: ${item.sku}`);
      }
      return {
        quantity: item.quantity,
        productType: product.productType,
        price: product.price,
      };
    });

    // Calculate subtotal for free shipping threshold check
    const subtotal = fullItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Calculate shipping based on items, method, and subtotal (for free shipping threshold)
    let shippingCost = getShippingCost(fullItems, shippingMethod, subtotal);
    let freeShippingApplied = false;
    let freeShippingReason = '';

    // Check if free shipping was applied via threshold
    if (shippingMethod === 'usps' && subtotal >= FREE_SHIPPING_THRESHOLD) {
      freeShippingApplied = true;
      freeShippingReason = 'threshold';
      console.log(`Free shipping applied for order $${(subtotal / 100).toFixed(2)} (threshold: $${(FREE_SHIPPING_THRESHOLD / 100).toFixed(2)})`);
    }

    // Calculate base shipping for display (what they would have paid)
    const baseShippingCost = calculateBaseShipping(fullItems);

    // Track percentage discount info
    let percentageDiscount = 0;
    let discountAmount = 0;
    let feedbackCouponCode: string | null = null;
    let spinPrizeCode: string | null = null;
    let spinPrizeType: string | null = null;

    // Validate discount code if provided (server-side re-validation)
    if (email && discountCode) {
      const normalizedCode = discountCode.trim().toUpperCase();
      const normalizedEmail = email.trim().toLowerCase();

      // Check if it's a feedback coupon (THANKS-XXXXXX format)
      if (normalizedCode.startsWith('THANKS-')) {
        const feedbackCoupon = await prisma.customerFeedback.findUnique({
          where: { couponCode: normalizedCode },
        });

        if (feedbackCoupon && !feedbackCoupon.couponUsed && new Date() <= feedbackCoupon.expiresAt) {
          // Valid feedback coupon - apply 10% off subtotal
          percentageDiscount = 10;
          discountAmount = Math.round(subtotal * 0.10); // 10% of subtotal
          feedbackCouponCode = normalizedCode;
          console.log(`10% feedback discount applied: ${normalizedCode}, saving $${(discountAmount / 100).toFixed(2)}`);
        }
      }
      // Check if code is valid first-order free shipping code
      // Only apply free shipping if not already applied via threshold
      else if (VALID_DISCOUNT_CODES.includes(normalizedCode) && !freeShippingApplied) {
        const existingOrderCount = await prisma.order.count({
          where: { email: normalizedEmail },
        });

        if (existingOrderCount === 0) {
          // Valid first-order discount - apply free shipping
          shippingCost = 0;
          freeShippingApplied = true;
          freeShippingReason = 'discount_code';
          console.log(`Free shipping applied for first order: ${normalizedEmail}`);
        }
      }
      // Check if it's a spin wheel prize code (SPIN-XXXXX format)
      else if (normalizedCode.startsWith('SPIN-')) {
        const spinEntry = await prisma.spinWheelEntry.findUnique({
          where: { code: normalizedCode },
        });

        if (spinEntry && !spinEntry.used && new Date() <= spinEntry.expiresAt) {
          // Valid spin prize - apply based on prize type
          spinPrizeCode = normalizedCode;
          spinPrizeType = spinEntry.prize;

          switch (spinEntry.prize) {
            case 'ten_percent':
              // 10% off up to $10 max (1000 cents)
              percentageDiscount = 10;
              discountAmount = Math.min(Math.round(subtotal * 0.10), 1000);
              console.log(`10% off spin prize applied: ${normalizedCode}, saving $${(discountAmount / 100).toFixed(2)}`);
              break;
            case 'free_shipping':
              // Free shipping
              if (!freeShippingApplied) {
                shippingCost = 0;
                freeShippingApplied = true;
                freeShippingReason = 'spin_prize';
                console.log(`Free shipping spin prize applied: ${normalizedCode}`);
              }
              break;
            case 'five_off':
              // $5 off
              discountAmount = 500;
              console.log(`$5 off spin prize applied: ${normalizedCode}`);
              break;
            case 'bonus_tortillas':
              // 10 bonus tortillas - $5 value applied as discount
              discountAmount = 500;
              console.log(`Bonus tortillas spin prize applied: ${normalizedCode}`);
              break;
            case 'free_sauce':
              // Free sauce - $12 value applied as discount
              discountAmount = 1200;
              console.log(`Free sauce spin prize applied: ${normalizedCode}`);
              break;
          }

          // Mark spin entry as used
          await prisma.spinWheelEntry.update({
            where: { code: normalizedCode },
            data: { used: true, usedAt: new Date() },
          });
        }
      }
    }

    // Calculate total packs for display (exclude sauce)
    const totalPacks = fullItems.filter(item => item.productType !== 'sauce').reduce((sum, item) => sum + item.quantity, 0);
    const sauceBottles = fullItems.filter(item => item.productType === 'sauce').reduce((sum, item) => sum + item.quantity, 0);

    // Create line items for Stripe with server-side validation
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item: { sku: string; quantity: number }) => {
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

    // Create a Stripe coupon for discounts (feedback or spin wheel)
    let stripeCouponId: string | undefined;
    if (discountAmount > 0 && (feedbackCouponCode || spinPrizeCode)) {
      // Determine if it's a percentage or fixed amount discount
      if (percentageDiscount > 0) {
        // Percentage discount (10% off)
        const coupon = await stripe.coupons.create({
          percent_off: percentageDiscount,
          duration: 'once',
          name: feedbackCouponCode
            ? `Feedback Discount - ${feedbackCouponCode}`
            : `Spin Prize - ${spinPrizeCode}`,
          metadata: {
            ...(feedbackCouponCode && { feedbackCouponCode }),
            ...(spinPrizeCode && { spinPrizeCode, spinPrizeType: spinPrizeType || '' }),
          },
        });
        stripeCouponId = coupon.id;
      } else {
        // Fixed amount discount ($5 off, free sauce, bonus tortillas)
        const coupon = await stripe.coupons.create({
          amount_off: discountAmount,
          currency: 'usd',
          duration: 'once',
          name: `Spin Prize - ${spinPrizeCode}`,
          metadata: {
            spinPrizeCode: spinPrizeCode || '',
            spinPrizeType: spinPrizeType || '',
          },
        });
        stripeCouponId = coupon.id;
      }
    }

    // Build shipping display name
    const getShippingDisplayName = () => {
      const methodName = shippingMethod === 'usps' ? 'USPS Priority Mail' :
        shippingMethod === 'ups_ground' ? 'UPS Ground' :
        shippingMethod === 'ups_3day' ? 'UPS 3-Day Select' :
        shippingMethod === 'ups_2day' ? 'UPS 2nd Day Air' :
        'UPS Next Day Air';
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
        const savingsText = `You saved $${(baseShippingCost / 100).toFixed(2)}`;
        if (freeShippingReason === 'threshold') {
          return baseLabel
            ? `FREE ${methodName} (${baseLabel}) - Order $80+ ${savingsText}`
            : `FREE ${methodName} - Order $80+ ${savingsText}`;
        } else {
          return baseLabel
            ? `FREE ${methodName} (${baseLabel}) - First Order Discount`
            : `FREE ${methodName} - First Order Discount`;
        }
      }
      return baseLabel ? `${methodName} (${baseLabel})` : methodName;
    };

    // Create Stripe checkout session with shipping as actual shipping rate (not a line item)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      // Enable automatic tax calculation (Stripe Tax)
      automatic_tax: {
        enabled: true,
      },
      // Apply discount coupon if created
      ...(stripeCouponId && {
        discounts: [{ coupon: stripeCouponId }],
      }),
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}`,
      metadata: {
        disclaimer: 'Independent reseller. Not affiliated with or endorsed by H-E-B®.',
        shippingMethod, // Store shipping method (usps or fedex)
        shippingCost: shippingCost.toString(), // Store for webhook reference
        baseShippingCost: baseShippingCost.toString(), // What shipping would have been
        subtotal: subtotal.toString(), // Order subtotal
        ...(freeShippingApplied && {
          freeShippingReason, // 'threshold' or 'discount_code'
          freeShippingSavings: baseShippingCost.toString(),
          ...(freeShippingReason === 'discount_code' && {
            discountCode: discountCode?.trim().toUpperCase(),
            discountEmail: email?.trim().toLowerCase(),
          }),
        }),
        // Feedback coupon info for marking as used in webhook
        ...(feedbackCouponCode && {
          feedbackCouponCode,
          feedbackDiscountAmount: discountAmount.toString(),
          feedbackDiscountPercent: percentageDiscount.toString(),
        }),
        // Spin prize info for tracking
        ...(spinPrizeCode && {
          spinPrizeCode,
          spinPrizeType: spinPrizeType || '',
          spinDiscountAmount: discountAmount.toString(),
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
                value: shippingMethod === 'usps' ? 3 :
                  shippingMethod === 'ups_ground' ? 3 :
                  shippingMethod === 'ups_3day' ? 3 :
                  shippingMethod === 'ups_2day' ? 2 : 1,
              },
              maximum: {
                unit: 'business_day',
                value: shippingMethod === 'usps' ? 5 :
                  shippingMethod === 'ups_ground' ? 5 :
                  shippingMethod === 'ups_3day' ? 3 :
                  shippingMethod === 'ups_2day' ? 2 : 1,
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