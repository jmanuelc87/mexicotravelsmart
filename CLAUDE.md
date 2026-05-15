# Mexico Travel Smart — Claude Code Guide

## Project Overview

**mexicotravelsmart.mx** is a travel information web app for tourists visiting Mexico. It provides guides on activities, dining, lodging, tours, transport, embassy contacts, emergency info, lost documents, legal resources, and Mexican states — all in one place.

## Tech Stack

- **Framework**: Next.js 15 (App Router) with Turbopack
- **Language**: TypeScript 5
- **UI**: React 19
- **Styling**: CSS Modules for new components; legacy global CSS for existing ones
- **i18n**: Custom i18n system under `lib/i18n/`
- **Linting / Formatting**: ESLint 9, Prettier 3

## Project Structure

```
src/
  app/              # Next.js App Router pages
    activities/
    dining/
    embassy/
    emergency/
    legal/
    lodging/
    lost-docs/
    media/
    states/
    tours/
    transport/
    page.tsx        # Home page
    layout.tsx      # Root layout
  components/       # Shared React components
    ExampleCard/    # Canonical CSS Modules reference component
lib/
  i18n/             # Internationalization (provider, hook, locales)
openspec/           # OpenSpec change management artifacts
legacy/             # Legacy static HTML (do not modify)
```

## Development Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint
npm run format       # Prettier write
npm run format:check # Prettier check
```

## Architecture & Conventions

See [docs/architecture.md](./docs/architecture.md) for the full conventions guide covering pages, components, modals, content files, and the provider layout.

## Styling

All new components must use CSS Modules. See [STYLING.md](./STYLING.md) for the full styling guide, naming conventions, and the `ExampleCard` reference implementation.

- New components: `ComponentName.module.css` co-located with the component
- Class names: kebab-case in CSS, bracket notation in TSX (`styles['class-name']`)
- Do not add classes to legacy global CSS files

## i18n

The app supports multiple languages via the custom `lib/i18n/` system. Use `useTranslation` from `lib/i18n/useTranslation.ts` and wrap the app with the provider from `lib/i18n/provider.tsx`. Translation strings live in `lib/i18n/locales/`.

## Key Conventions

- All new components go under `src/components/ComponentName/` with their own CSS Module
- Pages live under `src/app/<route>/page.tsx` following App Router conventions
- Do not modify the `legacy/` directory
- Do not add to or modify legacy global CSS files
