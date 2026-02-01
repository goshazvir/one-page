import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/lib';
import styles from './Text.module.css';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TextColor = 'primary' | 'secondary' | 'accent';

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'label';
  children: ReactNode;
}

export const Text = ({
  size = 'sm',
  weight = 'normal',
  color = 'primary',
  as: Component = 'span',
  className,
  children,
  ...props
}: TextProps) => {
  return (
    <Component
      className={cn(
        styles.text,
        styles[`size-${size}`],
        styles[`weight-${weight}`],
        styles[`color-${color}`],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
