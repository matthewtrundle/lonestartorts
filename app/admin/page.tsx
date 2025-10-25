'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogoFull } from '@/components/ui/Logo';

interface WaitlistEntry {
  id: string;
  email: string;
  name?: string;
  zipCode?: string;
  interestCorn: boolean;
  interestButter: boolean;
  interestFlour: boolean;
  interestVariety: boolean;
  expectedQuantity?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  createdAt: string;
  emailLogs: Array<{
    type: string;
    status: string;
    sentAt?: string;
  }>;
}

interface AdminData {
  entries: WaitlistEntry[];
  total: number;
  page: number;
  pages: number;
  stats: {
    total: number;
    products: {
      corn: number;
      butter: number;
      flour: number;
      variety: number;
    };
  };
}

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const fetchData = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        search,
        sortBy,
        sortOrder
      });

      const response = await fetch(`/api/admin/waitlist?${params}`);

      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search, sortBy, sortOrder]);

  const handleExport = async () => {
    try {
      const response = await fetch('/api/admin/export');

      if (!response.ok) {
        throw new Error('Export failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `waitlist-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Export failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    try {
      const response = await fetch(`/api/admin/waitlist?id=${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      await fetchData(); // Refresh data
    } catch (err) {
      alert('Delete failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString() + ' ' +
           new Date(dateString).toLocaleTimeString();
  };

  const getInterestLabels = (entry: WaitlistEntry) => {
    const interests = [];
    if (entry.interestCorn) interests.push('Corn');
    if (entry.interestButter) interests.push('Butter');
    if (entry.interestFlour) interests.push('Flour');
    if (entry.interestVariety) interests.push('Variety');
    return interests.join(', ') || 'None';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <LogoFull className="text-charcoal-950 mx-auto mb-4" />
          <p className="text-charcoal-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-charcoal-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-sunset-500 text-white rounded hover:bg-sunset-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="bg-white border-b border-charcoal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-6">
              <LogoFull className="text-charcoal-950" />
              <nav className="flex gap-4">
                <Link
                  href="/admin"
                  className="text-charcoal-950 font-medium border-b-2 border-sunset-500"
                >
                  Waitlist
                </Link>
                <Link
                  href="/admin/seo"
                  className="text-charcoal-600 hover:text-charcoal-950 transition-colors"
                >
                  SEO Monitor
                </Link>
              </nav>
            </div>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-sunset-500 text-white rounded-lg hover:bg-sunset-600 transition-colors"
            >
              Export CSV
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {data && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-charcoal-600">Total Signups</h3>
              <p className="text-3xl font-bold text-charcoal-950">{data.stats.total}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-charcoal-600">Corn Interest</h3>
              <p className="text-3xl font-bold text-sunset-600">{data.stats.products.corn}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-charcoal-600">Butter Interest</h3>
              <p className="text-3xl font-bold text-sunset-600">{data.stats.products.butter}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-charcoal-600">Flour Interest</h3>
              <p className="text-3xl font-bold text-sunset-600">{data.stats.products.flour}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-charcoal-600">Variety Interest</h3>
              <p className="text-3xl font-bold text-sunset-600">{data.stats.products.variety}</p>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by email, name, or ZIP code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500"
              >
                <option value="createdAt">Date</option>
                <option value="email">Email</option>
                <option value="name">Name</option>
                <option value="zipCode">ZIP Code</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500"
              >
                <option value="desc">Newest</option>
                <option value="asc">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Waitlist Table */}
        {data && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-charcoal-200">
                <thead className="bg-charcoal-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Interests
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-charcoal-200">
                  {data.entries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-charcoal-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-charcoal-900">
                            {entry.email}
                          </div>
                          {entry.name && (
                            <div className="text-sm text-charcoal-500">{entry.name}</div>
                          )}
                          {entry.zipCode && (
                            <div className="text-sm text-charcoal-500">ZIP: {entry.zipCode}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-charcoal-900">
                          {getInterestLabels(entry)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal-900">
                        {entry.expectedQuantity || 'Not specified'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-charcoal-900">
                          {entry.source || 'Direct'}
                          {entry.medium && ` / ${entry.medium}`}
                          {entry.campaign && ` / ${entry.campaign}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal-500">
                        {formatDate(entry.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {data.pages > 1 && (
              <div className="bg-white px-4 py-3 border-t border-charcoal-200 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-charcoal-700">
                    Page {data.page} of {data.pages} ({data.total} total entries)
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={page <= 1}
                      className="px-3 py-1 border border-charcoal-300 rounded text-sm hover:bg-charcoal-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={page >= data.pages}
                      className="px-3 py-1 border border-charcoal-300 rounded text-sm hover:bg-charcoal-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}