import '@logseq/libs'

function main() {
  const modifier = (logseq.settings?.modifier as string) ?? 'alt+shift'

  for (let level = 1; level <= 8; level++) {
    const label =
      level === 1
        ? 'Level 1: collapse all blocks'
        : `Level ${level}: expand up to depth ${level - 1}`

    logseq.App.registerCommand(
      'expand-by-level',
      {
        key: `expand-to-level-${level}`,
        label,
        keybinding: {
          binding: [`${modifier}+${level}`, `${modifier}+num-${level}`] as any,
          mode: 'global',
        },
        palette: true,
      },
      () => setBlocksVisibility(level),
    )
  }

  logseq.onSettingsChanged(() => {
    logseq.UI.showMsg(
      'Please disable/re-enable the plugin for new keybindings to take effect.',
      'warning',
    )
  })

  logseq.useSettingsSchema([
    {
      key: 'modifier',
      type: 'string',
      default: 'alt+shift',
      title: 'Modifier keys',
      description:
        'Prefix for all shortcuts (e.g. "alt+shift", "ctrl+shift", "mod+shift"). ' +
        'Use "mod" for Cmd on macOS / Ctrl on Windows/Linux.',
    },
  ])
}

async function processBlock(
  block: BlockEntity,
  depth: number,
  collapseDepth: number,
): Promise<void> {
  if (!block.uuid) return

  try {
    await logseq.Editor.setBlockCollapsed(block.uuid, depth >= collapseDepth)
  } catch (e) {
    console.error('[expand-by-level] setBlockCollapsed error:', e)
    return
  }

  if (!block.children || !Array.isArray(block.children)) return

  const promises: Promise<void>[] = []
  for (const child of block.children) {
    if (Array.isArray(child)) {
      if (child[0] === 'uuid' && child[1]) {
        const fetched = await logseq.Editor.getBlock(child[1], {
          includeChildren: true,
        })
        if (fetched)
          promises.push(processBlock(fetched, depth + 1, collapseDepth))
      }
    } else if (child && typeof child === 'object' && child.uuid) {
      promises.push(processBlock(child, depth + 1, collapseDepth))
    }
  }
  await Promise.all(promises)
}

async function setBlocksVisibility(level: number): Promise<void> {
  try {
    const tree = await logseq.Editor.getCurrentPageBlocksTree()
    if (!tree || tree.length === 0) return

    // level 1 → collapseDepth = 0 (all collapsed)
    // level 2 → collapseDepth = 1 (root only expanded)
    // level N → collapseDepth = N - 1
    const collapseDepth = level - 1

    await Promise.all(
      tree.map((block) => processBlock(block, 0, collapseDepth)),
    )
  } catch (e) {
    console.error('[expand-by-level] Error:', e)
  }
}

logseq.ready(main).catch(console.error)
