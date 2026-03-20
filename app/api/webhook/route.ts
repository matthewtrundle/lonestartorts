import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { getProductBySku, getDisplayName } from '@/lib/products';
import { sendOrderConfirmationEmail, sendAdminOrderNotification } from '@/lib/email';
import { trackTikTokPurchase } from '@/lib/tiktok';
import { recordDiscountUsage, AppliedRule } from '@/lib/discount-engine';
import { randomUUID } from 'crypto';

const stripeKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

const stripe = stripeKey ? new Stripe(stripeKey, {
  apiVersion: '2025-02-24.acacia',
}) : null;

async function awardLoyaltyPoints(customerId: string, amountInCents: number, description: string, orderId?: string) {
  const points = Math.floor(amountInCents / 100) * 2; // 2 points per dollar
  if (points <= 0) return;

  // Upsert loyalty account
  const account = await prisma.loyaltyAccount.upsert({
    where: { customerId },
    create: {
      customerId,
      balance: points,
      lifetimeEarned: points,
    },
    update: {
      balance: { increment: points },
      lifetimeEarned: { increment: points },
    },
  });

  // Create transaction record
  await prisma.loyaltyTransaction.create({
    data: {
      loyaltyAccountId: account.id,
      type: 'EARN',
      points,
      description,
      orderId,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      console.warn('Stripe not configured - webhook disabled');
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 });
    }

    const body = await req.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;

        try {
          // Retrieve full session details with line items
          const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
            expand: ['line_items'],
          });

          // Generate simple order number: LST-{6-digit-counter}
          // Use last 6 digits of timestamp + 2 random chars for uniqueness
          const timestamp = Date.now().toString().slice(-6);
          const random = Math.random().toString(36).substring(2, 4).toUpperCase();
          const orderNumber = `LST-${timestamp}${random}`;

          // Extract line items (filter out tax line item, shipping is separate)
          const items = fullSession.line_items?.data
            .filter((item) => !item.description?.includes('Sales Tax'))
            .map((item) => {
              const sku = item.price?.metadata?.sku || '';
              const name = item.description || '';
              const product = getProductBySku(sku);
              // Generate displayName with count for tortilla products
              const displayName = product ? getDisplayName(product) : name;
              return {
                sku,
                name,
                displayName,
                quantity: item.quantity || 0,
                price: item.price?.unit_amount || 0,
              };
            }) || [];

          // Calculate totals (amounts in cents)
          const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

          // Get shipping from Stripe session (now properly separated from line items)
          const shipping = fullSession.shipping_cost?.amount_total || 0;

          // Get tax from metadata (set during checkout) or calculate as fallback
          const tax = parseInt(fullSession.metadata?.taxAmount || '0', 10) || Math.round(subtotal * 0.0825);
          const total = session.amount_total || (subtotal + shipping + tax);

          // Extract shipping address from fullSession (not the basic event object)
          const shippingAddr = fullSession.shipping_details?.address;
          const customerEmail = fullSession.customer_details?.email || '';
          const customerName = fullSession.customer_details?.name || fullSession.shipping_details?.name || 'Guest';
          const [firstName, ...lastNameParts] = customerName.split(' ');
          const lastName = lastNameParts.join(' ') || '';

          // Try to find or create customer (for guest checkouts without Clerk)
          let customerId: string | null = null;

          if (customerEmail) {
            // Check if customer already exists
            let customer = await prisma.customer.findUnique({
              where: { email: customerEmail },
            });

            if (!customer) {
              // Create new guest customer
              customer = await prisma.customer.create({
                data: {
                  id: randomUUID(),
                  clerkUserId: `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`,
                  email: customerEmail,
                  firstName: firstName || null,
                  lastName: lastName || null,
                  signupSource: 'checkout',
                  updatedAt: new Date()
                },
              });
            }

            customerId = customer.id;

            // Create or update shipping address
            const existingAddress = await prisma.address.findFirst({
              where: {
                customerId: customer.id,
                street: shippingAddr?.line1 || '',
                zip: shippingAddr?.postal_code || '',
              },
            });

            if (!existingAddress && shippingAddr) {
              await prisma.address.create({
                data: {
                  id: randomUUID(),
                  customerId: customer.id,
                  firstName: firstName || 'Guest',
                  lastName: lastName || '',
                  street: shippingAddr.line1 || '',
                  street2: shippingAddr.line2 || null,
                  city: shippingAddr.city || '',
                  state: shippingAddr.state || '',
                  zip: shippingAddr.postal_code || '',
                  country: shippingAddr.country || 'US',
                  phone: fullSession.customer_details?.phone || null,
                  isDefault: true,
                  type: 'BOTH',
                  updatedAt: new Date()
                },
              });
            }
          }

          // Save order to Prisma database
          const order = await prisma.order.create({
            data: {
              id: randomUUID(),
              orderNumber,
              email: customerEmail,
              status: 'PROCESSING',
              customerId,

              // Shipping address fields
              shippingName: customerName,
              shippingAddress1: shippingAddr?.line1 || '',
              shippingAddress2: shippingAddr?.line2 || null,
              shippingCity: shippingAddr?.city || '',
              shippingState: shippingAddr?.state || '',
              shippingZip: shippingAddr?.postal_code || '',
              shippingCountry: shippingAddr?.country || 'US',
              shippingPhone: fullSession.customer_details?.phone || null,

              // Order totals
              subtotal,
              shipping,
              tax,
              total,

              // Payment - checkout.session.completed means payment succeeded
              paymentStatus: 'SUCCEEDED',
              stripePaymentId: session.id || null,

              updatedAt: new Date(),

              // Create order items
              OrderItem: {
                create: items.map((item) => ({
                  id: randomUUID(),
                  sku: item.sku,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  updatedAt: new Date()
                })),
              },
            },
          });


          // Create WholesaleOrder if this is a wholesale checkout
          if (fullSession.metadata?.isWholesaleOrder === 'true' && fullSession.metadata?.wholesaleClientId) {
            try {
              const wsTimestamp = Date.now().toString().slice(-6);
              const wsRandom = Math.random().toString(36).substring(2, 4).toUpperCase();
              const wsOrderNumber = `WS-${wsTimestamp}${wsRandom}`;

              await prisma.wholesaleOrder.create({
                data: {
                  orderNumber: wsOrderNumber,
                  clientId: fullSession.metadata.wholesaleClientId,
                  stripeInvoiceId: session.id,
                  subtotal,
                  shipping,
                  tax,
                  total,
                  paymentStatus: 'PAID',
                  paymentTerms: 'DUE_ON_RECEIPT',
                  paidAt: new Date(),
                  orderStatus: 'PENDING',
                  shippingName: customerName,
                  shippingAddress1: shippingAddr?.line1 || null,
                  shippingAddress2: shippingAddr?.line2 || null,
                  shippingCity: shippingAddr?.city || null,
                  shippingState: shippingAddr?.state || null,
                  shippingZip: shippingAddr?.postal_code || null,
                  shippingCountry: shippingAddr?.country || null,
                  items: {
                    create: items.map((item) => ({
                      sku: item.sku,
                      name: item.name,
                      quantity: item.quantity,
                      unitPrice: item.price,
                      totalPrice: item.price * item.quantity,
                    })),
                  },
                },
              });
            } catch (wsError) {
              console.error('Failed to create wholesale order:', wsError);
            }
          }

          // Post-order tasks: emails, tracking, discount recording
          const backgroundWork = async () => {
            // Send order confirmation email to customer
            const emailData = {
              to: order.email,
              orderNumber: order.orderNumber,
              customerName: order.shippingName || 'Guest',
              items: items,
              subtotal: order.subtotal,
              shipping: order.shipping,
              tax: order.tax,
              total: order.total,
              shippingAddress: {
                street: order.shippingAddress1 || undefined,
                city: order.shippingCity || undefined,
                state: order.shippingState || undefined,
                zip: order.shippingZip || undefined,
                country: order.shippingCountry || undefined,
              },
            };

            try {
              await sendOrderConfirmationEmail(emailData);
            } catch (emailError) {
              console.error('Failed to send confirmation email:', emailError);
            }

            // Send admin notification email
            try {
              await sendAdminOrderNotification(emailData);
            } catch (adminEmailError) {
              console.error('Failed to send admin notification:', adminEmailError);
            }

            // Send Purchase event to TikTok Events API (server-side tracking)
            try {
              await trackTikTokPurchase({
                orderNumber: order.orderNumber,
                email: order.email,
                phone: order.shippingPhone || undefined,
                value: order.total / 100, // Convert cents to dollars
                currency: 'USD',
                contents: items.map((item) => ({
                  content_id: item.sku,
                  content_type: 'product',
                  content_name: item.name,
                  quantity: item.quantity,
                  price: item.price / 100,
                })),
              });
            } catch (tiktokError) {
              console.error('Failed to send TikTok purchase event:', tiktokError);
            }

            // Mark feedback coupon as used if applicable
            const feedbackCouponCode = fullSession.metadata?.feedbackCouponCode;
            if (feedbackCouponCode) {
              try {
                await prisma.customerFeedback.update({
                  where: { couponCode: feedbackCouponCode },
                  data: {
                    couponUsed: true,
                    couponUsedAt: new Date(),
                  },
                });
              } catch (couponError) {
                console.error('Failed to mark feedback coupon as used:', couponError);
              }
            }

            // Record new discount system usage if applicable
            const newSystemDiscountId = fullSession.metadata?.newSystemDiscountId;
            if (newSystemDiscountId) {
              try {
                const discountAmount = parseInt(fullSession.metadata?.newSystemDiscountAmount || '0', 10);
                const rulesApplied = fullSession.metadata?.newSystemRulesApplied
                  ? JSON.parse(fullSession.metadata.newSystemRulesApplied) as AppliedRule[]
                  : [];

                await recordDiscountUsage(
                  newSystemDiscountId,
                  customerEmail,
                  order.id,
                  order.orderNumber,
                  subtotal,
                  discountAmount,
                  rulesApplied
                );
              } catch (discountError) {
                console.error('Failed to record discount usage:', discountError);
              }
            }
          };
          // Await background work so emails send before serverless function terminates
          try {
            await backgroundWork();
          } catch (err) {
            console.error('Background work failed:', err);
          }

          // Award loyalty points for one-time orders
          if (customerId) {
            try {
              await awardLoyaltyPoints(customerId, subtotal, `Order ${orderNumber}`, order.id);
            } catch (loyaltyError) {
              console.error('Failed to award loyalty points:', loyaltyError);
            }
          }

        } catch (dbError) {
          console.error('Failed to save order to database:', dbError);
          // Still return 200 to Stripe to avoid retries
          // Log error for manual review
        }

        break;

      case 'payment_intent.payment_failed':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        // Handle failed payment
        break;

      // Invoice events (retail subscriptions + wholesale)
      case 'invoice.paid':
        const paidInvoice = event.data.object as Stripe.Invoice;

        try {
          // Check if this is a retail subscription invoice
          if (paidInvoice.subscription) {
            const retailSub = await prisma.retailSubscription.findFirst({
              where: { stripeSubscriptionId: paidInvoice.subscription as string },
              include: { customer: { include: { Address: true } } },
            });

            if (retailSub) {
              // Create an order for this billing cycle
              const orderNumber = `LST-${Date.now().toString().slice(-6)}${Math.random().toString(36).substring(2, 4).toUpperCase()}`;
              const items = retailSub.items as Array<{ sku: string; name: string; quantity: number; unitPrice: number }>;
              const shippingAddress = retailSub.customer.Address[0];

              await prisma.order.create({
                data: {
                  id: randomUUID(),
                  orderNumber,
                  customerId: retailSub.customerId,
                  email: retailSub.customer.email,
                  stripePaymentId: paidInvoice.payment_intent as string,
                  subtotal: retailSub.subtotal,
                  shipping: retailSub.shipping,
                  tax: retailSub.tax,
                  total: retailSub.total,
                  paymentStatus: 'SUCCEEDED',
                  status: 'PROCESSING',
                  shippingName: [retailSub.customer.firstName, retailSub.customer.lastName].filter(Boolean).join(' '),
                  shippingAddress1: shippingAddress?.street || '',
                  shippingCity: shippingAddress?.city || '',
                  shippingState: shippingAddress?.state || '',
                  shippingZip: shippingAddress?.zip || '',
                  shippingCountry: shippingAddress?.country || 'US',
                  updatedAt: new Date(),
                  OrderItem: {
                    create: items.map(item => ({
                      id: randomUUID(),
                      sku: item.sku,
                      name: item.name,
                      quantity: item.quantity,
                      price: item.unitPrice,
                    })),
                  },
                },
              });

              // Retrieve the subscription to get updated billing period dates
              const stripeSub = await stripe.subscriptions.retrieve(paidInvoice.subscription as string);

              await prisma.retailSubscription.update({
                where: { id: retailSub.id },
                data: {
                  status: 'ACTIVE',
                  lastBilledAt: new Date(),
                  nextBillingDate: new Date(stripeSub.current_period_end * 1000),
                  currentPeriodStart: new Date(stripeSub.current_period_start * 1000),
                  currentPeriodEnd: new Date(stripeSub.current_period_end * 1000),
                },
              });

              // Award loyalty points for subscription renewal
              try {
                await awardLoyaltyPoints(retailSub.customerId, retailSub.subtotal, `Subscription renewal`, undefined);
              } catch (loyaltyError) {
                console.error('Failed to award loyalty points for subscription:', loyaltyError);
              }

              break;
            }
          }

          // Find matching wholesale order
          const paidOrder = await prisma.wholesaleOrder.findUnique({
            where: { stripeInvoiceId: paidInvoice.id },
          });

          if (paidOrder) {
            await prisma.wholesaleOrder.update({
              where: { id: paidOrder.id },
              data: {
                paymentStatus: 'PAID',
                paidAt: new Date(),
              },
            });
            // TODO: Send payment confirmation email
          }
        } catch (invoiceError) {
          console.error('Failed to process paid invoice:', invoiceError);
        }
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice;

        try {
          // Check if this is a retail subscription invoice
          if (failedInvoice.subscription) {
            const failedRetailSub = await prisma.retailSubscription.findFirst({
              where: { stripeSubscriptionId: failedInvoice.subscription as string },
            });

            if (failedRetailSub) {
              await prisma.retailSubscription.update({
                where: { id: failedRetailSub.id },
                data: { status: 'PAST_DUE' },
              });
              break;
            }
          }

          // Wholesale invoice handling
          const failedOrder = await prisma.wholesaleOrder.findUnique({
            where: { stripeInvoiceId: failedInvoice.id },
          });

          if (failedOrder) {
            await prisma.wholesaleOrder.update({
              where: { id: failedOrder.id },
              data: {
                paymentStatus: 'OVERDUE',
              },
            });
          }
        } catch (invoiceError) {
          console.error('Failed to process failed invoice:', invoiceError);
        }
        break;

      case 'invoice.finalized':
        const finalizedInvoice = event.data.object as Stripe.Invoice;

        try {
          await prisma.wholesaleOrder.updateMany({
            where: { stripeInvoiceId: finalizedInvoice.id },
            data: {
              paymentStatus: 'PENDING',
              stripeInvoiceUrl: finalizedInvoice.hosted_invoice_url,
              stripeInvoiceNumber: finalizedInvoice.number,
              invoiceSentAt: new Date(),
            },
          });
        } catch (invoiceError) {
          console.error('Failed to process finalized invoice:', invoiceError);
        }
        break;

      case 'invoice.voided':
        const voidedInvoice = event.data.object as Stripe.Invoice;

        try {
          await prisma.wholesaleOrder.updateMany({
            where: { stripeInvoiceId: voidedInvoice.id },
            data: {
              paymentStatus: 'VOID',
            },
          });
        } catch (invoiceError) {
          console.error('Failed to process voided invoice:', invoiceError);
        }
        break;

      // Subscription events (retail + wholesale)
      case 'customer.subscription.updated':
        const updatedSub = event.data.object as Stripe.Subscription;

        try {
          const statusMap: Record<string, string> = {
            active: 'ACTIVE',
            trialing: 'ACTIVE',
            paused: 'PAUSED',
            canceled: 'CANCELLED',
            past_due: 'PAST_DUE',
            unpaid: 'PAST_DUE',
          };

          // Check if it's a retail subscription
          const retailSubUpdate = await prisma.retailSubscription.findUnique({
            where: { stripeSubscriptionId: updatedSub.id },
          });

          if (retailSubUpdate) {
            await prisma.retailSubscription.update({
              where: { stripeSubscriptionId: updatedSub.id },
              data: {
                status: (statusMap[updatedSub.status] || 'ACTIVE') as any,
                nextBillingDate: updatedSub.current_period_end
                  ? new Date(updatedSub.current_period_end * 1000)
                  : null,
                currentPeriodStart: updatedSub.current_period_start
                  ? new Date(updatedSub.current_period_start * 1000)
                  : null,
                currentPeriodEnd: updatedSub.current_period_end
                  ? new Date(updatedSub.current_period_end * 1000)
                  : null,
              },
            });
          } else {
            // Wholesale subscription
            await prisma.wholesaleSubscription.updateMany({
              where: { stripeSubscriptionId: updatedSub.id },
              data: {
                status: (statusMap[updatedSub.status] || 'ACTIVE') as any,
                nextBillingDate: updatedSub.current_period_end
                  ? new Date(updatedSub.current_period_end * 1000)
                  : null,
              },
            });
          }
        } catch (subError) {
          console.error('Failed to update subscription:', subError);
        }
        break;

      case 'customer.subscription.deleted':
        const deletedSub = event.data.object as Stripe.Subscription;

        try {
          // Check if it's a retail subscription
          const retailSubDelete = await prisma.retailSubscription.findUnique({
            where: { stripeSubscriptionId: deletedSub.id },
          });

          if (retailSubDelete) {
            await prisma.retailSubscription.update({
              where: { stripeSubscriptionId: deletedSub.id },
              data: {
                status: 'CANCELLED',
                cancelledAt: new Date(),
              },
            });
          } else {
            await prisma.wholesaleSubscription.updateMany({
              where: { stripeSubscriptionId: deletedSub.id },
              data: {
                status: 'CANCELLED',
                cancelledAt: new Date(),
              },
            });
          }
        } catch (subError) {
          console.error('Failed to process subscription deletion:', subError);
        }
        break;

      default:
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// Get order by order number or email
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const orderNumber = url.searchParams.get('orderNumber');
    const email = url.searchParams.get('email');

    if (!orderNumber && !email) {
      return NextResponse.json(
        { error: 'Order number or email required' },
        { status: 400 }
      );
    }

    let order;

    if (orderNumber) {
      order = await prisma.order.findUnique({
        where: { orderNumber },
        include: { OrderItem: true },
      });
    } else if (email) {
      // Return most recent order for email
      order = await prisma.order.findFirst({
        where: { email },
        include: { OrderItem: true },
        orderBy: { createdAt: 'desc' },
      });
    }

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      order: {
        orderNumber: order.orderNumber,
        email: order.email,
        customerName: order.shippingName,
        items: order.OrderItem,
        subtotal: order.subtotal,
        shipping: order.shipping,
        tax: order.tax,
        total: order.total,
        status: order.status,
        trackingNumber: order.trackingNumber,
        carrier: order.carrier,
        createdAt: order.createdAt,
        shippedAt: order.shippedAt,
        deliveredAt: order.deliveredAt,
      },
    });
  } catch (error) {
    console.error('Order tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve order' },
      { status: 500 }
    );
  }
}