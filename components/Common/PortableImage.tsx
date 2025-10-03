import React from 'react'
import SanityImage from './SanityImage';

type ImageProps = {
  value: {
    alt: string;
    caption: string;
  }
}

const PortableImage = ({ value }: ImageProps) => {
  return (
    <figure className='my-4'>
      <SanityImage src={value} alt={value.alt} />
      {value.caption && <figcaption className='text-center font-iranYWL text-xs font-extralight tracking-tighter leading-none my-2 dark:text-zinc-500'>{value.caption}</figcaption>}
    </figure>
  )
}

export default PortableImage