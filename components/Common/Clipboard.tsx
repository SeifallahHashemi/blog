'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { BsFillClipboardCheckFill } from 'react-icons/bs';
import { FiCopy } from 'react-icons/fi';
import AnimateSection from '../Animation/AnimateSection';

interface ClipboardProps {
  content: string;
}

const Clipboard = ({ content }: ClipboardProps) => {
  const [status, setStatus] = useState(false);

  const onClickHandler = () => {
    setStatus(true);
    navigator.clipboard.writeText(content);
    setTimeout(() => {
      setStatus(false);
    }, 1000);
  };

  return (
    <AnimatePresence mode="popLayout">
      {!status ? (
        <AnimateSection className='w-fit flex justify-center items-center'>
          <button onClick={onClickHandler}>
            <FiCopy />
          </button>
        </AnimateSection>
      ) : (
        <AnimateSection>
          <BsFillClipboardCheckFill />
        </AnimateSection>
      )}
    </AnimatePresence>
  );
};

export default Clipboard;
