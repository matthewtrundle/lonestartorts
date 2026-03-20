'use client';

import React from 'react';
import { Building2, FileText, CreditCard, Shield } from 'lucide-react';

interface WholesaleCheckoutSummaryProps {
  businessName: string;
  paymentTerms: string;
  paymentTermsLevel: string;
  discountPercent: number;
}

const termsDisplayMap: Record<string, string> = {
  DUE_ON_RECEIPT: 'Due on Receipt',
  NET_7: 'Net 7 Days',
  NET_15: 'Net 15 Days',
  NET_30: 'Net 30 Days',
  NET_45: 'Net 45 Days',
  NET_60: 'Net 60 Days',
};

const levelDisplayMap: Record<string, string> = {
  NEW: 'New',
  TRUSTED: 'Trusted',
  ESTABLISHED: 'Established',
  PREMIUM: 'Premium',
};

export default function WholesaleCheckoutSummary({
  businessName,
  paymentTerms,
  paymentTermsLevel,
  discountPercent,
}: WholesaleCheckoutSummaryProps) {
  const isNetTerms = paymentTerms !== 'DUE_ON_RECEIPT';
  const termsLabel = termsDisplayMap[paymentTerms] || paymentTerms;
  const levelLabel = levelDisplayMap[paymentTermsLevel] || paymentTermsLevel;

  return (
    <div className="bg-white rounded-xl shadow-soft p-5 space-y-3">
      {/* Business Identity */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-sunset-100 flex items-center justify-center flex-shrink-0">
          <Building2 className="w-4.5 h-4.5 text-sunset-600" />
        </div>
        <div>
          <p className="font-bold text-charcoal-950 text-sm">{businessName}</p>
          <p className="text-xs text-charcoal-500">{levelLabel} Account</p>
        </div>
        {discountPercent > 0 && (
          <span className="ml-auto px-2.5 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">
            {discountPercent}% off
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Payment Terms Info */}
      <div className="flex items-start gap-3">
        {isNetTerms ? (
          <>
            <FileText className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-charcoal-950">Invoice &mdash; {termsLabel}</p>
              <p className="text-xs text-charcoal-500 mt-0.5">
                Your order will be placed and an invoice sent to your email. Payment is due within{' '}
                {paymentTerms.replace('NET_', '')} days of invoice date.
              </p>
            </div>
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4 text-sunset-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-charcoal-950">Payment Required</p>
              <p className="text-xs text-charcoal-500 mt-0.5">
                Payment by card or bank transfer is required at checkout. Build your order history to
                unlock invoice terms.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Trust Badge */}
      <div className="flex items-center gap-2 pt-1">
        <Shield className="w-3.5 h-3.5 text-green-600" />
        <span className="text-[11px] text-charcoal-400">
          Wholesale account verified &bull; Free shipping included
        </span>
      </div>
    </div>
  );
}
