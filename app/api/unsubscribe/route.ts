/**
 * Unsubscribe Endpoint for Drip Campaigns
 *
 * Handles one-click unsubscribe from drip campaign emails.
 * Marks the campaign as UNSUBSCRIBED and redirects to confirmation page.
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lonestartortillas.com';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.redirect(`${baseUrl}/unsubscribe?status=invalid`, {
      status: 302,
    });
  }

  try {
    // Find the campaign
    const campaign = await prisma.dripCampaignProgress.findUnique({
      where: { id },
      select: { id: true, email: true, status: true },
    });

    if (!campaign) {
      return NextResponse.redirect(`${baseUrl}/unsubscribe?status=not_found`, {
        status: 302,
      });
    }

    // Already unsubscribed
    if (campaign.status === 'UNSUBSCRIBED') {
      return NextResponse.redirect(
        `${baseUrl}/unsubscribe?status=already_unsubscribed`,
        { status: 302 }
      );
    }

    // Mark as unsubscribed
    await prisma.dripCampaignProgress.update({
      where: { id },
      data: {
        status: 'UNSUBSCRIBED',
        unsubscribedAt: new Date(),
      },
    });

    // Redirect to confirmation page
    return NextResponse.redirect(`${baseUrl}/unsubscribe?status=success`, {
      status: 302,
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.redirect(`${baseUrl}/unsubscribe?status=error`, {
      status: 302,
    });
  }
}

// Also support POST for one-click unsubscribe (RFC 8058)
export async function POST(req: NextRequest) {
  return GET(req);
}
