import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { clerkClient } from '@clerk/nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle different event types
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Get customer email from Stripe
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        
        if ('email' in customer && customer.email) {
          // Find Clerk user by email
          const client = await clerkClient();
          const users = await client.users.getUserList({
            emailAddress: [customer.email],
          });

          if (users.data.length > 0) {
            const user = users.data[0];
            
            // Update user metadata with subscription info
            await client.users.updateUserMetadata(user.id, {
              publicMetadata: {
                subscriptionTier: subscription.status === 'active' ? 'solo' : 'free',
                stripeCustomerId: subscription.customer,
                stripeSubscriptionId: subscription.id,
                subscriptionStatus: subscription.status,
              },
            });

            console.log(`Updated user ${user.id} to Solo tier`);
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Get customer email
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        
        if ('email' in customer && customer.email) {
          const client = await clerkClient();
          const users = await client.users.getUserList({
            emailAddress: [customer.email],
          });

          if (users.data.length > 0) {
            const user = users.data[0];
            
            // Downgrade to free tier
            await client.users.updateUserMetadata(user.id, {
              publicMetadata: {
                subscriptionTier: 'free',
                stripeCustomerId: subscription.customer,
                subscriptionStatus: 'canceled',
              },
            });

            console.log(`Downgraded user ${user.id} to Free tier`);
          }
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        // Payment successful - subscription is active
        console.log('Payment succeeded for subscription');
        break;
      }

      case 'invoice.payment_failed': {
        // Payment failed - handle accordingly
        console.log('Payment failed for subscription');
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook error:', err);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
