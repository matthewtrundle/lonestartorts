'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { formatPrice } from '@/lib/utils';
import { ArrowLeft, Package, Truck, CheckCircle, Circle, MessageSquare, Star } from 'lucide-react';

// Generate carrier-specific tracking URL
function getTrackingUrl(carrier: string | null, trackingNumber: string): string {
  if (!carrier) return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`;

  const normalizedCarrier = carrier.toLowerCase();

  if (normalizedCarrier.includes('ups')) {
    return `https://www.ups.com/track?tracknum=${trackingNumber}`;
  } else if (normalizedCarrier.includes('fedex')) {
    return `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`;
  } else {
    // Default to USPS
    return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`;
  }
}

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
  const [feedbackStatus, setFeedbackStatus] = useState<{
    hasFeedback: boolean;
    emailSentAt?: string;
    rating?: number;
    couponCode?: string;
  } | null>(null);
  const [sendingFeedback, setSendingFeedback] = useState(false);
  const [showDeliveryDatePicker, setShowDeliveryDatePicker] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState('');

  useEffect(() => {
    fetchOrder();
  }, [params.orderNumber]);

  useEffect(() => {
    if (order?.id) {
      fetchFeedbackStatus();
    }
  }, [order?.id]);

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

  const fetchFeedbackStatus = async () => {
    if (!order?.id) return;

    try {
      const response = await fetch(`/api/admin/orders/${order.id}/feedback`);
      if (response.ok) {
        const data = await response.json();
        setFeedbackStatus(data.hasFeedback ? {
          hasFeedback: true,
          emailSentAt: data.feedback?.emailSentAt,
          rating: data.feedback?.rating,
          couponCode: data.feedback?.couponCode,
        } : { hasFeedback: false });
      }
    } catch (err) {
      console.error('Error fetching feedback status:', err);
    }
  };

  const requestFeedback = async () => {
    if (!order?.id) return;

    setSendingFeedback(true);
    try {
      const response = await fetch(`/api/admin/orders/${order.id}/feedback`, {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send feedback request');
      }

      alert('Feedback request email sent successfully!');
      await fetchFeedbackStatus();
    } catch (err: any) {
      alert(err.message || 'Failed to send feedback request');
    } finally {
      setSendingFeedback(false);
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

  const markAsShipped = async (skipEmail = false) => {
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
          skipEmail,
        }),
      });

      if (!response.ok) throw new Error('Failed to mark as shipped');

      await fetchOrder();
      alert(skipEmail ? 'Order marked as shipped (no email sent).' : 'Order marked as shipped! Tracking email sent to customer.');
    } catch (err) {
      alert('Failed to mark order as shipped');
    } finally {
      setUpdating(false);
    }
  };

  const markAsDeliveredWithDate = async (customDate?: string) => {
    if (!order) return;

    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'DELIVERED',
          deliveredAt: customDate || undefined,
        }),
      });

      if (!response.ok) throw new Error('Failed to mark as delivered');

      await fetchOrder();
      setShowDeliveryDatePicker(false);
      setDeliveryDate('');
      alert('Order marked as delivered!');
    } catch (err) {
      alert('Failed to mark order as delivered');
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
                  <a
                    href={getTrackingUrl(order.carrier, order.trackingNumber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Track Package →
                  </a>
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
                      <optgroup label="USPS">
                        <option value="USPS">USPS</option>
                        <option value="USPS Priority Mail">USPS Priority</option>
                        <option value="USPS First Class">USPS First Class</option>
                      </optgroup>
                      <optgroup label="UPS">
                        <option value="UPS">UPS</option>
                        <option value="UPS Ground">UPS Ground</option>
                        <option value="UPS 2nd Day Air">UPS 2nd Day Air</option>
                        <option value="UPS Next Day Air">UPS Next Day Air</option>
                      </optgroup>
                      <optgroup label="FedEx">
                        <option value="FedEx">FedEx</option>
                        <option value="FedEx Ground">FedEx Ground</option>
                        <option value="FedEx Express">FedEx Express</option>
                        <option value="FedEx 2Day">FedEx 2Day</option>
                      </optgroup>
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
                  onClick={() => markAsShipped(false)}
                  disabled={updating || !trackingNumber.trim()}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  <Truck className="w-5 h-5" />
                  {updating ? 'Shipping...' : 'Ship Now'}
                </button>
                <button
                  onClick={() => markAsShipped(true)}
                  disabled={updating || !trackingNumber.trim()}
                  className="px-6 py-2 bg-charcoal-500 text-white text-sm rounded-lg hover:bg-charcoal-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Ship (No Email)
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
        {(order.status === 'SHIPPED' || order.status === 'PROCESSING') && order.status !== 'DELIVERED' && (
          <div className="mt-3 pt-3 border-t border-charcoal-200">
            {!showDeliveryDatePicker ? (
              <div className="flex gap-2 items-center flex-wrap">
                <button
                  onClick={() => markAsDeliveredWithDate()}
                  disabled={updating}
                  className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  Mark Delivered (Today)
                </button>
                <button
                  onClick={() => setShowDeliveryDatePicker(true)}
                  disabled={updating}
                  className="px-4 py-2 bg-charcoal-600 text-white text-sm rounded-lg hover:bg-charcoal-700 disabled:opacity-50"
                >
                  Set Custom Delivery Date
                </button>
                {order.status === 'PROCESSING' && (
                  <span className="text-xs text-charcoal-500 italic">
                    (Will skip shipped status - use for manually shipped orders)
                  </span>
                )}
              </div>
            ) : (
              <div className="flex gap-2 items-center flex-wrap">
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="px-3 py-2 text-sm border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={() => markAsDeliveredWithDate(deliveryDate)}
                  disabled={updating || !deliveryDate}
                  className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {updating ? 'Updating...' : 'Confirm Delivered'}
                </button>
                <button
                  onClick={() => { setShowDeliveryDatePicker(false); setDeliveryDate(''); }}
                  className="px-4 py-2 text-charcoal-600 text-sm hover:text-charcoal-800"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Feedback Section */}
      {(order.status === 'SHIPPED' || order.status === 'DELIVERED') && (
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-base font-semibold text-charcoal-950 mb-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Customer Feedback
          </h2>

          {feedbackStatus === null ? (
            <p className="text-sm text-charcoal-500">Loading...</p>
          ) : feedbackStatus.hasFeedback ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-charcoal-600">Email sent:</span>
                <span className="font-medium text-charcoal-900">
                  {feedbackStatus.emailSentAt
                    ? new Date(feedbackStatus.emailSentAt).toLocaleDateString()
                    : 'Yes'}
                </span>
              </div>
              {feedbackStatus.rating ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-charcoal-600">Rating:</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= feedbackStatus.rating!
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-charcoal-200 text-charcoal-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-charcoal-900">
                    ({feedbackStatus.rating}/5)
                  </span>
                </div>
              ) : (
                <p className="text-sm text-amber-600">Awaiting response...</p>
              )}
              {feedbackStatus.couponCode && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-charcoal-600">Coupon issued:</span>
                  <code className="bg-charcoal-100 px-2 py-0.5 rounded font-mono text-sm">
                    {feedbackStatus.couponCode}
                  </code>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={requestFeedback}
                disabled={sendingFeedback}
                className="px-4 py-2 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 disabled:opacity-50 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                {sendingFeedback ? 'Sending...' : 'Request Feedback'}
              </button>
              <span className="text-sm text-charcoal-500">
                Send email to request feedback and offer 10% discount
              </span>
            </div>
          )}
        </div>
      )}

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
            {order.shippingAddress?.line1 ? (
              <>
                <p>{order.shippingAddress.line1}</p>
                {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                  {order.shippingAddress.postal_code}
                </p>
                <p>{order.shippingAddress.country || 'United States'}</p>
              </>
            ) : (
              <p className="text-charcoal-500 italic">No shipping address available</p>
            )}
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
