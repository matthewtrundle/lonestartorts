# Admin Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign admin nav with dropdowns, add shippingCost to Order model with Pirate Ship data import, improve inventory UX, and build a full analytics page with COGS/margin/growth tracking.

**Architecture:** Four independent workstreams: (1) nav redesign in layout.tsx, (2) schema migration + data import script, (3) inventory page UX polish, (4) analytics API + page. The analytics page depends on the schema migration completing first.

**Tech Stack:** Next.js App Router, Prisma (Neon PostgreSQL), TypeScript, Tailwind CSS, Lucide icons, inline SVG charts (no chart library).

**Design doc:** `docs/plans/2026-03-24-admin-overhaul-analytics-design.md`

---

### Task 1: Admin Nav Redesign with Dropdowns

**Files:**
- Modify: `app/admin/layout.tsx`

**Step 1: Replace flat navItems with grouped nav structure**

Replace the `navItems` array (lines 61-72) and the nav rendering (lines 88-109) with a dropdown-based navigation. The new structure groups items:

```tsx
type NavItem = { href: string; label: string; exact?: boolean };
type NavGroup = { label: string; children: NavItem[] };
type NavEntry = NavItem | NavGroup;

const navEntries: NavEntry[] = [
  { href: '/admin', label: 'Dashboard', exact: true },
  {
    label: 'Orders',
    children: [
      { href: '/admin/orders', label: 'Orders' },
      { href: '/admin/fulfillment', label: 'Fulfillment' },
      { href: '/admin/inventory', label: 'Inventory' },
    ],
  },
  {
    label: 'Customers',
    children: [
      { href: '/admin/subscriptions', label: 'Subscriptions' },
      { href: '/admin/wholesale', label: 'Wholesale' },
      { href: '/admin/feedback', label: 'Feedback' },
      { href: '/admin/spin-leads', label: 'Spin Leads' },
    ],
  },
  {
    label: 'Marketing',
    children: [
      { href: '/admin/marketing', label: 'Campaigns' },
      { href: '/admin/discounts', label: 'Discounts' },
    ],
  },
  { href: '/admin/analytics', label: 'Analytics' },
];
```

Add state for open dropdown: `const [openDropdown, setOpenDropdown] = useState<string | null>(null);`

Add click-outside handler to close dropdowns.

For each NavGroup, render a button that toggles the dropdown. Highlight the parent when any child route is active. Dropdown appears as an absolute-positioned panel below the button with the same styling as current nav items.

For mobile (below `md` breakpoint), add a hamburger menu toggle that shows all items in a slide-down panel with group headers.

**Step 2: Verify navigation works**

Run: `npx tsc --noEmit`
Expected: Clean build

Verify in browser: all dropdown groups open/close, links navigate correctly, active states work.

**Step 3: Commit**

```bash
git add app/admin/layout.tsx
git commit -m "feat: redesign admin nav with grouped dropdowns"
```

---

### Task 2: Add shippingCost to Order Schema

**Files:**
- Modify: `prisma/schema.prisma` (Order model, around line 166)
- Create: Prisma migration

**Step 1: Add shippingCost field to Order model**

Add this line after `labelUrl` (line 166) in the Order model:

```prisma
  shippingCost     Int?
```

This is the actual cost paid to ship (from Pirate Ship), distinct from the existing `shipping` field which is what the customer was charged (always 0 since free shipping).

**Step 2: Generate and run migration**

Run: `npx prisma migrate dev --name add-shipping-cost`
Expected: Migration creates successfully, applies to dev database.

Then run: `npx prisma generate`
Expected: Prisma client regenerated.

**Step 3: Verify**

Run: `npx tsc --noEmit`
Expected: Clean build.

**Step 4: Commit**

```bash
git add prisma/schema.prisma prisma/migrations/
git commit -m "feat: add shippingCost field to Order model"
```

---

### Task 3: Import Pirate Ship Shipping Costs

**Files:**
- Create: `scripts/import-shipping-costs.ts`

**Step 1: Write the import script**

The script reads `/Users/matthewrundle/Downloads/Transactions.xlsx`, extracts Label rows (customer name + cost), and matches them to orders by name + closest date for duplicates.

```ts
// scripts/import-shipping-costs.ts
// Run with: npx tsx scripts/import-shipping-costs.ts

import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();

interface LabelRow {
  customerName: string;
  shippingCost: number; // in cents
  date: Date;
}

// Known typo corrections in Pirate Ship data
const NAME_CORRECTIONS: Record<string, string> = {
  'Desiree Phew': 'Desiree Plew',
};

async function main() {
  // 1. Read XLSX
  const workbook = XLSX.readFile('/Users/matthewrundle/Downloads/Transactions.xlsx');
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<{ Date: string; Type: string; Description: string; Total: number }>(sheet);

  // 2. Extract label rows
  const labels: LabelRow[] = rows
    .filter((r) => r.Type === 'Label')
    .map((r) => {
      const match = r.Description.match(/^(.+?):\s*\d+\s*Label/);
      let name = match ? match[1].trim() : r.Description;
      name = NAME_CORRECTIONS[name] || name;
      const dateStr = r.Date.replace(/\s+(CDT|CST)$/, '');
      return {
        customerName: name,
        shippingCost: Math.round(Math.abs(r.Total) * 100), // Convert to cents
        date: new Date(dateStr),
      };
    });

  console.log(`Found ${labels.length} shipping labels`);

  // 3. Get all succeeded orders
  const orders = await prisma.order.findMany({
    where: { paymentStatus: 'SUCCEEDED' },
    select: { id: true, orderNumber: true, shippingName: true, createdAt: true, shippingCost: true },
    orderBy: { createdAt: 'desc' },
  });

  // 4. Match by name + closest date
  const normalize = (s: string) => s.toLowerCase().trim().replace(/\s+/g, ' ');
  const usedOrderIds = new Set<string>();
  let matched = 0;
  let skipped = 0;
  const unmatched: string[] = [];

  for (const label of labels) {
    const labelName = normalize(label.customerName);

    // Find matching orders by name
    const nameMatches = orders.filter((o) => {
      if (usedOrderIds.has(o.id)) return false;
      const orderName = normalize(o.shippingName || '');
      if (labelName === orderName) return true;
      // Partial match: last names match and at least one first name part matches
      const labelParts = labelName.split(' ');
      const orderParts = orderName.split(' ');
      if (labelParts.length > 0 && orderParts.length > 0) {
        if (labelParts[labelParts.length - 1] === orderParts[orderParts.length - 1]) {
          const overlap = new Set([...labelParts].filter((p) => orderParts.includes(p)));
          if (overlap.size >= 2) return true;
        }
      }
      return false;
    });

    if (nameMatches.length === 0) {
      unmatched.push(`${label.customerName} ($${(label.shippingCost / 100).toFixed(2)}) - ${label.date.toISOString().split('T')[0]}`);
      continue;
    }

    // Pick the order closest in date to the label
    const best = nameMatches.reduce((a, b) => {
      const diffA = Math.abs(a.createdAt.getTime() - label.date.getTime());
      const diffB = Math.abs(b.createdAt.getTime() - label.date.getTime());
      return diffA <= diffB ? a : b;
    });

    if (best.shippingCost && best.shippingCost > 0) {
      console.log(`  SKIP (already has cost): ${best.orderNumber} ${best.shippingName}`);
      skipped++;
      continue;
    }

    await prisma.order.update({
      where: { id: best.id },
      data: { shippingCost: label.shippingCost },
    });
    usedOrderIds.add(best.id);
    matched++;
    console.log(`  MATCHED: ${label.customerName} -> ${best.orderNumber} (${best.shippingName}) = $${(label.shippingCost / 100).toFixed(2)}`);
  }

  console.log(`\nResults: ${matched} matched, ${skipped} skipped, ${unmatched.length} unmatched`);
  if (unmatched.length > 0) {
    console.log('\nUnmatched labels:');
    unmatched.forEach((u) => console.log(`  ${u}`));
  }

  await prisma.$disconnect();
}

main().catch(console.error);
```

**Step 2: Install xlsx dependency if needed**

Run: `npm ls xlsx 2>/dev/null || npm install xlsx`

**Step 3: Run the import script**

Run: `npx tsx scripts/import-shipping-costs.ts`
Expected: ~42 matched, ~11 unmatched (those are orders not in DB or cancelled).

**Step 4: Verify data was imported**

Run a quick check via node:
```bash
node -e "const{PrismaClient}=require('@prisma/client');const p=new PrismaClient();p.order.findMany({where:{shippingCost:{not:null,gt:0}},select:{orderNumber:true,shippingName:true,shippingCost:true}}).then(r=>{console.log(r.length+' orders with shipping cost');r.forEach(o=>console.log(o.orderNumber,o.shippingName,'$'+(o.shippingCost/100).toFixed(2)));p.\$disconnect()})"
```

**Step 5: Commit**

```bash
git add scripts/import-shipping-costs.ts package.json package-lock.json
git commit -m "feat: add Pirate Ship shipping cost import script and backfill data"
```

---

### Task 4: Inventory Page UX Improvements

**Files:**
- Modify: `app/admin/inventory/page.tsx`

**Step 1: Add Download Shopping List button**

Add a `ClipboardList` import from lucide-react. Add a download button next to the Pickup Schedule header (same pattern as fulfillment page lines 333-339). The handler generates a CSV with: Product, Confirmed, Projected, Total to Buy, HEB Limit, HEB Orders Needed, Storage Type.

**Step 2: Color-code the growth trend**

In the Growth Trend summary card (around line 189), change the text color based on value:
- `data.growthTrend > 0` → `text-green-600`
- `data.growthTrend < 0` → `text-red-600`
- `data.growthTrend === 0` → `text-charcoal-600`

**Step 3: Make bar chart wider and more readable**

In `WeeklyTrendChart`, increase `barWidth` from 40 to 48, increase `chartHeight` from 160 to 200. Make the SVG responsive by wrapping in a div with `min-w-0` and setting SVG `width="100%"` with a `preserveAspectRatio`.

**Step 4: Verify and commit**

Run: `npx tsc --noEmit`

```bash
git add app/admin/inventory/page.tsx
git commit -m "feat: improve inventory page UX — shopping list download, chart sizing, growth colors"
```

---

### Task 5: Analytics API Endpoint

**Files:**
- Create: `app/api/admin/analytics/route.ts`

**Step 1: Create the analytics API**

Auth: `isAuthenticated()` (same as all admin routes).

The endpoint runs multiple Prisma queries in parallel and returns comprehensive analytics data:

```ts
// Queries needed:
// 1. All succeeded orders with items (for revenue, COGS, per-product breakdown)
// 2. Monthly aggregations (revenue, order count, avg order value)
// 3. Customer data (repeat rates, top customers)
// 4. Shipping cost data (from the new shippingCost field)
// 5. Order size distribution (for minimum analysis)

// COGS calculation:
// Import products from '@/lib/products'
// For each OrderItem, find matching product by name/SKU
// cost = product.price / 4 (the 4x markup)
// If no product match (discontinued/custom), estimate at 25% of price

// Response shape:
{
  overview: {
    totalRevenue, thisMonthRevenue, totalOrders, thisMonthOrders,
    avgOrderValue, grossMarginPct
  },
  monthlyPnL: [{
    month, revenue, cogs, shippingCost, grossProfit, marginPct, orderCount, avgOrderValue
  }],
  productBreakdown: [{
    name, unitsSold, revenue, cogs, grossProfit, marginPct
  }],
  customerInsights: {
    totalCustomers, repeatCustomers, repeatRate, avgTimeBetweenOrders,
    topCustomers: [{ name, email, orderCount, totalSpent, firstOrder, lastOrder }]
  },
  growthMetrics: {
    monthlyTrend: [{ month, orders, revenue }],
    newVsRepeat: [{ month, newCustomers, repeatCustomers }],
    forecast: { next4WeeksOrders, next4WeeksRevenue, projectedMonthlyRevenue }
  },
  shippingAnalysis: {
    avgShippingCost, shippingAsPctRevenue, totalShippingSpend,
    byOrderSize: [{ range, avgShipping, orderCount }]
  },
  orderSizeDistribution: [{
    range, orderCount, avgTotal, totalRevenue, avgMargin
  }]
}
```

Use the existing forecast engine (`lib/inventory/forecast.ts`) for the predictive metrics — import `aggregateWeeklyDemand`, `calculateGrowthFactor`, `calculateWMA`.

**Step 2: Verify**

Run: `npx tsc --noEmit`
Test: `curl http://localhost:3000/api/admin/analytics` (with auth cookie)

**Step 3: Commit**

```bash
git add app/api/admin/analytics/route.ts
git commit -m "feat: add analytics API with COGS, margins, growth, and shipping data"
```

---

### Task 6: Analytics Page — Overview + Monthly P&L

**Files:**
- Create: `app/admin/analytics/page.tsx`

**Step 1: Create the analytics page shell**

Client component. Fetch `/api/admin/analytics` on mount. Show loading spinner (same pattern as inventory/fulfillment pages).

Build out sections:

**Overview cards** (same 4-column grid pattern):
- Total Revenue (all time) with this-month subtitle
- Total Orders with this-month subtitle
- Avg Order Value
- Gross Margin %

**Monthly P&L table:**
- Columns: Month | Revenue | COGS | Shipping | Gross Profit | Margin % | Orders | AOV
- Rows: one per month, sorted newest first
- Summary row at bottom with totals
- Color: margin % green if >50%, amber if 30-50%, red if <30%

**Step 2: Verify and commit**

```bash
git add app/admin/analytics/page.tsx
git commit -m "feat: add analytics page with overview cards and monthly P&L"
```

---

### Task 7: Analytics Page — Product Breakdown + Customer Insights

**Files:**
- Modify: `app/admin/analytics/page.tsx`

**Step 1: Add Product Profitability section**

Table with columns: Product | Units Sold | Revenue | COGS | Gross Profit | Margin %
Sorted by revenue descending. Rows with margin <40% get amber highlight.

**Step 2: Add Customer Insights section**

Two-column layout:
- Left: Key metrics cards — Total Customers, Repeat Rate %, Avg Days Between Orders
- Right: Top 10 Customers table — Name | Orders | Total Spent | First Order | Last Order

**Step 3: Verify and commit**

```bash
git add app/admin/analytics/page.tsx
git commit -m "feat: add product profitability and customer insights to analytics"
```

---

### Task 8: Analytics Page — Growth Charts + Predictions

**Files:**
- Modify: `app/admin/analytics/page.tsx`

**Step 1: Add Monthly Revenue/Orders trend chart**

Inline SVG bar chart (same pattern as inventory's WeeklyTrendChart). Bars show monthly revenue, line overlay shows order count. X-axis: month labels. Y-axis: revenue amounts.

**Step 2: Add New vs Repeat customers chart**

Stacked bar chart: green for new customers, blue for repeat, per month.

**Step 3: Add Predictions section**

Cards showing:
- Forecast: Next 4 weeks projected orders + revenue
- Projected monthly run rate at current growth
- Order size distribution with margin per bucket (for minimum order analysis)

**Step 4: Add Shipping Cost Analysis section**

Cards: Avg Shipping Cost | Shipping as % of Revenue | Total Shipping Spend
Table: shipping cost by order size bucket

**Step 5: Verify and commit**

```bash
git add app/admin/analytics/page.tsx
git commit -m "feat: add growth charts, predictions, and shipping analysis to analytics"
```

---

### Task 9: Pirate Ship Upload on Analytics Page

**Files:**
- Modify: `app/admin/analytics/page.tsx`
- Create: `app/api/admin/analytics/import-shipping/route.ts`

**Step 1: Add upload API endpoint**

POST endpoint that accepts an XLSX file upload. Parses it the same way as the import script (Task 3), matches labels to orders, updates shippingCost. Returns match results.

**Step 2: Add upload UI to Shipping Analysis section**

A file input + import button (same pattern as fulfillment's import tracking modal). Shows preview of how many labels found, then results after import.

**Step 3: Verify and commit**

```bash
git add app/api/admin/analytics/import-shipping/route.ts app/admin/analytics/page.tsx
git commit -m "feat: add Pirate Ship XLSX upload for shipping cost import"
```

---

### Task 10: Final Build Verification

**Step 1: TypeScript check**

Run: `npx tsc --noEmit`
Expected: Clean build, exit 0.

**Step 2: Visual verification**

Navigate to:
- `/admin` — nav should show grouped dropdowns
- `/admin/inventory` — improved chart, shopping list download, colored growth trend
- `/admin/analytics` — full analytics with all sections populated
- Verify all dropdown nav links work correctly

**Step 3: Commit and push**

```bash
git add -A
git commit -m "feat: complete admin overhaul — nav dropdowns, analytics, COGS tracking"
git push
```

---

## File Summary

### Create:
1. `scripts/import-shipping-costs.ts` — one-time Pirate Ship data import
2. `app/api/admin/analytics/route.ts` — analytics API
3. `app/admin/analytics/page.tsx` — analytics page
4. `app/api/admin/analytics/import-shipping/route.ts` — shipping cost upload API

### Modify:
1. `prisma/schema.prisma` — add `shippingCost Int?` to Order
2. `app/admin/layout.tsx` — dropdown nav
3. `app/admin/inventory/page.tsx` — UX improvements

### Dependencies:
- Task 2 (schema) must complete before Task 3 (import) and Task 5 (analytics API)
- Task 5 (API) must complete before Tasks 6-8 (analytics page)
- Tasks 1 and 4 are independent of everything else
