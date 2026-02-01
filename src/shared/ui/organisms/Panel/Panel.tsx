import type { ReactNode } from 'react';
import { cn } from '@/shared/lib';
import { PanelHeader, type PanelHeaderProps } from './PanelHeader';
import styles from './Panel.module.css';

export interface PanelProps {
  children: ReactNode;
  className?: string;
}

const PanelDots = () => (
  <div className={styles.dots}>
    <span className={styles.dot} />
    <span className={styles.dot} />
    <span className={styles.dot} />
    <span className={styles.dot} />
    <span className={styles.dot} />
  </div>
);

export const Panel = ({ children, className }: PanelProps) => {
  return (
    <div className={cn(styles.panel, className)}>
      <PanelDots />
      {children}
    </div>
  );
};

Panel.Header = PanelHeader;

export interface PanelContentProps {
  children: ReactNode;
  className?: string;
}

export const PanelContent = ({ children, className }: PanelContentProps) => {
  return <div className={cn(styles.content, className)}>{children}</div>;
};

Panel.Content = PanelContent;

export type { PanelHeaderProps };
