/**
 * Drip Campaign Email Sender Cron Job
 *
 * Runs daily at 11 AM to send drip emails to enrolled leads.
 * For each active campaign with nextEmailDueAt <= NOW:
 * 1. Check if lead has converted (skip if yes)
 * 2. Send the appropriate email for current step
 * 3. Log the email send
 * 4. Update progress (increment step, calculate next due date)
 *
 * Schedule: 0 11 * * * (11 AM daily)
 */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';
import {
  getDripEmailForStep,
  DRIP_SCHEDULE_DAYS,
  type DripEmailData,
} from '@/lib/drip-email-templates';
import { generateDripDiscountCode } from '@/lib/drip-discount';

// Get Resend client
let resendClient: Resend | null = null;
function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lonestartortillas.com';

// Verify request is from Vercel Cron (or allow in development)
function isAuthorized(req: NextRequest): boolean {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  const authHeader = req.headers.get('authorization');
  if (authHeader === `Bearer ${process.env.CRON_SECRET}`) {
    return true;
  }

  const cronSecret = req.headers.get('x-vercel-cron-secret');
  if (cronSecret === process.env.CRON_SECRET) {
    return true;
  }

  return false;
}

// Calculate next email due date based on step and enrollment date
function calculateNextDueDate(enrolledAt: Date, nextStep: number): Date {
  if (nextStep > 6) {
    // No more emails, set far future date
    const farFuture = new Date();
    farFuture.setFullYear(farFuture.getFullYear() + 10);
    return farFuture;
  }

  const daysFromEnrollment = DRIP_SCHEDULE_DAYS[nextStep - 1];
  const nextDue = new Date(enrolledAt);
  nextDue.setDate(nextDue.getDate() + daysFromEnrollment);
  return nextDue;
}

export async function GET(req: NextRequest) {
  // Verify authorization
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const now = new Date();

    // Find active campaigns with emails due
    const dueCampaigns = await prisma.dripCampaignProgress.findMany({
      where: {
        status: 'ACTIVE',
        nextEmailDueAt: {
          lte: now,
        },
      },
      include: {
        spinWheelEntry: true,
      },
      take: 100, // Process up to 100 at a time to avoid timeout
    });

    if (dueCampaigns.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No emails due to send',
        sent: 0,
      });
    }

    const results = {
      sent: 0,
      converted: 0,
      completed: 0,
      failed: 0,
      errors: [] as string[],
    };

    // Process each campaign
    for (const campaign of dueCampaigns) {
      try {
        // Check if lead has converted
        if (campaign.spinWheelEntry.used) {
          await prisma.dripCampaignProgress.update({
            where: { id: campaign.id },
            data: {
              status: 'CONVERTED',
              convertedAt: campaign.spinWheelEntry.usedAt || now,
            },
          });
          results.converted++;
          continue;
        }

        // Get email generator for current step
        const emailGenerator = getDripEmailForStep(campaign.currentStep);
        if (!emailGenerator) {
          // Should never happen, but mark as completed
          await prisma.dripCampaignProgress.update({
            where: { id: campaign.id },
            data: { status: 'COMPLETED' },
          });
          results.completed++;
          continue;
        }

        // Generate discount code for emails 4-6
        let discountCode: string | undefined;
        if (campaign.currentStep >= 4) {
          const discount = generateDripDiscountCode('10OFF');
          discountCode = discount.code;
        }

        // Build email data
        const emailData: DripEmailData = {
          email: campaign.email,
          originalPrize: campaign.spinWheelEntry.prize,
          originalCode: campaign.spinWheelEntry.code,
          discountCode,
          trackingPixelUrl: `${baseUrl}/api/track/open?id=PLACEHOLDER`, // Will update after log created
          unsubscribeUrl: `${baseUrl}/api/unsubscribe?id=${campaign.id}`,
          shopUrl: `${baseUrl}/shop`,
        };

        // Generate email content
        const { subject, html } = emailGenerator(emailData);

        // Create email log first (to get ID for tracking pixel)
        const emailLog = await prisma.dripEmailLog.create({
          data: {
            dripCampaignId: campaign.id,
            emailNumber: campaign.currentStep,
            subject,
            discountCode,
          },
        });

        // Update tracking pixel URL in HTML
        const finalHtml = html.replace('PLACEHOLDER', emailLog.id);

        // Send email via Resend
        const resend = getResendClient();
        const { error: sendError } = await resend.emails.send({
          from: fromEmail,
          to: campaign.email,
          subject,
          html: finalHtml,
        });

        if (sendError) {
          console.error(`Failed to send drip email to ${campaign.email}:`, sendError);
          results.failed++;
          results.errors.push(`${campaign.email}: ${sendError.message}`);

          // Delete the log since email failed
          await prisma.dripEmailLog.delete({ where: { id: emailLog.id } });
          continue;
        }

        // Calculate next step and status
        const nextStep = campaign.currentStep + 1;
        const isComplete = nextStep > 6;

        // Update campaign progress
        await prisma.dripCampaignProgress.update({
          where: { id: campaign.id },
          data: {
            currentStep: nextStep,
            lastEmailSentAt: now,
            nextEmailDueAt: calculateNextDueDate(campaign.enrolledAt, nextStep),
            status: isComplete ? 'COMPLETED' : 'ACTIVE',
          },
        });

        if (isComplete) {
          results.completed++;
        }
        results.sent++;

        console.log(
          `Sent drip email #${campaign.currentStep} to ${campaign.email}`
        );
      } catch (err) {
        console.error(`Error processing campaign ${campaign.id}:`, err);
        results.failed++;
        results.errors.push(
          `Campaign ${campaign.id}: ${err instanceof Error ? err.message : 'Unknown error'}`
        );
      }
    }

    console.log(
      `Drip send completed: ${results.sent} sent, ${results.converted} converted, ${results.completed} completed, ${results.failed} failed`
    );

    return NextResponse.json({
      success: true,
      message: `Processed ${dueCampaigns.length} campaigns`,
      ...results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Drip send cron error:', error);
    return NextResponse.json(
      { error: 'Failed to process drip emails' },
      { status: 500 }
    );
  }
}

// Also support POST for manual triggering
export async function POST(req: NextRequest) {
  return GET(req);
}
