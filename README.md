# Expend by Level

A Logseq plugin that collapses/expands all blocks based on their nesting level.

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

On macOS, `Ctrl` becomes `Cmd` by default.

All commands also appear in the command palette.

## Configuration

### Modifier keys

Go to plugin settings and change `modifier` to customize the key prefix.
After changing, disable/re-enable the plugin for the new bindings to take effect.

Common values:
- `mod+shift` — Ctrl+Shift (Win/Linux) / Cmd+Shift (macOS)
- `mod+alt` — Ctrl+Alt / Cmd+Alt
- `mod+shift+alt` — Ctrl+Shift+Alt / Cmd+Shift+Alt
- `ctrl+shift` — Ctrl+Shift (Win/Linux only)
- `ctrl+alt` — Ctrl+Alt (Win/Linux only)

### Individual keybinding overrides

You can override any shortcut in Logseq's **Settings → Keyboard Shortcuts** by searching for "Expend by Level".

## Development

```bash
pnpm install
pnpm build
```

Load the plugin in Logseq via **Settings → Plugins → Load unpacked plugin**, selecting the project root (not `dist/`).

## Publishing

1. Push to GitHub
2. Create a tag: `git tag v1.0.0 && git push --tags`
3. Create a release on GitHub from the tag
4. The GitHub Action builds and attaches the zip automatically
5. Submit a PR to [logseq/marketplace](https://github.com/logseq/marketplace)
