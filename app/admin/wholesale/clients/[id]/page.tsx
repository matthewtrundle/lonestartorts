'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Building2, User, Mail, Phone, MapPin, FileText, RefreshCw, Plus, DollarSign } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface Client {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string | null;
  businessType: string;
  stripeCustomerId: string | null;
  pricingTier: string;
  discountPercent: number;
  paymentTerms: string;
  status: string;
  accountNotes: string | null;
  shippingAddress1: string | null;
  shippingAddress2: string | null;
  shippingCity: string | null;
  shippingState: string | null;
  shippingZip: string | null;
  createdAt: string;
}

interface Order {
  id: string;
  orderNumber: string;
  total: number;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
}

interface Subscription {
  id: string;
  name: string;
  interval: string;
  status: string;
  estimatedTotal: number;
  nextBillingDate: string | null;
}

const tierColors: Record<string, string> = {
  STANDARD: 'bg-charcoal-100 text-charcoal-800',
  SILVER: 'bg-slate-200 text-slate-800',
  GOLD: 'bg-amber-100 text-amber-800',
  PLATINUM: 'bg-purple-100 text-purple-800',
  CUSTOM: 'bg-blue-100 text-blue-800',
};

const paymentStatusColors: Record<string, string> = {
  DRAFT: 'bg-charcoal-100 text-charcoal-800',
  PENDING: 'bg-amber-100 text-amber-800',
  PAID: 'bg-green-100 text-green-800',
  OVERDUE: 'bg-red-100 text-red-800',
  VOID: 'bg-charcoal-100 text-charcoal-800',
};

export default function ClientDetailPage() {
  const params = useParams();
  const clientId = params.id as string;

  const [client, setClient] = useState<Client | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'subscriptions' | 'settings'>('orders');

  useEffect(() => {
    fetchClient();
  }, [clientId]);

  const fetchClient = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/wholesale/clients/${clientId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch client');
      }

      const data = await response.json();
      setClient(data.client);
      setOrders(data.orders || []);
      setSubscriptions(data.subscriptions || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load client');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getTierDiscount = (tier: string, customDiscount: number) => {
    const discounts: Record<string, number> = {
      STANDARD: 0,
      SILVER: 5,
      GOLD: 10,
      PLATINUM: 15,
      CUSTOM: customDiscount,
    };
    return discounts[tier] || 0;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunset-600 mx-auto mb-4"></div>
          <p className="text-charcoal-600">Loading client...</p>
        </div>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Client not found'}</p>
          <Link href="/admin/wholesale/clients" className="text-sunset-600 hover:text-sunset-700">
            Back to Clients
          </Link>
        </div>
      </div>
    );
  }

  const totalRevenue = orders.filter(o => o.paymentStatus === 'PAID').reduce((sum, o) => sum + o.total, 0);
  const outstandingAmount = orders.filter(o => ['PENDING', 'OVERDUE'].includes(o.paymentStatus)).reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/wholesale/clients"
            className="p-2 hover:bg-charcoal-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 text-charcoal-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-charcoal-950">{client.businessName}</h1>
            <p className="text-sm text-charcoal-600">{client.businessType} • Client since {formatDate(client.createdAt)}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/admin/wholesale/clients/${clientId}/invoices/new`}
            className="flex items-center gap-2 px-4 py-2 bg-sunset-600 text-white rounded-lg hover:bg-sunset-700 font-medium"
          >
            <FileText className="w-5 h-5" />
            Create Invoice
          </Link>
          <Link
            href={`/admin/wholesale/clients/${clientId}/subscriptions/new`}
            className="flex items-center gap-2 px-4 py-2 bg-charcoal-100 text-charcoal-700 rounded-lg hover:bg-charcoal-200 font-medium"
          >
            <RefreshCw className="w-5 h-5" />
            Create Subscription
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-xs text-charcoal-500 mb-1">Total Revenue</div>
          <div className="text-2xl font-bold text-green-600">{formatPrice(totalRevenue)}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-xs text-charcoal-500 mb-1">Outstanding</div>
          <div className="text-2xl font-bold text-amber-600">{formatPrice(outstandingAmount)}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-xs text-charcoal-500 mb-1">Total Orders</div>
          <div className="text-2xl font-bold text-charcoal-950">{orders.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-xs text-charcoal-500 mb-1">Active Subscriptions</div>
          <div className="text-2xl font-bold text-purple-600">
            {subscriptions.filter(s => s.status === 'ACTIVE').length}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Client Info Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="font-semibold text-charcoal-950 mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-charcoal-400 mt-1" />
                <div>
                  <div className="text-sm text-charcoal-500">Contact</div>
                  <div className="text-charcoal-950">{client.contactName}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-charcoal-400 mt-1" />
                <div>
                  <div className="text-sm text-charcoal-500">Email</div>
                  <a href={`mailto:${client.email}`} className="text-sunset-600 hover:text-sunset-700">
                    {client.email}
                  </a>
                </div>
              </div>
              {client.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-charcoal-400 mt-1" />
                  <div>
                    <div className="text-sm text-charcoal-500">Phone</div>
                    <a href={`tel:${client.phone}`} className="text-sunset-600 hover:text-sunset-700">
                      {client.phone}
                    </a>
                  </div>
                </div>
              )}
              {client.shippingAddress1 && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-charcoal-400 mt-1" />
                  <div>
                    <div className="text-sm text-charcoal-500">Shipping Address</div>
                    <div className="text-charcoal-950">
                      {client.shippingAddress1}
                      {client.shippingAddress2 && <>, {client.shippingAddress2}</>}
                      <br />
                      {client.shippingCity}, {client.shippingState} {client.shippingZip}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pricing Info */}
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="font-semibold text-charcoal-950 mb-4">Pricing & Terms</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-charcoal-500">Tier</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${tierColors[client.pricingTier]}`}>
                  {client.pricingTier}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-charcoal-500">Discount</span>
                <span className="font-medium text-green-600">
                  {getTierDiscount(client.pricingTier, client.discountPercent)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-charcoal-500">Payment Terms</span>
                <span className="font-medium text-charcoal-950">
                  {client.paymentTerms.replace('_', ' ')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-charcoal-500">Status</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  client.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {client.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b border-charcoal-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-6 py-3 text-sm font-medium border-b-2 ${
                    activeTab === 'orders'
                      ? 'border-sunset-600 text-sunset-600'
                      : 'border-transparent text-charcoal-500 hover:text-charcoal-700'
                  }`}
                >
                  Invoices ({orders.length})
                </button>
                <button
                  onClick={() => setActiveTab('subscriptions')}
                  className={`px-6 py-3 text-sm font-medium border-b-2 ${
                    activeTab === 'subscriptions'
                      ? 'border-sunset-600 text-sunset-600'
                      : 'border-transparent text-charcoal-500 hover:text-charcoal-700'
                  }`}
                >
                  Subscriptions ({subscriptions.length})
                </button>
              </nav>
            </div>

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="p-4">
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-charcoal-300 mx-auto mb-4" />
                    <p className="text-charcoal-600 mb-4">No invoices yet</p>
                    <Link
                      href={`/admin/wholesale/clients/${clientId}/invoices/new`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-sunset-600 text-white rounded-lg hover:bg-sunset-700 font-medium"
                    >
                      <Plus className="w-5 h-5" />
                      Create First Invoice
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <Link
                        key={order.id}
                        href={`/admin/wholesale/invoices/${order.id}`}
                        className="flex items-center justify-between p-4 border border-charcoal-200 rounded-lg hover:bg-charcoal-50"
                      >
                        <div>
                          <div className="font-medium text-charcoal-950">{order.orderNumber}</div>
                          <div className="text-sm text-charcoal-500">{formatDate(order.createdAt)}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-charcoal-950">{formatPrice(order.total)}</div>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${paymentStatusColors[order.paymentStatus]}`}>
                            {order.paymentStatus}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Subscriptions Tab */}
            {activeTab === 'subscriptions' && (
              <div className="p-4">
                {subscriptions.length === 0 ? (
                  <div className="text-center py-8">
                    <RefreshCw className="w-12 h-12 text-charcoal-300 mx-auto mb-4" />
                    <p className="text-charcoal-600 mb-4">No subscriptions yet</p>
                    <Link
                      href={`/admin/wholesale/clients/${clientId}/subscriptions/new`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-sunset-600 text-white rounded-lg hover:bg-sunset-700 font-medium"
                    >
                      <Plus className="w-5 h-5" />
                      Create Subscription
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {subscriptions.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/admin/wholesale/subscriptions/${sub.id}`}
                        className="flex items-center justify-between p-4 border border-charcoal-200 rounded-lg hover:bg-charcoal-50"
                      >
                        <div>
                          <div className="font-medium text-charcoal-950">{sub.name}</div>
                          <div className="text-sm text-charcoal-500">
                            {sub.interval} • Next: {sub.nextBillingDate ? formatDate(sub.nextBillingDate) : 'N/A'}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-charcoal-950">{formatPrice(sub.estimatedTotal)}</div>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            sub.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                            sub.status === 'PAUSED' ? 'bg-amber-100 text-amber-800' :
                            'bg-charcoal-100 text-charcoal-800'
                          }`}>
                            {sub.status}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
