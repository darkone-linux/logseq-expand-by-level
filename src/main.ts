import "@logseq/libs";
import type { BlockEntity, PageEntity } from "@logseq/libs/dist/LSPlugin";

function main() {
  const modifier = (logseq.settings?.modifier as string) ?? "alt";

  for (let level = 1; level <= 8; level++) {
    const label =
      level === 1
        ? "Level 1: collapse all blocks"
        : `Level ${level}: expand up to depth ${level - 1}`;

    logseq.App.registerCommandPalette(
      {
        key: `expand-to-level-${level}`,
        label,
        keybinding: {
          binding: [`${modifier}+${level}`, `${modifier}+num-${level}`],
          mode: "global",
        },
      },
      () => setBlocksVisibility(level),
    );
  }

  logseq.onSettingsChanged(() => {
    logseq.UI.showMsg(
      "Please disable/re-enable the plugin for new keybindings to take effect.",
      "warning",
    );
  });

  logseq.useSettingsSchema([
    {
      key: "modifier",
      type: "string",
      default: "alt",
      title: "Modifier keys",
      description:
        'Prefix for all shortcuts. Recommended: "alt" (single-hand ergonomic). ' +
        'Alternatives: "ctrl+alt", "ctrl+shift", "mod+shift". ' +
        'Use "mod" for Cmd on macOS / Ctrl on Windows/Linux.',
    },
  ]);
}

async function processBlock(
  block: BlockEntity,
  depth: number,
  collapseDepth: number,
): Promise<void> {
  if (!block.uuid) return;

  try {
    await logseq.Editor.setBlockCollapsed(block.uuid, depth >= collapseDepth);
  } catch (e) {
    console.error("[expand-by-level] setBlockCollapsed error:", e);
    return;
  }

  if (!block.children || !Array.isArray(block.children)) return;

  const promises: Promise<void>[] = [];
  for (const child of block.children) {
    if (Array.isArray(child)) {
      if (child[0] === "uuid" && child[1]) {
        const fetched = await logseq.Editor.getBlock(child[1] as string, {
          includeChildren: true,
        });
        if (fetched)
          promises.push(processBlock(fetched, depth + 1, collapseDepth));
      }
    } else if (child && typeof child === "object" && (child as BlockEntity).uuid) {
      promises.push(
        processBlock(child as BlockEntity, depth + 1, collapseDepth),
      );
    }
  }
  await Promise.all(promises);
}

function isPage(entity: PageEntity | BlockEntity): entity is PageEntity {
  return typeof (entity as PageEntity).name === "string";
}

function collectVisibleRootBlockUuids(): string[] {
  const sidebar = document.querySelector(
    ".cp__right-sidebar, #right-sidebar, .sidebar-item-list",
  );
  const all = Array.from(
    document.querySelectorAll<HTMLElement>(
      ".ls-block[blockid], .ls-block[data-uuid], [blockid].ls-block, [data-refs-self]",
    ),
  );
  const seen = new Set<string>();
  const roots: string[] = [];
  for (const el of all) {
    if (sidebar && sidebar.contains(el)) continue;
    const parentBlock = el.parentElement?.closest(
      ".ls-block, [blockid], [data-uuid]",
    );
    if (parentBlock && parentBlock !== el) continue;
    const uuid =
      el.getAttribute("blockid") ??
      el.getAttribute("data-uuid") ??
      el.getAttribute("data-refs-self");
    if (uuid && !seen.has(uuid)) {
      seen.add(uuid);
      roots.push(uuid);
    }
  }
  return roots;
}

async function getRootBlocks(): Promise<BlockEntity[]> {
  const current = await logseq.Editor.getCurrentPage();

  if (current) {
    if (isPage(current)) {
      const tree = await logseq.Editor.getPageBlocksTree(current.name);
      if (tree && tree.length > 0) return tree;
    } else if (current.uuid) {
      const block = await logseq.Editor.getBlock(current.uuid, {
        includeChildren: true,
      });
      if (block) return [block];
    }
  }

  const uuids = collectVisibleRootBlockUuids();
  if (uuids.length > 0) {
    const blocks = await Promise.all(
      uuids.map((uuid) =>
        logseq.Editor.getBlock(uuid, { includeChildren: true }),
      ),
    );
    const valid = blocks.filter((b): b is BlockEntity => !!b);
    if (valid.length > 0) return valid;
  }

  return [];
}

async function setBlocksVisibility(level: number): Promise<void> {
  try {
    const roots = await getRootBlocks();
    if (!roots || roots.length === 0) return;

    const collapseDepth = level - 1;

    await Promise.all(
      roots.map((block) => processBlock(block, 0, collapseDepth)),
    );
  } catch (e) {
    console.error("[expand-by-level] Error:", e);
  }
}

logseq.ready(main).catch(console.error);
