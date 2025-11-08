import { updateSession } from '@/utils/supabase/middleware';
import { type NextRequest } from 'next/server';

export async function sessionMiddleware(req: NextRequest) {
  return await updateSession(req);
}
