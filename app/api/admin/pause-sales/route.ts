import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { randomUUID } from 'crypto';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';
import { cancelSubscriptionImmediately } from '@/lib/subscription/stripe';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const GOODBYE_SUBJECT = "We're taking a short break — your subscription is cancelled";

function goodbyeHtml(name: string | null): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #f97316;">We're taking a short break</h1>
      <p style="font-size: 16px; color: #555; line-height: 1.6;">Hi${name ? ` ${name}` : ''},</p>
      <p style="font-size: 16px; color: #555; line-height: 1.6;">
        Lonestar Tortillas is pausing orders for the next couple of months. Your subscription has been
        cancelled and <strong>you will not be charged again</strong>.
      </p>
      <p style="font-size: 16px; color: #555; line-height: 1.6;">
        Thank you so much for being a subscriber — it means the world to a small Texas business.
        We've added you to our comeback list, so you'll be the <strong>first to know</strong> the moment
        we're back and shipping tortillas again.
      </p>
      <p style="font-size: 16px; color: #555; line-height: 1.6;">
        Until then, our <a href="https://lonestartortillas.com/recipes" style="color: #f97316;">recipes</a>
        and <a href="https://lonestartortillas.com/guides" style="color: #f97316;">tortilla guides</a> aren't going anywhere.
      </p>
      <p style="font-size: 16px; color: #555; line-height: 1.6;">— The Lonestar Tortillas team</p>
    </div>
  `;
}

interface GroupResult {
  cancelled: number;
  emailed: number;
  errors: string[];
}

async function addToComebackList(email: string, name: string | null): Promise<string | null> {
  try {
    const entry = await prisma.waitlistEntry.upsert({
      where: { email: email.toLowerCase() },
      update: { updatedAt: new Date() },
      create: {
        id: randomUUID(),
        email: email.toLowerCase(),
        name,
        source: 'pause-cancel',
        updatedAt: new Date(),
      },
    });
    return entry.id;
  } catch (error) {
    console.error(`Failed to add ${email} to waitlist:`, error);
    return null;
  }
}

async function sendGoodbye(email: string, name: string | null, waitlistEntryId: string | null): Promise<boolean> {
  if (!resend) return false;
  try {
    await resend.emails.send({
      from: 'Lonestar Tortillas <noreply@lonestartortillas.com>',
      to: email,
      subject: GOODBYE_SUBJECT,
      html: goodbyeHtml(name),
    });
    if (waitlistEntryId) {
      await prisma.emailLog.create({
        data: {
          id: randomUUID(),
          waitlistEntryId,
          type: 'UPDATE',
          subject: GOODBYE_SUBJECT,
          status: 'SENT',
          sentAt: new Date(),
        },
      });
    }
    return true;
  } catch (error) {
    console.error(`Failed to send goodbye email to ${email}:`, error);
    return false;
  }
}

export async function POST() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const retail: GroupResult = { cancelled: 0, emailed: 0, errors: [] };
  const wholesale: GroupResult = { cancelled: 0, emailed: 0, errors: [] };

  // --- Retail subscriptions ---
  const retailSubs = await prisma.retailSubscription.findMany({
    where: { status: { not: 'CANCELLED' } },
    include: { customer: { select: { email: true, firstName: true } } },
  });

  for (const sub of retailSubs) {
    try {
      if (sub.stripeSubscriptionId) {
        try {
          await cancelSubscriptionImmediately(sub.stripeSubscriptionId);
        } catch (err) {
          // Already cancelled in Stripe is fine; anything else is a real error
          const message = err instanceof Error ? err.message : String(err);
          if (!message.includes('canceled')) throw err;
        }
      }
      await prisma.retailSubscription.update({
        where: { id: sub.id },
        data: { status: 'CANCELLED', cancelledAt: new Date() },
      });
      retail.cancelled++;

      const email = sub.customer?.email;
      if (email) {
        const waitlistEntryId = await addToComebackList(email, sub.customer?.firstName ?? null);
        if (await sendGoodbye(email, sub.customer?.firstName ?? null, waitlistEntryId)) {
          retail.emailed++;
        }
      }
    } catch (error) {
      retail.errors.push(
        `Retail ${sub.id}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  // --- Wholesale subscriptions ---
  const wholesaleSubs = await prisma.wholesaleSubscription.findMany({
    where: { status: { not: 'CANCELLED' } },
  });

  for (const sub of wholesaleSubs) {
    try {
      if (sub.stripeSubscriptionId) {
        try {
          await cancelSubscriptionImmediately(sub.stripeSubscriptionId);
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          if (!message.includes('canceled')) throw err;
        }
      }
      await prisma.wholesaleSubscription.update({
        where: { id: sub.id },
        data: { status: 'CANCELLED', cancelledAt: new Date() },
      });
      wholesale.cancelled++;

      const client = await prisma.wholesaleClient.findUnique({
        where: { id: sub.clientId },
        select: { email: true, contactName: true },
      });
      if (client?.email) {
        const waitlistEntryId = await addToComebackList(client.email, client.contactName);
        if (await sendGoodbye(client.email, client.contactName, waitlistEntryId)) {
          wholesale.emailed++;
        }
      }
    } catch (error) {
      wholesale.errors.push(
        `Wholesale ${sub.id}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  return NextResponse.json({ retail, wholesale });
}
