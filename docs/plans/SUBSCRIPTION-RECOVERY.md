# Subscription Recovery Runbook

Recover the **7 RetailSubscriptions stuck in `INCOMPLETE`** (~**$180/mo** of recurring
billing) that were charged in Stripe but never activated locally, then verify the
pipeline is healthy again.

> **Where recovery runs:** PRODUCTION only. The reconcile cron polls Stripe with the
> **live** secret key. Local/preview environments use a **test-mode** Stripe key and
> will not see the live subscriptions, so the recovery steps below must be performed
> against the production deployment.

---

## Root cause

New subscriptions are intentionally created `INCOMPLETE` and only flipped to `ACTIVE`
by the `invoice.paid` webhook, which calls
`ensureOrderForPaidInvoice` (`lib/subscription/order-sync.ts`) to create the
fulfillment Order and then updates the subscription to `ACTIVE`
(`app/api/webhook/route.ts`, ~line 461).

That activation path writes `Order.retailSubscriptionId` to link the order back to the
subscription. The `Order` table was **missing the `retailSubscriptionId` column**, so
the activation write failed and subscriptions never advanced past `INCOMPLETE` — the
customer was charged in Stripe with no fulfillment order created locally.

**The column has been added via migration.** The code path is now correct for *new*
subscriptions. The 7 already-stuck subscriptions still need a one-time backfill, which
is exactly what the daily `subscription-reconcile` cron does — idempotently.

How the cron heals them (`app/api/cron/subscription-reconcile/route.ts`):

1. Loads every `RetailSubscription` with a `stripeSubscriptionId`.
2. Retrieves the live Stripe subscription and syncs `status` (via
   `mapStripeSubStatus`) + billing-period dates.
3. Lists recent invoices and calls `ensureOrderForPaidInvoice` for each paid one.
   That call is **idempotent** — keyed on the invoice payment intent stored as
   `Order.stripePaymentId` — so it never duplicates an order the webhook already made.

---

## Exact production steps

### Step 1 — Confirm the Stripe webhook events are enabled (production)

The reconcile cron is a safety net, but the primary path is the webhook. Confirm the
**production** Stripe endpoint subscribes to all four subscription-lifecycle events,
or stuck subscriptions will keep recurring.

1. Stripe Dashboard -> **Developers -> Webhooks** (ensure you are in **live mode**, not
   test mode — toggle top-right).
2. Open the endpoint pointing at `https://lonestartortillas.com/api/webhook`.
3. Verify these **4 events** are in the "Listening to" list:
   - `invoice.paid`
   - `invoice.payment_failed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. If any are missing, click **Update details -> Select events**, add them, and save.

### Step 2 — Trigger the reconcile cron in production

Route: `GET https://lonestartortillas.com/api/cron/subscription-reconcile`

Auth: the route accepts **either** an `Authorization: Bearer <CRON_SECRET>` header
**or** a `?cron_secret=<CRON_SECRET>` query param (see
`app/api/cron/subscription-reconcile/route.ts`, lines 28-32). `CRON_SECRET` is set in
the Vercel production environment variables (and is also the value Vercel Cron uses for
its scheduled `0 13 * * *` daily run defined in `vercel.json`).

Manual trigger (header form — preferred, keeps the secret out of URLs/logs):

```bash
curl -sS https://lonestartortillas.com/api/cron/subscription-reconcile \
  -H "Authorization: Bearer $CRON_SECRET" | jq
```

> Pull `CRON_SECRET` from Vercel (do not paste it into source/chat):
> `vercel env pull` or copy it from Vercel -> Project -> Settings -> Environment
> Variables -> `CRON_SECRET` (Production). Export it into your shell as `CRON_SECRET`
> before running the curl above.

Expected response (JSON): `{ checked, ordersCreated, results }`.

- `checked` should be the number of subscriptions with a Stripe id.
- `ordersCreated` > 0 means the safety net caught missed invoices — for the 7 stuck
  subs this should be > 0 on the first run, then `0` on subsequent runs (idempotent).
- Each `results[]` entry reports `statusSynced` (e.g. `INCOMPLETE -> ACTIVE`) and any
  `ordersCreated` order numbers.

If you prefer not to trigger manually, you can also wait for the scheduled daily run
(`0 13 * * *` UTC) or re-run it from the Vercel dashboard under **Crons**.

### Step 3 — Verify recovery

Run the read-only health script against the **production** database:

```bash
node scripts/subscription-health.js
```

(Set `DATABASE_URL` to the production Neon URL — it is already the value in
`.env.local`. The script performs **no writes**.)

Confirm:

- **RECOVERY CANDIDATES** section reports `None — no stuck subscriptions.`
  (Before recovery it lists the 7 `INCOMPLETE` subs and the ~$180/mo at stake.)
- **COUNT BY STATUS** shows the 7 moved out of `INCOMPLETE` (into `ACTIVE`, or
  `PAST_DUE`/`CANCELLED` if Stripe reports those — all are valid, non-stuck states).
- **Orders linked via retailSubscriptionId** increased by the number of paid invoices
  that were backfilled (matches `ordersCreated` from Step 2).

Spot-check one recovered subscription in the Stripe Dashboard and confirm a matching
`PROCESSING` Order now exists for its latest paid invoice.

---

## Rollback / safety notes

- The reconcile cron and `ensureOrderForPaidInvoice` only **create missing** orders and
  **sync** subscription status/dates. They do not delete or refund anything, and order
  creation is idempotent (keyed on `Order.stripePaymentId`). Re-running is safe.
- If `ordersCreated` stays > 0 across repeated runs for the same subscriptions,
  investigate the webhook endpoint's enabled events (Step 1) — the safety net is
  compensating for events the webhook keeps missing.
