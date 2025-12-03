'use client';

import { useState } from 'react';

export function ContactForm() {
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
      <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-4 text-center">
        <p className="text-green-400 font-medium">Message sent!</p>
        <p className="text-cream-400 text-sm mt-1">We'll get back to you soon.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-3 text-sm text-sunset-400 hover:text-sunset-300 underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-charcoal-800 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-cream-50 placeholder-cream-500 focus:outline-none focus:border-sunset-500 transition-colors"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-charcoal-800 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-cream-50 placeholder-cream-500 focus:outline-none focus:border-sunset-500 transition-colors"
        />
      </div>
      <select
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        className="w-full bg-charcoal-800 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-cream-50 focus:outline-none focus:border-sunset-500 transition-colors"
      >
        <option value="">Select a topic...</option>
        <option value="Order Question">Order Question</option>
        <option value="Shipping Inquiry">Shipping Inquiry</option>
        <option value="Product Question">Product Question</option>
        <option value="Wholesale/Bulk">Wholesale/Bulk Orders</option>
        <option value="General">General Inquiry</option>
      </select>
      <textarea
        name="message"
        placeholder="Your message..."
        value={formData.message}
        onChange={handleChange}
        required
        rows={3}
        className="w-full bg-charcoal-800 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-cream-50 placeholder-cream-500 focus:outline-none focus:border-sunset-500 transition-colors resize-none"
      />
      {status === 'error' && (
        <p className="text-red-400 text-sm">{errorMessage}</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-sunset-500 hover:bg-sunset-600 disabled:bg-sunset-700 disabled:cursor-not-allowed text-cream-50 font-semibold py-2 px-4 rounded-lg text-sm transition-colors"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
