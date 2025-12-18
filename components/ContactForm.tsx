'use client';

import { useState } from 'react';
import { trackContactSubmit } from '@/lib/analytics';
import { useLanguage } from '@/lib/language-context';

export function ContactForm() {
  const { t } = useLanguage();
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
      <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-4 text-center">
        <p className="text-green-400 font-medium">{t('forms.success')}</p>
        <p className="text-cream-400 text-sm mt-1">{t('contact.responseTime')}</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-3 text-sm text-sunset-400 hover:text-sunset-300 underline"
        >
          {t('contact.sendAnother')}
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
          placeholder={t('forms.name')}
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-charcoal-800 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-cream-50 placeholder-cream-500 focus:outline-none focus:border-sunset-500 transition-colors"
        />
        <input
          type="email"
          name="email"
          placeholder={t('forms.email')}
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
        <option value="">{t('forms.topics.select')}...</option>
        <option value="Order Question">{t('forms.topics.order')}</option>
        <option value="Shipping Inquiry">{t('forms.topics.shipping')}</option>
        <option value="Product Question">{t('forms.topics.product')}</option>
        <option value="Wholesale/Bulk">{t('forms.topics.wholesale')}</option>
        <option value="General">{t('forms.topics.other')}</option>
      </select>
      <textarea
        name="message"
        placeholder={t('forms.placeholders.message')}
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
        {status === 'loading' ? t('forms.sending') : t('forms.submit')}
      </button>
    </form>
  );
}
