<!--
Sync Impact Report
==================
Version change: 0.0.0 → 1.0.0 (initial)
Added sections:
  - Principle I: Feature-Sliced Architecture
  - Principle II: Atomic UI Design
  - Principle III: Element Registry Pattern
  - Principle IV: Reactive State Management
  - Principle V: Type-First Development
  - Technical Stack
  - Development Workflow
  - Governance
Templates status:
  - plan-template.md ✅ compatible
  - spec-template.md ✅ compatible
  - tasks-template.md ✅ compatible
Follow-up TODOs: none
-->

# Onepage Tagline Editor Constitution

## Core Principles

### I. Feature-Sliced Architecture

The codebase MUST follow Feature-Sliced Design (FSD) methodology with strict layer boundaries:

- **app/** — Application initialization, providers, global styles
- **pages/** — Page-level components, route compositions
- **features/** — User interactions and business logic (tag-editor, style-settings)
- **entities/** — Business entities with data and UI (tagline, element)
- **shared/** — Reusable code without business logic (ui, api, lib, config)

**Rules**:
- Imports MUST only go downward: pages → features → entities → shared
- Cross-imports within the same layer are FORBIDDEN
- Each slice MUST have a public API via `index.ts`

**Rationale**: Enables scalable architecture where new element types (Button, Heading, Image) can be added as new entities without modifying existing code.

### II. Atomic UI Design

The `shared/ui` layer MUST follow Atomic Design methodology:

- **atoms/** — Basic building blocks (Button, Input, Icon, Text, Badge)
- **molecules/** — Simple compositions (InputField, SegmentedControl, ListItem)
- **organisms/** — Complex UI structures (Panel, Form)

**Rules**:
- Atoms MUST NOT contain business logic
- Atoms MUST accept all styling via props or CSS variables
- Molecules combine atoms; organisms combine molecules
- Each component MUST be independently testable

**Rationale**: Provides consistent UI kit that can be reused across different element editors.

### III. Element Registry Pattern

New element types MUST be added through a registry system:

```typescript
interface ElementConfig {
  type: string;
  name: string;
  PreviewComponent: React.FC;
  createStore: () => BaseElementStore;
}

registerElement(config: ElementConfig): void;
```

**Rules**:
- Each element type MUST implement `BaseElement` interface
- Each element MUST have its own MobX store extending `BaseElementStore`
- Element registration MUST happen at app initialization
- Preview and settings components MUST be co-located with the element entity

**Rationale**: Enables adding new element types (Button, Image, Heading) without modifying core editor logic.

### IV. Reactive State Management

Application state MUST be managed with MobX following these patterns:

- One store per entity/feature (TaglineStore, PanelNavigationStore)
- Stores MUST be classes with `makeAutoObservable`
- Actions MUST be methods on store classes
- Computed values for derived state

**Rules**:
- Stores MUST NOT import React components
- Components MUST use `observer()` HOC from mobx-react-lite
- Side effects (API calls) MUST be in store actions
- Store instances provided via React Context

**Rationale**: MobX provides fine-grained reactivity with minimal boilerplate, matching project requirements.

### V. Type-First Development

All code MUST be written in TypeScript with strict typing:

- `strict: true` in tsconfig.json
- NO `any` types except with explicit justification
- Interfaces for public APIs, types for internal use
- Discriminated unions for state variants

**Rules**:
- Props interfaces MUST be exported alongside components
- API response types MUST be defined before implementation
- Store state MUST be fully typed

**Rationale**: Type safety catches errors at compile time and serves as documentation.

## Technical Stack

**Required** (per task specification):
- React 18+ with functional components
- TypeScript 5+
- MobX + mobx-react-lite

**Chosen**:
- Vite — Fast build tool, no SSR overhead needed for SPA editor
- CSS Modules — Zero runtime, good isolation, simple setup
- @dnd-kit/core — Modern drag-and-drop (nice-to-have feature)
- framer-motion — Panel transition animations (nice-to-have feature)

**Project Structure**:
```
src/
├── app/
│   ├── providers/
│   ├── styles/
│   └── App.tsx
├── pages/
│   └── EditorPage.tsx
├── features/
│   ├── tag-editor/
│   └── style-settings/
├── entities/
│   └── tagline/
└── shared/
    ├── ui/
    │   ├── atoms/
    │   ├── molecules/
    │   └── organisms/
    ├── api/
    ├── lib/
    └── config/
```

## Development Workflow

**Component Development**:
1. Define types/interfaces first
2. Create component with props interface
3. Add CSS Module for styling
4. Export via slice's index.ts

**Feature Development**:
1. Define store state and actions
2. Create UI components using shared/ui
3. Connect components to store via observer
4. Test user interactions

**API Simulation**:
- All "server" calls logged via `console.log('POST http://api/...', data)`
- Debounce style changes (300ms) before "sending"
- Immediate "send" on item create/edit/delete

## Governance

This constitution defines non-negotiable architectural decisions for the Onepage Tagline Editor project.

**Compliance**:
- All code contributions MUST follow these principles
- Deviations require explicit justification in PR description
- Constitution violations block merge

**Amendments**:
- Propose changes via discussion before implementation
- Document rationale for any principle changes
- Update version using semantic versioning

**Version**: 1.0.0 | **Ratified**: 2026-02-01 | **Last Amended**: 2026-02-01
