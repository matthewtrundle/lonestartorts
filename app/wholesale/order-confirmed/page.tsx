'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, FileText, Clock, ArrowRight, ShoppingBag } from 'lucide-react';

export default function WholesaleOrderConfirmedPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || 'Unknown';

  return (
    <main className="min-h-screen bg-cream-50 pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-charcoal-950 mb-2">Order Placed Successfully</h1>
          <p className="text-charcoal-600">Thank you for your wholesale order</p>
        </div>

        {/* Order Number Card */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <div className="text-center">
            <p className="text-sm text-charcoal-500 mb-1">Order Number</p>
            <p className="text-2xl font-bold text-charcoal-950 font-mono">{orderNumber}</p>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <h2 className="text-lg font-bold text-charcoal-950 mb-4">What Happens Next</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-sunset-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold text-sunset-600">1</span>
              </div>
              <div>
                <p className="font-medium text-charcoal-950 text-sm">Order Received</p>
                <p className="text-xs text-charcoal-500">Your order is in our system and will be prepared for shipping.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-sunset-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FileText className="w-4 h-4 text-sunset-600" />
              </div>
              <div>
                <p className="font-medium text-charcoal-950 text-sm">Invoice Sent</p>
                <p className="text-xs text-charcoal-500">An invoice will be emailed to you within 1 business day with payment details.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-sunset-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-4 h-4 text-sunset-600" />
              </div>
              <div>
                <p className="font-medium text-charcoal-950 text-sm">Payment Due Per Terms</p>
                <p className="text-xs text-charcoal-500">Pay your invoice within your agreed payment terms. You can view and pay invoices from your account.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/account?tab=wholesale"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-sunset-500 hover:bg-sunset-600 text-white font-bold rounded-lg transition-colors text-sm"
          >
            View Account
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/wholesale"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border border-charcoal-200 hover:bg-charcoal-50 text-charcoal-950 font-bold rounded-lg transition-colors text-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            Place Another Order
          </Link>
        </div>

        {/* Support */}
        <div className="mt-8 text-center">
          <p className="text-xs text-charcoal-400">
            Questions about your order? Contact us at{' '}
            <a href="mailto:howdy@lonestartortillas.com" className="text-sunset-600 hover:text-sunset-700">
              howdy@lonestartortillas.com
            </a>
            {' '}or call{' '}
            <a href="tel:+15128946823" className="text-sunset-600 hover:text-sunset-700">
              (512) 894-6823
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
