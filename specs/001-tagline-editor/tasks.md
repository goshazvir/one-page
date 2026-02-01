# Tasks: Tagline Element Editor

**Input**: Design documents from `/specs/001-tagline-editor/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/

**Tests**: Not requested in specification — tests omitted.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: US1, US2, US3, US4, US5 (maps to spec.md user stories)
- File paths relative to repository root

---

## Phase 1: Setup

**Purpose**: Shared utilities and configuration

- [x] T001 Create debounce utility in src/shared/lib/debounce.ts
- [x] T002 [P] Create cn (clsx wrapper) utility in src/shared/lib/cn.ts
- [x] T003 [P] Create API simulator in src/shared/api/apiSimulator.ts
- [x] T004 [P] Create constants (sizes, radii, styles) in src/shared/config/constants.ts
- [x] T005 Create shared/lib/index.ts barrel export
- [x] T006 [P] Create shared/api/index.ts barrel export
- [x] T007 [P] Create shared/config/index.ts barrel export

**Checkpoint**: Utilities ready for use

---

## Phase 2: Foundational (Shared UI Kit)

**Purpose**: Atoms, molecules, organisms — BLOCKS all user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Atoms

- [x] T008 [P] Create Button component in src/shared/ui/atoms/Button/Button.tsx with variants (primary, secondary, ghost, icon)
- [x] T009 [P] Create Button.module.css in src/shared/ui/atoms/Button/
- [x] T010 [P] Create Input component in src/shared/ui/atoms/Input/Input.tsx
- [x] T011 [P] Create Input.module.css in src/shared/ui/atoms/Input/
- [x] T012 [P] Create Icon component in src/shared/ui/atoms/Icon/Icon.tsx
- [x] T013 [P] Create icons.ts with SVG paths (plus, arrow-left, close, drag-handle, align-left, align-center, align-right) in src/shared/ui/atoms/Icon/
- [x] T014 [P] Create Text component in src/shared/ui/atoms/Text/Text.tsx with size variants
- [x] T015 [P] Create Text.module.css in src/shared/ui/atoms/Text/
- [x] T016 Create atoms barrel exports in src/shared/ui/atoms/index.ts

### Molecules

- [x] T017 [P] Create InputField component (Label + Input + Error) in src/shared/ui/molecules/InputField/InputField.tsx
- [x] T018 [P] Create InputField.module.css in src/shared/ui/molecules/InputField/
- [x] T019 [P] Create SegmentedControl component in src/shared/ui/molecules/SegmentedControl/SegmentedControl.tsx
- [x] T020 [P] Create SegmentedControl.module.css in src/shared/ui/molecules/SegmentedControl/
- [x] T021 [P] Create ListItem component in src/shared/ui/molecules/ListItem/ListItem.tsx
- [x] T022 [P] Create ListItem.module.css in src/shared/ui/molecules/ListItem/
- [x] T023 Create molecules barrel exports in src/shared/ui/molecules/index.ts

### Organisms

- [x] T024 Create Panel component in src/shared/ui/organisms/Panel/Panel.tsx
- [x] T025 [P] Create PanelHeader component in src/shared/ui/organisms/Panel/PanelHeader.tsx
- [x] T026 [P] Create Panel.module.css in src/shared/ui/organisms/Panel/
- [x] T027 Create organisms barrel exports in src/shared/ui/organisms/index.ts
- [x] T028 Create shared/ui/index.ts master barrel export

**Checkpoint**: UI Kit ready — user stories can begin

---

## Phase 3: User Story 1+2 - View, Edit, Add Tags (Priority: P1) 🎯 MVP

**Goal**: Users can see tags in preview, edit existing tags, and add new tags

**Independent Test**: Open editor → see tags in preview → click tag → edit Label/Link → see preview update → click "Add item" → create new tag → see it appear

### Entity Layer (Tagline)

- [x] T029 [P] [US1] Create Tag, TaglineSettings, Tagline types in src/entities/tagline/model/types.ts
- [x] T030 [US1] Create TaglineStore with MobX in src/entities/tagline/model/taglineStore.ts
- [x] T031 [P] [US1] Create tagline API simulation in src/entities/tagline/api/taglineApi.ts
- [x] T032 [US1] Create tagline model barrel exports in src/entities/tagline/model/index.ts
- [x] T033 [P] [US1] Create tagline api barrel exports in src/entities/tagline/api/index.ts

### Entity UI

- [x] T034 [P] [US1] Create TagChip component in src/entities/tagline/ui/TagChip/TagChip.tsx
- [x] T035 [P] [US1] Create TagChip.module.css with style/size/radius variants in src/entities/tagline/ui/TagChip/
- [x] T036 [P] [US1] Create TaglinePreview component in src/entities/tagline/ui/TaglinePreview/TaglinePreview.tsx
- [x] T037 [P] [US1] Create TaglinePreview.module.css in src/entities/tagline/ui/TaglinePreview/
- [x] T038 [US1] Create tagline ui barrel exports in src/entities/tagline/ui/index.ts
- [x] T039 [US1] Create tagline entity barrel export in src/entities/tagline/index.ts

### Feature: Tag Editor

- [x] T040 [US1] Create PanelNavigationStore in src/features/tag-editor/model/panelNavigation.ts
- [x] T041 [US1] Create tag-editor model barrel exports in src/features/tag-editor/model/index.ts
- [x] T042 [P] [US1] Create TagList component in src/features/tag-editor/ui/TagList/TagList.tsx
- [x] T043 [P] [US1] Create TagList.module.css in src/features/tag-editor/ui/TagList/
- [x] T044 [US2] Create ItemForm component (create/edit mode) in src/features/tag-editor/ui/ItemForm/ItemForm.tsx
- [x] T045 [P] [US2] Create ItemForm.module.css in src/features/tag-editor/ui/ItemForm/
- [x] T046 [US1] Create MainPanel component in src/features/tag-editor/ui/MainPanel/MainPanel.tsx
- [x] T047 [P] [US1] Create MainPanel.module.css in src/features/tag-editor/ui/MainPanel/
- [x] T048 [US1] Create tag-editor ui barrel exports in src/features/tag-editor/ui/index.ts
- [x] T049 [US1] Create tag-editor feature barrel export in src/features/tag-editor/index.ts

### App Integration (MVP)

- [x] T050 [US1] Create RootStore combining TaglineStore and PanelNavigationStore in src/app/providers/StoreProvider.tsx
- [x] T051 [US1] Create providers barrel export in src/app/providers/index.ts
- [x] T052 [US1] Create EditorPage layout (Preview + Panel) in src/pages/EditorPage/EditorPage.tsx
- [x] T053 [P] [US1] Create EditorPage.module.css in src/pages/EditorPage/
- [x] T054 [US1] Create EditorPage barrel export in src/pages/EditorPage/index.ts
- [x] T055 [US1] Update App.tsx with StoreProvider and EditorPage in src/app/App.tsx

**Checkpoint**: MVP complete — users can view, edit, and add tags

---

## Phase 4: User Story 3 - Configure Tag Styles (Priority: P2)

**Goal**: Users can customize tag appearance (style, size, radius, alignment)

**Independent Test**: Click "Styles" → change each setting → see all tags update → wait 300ms → see console.log with debounced API call

### Feature: Style Settings

- [x] T056 [US3] Create StylesPanel component in src/features/style-settings/ui/StylesPanel/StylesPanel.tsx
- [x] T057 [P] [US3] Create StylesPanel.module.css in src/features/style-settings/ui/StylesPanel/
- [x] T058 [US3] Create style-settings ui barrel exports in src/features/style-settings/ui/index.ts
- [x] T059 [US3] Create style-settings feature barrel export in src/features/style-settings/index.ts

### Integration

- [x] T060 [US3] Add StylesPanel to EditorPage panel switching logic in src/pages/EditorPage/EditorPage.tsx
- [x] T061 [US3] Add debounced updateSettings to TaglineStore if not already present in src/entities/tagline/model/taglineStore.ts

**Checkpoint**: Style customization complete

---

## Phase 5: User Story 4 - Panel Navigation (Priority: P2)

**Goal**: Smooth navigation between main, create, edit, styles panels

**Independent Test**: Navigate through all 4 panels using buttons → verify correct panel displays → test back navigation

### Implementation

- [x] T062 [US4] Add panel transition animations with framer-motion in src/pages/EditorPage/EditorPage.tsx
- [x] T063 [US4] Add close button handler to hide panel in src/features/tag-editor/ui/MainPanel/MainPanel.tsx

**Checkpoint**: Navigation complete with animations

---

## Phase 6: User Story 5 - Drag & Drop Reorder (Priority: P3)

**Goal**: Users can reorder tags by dragging

**Independent Test**: Drag a tag to new position → verify list updates → verify preview updates → see console.log

### Implementation

- [x] T064 [US5] Add @dnd-kit DndContext and SortableContext to TagList in src/features/tag-editor/ui/TagList/TagList.tsx
- [x] T065 [US5] Make ListItem draggable with useSortable hook in src/shared/ui/molecules/ListItem/ListItem.tsx
- [x] T066 [US5] Add reorderTags handler connecting DnD to store in src/features/tag-editor/ui/TagList/TagList.tsx

**Checkpoint**: Drag & drop complete

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements

- [x] T067 [P] Add empty state UI when no tags exist in src/features/tag-editor/ui/TagList/TagList.tsx
- [x] T068 [P] Add Label validation (required, non-empty) in src/features/tag-editor/ui/ItemForm/ItemForm.tsx
- [x] T069 [P] Verify all barrel exports are correct across all index.ts files
- [x] T070 Run quickstart.md validation — verify all user flows work

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ────────────────────────────────────────┐
                                                        │
Phase 2 (UI Kit) ───────────────────────────────────────┤
                                                        ▼
Phase 3 (US1+US2: View/Edit/Add) ──────────────────► MVP
                                                        │
Phase 4 (US3: Styles) ◄─────────────────────────────────┤
                                                        │
Phase 5 (US4: Navigation) ◄─────────────────────────────┤
                                                        │
Phase 6 (US5: Drag & Drop) ◄────────────────────────────┤
                                                        │
Phase 7 (Polish) ◄──────────────────────────────────────┘
```

### User Story Dependencies

- **US1+US2 (P1)**: Requires Phase 1+2 complete
- **US3 (P2)**: Requires US1 complete (needs TaglineStore)
- **US4 (P2)**: Requires US1 complete (needs panel structure)
- **US5 (P3)**: Requires US1 complete (needs TagList)

### Parallel Opportunities

**Phase 2 (all atoms/molecules can be built in parallel)**:
```
T008-T015: All atoms in parallel
T017-T022: All molecules in parallel
```

**Phase 3 (entity and feature UI in parallel)**:
```
T034-T037: TagChip and TaglinePreview in parallel
T042-T047: TagList, ItemForm, MainPanel in parallel
```

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1: Setup (~7 tasks)
2. Complete Phase 2: UI Kit (~21 tasks)
3. Complete Phase 3: US1+US2 (~27 tasks)
4. **STOP and VALIDATE**: Test view/edit/add functionality
5. Demo MVP if ready

### Incremental Delivery

1. Setup + UI Kit → Foundation ready
2. US1+US2 → View/Edit/Add (MVP!)
3. US3 → Style customization
4. US4 → Panel animations
5. US5 → Drag & drop
6. Polish → Final touches

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to user story for traceability
- US1 and US2 combined in Phase 3 because they share most infrastructure
- Commit after each task or logical group
- Run `npm run build` after each phase to verify no TypeScript errors
