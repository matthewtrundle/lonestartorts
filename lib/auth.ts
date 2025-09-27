import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Hardcoded credentials (in production, use proper auth)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'tortilla2024'; // Change this!
const AUTH_COOKIE_NAME = 'admin_auth';
const AUTH_SECRET = 'super-secret-key-change-me'; // Change this!

export function createAuthToken(): string {
  // Simple token creation (in production, use JWT)
  const timestamp = Date.now();
  const data = `${ADMIN_USERNAME}:${timestamp}`;
  return Buffer.from(data).toString('base64');
}

export function validateAuthToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const [username, timestamp] = decoded.split(':');

    // Check if username matches
    if (username !== ADMIN_USERNAME) return false;

    // Check if token is not older than 24 hours
    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours

    return tokenAge < maxAge;
  } catch {
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME);

  if (!token) return false;

  return validateAuthToken(token.value);
}

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function setAuthCookie(response: NextResponse): void {
  const token = createAuthToken();
  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/'
  });
}

export function clearAuthCookie(response: NextResponse): void {
  response.cookies.delete(AUTH_COOKIE_NAME);
}