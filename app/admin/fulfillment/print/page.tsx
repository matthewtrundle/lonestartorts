'use client';

import { useEffect, useState } from 'react';
import { Printer } from 'lucide-react';
import { calculateDimensions, calculateOrderWeightOz, fixedPackageWeightOz } from '@/lib/shipping';

interface FulfillmentItem {
  sku: string;
  name: string;
  quantity: number;
  price: number;
}

interface FulfillmentOrder {
  id: string;
  orderNumber: string;
  type: 'retail' | 'wholesale';
  name: string;
  email: string;
  phone: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  status: string;
  total: number;
  createdAt: string;
  items: FulfillmentItem[];
}

interface SkuAggregate {
  sku: string;
  name: string;
  totalQuantity: number;
  orderCount: number;
}

const formatOzAsLbs = (oz: number) => `${(oz / 16).toFixed(2)} lb (${oz} oz)`;

export default function PrintFulfillmentPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<FulfillmentOrder[]>([]);
  const [skuAggregates, setSkuAggregates] = useState<SkuAggregate[]>([]);
  const [generatedAt] = useState(() => new Date());

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/fulfillment');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setOrders(data.orders);
        setSkuAggregates(data.skuAggregates);
      } catch (err) {
        console.error('Error fetching fulfillment data:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  if (loading) {
    return (
      <div className="p-8 text-center text-charcoal-600">Loading fulfillment data…</div>
    );
  }

  return (
    <div className="bg-white text-black print:p-0">
      <style jsx global>{`
        @media print {
          /* Hide the admin shell so only the print content remains. */
          header,
          nav,
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
          }
          /* Keep each order intact; if it doesn't fit, start on the next page. */
          .print-order {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          /* Production summary stays at top; orders flow below it. */
          .print-section {
            break-after: auto;
            page-break-after: auto;
          }
        }
      `}</style>

      {/* Action bar — hidden on print */}
      <div className="no-print sticky top-0 z-10 bg-charcoal-50 border-b border-charcoal-200 px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-charcoal-950">Print Current Orders</h1>
          <p className="text-xs text-charcoal-600">
            {orders.length} order{orders.length === 1 ? '' : 's'} · generated{' '}
            {generatedAt.toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Printer className="w-4 h-4" />
          Print
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-6 print:p-4 print:max-w-none">
        {/* Production summary — first page */}
        <section className="print-section">
          <header className="mb-4 border-b border-black pb-2">
            <h1 className="text-2xl font-bold">Weekly Production / Pick List</h1>
            <p className="text-sm">
              Generated {generatedAt.toLocaleString()} · {orders.length} order
              {orders.length === 1 ? '' : 's'} ·{' '}
              {orders.reduce((s, o) => s + o.items.reduce((ss, i) => ss + i.quantity, 0), 0)} total
              units
            </p>
          </header>

          <h2 className="text-lg font-semibold mb-2">Items needed (aggregated)</h2>
          {skuAggregates.length === 0 ? (
            <p className="text-sm">No items.</p>
          ) : (
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-black text-left">
                  <th className="py-1 pr-2">Product</th>
                  <th className="py-1 px-2 text-right">Qty</th>
                  <th className="py-1 px-2 text-right"># Orders</th>
                </tr>
              </thead>
              <tbody>
                {skuAggregates.map((agg) => (
                  <tr key={agg.sku + agg.name} className="border-b border-charcoal-300">
                    <td className="py-1 pr-2">{agg.name}</td>
                    <td className="py-1 px-2 text-right font-semibold">{agg.totalQuantity}</td>
                    <td className="py-1 px-2 text-right">{agg.orderCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Per-order pack slips */}
        {sortedOrders.map((order) => {
          const totalItemCount = order.items.reduce((s, i) => s + i.quantity, 0);
          const [length, width, height] = calculateDimensions(totalItemCount);
          const weightOz =
            fixedPackageWeightOz(totalItemCount) ?? calculateOrderWeightOz(order.items);

          return (
            <section key={order.id} className="print-order mt-6 print:mt-4">
              <header className="border-b-2 border-black pb-2 mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold">
                      Order #{order.orderNumber}{' '}
                      <span className="text-sm font-normal">
                        ({order.type === 'wholesale' ? 'Wholesale' : 'Retail'})
                      </span>
                    </h2>
                    <p className="text-xs">
                      Placed {new Date(order.createdAt).toLocaleString()} · Status: {order.status}
                    </p>
                  </div>
                  <div className="text-right text-xs">
                    <div className="font-semibold">Box: {length}″ × {width}″ × {height}″</div>
                    <div>Weight: {formatOzAsLbs(weightOz)}</div>
                    <div>{totalItemCount} unit{totalItemCount === 1 ? '' : 's'}</div>
                  </div>
                </div>
              </header>

              <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                <div>
                  <h3 className="font-semibold uppercase text-xs mb-1">Ship To</h3>
                  <div>{order.name}</div>
                  {order.company && <div>{order.company}</div>}
                  <div>{order.address1}</div>
                  {order.address2 && <div>{order.address2}</div>}
                  <div>
                    {order.city}, {order.state} {order.zip}
                  </div>
                  <div>{order.country}</div>
                </div>
                <div>
                  <h3 className="font-semibold uppercase text-xs mb-1">Contact</h3>
                  <div>{order.email}</div>
                  {order.phone && <div>{order.phone}</div>}
                </div>
              </div>

              <h3 className="font-semibold uppercase text-xs mb-1">Items</h3>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-black text-left">
                    <th className="py-1 pr-2">SKU</th>
                    <th className="py-1 pr-2">Item</th>
                    <th className="py-1 px-2 text-right">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, idx) => (
                    <tr key={idx} className="border-b border-charcoal-300">
                      <td className="py-1 pr-2 font-mono text-xs">{item.sku || '—'}</td>
                      <td className="py-1 pr-2">{item.name}</td>
                      <td className="py-1 px-2 text-right font-semibold">{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-6 pt-3 border-t border-charcoal-300 text-xs flex justify-between">
                <div>
                  <div>☐ Picked</div>
                  <div>☐ Packed</div>
                  <div>☐ Labeled</div>
                </div>
                <div className="text-right">
                  Packer initials: ______ &nbsp;&nbsp; Date: __________
                </div>
              </div>
            </section>
          );
        })}

        {sortedOrders.length === 0 && (
          <p className="mt-6 text-sm">No unfulfilled orders.</p>
        )}
      </div>
    </div>
  );
}
