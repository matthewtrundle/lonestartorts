import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getProductBySku, getWholesaleProductBySku, isWholesaleProduct, getRetailSkuFromWholesale, getTortillaPackCount, calculateShipping, calculateBaseShipping, FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING_RATE, MINIMUM_ORDER_AMOUNT } from '@/lib/products';
import { getTierForPackCount, getWholesalePrice } from '@/lib/wholesale-tiers';

// Texas sales tax rate
const TAX_RATE = 0.0825; // 8.25%
import { prisma } from '@/lib/prisma';
import { getAuthenticatedCustomer } from '@/lib/customer-auth';
import { validateDiscount, includesFreeShipping, ApplicableDiscount, AppliedRule } from '@/lib/discount-engine';
import { getNextShipDate, getShipDateDisplay, formatShipDate } from '@/lib/shipping-schedule';
import { getStoreStatusUncached } from '@/lib/store-status';

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

    const { salesPaused, nextShipDate: shipDateOverride } = await getStoreStatusUncached();
    if (salesPaused) {
      return NextResponse.json(
        { error: 'Sales are temporarily paused', code: 'SALES_PAUSED' },
        { status: 503 }
      );
    }

    const { items, email, discountCode } = await req.json();

    // Derive customer identity from the session cookie — never trust a
    // client-supplied customerId for pricing or order attribution.
    const sessionCustomer = await getAuthenticatedCustomer();
    const customerId = sessionCustomer?.id;

    // First-touch attribution captured by AttributionTracker on first visit
    let attribution: Record<string, string> = {};
    try {
      const attrCookie = req.cookies.get('lst_attr')?.value;
      if (attrCookie) {
        const parsed = JSON.parse(decodeURIComponent(attrCookie));
        const clamp = (v: unknown) => (typeof v === 'string' ? v.slice(0, 200) : undefined);
        const gclid = clamp(parsed.gc);
        const gbraid = clamp(parsed.gb);
        const wbraid = clamp(parsed.wb);
        const hasGoogleClick = Boolean(gclid || gbraid || wbraid || parsed.g === 1);
        attribution = {
          ...(clamp(parsed.lp) && { attrLandingPath: clamp(parsed.lp)! }),
          ...(clamp(parsed.ref) && { attrReferrer: clamp(parsed.ref)! }),
          ...(clamp(parsed.us) && { attrUtmSource: clamp(parsed.us)! }),
          ...(clamp(parsed.um) && { attrUtmMedium: clamp(parsed.um)! }),
          ...(clamp(parsed.uc) && { attrUtmCampaign: clamp(parsed.uc)! }),
          ...(gclid && { attrGclid: gclid }),
          ...(gbraid && { attrGbraid: gbraid }),
          ...(wbraid && { attrWbraid: wbraid }),
          // A Google click id implies Google Ads even without UTMs.
          ...(hasGoogleClick && !parsed.us && { attrUtmSource: 'google' }),
          ...(typeof parsed.ts === 'number' && { attrFirstVisitAt: String(parsed.ts) }),
        };
      }
    } catch {
      // best-effort only
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid items' }, { status: 400 });
    }

    // Volume tier from TOTAL tortilla packs across the whole cart — retail
    // and legacy WHOLESALE- SKUs alike. Wholesale is not a separate store:
    // any cart that reaches 16+ packs earns tier pricing automatically, no
    // account, no special SKUs. (Legacy WHOLESALE- carts below a tier are
    // simply priced at retail instead of erroring.)
    const totalTortillaPacks = getTortillaPackCount(items);
    const wholesaleTier = getTierForPackCount(totalTortillaPacks);

    // Build full items array with productType, sku, and server-validated price
    const fullItems = items.map((item: { sku: string; quantity: number; price?: number }) => {
      const product = getAnyProductBySku(item.sku);
      if (!product) {
        throw new Error(`Invalid product SKU: ${item.sku}`);
      }

      // Server-side price. Tier pricing applies to every tortilla product
      // when the cart reaches a tier; the base (retail) product price is
      // always the starting point, so legacy WHOLESALE- SKUs and retail SKUs
      // price identically.
      const retailSku = isWholesaleProduct(item.sku) ? getRetailSkuFromWholesale(item.sku) : item.sku;
      const baseProduct = retailSku ? getProductBySku(retailSku) : undefined;
      let price = baseProduct?.price ?? product.price;
      if (wholesaleTier && baseProduct?.productType === 'tortilla') {
        price = getWholesalePrice(price, wholesaleTier.discountPercent);
      }

      return {
        quantity: item.quantity,
        productType: product.productType,
        price,
        sku: item.sku,
      };
    });

    // "Wholesale order" now means: tier pricing applied (free shipping + ACH
    // payment option + metadata for ops/analytics).
    const isWholesaleOrder = !!wholesaleTier;

    // Calculate subtotal for free shipping threshold check
    const subtotal = fullItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Enforce minimum order (tier carts are always far above it)
    if (!isWholesaleOrder && subtotal < MINIMUM_ORDER_AMOUNT) {
      return NextResponse.json({
        error: `Minimum order is $${(MINIMUM_ORDER_AMOUNT / 100).toFixed(0)}. Add $${((MINIMUM_ORDER_AMOUNT - subtotal) / 100).toFixed(2)} more to check out — shipping is free at $${(MINIMUM_ORDER_AMOUNT / 100).toFixed(0)}+.`
      }, { status: 400 });
    }

    // Calculate shipping based on subtotal ($12.99 flat, free on $80+)
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

            // NOTE: the prize is marked as used in the Stripe webhook once
            // payment actually completes — marking it here would burn the
            // code on abandoned checkouts.
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

      // Use server-validated price from fullItems (handles wholesale tier pricing)
      const matchedFullItem = fullItems.find(fi => fi.sku === item.sku);
      const unitAmount = matchedFullItem ? matchedFullItem.price : product.price;

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
        // Stripe rejects coupon names longer than 40 chars
        name: couponName.slice(0, 40),
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

    // Calculate ship date for display (honors StoreSettings.nextShipDate override)
    const shipDateDisplay = getShipDateDisplay(new Date(), shipDateOverride);
    const nextShipDate = getNextShipDate(new Date(), shipDateOverride);
    const estimatedShipDate = formatShipDate(nextShipDate);

    // Build shipping display name - Freshness First branding
    const getShippingDisplayName = () => {
      if (freeShippingApplied) {
        if (freeShippingReason === 'wholesale') {
          return `FREE Freshness First Shipping — Ships ${shipDateDisplay}`;
        } else if (freeShippingReason === 'threshold') {
          return `FREE Freshness First Shipping — Ships ${shipDateDisplay} (You saved $${(FLAT_SHIPPING_RATE / 100).toFixed(2)})`;
        } else {
          return `FREE Freshness First Shipping — Ships ${shipDateDisplay}`;
        }
      }
      return `Freshness First Shipping ($${(FLAT_SHIPPING_RATE / 100).toFixed(2)}) — Ships ${shipDateDisplay}`;
    };

    // Tier orders need NO account — the old hard wall here ("Account required
    // for wholesale orders") forced mid-purchase registration that
    // auto-approved anyone anyway, and was the store's worst abandonment
    // point. If the buyer happens to be a signed-in wholesale customer we
    // still link their Stripe customer + WholesaleClient for order history
    // and NET-terms continuity; guests just check out.
    let stripeCustomerIdForSession: string | undefined;
    let wholesaleClientId: string | undefined;
    if (isWholesaleOrder && customerId) {
      const customer = await prisma.customer.findUnique({
        where: { id: customerId },
        include: { WholesaleClient: true },
      });
      if (customer?.stripeCustomerId) {
        stripeCustomerIdForSession = customer.stripeCustomerId;
      }
      if (customer?.WholesaleClient) {
        wholesaleClientId = customer.WholesaleClient.id;
      }
    }

    // Create Stripe checkout session with shipping as actual shipping rate (not a line item)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: isWholesaleOrder ? ['card', 'us_bank_account'] : ['card'],
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
        ...attribution, // first-touch attribution → persisted on Order in webhook
        shippingMethod: 'standard', // Simplified to single method
        shippingCost: shippingCost.toString(), // Store for webhook reference
        baseShippingCost: baseShippingCost.toString(), // What shipping would have been
        subtotal: subtotal.toString(), // Order subtotal
        taxAmount: taxAmount.toString(), // Sales tax amount
        isWholesaleOrder: isWholesaleOrder.toString(), // Track wholesale orders
        ...(wholesaleTier && {
          volumeTierName: wholesaleTier.name,
          volumeTierPercent: wholesaleTier.discountPercent.toString(),
          volumeTierPacks: totalTortillaPacks.toString(),
        }),
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