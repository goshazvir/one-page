import type { HTMLAttributes, ReactNode, CSSProperties, MouseEvent } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Text, Icon } from '@/shared/ui/atoms';
import { cn } from '@/shared/lib';
import styles from './ListItem.module.css';

export interface ListItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  children: ReactNode;
  id?: string;
  draggable?: boolean;
  onDelete?: () => void;
}

export const ListItem = ({
  children,
  id,
  draggable = false,
  onDelete,
  className,
  ...props
}: ListItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id ?? '',
    disabled: !draggable,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(styles.item, draggable && styles.itemDraggable, isDragging && styles.dragging, className)}
      {...(draggable ? { ...attributes, ...listeners } : {})}
      {...props}
    >
      {draggable && (
        <div className={styles.dragHandle}>
          <Icon name="drag-handle" size={16} />
        </div>
      )}
      <Text size="sm" className={styles.content}>
        {children}
      </Text>
      {onDelete && (
        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDelete}
          aria-label="Delete"
        >
          <Icon name="close" size={14} />
        </button>
      )}
    </div>
  );
};
