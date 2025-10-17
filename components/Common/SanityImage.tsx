import { urlFor } from '@/lib/sanity.image';
import { cn } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';

type SIProps = {
  src: object;
  alt: string;
  className?: string;
};

const SanityImage = ({ src, alt, className }: SIProps) => {
  return (
    <Image
      src={urlFor(src).url()}
      alt={alt}
      className={cn('', className)}
      width={1920}
      height={1080}
      quality={100}
      sizes="100dvw"
      placeholder="blur"
      blurDataURL={urlFor(src).blur(10).quality(10).url()}
    />
  );
};

export default SanityImage;
