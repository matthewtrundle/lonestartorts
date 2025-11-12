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
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 flex items-center justify-center p-4 py-16">
      <div className="max-w-4xl w-full">

        {/* Epic Texas Header */}
        <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 border-8 border-double border-yellow-500 rounded-t-xl shadow-2xl overflow-hidden">
          {/* Top Texas Flag Border */}
          <div className="h-3 bg-gradient-to-r from-blue-900 via-white to-red-700"></div>

          <div className="px-8 py-12 text-center bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] bg-repeat">

            {/* Gold Texas Star */}
            <div className="mb-6">
              <svg className="w-24 h-24 mx-auto drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 10L61.8 38.2L92 43.1L71 63.2L76.4 93.8L50 78.5L23.6 93.8L29 63.2L8 43.1L38.2 38.2L50 10Z" fill="#FFD700" opacity="0.3"/>
                <path d="M50 15L60.3 40.8L88 45.1L69 63.5L73.6 91.2L50 77.8L26.4 91.2L31 63.5L12 45.1L39.7 40.8L50 15Z" fill="#FFD700" stroke="#FFFFFF" strokeWidth="3"/>
                <circle cx="50" cy="50" r="12" fill="#8B4513" stroke="#FFD700" strokeWidth="2"/>
              </svg>
            </div>

            <h1 className="text-6xl font-black text-yellow-400 mb-3 tracking-wider drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] uppercase font-serif">
              SADDLE UP!
            </h1>
            <p className="text-2xl text-yellow-200 font-bold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] uppercase">
              Your Order's Ready to Ride
            </p>
            <p className="text-lg text-amber-100 mt-2 italic">
              Howdy, partner! Your tortillas are on the way.
            </p>
          </div>

          {/* Bottom Gold Border */}
          <div className="h-3 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600"></div>
        </div>

        {/* Main Content Card */}
        <div className="bg-gradient-to-b from-amber-50 to-yellow-50 border-8 border-amber-700 shadow-2xl">

          {loading ? (
            <div className="p-12">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-amber-200 rounded w-3/4 mx-auto"></div>
                <div className="h-6 bg-amber-200 rounded w-1/2 mx-auto"></div>
                <div className="h-6 bg-amber-200 rounded w-2/3 mx-auto"></div>
              </div>
            </div>
          ) : orderDetails ? (
            <div className="p-8 md:p-12">

              {/* Order Number Banner */}
              <div className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 border-4 border-amber-700 rounded-xl p-6 mb-8 text-center shadow-lg">
                <p className="text-sm font-bold text-amber-900 uppercase tracking-widest mb-2">⭐ Order Number ⭐</p>
                <p className="text-4xl font-black text-amber-900 font-mono tracking-wider drop-shadow-sm">
                  {orderDetails.orderNumber}
                </p>
                <p className="text-sm text-amber-800 mt-2 font-semibold">
                  {new Date(orderDetails.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>

              {/* Order Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">

                {/* Order Info */}
                <div className="bg-white border-4 border-amber-600 rounded-xl p-6 shadow-lg">
                  <h2 className="text-2xl font-black text-amber-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                    <span className="text-3xl">🌟</span>
                    Order Details
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b-2 border-dashed border-amber-300">
                      <span className="font-bold text-amber-900">Email:</span>
                      <span className="text-amber-800 font-semibold">{orderDetails.email}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b-2 border-dashed border-amber-300">
                      <span className="font-bold text-amber-900">Subtotal:</span>
                      <span className="text-amber-800 font-semibold">${(orderDetails.subtotal / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b-2 border-dashed border-amber-300">
                      <span className="font-bold text-amber-900">Shipping:</span>
                      <span className="text-amber-800 font-semibold">${(orderDetails.shipping / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b-2 border-dashed border-amber-300">
                      <span className="font-bold text-amber-900">Tax:</span>
                      <span className="text-amber-800 font-semibold">${(orderDetails.tax / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3">
                      <span className="text-xl font-black text-amber-900 uppercase">Total:</span>
                      <span className="text-3xl font-black text-red-700">${(orderDetails.total / 100).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                {orderDetails.shippingAddress && (
                  <div className="bg-white border-4 border-amber-600 rounded-xl p-6 shadow-lg">
                    <h2 className="text-2xl font-black text-amber-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                      <span className="text-3xl">📦</span>
                      Shipping To
                    </h2>
                    <div className="space-y-2 text-amber-900 font-semibold">
                      <p className="text-lg font-bold">{orderDetails.shippingAddress.name}</p>
                      <p>{orderDetails.shippingAddress.address1}</p>
                      {orderDetails.shippingAddress.address2 && (
                        <p>{orderDetails.shippingAddress.address2}</p>
                      )}
                      <p>
                        {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zip}
                      </p>
                      <p className="text-amber-800">{orderDetails.shippingAddress.country}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* What's Next */}
              <div className="bg-gradient-to-br from-amber-700 to-amber-800 border-4 border-yellow-500 rounded-xl p-8 mb-8 shadow-xl">
                <h2 className="text-3xl font-black text-yellow-400 mb-6 text-center uppercase tracking-wider drop-shadow-md">
                  ⚡ What Happens Next ⚡
                </h2>
                <div className="space-y-4">
                  {[
                    'Shipping confirmation within 24-48 hours',
                    'Fresh tortillas arrive in 2-3 business days',
                    'Track your package via email updates'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-yellow-400 border-2 border-white rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-amber-900 font-black text-lg">✓</span>
                      </div>
                      <p className="text-yellow-50 font-bold text-lg pt-1">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confirmation Message */}
              <div className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 border-4 border-dashed border-amber-600 rounded-xl p-6 mb-8 text-center">
                <p className="text-amber-900 font-bold text-lg">
                  📧 A confirmation email with tracking information has been sent to <span className="font-black">{orderDetails.email}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-black text-lg py-4 px-8 rounded-xl border-4 border-amber-900 shadow-xl hover:shadow-2xl transition-all uppercase tracking-wider text-center"
                >
                  🏠 Back to Home
                </Link>
                <Link
                  href="/track"
                  className="bg-white hover:bg-yellow-50 text-amber-900 font-black text-lg py-4 px-8 rounded-xl border-4 border-amber-700 shadow-xl hover:shadow-2xl transition-all uppercase tracking-wider text-center"
                >
                  🔍 Track Order
                </Link>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-xl text-amber-900 font-bold mb-4">
                No order details available
              </p>
              <p className="text-amber-700">
                Please check your email for order confirmation.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-gradient-to-b from-stone-900 to-stone-950 border-8 border-t-0 border-amber-700 rounded-b-xl p-8 text-center shadow-2xl">
          {/* Texas Flag Border */}
          <div className="h-4 bg-gradient-to-r from-blue-900 via-white to-red-700 mb-6 rounded"></div>

          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 15L60.3 40.8L88 45.1L69 63.5L73.6 91.2L50 77.8L26.4 91.2L31 63.5L12 45.1L39.7 40.8L50 15Z" fill="#FFD700"/>
            </svg>
          </div>

          <h3 className="text-3xl font-black text-yellow-400 mb-2 uppercase tracking-widest font-serif drop-shadow-md">
            Lonestar Tortillas
          </h3>
          <p className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-6">
            Premium Texas Tortillas
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent w-32 mx-auto mb-6"></div>

          <p className="text-amber-700 text-xs font-semibold">
            Independent reseller • Not affiliated with or endorsed by H-E-B®
          </p>
          <p className="text-amber-600 font-bold italic mt-2">
            Made with Texas Pride 🤠
          </p>
        </div>

      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 border-8 border-double border-yellow-500 rounded-xl p-12">
            <div className="animate-pulse space-y-4">
              <div className="w-24 h-24 mx-auto bg-amber-500 rounded-full mb-6"></div>
              <div className="h-12 bg-amber-500 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-6 bg-amber-400 rounded w-full mb-2"></div>
              <div className="h-6 bg-amber-400 rounded w-5/6 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
