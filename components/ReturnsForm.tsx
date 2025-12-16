'use client';

import { useState } from 'react';
import { trackContactSubmit } from '@/lib/analytics';

export function ReturnsForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    reason: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Format the message to include order details
      const formattedMessage = `
ORDER NUMBER: ${formData.orderNumber}
REASON: ${formData.reason}

DETAILS:
${formData.message}
      `.trim();

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: 'Return/Refund Request',
          message: formattedMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      // Track form submission in Vercel Analytics
      trackContactSubmit('Return Request');

      setStatus('success');
      setFormData({ name: '', email: '', orderNumber: '', reason: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit request');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-green-800 font-semibold text-lg">Request Submitted!</p>
        <p className="text-green-700 mt-2">We've received your return request and will respond within 1-2 business days.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-sunset-600 hover:text-sunset-700 font-medium underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-charcoal-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-white border border-charcoal-300 rounded-lg px-4 py-3 text-charcoal-950 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-charcoal-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-white border border-charcoal-300 rounded-lg px-4 py-3 text-charcoal-950 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div>
        <label htmlFor="orderNumber" className="block text-sm font-medium text-charcoal-700 mb-1">
          Order Number *
        </label>
        <input
          type="text"
          id="orderNumber"
          name="orderNumber"
          placeholder="e.g., LST-ABC123"
          value={formData.orderNumber}
          onChange={handleChange}
          required
          className="w-full bg-white border border-charcoal-300 rounded-lg px-4 py-3 text-charcoal-950 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent transition-all"
        />
        <p className="text-xs text-charcoal-500 mt-1">Found in your order confirmation email</p>
      </div>

      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-charcoal-700 mb-1">
          Reason for Return *
        </label>
        <select
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          required
          className="w-full bg-white border border-charcoal-300 rounded-lg px-4 py-3 text-charcoal-950 focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent transition-all"
        >
          <option value="">Select a reason...</option>
          <option value="Damaged in shipping">Damaged in shipping</option>
          <option value="Wrong item received">Wrong item received</option>
          <option value="Product quality issue">Product quality issue</option>
          <option value="Order never arrived">Order never arrived</option>
          <option value="Changed my mind">Changed my mind</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-charcoal-700 mb-1">
          Please describe the issue *
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Please provide details about the issue. If damaged, describe the damage. Including photos in a follow-up email can help us resolve this faster."
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full bg-white border border-charcoal-300 rounded-lg px-4 py-3 text-charcoal-950 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent transition-all resize-none"
        />
      </div>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-700 text-sm">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-sunset-500 hover:bg-sunset-600 disabled:bg-sunset-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
      >
        {status === 'loading' ? 'Submitting...' : 'Submit Return Request'}
      </button>
    </form>
  );
}
