import { makeAutoObservable, toJS } from 'mobx';
import { debounce } from '@/shared/lib';
import { apiSimulator } from '@/shared/api';
import type { Tag, TaglineSettings } from './types';
import { defaultSettings } from './types';

export class TaglineStore {
  tags: Tag[] = [];
  settings: TaglineSettings = defaultSettings;

  constructor() {
    makeAutoObservable(this);
    this.initializeWithDemoData();
  }

  get tagCount(): number {
    return this.tags.length;
  }

  getTagById(id: string): Tag | undefined {
    return this.tags.find((tag) => tag.id === id);
  }

  addTag(label: string, link: string): void {
    const tag: Tag = {
      id: crypto.randomUUID(),
      label,
      link,
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
    const index = this.tags.findIndex((tag) => tag.id === id);
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

  private saveTagsToServer(): void {
    apiSimulator.post('/tagline/tags', { tags: toJS(this.tags) });
  }

  private debouncedSaveSettings = debounce(() => {
    apiSimulator.post('/tagline/settings', toJS(this.settings));
  }, 300);

  private initializeWithDemoData(): void {
    this.tags = [
      { id: crypto.randomUUID(), label: 'Marketing', link: 'https://onepage.io' },
      { id: crypto.randomUUID(), label: 'Design', link: 'https://onepage.io' },
      { id: crypto.randomUUID(), label: 'Development', link: 'https://onepage.io' },
      { id: crypto.randomUUID(), label: 'Front', link: 'https://onepage.io' },
      { id: crypto.randomUUID(), label: 'AI Engineering', link: 'https://onepage.io' },
    ];
  }
}
