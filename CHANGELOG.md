# Changelog

## 1.0.0 (2026-05-26)

### Features

- **Collapse/expand by level.** Press `Alt+1` to collapse everything, `Alt+2` to show only root blocks, `Alt+3` through `Alt+8` to expand to increasing depth. Each command is accessible from the palette and bound to both the top-row digit keys and the numpad.
- **Works on every Logseq view.** Regular pages, the journals home page, and zoomed blocks — all respond to the shortcut.
- **Journals home page.** Uses DOM-based root block detection (`collectVisibleRootBlockUuids`) to handle Logseq's lazy-loaded journal rendering. Only blocks currently visible in the DOM are affected — open the day's page directly for full-page deterministic behaviour.
- **Zoomed blocks.** Detected via `getCurrentPage()` returning a `BlockEntity` (type guard `isPage`). The level is applied to the zoomed subtree only.
- **Sidebar support.** Blocks in the right sidebar are excluded from the DOM scan to avoid unintended collapses.
- **Explicit type-safe TypeScript.** Uses `BlockEntity` and `PageEntity` types from `@logseq/libs` with proper type guards and casts.
- **Configurable modifier.** Plugin settings let you change the modifier key (`alt`, `ctrl+alt`, `ctrl+shift`, `mod+shift`, etc.). Changing it shows a warning: the plugin must be disabled/re-enabled for new bindings to take effect.

### Developer Experience

- **Vite 6 + TypeScript 5** build pipeline with `vite-plugin-logseq` for HMR.
- **pnpm** package manager + GitHub Actions CI (`publish.yml`) that builds and zips `dist/` on every `v*` tag push for marketplace submission.
- **Nix shell** (`shell.nix`) providing `nodejs`, `typescript`, `typescript-language-server`, and `just` — `npm install` runs automatically on shell entry.
- **Justfile** with `build`, `clean`, `bump`, and `dev` recipes.
- **Marketplace-ready** `manifest.json` with `repo: darkone-linux/logseq-expand-by-level`.
- Animated demo GIF (`demo.gif`, ~4.2 MB) embedded in `README.md`.

### Fixes

- **Numpad bindings.** Registered as separate commands (`palette: false`) instead of array keybinding casts — each digit key and its numpad equivalent are distinct, avoiding Logseq binding normalisation issues.
- **Removed `as any` casts.** Array keybinding workaround replaced with two explicit `registerCommandPalette` calls per level.
