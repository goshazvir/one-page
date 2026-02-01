# Feature Specification: Tagline Element Editor

**Feature Branch**: `001-tagline-editor`
**Created**: 2026-02-01
**Status**: Draft
**Input**: No-code website builder element editor for Tagline with settings panel, preview area, and scalable architecture

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View and Edit Tags (Priority: P1)

As a website builder user, I want to see my tagline tags in a preview area and edit them through a settings panel, so that I can customize the tagline element for my website.

**Why this priority**: Core functionality - without viewing and editing tags, the editor has no value.

**Independent Test**: Can be fully tested by opening the editor, viewing existing tags in preview, clicking a tag to edit its label and link, and seeing changes reflected instantly in preview.

**Acceptance Scenarios**:

1. **Given** the editor is open with existing tags, **When** I view the preview area, **Then** I see all tags displayed as chips with flex-wrap layout
2. **Given** the editor is open, **When** I click on an existing tag in the panel, **Then** the edit panel opens with Label and Link fields pre-filled
3. **Given** I am editing a tag, **When** I change the Label or Link value, **Then** the preview updates instantly to reflect my changes
4. **Given** I finish editing a tag, **When** changes are saved, **Then** the system sends data to the server (simulated via console.log)

---

### User Story 2 - Add New Tags (Priority: P1)

As a website builder user, I want to add new tags to my tagline element, so that I can expand the content displayed on my website.

**Why this priority**: Creating content is essential - users need to add tags, not just edit existing ones.

**Independent Test**: Can be fully tested by clicking "Add item" button, filling Label and Link fields, and seeing the new tag appear in preview.

**Acceptance Scenarios**:

1. **Given** I am on the main panel, **When** I click "Add item" button, **Then** the create item panel opens with empty Label and Link fields
2. **Given** I am creating a new tag, **When** I fill in Label and Link and save, **Then** the new tag appears in the tags list and preview
3. **Given** I created a new tag, **When** the tag is added, **Then** the system sends data to the server (simulated)

---

### User Story 3 - Configure Tag Styles (Priority: P2)

As a website builder user, I want to customize the visual appearance of all tags (style variant, size, border radius, alignment), so that tags match my website's design.

**Why this priority**: Styling is important for customization but tags can function without custom styles.

**Independent Test**: Can be fully tested by clicking "Styles" button, changing style/size/radius/alignment settings, and seeing all tags in preview update with new styles.

**Acceptance Scenarios**:

1. **Given** I am on the main panel, **When** I click "Styles" button, **Then** the styles panel opens
2. **Given** I am on styles panel, **When** I select a style variant (1 of 4), **Then** all tags in preview change to that visual style
3. **Given** I am on styles panel, **When** I select a size (XL/L/M/S/XS), **Then** all tags in preview resize accordingly
4. **Given** I am on styles panel, **When** I select a radius (0/4/8/12/100), **Then** all tags' border radius updates in preview
5. **Given** I am on styles panel, **When** I select alignment (left/center/right), **Then** the tags container alignment changes in preview
6. **Given** I change any style setting, **When** 300ms passes without further changes, **Then** the system sends debounced data to server (simulated)

---

### User Story 4 - Navigate Between Panels (Priority: P2)

As a website builder user, I want to navigate between different settings panels (main, edit item, create item, styles) with clear visual transitions, so that I understand where I am in the interface.

**Why this priority**: Navigation is required for multi-panel interface but is secondary to core CRUD operations.

**Independent Test**: Can be fully tested by navigating through all panel states using back buttons and action buttons, verifying correct panel displays.

**Acceptance Scenarios**:

1. **Given** I am on main panel, **When** I click the close button (X), **Then** the panel closes
2. **Given** I am on edit/create/styles panel, **When** I click the back arrow, **Then** I return to main panel
3. **Given** I navigate between panels, **When** transition occurs, **Then** panel slides in/out with animation (nice-to-have)

---

### User Story 5 - Reorder Tags via Drag and Drop (Priority: P3)

As a website builder user, I want to reorder tags by dragging and dropping them in the list, so that I can control the display order on my website.

**Why this priority**: Nice-to-have feature - enhances UX but manual reordering is not critical for MVP.

**Independent Test**: Can be fully tested by dragging a tag from one position to another and verifying the new order in both panel list and preview.

**Acceptance Scenarios**:

1. **Given** I have multiple tags in the list, **When** I drag a tag to a new position, **Then** the list reorders to reflect the new position
2. **Given** I reordered tags, **When** the drag ends, **Then** the preview updates to show tags in the new order
3. **Given** I reordered tags, **When** the reorder is complete, **Then** the system sends updated order to server (simulated)

---

### Edge Cases

- What happens when user tries to add a tag with empty Label? → Show validation error, prevent save
- What happens when user enters invalid URL in Link field? → Allow any text (no strict URL validation per typical no-code builder behavior)
- What happens when user has no tags? → Show empty state with "Add item" prompt
- How does system handle many tags (20+)? → List scrolls, preview wraps tags into multiple rows
- What happens when user navigates away with unsaved changes? → Changes auto-save on blur/panel close

## Requirements *(mandatory)*

### Functional Requirements

**Preview Area:**
- **FR-001**: System MUST display a heading "Tagline element" in the preview area
- **FR-002**: System MUST render all tags as clickable chips/buttons in the preview
- **FR-003**: System MUST wrap tags into multiple rows using flex-wrap when they exceed container width
- **FR-004**: System MUST instantly reflect any changes from the settings panel in the preview

**Main Panel:**
- **FR-005**: System MUST display a panel header with title "Tagline" and a close button
- **FR-006**: System MUST display a scrollable list of all tags with their labels
- **FR-007**: System MUST provide an "Add item" button to create new tags
- **FR-008**: System MUST provide a "Styles" button to navigate to style settings
- **FR-009**: System SHOULD support drag-and-drop sorting of tags in the list (nice-to-have)

**Create/Edit Item Panel:**
- **FR-010**: System MUST open create panel when "Add item" is clicked with empty fields
- **FR-011**: System MUST open edit panel when an existing tag is clicked with pre-filled values
- **FR-012**: System MUST provide Label input field (required, text)
- **FR-013**: System MUST provide Link input field (optional, text/URL)
- **FR-014**: System MUST provide back navigation to return to main panel

**Styles Panel:**
- **FR-015**: System MUST provide Style selector with 4 visual variants (displayed as "Aa" buttons)
- **FR-016**: System MUST provide Size selector with options: XL, L, M, S, XS
- **FR-017**: System MUST provide Radius selector with options: 0, 4, 8, 12, 100 (pixels)
- **FR-018**: System MUST provide Alignment selector with options: left, center, right
- **FR-019**: System MUST provide back navigation to return to main panel

**Data Persistence:**
- **FR-020**: System MUST simulate server calls via console.log('POST http://api/tagline', data)
- **FR-021**: System MUST send data immediately when creating/editing/deleting tags
- **FR-022**: System MUST debounce style changes for 300ms before sending

### Key Entities

- **Tag**: Represents a single tagline item with Label (display text) and Link (URL destination)
- **TaglineSettings**: Contains style configuration - style variant (1-4), size (XL-XS), radius (0-100), alignment (left/center/right)
- **Tagline**: Collection of Tags with associated TaglineSettings

## Architecture Requirements *(project-specific)*

### Scalability Requirements

- **AR-001**: Architecture MUST allow adding new element types (Button, Heading, Image) without modifying core editor code
- **AR-002**: Architecture MUST allow adding new controls to settings panels without structural changes
- **AR-003**: Architecture MUST allow adding new style parameters without refactoring existing code

### File Structure (Feature-Sliced Design + Atomic Design)

```
src/
├── app/
│   ├── providers/
│   │   ├── StoreProvider.tsx
│   │   └── index.ts
│   ├── styles/
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── index.ts
│   └── App.tsx
│
├── pages/
│   └── EditorPage/
│       ├── EditorPage.tsx
│       ├── EditorPage.module.css
│       └── index.ts
│
├── features/
│   ├── tag-editor/
│   │   ├── ui/
│   │   │   ├── MainPanel/
│   │   │   │   ├── MainPanel.tsx
│   │   │   │   ├── MainPanel.module.css
│   │   │   │   └── index.ts
│   │   │   ├── TagList/
│   │   │   │   ├── TagList.tsx
│   │   │   │   ├── TagList.module.css
│   │   │   │   └── index.ts
│   │   │   ├── ItemForm/
│   │   │   │   ├── ItemForm.tsx
│   │   │   │   ├── ItemForm.module.css
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── model/
│   │   │   ├── panelNavigation.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   └── style-settings/
│       ├── ui/
│       │   ├── StylesPanel/
│       │   │   ├── StylesPanel.tsx
│       │   │   ├── StylesPanel.module.css
│       │   │   └── index.ts
│       │   └── index.ts
│       └── index.ts
│
├── entities/
│   └── tagline/
│       ├── model/
│       │   ├── types.ts
│       │   ├── taglineStore.ts
│       │   └── index.ts
│       ├── ui/
│       │   ├── TaglinePreview/
│       │   │   ├── TaglinePreview.tsx
│       │   │   ├── TaglinePreview.module.css
│       │   │   └── index.ts
│       │   ├── TagChip/
│       │   │   ├── TagChip.tsx
│       │   │   ├── TagChip.module.css
│       │   │   └── index.ts
│       │   └── index.ts
│       ├── api/
│       │   ├── taglineApi.ts
│       │   └── index.ts
│       └── index.ts
│
└── shared/
    ├── ui/
    │   ├── atoms/
    │   │   ├── Button/
    │   │   │   ├── Button.tsx
    │   │   │   ├── Button.module.css
    │   │   │   └── index.ts
    │   │   ├── Input/
    │   │   │   ├── Input.tsx
    │   │   │   ├── Input.module.css
    │   │   │   └── index.ts
    │   │   ├── Icon/
    │   │   │   ├── Icon.tsx
    │   │   │   ├── icons.ts
    │   │   │   └── index.ts
    │   │   ├── Text/
    │   │   │   ├── Text.tsx
    │   │   │   ├── Text.module.css
    │   │   │   └── index.ts
    │   │   └── index.ts
    │   │
    │   ├── molecules/
    │   │   ├── InputField/
    │   │   │   ├── InputField.tsx
    │   │   │   ├── InputField.module.css
    │   │   │   └── index.ts
    │   │   ├── SegmentedControl/
    │   │   │   ├── SegmentedControl.tsx
    │   │   │   ├── SegmentedControl.module.css
    │   │   │   └── index.ts
    │   │   ├── ListItem/
    │   │   │   ├── ListItem.tsx
    │   │   │   ├── ListItem.module.css
    │   │   │   └── index.ts
    │   │   └── index.ts
    │   │
    │   ├── organisms/
    │   │   ├── Panel/
    │   │   │   ├── Panel.tsx
    │   │   │   ├── PanelHeader.tsx
    │   │   │   ├── Panel.module.css
    │   │   │   └── index.ts
    │   │   └── index.ts
    │   │
    │   └── index.ts
    │
    ├── lib/
    │   ├── debounce.ts
    │   ├── cn.ts
    │   └── index.ts
    │
    ├── api/
    │   ├── apiSimulator.ts
    │   └── index.ts
    │
    └── config/
        ├── constants.ts
        └── index.ts
```

### Components Summary

**Atoms (shared/ui/atoms):**
- `Button` - Base button with variants (primary, secondary, ghost, icon)
- `Input` - Text input with label support
- `Icon` - SVG icon wrapper (plus, arrow-left, close, drag-handle, align-left/center/right)
- `Text` - Typography component with size variants

**Molecules (shared/ui/molecules):**
- `InputField` - Label + Input + optional error message
- `SegmentedControl` - Button group for single selection (used for Style, Size, Radius, Alignment)
- `ListItem` - Draggable item with label and actions (used in tag list)

**Organisms (shared/ui/organisms):**
- `Panel` - Container with header (back/close buttons, title) and scrollable content area

**Entity UI (entities/tagline/ui):**
- `TaglinePreview` - Preview area with heading and tags grid
- `TagChip` - Individual tag display with style/size/radius applied

**Feature UI (features/*):**
- `MainPanel` - Tag list + Add item + Styles button
- `TagList` - Sortable list of tags with drag-and-drop
- `ItemForm` - Create/Edit form with Label and Link fields
- `StylesPanel` - Style/Size/Radius/Alignment controls

### MobX Stores

**TaglineStore (entities/tagline/model):**
```
- tags: Tag[]
- settings: TaglineSettings
- selectedTagId: string | null
- addTag(label, link)
- updateTag(id, label, link)
- deleteTag(id)
- reorderTags(fromIndex, toIndex)
- updateSettings(partial)
```

**PanelNavigationStore (features/tag-editor/model):**
```
- currentPanel: 'main' | 'create' | 'edit' | 'styles'
- editingTagId: string | null
- goToMain()
- goToCreate()
- goToEdit(tagId)
- goToStyles()
- close()
```

### Technology Choices

| Category          | Choice          | Rationale                                           |
| ----------------- | --------------- | --------------------------------------------------- |
| Build Tool        | Vite            | Fast HMR, simple config, native ESM, no SSR needed  |
| Styling           | CSS Modules     | Zero runtime, good isolation, native Vite support   |
| State             | MobX            | Required by spec, fine-grained reactivity           |
| Drag & Drop       | @dnd-kit/core   | Modern, accessible, tree-shakeable, React 18 ready  |
| Animations        | framer-motion   | Declarative, performant, easy panel transitions     |
| Icons             | Custom SVGs     | Minimal bundle, exact match to Figma design         |
| Class Merging     | clsx            | Tiny utility for conditional class names            |

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can add a new tag (Label + Link) and see it in preview within 2 seconds
- **SC-002**: Users can edit any existing tag and see preview update instantly (< 100ms perceived)
- **SC-003**: Users can change all 4 style settings and see preview update instantly
- **SC-004**: Style changes trigger server simulation after 300ms debounce (not on every change)
- **SC-005**: Users can navigate through all 4 panel states (main, create, edit, styles) without confusion
- **SC-006**: The preview accurately reflects all current settings at any moment
- **SC-007**: New element types can be added by creating new entity folder without modifying existing code

## Assumptions

- Tags have no delete functionality in current scope (not shown in Figma)
- Link field accepts any text (no URL validation required)
- Style variants are visual-only differentiation (color/border styles)
- Initial data can be hardcoded for demo purposes
- No authentication or user management required
- Single tagline element per editor view (no multi-element support in current scope)
