'use client';

import { cn } from '@/lib/utils';
import { useCountdown } from '@/utils/hooks/useCountdown';
import React from 'react';
import { Button } from '../ui/button';

interface ResendButtonProps {
  onResend: () => void;
}

export const ResendButton = React.memo(({ onResend }: ResendButtonProps) => {
  const { timeLeft, reset } = useCountdown(60);

  const handleResend = () => {
    onResend();
    reset();
  };

  return (
    <Button
      type="button"
      aria-disabled={timeLeft !== 0}
      onClick={timeLeft === 0 ? handleResend : undefined}
      className={cn(
        timeLeft === 0
          ? 'cursor-pointer'
          : 'cursor-not-allowed opacity-60 pointer-events-none'
      )}
    >
      {timeLeft !== 0 ? `${timeLeft} ثانیه تا ارسال مجدد` : 'ارسال مجدد کد'}
    </Button>
  );
});

ResendButton.displayName = 'ResendButton';
