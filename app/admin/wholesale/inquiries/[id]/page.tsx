'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Building2, User, Mail, Phone, Briefcase, Package, MessageSquare, CheckCircle, XCircle } from 'lucide-react';

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
  notes: string | null;
  createdAt: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
}

export default function InquiryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const inquiryId = params.id as string;

  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  // Approval form state
  const [showApprovalForm, setShowApprovalForm] = useState(false);
  const [pricingTier, setPricingTier] = useState('STANDARD');
  const [paymentTerms, setPaymentTerms] = useState('DUE_ON_RECEIPT');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    fetchInquiry();
  }, [inquiryId]);

  const fetchInquiry = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/wholesale/inquiries/${inquiryId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch inquiry');
      }

      const data = await response.json();
      setInquiry(data.inquiry);
      setAdminNotes(data.inquiry.notes || '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load inquiry');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      setSaving(true);
      const response = await fetch(`/api/admin/wholesale/inquiries/${inquiryId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pricingTier,
          paymentTerms,
          discountPercent: pricingTier === 'CUSTOM' ? discountPercent : undefined,
          notes: adminNotes,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to approve inquiry');
      }

      const data = await response.json();
      router.push(`/admin/wholesale/clients/${data.clientId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve inquiry');
    } finally {
      setSaving(false);
    }
  };

  const handleReject = async () => {
    if (!confirm('Are you sure you want to reject this inquiry?')) return;

    try {
      setSaving(true);
      const response = await fetch(`/api/admin/wholesale/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'REJECTED',
          notes: adminNotes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject inquiry');
      }

      router.push('/admin/wholesale/inquiries');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reject inquiry');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateNotes = async () => {
    try {
      setSaving(true);
      const response = await fetch(`/api/admin/wholesale/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: adminNotes }),
      });

      if (!response.ok) {
        throw new Error('Failed to update notes');
      }

      await fetchInquiry();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update notes');
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
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
          <p className="text-charcoal-600">Loading inquiry...</p>
        </div>
      </div>
    );
  }

  if (error || !inquiry) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Inquiry not found'}</p>
          <Link href="/admin/wholesale/inquiries" className="text-sunset-600 hover:text-sunset-700">
            Back to Inquiries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/wholesale/inquiries"
          className="p-2 hover:bg-charcoal-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5 text-charcoal-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-charcoal-950">{inquiry.businessName}</h1>
          <p className="text-sm text-charcoal-600">Wholesale Inquiry • Submitted {formatDate(inquiry.createdAt)}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="md:col-span-2 space-y-6">
          {/* Business Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-charcoal-950 mb-4">Business Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-charcoal-400 mt-0.5" />
                <div>
                  <div className="text-xs text-charcoal-500 uppercase">Business Name</div>
                  <div className="font-medium text-charcoal-950">{inquiry.businessName}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-charcoal-400 mt-0.5" />
                <div>
                  <div className="text-xs text-charcoal-500 uppercase">Business Type</div>
                  <div className="font-medium text-charcoal-950">{inquiry.businessType}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-charcoal-400 mt-0.5" />
                <div>
                  <div className="text-xs text-charcoal-500 uppercase">Contact Name</div>
                  <div className="font-medium text-charcoal-950">{inquiry.contactName}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-charcoal-400 mt-0.5" />
                <div>
                  <div className="text-xs text-charcoal-500 uppercase">Estimated Volume</div>
                  <div className="font-medium text-charcoal-950">{inquiry.estimatedVolume}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-charcoal-400 mt-0.5" />
                <div>
                  <div className="text-xs text-charcoal-500 uppercase">Email</div>
                  <a href={`mailto:${inquiry.email}`} className="font-medium text-sunset-600 hover:text-sunset-700">
                    {inquiry.email}
                  </a>
                </div>
              </div>
              {inquiry.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-charcoal-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-charcoal-500 uppercase">Phone</div>
                    <a href={`tel:${inquiry.phone}`} className="font-medium text-sunset-600 hover:text-sunset-700">
                      {inquiry.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {inquiry.message && (
              <div className="mt-6 pt-6 border-t border-charcoal-200">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-charcoal-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-charcoal-500 uppercase mb-2">Message</div>
                    <div className="text-charcoal-700 whitespace-pre-wrap">{inquiry.message}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Admin Notes */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-charcoal-950 mb-4">Internal Notes</h2>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add notes about this inquiry..."
              className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent resize-none"
              rows={4}
            />
            {adminNotes !== (inquiry.notes || '') && (
              <div className="mt-3 flex justify-end">
                <button
                  onClick={handleUpdateNotes}
                  disabled={saving}
                  className="px-4 py-2 bg-charcoal-100 text-charcoal-700 rounded-lg hover:bg-charcoal-200 text-sm font-medium"
                >
                  Save Notes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-charcoal-950 mb-4">Status</h2>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
              inquiry.status === 'PENDING' ? 'bg-amber-100 text-amber-800' :
              inquiry.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
              inquiry.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
              'bg-charcoal-100 text-charcoal-800'
            }`}>
              {inquiry.status.replace('_', ' ')}
            </div>
          </div>

          {/* Actions */}
          {inquiry.status === 'PENDING' && !showApprovalForm && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-charcoal-950 mb-4">Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setShowApprovalForm(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                  <CheckCircle className="w-5 h-5" />
                  Approve & Create Client
                </button>
                <button
                  onClick={handleReject}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium"
                >
                  <XCircle className="w-5 h-5" />
                  Reject Inquiry
                </button>
              </div>
            </div>
          )}

          {/* Approval Form */}
          {showApprovalForm && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-charcoal-950 mb-4">Create Client Account</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1">
                    Pricing Tier
                  </label>
                  <select
                    value={pricingTier}
                    onChange={(e) => setPricingTier(e.target.value)}
                    className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                  >
                    <option value="STANDARD">Standard (0% discount)</option>
                    <option value="SILVER">Silver (5% discount)</option>
                    <option value="GOLD">Gold (10% discount)</option>
                    <option value="PLATINUM">Platinum (15% discount)</option>
                    <option value="CUSTOM">Custom</option>
                  </select>
                </div>

                {pricingTier === 'CUSTOM' && (
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-1">
                      Custom Discount %
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1">
                    Payment Terms
                  </label>
                  <select
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                  >
                    <option value="DUE_ON_RECEIPT">Due on Receipt</option>
                    <option value="NET_7">Net 7</option>
                    <option value="NET_15">Net 15</option>
                    <option value="NET_30">Net 30</option>
                    <option value="NET_45">Net 45</option>
                    <option value="NET_60">Net 60</option>
                  </select>
                </div>

                <div className="pt-4 space-y-3">
                  <button
                    onClick={handleApprove}
                    disabled={saving}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50"
                  >
                    {saving ? 'Creating...' : 'Create Client Account'}
                  </button>
                  <button
                    onClick={() => setShowApprovalForm(false)}
                    className="w-full px-4 py-2 text-charcoal-600 hover:text-charcoal-800 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
