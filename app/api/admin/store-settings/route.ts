import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const settings = await prisma.storeSettings.findUnique({
    where: { id: 'singleton' },
  });

  return NextResponse.json({
    salesPaused: settings?.salesPaused ?? false,
    pauseMessage: settings?.pauseMessage ?? null,
    updatedAt: settings?.updatedAt ?? null,
  });
}

export async function PUT(req: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body.salesPaused !== 'boolean') {
    return NextResponse.json(
      { error: 'salesPaused (boolean) is required' },
      { status: 400 }
    );
  }

  const pauseMessage =
    typeof body.pauseMessage === 'string' && body.pauseMessage.trim()
      ? body.pauseMessage.trim().slice(0, 500)
      : null;

  const settings = await prisma.storeSettings.upsert({
    where: { id: 'singleton' },
    update: { salesPaused: body.salesPaused, pauseMessage },
    create: { id: 'singleton', salesPaused: body.salesPaused, pauseMessage },
  });

  // Bust every cached surface that renders differently while paused
  revalidateTag('store-status');
  revalidatePath('/', 'layout');
  revalidatePath('/products.xml');

  return NextResponse.json({
    salesPaused: settings.salesPaused,
    pauseMessage: settings.pauseMessage,
    updatedAt: settings.updatedAt,
  });
}
