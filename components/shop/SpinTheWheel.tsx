'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Clock, ShoppingCart, Star, Gift, Check, Zap } from 'lucide-react';
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

// Prize segments with refined colors
const WHEEL_SEGMENTS = [
  { id: 'five_off', label: '$5 OFF', color: '#E67E22', textColor: '#FFFFFF' },
  { id: 'free_shipping', label: 'FREE SHIP', color: '#27AE60', textColor: '#FFFFFF' },
  { id: 'five_off', label: '$5 OFF', color: '#C0392B', textColor: '#FFFFFF' },
  { id: 'bonus_tortillas', label: '+10 FREE', color: '#8E44AD', textColor: '#FFFFFF' },
  { id: 'five_off', label: '$5 OFF', color: '#E67E22', textColor: '#FFFFFF' },
  { id: 'free_sauce', label: 'FREE SALSA', color: '#16A085', textColor: '#FFFFFF' },
  { id: 'five_off', label: '$5 OFF', color: '#C0392B', textColor: '#FFFFFF' },
  { id: 'jackpot', label: 'JACKPOT', color: '#D4AF37', textColor: '#FFFFFF' },
];

// Pre-generate confetti
const CONFETTI_PIECES = Array.from({ length: 50 }).map((_, i) => ({
  id: i,
  color: ['#E67E22', '#27AE60', '#C0392B', '#8E44AD', '#D4AF37', '#3498DB'][Math.floor(Math.random() * 6)],
  left: Math.random() * 100,
  delay: Math.random() * 0.3,
  duration: 1.5 + Math.random() * 1.5,
  size: 6 + Math.random() * 8,
  rotation: 360 * (Math.random() > 0.5 ? 1 : -1),
}));

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[10001]">
      {CONFETTI_PIECES.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.left}%`,
            top: -20,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: piece.id % 3 === 0 ? '50%' : '2px',
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
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full text-red-700 font-semibold">
      <Clock className="w-4 h-4" />
      <span>Expires in {timeLeft}</span>
    </div>
  );
}

function selectRandomPrize(): { id: string; index: number } {
  const weights = [40, 25, 40, 25, 40, 8, 40, 2];
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

  const [step, setStep] = useState<'ready' | 'spinning' | 'result' | 'done'>('ready');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prize, setPrize] = useState<Prize | null>(null);
  const [pendingPrizeId, setPendingPrizeId] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    const selected = selectRandomPrize();
    setPendingPrizeId(selected.id);

    const segmentAngle = 360 / WHEEL_SEGMENTS.length;
    const targetAngle = selected.index * segmentAngle;
    const fullRotations = 5 * 360;
    const finalRotation = fullRotations + (360 - targetAngle) + (segmentAngle / 2);

    setRotation(finalRotation);
    setStep('spinning');

    setTimeout(() => {
      setStep('result');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 3500);
  };

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
    } catch {
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

  const getPendingPrizeName = () => {
    const segment = WHEEL_SEGMENTS.find(s => s.id === pendingPrizeId);
    return segment?.label || 'PRIZE';
  };

  // Wheel component
  const SpinWheel = ({ isSpinning = false, onClick }: { isSpinning?: boolean; onClick?: () => void }) => (
    <div
      className={`relative w-64 h-64 md:w-72 md:h-72 mx-auto ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {/* Outer ring with metallic effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-yellow-600 via-yellow-500 to-yellow-700 shadow-xl">
        <div className="absolute inset-1 rounded-full bg-gradient-to-b from-yellow-700 to-yellow-800" />
      </div>

      {/* Wheel segments */}
      <motion.div
        className="absolute inset-3 rounded-full overflow-hidden shadow-inner"
        style={{
          background: `conic-gradient(
            ${WHEEL_SEGMENTS.map((seg, i) => {
              const angle = 360 / WHEEL_SEGMENTS.length;
              return `${seg.color} ${i * angle}deg ${(i + 1) * angle}deg`;
            }).join(', ')}
          )`,
        }}
        animate={isSpinning ? { rotate: rotation } : {}}
        transition={isSpinning ? { duration: 3.5, ease: [0.2, 0.1, 0.2, 1] } : {}}
      >
        {/* Segment labels - positioned radially outward */}
        {WHEEL_SEGMENTS.map((seg, i) => {
          const segmentAngle = 360 / WHEEL_SEGMENTS.length;
          const angle = i * segmentAngle + segmentAngle / 2;
          return (
            <div
              key={i}
              className="absolute font-extrabold text-white text-center"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${angle}deg) translateY(-70px) rotate(90deg)`,
                fontSize: '11px',
                textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.5)',
                letterSpacing: '0.5px',
                width: '60px',
                marginLeft: '-30px',
                lineHeight: '1.1',
              }}
            >
              {seg.label}
            </div>
          );
        })}

        {/* Divider lines */}
        {WHEEL_SEGMENTS.map((_, i) => {
          const angle = (i * 360) / WHEEL_SEGMENTS.length;
          return (
            <div
              key={`line-${i}`}
              className="absolute left-1/2 top-1/2 w-[2px] h-1/2 bg-white/40 origin-bottom"
              style={{ transform: `rotate(${angle}deg) translateX(-50%)` }}
            />
          );
        })}
      </motion.div>

      {/* Center hub */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 shadow-lg flex items-center justify-center border-4 border-yellow-300">
          <Star className="w-7 h-7 md:w-8 md:h-8 text-white fill-white" />
        </div>
      </div>

      {/* Pointer */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
        <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-gray-900 drop-shadow-md" />
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[10000]"
            onClick={handleClose}
          />

          {showConfetti && <Confetti />}

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center z-[10000] p-4 pointer-events-none"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden pointer-events-auto">
            {/* Header gradient */}
            <div className="h-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500" />

            {/* Close button */}
            {step !== 'spinning' && (
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}

            {/* Ready Step */}
            {step === 'ready' && (
              <div className="p-5 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold mb-3">
                  <Gift className="w-3.5 h-3.5" />
                  EXCLUSIVE OFFER
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                  Spin to Win!
                </h2>
                <p className="text-gray-500 text-sm mb-4">
                  Try your luck for instant savings
                </p>

                <SpinWheel onClick={handleSpin} />

                <button
                  onClick={handleSpin}
                  className="mt-4 w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  SPIN NOW
                </button>

                <p className="text-xs text-gray-400 mt-3">
                  Everyone wins • No purchase necessary
                </p>
              </div>
            )}

            {/* Spinning Step */}
            {step === 'spinning' && (
              <div className="p-5 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Spinning...
                </h2>

                <SpinWheel isSpinning />

                <p className="text-gray-500 mt-4 animate-pulse">
                  Good luck!
                </p>
              </div>
            )}

            {/* Result Step */}
            {step === 'result' && (
              <div className="p-5 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                  className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Gift className="w-8 h-8 text-white" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-2xl font-bold text-gray-900 mb-1"
                >
                  You Won!
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 mb-4 border border-yellow-200"
                >
                  <p className="text-2xl font-bold text-gray-900">{getPendingPrizeName()}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <p className="text-gray-600 text-sm mb-3">
                    Enter your email to claim:
                  </p>

                  <form onSubmit={handleClaimPrize} className="space-y-3">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none text-sm"
                        disabled={isLoading}
                        autoFocus
                      />
                    </div>

                    {error && (
                      <p className="text-red-600 text-xs">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          Claim Prize
                        </>
                      )}
                    </button>
                  </form>

                  <button
                    onClick={handleClose}
                    className="mt-3 text-gray-400 text-xs hover:text-gray-600"
                  >
                    No thanks
                  </button>
                </motion.div>
              </div>
            )}

            {/* Done Step */}
            {step === 'done' && prize && (
              <div className="p-5 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                  className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Check className="w-8 h-8 text-white" />
                </motion.div>

                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  Prize Claimed!
                </h2>

                <div className="bg-gray-50 rounded-xl p-4 mb-3 border border-gray-200">
                  <p className="text-lg font-bold text-gray-900">{prize.name}</p>
                  <p className="text-gray-500 text-xs mt-1">{prize.description}</p>
                </div>

                <div className="mb-3">
                  <CountdownTimer expiresAt={prize.expiresAt} />
                </div>

                <div className="bg-gray-100 rounded-lg px-4 py-2 mb-4 inline-block">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Your Code</p>
                  <p className="font-mono font-bold text-gray-900">{prize.code}</p>
                </div>

                <button
                  onClick={handleContinueToCheckout}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Continue to Checkout
                </button>

                <p className="text-xs text-gray-400 mt-3">
                  {prize.type === 'product'
                    ? 'Prize added to your cart!'
                    : 'Code auto-applied at checkout'}
                </p>
              </div>
            )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
