# Onepage Tagline Editor

A no-code website builder element editor for managing tagline elements with customizable styles.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/                    # App initialization
│   ├── providers/          # React context providers
│   └── styles/             # Global styles
├── pages/                  # Page components
│   └── EditorPage/
├── features/               # Business logic
│   ├── tag-editor/         # Tag list, forms, panels
│   └── style-settings/     # Styles panel
├── entities/               # Domain entities
│   └── tagline/
│       ├── api/            # API simulation
│       ├── model/          # MobX store, types
│       └── ui/             # TagChip, TaglinePreview
└── shared/                 # Reusable code
    ├── api/                # API utilities
    ├── config/             # Constants
    ├── lib/                # Helpers (cn, debounce)
    └── ui/
        ├── atoms/          # Button, Input, Icon, Text
        ├── molecules/      # InputField, ListItem, SegmentedControl
        └── organisms/      # Panel
```

## Tech Stack

- React 18 + TypeScript
- MobX + mobx-react-lite
- Vite
- CSS Modules
- framer-motion
- @dnd-kit
