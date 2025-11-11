'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { formatPrice } from '@/lib/utils';
import { Search, Filter, Download } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  items: any[];
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams?.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams?.get('status') || 'all');
  const [page, setPage] = useState(parseInt(searchParams?.get('page') || '1'));
  const [pagination, setPagination] = useState({ page: 1, perPage: 20, total: 0, pages: 1 });

  useEffect(() => {
    fetchOrders();
  }, [search, statusFilter, page]);

  const fetchOrders = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        search,
        ...(statusFilter !== 'all' && { status: statusFilter }),
      });

      const response = await fetch(`/api/admin/orders?${params}`);
      if (!response.ok) throw new Error('Failed to fetch orders');

      const data = await response.json();
      setOrders(data.orders);
      setPagination(data.pagination);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getItemsSummary = (items: any[]) => {
    const productItems = items.filter((item) => item.sku !== 'SHIPPING');
    const totalQty = productItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
    return `${totalQty} item${totalQty !== 1 ? 's' : ''}`;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-950 mb-2">Orders</h1>
          <p className="text-charcoal-600">Manage and fulfill customer orders</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-charcoal-400" />
            <input
              type="text"
              placeholder="Search by order #, customer name, or email..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-charcoal-400" />
            <select
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
            >
              <option value="all">All Orders</option>
              <option value="PENDING">Pending</option>
              <option value="PROCESSING">Processing</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunset-600 mx-auto"></div>
            <p className="text-charcoal-600 mt-4">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-charcoal-600">No orders found</p>
          </div>
        ) : (
          <>
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
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-charcoal-200">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-charcoal-50 cursor-pointer"
                      onClick={() => router.push(`/admin/orders/${order.orderNumber}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-sunset-600">
                          {order.orderNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-charcoal-900">{order.customerName}</div>
                        <div className="text-xs text-charcoal-500">{order.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal-600">
                        {getItemsSummary(order.items)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-charcoal-900">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={order.paymentStatus as any} type="payment" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={order.status as any} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal-500">
                        {formatRelativeTime(order.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="bg-white px-6 py-4 border-t border-charcoal-200 flex items-center justify-between">
                <div className="text-sm text-charcoal-700">
                  Showing {(pagination.page - 1) * pagination.perPage + 1} to{' '}
                  {Math.min(pagination.page * pagination.perPage, pagination.total)} of{' '}
                  {pagination.total} orders
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1}
                    className="px-4 py-2 border border-charcoal-300 rounded-lg text-sm hover:bg-charcoal-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= pagination.pages}
                    className="px-4 py-2 border border-charcoal-300 rounded-lg text-sm hover:bg-charcoal-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
