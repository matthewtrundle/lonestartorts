'use client';

import { useEffect } from 'react';

const COOKIE_NAME = 'lst_attr';
const MAX_AGE_DAYS = 90;

/**
 * Captures first-touch attribution (landing page, referrer, UTM params) in a
 * first-party cookie on the visitor's first pageview. Checkout reads this
 * cookie and threads it through Stripe metadata onto the Order, so we can
 * finally answer "which content/channel do buyers actually come from".
 *
 * Renders nothing; safe to mount once in the root layout.
 */
export function AttributionTracker() {
  useEffect(() => {
    try {
      if (document.cookie.split('; ').some((c) => c.startsWith(`${COOKIE_NAME}=`))) {
        return; // first touch already recorded
      }
      const params = new URLSearchParams(window.location.search);
      const trim = (v: string | null | undefined, max = 180) =>
        v ? v.slice(0, max) : undefined;

      const data = {
        lp: trim(window.location.pathname),
        ref: trim(document.referrer),
        us: trim(params.get('utm_source'), 80),
        um: trim(params.get('utm_medium'), 80),
        uc: trim(params.get('utm_campaign'), 80),
        // gclid presence implies Google Ads even without UTMs
        g: params.has('gclid') ? 1 : undefined,
        ts: Date.now(),
      };

      const value = encodeURIComponent(JSON.stringify(data));
      const maxAge = MAX_AGE_DAYS * 24 * 60 * 60;
      document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${maxAge}; SameSite=Lax${
        window.location.protocol === 'https:' ? '; Secure' : ''
      }`;
    } catch {
      // attribution is best-effort; never break the page
    }
  }, []);

  return null;
}
