import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedCustomer } from '@/lib/customer-auth';
import { prisma } from '@/lib/prisma';
import { validateAddress } from '@/lib/address-validation';
import type { Address } from '@prisma/client';

function serializeAddress(address: Address) {
  return {
    id: address.id,
    firstName: address.firstName,
    lastName: address.lastName,
    street: address.street,
    street2: address.street2,
    city: address.city,
    state: address.state,
    zip: address.zip,
    phone: address.phone,
    isDefault: address.isDefault,
  };
}

export async function GET() {
  const customer = await getAuthenticatedCustomer();
  if (!customer) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Default address first; falls back to the most recently updated one
  const address = await prisma.address.findFirst({
    where: { customerId: customer.id },
    orderBy: [{ isDefault: 'desc' }, { updatedAt: 'desc' }],
  });

  return NextResponse.json({ address: address ? serializeAddress(address) : null });
}

export async function POST(request: NextRequest) {
  try {
    const customer = await getAuthenticatedCustomer();
    if (!customer) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body: unknown = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { data, errors } = validateAddress(body as Record<string, unknown>);
    if (!data) {
      return NextResponse.json(
        { error: 'Please check your shipping address', fields: errors },
        { status: 400 }
      );
    }

    const values = {
      firstName: data.firstName,
      lastName: data.lastName,
      street: data.street,
      street2: data.street2 || null,
      city: data.city,
      state: data.state,
      zip: data.zip,
      phone: data.phone || null,
      updatedAt: new Date(),
    };

    // Upsert the customer's default address
    const existing = await prisma.address.findFirst({
      where: { customerId: customer.id, isDefault: true },
    });

    const address = existing
      ? await prisma.address.update({
          where: { id: existing.id },
          data: values,
        })
      : await prisma.address.create({
          data: {
            id: randomUUID(),
            customerId: customer.id,
            isDefault: true,
            ...values,
          },
        });

    return NextResponse.json({ address: serializeAddress(address) });
  } catch (error) {
    console.error('Failed to save address:', error);
    return NextResponse.json({ error: 'Failed to save address' }, { status: 500 });
  }
}
