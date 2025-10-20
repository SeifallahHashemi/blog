'use client';

import PhotoOne from '@/public/img/card-01.png';
import PhotoTwo from '@/public/img/card-02.png';
import PhotoThree from '@/public/img/card-03.png';
import React, { useEffect, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';

const data = [
  {
    id: 100,
    title: 'پست آزمایشی',
    text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
    src: PhotoOne,
  },
  {
    id: 101,
    title: 'پست آزمایشی',
    text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
    src: PhotoTwo,
  },
  {
    id: 102,
    title: 'پست آزمایشی',
    text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
    src: PhotoThree,
  },
];

const SpotlightGlowingCard = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    const HandleMouseMove = (e: MouseEvent) => {
      cardsRef.current.forEach((card) => {
        if (card) {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        }
      });
    };
    document.addEventListener('mousemove', HandleMouseMove);

    return () => {
      document.removeEventListener('mousemove', HandleMouseMove);
    };
  }, []);
  return (
    <div
      className={
        'w-full flex flex-wrap gap-10 justify-center items-center group'
      }
    >
      {data.map((item, ind) => {
        return (
          <Card
            key={item.id}
            title={item.title}
            text={item.text}
            src={item.src}
            ref={(el: HTMLDivElement | null) => {
              if (el) {
                cardsRef.current[ind] = el;
              }
            }}
          />
        );
      })}
    </div>
  );
};

interface CardProps {
  ref: React.RefCallback<HTMLDivElement>;
  title: string;
  text: string;
  src: string | StaticImageData;
}

const Card = ({ ref, title, text, src }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={
        'relative overflow-clip rounded-xl bg-gray-200 dark:bg-zinc-800 w-[300px] h-[380px] group cursor-pointer transition-colors duration-300'
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* bg glowing */}
      <div
        className={
          'absolute z-30 pointer-events-none inset-0 transition-opacity duration-500 blur-md'
        }
        style={{
          background:
            'radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), rgba(99,102,241,0.1), transparent 70%)',
          opacity: isHovered ? 1 : 0,
        }}
      />
      {/* border glowing */}
      <div
        className={
          'absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md'
        }
        style={{
          background:
            'radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), rgba(99,102,241,1), transparent 70%)',
        }}
      />
      {/* content */}
      <div
        className={
          'absolute inset-0.5 rounded-xl overflow-clip bg-zinc-100 dark:bg-neutral-950 z-20 px-1.5 transition-colors duration-300'
        }
      >
        <div
          className={
            'flex flex-col gap-y-6 h-full items-center text-center justify-center'
          }
        >
          {/* Image Section */}
          <div className="relative inline-flex">
            <div
              className="w-[40%] h-[40%] absolute inset-0 m-auto -translate-y-[10%] blur-3xl -z-10 rounded-full bg-indigo-200 dark:bg-indigo-600"
              aria-hidden="true"
            />
            <Image src={src} alt={'pic'} width={180} height={180} />
            <div
              className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/2 aspect-square"
              aria-hidden="true"
            >
              <div className="absolute inset-0 translate-z-0 bg-slate-200 dark:bg-slate-800 rounded-full blur-[80px]" />
            </div>
          </div>
          {/* Text */}
          <div className="flex flex-col gap-y-2">
            <h2 className="text-lg text-zinc-800 dark:text-zinc-100 font-semibold font-iranYWL mb-1">
              {title}
            </h2>
            <p className="text-xs text-gray-400 dark:text-gray-400 font-iranYWR leading-relaxed">
              {text}
            </p>
          </div>
        </div>
        <div
          className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/2 aspect-square"
          aria-hidden="true"
        >
          <div className="absolute inset-0 translate-z-0 bg-slate-100 dark:bg-slate-800 rounded-full blur-[80px]" />
        </div>
      </div>
    </div>
  );
};

export default SpotlightGlowingCard;
