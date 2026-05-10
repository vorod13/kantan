import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { clerkClient } from '@clerk/nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
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
        
        // Get customer email - try multiple methods for reliability in test mode
        let customerEmail: string | null = null;
        
        // Method 1: Try to get from customer object
        try {
          const customer = await stripe.customers.retrieve(subscription.customer as string);
          if ('email' in customer && customer.email) {
            customerEmail = customer.email;
          }
        } catch (error: any) {
          console.log('Customer retrieval failed (expected in test mode):', error.message || error);
          // Continue to try other methods instead of exiting early
        }
        
        // Method 2: If customer retrieval failed, get from latest invoice
        if (!customerEmail && subscription.latest_invoice) {
          try {
            const invoiceId = typeof subscription.latest_invoice === 'string' 
              ? subscription.latest_invoice 
              : subscription.latest_invoice.id;
            const invoice = await stripe.invoices.retrieve(invoiceId);
            customerEmail = invoice.customer_email;
            console.log('Retrieved email from invoice:', customerEmail);
          } catch (error: any) {
            console.log('Invoice retrieval failed:', error.message || error);
          }
        }

        // Early exit if no customer email found after all attempts
        if (!customerEmail) {
          console.log('No customer email found after all retrieval attempts, skipping user update');
          return NextResponse.json({ received: true, skipped: 'no_email' });
        }

        // Find Clerk user by email
        const client = await clerkClient();
        const users = await client.users.getUserList({
          emailAddress: [customerEmail],
        });
        
        if (users.data.length > 0) {
          const user = users.data[0];
          
          // Determine tier based on price (Founding $9 vs Solo $19)
          const priceId = subscription.items.data[0]?.price.id;
          const price = subscription.items.data[0]?.price;
          let tier = 'solo';
          
          // Differentiate between Founding ($9) and Solo ($19) based on price
          if (price && price.unit_amount === 900) { // $9.00 in cents
            tier = 'founding';
          } else if (price && price.unit_amount === 1900) { // $19.00 in cents
            tier = 'solo';
          }
          
          // Update user metadata with subscription info
          await client.users.updateUserMetadata(user.id, {
            publicMetadata: {
              subscriptionTier: subscription.status === 'active' ? tier : 'free',
              stripeCustomerId: subscription.customer,
              stripeSubscriptionId: subscription.id,
              subscriptionStatus: subscription.status,
              priceId: priceId,
            },
          });
          console.log(`Updated user ${user.id} to ${tier} tier (status: ${subscription.status})`);
        } else {
          console.log(`No Clerk user found with email: ${customerEmail}`);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Get customer email from Stripe
        let customerEmail: string | null = null;
        try {
          const customer = await stripe.customers.retrieve(subscription.customer as string);
          if ('email' in customer && customer.email) {
            customerEmail = customer.email;
          }
        } catch (error: any) {
          console.log('Customer retrieval failed (expected in test mode):', error.message || error);
          console.log('Customer not found in Stripe, customer may have been deleted');
          return NextResponse.json({ received: true, skipped: 'customer_deleted' });
        }
        
        if (!customerEmail) {
          console.log('No customer email found, skipping user downgrade');
          return NextResponse.json({ received: true, skipped: 'no_email' });
        }

        // Find Clerk user by email
        const client = await clerkClient();
        const users = await client.users.getUserList({
          emailAddress: [customerEmail],
        });
        
        if (users.data.length > 0) {
          const user = users.data[0];
          
          // Downgrade user to Free tier
          await client.users.updateUserMetadata(user.id, {
            publicMetadata: {
              subscriptionTier: 'free',
              stripeCustomerId: subscription.customer,
              stripeSubscriptionId: null,
              subscriptionStatus: 'canceled',
            },
          });
          console.log(`Downgraded user ${user.id} to Free tier`);
        } else {
          console.log(`No Clerk user found with email: ${customerEmail}`);
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
