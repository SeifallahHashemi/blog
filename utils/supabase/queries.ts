'use server';

import { createClient } from './server';

export const getUser = async () => {
  const supabase = await createClient();

  const { data, error: sessionError } = await supabase.auth.getUser();

  if (sessionError || !data?.user) {
    // throw new Error('User not found');
    return null;
  }

  return data.user;
};

export const getUserProfile = async () => {
  const supabase = await createClient();

  const user = await getUser();

  if (user !== null) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  return null;
};

export const updateUserProfile = async ({
  fullName,
  userName,
  mobile,
}: {
  fullName?: string;
  userName?: string;
  mobile?: string;
}) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('کاربر یافت نشد!');
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
      username: userName,
      mobile: mobile,
    })
    .eq('user_id', user.id);

  if (error) {
    throw error;
  }

  return data;
};
