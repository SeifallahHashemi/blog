import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { commentId: string } }
) {
  const commentId = params.commentId;
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user ?? null;
  if (!user) NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { reaction } = await request.json();

  if (!reaction || !['like', 'dislike'].includes(reaction)) {
    return NextResponse.json(
      { error: 'Reaction must be either like or dislike' },
      { status: 400 }
    );
  }

  // check existing reaction
  const { data: existingReaction, error: existingError } = await supabase
    .from('comment_reactions')
    .select('*')
    .eq('comment_id', commentId)
    .eq('user_id', user!.id)
    .single();

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
  }
}
