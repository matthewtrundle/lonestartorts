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
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-charcoal-950 mb-2">Dashboard</h1>
        <p className="text-charcoal-600">Overview of your store performance</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Today's Revenue"
          value={stats.metrics.todayRevenue.formatted}
          icon={<DollarSign className="w-6 h-6" />}
        />
        <MetricCard
          title="Pending Orders"
          value={stats.metrics.pendingOrders.value}
          subtitle="Need attention"
          icon={<Package className="w-6 h-6" />}
        />
        <MetricCard
          title="Orders to Ship"
          value={stats.metrics.ordersToShip.value}
          subtitle="Ready for fulfillment"
          icon={<Truck className="w-6 h-6" />}
        />
        <MetricCard
          title="Total Orders (30d)"
          value={stats.metrics.totalOrders.value}
          trend={stats.metrics.totalOrders.trend}
          icon={<ShoppingCart className="w-6 h-6" />}
        />
        <MetricCard
          title="Avg Order Value"
          value={stats.metrics.avgOrderValue.formatted}
          icon={<TrendingUp className="w-6 h-6" />}
        />
        {stats.metrics.topProduct && (
          <MetricCard
            title="Top Product"
            value={stats.metrics.topProduct.name}
            subtitle={`${stats.metrics.topProduct.count} sold`}
            icon={<Award className="w-6 h-6" />}
          />
        )}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-charcoal-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-charcoal-950">Recent Orders</h2>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-charcoal-200">
              {stats.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-charcoal-500">
                    No orders yet
                  </td>
                </tr>
              ) : (
                stats.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-charcoal-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/admin/orders/${order.orderNumber}`}
                        className="text-sm font-medium text-sunset-600 hover:text-sunset-700"
                      >
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-charcoal-900">{order.customerName}</div>
                      <div className="text-xs text-charcoal-500">{order.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal-900">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={order.status as any} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal-500">
                      {formatRelativeTime(order.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/orders?status=PENDING"
          className="block p-6 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
        >
          <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Process New Orders</h3>
          <p className="text-sm text-charcoal-600">
            Review and process {stats.metrics.pendingOrders.value} pending orders
          </p>
        </Link>
        <Link
          href="/admin/orders?status=PROCESSING"
          className="block p-6 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <h3 className="text-lg font-semibold text-charcoal-950 mb-2">Ship Orders</h3>
          <p className="text-sm text-charcoal-600">
            Add tracking for {stats.metrics.ordersToShip.value} orders ready to ship
          </p>
        </Link>
      </div>
    </div>
  );
}
