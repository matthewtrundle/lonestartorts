'use client';

import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { trackWholesaleSubmit } from '@/lib/analytics';

interface FormData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: string;
  estimatedVolume: string;
  message: string;
}

const initialFormData: FormData = {
  businessName: '',
  contactName: '',
  email: '',
  phone: '',
  businessType: '',
  estimatedVolume: '',
  message: '',
};

const businessTypes = [
  'Food Truck',
  'Restaurant',
  'Taco Shop / Taqueria',
  'BBQ Restaurant',
  'Catering Company',
  'Breakfast / Brunch Spot',
  'Hotel / Hospitality',
  'Corporate Cafeteria',
  'Event Planner',
  'Other',
];

const volumeOptions = [
  '5-10 packs/month',
  '10-25 packs/month',
  '25-50 packs/month',
  '50-100 packs/month',
  '100+ packs/month',
  'Not sure yet',
];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function WholesaleForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFieldError = (field: string): string | null => {
    if (!touched[field]) return null;
    const value = formData[field as keyof FormData];
    if (field === 'businessName' && !value.trim()) return 'Business name is required';
    if (field === 'contactName' && !value.trim()) return 'Contact name is required';
    if (field === 'email' && !value.trim()) return 'Email is required';
    if (field === 'email' && value.trim() && !isValidEmail(value)) return 'Please enter a valid email';
    if (field === 'businessType' && !value) return 'Please select a business type';
    if (field === 'estimatedVolume' && !value) return 'Please select estimated volume';
    return null;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const requiredFields = ['businessName', 'contactName', 'email', 'businessType', 'estimatedVolume'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Touch all required fields
    const allTouched: Record<string, boolean> = {};
    requiredFields.forEach(f => { allTouched[f] = true; });
    setTouched(allTouched);

    // Check validation
    const hasErrors = requiredFields.some(field => {
      const value = formData[field as keyof FormData];
      if (!value.trim()) return true;
      if (field === 'email' && !isValidEmail(value)) return true;
      return false;
    });
    if (hasErrors) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/wholesale-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit inquiry');
      }

      // Track form submission in Vercel Analytics
      trackWholesaleSubmit({
        businessType: formData.businessType,
        volumeRange: formData.estimatedVolume,
      });

      setIsSubmitted(true);
      setFormData(initialFormData);
      setTouched({});
    } catch (err) {
      setError('There was an error submitting your inquiry. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (field: string) => {
    const err = getFieldError(field);
    return `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
      err
        ? 'border-red-400 focus:ring-red-400'
        : 'border-charcoal-300 focus:ring-sunset-500'
    }`;
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-charcoal-950 mb-2">Thank You!</h3>
        <p className="text-charcoal-700 mb-6">
          We&apos;ve received your wholesale inquiry. Our team will review your information and get back to you
          within 1-2 business days with pricing details.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-sunset-600 font-medium hover:text-sunset-700 transition-colors"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8" noValidate>
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Business Name */}
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-charcoal-950 mb-2">
            Business Name *
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            aria-describedby={getFieldError('businessName') ? 'ws-businessName-error' : undefined}
            aria-invalid={!!getFieldError('businessName')}
            className={inputClasses('businessName')}
            placeholder="Your restaurant or business name"
          />
          {getFieldError('businessName') && (
            <p id="ws-businessName-error" className="text-red-500 text-xs mt-1" role="alert">{getFieldError('businessName')}</p>
          )}
        </div>

        {/* Contact Name */}
        <div>
          <label htmlFor="contactName" className="block text-sm font-medium text-charcoal-950 mb-2">
            Contact Name *
          </label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            aria-describedby={getFieldError('contactName') ? 'ws-contactName-error' : undefined}
            aria-invalid={!!getFieldError('contactName')}
            className={inputClasses('contactName')}
            placeholder="Your name"
          />
          {getFieldError('contactName') && (
            <p id="ws-contactName-error" className="text-red-500 text-xs mt-1" role="alert">{getFieldError('contactName')}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-charcoal-950 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            aria-describedby={getFieldError('email') ? 'ws-email-error' : undefined}
            aria-invalid={!!getFieldError('email')}
            className={inputClasses('email')}
            placeholder="your@email.com"
          />
          {getFieldError('email') && (
            <p id="ws-email-error" className="text-red-500 text-xs mt-1" role="alert">{getFieldError('email')}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-charcoal-950 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
            placeholder="(555) 123-4567"
          />
        </div>

        {/* Business Type */}
        <div>
          <label htmlFor="businessType" className="block text-sm font-medium text-charcoal-950 mb-2">
            Business Type *
          </label>
          <select
            id="businessType"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            aria-describedby={getFieldError('businessType') ? 'ws-businessType-error' : undefined}
            aria-invalid={!!getFieldError('businessType')}
            className={`${inputClasses('businessType')} bg-white`}
          >
            <option value="">Select your business type</option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {getFieldError('businessType') && (
            <p id="ws-businessType-error" className="text-red-500 text-xs mt-1" role="alert">{getFieldError('businessType')}</p>
          )}
        </div>

        {/* Estimated Volume */}
        <div>
          <label htmlFor="estimatedVolume" className="block text-sm font-medium text-charcoal-950 mb-2">
            Estimated Monthly Volume *
          </label>
          <select
            id="estimatedVolume"
            name="estimatedVolume"
            value={formData.estimatedVolume}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            aria-describedby={getFieldError('estimatedVolume') ? 'ws-estimatedVolume-error' : undefined}
            aria-invalid={!!getFieldError('estimatedVolume')}
            className={`${inputClasses('estimatedVolume')} bg-white`}
          >
            <option value="">Select estimated volume</option>
            {volumeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {getFieldError('estimatedVolume') && (
            <p id="ws-estimatedVolume-error" className="text-red-500 text-xs mt-1" role="alert">{getFieldError('estimatedVolume')}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="mt-6">
        <label htmlFor="message" className="block text-sm font-medium text-charcoal-950 mb-2">
          Additional Details
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent resize-none"
          placeholder="Tell us more about your needs - preferred tortilla types, delivery schedule, or any questions you have."
        />
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-4 rounded-lg font-bold transition-colors disabled:bg-charcoal-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Inquiry
            </>
          )}
        </button>
      </div>

      <p className="mt-4 text-sm text-charcoal-600">
        * Required fields. We typically respond within 1-2 business days.
      </p>
    </form>
  );
}
