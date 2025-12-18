'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, FileText, Clock, DollarSign, RefreshCw, AlertCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface WholesaleStats {
  activeClients: number;
  pendingInquiries: number;
  monthlyRevenue: number;
  outstandingAmount: number;
  activeSubscriptions: number;
  recentInquiries: Array<{
    id: string;
    businessName: string;
    contactName: string;
    email: string;
    businessType: string;
    estimatedVolume: string;
    createdAt: string;
    status: string;
  }>;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    clientName: string;
    total: number;
    paymentStatus: string;
    createdAt: string;
  }>;
}

export default function WholesaleDashboardPage() {
  const [stats, setStats] = useState<WholesaleStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/wholesale/stats');

      if (!response.ok) {
        throw new Error('Failed to fetch wholesale stats');
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunset-600 mx-auto mb-4"></div>
          <p className="text-charcoal-600">Loading wholesale dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Failed to load dashboard'}</p>
          <button
            onClick={fetchStats}
            className="px-4 py-2 bg-sunset-500 text-white rounded-lg hover:bg-sunset-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-charcoal-950">Wholesale</h1>
          <p className="text-sm text-charcoal-600">Manage wholesale clients, invoices, and subscriptions</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/wholesale/clients/new"
            className="px-4 py-2 bg-charcoal-100 text-charcoal-700 text-sm font-medium rounded-lg hover:bg-charcoal-200"
          >
            Add Client
          </Link>
          {stats.pendingInquiries > 0 && (
            <Link
              href="/admin/wholesale/inquiries"
              className="px-4 py-2 bg-sunset-600 text-white text-sm font-medium rounded-lg hover:bg-sunset-700 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              Review Inquiries ({stats.pendingInquiries})
            </Link>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-xs text-charcoal-600">Active Clients</div>
              <div className="text-2xl font-bold text-charcoal-950">{stats.activeClients}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-xs text-charcoal-600">Pending Inquiries</div>
              <div className="text-2xl font-bold text-amber-600">{stats.pendingInquiries}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-xs text-charcoal-600">Monthly Revenue</div>
              <div className="text-2xl font-bold text-green-600">{formatPrice(stats.monthlyRevenue)}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <FileText className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className="text-xs text-charcoal-600">Outstanding</div>
              <div className="text-2xl font-bold text-red-600">{formatPrice(stats.outstandingAmount)}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <RefreshCw className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-xs text-charcoal-600">Subscriptions</div>
              <div className="text-2xl font-bold text-purple-600">{stats.activeSubscriptions}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/admin/wholesale/inquiries"
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-charcoal-950 mb-1">Inquiries</h3>
          <p className="text-sm text-charcoal-600">Review and approve new wholesale requests</p>
        </Link>
        <Link
          href="/admin/wholesale/clients"
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-charcoal-950 mb-1">Clients</h3>
          <p className="text-sm text-charcoal-600">Manage wholesale accounts</p>
        </Link>
        <Link
          href="/admin/wholesale/invoices"
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-charcoal-950 mb-1">Invoices</h3>
          <p className="text-sm text-charcoal-600">View and manage invoices</p>
        </Link>
        <Link
          href="/admin/wholesale/subscriptions"
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-charcoal-950 mb-1">Subscriptions</h3>
          <p className="text-sm text-charcoal-600">Manage recurring orders</p>
        </Link>
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pending Inquiries */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-3 border-b border-charcoal-200 flex justify-between items-center">
            <h2 className="font-semibold text-charcoal-950">Recent Inquiries</h2>
            <Link
              href="/admin/wholesale/inquiries"
              className="text-sm text-sunset-600 hover:text-sunset-700 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="divide-y divide-charcoal-100">
            {stats.recentInquiries.length === 0 ? (
              <div className="px-4 py-6 text-center text-charcoal-500 text-sm">
                No pending inquiries
              </div>
            ) : (
              stats.recentInquiries.map((inquiry) => (
                <Link
                  key={inquiry.id}
                  href={`/admin/wholesale/inquiries/${inquiry.id}`}
                  className="block px-4 py-3 hover:bg-charcoal-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-charcoal-950">{inquiry.businessName}</div>
                      <div className="text-sm text-charcoal-600">{inquiry.contactName}</div>
                      <div className="text-xs text-charcoal-500">{inquiry.businessType} • {inquiry.estimatedVolume}</div>
                    </div>
                    <div className="text-xs text-charcoal-500">
                      {formatRelativeTime(inquiry.createdAt)}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-3 border-b border-charcoal-200 flex justify-between items-center">
            <h2 className="font-semibold text-charcoal-950">Recent Invoices</h2>
            <Link
              href="/admin/wholesale/invoices"
              className="text-sm text-sunset-600 hover:text-sunset-700 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="divide-y divide-charcoal-100">
            {stats.recentOrders.length === 0 ? (
              <div className="px-4 py-6 text-center text-charcoal-500 text-sm">
                No invoices yet
              </div>
            ) : (
              stats.recentOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/admin/wholesale/invoices/${order.id}`}
                  className="block px-4 py-3 hover:bg-charcoal-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-charcoal-950">{order.orderNumber}</div>
                      <div className="text-sm text-charcoal-600">{order.clientName}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-charcoal-950">{formatPrice(order.total)}</div>
                      <div className={`text-xs ${
                        order.paymentStatus === 'PAID' ? 'text-green-600' :
                        order.paymentStatus === 'OVERDUE' ? 'text-red-600' :
                        'text-amber-600'
                      }`}>
                        {order.paymentStatus}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
