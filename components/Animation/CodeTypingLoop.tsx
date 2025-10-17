'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneForest } from 'react-syntax-highlighter/dist/esm/styles/prism';

const fullCode = `
import React from 'react';

const CodeTypingLoop = () => {
  return (
    <div>
      سلام بچه ها
    </div>
  );
};

export default CodeTypingLoop;
`;

const CodeTypingLoop = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const [code, setCode] = useState('');
  const indexRef = useRef(0);
  const deletingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const animate = () => {
    const index = indexRef.current;
    const isDeleting = deletingRef.current;

    if (!isDeleting && index < fullCode.length) {
      setCode((prev) => prev + fullCode[index]);
      indexRef.current += 1;
      timeoutRef.current = setTimeout(animate, 60); //  سرعت تایپ
    } else if (!isDeleting && index === fullCode.length) {
      deletingRef.current = true;
      timeoutRef.current = setTimeout(animate, 5000); //  تأخیر 2 ثانیه‌ای قبل از حذف
    } else if (isDeleting && index > 0) {
      setCode((prev) => prev.slice(0, -1));
      indexRef.current -= 1;
      timeoutRef.current = setTimeout(animate, 40); //  سرعت حذف
    } else if (isDeleting && index === 0) {
      deletingRef.current = false;
      timeoutRef.current = setTimeout(animate, 2000); //  تأخیر قبل از شروع دوباره تایپ
    }
  };

  useEffect(() => {
    if (!isInView) return;
    animate();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isInView, animate]);

  return (
    <div
      ref={ref}
      dir="ltr"
      className="w-[36rem] rounded-xl bg-white/50 dark:bg-black/35 backdrop-blur-3xl min-h-96 overflow-x-auto mx-auto my-10 p-4"
    >
      <SyntaxHighlighter
        language="javascript"
        style={{
          ...duotoneForest,
          'pre[class*="language-"]': {
            background: 'transparent',
          },
        }}
        wrapLines
        showLineNumbers={true}
        wrapLongLines={true}
      >
        {code || ' '}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeTypingLoop;
