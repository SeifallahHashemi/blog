'use client';

import React from 'react';
import Turnstile from 'react-turnstile';

const TurnstileWidget = ({
  onVerify,
}: {
  onVerify: (token: string) => void;
}) => {
  return (
    <Turnstile
      sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
      onVerify={onVerify}
      theme={'auto'}
    />
  );
};

export default TurnstileWidget;
