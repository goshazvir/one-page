# Quickstart: Tagline Element Editor

**Feature**: 001-tagline-editor
**Date**: 2026-02-01

## Prerequisites

- Node.js 18+
- npm 9+

## Setup

```bash
# Clone and navigate to project
cd one-page

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open http://localhost:5173

## Project Structure

```
src/
├── app/              # App shell, providers
├── pages/            # EditorPage
├── features/         # tag-editor, style-settings
├── entities/         # tagline (model, ui, api)
└── shared/           # UI kit, utilities
```

## Key Files

| File | Purpose |
|------|---------|
| `src/app/App.tsx` | Root component |
| `src/entities/tagline/model/taglineStore.ts` | Tag data + settings |
| `src/features/tag-editor/model/panelNavigation.ts` | Panel state |
| `src/shared/ui/` | Reusable components |

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Adding a New Tag

1. Click "Add item" in main panel
2. Fill Label (required) and Link (optional)
3. Click back arrow or blur to save
4. Tag appears in list and preview

## Changing Styles

1. Click "Styles" button in main panel
2. Select Style variant (1-4)
3. Select Size (XL/L/M/S/XS)
4. Select Radius (0/4/8/12/100)
5. Select Alignment (left/center/right)
6. Changes auto-save after 300ms

## Verifying API Simulation

Open browser DevTools Console. You should see:
- `POST http://api/tagline/tags {...}` — when adding/editing tags
- `POST http://api/tagline/settings {...}` — when changing styles (debounced)

## Architecture Notes

- **FSD**: Import only downward (pages → features → entities → shared)
- **MobX**: Use `observer()` HOC on components that read store
- **CSS Modules**: One `.module.css` per component
- **Path aliases**: Use `@/` for `src/` imports
