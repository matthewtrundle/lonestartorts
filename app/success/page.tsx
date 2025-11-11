'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackPurchase } from '@/lib/analytics';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    // Fetch order details using session ID
    fetch(`/api/success?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.order) {
          setOrderDetails(data.order);

          // Track conversion in Google Analytics
          trackPurchase({
            transaction_id: data.order.orderNumber,
            value: data.order.total / 100, // Convert cents to dollars
            currency: 'USD',
            items: data.order.items.map((item: any) => ({
              item_id: item.sku,
              item_name: item.name,
              quantity: item.quantity,
              price: item.price / 100,
            }))
          });
        }
      })
      .catch(error => {
        console.error('Error fetching order:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <svg
            className="w-20 h-20 mx-auto text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-display font-bold text-charcoal-900 mb-4">
          Order Confirmed!
        </h1>

        <p className="text-lg text-charcoal-600 mb-6">
          Thank you for your order! Your authentic H-E-B® tortillas are on their way.
        </p>

        {loading ? (
          <div className="bg-cream-50 rounded-lg p-6 mb-6">
            <div className="animate-pulse space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ) : orderDetails ? (
          <div className="bg-cream-50 rounded-lg p-6 mb-6 text-left">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="space-y-2">
              <p><strong>Order ID:</strong> {orderDetails.orderNumber}</p>
              {orderDetails.email && (
                <p><strong>Email:</strong> {orderDetails.email}</p>
              )}
              {orderDetails.total && (
                <p><strong>Total:</strong> ${(orderDetails.total / 100).toFixed(2)}</p>
              )}
            </div>
            <p className="text-sm text-charcoal-600 mt-4">
              A confirmation email has been sent to your inbox with tracking information.
            </p>
          </div>
        ) : (
          <div className="bg-cream-50 rounded-lg p-6 mb-6 text-left">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <p className="text-sm text-charcoal-600">
              A confirmation email has been sent to your inbox with tracking information.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <p className="text-charcoal-600">
            <strong>What's Next?</strong>
          </p>
          <ul className="text-left list-disc list-inside space-y-2 text-charcoal-700">
            <li>You'll receive a shipping confirmation within 24-48 hours</li>
            <li>Estimated delivery: 2-3 business days</li>
            <li>Track your order using the link in your confirmation email</li>
          </ul>
        </div>

        <div className="mt-8 space-x-4">
          <Link
            href="/"
            className="inline-block bg-sunset-500 hover:bg-sunset-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/track"
            className="inline-block bg-white hover:bg-cream-50 text-sunset-500 border-2 border-sunset-500 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Track Order
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-cream-200">
          <p className="text-sm text-charcoal-500">
            Independent reseller • Not affiliated with or endorsed by H-E-B®
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-pulse">
            <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
          </div>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
