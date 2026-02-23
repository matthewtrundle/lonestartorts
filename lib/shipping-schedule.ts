/**
 * Freshness First Shipping Schedule
 *
 * Single source of truth for all shipping logic.
 * We ship Monday, Tuesday, Wednesday only with a 2:00 PM CT cutoff.
 */

/** Monday=1, Tuesday=2, Wednesday=3 */
export const SHIPPING_DAYS = [1, 2, 3] as const;
export const CUTOFF_HOUR = 14; // 2 PM
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

/** Is it before the 2 PM CT cutoff right now? */
export function isBeforeCutoff(now: Date = new Date()): boolean {
  const ct = getCentralTime(now);
  return ct.hour < CUTOFF_HOUR;
}

/** Get the next ship date from a given time */
export function getNextShipDate(now: Date = new Date()): Date {
  const ct = getCentralTime(now);
  const todayDow = ct.dayOfWeek;
  const beforeCutoff = ct.hour < CUTOFF_HOUR;

  // If today is a ship day and before cutoff, ships today
  if (isShipDay(todayDow) && beforeCutoff) {
    return new Date(ct.year, ct.month - 1, ct.day);
  }

  // Otherwise find the next ship day
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

/** Get time remaining until 2 PM CT cutoff. Returns null if not a ship day or past cutoff. */
export function getTimeUntilCutoff(now: Date = new Date()): { hours: number; minutes: number; seconds: number } | null {
  const ct = getCentralTime(now);
  if (!isShipDay(ct.dayOfWeek) || ct.hour >= CUTOFF_HOUR) {
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
  const beforeCutoff = ct.hour < CUTOFF_HOUR;
  const shipDate = getNextShipDate(now);
  const shipDateFormatted = formatShipDate(shipDate);

  // Ships today: it's a ship day and before cutoff
  if (isShipDay(todayDow) && beforeCutoff) {
    return {
      type: 'ships-today',
      headline: `Freshness First — Ships Today!`,
      subtext: `Order by 2 PM CT for same-day shipping`,
      shipDate,
      shipDateFormatted,
    };
  }

  // Ships tomorrow: it's a ship day after cutoff, and tomorrow is also a ship day
  // (Mon after 2PM → Tue, Tue after 2PM → Wed)
  const tomorrowDow = (todayDow + 1) % 7;
  if (isShipDay(todayDow) && !beforeCutoff && isShipDay(tomorrowDow)) {
    return {
      type: 'ships-tomorrow',
      headline: `Freshness First — Ships ${shipDateFormatted}`,
      subtext: `Tomorrow's shipment for maximum freshness`,
      shipDate,
      shipDateFormatted,
    };
  }

  // Ships next ship day (Wed after 2PM, Thu-Sun)
  return {
    type: 'ships-next-shipday',
    headline: `Freshness First — Ships ${shipDateFormatted}`,
    subtext: `We ship Mon–Wed for maximum freshness`,
    shipDate,
    shipDateFormatted,
  };
}

/** Static info for shipping/FAQ pages */
export function getShippingScheduleInfo() {
  return {
    shipDays: 'Monday, Tuesday, and Wednesday',
    cutoffTime: '2:00 PM CT',
    deliveryTime: '2–3 business days after shipping',
    scheduleDescription:
      'We ship Monday through Wednesday so your tortillas spend the fewest days in transit. No weekend warehouse sitting — just fresh Texas tortillas, delivered fast.',
    schedule: [
      { day: 'Monday', canShip: true, note: 'Orders before 2 PM CT ship same day' },
      { day: 'Tuesday', canShip: true, note: 'Orders before 2 PM CT ship same day' },
      { day: 'Wednesday', canShip: true, note: 'Orders before 2 PM CT ship same day' },
      { day: 'Thursday', canShip: false, note: 'Orders ship next Monday' },
      { day: 'Friday', canShip: false, note: 'Orders ship next Monday' },
      { day: 'Saturday', canShip: false, note: 'Orders ship next Monday' },
      { day: 'Sunday', canShip: false, note: 'Orders ship next Monday' },
    ],
  };
}
