'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { formatPrice } from '@/lib/utils';
import { ArrowLeft, Package, Truck, CheckCircle, Circle } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  shippingAddress: any;
  items: any[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: string;
  paymentStatus: string;
  stripePaymentId: string | null;
  trackingNumber: string | null;
  carrier: string | null;
  createdAt: string;
  shippedAt: string | null;
  deliveredAt: string | null;
}

export default function OrderDetailPage({ params }: { params: { orderNumber: string } }) {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [carrier, setCarrier] = useState('USPS');
  const [generatingLabel, setGeneratingLabel] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [params.orderNumber]);

  const fetchOrder = async () => {
    try {
      // Find order by orderNumber
      const response = await fetch(`/api/admin/orders?search=${params.orderNumber}`);
      if (!response.ok) throw new Error('Failed to fetch order');

      const data = await response.json();
      const foundOrder = data.orders.find((o: Order) => o.orderNumber === params.orderNumber);

      if (!foundOrder) {
        throw new Error('Order not found');
      }

      setOrder(foundOrder);
      setTrackingNumber(foundOrder.trackingNumber || '');
      setCarrier(foundOrder.carrier || 'USPS');
    } catch (err) {
      console.error('Error fetching order:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (newStatus: string) => {
    if (!order) return;

    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update order');

      await fetchOrder();
      alert('Order status updated successfully!');
    } catch (err) {
      alert('Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  const markAsShipped = async () => {
    if (!order || !trackingNumber.trim()) {
      alert('Please enter a tracking number');
      return;
    }

    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'SHIPPED',
          trackingNumber: trackingNumber.trim(),
          carrier,
        }),
      });

      if (!response.ok) throw new Error('Failed to mark as shipped');

      await fetchOrder();
      alert('Order marked as shipped! Tracking email sent to customer.');
    } catch (err) {
      alert('Failed to mark order as shipped');
    } finally {
      setUpdating(false);
    }
  };

  const generateShippingLabel = async () => {
    if (!order) return;

    if (!confirm('Generate shipping label via EasyPost? This will charge your EasyPost account.')) {
      return;
    }

    setGeneratingLabel(true);
    try {
      const response = await fetch(`/api/admin/orders/${order.id}/label`, {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate label');
      }

      const data = await response.json();

      // Open label in new tab
      if (data.shipment?.labelUrl) {
        window.open(data.shipment.labelUrl, '_blank');
      }

      await fetchOrder();
      alert(
        `Shipping label generated!\nTracking: ${data.shipment.trackingNumber}\nCarrier: ${data.shipment.carrier}\nRate: $${data.shipment.rate.rate} ${data.shipment.rate.currency.toUpperCase()}`
      );
    } catch (err: any) {
      alert(err.message || 'Failed to generate shipping label');
    } finally {
      setGeneratingLabel(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunset-600 mx-auto mb-4"></div>
          <p className="text-charcoal-600">Loading order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-charcoal-600 mb-4">Order not found</p>
        <Link href="/admin/orders" className="text-sunset-600 hover:text-sunset-700">
          ← Back to Orders
        </Link>
      </div>
    );
  }

  const productItems = order.items.filter((item) => item.sku !== 'SHIPPING');

  return (
    <div className="space-y-4">
      {/* Compact Header with Back Button */}
      <div className="flex justify-between items-center">
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 text-sm text-charcoal-600 hover:text-charcoal-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <div className="flex gap-2">
          <StatusBadge status={order.status as any} />
          <StatusBadge status={order.paymentStatus as any} type="payment" />
        </div>
      </div>

      {/* Compact Order Header */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-charcoal-950">
              {order.orderNumber}
            </h1>
            <p className="text-sm text-charcoal-600">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-charcoal-600">Total</div>
            <div className="text-2xl font-bold text-sunset-600">{formatPrice(order.total)}</div>
          </div>
        </div>
      </div>

      {/* Quick Ship Section - Top Priority */}
      {(order.status === 'PROCESSING' || order.status === 'SHIPPED') && (
        <div className={`rounded-lg shadow p-4 ${order.status === 'SHIPPED' ? 'bg-green-50 border-2 border-green-200' : 'bg-blue-50 border-2 border-blue-300'}`}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-charcoal-950 mb-2 flex items-center gap-2">
                {order.status === 'SHIPPED' ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Shipped
                  </>
                ) : (
                  <>
                    <Truck className="w-5 h-5 text-blue-600" />
                    Ready to Ship
                  </>
                )}
              </h2>

              {order.status === 'SHIPPED' && order.trackingNumber ? (
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Carrier:</span> {order.carrier}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Tracking:</span>{' '}
                    <code className="bg-white px-2 py-0.5 rounded border">{order.trackingNumber}</code>
                  </p>
                  {order.carrier?.toLowerCase().includes('usps') && (
                    <a
                      href={`https://tools.usps.com/go/TrackConfirmAction?tLabels=${order.trackingNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Track Package →
                    </a>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1">
                      Carrier
                    </label>
                    <select
                      value={carrier}
                      onChange={(e) => setCarrier(e.target.value)}
                      className="w-full px-3 py-1.5 text-sm border border-charcoal-300 rounded focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="USPS">USPS</option>
                      <option value="USPS Priority Mail">USPS Priority</option>
                      <option value="USPS First Class">USPS First Class</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-charcoal-700 mb-1">
                      Tracking Number
                    </label>
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="123456789"
                      className="w-full px-3 py-1.5 text-sm border border-charcoal-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {order.status === 'PROCESSING' && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={markAsShipped}
                  disabled={updating || !trackingNumber.trim()}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  <Truck className="w-5 h-5" />
                  {updating ? 'Shipping...' : 'Ship Now'}
                </button>
                <button
                  onClick={generateShippingLabel}
                  disabled={generatingLabel || updating}
                  className="px-6 py-2 bg-sunset-600 text-white text-sm rounded-lg hover:bg-sunset-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {generatingLabel ? 'Generating...' : 'Generate Label'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Order Timeline - Collapsed */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-base font-semibold text-charcoal-950 mb-3">Status</h2>
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-charcoal-600">Received</span>
          </div>
          <div className="flex items-center gap-2">
            {order.status === 'PENDING' ? (
              <Circle className="w-4 h-4 text-charcoal-300" />
            ) : (
              <CheckCircle className="w-4 h-4 text-green-600" />
            )}
            <span className="text-charcoal-600">Processing</span>
          </div>
          <div className="flex items-center gap-2">
            {order.status === 'SHIPPED' || order.status === 'DELIVERED' ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <Circle className="w-4 h-4 text-charcoal-300" />
            )}
            <span className="text-charcoal-600">Shipped</span>
          </div>
          <div className="flex items-center gap-2">
            {order.status === 'DELIVERED' ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <Circle className="w-4 h-4 text-charcoal-300" />
            )}
            <span className="text-charcoal-600">Delivered</span>
          </div>
        </div>

        {/* Quick Status Actions */}
        {order.status === 'PENDING' && (
          <div className="mt-3 pt-3 border-t border-charcoal-200">
            <button
              onClick={() => updateOrderStatus('PROCESSING')}
              disabled={updating}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Start Processing
            </button>
          </div>
        )}
        {order.status === 'SHIPPED' && (
          <div className="mt-3 pt-3 border-t border-charcoal-200">
            <button
              onClick={() => updateOrderStatus('DELIVERED')}
              disabled={updating}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              Mark Delivered
            </button>
          </div>
        )}
      </div>

      {/* Compact Customer & Shipping Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-base font-semibold text-charcoal-950 mb-2">Customer</h2>
          <div className="text-sm space-y-1">
            <p className="font-medium text-charcoal-900">{order.customerName}</p>
            <p className="text-charcoal-600">{order.email}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-base font-semibold text-charcoal-950 mb-2">Shipping To</h2>
          <div className="text-sm text-charcoal-700 space-y-0.5">
            <p>{order.shippingAddress.line1}</p>
            {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.postal_code}
            </p>
          </div>
        </div>
      </div>

      {/* Compact Order Items */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-base font-semibold text-charcoal-950 mb-3">Items</h2>
        <div className="space-y-2">
          {productItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm border-b border-charcoal-100 pb-2 last:border-0">
              <div className="flex-1">
                <span className="font-medium text-charcoal-900">{item.name}</span>
                <span className="text-charcoal-500 ml-2">× {item.quantity}</span>
              </div>
              <span className="font-medium text-charcoal-900">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-charcoal-200 space-y-1 text-sm">
          <div className="flex justify-between text-charcoal-600">
            <span>Subtotal:</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-charcoal-600">
            <span>Shipping:</span>
            <span>{formatPrice(order.shipping)}</span>
          </div>
          <div className="flex justify-between text-charcoal-600">
            <span>Tax:</span>
            <span>{formatPrice(order.tax)}</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-2 border-t border-charcoal-200">
            <span>Total:</span>
            <span className="text-sunset-600">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
