'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, Loader2, PauseCircle, PlayCircle } from 'lucide-react';

interface StoreSettings {
  salesPaused: boolean;
  pauseMessage: string | null;
  updatedAt: string | null;
}

interface CancelResult {
  retail: { cancelled: number; emailed: number; errors: string[] };
  wholesale: { cancelled: number; emailed: number; errors: string[] };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [pauseMessage, setPauseMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [cancelResult, setCancelResult] = useState<CancelResult | null>(null);

  useEffect(() => {
    fetch('/api/admin/store-settings')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to load settings'))))
      .then((data: StoreSettings) => {
        setSettings(data);
        setPauseMessage(data.pauseMessage || '');
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const save = async (salesPaused: boolean) => {
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      const res = await fetch('/api/admin/store-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ salesPaused, pauseMessage: pauseMessage || null }),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to save');
      const data = await res.json();
      setSettings(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const cancelAllSubscriptions = async () => {
    if (
      !confirm(
        'This immediately cancels ALL active subscriptions in Stripe and emails each subscriber a goodbye note. This cannot be undone. Continue?'
      )
    ) {
      return;
    }
    setCancelling(true);
    setError('');
    setCancelResult(null);
    try {
      const res = await fetch('/api/admin/pause-sales', { method: 'POST' });
      if (!res.ok) throw new Error((await res.json()).error || 'Cancellation failed');
      setCancelResult(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cancellation failed');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-gray-500">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  const paused = settings?.salesPaused ?? false;

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Store Settings</h1>
        <p className="text-gray-500 mt-1">Pause or resume sales across the entire site.</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          {error}
        </div>
      )}

      {/* Pause toggle */}
      <div className={`rounded-xl border-2 p-6 ${paused ? 'border-amber-400 bg-amber-50' : 'border-green-200 bg-white'}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              {paused ? (
                <PauseCircle className="w-6 h-6 text-amber-600" />
              ) : (
                <PlayCircle className="w-6 h-6 text-green-600" />
              )}
              <h2 className="text-lg font-semibold text-gray-900">
                {paused ? 'Sales are PAUSED' : 'Sales are LIVE'}
              </h2>
            </div>
            <p className="text-sm text-gray-600 mt-2 max-w-md">
              {paused
                ? 'Checkout, subscriptions, and wholesale ordering are disabled. Visitors see the pause banner and can leave their email. Product feeds report out of stock.'
                : 'The store is fully operational. Pausing disables all purchases and switches the site to email capture — flip it back anytime, no deploy needed.'}
            </p>
          </div>
          <button
            onClick={() => save(!paused)}
            disabled={saving}
            className={`shrink-0 px-5 py-2.5 rounded-lg font-semibold text-white transition-colors disabled:opacity-50 ${
              paused ? 'bg-green-600 hover:bg-green-700' : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            {saving ? 'Saving…' : paused ? 'Resume Sales' : 'Pause Sales'}
          </button>
        </div>
      </div>

      {/* Banner message */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Pause banner message</h2>
        <p className="text-sm text-gray-500 mt-1">
          Shown in the site-wide banner while paused. Leave blank to use the default.
        </p>
        <textarea
          value={pauseMessage}
          onChange={(e) => setPauseMessage(e.target.value)}
          rows={3}
          maxLength={500}
          placeholder="We're taking a short break — back in a couple of months. Leave your email and we'll be in touch the moment we're back."
          className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() => save(paused)}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save message'}
          </button>
          {saved && (
            <span className="flex items-center gap-1 text-sm text-green-600">
              <CheckCircle className="w-4 h-4" /> Saved
            </span>
          )}
        </div>
      </div>

      {/* Subscription cancellation */}
      <div className="rounded-xl border border-red-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-red-700">Cancel all active subscriptions</h2>
        <p className="text-sm text-gray-600 mt-1 max-w-lg">
          Immediately cancels every active retail and wholesale subscription in Stripe (no further
          charges), emails each subscriber a goodbye note, and adds them to the comeback list.
          Run this once after pausing sales. Safe to re-run — already-cancelled subscriptions are skipped.
        </p>
        <button
          onClick={cancelAllSubscriptions}
          disabled={cancelling}
          className="mt-4 px-5 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50"
        >
          {cancelling ? 'Cancelling…' : 'Cancel all subscriptions'}
        </button>
        {cancelResult && (
          <div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 p-4 text-sm text-gray-700 space-y-1">
            <p>
              <strong>Retail:</strong> {cancelResult.retail.cancelled} cancelled,{' '}
              {cancelResult.retail.emailed} emailed
              {cancelResult.retail.errors.length > 0 && `, ${cancelResult.retail.errors.length} errors`}
            </p>
            <p>
              <strong>Wholesale:</strong> {cancelResult.wholesale.cancelled} cancelled,{' '}
              {cancelResult.wholesale.emailed} emailed
              {cancelResult.wholesale.errors.length > 0 &&
                `, ${cancelResult.wholesale.errors.length} errors`}
            </p>
            {[...cancelResult.retail.errors, ...cancelResult.wholesale.errors].map((e, i) => (
              <p key={i} className="text-red-600">
                {e}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
