# AGENTS.md

This file provides guidance to AGENTS when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:3000
npm run generate   # Build static site (output: .output/public)
npm run preview    # Preview production build locally

npm run lint       # Prettier check + ESLint
npm run format     # Auto-fix Prettier + ESLint

make clean         # Remove build artifacts
```

All npm commands have `make` equivalents.

## Stack

- **Nuxt 3** with SSR disabled (`ssr: false`) — generates a fully static site
- **@nuxt/content** for markdown-based pages with Zod-validated frontmatter (`content.config.ts`)
- **Tailwind CSS 4** via Vite plugin
- **@nuxt/ui** component library
- **GitHub Actions** deploys `master` pushes by running `npm run generate` and publishing `.output/public`

## Architecture

**Routing**: Two entry points handle all pages:

- `pages/index.vue` — home page
- `pages/[...slug].vue` — catches all other routes, renders content pages

**Content**: Markdown files in `content/` map directly to routes. Frontmatter schema (title, description, date) is validated in `content.config.ts`.

**Helpers**: `helpers/content.js` contains utilities for querying the content collection; `helpers/routes.js` defines route metadata; `helpers/mouse_effects.js` drives interactive cursor effects.

**No test suite** — there are no configured tests in this project.

## Code Style

- No semicolons, single quotes, trailing commas (ES5), 100-char line width (Prettier)
- Node 22 (see `.nvmrc`)
