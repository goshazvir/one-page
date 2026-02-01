import { observer } from 'mobx-react-lite';
import { Panel, SegmentedControl, Icon } from '@/shared/ui';
import { TAG_STYLES, TAG_SIZES, TAG_RADII, TAG_ALIGNMENTS } from '@/shared/config';
import { cn } from '@/shared/lib';
import type { TaglineSettings } from '@/entities/tagline';
import styles from './StylesPanel.module.css';

export interface StylesPanelProps {
  settings: TaglineSettings;
  onSettingsChange: (updates: Partial<TaglineSettings>) => void;
  onBack: () => void;
  onClose?: () => void;
}

export const StylesPanel = observer(({
  settings,
  onSettingsChange,
  onBack,
  onClose,
}: StylesPanelProps) => {
  const sizeOptions = TAG_SIZES.map((size) => ({
    value: size,
    label: size,
  }));

  const radiusOptions = TAG_RADII.map((radius) => ({
    value: radius,
    label: String(radius),
  }));

  const alignmentOptions = TAG_ALIGNMENTS.map((alignment) => ({
    value: alignment,
    label: <Icon name={`align-${alignment}` as const} size={18} />,
  }));

  return (
    <Panel>
      <Panel.Header title="Styles" onBack={onBack} onClose={onClose} />
      <Panel.Content>
        <div className={styles.controls}>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>Style</span>
            <div className={styles.styleOptions}>
              {TAG_STYLES.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => onSettingsChange({ style })}
                  className={cn(
                    styles.styleOption,
                    styles[`styleOption${style}`],
                    settings.style === style && styles.styleOptionSelected
                  )}
                >
                  Aa
                </button>
              ))}
            </div>
          </div>

          <SegmentedControl
            label="Size"
            options={sizeOptions}
            value={settings.size}
            onChange={(size) => onSettingsChange({ size })}
          />

          <SegmentedControl
            label="Radius"
            options={radiusOptions}
            value={settings.radius}
            onChange={(radius) => onSettingsChange({ radius })}
          />

          <SegmentedControl
            options={alignmentOptions}
            value={settings.alignment}
            onChange={(alignment) => onSettingsChange({ alignment })}
            stretch
          />
        </div>
      </Panel.Content>
    </Panel>
  );
});
