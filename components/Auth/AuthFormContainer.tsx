import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';
import AnimateSection from '../Animation/AnimateSection';

interface AuthFormContainerProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

const AuthFormContainer = ({ title, description, children, footer }: AuthFormContainerProps) => {
  return <AnimateSection>
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
        <CardAction>
          {/* <Button variant="link">Sign Up</Button> */}
        </CardAction>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  </AnimateSection>;
};

export default AuthFormContainer;
