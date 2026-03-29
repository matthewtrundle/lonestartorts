import { NextRequest, NextResponse } from 'next/server';
import { sendContactFormEmail } from '@/lib/email';
import { captureLeadToCoreLinq } from '@/lib/corelinq';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send the contact form email notification
    const result = await sendContactFormEmail({
      name,
      email,
      subject: subject || 'Website Contact Form',
      message,
    });

    if (!result.success) {
      console.error('Failed to send contact form:', result.error);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }

    // Capture lead to CoreLinq for AI inbox routing (non-blocking)
    const nameParts = name.trim().split(/\s+/);
    captureLeadToCoreLinq({
      email,
      firstName: nameParts[0] || name,
      lastName: nameParts.slice(1).join(' ') || '',
      subject: subject || 'Website Contact Form',
      message,
      leadType: 'contact',
      leadSource: 'contact_form',
    }).catch((err: unknown) => {
      console.error('CoreLinq lead capture failed:', err);
    });

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent! We\'ll get back to you soon.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
