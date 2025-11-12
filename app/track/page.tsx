'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { Header } from '@/components/layout/Header';

interface Order {
  orderNumber: string;
  email: string;
  customerName: string;
  items: any[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: string;
  trackingNumber?: string;
  carrier?: string;
  createdAt: string;
  shippedAt?: string;
  deliveredAt?: string;
}

export default function TrackOrderPage() {
  const [searchType, setSearchType] = useState<'orderNumber' | 'email'>('orderNumber');
  const [searchValue, setSearchValue] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const params = new URLSearchParams({
        [searchType]: searchValue,
      });

      const response = await fetch(`/api/webhook?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Order not found');
      }

      setOrder(data.order);
    } catch (err) {
      console.error('Order tracking error:', err);
      setError(err instanceof Error ? err.message : 'Failed to find order');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return 'text-gray-600 bg-gray-100';
      case 'PROCESSING':
        return 'text-blue-600 bg-blue-100';
      case 'SHIPPED':
        return 'text-green-600 bg-green-100';
      case 'DELIVERED':
        return 'text-emerald-600 bg-emerald-100';
      case 'CANCELLED':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <>
      <DisclaimerBanner />
      <Header />

      <main className="min-h-screen bg-cream-50 pt-40 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal-950 mb-3">
              Track Your Order
            </h1>
            <p className="text-gray-600 text-lg">
              Enter your order number or email to view your order status
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <form onSubmit={handleSearch}>
              {/* Search Type Toggle */}
              <div className="flex gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setSearchType('orderNumber')}
                  className={`px-4 py-2 rounded transition-colors ${
                    searchType === 'orderNumber'
                      ? 'bg-sunset-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Order Number
                </button>
                <button
                  type="button"
                  onClick={() => setSearchType('email')}
                  className={`px-4 py-2 rounded transition-colors ${
                    searchType === 'email'
                      ? 'bg-sunset-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Email Address
                </button>
              </div>

              {/* Search Input */}
              <div className="flex gap-4">
                <input
                  type={searchType === 'email' ? 'email' : 'text'}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={
                    searchType === 'orderNumber'
                      ? 'Enter order number (e.g., LST-1234567890-ABC)'
                      : 'Enter email address'
                  }
                  className="flex-1 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sunset-500"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-sunset-500 text-white font-medium rounded hover:bg-sunset-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Searching...' : 'Track Order'}
                </button>
              </div>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded text-red-800">
                {error}
              </div>
            )}
          </div>

          {/* Order Details */}
          {order && (
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Order Header */}
              <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Order {order.orderNumber}</h2>
                  <p className="text-gray-600">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`px-4 py-2 rounded font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              {/* Tracking Info */}
              {order.trackingNumber && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
                  <h3 className="font-semibold mb-2">Tracking Information</h3>
                  <p className="text-sm text-gray-700">
                    Carrier: {order.carrier}
                  </p>
                  <p className="text-sm text-gray-700">
                    Tracking #: {order.trackingNumber}
                  </p>
                </div>
              )}

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                <div className="space-y-4">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center pb-4 border-b border-gray-200 last:border-0">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Totals */}
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{formatPrice(order.shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2">
                  <span>Total</span>
                  <span className="text-sunset-600">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}