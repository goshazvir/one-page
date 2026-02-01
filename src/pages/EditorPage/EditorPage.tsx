import { observer } from 'mobx-react-lite';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '@/app/providers';
import { TaglinePreview } from '@/entities/tagline';
import { MainPanel, ItemForm } from '@/features/tag-editor';
import { StylesPanel } from '@/features/style-settings';
import styles from './EditorPage.module.css';

const panelVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const panelTransition = {
  duration: 0.2,
  ease: 'easeInOut' as const,
};

export const EditorPage = observer(() => {
  const { taglineStore, navigationStore } = useStore();

  const handleTagClick = (tagId: string) => {
    navigationStore.goToEdit(tagId);
  };

  const handleAddTag = (label: string, link: string) => {
    taglineStore.addTag(label, link);
  };

  const handleUpdateTag = (label: string, link: string) => {
    if (navigationStore.editingTagId) {
      taglineStore.updateTag(navigationStore.editingTagId, { label, link });
    }
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    taglineStore.reorderTags(fromIndex, toIndex);
  };

  const handleDeleteTag = (tagId: string) => {
    taglineStore.deleteTag(tagId);
  };

  const renderPanelContent = () => {
    switch (navigationStore.currentPanel) {
      case 'main':
        return (
          <motion.div
            key="main"
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={panelTransition}
          >
            <MainPanel
              tags={taglineStore.tags}
              onTagClick={handleTagClick}
              onTagDelete={handleDeleteTag}
              onReorder={handleReorder}
              onAddClick={() => navigationStore.goToCreate()}
              onStylesClick={() => navigationStore.goToStyles()}
              onClose={() => navigationStore.close()}
            />
          </motion.div>
        );

      case 'create':
        return (
          <motion.div
            key="create"
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={panelTransition}
          >
            <ItemForm
              mode="create"
              onSave={handleAddTag}
              onBack={() => navigationStore.goToMain()}
            />
          </motion.div>
        );

      case 'edit': {
        const editingTag = navigationStore.editingTagId
          ? taglineStore.getTagById(navigationStore.editingTagId)
          : undefined;
        return (
          <motion.div
            key="edit"
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={panelTransition}
          >
            <ItemForm
              mode="edit"
              tag={editingTag}
              onSave={handleUpdateTag}
              onBack={() => navigationStore.goToMain()}
            />
          </motion.div>
        );
      }

      case 'styles':
        return (
          <motion.div
            key="styles"
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={panelTransition}
          >
            <StylesPanel
              settings={taglineStore.settings}
              onSettingsChange={(updates) => taglineStore.updateSettings(updates)}
              onBack={() => navigationStore.goToMain()}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.preview}>
        <TaglinePreview
          tags={taglineStore.tags}
          settings={taglineStore.settings}
        />
      </div>
      <div className={styles.panel}>
        <AnimatePresence mode="wait">
          {navigationStore.isOpen && renderPanelContent()}
        </AnimatePresence>
      </div>
    </div>
  );
});
