import { NextResponse } from 'next/server';

const RETELL_API_KEY = process.env.RETELL_API_KEY;
const VOICE_AGENT_ID = process.env.NEXT_PUBLIC_RETELL_VOICE_AGENT_ID || 'agent_bc9d51042f017956fec02da4ac';

export async function POST() {
  if (!RETELL_API_KEY) {
    return NextResponse.json({ error: 'Retell API key not configured' }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: VOICE_AGENT_ID,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Retell create-web-call failed:', error);
      return NextResponse.json({ error: 'Failed to create web call' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ access_token: data.access_token });
  } catch (error) {
    console.error('Web call creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
