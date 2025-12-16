import { redisRateLimit } from '@/lib/redis';
import { cleanCode } from '@/lib/utils';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

interface Reaction {
  reaction: 'like' | 'dislike';
}

interface Row {
  reactions?: Reaction[];
  created_at: string;
  [key: string]: unknown;
}

export async function GET(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for') ??
    request.headers.get('x-real-ip') ??
    'unknown';
  const key = `rl:${ip}:comments`;
  const { ok } = await redisRateLimit(key, 10, 60);
  if (!ok)
    return NextResponse.json(
      { error: 'محدودیت درخواست فعال شده.' },
      { status: 429 }
    );

  const url = new URL(request.url);
  const postId = url.searchParams.get('postId');
  const limit = Number(url.searchParams.get('limit') ?? 20);
  // const cursor = url.searchParams.get('cursor');

  if (!postId)
    return NextResponse.json({ error: 'postId is required' }, { status: 400 });

  const supabase = await createClient();

  let query = supabase
    .from('comments')
    .select(
      `
      id,
      post_id,
      parent_id,
      user_id,
      content,
      is_deleted,
      created_at,
      updated_at,
      like_count,
      dislike_count,
      profiles:profiles (id, username, avatar_url, full_name, user_id),
      comment_reactions (reaction, user_id)
      `
    )
    .eq('post_id', postId);

  const cursorRaw = url.searchParams.get('cursor');
  const cursor = cursorRaw && cursorRaw !== '0' ? cursorRaw : null;

  if (cursor) {
    query = query.lt('created_at', cursor);
  }

  const { data, error } = await query
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) return NextResponse.json({ error }, { status: 500 });

  const rows = (data || []).map((r: Row) => {
    const like_count = (r.reactions || []).filter(
      (x: Reaction) => x.reaction === 'like'
    ).length;
    const dislike_count = (r.reactions || []).filter(
      (x: Reaction) => x.reaction === 'dislike'
    ).length;
    return { ...r, like_count, dislike_count, reactions: undefined };
  });

  const nextCursor = rows.length > 0 ? rows[rows.length - 1].created_at : null;

  return NextResponse.json({ data: rows, nextCursor });
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for') ??
    request.headers.get('x-real-ip') ??
    'unknown';
  const key = `rl:${ip}:comments`;
  const { ok } = await redisRateLimit(key, 10, 60);
  if (!ok)
    return NextResponse.json(
      { error: 'محدودیت درخواست فعال شده.' },
      { status: 429 }
    );
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (!userData || userError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { postId, parentId, content, token } = await request.json();

  if (!postId || !content)
    return NextResponse.json(
      { error: 'postId and content are required' },
      { status: 400 }
    );

  if (parentId) {
    const { data: parent, error: parentErr } = await supabase
      .from('comments')
      .select('id, post_id')
      .eq('id', parentId)
      .single();
    if (parentErr || !parent)
      return NextResponse.json({ error: 'Parent not found' }, { status: 400 });
    if (parent.post_id !== postId)
      return NextResponse.json(
        { error: 'Parent comment post mismatch' },
        { status: 400 }
      );
  }

  const secret = process.env.TURNSTILE_SECRET_KEY!;
  const responseCaptcha = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body: new URLSearchParams({
        secret,
        response: token,
      }),
    }
  );
  const { success } = await responseCaptcha.json();

  if (!success) {
    return NextResponse.json(
      { error: 'Captcha verification failed' },
      { status: 400 }
    );
  }

  const cleanContent = cleanCode(content);

  const insertPayload = {
    post_id: postId,
    parent_id: parentId || null,
    user_id: userData.user.id,
    content: cleanContent,
  };

  const { data, error } = await supabase
    .from('comments')
    .insert([insertPayload])
    .select()
    .single();
  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ data }, { status: 201 });
}
