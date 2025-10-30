'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';
import { trackBeginCheckout } from '@/lib/analytics';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { Header } from '@/components/layout/Header';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, isHydrated } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate totals (shipping included in price, no tax on prepared food in Texas)
  const total = subtotal;

  // Redirect if cart is empty (wait for hydration to avoid race condition)
  React.useEffect(() => {
    if (isHydrated && items.length === 0) {
      router.push('/');
    }
  }, [items.length, isHydrated, router]);

  const handleCheckout = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Track begin checkout event
      trackBeginCheckout(
        total / 100,
        items.map((item) => ({
          item_id: item.sku,
          item_name: item.name,
          quantity: item.quantity,
          price: item.price / 100,
        }))
      );

      // Create Stripe checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            sku: item.sku,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      const stripe = (window as any).Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during checkout');
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return null; // Will redirect via useEffect
  }

  return (
    <>
      <DisclaimerBanner />
      <Header />

      <main className="min-h-screen bg-cream-50 pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-playfair font-bold text-charcoal-950 mb-2">
              Checkout
            </h1>
            <p className="text-gray-600">Review your order before proceeding to payment</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.sku} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                      {/* Item Image Placeholder */}
                      <div className="w-20 h-20 bg-gray-200 rounded flex-shrink-0" />

                      {/* Item Details */}
                      <div className="flex-1">
                        <h3 className="font-medium text-charcoal-950">{item.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-600">
                          {formatPrice(item.price)} each
                        </p>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Totals & Checkout */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-32">
                <h2 className="text-xl font-semibold mb-4">Order Total</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span className="font-medium">Free Shipping</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="border-t border-gray-300 pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-lg">Total</span>
                      <span className="font-semibold text-lg text-sunset-600">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full py-4 bg-sunset-500 text-white font-medium text-sm tracking-wider uppercase hover:bg-sunset-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed rounded"
                >
                  {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                </button>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                    {error}
                  </div>
                )}

                {/* H-E-B Compliance Disclaimer */}
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded text-xs text-gray-700">
                  <p className="font-semibold mb-1">Important Notice:</p>
                  <p>
                    Independent reseller. Not affiliated with or endorsed by H-E-B®. We source
                    authentic Texas tortillas through authorized channels.
                  </p>
                </div>

                {/* Continue Shopping */}
                <Link
                  href="/"
                  className="block text-center mt-4 text-sm text-gray-600 hover:text-charcoal-950 transition-colors"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Load Stripe.js */}
      <script src="https://js.stripe.com/v3/" async />
    </>
  );
}
