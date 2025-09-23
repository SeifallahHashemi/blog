'use client';

import { socialLinks } from '@/components/Data/social';
import RefLink from '@/components/Shared/RefLink';
import { motion } from 'motion/react';
import React from 'react';

const Social = () => {
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.6,
      },
    },
  };
  const itemVariants = {
    initial: { filter: 'blur(0.5rem)', opacity: 0, translateY: '1rem' },
    animate: {
      filter: 'blur(0)',
      opacity: 1,
      translateY: '0',
      transition: { duration: 0.4 },
    },
  };
  return (
    <motion.ul
      className={'flex flex-wrap justify-center items-center gap-x-5 gap-y-4'}
      variants={containerVariants}
      initial={'initial'}
      animate={'animate'}
    >
      {socialLinks.toReversed().map((item) => (
        <motion.li
          key={item.id}
          className={'text-gray-900 dark:text-gray-500'}
          variants={itemVariants}
        >
          <RefLink
            href={item.url}
            target={'_blank'}
            className={
              '!font-sans flex flex-row-reverse justify-center items-center gap-x-2 border-b border-b-zinc-200 dark:border-b-zinc-800 group hover:text-portfolio-primary dark:hover:text-gray-50 duration-300'
            }
          >
            <item.icon
              className={
                'group-hover:text-portfolio-primary dark:group-hover:text-gray-50 duration-300'
              }
              aria-hidden="true"
            />
            {item.name}
          </RefLink>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default Social;
