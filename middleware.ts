import { NextRequest, NextResponse } from 'next/server';

const AUTH_COOKIE_NAME = 'admin_auth';
const TOKEN_MAX_AGE_MS = 24 * 60 * 60 * 1000; // mirrors lib/auth.ts

function getTokenSecret(): string | null {
  const secret = process.env.AUTH_TOKEN_SECRET;
  if (secret) return secret;
  // Same dev fallback as lib/auth.ts so local logins keep working
  if (process.env.NODE_ENV !== 'production') {
    return 'dev-only-fallback-secret-do-not-use-in-production';
  }
  return null;
}

// Edge-runtime HMAC verification (Web Crypto) mirroring lib/auth.ts validateAuthToken
async function verifyAdminToken(token: string): Promise<boolean> {
  const secret = getTokenSecret();
  if (!secret) return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [encodedPayload, providedSignature] = parts;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sigBytes = await crypto.subtle.sign('HMAC', key, encoder.encode(encodedPayload));
  const expectedSignature = Array.from(new Uint8Array(sigBytes))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  if (expectedSignature.length !== providedSignature.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expectedSignature.length; i++) {
    mismatch |= expectedSignature.charCodeAt(i) ^ providedSignature.charCodeAt(i);
  }
  if (mismatch !== 0) return false;

  try {
    const { timestamp } = JSON.parse(atob(encodedPayload));
    return Date.now() - parseInt(timestamp) < TOKEN_MAX_AGE_MS;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // Serve ad traffic the simplified static variant without making /shop
  // dynamic. Rewrite (not redirect) keeps the original URL + UTM params
  // intact for client-side analytics.
  if (pathname === '/shop') {
    const utm = searchParams.get('utm_source');
    if (utm === 'tiktok' || utm === 'google' || searchParams.has('gclid')) {
      const url = req.nextUrl.clone();
      url.pathname = '/shop/ad';
      return NextResponse.rewrite(url);
    }
  }

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (!token || !(await verifyAdminToken(token))) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/shop'],
};
