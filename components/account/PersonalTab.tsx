'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, CreditCard, Star, Gift, Truck, Copy, Check } from 'lucide-react';
import SubscriptionCard from '@/components/account/SubscriptionCard';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

interface Subscription {
  id: string;
  name: string;
  status: string;
  interval: string;
  nextBillingDate: string | null;
  preferredShippingDay?: string | null;
  pausedUntil?: string | null;
  items: Array<{ sku: string; name: string; quantity: number; unitPrice: number }>;
  total: number;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
}

interface LoyaltyTransaction {
  id: string;
  type: string;
  points: number;
  description: string;
  createdAt: string;
}

interface LoyaltyData {
  balance: number;
  lifetimeEarned: number;
  lifetimeRedeemed: number;
  canRedeem: boolean;
  nextRedemptionAt: number;
  recentTransactions: LoyaltyTransaction[];
}

interface PersonalTabProps {
  subscriptions: Subscription[];
  recentOrders: RecentOrder[];
  loyalty?: LoyaltyData | null;
  stripeCustomerId: string | null;
  onManageSubscription: () => void;
  portalLoading: boolean;
  onRefresh: () => void;
}

const statusColors: Record<string, string> = {
  ACTIVE: 'bg-green-100 text-green-700',
  PAUSED: 'bg-yellow-100 text-yellow-700',
  CANCELLED: 'bg-red-100 text-red-700',
  PAST_DUE: 'bg-orange-100 text-orange-700',
  PROCESSING: 'bg-blue-100 text-blue-700',
  SHIPPED: 'bg-green-100 text-green-700',
  DELIVERED: 'bg-emerald-100 text-emerald-700',
};

const statusLabels: Record<string, string> = {
  ACTIVE: 'Active',
  PAUSED: 'Paused',
  CANCELLED: 'Cancelled',
  PAST_DUE: 'Past Due',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  PENDING: 'Pending',
  PAID: 'Paid',
  FAILED: 'Failed',
};

function formatStatus(status: string): string {
  return statusLabels[status] || status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export default function PersonalTab({
  subscriptions,
  recentOrders,
  loyalty,
  stripeCustomerId,
  onManageSubscription,
  portalLoading,
  onRefresh,
}: PersonalTabProps) {
  const { showToast } = useToast();
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [redeemResult, setRedeemResult] = useState<{ code: string; expiresAt: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleRedeem = async () => {
    setRedeemLoading(true);
    try {
      const res = await fetch('/api/customer/loyalty/redeem', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Failed to redeem points');
        return;
      }
      setRedeemResult({ code: data.code, expiresAt: data.expiresAt });
      showToast('Points redeemed! Your discount code is ready.', 'success');
      onRefresh();
    } catch {
      showToast('Failed to redeem points');
    } finally {
      setRedeemLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Subscriptions */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-charcoal-950 flex items-center gap-2">
            <Package className="w-5 h-5 text-sunset-600" />
            My Subscriptions
          </h2>
          {stripeCustomerId && (
            <button
              onClick={onManageSubscription}
              disabled={portalLoading}
              className="text-sm text-charcoal-500 hover:text-charcoal-700 font-medium flex items-center gap-1"
            >
              <CreditCard className="w-4 h-4" />
              {portalLoading ? 'Opening...' : 'Manage Billing'}
            </button>
          )}
        </div>
        {subscriptions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-charcoal-500 mb-4">No subscriptions yet</p>
            <Link href="/subscribe" className="inline-flex items-center gap-2 px-5 py-2.5 bg-sunset-600 text-white rounded-lg font-medium hover:bg-sunset-700">
              Start a Subscription
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {subscriptions.map(sub => (
              <SubscriptionCard key={sub.id} subscription={sub} onUpdate={onRefresh} />
            ))}
          </div>
        )}
      </div>

      {/* Loyalty Points */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h2 className="text-lg font-bold text-charcoal-950 flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-sunset-600" />
          Loyalty Points
        </h2>
        {!loyalty ? (
          <div className="text-center py-6">
            <p className="text-charcoal-500 mb-2">Start earning points with every order!</p>
            <p className="text-sm text-charcoal-400">Earn 2 points per $1 spent. Redeem 200 points for $5 off.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-3xl font-bold text-charcoal-950">{loyalty.balance.toLocaleString()}</p>
                <p className="text-sm text-charcoal-500">points available</p>
              </div>
              {loyalty.canRedeem ? (
                <button onClick={handleRedeem} disabled={redeemLoading} className="flex items-center gap-2 px-4 py-2.5 bg-sunset-600 text-white rounded-lg font-medium hover:bg-sunset-700">
                  <Gift className="w-4 h-4" />
                  {redeemLoading ? 'Redeeming...' : 'Redeem $5 Off'}
                </button>
              ) : (
                <div className="text-right">
                  <p className="text-sm text-charcoal-500">{loyalty.nextRedemptionAt} more to redeem</p>
                  <div className="w-32 bg-charcoal-100 rounded-full h-2 mt-1">
                    <div className="bg-sunset-500 rounded-full h-2 transition-all" style={{ width: `${Math.min(100, ((200 - loyalty.nextRedemptionAt) / 200) * 100)}%` }} />
                  </div>
                </div>
              )}
            </div>
            {redeemResult && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-medium text-green-800 mb-1">Your discount code:</p>
                <div className="flex items-center gap-2">
                  <code className="text-lg font-bold text-green-700">{redeemResult.code}</code>
                  <button
                    onClick={() => { navigator.clipboard.writeText(redeemResult.code); setCopied(true); showToast('Discount code copied!', 'success'); setTimeout(() => setCopied(false), 2000); }}
                    className="p-1.5 rounded-md hover:bg-green-100 text-green-600 transition-colors"
                    aria-label="Copy discount code"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-green-600 mt-1">Valid until {new Date(redeemResult.expiresAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            )}
            {loyalty.recentTransactions.length > 0 && (
              <div className="border-t border-charcoal-100 pt-3 mt-3">
                <p className="text-sm font-semibold text-charcoal-700 mb-2">Recent Activity</p>
                <div className="space-y-2">
                  {loyalty.recentTransactions.map(tx => (
                    <div key={tx.id} className="flex items-center justify-between text-sm">
                      <span className="text-charcoal-600">{tx.description}</span>
                      <span className={`font-medium ${tx.points > 0 ? 'text-green-600' : 'text-red-600'}`}>{tx.points > 0 ? '+' : ''}{tx.points}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-3 text-xs text-charcoal-400">
              Lifetime earned: {loyalty.lifetimeEarned.toLocaleString()} pts &bull; Redeemed: {loyalty.lifetimeRedeemed.toLocaleString()} pts
            </div>
          </>
        )}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h2 className="text-lg font-bold text-charcoal-950 flex items-center gap-2 mb-4">
          <Truck className="w-5 h-5 text-sunset-600" />
          Recent Orders
        </h2>
        {recentOrders.length === 0 ? (
          <p className="text-charcoal-500 py-4 text-center">No orders yet</p>
        ) : (
          <div className="divide-y divide-charcoal-100">
            {recentOrders.map(order => (
              <div key={order.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-charcoal-950">{order.orderNumber}</p>
                  <p className="text-sm text-charcoal-500">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>{formatStatus(order.status)}</span>
                  <span className="font-medium text-charcoal-950">{formatPrice(order.total)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
