/**
 * Email Click Tracking Endpoint
 *
 * Records the click and redirects to the destination URL.
 * Called via wrapped links in drip campaign emails.
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lonestartortillas.com';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const url = searchParams.get('url');

  // Default redirect if something goes wrong
  const defaultRedirect = `${baseUrl}/shop`;

  // Decode the URL
  let destinationUrl: string;
  try {
    destinationUrl = url ? decodeURIComponent(url) : defaultRedirect;
  } catch {
    destinationUrl = defaultRedirect;
  }

  // Validate URL is safe (prevent open redirect attacks)
  try {
    const parsed = new URL(destinationUrl);
    // Only allow our domain or common safe domains
    const allowedHosts = [
      'lonestartortillas.com',
      'www.lonestartortillas.com',
      'localhost',
    ];
    if (!allowedHosts.some((host) => parsed.host.endsWith(host))) {
      // If external URL, only allow HTTPS
      if (parsed.protocol !== 'https:') {
        destinationUrl = defaultRedirect;
      }
    }
  } catch {
    destinationUrl = defaultRedirect;
  }

  if (id && id !== 'PLACEHOLDER') {
    try {
      // Update the email log with click timestamp
      // Only update if not already clicked (first click wins)
      await prisma.dripEmailLog.updateMany({
        where: {
          id,
          clickedAt: null,
        },
        data: {
          clickedAt: new Date(),
        },
      });
    } catch (error) {
      // Log but don't fail - tracking is non-critical
      console.error('Failed to track email click:', error);
    }
  }

  // Redirect to destination
  return NextResponse.redirect(destinationUrl, { status: 302 });
}
