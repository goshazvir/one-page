import type { TagStyle, TagSize, TagRadius, TagAlignment } from '@/shared/config';

export interface Tag {
  id: string;
  label: string;
  link: string;
}

export interface TaglineSettings {
  style: TagStyle;
  size: TagSize;
  radius: TagRadius;
  alignment: TagAlignment;
}

export interface Tagline {
  tags: Tag[];
  settings: TaglineSettings;
}

export const defaultSettings: TaglineSettings = {
  style: 1,
  size: 'L',
  radius: 8,
  alignment: 'center',
};
