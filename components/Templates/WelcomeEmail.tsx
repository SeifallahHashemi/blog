import React from 'react';
import { Body, Container, Head, Heading, Html, Link, Preview, Section, Text } from '@react-email/components';

interface Props {
  userEmail: string;
  dashboardUrl: string;
}

const WelcomeEmail = ({
  userEmail,
  dashboardUrl = 'http://localhost:3000/dashboard',
}: Props) => {

  return <Html lang='fa'>
    <Head />
    <Preview>به وب سایت ما خوش آمدید</Preview>
    <Body style={main}>
        <Container style={container}>
            <Heading style={h1}>به وب سایت ما خوش آمدید ❤️</Heading>
            <Text style={text}>از ثبت نام شما کاربر {userEmail} در وب سایت ما ممنونیم و امیدواریم بتوانیم در افزایش سطح برنامه نویسی شما بتوانیم نقشی هر چند جزئی ایفا کنیم.</Text>
            <Text style={text}>حالا شما به تمامی بخش ها و امکانات سایت مثل کامنت، لایک، ذخیره پست و ... دسترسی کامل دارید.</Text>
            <Section style={buttonContainer}>
                <Link href={dashboardUrl} style={button}>ورود به پنل کاربری</Link>
            </Section>
        </Container>
    </Body>
  </Html>;
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

const buttonContainer = {
  textAlign: 'center' as const,
  marginTop: '32px',
};

const button = {
  backgroundColor: '#3b82f6',
  borderRadius: '4px',
  color: '#fff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '600',
  padding: '12px 24px',
  textDecoration: 'none',
};

export default WelcomeEmail;
