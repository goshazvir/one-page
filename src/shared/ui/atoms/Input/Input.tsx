import type { InputHTMLAttributes } from 'react';
import { cn } from '@/shared/lib';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = ({ error, className, ...props }: InputProps) => {
  return (
    <input
      className={cn(styles.input, error && styles.error, className)}
      {...props}
    />
  );
};
