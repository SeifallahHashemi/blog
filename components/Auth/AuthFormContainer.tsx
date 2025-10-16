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
  footer?: React.ReactNode;
  Icon?: React.ElementType;
}

const AuthFormContainer = ({
  title,
  description,
  children,
  footer,
  Icon,
}: AuthFormContainerProps) => {
  return (
    <AnimateSection className="w-full max-w-md mx-auto">
      <Card className="font-iranYWR font-semibold text-base tracking-tight leading-relaxed">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          {Icon && (
            <CardAction>
              <Icon className="size-6 text-zinc-600 dark:text-zinc-400" />
            </CardAction>
          )}
        </CardHeader>
        <CardContent>{children}</CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </AnimateSection>
  );
};

export default AuthFormContainer;
