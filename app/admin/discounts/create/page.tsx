'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import DiscountForm, { DiscountFormData } from '@/components/admin/DiscountForm';

export default function CreateDiscountPage() {
  const router = useRouter();

  const handleSubmit = async (data: DiscountFormData) => {
    const response = await fetch('/api/admin/discounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.error || 'Failed to create discount');
    }

    router.push('/admin/discounts?created=true');
  };

  const handleCancel = () => {
    router.push('/admin/discounts');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 text-charcoal-500 hover:bg-charcoal-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-charcoal-950">Create Discount Code</h1>
          <p className="text-charcoal-600">
            Set up a new discount code with custom rules and restrictions
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <DiscountForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
}
