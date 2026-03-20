'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowLeft, CheckCircle } from 'lucide-react';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-charcoal-950 mb-4">Invalid Reset Link</h1>
        <p className="text-charcoal-600 mb-6">This password reset link is invalid or has expired.</p>
        <Link
          href="/account/forgot-password"
          className="inline-flex items-center gap-2 text-sunset-600 font-medium hover:text-sunset-700"
        >
          Request a new reset link
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/customer/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push('/account/login'), 3000);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-7 h-7 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-charcoal-950 mb-2">Password Reset!</h1>
        <p className="text-charcoal-600">Your password has been updated. Redirecting to sign in...</p>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-sunset-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-7 h-7 text-sunset-600" />
        </div>
        <h1 className="text-2xl font-bold text-charcoal-950">Set New Password</h1>
        <p className="text-charcoal-600 mt-1">Enter your new password below</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-charcoal-700 mb-1">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full pl-10 pr-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-charcoal-700 mb-1">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full pl-10 pr-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-sunset-600 text-white rounded-lg font-semibold hover:bg-sunset-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Updating...' : 'Update Password'}
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
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-cream-50 px-4 pt-24">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Suspense fallback={
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sunset-600"></div>
            </div>
          }>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
