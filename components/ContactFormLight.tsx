'use client';

import { useState } from 'react';
import { trackContactSubmit } from '@/lib/analytics';

export function ContactFormLight() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Track form submission in Vercel Analytics
      trackContactSubmit(formData.subject || 'General');

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
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
        <p className="text-green-800 font-semibold text-lg">Message Sent!</p>
        <p className="text-green-700 mt-2">We'll get back to you as soon as possible.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-sunset-600 hover:text-sunset-700 font-medium underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-charcoal-700 mb-1">
            Name
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
            Email
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
        <label htmlFor="subject" className="block text-sm font-medium text-charcoal-700 mb-1">
          Topic
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full bg-white border border-charcoal-300 rounded-lg px-4 py-3 text-charcoal-950 focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent transition-all"
        >
          <option value="">Select a topic...</option>
          <option value="Order Question">Order Question</option>
          <option value="Shipping Inquiry">Shipping Inquiry</option>
          <option value="Product Question">Product Question</option>
          <option value="Wholesale/Bulk">Wholesale/Bulk Orders</option>
          <option value="General">General Inquiry</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-charcoal-700 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="How can we help you?"
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
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
