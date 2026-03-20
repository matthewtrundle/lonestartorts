import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/customer-auth';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ error: 'Token and password are required' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    // Find customer with this reset token
    const customers = await prisma.customer.findMany({
      where: {
        privateMetadata: {
          path: ['resetToken'],
          equals: token,
        },
      },
    });

    if (customers.length === 0) {
      return NextResponse.json({ error: 'Invalid or expired reset link' }, { status: 400 });
    }

    const customer = customers[0];
    const metadata = (customer.privateMetadata as Record<string, unknown>) || {};
    const tokenExpires = metadata.resetTokenExpires as string;

    if (!tokenExpires || new Date(tokenExpires) < new Date()) {
      return NextResponse.json({ error: 'Reset link has expired. Please request a new one.' }, { status: 400 });
    }

    // Hash new password and clear reset token
    const passwordHash = await hashPassword(password);
    const { resetToken: _removed, resetTokenExpires: _removedExpires, ...cleanMetadata } = metadata;

    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        passwordHash,
        privateMetadata: cleanMetadata as Record<string, string>,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
