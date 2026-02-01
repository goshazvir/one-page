import { observer } from 'mobx-react-lite';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ListItem } from '@/shared/ui';
import type { Tag } from '@/entities/tagline';
import styles from './TagList.module.css';

export interface TagListProps {
  tags: Tag[];
  onTagClick: (tagId: string) => void;
  onTagDelete: (tagId: string) => void;
  onReorder?: (fromIndex: number, toIndex: number) => void;
}

export const TagList = observer(({ tags, onTagClick, onTagDelete, onReorder }: TagListProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tags.findIndex((tag) => tag.id === active.id);
      const newIndex = tags.findIndex((tag) => tag.id === over.id);
      onReorder?.(oldIndex, newIndex);
    }
  };

  if (tags.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No tags yet</p>
        <p>Click "Add item" to create your first tag</p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={tags.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className={styles.list}>
          {tags.map((tag) => (
            <ListItem
              key={tag.id}
              id={tag.id}
              onClick={() => onTagClick(tag.id)}
              onDelete={() => onTagDelete(tag.id)}
              draggable={true}
            >
              {tag.label}
            </ListItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
});
