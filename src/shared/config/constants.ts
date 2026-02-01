export const TAG_STYLES = [1, 2, 3, 4] as const;
export type TagStyle = (typeof TAG_STYLES)[number];

export const TAG_SIZES = ['XL', 'L', 'M', 'S', 'XS'] as const;
export type TagSize = (typeof TAG_SIZES)[number];

export const TAG_RADII = [0, 4, 8, 12, 100] as const;
export type TagRadius = (typeof TAG_RADII)[number];

export const TAG_ALIGNMENTS = ['left', 'center', 'right'] as const;
export type TagAlignment = (typeof TAG_ALIGNMENTS)[number];

export const SIZE_VALUES: Record<TagSize, { fontSize: number; padding: string }> = {
  XL: { fontSize: 18, padding: '12px 24px' },
  L: { fontSize: 16, padding: '10px 20px' },
  M: { fontSize: 14, padding: '8px 16px' },
  S: { fontSize: 12, padding: '6px 12px' },
  XS: { fontSize: 10, padding: '4px 8px' },
};

export const DEBOUNCE_DELAY = 300;
