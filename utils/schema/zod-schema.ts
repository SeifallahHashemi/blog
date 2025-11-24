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

export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .trim()
    .min(8, { error: 'رمز عبور باید حداقل 8 کاراکتر باشد' }),
});

export const resetPasswordSchema = z.object({
  email: z.email({
    error: (issue) => {
      if (issue.code === 'invalid_format') {
        return 'ایمیل وارد شده صحیح نیست';
      }
      return 'لطفا ایمیل معتبر وارد کنید';
    },
  }),
});

export const newPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'رمز عبور و تکرار آن یکسان نیستند',
    path: ['confirmPassword'],
  });

const fileMetadataSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  size: z.number(),
  type: z.string().optional(),
  url: z.string().url().optional(),
});

const browserFileSchema = z.instanceof(File);

export const settingsSchema = z.object({
  fullName: z
    .string({ error: 'این فیلد اجباری است' })
    .trim()
    .min(8, { error: 'نام و نام خانوادگی باید حداقل 8 کاراکتر باشد' }),
  userName: z
    .string({ error: 'این فیلد اجباری است' })
    .regex(/^[a-z0-9]{5,32}$/, {
      error:
        'نام کاربری باید بین 5 تا 32 کاراکتر باشد و فقط شامل حروف کوچک انگلیسی و اعداد باشد',
    }),
  phoneNumber: z.string().superRefine((val, ctx) => {
    const strVal = val.toString();
    if (!/^(0?9|\+?989)\d{9}$/.test(strVal)) {
      ctx.addIssue({
        code: 'custom',
        message:
          'شماره تلفن همراه باید با 09 یا +989 شروع شود و 11 رقم داشته باشد',
      });
    }
  }),
  fileUpload: z
    .union([
      z
        .file()
        .mime([
          'image/png',
          'image/svg+xml',
          'image/jpeg',
          'image/webp',
          'image/avif',
        ])
        .max(5000000),
      z
        .array(
          z
            .file()
            .mime([
              'image/png',
              'image/svg+xml',
              'image/jpeg',
              'image/webp',
              'image/avif',
            ])
            .max(5000000)
        )
        .nonempty({ message: 'Please select a file' }),
      z.string().min(1, 'Please select a file'),
      z.array(z.union([fileMetadataSchema, browserFileSchema])),
    ])
    .optional(),
});

export const commentSchema = z.object({
  comment: z
    .string({ error: 'برای ارسال فرم نظرات، حتما باید نظری ثبت کرده باشید' })
    .min(10, { error: 'نظر شما باید حداقل 10 کاراکتر باشد' })
    .max(1000, { error: 'نظر شما نباید بیشتر از 1000 کاراکتر باشد' }),
});
