import { createContext } from 'react';
import { TaglineStore } from '@/entities/tagline';
import { PanelNavigationStore } from '@/features/tag-editor';

export class RootStore {
  taglineStore: TaglineStore;
  navigationStore: PanelNavigationStore;

  constructor() {
    this.taglineStore = new TaglineStore();
    this.navigationStore = new PanelNavigationStore();
  }
}

export const StoreContext = createContext<RootStore | null>(null);
