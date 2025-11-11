import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendOrderShippedEmail } from '@/lib/email';
import { isAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// Get single order
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const rawOrder = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        customer: true,
        orderItems: true,
      },
    });

    if (!rawOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Transform order to include customerName and shippingAddress for backward compatibility
    const order = {
      ...rawOrder,
      customerName: rawOrder.shippingName,
      items: rawOrder.orderItems,
      shippingAddress: {
        line1: rawOrder.shippingAddress1,
        line2: rawOrder.shippingAddress2,
        city: rawOrder.shippingCity,
        state: rawOrder.shippingState,
        postal_code: rawOrder.shippingZip,
        country: rawOrder.shippingCountry,
      },
    };

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error fetching order:', error);
    const errorDetails: Record<string, unknown> = {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
    };
    if (error && typeof error === 'object' && 'code' in error) {
      errorDetails.prismaCode = (error as any).code;
    }
    console.error('Error details:', errorDetails);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

// Update order
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { status, trackingNumber, carrier } = body;

    // Get current order
    const currentOrder = await prisma.order.findUnique({
      where: { id: params.id },
    });

    if (!currentOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Build update data
    const updateData: any = {};

    if (status) {
      updateData.status = status;

      // Set timestamps based on status
      if (status === 'SHIPPED' && currentOrder.status !== 'SHIPPED') {
        updateData.shippedAt = new Date();
      }
      if (status === 'DELIVERED' && currentOrder.status !== 'DELIVERED') {
        updateData.deliveredAt = new Date();
      }
    }

    if (trackingNumber) {
      updateData.trackingNumber = trackingNumber;
    }

    if (carrier) {
      updateData.carrier = carrier;
    }

    // Update order
    const updatedOrder = await prisma.order.update({
      where: { id: params.id },
      data: updateData,
      include: { orderItems: true },
    });

    // Send shipping notification email if status changed to SHIPPED
    if (
      status === 'SHIPPED' &&
      currentOrder.status !== 'SHIPPED' &&
      trackingNumber &&
      carrier
    ) {
      await sendOrderShippedEmail({
        to: updatedOrder.email,
        orderNumber: updatedOrder.orderNumber,
        customerName: updatedOrder.shippingName,
        trackingNumber,
        carrier,
        items: updatedOrder.orderItems.filter((item) => item.sku !== 'SHIPPING'),
      });
    }

    return NextResponse.json({ order: updatedOrder });
  } catch (error) {
    console.error('Error updating order:', error);
    const errorDetails: Record<string, unknown> = {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
    };
    if (error && typeof error === 'object' && 'code' in error) {
      errorDetails.prismaCode = (error as any).code;
    }
    console.error('Error details:', errorDetails);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}
