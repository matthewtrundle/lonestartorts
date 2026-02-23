'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';
import { trackBeginCheckout, trackCheckoutPageViewed, trackCheckoutAbandoned } from '@/lib/analytics';
import { getStripe } from '@/lib/stripe';
import { Button } from '@/components/ui/button';
import { Lock, ShieldCheck, Truck, ArrowLeft, Tag, Check, X, Minus, Plus, Trash2, ChevronDown, Snowflake } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, itemCount, subtotal, shipping, total, clearCart, isHydrated, updateQuantity, removeItem } = useCart();
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Discount code state
  const [email, setEmail] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [discountType, setDiscountType] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [discountMessage, setDiscountMessage] = useState<string>('');
  const [discountOpen, setDiscountOpen] = useState(false);

  // Shipping label with Freshness First branding — static fallback, will be dynamic on client
  const getShippingLabel = () => {
    return 'Freshness First Shipping';
  };

  // Track when checkout page is viewed
  const [pageLoadTime] = React.useState(() => Date.now());
  const [didProceedToPayment, setDidProceedToPayment] = React.useState(false);

  // Redirect if cart is empty (wait for hydration to avoid race condition)
  React.useEffect(() => {
    if (isHydrated && items.length === 0) {
      router.push('/');
    }
  }, [items.length, isHydrated, router]);

  // Track checkout page view
  React.useEffect(() => {
    if (isHydrated && items.length > 0) {
      trackCheckoutPageViewed({
        itemCount: items.length,
        subtotal,
        shipping,
        total,
      });
    }
  }, [isHydrated, items.length, subtotal, shipping, total]);

  // Track checkout abandonment on page leave
  React.useEffect(() => {
    const handleBeforeUnload = () => {
      if (items.length > 0 && !didProceedToPayment) {
        trackCheckoutAbandoned({
          itemCount: items.length,
          subtotal,
          shipping,
          total,
          timeOnPage: Date.now() - pageLoadTime,
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [items.length, subtotal, shipping, total, pageLoadTime, didProceedToPayment]);

  // Calculate display total (with discount if applied)
  const isFreeShipping = discountApplied && discountType === 'free_shipping';
  const isPercentageDiscount = discountApplied && discountType === 'percentage';
  const percentageDiscountValue = isPercentageDiscount ? Math.round(subtotal * (discountAmount / 100)) : 0;
  const displayShipping = isFreeShipping ? 0 : shipping;
  const displaySubtotalAfterDiscount = isPercentageDiscount ? subtotal - percentageDiscountValue : subtotal;
  const displayTotal = displaySubtotalAfterDiscount + displayShipping;

  // Validate discount code
  const handleApplyDiscount = async () => {
    if (!email.trim()) {
      setDiscountError('Please enter your email address');
      return;
    }
    if (!discountCode.trim()) {
      setDiscountError('Please enter a discount code');
      return;
    }

    setIsValidatingCode(true);
    setDiscountError(null);

    try {
      const response = await fetch('/api/validate-discount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          discountCode: discountCode.trim().toUpperCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid discount code');
      }

      if (data.valid) {
        setDiscountApplied(true);
        setDiscountError(null);
        setDiscountMessage(data.message || 'Discount applied!');
        if (data.discount) {
          setDiscountType(data.discount.type || 'free_shipping');
          setDiscountAmount(data.discount.amount || 0);
        }
      } else {
        setDiscountError(data.error || 'Invalid discount code');
      }
    } catch (err) {
      setDiscountError(err instanceof Error ? err.message : 'Failed to validate code');
    } finally {
      setIsValidatingCode(false);
    }
  };

  // Remove applied discount
  const handleRemoveDiscount = () => {
    setDiscountApplied(false);
    setDiscountCode('');
    setDiscountError(null);
    setDiscountType(null);
    setDiscountAmount(0);
    setDiscountMessage('');
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    setError(null);
    setDidProceedToPayment(true);

    try {
      // Track begin checkout event
      trackBeginCheckout({
        itemCount: items.length,
        cartTotal: displayTotal / 100,
      });

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
          // Include discount info if applied
          ...(discountApplied && {
            email: email.trim().toLowerCase(),
            discountCode: discountCode.trim().toUpperCase(),
          }),
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
    <main className="min-h-screen bg-cream-50 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Page Header */}
          <div className="mb-6">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm text-charcoal-600 hover:text-sunset-600 transition-colors mb-3"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Shop
            </Link>
            <h1 className="text-3xl font-display font-bold text-charcoal-950">
              {t('checkout.title')} <span className="text-xl font-normal text-charcoal-600">({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-soft p-5">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.sku} className="flex gap-4 pb-4 border-b border-cream-200 last:border-0 last:pb-0">
                      {/* Item Image */}
                      <div className="w-20 h-20 bg-cream-100 rounded-lg flex-shrink-0 overflow-hidden relative">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-charcoal-400">
                            <span className="text-xs">{t('cart.noImage')}</span>
                          </div>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-semibold text-charcoal-950 text-base leading-tight">
                            {item.name}
                          </h3>
                          <p className="font-bold text-lg text-charcoal-950 flex-shrink-0">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                        <p className="text-sm text-charcoal-600 mb-2">{formatPrice(item.price)} each</p>
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-gray-100 rounded p-0.5">
                            <button
                              onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center rounded bg-white hover:bg-gray-50 border border-gray-200"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5 text-gray-600" />
                            </button>
                            <span className="w-10 text-center text-sm font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center rounded bg-white hover:bg-gray-50 border border-gray-200"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5 text-gray-600" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.sku)}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Freezing Tip */}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 flex items-start gap-3">
                <Snowflake className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sky-900 text-sm">Stock up & freeze for 6+ months!</p>
                  <p className="text-sky-700 text-xs mt-0.5">Our tortillas freeze beautifully. Buy in bulk and save on shipping.</p>
                </div>
              </div>
            </div>

            {/* Order Totals & Checkout */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-soft p-5 sticky top-24 space-y-4">
                {/* Price Breakdown */}
                <div className="space-y-3 pb-4 border-b border-cream-200">
                  <div className="flex justify-between items-center">
                    <span className="text-charcoal-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  {isPercentageDiscount && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>Discount ({discountAmount}%)</span>
                      <span className="font-medium">-{formatPrice(percentageDiscountValue)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-charcoal-600">Shipping</span>
                    {subtotal >= 8000 || isFreeShipping ? (
                      <span className="font-medium text-green-600">FREE</span>
                    ) : (
                      <span className="font-medium">{formatPrice(shipping)}</span>
                    )}
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xl text-charcoal-950">Total</span>
                  <span className="font-bold text-2xl text-sunset-600">
                    {formatPrice(displayTotal)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Button
                  variant="cart"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full rounded-lg uppercase flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                </Button>

                {error && (
                  <div className="p-2 bg-red-50 border border-red-200 rounded text-xs text-red-800">
                    {error}
                  </div>
                )}

                {/* Discount Code - Collapsible */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setDiscountOpen(!discountOpen)}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-sunset-600" />
                      <span className="text-sm font-medium">
                        {discountApplied ? 'Discount Applied' : 'Have a discount code?'}
                      </span>
                      {discountApplied && <Check className="w-4 h-4 text-green-600" />}
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${discountOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {discountOpen && (
                    <div className="px-3 pb-3 border-t border-gray-100">
                      {discountApplied ? (
                        <div className="flex items-center justify-between p-3 mt-2 bg-green-50 rounded text-sm">
                          <span className="text-green-800 font-medium">{discountMessage}</span>
                          <button onClick={handleRemoveDiscount} className="text-gray-400 hover:text-gray-600">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2 mt-2">
                          <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-sunset-500"
                          />
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Discount code"
                              value={discountCode}
                              onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                              className="flex-1 px-3 py-2 border border-gray-200 rounded text-sm uppercase focus:outline-none focus:ring-1 focus:ring-sunset-500"
                            />
                            <button
                              onClick={handleApplyDiscount}
                              disabled={isValidatingCode}
                              className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 disabled:bg-gray-400"
                            >
                              {isValidatingCode ? '...' : 'Apply'}
                            </button>
                          </div>
                          {discountError && <p className="text-sm text-red-600">{discountError}</p>}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-2">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="w-4 h-4 text-sunset-600" />
                    <span>Freshness First Shipping</span>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-[10px] text-gray-400 text-center">
                  Not affiliated with H-E-B®
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}
