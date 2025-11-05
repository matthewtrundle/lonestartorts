import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  // Get the Svix headers for verification
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data;

    try {
      // Create customer in database
      await prisma.customer.create({
        data: {
          clerkUserId: id,
          email: email_addresses[0]?.email_address || '',
          firstName: first_name || null,
          lastName: last_name || null,
          lastLoginAt: new Date(),
        },
      });

      console.log(`✅ Customer created for Clerk user: ${id}`);
    } catch (error) {
      console.error('Error creating customer:', error);
      return new Response('Error creating customer', { status: 500 });
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name } = evt.data;

    try {
      // Update customer in database
      await prisma.customer.update({
        where: { clerkUserId: id },
        data: {
          email: email_addresses[0]?.email_address || '',
          firstName: first_name || null,
          lastName: last_name || null,
        },
      });

      console.log(`✅ Customer updated for Clerk user: ${id}`);
    } catch (error) {
      console.error('Error updating customer:', error);
      // Don't return error - user might not exist yet
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;

    try {
      // Delete customer from database (orders will be preserved with customerId = null)
      await prisma.customer.delete({
        where: { clerkUserId: id },
      });

      console.log(`✅ Customer deleted for Clerk user: ${id}`);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  }

  if (eventType === 'session.created') {
    const { user_id } = evt.data;

    try {
      // Update last login time
      await prisma.customer.update({
        where: { clerkUserId: user_id },
        data: {
          lastLoginAt: new Date(),
        },
      });

      console.log(`✅ Login tracked for user: ${user_id}`);
    } catch (error) {
      console.error('Error tracking login:', error);
    }
  }

  return new Response('', { status: 200 });
}
