'use client';

import { useEffect, useState } from 'react';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { formatPrice } from '@/lib/utils';
import { Search, Package, Calendar, Users } from 'lucide-react';

interface SubscriptionItem {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

interface Subscription {
  id: string;
  name: string;
  status: string;
  interval: string;
  intervalCount: number;
  nextBillingDate: string | null;
  preferredShippingDay: string | null;
  items: SubscriptionItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  createdAt: string;
  customer: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
}

const shippingDayLabels: Record<string, string> = {
  '1st_tuesday': '1st Tuesday',
  '2nd_tuesday': '2nd Tuesday',
  '3rd_tuesday': '3rd Tuesday',
  '4th_tuesday': '4th Tuesday',
};

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, perPage: 20, total: 0, pages: 1 });

  useEffect(() => {
    fetchSubscriptions();
  }, [search, statusFilter, page]);

  const fetchSubscriptions = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        search,
        ...(statusFilter !== 'all' && { status: statusFilter }),
      });

      const response = await fetch(`/api/admin/subscriptions?${params}`);
      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      setSubscriptions(data.subscriptions);
      setPagination(data.pagination);
    } catch (err) {
      console.error('Error fetching subscriptions:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatInterval = (interval: string, count: number) => {
    if (interval === 'BIWEEKLY') return 'Every 2 weeks';
    if (interval === 'WEEKLY') return 'Weekly';
    if (interval === 'QUARTERLY') return 'Every 3 months';
    if (interval === 'MONTHLY' && count === 1) return 'Monthly';
    return `Every ${count} ${interval.toLowerCase()}s`;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getItemsSummary = (items: SubscriptionItem[]) => {
    if (!Array.isArray(items)) return '—';
    return items.map(i => `${i.quantity}x ${i.name}`).join(', ');
  };

  // Stats
  const activeCount = subscriptions.filter(s => s.status === 'ACTIVE').length;
  const pausedCount = subscriptions.filter(s => s.status === 'PAUSED').length;
  const totalMRR = subscriptions
    .filter(s => s.status === 'ACTIVE')
    .reduce((sum, s) => sum + s.total, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-charcoal-950">Subscriptions</h1>
          <p className="text-sm text-charcoal-600 mt-1">Manage retail subscription orders</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-soft p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-charcoal-950">{pagination.total}</p>
              <p className="text-xs text-charcoal-500">Total Subscriptions</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-soft p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-charcoal-950">{activeCount}</p>
              <p className="text-xs text-charcoal-500">Active</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-soft p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-charcoal-950">{pausedCount}</p>
              <p className="text-xs text-charcoal-500">Paused</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-soft p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sunset-100 flex items-center justify-center">
              <Package className="w-5 h-5 text-sunset-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-charcoal-950">{formatPrice(totalMRR)}</p>
              <p className="text-xs text-charcoal-500">Active Revenue / Cycle</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-soft p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
            <input
              type="text"
              placeholder="Search by customer name or email..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2 border border-charcoal-200 rounded-lg text-sm focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-4 py-2 border border-charcoal-200 rounded-lg text-sm bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="PAUSED">Paused</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="PAST_DUE">Past Due</option>
          </select>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sunset-600"></div>
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-charcoal-300 mx-auto mb-3" />
            <p className="text-charcoal-500">No subscriptions found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-charcoal-50 border-b border-charcoal-200">
                  <th className="text-left px-4 py-3 font-semibold text-charcoal-700">Customer</th>
                  <th className="text-left px-4 py-3 font-semibold text-charcoal-700">Plan</th>
                  <th className="text-left px-4 py-3 font-semibold text-charcoal-700">Items</th>
                  <th className="text-left px-4 py-3 font-semibold text-charcoal-700">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-charcoal-700">Ship Day</th>
                  <th className="text-left px-4 py-3 font-semibold text-charcoal-700">Next Billing</th>
                  <th className="text-right px-4 py-3 font-semibold text-charcoal-700">Total</th>
                  <th className="text-left px-4 py-3 font-semibold text-charcoal-700">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-100">
                {subscriptions.map(sub => (
                  <tr key={sub.id} className="hover:bg-cream-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-charcoal-950">
                        {sub.customer.firstName || ''} {sub.customer.lastName || ''}
                      </p>
                      <p className="text-xs text-charcoal-500">{sub.customer.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-charcoal-950">{sub.name}</p>
                      <p className="text-xs text-charcoal-500">{formatInterval(sub.interval, sub.intervalCount)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-charcoal-700 text-xs max-w-[200px] truncate" title={getItemsSummary(sub.items)}>
                        {getItemsSummary(sub.items)}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={sub.status} />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-charcoal-700 text-xs">
                        {sub.preferredShippingDay ? shippingDayLabels[sub.preferredShippingDay] || sub.preferredShippingDay : '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-charcoal-700">
                      {formatDate(sub.nextBillingDate)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-charcoal-950">
                      {formatPrice(sub.total)}
                    </td>
                    <td className="px-4 py-3 text-charcoal-500">
                      {formatDate(sub.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-charcoal-200">
            <p className="text-sm text-charcoal-500">
              Showing {((page - 1) * pagination.perPage) + 1}–{Math.min(page * pagination.perPage, pagination.total)} of {pagination.total}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 border border-charcoal-200 rounded text-sm disabled:opacity-50 hover:bg-charcoal-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                disabled={page === pagination.pages}
                className="px-3 py-1.5 border border-charcoal-200 rounded text-sm disabled:opacity-50 hover:bg-charcoal-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
