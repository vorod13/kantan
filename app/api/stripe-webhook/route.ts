import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { clerkClient } from '@clerk/nextjs/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

function buildAccessEmail(tier: string, signInUrl: string): string {
  const isFounding = tier === 'founding';
  return `
    <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; background: #F5F2EC;">
      <div style="margin-bottom: 32px;">
        <span style="font-family: serif; font-size: 24px; font-weight: 700; color: #0D0D0D;">かんたん</span>
        <span style="font-family: Arial, sans-serif; font-size: 13px; font-weight: 500; color: #888780; letter-spacing: 0.08em; text-transform: uppercase; margin-left: 10px;">Kantan</span>
      </div>
      
      <h1 style="font-family: serif; font-size: 28px; font-weight: 700; color: #0D0D0D; margin-bottom: 16px; line-height: 1.2;">
        Your ${isFounding ? 'Founding' : 'Solo'} access is ready.
      </h1>
      
      <p style="font-size: 15px; color: #555; line-height: 1.6; margin-bottom: 24px;">
        Thank you for ${isFounding ? 'becoming a Founding member of' : 'subscribing to'} Kantan. 
        Your ${isFounding ? '$9' : '$19'}/month subscription is active and your account is ready.
      </p>

      <p style="font-size: 15px; color: #555; line-height: 1.6; margin-bottom: 32px;">
        Click below to sign in and start generating user stories, acceptance criteria, and measurement plans instantly.
      </p>
      
      <a href="${signInUrl}" 
         style="display: inline-block; padding: 14px 32px; background: #C8410A; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px;">
        Access Kantan →
      </a>
      
      <p style="font-size: 13px; color: #888780; margin-top: 32px; line-height: 1.6;">
        This link expires in 24 hours. If you need a new one, visit 
        <a href="https://kantanlabs.com" style="color: #C8410A;">kantanlabs.com</a> 
        and sign in with your email.
      </p>

      <p style="font-size: 13px; color: #888780; margin-top: 16px;">
        Questions? Reply to this email or reach us at 
        <a href="mailto:hello@kantanlabs.com" style="color: #C8410A;">hello@kantanlabs.com</a>
      </p>
    </div>
  `;
}

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

    // DEDUPLICATION: Check if we've already processed this event
    const eventId = event.id;
    const eventType = event.type;
    
    console.log(`Received webhook: ${eventType} [${eventId}]`);
    
    // For events that modify user data, check for duplicates
    const userModifyingEvents = [
      'checkout.session.completed',
      'customer.subscription.created',
      'customer.subscription.updated',
      'customer.subscription.deleted',
    ];
    
    if (userModifyingEvents.includes(eventType)) {
      // Get a reference to track processed events
      // We'll store this in a simple in-memory cache for now
      // In production, you might want Redis or a database
      
      // For now, we'll check if the event was created more than 5 minutes ago
      // Stripe retries happen within minutes, so this catches duplicates
      const eventCreatedAt = new Date(event.created * 1000);
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      
      if (eventCreatedAt < fiveMinutesAgo) {
        console.log(`⚠️ Old event detected (created ${eventCreatedAt.toISOString()}), possible replay or retry`);
        // Still process it, but log the warning
      }
      
      // Alternative: Check with the user's metadata if they have this event ID recorded
      // This is more reliable but requires finding the user first
      // We'll implement this per-event-type below
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        const customerEmail = session.customer_email || session.customer_details?.email;
        
        if (!customerEmail) {
          console.log('No customer email in checkout session');
          return NextResponse.json({ received: true, skipped: 'no_email' });
        }
        
        console.log('Checkout completed for:', customerEmail);
        
        const subscriptionId = session.subscription as string;
        
        if (!subscriptionId) {
          console.log('No subscription in checkout session');
          return NextResponse.json({ received: true, skipped: 'no_subscription' });
        }
        
        // Detect tier from amount_total
        let tier = 'solo';
        const amountTotal = session.amount_total;
        
        console.log('Payment amount from session:', amountTotal);
        
        if (amountTotal === 900) {
          tier = 'founding';
          console.log('✅ Detected Founding tier ($9.00)');
        } else if (amountTotal === 1900) {
          tier = 'solo';
          console.log('✅ Detected Solo tier ($19.00)');
        } else {
          console.log('⚠️ Unknown payment amount:', amountTotal, 'cents - defaulting to solo');
        }
        
        const client = await clerkClient();
        const users = await client.users.getUserList({
          emailAddress: [customerEmail],
        });
        
        if (users.data.length > 0) {
          // User EXISTS → update metadata + send magic link
          const user = users.data[0];
          
          // DEDUPLICATION
          const processedEvents = (user.privateMetadata?.processedWebhookEvents as string[]) || [];
          
          if (processedEvents.includes(eventId)) {
            console.log(`⚠️ Duplicate event detected: ${eventId} already processed for user ${user.id}`);
            return NextResponse.json({ received: true, skipped: 'duplicate_event' });
          }
          
          await client.users.updateUserMetadata(user.id, {
            publicMetadata: {
              subscriptionTier: tier,
              stripeCustomerId: session.customer,
              stripeSubscriptionId: subscriptionId,
              subscriptionStatus: 'active',
              previousTier: user.publicMetadata?.subscriptionTier || 'free',
            },
            privateMetadata: {
              processedWebhookEvents: [...processedEvents, eventId].slice(-50),
            },
          });
          console.log(`✅ Updated user ${user.id} to ${tier} tier via checkout.session.completed`);

          // Send magic link for ALL paid tiers
          try {
            const signInToken = await client.signInTokens.createSignInToken({
              userId: user.id,
              expiresInSeconds: 86400,
            });
            console.log(`✅ Magic link token created for existing user ${customerEmail}`);

            await resend.emails.send({
              from: 'Kantan Labs <hello@kantanlabs.com>',
              to: customerEmail,
              subject: tier === 'founding'
                ? 'Your Kantan Founding access is ready'
                : 'Your Kantan Solo access is ready',
              html: buildAccessEmail(tier, signInToken.url),
            });
            console.log(`✅ Access email sent to existing user ${customerEmail}`);
          } catch (emailError: any) {
            console.error(`❌ Failed to send access email to existing user ${customerEmail}:`, emailError.message);
          }

        } else {
          // User does NOT EXIST → create + send magic link
          console.log(`⚠️ No Clerk user found with email: ${customerEmail} — creating new Clerk user`);
          
          try {
            const newUser = await client.users.createUser({
              emailAddress: [customerEmail],
              publicMetadata: {
                subscriptionTier: tier,
                stripeCustomerId: session.customer,
                stripeSubscriptionId: subscriptionId,
                subscriptionStatus: 'active',
                previousTier: 'free',
              },
              privateMetadata: {
                processedWebhookEvents: [eventId],
              },
            });
            console.log(`✅ Created new Clerk user ${newUser.id} with ${tier} tier`);

            try {
              const signInToken = await client.signInTokens.createSignInToken({
                userId: newUser.id,
                expiresInSeconds: 86400,
              });
              console.log(`✅ Magic link token created for new user ${customerEmail}`);

              await resend.emails.send({
                from: 'Kantan Labs <hello@kantanlabs.com>',
                to: customerEmail,
                subject: tier === 'founding'
                  ? 'Your Kantan Founding access is ready'
                  : 'Your Kantan Solo access is ready',
                html: buildAccessEmail(tier, signInToken.url),
              });
              console.log(`✅ Access email sent to new user ${customerEmail}`);
            } catch (tokenError: any) {
              console.error(`❌ Failed to create magic link for ${customerEmail}:`, tokenError.message);
            }

          } catch (createError: any) {
            console.error(`❌ Failed to create Clerk user for ${customerEmail}:`, createError.message);
          }
        }
        break;
      }
      
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
        
        console.log('Processing subscription cancellation:', subscription.id);
        
        // Try to get customer email from Stripe (won't work in test mode if deleted)
        let customerEmail: string | null = null;
        try {
          const customer = await stripe.customers.retrieve(subscription.customer as string);
          if ('email' in customer && customer.email) {
            customerEmail = customer.email;
          }
        } catch (error: any) {
          console.log('Customer retrieval failed (test mode), will search by subscription ID');
        }
        
        const client = await clerkClient();
        let user = null;
        
        // Method 1: Find by email if we have it
        if (customerEmail) {
          const users = await client.users.getUserList({
            emailAddress: [customerEmail],
          });
          if (users.data.length > 0) {
            user = users.data[0];
          }
        }
        
        // Method 2: If no email, search all users for matching subscription ID
        if (!user) {
          console.log('Searching for user by subscription ID...');
          const allUsers = await client.users.getUserList({ limit: 100 });
          user = allUsers.data.find(u => 
            u.publicMetadata?.stripeSubscriptionId === subscription.id
          );
        }
        
        if (user) {
          // DEDUPLICATION: Check if we've already processed this cancellation event
          const processedEvents = (user.privateMetadata?.processedWebhookEvents as string[]) || [];
          
          if (processedEvents.includes(eventId)) {
            console.log(`⚠️ Duplicate cancellation event: ${eventId} already processed for user ${user.id}`);
            return NextResponse.json({ received: true, skipped: 'duplicate_event' });
          }
          
          // Downgrade user to Free tier + add event to processed list
          await client.users.updateUserMetadata(user.id, {
            publicMetadata: {
              subscriptionTier: 'free',
              stripeCustomerId: subscription.customer,
              stripeSubscriptionId: null,
              subscriptionStatus: 'canceled',
            },
            privateMetadata: {
              processedWebhookEvents: [...processedEvents, eventId].slice(-50), // Keep last 50 events
            },
          });
          console.log(`✅ Downgraded user ${user.id} to Free tier (subscription canceled)`);
        } else {
          console.log(`⚠️ No Clerk user found for subscription: ${subscription.id}`);
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