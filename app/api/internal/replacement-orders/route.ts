import { NextRequest, NextResponse } from 'next/server';
import { randomUUID, timingSafeEqual } from 'crypto';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/internal/replacement-orders
 *
 * Internal endpoint called by the CoreLinq platform when an operator resolves a
 * support escalation with "Resend order" (e.g. an order arrived damaged/wrong).
 * CoreLinq owns the POLICY (gate, item caps, audit); this endpoint owns
 * EXECUTION so the storefront stays the system of record — it creates the
 * replacement Order so it flows into the normal Pirate Ship fulfillment queue.
 *
 * The replacement is a COMP: no Stripe charge, all money fields 0,
 * paymentStatus SUCCEEDED so it appears in the unfulfilled queue. A future
 * `scheduled_ship_date` holds it out of the queue until that ship week.
 *
 * Auth: shared secret in the `x-api-key` header === CORELINQ_REFUND_API_KEY
 * (the same key the refund endpoint uses).
 * Idempotency: `idempotency_key` is stored as Order.sourceIdempotencyKey; a
 * repeat call returns the existing order instead of creating a duplicate.
 */

function keyOk(provided: string | null): boolean {
  const expected = process.env.CORELINQ_REFUND_API_KEY;
  if (!expected || !provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

interface ReplacementItem {
  sku?: string;
  name: string;
  qty: number;
}

export async function POST(req: NextRequest) {
  if (!keyOk(req.headers.get('x-api-key'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const originalOrderNumber: string | undefined = body.original_order_number;
  const rawItems: unknown = body.items;
  const reason: string | undefined = body.reason;
  const idempotencyKey: string | undefined = body.idempotency_key;
  const scheduledShipRaw: string | undefined = body.scheduled_ship_date;

  if (!originalOrderNumber) {
    return NextResponse.json({ error: 'original_order_number required' }, { status: 400 });
  }
  if (!idempotencyKey) {
    return NextResponse.json({ error: 'idempotency_key required' }, { status: 400 });
  }
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    return NextResponse.json({ error: 'items must be a non-empty array' }, { status: 400 });
  }

  const items: ReplacementItem[] = [];
  for (const raw of rawItems as ReplacementItem[]) {
    const qty = Math.floor(Number(raw?.qty));
    if (!raw?.name || !Number.isFinite(qty) || qty <= 0) {
      return NextResponse.json(
        { error: 'each item needs a name and a positive integer qty' },
        { status: 400 }
      );
    }
    items.push({ sku: raw.sku, name: raw.name, qty });
  }

  let scheduledShipDate: Date | null = null;
  if (scheduledShipRaw) {
    const d = new Date(scheduledShipRaw);
    if (Number.isNaN(d.getTime())) {
      return NextResponse.json({ error: 'scheduled_ship_date is not a valid date' }, { status: 400 });
    }
    scheduledShipDate = d;
  }

  // Idempotency: return the already-created replacement if this key was used.
  const existing = await prisma.order.findFirst({
    where: { sourceIdempotencyKey: idempotencyKey },
    select: { id: true, orderNumber: true },
  });
  if (existing) {
    return NextResponse.json({
      ok: true,
      already_created: true,
      order_number: existing.orderNumber,
      order_id: existing.id,
    });
  }

  // Pull customer + shipping snapshot from the original order.
  const original = await prisma.order.findFirst({
    where: { orderNumber: originalOrderNumber },
    select: {
      customerId: true,
      email: true,
      shippingName: true,
      shippingAddress1: true,
      shippingAddress2: true,
      shippingCity: true,
      shippingState: true,
      shippingZip: true,
      shippingCountry: true,
      shippingPhone: true,
    },
  });
  if (!original) {
    return NextResponse.json({ error: 'original order not found' }, { status: 404 });
  }

  const orderNumber = `LST-${Date.now().toString().slice(-6)}${Math.random()
    .toString(36)
    .substring(2, 4)
    .toUpperCase()}`;

  let order;
  try {
    order = await prisma.order.create({
      data: {
        id: randomUUID(),
        orderNumber,
        customerId: original.customerId,
        email: original.email,
        // Comp: no charge, but SUCCEEDED + PROCESSING so it hits the queue.
        stripePaymentId: null,
        paymentStatus: 'SUCCEEDED',
        status: 'PROCESSING',
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0,
        scheduledShipDate,
        replacementOfOrderNumber: originalOrderNumber,
        sourceIdempotencyKey: idempotencyKey,
        shippingName: original.shippingName,
        shippingAddress1: original.shippingAddress1,
        shippingAddress2: original.shippingAddress2,
        shippingCity: original.shippingCity,
        shippingState: original.shippingState,
        shippingZip: original.shippingZip,
        shippingCountry: original.shippingCountry,
        shippingPhone: original.shippingPhone,
        updatedAt: new Date(),
        OrderItem: {
          create: items.map((item) => ({
            id: randomUUID(),
            sku: item.sku || null,
            name: item.name,
            quantity: item.qty,
            price: 0, // comp
          })),
        },
      },
      select: { id: true, orderNumber: true },
    });
  } catch (e) {
    // Unique-key race: another concurrent call created it first.
    const dup = await prisma.order.findFirst({
      where: { sourceIdempotencyKey: idempotencyKey },
      select: { id: true, orderNumber: true },
    });
    if (dup) {
      return NextResponse.json({
        ok: true,
        already_created: true,
        order_number: dup.orderNumber,
        order_id: dup.id,
      });
    }
    console.error('[internal/replacement-orders] create failed:', e);
    return NextResponse.json({ error: 'create_failed' }, { status: 502 });
  }

  console.log(
    `[internal/replacement-orders] created ${order.orderNumber} replacing ${originalOrderNumber}` +
      (scheduledShipDate ? ` (ship ${scheduledShipDate.toISOString().slice(0, 10)})` : '') +
      (reason ? ` — ${reason}` : '')
  );

  return NextResponse.json({
    ok: true,
    order_number: order.orderNumber,
    order_id: order.id,
  });
}
