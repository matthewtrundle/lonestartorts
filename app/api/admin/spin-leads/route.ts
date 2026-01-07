import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/admin/spin-leads
 * Get all spin wheel entries with filtering and pagination
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const perPage = parseInt(url.searchParams.get('perPage') || '20');
    const prize = url.searchParams.get('prize'); // Filter by prize type
    const used = url.searchParams.get('used'); // 'true', 'false', or 'all'
    const search = url.searchParams.get('search') || '';

    // Build where clause
    const where: any = {};

    if (prize && prize !== 'all') {
      where.prize = prize;
    }

    if (used === 'true') {
      where.used = true;
    } else if (used === 'false') {
      where.used = false;
    }

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get total count for pagination
    const total = await prisma.spinWheelEntry.count({ where });

    // Get entries with pagination
    const entries = await prisma.spinWheelEntry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    // Calculate stats
    const allEntries = await prisma.spinWheelEntry.findMany({
      select: { prize: true, used: true, utmSource: true },
    });

    const stats = {
      total: allEntries.length,
      used: allEntries.filter(e => e.used).length,
      conversionRate: allEntries.length > 0
        ? ((allEntries.filter(e => e.used).length / allEntries.length) * 100).toFixed(1)
        : '0',
      byPrize: {
        five_off: allEntries.filter(e => e.prize === 'five_off').length,
        free_shipping: allEntries.filter(e => e.prize === 'free_shipping').length,
        bonus_tortillas: allEntries.filter(e => e.prize === 'bonus_tortillas').length,
        free_sauce: allEntries.filter(e => e.prize === 'free_sauce').length,
        ten_percent: allEntries.filter(e => e.prize === 'ten_percent').length,
      },
      bySource: {
        tiktok: allEntries.filter(e => e.utmSource === 'tiktok').length,
        other: allEntries.filter(e => e.utmSource !== 'tiktok').length,
      },
    };

    return NextResponse.json({
      entries,
      stats,
      pagination: {
        page,
        perPage,
        total,
        pages: Math.ceil(total / perPage),
      },
    });
  } catch (error) {
    console.error('Error fetching spin leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch spin leads' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/spin-leads/export
 * Export all emails as CSV
 */
export async function POST(req: NextRequest) {
  try {
    const entries = await prisma.spinWheelEntry.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        email: true,
        prize: true,
        code: true,
        used: true,
        utmSource: true,
        createdAt: true,
        expiresAt: true,
      },
    });

    // Generate CSV
    const headers = ['Email', 'Prize', 'Code', 'Used', 'Source', 'Created At', 'Expires At'];
    const rows = entries.map(e => [
      e.email,
      e.prize,
      e.code,
      e.used ? 'Yes' : 'No',
      e.utmSource,
      e.createdAt.toISOString(),
      e.expiresAt.toISOString(),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="spin-leads-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting spin leads:', error);
    return NextResponse.json(
      { error: 'Failed to export spin leads' },
      { status: 500 }
    );
  }
}
