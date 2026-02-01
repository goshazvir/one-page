# Implementation Plan: Tagline Element Editor

**Branch**: `001-tagline-editor` | **Date**: 2026-02-01 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-tagline-editor/spec.md`

## Summary

Build a Tagline element editor with multi-panel settings interface and real-time preview. The editor allows users to add/edit tags (Label + Link), configure styles (variant, size, radius, alignment), and see changes instantly. Architecture follows FSD + Atomic Design for scalability to support future element types.

## Technical Context

**Language/Version**: TypeScript 5.9, React 19
**Primary Dependencies**: MobX 6, mobx-react-lite, @dnd-kit/core, @dnd-kit/sortable, framer-motion, clsx
**Storage**: N/A (in-memory state, simulated API via console.log)
**Testing**: Vitest (if needed later, not in current scope)
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge)
**Project Type**: Single SPA (Vite)
**Performance Goals**: Instant preview updates (<100ms perceived), 60fps animations
**Constraints**: No backend required, API simulated
**Scale/Scope**: Single element editor, ~50 components, ~15 files with logic

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. Feature-Sliced Architecture | ✅ PASS | Structure follows app → pages → features → entities → shared |
| II. Atomic UI Design | ✅ PASS | shared/ui contains atoms/, molecules/, organisms/ |
| III. Element Registry Pattern | ✅ PASS | TaglineStore implements entity pattern, extensible for new elements |
| IV. Reactive State Management | ✅ PASS | MobX stores with makeAutoObservable, Context providers |
| V. Type-First Development | ✅ PASS | TypeScript strict mode, interfaces for all props/state |

**Gate Status**: ✅ ALL PASSED — Proceed to Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/001-tagline-editor/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (API simulation specs)
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── providers/
│   │   ├── StoreProvider.tsx      # MobX context provider
│   │   └── index.ts
│   ├── styles/
│   │   └── global.css             # CSS variables, reset
│   └── App.tsx                    # Root component
│
├── pages/
│   └── EditorPage/
│       ├── EditorPage.tsx         # Layout: Preview + Panel
│       ├── EditorPage.module.css
│       └── index.ts
│
├── features/
│   ├── tag-editor/
│   │   ├── ui/
│   │   │   ├── MainPanel/         # Tag list, Add item, Styles button
│   │   │   ├── TagList/           # Sortable tag list
│   │   │   └── ItemForm/          # Create/Edit form
│   │   ├── model/
│   │   │   └── panelNavigation.ts # Panel state machine
│   │   └── index.ts
│   │
│   └── style-settings/
│       ├── ui/
│       │   └── StylesPanel/       # Style/Size/Radius/Alignment controls
│       └── index.ts
│
├── entities/
│   └── tagline/
│       ├── model/
│       │   ├── types.ts           # Tag, TaglineSettings, Tagline
│       │   └── taglineStore.ts    # MobX store
│       ├── ui/
│       │   ├── TaglinePreview/    # Preview area
│       │   └── TagChip/           # Single tag display
│       ├── api/
│       │   └── taglineApi.ts      # console.log simulation
│       └── index.ts
│
└── shared/
    ├── ui/
    │   ├── atoms/
    │   │   ├── Button/            # Variants: primary, secondary, ghost, icon
    │   │   ├── Input/             # Text input
    │   │   ├── Icon/              # SVG icons
    │   │   └── Text/              # Typography
    │   ├── molecules/
    │   │   ├── InputField/        # Label + Input + Error
    │   │   ├── SegmentedControl/  # Button group selector
    │   │   └── ListItem/          # Draggable list item
    │   └── organisms/
    │       └── Panel/             # Header + Content container
    │
    ├── lib/
    │   ├── debounce.ts            # Debounce utility
    │   └── cn.ts                  # clsx wrapper
    │
    ├── api/
    │   └── apiSimulator.ts        # Base simulation logic
    │
    └── config/
        └── constants.ts           # Style options, sizes, etc.
```

**Structure Decision**: Single SPA following Feature-Sliced Design. No backend, no tests directory in current scope.

## Complexity Tracking

No violations — constitution fully satisfied.

## Implementation Phases

### Phase 0: Foundation (Shared UI Kit)

Build reusable atoms and molecules before features.

**Files to create**:
1. `shared/ui/atoms/Button/` — Button component with variants
2. `shared/ui/atoms/Input/` — Text input component
3. `shared/ui/atoms/Icon/` — SVG icon component + icon definitions
4. `shared/ui/atoms/Text/` — Typography component
5. `shared/ui/molecules/InputField/` — Label + Input composition
6. `shared/ui/molecules/SegmentedControl/` — Button group for selections
7. `shared/ui/molecules/ListItem/` — Draggable list item
8. `shared/ui/organisms/Panel/` — Panel with header

**Dependencies**: clsx

### Phase 1: Entity Layer (Tagline)

Build tagline data model and preview components.

**Files to create**:
1. `entities/tagline/model/types.ts` — Tag, TaglineSettings, Tagline interfaces
2. `entities/tagline/model/taglineStore.ts` — MobX store
3. `entities/tagline/api/taglineApi.ts` — API simulation
4. `entities/tagline/ui/TagChip/` — Single tag chip
5. `entities/tagline/ui/TaglinePreview/` — Preview area

**Dependencies**: MobX, shared/ui

### Phase 2: Features (Editor Panels)

Build tag-editor and style-settings features.

**Files to create**:
1. `features/tag-editor/model/panelNavigation.ts` — Navigation store
2. `features/tag-editor/ui/MainPanel/` — Main panel
3. `features/tag-editor/ui/TagList/` — Sortable tag list
4. `features/tag-editor/ui/ItemForm/` — Create/Edit form
5. `features/style-settings/ui/StylesPanel/` — Style controls

**Dependencies**: @dnd-kit, entities/tagline, shared/ui

### Phase 3: App Integration

Wire everything together.

**Files to create/modify**:
1. `app/providers/StoreProvider.tsx` — Context provider
2. `pages/EditorPage/` — Layout composition
3. `app/App.tsx` — Root with providers

**Dependencies**: framer-motion (for panel transitions)

### Phase 4: Polish (Nice-to-have)

1. Panel transition animations (framer-motion)
2. Drag & drop sorting (@dnd-kit)
3. Empty state UI
4. Error handling for validation
