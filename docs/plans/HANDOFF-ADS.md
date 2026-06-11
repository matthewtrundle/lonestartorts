# Session Handoff — Google Ads + Site State (2026-06-10)

Open a new Claude Code session in `~/Documents/Lonestar/lonestartorts` and say:
"Read docs/plans/HANDOFF-ADS.md and docs/plans/NEXT-ROUND.md, then continue."

## Credentials (paths, not values — read them from disk)

| What | Where |
|---|---|
| Google Ads API (client id/secret, developer token, refresh token, login customer id) | `../google-ads.yaml` (i.e. `~/Documents/Lonestar/google-ads.yaml`) |
| OpenRouter API key (image gen + model panel) | `OPENROUTER_API_KEY` in `.env.local` |
| Anthropic key (Maria chat, local) | `ANTHROPIC_API_KEY` in shell env — NOT in .env.local; **must be added to Vercel env for prod chat** |
| Database | `DATABASE_URL` in `.env.local` |
| Stripe (local = TEST sandbox; prod lives in Vercel under a different account) | `.env.local` |

Working query/mutation pattern: node + `google-ads-api` package (installed in lonestartorts), parse the yaml manually, `client.Customer({ customer_id, login_customer_id, refresh_token })`. See memory + this doc's history for examples.

## Google Ads accounts

**Lonestar Tortillas** — customer `3549988184`, campaign `23367228376` ("Lone Star Tortillas - National"), budget $28/day.
Changes applied 2026-06-10 (multi-model consensus GPT-5.5/Gemini-3.1-Pro/Grok-4.3, all verified live):
- Bidding: Maximize Clicks → **Maximize Conversion Value @ tROAS 300%** (learning period until ~Jun 24 — DO NOT touch before then)
- Desktop -50% bid penalty removed (desktop = 2.85x ROAS); tablet opted out (-100%)
- Exact-match dup "heb tortillas" paused (criterion `195809229808~384944277963`); phrase version stays
Parked until after learning: budget raise toward $80/day (scale 15-20%/wk only if ROAS ≥300%), info-query negatives (recipe/calories/near me), exact-match restructure, "Ships Tuesdays" ad copy test.
Baseline to beat: Apr-Jun ROAS ~2.0x ($1,873 spend → $3,786 value). Breakeven ≈ 2.5-3.3x at 30-40% margin.

**Bloom Psychology North Austin** — customer `7506789001`. All 4 campaigns PAUSED since ~Jan 2026; leave them. Lifetime: ~$5,900 spend, 7 conversions, conversion tracking never worked (value $2 total). Relaunch prerequisites if ever wanted: real conversion tracking on calmnewmom.com, ≥$40-50/day, one geo-tight campaign.

Model panel advice files (if still present): `/tmp/advice-*.md`; raw data `/tmp/ads-data.json`.

## Site state (lonestartorts, main @ ae7fae0)

- All shipped: subscription fulfillment fix (Stripe webhook events still need adding in prod dashboard — see NEXT-ROUND.md), SEO launch, UI overhaul + facelift + 3 refinement rounds, Maria text chat (`/api/maria-chat`, Haiku), bespoke icon set in `components/ui/Icons.tsx` (capital I — case collision hazard with imports).
- Verify discipline: kill :3000 → clean build (364/364) → screenshot at 2000/1440/375 → eyeball every frame → axe → smoke → commit.
- Push dance: `gh auth switch --user matthewtrundle && git push origin main && gh auth switch --user Maht-corelinq`.
- Design rules: `DESIGN.md`. Forward plan: `docs/plans/NEXT-ROUND.md`.

## Standing user-owed items
1. Stripe prod webhook events (invoice.paid etc.) — subscriptions block on this
2. ANTHROPIC_API_KEY → Vercel env (Maria chat in prod)
3. Rotate the two exposed OpenRouter keys (one pasted in chat, one that was committed)
4. Re-pull ads performance ~Jun 24 (post-learning) and decide budget raise
