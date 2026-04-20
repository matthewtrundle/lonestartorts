'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { formatPrice } from '@/lib/utils';
import { Download, Upload, ChevronDown, ChevronRight, Package, Clock, Truck, ShoppingCart, ClipboardList, AlertTriangle } from 'lucide-react';
import { getHebLimit, getOrdersNeeded } from '@/lib/inventory/constants';

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
  items: { sku: string; name: string; quantity: number; price: number }[];
}

interface SkuAggregate {
  sku: string;
  name: string;
  totalQuantity: number;
  orderCount: number;
}

interface Summary {
  pendingCount: number;
  processingCount: number;
  readyCount: number;
  totalUnfulfilled: number;
  totalItemsToPack: number;
}

interface ImportResult {
  updated: number;
  errors: { orderNumber: string; error: string }[];
  skipped: number;
  debug?: {
    format: string;
    parsedRows: { identifier: string; trackingNumber: string; carrier: string; matchedOrder?: string }[];
  };
}

export default function FulfillmentPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<FulfillmentOrder[]>([]);
  const [skuAggregates, setSkuAggregates] = useState<SkuAggregate[]>([]);
  const [summary, setSummary] = useState<Summary>({ pendingCount: 0, processingCount: 0, readyCount: 0, totalUnfulfilled: 0, totalItemsToPack: 0 });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [itemsToBuyOpen, setItemsToBuyOpen] = useState(true);
  const [exporting, setExporting] = useState(false);

  // Import modal state
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importPreview, setImportPreview] = useState<{ orderNumber: string; trackingNumber: string; carrier: string }[]>([]);
  const [sendEmails, setSendEmails] = useState(true);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);

  // Missed notifications (orders marked SHIPPED/DELIVERED but no shipping email sent)
  interface MissedNotification {
    id: string;
    type: 'retail' | 'wholesale';
    orderNumber: string;
    email: string;
    customerName: string;
    businessName?: string;
    status: string;
    shippedAt: string | null;
    deliveredAt: string | null;
    trackingNumber: string | null;
    carrier: string | null;
    total: number;
  }
  const [missedOpen, setMissedOpen] = useState(false);
  const [missed, setMissed] = useState<{ retail: MissedNotification[]; wholesale: MissedNotification[] }>({
    retail: [],
    wholesale: [],
  });
  const [missedLoading, setMissedLoading] = useState(false);
  const [sendingId, setSendingId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
    fetchMissedNotifications();
  }, []);

  const fetchMissedNotifications = async () => {
    setMissedLoading(true);
    try {
      const res = await fetch('/api/admin/fulfillment/missed-notifications');
      if (!res.ok) return;
      const data = await res.json();
      setMissed({ retail: data.retail || [], wholesale: data.wholesale || [] });
    } catch (err) {
      console.error('Error fetching missed notifications:', err);
    } finally {
      setMissedLoading(false);
    }
  };

  const handleSendMissed = async (orderId: string, orderNumber: string) => {
    if (!window.confirm(`Send shipping apology email + $10 coupon for ${orderNumber}?`)) return;
    setSendingId(orderId);
    try {
      const res = await fetch(`/api/admin/fulfillment/missed-notifications/${orderId}/send`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      alert(`Sent. Coupon: ${data.couponCode}`);
      await fetchMissedNotifications();
    } catch (err: any) {
      alert(err.message || 'Failed to send notification');
    } finally {
      setSendingId(null);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/fulfillment');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setOrders(data.orders);
      setSkuAggregates(data.skuAggregates);
      setSummary(data.summary);
    } catch (err) {
      console.error('Error fetching fulfillment data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedIds.size === orders.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(orders.map((o) => o.id)));
    }
  };

  const handleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const params = selectedIds.size > 0 ? `?orderIds=${Array.from(selectedIds).join(',')}` : '';
      const res = await fetch(`/api/admin/fulfillment/export${params}`);
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pirate-ship-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to export CSV');
    } finally {
      setExporting(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportFile(file);
    setImportResult(null);

    const fileName = file.name.toLowerCase();
    const isXlsx = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');

    let headers: string[] = [];
    let dataRows: Record<string, string>[] = [];

    if (isXlsx) {
      // Parse XLSX using the xlsx library dynamically
      const XLSX = await import('xlsx');
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      dataRows = XLSX.utils.sheet_to_json(sheet, { raw: false });
      headers = dataRows.length > 0 ? Object.keys(dataRows[0]) : [];
    } else {
      // Parse CSV
      const text = await file.text();
      const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
      if (lines.length < 2) return;
      headers = lines[0].split(',').map((h) => h.trim());
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',').map((c) => c.trim());
        const row: Record<string, string> = {};
        headers.forEach((h, idx) => { row[h] = cols[idx] || ''; });
        dataRows.push(row);
      }
    }

    const headersLower = headers.map((h) => h.toLowerCase());
    const trackingKey = headers[headersLower.findIndex((h) => h.includes('tracking'))];
    const carrierKey = headers[headersLower.findIndex((h) => h.includes('carrier'))];

    if (!trackingKey) {
      console.warn('Could not find tracking column in headers:', headers);
      return;
    }

    // Detect Pirate Ship format (has Recipient + Email but no Order Number)
    const orderKey = headers[headersLower.findIndex((h) => h.includes('order'))];
    const recipientKey = headers[headersLower.findIndex((h) => h === 'recipient')];
    const emailKey = headers[headersLower.findIndex((h) => h === 'email')];
    const isPirateShip = !orderKey && !!recipientKey;

    const preview = [];
    for (const row of dataRows) {
      const trackingNumber = (row[trackingKey] || '').trim();
      const identifier = isPirateShip
        ? `${(row[recipientKey] || '').trim()} (${(row[emailKey] || '').trim()})`
        : (row[orderKey] || '').trim();
      if (identifier && trackingNumber) {
        preview.push({
          orderNumber: identifier,
          trackingNumber,
          carrier: carrierKey ? (row[carrierKey] || '').trim() || 'Auto-detect' : 'Auto-detect',
        });
      }
    }
    setImportPreview(preview);
  };

  const handleImport = async () => {
    if (!importFile) return;

    // Safety gate: if the operator unchecked "Send shipping notifications", make them
    // confirm. This is the SECOND time in 3 weeks that a Tuesday shipment went out
    // without notifying customers. Default is now ON.
    if (!sendEmails) {
      const confirmed = window.confirm(
        `You are about to mark ${
          importPreview.length || 'these'
        } orders as SHIPPED without sending any customer notification emails.\n\n` +
          `This has caused two separate incidents already. Are you absolutely sure?`
      );
      if (!confirmed) return;
    }

    setImporting(true);
    try {
      const formData = new FormData();
      formData.append('file', importFile);
      formData.append('sendEmails', String(sendEmails));

      const res = await fetch('/api/admin/fulfillment/import-tracking', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Import failed');
      }

      const result = await res.json();
      setImportResult(result);

      // Refresh data
      fetchData();
    } catch (err: any) {
      alert(err.message || 'Failed to import tracking');
    } finally {
      setImporting(false);
    }
  };

  const closeImportModal = () => {
    setShowImportModal(false);
    setImportFile(null);
    setImportPreview([]);
    setImportResult(null);
    setSendEmails(true);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDownloadShoppingList = () => {
    const escapeCsv = (val: string) => {
      if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    };
    const header = ['Product Name', 'Quantity Needed', 'HEB Limit/Order', 'Orders Needed', 'Notes'];
    const rows = skuAggregates.map((agg) => {
      const limit = getHebLimit(agg.name);
      const ordersNeeded = getOrdersNeeded(agg.totalQuantity, limit);
      const notes = limit && agg.totalQuantity > limit
        ? `Over limit by ${agg.totalQuantity - limit} — need ${ordersNeeded} HEB orders`
        : '';
      return [
        escapeCsv(agg.name),
        String(agg.totalQuantity),
        limit ? String(limit) : 'No limit',
        String(ordersNeeded),
        escapeCsv(notes),
      ];
    });
    const csv = [header.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shopping-list-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunset-600 mx-auto mb-4"></div>
          <p className="text-charcoal-600">Loading fulfillment data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-charcoal-950">Fulfillment Hub</h1>
        <p className="text-charcoal-600 text-sm">Manage order fulfillment and shipping</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-amber-400">
          <div className="flex items-center gap-2 text-amber-600 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-medium uppercase">Pending</span>
          </div>
          <p className="text-2xl font-bold text-charcoal-950">{summary.pendingCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-400">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Package className="w-4 h-4" />
            <span className="text-xs font-medium uppercase">Processing</span>
          </div>
          <p className="text-2xl font-bold text-charcoal-950">{summary.processingCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-400">
          <div className="flex items-center gap-2 text-green-600 mb-1">
            <Truck className="w-4 h-4" />
            <span className="text-xs font-medium uppercase">Ready to Ship</span>
          </div>
          <p className="text-2xl font-bold text-charcoal-950">{summary.readyCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-charcoal-400">
          <div className="flex items-center gap-2 text-charcoal-600 mb-1">
            <ShoppingCart className="w-4 h-4" />
            <span className="text-xs font-medium uppercase">Total Items</span>
          </div>
          <p className="text-2xl font-bold text-charcoal-950">{summary.totalItemsToPack}</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex gap-3">
        <button
          onClick={handleExport}
          disabled={exporting}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <Download className="w-4 h-4" />
          {exporting ? 'Exporting...' : selectedIds.size > 0 ? `Export ${selectedIds.size} for Pirate Ship` : 'Export All for Pirate Ship'}
        </button>
        <button
          onClick={() => setShowImportModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal-700 text-white text-sm font-medium rounded-lg hover:bg-charcoal-800 transition-colors"
        >
          <Upload className="w-4 h-4" />
          Import Tracking
        </button>
      </div>

      {/* Missed Shipping Notifications — safety net. Any row here is an order marked
          SHIPPED/DELIVERED without the customer receiving a tracking email. */}
      {(missed.retail.length > 0 || missed.wholesale.length > 0 || missedLoading) && (
        <div className="bg-white rounded-lg shadow border-l-4 border-red-500">
          <button
            onClick={() => setMissedOpen(!missedOpen)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              {missedOpen ? (
                <ChevronDown className="w-5 h-5 text-red-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-red-500" />
              )}
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-semibold text-charcoal-950">
                Missed Shipping Notifications ({missed.retail.length + missed.wholesale.length})
              </h2>
            </div>
            <span className="text-xs text-charcoal-600">
              Orders shipped without customer email
            </span>
          </button>
          {missedOpen && (
            <div className="border-t border-charcoal-100 p-4">
              {missed.retail.length === 0 && missed.wholesale.length === 0 ? (
                <p className="text-sm text-charcoal-600">
                  {missedLoading ? 'Loading…' : 'None — all shipped orders have notifications on file.'}
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-charcoal-600 uppercase border-b border-charcoal-200">
                        <th className="py-2">Order</th>
                        <th className="py-2">Customer</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Shipped</th>
                        <th className="py-2">Tracking</th>
                        <th className="py-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...missed.retail, ...missed.wholesale].map((o) => (
                        <tr key={o.id} className="border-b border-charcoal-100 last:border-0">
                          <td className="py-2 font-mono text-xs">{o.orderNumber}</td>
                          <td className="py-2">
                            <div>{o.customerName}</div>
                            <div className="text-xs text-charcoal-500">{o.email}</div>
                          </td>
                          <td className="py-2">
                            <StatusBadge status={o.status} />
                          </td>
                          <td className="py-2 text-xs">
                            {o.shippedAt ? new Date(o.shippedAt).toLocaleDateString() : '—'}
                          </td>
                          <td className="py-2 text-xs font-mono">
                            {o.trackingNumber ? `${o.carrier} ${o.trackingNumber}` : '—'}
                          </td>
                          <td className="py-2 text-right">
                            {o.type === 'retail' ? (
                              <button
                                onClick={() => handleSendMissed(o.id, o.orderNumber)}
                                disabled={sendingId === o.id || !o.trackingNumber}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 disabled:opacity-50 transition-colors"
                                title={
                                  !o.trackingNumber
                                    ? 'Add tracking before sending'
                                    : 'Send apology email + $10 coupon'
                                }
                              >
                                {sendingId === o.id ? 'Sending…' : 'Send apology'}
                              </button>
                            ) : (
                              <span className="text-xs text-charcoal-500">Wholesale — manual</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Items to Buy */}
      {skuAggregates.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setItemsToBuyOpen(!itemsToBuyOpen)}
              className="flex items-center gap-2 text-left hover:text-charcoal-700 transition-colors"
            >
              {itemsToBuyOpen ? <ChevronDown className="w-5 h-5 text-charcoal-400" /> : <ChevronRight className="w-5 h-5 text-charcoal-400" />}
              <h2 className="text-lg font-semibold text-charcoal-950">
                Items to Buy ({skuAggregates.reduce((s, a) => s + a.totalQuantity, 0)} total)
              </h2>
            </button>
            <button
              onClick={handleDownloadShoppingList}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-charcoal-700 bg-charcoal-100 rounded-lg hover:bg-charcoal-200 transition-colors"
            >
              <ClipboardList className="w-4 h-4" />
              Download Shopping List
            </button>
          </div>
          {itemsToBuyOpen && (
            <div className="px-4 pb-4">
              {/* HEB orders needed summary */}
              {(() => {
                const maxOrders = Math.max(...skuAggregates.map((agg) => getOrdersNeeded(agg.totalQuantity, getHebLimit(agg.name))));
                const flaggedItems = skuAggregates.filter((agg) => {
                  const limit = getHebLimit(agg.name);
                  return limit && agg.totalQuantity > limit;
                });
                if (flaggedItems.length > 0) {
                  return (
                    <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <span className="font-semibold text-amber-800">
                          {maxOrders} H-E-B orders needed
                        </span>
                        <span className="text-amber-700">
                          {' '}&mdash; {flaggedItems.length} item{flaggedItems.length > 1 ? 's' : ''} exceed{flaggedItems.length === 1 ? 's' : ''} per-order limits
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-charcoal-200 text-left">
                    <th className="pb-2 font-medium text-charcoal-600">Product Name</th>
                    <th className="pb-2 font-medium text-charcoal-600 text-right">Qty Needed</th>
                    <th className="pb-2 font-medium text-charcoal-600 text-right">HEB Limit</th>
                    <th className="pb-2 font-medium text-charcoal-600 text-right">Orders</th>
                    <th className="pb-2 font-medium text-charcoal-600 text-right"># Customer Orders</th>
                  </tr>
                </thead>
                <tbody>
                  {skuAggregates.map((agg) => {
                    const limit = getHebLimit(agg.name);
                    const ordersNeeded = getOrdersNeeded(agg.totalQuantity, limit);
                    const overLimit = limit && agg.totalQuantity > limit;
                    return (
                      <tr key={agg.sku + agg.name} className={`border-b border-charcoal-100 last:border-0 ${overLimit ? 'bg-amber-50' : ''}`}>
                        <td className="py-2 text-charcoal-900">
                          {agg.name}
                          {overLimit && (
                            <span className="ml-2 inline-flex items-center gap-1 text-xs text-amber-700 font-medium">
                              <AlertTriangle className="w-3 h-3" />
                              Over by {agg.totalQuantity - limit!}
                            </span>
                          )}
                        </td>
                        <td className={`py-2 text-right font-semibold ${overLimit ? 'text-amber-700' : 'text-charcoal-950'}`}>
                          {agg.totalQuantity}
                        </td>
                        <td className="py-2 text-right text-charcoal-500">
                          {limit ?? '—'}
                        </td>
                        <td className={`py-2 text-right font-medium ${ordersNeeded > 1 ? 'text-amber-700' : 'text-charcoal-600'}`}>
                          {ordersNeeded > 1 ? `${ordersNeeded} orders` : '1'}
                        </td>
                        <td className="py-2 text-right text-charcoal-600">{agg.orderCount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-charcoal-200">
          <h2 className="text-lg font-semibold text-charcoal-950">
            Orders ({orders.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-charcoal-50">
              <tr className="text-left">
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={orders.length > 0 && selectedIds.size === orders.length}
                    onChange={handleSelectAll}
                    className="rounded border-charcoal-300"
                  />
                </th>
                <th className="px-4 py-3 font-medium text-charcoal-600">Order #</th>
                <th className="px-4 py-3 font-medium text-charcoal-600">Type</th>
                <th className="px-4 py-3 font-medium text-charcoal-600">Customer</th>
                <th className="px-4 py-3 font-medium text-charcoal-600">Items</th>
                <th className="px-4 py-3 font-medium text-charcoal-600">Status</th>
                <th className="px-4 py-3 font-medium text-charcoal-600">Date</th>
                <th className="px-4 py-3 font-medium text-charcoal-600 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-charcoal-100 hover:bg-cream-50 cursor-pointer transition-colors"
                  onClick={() => {
                    if (order.type === 'wholesale') {
                      router.push(`/admin/wholesale/orders/${order.orderNumber}`);
                    } else {
                      router.push(`/admin/orders/${order.orderNumber}`);
                    }
                  }}
                >
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(order.id)}
                      onChange={() => handleSelect(order.id)}
                      className="rounded border-charcoal-300"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-charcoal-950">{order.orderNumber}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        order.type === 'wholesale'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-sky-100 text-sky-800'
                      }`}
                    >
                      {order.type === 'wholesale' ? 'W' : 'R'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-charcoal-900">{order.name}</div>
                    {order.company && (
                      <div className="text-xs text-charcoal-500">{order.company}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-charcoal-600">
                    {order.items.reduce((s, i) => s + i.quantity, 0)} items
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={order.status as any} />
                  </td>
                  <td className="px-4 py-3 text-charcoal-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-charcoal-950">
                    {formatPrice(order.total)}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-charcoal-500">
                    No unfulfilled orders. All caught up!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Import Tracking Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-charcoal-200">
              <h2 className="text-xl font-bold text-charcoal-950">Import Tracking Numbers</h2>
              <p className="text-sm text-charcoal-600 mt-1">
                Upload a CSV or XLSX (Pirate Ship export) with Order Number, Tracking Number, and optional Carrier columns.
              </p>
            </div>

            <div className="p-6 space-y-4">
              {/* File upload */}
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-2">
                  CSV or XLSX File
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-charcoal-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {/* Preview */}
              {importPreview.length > 0 && !importResult && (
                <div>
                  <h3 className="text-sm font-medium text-charcoal-700 mb-2">
                    Preview ({importPreview.length} rows)
                  </h3>
                  <div className="border border-charcoal-200 rounded-lg overflow-hidden max-h-48 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-charcoal-50 sticky top-0">
                        <tr>
                          <th className="px-3 py-2 text-left font-medium text-charcoal-600">Order # / Recipient</th>
                          <th className="px-3 py-2 text-left font-medium text-charcoal-600">Tracking #</th>
                          <th className="px-3 py-2 text-left font-medium text-charcoal-600">Carrier</th>
                        </tr>
                      </thead>
                      <tbody>
                        {importPreview.map((row, i) => (
                          <tr key={i} className="border-t border-charcoal-100">
                            <td className="px-3 py-2 font-mono text-xs">{row.orderNumber}</td>
                            <td className="px-3 py-2 font-mono text-xs">{row.trackingNumber}</td>
                            <td className="px-3 py-2 text-xs">{row.carrier}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Send emails checkbox — defaults to ON. Unchecking triggers a confirmation
                      modal on submit to prevent another missed-notification incident. */}
                  <label className="flex items-start gap-2 mt-3 text-sm text-charcoal-700">
                    <input
                      type="checkbox"
                      checked={sendEmails}
                      onChange={(e) => setSendEmails(e.target.checked)}
                      className="mt-0.5 rounded border-charcoal-300"
                    />
                    <span>
                      <span className="font-medium">Send shipping notifications (recommended)</span>
                      {!sendEmails && (
                        <span className="block text-xs text-red-600 mt-0.5">
                          ⚠ Unchecking this will mark orders SHIPPED without emailing customers.
                          You will be asked to confirm.
                        </span>
                      )}
                    </span>
                  </label>
                </div>
              )}

              {/* Import Result */}
              {importResult && (
                <div className="space-y-2">
                  <div className="flex gap-4 text-sm">
                    <span className="text-green-600 font-medium">{importResult.updated} updated</span>
                    <span className="text-red-600 font-medium">{importResult.errors.length} errors</span>
                    <span className="text-charcoal-500">{importResult.skipped} skipped</span>
                  </div>
                  {importResult.errors.length > 0 && (
                    <div className="bg-red-50 rounded-lg p-3 text-sm">
                      {importResult.errors.map((err, i) => (
                        <div key={i} className="text-red-700">
                          <span className="font-mono">{err.orderNumber}</span>: {err.error}
                        </div>
                      ))}
                    </div>
                  )}
                  {importResult.debug?.parsedRows && importResult.debug.parsedRows.length > 0 && (
                    <details className="text-xs">
                      <summary className="cursor-pointer text-charcoal-500 hover:text-charcoal-700">
                        Debug: {importResult.debug.format === 'pirate-ship' ? 'Pirate Ship format' : 'Standard format'} — {importResult.debug.parsedRows.length} rows parsed
                      </summary>
                      <div className="mt-2 bg-charcoal-50 rounded-lg p-3 max-h-48 overflow-y-auto font-mono">
                        {importResult.debug.parsedRows.map((row: any, i: number) => (
                          <div key={i} className="text-charcoal-600">
                            {row.identifier || '(empty)'} → {row.trackingNumber || '(empty)'} [{row.carrier}]
                            {row.matchedOrder && <span className="text-green-600 ml-2">✓ {row.matchedOrder}</span>}
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-charcoal-200 flex justify-end gap-3">
              <button
                onClick={closeImportModal}
                className="px-4 py-2 text-sm font-medium text-charcoal-700 hover:text-charcoal-950 transition-colors"
              >
                {importResult ? 'Close' : 'Cancel'}
              </button>
              {!importResult && (
                <button
                  onClick={handleImport}
                  disabled={!importFile || importPreview.length === 0 || importing}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {importing ? 'Importing...' : `Import ${importPreview.length} Tracking Numbers`}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
