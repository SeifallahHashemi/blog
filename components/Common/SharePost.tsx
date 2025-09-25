'use client';

import React from 'react';
import { BsWhatsapp } from 'react-icons/bs';
import { FaFacebookSquare } from 'react-icons/fa';
import { LiaTelegram } from 'react-icons/lia';
import { RiTwitterXFill } from 'react-icons/ri';

type SharePostProps = {
  title: string;
  url: string;
  text: string;
};

const socialMedia = [
  { name: 'telegram', Icon: LiaTelegram },
  { name: 'whatsapp', Icon: BsWhatsapp },
  { name: 'twitter', Icon: RiTwitterXFill },
  { name: 'facebook', Icon: FaFacebookSquare },
];

const SharePost = ({ text, url, title }: SharePostProps) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url, text });
      } catch (error) {
        console.error('خطا در اشتراک گذاری: ', error);
      }
    } else {
      alert('مرورگر شما از اشتراک گذاری پشتیبانی نمی کند.');
    }
  };
  return (
    <div className="w-full h-full py-6 px-1 flex flex-row gap-2 flex-wrap justify-center items-center">
      {socialMedia.map((media) => (
        <button
          onClick={handleShare}
          className="size-12 rounded-lg dark:bg-primary-bg bg-zinc-100 border border-zinc-200 dark:border-zinc-900 flex justify-center items-center cursor-pointer"
          key={media.name}
        >
          <media.Icon size={20} />
        </button>
      ))}
    </div>
  );
};

export default SharePost;
