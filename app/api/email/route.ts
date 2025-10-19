import PasswordResetConfirmationEmail from '@/components/Templates/PasswordResetConfirmationEmail';
import VerificationEmail from '@/components/Templates/VerificationEmail';
import WelcomeEmail from '@/components/Templates/WelcomeEmail';
import { createAdminClient } from '@/utils/supabase/admin';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, password, type, isPasswordReset, origin } =
      await request.json();

    if (!email) {
      return NextResponse.json(
        {
          error: 'وارد کردن ایمیل الزامی است',
        },
        {
          status: 400,
        }
      );
    }

    let data;

    switch (type) {
      case 'verification':
        const supabase = createAdminClient();
        const res = await supabase.auth.admin.generateLink({
          type: isPasswordReset ? 'recovery' : 'signup',
          email,
          password: isPasswordReset ? undefined : password,
        });

        if (res.data.properties?.email_otp) {
          data = await resend.emails.send({
            from: 'سپهر پرشین بلاگ <auth@sepehrpersianblog.ir>',
            to: email,
            subject: isPasswordReset ? 'بازیابی رمز عبور' : 'اعتبار سنجی ایمیل',
            react: VerificationEmail({
              otp: res.data.properties?.email_otp,
              isPasswordReset: !!isPasswordReset,
            }),
          });
        } else {
          return NextResponse.json({ data: null, error: res.error });
        }
        break;

      case 'welcome':
        const dashboardUrl = origin
          ? `${origin}/dashboard`
          : `${new URL(request.url).origin}/dashboard`;

        data = await resend.emails.send({
          from: 'خوش آمدید - سپهر پرشین بلاگ <welcome@sepehrpersianblog.ir>',
          to: email,
          subject: 'به وبلاگ ما خوش آمدید',
          react: WelcomeEmail({
            userEmail: email,
            dashboardUrl,
          }),
        });
        break;

      case 'password-reset-confirmation':
        const loginUrl = origin
          ? `${origin}/auth/login`
          : `${new URL(request.url).origin}/auth/login`;

        data = await resend.emails.send({
          from: 'سپهر پرشین بلاگ <auth@sepehrpersianblog.ir>',
          to: email,
          subject: 'بازیابی موفقیت آمیز رمز عبور',
          react: PasswordResetConfirmationEmail({
            userEmail: email,
            loginUrl,
          }),
        });
        break;

      default:
        return NextResponse.json(
          { error: 'اعتبار سنجی نامعتبر' },
          { status: 400 }
        );
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
