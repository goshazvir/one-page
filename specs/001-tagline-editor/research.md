# Research: Tagline Element Editor

**Feature**: 001-tagline-editor
**Date**: 2026-02-01

## Technology Decisions

### 1. State Management: MobX

**Decision**: Use MobX with `makeAutoObservable` and React Context

**Rationale**:
- Required by task specification
- Fine-grained reactivity — only affected components re-render
- Minimal boilerplate compared to Redux
- Class-based stores provide clear encapsulation

**Alternatives considered**:
- Redux Toolkit — More boilerplate, overkill for this scope
- Zustand — Simpler but task requires MobX
- React Context alone — Would require manual optimization

**Implementation pattern**:
```typescript
class TaglineStore {
  tags: Tag[] = [];
  settings: TaglineSettings = defaultSettings;

  constructor() {
    makeAutoObservable(this);
  }

  addTag(label: string, link: string) {
    this.tags.push({ id: crypto.randomUUID(), label, link });
  }
}
```

### 2. Styling: CSS Modules

**Decision**: CSS Modules with CSS custom properties for theming

**Rationale**:
- Zero runtime overhead
- Native Vite support
- Good isolation per component
- CSS variables enable consistent theming

**Alternatives considered**:
- Tailwind CSS — Good for rapid development but verbose JSX
- Styled Components — Runtime overhead, less ideal with MobX re-renders
- Vanilla CSS — No isolation

**Implementation pattern**:
```css
/* Button.module.css */
.button {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
}
.primary {
  background: var(--color-accent);
}
```

### 3. Drag & Drop: @dnd-kit

**Decision**: @dnd-kit/core + @dnd-kit/sortable

**Rationale**:
- Modern, built for React 18+
- Accessible by default
- Tree-shakeable (small bundle)
- Excellent documentation

**Alternatives considered**:
- react-beautiful-dnd — Deprecated, no longer maintained
- react-dnd — More complex API, heavier bundle
- Native HTML5 DnD — Poor mobile support, complex implementation

**Implementation pattern**:
```typescript
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
```

### 4. Animations: framer-motion

**Decision**: framer-motion for panel transitions

**Rationale**:
- Declarative API
- AnimatePresence for exit animations
- Performance optimized
- Easy spring physics

**Alternatives considered**:
- CSS transitions — Limited for enter/exit animations
- react-spring — Similar but less intuitive API
- GSAP — Overkill for simple panel slides

**Implementation pattern**:
```typescript
<AnimatePresence mode="wait">
  <motion.div
    key={currentPanel}
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -300, opacity: 0 }}
  />
</AnimatePresence>
```

### 5. Icons: Custom SVGs

**Decision**: Inline SVG components wrapped in Icon atom

**Rationale**:
- Exact match to Figma design
- No external dependencies
- Full styling control via CSS
- Tree-shakeable

**Alternatives considered**:
- Lucide React — Good library but may not match Figma exactly
- FontAwesome — Heavy, licensing concerns
- Icon fonts — Less flexible styling

**Required icons**:
- `plus` — Add item button
- `arrow-left` — Back navigation
- `close` — Close panel
- `drag-handle` — Drag indicator (6 dots)
- `align-left`, `align-center`, `align-right` — Alignment options

### 6. ID Generation: crypto.randomUUID()

**Decision**: Use built-in `crypto.randomUUID()`

**Rationale**:
- Built into all modern browsers
- No npm package needed
- Guaranteed unique UUIDs

**Alternatives considered**:
- nanoid — External dependency
- Math.random() — Not guaranteed unique
- uuid package — External dependency

## Architecture Decisions

### Panel Navigation State Machine

**Decision**: Discriminated union for panel states

```typescript
type PanelState =
  | { panel: 'main' }
  | { panel: 'create' }
  | { panel: 'edit'; tagId: string }
  | { panel: 'styles' };
```

**Rationale**: Type-safe state transitions, exhaustive switch checking

### API Simulation

**Decision**: Centralized apiSimulator with debounce support

```typescript
// shared/api/apiSimulator.ts
export const apiSimulator = {
  post: (endpoint: string, data: unknown) => {
    console.log(`POST http://api${endpoint}`, data);
  }
};

// Usage with debounce for styles
const debouncedSave = debounce(() => {
  apiSimulator.post('/tagline/styles', this.settings);
}, 300);
```

### Component Composition

**Decision**: Compound components for Panel

```typescript
<Panel>
  <Panel.Header title="Tagline" onClose={handleClose} />
  <Panel.Content>
    {/* content */}
  </Panel.Content>
</Panel>
```

**Rationale**: Flexible, readable, follows React patterns

## Unresolved Items

None — all technical decisions made.
