import { observer } from 'mobx-react-lite';
import { Text } from '@/shared/ui';
import { cn } from '@/shared/lib';
import type { Tag, TaglineSettings } from '../../model';
import { TagChip } from '../TagChip';
import styles from './TaglinePreview.module.css';

export interface TaglinePreviewProps {
  tags: Tag[];
  settings: TaglineSettings;
  className?: string;
  onClick?: () => void;
}

export const TaglinePreview = observer(
  ({ tags, settings, className, onClick }: TaglinePreviewProps) => {
    return (
      <div className={cn(styles.preview, className)} onClick={onClick}>
        <Text as="h1" size="xl" weight="medium" className={styles.heading}>
          Tagline element
        </Text>
        <div
          className={cn(styles.tags, styles[`align-${settings.alignment}`])}
        >
          {tags.map((tag) => (
            <TagChip
              key={tag.id}
              label={tag.label}
              settings={settings}
            />
          ))}
        </div>
      </div>
    );
  }
);
