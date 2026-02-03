import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Panel, InputField, Button } from '@/shared/ui';
import type { Tag } from '@/entities/tagline';
import styles from './ItemForm.module.css';

export interface ItemFormProps {
  mode: 'create' | 'edit';
  tag?: Tag;
  onSave: (label: string, link: string) => void;
  onBack: () => void;
  onClose: () => void;
}

export const ItemForm = observer(({ mode, tag, onSave, onBack, onClose }: ItemFormProps) => {
  const [label, setLabel] = useState(tag?.label || '');
  const [link, setLink] = useState(tag?.link || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (tag) {
      setLabel(tag.label);
      setLink(tag.link);
    } else {
      setLabel('');
      setLink('');
    }
    setError('');
  }, [tag]);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLabel(value);
    if (error) setError('');
    if (mode === 'edit' && value.trim()) {
      onSave(value.trim(), link.trim());
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLink(value);
    if (mode === 'edit' && label.trim()) {
      onSave(label.trim(), value.trim());
    }
  };

  const handleCreate = () => {
    if (!label.trim()) {
      setError('Label is required');
      return;
    }
    onSave(label.trim(), link.trim());
    onBack();
  };

  const title = 'Item';

  return (
    <Panel>
      <Panel.Header title={title} onBack={onBack} onClose={onClose} />
      <Panel.Content>
        <div className={styles.form}>
          <InputField
            label="Label"
            value={label}
            onChange={handleLabelChange}
            placeholder="Enter tag label"
            error={error}
            autoFocus
          />
          <InputField
            label="Link"
            value={link}
            onChange={handleLinkChange}
            placeholder="https://example.com"
          />
          {mode === 'create' && (
            <Button onClick={handleCreate} className={styles.saveButton}>
              Add
            </Button>
          )}
        </div>
      </Panel.Content>
    </Panel>
  );
});
