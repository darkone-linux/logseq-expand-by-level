import '@logseq/libs'

function main() {
  const modifier = (logseq.settings?.modifier as string) ?? 'mod+shift'

  for (let level = 0; level <= 9; level++) {
    logseq.App.registerCommand(
      'expand-by-level',
      {
        key: `expand-to-level-${level}`,
        label: `Show blocks up to level ${level}`,
        keybinding: {
          binding: `${modifier}+${level}`,
          mode: 'global',
        },
        palette: true,
      },
      () => toggleBlocksToLevel(level),
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
      default: 'mod+shift',
      title: 'Modifier keys',
      description:
        'Prefix for all shortcuts. Common: mod+shift, mod+alt, mod+shift+alt, ctrl+shift, ctrl+alt. ' +
        '"mod" maps to Cmd on macOS / Ctrl on Windows/Linux.',
    },
  ])
}

async function processBlock(
  block: BlockEntity,
  depth: number,
  targetLevel: number,
): Promise<void> {
  if (!block.uuid) return

  try {
    await logseq.Editor.setBlockCollapsed(block.uuid, depth > targetLevel)
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
        if (fetched) promises.push(processBlock(fetched, depth + 1, targetLevel))
      }
    } else if (child && typeof child === 'object' && child.uuid) {
      promises.push(processBlock(child, depth + 1, targetLevel))
    }
  }
  await Promise.all(promises)
}

async function toggleBlocksToLevel(level: number): Promise<void> {
  try {
    const tree = await logseq.Editor.getCurrentPageBlocksTree()
    if (!tree || tree.length === 0) return

    await Promise.all(tree.map((block) => processBlock(block, 0, level)))
  } catch (e) {
    console.error('[expand-by-level] Error:', e)
  }
}

logseq.ready(main).catch(console.error)
