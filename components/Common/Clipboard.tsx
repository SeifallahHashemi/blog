'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react';
import { BsFillClipboardCheckFill } from 'react-icons/bs';
import { FiCopy } from 'react-icons/fi';
import { cn } from '@/lib/utils';

interface ClipboardProps {
  content: string;
}

type AnimateSectionProps = HTMLMotionProps<'div'> & {
  className?: string;
  cClassName?: string;
  children?: React.ReactNode;
  delay?: number;
};

const AnimateSection = ({
  className,
  cClassName,
  delay = 0,
  children,
}: AnimateSectionProps) => {
  const variants = {
    initial: { filter: 'blur(0.5rem)', opacity: 0, y: 8 },
    animate: { filter: 'blur(0)', opacity: 1, y: 0 },
    exit: { filter: 'blur(0.5rem)', opacity: 0, y: -8 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, delay }}
      className={cn('w-full', className)}
      layout
    >
      <div className={cClassName}>{children}</div>
    </motion.div>
  );
};

const Clipboard = ({ content }: ClipboardProps) => {
  const [status, setStatus] = useState(false);

  const onClickHandler = () => {
    setStatus(true);
    navigator.clipboard.writeText(content);
    setTimeout(() => setStatus(false), 1500);
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {!status ? (
        <AnimateSection key="copy" className="w-fit flex justify-center items-center">
          <button onClick={onClickHandler} className="cursor-pointer">
            <FiCopy size={16} />
          </button>
        </AnimateSection>
      ) : (
        <AnimateSection key="copied" className="w-fit flex justify-center items-center">
          <button className="cursor-not-allowed" type="button">
            <BsFillClipboardCheckFill size={16} color="#4ade80" />
          </button>
        </AnimateSection>
      )}
    </AnimatePresence>
  );
};

export default Clipboard;