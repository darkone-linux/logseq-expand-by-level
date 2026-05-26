# Expand by Level

A Logseq plugin that collapses or expands all blocks by nesting level with keyboard shortcuts. Works on any page (journals, pages, sidebars).

## Demo

<!-- TODO: add animated GIF -->
<!-- ![Demo](./demo.gif) -->

## Features

- **10 levels** — `Ctrl+Shift+0` (root only) through `Ctrl+Shift+9` (expand all)
- **Works everywhere** — journals, pages, embedded blocks, sidebar
- **Configurable modifier** — choose `mod+shift`, `mod+alt`, `ctrl+shift`, etc.
- **Command palette** — all commands also searchable in the palette

## Usage

| Shortcut           | Effect                              |
| ------------------ | ----------------------------------- |
| `Ctrl+Shift+0`     | Show only root blocks (level 0)     |
| `Ctrl+Shift+1`     | Show blocks up to level 1           |
| `Ctrl+Shift+2`     | Show blocks up to level 2           |
| `Ctrl+Shift+3`     | Show blocks up to level 3           |
| `Ctrl+Shift+4`     | Show blocks up to level 4           |
| `Ctrl+Shift+5`     | Show blocks up to level 5           |
| `Ctrl+Shift+6`     | Show blocks up to level 6           |
| `Ctrl+Shift+7`     | Show blocks up to level 7           |
| `Ctrl+Shift+8`     | Show blocks up to level 8           |
| `Ctrl+Shift+9`     | Show all blocks                     |

On macOS, `Ctrl` maps to `Cmd` by default.

## Configuration

### Modifier keys

Go to **Settings → Plugins → Expand by Level** and change the `modifier` field.
After changing, disable then re-enable the plugin for new bindings to take effect.

Common values:
- `mod+shift` — Ctrl+Shift (Win/Linux) / Cmd+Shift (macOS)
- `mod+alt` — Ctrl+Alt / Cmd+Alt
- `mod+shift+alt` — Ctrl+Shift+Alt / Cmd+Shift+Alt
- `ctrl+shift` — Ctrl+Shift (Win/Linux only)
- `ctrl+alt` — Ctrl+Alt (Win/Linux only)

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
