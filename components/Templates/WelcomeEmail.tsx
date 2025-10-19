import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import React from 'react';

interface Props {
  userEmail: string;
  dashboardUrl: string;
}

const WelcomeEmail = ({
  userEmail,
  dashboardUrl = 'http://localhost:3000/dashboard',
}: Props) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    'https://sepehrpersianblog.ir';
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>
          حالا ما آماده ایم از نظرات ارزشمند شما در وبلاگمان استفاده بکنیم
        </Preview>
        <Container style={container}>
          <Section style={box}>
            <Img
              src={`${baseUrl}/img/pop-1.png`}
              width="49"
              height="21"
              alt="Stripe"
            />
            <Hr style={hr} />
            <Text style={paragraph}>
              از اینکه اطلاعات حسابتون رو تکمیل کردید، ممنونیم.الان می توانید
              نظرات ارزشمندتون رو با ما و دیگر کاربران و بازدیدکنندگان سایت به
              اشتراک بگذارید
            </Text>
            <Text style={paragraph}>
              برای مدیریت حسابتون و هم چنین تکمیل اطلاعات خودتون لطفا از طریق
              لینک زیر وارد داشبورد حساب کاربری خودتون شوید
            </Text>
            <Button style={button} href={dashboardUrl}>
              مشاهده داشبورد بلاگ
            </Button>
            <Hr style={hr} />
            <Text style={paragraph}>
              لطفا به لیست پست های{' '}
              <Link style={anchor} href={baseUrl + '/blog/posts'}>
                وبلاگ ما
              </Link>{' '}
              نگاهی بیاندازید.
            </Text>
            <Text style={paragraph}>
              از طرف مدیر: سپهر هاشمی به کاربر {userEmail} ❤️
            </Text>
            <Hr style={hr} />
            <Text style={footer}>
              ایران، آذربایجان شرقی www.sepehrpersianblog.ir
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const box = {
  padding: '0 48px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const paragraph = {
  color: '#525f7f',

  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};

const anchor = {
  color: '#556cd6',
};

const button = {
  backgroundColor: '#656ee8',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '10px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};
