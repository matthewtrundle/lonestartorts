import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getProductBySku, getWholesaleProductBySku, isWholesaleProduct, calculateShipping, calculateBaseShipping, FREE_SHIPPING_THRESHOLD, MINIMUM_ORDER_AMOUNT } from '@/lib/products';
import { prisma } from '@/lib/prisma';
import { validateDiscount, includesFreeShipping, recordDiscountUsage, ApplicableDiscount, AppliedRule } from '@/lib/discount-engine';

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

    const { items, email, discountCode } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid items' }, { status: 400 });
    }

    // Build full items array with productType, sku, and price for shipping calculation
    const fullItems = items.map((item: { sku: string; quantity: number }) => {
      const product = getAnyProductBySku(item.sku);
      if (!product) {
        throw new Error(`Invalid product SKU: ${item.sku}`);
      }
      return {
        quantity: item.quantity,
        productType: product.productType,
        price: product.price,
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
      console.log(`Free shipping applied for wholesale order $${(subtotal / 100).toFixed(2)}`);
    } else if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      freeShippingApplied = true;
      freeShippingReason = 'threshold';
      console.log(`Free shipping applied for order $${(subtotal / 100).toFixed(2)} (threshold: $${(FREE_SHIPPING_THRESHOLD / 100).toFixed(2)})`);
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

        console.log(`New system discount applied: ${normalizedCode}, type: ${discountResult.discount.type}, saving $${(discountAmount / 100).toFixed(2)}`);
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
            console.log(`10% feedback discount applied: ${normalizedCode}, saving $${(discountAmount / 100).toFixed(2)}`);
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
              console.log(`Drip 10% off applied: ${normalizedCode}, saving $${(discountAmount / 100).toFixed(2)}`);
              break;
            case '5OFF':
              // $5 off
              discountAmount = 500;
              console.log(`Drip $5 off applied: ${normalizedCode}`);
              break;
            case 'FREESHIP':
              // Free shipping
              if (!freeShippingApplied) {
                shippingCost = 0;
                freeShippingApplied = true;
                freeShippingReason = 'drip_code';
                console.log(`Drip free shipping applied: ${normalizedCode}`);
              }
              break;
          }
        }
        // UT Alumni codes - 10% off, any order (no restrictions)
        else if (['HOOKEM', 'UTALUMNI'].includes(normalizedCode)) {
          percentageDiscount = 10;
          discountAmount = Math.round(subtotal * 0.10);
          utAlumniCode = normalizedCode;
          console.log(`UT Alumni 10% off applied: ${normalizedCode}, saving $${(discountAmount / 100).toFixed(2)}`);
        }
      }
      // If the new system returned a different error (expired, used, etc.), don't apply any discount
    }

    // Create line items for Stripe with server-side validation
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item: { sku: string; quantity: number }) => {
      const product = getAnyProductBySku(item.sku);
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

    // Create a Stripe coupon for discounts (new system, feedback, spin wheel, drip, or UT alumni)
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

      // Determine if it's a percentage or fixed amount discount
      if (percentageDiscount > 0) {
        // Percentage discount (10% off)
        const coupon = await stripe.coupons.create({
          percent_off: percentageDiscount,
          duration: 'once',
          name: couponName,
          metadata: {
            ...(newSystemDiscountId && { newSystemDiscountId, discountCode: discountCode?.toUpperCase() }),
            ...(feedbackCouponCode && { feedbackCouponCode }),
            ...(spinPrizeCode && { spinPrizeCode, spinPrizeType: spinPrizeType || '' }),
            ...(dripCode && { dripCode }),
            ...(utAlumniCode && { utAlumniCode }),
          },
        });
        stripeCouponId = coupon.id;
      } else {
        // Fixed amount discount ($5 off, free sauce, bonus tortillas, BOGO)
        const coupon = await stripe.coupons.create({
          amount_off: discountAmount,
          currency: 'usd',
          duration: 'once',
          name: couponName,
          metadata: {
            ...(newSystemDiscountId && { newSystemDiscountId, discountCode: discountCode?.toUpperCase() }),
            ...(spinPrizeCode && { spinPrizeCode, spinPrizeType: spinPrizeType || '' }),
            ...(dripCode && { dripCode }),
          },
        });
        stripeCouponId = coupon.id;
      }
    }

    // Build shipping display name - simplified flat-rate display
    const getShippingDisplayName = () => {
      if (freeShippingApplied) {
        const savingsText = `You saved $${(baseShippingCost / 100).toFixed(2)}`;
        if (freeShippingReason === 'wholesale') {
          return `FREE Fast Shipping - Wholesale Order`;
        } else if (freeShippingReason === 'threshold') {
          return `FREE Fast Shipping - Order $80+ ${savingsText}`;
        } else {
          return `FREE Fast Shipping - First Order Discount`;
        }
      }
      return `Fast Shipping (3-5 business days)`;
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
        shippingMethod: 'standard', // Simplified to single method
        shippingCost: shippingCost.toString(), // Store for webhook reference
        baseShippingCost: baseShippingCost.toString(), // What shipping would have been
        subtotal: subtotal.toString(), // Order subtotal
        isWholesaleOrder: isWholesaleOrder.toString(), // Track wholesale orders
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
                value: 3,
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

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Unable to create checkout session' },
      { status: 500 }
    );
  }
}