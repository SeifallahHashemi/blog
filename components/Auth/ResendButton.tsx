'use client';

import { cn } from '@/lib/utils';
import { useCountdown } from '@/utils/hooks/useCountdown';
import React from 'react';
import { Button } from '../ui/button';

interface ResendButtonProps {
  onResend: () => void;
}

export const ResendButton = React.memo(({ onResend }: ResendButtonProps) => {
  const timeLeft = useCountdown(60);

  return (
    <Button
      type="button"
      disabled={timeLeft !== 0}
      onClick={onResend}
      className={cn('', {
        '!cursor-not-allowed': timeLeft !== 0,
        '!cursor-pointer': timeLeft === 0,
      })}
    >
      {timeLeft !== 0 ? `${timeLeft} ثانیه تا ارسال مجدد` : 'ارسال مجدد کد'}
    </Button>
  );
});

ResendButton.displayName = 'ResendButton';
