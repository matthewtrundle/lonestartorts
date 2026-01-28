'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { trackExitSurveyResponse } from '@/lib/analytics';

const REASONS = [
  { id: 'price_too_high', label: 'Price is too high', emoji: '💰' },
  { id: 'shipping_expensive', label: 'Shipping costs too much', emoji: '📦' },
  { id: 'just_browsing', label: 'Just browsing', emoji: '👀' },
  { id: 'will_order_later', label: "I'll order later", emoji: '⏰' },
  { id: 'other', label: 'Other reason', emoji: '💬' },
];

interface ExitIntentSurveyProps {
  page: 'cart' | 'checkout';
  onCartClose?: boolean; // Trigger when cart sidebar closes without checkout
}

export function ExitIntentSurvey({ page, onCartClose }: ExitIntentSurveyProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [otherText, setOtherText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [triggerSource, setTriggerSource] = useState<string>('');
  const cartCloseCountRef = useRef(0);

  const { items, subtotal, shipping, total } = useCart();

  // Debug helper - shows survey with trigger logging
  const showSurvey = useCallback((trigger: string) => {
    console.log(`[ExitSurvey] Triggered by: ${trigger}`);
    setTriggerSource(trigger);
    setIsVisible(true);
    setHasShown(true);
    sessionStorage.setItem('lonestar_exit_survey_shown', 'true');
  }, []);

  // Get UTM params from URL
  const getUtmParams = useCallback(() => {
    if (typeof window === 'undefined') return {};
    const params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get('utm_source') || undefined,
      utmMedium: params.get('utm_medium') || undefined,
      utmCampaign: params.get('utm_campaign') || undefined,
    };
  }, []);

  // Get device type
  const getDeviceType = useCallback(() => {
    if (typeof window === 'undefined') return 'unknown';
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }, []);

  // Handle mouse leave (desktop exit intent) - only triggers when mouse leaves toward top of window
  useEffect(() => {
    if (hasShown || items.length === 0) return;

    // Desktop only
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves through the TOP of the document (toward browser chrome/tabs)
      // e.clientY will be negative or very small when leaving through top
      if (e.clientY <= 0 && !hasShown && items.length > 0) {
        showSurvey('mouse_leave_top');
      }
    };

    // Use mouseleave on documentElement - only fires when leaving the entire document
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    return () => document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown, items.length, showSurvey]);

  // Handle mobile exit intent via rapid scroll up or back gesture
  useEffect(() => {
    if (hasShown || items.length === 0) return;

    let lastScrollY = window.scrollY;
    let scrollUpDistance = 0;
    const SCROLL_THRESHOLD = 300; // pixels of rapid upward scroll to trigger

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = lastScrollY - currentScrollY;

      // Track rapid upward scrolling (positive delta = scrolling up)
      if (delta > 0) {
        scrollUpDistance += delta;
        // Trigger if user scrolls up rapidly (indicating exit intent on mobile)
        if (scrollUpDistance > SCROLL_THRESHOLD && currentScrollY < 100 && !hasShown && items.length > 0) {
          showSurvey('rapid_scroll_up');
        }
      } else {
        // Reset if scrolling down
        scrollUpDistance = 0;
      }

      lastScrollY = currentScrollY;
    };

    // Only add scroll listener on mobile/tablet
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [hasShown, items.length, showSurvey]);

  // Handle beforeunload (works on both desktop and mobile)
  useEffect(() => {
    if (hasShown || items.length === 0) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Can't show modal here, but we can track the abandon
      if (items.length > 0 && !hasShown) {
        // Track cart abandonment silently
        navigator.sendBeacon('/api/exit-survey', JSON.stringify({
          page,
          reason: 'page_close',
          itemCount: items.length,
          subtotal,
          shipping,
          total,
          deviceType: getDeviceType(),
          ...getUtmParams(),
        }));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasShown, items.length, page, subtotal, shipping, total, getDeviceType, getUtmParams]);

  // Handle visibility change (tab switch or close)
  useEffect(() => {
    if (hasShown || items.length === 0) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !hasShown && items.length > 0) {
        // Store that we should show on return
        sessionStorage.setItem('lonestar_exit_intent_pending', 'true');
      } else if (document.visibilityState === 'visible') {
        const pending = sessionStorage.getItem('lonestar_exit_intent_pending');
        if (pending === 'true' && !hasShown && items.length > 0) {
          sessionStorage.removeItem('lonestar_exit_intent_pending');
          showSurvey('tab_switch_return');
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [hasShown, items.length, showSurvey]);

  // Inactivity timeout - show survey after 45 seconds of no interaction on checkout page
  useEffect(() => {
    if (hasShown || items.length === 0 || page !== 'checkout') return;

    let inactivityTimer: NodeJS.Timeout;
    const INACTIVITY_TIMEOUT = 45000; // 45 seconds

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (!hasShown && items.length > 0) {
          showSurvey('checkout_inactivity_45s');
        }
      }, INACTIVITY_TIMEOUT);
    };

    // Reset timer on any user activity
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach(event => document.addEventListener(event, resetTimer, { passive: true }));

    // Start the timer
    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => document.removeEventListener(event, resetTimer));
    };
  }, [hasShown, items.length, page, showSurvey]);

  // REMOVED: 25-second mobile timer was too aggressive and fired unexpectedly
  // Mobile users now rely on: checkout inactivity (45s), cart close (2x), tab switch return, rapid scroll up

  // Cart close trigger - show survey when user closes cart sidebar without checking out
  useEffect(() => {
    if (!onCartClose || hasShown || items.length === 0) return;

    // Only trigger after the second cart close (first might be accidental)
    cartCloseCountRef.current++;

    if (cartCloseCountRef.current >= 2) {
      showSurvey('cart_close_2x');
    }
  }, [onCartClose, hasShown, items.length, showSurvey]);

  // REMOVED: Back button intercept was firing unexpectedly on mobile browsers
  // The history.pushState on mount + popstate listener caused immediate triggers
  // when users navigated to the page via any history navigation

  // Check if already shown this session
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('lonestar_exit_survey_shown');
    if (alreadyShown === 'true') {
      setHasShown(true);
    }
  }, []);

  // URL param for testing: ?exit_survey=test
  useEffect(() => {
    if (typeof window === 'undefined' || hasShown) return;

    const params = new URLSearchParams(window.location.search);
    if (params.get('exit_survey') === 'test') {
      // Small delay to ensure component is fully mounted
      setTimeout(() => {
        showSurvey('url_param_test');
      }, 100);
    }
  }, [hasShown, showSurvey]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('lonestar_exit_survey_shown', 'true');
  };

  const handleSubmit = async () => {
    if (!selectedReason) return;

    setIsSubmitting(true);

    try {
      // Track in analytics
      trackExitSurveyResponse({
        reason: selectedReason,
        page,
        itemCount: items.length,
        cartTotal: total / 100,
      });

      // Save to database
      await fetch('/api/exit-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page,
          reason: selectedReason,
          otherText: selectedReason === 'other' ? otherText : null,
          itemCount: items.length,
          subtotal,
          shipping,
          total,
          deviceType: getDeviceType(),
          ...getUtmParams(),
        }),
      });

      setSubmitted(true);

      // Close after showing thank you
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to submit survey:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render if no items in cart
  if (items.length === 0) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[10000]"
            onClick={handleClose}
          />

          {/* Modal wrapper - flexbox centering is more reliable than transform on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-[10001] pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
            >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              {submitted ? (
                // Thank you state
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🙏</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Thanks for your feedback!
                  </h3>
                  <p className="text-gray-600">
                    We're always working to improve.
                  </p>
                </div>
              ) : (
                // Survey form
                <>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-sunset-100 rounded-full mb-3">
                      <MessageCircle className="w-6 h-6 text-sunset-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Wait! Before you go...
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Quick question — what's holding you back?
                    </p>
                  </div>

                  <div className="space-y-2 mb-4">
                    {REASONS.map((reason) => (
                      <button
                        key={reason.id}
                        onClick={() => setSelectedReason(reason.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                          selectedReason === reason.id
                            ? 'border-sunset-500 bg-sunset-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-xl">{reason.emoji}</span>
                        <span className="font-medium text-gray-900">{reason.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Other text input */}
                  {selectedReason === 'other' && (
                    <div className="mb-4">
                      <textarea
                        value={otherText}
                        onChange={(e) => setOtherText(e.target.value)}
                        placeholder="Tell us more..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent resize-none"
                        rows={2}
                      />
                    </div>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={!selectedReason || isSubmitting}
                    className="w-full py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Feedback'}
                  </button>

                  <button
                    onClick={handleClose}
                    className="w-full mt-2 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    No thanks, just let me leave
                  </button>
                </>
              )}
            </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
