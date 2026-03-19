import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as Stripe.LatestApiVersion,
});

interface SubscriptionItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number; // cents
}

interface CreateSubscriptionParams {
  stripeCustomerId: string;
  items: SubscriptionItem[];
  interval: 'week' | 'month';
  intervalCount: number;
  shipping: number; // cents
  paymentMethodId: string;
}

export async function createRetailSubscription({
  stripeCustomerId,
  items,
  interval,
  intervalCount,
  shipping,
  paymentMethodId,
}: CreateSubscriptionParams) {
  // Attach payment method to customer
  await stripe.paymentMethods.attach(paymentMethodId, {
    customer: stripeCustomerId,
  });

  // Set as default payment method
  await stripe.customers.update(stripeCustomerId, {
    invoice_settings: { default_payment_method: paymentMethodId },
  });

  // Calculate total per billing cycle
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const total = subtotal + shipping;

  // Create a product for this subscription bundle
  const product = await stripe.products.create({
    name: `Lonestar Tortillas - ${interval === 'week' ? 'Weekly' : 'Monthly'} Subscription`,
    metadata: {
      type: 'retail_subscription',
      items: JSON.stringify(items.map(i => ({ sku: i.sku, qty: i.quantity }))),
    },
  });

  // Create a recurring price
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: total,
    currency: 'usd',
    recurring: {
      interval,
      interval_count: intervalCount,
    },
  });

  // Create the subscription
  const subscription = await stripe.subscriptions.create({
    customer: stripeCustomerId,
    items: [{ price: price.id }],
    collection_method: 'charge_automatically',
    payment_behavior: 'default_incomplete',
    payment_settings: {
      save_default_payment_method: 'on_subscription',
    },
    expand: ['latest_invoice.payment_intent'],
    metadata: {
      type: 'retail',
      items: JSON.stringify(items),
      shipping: String(shipping),
    },
  });

  return {
    subscription,
    product,
    price,
    clientSecret: (
      (subscription.latest_invoice as Stripe.Invoice)
        ?.payment_intent as Stripe.PaymentIntent
    )?.client_secret,
  };
}

export async function createCustomerPortalSession(
  stripeCustomerId: string,
  returnUrl: string
) {
  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: returnUrl,
  });
  return session;
}

export async function getCustomerSubscriptions(stripeCustomerId: string) {
  const subscriptions = await stripe.subscriptions.list({
    customer: stripeCustomerId,
    status: 'all',
    limit: 10,
    expand: ['data.default_payment_method'],
  });
  return subscriptions.data;
}

export function mapStripeIntervalToDb(interval: string): 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY' | 'QUARTERLY' {
  switch (interval) {
    case 'week': return 'WEEKLY';
    case 'month': return 'MONTHLY';
    default: return 'MONTHLY';
  }
}
