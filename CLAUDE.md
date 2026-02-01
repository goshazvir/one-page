# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Onepage Tagline Editor — a no-code website builder element editor demonstrating scalable architecture for adding new element types.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Type check + production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Architecture

**Feature-Sliced Design (FSD) + Atomic Design**

```
src/
├── app/           # Providers, global styles, App.tsx
├── pages/         # Page components (EditorPage)
├── features/      # Business logic (tag-editor, style-settings)
├── entities/      # Domain entities (tagline with store, types, ui)
└── shared/
    ├── ui/
    │   ├── atoms/      # Button, Input, Icon, Text
    │   ├── molecules/  # InputField, ListItem, SegmentedControl
    │   └── organisms/  # Panel
    ├── api/        # API simulation
    ├── lib/        # Utilities (cn, debounce)
    └── config/     # Constants
```

**Import rules**: pages → features → entities → shared (downward only, no cross-imports within same layer)

## Tech Stack

- React 19 + TypeScript 5.9 (strict mode)
- MobX 6 + mobx-react-lite
- Vite 7
- CSS Modules
- @dnd-kit (drag & drop)
- framer-motion (animations)

## Key Patterns

**MobX Components**: Always wrap components that read from store with `observer()`:
```typescript
import { observer } from 'mobx-react-lite';
export const MyComponent = observer(() => { ... });
```

**MobX Stores**: One store per entity, use `makeAutoObservable`, provide via React Context. Use `toJS()` when passing observable data to external APIs.

**API Simulation**: Log calls via `apiSimulator.post('/endpoint', data)`. Debounce style changes (300ms).

**Path Aliases**: Use `@/` for imports from `src/`:
```typescript
import { Button } from '@/shared/ui';
```

**ID Generation**: Use `crypto.randomUUID()` (built-in).

## Constitution

Full architectural principles in `.specify/memory/constitution.md`. Key rules:
- Each slice has public API via `index.ts`
- Atoms must not contain business logic
- Stores must not import React components
- No `any` types without explicit justification
