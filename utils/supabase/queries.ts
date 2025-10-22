'use server';

import { createClient } from './server';

export const getUser = async () => {
  const supabase = await createClient();

  const { data, error: sessionError } = await supabase.auth.getUser();

  if (sessionError || !data?.user) {
    throw new Error('User not found');
  }

  return data.user;
};

export const getUserProfile = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', (await getUser()).id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};
