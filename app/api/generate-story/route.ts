import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { Redis } from '@upstash/redis';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Initialize Upstash Redis client using Vercel KV URL
const redis = Redis.fromEnv();

// Redis-based rate limiting (persistent across server restarts)
async function checkRateLimit(
  key: string, 
  limit: number, 
  resetPeriodMs: number
): Promise<{ allowed: boolean; remaining: number; limit: number }> {
  const now = Date.now();
  
  try {
    // Get current record from Redis
    const record = await redis.get<{ count: number; resetAt: number }>(key);

    if (!record || now > record.resetAt) {
      // Create new record in Redis with expiration
      const resetAt = now + resetPeriodMs;
      await redis.set(key, { count: 1, resetAt }, { px: resetPeriodMs });
      return { allowed: true, remaining: limit - 1, limit };
    }

    if (record.count >= limit) {
      return { allowed: false, remaining: 0, limit };
    }

    // Increment count in Redis
    const updatedRecord = { count: record.count + 1, resetAt: record.resetAt };
    const ttl = record.resetAt - now;
    await redis.set(key, updatedRecord, { px: ttl > 0 ? ttl : resetPeriodMs });
    
    return { allowed: true, remaining: limit - updatedRecord.count, limit };
  } catch (error) {
    console.error('Redis error in checkRateLimit:', error);
    // Fallback: allow the request but log the error
    return { allowed: true, remaining: limit - 1, limit };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userType, userAction, userReason, platform, acFormat = 'default' } = body;

    // Validate inputs
    if (!userType || !userAction || !userReason || !platform) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // SECURITY: Require authentication for all API calls
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { 
          error: 'Authentication required',
          message: 'You must be signed in to use Kantan. Sign up for free to get started.',
        },
        { status: 401 }
      );
    }

    // User is authenticated - check their subscription tier
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const subscriptionTier = (user.publicMetadata?.subscriptionTier as string) || 'free';
    
    // ANOMALY DETECTION: Check for suspicious tier changes
    const previousTier = user.publicMetadata?.previousTier as string;
    const stripeSubscriptionId = user.publicMetadata?.stripeSubscriptionId as string;
    
    // Scenario 1: User previously had paid tier, now shows free/blank, but subscription might still be active
    if ((previousTier === 'solo' || previousTier === 'founding') && 
        (!subscriptionTier || subscriptionTier === 'free')) {
      
      console.warn('🚨 ANOMALY DETECTED: User downgraded from paid to free', {
        userId,
        previousTier,
        currentTier: subscriptionTier,
        stripeSubscriptionId,
      });
      
      // If they have a subscription ID, verify with Stripe
      if (stripeSubscriptionId) {
        try {
          const stripe = new (await import('stripe')).default(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2026-04-22.dahlia',
          });
          
          const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
          
          if (subscription.status === 'active') {
            // CRITICAL: Metadata says free, but Stripe says active subscription!
            console.error('🔴 SECURITY ALERT: Active subscription but metadata shows free', {
              userId,
              email: user.emailAddresses[0]?.emailAddress,
              subscriptionId: stripeSubscriptionId,
              stripeStatus: subscription.status,
              metadataTier: subscriptionTier,
            });
            
            // Lock the account - force user to contact support
            return NextResponse.json(
              {
                error: 'account_verification_required',
                message: 'Your account requires verification. Please contact support at hello@thekantancompany.com',
                supportEmail: 'hello@thekantancompany.com',
              },
              { status: 403 }
            );
          } else {
            // Subscription is canceled/expired, downgrade is legitimate
            console.log('✅ Subscription legitimately canceled, tier correctly downgraded');
          }
        } catch (error: any) {
          console.error('Error verifying subscription with Stripe:', error);
          // Continue with normal flow if Stripe check fails
        }
      }
    }

    // Set rate limits based on tier (all user-based now, no IP fallback)
    let rateLimitKey: string;
    let limit: number;
    let resetPeriodMs: number;

    if (subscriptionTier === 'solo' || subscriptionTier === 'founding') {
      // Paid tier: 200 per month
      rateLimitKey = `paid:${userId}`;
      limit = 200;
      resetPeriodMs = 30 * 24 * 60 * 60 * 1000; // 30 days
    } else {
      // Free tier: 5 per week (must be authenticated)
      rateLimitKey = `free:${userId}`;
      limit = 5;
      resetPeriodMs = 7 * 24 * 60 * 60 * 1000; // 7 days
    }

    // Check rate limit (stored in Redis - persistent)
    const rateLimit = await checkRateLimit(rateLimitKey, limit, resetPeriodMs);

    if (!rateLimit.allowed) {
      const message = subscriptionTier === 'solo' || subscriptionTier === 'founding'
        ? "You've used your 200 stories this month. Need more? Contact us at hello@thekantancompany.com"
        : 'Free tier is limited to 5 stories per week. Upgrade to Solo for 200 stories/month.';

      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message,
          remaining: 0,
          limit: rateLimit.limit,
        },
        { status: 429 }
      );
    }

    // Build the prompt for Claude
    const acFormatInstructions = getACFormatInstructions(acFormat);
    
    const prompt = `You are a product management expert. Generate a complete user story with the following components:

INPUT:
- User type: ${userType}
- User action: ${userAction}
- User reason: ${userReason}
- Platform context: ${platform} (for reference only - DO NOT include platform details in the user story text)

OUTPUT REQUIREMENTS:

1. USER STORY
Format EXACTLY as: "As a ${userType}, I want to ${userAction} so that ${userReason}"
DO NOT modify this format. DO NOT add platform-specific language like "via mobile app" or "through a web interface".
The platform is just context - keep it out of the story text itself.

2. ACCEPTANCE CRITERIA - QUALITY RULES
- Focus on happy path first, edge cases last
- Maximum 1 edge case per story (only if truly critical)
- AC = definition of done, not QA test plan
- Each criterion must be verifiable by implementation, not testing
- Avoid vague language like "should handle X gracefully" - be specific about what happens
- Limit to 5-7 AC total per story
- AC should describe what MUST work, not what COULD go wrong
- No overlap with success metrics or measurement concerns

${acFormatInstructions}

3. RICE PRIORITY SCORE (only for paid tiers)
${subscriptionTier === 'solo' || subscriptionTier === 'founding' ? `
Calculate and explain RICE score:
- Reach: Number of users/customers affected per time period
- Impact: How much this improves their experience (0.25=minimal, 0.5=low, 1=medium, 2=high, 3=massive)
- Confidence: How sure you are of reach/impact estimates (50%=low, 80%=medium, 100%=high)
- Effort: Person-months of work required

Format:
RICE Score: [number]
Reach: [number] [explanation]
Impact: [number] [explanation]
Confidence: [number]% [explanation]
Effort: [number] person-months [explanation]
` : '(Upgrade to Solo for RICE scoring)'}

Return ONLY valid JSON with this exact structure:
{
  "userStory": "As a [user type], I want to [action] so that [reason]",
  "acceptanceCriteria": ["criterion 1", "criterion 2", ...],
  "riceScore": ${subscriptionTier === 'solo' || subscriptionTier === 'founding' ? '{ "score": number, "reach": { "value": number, "explanation": "..." }, "impact": { "value": number, "explanation": "..." }, "confidence": { "value": number, "explanation": "..." }, "effort": { "value": number, "explanation": "..." } }' : 'null'},
  "priority": "high|medium|low"
}`;

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: prompt,
      }],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    
    // Parse the JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse Claude response as JSON');
    }

    const result = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      ...result,
      remaining: rateLimit.remaining,
      limit: rateLimit.limit,
      tier: subscriptionTier,
    });

  } catch (error: any) {
    console.error('Error in generate-story API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

function getACFormatInstructions(format: string): string {
  switch (format) {
    case 'given-when-then':
      return `
FORMAT: Given-When-Then (BDD style)
- Given [initial context/state]
- When [action occurs]
- Then [expected outcome]

Example:
- Given a user is on the checkout page
- When they click "Place Order"
- Then the order is confirmed and they receive a confirmation email
`;
    
    case 'verification':
      return `
FORMAT: Verification statements (Definition of Done)
Start each with: "Verify that..."

Example:
- Verify that the submit button is disabled until all required fields are filled
- Verify that clicking submit shows a loading spinner
- Verify that successful submission displays a confirmation message
`;
    
    case 'user-can':
      return `
FORMAT: User-centric capability statements
Start each with: "User can..."

Example:
- User can see their profile picture in the top right corner
- User can click their profile picture to open a dropdown menu
- User can select "Settings" from the dropdown
`;
    
    default:
      return `
FORMAT: Definition-of-done statements (Default Kantan format)
- Clear, specific, implementation-focused
- Describes what must be built, not how to test it
- Each criterion is independently verifiable

Example:
- The login form displays email and password fields
- Clicking "Log in" sends credentials to the auth endpoint
- Successful auth redirects to the dashboard
- Failed auth shows an error message below the form
`;
  }
}
