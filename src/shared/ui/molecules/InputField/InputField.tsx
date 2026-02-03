import type { InputHTMLAttributes } from 'react';
import { cn } from '@/shared/lib';
import styles from './InputField.module.css';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField = ({
  label,
  error,
  id,
  className,
  ...props
}: InputFieldProps) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={cn(styles.field, error && styles.fieldError, className)}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <input id={inputId} className={styles.input} {...props} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
