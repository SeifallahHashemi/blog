'use client';

import React from 'react';

type SharePostProps = {
  title: string;
  url: string;
  text: string;
  icon: React.ReactNode;
};

const SharePost = ({ text, url, title, icon }: SharePostProps) => {
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
      {icon}
    </button>
  );
};

export default SharePost;
