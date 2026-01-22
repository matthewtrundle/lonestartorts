import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

// Signature verification using HMAC-SHA1
function verifySignature(payload: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const expectedSignature = crypto
    .createHmac('sha1', secret)
    .update(Buffer.from(payload, 'utf-8'))
    .digest('hex');
  // Constant-time comparison to prevent timing attacks
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

// Generate dedup hash from payload
function generatePayloadHash(event: Record<string, unknown>): string {
  const key = `${event.timestamp}-${event.sessionId}-${event.path}-${event.eventType}`;
  return crypto.createHash('sha256').update(key).digest('hex').substring(0, 32);
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    // Get raw body for signature verification
    const rawBody = await req.text();

    // Verify signature if secret is configured
    const secret = process.env.VERCEL_DRAIN_SECRET;
    if (secret) {
      const signature = req.headers.get('x-vercel-signature');
      if (!verifySignature(rawBody, signature, secret)) {
        console.error('[analytics-ingest] Invalid signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
      }
    }

    // Parse JSON payload (array of events)
    let events: Record<string, unknown>[];
    try {
      const parsed = JSON.parse(rawBody);
      events = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      console.error('[analytics-ingest] Invalid JSON');
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    // Prepare records for insert
    const records = events.map((event) => ({
      eventType: String(event.eventType || 'unknown'),
      eventName: event.eventName ? String(event.eventName) : null,
      timestamp: event.timestamp ? BigInt(event.timestamp as number) : BigInt(0),
      path: event.path ? String(event.path) : null,
      route: event.route ? String(event.route) : null,
      origin: event.origin ? String(event.origin) : null,
      referrer: event.referrer ? String(event.referrer) : null,
      queryParams: event.queryParams ? String(event.queryParams) : null,
      sessionId: event.sessionId !== undefined && event.sessionId !== null ? BigInt(event.sessionId as number) : null,
      deviceId: event.deviceId !== undefined && event.deviceId !== null ? BigInt(event.deviceId as number) : null,
      country: event.country ? String(event.country) : null,
      region: event.region ? String(event.region) : null,
      city: event.city ? String(event.city) : null,
      osName: event.osName ? String(event.osName) : null,
      clientName: event.clientName ? String(event.clientName) : null,
      deviceType: event.deviceType ? String(event.deviceType) : null,
      rawJson: event as object,
      payloadHash: generatePayloadHash(event),
    }));

    // Bulk insert with skipDuplicates for idempotency
    const result = await prisma.analyticsEvent.createMany({
      data: records,
      skipDuplicates: true, // Skip if payloadHash already exists
    });

    const duration = Date.now() - startTime;
    console.log(`[analytics-ingest] Inserted ${result.count}/${events.length} events in ${duration}ms`);

    return NextResponse.json({
      success: true,
      inserted: result.count,
      received: events.length
    });

  } catch (error) {
    console.error('[analytics-ingest] Error:', error);
    // Return 500 for transient DB errors (Vercel will retry)
    return NextResponse.json({
      success: false,
      error: 'Internal error'
    }, { status: 500 });
  }
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
