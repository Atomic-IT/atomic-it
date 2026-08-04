# atomic-it

Nuxt 4 starter with TypeScript, SCSS, anime.js, Biome, Stylelint, and Husky.

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Lint & format check (Biome) |
| `pnpm lint:fix` | Auto-fix with Biome |
| `pnpm lint:style` | Lint styles (Stylelint) |
| `pnpm lint:style:fix` | Auto-fix styles |
| `pnpm typecheck` | Vue/Nuxt typecheck |
| `pnpm tsc` | TypeScript project references build |

## Stack

- **Nuxt 4** + Vue 3
- **TypeScript** (`vue-tsc` / `tsc`)
- **SCSS** (global variables via Vite)
- **anime.js** v4
- **Biome** — lint + format
- **Stylelint** — CSS/SCSS/Vue styles
- **Husky** + lint-staged — pre-commit hooks
