import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
// Products imported for reference if needed
// import { getProductBySku } from '@/lib/products';
import { sendOrderConfirmationEmail, sendAdminOrderNotification } from '@/lib/email';
import { randomUUID } from 'crypto';

const stripeKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

const stripe = stripeKey ? new Stripe(stripeKey, {
  apiVersion: '2025-02-24.acacia',
}) : null;

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

          // Extract line items (all are products now, shipping is separate)
          const items = fullSession.line_items?.data.map((item) => ({
            sku: item.price?.metadata?.sku || '',
            name: item.description || '',
            quantity: item.quantity || 0,
            price: item.price?.unit_amount || 0,
          })) || [];

          // Calculate totals (amounts in cents)
          const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

          // Get shipping from Stripe session (now properly separated from line items)
          const shipping = fullSession.shipping_cost?.amount_total || 0;

          const tax = Math.round(subtotal * 0.0825); // 8.25% Texas sales tax
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
              console.log('Created guest customer:', customer.id);
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
              console.log('Created shipping address for customer:', customer.id);
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

              // Payment - Store session ID so we can look up order on success page
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

          console.log('Order saved to database:', order.id, order.orderNumber);

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
            console.log('Order confirmation email sent:', order.orderNumber);
          } catch (emailError) {
            console.error('Failed to send confirmation email:', emailError);
            // Don't fail the webhook - log for manual follow-up
          }

          // Send admin notification email
          try {
            await sendAdminOrderNotification(emailData);
            console.log('Admin notification email sent:', order.orderNumber);
          } catch (adminEmailError) {
            console.error('Failed to send admin notification:', adminEmailError);
            // Don't fail the webhook - log for manual follow-up
          }

        } catch (dbError) {
          console.error('Failed to save order to database:', dbError);
          // Still return 200 to Stripe to avoid retries
          // Log error for manual review
        }

        break;

      case 'payment_intent.payment_failed':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error('Payment failed:', paymentIntent.id);
        // Handle failed payment
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
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