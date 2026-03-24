# Admin Overhaul: Nav, Inventory UX, Analytics & COGS

**Date:** 2026-03-24
**Status:** Approved

## Overview

Three-part overhaul of the admin section:
1. Consolidate nav into grouped dropdowns (10 items → 4 groups + 2 standalone)
2. Improve inventory page usability
3. Add full analytics page with COGS, margins, shipping costs, growth metrics, and predictions

## Section 1: Admin Nav Redesign

Current nav has 10 flat top-level items. New grouping:

| Nav Item | Type | Children |
|----------|------|----------|
| Dashboard | Standalone link | — |
| Orders | Dropdown | Orders, Fulfillment, Inventory |
| Customers | Dropdown | Subscriptions, Wholesale, Feedback, Spin Leads |
| Marketing | Dropdown | Marketing, Discounts |
| Analytics | Standalone link | — |

Click dropdown label to toggle. Click outside to close. Active state highlights parent when any child is active. Mobile: collapsible hamburger with grouped sections.

## Section 2: Schema Change + Shipping Data Import

### Prisma Migration
Add `shippingCost Int? @default(0)` to Order model. Nullable so existing records stay valid.

### Shipping Data Import
One-time Node.js script:
1. Read Pirate Ship XLSX (`/Users/matthewrundle/Downloads/Transactions.xlsx`)
2. Extract Label rows (customer name + cost)
3. Match to orders by name + closest date for duplicates
4. Handle known typos (Phew → Plew)
5. Update `shippingCost` on matched orders (42/53 matched = 79%)
6. Log unmatched for manual review

### COGS Calculation
Derived from product catalog: `cost = retail_price / 4` (4x markup). No DB field needed.

## Section 3: Inventory Page Improvements

- Pickup Schedule section open by default
- Add "Download Shopping List" button (reuse fulfillment pattern)
- Combine confirmed + projected into single "Total to Buy" column with breakdown tooltip
- Color-code growth trend (green positive, red negative)
- Wider bar chart with better readability

## Section 4: Analytics Page (`/admin/analytics`)

### A. Revenue Overview (top cards)
- Total Revenue (all time + this month)
- Total Orders (all time + this month)
- Average Order Value
- Gross Margin % (after COGS + shipping)

### B. Profitability Breakdown
- Per-product table: Revenue, COGS (price/4), Units Sold, Gross Profit, Margin %
- Per-order breakdown: Revenue - COGS - Shipping = Net Profit
- Monthly P&L summary: Revenue | COGS | Shipping | Gross Profit | Margin %

### C. Growth Analytics (charts)
- Monthly revenue trend (bar chart)
- Monthly order count trend (line overlay)
- Average order value trend
- Customer acquisition: new vs repeat per month

### D. Customer Insights
- Top customers by revenue + order count
- Repeat purchase rate (% customers who ordered 2+)
- Average time between repeat orders

### E. Predictive / Forward-Looking
- Revenue forecast (next 4 weeks via WMA + growth factor from existing forecast engine)
- Projected monthly revenue at current growth rate
- Order minimum analysis: distribution by size with margin per bucket

### F. Shipping Cost Analysis
- Average shipping cost per order
- Shipping as % of revenue
- Shipping cost by order size bucket
- Pirate Ship CSV/XLSX upload for importing future shipping data

## Key Data Points

- 52 succeeded orders (Jan-Mar 2026)
- 53 Pirate Ship labels, $593.71 total shipping spend
- Avg shipping cost: $11.20/order
- 4x markup on all products (COGS = 25% of retail)
- Growth: 9 → 13 → 30 orders/month (Jan → Feb → Mar)
- 63.5% of orders are $40-59 range
- Avg order value: ~$53

## Files to Create
- `app/admin/analytics/page.tsx` — analytics page
- `app/api/admin/analytics/route.ts` — analytics API
- `scripts/import-shipping-costs.ts` — one-time import script
- Prisma migration for shippingCost field

## Files to Modify
- `app/admin/layout.tsx` — nav redesign with dropdowns
- `app/admin/inventory/page.tsx` — UX improvements
- `prisma/schema.prisma` — add shippingCost to Order
