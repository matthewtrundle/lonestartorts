'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, CheckCircle, XCircle, AlertCircle, Search } from 'lucide-react';

interface Inquiry {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string | null;
  businessType: string;
  estimatedVolume: string;
  message: string | null;
  status: string;
  createdAt: string;
  reviewedAt: string | null;
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-800',
  UNDER_REVIEW: 'bg-blue-100 text-blue-800',
  APPROVED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
  NEEDS_INFO: 'bg-purple-100 text-purple-800',
};

const statusIcons: Record<string, React.ReactNode> = {
  PENDING: <Clock className="w-4 h-4" />,
  UNDER_REVIEW: <AlertCircle className="w-4 h-4" />,
  APPROVED: <CheckCircle className="w-4 h-4" />,
  REJECTED: <XCircle className="w-4 h-4" />,
  NEEDS_INFO: <AlertCircle className="w-4 h-4" />,
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);

      const response = await fetch(`/api/admin/wholesale/inquiries?${params}`);

      if (!response.ok) {
        throw new Error('Failed to fetch inquiries');
      }

      const data = await response.json();
      setInquiries(data.inquiries || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      inquiry.businessName.toLowerCase().includes(query) ||
      inquiry.contactName.toLowerCase().includes(query) ||
      inquiry.email.toLowerCase().includes(query)
    );
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunset-600 mx-auto mb-4"></div>
          <p className="text-charcoal-600">Loading inquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-charcoal-950">Wholesale Inquiries</h1>
          <p className="text-sm text-charcoal-600">Review and approve wholesale requests</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
          <input
            type="text"
            placeholder="Search businesses..."
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
          <option value="PENDING">Pending</option>
          <option value="UNDER_REVIEW">Under Review</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="NEEDS_INFO">Needs Info</option>
        </select>
      </div>

      {/* Results Count */}
      <div className="text-sm text-charcoal-600">
        Showing {filteredInquiries.length} {filteredInquiries.length === 1 ? 'inquiry' : 'inquiries'}
      </div>

      {/* Inquiries List */}
      {error ? (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-charcoal-600">No inquiries found</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-charcoal-200">
            <thead className="bg-charcoal-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                  Business
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                  Volume
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">
                  Submitted
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-charcoal-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-200">
              {filteredInquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-charcoal-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-charcoal-950">{inquiry.businessName}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-charcoal-900">{inquiry.contactName}</div>
                    <div className="text-xs text-charcoal-500">{inquiry.email}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-charcoal-600">
                    {inquiry.businessType}
                  </td>
                  <td className="px-4 py-3 text-sm text-charcoal-600">
                    {inquiry.estimatedVolume}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[inquiry.status]}`}>
                      {statusIcons[inquiry.status]}
                      {inquiry.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-charcoal-500">
                    {formatDate(inquiry.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/wholesale/inquiries/${inquiry.id}`}
                      className="text-sunset-600 hover:text-sunset-700 font-medium text-sm"
                    >
                      {inquiry.status === 'PENDING' ? 'Review' : 'View'} →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
