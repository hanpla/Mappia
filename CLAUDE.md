# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (http://localhost:3000)
npm run build     # Production build
npm run lint      # Run ESLint
```

Pre-commit hook runs `lint-staged` automatically: ESLint `--fix` + Prettier `--write` on all staged `*.{js,jsx,ts,tsx}` files.

## Architecture

Next.js 16 App Router project (React 19, TypeScript strict, Tailwind CSS v4).

> **Important**: This Next.js version may have breaking changes from older versions. Check `node_modules/next/dist/docs/` before writing Next.js-specific code.

### Route groups

```
src/app/
  (auth)/login/        # Login page (placeholder)
  (auth)/signup/       # Signup page (placeholder)
  (main)/activities/   # Activities page
  (main)/profile/      # Profile pages with nested layout
  (main)/reservations/ # Reservations page
  layout.tsx           # Root layout — mounts <Gnb /> globally
  page.tsx             # Home page
```

### Source directories

| Path | Purpose |
|------|---------|
| `src/components/common/` | Shared UI components (e.g., `Gnb/`) |
| `src/lib/api/` | Axios-based API layer |
| `src/lib/utils/` | Utility functions |
| `src/hooks/` | Custom React hooks |
| `src/stores/` | State management |
| `src/constants/` | App-wide constants |
| `src/types/` | TypeScript type definitions |
| `src/assets/` | Icons and images |

Path alias `@/*` maps to `src/*`.

### Component conventions

- GNB (`src/components/common/Gnb/`) is composed of `Gnb` → `AuthButtons` or `UserSection` → `UserProfile`. The logged-in vs. logged-out split is determined here.
- Use `next/image` (`<Image />`) instead of `<img>` — ESLint enforces this as a warning.
- `console.log` is disallowed; only `console.warn` and `console.error` are permitted.

## Import order (Prettier enforced)

```
react / next
third-party packages
@/stores/
@/lib/
@/hooks/
@/constants/
@/types/
@/styles/
@/components/
@/
relative imports
```

Prettier auto-sorts imports on save/commit — follow this order when writing new imports so diffs stay clean.
