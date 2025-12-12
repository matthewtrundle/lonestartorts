'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';
import { X, Minus, Plus, ShoppingBag, Shield, Truck, RefreshCw, Lock } from 'lucide-react';

export function CartSidebar() {
  const router = useRouter();
  const { items, itemCount, subtotal, shipping, total, updateQuantity, removeItem, isOpen, setIsOpen } = useCart();

  const handleClose = () => setIsOpen(false);

  // Redirect to checkout page (where discount codes can be entered)
  const handleCheckout = () => {
    setIsOpen(false);
    router.push('/checkout');
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
                    <div key={item.sku} className="flex gap-4">
                      {/* Item Image */}
                      <div className="w-24 h-24 bg-cream-100 rounded-lg flex-shrink-0 overflow-hidden relative">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-charcoal-400">
                            <span className="text-xs">No image</span>
                          </div>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-sm font-medium leading-tight">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeItem(item.sku)}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                            aria-label="Remove item"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">
                          {formatPrice(item.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with totals and checkout */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                {/* Totals */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-dark">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-dark">
                      Shipping ({itemCount} {itemCount === 1 ? 'pack' : 'packs'})
                    </span>
                    <span className="font-medium">{formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-base font-medium pt-2 border-t border-gray-300">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mb-4 grid grid-cols-3 gap-2 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <Shield className="w-5 h-5 text-green-600" />
                    <p className="text-xs font-semibold text-charcoal-950">Secure</p>
                    <p className="text-[10px] text-charcoal-600 leading-tight">SSL Encrypted</p>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <p className="text-xs font-semibold text-charcoal-950">Fast Ship</p>
                    <p className="text-[10px] text-charcoal-600 leading-tight">2-3 Day Delivery</p>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <RefreshCw className="w-5 h-5 text-orange-600" />
                    <p className="text-xs font-semibold text-charcoal-950">Guarantee</p>
                    <p className="text-[10px] text-charcoal-600 leading-tight">100% Satisfaction</p>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-black text-white text-center text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors rounded-lg shadow-lg"
                >
                  <Lock className="w-4 h-4" />
                  Proceed to Checkout
                </button>

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
