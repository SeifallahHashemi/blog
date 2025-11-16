import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

interface Reaction {
    reaction: 'like' | 'dislike';
}

interface Row {
    reactions?: Reaction[];
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const postId = url.searchParams.get('postId');

  if (!postId)
    return NextResponse.json({ error: 'postId is required' }, { status: 400 });

  const supabase = await createClient();

  const { data, error } = await supabase
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
  profiles:profiles (id, username, avatar_url),
  reactions:comment_reactions (
    reaction
      )
  `
    )
    .eq('post_id', postId)
    .order('created_at', { ascending: false });

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

  return NextResponse.json({ data: rows });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (!userData || userError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { postId, parentId, content } = await request.json();

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

  const insertPayload = {
    post_id: postId,
    parent_id: parentId || null,
    user_id: userData.user.id,
    content,
  };

  const { data, error } = await supabase
    .from('comments')
    .insert([insertPayload])
    .select()
    .single();
  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ data }, { status: 201 });
}
