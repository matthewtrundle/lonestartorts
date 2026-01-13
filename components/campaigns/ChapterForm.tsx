'use client';

import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

interface FormData {
  chapterName: string;
  organization: string;
  city: string;
  state: string;
  contactName: string;
  email: string;
  phone: string;
  role: string;
  eventType: string;
  expectedAttendance: string;
  frequency: string;
  message: string;
  discountCode: string;
}

const initialFormData: FormData = {
  chapterName: '',
  organization: '',
  city: '',
  state: '',
  contactName: '',
  email: '',
  phone: '',
  role: '',
  eventType: '',
  expectedAttendance: '',
  frequency: '',
  message: '',
  discountCode: '',
};

const organizationTypes = [
  'Fraternity',
  'Sorority',
  'Alumni Chapter',
  'Professional Organization',
  'Student Organization',
  'Sports Club',
  'Other',
];

const roleOptions = [
  'Chapter President',
  'Social Chair',
  'Event Coordinator',
  'Alumni Relations',
  'House Manager',
  'Member',
  'Other',
];

const eventTypes = [
  'Weekly Chapter Dinner',
  'Watch Party / Game Day',
  'Tailgate',
  'Rush Event',
  'Formal / Semi-Formal',
  'Philanthropy Event',
  'Alumni Gathering',
  'Cookout / BBQ',
  'Other',
];

const attendanceOptions = [
  '10-25 people',
  '25-50 people',
  '50-100 people',
  '100-200 people',
  '200+ people',
  'Not sure yet',
];

const frequencyOptions = [
  'One-time event',
  'Monthly',
  'Bi-weekly',
  'Weekly',
  'Quarterly',
  'Not sure yet',
];

export function ChapterForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/chapter-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'hook-em-tortillas',
          campaign: 'ut-alumni',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit inquiry');
      }

      setIsSubmitted(true);
      setFormData(initialFormData);
    } catch (err) {
      console.error('Chapter form error:', err);
      setError('There was an error submitting your inquiry. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-8 text-center">
        <CheckCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-charcoal-950 mb-2">Hook &apos;em! We Got Your Request.</h3>
        <p className="text-charcoal-700 mb-6">
          We&apos;ll get back to you within 1-2 business days with pricing details for your chapter event.
          In the meantime, feel free to browse our shop for individual orders.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-orange-600 font-medium hover:text-orange-700 transition-colors"
        >
          Submit another inquiry
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

      {/* Chapter Info */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-charcoal-950 mb-4">Chapter Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="chapterName" className="block text-sm font-medium text-charcoal-950 mb-2">
              Chapter Name *
            </label>
            <input
              type="text"
              id="chapterName"
              name="chapterName"
              value={formData.chapterName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="e.g., Alpha Delta Pi - NYC Alumni"
            />
          </div>

          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-charcoal-950 mb-2">
              Organization Type *
            </label>
            <select
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              <option value="">Select organization type</option>
              {organizationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-charcoal-950 mb-2">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="e.g., New York"
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-charcoal-950 mb-2">
              State *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="e.g., NY"
            />
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-charcoal-950 mb-4">Contact Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="contactName" className="block text-sm font-medium text-charcoal-950 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-charcoal-950 mb-2">
              Your Role *
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              <option value="">Select your role</option>
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

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
              required
              className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

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
              className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-charcoal-950 mb-4">Event Details</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="eventType" className="block text-sm font-medium text-charcoal-950 mb-2">
              Event Type *
            </label>
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              <option value="">Select event type</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="expectedAttendance" className="block text-sm font-medium text-charcoal-950 mb-2">
              Expected Attendance *
            </label>
            <select
              id="expectedAttendance"
              name="expectedAttendance"
              value={formData.expectedAttendance}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              <option value="">Select attendance</option>
              {attendanceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="frequency" className="block text-sm font-medium text-charcoal-950 mb-2">
              How Often Do You Need Tortillas? *
            </label>
            <select
              id="frequency"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              <option value="">Select frequency</option>
              {frequencyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Discount Code */}
      <div className="mb-6">
        <label htmlFor="discountCode" className="block text-sm font-medium text-charcoal-950 mb-2">
          Chapter Discount Code (if you have one)
        </label>
        <input
          type="text"
          id="discountCode"
          name="discountCode"
          value={formData.discountCode}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="e.g., PHIDELT-NYC-15"
        />
      </div>

      {/* Message */}
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-charcoal-950 mb-2">
          Additional Details
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
          placeholder="Tell us about your event - date, tortilla preferences, any special requests..."
        />
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-bold transition-colors disabled:bg-charcoal-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Request Chapter Pricing
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
