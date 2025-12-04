import { NextRequest, NextResponse } from 'next/server';
import { sendWholesaleInquiryEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { businessName, contactName, email, phone, businessType, estimatedVolume, message } = body;

    // Validate required fields
    if (!businessName || !contactName || !email || !businessType || !estimatedVolume) {
      return NextResponse.json(
        { error: 'Business name, contact name, email, business type, and estimated volume are required' },
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

    // Send the wholesale inquiry email
    const result = await sendWholesaleInquiryEmail({
      businessName,
      contactName,
      email,
      phone: phone || '',
      businessType,
      estimatedVolume,
      message: message || '',
    });

    if (!result.success) {
      console.error('Failed to send wholesale inquiry:', result.error);
      return NextResponse.json(
        { error: 'Failed to submit inquiry. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your wholesale inquiry has been submitted. We\'ll get back to you within 1-2 business days.',
    });
  } catch (error) {
    console.error('Wholesale inquiry error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
