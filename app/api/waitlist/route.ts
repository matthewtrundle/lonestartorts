import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs/promises';
import path from 'path';

// Initialize Resend with API key
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Simple file-based storage for waitlist (in production, use a database)
const WAITLIST_FILE = path.join(process.cwd(), 'waitlist.json');

interface WaitlistEntry {
  email: string;
  name?: string;
  zipCode?: string;
  interests?: {
    corn: boolean;
    butter: boolean;
    flour: boolean;
    variety: boolean;
  };
  expectedQuantity?: string;
  timestamp: string;
  id: string;
}

async function getWaitlist(): Promise<WaitlistEntry[]> {
  try {
    const data = await fs.readFile(WAITLIST_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveWaitlist(waitlist: WaitlistEntry[]) {
  await fs.writeFile(WAITLIST_FILE, JSON.stringify(waitlist, null, 2));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, zipCode, interests, expectedQuantity } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    // Check if already on waitlist
    const waitlist = await getWaitlist();
    const existing = waitlist.find(entry => entry.email.toLowerCase() === email.toLowerCase());

    if (existing) {
      return NextResponse.json({ error: 'You\'re already on the waitlist!' }, { status: 400 });
    }

    // Create new entry
    const newEntry: WaitlistEntry = {
      id: `wl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email,
      name,
      zipCode,
      interests,
      expectedQuantity,
      timestamp: new Date().toISOString(),
    };

    // Add to waitlist
    waitlist.push(newEntry);
    await saveWaitlist(waitlist);

    // Send confirmation email if Resend is configured
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Tortilla Rodeo Co. <noreply@lonestartortilla.com>',
          to: email,
          subject: 'You\'re on the H-E-B® Tortilla Waitlist! 🌮',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #f97316;">Welcome to the Waitlist!</h1>
              <p>Hi${name ? ` ${name}` : ''},</p>
              <p>You're officially on the list! We'll notify you as soon as genuine H-E-B® tortillas are available for order.</p>

              <h2 style="color: #333;">What's Next?</h2>
              <ul>
                <li>📧 Watch your inbox for updates on our launch timeline</li>
                <li>💰 You'll get exclusive early bird pricing as a founding member</li>
                <li>🚀 First access when we go live (limited quantities!)</li>
              </ul>

              <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                Tortilla Rodeo Co. is an independent reseller. Not affiliated with or endorsed by H-E-B®.
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the signup if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist!',
      position: waitlist.length,
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
    // Simple stats endpoint (protect this in production)
    const waitlist = await getWaitlist();

    // Calculate stats
    const stats = {
      total: waitlist.length,
      byProduct: {
        corn: waitlist.filter(e => e.interests?.corn).length,
        butter: waitlist.filter(e => e.interests?.butter).length,
        flour: waitlist.filter(e => e.interests?.flour).length,
        variety: waitlist.filter(e => e.interests?.variety).length,
      },
      byQuantity: waitlist.reduce((acc, entry) => {
        const qty = entry.expectedQuantity || 'unknown';
        acc[qty] = (acc[qty] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      recentSignups: waitlist
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 5)
        .map(e => ({
          timestamp: e.timestamp,
          hasName: !!e.name,
          hasZip: !!e.zipCode,
        })),
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}