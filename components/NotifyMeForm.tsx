'use client';

import { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';

interface NotifyMeFormProps {
  source: 'banner' | 'cart' | 'product' | 'subscribe-page' | 'checkout' | 'wholesale' | 'shop';
  variant?: 'compact' | 'full';
  className?: string;
}

export function NotifyMeForm({ source, variant = 'full', className = '' }: NotifyMeFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || status === 'loading') return;

    setStatus('loading');
    setErrorMessage('');
    try {
      const res = await fetch(`/api/waitlist?utm_source=pause&utm_campaign=${source}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        return;
      }
      const data = await res.json().catch(() => ({}));
      // Duplicate signups are a success as far as the visitor is concerned
      if (res.status === 400 && typeof data.error === 'string' && data.error.includes('already')) {
        setStatus('success');
        return;
      }
      throw new Error(data.error || 'Something went wrong');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong — please try again');
    }
  };

  if (status === 'success') {
    return (
      <div
        className={`flex items-center gap-2 text-sm font-medium ${
          variant === 'compact' ? 'text-white' : 'text-green-700'
        } ${className}`}
      >
        <CheckCircle className="w-5 h-5 shrink-0" />
        <span>You&apos;re on the list — we&apos;ll email you the moment we&apos;re back!</span>
      </div>
    );
  }

  const compact = variant === 'compact';

  return (
    <form onSubmit={handleSubmit} className={`${compact ? '' : 'w-full max-w-md'} ${className}`}>
      <div className={`flex ${compact ? 'gap-2' : 'flex-col sm:flex-row gap-3'}`}>
        <label htmlFor={`notify-email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`notify-email-${source}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={
            compact
              ? 'flex-1 min-w-0 rounded-md border border-white/30 bg-white/10 px-3 py-1.5 text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/60'
              : 'flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sunset-500'
          }
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={
            compact
              ? 'shrink-0 rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-charcoal-950 hover:bg-cream-100 disabled:opacity-60'
              : 'shrink-0 rounded-lg bg-sunset-600 px-6 py-3 font-semibold text-white hover:bg-sunset-700 disabled:opacity-60'
          }
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin mx-auto" />
          ) : (
            'Notify me'
          )}
        </button>
      </div>
      {status === 'error' && (
        <p className={`mt-2 text-sm ${compact ? 'text-red-200' : 'text-red-600'}`}>{errorMessage}</p>
      )}
    </form>
  );
}
