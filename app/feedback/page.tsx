'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Star, Copy, Check, Gift, AlertCircle } from 'lucide-react';

type FeedbackState = 'loading' | 'rating' | 'submitting' | 'success' | 'error' | 'already-submitted';

interface FeedbackData {
  orderNumber: string;
  customerName: string;
  rating?: number;
  couponCode?: string;
}

export default function FeedbackPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const initialRating = searchParams.get('rating');

  const [state, setState] = useState<FeedbackState>('loading');
  const [data, setData] = useState<FeedbackData | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(
    initialRating ? parseInt(initialRating, 10) : 0
  );
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [couponCode, setCouponCode] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    if (!token) {
      setError('No feedback token provided');
      setState('error');
      return;
    }

    validateToken();
  }, [token]);

  const validateToken = async () => {
    try {
      const response = await fetch(`/api/feedback?token=${token}`);
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Invalid feedback link');
        setState('error');
        return;
      }

      if (result.alreadySubmitted) {
        setData({
          orderNumber: result.orderNumber,
          customerName: '',
          rating: result.rating,
          couponCode: result.couponCode,
        });
        setCouponCode(result.couponCode);
        setState('already-submitted');
        return;
      }

      setData({
        orderNumber: result.orderNumber,
        customerName: result.customerName || 'Customer',
      });
      setState('rating');
    } catch (err) {
      console.error('Error validating token:', err);
      setError('Failed to validate feedback link');
      setState('error');
    }
  };

  const submitFeedback = async () => {
    if (selectedRating < 1 || selectedRating > 5) {
      setError('Please select a rating');
      return;
    }

    setState('submitting');
    setError('');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          rating: selectedRating,
          comment: comment.trim() || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Failed to submit feedback');
        setState('rating');
        return;
      }

      setCouponCode(result.couponCode);
      setState('success');
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError('Failed to submit feedback. Please try again.');
      setState('rating');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const renderStars = () => {
    const displayRating = hoveredRating || selectedRating;

    return (
      <div className="flex justify-center gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => setSelectedRating(rating)}
            onMouseEnter={() => setHoveredRating(rating)}
            onMouseLeave={() => setHoveredRating(0)}
            className="p-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-lg"
            aria-label={`Rate ${rating} star${rating > 1 ? 's' : ''}`}
          >
            <Star
              className={`w-12 h-12 transition-colors ${
                rating <= displayRating
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-stone-200 text-stone-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  // Loading state
  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-stone-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (state === 'error') {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 mb-2">Oops!</h1>
          <p className="text-stone-600 mb-6">{error}</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-stone-900 text-white rounded-lg font-semibold hover:bg-stone-800 transition-colors"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  // Already submitted state
  if (state === 'already-submitted') {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-amber-600 fill-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 mb-2">
            Already Submitted
          </h1>
          <p className="text-stone-600 mb-4">
            You've already rated Order #{data?.orderNumber}
          </p>
          <div className="flex justify-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-8 h-8 ${
                  star <= (data?.rating || 0)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-stone-200 text-stone-300'
                }`}
              />
            ))}
          </div>
          {couponCode && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-dashed border-amber-400 rounded-lg p-4 mb-6">
              <p className="text-sm text-amber-800 mb-2">Your 10% discount code:</p>
              <div className="flex items-center justify-center gap-2">
                <code className="text-xl font-bold text-amber-700 bg-white px-4 py-2 rounded border border-amber-200">
                  {couponCode}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}
          <a
            href="/"
            className="inline-block px-6 py-3 bg-stone-900 text-white rounded-lg font-semibold hover:bg-stone-800 transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  // Success state
  if (state === 'success') {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gift className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Thank You!</h1>
          <p className="text-lg text-stone-600 mb-6">
            Your feedback helps us make better tortillas.
          </p>

          {/* Coupon Display */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-dashed border-amber-400 rounded-xl p-6 mb-6">
            <p className="text-sm font-medium text-amber-800 mb-3 uppercase tracking-wide">
              Your 10% Discount Code
            </p>
            <div className="flex items-center justify-center gap-3 mb-3">
              <code className="text-2xl font-bold text-amber-700 bg-white px-5 py-3 rounded-lg border border-amber-200 shadow-sm">
                {couponCode}
              </code>
              <button
                onClick={copyToClipboard}
                className="p-3 bg-amber-100 text-amber-700 hover:bg-amber-200 rounded-lg transition-colors"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-amber-700">
              {copied ? 'Copied to clipboard!' : 'Click to copy'}
            </p>
          </div>

          <p className="text-sm text-stone-500 mb-6">
            Use this code at checkout for 10% off your next order.
            <br />
            Valid for 30 days.
          </p>

          <a
            href="/"
            className="inline-block px-8 py-4 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 transition-colors shadow-lg shadow-amber-200"
          >
            Shop Now & Save 10%
          </a>
        </div>
      </div>
    );
  }

  // Rating state (default)
  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 mb-2">
            How Were Your Tortillas?
          </h1>
          <p className="text-stone-600">
            Order #{data?.orderNumber}
          </p>
        </div>

        {/* Star Rating */}
        <div className="mb-6">
          <p className="text-center text-stone-600 mb-4">
            Tap a star to rate your experience
          </p>
          {renderStars()}
          <p className="text-center text-sm text-stone-500">
            {selectedRating === 0 && 'Select a rating'}
            {selectedRating === 1 && 'Poor'}
            {selectedRating === 2 && 'Fair'}
            {selectedRating === 3 && 'Good'}
            {selectedRating === 4 && 'Great'}
            {selectedRating === 5 && 'Excellent!'}
          </p>
        </div>

        {/* Comment field for low ratings */}
        {selectedRating >= 1 && selectedRating <= 3 && (
          <div className="mb-6">
            <label htmlFor="comment" className="block text-sm font-medium text-stone-700 mb-2">
              What could we improve? (Optional)
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us how we can make your experience better..."
              rows={3}
              maxLength={500}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none text-stone-800 placeholder-stone-400"
            />
            <p className="text-xs text-stone-400 mt-1 text-right">
              {comment.length}/500 characters
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Reward Note */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-center">
          <Gift className="w-6 h-6 text-amber-600 mx-auto mb-2" />
          <p className="text-sm text-amber-800">
            Submit your rating to receive a <strong>10% discount code</strong> for your next order!
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={submitFeedback}
          disabled={selectedRating === 0 || state === 'submitting'}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
            selectedRating === 0
              ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
              : state === 'submitting'
              ? 'bg-amber-400 text-white cursor-wait'
              : 'bg-amber-600 text-white hover:bg-amber-700 shadow-lg shadow-amber-200'
          }`}
        >
          {state === 'submitting' ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Submitting...
            </span>
          ) : (
            'Submit Rating & Get Discount'
          )}
        </button>
      </div>
    </div>
  );
}
