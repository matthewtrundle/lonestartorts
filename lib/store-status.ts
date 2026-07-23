import { unstable_cache } from 'next/cache'
import { prisma } from '@/lib/prisma'

export interface StoreStatus {
  salesPaused: boolean
  pauseMessage: string | null
  /** ISO string; when set to a future date, all ship-date displays and
   *  checkout metadata use this instead of the normal Tuesday schedule. */
  nextShipDate: string | null
  /** Site-wide banner message shown even while sales are live (vacation mode). */
  announcement: string | null
}

export const DEFAULT_PAUSE_MESSAGE =
  "We're taking a short break — back in a couple of months. Leave your email and we'll be in touch the moment we're back."

async function fetchStoreStatus(): Promise<StoreStatus> {
  try {
    const settings = await prisma.storeSettings.findUnique({
      where: { id: 'singleton' },
    })
    // An override in the past is ignored — the schedule falls back to normal
    // Tuesdays automatically once the date passes.
    const override =
      settings?.nextShipDate && settings.nextShipDate.getTime() > Date.now()
        ? settings.nextShipDate.toISOString()
        : null
    return {
      salesPaused: settings?.salesPaused ?? false,
      pauseMessage: settings?.pauseMessage ?? null,
      nextShipDate: override,
      announcement: settings?.announcement ?? null,
    }
  } catch (error) {
    // Fail open: a DB hiccup should never take down the storefront
    console.error('Failed to read store status:', error)
    return { salesPaused: false, pauseMessage: null, nextShipDate: null, announcement: null }
  }
}

// Cached read for layouts, pages, and feeds. The admin toggle busts the
// 'store-status' tag; the 60s TTL is a safety net.
export const getStoreStatus = unstable_cache(fetchStoreStatus, ['store-status'], {
  revalidate: 60,
  tags: ['store-status'],
})

// Direct read for enforcement guards (checkout, subscribe) where staleness
// is unacceptable.
export const getStoreStatusUncached = fetchStoreStatus
