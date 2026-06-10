'use client';

import { useId, useState } from 'react';
import { validateAddress } from '@/lib/address-validation';
import type { AddressFields, AddressFieldErrors } from '@/lib/address-validation';

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID',
  'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
  'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA',
  'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];

const EMPTY_ADDRESS: AddressFields = {
  firstName: '',
  lastName: '',
  street: '',
  street2: '',
  city: '',
  state: 'TX',
  zip: '',
  phone: '',
};

function inputClass(hasError: boolean): string {
  return `w-full px-4 py-2.5 border rounded-lg bg-white text-charcoal-950 placeholder:text-charcoal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sunset-500 focus:border-sunset-500 ${
    hasError ? 'border-red-400' : 'border-charcoal-300'
  }`;
}

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  optional?: boolean;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  maxLength?: number;
}

function TextField({
  id,
  label,
  value,
  onChange,
  error,
  optional,
  type = 'text',
  autoComplete,
  placeholder,
  maxLength,
}: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-charcoal-700 mb-1">
        {label}
        {optional && <span className="text-charcoal-400 font-normal"> (optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass(!!error)}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

interface AddressFormProps {
  initial?: Partial<AddressFields> | null;
  submitLabel?: string;
  loading?: boolean;
  onSubmit: (address: AddressFields) => void | Promise<void>;
  onCancel?: () => void;
}

export default function AddressForm({
  initial,
  submitLabel = 'Save Address',
  loading = false,
  onSubmit,
  onCancel,
}: AddressFormProps) {
  const uid = useId();
  const [fields, setFields] = useState<AddressFields>({ ...EMPTY_ADDRESS, ...initial });
  const [errors, setErrors] = useState<AddressFieldErrors>({});

  const setField = (key: keyof AddressFields) => (value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { data, errors: fieldErrors } = validateAddress({ ...fields });
    if (!data) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    void onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <TextField
          id={`${uid}-first-name`}
          label="First Name"
          value={fields.firstName}
          onChange={setField('firstName')}
          error={errors.firstName}
          autoComplete="given-name"
        />
        <TextField
          id={`${uid}-last-name`}
          label="Last Name"
          value={fields.lastName}
          onChange={setField('lastName')}
          error={errors.lastName}
          autoComplete="family-name"
        />
      </div>
      <TextField
        id={`${uid}-street`}
        label="Street Address"
        value={fields.street}
        onChange={setField('street')}
        error={errors.street}
        autoComplete="address-line1"
        placeholder="1234 Bluebonnet Ln"
      />
      <TextField
        id={`${uid}-street2`}
        label="Apt / Suite"
        value={fields.street2}
        onChange={setField('street2')}
        error={errors.street2}
        optional
        autoComplete="address-line2"
      />
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2">
          <TextField
            id={`${uid}-city`}
            label="City"
            value={fields.city}
            onChange={setField('city')}
            error={errors.city}
            autoComplete="address-level2"
          />
        </div>
        <div>
          <label htmlFor={`${uid}-state`} className="block text-sm font-medium text-charcoal-700 mb-1">
            State
          </label>
          <select
            id={`${uid}-state`}
            value={fields.state}
            onChange={(e) => setField('state')(e.target.value)}
            autoComplete="address-level1"
            aria-invalid={errors.state ? true : undefined}
            aria-describedby={errors.state ? `${uid}-state-error` : undefined}
            className={inputClass(!!errors.state)}
          >
            {US_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.state && (
            <p id={`${uid}-state-error`} role="alert" className="mt-1 text-xs text-red-600">
              {errors.state}
            </p>
          )}
        </div>
        <TextField
          id={`${uid}-zip`}
          label="ZIP"
          value={fields.zip}
          onChange={setField('zip')}
          error={errors.zip}
          autoComplete="postal-code"
          placeholder="78701"
          maxLength={10}
        />
      </div>
      <TextField
        id={`${uid}-phone`}
        label="Phone"
        value={fields.phone}
        onChange={setField('phone')}
        error={errors.phone}
        optional
        type="tel"
        autoComplete="tel"
        placeholder="(512) 555-0123"
      />

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={loading}
          aria-busy={loading || undefined}
          className="px-6 py-3 bg-sunset-600 text-white rounded-lg font-semibold hover:bg-sunset-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-sunset-500 focus-visible:ring-offset-2"
        >
          {loading ? 'Saving...' : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-3 text-sm font-medium text-charcoal-600 hover:text-charcoal-800 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sunset-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
