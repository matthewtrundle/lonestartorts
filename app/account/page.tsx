'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, CreditCard, LogOut, Clock, Truck, Calendar, ExternalLink, Building2, ShoppingBag, Star, Gift } from 'lucide-react';
import SubscriptionCard from '@/components/account/SubscriptionCard';
import { formatPrice } from '@/lib/utils';

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

interface WholesaleOrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface WholesaleOrder {
  id: string;
  orderNumber: string;
  total: number;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
  items: WholesaleOrderItem[];
}

interface WholesaleData {
  businessName: string;
  pricingTier: string;
  paymentTerms: string;
  status: string;
  orders: WholesaleOrder[];
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

interface CustomerData {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  stripeCustomerId: string | null;
  isWholesale?: boolean;
  subscriptions: Subscription[];
  recentOrders: RecentOrder[];
  wholesale?: WholesaleData;
  loyalty?: LoyaltyData;
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

export default function AccountPage() {
  const router = useRouter();
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [redeemResult, setRedeemResult] = useState<{ code: string; expiresAt: string } | null>(null);

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    try {
      const res = await fetch('/api/customer/me');
      if (!res.ok) {
        router.push('/account/login');
        return;
      }
      const data = await res.json();
      setCustomer(data.customer);
    } catch {
      router.push('/account/login');
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setPortalLoading(true);
    try {
      const res = await fetch('/api/customer/portal', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert('Failed to open subscription management. Please try again.');
    } finally {
      setPortalLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/customer/logout', { method: 'POST' });
    router.push('/');
  };

  const handleRedeem = async () => {
    setRedeemLoading(true);
    try {
      const res = await fetch('/api/customer/loyalty/redeem', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to redeem points');
        return;
      }
      setRedeemResult({ code: data.code, expiresAt: data.expiresAt });
      fetchCustomer();
    } catch {
      alert('Failed to redeem points');
    } finally {
      setRedeemLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunset-600"></div>
      </div>
    );
  }

  if (!customer) return null;

  const activeSubscriptions = customer.subscriptions.filter(s => s.status !== 'CANCELLED');

  return (
    <div className="bg-cream-50 min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-charcoal-950">
              Howdy{customer.firstName ? `, ${customer.firstName}` : ''}!
            </h1>
            <p className="text-charcoal-600 mt-1">{customer.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-charcoal-500 hover:text-charcoal-700"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Subscriptions */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-charcoal-950 flex items-center gap-2">
                  <Package className="w-5 h-5 text-sunset-600" />
                  My Subscriptions
                </h2>
                {customer.stripeCustomerId && (
                  <button
                    onClick={handleManageSubscription}
                    disabled={portalLoading}
                    className="text-sm text-charcoal-500 hover:text-charcoal-700 font-medium flex items-center gap-1"
                  >
                    <CreditCard className="w-4 h-4" />
                    {portalLoading ? 'Opening...' : 'Manage Billing'}
                  </button>
                )}
              </div>

              {customer.subscriptions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-charcoal-500 mb-4">No subscriptions yet</p>
                  <Link
                    href="/subscribe"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-sunset-600 text-white rounded-lg font-medium hover:bg-sunset-700"
                  >
                    Start a Subscription
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {customer.subscriptions.map(sub => (
                    <SubscriptionCard
                      key={sub.id}
                      subscription={sub}
                      onUpdate={fetchCustomer}
                    />
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

              {!customer.loyalty ? (
                <div className="text-center py-6">
                  <p className="text-charcoal-500 mb-2">Start earning points with every order!</p>
                  <p className="text-sm text-charcoal-400">Earn 2 points per $1 spent. Redeem 200 points for $5 off.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-3xl font-bold text-charcoal-950">{customer.loyalty.balance.toLocaleString()}</p>
                      <p className="text-sm text-charcoal-500">points available</p>
                    </div>
                    {customer.loyalty.canRedeem ? (
                      <button
                        onClick={handleRedeem}
                        disabled={redeemLoading}
                        className="flex items-center gap-2 px-4 py-2.5 bg-sunset-600 text-white rounded-lg font-medium hover:bg-sunset-700"
                      >
                        <Gift className="w-4 h-4" />
                        {redeemLoading ? 'Redeeming...' : 'Redeem $5 Off'}
                      </button>
                    ) : (
                      <div className="text-right">
                        <p className="text-sm text-charcoal-500">{customer.loyalty.nextRedemptionAt} more to redeem</p>
                        <div className="w-32 bg-charcoal-100 rounded-full h-2 mt-1">
                          <div
                            className="bg-sunset-500 rounded-full h-2 transition-all"
                            style={{ width: `${Math.min(100, ((200 - customer.loyalty.nextRedemptionAt) / 200) * 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {redeemResult && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-green-800 mb-1">Your discount code:</p>
                      <code className="text-lg font-bold text-green-700">{redeemResult.code}</code>
                      <p className="text-xs text-green-600 mt-1">
                        Valid until {new Date(redeemResult.expiresAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  )}

                  {customer.loyalty.recentTransactions.length > 0 && (
                    <div className="border-t border-charcoal-100 pt-3 mt-3">
                      <p className="text-sm font-semibold text-charcoal-700 mb-2">Recent Activity</p>
                      <div className="space-y-2">
                        {customer.loyalty.recentTransactions.map(tx => (
                          <div key={tx.id} className="flex items-center justify-between text-sm">
                            <span className="text-charcoal-600">{tx.description}</span>
                            <span className={`font-medium ${tx.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {tx.points > 0 ? '+' : ''}{tx.points}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-3 text-xs text-charcoal-400">
                    Lifetime earned: {customer.loyalty.lifetimeEarned.toLocaleString()} pts &bull; Redeemed: {customer.loyalty.lifetimeRedeemed.toLocaleString()} pts
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

              {customer.recentOrders.length === 0 ? (
                <p className="text-charcoal-500 py-4 text-center">No orders yet</p>
              ) : (
                <div className="divide-y divide-charcoal-100">
                  {customer.recentOrders.map(order => (
                    <div key={order.id} className="py-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-charcoal-950">{order.orderNumber}</p>
                        <p className="text-sm text-charcoal-500">
                          {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                          {order.status}
                        </span>
                        <span className="font-medium text-charcoal-950">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Wholesale Orders */}
            {customer.isWholesale && customer.wholesale && (
              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-charcoal-950 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-sunset-600" />
                    Wholesale Orders
                  </h2>
                  <div className="text-right">
                    <p className="text-sm font-medium text-charcoal-700">{customer.wholesale.businessName}</p>
                    <p className="text-xs text-charcoal-500">{customer.wholesale.pricingTier} tier &bull; {customer.wholesale.paymentTerms.replace(/_/g, ' ').toLowerCase()}</p>
                  </div>
                </div>

                {customer.wholesale.orders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-charcoal-500 mb-4">No wholesale orders yet</p>
                    <Link
                      href="/wholesale"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-sunset-600 text-white rounded-lg font-medium hover:bg-sunset-700"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Place Wholesale Order
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-charcoal-100">
                    {customer.wholesale.orders.map(order => (
                      <div key={order.id} className="py-3">
                        <div className="flex items-center justify-between mb-1">
                          <div>
                            <p className="font-medium text-charcoal-950">{order.orderNumber}</p>
                            <p className="text-sm text-charcoal-500">
                              {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[order.paymentStatus] || statusColors[order.orderStatus] || 'bg-gray-100 text-gray-600'}`}>
                              {order.paymentStatus}
                            </span>
                            <span className="font-medium text-charcoal-950">{formatPrice(order.total)}</span>
                          </div>
                        </div>
                        <div className="text-xs text-charcoal-500">
                          {order.items.map((item, i) => (
                            <span key={i}>{i > 0 ? ', ' : ''}{item.quantity}x {item.name}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-charcoal-100">
                  <Link
                    href="/wholesale"
                    className="text-sm text-sunset-600 hover:text-sunset-700 font-medium"
                  >
                    Place another wholesale order →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-bold text-charcoal-950 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {customer.stripeCustomerId && (
                  <button
                    onClick={handleManageSubscription}
                    disabled={portalLoading}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-charcoal-50 rounded-lg hover:bg-charcoal-100 text-left"
                  >
                    <CreditCard className="w-5 h-5 text-charcoal-600" />
                    <div>
                      <p className="font-medium text-charcoal-950 text-sm">Payment & Billing</p>
                      <p className="text-xs text-charcoal-500">Update card, view invoices</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-charcoal-400 ml-auto" />
                  </button>
                )}
                <Link
                  href="/track"
                  className="w-full flex items-center gap-3 px-4 py-3 bg-charcoal-50 rounded-lg hover:bg-charcoal-100"
                >
                  <Clock className="w-5 h-5 text-charcoal-600" />
                  <div>
                    <p className="font-medium text-charcoal-950 text-sm">Track an Order</p>
                    <p className="text-xs text-charcoal-500">Check delivery status</p>
                  </div>
                </Link>
                <Link
                  href="/subscribe"
                  className="w-full flex items-center gap-3 px-4 py-3 bg-charcoal-50 rounded-lg hover:bg-charcoal-100"
                >
                  <Package className="w-5 h-5 text-charcoal-600" />
                  <div>
                    <p className="font-medium text-charcoal-950 text-sm">
                      {activeSubscriptions.length > 0 ? 'Add Subscription' : 'Start Subscribing'}
                    </p>
                    <p className="text-xs text-charcoal-500">Never run out of tortillas</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Help */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-bold text-charcoal-950 mb-3">Need Help?</h2>
              <div className="space-y-2 text-sm">
                <a href="tel:+15128946823" className="block text-charcoal-600 hover:text-sunset-600">
                  Call us: (512) 894-6823
                </a>
                <a href="mailto:howdy@lonestartortillas.com" className="block text-charcoal-600 hover:text-sunset-600">
                  howdy@lonestartortillas.com
                </a>
                <Link href="/faq" className="block text-charcoal-600 hover:text-sunset-600">
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
