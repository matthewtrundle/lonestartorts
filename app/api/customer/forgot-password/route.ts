import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendPasswordResetEmail } from '@/lib/email';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { email: rawEmail } = await request.json();

    if (!rawEmail) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const email = rawEmail.toLowerCase().trim();

    // Always return success to prevent email enumeration
    const customer = await prisma.customer.findUnique({ where: { email } });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const customerAny = customer as any;
    if (customer && customerAny.passwordHash) {
      // Generate a secure reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      // Store token in privateMetadata
      const metadata = (customer.privateMetadata as Record<string, unknown>) || {};
      await prisma.customer.update({
        where: { id: customer.id },
        data: {
          privateMetadata: {
            ...metadata,
            resetToken,
            resetTokenExpires: resetExpires.toISOString(),
          } as Record<string, string>,
          updatedAt: new Date(),
        },
      });

      // Send reset email
      await sendPasswordResetEmail({
        to: email,
        customerName: customer.firstName || 'there',
        resetToken,
      });
    }

    // Always return success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
