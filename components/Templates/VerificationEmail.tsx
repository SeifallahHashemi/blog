import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface VerificationEmailProps {
  otp: string;
  isPasswordReset?: boolean;
}

export const VerificationEmail = ({
  otp,
  isPasswordReset = false,
}: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        {isPasswordReset ? 'بازیابی رمز عبور' : 'تاییدیه ایمیل'}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            {isPasswordReset
              ? 'بازیابی رمز عبور'
              : 'تاییدیه ایمیل'}
          </Heading>
          <Text style={text}>
            {isPasswordReset
              ? 'شما درخواست تنظیم مجدد رمز عبور خود را داده‌اید. لطفاً از کد زیر برای تأیید هویت خود استفاده کنید:'
              : 'از ثبت نام شما متشکریم! لطفاً برای تأیید حساب خود از کد زیر استفاده کنید:'}
          </Text>
          <Section style={codeContainer}>
            <Text style={code}>{otp}</Text>
          </Section>
          <Text style={text}>
            اگر شما این ایمیل را درخواست نکرده‌اید، می‌توانید با خیال راحت آن را نادیده بگیرید.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.25',
  marginBottom: '24px',
  textAlign: 'center' as const,
};

const text = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '1.5',
  marginBottom: '24px',
};

const codeContainer = {
  background: '#f4f4f4',
  borderRadius: '4px',
  padding: '16px',
  marginBottom: '24px',
  textAlign: 'center' as const,
};

const code = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  letterSpacing: '4px',
};

export default VerificationEmail;
