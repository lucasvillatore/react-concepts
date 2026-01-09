import { type CSSProperties } from 'react';

interface BaseImageProps {
  src: string;
  alt?: string;
  style?: CSSProperties;
}

export const BaseImage = ({ src, alt = 'Imagem', style }: BaseImageProps) => (
  <img
    src={src}
    alt={alt}
    style={{
      maxWidth: '100%',
      height: 'auto',
      display: 'block',
      borderRadius: 4,
      ...style
    }}
  />
);
