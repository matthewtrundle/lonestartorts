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
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-2 text-sm text-charcoal-600 hover:text-charcoal-950 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Orders
      </Link>

      {/* Order Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-charcoal-950 mb-2">
              Order {order.orderNumber}
            </h1>
            <p className="text-charcoal-600">
              Placed on {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusBadge status={order.status as any} />
            <StatusBadge status={order.paymentStatus as any} type="payment" />
          </div>
        </div>
      </div>

      {/* Order Timeline */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-charcoal-950 mb-4">Order Status</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-charcoal-950">Order Received</p>
              <p className="text-sm text-charcoal-600">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            {order.status === 'PENDING' ? (
              <Circle className="w-5 h-5 text-charcoal-300 mt-0.5" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            )}
            <div>
              <p className="font-medium text-charcoal-950">Processing</p>
              {order.status !== 'PENDING' && (
                <p className="text-sm text-charcoal-600">Order is being prepared</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            {order.status === 'SHIPPED' || order.status === 'DELIVERED' ? (
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            ) : (
              <Circle className="w-5 h-5 text-charcoal-300 mt-0.5" />
            )}
            <div>
              <p className="font-medium text-charcoal-950">Shipped</p>
              {order.shippedAt && (
                <p className="text-sm text-charcoal-600">
                  {new Date(order.shippedAt).toLocaleString()}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            {order.status === 'DELIVERED' ? (
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            ) : (
              <Circle className="w-5 h-5 text-charcoal-300 mt-0.5" />
            )}
            <div>
              <p className="font-medium text-charcoal-950">Delivered</p>
              {order.deliveredAt && (
                <p className="text-sm text-charcoal-600">
                  {new Date(order.deliveredAt).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Status Actions */}
        <div className="mt-6 pt-6 border-t border-charcoal-200 flex gap-3">
          {order.status === 'PENDING' && (
            <button
              onClick={() => updateOrderStatus('PROCESSING')}
              disabled={updating}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Mark as Processing
            </button>
          )}
          {order.status === 'SHIPPED' && (
            <button
              onClick={() => updateOrderStatus('DELIVERED')}
              disabled={updating}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              Mark as Delivered
            </button>
          )}
        </div>
      </div>

      {/* Customer & Shipping Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-charcoal-950 mb-4">Customer Details</h2>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium text-charcoal-700">Name:</span> {order.customerName}
            </p>
            <p className="text-sm">
              <span className="font-medium text-charcoal-700">Email:</span> {order.email}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-charcoal-950 mb-4">Shipping Address</h2>
          <div className="text-sm text-charcoal-700 space-y-1">
            <p>{order.customerName}</p>
            <p>{order.shippingAddress.line1}</p>
            {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.postal_code}
            </p>
            <p>{order.shippingAddress.country || 'United States'}</p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-charcoal-950 mb-4">Order Items</h2>
        <table className="w-full">
          <thead className="border-b border-charcoal-200">
            <tr>
              <th className="text-left py-2 text-sm font-medium text-charcoal-600">Product</th>
              <th className="text-center py-2 text-sm font-medium text-charcoal-600">Qty</th>
              <th className="text-right py-2 text-sm font-medium text-charcoal-600">Price</th>
              <th className="text-right py-2 text-sm font-medium text-charcoal-600">Total</th>
            </tr>
          </thead>
          <tbody>
            {productItems.map((item, index) => (
              <tr key={index} className="border-b border-charcoal-100">
                <td className="py-3 text-sm text-charcoal-900">{item.name}</td>
                <td className="py-3 text-sm text-center text-charcoal-600">{item.quantity}</td>
                <td className="py-3 text-sm text-right text-charcoal-900">
                  {formatPrice(item.price)}
                </td>
                <td className="py-3 text-sm text-right text-charcoal-900">
                  {formatPrice(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="pt-4 text-right text-sm text-charcoal-600">
                Subtotal:
              </td>
              <td className="pt-4 text-right text-sm font-medium">{formatPrice(order.subtotal)}</td>
            </tr>
            <tr>
              <td colSpan={3} className="pt-2 text-right text-sm text-charcoal-600">
                Shipping:
              </td>
              <td className="pt-2 text-right text-sm font-medium">{formatPrice(order.shipping)}</td>
            </tr>
            <tr>
              <td colSpan={3} className="pt-2 text-right text-sm text-charcoal-600">
                Tax:
              </td>
              <td className="pt-2 text-right text-sm font-medium">{formatPrice(order.tax)}</td>
            </tr>
            <tr className="border-t border-charcoal-200">
              <td colSpan={3} className="pt-4 text-right text-lg font-semibold text-charcoal-950">
                Total:
              </td>
              <td className="pt-4 text-right text-lg font-bold text-sunset-600">
                {formatPrice(order.total)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Tracking Information */}
      {(order.status === 'PROCESSING' || order.status === 'SHIPPED') && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-charcoal-950 mb-4">Shipping & Tracking</h2>

          {order.status === 'SHIPPED' && order.trackingNumber ? (
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium text-charcoal-700">Carrier:</span> {order.carrier}
              </p>
              <p className="text-sm">
                <span className="font-medium text-charcoal-700">Tracking Number:</span>{' '}
                <code className="bg-charcoal-100 px-2 py-1 rounded">{order.trackingNumber}</code>
              </p>
              {order.carrier?.toLowerCase().includes('usps') && (
                <a
                  href={`https://tools.usps.com/go/TrackConfirmAction?tLabels=${order.trackingNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm text-sunset-600 hover:text-sunset-700"
                >
                  Track Package →
                </a>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-2">
                  Carrier
                </label>
                <select
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500"
                >
                  <option value="USPS">USPS</option>
                  <option value="USPS Priority Mail">USPS Priority Mail</option>
                  <option value="USPS First Class">USPS First Class</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-2">
                  Tracking Number
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number"
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={generateShippingLabel}
                  disabled={generatingLabel || updating}
                  className="flex-1 px-4 py-3 bg-sunset-600 text-white rounded-lg hover:bg-sunset-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
                >
                  <Package className="w-5 h-5" />
                  {generatingLabel ? 'Generating Label...' : 'Generate Shipping Label (EasyPost)'}
                </button>
              </div>

              <div className="mt-3 pt-3 border-t border-charcoal-200">
                <p className="text-xs text-charcoal-600 mb-3">Or manually enter tracking:</p>
                <button
                  onClick={markAsShipped}
                  disabled={updating || !trackingNumber.trim()}
                  className="w-full px-4 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
                >
                  <Truck className="w-5 h-5" />
                  {updating ? 'Updating...' : 'Mark as Shipped & Send Email'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Payment Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-charcoal-950 mb-4">Payment Information</h2>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-medium text-charcoal-700">Method:</span> Stripe
          </p>
          <p className="text-sm">
            <span className="font-medium text-charcoal-700">Status:</span>{' '}
            <StatusBadge status={order.paymentStatus as any} type="payment" />
          </p>
          {order.stripePaymentId && (
            <p className="text-sm">
              <span className="font-medium text-charcoal-700">Transaction ID:</span>{' '}
              <code className="bg-charcoal-100 px-2 py-1 rounded text-xs">
                {order.stripePaymentId}
              </code>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
