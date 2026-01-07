'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Mail, Timer, ShoppingCart, Sparkles } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { getProductBySku } from '@/lib/products';

interface Prize {
  id: string;
  name: string;
  description: string;
  type: string;
  code: string;
  expiresAt: string;
  sku?: string;
  value?: number;
  maxValue?: number;
}

interface SpinTheWheelProps {
  isOpen: boolean;
  onClose: () => void;
  utmSource?: string;
}

// Prize segments for the wheel visual (in order around the wheel)
const WHEEL_SEGMENTS = [
  { id: 'five_off', label: '$5 OFF', color: '#F59E0B' },
  { id: 'free_shipping', label: 'FREE SHIP', color: '#10B981' },
  { id: 'five_off', label: '$5 OFF', color: '#F59E0B' },
  { id: 'bonus_tortillas', label: '10 TORTILLAS', color: '#8B5CF6' },
  { id: 'five_off', label: '$5 OFF', color: '#F59E0B' },
  { id: 'free_sauce', label: 'FREE SAUCE', color: '#EF4444' },
  { id: 'five_off', label: '$5 OFF', color: '#F59E0B' },
  { id: 'jackpot', label: 'JACKPOT!', color: '#EC4899' },
];

// Confetti component
function Confetti() {
  const colors = ['#F59E0B', '#10B981', '#EF4444', '#8B5CF6', '#EC4899', '#3B82F6'];

  return (
    <div className="fixed inset-0 pointer-events-none z-[10001]">
      {Array.from({ length: 50 }).map((_, i) => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const delay = Math.random() * 0.5;
        const duration = 2 + Math.random() * 2;
        const size = 8 + Math.random() * 8;

        return (
          <motion.div
            key={i}
            className="absolute rounded-sm"
            style={{
              left: `${left}%`,
              top: -20,
              width: size,
              height: size,
              backgroundColor: color,
            }}
            initial={{ y: 0, opacity: 1, rotate: 0 }}
            animate={{
              y: window.innerHeight + 100,
              opacity: [1, 1, 0],
              rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            }}
            transition={{
              duration,
              delay,
              ease: 'easeIn',
            }}
          />
        );
      })}
    </div>
  );
}

// Countdown timer component
function CountdownTimer({ expiresAt }: { expiresAt: string }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const expiry = new Date(expiresAt).getTime();
      const diff = expiry - now;

      if (diff <= 0) {
        setTimeLeft('Expired');
        return;
      }

      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <div className="flex items-center justify-center gap-2 text-red-600 font-bold text-lg">
      <Timer className="w-5 h-5 animate-pulse" />
      <span>Expires in {timeLeft}</span>
    </div>
  );
}

export function SpinTheWheel({ isOpen, onClose, utmSource = 'tiktok' }: SpinTheWheelProps) {
  const { addItem, setIsOpen: setCartOpen } = useCart();

  const [step, setStep] = useState<'email' | 'spinning' | 'result'>('email');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prize, setPrize] = useState<Prize | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/spin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), utmSource }),
      });

      const data = await response.json();

      if (data.alreadySpun) {
        if (data.prize) {
          setPrize(data.prize);
          setStep('result');
        } else {
          setError(data.message || 'You have already used your spin!');
        }
        setIsLoading(false);
        return;
      }

      if (data.success && data.prize) {
        // Calculate rotation to land on the correct segment
        const prizeIndex = WHEEL_SEGMENTS.findIndex(s => s.id === data.prize.id);
        const segmentAngle = 360 / WHEEL_SEGMENTS.length;
        const targetAngle = prizeIndex * segmentAngle;
        // Add multiple full rotations for effect
        const fullRotations = 5 * 360;
        const finalRotation = fullRotations + (360 - targetAngle) + (segmentAngle / 2);

        setRotation(finalRotation);
        setStep('spinning');

        // After spin animation, show result
        setTimeout(() => {
          setPrize(data.prize);
          setStep('result');
          setShowConfetti(true);

          // Auto-add product prizes to cart
          if (data.prize.type === 'product' && data.prize.sku) {
            const product = getProductBySku(data.prize.sku);
            if (product) {
              addItem({
                sku: product.sku,
                name: `${product.name} (FREE!)`,
                price: 0, // Free!
                productType: product.productType,
                description: 'Spin-the-wheel prize!',
                image: product.image,
              });
            }
          }

          // Hide confetti after a few seconds
          setTimeout(() => setShowConfetti(false), 4000);
        }, 4000);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to spin. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueToCheckout = () => {
    onClose();
    setCartOpen(true);
  };

  const handleClose = () => {
    if (step === 'spinning') return; // Don't allow closing during spin
    onClose();
  };

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep('email');
      setEmail('');
      setError(null);
      setPrize(null);
      setRotation(0);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[10000]"
            onClick={handleClose}
          />

          {/* Confetti */}
          {showConfetti && <Confetti />}

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-gradient-to-b from-amber-50 to-orange-50 rounded-2xl shadow-2xl z-[10000] overflow-hidden"
          >
            {/* Close button */}
            {step !== 'spinning' && (
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-black/10 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Email Step */}
            {step === 'email' && (
              <div className="p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Gift className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  You Unlocked a Spin!
                </h2>
                <p className="text-gray-600 mb-6">
                  Enter your email to spin the sombrero and win a prize!
                </p>

                <form onSubmit={handleSubmitEmail} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none text-lg"
                      disabled={isLoading}
                    />
                  </div>

                  {error && (
                    <p className="text-red-600 text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        SPIN TO WIN!
                      </>
                    )}
                  </button>
                </form>

                <p className="text-xs text-gray-500 mt-4">
                  One spin per email. Prize valid for 15 minutes.
                </p>
              </div>
            )}

            {/* Spinning Step */}
            {step === 'spinning' && (
              <div className="p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Spinning...
                </h2>

                {/* Spinning Sombrero/Wheel */}
                <div className="relative w-64 h-64 mx-auto">
                  {/* Wheel */}
                  <motion.div
                    className="w-full h-full rounded-full relative overflow-hidden shadow-2xl"
                    style={{
                      background: `conic-gradient(
                        ${WHEEL_SEGMENTS.map((seg, i) => {
                          const angle = (360 / WHEEL_SEGMENTS.length);
                          return `${seg.color} ${i * angle}deg ${(i + 1) * angle}deg`;
                        }).join(', ')}
                      )`,
                    }}
                    animate={{ rotate: rotation }}
                    transition={{ duration: 4, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {/* Segment labels */}
                    {WHEEL_SEGMENTS.map((seg, i) => {
                      const angle = (i * 360) / WHEEL_SEGMENTS.length + (180 / WHEEL_SEGMENTS.length);
                      return (
                        <div
                          key={i}
                          className="absolute left-1/2 top-1/2 origin-left text-white font-bold text-[10px] whitespace-nowrap"
                          style={{
                            transform: `rotate(${angle}deg) translateX(30px)`,
                          }}
                        >
                          {seg.label}
                        </div>
                      );
                    })}
                  </motion.div>

                  {/* Center sombrero */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 bg-amber-600 rounded-full shadow-lg flex items-center justify-center text-3xl border-4 border-amber-700">
                      🎭
                    </div>
                  </div>

                  {/* Pointer */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                    <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-red-600" />
                  </div>
                </div>

                <p className="text-gray-600 mt-6 animate-pulse">
                  Good luck!
                </p>
              </div>
            )}

            {/* Result Step */}
            {step === 'result' && prize && (
              <div className="p-6 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 10 }}
                  className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-5xl">🎉</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-gray-900 mb-2"
                >
                  YOU WON!
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-4 mb-4 border-2 border-amber-300"
                >
                  <p className="text-2xl font-bold text-amber-700">{prize.name}</p>
                  <p className="text-gray-600 text-sm mt-1">{prize.description}</p>
                </motion.div>

                {/* Countdown */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-4"
                >
                  <CountdownTimer expiresAt={prize.expiresAt} />
                </motion.div>

                {/* Prize code */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gray-100 rounded-lg p-3 mb-6"
                >
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Your Code</p>
                  <p className="font-mono font-bold text-lg">{prize.code}</p>
                </motion.div>

                {/* CTA Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={handleContinueToCheckout}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Complete Checkout Now!
                </motion.button>

                <p className="text-xs text-gray-500 mt-4">
                  {prize.type === 'product'
                    ? 'Prize has been added to your cart!'
                    : 'Code will be applied at checkout.'}
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
