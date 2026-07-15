# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

YAIST-Next is a CJK character search tool built with Next.js 14 App Router. Users search for kanji/hanzi via Ideographic Description Sequences (IDS) — structural decompositions of characters into components.

### Routing

- `/` → redirects to `/ja` (default locale)
- `/[locale]/*` — all pages live under the dynamic locale segment (`ja`, `en`, `zh-cn`)
- Locale prefix is always included in URLs (`localePrefix: "always"`)
- [src/routing.ts](src/routing.ts) defines supported locales; [src/middleware.ts](src/middleware.ts) handles locale detection/redirect

### API Routes

Three server-side endpoints under [src/app/api/](src/app/api/):

| Endpoint | Params | Purpose |
|---|---|---|
| `GET /api/search` | `q`, `sort` | Search characters by IDS query |
| `GET /api/char` | `c` | Fetch enriched data for one character |
| `GET /api/decompose` | `char` | Decompose a character into IDS components |

All routes call into [src/lib/enrich.ts](src/lib/enrich.ts) which transforms raw character data into `CharCardData`.

### Data Pipeline

1. **[src/lib/data-loader.ts](src/lib/data-loader.ts)** — singleton that loads static data files from `/public/` once per process (stored on `globalThis`). Files: `cjkvi_ids.txt`, `variants.json`, `IVD_Sequences.txt`.
2. **[src/lib/enrich.ts](src/lib/enrich.ts)** — enriches a character with Unicode block, stroke count, IDS, variants, IVS codes, and GlyphWiki URLs. Calls the `idsfind` npm package (server-only).
3. **[src/lib/ivd-parser.ts](src/lib/ivd-parser.ts)** — parses `IVD_Sequences.txt` into a Map.

The `idsfind` package is declared as a `serverComponentsExternalPackages` in [next.config.mjs](next.config.mjs) because it cannot be bundled by webpack.

### State Management

Global UI state lives in Jotai atoms ([src/store/atoms.ts](src/store/atoms.ts)):
- `termAtom` / `resultsAtom` / `termCardsAtom` — search input and results
- `sortStyleAtom` — sort order (byUnicode | byStrokes)
- `pasteTypeAtom` / `templateAtom` — persisted to localStorage via `atomWithStorage`

All data fetching from client components goes through [src/hooks/useSearch.ts](src/hooks/useSearch.ts), which calls the API routes and writes to atoms.

### Provider Hierarchy

Root layout ([src/app/layout.tsx](src/app/layout.tsx)) → Locale layout ([src/app/[locale]/layout.tsx](src/app/[locale]/layout.tsx)):
- `NextIntlClientProvider` wraps the app with the locale's message file from `/messages/`
- `JotaiProvider` wraps below that for atom access

### Internationalization

Message files: [messages/ja.json](messages/ja.json), [messages/en.json](messages/en.json), [messages/zh-cn.json](messages/zh-cn.json). Add new strings to all three. Use `useTranslations()` in client components and `getTranslations()` in server components/routes.

### Path Alias

`@/*` resolves to `src/*` (configured in [tsconfig.json](tsconfig.json)).
