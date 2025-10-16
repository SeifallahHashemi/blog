import { createClient } from '@/utils/supabase/client';

export async function verifyOtp({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) {
  const supabase = createClient();

  const isPasswordReset = sessionStorage.getItem('isPasswordReset') == 'true';

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: isPasswordReset ? 'recovery' : 'email',
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function login(email: string, password: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function updatePassword(password: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw error;
}
