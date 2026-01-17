'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cart-context';
import { useLanguage } from '@/lib/language-context';
import { formatPrice } from '@/lib/utils';
import { trackBeginCheckout } from '@/lib/analytics';
import { getStripe } from '@/lib/stripe';
import { X, Minus, Plus, ShoppingBag, Shield, Truck, RefreshCw, Lock, Tag, Check, ChevronDown } from 'lucide-react';
import { FreeShippingProgress } from '@/components/shop/FreeShippingProgress';

export function CartSidebar() {
  const { items, itemCount, subtotal, shipping, baseShipping, total, freeShippingProgress, updateQuantity, removeItem, isOpen, setIsOpen, spinPrize } = useCart();
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if cart contains wholesale items
  const hasWholesaleItems = items.some(item => item.sku.startsWith('WHOLESALE-'));

  // Discount code state
  const [email, setEmail] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountMessage, setDiscountMessage] = useState<string>('Free shipping!');
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [discountType, setDiscountType] = useState<string | null>(null); // 'free_shipping', 'fixed', 'percentage', 'product', 'bonus'
  const [discountAmount, setDiscountAmount] = useState<number>(0); // Amount in cents for fixed, percent for percentage

  // Collapsible sections
  const [discountOpen, setDiscountOpen] = useState(false);

  // Auto-fill discount code from spin wheel prize
  useEffect(() => {
    if (spinPrize && spinPrize.code && !discountApplied) {
      setEmail(spinPrize.email || '');
      setDiscountCode(spinPrize.code);
      setDiscountOpen(true); // Expand the discount section
    }
  }, [spinPrize, discountApplied]);

  const handleClose = () => setIsOpen(false);

  // Calculate display totals based on discount type
  // Note: This returns the SUBTOTAL portion (before shipping), not the full total
  const calculateDiscountedTotal = () => {
    if (!discountApplied) return subtotal; // Return subtotal, NOT total (shipping is added separately)

    let discountedTotal = subtotal;

    // Apply product discount (free shipping types)
    if (discountType === 'free_shipping') {
      // Free shipping - just use subtotal (no shipping cost added)
      return subtotal;
    }

    // Apply fixed discount ($5 off, free sauce value, etc.)
    if (discountType === 'fixed' || discountType === 'product' || discountType === 'bonus') {
      discountedTotal = Math.max(0, subtotal - discountAmount);
    }

    // Apply percentage discount (10% off)
    if (discountType === 'percentage') {
      const percentOff = Math.min(Math.round(subtotal * (discountAmount / 100)), 1000); // Max $10 off
      discountedTotal = subtotal - percentOff;
    }

    return discountedTotal;
  };

  const isFreeShipping = discountApplied && discountType === 'free_shipping';
  const displayShipping = isFreeShipping ? 0 : shipping;
  const displayTotal = calculateDiscountedTotal() + displayShipping;

  // Validate discount code
  const handleApplyDiscount = async () => {
    if (!email.trim()) {
      setDiscountError('Enter your email');
      return;
    }
    if (!discountCode.trim()) {
      setDiscountError('Enter a code');
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

      if (data.valid) {
        setDiscountApplied(true);
        setDiscountMessage(data.message || 'Free shipping!');
        setDiscountError(null);
        // Store discount type and amount for total calculation
        if (data.discount) {
          setDiscountType(data.discount.type || 'free_shipping');
          setDiscountAmount(data.discount.amount || 0);
        }
      } else {
        setDiscountError(data.error || 'Invalid code');
      }
    } catch (err) {
      setDiscountError('Failed to validate');
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

      // Track InitiateCheckout for TikTok Pixel
      if (typeof window !== 'undefined' && (window as any).ttq) {
        const contents = items.map((item) => ({
          content_id: item.sku,
          content_type: 'product',
          content_name: item.name,
          quantity: item.quantity,
          price: item.price / 100,
        }));

        (window as any).ttq.track('InitiateCheckout', {
          contents: contents,
          content_type: 'product',
          value: displayTotal / 100,
          currency: 'USD',
        });
      }

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

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-[9998]"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[9999] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-medium tracking-wide uppercase">
                {t('cart.title')} ({itemCount})
              </h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label={t('common.close')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-dark mb-2">
                    {t('cart.empty')}
                  </h3>
                  <p className="text-sm text-gray-dark mb-6">
                    {t('cart.emptySubtitle')}
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 bg-black text-white text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors"
                  >
                    {t('cart.continueShopping')}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.sku} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
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
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h3 className="text-sm font-medium leading-tight line-clamp-2">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeItem(item.sku)}
                            className="text-gray-400 hover:text-red-600 transition-colors flex-shrink-0"
                            aria-label={t('cart.removeItem')}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-sm text-gray-500 mb-2">
                          {formatPrice(item.price)} {t('cart.each')}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-md bg-white hover:bg-gray-50 border border-gray-200 transition-colors"
                              aria-label={t('cart.decreaseQuantity')}
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="w-10 text-center text-sm font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-md bg-white hover:bg-gray-50 border border-gray-200 transition-colors"
                              aria-label={t('cart.increaseQuantity')}
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>

                          {/* Item Total */}
                          <p className="text-base font-semibold text-charcoal-950">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with totals and checkout */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                {/* Free Shipping Progress */}
                <FreeShippingProgress className="mb-3" compact />

                {/* Discount Code Section - Collapsible */}
                <div className="mb-3 bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setDiscountOpen(!discountOpen)}
                    className="w-full flex items-center justify-between p-2.5 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-sunset-600" />
                      <span className="text-xs font-medium uppercase tracking-wide">
                        {discountApplied ? t('cart.discount.applied') : t('cart.discount.title')}
                      </span>
                      {discountApplied && <Check className="w-3.5 h-3.5 text-green-600" />}
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${discountOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {discountOpen && (
                    <div className="px-2.5 pb-2.5 border-t border-gray-100">
                      {discountApplied ? (
                        <div className="flex items-center justify-between p-2 mt-2 bg-green-50 border border-green-200 rounded">
                          <span className="text-xs text-green-800 font-medium">{discountMessage}</span>
                          <button
                            onClick={handleRemoveDiscount}
                            className="text-gray-400 hover:text-gray-600 p-1"
                            aria-label={t('cart.discount.remove')}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2 mt-2">
                          <input
                            type="email"
                            placeholder={t('cart.discount.email')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-2.5 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-sunset-500"
                          />
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder={t('cart.discount.enterCode')}
                              value={discountCode}
                              onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                              className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded text-sm uppercase focus:outline-none focus:ring-1 focus:ring-sunset-500"
                            />
                            <button
                              onClick={handleApplyDiscount}
                              disabled={isValidatingCode}
                              className="px-3 py-1.5 bg-gray-900 text-white text-xs uppercase tracking-wide rounded hover:bg-gray-800 disabled:bg-gray-400"
                            >
                              {isValidatingCode ? '...' : t('cart.discount.apply')}
                            </button>
                          </div>
                          {discountError && (
                            <p className="text-xs text-red-600">{discountError}</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Shipping - Simple flat-rate display */}
                <div className="mb-3 bg-white rounded-lg border border-gray-200 p-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Truck className="w-3.5 h-3.5 text-sunset-600" />
                      <div>
                        <span className="text-xs font-medium uppercase tracking-wide">
                          {hasWholesaleItems ? 'Wholesale Shipping' : 'Fast Shipping'}
                        </span>
                        {!hasWholesaleItems && !freeShippingProgress.qualifies && (
                          <p className="text-[10px] text-gray-500">3-5 business days</p>
                        )}
                      </div>
                    </div>
                    {hasWholesaleItems || freeShippingProgress.qualifies ? (
                      <span className="text-xs font-semibold text-green-600">FREE</span>
                    ) : (
                      <span className="text-xs font-semibold">{formatPrice(shipping)}</span>
                    )}
                  </div>
                </div>

                {/* Totals - More Compact */}
                <div className="space-y-1 mb-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('cart.subtotal')}</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  {/* Show discount line for non-shipping discounts */}
                  {discountApplied && discountType !== 'free_shipping' && discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>{discountType === 'percentage' ? `Discount (${discountAmount}%)` : 'Discount'}</span>
                      <span className="font-medium">
                        -{formatPrice(discountType === 'percentage'
                          ? Math.min(Math.round(subtotal * (discountAmount / 100)), 1000)
                          : discountAmount
                        )}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('cart.shipping')}</span>
                    {hasWholesaleItems ? (
                      <span className="font-medium text-green-600">Wholesale - FREE</span>
                    ) : isFreeShipping || freeShippingProgress.qualifies ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-gray-400 line-through text-xs">{formatPrice(baseShipping)}</span>
                        <span className="font-medium text-green-600">{t('cart.free')}</span>
                      </div>
                    ) : (
                      <span className="font-medium">{formatPrice(shipping)}</span>
                    )}
                  </div>
                  <div className="flex justify-between text-base font-semibold pt-1.5 border-t border-gray-300">
                    <span>{t('cart.total')}</span>
                    <span>{formatPrice(displayTotal)}</span>
                  </div>
                </div>

                {/* Trust Badges - More Compact */}
                <div className="mb-3 flex justify-center gap-6 py-2 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-[10px] font-medium text-charcoal-700">{t('cart.trust.secure')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-[10px] font-medium text-charcoal-700">{t('cart.trust.fast')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 text-orange-600" />
                    <span className="text-[10px] font-medium text-charcoal-700">{t('cart.trust.guaranteed')}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-black text-white text-center text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors rounded-lg shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Lock className="w-3.5 h-3.5" />
                  {isProcessing ? t('cart.processing') : t('cart.checkout')}
                </button>

                {/* Error Message */}
                {error && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-800">
                    {error}
                  </div>
                )}

                {/* Continue Shopping */}
                <button
                  onClick={handleClose}
                  className="block w-full mt-2 py-2 text-xs text-gray-500 hover:text-black transition-colors"
                >
                  {t('cart.continueShopping')}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
