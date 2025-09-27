'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogoFull } from '@/components/ui/Logo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Redirect to admin dashboard
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <LogoFull className="text-charcoal-950 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-charcoal-950">Admin Login</h1>
            <p className="text-sm text-charcoal-600 mt-2">
              Access the waitlist dashboard
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-charcoal-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-charcoal-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-sunset-500 text-cream-50 py-3 rounded-lg font-bold tracking-wide uppercase hover:bg-sunset-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-charcoal-200">
            <p className="text-xs text-center text-charcoal-500">
              Tortilla Rodeo Co. Admin Panel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}