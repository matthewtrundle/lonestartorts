'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackPurchase } from '@/lib/analytics';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { clearCart } = useCart();

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    // Clear the cart immediately on successful order
    clearCart();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-amber-600 rounded-full">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Order Confirmed</h1>
          <p className="text-stone-600">Your premium Texas tortillas are on the way</p>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-stone-200 rounded w-3/4"></div>
              <div className="h-4 bg-stone-200 rounded w-1/2"></div>
              <div className="h-4 bg-stone-200 rounded w-2/3"></div>
            </div>
          </div>
        ) : orderDetails ? (
          <>
            {/* Order Number Card */}
            <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-600 mb-1">Order Number</p>
                  <p className="text-2xl font-bold text-stone-900 font-mono">{orderDetails.orderNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-stone-600">
                    {new Date(orderDetails.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary & Shipping Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">

              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-6">
                <h2 className="text-lg font-semibold text-stone-900 mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Subtotal</span>
                    <span className="text-stone-900 font-medium">${(orderDetails.subtotal / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Shipping</span>
                    <span className="text-stone-900 font-medium">${(orderDetails.shipping / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Tax</span>
                    <span className="text-stone-900 font-medium">${(orderDetails.tax / 100).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-stone-200 pt-3 flex justify-between">
                    <span className="font-semibold text-stone-900">Total</span>
                    <span className="font-bold text-amber-600 text-lg">${(orderDetails.total / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              {orderDetails.shippingAddress && (
                <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-6">
                  <h2 className="text-lg font-semibold text-stone-900 mb-4">Shipping Address</h2>
                  <div className="text-sm text-stone-700 space-y-1">
                    <p className="font-medium text-stone-900">{orderDetails.shippingAddress.name}</p>
                    <p>{orderDetails.shippingAddress.address1}</p>
                    {orderDetails.shippingAddress.address2 && <p>{orderDetails.shippingAddress.address2}</p>}
                    <p>
                      {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zip}
                    </p>
                    <p className="text-stone-600">{orderDetails.shippingAddress.country}</p>
                  </div>
                </div>
              )}
            </div>

            {/* What's Next */}
            <div className="bg-amber-50 rounded-lg border border-amber-200 p-6 mb-6">
              <h2 className="text-lg font-semibold text-stone-900 mb-4">What Happens Next</h2>
              <div className="space-y-3">
                {[
                  'Shipping confirmation within 24-48 hours',
                  'Fresh tortillas arrive in 2-3 business days',
                  'Track your package via email updates'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-amber-600 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-stone-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Confirmation */}
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 mb-6">
              <p className="text-sm text-blue-900">
                A confirmation email has been sent to <span className="font-semibold">{orderDetails.email}</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="flex-1 bg-stone-900 hover:bg-stone-800 text-white font-medium py-3 px-6 rounded-lg transition-colors text-center"
              >
                Back to Home
              </Link>
              <Link
                href="/track"
                className="flex-1 bg-white hover:bg-stone-50 text-stone-900 font-medium py-3 px-6 rounded-lg border border-stone-300 transition-colors text-center"
              >
                Track Order
              </Link>
            </div>

          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-8 text-center">
            <p className="text-lg text-stone-900 font-semibold mb-2">
              No order details available
            </p>
            <p className="text-stone-600 text-sm">
              Please check your email for order confirmation.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-stone-200 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg className="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
            </svg>
            <span className="text-lg font-semibold text-stone-900">Lonestar Tortillas</span>
          </div>
          <p className="text-sm text-stone-600 mb-3">Premium Texas Tortillas • Handcrafted in Texas</p>
          <p className="text-xs text-stone-500">
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
      <div className="min-h-screen bg-stone-50 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-stone-200 rounded-full animate-pulse"></div>
            <div className="h-8 bg-stone-200 rounded w-64 mx-auto mb-3 animate-pulse"></div>
            <div className="h-5 bg-stone-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-stone-200 rounded w-3/4"></div>
              <div className="h-4 bg-stone-200 rounded w-1/2"></div>
              <div className="h-4 bg-stone-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
