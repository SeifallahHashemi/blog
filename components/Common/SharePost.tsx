'use client';

import React from 'react';
import { IconType } from 'react-icons/lib';

type SharePostProps = {
  title: string;
  url: string;
  text: string;
  Icon: IconType;
};

const SharePost = ({ text, url, title, Icon }: SharePostProps) => {
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
    <button onClick={handleShare} className="">
      <Icon size={20} />
    </button>
  );
};

export default SharePost;
