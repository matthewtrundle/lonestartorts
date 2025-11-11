import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { calculateShipping, getProductBySku } from '@/lib/products';
import { sendOrderConfirmationEmail } from '@/lib/email';

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

          // Generate unique order number
          const orderNumber = `LST-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

          // Extract line items (filter out shipping item)
          const allItems = fullSession.line_items?.data.map((item) => ({
            sku: item.price?.metadata?.sku || '',
            name: item.description || '',
            quantity: item.quantity || 0,
            price: item.price?.unit_amount || 0,
          })) || [];

          // Separate product items from shipping
          const items = allItems.filter((item) => item.sku !== 'SHIPPING');

          // Calculate totals (amounts in cents)
          const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

          // Build full items array with productType for shipping calculation
          const fullItems = items.map((item) => {
            const product = getProductBySku(item.sku);
            return {
              quantity: item.quantity,
              productType: product?.productType || 'tortilla',
            };
          });

          // Calculate smart shipping based on items
          const shipping = calculateShipping(fullItems);

          const tax = Math.round(subtotal * 0.0825); // 8.25% Texas sales tax
          const total = session.amount_total || (subtotal + shipping + tax);

          // Save order to Prisma database
          const order = await prisma.order.create({
            data: {
              orderNumber,
              email: session.customer_details?.email || '',
              customerName: session.customer_details?.name || 'Guest',
              shippingAddress: session.shipping_details?.address as any || {},
              billingAddress: (session.customer_details?.address || session.shipping_details?.address) as any || {},
              items: items as any,
              subtotal,
              shipping,
              tax,
              total,
              stripePaymentId: session.payment_intent as string || session.id,
              paymentStatus: 'SUCCEEDED',
              status: 'PROCESSING',
            },
          });

          console.log('Order saved to database:', order.id, order.orderNumber);

          // Send order confirmation email
          try {
            await sendOrderConfirmationEmail({
              to: order.email,
              orderNumber: order.orderNumber,
              customerName: order.customerName,
              items: items,
              subtotal: order.subtotal,
              shipping: order.shipping,
              tax: order.tax,
              total: order.total,
              shippingAddress: order.shippingAddress as any,
            });
            console.log('Order confirmation email sent:', order.orderNumber);
          } catch (emailError) {
            console.error('Failed to send confirmation email:', emailError);
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
      });
    } else if (email) {
      // Return most recent order for email
      order = await prisma.order.findFirst({
        where: { email },
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
        customerName: order.customerName,
        items: order.items,
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