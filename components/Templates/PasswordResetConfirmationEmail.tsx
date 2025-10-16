import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface PasswordResetConfirmationEmailProps {
  userEmail: string;
  loginUrl?: string;
}

export const PasswordResetConfirmationEmail = ({
  userEmail,
  loginUrl = 'http://localhost:3000/auth/login',
}: PasswordResetConfirmationEmailProps) => {
  return (
    <Html lang="fa" dir="rtl">
      <Head />
      <Preview>رمز عبور شما با موفقیت بازنشانی شد</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>بازنشانی رمز عبور با موفقیت انجام شد</Heading>
          <Text style={text}>سلام {userEmail}،</Text>
          <Text style={text}>
            رمز عبور شما با موفقیت بازنشانی شد. اکنون می‌توانید با رمز عبور جدید
            خود وارد حساب کاربری‌تان شوید.
          </Text>
          <Section style={buttonContainer}>
            <Link style={button} href={loginUrl}>
              ورود به حساب
            </Link>
          </Section>
          <Text style={text}>
            اگر شما رمز عبور خود را بازنشانی نکرده‌اید، لطفاً فوراً با ما تماس
            بگیرید، زیرا ممکن است حساب شما در معرض خطر قرار گرفته باشد.
          </Text>
          <Text style={footer}>
            این پیام به‌صورت خودکار ارسال شده است؛ لطفاً به آن پاسخ ندهید.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// استایل‌های پیشنهادی برای زیبایی (اختیاری)
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Tahoma, sans-serif',
  direction: 'rtl' as const,
};

const container = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  margin: '20px auto',
  padding: '32px',
  maxWidth: '600px',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '22px',
  textAlign: 'center' as const,
  marginBottom: '24px',
};

const text = {
  fontSize: '14px',
  lineHeight: '24px',
  color: '#333333',
  marginBottom: '16px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '24px 0',
};

const button = {
  backgroundColor: '#0070f3',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '6px',
  textDecoration: 'none',
  display: 'inline-block',
};

const footer = {
  fontSize: '12px',
  color: '#888888',
  textAlign: 'center' as const,
  marginTop: '24px',
};

export default PasswordResetConfirmationEmail;
