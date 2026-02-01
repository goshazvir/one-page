import { observer } from 'mobx-react-lite';
import { Panel, Button, Icon } from '@/shared/ui';
import type { Tag } from '@/entities/tagline';
import { TagList } from '../TagList';
import styles from './MainPanel.module.css';

export interface MainPanelProps {
  tags: Tag[];
  onTagClick: (tagId: string) => void;
  onTagDelete: (tagId: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  onAddClick: () => void;
  onStylesClick: () => void;
  onClose: () => void;
}

export const MainPanel = observer(({
  tags,
  onTagClick,
  onTagDelete,
  onReorder,
  onAddClick,
  onStylesClick,
  onClose,
}: MainPanelProps) => {
  return (
    <Panel>
      <Panel.Header title="Tagline" onClose={onClose} />
      <Panel.Content>
        <div className={styles.content}>
          <TagList tags={tags} onTagClick={onTagClick} onTagDelete={onTagDelete} onReorder={onReorder} />

          <Button variant="ghost" onClick={onAddClick} className={styles.addButton}>
            <Icon name="plus" size={16} />
            Add item
          </Button>
        </div>
      </Panel.Content>

      <div className={styles.footer}>
        <Button variant="secondary" onClick={onStylesClick} className={styles.stylesButton}>
          <span className={styles.stylesLeft}>
            Styles
          </span>
          <Icon name="chevron-right" size={18} className={styles.chevronIcon} />
        </Button>
      </div>
    </Panel>
  );
});
