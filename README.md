# Expand by Level

A Logseq plugin that collapses or expands all blocks by nesting level with keyboard shortcuts. Works on any page (journals, pages, sidebars).

## Demo

<!-- TODO: add animated GIF -->
<!-- ![Demo](./demo.gif) -->

## Features

- **8 levels** — `Alt+Shift+1` (all collapsed) through `Alt+Shift+8` (expand deep)
- **Numpad support** — both top-row and numpad numbers work
- **Works everywhere** — journals, pages, embedded blocks, sidebar
- **Configurable modifier** — `alt+shift` by default, changeable to `ctrl+shift`, `mod+shift`, etc.
- **Command palette** — all commands also searchable in the palette

## Usage

| Shortcut       | Effect                                          |
| -------------- | ----------------------------------------------- |
| `Alt+Shift+1`  | Collapse all blocks                             |
| `Alt+Shift+2`  | Show root blocks only (collapse children)       |
| `Alt+Shift+3`  | Expand up to depth 1, collapse deeper           |
| `Alt+Shift+4`  | Expand up to depth 2, collapse deeper           |
| `Alt+Shift+5`  | Expand up to depth 3, collapse deeper           |
| `Alt+Shift+6`  | Expand up to depth 4, collapse deeper           |
| `Alt+Shift+7`  | Expand up to depth 5, collapse deeper           |
| `Alt+Shift+8`  | Expand up to depth 6, collapse deeper           |

## Configuration

### Modifier keys

Go to **Settings → Plugins → Expand by Level** and change the `modifier` field.
After changing, disable then re-enable the plugin for new bindings to take effect.

Common values:
- `alt+shift` — default, works on all platforms
- `ctrl+shift` — Ctrl+Shift (Win/Linux)
- `mod+shift` — Ctrl+Shift (Win/Linux) / Cmd+Shift (macOS)
- `ctrl+alt` — Ctrl+Alt (Win/Linux)

### Individual keybinding overrides

You can override any shortcut in **Settings → Keyboard Shortcuts** by searching for "Expand by Level".

## Installation

### From the marketplace

Search for "Expand by Level" in **Settings → Plugins → Marketplace**.

### Manual (development)

```bash
git clone https://github.com/darkone-linux/logseq-expand-by-level.git
cd logseq-expand-by-level
npm install
npm run build
```

Then **Settings → Plugins → Load unpacked plugin** → select the project root.

## Development

```bash
npm run dev       # Vite dev server with HMR
npm run build     # production build → dist/
```

## Publishing

1. `just bump [patch|minor|major]` — bumps version, commits, tags
2. `git push && git push --tags`
3. Create a GitHub Release from the tag
4. The [publish workflow](./.github/workflows/publish.yml) attaches the zip
5. Submit a PR to [logseq/marketplace](https://github.com/logseq/marketplace)
