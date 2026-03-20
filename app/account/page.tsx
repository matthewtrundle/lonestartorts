'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Package, CreditCard, LogOut, Clock, ExternalLink, ShoppingBag } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import AccountTabs from '@/components/account/AccountTabs';
import PersonalTab from '@/components/account/PersonalTab';
import WholesaleTab from '@/components/account/WholesaleTab';

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
  dueDate?: string | null;
  stripeInvoiceUrl?: string | null;
  items: WholesaleOrderItem[];
}

interface WholesaleData {
  businessName: string;
  pricingTier: string;
  paymentTerms: string;
  status: string;
  termsProgress?: any;
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

export default function AccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'wholesale'>(
    searchParams.get('tab') === 'wholesale' ? 'wholesale' : 'personal'
  );
  const { showToast } = useToast();

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
      showToast('Failed to open subscription management. Please try again.');
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

  const activeSubscriptions = customer.subscriptions.filter(s => s.status !== 'CANCELLED');

  return (
    <div className="bg-cream-50 min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
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

        {/* Tab Toggle */}
        <AccountTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isWholesale={!!customer.isWholesale}
        />

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2">
            {activeTab === 'personal' ? (
              <PersonalTab
                subscriptions={customer.subscriptions}
                recentOrders={customer.recentOrders}
                loyalty={customer.loyalty}
                stripeCustomerId={customer.stripeCustomerId}
                onManageSubscription={handleManageSubscription}
                portalLoading={portalLoading}
                onRefresh={fetchCustomer}
              />
            ) : customer.wholesale ? (
              <WholesaleTab wholesale={customer.wholesale} />
            ) : null}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 order-first md:order-none">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-bold text-charcoal-950 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {activeTab === 'personal' ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <Link
                      href="/wholesale"
                      className="w-full flex items-center gap-3 px-4 py-3 bg-sunset-50 rounded-lg hover:bg-sunset-100 border border-sunset-200"
                    >
                      <ShoppingBag className="w-5 h-5 text-sunset-600" />
                      <div>
                        <p className="font-medium text-charcoal-950 text-sm">Place Wholesale Order</p>
                        <p className="text-xs text-charcoal-500">Build your next order</p>
                      </div>
                    </Link>
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
                  </>
                )}
              </div>
            </div>

            {/* Help */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-bold text-charcoal-950 mb-3">Need Help?</h2>
              <div className="space-y-2 text-sm">
                <a href="tel:+15128946823" className="block text-charcoal-600 hover:text-sunset-600">
                  (512) 894-6823
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
