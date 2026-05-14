import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Rate limiting store (in-memory for now)
// Key format: "free:{ip}" or "solo:{userId}"
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getRateLimitKey(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown';
  return ip;
}

function checkRateLimit(
  key: string, 
  limit: number, 
  resetPeriodMs: number
): { allowed: boolean; remaining: number; limit: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetAt) {
    // Create new record
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + resetPeriodMs,
    });
    return { allowed: true, remaining: limit - 1, limit };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0, limit };
  }

  // Increment count
  record.count += 1;
  rateLimitStore.set(key, record);
  return { allowed: true, remaining: limit - record.count, limit };
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

    // Check authentication and subscription tier
    const { userId } = await auth();
    let subscriptionTier = 'free';
    let rateLimitKey: string;
    let limit: number;
    let resetPeriodMs: number;

    if (userId) {
      // User is authenticated - check their subscription tier
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      subscriptionTier = (user.publicMetadata?.subscriptionTier as string) || 'free';
      
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
            console.error('Failed to verify subscription with Stripe:', error.message);
            // Don't block user if Stripe check fails - could be network issue
          }
        }
      }
      
      // Update previousTier for next time (track history)
      if (subscriptionTier && subscriptionTier !== previousTier) {
        await client.users.updateUserMetadata(userId, {
          publicMetadata: {
            ...user.publicMetadata,
            previousTier: subscriptionTier,
          },
        });
      }
      
      if (subscriptionTier === 'solo' || subscriptionTier === 'founding') {
        // Solo tier: 200 per month
        rateLimitKey = `solo:${userId}`;
        limit = 200;
        resetPeriodMs = 30 * 24 * 60 * 60 * 1000; // 30 days
      } else {
        // Free tier authenticated: 5 per week
        rateLimitKey = `free-auth:${userId}`;
        limit = 5;
        resetPeriodMs = 7 * 24 * 60 * 60 * 1000; // 7 days
      }
    } else {
      // Not authenticated: 5 per week (IP-based)
      rateLimitKey = `free-ip:${getRateLimitKey(req)}`;
      limit = 5;
      resetPeriodMs = 7 * 24 * 60 * 60 * 1000; // 7 days
    }

    // Check rate limit
    const rateLimit = checkRateLimit(rateLimitKey, limit, resetPeriodMs);

    if (!rateLimit.allowed) {
      const message = subscriptionTier === 'solo'
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
- Each AC must test a DIFFERENT aspect of functionality - no duplicates or near-duplicates
- If two AC sound similar, combine them into one clearer criterion

3. ACCEPTANCE CRITERIA
${acFormatInstructions}
Generate 4-6 concrete, testable acceptance criteria that define "done."
You MAY reference the platform (${platform}) in acceptance criteria where relevant.

4. RICE PRIORITIZATION
Calculate RICE score using this formula: (Reach × Impact × Confidence) / Effort

SCORING RULES:
- Reach: 1-10 scale (how many users affected per time period)
- Impact: 1-3 scale (massive=3, high=2, medium=1, low=0.5, minimal=0.25)
- Confidence: percentage (100%, 80%, 50%)
- Effort: 1-10 scale (story points or person-weeks)

IMPORTANT - ROUNDING:
- Round Reach, Impact, and Effort to whole numbers only
- Round Confidence to nearest 10% (100%, 90%, 80%, etc.)
- Round final RICE score to ONE decimal place (e.g., 9.6, 12.3, 45.8)
- If final score > 100, round to nearest whole number (e.g., 245, not 245.3827)

Provide clear justification for each score based on the user story context.

Formula: (Reach × Impact × Confidence) / Effort

Provide your complete reasoning for each score, then calculate the total.

Return your response in this exact JSON format:
{
  "userStory": "As a...",
  "acceptanceCriteria": ["AC1", "AC2", "AC3", ...],
  "rice": {
    "reach": {
      "score": number,
      "justification": "explanation"
    },
    "impact": {
      "score": number,
      "justification": "explanation"
    },
    "confidence": {
      "score": number (as percentage),
      "justification": "explanation"
    },
    "effort": {
      "score": number,
      "justification": "explanation"
    },
    "totalScore": number,
    "calculation": "step-by-step calculation"
  }
}`;

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Parse response
    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response format');
    }

    // Parse response - strip markdown code fences if present
    let jsonText = content.text.trim();
    
    // Remove ```json and ``` if Claude wrapped the response
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    
    const result = JSON.parse(jsonText);

    // Return result with rate limit info
    return NextResponse.json({
      ...result,
      rateLimit: {
        remaining: rateLimit.remaining,
        limit: rateLimit.limit,
        tier: subscriptionTier,
      },
    });
  } catch (err: any) {
    console.error('Story generation error:', err);
    return NextResponse.json(
      { error: 'Failed to generate story', message: err.message },
      { status: 500 }
    );
  }
}

function getACFormatInstructions(format: string): string {
  switch (format) {
    case 'gherkin':
      return 'Use Gherkin format (Given/When/Then) for each criterion.';
    case 'numbered':
      return 'Use numbered list format (1., 2., 3., etc).';
    case 'prose':
      return 'Write each criterion as a short prose paragraph.';
    case 'default':
    default:
      return 'Use the Kantan default format: Clear, concise statements without Given/When/Then structure.';
  }
}
