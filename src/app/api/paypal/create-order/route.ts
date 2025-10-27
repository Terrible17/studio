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
  if (!res.ok) {
    const t = await res.text();
    return { error: t, status: res.status };
  }
  const j = await res.json();
  return j.access_token;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // expected: { amount, currency, description, productId }
    const amount = body?.amount;
    const currency = body?.currency || 'USD';
    const description = body?.description || 'Premium purchase';
    const productId = body?.productId || 'product';

    // basic server-side validation - ensure amount is a string numeric value
    if (!amount || isNaN(Number(amount))) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const token = await getAccessToken();
    if (!token || token.error) {
      return NextResponse.json({ error: 'failed to get token', details: token }, { status: 500 });
    }

    const orderRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: String(amount),
            },
            description,
            reference_id: productId,
          },
        ],
      }),
    });

    const orderJson = await orderRes.json();
    return NextResponse.json(orderJson);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
