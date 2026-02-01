# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Onepage Tagline Editor — a no-code website builder element editor. Test task demonstrating scalable architecture for adding new element types.

## Architecture

**Feature-Sliced Design (FSD) + Atomic Design**. See `.specify/memory/constitution.md` for full principles.

```
src/
├── app/           # Providers, global styles, App.tsx
├── pages/         # Page components
├── features/      # Business logic (tag-editor, style-settings)
├── entities/      # Domain entities (tagline)
└── shared/
    └── ui/
        ├── atoms/      # Button, Input, Icon
        ├── molecules/  # InputField, SegmentedControl
        └── organisms/  # Panel
```

**Import rules**: pages → features → entities → shared (downward only)

## Tech Stack

- React 19 + TypeScript 5.9 (strict)
- MobX 6 + mobx-react-lite
- Vite 7
- CSS Modules
- @dnd-kit (drag & drop)
- framer-motion (animations)
- clsx (class names)

## Commands

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Type check + production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Path Aliases

Use `@/` for imports from `src/`:
```typescript
import { Button } from '@/shared/ui/atoms/Button'
```

## Spec-Driven Workflow

Project uses spec-kit. Slash commands in order:

1. `/speckit.constitution` — Define principles (done)
2. `/speckit.specify` — Create feature specification
3. `/speckit.plan` — Implementation plan
4. `/speckit.tasks` — Generate task list
5. `/speckit.implement` — Execute implementation

## Key Patterns

**MobX Stores**: One store per entity, use `makeAutoObservable`, provide via React Context.

**Element Registry**: New element types registered via `registerElement()` — no core code modifications needed.

**API Simulation**: Log calls via `console.log('POST http://api/...', data)`. Debounce style changes (300ms).

**ID Generation**: Use `crypto.randomUUID()` (built-in, no external package).

## Active Technologies
- TypeScript 5.9, React 19 + MobX 6, mobx-react-lite, @dnd-kit/core, @dnd-kit/sortable, framer-motion, clsx (001-tagline-editor)
- N/A (in-memory state, simulated API via console.log) (001-tagline-editor)

## Recent Changes
- 001-tagline-editor: Added TypeScript 5.9, React 19 + MobX 6, mobx-react-lite, @dnd-kit/core, @dnd-kit/sortable, framer-motion, clsx
