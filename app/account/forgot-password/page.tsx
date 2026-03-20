'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Send } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/customer/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Something went wrong');
        return;
      }

      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-cream-50 px-4 pt-24">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {submitted ? (
            <div className="text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-7 h-7 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-charcoal-950 mb-2">Check Your Email</h1>
              <p className="text-charcoal-600 mb-6">
                If an account exists for <strong>{email}</strong>, we&apos;ve sent password reset instructions.
              </p>
              <Link
                href="/account/login"
                className="inline-flex items-center gap-2 text-sunset-600 font-medium hover:text-sunset-700"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to sign in
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 bg-sunset-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-sunset-600" />
                </div>
                <h1 className="text-2xl font-bold text-charcoal-950">Reset Password</h1>
                <p className="text-charcoal-600 mt-1">Enter your email and we&apos;ll send you a reset link</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      className="w-full pl-10 pr-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-sunset-600 text-white rounded-lg font-semibold hover:bg-sunset-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/account/login"
                  className="inline-flex items-center gap-2 text-sm text-charcoal-600 hover:text-charcoal-800"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
