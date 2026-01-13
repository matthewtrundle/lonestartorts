/**
 * Drip Campaign Enrollment Cron Job
 *
 * Runs daily at 10 AM to enroll new spin-to-win leads into the drip campaign.
 * Only enrolls leads who:
 * - Have NOT converted (used their spin prize)
 * - Are NOT already enrolled in a drip campaign
 * - Were created more than 24 hours ago (give them time to convert organically)
 *
 * Schedule: 0 10 * * * (10 AM daily)
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Verify request is from Vercel Cron (or allow in development)
function isAuthorized(req: NextRequest): boolean {
  // In development, allow all requests
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  // Check for Vercel cron authorization header
  const authHeader = req.headers.get('authorization');
  if (authHeader === `Bearer ${process.env.CRON_SECRET}`) {
    return true;
  }

  // Also check for Vercel's cron verification
  const cronSecret = req.headers.get('x-vercel-cron-secret');
  if (cronSecret === process.env.CRON_SECRET) {
    return true;
  }

  return false;
}

export async function GET(req: NextRequest) {
  // Verify authorization
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Calculate 24 hours ago
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    // Find spin wheel entries that:
    // 1. Are NOT converted (used = false)
    // 2. Are NOT already in a drip campaign
    // 3. Were created more than 24 hours ago
    const eligibleLeads = await prisma.spinWheelEntry.findMany({
      where: {
        used: false,
        createdAt: {
          lt: twentyFourHoursAgo,
        },
        dripCampaign: null, // Not already enrolled
      },
      select: {
        id: true,
        email: true,
        prize: true,
        createdAt: true,
      },
    });

    if (eligibleLeads.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No new leads to enroll',
        enrolled: 0,
      });
    }

    // Enroll each lead into the drip campaign
    const enrollmentResults = await Promise.allSettled(
      eligibleLeads.map(async (lead) => {
        return prisma.dripCampaignProgress.create({
          data: {
            spinWheelEntryId: lead.id,
            email: lead.email.toLowerCase(),
            status: 'ACTIVE',
            currentStep: 1,
            nextEmailDueAt: new Date(), // Send first email immediately
            enrolledAt: new Date(),
          },
        });
      })
    );

    // Count successes and failures
    const enrolled = enrollmentResults.filter((r) => r.status === 'fulfilled').length;
    const failed = enrollmentResults.filter((r) => r.status === 'rejected').length;

    // Log any failures
    enrollmentResults.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(
          `Failed to enroll lead ${eligibleLeads[index].email}:`,
          result.reason
        );
      }
    });

    console.log(`Drip enrollment completed: ${enrolled} enrolled, ${failed} failed`);

    return NextResponse.json({
      success: true,
      message: `Enrolled ${enrolled} leads into drip campaign`,
      enrolled,
      failed,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Drip enrollment cron error:', error);
    return NextResponse.json(
      { error: 'Failed to process drip enrollments' },
      { status: 500 }
    );
  }
}

// Also support POST for manual triggering from admin
export async function POST(req: NextRequest) {
  return GET(req);
}
