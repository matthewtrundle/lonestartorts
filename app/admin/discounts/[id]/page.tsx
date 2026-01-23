'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Trash2, BarChart3 } from 'lucide-react';
import DiscountForm, { DiscountFormData } from '@/components/admin/DiscountForm';

interface UsageStats {
  totalUses: number;
  uniqueEmails: number;
  totalDiscountGiven: number;
  recentUsages: {
    email: string;
    orderNumber: string | null;
    discountApplied: number;
    usedAt: string;
  }[];
}

export default function EditDiscountPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [discountData, setDiscountData] = useState<DiscountFormData | null>(null);
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchDiscount();
  }, [id]);

  const fetchDiscount = async () => {
    try {
      const response = await fetch(`/api/admin/discounts/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          setError('Discount code not found');
          return;
        }
        throw new Error('Failed to fetch discount');
      }

      const data = await response.json();

      // Transform data for form
      const formData: DiscountFormData = {
        code: data.discountCode.code,
        name: data.discountCode.name,
        description: data.discountCode.description || '',
        isActive: data.discountCode.isActive,
        startsAt: data.discountCode.startsAt,
        expiresAt: data.discountCode.expiresAt,
        minOrderAmount: data.discountCode.minOrderAmount,
        maxDiscountAmount: data.discountCode.maxDiscountAmount,
        maxUsageTotal: data.discountCode.maxUsageTotal,
        maxUsagePerEmail: data.discountCode.maxUsagePerEmail,
        firstOrderOnly: data.discountCode.firstOrderOnly,
        stackable: data.discountCode.stackable,
        priority: data.discountCode.priority,
        rules: data.discountCode.rules.map((rule: {
          id: string;
          type: string;
          value: number | null;
          maxDiscount: number | null;
          buyProductSku: string | null;
          buyQuantity: number | null;
          getProductSku: string | null;
          getQuantity: number | null;
          getDiscountPct: number | null;
          minOrderAmount: number | null;
          priority: number;
        }) => ({
          id: rule.id,
          type: rule.type,
          value: rule.value,
          maxDiscount: rule.maxDiscount,
          buyProductSku: rule.buyProductSku,
          buyQuantity: rule.buyQuantity,
          getProductSku: rule.getProductSku,
          getQuantity: rule.getQuantity,
          getDiscountPct: rule.getDiscountPct,
          minOrderAmount: rule.minOrderAmount,
          priority: rule.priority,
        })),
        restrictions: data.discountCode.restrictions.map((restriction: {
          id: string;
          type: string;
          value: string;
          include: boolean;
        }) => ({
          id: restriction.id,
          type: restriction.type,
          value: restriction.value,
          include: restriction.include,
        })),
      };

      setDiscountData(formData);
      setUsageStats(data.usageStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load discount');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: DiscountFormData) => {
    const response = await fetch(`/api/admin/discounts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.error || 'Failed to update discount');
    }

    router.push('/admin/discounts?updated=true');
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/discounts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to delete discount');
      }

      router.push('/admin/discounts?deleted=true');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete discount');
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/discounts');
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunset-600 mx-auto"></div>
        <p className="text-charcoal-600 mt-4">Loading discount...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-12 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => router.push('/admin/discounts')}
          className="mt-4 px-4 py-2 text-sm font-medium text-white bg-sunset-500 rounded-lg hover:bg-sunset-600"
        >
          Back to Discounts
        </button>
      </div>
    );
  }

  if (!discountData) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 text-charcoal-500 hover:bg-charcoal-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-charcoal-950">Edit Discount Code</h1>
            <p className="text-charcoal-600">
              Modify {discountData.code} settings and rules
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>

      {/* Usage Stats */}
      {usageStats && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-charcoal-500" />
            <h2 className="text-lg font-semibold text-charcoal-900">Usage Statistics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-charcoal-50 rounded-lg p-4">
              <p className="text-sm text-charcoal-500">Total Uses</p>
              <p className="text-2xl font-bold text-charcoal-900">{usageStats.totalUses}</p>
            </div>
            <div className="bg-charcoal-50 rounded-lg p-4">
              <p className="text-sm text-charcoal-500">Unique Customers</p>
              <p className="text-2xl font-bold text-charcoal-900">{usageStats.uniqueEmails}</p>
            </div>
            <div className="bg-charcoal-50 rounded-lg p-4">
              <p className="text-sm text-charcoal-500">Total Discount Given</p>
              <p className="text-2xl font-bold text-charcoal-900">
                ${(usageStats.totalDiscountGiven / 100).toFixed(2)}
              </p>
            </div>
          </div>

          {usageStats.recentUsages.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-charcoal-700 mb-2">Recent Uses</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-charcoal-500">
                      <th className="pb-2">Email</th>
                      <th className="pb-2">Order</th>
                      <th className="pb-2">Discount</th>
                      <th className="pb-2">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal-100">
                    {usageStats.recentUsages.map((usage, idx) => (
                      <tr key={idx}>
                        <td className="py-2 text-charcoal-700">{usage.email}</td>
                        <td className="py-2">
                          {usage.orderNumber ? (
                            <a
                              href={`/admin/orders/${usage.orderNumber}`}
                              className="text-sunset-600 hover:underline"
                            >
                              {usage.orderNumber}
                            </a>
                          ) : (
                            <span className="text-charcoal-400">-</span>
                          )}
                        </td>
                        <td className="py-2 text-charcoal-700">
                          ${(usage.discountApplied / 100).toFixed(2)}
                        </td>
                        <td className="py-2 text-charcoal-500">
                          {new Date(usage.usedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <DiscountForm
          initialData={discountData}
          isEditing
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-charcoal-900 mb-2">Delete Discount Code?</h3>
            <p className="text-charcoal-600 mb-4">
              Are you sure you want to delete <strong>{discountData.code}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-charcoal-700 bg-white border border-charcoal-300 rounded-lg hover:bg-charcoal-50"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
