import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userType, userAction, userReason, platform, userStory, acceptanceCriteria } = body;

    if (!userType || !userAction || !userReason || !userStory) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required', message: 'Sign in to access measurement plans' },
        { status: 401 }
      );
    }

    const prompt = `You are a senior product analytics expert. Generate a concise, data-grounded measurement plan for this user story.

RULES - STRICTLY ENFORCE:
- No full sentences unless specified. Use fragments, formulas, and numbers.
- No source citations. State benchmarks as facts.
- Every field has a strict word limit. Exceed it and the output is wrong.
- All benchmarks and targets must be specific to ${platform} and adjusted for the user type and action below.
- Maximum 3 leading indicators. Maximum 2 guardrails.

USER STORY INPUTS:
- User type: ${userType}
- User action: ${userAction}
- User reason: ${userReason}
- Platform: ${platform}
- User Story: ${userStory}
- Acceptance Criteria: ${acceptanceCriteria ? acceptanceCriteria.join(' | ') : ''}

FIELD DEFINITIONS AND LIMITS:

NORTH STAR:
- name: Specific metric name (5-8 words max). Must directly reflect the user action.
- description: What it measures and why it proves the user goal. Max 20 words.
- metricType: One of: Engagement, Adoption, Retention, Revenue, Efficiency
- cohortWindow: daily, weekly, or monthly — choose based on realistic usage frequency
- analyticsPlatform: Best tool for this metric type and stage (Amplitude, Mixpanel, GA4, Heap, PostHog)
- target: Number + timeframe only. Example: "15% within 8 weeks". Max 8 words.

LEADING INDICATORS (exactly 3):
- name: Metric name, 4-7 words max
- measure: Formula or ratio only. Example: "% of users who X / total users who Y". Max 15 words.
- benchmark: Number range + context only. Example: "35–55% mobile casual games". Max 8 words.
- target: Number + timeframe. Example: "45%+ by week 6". Max 6 words.
- predicts: One causal link to North Star. Max 15 words.
- signal: Threshold + one action only. Example: "Below 30% → investigate button placement". Max 12 words.

GUARDRAILS (exactly 2):
- name: Metric name, 4-6 words max. Must fit on one line.
- threshold: Number + unit only. Example: "< 500ms p95" or "< 0.5% error rate". Max 6 words.
- benchmark: Number + context only. Max 8 words.
- measure: What is tracked. Max 12 words.
- signal: What breach means + immediate action. Max 15 words.

EVENT SCHEMA (exactly 3 events):
- eventName: snake_case, describes exact action
- description: When it fires. Max 10 words.
- properties: 3 typed properties max

Return ONLY valid JSON, no markdown, no explanation, no code fences:
{
  "northStar": {
    "name": "string",
    "description": "string",
    "metricType": "string",
    "cohortWindow": "string",
    "analyticsPlatform": "string",
    "target": "string"
  },
  "leadingIndicators": [
    {
      "name": "string",
      "measure": "string",
      "benchmark": "string",
      "target": "string",
      "predicts": "string",
      "signal": "string"
    }
  ],
  "guardrails": [
    {
      "name": "string",
      "threshold": "string",
      "benchmark": "string",
      "measure": "string",
      "signal": "string"
    }
  ],
  "eventSchema": [
    {
      "eventName": "string",
      "description": "string",
      "properties": ["string", "string", "string"]
    }
  ]
}`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response format');
    }

    let jsonText = content.text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```[\s\S]*$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```[\s\S]*$/, '');
    }

    const firstBrace = jsonText.indexOf('{');
    const lastBrace = jsonText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      jsonText = jsonText.substring(firstBrace, lastBrace + 1);
    }

    const result = JSON.parse(jsonText);

    if (!result.northStar || !result.leadingIndicators || !result.guardrails || !result.eventSchema) {
      throw new Error('Measurement plan missing required fields');
    }

    return NextResponse.json(result);

  } catch (err: any) {
    console.error('Measurement plan generation error:', err);
    return NextResponse.json(
      { error: 'Failed to generate measurement plan', message: err.message },
      { status: 500 }
    );
  }
}
