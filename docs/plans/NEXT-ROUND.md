# Next Round — Post-Overhaul Plan (written 2026-06-10)

Context: commit `7f7cdd5` shipped the site-wide overhaul (subscription fulfillment fix, SEO
launch of 82 city pages, perf/a11y sweep, first-touch order attribution). This file is the
working plan for what comes next. See also `docs/SEO-BRIEF.md` (GSC-grounded SEO strategy).

## 1. Immediate — human checklist (Matt)

- [ ] **Stripe webhook events (deploy-blocking for subscriptions).** Production Stripe
      dashboard → Developers → Webhooks → `lonestartortillas.com/api/webhook` → add:
      `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated`,
      `customer.subscription.deleted`.
- [ ] After Vercel deploys: check the fulfillment queue within 24h — the new
      `/api/cron/subscription-reconcile` (1pm UTC daily) will create catch-up orders for the
      ~6 active subscribers who were charged with no orders since March. Ship them tortillas
      and consider a goodwill email/discount.
- [ ] Run `node scripts/indexnow-submit.mjs` (pings Bing/DDG — where guide traffic actually
      comes from) and resubmit the sitemap in Google Search Console.
- [ ] Eyeball the new 15s hero loop on the homepage. If good, delete
      `public/hero-background_compressed.mp4` (6.3MB original kept for revert).
- [ ] Tablet bid adjustment in Google Ads: -100% (spends ~$17/mo, zero conversions).

## 2. Watch over the next 2–4 weeks (no code)

- GSC: indexing of the 82 newly-launched city pages; position of "heb tortillas"
  (was 10.5, page 2) after the buy-page retargeting; crown-jewel queries stay #1.
- Google Ads: re-pull campaign stats ~2–3 weeks post-deploy. The perf fixes target the
  mobile conversion gap (83% of spend, 1.5x ROAS vs desktop 2.4x). The zero-converting
  "heb tortillas shipped" query should improve with the new guide + faster /shop.
- Attribution data: `Order.landingPath/utmSource/referrer` columns start populating with
  the first post-deploy orders.

## 3. Next coding round (~30 days out, aimed by data)

Run these once attribution data exists — ask Claude: *"query Orders by landingPath/utmSource
and tell me which content/channels actually sell tortillas"*. Then:

- **Content triage by revenue, not views.** Kill or consolidate blog posts with no traffic
  AND no attributed orders (15 of 21 posts have <30 lifetime views; BBQ-story + Kroger
  posts are dead). Consolidate duplicate `/blog/how-to-store-tortillas` vs
  `/guides/how-to-store-tortillas` (301 the blog one).
- **Roll `RelatedProducts` embeds to remaining high-traffic guides** (currently on ~7 of 45).
- **Subscription polish round 2:** skip-next-delivery button, pause-until-date picker,
  renewal reminder email 3 days before billing (reduces churn + surprise charges).
- **Animation library consolidation:** framer-motion + GSAP + Lenis all ship today;
  standardize on framer-motion, delete the other two (~35KB gz savings).
- **a11y regression guard:** `@axe-core/playwright` checks for /, /shop, /checkout,
  /subscribe in CI.
- **Admin API pagination** (spin-leads, inventory, discounts load whole tables) — only
  when admin pages feel slow; intentionally deferred (ship-fast on internal tools).

## 4. Monthly SEO ops loop (from docs/SEO-BRIEF.md)

1. Pull last-30-day GSC queries + pages.
2. Compare vs prior month on the ~15 money queries in the brief.
3. Ship 3–5 actions (title/meta tweaks, 1–2 pillar posts max).
4. Request indexing for changed pages.

Guardrails: never imply being H-E-B (independent reseller, Austin TX); audience is Texas
expats, families, food trucks, military.

## Known good state (for whoever picks this up)

- Build: 361 static pages, tsc clean, sitemap 290 URLs.
- Local `.env.local` Stripe key is a TEST sandbox key — production data is only in the DB
  (DATABASE_URL) and the prod Vercel project (different Vercel account than local CLI).
- Old committed OpenRouter key: dead, already rotated. No action.
- `components/shop/SpinTheWheel.tsx` is dead code (zero importers) but its API/admin
  backend is intact — delete or relaunch deliberately.
