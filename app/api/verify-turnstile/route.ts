import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { token } = await request.json();
  const secret = process.env.TURNSTILE_SECRET_KEY!;
  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body: new URLSearchParams({
        secret,
        response: token,
      }),
    }
  );
  const data = await response.json();
  if (data.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, error: data['error-codes'] });
  }
}
