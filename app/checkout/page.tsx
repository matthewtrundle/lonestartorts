'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';
import { trackBeginCheckout, trackCheckoutPageViewed, trackCheckoutAbandoned } from '@/lib/analytics';

import { Button } from '@/components/ui/button';
import { Lock, ShieldCheck, Truck, ArrowLeft, Tag, Check, X, Minus, Plus, Trash2, ChevronDown, Snowflake, CheckCircle, Star, Gift, FileText } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { WholesaleAuthGate } from '@/components/wholesale/WholesaleAuthGate';
import WholesaleCheckoutSummary from '@/components/checkout/WholesaleCheckoutSummary';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, itemCount, subtotal, tax, shipping, total, clearCart, isHydrated, updateQuantity, removeItem } = useCart();
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Wholesale auth state
  const hasWholesaleItems = items.some(item => item.productType === 'wholesale');
  const [wholesaleCustomer, setWholesaleCustomer] = useState<{
    id: string;
    email: string;
    firstName: string | null;
    isWholesale: boolean;
    wholesale?: {
      businessName: string;
      paymentTerms: string;
      paymentTermsLevel: string;
      pricingTier: string;
      discountPercent: number;
    };
  } | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(false);
  const [wholesaleAuthError, setWholesaleAuthError] = useState<string | null>(null);

  // Loyalty points state
  const [loyaltyBalance, setLoyaltyBalance] = useState<number>(0);
  const [loyaltyLoading, setLoyaltyLoading] = useState(false);
  const [loyaltyRedeemLoading, setLoyaltyRedeemLoading] = useState(false);
  const [loyaltyCode, setLoyaltyCode] = useState<string | null>(null);
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);

  // Check if already logged in for wholesale orders + fetch loyalty data
  React.useEffect(() => {
    if (hasWholesaleItems && !wholesaleCustomer) {
      setCheckingAuth(true);
      setWholesaleAuthError(null);
      setLoyaltyLoading(true);
      fetch('/api/customer/me')
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data?.customer?.isWholesale) {
            setWholesaleCustomer({
              ...data.customer,
              wholesale: data.customer.wholesale ? {
                businessName: data.customer.wholesale.businessName,
                paymentTerms: data.customer.wholesale.paymentTerms,
                paymentTermsLevel: data.customer.wholesale.termsProgress?.currentLevel || 'NEW',
                pricingTier: data.customer.wholesale.pricingTier,
                discountPercent: data.customer.wholesale.discountPercent || 0,
              } : undefined,
            });
          } else if (data?.customer && !data.customer.isWholesale) {
            setWholesaleAuthError('Your account is not approved for wholesale ordering. Please register a new wholesale account below.');
          }
          // Extract loyalty data
          if (data?.customer?.email) {
            setCustomerEmail(data.customer.email);
          }
          if (data?.loyaltyData) {
            setLoyaltyBalance(data.loyaltyData.balance || 0);
          }
        })
        .catch(() => {})
        .finally(() => {
          setCheckingAuth(false);
          setLoyaltyLoading(false);
        });
    }
  }, [hasWholesaleItems]);

  // Fetch loyalty data for non-wholesale orders
  React.useEffect(() => {
    if (!hasWholesaleItems) {
      setLoyaltyLoading(true);
      fetch('/api/customer/me')
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data?.customer?.email) {
            setCustomerEmail(data.customer.email);
          }
          if (data?.loyaltyData) {
            setLoyaltyBalance(data.loyaltyData.balance || 0);
          }
        })
        .catch(() => {})
        .finally(() => setLoyaltyLoading(false));
    }
  }, [hasWholesaleItems]);

  const wholesaleAuthReady = !hasWholesaleItems || !!wholesaleCustomer;
  const isNetTerms = hasWholesaleItems && wholesaleCustomer?.wholesale?.paymentTerms && wholesaleCustomer.wholesale.paymentTerms !== 'DUE_ON_RECEIPT';

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
  const isFixedAmountDiscount = discountApplied && discountType === 'fixed_amount';
  const percentageDiscountValue = isPercentageDiscount ? Math.round(subtotal * (discountAmount / 100)) : 0;
  const fixedDiscountValue = isFixedAmountDiscount ? discountAmount : 0;
  const displayShipping = isFreeShipping ? 0 : shipping;
  const displaySubtotalAfterDiscount = isPercentageDiscount
    ? subtotal - percentageDiscountValue
    : isFixedAmountDiscount
      ? Math.max(0, subtotal - fixedDiscountValue)
      : subtotal;
  // Recalculate tax based on discounted subtotal
  const displayTax = Math.round(displaySubtotalAfterDiscount * 0.0825);
  const displayTotal = displaySubtotalAfterDiscount + displayTax + displayShipping;

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
    setLoyaltyCode(null);
  };

  // Redeem loyalty points
  const handleLoyaltyRedeem = async () => {
    setLoyaltyRedeemLoading(true);
    try {
      const response = await fetch('/api/customer/loyalty/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to redeem points');
      }
      // Auto-apply the loyalty discount code
      setLoyaltyCode(data.code);
      setDiscountCode(data.code);
      if (customerEmail) {
        setEmail(customerEmail);
      }
      setDiscountApplied(true);
      setDiscountType('fixed_amount');
      setDiscountAmount(data.value); // 500 cents
      setDiscountMessage(`$5 loyalty reward applied! (${data.code})`);
      setLoyaltyBalance(data.remainingBalance);
    } catch (err) {
      setDiscountError(err instanceof Error ? err.message : 'Failed to redeem loyalty points');
    } finally {
      setLoyaltyRedeemLoading(false);
    }
  };

  const handleWholesalePlaceOrder = async () => {
    setIsProcessing(true);
    setError(null);
    setDidProceedToPayment(true);

    try {
      const response = await fetch('/api/wholesale/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            sku: item.sku,
            name: item.displayName || item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      clearCart();
      router.push(`/wholesale/order-confirmed?order=${data.order.orderNumber}`);
    } catch (err) {
      console.error('Wholesale order error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred placing your order');
      setIsProcessing(false);
    }
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
            ...(item.productType === 'wholesale' && { price: item.price }),
          })),
          // Include discount info if applied
          ...(discountApplied && {
            email: email.trim().toLowerCase(),
            discountCode: discountCode.trim().toUpperCase(),
          }),
          // Include customer ID for wholesale orders
          ...(wholesaleCustomer && { customerId: wholesaleCustomer.id }),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
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
                            {item.displayName || item.name}
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

              {/* Wholesale Auth Gate */}
              {hasWholesaleItems && !wholesaleCustomer && !checkingAuth && (
                <>
                  {wholesaleAuthError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-red-700">{wholesaleAuthError}</p>
                    </div>
                  )}
                  <WholesaleAuthGate
                    onAuthenticated={(customer) => {
                      setWholesaleAuthError(null);
                      setWholesaleCustomer(customer);
                    }}
                  />
                </>
              )}

              {/* Wholesale Checkout Summary */}
              {hasWholesaleItems && wholesaleCustomer && (
                <WholesaleCheckoutSummary
                  businessName={wholesaleCustomer.wholesale?.businessName || 'Wholesale Account'}
                  paymentTerms={wholesaleCustomer.wholesale?.paymentTerms || 'DUE_ON_RECEIPT'}
                  paymentTermsLevel={wholesaleCustomer.wholesale?.paymentTermsLevel || 'NEW'}
                  discountPercent={wholesaleCustomer.wholesale?.discountPercent || 0}
                />
              )}

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
                  {isFixedAmountDiscount && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>Discount{loyaltyCode ? ' (Loyalty Reward)' : ''}</span>
                      <span className="font-medium">-{formatPrice(fixedDiscountValue)}</span>
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
                  <div className="flex justify-between items-center">
                    <span className="text-charcoal-600">Tax (8.25%)</span>
                    <span className="font-medium">{formatPrice(displayTax)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xl text-charcoal-950">Total</span>
                  <span className="font-bold text-2xl text-sunset-600">
                    {formatPrice(displayTotal)}
                  </span>
                </div>

                {/* Checkout / Place Order Button */}
                {isNetTerms ? (
                  <Button
                    variant="cart"
                    size="lg"
                    onClick={handleWholesalePlaceOrder}
                    disabled={isProcessing || !wholesaleAuthReady}
                    className="w-full rounded-lg uppercase flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    {isProcessing ? 'Placing Order...' : 'Place Order'}
                  </Button>
                ) : (
                  <Button
                    variant="cart"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={isProcessing || !wholesaleAuthReady}
                    className="w-full rounded-lg uppercase flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    {isProcessing ? 'Processing...' : !wholesaleAuthReady ? 'Sign In to Checkout' : 'Proceed to Payment'}
                  </Button>
                )}

                {error && (
                  <div className="p-2 bg-red-50 border border-red-200 rounded text-xs text-red-800">
                    {error}
                  </div>
                )}

                {!isNetTerms && (
                  <>
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

                    {/* Loyalty Points Card */}
                    {!loyaltyLoading && loyaltyBalance >= 200 && (
                      <div className="rounded-lg overflow-hidden border border-amber-200">
                        <div className="bg-gradient-to-r from-amber-100 to-yellow-100 px-4 py-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Star className="w-4 h-4 text-amber-600 fill-amber-500" />
                            <span className="text-sm font-semibold text-amber-900">
                              You have {loyaltyBalance} points!
                            </span>
                          </div>
                          <p className="text-xs text-amber-700">Use 200 points for $5 off</p>
                        </div>
                        <div className="px-4 py-3 bg-white">
                          {discountApplied && !loyaltyCode ? (
                            <p className="text-xs text-gray-500 text-center">
                              Remove current discount to use points
                            </p>
                          ) : loyaltyCode ? (
                            <div className="flex items-center gap-2 text-sm text-green-700">
                              <Gift className="w-4 h-4" />
                              <span className="font-medium">Loyalty reward applied!</span>
                            </div>
                          ) : (
                            <button
                              onClick={handleLoyaltyRedeem}
                              disabled={loyaltyRedeemLoading}
                              className="w-full py-2 px-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm font-semibold rounded-md hover:from-amber-600 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                              <Gift className="w-4 h-4" />
                              {loyaltyRedeemLoading ? 'Applying...' : 'Apply $5 Reward'}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}

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
