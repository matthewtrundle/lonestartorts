'use client';

import { useEffect, useState } from 'react';
import {
  ShoppingCart,
  TrendingUp,
  Package,
  Truck,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Thermometer,
  Archive,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface SkuProjection {
  name: string;
  storage: 'refrigerated' | 'shelf_stable';
  confirmedQty: number;
  projectedAdditionalQty: number;
  totalProjectedQty: number;
  hebLimit: number | null;
  hebOrdersNeeded: number;
  bufferStock: number;
  netToBuy: number;
}

interface PickupSchedule {
  refrigerated: { pickupDay: string; pickupTime: string; items: SkuProjection[] };
  shelfStable: { pickupDay: string; pickupTime: string; items: SkuProjection[] };
}

interface HistoricalWeek {
  weekStart: string;
  shipDate: string;
  orderCount: number;
  totalUnits: number;
}

interface InventoryData {
  shipDate: string;
  cutoffDate: string;
  hoursUntilCutoff: number;
  confirmedOrders: number;
  projectedTotalOrders: number;
  growthTrend: number;
  skuProjections: SkuProjection[];
  pickupSchedule: PickupSchedule;
  historicalWeeks: HistoricalWeek[];
}

// ─── localStorage helpers ────────────────────────────────────────────────────

const BUFFER_STORAGE_KEY = 'lonestar_shelf_stable_buffer';

function loadBufferStocks(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(BUFFER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveBufferStocks(stocks: Record<string, number>) {
  localStorage.setItem(BUFFER_STORAGE_KEY, JSON.stringify(stocks));
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function InventoryPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<InventoryData | null>(null);
  const [bufferStocks, setBufferStocks] = useState<Record<string, number>>({});
  const [pickupOpen, setPickupOpen] = useState(true);
  const [bufferOpen, setBufferOpen] = useState(false);

  useEffect(() => {
    setBufferStocks(loadBufferStocks());
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/inventory');
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Error fetching inventory data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBufferChange = (name: string, value: number) => {
    const next = { ...bufferStocks, [name]: value };
    setBufferStocks(next);
    saveBufferStocks(next);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunset-600 mx-auto mb-4" />
          <p className="text-charcoal-600">Loading inventory projections...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12 text-charcoal-500">
        Failed to load inventory data. Please refresh.
      </div>
    );
  }

  const shipDate = new Date(data.shipDate);
  const cutoffDate = new Date(data.cutoffDate);
  const totalItemsToBuy = data.skuProjections.reduce((s, p) => s + p.netToBuy, 0);

  // Recalculate net-to-buy for shelf-stable items using client-side buffer
  const adjustedProjections = data.skuProjections.map((p) => {
    if (p.storage === 'shelf_stable') {
      const buffer = bufferStocks[p.name] || 0;
      return { ...p, bufferStock: buffer, netToBuy: Math.max(0, p.totalProjectedQty - buffer) };
    }
    return p;
  });

  const refrigeratedItems = adjustedProjections.filter((p) => p.storage === 'refrigerated' && p.totalProjectedQty > 0);
  const shelfStableItems = adjustedProjections.filter((p) => p.storage === 'shelf_stable' && p.totalProjectedQty > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-charcoal-950">Inventory Projections</h1>
        <p className="text-charcoal-600 text-sm">
          Next ship date:{' '}
          <span className="font-semibold text-charcoal-800">
            {shipDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
          {' '}&mdash; Order cutoff:{' '}
          <span className="font-semibold text-charcoal-800">
            {cutoffDate.toLocaleDateString('en-US', { weekday: 'long' })} 11:59 PM
          </span>
          {' '}
          <span className="text-amber-600 font-medium">
            ({Math.round(data.hoursUntilCutoff)}h remaining)
          </span>
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-400">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <ShoppingCart className="w-4 h-4" />
            <span className="text-xs font-medium uppercase">Confirmed Orders</span>
          </div>
          <p className="text-2xl font-bold text-charcoal-950">{data.confirmedOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-400">
          <div className="flex items-center gap-2 text-purple-600 mb-1">
            <Package className="w-4 h-4" />
            <span className="text-xs font-medium uppercase">Projected Total</span>
          </div>
          <p className="text-2xl font-bold text-charcoal-950">{data.projectedTotalOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-400">
          <div className="flex items-center gap-2 text-green-600 mb-1">
            <Truck className="w-4 h-4" />
            <span className="text-xs font-medium uppercase">Items to Buy</span>
          </div>
          <p className="text-2xl font-bold text-charcoal-950">{totalItemsToBuy}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-sunset-400">
          <div className="flex items-center gap-2 text-sunset-600 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-medium uppercase">Growth Trend</span>
          </div>
          <p className="text-2xl font-bold text-charcoal-950">
            {data.growthTrend > 0 ? '+' : ''}{data.growthTrend}%
          </p>
        </div>
      </div>

      {/* Pickup Schedule */}
      <div className="bg-white rounded-lg shadow">
        <button
          onClick={() => setPickupOpen(!pickupOpen)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-cream-50 transition-colors rounded-t-lg"
        >
          <div className="flex items-center gap-2">
            {pickupOpen ? <ChevronDown className="w-5 h-5 text-charcoal-400" /> : <ChevronRight className="w-5 h-5 text-charcoal-400" />}
            <h2 className="text-lg font-semibold text-charcoal-950">Pickup Schedule</h2>
          </div>
        </button>

        {pickupOpen && (
          <div className="px-4 pb-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Refrigerated — Tuesday AM */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Thermometer className="w-4 h-4 text-blue-500" />
                <h3 className="font-semibold text-charcoal-800">{data.pickupSchedule.refrigerated.pickupDay} {data.pickupSchedule.refrigerated.pickupTime} &mdash; Refrigerated</h3>
              </div>
              {refrigeratedItems.length === 0 ? (
                <p className="text-sm text-charcoal-500">No refrigerated items projected.</p>
              ) : (
                <>
                  <HebWarningBanner items={refrigeratedItems} />
                  <ItemTable items={refrigeratedItems} showBuffer={false} />
                </>
              )}
            </div>

            {/* Shelf-Stable — Monday */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Archive className="w-4 h-4 text-amber-500" />
                <h3 className="font-semibold text-charcoal-800">{data.pickupSchedule.shelfStable.pickupDay} {data.pickupSchedule.shelfStable.pickupTime} &mdash; Shelf-Stable</h3>
              </div>
              {shelfStableItems.length === 0 ? (
                <p className="text-sm text-charcoal-500">No shelf-stable items projected.</p>
              ) : (
                <>
                  <HebWarningBanner items={shelfStableItems} />
                  <ItemTable items={shelfStableItems} showBuffer />
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Weekly Trend Chart */}
      {data.historicalWeeks.length > 0 && (
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-charcoal-950 mb-4">Weekly Order Trend</h2>
          <WeeklyTrendChart weeks={data.historicalWeeks} />
        </div>
      )}

      {/* Shelf-Stable Buffer */}
      <div className="bg-white rounded-lg shadow">
        <button
          onClick={() => setBufferOpen(!bufferOpen)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-cream-50 transition-colors rounded-t-lg"
        >
          <div className="flex items-center gap-2">
            {bufferOpen ? <ChevronDown className="w-5 h-5 text-charcoal-400" /> : <ChevronRight className="w-5 h-5 text-charcoal-400" />}
            <h2 className="text-lg font-semibold text-charcoal-950">Shelf-Stable Buffer Stock</h2>
          </div>
          <span className="text-xs text-charcoal-500">Saved in browser</span>
        </button>

        {bufferOpen && (
          <div className="px-4 pb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-charcoal-200 text-left">
                  <th className="pb-2 font-medium text-charcoal-600">Product</th>
                  <th className="pb-2 font-medium text-charcoal-600 text-right">Avg Weekly</th>
                  <th className="pb-2 font-medium text-charcoal-600 text-right">Recommended Buffer</th>
                  <th className="pb-2 font-medium text-charcoal-600 text-right">On Hand</th>
                  <th className="pb-2 font-medium text-charcoal-600 text-right">Net to Buy</th>
                </tr>
              </thead>
              <tbody>
                {shelfStableItems.map((item) => {
                  const avgWeekly = item.totalProjectedQty;
                  const recommended = Math.ceil(avgWeekly * 1.5);
                  const onHand = bufferStocks[item.name] || 0;
                  const netToBuy = Math.max(0, item.totalProjectedQty - onHand);
                  return (
                    <tr key={item.name} className="border-b border-charcoal-100 last:border-0">
                      <td className="py-2 text-charcoal-900">{item.name}</td>
                      <td className="py-2 text-right text-charcoal-600">{avgWeekly}</td>
                      <td className="py-2 text-right text-charcoal-600">{recommended}</td>
                      <td className="py-2 text-right">
                        <input
                          type="number"
                          min={0}
                          value={onHand}
                          onChange={(e) => handleBufferChange(item.name, Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-16 text-right border border-charcoal-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-sunset-500"
                        />
                      </td>
                      <td className={`py-2 text-right font-semibold ${netToBuy > 0 ? 'text-charcoal-950' : 'text-green-600'}`}>
                        {netToBuy}
                      </td>
                    </tr>
                  );
                })}
                {shelfStableItems.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-charcoal-500">
                      No shelf-stable items in current projection.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function HebWarningBanner({ items }: { items: SkuProjection[] }) {
  const flagged = items.filter((i) => i.hebLimit && i.netToBuy > i.hebLimit);
  if (flagged.length === 0) return null;
  const maxOrders = Math.max(...flagged.map((i) => i.hebOrdersNeeded));
  return (
    <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
      <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
      <div className="text-sm">
        <span className="font-semibold text-amber-800">{maxOrders} H-E-B orders needed</span>
        <span className="text-amber-700">
          {' '}&mdash; {flagged.length} item{flagged.length > 1 ? 's' : ''} exceed{flagged.length === 1 ? 's' : ''} per-order limits
        </span>
      </div>
    </div>
  );
}

function ItemTable({ items, showBuffer }: { items: SkuProjection[]; showBuffer: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-charcoal-200 text-left">
            <th className="pb-2 font-medium text-charcoal-600">Product</th>
            <th className="pb-2 font-medium text-charcoal-600 text-right">Confirmed</th>
            <th className="pb-2 font-medium text-charcoal-600 text-right">Projected</th>
            <th className="pb-2 font-medium text-charcoal-600 text-right">Total to Buy</th>
            <th className="pb-2 font-medium text-charcoal-600 text-right">HEB Limit</th>
            <th className="pb-2 font-medium text-charcoal-600 text-right">HEB Orders</th>
            {showBuffer && <th className="pb-2 font-medium text-charcoal-600 text-right">Buffer</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const overLimit = item.hebLimit && item.netToBuy > item.hebLimit;
            return (
              <tr key={item.name} className={`border-b border-charcoal-100 last:border-0 ${overLimit ? 'bg-amber-50' : ''}`}>
                <td className="py-2 text-charcoal-900">
                  {item.name}
                  {overLimit && (
                    <span className="ml-2 inline-flex items-center gap-1 text-xs text-amber-700 font-medium">
                      <AlertTriangle className="w-3 h-3" />
                      Over by {item.netToBuy - item.hebLimit!}
                    </span>
                  )}
                </td>
                <td className="py-2 text-right text-charcoal-600">{item.confirmedQty}</td>
                <td className="py-2 text-right text-charcoal-600">+{item.projectedAdditionalQty}</td>
                <td className={`py-2 text-right font-semibold ${overLimit ? 'text-amber-700' : 'text-charcoal-950'}`}>
                  {item.netToBuy}
                </td>
                <td className="py-2 text-right text-charcoal-500">{item.hebLimit ?? '—'}</td>
                <td className={`py-2 text-right font-medium ${item.hebOrdersNeeded > 1 ? 'text-amber-700' : 'text-charcoal-600'}`}>
                  {item.hebOrdersNeeded > 1 ? `${item.hebOrdersNeeded} orders` : '1'}
                </td>
                {showBuffer && <td className="py-2 text-right text-charcoal-500">{item.bufferStock}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function WeeklyTrendChart({ weeks }: { weeks: HistoricalWeek[] }) {
  const maxOrders = Math.max(...weeks.map((w) => w.orderCount), 1);
  const chartHeight = 160;
  const barWidth = 40;
  const gap = 8;
  const chartWidth = weeks.length * (barWidth + gap) - gap;

  return (
    <div className="overflow-x-auto">
      <svg
        width={Math.max(chartWidth + 60, 300)}
        height={chartHeight + 40}
        viewBox={`0 0 ${Math.max(chartWidth + 60, 300)} ${chartHeight + 40}`}
        className="mx-auto"
      >
        {/* Y-axis labels */}
        <text x="25" y="15" textAnchor="end" className="fill-charcoal-400 text-[10px]">{maxOrders}</text>
        <text x="25" y={chartHeight / 2 + 5} textAnchor="end" className="fill-charcoal-400 text-[10px]">{Math.round(maxOrders / 2)}</text>
        <text x="25" y={chartHeight} textAnchor="end" className="fill-charcoal-400 text-[10px]">0</text>

        {/* Grid lines */}
        <line x1="30" y1="10" x2={chartWidth + 35} y2="10" stroke="#e5e7eb" strokeDasharray="4" />
        <line x1="30" y1={chartHeight / 2} x2={chartWidth + 35} y2={chartHeight / 2} stroke="#e5e7eb" strokeDasharray="4" />
        <line x1="30" y1={chartHeight} x2={chartWidth + 35} y2={chartHeight} stroke="#e5e7eb" />

        {/* Bars */}
        {weeks.map((week, i) => {
          const barHeight = (week.orderCount / maxOrders) * (chartHeight - 10);
          const x = 35 + i * (barWidth + gap);
          const y = chartHeight - barHeight;
          const dateLabel = new Date(week.weekStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          return (
            <g key={week.weekStart}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={4}
                className="fill-sunset-500"
                opacity={0.85}
              />
              <text
                x={x + barWidth / 2}
                y={y - 4}
                textAnchor="middle"
                className="fill-charcoal-700 text-[11px] font-semibold"
              >
                {week.orderCount}
              </text>
              <text
                x={x + barWidth / 2}
                y={chartHeight + 14}
                textAnchor="middle"
                className="fill-charcoal-500 text-[9px]"
              >
                {dateLabel}
              </text>
            </g>
          );
        })}

        {/* Trend line */}
        {weeks.length > 1 && (
          <polyline
            fill="none"
            stroke="#b45309"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={weeks
              .map((week, i) => {
                const x = 35 + i * (barWidth + gap) + barWidth / 2;
                const y = chartHeight - (week.orderCount / maxOrders) * (chartHeight - 10);
                return `${x},${y}`;
              })
              .join(' ')}
          />
        )}
      </svg>
    </div>
  );
}
