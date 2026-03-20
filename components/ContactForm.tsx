'use client';

import { useState } from 'react';
import { trackContactSubmit } from '@/lib/analytics';
import { useLanguage } from '@/lib/language-context';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const getFieldError = (field: string): string | null => {
    if (!touched[field]) return null;
    const value = formData[field as keyof typeof formData];
    if (field === 'name' && !value.trim()) return 'Name is required';
    if (field === 'email' && !value.trim()) return 'Email is required';
    if (field === 'email' && value.trim() && !isValidEmail(value)) return 'Please enter a valid email';
    if (field === 'message' && !value.trim()) return 'Message is required';
    return null;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Touch all required fields to show errors
    setTouched({ name: true, email: true, message: true });

    if (!formData.name.trim() || !formData.email.trim() || !isValidEmail(formData.email) || !formData.message.trim()) {
      return;
    }

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
      setTouched({});
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

  const fieldClasses = (field: string) => {
    const error = getFieldError(field);
    return `bg-charcoal-800 border rounded-lg px-3 py-2 text-sm text-cream-50 placeholder-cream-500 focus:outline-none transition-colors ${
      error
        ? 'border-red-500 focus:border-red-400'
        : 'border-charcoal-700 focus:border-sunset-500'
    }`;
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

  const nameError = getFieldError('name');
  const emailError = getFieldError('email');
  const messageError = getFieldError('message');

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input
            type="text"
            name="name"
            aria-label={t('forms.name')}
            aria-describedby={nameError ? 'contact-name-error' : undefined}
            aria-invalid={!!nameError}
            placeholder={t('forms.name')}
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={fieldClasses('name')}
          />
          {nameError && (
            <p id="contact-name-error" className="text-red-400 text-xs mt-1" role="alert">{nameError}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            name="email"
            aria-label={t('forms.email')}
            aria-describedby={emailError ? 'contact-email-error' : undefined}
            aria-invalid={!!emailError}
            placeholder={t('forms.email')}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={fieldClasses('email')}
          />
          {emailError && (
            <p id="contact-email-error" className="text-red-400 text-xs mt-1" role="alert">{emailError}</p>
          )}
        </div>
      </div>
      <select
        name="subject"
        aria-label={t('forms.topics.select')}
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
      <div>
        <textarea
          name="message"
          aria-label={t('forms.placeholders.message')}
          aria-describedby={messageError ? 'contact-message-error' : undefined}
          aria-invalid={!!messageError}
          placeholder={t('forms.placeholders.message')}
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          rows={3}
          className={`w-full ${fieldClasses('message')} resize-none`}
        />
        {messageError && (
          <p id="contact-message-error" className="text-red-400 text-xs mt-1" role="alert">{messageError}</p>
        )}
      </div>
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
