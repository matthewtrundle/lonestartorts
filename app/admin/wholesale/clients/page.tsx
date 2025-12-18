'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Plus, Building2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface Client {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string | null;
  businessType: string;
  pricingTier: string;
  paymentTerms: string;
  status: string;
  createdAt: string;
  _count: {
    orders: number;
    subscriptions: number;
  };
  totalRevenue: number;
}

const tierColors: Record<string, string> = {
  STANDARD: 'bg-charcoal-100 text-charcoal-800',
  SILVER: 'bg-slate-200 text-slate-800',
  GOLD: 'bg-amber-100 text-amber-800',
  PLATINUM: 'bg-purple-100 text-purple-800',
  CUSTOM: 'bg-blue-100 text-blue-800',
};

const statusColors: Record<string, string> = {
  ACTIVE: 'bg-green-100 text-green-800',
  SUSPENDED: 'bg-red-100 text-red-800',
  INACTIVE: 'bg-charcoal-100 text-charcoal-800',
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [tierFilter, setTierFilter] = useState('');

  useEffect(() => {
    fetchClients();
  }, [statusFilter, tierFilter]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      if (tierFilter) params.set('pricingTier', tierFilter);

      const response = await fetch(`/api/admin/wholesale/clients?${params}`);

      if (!response.ok) {
        throw new Error('Failed to fetch clients');
      }

      const data = await response.json();
      setClients(data.clients || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter(client => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      client.businessName.toLowerCase().includes(query) ||
      client.contactName.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunset-600 mx-auto mb-4"></div>
          <p className="text-charcoal-600">Loading clients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-charcoal-950">Wholesale Clients</h1>
          <p className="text-sm text-charcoal-600">Manage wholesale accounts and pricing</p>
        </div>
        <Link
          href="/admin/wholesale/clients/new"
          className="flex items-center gap-2 px-4 py-2 bg-sunset-600 text-white rounded-lg hover:bg-sunset-700 font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Client
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
        >
          <option value="">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="SUSPENDED">Suspended</option>
          <option value="INACTIVE">Inactive</option>
        </select>

        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
          className="px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
        >
          <option value="">All Tiers</option>
          <option value="STANDARD">Standard</option>
          <option value="SILVER">Silver</option>
          <option value="GOLD">Gold</option>
          <option value="PLATINUM">Platinum</option>
          <option value="CUSTOM">Custom</option>
        </select>
      </div>

      {/* Results Count */}
      <div className="text-sm text-charcoal-600">
        Showing {filteredClients.length} {filteredClients.length === 1 ? 'client' : 'clients'}
      </div>

      {/* Clients Grid */}
      {error ? (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <Building2 className="w-12 h-12 text-charcoal-300 mx-auto mb-4" />
          <p className="text-charcoal-600 mb-4">No clients found</p>
          <Link
            href="/admin/wholesale/clients/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-sunset-600 text-white rounded-lg hover:bg-sunset-700 font-medium"
          >
            <Plus className="w-5 h-5" />
            Add Client
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredClients.map((client) => (
            <Link
              key={client.id}
              href={`/admin/wholesale/clients/${client.id}`}
              className="bg-white rounded-lg shadow p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-charcoal-950">{client.businessName}</h3>
                  <p className="text-sm text-charcoal-600">{client.contactName}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[client.status]}`}>
                  {client.status}
                </span>
              </div>

              <div className="text-sm text-charcoal-500 mb-3">
                {client.email}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${tierColors[client.pricingTier]}`}>
                  {client.pricingTier}
                </span>
                <span className="text-xs text-charcoal-500">
                  {client.paymentTerms.replace('_', ' ')}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-charcoal-100">
                <div>
                  <div className="text-xs text-charcoal-500">Orders</div>
                  <div className="font-semibold text-charcoal-950">{client._count.orders}</div>
                </div>
                <div>
                  <div className="text-xs text-charcoal-500">Subscriptions</div>
                  <div className="font-semibold text-charcoal-950">{client._count.subscriptions}</div>
                </div>
                <div>
                  <div className="text-xs text-charcoal-500">Revenue</div>
                  <div className="font-semibold text-green-600">{formatPrice(client.totalRevenue)}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
