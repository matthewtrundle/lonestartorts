'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useLanguage } from '@/lib/language-context';

// Generate carrier-specific tracking URL
function getTrackingUrl(carrier: string | undefined, trackingNumber: string): string {
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
  const { t } = useLanguage();
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
    <main className="min-h-screen bg-cream-50 pt-40 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal-950 mb-3">
              {t('track.title')}
            </h1>
            <p className="text-gray-600 text-lg">
              {t('track.subtitle')}
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
                  {t('track.orderNumber')}
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
                  {t('track.emailAddress')}
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
                      ? t('track.orderNumberPlaceholder')
                      : t('track.emailPlaceholder')
                  }
                  className="flex-1 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sunset-500"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-sunset-500 text-white font-medium rounded hover:bg-sunset-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? t('track.searching') : t('track.trackOrder')}
                </button>
              </div>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded text-red-800">
                {error}
              </div>
            )}
          </div>

          {/* Tracking Information */}
          {!order && (
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-charcoal-950 mb-4">{t('track.timeline.title')}</h2>
                <div className="space-y-4 text-charcoal-700">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-sunset-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sunset-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{t('track.timeline.step1.title')}</h3>
                      <p className="text-sm">{t('track.timeline.step1.desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-sunset-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sunset-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{t('track.timeline.step2.title')}</h3>
                      <p className="text-sm">{t('track.timeline.step2.desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-sunset-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sunset-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{t('track.timeline.step3.title')}</h3>
                      <p className="text-sm">{t('track.timeline.step3.desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-sunset-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sunset-600 font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{t('track.timeline.step4.title')}</h3>
                      <p className="text-sm">{t('track.timeline.step4.desc')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-charcoal-950 mb-4">{t('track.faq.title')}</h2>
                <div className="space-y-4">
                  <details className="group" open>
                    <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                      {t('track.faq.q1.question')}
                      <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <p className="text-sm text-charcoal-700 mt-2">{t('track.faq.q1.answer')}</p>
                  </details>
                  <details className="group">
                    <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                      {t('track.faq.q2.question')}
                      <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <p className="text-sm text-charcoal-700 mt-2">{t('track.faq.q2.answer')}</p>
                  </details>
                  <details className="group">
                    <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                      {t('track.faq.q3.question')}
                      <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <p className="text-sm text-charcoal-700 mt-2">{t('track.faq.q3.answer')}</p>
                  </details>
                  <details className="group">
                    <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                      {t('track.faq.q4.question')}
                      <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </summary>
                    <p className="text-sm text-charcoal-700 mt-2">{t('track.faq.q4.answer')}</p>
                  </details>
                </div>
              </div>
            </div>
          )}

          {/* Order Details */}
          {order && (
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Order Header */}
              <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{t('track.order.title')} {order.orderNumber}</h2>
                  <p className="text-gray-600">{t('track.order.placedOn')} {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`px-4 py-2 rounded font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              {/* Tracking Info */}
              {order.trackingNumber && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
                  <h3 className="font-semibold mb-2">{t('track.order.trackingInfo')}</h3>
                  <p className="text-sm text-gray-700">
                    {t('track.order.carrier')}: {order.carrier}
                  </p>
                  <p className="text-sm text-gray-700 mb-3">
                    {t('track.order.trackingNumber')}: {order.trackingNumber}
                  </p>
                  <a
                    href={getTrackingUrl(order.carrier, order.trackingNumber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                  >
                    Track Package →
                  </a>
                </div>
              )}

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">{t('track.order.items')}</h3>
                <div className="space-y-4">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center pb-4 border-b border-gray-200 last:border-0">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">{t('track.order.quantity')}: {item.quantity}</p>
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
                  <span className="text-gray-600">{t('track.order.subtotal')}</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('track.order.shipping')}</span>
                  <span>{formatPrice(order.shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('track.order.tax')}</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2">
                  <span>{t('track.order.total')}</span>
                  <span className="text-sunset-600">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
  );
}