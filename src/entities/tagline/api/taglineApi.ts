import { apiSimulator } from '@/shared/api';
import type { Tag, TaglineSettings } from '../model';

export const taglineApi = {
  saveTags: (tags: Tag[]): void => {
    apiSimulator.post('/tagline/tags', { tags });
  },

  saveSettings: (settings: TaglineSettings): void => {
    apiSimulator.post('/tagline/settings', settings);
  },
};
