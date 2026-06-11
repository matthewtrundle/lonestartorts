import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { products, FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING_RATE } from '@/lib/products';
import { getShippingScheduleInfo } from '@/lib/shipping-schedule';

// Same graceful-degradation pattern as the Stripe guard in app/api/checkout/route.ts:
// if the key isn't configured we return a 503 and the UI hides the chat option.
const anthropicKey = process.env.ANTHROPIC_API_KEY;
const anthropic = anthropicKey ? new Anthropic({ apiKey: anthropicKey }) : null;

// ── Rate limiting: 20 requests per 10 minutes per IP (in-memory) ──
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT_MAX) {
    requestLog.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  // Opportunistic cleanup so the map can't grow unbounded
  if (requestLog.size > 5000) {
    for (const [key, value] of requestLog) {
      if (value.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        requestLog.delete(key);
      }
    }
  }
  return false;
}

// ── Input validation (zod-style narrowing at the boundary, no extra dep) ──
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const MAX_MESSAGES = 30;
const MAX_CONTENT_LENGTH = 2000;

function parseMessages(body: unknown): ChatMessage[] | null {
  if (typeof body !== 'object' || body === null) return null;
  const { messages } = body as { messages?: unknown };
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return null;
  }
  const parsed: ChatMessage[] = [];
  for (const entry of messages) {
    if (typeof entry !== 'object' || entry === null) return null;
    const { role, content } = entry as { role?: unknown; content?: unknown };
    if (role !== 'user' && role !== 'assistant') return null;
    if (typeof content !== 'string' || content.trim().length === 0) return null;
    if (content.length > MAX_CONTENT_LENGTH) return null;
    parsed.push({ role, content: content.trim() });
  }
  if (parsed[0].role !== 'user' || parsed[parsed.length - 1].role !== 'user') return null;
  return parsed;
}

// ── Maria's knowledge base (sourced from lib/products + lib/shipping-schedule) ──
function buildSystemPrompt(): string {
  const schedule = getShippingScheduleInfo();
  const catalog = products
    .map((p) => {
      const count = p.tortillaCount > 0 ? `, ${p.tortillaCount} count` : '';
      const storage = p.storage === 'refrigerated' ? 'refrigerate on arrival' : 'shelf-stable';
      return `- ${p.name} — $${(p.price / 100).toFixed(2)}${count} (${storage}): ${p.description}`;
    })
    .join('\n');

  return `You are Maria, the friendly Texan assistant for Lonestar Tortillas (lonestartortillas.com), an online shop that ships H-E-B tortillas and Tex-Mex pantry staples nationwide.

VOICE: Warm, helpful, a little Texas charm — but concise. Two or three short sentences is usually plenty. No emoji.

CRITICAL DISCLAIMER RULE: Lonestar Tortillas is an independent reseller and is NOT affiliated with or endorsed by H-E-B®. If a customer asks whether we are H-E-B, work for H-E-B, or are partnered with them, you MUST clearly state: "We're an independent reseller — not affiliated with or endorsed by H-E-B®. We just love their tortillas enough to ship them anywhere." Work the disclaimer in naturally whenever affiliation comes up.

PRODUCT CATALOG (prices in USD per pack):
${catalog}

SHIPPING (Freshness First):
- We ship ${schedule.shipDays}s only, with a ${schedule.cutoffTime} order cutoff. ${schedule.scheduleDescription}
- Delivery takes ${schedule.deliveryTime}.
- Flat rate $${(FLAT_SHIPPING_RATE / 100).toFixed(2)}; FREE shipping on orders of $${(FREE_SHIPPING_THRESHOLD / 100).toFixed(0)} or more.
- US delivery addresses only.

STORAGE TIPS:
- Bakery (refrigerated) tortillas: refrigerate on arrival; use within ~2 weeks, or freeze up to 3 months separated by parchment.
- Shelf-stable tortillas: pantry-fine until opened; refrigerate after opening for longest life.
- Reheat on a dry comal or skillet over medium heat ~30 seconds per side. Never microwave straight from the fridge without a damp paper towel.

SCOPE: Only discuss Lonestar Tortillas products, ordering, shipping, storage, recipes, and Tex-Mex cooking. If asked about anything else (politics, coding, other companies, personal advice, etc.), politely decline and steer back to tortillas. Never invent products, prices, or policies not listed above. For order-specific issues (refunds, lost packages, order status), direct folks to the contact page at /contact.`;
}

export async function POST(req: NextRequest) {
  try {
    if (!anthropic) {
      console.warn('ANTHROPIC_API_KEY not configured - Maria chat disabled');
      return NextResponse.json({ error: 'Chat unavailable' }, { status: 503 });
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.ip ||
      'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Whoa there — let's slow down. Try again in a few minutes." },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const messages = parseMessages(body);
    if (!messages) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 });
    }

    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system: buildSystemPrompt(),
      messages,
    });

    const reply = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('')
      .trim();

    if (!reply) {
      return NextResponse.json(
        { error: 'Maria got tongue-tied. Try asking again.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      console.error('Maria chat API error:', error.status, error.message);
      return NextResponse.json(
        { error: 'Maria is helping other customers right now. Try again shortly.' },
        { status: 502 }
      );
    }
    console.error('Maria chat error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
