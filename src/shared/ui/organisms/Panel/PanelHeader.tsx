import { Button, Icon } from '@/shared/ui/atoms';
import styles from './Panel.module.css';

export interface PanelHeaderProps {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
}

export const PanelHeader = ({ title, onBack, onClose }: PanelHeaderProps) => {
  return (
    <div className={styles.header}>
      {onBack && (
        <div className={styles.backButton}>
          <Button variant="icon" onClick={onBack} aria-label="Back">
            <Icon name="arrow-left" size={18} />
          </Button>
        </div>
      )}
      <span className={styles.title}>{title}</span>
      {onClose && (
        <div className={styles.headerButton}>
          <Button variant="icon" onClick={onClose} aria-label="Close">
            <Icon name="close" size={18} />
          </Button>
        </div>
      )}
    </div>
  );
};
