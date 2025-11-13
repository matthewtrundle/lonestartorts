import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);

    // Get query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '20');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const paymentStatus = searchParams.get('paymentStatus') || '';

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { orderNumber: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { shippingName: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status && status !== 'all') {
      where.status = status;
    }

    if (paymentStatus && paymentStatus !== 'all') {
      where.paymentStatus = paymentStatus;
    }

    // Get orders with pagination
    const [rawOrders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          OrderItem: true,
        },
        orderBy: { createdAt: 'desc' },
        take: perPage,
        skip: (page - 1) * perPage,
      }),
      prisma.order.count({ where }),
    ]);

    // Transform orders to include customerName and shippingAddress for backward compatibility
    const orders = rawOrders.map((order) => ({
      ...order,
      customerName: order.shippingName,
      items: order.OrderItem,
      shippingAddress: {
        line1: order.shippingAddress1,
        line2: order.shippingAddress2,
        city: order.shippingCity,
        state: order.shippingState,
        postal_code: order.shippingZip,
        country: order.shippingCountry,
      },
    }));

    return NextResponse.json({
      orders,
      pagination: {
        page,
        perPage,
        total,
        pages: Math.ceil(total / perPage),
      },
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    const errorDetails: Record<string, unknown> = {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
    };
    if (error && typeof error === 'object' && 'code' in error) {
      errorDetails.prismaCode = (error as any).code;
    }
    console.error('Error details:', errorDetails);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
