'use client';

import { useState } from 'react';
import { Calendar, Pause, Play, X, ChevronDown, ChevronUp, Truck } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

interface SubscriptionItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

interface SubscriptionData {
  id: string;
  name: string;
  status: string;
  interval: string;
  nextBillingDate: string | null;
  preferredShippingDay?: string | null;
  pausedUntil?: string | null;
  items: SubscriptionItem[];
  total: number;
}

const statusColors: Record<string, string> = {
  ACTIVE: 'bg-green-100 text-green-700',
  PAUSED: 'bg-yellow-100 text-yellow-700',
  CANCELLED: 'bg-red-100 text-red-700',
  PAST_DUE: 'bg-orange-100 text-orange-700',
};

const statusLabels: Record<string, string> = {
  ACTIVE: 'Active',
  PAUSED: 'Paused',
  CANCELLED: 'Cancelled',
  PAST_DUE: 'Past Due',
};

const shippingDayLabels: Record<string, string> = {
  '1st_tuesday': '1st Tuesday',
  '2nd_tuesday': '2nd Tuesday',
  '3rd_tuesday': '3rd Tuesday',
  '4th_tuesday': '4th Tuesday',
};

interface Props {
  subscription: SubscriptionData;
  onUpdate: () => void;
}

export default function SubscriptionCard({ subscription: sub, onUpdate }: Props) {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showConfirm, setShowConfirm] = useState<'pause' | 'cancel' | null>(null);
  const [showShipDay, setShowShipDay] = useState(false);

  const handleAction = async (action: string, extraData?: Record<string, string>) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/customer/subscription/${sub.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...extraData }),
      });
      if (!res.ok) {
        const err = await res.json();
        showToast(err.error || 'Failed to update subscription');
        return;
      }
      onUpdate();
    } catch {
      showToast('Failed to update subscription');
    } finally {
      setLoading(false);
      setShowConfirm(null);
      setShowShipDay(false);
    }
  };

  return (
    <div className="border border-charcoal-100 rounded-lg overflow-hidden">
      {/* Header */}
      <div
        className="p-4 cursor-pointer hover:bg-cream-50"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-charcoal-950">{sub.name}</h3>
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[sub.status] || 'bg-gray-100 text-gray-600'}`}>
              {statusLabels[sub.status] || sub.status}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-lg font-bold text-charcoal-950">{formatPrice(sub.total)}</p>
              <p className="text-xs text-charcoal-500">per {sub.interval.toLowerCase()}</p>
            </div>
            {expanded ? <ChevronUp className="w-4 h-4 text-charcoal-400" /> : <ChevronDown className="w-4 h-4 text-charcoal-400" />}
          </div>
        </div>

        <div className="text-sm text-charcoal-600">
          {(sub.items as SubscriptionItem[]).map((item, i) => (
            <span key={i}>{i > 0 ? ', ' : ''}{item.quantity}x {item.name}</span>
          ))}
        </div>

        {sub.nextBillingDate && sub.status === 'ACTIVE' && (
          <div className="mt-2 flex items-center gap-2 text-sm text-charcoal-500">
            <Calendar className="w-4 h-4" />
            Next delivery: {new Date(sub.nextBillingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        )}

        {sub.status === 'PAUSED' && sub.pausedUntil && (
          <div className="mt-2 flex items-center gap-2 text-sm text-yellow-600">
            <Pause className="w-4 h-4" />
            Paused until {new Date(sub.pausedUntil).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        )}
      </div>

      {/* Expanded Actions */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-charcoal-100 pt-4 space-y-3">
          {/* Shipping Day */}
          {sub.preferredShippingDay && (
            <div className="flex items-center gap-2 text-sm text-charcoal-600">
              <Truck className="w-4 h-4" />
              Ships: {shippingDayLabels[sub.preferredShippingDay] || sub.preferredShippingDay}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            {sub.status === 'ACTIVE' && (
              <>
                <button
                  onClick={() => setShowConfirm('pause')}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg hover:bg-yellow-100"
                >
                  <Pause className="w-3.5 h-3.5" />
                  Pause (30 days)
                </button>
                <button
                  onClick={() => setShowConfirm('cancel')}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100"
                >
                  <X className="w-3.5 h-3.5" />
                  Cancel
                </button>
              </>
            )}
            {sub.status === 'PAUSED' && (
              <button
                onClick={() => handleAction('resume')}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-2 text-sm bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100"
              >
                <Play className="w-3.5 h-3.5" />
                {loading ? 'Resuming...' : 'Resume'}
              </button>
            )}
            {(sub.status === 'ACTIVE' || sub.status === 'PAUSED') && (
              <button
                onClick={() => setShowShipDay(true)}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-2 text-sm bg-charcoal-50 text-charcoal-700 border border-charcoal-200 rounded-lg hover:bg-charcoal-100"
              >
                <Truck className="w-3.5 h-3.5" />
                Change Shipping Day
              </button>
            )}
          </div>

          {/* Confirm Pause */}
          {showConfirm === 'pause' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800 mb-3">Pause your subscription for 30 days? You can resume anytime.</p>
              <div className="flex gap-2">
                <button onClick={() => handleAction('pause')} disabled={loading} className="px-3 py-1.5 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                  {loading ? 'Pausing...' : 'Yes, Pause'}
                </button>
                <button onClick={() => setShowConfirm(null)} className="px-3 py-1.5 text-sm border border-charcoal-200 rounded-lg hover:bg-charcoal-50">
                  Never mind
                </button>
              </div>
            </div>
          )}

          {/* Confirm Cancel */}
          {showConfirm === 'cancel' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800 mb-3">Cancel your subscription? It will remain active until the end of this billing period.</p>
              <div className="flex gap-2">
                <button onClick={() => handleAction('cancel')} disabled={loading} className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700">
                  {loading ? 'Cancelling...' : 'Yes, Cancel'}
                </button>
                <button onClick={() => setShowConfirm(null)} className="px-3 py-1.5 text-sm border border-charcoal-200 rounded-lg hover:bg-charcoal-50">
                  Keep Subscription
                </button>
              </div>
            </div>
          )}

          {/* Shipping Day Picker */}
          {showShipDay && (
            <div className="bg-charcoal-50 border border-charcoal-200 rounded-lg p-4">
              <p className="text-sm text-charcoal-700 mb-3 font-medium">Pick your shipping Tuesday:</p>
              <div className="grid grid-cols-2 gap-2">
                {['1st_tuesday', '2nd_tuesday', '3rd_tuesday', '4th_tuesday'].map(day => (
                  <button
                    key={day}
                    onClick={() => handleAction('update_shipping_day', { preferredShippingDay: day })}
                    disabled={loading}
                    className={`px-3 py-2 text-sm rounded-lg border ${
                      sub.preferredShippingDay === day
                        ? 'border-sunset-500 bg-sunset-50 text-sunset-700 font-medium'
                        : 'border-charcoal-200 hover:bg-white text-charcoal-700'
                    }`}
                  >
                    {shippingDayLabels[day]}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowShipDay(false)}
                className="mt-2 text-sm text-charcoal-500 hover:text-charcoal-700"
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
