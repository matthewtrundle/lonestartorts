import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { compare } from 'bcryptjs';
import { createHmac, timingSafeEqual } from 'crypto';
import { prisma } from '@/lib/prisma';

const AUTH_COOKIE_NAME = 'admin_auth';

function getTokenSecret(): string {
  const secret = process.env.AUTH_TOKEN_SECRET;
  if (!secret && process.env.NODE_ENV === 'production') {
    throw new Error('AUTH_TOKEN_SECRET environment variable is required in production');
  }
  return secret || 'dev-only-fallback-secret-do-not-use-in-production';
}

function signPayload(payload: string): string {
  return createHmac('sha256', getTokenSecret()).update(payload).digest('hex');
}

// Create auth token with user ID and role (HMAC-signed)
export function createAuthToken(userId: string, role: string): string {
  const timestamp = Date.now();
  const payload = JSON.stringify({ userId, role, timestamp });
  const encodedPayload = Buffer.from(payload).toString('base64');
  const signature = signPayload(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

// Validate auth token (verifies HMAC signature)
export function validateAuthToken(token: string): { userId: string; role: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [encodedPayload, providedSignature] = parts;

    // Verify signature using timing-safe comparison
    const expectedSignature = signPayload(encodedPayload);
    const sigBuffer = Buffer.from(providedSignature, 'utf8');
    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');

    if (sigBuffer.length !== expectedBuffer.length) return null;
    if (!timingSafeEqual(sigBuffer, expectedBuffer)) return null;

    // Signature valid — decode payload
    const decoded = Buffer.from(encodedPayload, 'base64').toString();
    const { userId, role, timestamp } = JSON.parse(decoded);

    // Check if token is not older than 24 hours
    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours

    if (tokenAge >= maxAge) return null;

    return { userId, role };
  } catch {
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME);

  if (!token) return false;

  return validateAuthToken(token.value) !== null;
}

// Get current authenticated user
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME);

  if (!token) return null;

  const tokenData = validateAuthToken(token.value);
  if (!tokenData) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: tokenData.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      }
    });

    return user;
  } catch {
    return null;
  }
}

// Validate credentials against database
export async function validateCredentials(email: string, password: string): Promise<{ userId: string; role: string } | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !user.password) {
      return null;
    }

    // Compare password with hashed password
    const isValid = await compare(password, user.password);

    if (!isValid) {
      return null;
    }

    // Check if user has admin privileges
    if (user.role !== 'SUPER_ADMIN' && user.role !== 'ADMIN') {
      return null;
    }

    return {
      userId: user.id,
      role: user.role,
    };
  } catch (error) {
    console.error('Error validating credentials:', error);
    return null;
  }
}

// Set auth cookie
export function setAuthCookie(response: NextResponse, userId: string, role: string): void {
  const token = createAuthToken(userId, role);
  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/'
  });
}

// Clear auth cookie
export function clearAuthCookie(response: NextResponse): void {
  response.cookies.delete(AUTH_COOKIE_NAME);
}

// Check if user has required role
export async function hasRole(requiredRole: 'SUPER_ADMIN' | 'ADMIN' | 'VIEWER'): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  const roleHierarchy = {
    'SUPER_ADMIN': 3,
    'ADMIN': 2,
    'VIEWER': 1,
  };

  return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
}
