'use client';

import { useEffect, useState } from 'react';
import { Tag, Gift, Mail, Percent, Truck, CheckCircle, XCircle, Clock, Package } from 'lucide-react';

interface StaticCode {
  code: string;
  type: string;
  description: string;
  amount?: number;
  restriction: string;
}

interface SpinCode {
  code: string;
  type: string;
  description: string;
  value?: number;
  email: string;
  used: boolean;
  usedAt: string | null;
  expiresAt: string;
  createdAt: string;
  expired: boolean;
}

interface FeedbackCode {
  code: string;
  type: string;
  description: string;
  value: number;
  email: string;
  orderNumber: string;
  used: boolean;
  usedAt: string | null;
  expiresAt: string;
  createdAt: string;
  expired: boolean;
}

interface DripCode {
  code: string;
  type: string;
  description: string;
  value?: number;
  emailNumber: number;
  sentAt: string;
  campaignId: string;
}

interface Summary {
  totalStaticCodes: number;
  totalGeneratedCodes: number;
  totalUsed: number;
  usageRate: string;
  spinStats: {
    total: number;
    used: number;
    expired: number;
    byType: Record<string, { total: number; used: number }>;
  };
  feedbackStats: {
    total: number;
    used: number;
    expired: number;
  };
  dripStats: {
    total: number;
  };
}

interface DiscountData {
  staticCodes: StaticCode[];
  spinCodes: SpinCode[];
  feedbackCodes: FeedbackCode[];
  dripCodes: DripCode[];
  summary: Summary;
}

type Tab = 'overview' | 'static' | 'spin' | 'feedback' | 'drip';

export default function DiscountsPage() {
  const [data, setData] = useState<DiscountData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const response = await fetch('/api/admin/discounts');
      if (!response.ok) throw new Error('Failed to fetch discounts');
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Error fetching discounts:', err);
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'percentage':
        return <Percent className="w-4 h-4" />;
      case 'fixed':
        return <Tag className="w-4 h-4" />;
      case 'free_shipping':
        return <Truck className="w-4 h-4" />;
      case 'product':
      case 'bonus':
        return <Gift className="w-4 h-4" />;
      default:
        return <Tag className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (used: boolean, expired: boolean) => {
    if (used) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3" /> Used
        </span>
      );
    }
    if (expired) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="w-3 h-3" /> Expired
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
        <Clock className="w-3 h-3" /> Active
      </span>
    );
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunset-600 mx-auto"></div>
        <p className="text-charcoal-600 mt-4">Loading discount codes...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-12 text-center">
        <Tag className="w-12 h-12 text-charcoal-300 mx-auto mb-4" />
        <p className="text-charcoal-600">Failed to load discount codes</p>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'static', label: 'Permanent Codes', count: data.staticCodes.length },
    { id: 'spin', label: 'Spin Wheel', count: data.spinCodes.length },
    { id: 'feedback', label: 'Feedback Thank You', count: data.feedbackCodes.length },
    { id: 'drip', label: 'Drip Campaign', count: data.dripCodes.length },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-charcoal-950 mb-2">Discount Codes</h1>
        <p className="text-charcoal-600">View all discount codes and their usage statistics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Tag className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-charcoal-500">Permanent Codes</p>
              <p className="text-2xl font-bold text-charcoal-900">{data.summary.totalStaticCodes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-charcoal-500">Generated Codes</p>
              <p className="text-2xl font-bold text-charcoal-900">{data.summary.totalGeneratedCodes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-charcoal-500">Codes Used</p>
              <p className="text-2xl font-bold text-charcoal-900">{data.summary.totalUsed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Percent className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-charcoal-500">Usage Rate</p>
              <p className="text-2xl font-bold text-charcoal-900">{data.summary.usageRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-charcoal-200">
          <nav className="flex gap-1 px-4 pt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-sunset-500 text-white'
                    : 'text-charcoal-600 hover:bg-charcoal-100'
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                    activeTab === tab.id ? 'bg-white/20' : 'bg-charcoal-200'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Spin Wheel Stats */}
              <div>
                <h3 className="text-lg font-semibold text-charcoal-900 mb-4">Spin Wheel Codes by Prize Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(data.summary.spinStats.byType).map(([prize, stats]) => (
                    <div key={prize} className="bg-charcoal-50 rounded-lg p-4">
                      <p className="text-sm text-charcoal-600">{prize}</p>
                      <p className="text-xl font-bold text-charcoal-900">{stats.used} / {stats.total}</p>
                      <p className="text-xs text-charcoal-500">
                        {stats.total > 0 ? ((stats.used / stats.total) * 100).toFixed(0) : 0}% used
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-medium text-purple-900">Spin Wheel</h4>
                  <p className="text-2xl font-bold text-purple-700">{data.summary.spinStats.used} / {data.summary.spinStats.total}</p>
                  <p className="text-sm text-purple-600">{data.summary.spinStats.expired} expired unused</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900">Feedback Coupons</h4>
                  <p className="text-2xl font-bold text-blue-700">{data.summary.feedbackStats.used} / {data.summary.feedbackStats.total}</p>
                  <p className="text-sm text-blue-600">{data.summary.feedbackStats.expired} expired unused</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-green-900">Drip Campaign</h4>
                  <p className="text-2xl font-bold text-green-700">{data.summary.dripStats.total}</p>
                  <p className="text-sm text-green-600">codes sent</p>
                </div>
              </div>
            </div>
          )}

          {/* Static Codes Tab */}
          {activeTab === 'static' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-charcoal-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">Code</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">Description</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">Restriction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-200">
                  {data.staticCodes.map((code) => (
                    <tr key={code.code}>
                      <td className="px-4 py-3">
                        <code className="font-mono text-sm bg-charcoal-100 px-2 py-1 rounded">
                          {code.code}
                        </code>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-sm text-charcoal-700">
                          {getTypeIcon(code.type)}
                          {code.type === 'percentage' ? `${code.amount}% off` : code.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-charcoal-700">{code.description}</td>
                      <td className="px-4 py-3">
                        {code.restriction === 'first_order' ? (
                          <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">First order only</span>
                        ) : (
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">No restriction</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Spin Codes Tab */}
          {activeTab === 'spin' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-charcoal-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">Code</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">Prize</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">Created</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">Expires</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-200">
                  {data.spinCodes.map((code) => (
                    <tr key={code.code} className={code.used ? 'bg-green-50' : code.expired ? 'bg-red-50' : ''}>
                      <td className="px-4 py-3">
                        <code className="font-mono text-xs bg-charcoal-100 px-2 py-1 rounded">
                          {code.code}
                        </code>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-sm text-charcoal-700">
                          {getTypeIcon(code.type)}
                          {code.description}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-charcoal-600">{code.email}</td>
                      <td className="px-4 py-3">{getStatusBadge(code.used, code.expired)}</td>
                      <td className="px-4 py-3 text-sm text-charcoal-500">{formatDate(code.createdAt)}</td>
                      <td className="px-4 py-3 text-sm text-charcoal-500">{formatDate(code.expiresAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.spinCodes.length === 0 && (
                <p className="text-center text-charcoal-500 py-8">No spin wheel codes yet</p>
              )}
            </div>
          )}

          {/* Feedback Codes Tab */}
          {activeTab === 'feedback' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-charcoal-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">Code</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">Discount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">Order #</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">Expires</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-200">
                  {data.feedbackCodes.map((code) => (
                    <tr key={code.code} className={code.used ? 'bg-green-50' : code.expired ? 'bg-red-50' : ''}>
                      <td className="px-4 py-3">
                        <code className="font-mono text-xs bg-charcoal-100 px-2 py-1 rounded">
                          {code.code}
                        </code>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-sm text-charcoal-700">
                          <Percent className="w-4 h-4" />
                          {code.value}% off
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-charcoal-600">{code.email}</td>
                      <td className="px-4 py-3">
                        <a href={`/admin/orders/${code.orderNumber}`} className="text-sm text-sunset-600 hover:underline">
                          {code.orderNumber}
                        </a>
                      </td>
                      <td className="px-4 py-3">{getStatusBadge(code.used, code.expired)}</td>
                      <td className="px-4 py-3 text-sm text-charcoal-500">{formatDate(code.expiresAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.feedbackCodes.length === 0 && (
                <p className="text-center text-charcoal-500 py-8">No feedback thank-you codes yet</p>
              )}
            </div>
          )}

          {/* Drip Codes Tab */}
          {activeTab === 'drip' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-charcoal-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">Code</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">Discount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">Email #</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-charcoal-500 uppercase">Sent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal-200">
                  {data.dripCodes.map((code, idx) => (
                    <tr key={`${code.code}-${idx}`}>
                      <td className="px-4 py-3">
                        <code className="font-mono text-xs bg-charcoal-100 px-2 py-1 rounded">
                          {code.code}
                        </code>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-sm text-charcoal-700">
                          {getTypeIcon(code.type)}
                          {code.description}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-sm">
                          <Mail className="w-4 h-4 text-charcoal-400" />
                          Email #{code.emailNumber}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-charcoal-500">{formatDate(code.sentAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.dripCodes.length === 0 && (
                <p className="text-center text-charcoal-500 py-8">No drip campaign codes sent yet</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
