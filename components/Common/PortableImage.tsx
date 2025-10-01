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
    <figure>
      <SanityImage src={value} alt={value.alt} />
      {value.caption && <figcaption>{value.caption}</figcaption>}
    </figure>
  )
}

export default PortableImage