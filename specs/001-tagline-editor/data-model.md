# Data Model: Tagline Element Editor

**Feature**: 001-tagline-editor
**Date**: 2026-02-01

## Entities

### Tag

Represents a single tagline item.

```typescript
interface Tag {
  id: string;        // UUID via crypto.randomUUID()
  label: string;     // Display text (required, non-empty)
  link: string;      // URL destination (optional, any text)
}
```

**Validation rules**:
- `label` must be non-empty string
- `link` can be empty string (optional field)
- `id` is auto-generated on creation

### TaglineSettings

Style configuration for all tags.

```typescript
interface TaglineSettings {
  style: TagStyle;       // Visual variant (1-4)
  size: TagSize;         // XL | L | M | S | XS
  radius: TagRadius;     // 0 | 4 | 8 | 12 | 100
  alignment: TagAlignment; // left | center | right
}

type TagStyle = 1 | 2 | 3 | 4;
type TagSize = 'XL' | 'L' | 'M' | 'S' | 'XS';
type TagRadius = 0 | 4 | 8 | 12 | 100;
type TagAlignment = 'left' | 'center' | 'right';
```

**Default values**:
```typescript
const defaultSettings: TaglineSettings = {
  style: 1,
  size: 'M',
  radius: 8,
  alignment: 'center'
};
```

### Tagline

Complete tagline element state.

```typescript
interface Tagline {
  tags: Tag[];
  settings: TaglineSettings;
}
```

## Stores

### TaglineStore

MobX store for tagline data.

```typescript
class TaglineStore {
  // Observable state
  tags: Tag[] = [];
  settings: TaglineSettings = defaultSettings;

  constructor() {
    makeAutoObservable(this);
    this.initializeWithDemoData();
  }

  // Computed
  get tagCount(): number {
    return this.tags.length;
  }

  getTagById(id: string): Tag | undefined {
    return this.tags.find(tag => tag.id === id);
  }

  // Actions
  addTag(label: string, link: string): void {
    const tag: Tag = {
      id: crypto.randomUUID(),
      label,
      link
    };
    this.tags.push(tag);
    this.saveTagsToServer();
  }

  updateTag(id: string, updates: Partial<Omit<Tag, 'id'>>): void {
    const tag = this.getTagById(id);
    if (tag) {
      Object.assign(tag, updates);
      this.saveTagsToServer();
    }
  }

  deleteTag(id: string): void {
    const index = this.tags.findIndex(tag => tag.id === id);
    if (index !== -1) {
      this.tags.splice(index, 1);
      this.saveTagsToServer();
    }
  }

  reorderTags(fromIndex: number, toIndex: number): void {
    const [tag] = this.tags.splice(fromIndex, 1);
    this.tags.splice(toIndex, 0, tag);
    this.saveTagsToServer();
  }

  updateSettings(updates: Partial<TaglineSettings>): void {
    Object.assign(this.settings, updates);
    this.debouncedSaveSettings();
  }

  // Private methods
  private saveTagsToServer(): void {
    apiSimulator.post('/tagline/tags', { tags: this.tags });
  }

  private debouncedSaveSettings = debounce(() => {
    apiSimulator.post('/tagline/settings', this.settings);
  }, 300);

  private initializeWithDemoData(): void {
    this.tags = [
      { id: crypto.randomUUID(), label: 'Marketing', link: 'https://onepage.io' },
      { id: crypto.randomUUID(), label: 'Design', link: 'https://onepage.io' },
      { id: crypto.randomUUID(), label: 'Development', link: 'https://onepage.io' },
      { id: crypto.randomUUID(), label: 'Front', link: 'https://onepage.io' },
      { id: crypto.randomUUID(), label: 'AI Engineering', link: 'https://onepage.io' }
    ];
  }
}
```

### PanelNavigationStore

MobX store for panel navigation state.

```typescript
type PanelType = 'main' | 'create' | 'edit' | 'styles';

class PanelNavigationStore {
  // Observable state
  currentPanel: PanelType = 'main';
  editingTagId: string | null = null;
  isOpen: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  // Computed
  get isEditing(): boolean {
    return this.currentPanel === 'edit' && this.editingTagId !== null;
  }

  // Actions
  goToMain(): void {
    this.currentPanel = 'main';
    this.editingTagId = null;
  }

  goToCreate(): void {
    this.currentPanel = 'create';
    this.editingTagId = null;
  }

  goToEdit(tagId: string): void {
    this.currentPanel = 'edit';
    this.editingTagId = tagId;
  }

  goToStyles(): void {
    this.currentPanel = 'styles';
    this.editingTagId = null;
  }

  close(): void {
    this.isOpen = false;
  }

  open(): void {
    this.isOpen = true;
    this.goToMain();
  }
}
```

## Root Store

Combines all stores for context provider.

```typescript
class RootStore {
  taglineStore: TaglineStore;
  navigationStore: PanelNavigationStore;

  constructor() {
    this.taglineStore = new TaglineStore();
    this.navigationStore = new PanelNavigationStore();
  }
}
```

## State Transitions

### Panel Navigation

```
[main] ──"Add item"──> [create] ──"Back"──> [main]
   │                       │
   │                       └──"Save"──> [main]
   │
   ├──"Click tag"──> [edit] ──"Back"──> [main]
   │                    │
   │                    └──"Save"──> [main]
   │
   └──"Styles"──> [styles] ──"Back"──> [main]
```

### Tag Lifecycle

```
[none] ──addTag()──> [exists] ──updateTag()──> [modified]
                        │
                        └──deleteTag()──> [none]
```
