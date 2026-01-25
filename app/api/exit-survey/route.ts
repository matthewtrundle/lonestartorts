import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const VALID_REASONS = [
  'price_too_high',
  'shipping_expensive',
  'just_browsing',
  'will_order_later',
  'other',
  'page_close', // Auto-tracked when user closes/navigates away
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      page,
      reason,
      otherText,
      itemCount,
      subtotal,
      shipping,
      total,
      utmSource,
      utmMedium,
      utmCampaign,
      deviceType,
    } = body;

    // Validate required fields
    if (!page || !reason || !VALID_REASONS.includes(reason)) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }

    // Store the response
    const response = await prisma.exitSurveyResponse.create({
      data: {
        page,
        reason,
        otherText: reason === 'other' ? otherText : null,
        itemCount: itemCount || 0,
        subtotal: subtotal || 0,
        shipping: shipping || 0,
        total: total || 0,
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
        deviceType: deviceType || null,
      },
    });

    return NextResponse.json({ success: true, id: response.id });
  } catch (error) {
    console.error('Exit survey error:', error);
    return NextResponse.json(
      { error: 'Failed to save response' },
      { status: 500 }
    );
  }
}
