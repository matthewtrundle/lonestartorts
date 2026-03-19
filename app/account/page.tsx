'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, CreditCard, Settings, LogOut, Clock, Truck, Calendar, ExternalLink } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface Subscription {
  id: string;
  name: string;
  status: string;
  interval: string;
  nextBillingDate: string | null;
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

interface CustomerData {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  stripeCustomerId: string | null;
  subscriptions: Subscription[];
  recentOrders: RecentOrder[];
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunset-600"></div>
      </div>
    );
  }

  if (!customer) return null;

  const activeSubscriptions = customer.subscriptions.filter(s => s.status === 'ACTIVE');

  return (
    <div className="bg-cream-50 min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 py-10">
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
                    className="text-sm text-sunset-600 hover:text-sunset-700 font-medium flex items-center gap-1"
                  >
                    <Settings className="w-4 h-4" />
                    {portalLoading ? 'Opening...' : 'Manage'}
                  </button>
                )}
              </div>

              {activeSubscriptions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-charcoal-500 mb-4">No active subscriptions</p>
                  <Link
                    href="/subscribe"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-sunset-600 text-white rounded-lg font-medium hover:bg-sunset-700"
                  >
                    Start a Subscription
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeSubscriptions.map(sub => (
                    <div key={sub.id} className="border border-charcoal-100 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-charcoal-950">{sub.name}</h3>
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mt-1 ${statusColors[sub.status] || 'bg-gray-100 text-gray-600'}`}>
                            {sub.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-charcoal-950">{formatPrice(sub.total)}</p>
                          <p className="text-xs text-charcoal-500">per {sub.interval.toLowerCase()}</p>
                        </div>
                      </div>
                      <div className="text-sm text-charcoal-600 space-y-1">
                        {(sub.items as Array<{ name: string; quantity: number }>).map((item, i) => (
                          <p key={i}>{item.quantity}x {item.name}</p>
                        ))}
                      </div>
                      {sub.nextBillingDate && (
                        <div className="mt-3 pt-3 border-t border-charcoal-100 flex items-center gap-2 text-sm text-charcoal-500">
                          <Calendar className="w-4 h-4" />
                          Next delivery: {new Date(sub.nextBillingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
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
                <a href="sms:+17372280037" className="block text-charcoal-600 hover:text-sunset-600">
                  Text us: (737) 228-0037
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
