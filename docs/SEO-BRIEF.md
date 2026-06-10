# Lone Star Tortillas — SEO & Content Brief

> Handoff from the quadbot project (shut down June 2026). Everything below is grounded in real
> Google Search Console data collected through June 9, 2026. Drop this file into the
> lonestartortillas.com repo (e.g. `docs/SEO-BRIEF.md`) or merge into its CLAUDE.md so any Claude
> session working on the site has this context.

## Where the site stands (June 2026 baseline)

~23 clicks and ~1,100 impressions per week from organic search. Small but high-intent: the business
is "authentic H-E-B tortillas shipped nationwide," and the search data confirms that exact demand
exists and is underserved.

## Theme: own the "H-E-B tortillas shipped" niche

### 1. Protect the crown jewels (already winning — don't break these)
Shipping-intent queries rank #1 with exceptional CTR:
- "heb tortillas shipped" — 21.4% CTR, position 1.07
- "h-e-b tortillas shipped" — 40% CTR, position 1.0
- "does heb ship out of state" — position 1.02 (plus variants "will heb ship…", "does heb deliver…")

These are bottom-of-funnel buyers. Actions: build one definitive **H-E-B shipping FAQ page**
answering every variant in one authoritative resource; keep delivery promise ("2–4 day delivery,
all 50 states") in title tags and meta descriptions; add shipping/delivery schema markup.

### 2. The single biggest opportunity: "heb tortillas"
501 impressions/week, position 10.5 (page 2), 0.2% CTR, ~1 click. This is the highest-volume query
in the dataset and it's exactly what the store sells. Action: a dedicated **H-E-B tortillas category
page** — all varieties (butter, flour, corn, whole grain), sizes, availability, product schema for
SERP features, internal links from every blog post. Page 1 at even 1% CTR ≈ 5–10x the clicks.

### 3. Content pillars (queries already ranking, CTR near zero)
- **Tortilla size guide** — "tortilla sizes" (251 impr., ranks ~2 at times), "flour tortilla sizes",
  "8 inch tortilla size", "street taco tortilla size". One visual guide: 6"/8"/10"/12" with use
  cases (tacos vs burritos vs quesadillas), linked to products by size.
- **Health & nutrition hub** — "are tortillas healthy", "are corn tortillas healthy", "are tortillas
  good carbs", "are tortillas bad for you" (combined thousands of impressions, ~0–1% CTR; "are
  corn tortillas healthy" alone: 112 impressions, 0 clicks). Honest nutrition content, comparison
  tables, nutrition-facts schema. New emerging queries to fold in: "are tortillas high in calories",
  "do flour tortillas make you gain weight".
- **Corn vs flour comparison** — taste, nutrition, use cases; feeds both pillars above.

Internal-link every pillar page to relevant product pages — these are consideration-phase searches
that precede purchase.

### 4. Brand health (watch, don't over-engineer)
"lone star tortillas" branded clicks grew +300% in early June with 44% CTR, but brand-query position
has been volatile all spring (multiple drops flagged Apr 8–12). Keep homepage title/H1 exact-match on
"Lone Star Tortillas"; check brand queries monthly.

### 5. Emerging signals
- Geographic demand: "heb los angeles", "will heb ship out of state" — out-of-market demand is the
  entire business thesis; consider state/city landing content if volume grows.
- Generic "heb" query (110 impressions) dropped out of tracking in June — worth a look.

## Operating model (replaces quadbot)

Monthly, human-in-the-loop, no standing infrastructure:
1. Pull last-30-days GSC data (queries + pages) for lonestartortillas.com.
2. Claude compares vs prior month on the ~15 money queries above and proposes 3–5 actions.
3. Human approves; changes ship as PRs (the quadbot repo's `apps/web/lib/github-cms.ts` is a working
   blog-post-as-PR pipeline with AI hero images if you want to reuse it).
4. Request indexing in GSC for every new/changed page.

Cadence: 1–2 blog posts/month from the pillars; meta/title updates as data warrants.

## Content guardrails
Food & beverage; emphasize authenticity ("independent reseller of genuine H-E-B tortillas, Austin
TX, since 2020") — never imply being H-E-B. No tragedy/disaster exploitation, no crime/violence,
no political controversy. Audience: Texas expats, families wanting H-E-B quality outside Texas,
food trucks/restaurants, military.

## References
- Raw GSC-derived history: `docs/archive/recommendations.csv` + `metric_snapshots.csv` in the quadbot repo
- Earlier manual plan: `lone-star-seo-plan.md` (quadbot repo root, Mar 2026 — largely still valid)
