# Mexico Travel Smart

A travel information web app for tourists visiting Mexico, built with Next.js 15 and React 19.

The app covers activities, dining, lodging, tours, transport, embassy contacts, emergency resources, lost documents, legal guidance, and a guide to Mexican states — all in a single, multilingual experience.

## Tech Stack

- **Next.js 15** (App Router, Turbopack)
- **React 19**
- **TypeScript 5**
- **CSS Modules** (new components) + legacy global CSS (existing pages)
- Custom **i18n** system (`lib/i18n/`)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available Scripts

| Command                | Description                     |
| ---------------------- | ------------------------------- |
| `npm run dev`          | Start dev server with Turbopack |
| `npm run build`        | Production build                |
| `npm run start`        | Start production server         |
| `npm run lint`         | Run ESLint                      |
| `npm run format`       | Format with Prettier            |
| `npm run format:check` | Check formatting                |

## Styling

New components use CSS Modules. See [STYLING.md](./STYLING.md) for conventions, naming rules, and the canonical `ExampleCard` reference implementation.

## For Contributors

See [CLAUDE.md](./CLAUDE.md) for the full developer and AI-assistant guide including project structure, conventions, and i18n details.
