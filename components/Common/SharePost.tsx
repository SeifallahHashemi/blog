'use client';

import React from 'react';
import { BsWhatsapp } from 'react-icons/bs';
import { FaFacebookSquare } from 'react-icons/fa';
import { LiaTelegram } from 'react-icons/lia';
import { RiTwitterXFill } from 'react-icons/ri';
import { FaLinkedin } from "react-icons/fa6";

type SharePostProps = {
  title: string;
  url: string;
  text: string;
};

const SharePost = ({ text, url, title }: SharePostProps) => {
  const fullUrl = typeof window !== 'undefined' ? window.location.href : url;

  
const socialMedia = [
  { name: 'telegram', Icon: LiaTelegram, url: `https://t.me/share/url?url=${fullUrl}&text=${text}` },
  { name: 'whatsapp', Icon: BsWhatsapp, url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        "پست جدید از وبلاگ"
      )}.%0A%0A${title}%0A%0A${fullUrl}` },
  { name: 'twitter', Icon: RiTwitterXFill, url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        "پست جدید از وبلاگ"
      )}.%0A%0A${title}%0A%0A${fullUrl}` },
  { name: 'facebook', Icon: FaFacebookSquare, url: `https://www.facebook.com/sharer.php?u=${fullUrl}` },
  { name: 'linkedin', Icon: FaLinkedin, url: `https://linkedin.com/sharing/share-offsite/?url=${fullUrl}}&title=${title}&summary=${text}` },
];

const popupWindow = (url: string) => {
  window.open(url, '', 'width=600,height=400,left=200,top=200');
};

  return (
    <div className="w-full h-full py-6 px-1 flex flex-row gap-2 flex-wrap justify-center items-center">
      {socialMedia.map((media) => (
        <button
          onClick={popupWindow.bind(this, media.url)}
          className="size-12 rounded-lg dark:bg-primary-bg bg-zinc-100 border border-zinc-200 dark:border-zinc-900 flex justify-center items-center cursor-pointer"
          key={media.name}
          rel="noopener noreferrer"
        >
          <media.Icon size={20} />
        </button>
      ))}
    </div>
  );
};

export default SharePost;
