import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  // Check authentication
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const search = url.searchParams.get('search') || '';
    const sortBy = url.searchParams.get('sortBy') || 'createdAt';
    const sortOrder = url.searchParams.get('sortOrder') || 'desc';

    const skip = (page - 1) * limit;

    // Build where clause for search
    const where = search
      ? {
          OR: [
            { email: { contains: search, mode: 'insensitive' as const } },
            { name: { contains: search, mode: 'insensitive' as const } },
            { zipCode: { contains: search, mode: 'insensitive' as const } }
          ]
        }
      : {};

    // Get total count and entries
    const [total, entries] = await Promise.all([
      prisma.waitlistEntry.count({ where }),
      prisma.waitlistEntry.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
        include: {
          emailLogs: {
            orderBy: { createdAt: 'desc' },
            take: 1
          }
        }
      })
    ]);

    // Get statistics
    const stats = await prisma.waitlistEntry.aggregate({
      _count: {
        _all: true,
        interestCorn: true,
        interestButter: true,
        interestFlour: true,
        interestVariety: true
      },
      where: {
        OR: [
          { interestCorn: true },
          { interestButter: true },
          { interestFlour: true },
          { interestVariety: true }
        ]
      }
    });

    return NextResponse.json({
      entries,
      total,
      page,
      pages: Math.ceil(total / limit),
      stats: {
        total: total,
        products: {
          corn: await prisma.waitlistEntry.count({ where: { interestCorn: true } }),
          butter: await prisma.waitlistEntry.count({ where: { interestButter: true } }),
          flour: await prisma.waitlistEntry.count({ where: { interestFlour: true } }),
          variety: await prisma.waitlistEntry.count({ where: { interestVariety: true } })
        }
      }
    });
  } catch (error) {
    console.error('Error fetching waitlist:', error);
    return NextResponse.json(
      { error: 'Failed to fetch waitlist' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  // Check authentication
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    await prisma.waitlistEntry.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting entry:', error);
    return NextResponse.json(
      { error: 'Failed to delete entry' },
      { status: 500 }
    );
  }
}