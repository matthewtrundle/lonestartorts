'use client';

import { useState } from 'react';
import { Search, Package, CheckCircle, Truck, Home } from 'lucide-react';
import Link from 'next/link';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setOrderData(null);

    try {
      const response = await fetch(`/api/webhook?id=${orderId}`);

      if (!response.ok) {
        throw new Error('Order not found');
      }

      const data = await response.json();
      setOrderData(data);
    } catch (err) {
      setError('Order not found. Please check your order ID and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderStatus = (status: string) => {
    const statuses = [
      { key: 'confirmed', label: 'Order Confirmed', icon: CheckCircle },
      { key: 'processing', label: 'Processing', icon: Package },
      { key: 'shipped', label: 'Shipped', icon: Truck },
      { key: 'delivered', label: 'Delivered', icon: Home },
    ];

    const currentIndex = statuses.findIndex((s) => s.key === status) || 0;

    return statuses.map((statusItem, index) => ({
      ...statusItem,
      isComplete: index <= currentIndex,
      isCurrent: index === currentIndex,
    }));
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-primary">
              Tortilla Rodeo Co.
            </Link>
            <Link
              href="/"
              className="text-gray-700 hover:text-primary transition"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Track Your Order
          </h1>

          {/* Track Order Form */}
          <form onSubmit={handleTrackOrder} className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter your order ID"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Search className="h-5 w-5" />
                {isLoading ? 'Searching...' : 'Track'}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Order Details */}
          {orderData && (
            <div className="space-y-6">
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold mb-4">Order Status</h2>

                {/* Status Timeline */}
                <div className="relative">
                  <div className="flex justify-between mb-8">
                    {getOrderStatus(orderData.status).map((status, index) => {
                      const Icon = status.icon;
                      return (
                        <div
                          key={status.key}
                          className="flex flex-col items-center relative"
                        >
                          <div
                            className={`
                              rounded-full p-2 mb-2 transition-colors
                              ${status.isComplete
                                ? 'bg-primary text-white'
                                : 'bg-gray-200 text-gray-400'
                              }
                              ${status.isCurrent ? 'ring-4 ring-primary/20' : ''}
                            `}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <span
                            className={`
                              text-sm text-center
                              ${status.isComplete ? 'text-gray-900' : 'text-gray-400'}
                            `}
                          >
                            {status.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Progress Line */}
                  <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10" />
                  <div
                    className="absolute top-5 left-0 h-1 bg-primary -z-10 transition-all"
                    style={{ width: '25%' }}
                  />
                </div>
              </div>

              {/* Order Information */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-4">Order Details</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Order ID:</dt>
                    <dd className="font-mono text-sm">{orderData.id.slice(0, 20)}...</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Date:</dt>
                    <dd>{new Date(orderData.createdAt).toLocaleDateString()}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Total:</dt>
                    <dd className="font-semibold">
                      ${(orderData.amountTotal / 100).toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Estimated Delivery:</dt>
                    <dd>2-3 business days</dd>
                  </div>
                </dl>
              </div>

              {/* Shipping Address */}
              {orderData.shippingAddress && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                  <address className="text-gray-600 not-italic">
                    {orderData.customerName}<br />
                    {orderData.shippingAddress.line1}<br />
                    {orderData.shippingAddress.line2 && (
                      <>{orderData.shippingAddress.line2}<br /></>
                    )}
                    {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.postal_code}<br />
                    {orderData.shippingAddress.country}
                  </address>
                </div>
              )}
            </div>
          )}

          {/* Help Text */}
          {!orderData && !error && (
            <div className="text-center text-gray-500">
              <p className="mb-2">Enter your order ID to track your shipment.</p>
              <p className="text-sm">
                You can find your order ID in your confirmation email.
              </p>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Independent reseller. Not affiliated with or endorsed by H-E-B®.
          </p>
        </div>
      </div>
    </main>
  );
}