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
}

export const ItemForm = observer(({ mode, tag, onSave, onBack }: ItemFormProps) => {
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

  const handleSave = () => {
    if (!label.trim()) {
      setError('Label is required');
      return;
    }
    onSave(label.trim(), link.trim());
    onBack();
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
    if (error) setError('');
  };

  const title = mode === 'create' ? 'Item' : 'Item';

  return (
    <Panel>
      <Panel.Header title={title} onBack={onBack} />
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
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://example.com"
          />
          <Button onClick={handleSave} className={styles.saveButton}>
            {mode === 'create' ? 'Add' : 'Save'}
          </Button>
        </div>
      </Panel.Content>
    </Panel>
  );
});
