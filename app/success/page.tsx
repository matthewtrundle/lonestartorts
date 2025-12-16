'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackPurchase } from '@/lib/analytics';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, Truck, Mail, ArrowRight, MapPin } from 'lucide-react';

export const dynamic = 'force-dynamic';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const checkmarkVariants = {
  hidden: { scale: 0, rotate: -180 },
  show: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.3
    }
  }
};

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

          // Track conversion in Vercel Analytics
          trackPurchase({
            orderId: data.order.orderNumber,
            total: data.order.total / 100, // Convert cents to dollars
            itemCount: data.order.items.length,
          });

          // Track conversion in Google Ads (uses 'conversion' event type)
          if (typeof window !== 'undefined' && (window as any).gtag) {
            // Google Ads conversion tracking
            (window as any).gtag('event', 'conversion', {
              'send_to': 'AW-17804372077/nT9bCJvLpdEbEO3Q5KlC',
              'value': data.order.total / 100,
              'currency': 'USD',
              'transaction_id': data.order.orderNumber,
            });

            // Also fire purchase event for enhanced ecommerce / GA4
            (window as any).gtag('event', 'purchase', {
              'transaction_id': data.order.orderNumber,
              'value': data.order.total / 100,
              'currency': 'USD',
              'tax': data.order.tax / 100,
              'shipping': data.order.shipping / 100,
            });

            // Debug logging
            console.log('Google Ads conversion fired:', {
              transaction_id: data.order.orderNumber,
              value: data.order.total / 100,
            });
          }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-cream-50 to-sunset-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4">
            <div className="w-full h-full border-4 border-sunset-200 border-t-sunset-600 rounded-full animate-spin" />
          </div>
          <p className="text-lg text-charcoal-700 font-medium">Loading your order...</p>
        </motion.div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-cream-50 to-sunset-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-xl p-8 border border-charcoal-100"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-charcoal-100 rounded-full flex items-center justify-center">
            <Package className="w-8 h-8 text-charcoal-400" />
          </div>
          <h2 className="text-2xl font-bold text-charcoal-950 mb-2">
            Order Not Found
          </h2>
          <p className="text-charcoal-600 mb-6">
            Please check your email for order confirmation or contact support.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-sunset-600 hover:bg-sunset-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            Return Home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Atmospheric Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-cream-50 to-sunset-50" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sunset-200 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* Success Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.div
              variants={checkmarkVariants}
              className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg"
            >
              <CheckCircle2 className="w-12 h-12 md:w-14 md:h-14 text-white" strokeWidth={2.5} />
            </motion.div>

            <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl lg:text-7xl font-bold text-charcoal-950 mb-4 tracking-tight leading-tight">
              Order Confirmed!
            </h1>
            <p className="text-lg md:text-xl text-charcoal-600 max-w-2xl mx-auto font-medium">
              Your premium Texas tortillas are on their way. We'll keep you updated every step of the journey.
            </p>
          </motion.div>

          {/* Order Number Card - Prominent */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
            className="bg-gradient-to-br from-sunset-600 to-amber-700 rounded-3xl shadow-2xl p-8 md:p-10 text-white border border-sunset-500/20 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center md:text-left">
                <p className="text-sunset-100 text-sm font-semibold uppercase tracking-wide mb-2">Order Number</p>
                <p className="font-['Space_Mono'] text-3xl md:text-4xl font-bold tracking-wider">{orderDetails.orderNumber}</p>
              </div>
              <div className="flex items-center gap-3 text-sunset-100">
                <Package className="w-6 h-6" />
                <div className="text-right">
                  <p className="text-sm font-medium">Placed on</p>
                  <p className="font-semibold">
                    {new Date(orderDetails.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Order Summary */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-2xl shadow-lg border border-charcoal-100 p-6 md:p-8 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-sunset-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-sunset-600" />
                </div>
                <h2 className="text-2xl font-bold text-charcoal-950">Order Summary</h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-base">
                  <span className="text-charcoal-600 font-medium">Subtotal</span>
                  <span className="text-charcoal-950 font-semibold">${(orderDetails.subtotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-base">
                  <span className="text-charcoal-600 font-medium">Shipping</span>
                  <span className="text-charcoal-950 font-semibold">${(orderDetails.shipping / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-base">
                  <span className="text-charcoal-600 font-medium">Tax</span>
                  <span className="text-charcoal-950 font-semibold">${(orderDetails.tax / 100).toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-charcoal-200 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-charcoal-950">Total</span>
                    <span className="text-2xl font-bold text-sunset-600">${(orderDetails.total / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Shipping Address */}
            {orderDetails.shippingAddress && (
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -4, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-2xl shadow-lg border border-charcoal-100 p-6 md:p-8 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-charcoal-950">Shipping To</h2>
                </div>

                <div className="space-y-2 text-base">
                  <p className="font-bold text-charcoal-950 text-lg">{orderDetails.shippingAddress.name}</p>
                  <p className="text-charcoal-700">{orderDetails.shippingAddress.address1}</p>
                  {orderDetails.shippingAddress.address2 && (
                    <p className="text-charcoal-700">{orderDetails.shippingAddress.address2}</p>
                  )}
                  <p className="text-charcoal-700">
                    {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zip}
                  </p>
                  <p className="text-charcoal-600 font-medium">{orderDetails.shippingAddress.country}</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Timeline - What Happens Next */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg border border-blue-200/50 p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Truck className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-charcoal-950">What Happens Next</h2>
            </div>

            <div className="space-y-5">
              {[
                { icon: Mail, text: 'Order confirmation sent to your email', delay: 0 },
                { icon: Package, text: 'Your order will be prepared and packaged within 24 hours', delay: 0.1 },
                { icon: Truck, text: 'Shipping confirmation with tracking in 24-48 hours', delay: 0.2 },
                { icon: CheckCircle2, text: 'Fresh tortillas arrive in 2-3 business days', delay: 0.3 }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + step.delay, duration: 0.4 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-blue-200 group-hover:border-blue-400 group-hover:scale-110 transition-all duration-300">
                    <step.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-base md:text-lg text-charcoal-800 font-medium">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Email Confirmation Notice */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6 text-center"
          >
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Mail className="w-6 h-6 text-green-600 flex-shrink-0" />
              <p className="text-base text-charcoal-800">
                Confirmation email sent to <span className="font-bold text-charcoal-950">{orderDetails.email}</span>
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 pt-6"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Link
                href="/"
                className="flex items-center justify-center gap-2 bg-charcoal-950 hover:bg-charcoal-800 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
              >
                Back to Home
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Link
                href="/track"
                className="flex items-center justify-center gap-2 bg-white hover:bg-cream-50 text-charcoal-950 font-bold py-4 px-8 rounded-full border-2 border-charcoal-300 hover:border-charcoal-400 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
              >
                <Truck className="w-5 h-5" />
                Track Order
              </Link>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className="text-center pt-8 border-t border-charcoal-200 mt-8"
          >
            <div className="inline-flex items-center gap-3 mb-3">
              <svg className="w-8 h-8 text-sunset-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>
              </svg>
              <span className="text-xl font-bold text-charcoal-950">Lonestar Tortillas</span>
            </div>
            <p className="text-sm text-charcoal-600 font-medium mb-2">Premium Texas Tortillas</p>
            <p className="text-xs text-charcoal-500">
              Independent reseller • Not affiliated with or endorsed by H-E-B®
            </p>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-cream-50 to-sunset-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-sunset-200 border-t-sunset-600 rounded-full animate-spin" />
          <p className="text-lg text-charcoal-700 font-medium">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
