import { observer } from 'mobx-react-lite';
import { cn } from '@/shared/lib';
import type { TaglineSettings } from '../../model';
import styles from './TagChip.module.css';

export interface TagChipProps {
  label: string;
  settings: TaglineSettings;
  className?: string;
  onClick?: () => void;
}

export const TagChip = observer(({ label, settings, className, onClick }: TagChipProps) => {
  const chipStyle = {
    '--chip-radius': `${settings.radius}px`,
  } as React.CSSProperties;

  return (
    <span
      className={cn(
        styles.chip,
        styles[`style-${settings.style}`],
        styles[`size-${settings.size}`],
        className
      )}
      style={chipStyle}
      onClick={onClick}
    >
      {label}
    </span>
  );
});
