# Architecture & Component Conventions

Patterns every developer must follow when adding pages, modals, or components to this codebase.

---

## Page conventions

Pages live at `src/app/<route>/page.tsx` following Next.js App Router conventions.

### File naming

```
src/app/
  activities/
    page.tsx        ← always named page.tsx
  _template/
    page.tsx        ← private (prefixed with _), excluded from routing
```

### Anatomy of a page

```tsx
'use client'; // required — pages use hooks

import { useTranslations } from 'next-intl';

export default function ActivitiesPage() {
  // named export matching route, default
  const t = useTranslations();

  return (
    <main>
      <header>
        <h1>{t('activities.title')}</h1>
      </header>
      <section>
        <p>{t('activities.subtitle')}</p>
      </section>
    </main>
  );
}
```

Rules:

- Always `'use client'` — pages use `useTranslations` and other client hooks.
- Export must be `default`.
- No props — pages receive nothing from the router (locale comes from the cookie via `next-intl`).
- Use `<main>` as the page root. `<AppFrame>` provides the outer shell.

### i18n usage in pages

Translation strings are keyed as `<route>.<key>`:

```json
// lib/i18n/locales/en.json
{
  "activities": {
    "title": "Activities",
    "subtitle": "Things to do in Mexico"
  }
}
```

Call `useTranslations()` with no namespace argument and pass the full key:

```tsx
const t = useTranslations();
t('activities.title');
```

All 10 locale files (`en`, `es`, `pt`, `fr`, `de`, `it`, `zh`, `ko`, `ar`, `ja`) must have matching keys before shipping a page.

---

## Component conventions

All new components live under `src/components/ComponentName/` with a co-located CSS Module.

### File naming

```
src/components/
  ExampleCard/
    ExampleCard.tsx
    ExampleCard.module.css
```

No `index.ts` barrel files — import from the full path:

```tsx
import { ExampleCard } from '../components/ExampleCard/ExampleCard';
```

### Anatomy of a component

```tsx
import styles from './ExampleCard.module.css';

interface ExampleCardProps {
  title: string;
  description: string;
  tag?: string; // optional props use ?
}

export function ExampleCard({ title, description, tag }: ExampleCardProps) {
  return (
    <article className={styles['card-root']}>
      <h3 className={styles['card-title']}>{title}</h3>
    </article>
  );
}
```

Rules:

- Named export (not default).
- Props interface named `<ComponentName>Props`, defined in the same file.
- CSS class names: **kebab-case** in the `.module.css`, **bracket notation** in TSX (`styles['class-name']`).
- No global CSS classes on new components.

---

## Modal conventions

### How the modal system works

```
ModalProvider (ModalContext.tsx)
  └── AppFrame (children)
  └── ModalPortal          ← renders the active modal via ReactDOM.createPortal
  └── ExternalLinkInterceptor
```

`ModalContext` holds a single `modal: ModalState | null`. Only one modal can be open at a time.

### Adding a new modal — checklist

**1. Register the type** in `src/components/Modal/ModalContext.tsx`:

```tsx
export type ModalType =
  | 'phrases'
  | 'translator'
  | 'terms'
  | 'privacy'
  | 'ext-link'
  | 'my-new-modal';
```

**2. Create the modal component** under `src/components/Modal/modals/`:

```
Modal/
  modals/
    MyNewModal.tsx
    MyNewModal.module.css
```

**3. Wire it in `ModalPortal.tsx`**:

```tsx
{
  modal.type === 'my-new-modal' && <MyNewModal />;
}
```

**4. Open it from any client component**:

```tsx
const { openModal } = useModal();
openModal('my-new-modal');
// or with props:
openModal('my-new-modal', { someKey: 'value' });
```

### Anatomy of a modal component

```tsx
'use client';

import { useModal } from '../ModalContext';
import styles from './MyNewModal.module.css';

export function MyNewModal() {
  const { closeModal, modal } = useModal();

  return (
    <div className={styles['modal']}>
      <div className={styles['header']}>
        <h3 className={styles['title']}>Modal Title</h3>
        <button className={styles['close']} onClick={closeModal} aria-label="Close">
          &times;
        </button>
      </div>
      <div className={styles['body']}>{/* content */}</div>
    </div>
  );
}
```

Rules:

- Always `'use client'`.
- Named export.
- Always render a close button that calls `closeModal()` with `aria-label="Close"`.
- The `ModalPortal` handles the backdrop, focus trap, scroll lock, and ESC key — the modal component only renders its inner content.
- Backdrop dismissal is controlled in `ModalPortal.tsx` (currently enabled for `phrases` and `translator`). Add your type there if it should be dismissible.
- RTL layout (`dir="rtl"`) is applied by `ModalPortal` on its container — no `dir` attribute needed inside the modal component.

### Passing data to modals

For static data that varies by locale, fetch it inside the component using `useLocale()`:

```tsx
const locale = useLocale();
const data = MY_DATA[locale] ?? MY_DATA['en'];
```

For dynamic data passed by the caller, receive it via `modal.props`:

```tsx
const { modal } = useModal();
const url = modal?.props?.url as string;
```

Large static datasets (e.g., structured content, lists) live in `src/content/<slug>/` as per-locale files and are imported by the consuming component.

---

## Content / data files

```
src/content/
  pp/           ← Privacy Policy, one file per locale
    en.tsx
    es.tsx
    ...
  tc/           ← Terms & Conditions, one file per locale
    en.tsx
    ...
```

Use this pattern when a modal or page needs rich, locale-specific content that is too large to inline in a translations JSON key. The component imports the matching locale file at runtime.

---

## Layout & providers

The root layout (`src/app/layout.tsx`) provides:

```
NextIntlClientProvider          ← locale + messages from cookie
  ModalProvider                 ← openModal / closeModal context
    AppFrame                    ← header, footer, chrome
      {children}                ← page content
    ModalPortal                 ← renders active modal
    ExternalLinkInterceptor     ← intercepts <a> clicks for external links
```

Pages and components can assume these providers are always present. Do not re-wrap them.

Locale is resolved from the `locale` cookie in `src/i18n/request.ts`. Supported locales: `en es pt fr de it zh ko ar ja`. Default: `en`.

The `<html>` element has `lang={locale}` and `dir="rtl"` for Arabic — no component needs to set this.
