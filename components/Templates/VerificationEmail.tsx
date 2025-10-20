import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Section,
  Text,
} from '@react-email/components';

interface VerificationEmailProps {
  otp: string;
  isPasswordReset?: boolean;
}

const VerificationEmail = ({
  otp,
  isPasswordReset = false,
}: VerificationEmailProps) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    'https://sepehrpersianblog.ir';

  return (
    <Html lang={'fa'} dir={'rtl'}>
      <Head />
      <Body style={main} dir={'rtl'}>
        {isPasswordReset ? 'بازیابی رمز عبور' : 'تاییدیه ایمیل'}
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Img
                src={`${baseUrl}/img/pop-1.png`}
                width="100"
                height="100"
                alt="Sepehr Persian Blog Logo"
              />
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>
                {isPasswordReset ? 'بازیابی رمز عبور' : 'تاییدیه ایمیل'}
              </Heading>
              <Text style={mainText}>
                {isPasswordReset
                  ? 'شما درخواست تنظیم مجدد رمز عبور خود را داده‌اید. لطفاً از کد زیر برای تأیید هویت خود استفاده کنید:'
                  : 'از ثبت نام شما متشکریم! لطفاً برای تأیید حساب خود از کد زیر استفاده کنید:'}
              </Text>
              <Section style={verificationSection}>
                <Text style={verifyText}>کد هویت سنجی</Text>

                <Text style={codeText}>{otp}</Text>
                <Text style={validityText}>
                  اگر شما این ایمیل را درخواست نکرده‌اید، می‌توانید با خیال راحت
                  آن را نادیده بگیرید.
                </Text>
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                وب سرویس های ما هرگز از شما نمی‌خواهند رمز عبور، کارت اعتباری یا
                شماره حساب بانکی خود را افشا یا تأیید کنید.
              </Text>
            </Section>
          </Section>
          <Text style={footerText}>
            این پیام توسط وب سرویس سپهر پرشین بلاگ ایجاد و فرستاده شده است
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#fff',
  color: '#212121',
};

const container = {
  padding: '20px',
  margin: '0 auto',
  backgroundColor: '#eee',
};

const h1 = {
  color: '#333',
  fontFamily:
    "IRANSansDN, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '15px',
};

const text = {
  color: '#333',
  fontFamily:
    "IRANSansDN, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
};

const imageSection = {
  display: 'flex',
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  backgroundColor: '#252f3d',
  padding: '20px 0',
};

const coverSection = { backgroundColor: '#fff' };

const upperSection = { padding: '25px 35px' };

const lowerSection = { padding: '25px 35px' };

const footerText = {
  ...text,
  fontSize: '12px',
  padding: '0 20px',
};

const verifyText = {
  ...text,
  margin: 0,
  fontWeight: 'bold',
  textAlign: 'center' as const,
};

const codeText = {
  ...text,
  fontWeight: 'bold',
  fontSize: '36px',
  margin: '10px 0',
  textAlign: 'center' as const,
};

const validityText = {
  ...text,
  margin: '0px',
  textAlign: 'center' as const,
};

const verificationSection = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const mainText = { ...text, marginBottom: '14px' };

const cautionText = { ...text, margin: '0px' };

export default VerificationEmail;
