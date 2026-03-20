'use client';

import React, { useState } from 'react';
import { Building2, LogIn, UserPlus } from 'lucide-react';

interface WholesaleAuthGateProps {
  onAuthenticated: (customer: { id: string; email: string; firstName: string | null; isWholesale: boolean }) => void;
}

export function WholesaleAuthGate({ onAuthenticated }: WholesaleAuthGateProps) {
  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [businessName, setBusinessName] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/customer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          isWholesale: true,
          businessName: businessName.trim(),
          businessType: 'Other',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      onAuthenticated(data.customer);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/customer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      // Verify this is a wholesale customer
      const meRes = await fetch('/api/customer/me');
      const meData = await meRes.json();
      if (!meRes.ok) throw new Error('Failed to verify account');

      onAuthenticated(meData.customer);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-soft p-5 border-2 border-sunset-200">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="w-5 h-5 text-sunset-600" />
        <h3 className="font-bold text-charcoal-950">Wholesale Account Required</h3>
      </div>
      <p className="text-sm text-charcoal-600 mb-4">
        Sign in or create a wholesale account to complete your order.
      </p>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => { setMode('register'); setError(null); }}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            mode === 'register'
              ? 'border-sunset-600 text-sunset-600'
              : 'border-transparent text-charcoal-500 hover:text-charcoal-700'
          }`}
        >
          <UserPlus className="w-4 h-4" />
          Register
        </button>
        <button
          onClick={() => { setMode('login'); setError(null); }}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            mode === 'login'
              ? 'border-sunset-600 text-sunset-600'
              : 'border-transparent text-charcoal-500 hover:text-charcoal-700'
          }`}
        >
          <LogIn className="w-4 h-4" />
          Sign In
        </button>
      </div>

      {mode === 'register' ? (
        <form onSubmit={handleRegister} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-sunset-500"
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-sunset-500"
            />
          </div>
          <input
            type="text"
            placeholder="Business name *"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-sunset-500"
          />
          <input
            type="email"
            placeholder="Email address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-sunset-500"
          />
          <input
            type="password"
            placeholder="Password (min 8 characters) *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-sunset-500"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-sunset-600 text-white rounded font-medium text-sm hover:bg-sunset-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Creating Account...' : 'Create Wholesale Account'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-sunset-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-sunset-500"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-sunset-600 text-white rounded font-medium text-sm hover:bg-sunset-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      )}
    </div>
  );
}
