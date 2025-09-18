import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

// Simple in-memory order storage (replace with database in production)
const orders = new Map();

export async function POST(req: NextRequest) {
  try {
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

        // Create order record
        const order = {
          id: session.id,
          customerEmail: session.customer_details?.email,
          customerName: session.customer_details?.name,
          shippingAddress: session.shipping_details?.address,
          amountTotal: session.amount_total,
          status: 'confirmed',
          createdAt: new Date().toISOString(),
        };

        // Store order (in production, save to database)
        orders.set(session.id, order);

        // Send confirmation email (implement with Resend/Nodemailer)
        console.log('Order confirmed:', order);

        // You would typically:
        // 1. Save order to database
        // 2. Send confirmation email
        // 3. Trigger fulfillment process

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

// Export the orders for tracking (in production, use database)
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const orderId = url.searchParams.get('id');

  if (!orderId) {
    return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
  }

  const order = orders.get(orderId);

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json(order);
}