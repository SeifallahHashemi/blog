import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { postId: string } }
) {
  const postId = params.postId;
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData!.user ?? null;
  if (!user)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // check existing data
  const { data: existingData, error: existingError } = await supabase
    .from('user_favorites')
    .select('*')
    .eq('post_id', postId)
    .eq('user_id', user.id)
    .single();

  if (existingData) {
    // remove
    const { error } = await supabase
      .from('user_favorites')
      .delete()
      .eq('id', existingData.id);
    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json({ data: null, favorited: false }, { status: 200 });
  } else {
    // add
    const { data, error } = await supabase
      .from('user_favorites')
      .insert([
        {
          post_id: postId,
          user_id: user.id,
        },
      ])
      .select()
      .single();
    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json({ data, favorited: true }, { status: 201 });
  }
}
