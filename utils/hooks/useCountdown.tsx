import { useEffect, useRef, useState } from 'react';

export const useCountdown = (duration: number) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let frame: number;

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
  }, [duration]);

  return timeLeft;
};
