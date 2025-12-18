'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';
import { trackBeginCheckout } from '@/lib/analytics';
import { getStripe } from '@/lib/stripe';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Lock, ShieldCheck, Truck, ArrowLeft, Tag, Check, X } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, itemCount, subtotal, shipping, total, shippingMethod, clearCart, isHydrated } = useCart();
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Discount code state
  const [email, setEmail] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountError, setDiscountError] = useState<string | null>(null);

  // Calculate shipping breakdown for better display
  const tortillaPacks = items.filter(item => item.productType !== 'sauce').reduce((sum, item) => sum + item.quantity, 0);
  const sauceBottles = items.filter(item => item.productType === 'sauce').reduce((sum, item) => sum + item.quantity, 0);

  const getShippingLabel = () => {
    const methodLabel = shippingMethod === 'usps' ? 'USPS' : 'FedEx 2nd Day';
    if (tortillaPacks > 0 && sauceBottles > 0) {
      return `${methodLabel} (${tortillaPacks} tortilla ${tortillaPacks === 1 ? 'pack' : 'packs'} + ${sauceBottles} sauce)`;
    } else if (tortillaPacks > 0) {
      return `${methodLabel} (${tortillaPacks} ${tortillaPacks === 1 ? 'pack' : 'packs'})`;
    } else if (sauceBottles > 0) {
      return `${methodLabel} (sauce)`;
    }
    return methodLabel;
  };

  // Redirect if cart is empty (wait for hydration to avoid race condition)
  React.useEffect(() => {
    if (isHydrated && items.length === 0) {
      router.push('/');
    }
  }, [items.length, isHydrated, router]);

  // Calculate display total (with discount if applied)
  const displayShipping = discountApplied ? 0 : shipping;
  const displayTotal = discountApplied ? subtotal : total;

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
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    setError(null);

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
          shippingMethod,
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
    <>
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
              {t('checkout.backToShop')}
            </Link>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal-950 mb-2">
              {t('checkout.title')}
            </h1>
            <p className="text-charcoal-600 text-lg">{t('checkout.reviewOrder')}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-soft p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-charcoal-950 mb-6 flex items-center gap-2">
                  {t('checkout.orderSummary')}
                  <span className="text-sm font-normal text-charcoal-600">({itemCount} {itemCount === 1 ? t('checkout.item') : t('checkout.items')})</span>
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
                            <span className="text-xs">{t('cart.noImage')}</span>
                          </div>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-charcoal-950 text-lg mb-2 leading-tight">
                          {item.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-charcoal-600">
                          <span className="font-medium">{t('checkout.qty')}: {item.quantity}</span>
                          <span className="text-charcoal-400">•</span>
                          <span>{formatPrice(item.price)} {t('cart.each')}</span>
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
                <h2 className="text-2xl font-semibold text-charcoal-950">{t('checkout.orderTotal')}</h2>

                {/* Discount Code Section */}
                <div className="pb-6 border-b border-cream-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-sunset-600" />
                    <span className="font-medium text-charcoal-950">{t('cart.discount.title')}</span>
                  </div>

                  {discountApplied ? (
                    // Show applied discount
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-green-800 font-medium">
                          {t('cart.discount.freeShipping')}
                        </span>
                      </div>
                      <button
                        onClick={handleRemoveDiscount}
                        className="text-charcoal-500 hover:text-charcoal-700 p-1"
                        aria-label={t('cart.discount.remove')}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    // Show input form
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder={t('cart.discount.email')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-cream-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder={t('cart.discount.enterCode')}
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                          className="flex-1 px-3 py-2 border border-cream-300 rounded-lg text-sm uppercase focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                        />
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={handleApplyDiscount}
                          disabled={isValidatingCode}
                          className="px-4"
                        >
                          {isValidatingCode ? '...' : t('cart.discount.apply')}
                        </Button>
                      </div>
                      {discountError && (
                        <p className="text-sm text-red-600">{discountError}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 pb-6 border-b border-cream-200">
                  <div className="flex justify-between items-center">
                    <span className="text-charcoal-600">{t('cart.subtotal')}</span>
                    <span className="font-semibold text-charcoal-950">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-sunset-600" />
                      <span className="text-charcoal-600">
                        {getShippingLabel()}
                      </span>
                    </div>
                    {discountApplied ? (
                      <div className="flex items-center gap-2">
                        <span className="text-charcoal-400 line-through text-sm">{formatPrice(shipping)}</span>
                        <span className="font-semibold text-green-600">{t('cart.free')}</span>
                      </div>
                    ) : (
                      <span className="font-semibold text-charcoal-950">{formatPrice(shipping)}</span>
                    )}
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center py-2">
                  <span className="font-bold text-xl text-charcoal-950">{t('cart.total')}</span>
                  <span className="font-bold text-2xl text-sunset-600">
                    {formatPrice(displayTotal)}
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
                  {isProcessing ? t('checkout.processing') : t('checkout.proceedToPayment')}
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
                    <span>{t('checkout.trust.secure')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-charcoal-700">
                    <Truck className="w-5 h-5 text-sunset-600 flex-shrink-0" />
                    <span>{t('checkout.trust.fastShipping')}</span>
                  </div>
                </div>

                {/* H-E-B Compliance Disclaimer */}
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs leading-relaxed text-charcoal-700">
                  <p className="font-semibold mb-2">{t('checkout.notice.title')}</p>
                  <p>
                    {t('checkout.notice.text')}
                  </p>
                </div>

                {/* Continue Shopping */}
                <Link
                  href="/shop"
                  className="block text-center text-sm text-charcoal-600 hover:text-sunset-600 transition-colors font-medium"
                >
                  ← {t('cart.continueShopping')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
