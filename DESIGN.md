# Lonestar Tortillas — Design System Rules

The brand: warm Texas editorial. Cream paper, sunset orange, masa tan, charcoal ink,
Playfair Display headlines over Inter body. Confident, not theatrical.

## Color

| Token | Role |
|---|---|
| `cream-50/100/200` | Page + card backgrounds (light) |
| `charcoal-950` | Dark sections, page-header bands, footer |
| `charcoal-600/700/800` | Body text on light backgrounds (never `gray-*` — migrate on touch) |
| `sunset-600` | Primary CTA, links, brand accents (`sunset-700` for small text on light bg) |
| `rust-600` | Secondary warm accent; gradient starts (`from-rust-600 to-sunset-600`) |
| `masa-*` | Earthy fills, soft section tints |
| `lime-*` | Sparingly: freshness/eco accents only |
| `primary` / `ring` / `accent` | Semantic aliases for shadcn primitives only — don't use in page code |

## Typography

- **h1**: `font-display text-5xl md:text-6xl` (Playfair) + optional eyebrow
- **h2**: `font-display text-3xl md:text-4xl` (Playfair)
- **h3 and below**: Inter — `font-semibold text-xl` (serif gets muddy small)
- **Eyebrow**: `text-sm font-bold uppercase tracking-widest text-sunset-600`
- **Body**: `text-base/lg text-charcoal-600`
- Use `text-balance` on hero headings.
- No emoji in headings, buttons, navigation, or trust bars. Sparing, deliberate emoji
  in body copy only.

## Radius

pill = `rounded-full` · buttons/inputs = `rounded-lg` · cards = `rounded-xl` ·
modals/hero media = `rounded-2xl`

## Shadows

Use the custom scale: `shadow-subtle` (borders+), `shadow-soft` (cards),
`shadow-medium` (raised cards/popovers), `shadow-large` (modals/hero media).
Avoid stock `shadow-md/lg/2xl` in new code.

## Canonical gradients (the only six)

1. Page wrapper: `bg-gradient-to-b from-cream-50 to-masa-50`
2. Page-header band: `bg-charcoal-950` (+ at most ONE warm radial accent)
3. CTA banner: `bg-gradient-to-r from-rust-600 to-sunset-600`
4. `bg-sunset-gradient` (config token) — hero/promotional fills
5. `bg-masa-gradient` (config token) — earthy section fills
6. `bg-smoke-gradient` (config token) — image legibility overlay

Anything else needs a reason. Never stack more than two gradient layers.

## Motion

One entrance: fade + 12px rise, 0.5s, `ease-premium`. Stagger children in grids.
Nothing loops infinitely except the homepage hero video. Always honor
`prefers-reduced-motion` (global kill-switch lives in globals.css).

## Components (use these, don't re-stamp markup)

- `components/ui/SectionHeader` — eyebrow + Playfair h2 + sub
- `components/ui/PageHero` — charcoal page-header band (h1, breadcrumbs, CTA slots)
- `components/ui/CTABanner` + `lib/cta-copy.ts` — bottom-of-page CTA (variant-keyed copy)
- `components/ui/QuickAnswer` — sunset left-border callout
- `components/ui/FAQAccordion` — styled native `<details>` (SEO/no-JS safe)
- `components/ui/StepList` — numbered steps
- Icons: **lucide-react only.** No hand-inlined SVG icons in new code.
