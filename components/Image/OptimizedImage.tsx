import { getImage } from '@/lib/getImage';
import { cn } from '@/lib/utils';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

type OptimizedImageProps = {
  src: string | StaticImageData;
  alt: string;
  priority: boolean;
  quality: number;
  sizes: string;
  className?: string;
};

const OptimizedImage = async ({
  src,
  alt,
  priority = false,
  quality = 80,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className,
}: OptimizedImageProps): Promise<React.ReactNode> => {
  const { base64, img } = await getImage(src);
  return (
    <Image
      {...img}
      alt={alt}
      priority={priority}
      quality={quality}
      sizes={sizes}
      className={cn('', className)}
      placeholder={'blur'}
      blurDataURL={base64}
    />
  );
};

export default OptimizedImage;
