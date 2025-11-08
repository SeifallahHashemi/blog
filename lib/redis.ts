import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function redisRateLimit(key: string, limit = 10, windowSec = 60) {
  const now = Math.floor(Date.now() / 1000);
  const redisKey = `${key}:${Math.floor(now / windowSec)}`;
  const v = await redis.incr(redisKey);
  if (v === 1) await redis.expire(redisKey, windowSec);
  return { ok: v <= limit, remaining: Math.max(0, limit - v) };
}
