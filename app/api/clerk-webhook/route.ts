import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { clerkClient } from '@clerk/nextjs/server';

// Clerk webhook secret - different from Stripe
const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    // Get headers
    const headerPayload = await headers();
    const svixId = headerPayload.get('svix-id');
    const svixTimestamp = headerPayload.get('svix-timestamp');
    const svixSignature = headerPayload.get('svix-signature');

    // Verify headers exist
    if (!svixId || !svixTimestamp || !svixSignature) {
      return NextResponse.json(
        { error: 'Missing svix headers' },
        { status: 400 }
      );
    }

    // Get body
    const body = await req.text();

    // Verify webhook signature
    const wh = new Webhook(webhookSecret);
    let evt: any;

    try {
      evt = wh.verify(body, {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      });
    } catch (err: any) {
      console.error('Clerk webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle the event
    const { type, data } = evt;

    switch (type) {
      case 'user.created': {
        const userId = data.id;
        const email = data.email_addresses?.[0]?.email_address;

        console.log('New user created:', userId, email);

     // Check if user already has a subscription tier (e.g. set by Stripe webhook)
		const existingTier = data.public_metadata?.subscriptionTier;

		if (!existingTier) {
		  // Initialize to free tier only if no tier already set
		  const client = await clerkClient();
		  await client.users.updateUserMetadata(userId, {
			publicMetadata: {
			  subscriptionTier: 'free',
			  createdAt: new Date().toISOString(),
			  source: 'clerk_signup',
			},
		  });
		  console.log(`✅ Initialized user ${userId} to free tier`);
		} else {
		  console.log(`ℹ️ User ${userId} already has tier: ${existingTier} — skipping free tier init`);
		}
        break;
      }

      case 'user.updated': {
        // Optional: Handle user updates if needed
        console.log('User updated:', data.id);
        break;
      }

      case 'user.deleted': {
        // Optional: Handle user deletion if needed
        console.log('User deleted:', data.id);
        break;
      }

      default:
        console.log(`Unhandled Clerk event type: ${type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Clerk webhook error:', err);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
