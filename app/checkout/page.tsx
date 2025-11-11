'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';
import { trackBeginCheckout } from '@/lib/analytics';
import { getStripe } from '@/lib/stripe';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Lock, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, itemCount, subtotal, shipping, total, clearCart, isHydrated } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate shipping breakdown for better display
  const tortillaPacks = items.filter(item => item.productType !== 'sauce').reduce((sum, item) => sum + item.quantity, 0);
  const sauceBottles = items.filter(item => item.productType === 'sauce').reduce((sum, item) => sum + item.quantity, 0);

  const getShippingLabel = () => {
    if (tortillaPacks > 0 && sauceBottles > 0) {
      return `Shipping (${tortillaPacks} tortilla ${tortillaPacks === 1 ? 'pack' : 'packs'} + ${sauceBottles} sauce)`;
    } else if (tortillaPacks > 0) {
      return `Shipping (${tortillaPacks} ${tortillaPacks === 1 ? 'pack' : 'packs'})`;
    } else if (sauceBottles > 0) {
      return `Shipping (sauce)`;
    }
    return 'Shipping';
  };

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
      const stripe = await getStripe();

      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

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
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Page Header with Back Button */}
          <div className="mb-8">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm text-charcoal-600 hover:text-sunset-600 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Shop
            </Link>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal-950 mb-2">
              Checkout
            </h1>
            <p className="text-charcoal-600 text-lg">Review your order before proceeding to payment</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-soft p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-charcoal-950 mb-6 flex items-center gap-2">
                  Order Summary
                  <span className="text-sm font-normal text-charcoal-600">({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                </h2>

                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.sku} className="flex gap-4 md:gap-6 pb-6 border-b border-cream-200 last:border-0 last:pb-0">
                      {/* Item Image */}
                      <div className="w-24 h-24 md:w-28 md:h-28 bg-cream-100 rounded-lg flex-shrink-0 overflow-hidden relative">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="112px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-charcoal-400">
                            <span className="text-xs">No image</span>
                          </div>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-charcoal-950 text-lg mb-2 leading-tight">
                          {item.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-charcoal-600">
                          <span className="font-medium">Qty: {item.quantity}</span>
                          <span className="text-charcoal-400">•</span>
                          <span>{formatPrice(item.price)} each</span>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-xl text-charcoal-950">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Totals & Checkout */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-soft p-6 md:p-8 sticky top-32 space-y-6">
                <h2 className="text-2xl font-semibold text-charcoal-950">Order Total</h2>

                {/* Price Breakdown */}
                <div className="space-y-4 pb-6 border-b border-cream-200">
                  <div className="flex justify-between items-center">
                    <span className="text-charcoal-600">Subtotal</span>
                    <span className="font-semibold text-charcoal-950">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-sunset-600" />
                      <span className="text-charcoal-600">
                        {getShippingLabel()}
                      </span>
                    </div>
                    <span className="font-semibold text-charcoal-950">{formatPrice(shipping)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center py-2">
                  <span className="font-bold text-xl text-charcoal-950">Total</span>
                  <span className="font-bold text-2xl text-sunset-600">
                    {formatPrice(total)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Button
                  variant="cart"
                  size="xl"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full rounded-lg uppercase flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                </Button>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                    {error}
                  </div>
                )}

                {/* Trust Indicators */}
                <div className="space-y-3 pt-4 border-t border-cream-200">
                  <div className="flex items-center gap-3 text-sm text-charcoal-700">
                    <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Secure 256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-charcoal-700">
                    <Truck className="w-5 h-5 text-sunset-600 flex-shrink-0" />
                    <span>Fast 2-3 day shipping nationwide</span>
                  </div>
                </div>

                {/* H-E-B Compliance Disclaimer */}
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs leading-relaxed text-charcoal-700">
                  <p className="font-semibold mb-2">Important Notice:</p>
                  <p>
                    Independent reseller. Not affiliated with or endorsed by H-E-B®. We source
                    authentic Texas tortillas through authorized channels.
                  </p>
                </div>

                {/* Continue Shopping */}
                <Link
                  href="/shop"
                  className="block text-center text-sm text-charcoal-600 hover:text-sunset-600 transition-colors font-medium"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
