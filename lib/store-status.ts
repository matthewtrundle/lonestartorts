import { unstable_cache } from 'next/cache'
import { prisma } from '@/lib/prisma'

export interface StoreStatus {
  salesPaused: boolean
  pauseMessage: string | null
}

export const DEFAULT_PAUSE_MESSAGE =
  "We're taking a short break — back in a couple of months. Leave your email and we'll be in touch the moment we're back."

async function fetchStoreStatus(): Promise<StoreStatus> {
  try {
    const settings = await prisma.storeSettings.findUnique({
      where: { id: 'singleton' },
    })
    return {
      salesPaused: settings?.salesPaused ?? false,
      pauseMessage: settings?.pauseMessage ?? null,
    }
  } catch (error) {
    // Fail open: a DB hiccup should never take down the storefront
    console.error('Failed to read store status:', error)
    return { salesPaused: false, pauseMessage: null }
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
