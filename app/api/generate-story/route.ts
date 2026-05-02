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
      
      if (subscriptionTier === 'solo') {
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

2. ACCEPTANCE CRITERIA
${acFormatInstructions}
Generate 4-6 concrete, testable acceptance criteria that define "done."
You MAY reference the platform (${platform}) in acceptance criteria where relevant.

3. RICE PRIORITIZATION
Calculate a RICE score with clear justifications:

- Reach (1-10): How many users will this impact in the first quarter?
  Consider the user type and action.
  
- Impact (1-10): How much will this improve the user's experience?
  Consider the importance of the reason/benefit.
  
- Confidence (as a percentage): How confident are we in our Reach and Impact estimates?
  Be realistic - use 80% if well-understood, 50% if uncertain.
  
- Effort (in person-weeks): How much engineering/design work is needed?
  Consider complexity of the action and platform.

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

    const result = JSON.parse(content.text);

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
