import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

// Debug: Check if API key is loaded
console.log('API Key exists:', !!process.env.ANTHROPIC_API_KEY);
console.log('API Key starts with sk-ant:', process.env.ANTHROPIC_API_KEY?.startsWith('sk-ant'));

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Rate limiting store (in-memory for now)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getRateLimitKey(req: NextRequest): string {
  // Get IP from various headers (Vercel sets x-forwarded-for)
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown';
  return ip;
}

function checkRateLimit(key: string, limit: number = 5): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  // Reset daily (24 hours)
  const dayInMs = 24 * 60 * 60 * 1000;

  if (!record || now > record.resetAt) {
    // Create new record
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + dayInMs,
    });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  // Increment count
  record.count += 1;
  rateLimitStore.set(key, record);
  return { allowed: true, remaining: limit - record.count };
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

    // Check rate limit (5 per day for free tier)
    const rateLimitKey = getRateLimitKey(req);
    const rateLimit = checkRateLimit(rateLimitKey, 5);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'Free tier is limited to 5 stories per day. Upgrade to Solo for unlimited access.',
          remaining: 0,
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
Provide scores (1-5 scale) for:
- Reach: How many users affected? (5=all users, 1=edge case)
- Impact: How much does this move key metrics? (5=primary lever, 1=tangential)
- Confidence: How strong is the evidence? (5=proven data, 1=gut feel)
- Effort: Engineering complexity estimate (1=simple config, 5=major architecture)

Calculate the RICE score: (Reach × Impact × Confidence) ÷ Effort

Provide a brief justification (1-2 sentences) for each component score.

FORMAT YOUR RESPONSE AS JSON:
{
  "userStory": "As a...",
  "acceptanceCriteria": [
    "criterion 1",
    "criterion 2",
    "criterion 3",
    "criterion 4"
  ],
  "rice": {
    "reach": { "score": 4, "justification": "..." },
    "impact": { "score": 5, "justification": "..." },
    "confidence": { "score": 3, "justification": "..." },
    "effort": { "score": 2, "justification": "..." },
    "totalScore": 30,
    "calculation": "(4 × 5 × 3) ÷ 2 = 30"
  }
}`;

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Extract the response
    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response format from Claude');
    }

    // Parse the JSON response
    const responseText = content.text;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from Claude response');
    }

    const result = JSON.parse(jsonMatch[0]);

    // Return the result with rate limit info
    return NextResponse.json({
      ...result,
      rateLimit: {
        remaining: rateLimit.remaining,
        limit: 5,
      },
    });

  } catch (error: any) {
    console.error('Error generating story:', error);
    return NextResponse.json(
      { error: 'Failed to generate story', details: error.message },
      { status: 500 }
    );
  }
}

function getACFormatInstructions(format: string): string {
  switch (format) {
    case 'gherkin':
      return `Use Gherkin format (Given/When/Then):
- Given [initial context]
- When [action occurs]
- Then [expected outcome]`;
    
    case 'numbered':
      return `Use numbered list format:
1. First criterion
2. Second criterion
3. Third criterion`;
    
    case 'prose':
      return `Use prose/paragraph format:
Write each criterion as a complete sentence in paragraph form, suitable for executive communication.`;
    
    case 'default':
    default:
      return `Use bullet point format with · separator:
· Clear, testable criterion
· Another specific requirement
· Measurable outcome`;
  }
}
