# API Simulation Contracts

**Feature**: 001-tagline-editor
**Date**: 2026-02-01

## Overview

API calls are simulated via `console.log()`. No actual network requests.

## Endpoints

### POST /tagline/tags

Save all tags (after add, update, delete, reorder).

**Request**:
```typescript
{
  tags: Array<{
    id: string;
    label: string;
    link: string;
  }>
}
```

**Simulation**:
```typescript
console.log('POST http://api/tagline/tags', { tags });
```

**Trigger**: Immediately on tag mutation

---

### POST /tagline/settings

Save style settings.

**Request**:
```typescript
{
  style: 1 | 2 | 3 | 4;
  size: 'XL' | 'L' | 'M' | 'S' | 'XS';
  radius: 0 | 4 | 8 | 12 | 100;
  alignment: 'left' | 'center' | 'right';
}
```

**Simulation**:
```typescript
console.log('POST http://api/tagline/settings', settings);
```

**Trigger**: 300ms debounce after last setting change

---

## Implementation

```typescript
// shared/api/apiSimulator.ts
export const apiSimulator = {
  post: (endpoint: string, data: unknown): void => {
    console.log(`POST http://api${endpoint}`, data);
  }
};
```

## Usage Example

```typescript
// In TaglineStore
import { apiSimulator } from '@/shared/api';
import { debounce } from '@/shared/lib';

class TaglineStore {
  private saveTagsToServer(): void {
    apiSimulator.post('/tagline/tags', { tags: this.tags });
  }

  private debouncedSaveSettings = debounce(() => {
    apiSimulator.post('/tagline/settings', this.settings);
  }, 300);
}
```
