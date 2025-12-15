'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';
import { trackBeginCheckout } from '@/lib/analytics';
import { getStripe } from '@/lib/stripe';
import { X, Minus, Plus, ShoppingBag, Shield, Truck, RefreshCw, Lock, Tag, Check } from 'lucide-react';

export function CartSidebar() {
  const { items, itemCount, subtotal, shipping, total, shippingMethod, setShippingMethod, shippingOptions, updateQuantity, removeItem, isOpen, setIsOpen } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Discount code state
  const [email, setEmail] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountMessage, setDiscountMessage] = useState<string>('Free shipping!');
  const [discountError, setDiscountError] = useState<string | null>(null);

  const handleClose = () => setIsOpen(false);

  // Calculate display totals
  const displayShipping = discountApplied ? 0 : shipping;
  const displayTotal = discountApplied ? subtotal : total;

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
            className="fixed inset-0 bg-black/50 z-[110]"
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
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[120] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-medium tracking-wide uppercase">
                Your Cart ({itemCount})
              </h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close cart"
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
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-gray-dark mb-6">
                    Add some delicious tortillas to get started!
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 bg-black text-white text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors"
                  >
                    Continue Shopping
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
                            <span className="text-xs">No image</span>
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
                            aria-label="Remove item"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-sm text-gray-500 mb-2">
                          {formatPrice(item.price)} each
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-md bg-white hover:bg-gray-50 border border-gray-200 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="w-10 text-center text-sm font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-md bg-white hover:bg-gray-50 border border-gray-200 transition-colors"
                              aria-label="Increase quantity"
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
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                {/* Discount Code Section */}
                <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-sunset-600" />
                    <span className="text-xs font-medium uppercase tracking-wide">Discount Code</span>
                  </div>

                  {discountApplied ? (
                    <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-green-800 font-medium">{discountMessage}</span>
                      </div>
                      <button
                        onClick={handleRemoveDiscount}
                        className="text-gray-400 hover:text-gray-600 p-1"
                        aria-label="Remove discount"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
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
                          placeholder="Enter code"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded text-sm uppercase focus:outline-none focus:ring-1 focus:ring-sunset-500"
                        />
                        <button
                          onClick={handleApplyDiscount}
                          disabled={isValidatingCode}
                          className="px-4 py-2 bg-gray-900 text-white text-xs uppercase tracking-wide rounded hover:bg-gray-800 disabled:bg-gray-400"
                        >
                          {isValidatingCode ? '...' : 'Apply'}
                        </button>
                      </div>
                      {discountError && (
                        <p className="text-xs text-red-600">{discountError}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Shipping Method Selector */}
                <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Truck className="w-4 h-4 text-sunset-600" />
                    <span className="text-xs font-medium uppercase tracking-wide">Shipping Method</span>
                  </div>
                  <div className="space-y-2">
                    {/* USPS Option */}
                    <label className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      shippingMethod === 'usps'
                        ? 'border-sunset-500 bg-sunset-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="usps"
                          checked={shippingMethod === 'usps'}
                          onChange={() => setShippingMethod('usps')}
                          className="w-4 h-4 text-sunset-600 focus:ring-sunset-500"
                        />
                        <div>
                          <p className="text-sm font-medium">USPS Priority Mail</p>
                          <p className="text-xs text-gray-500">3-4 business days</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium">{formatPrice(shippingOptions.usps)}</span>
                    </label>

                    {/* FedEx Option */}
                    <label className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      shippingMethod === 'fedex'
                        ? 'border-sunset-500 bg-sunset-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value="fedex"
                          checked={shippingMethod === 'fedex'}
                          onChange={() => setShippingMethod('fedex')}
                          className="w-4 h-4 text-sunset-600 focus:ring-sunset-500"
                        />
                        <div>
                          <p className="text-sm font-medium">FedEx 2nd Day Air</p>
                          <p className="text-xs text-gray-500">2 business days</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium">{formatPrice(shippingOptions.fedex)}</span>
                    </label>
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-dark">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-dark">
                      Shipping ({shippingMethod === 'usps' ? 'USPS' : 'FedEx'})
                    </span>
                    {discountApplied ? (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through text-xs">{formatPrice(shipping)}</span>
                        <span className="font-medium text-green-600">FREE</span>
                      </div>
                    ) : (
                      <span className="font-medium">{formatPrice(shipping)}</span>
                    )}
                  </div>
                  <div className="flex justify-between text-base font-medium pt-2 border-t border-gray-300">
                    <span>Total</span>
                    <span>{formatPrice(displayTotal)}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mb-4 grid grid-cols-3 gap-2 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <Shield className="w-4 h-4 text-green-600" />
                    <p className="text-[10px] font-semibold text-charcoal-950">Secure</p>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <p className="text-[10px] font-semibold text-charcoal-950">3-4 Days</p>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <RefreshCw className="w-4 h-4 text-orange-600" />
                    <p className="text-[10px] font-semibold text-charcoal-950">Guaranteed</p>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-black text-white text-center text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors rounded-lg shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Lock className="w-4 h-4" />
                  {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                </button>

                {/* Error Message */}
                {error && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800">
                    {error}
                  </div>
                )}

                {/* Continue Shopping */}
                <button
                  onClick={handleClose}
                  className="block w-full mt-3 py-3 text-sm text-gray-dark hover:text-black transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
