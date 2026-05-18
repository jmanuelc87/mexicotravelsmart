# Styling Guide

This project uses two coexisting styling approaches: a **legacy global CSS file** for existing components and pages, and **CSS Modules** for all new components going forward.

---

## Pattern Overview

| Approach                     | When to use                        | Scope            |
| ---------------------------- | ---------------------------------- | ---------------- |
| Legacy CSS (`styles/...`)    | Existing components and pages only | Global           |
| CSS Modules (`*.module.css`) | All new components                 | Component-scoped |

Do not use legacy CSS classes in new components. New components must use CSS Modules.

---

## File Naming Convention

CSS Module files must be named after their component and placed **co-located** with the component file:

```
src/components/
  Button/
    Button.tsx
    Button.module.css      ← co-located CSS Module
  Card/
    Card.tsx
    Card.module.css
```

The pattern is `ComponentName.module.css` alongside `ComponentName.tsx` in the same directory.

---

## Class Naming Convention

Use **kebab-case** for all class names inside `.module.css` files:

```css
/* Button.module.css */
.button-container { ... }
.card-header { ... }
.primary-action { ... }
```

Avoid camelCase or PascalCase in CSS files. When accessing classes in TypeScript, use bracket notation for kebab-case names:

```tsx
<div className={styles['button-container']}>
```

---

## Importing and Using CSS Modules

```tsx
// Button.tsx
import styles from './Button.module.css';

export function Button({ label }: { label: string }) {
  return <button className={styles['button-root']}>{label}</button>;
}
```

The `styles` object maps your original class names to generated scoped names. The browser will render something like `Button__button-root__a1b2c`, ensuring no collisions with other components.

---

## Using Legacy Global Classes Alongside CSS Modules

New components should rely on CSS Modules for their own styles. However, if you need a legacy global utility class, you can combine both:

```tsx
import styles from './Card.module.css';

<div className={`${styles['card-body']} legacy-utility-class`}>
```

Keep this to a minimum. Prefer defining styles in the CSS Module over reaching for legacy globals.

---

## Reference Example: ExampleCard

The `src/components/ExampleCard/` directory is the canonical reference implementation.

**`ExampleCard.module.css`** — all styles are kebab-case and scoped:

```css
.card-root { ... }
.card-title { ... }
.card-description { ... }
.card-footer { ... }
.card-link { ... }
```

**`ExampleCard.tsx`** — imports and applies scoped styles; optionally combines with a global class:

```tsx
import styles from './ExampleCard.module.css';

export function ExampleCard({ title, description, tag }: ExampleCardProps) {
  return (
    <article className={styles['card-root']}>
      {/* Mixing CSS Module class + a global utility class */}
      {tag && <span className={`${styles['card-tag']} some-global-utility`}>{tag}</span>}
      <h3 className={styles['card-title']}>{title}</h3>
      <p className={styles['card-description']}>{description}</p>
    </article>
  );
}
```

Use this component as a template when authoring new components.

---

## Rules Summary

1. **New component?** Create a `ComponentName.module.css` file co-located with it.
2. **Class names in CSS?** Use kebab-case.
3. **Importing styles?** Use `import styles from './ComponentName.module.css'`.
4. **Legacy CSS?** Do not modify it. Do not add new classes to it. Leave it for existing components only.
5. **Migrating existing components?** Out of scope — leave existing components as-is.
