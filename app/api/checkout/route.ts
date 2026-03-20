import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getProductBySku, getWholesaleProductBySku, isWholesaleProduct, calculateShipping, calculateBaseShipping, FREE_SHIPPING_THRESHOLD, MINIMUM_ORDER_AMOUNT } from '@/lib/products';

// Texas sales tax rate
const TAX_RATE = 0.0825; // 8.25%
import { prisma } from '@/lib/prisma';
import { validateDiscount, includesFreeShipping, ApplicableDiscount, AppliedRule } from '@/lib/discount-engine';
import { getNextShipDate, getShipDateDisplay, formatShipDate } from '@/lib/shipping-schedule';

// Helper to get any product by SKU (retail or wholesale)
function getAnyProductBySku(sku: string) {
  if (isWholesaleProduct(sku)) {
    return getWholesaleProductBySku(sku);
  }
  return getProductBySku(sku);
}

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

    const { items, email, discountCode, customerId } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid items' }, { status: 400 });
    }

    // Build full items array with productType, sku, and price for shipping calculation
    const fullItems = items.map((item: { sku: string; quantity: number; price?: number }) => {
      const product = getAnyProductBySku(item.sku);
      if (!product) {
        throw new Error(`Invalid product SKU: ${item.sku}`);
      }
      // Wholesale variety items use dynamic tier pricing from the cart
      const price = (isWholesaleProduct(item.sku) && item.price) ? item.price : product.price;
      return {
        quantity: item.quantity,
        productType: product.productType,
        price,
        sku: item.sku,
      };
    });

    // Check if this is a wholesale order (for free shipping and metadata)
    const isWholesaleOrder = fullItems.some(item => isWholesaleProduct(item.sku));

    // Calculate subtotal for free shipping threshold check
    const subtotal = fullItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Check minimum order amount ($40)
    if (subtotal < MINIMUM_ORDER_AMOUNT) {
      const minAmount = (MINIMUM_ORDER_AMOUNT / 100).toFixed(2);
      const currentAmount = (subtotal / 100).toFixed(2);
      const remaining = ((MINIMUM_ORDER_AMOUNT - subtotal) / 100).toFixed(2);
      return NextResponse.json({
        error: `Minimum order amount is $${minAmount}. Your current subtotal is $${currentAmount}. Add $${remaining} more to checkout.`
      }, { status: 400 });
    }

    // Calculate flat-rate shipping based on items and subtotal
    let shippingCost = calculateShipping(fullItems, subtotal);
    let freeShippingApplied = false;
    let freeShippingReason = '';

    // Check if free shipping was applied via threshold or wholesale
    if (isWholesaleOrder) {
      freeShippingApplied = true;
      freeShippingReason = 'wholesale';
    } else if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      freeShippingApplied = true;
      freeShippingReason = 'threshold';
    }

    // Calculate base shipping for display (what they would have paid)
    const baseShippingCost = calculateBaseShipping(fullItems);

    // Track discount info
    let percentageDiscount = 0;
    let discountAmount = 0;
    let feedbackCouponCode: string | null = null;
    let spinPrizeCode: string | null = null;
    let spinPrizeType: string | null = null;
    let utAlumniCode: string | null = null;
    let newSystemDiscountId: string | null = null;
    let newSystemDiscount: ApplicableDiscount | null = null;
    let appliedRules: AppliedRule[] = [];

    // Validate discount code if provided (server-side re-validation)
    if (email && discountCode) {
      const normalizedCode = discountCode.trim().toUpperCase();
      const normalizedEmail = email.trim().toLowerCase();

      // Build cart items for discount engine
      const cartItems = fullItems.map(item => {
        const product = getAnyProductBySku(item.sku);
        return {
          sku: item.sku,
          quantity: item.quantity,
          price: product?.price || item.price,
          name: product?.name || item.sku,
        };
      });

      // FIRST: Check the new DiscountCode system
      const discountResult = await validateDiscount(normalizedCode, normalizedEmail, cartItems);

      if (discountResult.valid && discountResult.discount) {
        // Use new discount system
        newSystemDiscountId = discountResult.discountId || null;
        newSystemDiscount = discountResult.discount;
        appliedRules = discountResult.discount.rules;

        // Apply the discount
        discountAmount = discountResult.discount.calculatedDiscount;

        // Check for percentage discount
        if (discountResult.discount.type === 'percentage' && discountResult.discount.amount) {
          percentageDiscount = discountResult.discount.amount;
        }

        // Check for free shipping in the discount
        if (includesFreeShipping(discountResult.discount) && !freeShippingApplied) {
          shippingCost = 0;
          freeShippingApplied = true;
          freeShippingReason = 'discount_code';
        }

      } else if (!discountResult.valid && discountResult.error === 'Invalid discount code') {
        // Not found in new system - fall through to legacy validation

        // LEGACY: Check if it's a feedback coupon (THANKS-XXXXXX format)
        if (normalizedCode.startsWith('THANKS-')) {
          const feedbackCoupon = await prisma.customerFeedback.findUnique({
            where: { couponCode: normalizedCode },
          });

          if (feedbackCoupon && !feedbackCoupon.couponUsed && new Date() <= feedbackCoupon.expiresAt) {
            // Valid feedback coupon - apply 10% off subtotal
            percentageDiscount = 10;
            discountAmount = Math.round(subtotal * 0.10); // 10% of subtotal
            feedbackCouponCode = normalizedCode;
          }
        }
        // Check if code is valid first-order free shipping code
        // Only apply free shipping if not already applied via threshold
        else if (VALID_DISCOUNT_CODES.includes(normalizedCode as typeof VALID_DISCOUNT_CODES[number]) && !freeShippingApplied) {
          const existingOrderCount = await prisma.order.count({
            where: { email: normalizedEmail },
          });

          if (existingOrderCount === 0) {
            // Valid first-order discount - apply free shipping
            shippingCost = 0;
            freeShippingApplied = true;
            freeShippingReason = 'discount_code';
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
                break;
              case 'free_shipping':
                // Free shipping
                if (!freeShippingApplied) {
                  shippingCost = 0;
                  freeShippingApplied = true;
                  freeShippingReason = 'spin_prize';
                }
                break;
              case 'five_off':
                // $5 off
                discountAmount = 500;
                break;
              case 'bonus_tortillas':
                // 10 bonus tortillas - $5 value applied as discount
                discountAmount = 500;
                break;
              case 'free_sauce':
                // Free sauce - $12 value applied as discount
                discountAmount = 1200;
                break;
            }

            // Mark spin entry as used
            await prisma.spinWheelEntry.update({
              where: { code: normalizedCode },
              data: { used: true, usedAt: new Date() },
            });

            // Mark any associated drip campaign as converted
            try {
              await prisma.dripCampaignProgress.updateMany({
                where: {
                  spinWheelEntryId: spinEntry.id,
                  status: 'ACTIVE',
                },
                data: {
                  status: 'CONVERTED',
                  convertedAt: new Date(),
                },
              });
            } catch (dripError) {
              // Non-critical, just log
              console.error('Failed to update drip campaign:', dripError);
            }
          }
        }
        // Check if it's a drip campaign code (DRIP-* format)
        else if (normalizedCode.startsWith('DRIP-')) {
          const parts = normalizedCode.split('-');
          const discountType = parts[1];

          switch (discountType) {
            case '10OFF':
              // 10% off
              percentageDiscount = 10;
              discountAmount = Math.round(subtotal * 0.10);
              break;
            case '5OFF':
              // $5 off
              discountAmount = 500;
              break;
            case 'FREESHIP':
              // Free shipping
              if (!freeShippingApplied) {
                shippingCost = 0;
                freeShippingApplied = true;
                freeShippingReason = 'drip_code';
              }
              break;
          }
        }
        // UT Alumni codes - 10% off, any order (no restrictions)
        else if (['HOOKEM', 'UTALUMNI'].includes(normalizedCode)) {
          percentageDiscount = 10;
          discountAmount = Math.round(subtotal * 0.10);
          utAlumniCode = normalizedCode;
        }
      }
      // If the new system returned a different error (expired, used, etc.), don't apply any discount
    }

    // Create line items for Stripe with server-side validation
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item: { sku: string; quantity: number; price?: number }) => {
      const product = getAnyProductBySku(item.sku);
      if (!product) {
        throw new Error(`Invalid product SKU: ${item.sku}`);
      }

      // Validate quantity
      if (!item.quantity || item.quantity < 1 || item.quantity > 99) {
        throw new Error(`Invalid quantity for ${item.sku}`);
      }

      // Wholesale variety items use dynamic tier pricing from the cart
      const unitAmount = (isWholesaleProduct(item.sku) && item.price) ? item.price : product.price;

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
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      };
    });

    // Create a Stripe coupon for discounts (new system, feedback, spin wheel, drip, or UT alumni)
    // IMPORTANT: Always use fixed-amount coupons to avoid applying discount to tax line item
    let stripeCouponId: string | undefined;
    const dripCode = discountCode?.startsWith('DRIP-') ? discountCode : null;
    if (discountAmount > 0 && (newSystemDiscountId || feedbackCouponCode || spinPrizeCode || dripCode || utAlumniCode)) {
      // Determine coupon name
      const couponName = newSystemDiscountId
        ? `${newSystemDiscount?.name || 'Discount'} - ${discountCode?.toUpperCase()}`
        : feedbackCouponCode
        ? `Feedback Discount - ${feedbackCouponCode}`
        : spinPrizeCode
        ? `Spin Prize - ${spinPrizeCode}`
        : utAlumniCode
        ? `UT Alumni - 10% Off`
        : `Drip Discount - ${dripCode}`;

      // Always use fixed amount to prevent discount from applying to tax line item
      const coupon = await stripe.coupons.create({
        amount_off: discountAmount,
        currency: 'usd',
        duration: 'once',
        name: couponName,
        metadata: {
          ...(newSystemDiscountId && { newSystemDiscountId, discountCode: discountCode?.toUpperCase() }),
          ...(feedbackCouponCode && { feedbackCouponCode }),
          ...(spinPrizeCode && { spinPrizeCode, spinPrizeType: spinPrizeType || '' }),
          ...(dripCode && { dripCode }),
          ...(utAlumniCode && { utAlumniCode }),
          ...(percentageDiscount > 0 && { originalPercentage: percentageDiscount.toString() }),
        },
      });
      stripeCouponId = coupon.id;
    }

    // Calculate tax on subtotal after discount
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = Math.round(taxableAmount * TAX_RATE);

    // Add sales tax as a line item
    if (taxAmount > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Sales Tax (8.25%)',
            description: 'Texas state sales tax',
            metadata: {
              type: 'tax',
            },
          },
          unit_amount: taxAmount,
        },
        quantity: 1,
      });
    }

    // Calculate ship date for display
    const shipDateDisplay = getShipDateDisplay();
    const nextShipDate = getNextShipDate();
    const estimatedShipDate = formatShipDate(nextShipDate);

    // Build shipping display name - Freshness First branding
    const getShippingDisplayName = () => {
      if (freeShippingApplied) {
        const savingsText = `You saved $${(baseShippingCost / 100).toFixed(2)}`;
        if (freeShippingReason === 'wholesale') {
          return `FREE Freshness First Shipping — Ships ${shipDateDisplay}`;
        } else if (freeShippingReason === 'threshold') {
          return `FREE Freshness First Shipping — Ships ${shipDateDisplay} (${savingsText})`;
        } else {
          return `FREE Freshness First Shipping — Ships ${shipDateDisplay}`;
        }
      }
      return `Freshness First Shipping — Ships ${shipDateDisplay}`;
    };

    // Wholesale order: verify customer and link Stripe customer
    let stripeCustomerIdForSession: string | undefined;
    let wholesaleClientId: string | undefined;
    if (isWholesaleOrder) {
      if (!customerId) {
        return NextResponse.json({ error: 'Account required for wholesale orders. Please sign in or register.' }, { status: 400 });
      }
      const customer = await prisma.customer.findUnique({
        where: { id: customerId },
        include: { WholesaleClient: true },
      });
      if (!customer || !customer.isWholesale) {
        return NextResponse.json({ error: 'Wholesale account required. Please register as a wholesale customer.' }, { status: 400 });
      }
      if (customer.stripeCustomerId) {
        stripeCustomerIdForSession = customer.stripeCustomerId;
      }
      if (customer.WholesaleClient) {
        wholesaleClientId = customer.WholesaleClient.id;
      }
    }

    // Create Stripe checkout session with shipping as actual shipping rate (not a line item)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      // Apply discount coupon if created
      ...(stripeCouponId && {
        discounts: [{ coupon: stripeCouponId }],
      }),
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}`,
      // Link to existing Stripe customer for wholesale orders
      ...(stripeCustomerIdForSession && { customer: stripeCustomerIdForSession }),
      metadata: {
        disclaimer: 'Independent reseller. Not affiliated with or endorsed by H-E-B®.',
        shippingMethod: 'standard', // Simplified to single method
        shippingCost: shippingCost.toString(), // Store for webhook reference
        baseShippingCost: baseShippingCost.toString(), // What shipping would have been
        subtotal: subtotal.toString(), // Order subtotal
        taxAmount: taxAmount.toString(), // Sales tax amount
        isWholesaleOrder: isWholesaleOrder.toString(), // Track wholesale orders
        estimatedShipDate, // Freshness First ship date
        ...(customerId && { customerId }),
        ...(wholesaleClientId && { wholesaleClientId }),
        ...(freeShippingApplied && {
          freeShippingReason, // 'threshold', 'wholesale', 'discount_code', 'spin_prize', 'drip_code'
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
        // New discount system info for tracking
        ...(newSystemDiscountId && {
          newSystemDiscountId,
          newSystemDiscountType: newSystemDiscount?.type || '',
          newSystemDiscountAmount: discountAmount.toString(),
          newSystemRulesApplied: JSON.stringify(appliedRules),
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
              amount: shippingCost,
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
                value: 5,
              },
            },
          },
        },
      ],
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Unable to create checkout session' },
      { status: 500 }
    );
  }
}