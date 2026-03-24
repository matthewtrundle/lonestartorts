'use client';

import { useEffect, useState } from 'react';
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
  BarChart3,
  Repeat,
  Clock,
  ChevronDown,
  ChevronRight,
  Truck,
  Package,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Overview {
  totalRevenue: number;
  thisMonthRevenue: number;
  totalOrders: number;
  thisMonthOrders: number;
  avgOrderValue: number;
  grossMarginPct: number;
}

interface MonthlyPnLRow {
  month: string;
  revenue: number;
  cogs: number;
  shippingCost: number;
  grossProfit: number;
  marginPct: number;
  orderCount: number;
  avgOrderValue: number;
}

interface ProductRow {
  name: string;
  sku: string;
  unitsSold: number;
  revenue: number;
  cogs: number;
  grossProfit: number;
  marginPct: number;
}

interface TopCustomer {
  name: string;
  email: string;
  orderCount: number;
  totalSpent: number;
  firstOrder: string;
  lastOrder: string;
}

interface CustomerInsights {
  totalCustomers: number;
  repeatCustomers: number;
  repeatRate: number;
  avgDaysBetweenOrders: number | null;
  topCustomers: TopCustomer[];
}

interface MonthlyTrend {
  month: string;
  orders: number;
  revenue: number;
}

interface NewVsRepeat {
  month: string;
  newCustomers: number;
  repeatCustomers: number;
}

interface GrowthMetrics {
  monthlyTrend: MonthlyTrend[];
  newVsRepeat: NewVsRepeat[];
  forecast: {
    next4WeeksOrders: number;
    next4WeeksRevenue: number;
    projectedMonthlyRevenue: number;
  };
}

interface ShippingBySize {
  range: string;
  avgShipping: number;
  orderCount: number;
}

interface ShippingAnalysis {
  avgShippingCost: number;
  shippingAsPctRevenue: number;
  totalShippingSpend: number;
  ordersWithShippingData: number;
  byOrderSize: ShippingBySize[];
}

interface OrderSizeDist {
  range: string;
  orderCount: number;
  avgTotal: number;
  totalRevenue: number;
  avgCogs: number;
  avgMarginPct: number;
}

interface AnalyticsData {
  overview: Overview;
  monthlyPnL: MonthlyPnLRow[];
  productBreakdown: ProductRow[];
  customerInsights: CustomerInsights;
  growthMetrics: GrowthMetrics;
  shippingAnalysis: ShippingAnalysis;
  orderSizeDistribution: OrderSizeDist[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (cents: number) =>
  '$' +
  (cents / 100).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

function formatMonth(ym: string): string {
  const [y, m] = ym.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(m, 10) - 1]} ${y}`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function marginColor(pct: number): string {
  if (pct > 50) return 'text-green-600';
  if (pct >= 30) return 'text-amber-600';
  return 'text-red-600';
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [orderSizeOpen, setOrderSizeOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/analytics');
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunset-600 mx-auto mb-4" />
          <p className="text-charcoal-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12 text-charcoal-500">
        Failed to load analytics data. Please refresh.
      </div>
    );
  }

  const { overview, monthlyPnL, productBreakdown, customerInsights, growthMetrics, shippingAnalysis, orderSizeDistribution } = data;

  // Compute growth % from monthly trend
  const trend = growthMetrics.monthlyTrend;
  let growthPct = 0;
  if (trend.length >= 2) {
    const prev = trend[trend.length - 2].revenue;
    const curr = trend[trend.length - 1].revenue;
    if (prev > 0) growthPct = Math.round(((curr - prev) / prev) * 100);
  }

  // P&L totals row
  const pnlTotals = monthlyPnL.reduce(
    (acc, row) => ({
      revenue: acc.revenue + row.revenue,
      cogs: acc.cogs + row.cogs,
      shippingCost: acc.shippingCost + row.shippingCost,
      grossProfit: acc.grossProfit + row.grossProfit,
      orderCount: acc.orderCount + row.orderCount,
    }),
    { revenue: 0, cogs: 0, shippingCost: 0, grossProfit: 0, orderCount: 0 }
  );
  const pnlTotalMargin = pnlTotals.revenue > 0 ? Math.round((pnlTotals.grossProfit / pnlTotals.revenue) * 1000) / 10 : 0;
  const pnlTotalAOV = pnlTotals.orderCount > 0 ? Math.round(pnlTotals.revenue / pnlTotals.orderCount) : 0;

  // Order size: find most common bucket
  const maxBucketCount = Math.max(...orderSizeDistribution.map((b) => b.orderCount), 0);

  return (
    <div className="space-y-6">
      {/* ── 1. Header ──────────────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold text-charcoal-950">Analytics</h1>
        <p className="text-charcoal-600 text-sm">Business performance and profitability insights</p>
      </div>

      {/* ── 2. Overview Cards ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-400">
          <div className="flex items-center gap-2 text-green-600 mb-1">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-medium uppercase">Total Revenue</span>
          </div>
          <p className="text-2xl font-bold text-charcoal-950">{fmt(overview.totalRevenue)}</p>
          <p className="text-xs text-charcoal-500 mt-1">This month: {fmt(overview.thisMonthRevenue)}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-400">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <ShoppingCart className="w-4 h-4" />
            <span className="text-xs font-medium uppercase">Total Orders</span>
          </div>
          <p className="text-2xl font-bold text-charcoal-950">{overview.totalOrders}</p>
          <p className="text-xs text-charcoal-500 mt-1">This month: {overview.thisMonthOrders}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-400">
          <div className="flex items-center gap-2 text-purple-600 mb-1">
            <BarChart3 className="w-4 h-4" />
            <span className="text-xs font-medium uppercase">Avg Order Value</span>
          </div>
          <p className="text-2xl font-bold text-charcoal-950">{fmt(overview.avgOrderValue)}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-sunset-400">
          <div className="flex items-center gap-2 text-sunset-600 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-medium uppercase">Gross Margin</span>
          </div>
          <p className={`text-2xl font-bold ${marginColor(overview.grossMarginPct)}`}>
            {overview.grossMarginPct}%
          </p>
        </div>
      </div>

      {/* ── 3. Monthly P&L Table ───────────────────────────────────────────────── */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-charcoal-950 mb-4">Monthly Profit &amp; Loss</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-charcoal-200 text-left">
                <th className="pb-2 font-medium text-charcoal-600">Month</th>
                <th className="pb-2 font-medium text-charcoal-600 text-right">Revenue</th>
                <th className="pb-2 font-medium text-charcoal-600 text-right">COGS</th>
                <th className="pb-2 font-medium text-charcoal-600 text-right">Shipping</th>
                <th className="pb-2 font-medium text-charcoal-600 text-right">Gross Profit</th>
                <th className="pb-2 font-medium text-charcoal-600 text-right">Margin %</th>
                <th className="pb-2 font-medium text-charcoal-600 text-right">Orders</th>
                <th className="pb-2 font-medium text-charcoal-600 text-right">AOV</th>
              </tr>
            </thead>
            <tbody>
              {monthlyPnL.map((row) => (
                <tr key={row.month} className="border-b border-charcoal-100">
                  <td className="py-2 text-charcoal-900">{formatMonth(row.month)}</td>
                  <td className="py-2 text-right text-charcoal-900">{fmt(row.revenue)}</td>
                  <td className="py-2 text-right text-charcoal-600">{fmt(row.cogs)}</td>
                  <td className="py-2 text-right text-charcoal-600">{fmt(row.shippingCost)}</td>
                  <td className="py-2 text-right text-charcoal-900">{fmt(row.grossProfit)}</td>
                  <td className={`py-2 text-right font-medium ${marginColor(row.marginPct)}`}>{row.marginPct}%</td>
                  <td className="py-2 text-right text-charcoal-600">{row.orderCount}</td>
                  <td className="py-2 text-right text-charcoal-600">{fmt(row.avgOrderValue)}</td>
                </tr>
              ))}
              {/* Totals row */}
              <tr className="border-t-2 border-charcoal-300 font-bold">
                <td className="py-2 text-charcoal-950">Total</td>
                <td className="py-2 text-right text-charcoal-950">{fmt(pnlTotals.revenue)}</td>
                <td className="py-2 text-right text-charcoal-800">{fmt(pnlTotals.cogs)}</td>
                <td className="py-2 text-right text-charcoal-800">{fmt(pnlTotals.shippingCost)}</td>
                <td className="py-2 text-right text-charcoal-950">{fmt(pnlTotals.grossProfit)}</td>
                <td className={`py-2 text-right ${marginColor(pnlTotalMargin)}`}>{pnlTotalMargin}%</td>
                <td className="py-2 text-right text-charcoal-800">{pnlTotals.orderCount}</td>
                <td className="py-2 text-right text-charcoal-800">{fmt(pnlTotalAOV)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 4. Product Profitability Table ─────────────────────────────────────── */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-charcoal-950 mb-4">Product Profitability</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-charcoal-200 text-left">
                <th className="pb-2 font-medium text-charcoal-600">Product</th>
                <th className="pb-2 font-medium text-charcoal-600 text-right">Units Sold</th>
                <th className="pb-2 font-medium text-charcoal-600 text-right">Revenue</th>
                <th className="pb-2 font-medium text-charcoal-600 text-right">COGS</th>
                <th className="pb-2 font-medium text-charcoal-600 text-right">Gross Profit</th>
                <th className="pb-2 font-medium text-charcoal-600 text-right">Margin %</th>
              </tr>
            </thead>
            <tbody>
              {productBreakdown.map((row) => (
                <tr
                  key={row.sku || row.name}
                  className={`border-b border-charcoal-100 ${row.marginPct < 40 ? 'bg-amber-50' : ''}`}
                >
                  <td className="py-2 text-charcoal-900">{row.name}</td>
                  <td className="py-2 text-right text-charcoal-600">{row.unitsSold}</td>
                  <td className="py-2 text-right text-charcoal-900">{fmt(row.revenue)}</td>
                  <td className="py-2 text-right text-charcoal-600">{fmt(row.cogs)}</td>
                  <td className="py-2 text-right text-charcoal-900">{fmt(row.grossProfit)}</td>
                  <td className={`py-2 text-right font-medium ${marginColor(row.marginPct)}`}>{row.marginPct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 5. Customer Insights ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left — Metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-400">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs font-medium uppercase">Total Customers</span>
            </div>
            <p className="text-2xl font-bold text-charcoal-950">{customerInsights.totalCustomers}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-400">
            <div className="flex items-center gap-2 text-green-600 mb-1">
              <Repeat className="w-4 h-4" />
              <span className="text-xs font-medium uppercase">Repeat Rate</span>
            </div>
            <p className="text-2xl font-bold text-charcoal-950">{customerInsights.repeatRate}%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-400">
            <div className="flex items-center gap-2 text-purple-600 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-medium uppercase">Avg Days Between</span>
            </div>
            <p className="text-2xl font-bold text-charcoal-950">
              {customerInsights.avgDaysBetweenOrders != null ? customerInsights.avgDaysBetweenOrders : '--'}
            </p>
          </div>
        </div>

        {/* Right — Top Customers table */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-charcoal-950 mb-4">Top Customers</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-charcoal-200 text-left">
                  <th className="pb-2 font-medium text-charcoal-600">Name</th>
                  <th className="pb-2 font-medium text-charcoal-600 text-right">Orders</th>
                  <th className="pb-2 font-medium text-charcoal-600 text-right">Total Spent</th>
                  <th className="pb-2 font-medium text-charcoal-600 text-right">First Order</th>
                  <th className="pb-2 font-medium text-charcoal-600 text-right">Last Order</th>
                </tr>
              </thead>
              <tbody>
                {customerInsights.topCustomers.slice(0, 10).map((c) => (
                  <tr key={c.email} className="border-b border-charcoal-100">
                    <td className="py-2 text-charcoal-900">{c.name}</td>
                    <td className="py-2 text-right text-charcoal-600">{c.orderCount}</td>
                    <td className="py-2 text-right text-charcoal-900">{fmt(c.totalSpent)}</td>
                    <td className="py-2 text-right text-charcoal-500">{formatDate(c.firstOrder)}</td>
                    <td className="py-2 text-right text-charcoal-500">{formatDate(c.lastOrder)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── 6. Growth Charts ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-charcoal-950 mb-4">Monthly Revenue &amp; Orders</h2>
          <RevenueOrdersChart data={trend} />
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-charcoal-950 mb-4">New vs Repeat Customers</h2>
          <NewVsRepeatChart data={growthMetrics.newVsRepeat} />
        </div>
      </div>

      {/* ── 7. Predictions / Forecast ──────────────────────────────────────────── */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-charcoal-950 mb-4">Forecast</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-cream-50 rounded-lg p-4 border border-charcoal-100">
            <p className="text-xs font-medium uppercase text-charcoal-500 mb-1">Next 4 Weeks</p>
            <p className="text-lg font-bold text-charcoal-950">
              ~{growthMetrics.forecast.next4WeeksOrders} orders, ~{fmt(growthMetrics.forecast.next4WeeksRevenue)} revenue
            </p>
          </div>
          <div className="bg-cream-50 rounded-lg p-4 border border-charcoal-100">
            <p className="text-xs font-medium uppercase text-charcoal-500 mb-1">Monthly Run Rate</p>
            <p className="text-lg font-bold text-charcoal-950">
              {fmt(growthMetrics.forecast.projectedMonthlyRevenue)}/month at current growth
            </p>
          </div>
          <div className="bg-cream-50 rounded-lg p-4 border border-charcoal-100">
            <p className="text-xs font-medium uppercase text-charcoal-500 mb-1">Growth Factor</p>
            <p className={`text-lg font-bold ${growthPct >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {growthPct >= 0 ? '+' : ''}{growthPct}% month-over-month
            </p>
          </div>
        </div>
      </div>

      {/* ── 8. Order Size Distribution ─────────────────────────────────────────── */}
      <div className="bg-white rounded-lg shadow">
        <button
          onClick={() => setOrderSizeOpen(!orderSizeOpen)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-cream-50 transition-colors rounded-t-lg"
        >
          <div className="flex items-center gap-2">
            {orderSizeOpen ? <ChevronDown className="w-5 h-5 text-charcoal-400" /> : <ChevronRight className="w-5 h-5 text-charcoal-400" />}
            <h2 className="text-lg font-semibold text-charcoal-950">Order Size Distribution</h2>
          </div>
        </button>
        {orderSizeOpen && (
          <div className="px-4 pb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-charcoal-200 text-left">
                    <th className="pb-2 font-medium text-charcoal-600">Order Range</th>
                    <th className="pb-2 font-medium text-charcoal-600 text-right">Orders</th>
                    <th className="pb-2 font-medium text-charcoal-600 text-right">% of Total</th>
                    <th className="pb-2 font-medium text-charcoal-600 text-right">Avg Total</th>
                    <th className="pb-2 font-medium text-charcoal-600 text-right">Revenue</th>
                    <th className="pb-2 font-medium text-charcoal-600 text-right">Avg Margin %</th>
                  </tr>
                </thead>
                <tbody>
                  {orderSizeDistribution.map((row) => {
                    const pctOfTotal = overview.totalOrders > 0
                      ? Math.round((row.orderCount / overview.totalOrders) * 1000) / 10
                      : 0;
                    const isMostCommon = row.orderCount === maxBucketCount;
                    return (
                      <tr
                        key={row.range}
                        className={`border-b border-charcoal-100 ${isMostCommon ? 'font-bold' : ''}`}
                      >
                        <td className="py-2 text-charcoal-900">{row.range}</td>
                        <td className="py-2 text-right text-charcoal-600">{row.orderCount}</td>
                        <td className="py-2 text-right text-charcoal-600">{pctOfTotal}%</td>
                        <td className="py-2 text-right text-charcoal-900">{fmt(row.avgTotal)}</td>
                        <td className="py-2 text-right text-charcoal-900">{fmt(row.totalRevenue)}</td>
                        <td className={`py-2 text-right ${marginColor(row.avgMarginPct)}`}>{row.avgMarginPct}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ── 9. Shipping Cost Analysis ──────────────────────────────────────────── */}
      <div className="bg-white rounded-lg shadow">
        <button
          onClick={() => setShippingOpen(!shippingOpen)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-cream-50 transition-colors rounded-t-lg"
        >
          <div className="flex items-center gap-2">
            {shippingOpen ? <ChevronDown className="w-5 h-5 text-charcoal-400" /> : <ChevronRight className="w-5 h-5 text-charcoal-400" />}
            <h2 className="text-lg font-semibold text-charcoal-950">Shipping Cost Analysis</h2>
          </div>
        </button>
        {shippingOpen && (
          <div className="px-4 pb-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left — Metric cards */}
              <div className="space-y-4">
                <div className="bg-cream-50 rounded-lg p-4 border border-charcoal-100">
                  <div className="flex items-center gap-2 text-charcoal-600 mb-1">
                    <Truck className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase">Avg Shipping Cost</span>
                  </div>
                  <p className="text-2xl font-bold text-charcoal-950">{fmt(shippingAnalysis.avgShippingCost)}</p>
                </div>
                <div className="bg-cream-50 rounded-lg p-4 border border-charcoal-100">
                  <div className="flex items-center gap-2 text-charcoal-600 mb-1">
                    <BarChart3 className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase">Shipping as % of Revenue</span>
                  </div>
                  <p className="text-2xl font-bold text-charcoal-950">{shippingAnalysis.shippingAsPctRevenue}%</p>
                </div>
                <div className="bg-cream-50 rounded-lg p-4 border border-charcoal-100">
                  <div className="flex items-center gap-2 text-charcoal-600 mb-1">
                    <Package className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase">Total Shipping Spend</span>
                  </div>
                  <p className="text-2xl font-bold text-charcoal-950">{fmt(shippingAnalysis.totalShippingSpend)}</p>
                  <p className="text-xs text-charcoal-500 mt-1">Based on {shippingAnalysis.ordersWithShippingData} orders with data</p>
                </div>
              </div>

              {/* Right — Shipping by Order Size */}
              <div>
                <h3 className="font-semibold text-charcoal-800 mb-3">Shipping by Order Size</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-charcoal-200 text-left">
                      <th className="pb-2 font-medium text-charcoal-600">Range</th>
                      <th className="pb-2 font-medium text-charcoal-600 text-right">Avg Shipping</th>
                      <th className="pb-2 font-medium text-charcoal-600 text-right">Orders</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shippingAnalysis.byOrderSize.map((row) => (
                      <tr key={row.range} className="border-b border-charcoal-100">
                        <td className="py-2 text-charcoal-900">{row.range}</td>
                        <td className="py-2 text-right text-charcoal-900">{fmt(row.avgShipping)}</td>
                        <td className="py-2 text-right text-charcoal-600">{row.orderCount}</td>
                      </tr>
                    ))}
                    {shippingAnalysis.byOrderSize.length === 0 && (
                      <tr>
                        <td colSpan={3} className="py-6 text-center text-charcoal-500">No shipping data available.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Chart Components ────────────────────────────────────────────────────────

function RevenueOrdersChart({ data }: { data: MonthlyTrend[] }) {
  if (data.length === 0) {
    return <p className="text-center text-charcoal-500 py-8">No data</p>;
  }

  const chartHeight = 250;
  const topPadding = 30;
  const bottomPadding = 30;
  const barAreaHeight = chartHeight - topPadding - bottomPadding;
  const barWidth = 48;
  const gap = 12;
  const leftPadding = 10;
  const chartWidth = leftPadding + data.length * (barWidth + gap);

  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);
  const maxOrders = Math.max(...data.map((d) => d.orders), 1);

  return (
    <div className="overflow-x-auto">
      <svg
        width={Math.max(chartWidth, 300)}
        height={chartHeight}
        viewBox={`0 0 ${Math.max(chartWidth, 300)} ${chartHeight}`}
        className="mx-auto"
      >
        {/* Bars for revenue */}
        {data.map((d, i) => {
          const barH = (d.revenue / maxRevenue) * barAreaHeight;
          const x = leftPadding + i * (barWidth + gap);
          const y = topPadding + barAreaHeight - barH;
          return (
            <g key={d.month}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                rx={4}
                className="fill-sunset-500"
                opacity={0.85}
              />
              <text
                x={x + barWidth / 2}
                y={y - 4}
                textAnchor="middle"
                className="fill-charcoal-700 text-[9px] font-semibold"
              >
                {fmt(d.revenue)}
              </text>
              <text
                x={x + barWidth / 2}
                y={chartHeight - 6}
                textAnchor="middle"
                className="fill-charcoal-500 text-[9px]"
              >
                {formatMonth(d.month)}
              </text>
            </g>
          );
        })}

        {/* Line for order count */}
        {data.length > 1 && (
          <polyline
            fill="none"
            stroke="#374151"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={data
              .map((d, i) => {
                const x = leftPadding + i * (barWidth + gap) + barWidth / 2;
                const y = topPadding + barAreaHeight - (d.orders / maxOrders) * barAreaHeight;
                return `${x},${y}`;
              })
              .join(' ')}
          />
        )}

        {/* Dots + labels for orders */}
        {data.map((d, i) => {
          const x = leftPadding + i * (barWidth + gap) + barWidth / 2;
          const y = topPadding + barAreaHeight - (d.orders / maxOrders) * barAreaHeight;
          return (
            <g key={`dot-${d.month}`}>
              <circle cx={x} cy={y} r={3} className="fill-charcoal-700" />
              <text
                x={x}
                y={y - 8}
                textAnchor="middle"
                className="fill-charcoal-600 text-[9px]"
              >
                {d.orders}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function NewVsRepeatChart({ data }: { data: NewVsRepeat[] }) {
  if (data.length === 0) {
    return <p className="text-center text-charcoal-500 py-8">No data</p>;
  }

  const chartHeight = 250;
  const topPadding = 30;
  const bottomPadding = 30;
  const barAreaHeight = chartHeight - topPadding - bottomPadding;
  const barWidth = 48;
  const gap = 12;
  const leftPadding = 10;
  const chartWidth = leftPadding + data.length * (barWidth + gap);

  const maxTotal = Math.max(...data.map((d) => d.newCustomers + d.repeatCustomers), 1);

  return (
    <div className="overflow-x-auto">
      <svg
        width={Math.max(chartWidth, 300)}
        height={chartHeight}
        viewBox={`0 0 ${Math.max(chartWidth, 300)} ${chartHeight}`}
        className="mx-auto"
      >
        {data.map((d, i) => {
          const total = d.newCustomers + d.repeatCustomers;
          const totalH = (total / maxTotal) * barAreaHeight;
          const newH = (d.newCustomers / maxTotal) * barAreaHeight;
          const repeatH = (d.repeatCustomers / maxTotal) * barAreaHeight;
          const x = leftPadding + i * (barWidth + gap);
          const baseY = topPadding + barAreaHeight;

          return (
            <g key={d.month}>
              {/* New customers (green, bottom) */}
              <rect
                x={x}
                y={baseY - newH}
                width={barWidth}
                height={newH}
                rx={d.repeatCustomers === 0 ? 4 : 0}
                className="fill-green-500"
                opacity={0.85}
              />
              {/* Repeat customers (blue, top) */}
              {repeatH > 0 && (
                <rect
                  x={x}
                  y={baseY - totalH}
                  width={barWidth}
                  height={repeatH}
                  rx={4}
                  className="fill-blue-500"
                  opacity={0.85}
                />
              )}
              {/* Total label */}
              <text
                x={x + barWidth / 2}
                y={baseY - totalH - 4}
                textAnchor="middle"
                className="fill-charcoal-700 text-[10px] font-semibold"
              >
                {total}
              </text>
              {/* X-axis label */}
              <text
                x={x + barWidth / 2}
                y={chartHeight - 6}
                textAnchor="middle"
                className="fill-charcoal-500 text-[9px]"
              >
                {formatMonth(d.month)}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <rect x={chartWidth - 120} y={2} width={10} height={10} rx={2} className="fill-green-500" opacity={0.85} />
        <text x={chartWidth - 106} y={11} className="fill-charcoal-600 text-[9px]">New</text>
        <rect x={chartWidth - 70} y={2} width={10} height={10} rx={2} className="fill-blue-500" opacity={0.85} />
        <text x={chartWidth - 56} y={11} className="fill-charcoal-600 text-[9px]">Repeat</text>
      </svg>
    </div>
  );
}
