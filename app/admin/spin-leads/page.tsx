'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, Mail, Gift, Truck, Percent, Download, Users, TrendingUp, CheckCircle } from 'lucide-react';

interface SpinEntry {
  id: string;
  email: string;
  prize: string;
  code: string;
  used: boolean;
  usedAt: string | null;
  utmSource: string;
  createdAt: string;
  expiresAt: string;
}

interface Stats {
  total: number;
  used: number;
  conversionRate: string;
  byPrize: {
    five_off: number;
    free_shipping: number;
    bonus_tortillas: number;
    free_sauce: number;
    ten_percent: number;
  };
  bySource: {
    tiktok: number;
    other: number;
  };
}

interface Pagination {
  page: number;
  perPage: number;
  total: number;
  pages: number;
}

const PRIZE_LABELS: Record<string, { label: string; icon: typeof Gift; color: string }> = {
  five_off: { label: '$5 Off', icon: Gift, color: 'bg-orange-100 text-orange-700' },
  free_shipping: { label: 'Free Shipping', icon: Truck, color: 'bg-green-100 text-green-700' },
  bonus_tortillas: { label: '+10 Tortillas', icon: Gift, color: 'bg-purple-100 text-purple-700' },
  free_sauce: { label: 'Free Sauce', icon: Gift, color: 'bg-teal-100 text-teal-700' },
  ten_percent: { label: '10% Off', icon: Percent, color: 'bg-amber-100 text-amber-700' },
};

export default function SpinLeadsPage() {
  const searchParams = useSearchParams();
  const [entries, setEntries] = useState<SpinEntry[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams?.get('search') || '');
  const [prizeFilter, setPrizeFilter] = useState(searchParams?.get('prize') || 'all');
  const [usedFilter, setUsedFilter] = useState(searchParams?.get('used') || 'all');
  const [page, setPage] = useState(parseInt(searchParams?.get('page') || '1'));
  const [pagination, setPagination] = useState<Pagination>({ page: 1, perPage: 20, total: 0, pages: 1 });
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, [search, prizeFilter, usedFilter, page]);

  const fetchEntries = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        search,
        ...(prizeFilter !== 'all' && { prize: prizeFilter }),
        ...(usedFilter !== 'all' && { used: usedFilter }),
      });

      const response = await fetch(`/api/admin/spin-leads?${params}`);
      if (!response.ok) throw new Error('Failed to fetch spin leads');

      const data = await response.json();
      setEntries(data.entries);
      setStats(data.stats);
      setPagination(data.pagination);
    } catch (err) {
      console.error('Error fetching spin leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const response = await fetch('/api/admin/spin-leads', { method: 'POST' });
      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `spin-leads-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setExporting(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePrizeChange = (value: string) => {
    setPrizeFilter(value);
    setPage(1);
  };

  const handleUsedChange = (value: string) => {
    setUsedFilter(value);
    setPage(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getPrizeInfo = (prize: string) => {
    return PRIZE_LABELS[prize] || { label: prize, icon: Gift, color: 'bg-gray-100 text-gray-700' };
  };

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-950 mb-2">Spin Wheel Leads</h1>
          <p className="text-charcoal-600">Email leads captured from the spin-the-wheel promotion</p>
        </div>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center gap-2 px-4 py-2 bg-sunset-500 text-white rounded-lg hover:bg-sunset-600 transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {exporting ? 'Exporting...' : 'Export CSV'}
        </button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-charcoal-500">Total Emails</p>
                <p className="text-2xl font-bold text-charcoal-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-charcoal-500">Prizes Used</p>
                <p className="text-2xl font-bold text-charcoal-900">{stats.used}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-charcoal-500">Conversion Rate</p>
                <p className="text-2xl font-bold text-charcoal-900">{stats.conversionRate}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <p className="text-sm text-charcoal-500">TikTok Leads</p>
                <p className="text-2xl font-bold text-charcoal-900">{stats.bySource.tiktok}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prize Distribution */}
      {stats && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-charcoal-900 mb-4">Prize Distribution</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(stats.byPrize).map(([prize, count]) => {
              const info = getPrizeInfo(prize);
              const percentage = stats.total > 0 ? ((count / stats.total) * 100).toFixed(0) : 0;
              return (
                <div key={prize} className={`${info.color} rounded-lg p-4 text-center`}>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-sm font-medium">{info.label}</p>
                  <p className="text-xs opacity-75">{percentage}%</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-charcoal-400" />
            <input
              type="text"
              placeholder="Search by email or code..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
            />
          </div>

          {/* Prize Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-charcoal-400" />
            <select
              value={prizeFilter}
              onChange={(e) => handlePrizeChange(e.target.value)}
              className="px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
            >
              <option value="all">All Prizes</option>
              <option value="five_off">$5 Off</option>
              <option value="free_shipping">Free Shipping</option>
              <option value="bonus_tortillas">+10 Tortillas</option>
              <option value="free_sauce">Free Sauce</option>
              <option value="ten_percent">10% Off</option>
            </select>
          </div>

          {/* Used Filter */}
          <select
            value={usedFilter}
            onChange={(e) => handleUsedChange(e.target.value)}
            className="px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="true">Used</option>
            <option value="false">Unused</option>
          </select>
        </div>
      </div>

      {/* Entries Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunset-600 mx-auto"></div>
            <p className="text-charcoal-600 mt-4">Loading spin leads...</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="p-12 text-center">
            <Mail className="w-12 h-12 text-charcoal-300 mx-auto mb-4" />
            <p className="text-charcoal-600">No spin leads found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-charcoal-200">
                <thead className="bg-charcoal-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Prize
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Source
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-charcoal-200">
                  {entries.map((entry) => {
                    const prizeInfo = getPrizeInfo(entry.prize);
                    const expired = isExpired(entry.expiresAt);
                    return (
                      <tr key={entry.id} className={entry.used ? 'bg-green-50' : expired ? 'bg-gray-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal-500">
                          {formatDate(entry.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-charcoal-900">{entry.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${prizeInfo.color}`}>
                            {prizeInfo.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <code className="text-xs font-mono bg-charcoal-100 px-2 py-1 rounded">
                            {entry.code}
                          </code>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {entry.used ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              Used
                            </span>
                          ) : expired ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                              Expired
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal-500">
                          {entry.utmSource === 'tiktok' ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-pink-100 text-pink-700">
                              TikTok
                            </span>
                          ) : (
                            entry.utmSource
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="bg-white px-6 py-4 border-t border-charcoal-200 flex items-center justify-between">
                <div className="text-sm text-charcoal-700">
                  Showing {(pagination.page - 1) * pagination.perPage + 1} to{' '}
                  {Math.min(pagination.page * pagination.perPage, pagination.total)} of{' '}
                  {pagination.total} leads
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
