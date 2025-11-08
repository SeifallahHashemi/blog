'use client';

import TurnstileWidget from '@/components/Shared/TurnstileWidget';
import { useState } from 'react';

export default function TestForm() {
  const [token, setToken] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/verify-turnstile', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });

    const data = await res.json();
    if (data.success) {
      alert('فرم با موفقیت ارسال شد ✅');
    } else {
      alert('اعتبارسنجی ناموفق ❌');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="ایمیل" required />
      <TurnstileWidget onVerify={setToken} />
      <button type="submit">ارسال</button>
    </form>
  );
}
