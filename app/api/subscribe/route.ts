import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      );
    }

    // Get API key from environment
    const apiKey = process.env.BEEHIIV_API_KEY;
    if (!apiKey) {
      console.error('BEEHIIV_API_KEY not configured');
      return NextResponse.json(
        { error: 'Configuration error' },
        { status: 500 }
      );
    }

    // Subscribe to Beehiiv
    const response = await fetch(
      'https://api.beehiiv.com/v2/publications/pub_4fea8d73-2a06-413e-870a-23510f1b29c8/subscriptions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: 'website',
          utm_medium: 'organic',
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Beehiiv API error:', data);
      return NextResponse.json(
        { error: data.message || 'Subscription failed' },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
