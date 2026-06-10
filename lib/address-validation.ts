// Shared shipping-address validation used by the /api/customer/address route
// and the client-side AddressForm component.

export interface AddressFields {
  firstName: string;
  lastName: string;
  street: string;
  street2: string; // '' when not provided
  city: string;
  state: string; // 2-letter code, uppercased
  zip: string; // 5-digit or 9-digit (ZIP+4)
  phone: string; // '' when not provided
}

export type AddressFieldErrors = Partial<Record<keyof AddressFields, string>>;

const ZIP_REGEX = /^\d{5}(-?\d{4})?$/;
const STATE_REGEX = /^[A-Za-z]{2}$/;
const MAX_LEN = 120;

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function validateAddress(
  input: Record<string, unknown>
): { data: AddressFields | null; errors: AddressFieldErrors } {
  const errors: AddressFieldErrors = {};

  const firstName = asString(input.firstName);
  const lastName = asString(input.lastName);
  const street = asString(input.street);
  const street2 = asString(input.street2);
  const city = asString(input.city);
  const state = asString(input.state).toUpperCase();
  const zip = asString(input.zip);
  const phone = asString(input.phone);

  if (!firstName) errors.firstName = 'First name is required';
  else if (firstName.length > MAX_LEN) errors.firstName = 'First name is too long';

  if (!lastName) errors.lastName = 'Last name is required';
  else if (lastName.length > MAX_LEN) errors.lastName = 'Last name is too long';

  if (!street) errors.street = 'Street address is required';
  else if (street.length > MAX_LEN) errors.street = 'Street address is too long';

  if (street2.length > MAX_LEN) errors.street2 = 'Apt/suite is too long';

  if (!city) errors.city = 'City is required';
  else if (city.length > MAX_LEN) errors.city = 'City is too long';

  if (!state) errors.state = 'State is required';
  else if (!STATE_REGEX.test(state)) errors.state = 'Use a 2-letter state code';

  if (!zip) errors.zip = 'ZIP code is required';
  else if (!ZIP_REGEX.test(zip)) errors.zip = 'Enter a 5-digit ZIP (or ZIP+4)';

  if (phone) {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 11) {
      errors.phone = 'Enter a valid 10-digit phone number';
    }
  }

  if (Object.keys(errors).length > 0) {
    return { data: null, errors };
  }

  return {
    data: { firstName, lastName, street, street2, city, state, zip, phone },
    errors: {},
  };
}
