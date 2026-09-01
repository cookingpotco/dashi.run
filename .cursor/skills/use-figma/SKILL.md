---
name: use-figma
description: >-
  Talks to an open Figma file in Chrome through chrome-devtools
  evaluate_script and the Figma plugin API. Use when reading, creating,
  editing, or verifying a Figma design in a local session. Not for Cloud
  Agents. Not for the Figma REST API.
---

# Using Figma

Local sessions only. The file must be open in the Chrome tab that
`chrome-devtools` controls. How to interpret the file (live content over layer
names, JSX names, layout) is `.cursor/rules/figma.mdc`.

## Prerequisite

The `chrome-devtools` MCP namespace must be ready (plugin
`devtools-for-agents`). If it is missing, ask the user to add it
(`/add-plugin devtools-for-agents`) and stop.

`chrome-devtools` must attach to the user's already-running browser
(`--autoConnect` plus, for Arc, `--userDataDir` pointing at
`~/Library/Application Support/Arc/User Data` in `~/.cursor/mcp.json`). Do not
`new_page` a Figma URL in a fresh profile — that window is not signed in. Do not
create tabs in Arc (`Target.createTarget` can crash it). If `list_pages` shows
only `about:blank` or a guest Figma view, stop and ask the user to enable remote
debugging in that browser (`chrome://inspect/#remote-debugging`) and restart the
MCP server.

Do not use the Figma REST API. Do not drive the Figma UI with clicks.

## Connect

1. `list_pages`. Use a Figma design tab that is already open in the user's
   Chrome. If none is open, ask them to open the file — do not launch a new
   browser.
2. `select_page` that tab. Note its `pageId`.
3. Probe with `evaluate_script` (`waitForStableDom: false`):

```js
(() => typeof figma !== "undefined");
```

If that is false, see **Troubleshooting**. Do not continue until it is true.

## Work

Say in plain language what you will read or change (design and code, when both
apply). Then `evaluate_script` on that `pageId`.

The `function` argument is a JS function declaration. The return value must be
JSON-serializable. For reads, set `waitForStableDom: false`.

```js
(async () => {
  const page = figma.currentPage;
  return { id: page.id, name: page.name };
});
```

Plugin API:
[Figma Plugin API](https://developers.figma.com/docs/plugins/api/global-objects/).
`figma.notify` is fine here. Colors are 0–1, not 0–255. Clone fills/strokes
before mutating. Text edits: load fonts, await, then write.

Writes only when the user asked for that change.

## Troubleshooting

If `figma` is not defined: the user needs edit permission and plugin access. A
branch of the file works if they cannot edit main. If it is still missing, have
them open any plugin and close it — the `figma` global often stays unset until a
plugin has run once in that file.
