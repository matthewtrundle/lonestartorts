import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, setCustomerAuthCookie } from '@/lib/customer-auth';

export async function POST(request: NextRequest) {
  try {
    const { email: rawEmail, password } = await request.json();

    if (!rawEmail || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const email = rawEmail.toLowerCase().trim();
    const customer = await prisma.customer.findUnique({ where: { email } });

    if (!customer || !customer.passwordHash) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const valid = await verifyPassword(password, customer.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    await prisma.customer.update({
      where: { id: customer.id },
      data: { lastLoginAt: new Date(), updatedAt: new Date() },
    });

    await setCustomerAuthCookie(customer.id, customer.email);

    return NextResponse.json({
      customer: {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
