'use client';

import SandBar from '@/components/Animation/SandBar';
import Whispers from '@/components/Animation/Whispers';
import { sleep } from '@/lib/utils';
import ActPop from '@/public/img/act-pop.png';
import LogoPop from '@/public/img/pop-1.png';
import MoviePop from '@/public/img/pop-2.png';
import TeamPop from '@/public/img/pop.png';
import SeriesPop from '@/public/img/series-pop.png';
import YoutubeChanelPop from '@/public/img/yc-pop.png';
import { motion, useAnimate, useAnimation } from 'motion/react';
import Image, { StaticImageData } from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface TCard {
  src: string | StaticImageData;
  alt: string;
}

const cards: TCard[] = [
  {
    src: LogoPop,
    alt: 'site logo',
  },
  {
    src: TeamPop,
    alt: 'popularity football club image: barcelona',
  },
  {
    src: MoviePop,
    alt: 'popularity Movie image: LOTR',
  },
  {
    src: ActPop,
    alt: 'popularity Actor image: LOTR',
  },
  {
    src: SeriesPop,
    alt: 'popularity Series image: LOTR',
  },
  {
    src: YoutubeChanelPop,
    alt: 'popularity Youtube image: LOTR',
  },
];

const TwistCard = () => {
  const [scope, animate] = useAnimate();
  const [activeCardInd, setActiveCardInd] = useState<number>(0);
  const whisperControls = useAnimation();

  useEffect(() => {
    let isMounted = true;

    const runSequence = async () => {
      if (!isMounted) return;

      await Promise.all([
        whisperControls.start('animate'),
        animate(
          ':scope > div',
          { rotateY: 0 },
          { duration: 0.5, type: 'tween', ease: 'linear' }
        ),
      ]);

      await sleep(2000);

      await Promise.all([
        whisperControls.start('exit'),
        animate(
          ':scope > div',
          { rotateY: 90 },
          { duration: 0.5, type: 'tween', ease: 'linear' }
        ),
      ]);

      setActiveCardInd((prev) => (prev === cards.length - 1 ? 0 : prev + 1));

      requestAnimationFrame(runSequence); // یا setTimeout(runSequence, 0)
    };

    runSequence();

    return () => {
      isMounted = false;
    };
  }, [animate, whisperControls]);

  return (
    <>
      <div ref={scope} className={'w-screen h-96 flex justify-center relative'}>
        <motion.div
          initial={{ rotateY: 90 }}
          className={
            'max-w-fit max-h-fit bg-white/30 dark:bg-slate-950/10 backdrop-blur-xl border border-zinc-200 dark:border-zinc-900 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors duration-500'
          }
        >
          <Image
            src={cards[activeCardInd].src}
            alt={'Team Pop'}
            width={300}
            height={300}
          />
        </motion.div>
      </div>
      <Hourglass cards={cards} activeInd={activeCardInd} />
      <Whispers activeInd={activeCardInd} controls={whisperControls} />
    </>
  );
};

const Hourglass = ({
  cards,
  activeInd,
}: {
  cards: TCard[];
  activeInd: number;
}) => {
  const [scope, animate] = useAnimate();
  const prevIndex = useRef(0);
  useEffect(() => {
    const enterAnimation = async () => {
      animate(`:scope > div:nth-child(${prevIndex.current + 1})`, {
        height: '2rem',
      });
      await animate(`:scope > div:nth-child(${prevIndex.current + 1}) > div`, {
        top: '-100%',
      });
      await animate(
        `:scope > div:nth-child(${activeInd + 1})`,
        {
          height: '4rem',
        },
        {
          duration: 0.3,
          type: 'tween',
          ease: 'linear',
        }
      );
      await animate(
        `:scope > div:nth-child(${activeInd + 1}) > div`,
        {
          top: '0%',
        },
        {
          duration: 1.7,
          type: 'tween',
          ease: 'easeInOut',
        }
      );
      prevIndex.current = activeInd;
    };
    enterAnimation().then();
  }, [activeInd, animate]);
  return (
    <div
      ref={scope}
      className={
        'absolute top-10 left-0 w-full h-fit flex flex-col justify-start items-end gap-y-1 px-4'
      }
    >
      {cards.map((_card, index) => {
        return <SandBar key={index} />;
      })}
    </div>
  );
};

export default TwistCard;
