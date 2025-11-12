'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MetricCard } from '@/components/admin/MetricCard';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { DollarSign, Package, Truck, ShoppingCart, TrendingUp, Award } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface DashboardStats {
  metrics: {
    todayRevenue: { value: number; formatted: string };
    pendingOrders: { value: number };
    ordersToShip: { value: number };
    totalOrders: {
      value: number;
      trend: { value: number; direction: 'up' | 'down' | 'neutral' };
    };
    avgOrderValue: { value: number; formatted: string };
    topProduct: { name: string; count: number } | null;
  };
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    customerName: string;
    email: string;
    total: number;
    status: string;
    paymentStatus: string;
    createdAt: string;
  }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');

      if (!response.ok) {
        throw new Error('Failed to fetch statistics');
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
          <p className="text-charcoal-600">Loading dashboard...</p>
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
    <div className="space-y-4">
      {/* Compact Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-charcoal-950">Dashboard</h1>
        <div className="flex gap-2">
          <Link
            href="/admin/orders?status=PROCESSING"
            className="px-4 py-2 bg-sunset-600 text-white text-sm font-medium rounded-lg hover:bg-sunset-700"
          >
            Ship Orders ({stats.metrics.ordersToShip.value})
          </Link>
        </div>
      </div>

      {/* Compact Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white rounded-lg shadow px-4 py-3">
          <div className="text-xs text-charcoal-600 mb-1">Today</div>
          <div className="text-xl font-bold text-charcoal-950">{stats.metrics.todayRevenue.formatted}</div>
        </div>
        <div className="bg-white rounded-lg shadow px-4 py-3">
          <div className="text-xs text-charcoal-600 mb-1">Pending</div>
          <div className="text-xl font-bold text-amber-600">{stats.metrics.pendingOrders.value}</div>
        </div>
        <div className="bg-white rounded-lg shadow px-4 py-3">
          <div className="text-xs text-charcoal-600 mb-1">To Ship</div>
          <div className="text-xl font-bold text-blue-600">{stats.metrics.ordersToShip.value}</div>
        </div>
        <div className="bg-white rounded-lg shadow px-4 py-3">
          <div className="text-xs text-charcoal-600 mb-1">Total (30d)</div>
          <div className="text-xl font-bold text-charcoal-950">{stats.metrics.totalOrders.value}</div>
        </div>
        <div className="bg-white rounded-lg shadow px-4 py-3">
          <div className="text-xs text-charcoal-600 mb-1">Avg Value</div>
          <div className="text-xl font-bold text-green-600">{stats.metrics.avgOrderValue.formatted}</div>
        </div>
        {stats.metrics.topProduct && (
          <div className="bg-white rounded-lg shadow px-4 py-3">
            <div className="text-xs text-charcoal-600 mb-1">Top Product</div>
            <div className="text-sm font-bold text-charcoal-950 truncate">{stats.metrics.topProduct.name}</div>
            <div className="text-xs text-charcoal-500">{stats.metrics.topProduct.count} sold</div>
          </div>
        )}
      </div>

      {/* Compact Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-3 border-b border-charcoal-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-charcoal-950">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-sm text-sunset-600 hover:text-sunset-700 font-medium"
          >
            View All →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-charcoal-200">
            <thead className="bg-charcoal-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-charcoal-500 uppercase">
                  Order
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-charcoal-500 uppercase">
                  Customer
                </th>
                <th className="px-4 py-2 text-right text-xs font-medium text-charcoal-500 uppercase">
                  Total
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-charcoal-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-2 text-right text-xs font-medium text-charcoal-500 uppercase">
                  Time
                </th>
                <th className="px-4 py-2 text-right text-xs font-medium text-charcoal-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-charcoal-200">
              {stats.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-charcoal-500 text-sm">
                    No orders yet
                  </td>
                </tr>
              ) : (
                stats.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-charcoal-50">
                    <td className="px-4 py-2.5 whitespace-nowrap">
                      <Link
                        href={`/admin/orders/${order.orderNumber}`}
                        className="text-sm font-medium text-sunset-600 hover:text-sunset-700"
                      >
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-2.5 whitespace-nowrap">
                      <div className="text-sm text-charcoal-900">{order.customerName}</div>
                      <div className="text-xs text-charcoal-500 truncate max-w-[150px]">{order.email}</div>
                    </td>
                    <td className="px-4 py-2.5 whitespace-nowrap text-sm text-right font-medium text-charcoal-900">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-4 py-2.5 whitespace-nowrap">
                      <StatusBadge status={order.status as any} />
                    </td>
                    <td className="px-4 py-2.5 whitespace-nowrap text-sm text-right text-charcoal-500">
                      {formatRelativeTime(order.createdAt)}
                    </td>
                    <td className="px-4 py-2.5 whitespace-nowrap text-right">
                      {order.status === 'PROCESSING' ? (
                        <Link
                          href={`/admin/orders/${order.orderNumber}`}
                          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                        >
                          <Truck className="w-3 h-3" />
                          Ship
                        </Link>
                      ) : (
                        <Link
                          href={`/admin/orders/${order.orderNumber}`}
                          className="text-sm text-charcoal-500 hover:text-sunset-600"
                        >
                          View →
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
