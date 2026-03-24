/**
 * Freshness First Shipping Schedule
 *
 * Single source of truth for all shipping logic.
 * We ship Tuesday only with a Monday 9:00 PM CT cutoff.
 */

/** Tuesday=2 */
export const SHIPPING_DAYS = [2] as const;
/** Cutoff is the evening BEFORE ship day: Monday=1 at 9 PM (21:00) */
export const CUTOFF_DAY = 1; // Monday (day before Tuesday)
export const CUTOFF_HOUR = 21; // 9 PM
export const TIMEZONE = 'America/Chicago';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Convert a Date to Central Time components */
export function getCentralTime(now: Date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const parts = formatter.formatToParts(now);
  const get = (type: string) => parseInt(parts.find((p) => p.type === type)?.value ?? '0', 10);
  return {
    year: get('year'),
    month: get('month'),
    day: get('day'),
    hour: get('hour') === 24 ? 0 : get('hour'),
    minute: get('minute'),
    second: get('second'),
    dayOfWeek: new Date(
      `${parts.find((p) => p.type === 'year')?.value}-${parts.find((p) => p.type === 'month')?.value}-${parts.find((p) => p.type === 'day')?.value}T12:00:00`
    ).getDay(),
  };
}

/** Is the given day of week a ship day? (Mon=1, Tue=2, Wed=3) */
export function isShipDay(dayOfWeek: number): boolean {
  return (SHIPPING_DAYS as readonly number[]).includes(dayOfWeek);
}

/** Is it before the Monday 9 PM CT cutoff right now? */
export function isBeforeCutoff(now: Date = new Date()): boolean {
  const ct = getCentralTime(now);
  return ct.dayOfWeek === CUTOFF_DAY && ct.hour < CUTOFF_HOUR;
}

/** Get the next ship date from a given time */
export function getNextShipDate(now: Date = new Date()): Date {
  const ct = getCentralTime(now);
  const todayDow = ct.dayOfWeek;

  // If it's cutoff day (Monday) and before cutoff (9 PM), ships tomorrow (Tuesday)
  if (todayDow === CUTOFF_DAY && ct.hour < CUTOFF_HOUR) {
    const shipDate = new Date(ct.year, ct.month - 1, ct.day);
    shipDate.setDate(shipDate.getDate() + 1); // Tomorrow = Tuesday
    return shipDate;
  }

  // Otherwise find the next ship day (next Tuesday)
  let daysToAdd = 1;
  for (let i = 1; i <= 7; i++) {
    const nextDow = (todayDow + i) % 7;
    if (isShipDay(nextDow)) {
      daysToAdd = i;
      break;
    }
  }

  const shipDate = new Date(ct.year, ct.month - 1, ct.day);
  shipDate.setDate(shipDate.getDate() + daysToAdd);
  return shipDate;
}

/** Format a date as "Monday, Feb 24" */
export function formatShipDate(date: Date): string {
  const dow = DAY_NAMES[date.getDay()];
  const month = MONTH_NAMES[date.getMonth()].slice(0, 3);
  const day = date.getDate();
  return `${dow}, ${month} ${day}`;
}

/** Get a formatted string of the next ship date */
export function getShipDateDisplay(now: Date = new Date()): string {
  return formatShipDate(getNextShipDate(now));
}

/** Get time remaining until Monday 9 PM CT cutoff. Returns null if not cutoff day or past cutoff. */
export function getTimeUntilCutoff(now: Date = new Date()): { hours: number; minutes: number; seconds: number } | null {
  const ct = getCentralTime(now);
  if (ct.dayOfWeek !== CUTOFF_DAY || ct.hour >= CUTOFF_HOUR) {
    return null;
  }
  const totalSeconds = (CUTOFF_HOUR * 3600) - (ct.hour * 3600 + ct.minute * 60 + ct.second);
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export type ShippingMessageType = 'ships-today' | 'ships-tomorrow' | 'ships-next-shipday';

export interface ShippingMessage {
  type: ShippingMessageType;
  headline: string;
  subtext: string;
  shipDate: Date;
  shipDateFormatted: string;
}

/** Get the full shipping message for display */
export function getShippingMessage(now: Date = new Date()): ShippingMessage {
  const ct = getCentralTime(now);
  const todayDow = ct.dayOfWeek;
  const shipDate = getNextShipDate(now);
  const shipDateFormatted = formatShipDate(shipDate);

  // Cutoff day (Monday) before 9 PM — order now to ship tomorrow!
  if (todayDow === CUTOFF_DAY && ct.hour < CUTOFF_HOUR) {
    return {
      type: 'ships-today',
      headline: `Freshness First — Ships Tomorrow!`,
      subtext: `Order by 9 PM CT tonight to ship tomorrow`,
      shipDate,
      shipDateFormatted,
    };
  }

  // Ships next Tuesday
  return {
    type: 'ships-next-shipday',
    headline: `Freshness First — Ships ${shipDateFormatted}`,
    subtext: `We ship Tuesdays for maximum freshness`,
    shipDate,
    shipDateFormatted,
  };
}

/** Static info for shipping/FAQ pages */
export function getShippingScheduleInfo() {
  return {
    shipDays: 'Tuesday',
    cutoffTime: '9:00 PM CT Monday',
    deliveryTime: '2–3 business days after shipping',
    scheduleDescription:
      'We ship on Tuesdays so your tortillas spend the fewest days in transit. No weekend warehouse sitting — just fresh Texas tortillas, delivered fast.',
    schedule: [
      { day: 'Monday', canShip: false, note: 'Order by 9 PM CT to ship Tuesday' },
      { day: 'Tuesday', canShip: true, note: 'Ship day' },
      { day: 'Wednesday', canShip: false, note: 'Orders ship next Tuesday' },
      { day: 'Thursday', canShip: false, note: 'Orders ship next Tuesday' },
      { day: 'Friday', canShip: false, note: 'Orders ship next Tuesday' },
      { day: 'Saturday', canShip: false, note: 'Orders ship next Tuesday' },
      { day: 'Sunday', canShip: false, note: 'Orders ship Tuesday' },
    ],
  };
}
