import { AuthApiError } from '@supabase/supabase-js';

export function translateSupabaseError(error: AuthApiError | Error) {
  const map: Record<string, string> = {
    'Invalid login credentials': 'ایمیل یا رمز عبور اشتباه است.',
    'User already registered': 'کاربر با این ایمیل قبلاً ثبت‌نام کرده است.',
    'Email not confirmed':
      'ایمیل شما تأیید نشده است. لطفاً صندوق ایمیل خود را بررسی کنید.',
    'Invalid token': 'توکن ورود معتبر نیست.',
    'Password should be at least 6 characters':
      'رمز عبور باید حداقل ۶ کاراکتر باشد.',
    'Email not found': 'ایمیل وارد شده یافت نشد.',
    'این ایمیل قبلا ثبت شده است':
      'این ایمیل قبلا ثبت شده است، لطفا از طریق لینک به صفحه ورود بروید',
  };

  if (map[error.message]) return map[error.message];

  if ('status' in error) {
    switch (error.status) {
      case 400:
        return 'درخواست نامعتبر است.';
      case 401:
        return 'مجوز ورود معتبر نیست.';
      case 404:
        return 'کاربر یافت نشد.';
      case 409:
        return 'اطلاعات وارد شده با داده‌های موجود تداخل دارد.';
      case 422:
        return 'داده‌های وارد شده معتبر نیستند.';
      case 500:
        return 'خطا در سرور رخ داده است.';
    }
  }

  return 'خطای ناشناخته‌ای رخ داده است. لطفاً مجدداً تلاش کنید.';
}
