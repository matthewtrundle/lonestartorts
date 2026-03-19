import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

const COOKIE_NAME = 'customer_auth';
const TOKEN_MAX_AGE = 30 * 24 * 60 * 60; // 30 days for customers (longer than admin 24h)

interface CustomerToken {
  customerId: string;
  email: string;
  timestamp: number;
}

export function createCustomerToken(customerId: string, email: string): string {
  const payload: CustomerToken = { customerId, email, timestamp: Date.now() };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

export function validateCustomerToken(token: string): CustomerToken | null {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString()) as CustomerToken;
    const age = (Date.now() - payload.timestamp) / 1000;
    if (age > TOKEN_MAX_AGE) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getAuthenticatedCustomer() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = validateCustomerToken(token);
  if (!payload) return null;

  const customer = await prisma.customer.findUnique({
    where: { id: payload.customerId },
    include: {
      RetailSubscription: true,
      Order: { orderBy: { createdAt: 'desc' }, take: 10 },
      Address: true,
    },
  });

  return customer;
}

export async function setCustomerAuthCookie(customerId: string, email: string) {
  const token = createCustomerToken(customerId, email);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: TOKEN_MAX_AGE,
    path: '/',
  });
}

export async function clearCustomerAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
