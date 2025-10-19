import { useCallback, useEffect, useRef, useState } from 'react';

export const useCountdown = (duration: number) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const startTimeRef = useRef<number | null>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let frame: number;
    startTimeRef.current = null;

    const tick = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = Math.floor((now - startTimeRef.current) / 1000);
      const remaining = Math.max(duration - elapsed, 0);
      setTimeLeft(remaining);
      if (remaining > 0) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [duration, key]);

  const reset = useCallback(() => {
    setTimeLeft(duration);
    setKey((prev) => prev + 1);
  }, [duration]);

  return { timeLeft, reset };
};
