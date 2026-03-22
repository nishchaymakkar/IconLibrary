# Icon Library (Vite + React)

This is a minimal Vite + React app to browse the provided SVG icons and copy their raw SVG markup to the clipboard by clicking an icon.

Quick start

1. Install dependencies

```bash
npm install
```

2. Start dev server (this copies `icons/` into `public/icons` first)

```bash
npm run dev
```

Files of interest

- `icons/` — extracted source SVGs (existing)
- `public/icons/` — will be populated by `npm run prepare-icons`
- `icons_summary.json` — generated summary with per-category icon lists
- `src/` — Vite + React app
