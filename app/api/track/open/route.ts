/**
 * Email Open Tracking Endpoint
 *
 * Returns a 1x1 transparent GIF and records the email open.
 * Called via tracking pixel in drip campaign emails.
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 1x1 transparent GIF (43 bytes)
const TRANSPARENT_GIF = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64'
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  // Always return the GIF, even if tracking fails
  const gifResponse = () =>
    new NextResponse(TRANSPARENT_GIF, {
      status: 200,
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

  if (!id || id === 'PLACEHOLDER') {
    return gifResponse();
  }

  try {
    // Update the email log with open timestamp
    // Only update if not already opened (first open wins)
    await prisma.dripEmailLog.updateMany({
      where: {
        id,
        openedAt: null,
      },
      data: {
        openedAt: new Date(),
      },
    });
  } catch (error) {
    // Log but don't fail - tracking is non-critical
    console.error('Failed to track email open:', error);
  }

  return gifResponse();
}
