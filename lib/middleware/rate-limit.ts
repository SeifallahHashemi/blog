import { redisRateLimit } from '@/lib/redis';
import { type NextRequest } from 'next/server';

export async function rateLimitMiddleware(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
  const { ok } = await redisRateLimit(ip, 10, 60);
  if (!ok) {
    return new Response('محدودیت درخواست فعال شده.', { status: 429 });
  }
}
