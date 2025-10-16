import * as z from 'zod';

const emailSchema = z.email({
  pattern: z.regexes.rfc5322Email,
  error: (issue) => {
    if (issue.code === 'invalid_format') {
      return 'ایمیل وارد شده صحیح نیست';
    }
    return 'لطفا ایمیل معتبر وارد کنید';
  },
});

const passwordSchema = z
  .string()
  .trim()
  .min(8, { error: 'حداقل ۸ کاراکتر لازم است' })
  .max(20, { error: 'حداکثر ۲۰ کاراکتر مجاز است' })
  .refine((val) => /[A-Z]/.test(val), {
    error: 'باید حداقل یک حرف بزرگ داشته باشد',
  })
  .refine((val) => /[a-z]/.test(val), {
    error: 'باید حداقل یک حرف کوچک داشته باشد',
  })
  .refine((val) => /[0-9]/.test(val), { error: 'باید حداقل یک عدد داشته باشد' })
  .refine((val) => /[!@#$%^&*]/.test(val), {
    error: 'باید حداقل یک کاراکتر خاص داشته باشد',
  });

export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'رمز عبور و تکرار آن یکسان نیستند',
    path: ['confirmPassword'],
  });

export const otpSchema = z.object({
  otp: z.string().length(8, { message: 'کد تایید باید 8 رقم باشد' }),
});
