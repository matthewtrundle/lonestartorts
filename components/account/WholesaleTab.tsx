'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, ShoppingBag, FileText, ExternalLink } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import TermsProgressCard from './TermsProgressCard';

interface WholesaleOrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface WholesaleOrder {
  id: string;
  orderNumber: string;
  total: number;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
  dueDate?: string | null;
  stripeInvoiceUrl?: string | null;
  items: WholesaleOrderItem[];
}

interface WholesaleData {
  businessName: string;
  pricingTier: string;
  paymentTerms: string;
  status: string;
  termsProgress?: any;
  orders: WholesaleOrder[];
}

interface WholesaleTabProps {
  wholesale: WholesaleData;
}

const paymentStatusColors: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-600',
  PENDING: 'bg-blue-100 text-blue-700',
  PAID: 'bg-green-100 text-green-700',
  OVERDUE: 'bg-red-100 text-red-700',
  VOID: 'bg-gray-100 text-gray-500',
  PARTIAL: 'bg-yellow-100 text-yellow-700',
};

const tierDisplayMap: Record<string, string> = {
  STANDARD: 'Standard',
  SILVER: 'Silver',
  GOLD: 'Gold',
  PLATINUM: 'Platinum',
  CUSTOM: 'Custom',
};

function formatPaymentStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export default function WholesaleTab({ wholesale }: WholesaleTabProps) {
  const outstandingOrders = wholesale.orders.filter(o =>
    ['PENDING', 'OVERDUE', 'PARTIAL'].includes(o.paymentStatus)
  );
  const orderHistory = wholesale.orders.filter(o =>
    !['PENDING', 'OVERDUE', 'PARTIAL'].includes(o.paymentStatus)
  );

  return (
    <div className="space-y-6">
      {/* Business Header */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sunset-100 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-sunset-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-charcoal-950">{wholesale.businessName}</h2>
              <p className="text-sm text-charcoal-500">{tierDisplayMap[wholesale.pricingTier] || wholesale.pricingTier} Tier</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${wholesale.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
            {wholesale.status}
          </span>
        </div>
      </div>

      {/* Terms Progress */}
      {wholesale.termsProgress && <TermsProgressCard termsProgress={wholesale.termsProgress} />}

      {/* Outstanding Invoices */}
      {outstandingOrders.length > 0 && (
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h2 className="text-lg font-bold text-charcoal-950 flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-sunset-600" />
            Outstanding Invoices
          </h2>
          <div className="divide-y divide-charcoal-100">
            {outstandingOrders.map(order => (
              <div key={order.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-charcoal-950">{order.orderNumber}</p>
                  <p className="text-sm text-charcoal-500">
                    {order.dueDate ? `Due ${new Date(order.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : 'Due on receipt'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${paymentStatusColors[order.paymentStatus] || 'bg-gray-100 text-gray-600'}`}>
                    {formatPaymentStatus(order.paymentStatus)}
                  </span>
                  <span className="font-medium text-charcoal-950">{formatPrice(order.total)}</span>
                  {order.stripeInvoiceUrl && (
                    <a href={order.stripeInvoiceUrl} target="_blank" rel="noopener noreferrer" className="text-sunset-600 hover:text-sunset-700">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order History */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-charcoal-950 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-sunset-600" />
            Wholesale Orders
          </h2>
        </div>
        {wholesale.orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-charcoal-500 mb-4">No wholesale orders yet</p>
            <Link href="/wholesale" className="inline-flex items-center gap-2 px-5 py-2.5 bg-sunset-600 text-white rounded-lg font-medium hover:bg-sunset-700">
              <ShoppingBag className="w-4 h-4" />
              Place Wholesale Order
            </Link>
          </div>
        ) : (
          <>
            <div className="divide-y divide-charcoal-100">
              {orderHistory.map(order => (
                <div key={order.id} className="py-3">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <p className="font-medium text-charcoal-950">{order.orderNumber}</p>
                      <p className="text-sm text-charcoal-500">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${paymentStatusColors[order.paymentStatus] || 'bg-gray-100 text-gray-600'}`}>
                        {formatPaymentStatus(order.paymentStatus)}
                      </span>
                      <span className="font-medium text-charcoal-950">{formatPrice(order.total)}</span>
                      {order.stripeInvoiceUrl && (
                        <a href={order.stripeInvoiceUrl} target="_blank" rel="noopener noreferrer" className="text-sunset-600 hover:text-sunset-700" title="View Invoice">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-charcoal-500">
                    {order.items.map((item, i) => (
                      <span key={i}>{i > 0 ? ', ' : ''}{item.quantity}x {item.name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-charcoal-100">
              <Link href="/wholesale" className="text-sm text-sunset-600 hover:text-sunset-700 font-medium">
                Place another wholesale order →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
