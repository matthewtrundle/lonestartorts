/**
 * Drip Campaign Discount Code Generator
 *
 * Generates unique discount codes for drip campaign emails 4-6.
 * Format: DRIP-{TYPE}-{RANDOM}
 */

// Non-ambiguous character set (excludes I, O, 0, 1, l)
const CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

/**
 * Generate a random string of specified length
 */
function generateRandomString(length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return result;
}

export type DripDiscountType = '10OFF' | '5OFF' | 'FREESHIP';

export interface DripDiscount {
  code: string;
  type: DripDiscountType;
  description: string;
  percentOff?: number;
  amountOff?: number; // in cents
  freeShipping?: boolean;
}

/**
 * Generate a drip campaign discount code
 *
 * @param type - Type of discount to generate
 * @returns Discount code and metadata
 */
export function generateDripDiscountCode(type: DripDiscountType = '10OFF'): DripDiscount {
  const randomPart = generateRandomString(6);
  const code = `DRIP-${type}-${randomPart}`;

  switch (type) {
    case '10OFF':
      return {
        code,
        type,
        description: '10% off your order',
        percentOff: 10,
      };
    case '5OFF':
      return {
        code,
        type,
        description: '$5 off your order',
        amountOff: 500, // in cents
      };
    case 'FREESHIP':
      return {
        code,
        type,
        description: 'Free shipping',
        freeShipping: true,
      };
    default:
      return {
        code,
        type: '10OFF',
        description: '10% off your order',
        percentOff: 10,
      };
  }
}

/**
 * Validate if a code is a drip campaign code
 */
export function isDripCode(code: string): boolean {
  return code.startsWith('DRIP-');
}

/**
 * Parse a drip code to extract its type
 */
export function parseDripCode(code: string): DripDiscountType | null {
  if (!isDripCode(code)) return null;

  const parts = code.split('-');
  if (parts.length < 2) return null;

  const type = parts[1] as DripDiscountType;
  if (['10OFF', '5OFF', 'FREESHIP'].includes(type)) {
    return type;
  }

  return null;
}

/**
 * Get discount details from a drip code
 */
export function getDripDiscountDetails(code: string): DripDiscount | null {
  const type = parseDripCode(code);
  if (!type) return null;

  switch (type) {
    case '10OFF':
      return {
        code,
        type,
        description: '10% off your order',
        percentOff: 10,
      };
    case '5OFF':
      return {
        code,
        type,
        description: '$5 off your order',
        amountOff: 500,
      };
    case 'FREESHIP':
      return {
        code,
        type,
        description: 'Free shipping',
        freeShipping: true,
      };
    default:
      return null;
  }
}
