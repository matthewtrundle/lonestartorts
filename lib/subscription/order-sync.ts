import 'server-only';
import Stripe from 'stripe';
import { randomUUID } from 'crypto';
import { prisma } from '@/lib/prisma';

export type RetailSubWithCustomer = Awaited<
  ReturnType<typeof getSubscriptionWithCustomer>
>;

export async function getSubscriptionWithCustomer(stripeSubscriptionId: string) {
  return prisma.retailSubscription.findFirst({
    where: { stripeSubscriptionId },
    include: { customer: { include: { Address: true } } },
  });
}

export interface SubscriptionItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

/**
 * Create the fulfillment Order for one paid subscription invoice.
 * Idempotent: keyed on the invoice's payment_intent (stored as
 * Order.stripePaymentId), so the webhook and the reconciliation cron can both
 * call this safely for the same invoice.
 *
 * Returns the order plus whether it was newly created.
 */
export async function ensureOrderForPaidInvoice(
  stripe: Stripe,
  retailSub: NonNullable<RetailSubWithCustomer>,
  invoice: Stripe.Invoice
): Promise<{ orderId: string; orderNumber: string; created: boolean }> {
  const paymentIntentId =
    typeof invoice.payment_intent === 'string'
      ? invoice.payment_intent
      : invoice.payment_intent?.id || `invoice:${invoice.id}`;

  const existing = await prisma.order.findFirst({
    where: { stripePaymentId: paymentIntentId },
    select: { id: true, orderNumber: true, retailSubscriptionId: true },
  });
  if (existing) {
    // Backfill the subscription link on orders created before this field existed,
    // so the fulfillment view can flag them as recurring.
    if (!existing.retailSubscriptionId) {
      await prisma.order.update({
        where: { id: existing.id },
        data: { retailSubscriptionId: retailSub.id },
      });
    }
    return { orderId: existing.id, orderNumber: existing.orderNumber, created: false };
  }

  const items = retailSub.items as unknown as SubscriptionItem[];

  // Shipping address: prefer the address on file; fall back to the shipping
  // (or billing) address Stripe holds for the customer, since most
  // subscribers signed up without creating an Address record.
  let shipping = {
    name: [retailSub.customer.firstName, retailSub.customer.lastName].filter(Boolean).join(' '),
    address1: retailSub.customer.Address[0]?.street || '',
    city: retailSub.customer.Address[0]?.city || '',
    state: retailSub.customer.Address[0]?.state || '',
    zip: retailSub.customer.Address[0]?.zip || '',
    country: retailSub.customer.Address[0]?.country || 'US',
  };

  if (!shipping.address1 && retailSub.customer.stripeCustomerId) {
    try {
      const stripeCustomer = await stripe.customers.retrieve(retailSub.customer.stripeCustomerId);
      if (!stripeCustomer.deleted) {
        const addr = stripeCustomer.shipping?.address || stripeCustomer.address;
        const name = stripeCustomer.shipping?.name || stripeCustomer.name;
        if (addr?.line1) {
          shipping = {
            name: name || shipping.name,
            address1: addr.line1 + (addr.line2 ? ` ${addr.line2}` : ''),
            city: addr.city || '',
            state: addr.state || '',
            zip: addr.postal_code || '',
            country: addr.country || 'US',
          };
        }
      }
    } catch (err) {
      console.error('Failed to fetch Stripe customer address:', err);
    }
  }

  const orderNumber = `LST-${Date.now().toString().slice(-6)}${Math.random()
    .toString(36)
    .substring(2, 4)
    .toUpperCase()}`;

  const order = await prisma.order.create({
    data: {
      id: randomUUID(),
      orderNumber,
      customerId: retailSub.customerId,
      email: retailSub.customer.email,
      stripePaymentId: paymentIntentId,
      retailSubscriptionId: retailSub.id,
      subtotal: retailSub.subtotal,
      shipping: retailSub.shipping,
      tax: retailSub.tax,
      total: retailSub.total,
      paymentStatus: 'SUCCEEDED',
      status: 'PROCESSING',
      shippingName: shipping.name,
      shippingAddress1: shipping.address1,
      shippingCity: shipping.city,
      shippingState: shipping.state,
      shippingZip: shipping.zip,
      shippingCountry: shipping.country,
      // Backdate catch-up orders to when the customer was actually charged
      createdAt: new Date(invoice.created * 1000),
      updatedAt: new Date(),
      OrderItem: {
        create: items.map((item) => ({
          id: randomUUID(),
          sku: item.sku,
          name: item.name,
          quantity: item.quantity,
          price: item.unitPrice,
        })),
      },
    },
  });

  return { orderId: order.id, orderNumber, created: true };
}

/** Map a Stripe subscription status onto our SubscriptionStatus enum. */
export function mapStripeSubStatus(
  stripeStatus: Stripe.Subscription.Status,
  currentDbStatus: string
): 'ACTIVE' | 'PAST_DUE' | 'CANCELLED' | 'INCOMPLETE' | 'PAUSED' {
  switch (stripeStatus) {
    case 'active':
    case 'trialing':
      // Respect a customer-initiated pause stored in our DB
      return currentDbStatus === 'PAUSED' ? 'PAUSED' : 'ACTIVE';
    case 'past_due':
    case 'unpaid':
      return 'PAST_DUE';
    case 'canceled':
      return 'CANCELLED';
    case 'incomplete':
    case 'incomplete_expired':
      return 'INCOMPLETE';
    default:
      return currentDbStatus as ReturnType<typeof mapStripeSubStatus>;
  }
}
