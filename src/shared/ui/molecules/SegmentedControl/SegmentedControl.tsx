import type { ReactNode } from 'react';
import { cn } from '@/shared/lib';
import styles from './SegmentedControl.module.css';

export interface SegmentedControlOption<T extends string | number> {
  value: T;
  label: ReactNode;
}

export interface SegmentedControlProps<T extends string | number> {
  label?: string;
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  stretch?: boolean;
}

export const SegmentedControl = <T extends string | number>({
  label,
  options,
  value,
  onChange,
  className,
  stretch,
}: SegmentedControlProps<T>) => {
  return (
    <div className={cn(styles.control, className)}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={stretch ? styles.optionsStretch : styles.options}>
        {options.map((option) => (
          <button
            key={String(option.value)}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              styles.option,
              option.value === value && styles.optionSelected
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
