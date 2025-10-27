import { NextResponse } from 'next/server';

const PAYPAL_BASE = process.env.PAYPAL_MODE === 'live'
  ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

async function getAccessToken() {
  const client = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;
  if (!client || !secret) {
    throw new Error('PayPal credentials not set on server.');
  }
  const basic = Buffer.from(`${client}:${secret}`).toString('base64');
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const j = await res.json();
  return j.access_token;
}

export async function POST(req: Request) {
  try {
    const { orderID } = await req.json();
    if (!orderID) return NextResponse.json({ error: 'orderID required' }, { status: 400 });
    const token = await getAccessToken();
    const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const j = await res.json();
    // TODO: persist transaction server-side. Return result to client.
    return NextResponse.json(j);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
