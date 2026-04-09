import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createDiscountCode } from '@/lib/discount-engine';

/**
 * Generate a unique referral code in the format REF-XXXX
 */
function generateReferralCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no I, O, 0, 1 to avoid confusion
  let code = 'REF-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * POST /api/referral — Generate a referral code for a customer
 * Body: { email: string, name: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if this email already has a referral code
    const existing = await prisma.referral.findFirst({
      where: {
        referrerEmail: normalizedEmail,
        refereeEmail: null, // Find their unused/template referral
      },
      orderBy: { createdAt: 'desc' },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        referralCode: existing.referralCode,
        message: 'Your referral code is ready to share!',
      });
    }

    // Generate a unique code with retry
    let referralCode = generateReferralCode();
    let attempts = 0;
    while (attempts < 5) {
      const duplicate = await prisma.referral.findUnique({
        where: { referralCode },
      });
      if (!duplicate) break;
      referralCode = generateReferralCode();
      attempts++;
    }

    // Create the referral record
    const referral = await prisma.referral.create({
      data: {
        referrerEmail: normalizedEmail,
        referrerName: name.trim(),
        referralCode,
      },
    });

    // Create a corresponding DiscountCode so the referral code works in the existing discount system
    await createDiscountCode({
      code: referralCode,
      name: `Referral from ${name.trim()}`,
      description: 'Give $10, Get $10 — Referral discount',
      source: 'REFERRAL',
      isActive: true,
      maxUsageTotal: 1,
      maxUsagePerEmail: 1,
      firstOrderOnly: true,
      rules: [
        {
          type: 'FIXED_AMOUNT',
          value: 1000, // $10 off in cents
          priority: 0,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      referralCode: referral.referralCode,
      message: 'Your referral code is ready to share!',
    });
  } catch (error) {
    console.error('Referral code generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate referral code' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/referral?email=... — Look up referral stats for an email
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Get all referrals created by this email
    const referrals = await prisma.referral.findMany({
      where: { referrerEmail: normalizedEmail },
      orderBy: { createdAt: 'desc' },
    });

    // The first referral (template) has their code
    const referralCode = referrals.length > 0 ? referrals[0].referralCode : null;

    // Count how many have been used (refereeEmail is filled)
    const totalReferred = referrals.filter(r => r.refereeEmail !== null).length;
    const rewardsClaimed = referrals.filter(r => r.rewardClaimed).length;
    const totalRewardsEarned = rewardsClaimed * 1000; // $10 each in cents

    return NextResponse.json({
      success: true,
      stats: {
        referralCode,
        totalReferred,
        rewardsClaimed,
        totalRewardsEarned,
        referrals: referrals.map(r => ({
          refereeEmail: r.refereeEmail
            ? r.refereeEmail.replace(/(.{2}).*(@.*)/, '$1***$2') // Mask email
            : null,
          rewardClaimed: r.rewardClaimed,
          createdAt: r.createdAt,
        })),
      },
    });
  } catch (error) {
    console.error('Referral stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch referral stats' },
      { status: 500 }
    );
  }
}
