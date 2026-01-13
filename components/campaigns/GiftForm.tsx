'use client';

import { useState } from 'react';
import { Send, CheckCircle, Loader2, Gift, MapPin } from 'lucide-react';

interface FormData {
  // Sender info
  senderName: string;
  senderEmail: string;
  senderPhone: string;

  // Recipient info
  recipientName: string;
  recipientRank: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateOrApo: string;
  zipCode: string;
  country: string;
  addressType: 'apo_fpo' | 'international' | 'domestic';

  // Gift details
  packageType: string;
  personalMessage: string;
  notifySender: boolean;
}

const initialFormData: FormData = {
  senderName: '',
  senderEmail: '',
  senderPhone: '',
  recipientName: '',
  recipientRank: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  stateOrApo: '',
  zipCode: '',
  country: '',
  addressType: 'apo_fpo',
  packageType: '',
  personalMessage: '',
  notifySender: true,
};

const packageOptions = [
  { value: 'bundle-taste', label: 'Taste of Home ($25) - 1 pack' },
  { value: 'bundle-care', label: 'Texas Care Package ($45) - 2 packs + extras' },
  { value: 'bundle-squad', label: 'Squad Pack ($75) - 4 packs + extras' },
  { value: 'bundle-platoon', label: 'Platoon Special (Custom) - Contact for quote' },
];

const rankOptions = [
  'E-1 to E-4',
  'E-5 to E-9',
  'O-1 to O-3',
  'O-4 to O-6',
  'O-7+',
  'Warrant Officer',
  'Civilian/Contractor',
  'Prefer not to say',
];

export function GiftForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/care-package-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'military-care-packages',
          campaign: 'military',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      setIsSubmitted(true);
      setFormData(initialFormData);
    } catch (err) {
      console.error('Gift form error:', err);
      setError('There was an error submitting your order. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
        <CheckCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-charcoal-950 mb-2">Thank You for Your Order!</h3>
        <p className="text-charcoal-700 mb-6">
          We&apos;ve received your care package order. You&apos;ll receive an email confirmation shortly
          with tracking information once your package ships.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
        >
          Send another care package
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Your Information */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Gift className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-charcoal-950">Your Information (Sender)</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="senderName" className="block text-sm font-medium text-charcoal-950 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="senderName"
              name="senderName"
              value={formData.senderName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="senderEmail" className="block text-sm font-medium text-charcoal-950 mb-2">
              Your Email *
            </label>
            <input
              type="email"
              id="senderEmail"
              name="senderEmail"
              value={formData.senderEmail}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="senderPhone" className="block text-sm font-medium text-charcoal-950 mb-2">
              Your Phone (Optional)
            </label>
            <input
              type="tel"
              id="senderPhone"
              name="senderPhone"
              value={formData.senderPhone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>
      </div>

      {/* Recipient Information */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-charcoal-950">Recipient Information</h3>
        </div>

        {/* Address Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-charcoal-950 mb-3">
            Address Type *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              formData.addressType === 'apo_fpo' ? 'border-blue-500 bg-blue-50' : 'border-charcoal-200'
            }`}>
              <input
                type="radio"
                name="addressType"
                value="apo_fpo"
                checked={formData.addressType === 'apo_fpo'}
                onChange={handleChange}
                className="sr-only"
              />
              <div>
                <p className="font-medium text-charcoal-950">APO/FPO/DPO</p>
                <p className="text-sm text-charcoal-600">Military Mail (Best rates)</p>
              </div>
            </label>

            <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              formData.addressType === 'international' ? 'border-blue-500 bg-blue-50' : 'border-charcoal-200'
            }`}>
              <input
                type="radio"
                name="addressType"
                value="international"
                checked={formData.addressType === 'international'}
                onChange={handleChange}
                className="sr-only"
              />
              <div>
                <p className="font-medium text-charcoal-950">International</p>
                <p className="text-sm text-charcoal-600">Non-APO addresses abroad</p>
              </div>
            </label>

            <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              formData.addressType === 'domestic' ? 'border-blue-500 bg-blue-50' : 'border-charcoal-200'
            }`}>
              <input
                type="radio"
                name="addressType"
                value="domestic"
                checked={formData.addressType === 'domestic'}
                onChange={handleChange}
                className="sr-only"
              />
              <div>
                <p className="font-medium text-charcoal-950">US Base</p>
                <p className="text-sm text-charcoal-600">Non-Texas US address</p>
              </div>
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="recipientName" className="block text-sm font-medium text-charcoal-950 mb-2">
              Recipient Name *
            </label>
            <input
              type="text"
              id="recipientName"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Service member's full name"
            />
          </div>

          <div>
            <label htmlFor="recipientRank" className="block text-sm font-medium text-charcoal-950 mb-2">
              Rank (Optional)
            </label>
            <select
              id="recipientRank"
              name="recipientRank"
              value={formData.recipientRank}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">Select rank (optional)</option>
              {rankOptions.map((rank) => (
                <option key={rank} value={rank}>
                  {rank}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="addressLine1" className="block text-sm font-medium text-charcoal-950 mb-2">
              Address Line 1 *
            </label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={formData.addressType === 'apo_fpo' ? 'e.g., Unit 1234 Box 5678' : 'Street address'}
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="addressLine2" className="block text-sm font-medium text-charcoal-950 mb-2">
              Address Line 2
            </label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Apt, suite, unit, etc. (optional)"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-charcoal-950 mb-2">
              {formData.addressType === 'apo_fpo' ? 'APO/FPO/DPO *' : 'City *'}
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={formData.addressType === 'apo_fpo' ? 'APO, FPO, or DPO' : 'City'}
            />
          </div>

          <div>
            <label htmlFor="stateOrApo" className="block text-sm font-medium text-charcoal-950 mb-2">
              {formData.addressType === 'apo_fpo' ? 'AA/AE/AP *' : 'State/Province *'}
            </label>
            <input
              type="text"
              id="stateOrApo"
              name="stateOrApo"
              value={formData.stateOrApo}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={formData.addressType === 'apo_fpo' ? 'AA, AE, or AP' : 'State or Province'}
            />
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-charcoal-950 mb-2">
              ZIP/Postal Code *
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="ZIP or Postal Code"
            />
          </div>

          {formData.addressType === 'international' && (
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-charcoal-950 mb-2">
                Country *
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required={formData.addressType === 'international'}
                className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Country"
              />
            </div>
          )}
        </div>
      </div>

      {/* Package Selection */}
      <div className="mb-8">
        <label htmlFor="packageType" className="block text-sm font-medium text-charcoal-950 mb-2">
          Care Package Type *
        </label>
        <select
          id="packageType"
          name="packageType"
          value={formData.packageType}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="">Select a care package</option>
          {packageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Personal Message */}
      <div className="mb-6">
        <label htmlFor="personalMessage" className="block text-sm font-medium text-charcoal-950 mb-2">
          Personal Message (Optional)
        </label>
        <textarea
          id="personalMessage"
          name="personalMessage"
          value={formData.personalMessage}
          onChange={handleChange}
          rows={4}
          maxLength={500}
          className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Add a personal note to include with the care package (max 500 characters)"
        />
        <p className="text-sm text-charcoal-500 mt-1">
          {formData.personalMessage.length}/500 characters
        </p>
      </div>

      {/* Notification Preference */}
      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="notifySender"
            checked={formData.notifySender}
            onChange={handleChange}
            className="w-5 h-5 text-blue-600 border-charcoal-300 rounded focus:ring-blue-500"
          />
          <span className="text-charcoal-700">
            Email me when the package is delivered
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold transition-colors disabled:bg-charcoal-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Care Package
            </>
          )}
        </button>
      </div>

      <p className="mt-4 text-sm text-charcoal-600">
        * Required fields. You&apos;ll receive an order confirmation and tracking info via email.
      </p>
    </form>
  );
}
