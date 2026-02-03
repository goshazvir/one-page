export const icons = {
  plus: {
    viewBox: '0 0 24 24',
    path: 'M12 5v14M5 12h14',
  },
  'arrow-left': {
    viewBox: '0 0 24 24',
    path: 'M19 12H5M12 19l-7-7 7-7',
  },
  close: {
    viewBox: '0 0 24 24',
    path: 'M18 6L6 18M6 6l12 12',
  },
  'drag-handle': {
    viewBox: '0 0 24 24',
    path: 'M12 6h.01M12 12h.01M12 18h.01',
  },
  'align-left': {
    viewBox: '0 0 24 24',
    path: 'M3 6h18M3 12h12M3 18h18',
  },
  'align-center': {
    viewBox: '0 0 24 24',
    path: 'M3 6h18M6 12h12M3 18h18',
  },
  'align-right': {
    viewBox: '0 0 24 24',
    path: 'M3 6h18M9 12h12M3 18h18',
  },
  'chevron-right': {
    viewBox: '0 0 24 24',
    path: 'M9 18l6-6-6-6',
  },
  styles: {
    viewBox: '0 0 24 24',
    path: 'M19 11h-6V5h-2v6H5v2h6v6h2v-6h6zM5.99 4L4 5.99l2.58 2.58L4 11.15l1.41 1.41L8 10l2.58 2.58L12 11.17l-2.58-2.58L12 6l-1.41-1.41L8 7.17 5.99 4z',
  },
  'paint-bucket': {
    viewBox: '0 0 24 24',
    path: 'M3 17l6-6-2-2-6 6 2 2zM11 9l6-6 2 2-6 6-2-2zM7 13l10 10M17 3L3 17',
  },
} as const;

export type IconName = keyof typeof icons;
