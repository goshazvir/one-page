import type { InputHTMLAttributes } from 'react';
import { Input } from '@/shared/ui/atoms';
import { Text } from '@/shared/ui/atoms';
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
    <div className={cn(styles.field, className)}>
      <Text as="label" size="xs" color="secondary" className={styles.label}>
        {label}
      </Text>
      <Input id={inputId} error={!!error} {...props} />
      {error && (
        <Text size="xs" className={styles.error}>
          {error}
        </Text>
      )}
    </div>
  );
};
