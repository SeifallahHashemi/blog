import { redisRateLimit } from '@/lib/redis';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  context: { params: Promise<{ commentId: string }> }
) {
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

  const { commentId } = await context.params;
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user ?? null;
  if (!user)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { reaction } = await request.json();

  if (!reaction || !['like', 'dislike'].includes(reaction)) {
    return NextResponse.json(
      { error: 'Reaction must be either like or dislike' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase.rpc('toggle_comment_reaction', {
    p_comment_id: commentId,
    p_reaction: reaction,
  });

  console.log('Supabase RPC result:', { data, error });
  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ action: data?.[0]?.action || null });
  // check existing reaction : بررسی واکنش قبلی کاربر به روش select که کمی پیچیده تر و هم چنین از روش بالا کارایی کم تری دارد.
  /*const { data: existingReaction, error: existingError } = await supabase
    .from('comment_reactions')
    .select('*')
    .eq('comment_id', commentId)
    .eq('user_id', user!.id)
    .single();

  if (existingError) return NextResponse.json({ error: existingError });

  if (!existingReaction) {
    const { data, error } = await supabase
      .from('comment_reactions')
      .insert([
        {
          comment_id: commentId,
          user_id: user!.id,
          reaction,
        },
      ])
      .select()
      .single();
    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json({ data }, { status: 201 });
  } else {
    if (existingReaction.reaction === reaction) {
      const { error } = await supabase
        .from('comment_reactions')
        .delete()
        .eq('id', existingReaction.id);
      if (error) return NextResponse.json({ error }, { status: 500 });
      return NextResponse.json({ data: null }, { status: 200 });
    } else {
      const { data, error } = await supabase
        .from('comment_reactions')
        .update({ reaction, updated_at: new Date().toISOString() })
        .eq('id', existingReaction.id)
        .select()
        .single();
      if (error) return NextResponse.json({ error }, { status: 500 });
      return NextResponse.json({ data }, { status: 200 });
    }
  }*/
}
