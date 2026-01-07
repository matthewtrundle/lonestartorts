import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';

// Prize definitions with weights (must sum to 100)
// Cost-controlled prizes - no huge discounts
const PRIZES = [
  { id: 'ten_percent', name: '10% OFF', description: '10% off your order (up to $10 max)!', weight: 5, type: 'percentage', value: 10, maxValue: 1000 },
  { id: 'free_sauce', name: 'Free Green Sauce', description: 'H-E-B That Green Sauce added to your order!', weight: 8, type: 'product', sku: 'HEB-GREEN-SAUCE' },
  { id: 'free_shipping', name: 'FREE Shipping', description: 'Free shipping on this order!', weight: 22, type: 'free_shipping', value: 0 },
  { id: 'bonus_tortillas', name: '10 Bonus Tortillas', description: '10 extra tortillas added FREE!', weight: 25, type: 'bonus', value: 500 },
  { id: 'five_off', name: '$5 OFF', description: '$5 off your order!', weight: 40, type: 'fixed', value: 500 },
] as const;

type PrizeId = typeof PRIZES[number]['id'];

// Select a random prize based on weights
function selectPrize(): typeof PRIZES[number] {
  const random = Math.random() * 100;
  let cumulative = 0;

  for (const prize of PRIZES) {
    cumulative += prize.weight;
    if (random <= cumulative) {
      return prize;
    }
  }

  // Fallback to last prize (should never happen)
  return PRIZES[PRIZES.length - 1];
}

// Generate unique code: SPIN-{PRIZE}-{UUID}
function generateCode(prizeId: string): string {
  const short = prizeId.toUpperCase().replace('_', '');
  const uuid = randomUUID().slice(0, 8).toUpperCase();
  return `SPIN-${short}-${uuid}`;
}

export async function POST(req: NextRequest) {
  try {
    const { email, utmSource, clientPrizeId } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Validate clientPrizeId if provided (synced with visual wheel)
    const validPrizeIds = PRIZES.map(p => p.id);
    const prizeIdToUse = clientPrizeId && validPrizeIds.includes(clientPrizeId)
      ? clientPrizeId
      : null;

    console.log('Spin API - clientPrizeId:', clientPrizeId, 'valid:', !!prizeIdToUse, 'validIds:', validPrizeIds);

    const normalizedEmail = email.trim().toLowerCase();

    // Check if email has already spun (limit to once per email)
    const existingSpin = await prisma.spinWheelEntry.findFirst({
      where: { email: normalizedEmail },
    });

    if (existingSpin) {
      // Return existing spin if not expired and not used
      if (!existingSpin.used && new Date() < existingSpin.expiresAt) {
        const prize = PRIZES.find(p => p.id === existingSpin.prize);
        return NextResponse.json({
          alreadySpun: true,
          prize: prize ? {
            id: existingSpin.prize,
            name: prize.name,
            description: prize.description,
            code: existingSpin.code,
            expiresAt: existingSpin.expiresAt,
          } : null,
        });
      }

      // Already used or expired
      return NextResponse.json({
        alreadySpun: true,
        expired: new Date() >= existingSpin.expiresAt,
        used: existingSpin.used,
        message: existingSpin.used
          ? 'You already used your spin reward!'
          : 'Your previous spin has expired.',
      });
    }

    // Use client's prize if valid (syncs visual wheel with actual prize)
    // Fall back to random selection if no valid clientPrizeId
    const selectedPrize = prizeIdToUse
      ? PRIZES.find(p => p.id === prizeIdToUse)!
      : selectPrize();
    const code = generateCode(selectedPrize.id);

    console.log('Spin API - Selected prize:', selectedPrize.id, selectedPrize.name, 'usedClientPrize:', !!prizeIdToUse);

    // Prize expires in 15 minutes
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Create spin entry
    const spinEntry = await prisma.spinWheelEntry.create({
      data: {
        email: normalizedEmail,
        prize: selectedPrize.id,
        code,
        expiresAt,
        utmSource: utmSource || 'tiktok',
      },
    });

    console.log('Spin wheel prize awarded:', {
      email: normalizedEmail,
      prize: selectedPrize.id,
      code,
      expiresAt,
    });

    return NextResponse.json({
      success: true,
      prize: {
        id: selectedPrize.id,
        name: selectedPrize.name,
        description: selectedPrize.description,
        type: selectedPrize.type,
        code,
        expiresAt,
        // Include additional info for cart integration
        ...(selectedPrize.type === 'product' && { sku: selectedPrize.sku }),
        ...(selectedPrize.type === 'fixed' && { value: selectedPrize.value }),
        ...(selectedPrize.type === 'percentage' && {
          value: selectedPrize.value,
          maxValue: selectedPrize.maxValue
        }),
      },
    });

  } catch (error) {
    console.error('Spin wheel error:', error);
    return NextResponse.json(
      { error: 'Failed to process spin' },
      { status: 500 }
    );
  }
}

// GET: Validate a spin code
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const spinEntry = await prisma.spinWheelEntry.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!spinEntry) {
      return NextResponse.json({ valid: false, error: 'Invalid code' });
    }

    if (spinEntry.used) {
      return NextResponse.json({ valid: false, error: 'Code already used' });
    }

    if (new Date() >= spinEntry.expiresAt) {
      return NextResponse.json({ valid: false, error: 'Code expired' });
    }

    const prize = PRIZES.find(p => p.id === spinEntry.prize);

    return NextResponse.json({
      valid: true,
      prize: prize ? {
        id: spinEntry.prize,
        name: prize.name,
        description: prize.description,
        type: prize.type,
        ...(prize.type === 'product' && { sku: prize.sku }),
        ...(prize.type === 'fixed' && { value: prize.value }),
        ...(prize.type === 'percentage' && {
          value: prize.value,
          maxValue: prize.maxValue
        }),
      } : null,
      expiresAt: spinEntry.expiresAt,
    });

  } catch (error) {
    console.error('Spin code validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate code' },
      { status: 500 }
    );
  }
}
