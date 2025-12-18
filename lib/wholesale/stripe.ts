import Stripe from 'stripe';
import { PaymentTerms, PricingTier } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as Stripe.LatestApiVersion,
});

// Map payment terms to Stripe days_until_due
export function getPaymentTermsDays(terms: PaymentTerms): number {
  const mapping: Record<PaymentTerms, number> = {
    DUE_ON_RECEIPT: 0,
    NET_7: 7,
    NET_15: 15,
    NET_30: 30,
    NET_45: 45,
    NET_60: 60,
  };
  return mapping[terms];
}

// Get discount percentage for pricing tier
export function getTierDiscount(tier: PricingTier): number {
  const mapping: Record<PricingTier, number> = {
    STANDARD: 0,
    SILVER: 5,
    GOLD: 10,
    PLATINUM: 15,
    CUSTOM: 0, // Custom uses discountPercent field
  };
  return mapping[tier];
}

// Create Stripe customer for wholesale client
export async function createStripeCustomer(client: {
  businessName: string;
  email: string;
  phone?: string | null;
  billingAddress1?: string | null;
  billingCity?: string | null;
  billingState?: string | null;
  billingZip?: string | null;
  billingCountry?: string | null;
}): Promise<string> {
  const customer = await stripe.customers.create({
    name: client.businessName,
    email: client.email,
    phone: client.phone || undefined,
    address: client.billingAddress1 ? {
      line1: client.billingAddress1,
      city: client.billingCity || undefined,
      state: client.billingState || undefined,
      postal_code: client.billingZip || undefined,
      country: client.billingCountry || 'US',
    } : undefined,
    metadata: {
      type: 'wholesale',
    },
  });

  return customer.id;
}

// Update Stripe customer
export async function updateStripeCustomer(
  stripeCustomerId: string,
  data: {
    businessName?: string;
    email?: string;
    phone?: string | null;
    billingAddress1?: string | null;
    billingCity?: string | null;
    billingState?: string | null;
    billingZip?: string | null;
    billingCountry?: string | null;
  }
): Promise<Stripe.Customer> {
  return stripe.customers.update(stripeCustomerId, {
    name: data.businessName,
    email: data.email,
    phone: data.phone || undefined,
    address: data.billingAddress1 ? {
      line1: data.billingAddress1,
      city: data.billingCity || undefined,
      state: data.billingState || undefined,
      postal_code: data.billingZip || undefined,
      country: data.billingCountry || 'US',
    } : undefined,
  });
}

// Invoice item interface
interface InvoiceItem {
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number; // In cents
}

// Create draft invoice
export async function createWholesaleInvoice(params: {
  stripeCustomerId: string;
  items: InvoiceItem[];
  discount?: number; // In cents
  shipping?: number; // In cents
  paymentTerms: PaymentTerms;
  metadata?: Record<string, string>;
}): Promise<Stripe.Invoice> {
  // Create invoice
  const invoice = await stripe.invoices.create({
    customer: params.stripeCustomerId,
    collection_method: 'send_invoice',
    days_until_due: getPaymentTermsDays(params.paymentTerms),
    metadata: params.metadata,
  });

  // Add line items
  for (const item of params.items) {
    await stripe.invoiceItems.create({
      customer: params.stripeCustomerId,
      invoice: invoice.id,
      description: item.description || item.name,
      quantity: item.quantity,
      unit_amount: item.unitPrice,
      currency: 'usd',
    });
  }

  // Add discount if present
  if (params.discount && params.discount > 0) {
    // Create a one-time coupon for this invoice
    const coupon = await stripe.coupons.create({
      amount_off: params.discount,
      currency: 'usd',
      duration: 'once',
      name: 'Wholesale Discount',
    });

    await stripe.invoices.update(invoice.id, {
      discounts: [{ coupon: coupon.id }],
    });
  }

  // Add shipping if present
  if (params.shipping && params.shipping > 0) {
    await stripe.invoiceItems.create({
      customer: params.stripeCustomerId,
      invoice: invoice.id,
      description: 'Shipping',
      amount: params.shipping,
      currency: 'usd',
    });
  }

  // Retrieve full invoice with calculated totals
  return stripe.invoices.retrieve(invoice.id);
}

// Finalize and send invoice
export async function sendInvoice(invoiceId: string): Promise<Stripe.Invoice> {
  // First finalize the invoice
  await stripe.invoices.finalizeInvoice(invoiceId);
  // Then send it
  return stripe.invoices.sendInvoice(invoiceId);
}

// Void invoice
export async function voidInvoice(invoiceId: string): Promise<Stripe.Invoice> {
  return stripe.invoices.voidInvoice(invoiceId);
}

// Get invoice
export async function getInvoice(invoiceId: string): Promise<Stripe.Invoice> {
  return stripe.invoices.retrieve(invoiceId);
}

// List invoices for a customer
export async function listCustomerInvoices(
  stripeCustomerId: string,
  limit: number = 10
): Promise<Stripe.Invoice[]> {
  const invoices = await stripe.invoices.list({
    customer: stripeCustomerId,
    limit,
  });
  return invoices.data;
}

// Create subscription for recurring orders
export async function createWholesaleSubscription(params: {
  stripeCustomerId: string;
  items: InvoiceItem[];
  interval: 'week' | 'month';
  intervalCount: number;
  billingCycleAnchor?: number; // Unix timestamp
  paymentTerms?: PaymentTerms;
}): Promise<Stripe.Subscription> {
  // Create prices for each item
  const subscriptionItems: Stripe.SubscriptionCreateParams.Item[] = [];

  for (const item of params.items) {
    const price = await stripe.prices.create({
      unit_amount: item.unitPrice,
      currency: 'usd',
      recurring: {
        interval: params.interval,
        interval_count: params.intervalCount,
      },
      product_data: {
        name: item.name,
      },
    });

    subscriptionItems.push({
      price: price.id,
      quantity: item.quantity,
    });
  }

  const subscriptionParams: Stripe.SubscriptionCreateParams = {
    customer: params.stripeCustomerId,
    items: subscriptionItems,
    collection_method: 'send_invoice',
    days_until_due: params.paymentTerms ? getPaymentTermsDays(params.paymentTerms) : 7,
  };

  if (params.billingCycleAnchor) {
    subscriptionParams.billing_cycle_anchor = params.billingCycleAnchor;
  }

  return stripe.subscriptions.create(subscriptionParams);
}

// Pause subscription
export async function pauseSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  return stripe.subscriptions.update(subscriptionId, {
    pause_collection: {
      behavior: 'void',
    },
  });
}

// Resume subscription
export async function resumeSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  return stripe.subscriptions.update(subscriptionId, {
    pause_collection: '',
  });
}

// Cancel subscription
export async function cancelSubscription(
  subscriptionId: string,
  immediately: boolean = false
): Promise<Stripe.Subscription> {
  if (immediately) {
    return stripe.subscriptions.cancel(subscriptionId);
  }
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
}

// Get subscription
export async function getSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  return stripe.subscriptions.retrieve(subscriptionId);
}

// Map Stripe subscription status to our enum
export function mapStripeSubscriptionStatus(
  status: Stripe.Subscription.Status
): 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'PAST_DUE' {
  switch (status) {
    case 'active':
    case 'trialing':
      return 'ACTIVE';
    case 'paused':
      return 'PAUSED';
    case 'canceled':
    case 'incomplete_expired':
      return 'CANCELLED';
    case 'past_due':
    case 'unpaid':
    case 'incomplete':
      return 'PAST_DUE';
    default:
      return 'ACTIVE';
  }
}

// Export Stripe instance for direct use if needed
export { stripe };
