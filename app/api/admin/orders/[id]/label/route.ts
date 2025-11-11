import { NextRequest, NextResponse } from 'next/server';
import EasyPostClient from '@easypost/api';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

const easypost = process.env.EASYPOST_API_KEY
  ? new EasyPostClient(process.env.EASYPOST_API_KEY)
  : null;

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!easypost) {
      return NextResponse.json(
        { error: 'EasyPost not configured. Please add EASYPOST_API_KEY to environment variables.' },
        { status: 503 }
      );
    }

    // Get order
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        orderItems: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Calculate package weight (rough estimate: 1 lb per pack)
    const items = order.orderItems;
    const totalPacks = items
      .filter((item) => item.sku !== 'SHIPPING')
      .reduce((sum, item) => sum + item.quantity, 0);
    const weightInOz = Math.max(totalPacks * 16, 16); // At least 1 lb

    // Create shipment
    const shipment = await easypost.Shipment.create({
      from_address: {
        name: 'Lonestar Tortillas',
        street1: '123 Main St', // TODO: Update with real warehouse address
        city: 'Austin',
        state: 'TX',
        zip: '78701',
        country: 'US',
        phone: '512-555-0100',
      },
      to_address: {
        name: order.shippingName,
        street1: order.shippingAddress1,
        street2: order.shippingAddress2 || undefined,
        city: order.shippingCity,
        state: order.shippingState,
        zip: order.shippingZip,
        country: order.shippingCountry || 'US',
        phone: order.shippingPhone || undefined,
      },
      parcel: {
        length: 12,
        width: 10,
        height: 3,
        weight: weightInOz,
      },
    });

    // Get cheapest rate (usually USPS First Class or Priority)
    const rate = shipment.lowestRate(['USPS']);

    if (!rate) {
      return NextResponse.json(
        { error: 'No shipping rates available' },
        { status: 400 }
      );
    }

    // Buy the label
    const boughtShipment = await easypost.Shipment.buy(shipment.id, rate.id);

    // Update order with tracking info
    await prisma.order.update({
      where: { id: order.id },
      data: {
        trackingNumber: boughtShipment.tracking_code || null,
        carrier: boughtShipment.selected_rate?.carrier || 'USPS',
        labelUrl: boughtShipment.postage_label?.label_url || null,
        status: 'SHIPPED',
        shippedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      shipment: {
        id: boughtShipment.id,
        trackingNumber: boughtShipment.tracking_code,
        carrier: boughtShipment.selected_rate?.carrier,
        labelUrl: boughtShipment.postage_label?.label_url,
        rate: {
          service: boughtShipment.selected_rate?.service,
          rate: boughtShipment.selected_rate?.rate,
          currency: boughtShipment.selected_rate?.currency,
        },
      },
    });
  } catch (error: any) {
    console.error('Label generation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate shipping label',
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
