import { type ReactNode } from 'react';

interface BorderFrameProps {
  color: string;
  width?: string;
  style?: 'solid' | 'dashed' | 'dotted' | 'double';
  padding?: string;
  children: ReactNode;
}

export const BorderFrame = ({
  color,
  width = '4px',
  style = 'solid',
  padding = '4px',
  children
}: BorderFrameProps) => (
  <div style={{
    border: `${width} ${style} ${color}`,
    padding: padding,
    display: 'inline-block',
    backgroundColor: '#fff'
  }}>
    {children}
  </div>
);
