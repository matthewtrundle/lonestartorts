'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Timer, ShoppingCart, Sparkles } from 'lucide-react';
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
  { id: 'five_off', label: '$5 OFF', color: '#F59E0B', textColor: '#FFFFFF' },
  { id: 'free_shipping', label: 'FREE SHIPPING', color: '#10B981', textColor: '#FFFFFF' },
  { id: 'five_off', label: '$5 OFF', color: '#DC2626', textColor: '#FFFFFF' },
  { id: 'bonus_tortillas', label: '+10 TORTILLAS', color: '#8B5CF6', textColor: '#FFFFFF' },
  { id: 'five_off', label: '$5 OFF', color: '#F59E0B', textColor: '#FFFFFF' },
  { id: 'free_sauce', label: 'FREE SALSA', color: '#059669', textColor: '#FFFFFF' },
  { id: 'five_off', label: '$5 OFF', color: '#DC2626', textColor: '#FFFFFF' },
  { id: 'jackpot', label: 'JACKPOT!', color: '#EC4899', textColor: '#FFFFFF' },
];

// Pre-generate confetti data
const CONFETTI_PIECES = Array.from({ length: 60 }).map((_, i) => ({
  id: i,
  color: ['#F59E0B', '#10B981', '#EF4444', '#8B5CF6', '#EC4899', '#3B82F6'][Math.floor(Math.random() * 6)],
  left: Math.random() * 100,
  delay: Math.random() * 0.5,
  duration: 2 + Math.random() * 2,
  size: 8 + Math.random() * 10,
  rotation: 360 * (Math.random() > 0.5 ? 1 : -1),
}));

// Confetti component
function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[10001]">
      {CONFETTI_PIECES.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute rounded-sm"
          style={{
            left: `${piece.left}%`,
            top: -20,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 100 : 800,
            opacity: [1, 1, 0],
            rotate: piece.rotation,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'easeIn',
          }}
        />
      ))}
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

// Select a random prize (client-side for immediate spin)
function selectRandomPrize(): { id: string; index: number } {
  const weights = [40, 25, 40, 25, 40, 8, 40, 2]; // Must match WHEEL_SEGMENTS order
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < weights.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return { id: WHEEL_SEGMENTS[i].id, index: i };
    }
  }
  return { id: WHEEL_SEGMENTS[0].id, index: 0 };
}

export function SpinTheWheel({ isOpen, onClose, utmSource = 'tiktok' }: SpinTheWheelProps) {
  const { addItem, setIsOpen: setCartOpen } = useCart();

  // Steps: 'ready' -> 'spinning' -> 'result' -> 'claim' -> 'done'
  const [step, setStep] = useState<'ready' | 'spinning' | 'result' | 'claim' | 'done'>('ready');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prize, setPrize] = useState<Prize | null>(null);
  const [pendingPrizeId, setPendingPrizeId] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Handle spin button click - spin first, no email required
  const handleSpin = () => {
    // Select prize client-side for immediate feedback
    const selected = selectRandomPrize();
    setPendingPrizeId(selected.id);

    // Calculate rotation to land on the correct segment
    const segmentAngle = 360 / WHEEL_SEGMENTS.length;
    const targetAngle = selected.index * segmentAngle;
    // Add multiple full rotations for effect
    const fullRotations = 5 * 360;
    const finalRotation = fullRotations + (360 - targetAngle) + (segmentAngle / 2);

    setRotation(finalRotation);
    setStep('spinning');

    // After spin animation, show result
    setTimeout(() => {
      setStep('result');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }, 4000);
  };

  // Handle email submission to claim prize
  const handleClaimPrize = async (e: React.FormEvent) => {
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
        body: JSON.stringify({
          email: email.trim(),
          utmSource,
          // Server will generate its own prize, but we pass what they "won" visually
          clientPrizeId: pendingPrizeId,
        }),
      });

      const data = await response.json();

      if (data.alreadySpun) {
        if (data.prize) {
          setPrize(data.prize);
          setStep('done');
        } else {
          setError(data.message || 'This email has already claimed a prize.');
        }
        setIsLoading(false);
        return;
      }

      if (data.success && data.prize) {
        setPrize(data.prize);
        setStep('done');

        // Auto-add product prizes to cart
        if (data.prize.type === 'product' && data.prize.sku) {
          const product = getProductBySku(data.prize.sku);
          if (product) {
            addItem({
              sku: product.sku,
              name: `${product.name} (FREE!)`,
              price: 0,
              productType: product.productType,
              description: 'Spin-the-wheel prize!',
              image: product.image,
            });
          }
        }
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to claim prize. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueToCheckout = () => {
    onClose();
    setCartOpen(true);
  };

  const handleClose = () => {
    if (step === 'spinning') return;
    onClose();
  };

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep('ready');
      setEmail('');
      setError(null);
      setPrize(null);
      setPendingPrizeId(null);
      setRotation(0);
    }
  }, [isOpen]);

  // Get the display name for the pending prize
  const getPendingPrizeName = () => {
    const segment = WHEEL_SEGMENTS.find(s => s.id === pendingPrizeId);
    return segment?.label || 'PRIZE';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[10000]"
            onClick={handleClose}
          />

          {/* Confetti */}
          {showConfetti && <Confetti />}

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-md bg-gradient-to-b from-amber-50 to-orange-100 rounded-2xl shadow-2xl z-[10000] overflow-y-auto max-h-[90vh]"
          >
            {/* Close button */}
            {step !== 'spinning' && (
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 p-2 hover:bg-black/10 rounded-full transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
            )}

            {/* Ready to Spin Step */}
            {step === 'ready' && (
              <div className="p-4 md:p-6 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  Spin the Sombrero!
                </h2>
                <p className="text-gray-600 mb-4">
                  Tap to spin and win a prize!
                </p>

                {/* Sombrero Wheel - clickable */}
                <div
                  className="relative w-64 h-64 md:w-72 md:h-72 mx-auto mb-4 cursor-pointer"
                  onClick={handleSpin}
                >
                  {/* Outer decorative ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-amber-600 to-amber-800 shadow-2xl" />

                  {/* Wheel */}
                  <div
                    className="absolute inset-2 rounded-full overflow-hidden shadow-inner"
                    style={{
                      background: `conic-gradient(
                        ${WHEEL_SEGMENTS.map((seg, i) => {
                          const angle = 360 / WHEEL_SEGMENTS.length;
                          return `${seg.color} ${i * angle}deg ${(i + 1) * angle}deg`;
                        }).join(', ')}
                      )`,
                    }}
                  >
                    {/* Segment labels */}
                    {WHEEL_SEGMENTS.map((seg, i) => {
                      const angle = (i * 360) / WHEEL_SEGMENTS.length + (180 / WHEEL_SEGMENTS.length);
                      return (
                        <div
                          key={i}
                          className="absolute left-1/2 top-1/2 origin-left font-extrabold text-white"
                          style={{
                            transform: `rotate(${angle}deg) translateX(60px)`,
                            fontSize: '12px',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                            letterSpacing: '0.5px',
                          }}
                        >
                          {seg.label}
                        </div>
                      );
                    })}
                  </div>

                  {/* Center Sombrero */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Sombrero brim */}
                      <div className="w-24 h-8 md:w-28 md:h-10 bg-gradient-to-b from-amber-500 to-amber-700 rounded-full shadow-lg absolute -bottom-1 left-1/2 -translate-x-1/2" />
                      {/* Sombrero top */}
                      <div className="w-14 h-10 md:w-16 md:h-12 bg-gradient-to-b from-amber-400 to-amber-600 rounded-t-full mx-auto relative z-10 shadow-md flex items-center justify-center">
                        <span className="text-xl md:text-2xl">🌮</span>
                      </div>
                    </div>
                  </div>

                  {/* Pointer */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20">
                    <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-red-600 drop-shadow-lg" />
                  </div>
                </div>

                {/* Spin Button */}
                <button
                  onClick={handleSpin}
                  className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg rounded-xl hover:from-red-600 hover:to-orange-600 transition-all shadow-lg flex items-center justify-center gap-2 transform hover:scale-105"
                >
                  <Sparkles className="w-5 h-5" />
                  TAP TO SPIN!
                </button>

                <p className="text-xs text-gray-500 mt-2">
                  Everyone wins something!
                </p>
              </div>
            )}

            {/* Spinning Step */}
            {step === 'spinning' && (
              <div className="p-4 md:p-6 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Spinning...
                </h2>

                {/* Spinning Wheel */}
                <div className="relative w-64 h-64 md:w-72 md:h-72 mx-auto mb-4">
                  {/* Outer decorative ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-amber-600 to-amber-800 shadow-2xl" />

                  {/* Wheel - animated */}
                  <motion.div
                    className="absolute inset-2 rounded-full overflow-hidden shadow-inner"
                    style={{
                      background: `conic-gradient(
                        ${WHEEL_SEGMENTS.map((seg, i) => {
                          const angle = 360 / WHEEL_SEGMENTS.length;
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
                          className="absolute left-1/2 top-1/2 origin-left font-extrabold text-white"
                          style={{
                            transform: `rotate(${angle}deg) translateX(60px)`,
                            fontSize: '12px',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                            letterSpacing: '0.5px',
                          }}
                        >
                          {seg.label}
                        </div>
                      );
                    })}
                  </motion.div>

                  {/* Center Sombrero */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative">
                      <div className="w-24 h-8 md:w-28 md:h-10 bg-gradient-to-b from-amber-500 to-amber-700 rounded-full shadow-lg absolute -bottom-1 left-1/2 -translate-x-1/2" />
                      <div className="w-14 h-10 md:w-16 md:h-12 bg-gradient-to-b from-amber-400 to-amber-600 rounded-t-full mx-auto relative z-10 shadow-md flex items-center justify-center">
                        <span className="text-xl md:text-2xl">🌮</span>
                      </div>
                    </div>
                  </div>

                  {/* Pointer */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20">
                    <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-red-600 drop-shadow-lg" />
                  </div>
                </div>

                <p className="text-gray-600 animate-pulse">
                  Good luck!
                </p>
              </div>
            )}

            {/* Result Step - Show what they won, ask for email */}
            {step === 'result' && (
              <div className="p-6 md:p-8 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 10 }}
                  className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-4xl md:text-5xl">🎉</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
                >
                  YOU WON!
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-amber-200 to-orange-200 rounded-xl p-4 md:p-6 mb-6 border-2 border-amber-400"
                >
                  <p className="text-2xl md:text-3xl font-bold text-amber-800">{getPendingPrizeName()}</p>
                </motion.div>

                {/* Email form to claim */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-gray-600 mb-4">
                    Enter your email to claim your prize!
                  </p>

                  <form onSubmit={handleClaimPrize} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full pl-10 pr-4 py-3 border-2 border-amber-300 rounded-xl focus:border-amber-500 focus:outline-none text-lg bg-white"
                        disabled={isLoading}
                        autoFocus
                      />
                    </div>

                    {error && (
                      <p className="text-red-600 text-sm">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                      ) : (
                        'CLAIM MY PRIZE!'
                      )}
                    </button>
                  </form>

                  <button
                    onClick={handleClose}
                    className="mt-4 text-gray-500 text-sm hover:text-gray-700"
                  >
                    No thanks, I'll pass
                  </button>
                </motion.div>
              </div>
            )}

            {/* Done Step - Prize claimed */}
            {step === 'done' && prize && (
              <div className="p-6 md:p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                  className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-4xl">✅</span>
                </motion.div>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Prize Claimed!
                </h2>

                <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-4 mb-4 border-2 border-amber-300">
                  <p className="text-xl md:text-2xl font-bold text-amber-700">{prize.name}</p>
                  <p className="text-gray-600 text-sm mt-1">{prize.description}</p>
                </div>

                {/* Countdown */}
                <div className="mb-4">
                  <CountdownTimer expiresAt={prize.expiresAt} />
                </div>

                {/* Prize code */}
                <div className="bg-gray-100 rounded-lg p-3 mb-6">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Your Code</p>
                  <p className="font-mono font-bold text-lg">{prize.code}</p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleContinueToCheckout}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Complete Checkout Now!
                </button>

                <p className="text-xs text-gray-500 mt-4">
                  {prize.type === 'product'
                    ? 'Prize has been added to your cart!'
                    : 'Enter code at checkout to apply discount.'}
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
