import { type ReactNode } from 'react';

interface WithCaptionProps {
  text: string;
  children: ReactNode;
}

export const WithCaption = ({ text, children }: WithCaptionProps) => (
  <figure style={{ margin: 0, display: 'inline-block', textAlign: 'center' }}>
    {children}
    <figcaption style={{
      marginTop: '8px',
      fontStyle: 'italic',
      color: '#666',
      fontSize: '0.9em',
      fontFamily: 'serif'
    }}>
      {text}
    </figcaption>
  </figure>
);
