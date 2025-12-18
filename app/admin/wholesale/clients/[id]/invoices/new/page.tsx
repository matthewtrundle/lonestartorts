'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, Send, Save } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface Client {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  pricingTier: string;
  discountPercent: number;
  paymentTerms: string;
  stripeCustomerId: string | null;
}

interface LineItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number; // In cents
}

// Product catalog for quick add
const productCatalog = [
  { name: 'Flour Tortillas (20 pack)', sku: 'FLOUR-20', price: 899 },
  { name: 'Corn Tortillas (30 pack)', sku: 'CORN-30', price: 699 },
  { name: 'Butter Flour Tortillas (20 pack)', sku: 'BUTTER-20', price: 999 },
];

export default function CreateInvoicePage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;

  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Invoice form state
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [customerNotes, setCustomerNotes] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const [autoSend, setAutoSend] = useState(false);

  useEffect(() => {
    fetchClient();
  }, [clientId]);

  const fetchClient = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/wholesale/clients/${clientId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch client');
      }

      const data = await response.json();
      setClient(data.client);

      // Check if client has Stripe customer ID
      if (!data.client.stripeCustomerId) {
        setError('This client does not have a Stripe customer ID. Please update the client first.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load client');
    } finally {
      setLoading(false);
    }
  };

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      {
        id: crypto.randomUUID(),
        name: '',
        description: '',
        quantity: 1,
        unitPrice: 0,
      },
    ]);
  };

  const addProductFromCatalog = (product: typeof productCatalog[0]) => {
    setLineItems([
      ...lineItems,
      {
        id: crypto.randomUUID(),
        name: product.name,
        description: product.sku,
        quantity: 1,
        unitPrice: product.price,
      },
    ]);
  };

  const updateLineItem = (id: string, updates: Partial<LineItem>) => {
    setLineItems(lineItems.map(item =>
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal - discount + shipping;
  };

  const handleSubmit = async (sendImmediately: boolean) => {
    if (lineItems.length === 0) {
      setError('Please add at least one line item');
      return;
    }

    if (lineItems.some(item => !item.name || item.unitPrice <= 0)) {
      setError('Please fill in all line item details');
      return;
    }

    try {
      setSaving(true);
      setError('');

      const response = await fetch('/api/admin/wholesale/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          items: lineItems.map(item => ({
            name: item.name,
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
          discount,
          shipping,
          customerNotes,
          internalNotes,
          autoSend: sendImmediately,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create invoice');
      }

      const data = await response.json();
      router.push(`/admin/wholesale/invoices/${data.invoice.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create invoice');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunset-600 mx-auto mb-4"></div>
          <p className="text-charcoal-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-4">Client not found</p>
          <Link href="/admin/wholesale/clients" className="text-sunset-600 hover:text-sunset-700">
            Back to Clients
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href={`/admin/wholesale/clients/${clientId}`}
          className="p-2 hover:bg-charcoal-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5 text-charcoal-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-charcoal-950">Create Invoice</h1>
          <p className="text-sm text-charcoal-600">For {client.businessName}</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="md:col-span-2 space-y-6">
          {/* Quick Add Products */}
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="font-semibold text-charcoal-950 mb-4">Quick Add Products</h2>
            <div className="flex flex-wrap gap-2">
              {productCatalog.map((product) => (
                <button
                  key={product.sku}
                  onClick={() => addProductFromCatalog(product)}
                  className="px-3 py-2 bg-charcoal-100 text-charcoal-700 rounded-lg hover:bg-charcoal-200 text-sm"
                >
                  {product.name} - {formatPrice(product.price)}
                </button>
              ))}
            </div>
          </div>

          {/* Line Items */}
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-charcoal-950">Line Items</h2>
              <button
                onClick={addLineItem}
                className="flex items-center gap-1 text-sm text-sunset-600 hover:text-sunset-700"
              >
                <Plus className="w-4 h-4" />
                Add Custom Item
              </button>
            </div>

            {lineItems.length === 0 ? (
              <div className="text-center py-8 text-charcoal-500">
                No items added. Use quick add above or add a custom item.
              </div>
            ) : (
              <div className="space-y-4">
                {lineItems.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-3 items-start border-b border-charcoal-100 pb-4">
                    <div className="col-span-5">
                      <label className="block text-xs text-charcoal-500 mb-1">Item Name</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateLineItem(item.id, { name: e.target.value })}
                        placeholder="Product name"
                        className="w-full px-3 py-2 border border-charcoal-300 rounded-lg text-sm focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-charcoal-500 mb-1">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateLineItem(item.id, { quantity: parseInt(e.target.value) || 1 })}
                        className="w-full px-3 py-2 border border-charcoal-300 rounded-lg text-sm focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-charcoal-500 mb-1">Unit Price ($)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={(item.unitPrice / 100).toFixed(2)}
                        onChange={(e) => updateLineItem(item.id, { unitPrice: Math.round(parseFloat(e.target.value) * 100) || 0 })}
                        className="w-full px-3 py-2 border border-charcoal-300 rounded-lg text-sm focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-charcoal-500 mb-1">Total</label>
                      <div className="px-3 py-2 bg-charcoal-50 rounded-lg text-sm font-medium">
                        {formatPrice(item.quantity * item.unitPrice)}
                      </div>
                    </div>
                    <div className="col-span-1 pt-6">
                      <button
                        onClick={() => removeLineItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="font-semibold text-charcoal-950 mb-4">Notes</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-charcoal-700 mb-1">Customer Notes (shown on invoice)</label>
                <textarea
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="Notes visible to the customer..."
                  className="w-full px-3 py-2 border border-charcoal-300 rounded-lg text-sm focus:ring-2 focus:ring-sunset-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm text-charcoal-700 mb-1">Internal Notes (not shown on invoice)</label>
                <textarea
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Internal notes..."
                  className="w-full px-3 py-2 border border-charcoal-300 rounded-lg text-sm focus:ring-2 focus:ring-sunset-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          {/* Client Info */}
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="font-semibold text-charcoal-950 mb-4">Client</h2>
            <div className="space-y-2 text-sm">
              <div className="font-medium">{client.businessName}</div>
              <div className="text-charcoal-600">{client.contactName}</div>
              <div className="text-charcoal-600">{client.email}</div>
              <div className="mt-3 pt-3 border-t border-charcoal-100">
                <div className="text-charcoal-500">Payment Terms</div>
                <div className="font-medium">{client.paymentTerms.replace('_', ' ')}</div>
              </div>
            </div>
          </div>

          {/* Totals */}
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="font-semibold text-charcoal-950 mb-4">Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-charcoal-600">Subtotal</span>
                <span className="font-medium">{formatPrice(calculateSubtotal())}</span>
              </div>

              <div>
                <label className="block text-xs text-charcoal-500 mb-1">Discount ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={(discount / 100).toFixed(2)}
                  onChange={(e) => setDiscount(Math.round(parseFloat(e.target.value) * 100) || 0)}
                  className="w-full px-3 py-2 border border-charcoal-300 rounded-lg text-sm focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs text-charcoal-500 mb-1">Shipping ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={(shipping / 100).toFixed(2)}
                  onChange={(e) => setShipping(Math.round(parseFloat(e.target.value) * 100) || 0)}
                  className="w-full px-3 py-2 border border-charcoal-300 rounded-lg text-sm focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                />
              </div>

              <div className="pt-3 border-t border-charcoal-200 flex justify-between">
                <span className="font-semibold text-charcoal-950">Total</span>
                <span className="font-bold text-lg text-charcoal-950">{formatPrice(calculateTotal())}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow p-5">
            <div className="space-y-3">
              <button
                onClick={() => handleSubmit(true)}
                disabled={saving || lineItems.length === 0 || !client.stripeCustomerId}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-sunset-600 text-white rounded-lg hover:bg-sunset-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {saving ? 'Creating...' : 'Create & Send Invoice'}
              </button>
              <button
                onClick={() => handleSubmit(false)}
                disabled={saving || lineItems.length === 0 || !client.stripeCustomerId}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-charcoal-100 text-charcoal-700 rounded-lg hover:bg-charcoal-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Creating...' : 'Save as Draft'}
              </button>
            </div>
            {!client.stripeCustomerId && (
              <p className="mt-3 text-xs text-red-600">
                Cannot create invoice: Client needs a Stripe customer ID
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
