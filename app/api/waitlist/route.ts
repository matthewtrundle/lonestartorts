import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';

// Initialize Resend with API key
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, zipCode, interests, expectedQuantity } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    // Check if already on waitlist
    const existing = await prisma.waitlistEntry.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existing) {
      return NextResponse.json({ error: 'You\'re already on the waitlist!' }, { status: 400 });
    }

    // Get UTM parameters and referrer from headers
    const referer = req.headers.get('referer');
    const url = new URL(req.url);
    const source = url.searchParams.get('utm_source');
    const medium = url.searchParams.get('utm_medium');
    const campaign = url.searchParams.get('utm_campaign');

    // Create new entry in database
    const newEntry = await prisma.waitlistEntry.create({
      data: {
        email: email.toLowerCase(),
        name,
        zipCode,
        interestCorn: interests?.corn || false,
        interestButter: interests?.butter || false,
        interestFlour: interests?.flour || false,
        interestVariety: interests?.variety || false,
        expectedQuantity,
        source,
        medium,
        campaign,
        referrer: referer
      }
    });

    // Get total count for response
    const totalCount = await prisma.waitlistEntry.count();

    // Send confirmation email to user if Resend is configured
    if (resend) {
      try {
        const emailResult = await resend.emails.send({
          from: 'Lonestar Tortillas <noreply@lonestartortillas.com>',
          to: email,
          subject: 'Welcome to Lonestar Tortillas! 🌮',
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #f97316; margin-bottom: 10px;">Thank You for Joining!</h1>
                <p style="font-size: 18px; color: #333;">You're #${totalCount} on the waitlist</p>
              </div>

              <p style="font-size: 16px; color: #555; line-height: 1.6;">Hi${name ? ` ${name}` : ''},</p>

              <p style="font-size: 16px; color: #555; line-height: 1.6;">
                We're so excited to have you on board! Thank you for signing up for H-E-B® tortillas delivered
                nationwide. We can't wait to bring the authentic taste of Texas right to your door.
              </p>

              <p style="font-size: 16px; color: #555; line-height: 1.6;">
                We'll keep you updated every step of the way as we prepare for launch. You'll be the first to
                know when we're ready to take orders, and you'll get exclusive early-bird pricing as a founding member.
              </p>

              <div style="background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 25px 0;">
                <h3 style="margin-top: 0; color: #92400E;">What's Next?</h3>
                <ul style="color: #78350F;">
                  <li>📧 We'll send you updates as we get closer to launch</li>
                  <li>💰 Exclusive early bird pricing just for waitlist members</li>
                  <li>🚀 First access to place orders before anyone else</li>
                  <li>🌟 Founding member status and special perks</li>
                </ul>
              </div>

              ${interests && (interests.corn || interests.butter || interests.flour || interests.variety) ? `
                <div style="margin: 25px 0;">
                  <p style="font-weight: bold; color: #333;">You're interested in:</p>
                  <ul style="color: #555;">
                    ${interests.corn ? '<li>Mi Tienda Corn Tortillas</li>' : ''}
                    ${interests.butter ? '<li>Butter Tortillas</li>' : ''}
                    ${interests.flour ? '<li>Flour Tortillas</li>' : ''}
                    ${interests.variety ? '<li>Variety Pack</li>' : ''}
                  </ul>
                </div>
              ` : ''}

              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
                <p style="font-size: 12px; color: #9CA3AF; text-align: center;">
                  Lonestar Tortillas is an independent reseller.<br>
                  Not affiliated with or endorsed by H-E-B®.
                </p>
              </div>
            </div>
          `,
        });

        // Log email sent
        await prisma.emailLog.create({
          data: {
            waitlistEntryId: newEntry.id,
            type: 'WELCOME',
            subject: 'Welcome to Lonestar Tortillas! 🌮',
            status: 'SENT',
            sentAt: new Date()
          }
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Log email failure
        await prisma.emailLog.create({
          data: {
            waitlistEntryId: newEntry.id,
            type: 'WELCOME',
            subject: 'Welcome to Lonestar Tortillas! 🌮',
            status: 'FAILED',
            error: emailError instanceof Error ? emailError.message : 'Unknown error'
          }
        });
      }

      // Send notification to admin
      if (ADMIN_EMAIL) {
        try {
          await resend.emails.send({
            from: 'Lonestar Tortillas <noreply@lonestartortillas.com>',
            to: ADMIN_EMAIL,
            subject: `New Waitlist Signup: ${email}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>New Waitlist Signup</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 8px; font-weight: bold;">Email:</td>
                    <td style="padding: 8px;">${email}</td>
                  </tr>
                  ${name ? `
                    <tr style="border-bottom: 1px solid #eee;">
                      <td style="padding: 8px; font-weight: bold;">Name:</td>
                      <td style="padding: 8px;">${name}</td>
                    </tr>
                  ` : ''}
                  ${zipCode ? `
                    <tr style="border-bottom: 1px solid #eee;">
                      <td style="padding: 8px; font-weight: bold;">ZIP Code:</td>
                      <td style="padding: 8px;">${zipCode}</td>
                    </tr>
                  ` : ''}
                  <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 8px; font-weight: bold;">Expected Quantity:</td>
                    <td style="padding: 8px;">${expectedQuantity || 'Not specified'}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 8px; font-weight: bold;">Total Signups:</td>
                    <td style="padding: 8px;">${totalCount}</td>
                  </tr>
                  ${source ? `
                    <tr style="border-bottom: 1px solid #eee;">
                      <td style="padding: 8px; font-weight: bold;">Source:</td>
                      <td style="padding: 8px;">${source}${medium ? ` / ${medium}` : ''}${campaign ? ` / ${campaign}` : ''}</td>
                    </tr>
                  ` : ''}
                </table>
              </div>
            `,
          });
        } catch (adminEmailError) {
          console.error('Failed to send admin notification:', adminEmailError);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist!',
      position: totalCount,
    });

  } catch (error) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Check for admin token
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    // Basic auth check (improve this with proper auth later)
    if (token !== process.env.ADMIN_TOKEN && process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get statistics
    const [total, entries] = await Promise.all([
      prisma.waitlistEntry.count(),
      prisma.waitlistEntry.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: {
          id: true,
          email: true,
          name: true,
          zipCode: true,
          interestCorn: true,
          interestButter: true,
          interestFlour: true,
          interestVariety: true,
          expectedQuantity: true,
          createdAt: true,
          source: true,
          medium: true,
          campaign: true
        }
      })
    ]);

    // Calculate product interest stats
    const productStats = await prisma.waitlistEntry.aggregate({
      _count: {
        interestCorn: true,
        interestButter: true,
        interestFlour: true,
        interestVariety: true
      },
      where: {
        OR: [
          { interestCorn: true },
          { interestButter: true },
          { interestFlour: true },
          { interestVariety: true }
        ]
      }
    });

    // Get quantity distribution
    const quantityStats = await prisma.waitlistEntry.groupBy({
      by: ['expectedQuantity'],
      _count: true
    });

    const stats = {
      total,
      recentSignups: entries,
      productInterest: productStats._count,
      quantityDistribution: quantityStats.reduce((acc: Record<string, number>, item: any) => {
        const key = item.expectedQuantity || 'unspecified';
        acc[key] = item._count;
        return acc;
      }, {} as Record<string, number>),
      dailySignups: await getDailySignups()
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}

async function getDailySignups() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const signups = await prisma.waitlistEntry.groupBy({
    by: ['createdAt'],
    where: {
      createdAt: {
        gte: sevenDaysAgo
      }
    },
    _count: true
  });

  // Format by day
  const dailyStats: Record<string, number> = {};
  signups.forEach((signup: any) => {
    const day = signup.createdAt.toISOString().split('T')[0];
    dailyStats[day] = (dailyStats[day] || 0) + signup._count;
  });

  return dailyStats;
}