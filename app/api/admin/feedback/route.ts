import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/admin/feedback
 * Get all feedback entries with filtering and pagination
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const perPage = parseInt(url.searchParams.get('perPage') || '20');
    const rating = url.searchParams.get('rating'); // Filter by specific rating
    const hasComment = url.searchParams.get('hasComment'); // 'true' or 'false'
    const search = url.searchParams.get('search') || '';

    // Build where clause
    const where: any = {
      rating: { not: null }, // Only show submitted feedback
    };

    if (rating && rating !== 'all') {
      where.rating = parseInt(rating);
    }

    if (hasComment === 'true') {
      where.comment = { not: null };
    } else if (hasComment === 'false') {
      where.comment = null;
    }

    if (search) {
      where.OR = [
        { orderNumber: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { customerName: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get total count for pagination
    const total = await prisma.customerFeedback.count({ where });

    // Get feedback with pagination
    const feedback = await prisma.customerFeedback.findMany({
      where,
      orderBy: { submittedAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    // Calculate stats
    const allFeedback = await prisma.customerFeedback.findMany({
      where: { rating: { not: null } },
      select: { rating: true },
    });

    const stats = {
      total: allFeedback.length,
      averageRating: allFeedback.length > 0
        ? (allFeedback.reduce((sum, f) => sum + (f.rating || 0), 0) / allFeedback.length).toFixed(1)
        : 0,
      distribution: {
        1: allFeedback.filter(f => f.rating === 1).length,
        2: allFeedback.filter(f => f.rating === 2).length,
        3: allFeedback.filter(f => f.rating === 3).length,
        4: allFeedback.filter(f => f.rating === 4).length,
        5: allFeedback.filter(f => f.rating === 5).length,
      },
    };

    return NextResponse.json({
      feedback,
      stats,
      pagination: {
        page,
        perPage,
        total,
        pages: Math.ceil(total / perPage),
      },
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    );
  }
}
