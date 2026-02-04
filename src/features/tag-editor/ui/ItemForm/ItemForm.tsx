import { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Panel, InputField } from '@/shared/ui';
import type { Tag } from '@/entities/tagline';
import styles from './ItemForm.module.css';

export interface ItemFormProps {
  tag?: Tag;
  onSave: (label: string, link: string) => void;
  onCreate?: (label: string, link: string) => string;
  onDelete?: (id: string) => void;
  onBack: () => void;
  onClose: () => void;
}

export const ItemForm = observer(({ tag, onSave, onCreate, onDelete, onBack, onClose }: ItemFormProps) => {
  const [label, setLabel] = useState(tag?.label || '');
  const [link, setLink] = useState(tag?.link || '');
  const createdIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (tag) {
      setLabel(tag.label);
      setLink(tag.link);
    } else {
      setLabel('');
      setLink('');
    }
    createdIdRef.current = null;
  }, [tag]);

  const isEditing = !!tag;

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLabel(value);

    if (isEditing) {
      if (!value.trim() && tag && onDelete) {
        onDelete(tag.id);
        onBack();
      } else {
        onSave(value.trim(), link.trim());
      }
    } else if (value.trim() && onCreate && !createdIdRef.current) {
      createdIdRef.current = onCreate(value.trim(), link.trim());
    } else if (createdIdRef.current) {
      if (!value.trim() && onDelete) {
        onDelete(createdIdRef.current);
        createdIdRef.current = null;
      } else {
        onSave(value.trim(), link.trim());
      }
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLink(value);

    if (isEditing || createdIdRef.current) {
      onSave(label.trim(), value.trim());
    }
  };

  return (
    <Panel>
      <Panel.Header title="Item" onBack={onBack} onClose={onClose} />
      <Panel.Content>
        <div className={styles.form}>
          <InputField
            label="Label"
            value={label}
            onChange={handleLabelChange}
            placeholder="Enter tag label"
            autoFocus
          />
          <InputField
            label="Link"
            value={link}
            onChange={handleLinkChange}
            placeholder="https://example.com"
          />
        </div>
      </Panel.Content>
    </Panel>
  );
});
