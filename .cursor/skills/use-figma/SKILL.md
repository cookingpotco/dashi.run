---
name: use-figma
description: >-
  Talks to an open Figma file in Chrome through chrome-devtools
  evaluate_script and the Figma plugin API, and screenshots the canvas
  to catch visual issues plugin data misses. Use when reading, creating,
  editing, or verifying a Figma design in a local session. Not for Cloud
  Agents. Not for the Figma REST API.
---

# Using Figma

Local sessions only. The file must be open in the Chrome tab that
`chrome-devtools` controls. How to interpret the file (live content over layer
names, JSX names, layout) is `.cursor/rules/figma.mdc`. Plugin properties are
not a picture of the page: screenshot the canvas you are editing, creating,
reviewing, or comparing against.

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

Writes only when the user asked for that change. After a read or write,
follow **Look at it** before you judge or finish.

## Look at it

Plugin JSON does not show overlap, misalignment, type or color that
drifts from siblings, crowding, clipping, or whether the page is ugly
or hard to use. Screenshot the actual canvas — and the running UI, when
the other side is code. Do this before you judge a frame, after every
write, and when you compare two surfaces.

1. Clear selection and point the viewport at the nodes with the plugin
   API. Do not pan by clicking:

```js
(async () => {
  const node = await figma.getNodeByIdAsync("12:34");
  if (!node) return { error: "missing" };
  figma.currentPage.selection = [];
  figma.viewport.scrollAndZoomIntoView([node]);
  return { id: node.id, name: node.name };
});
```

2. `take_screenshot` that Figma `pageId` (the viewport, not `fullPage`).
   Read the image. If it is mid-pan, blank, or cropped oddly, wait and
   shoot again.
3. A frame taller than the viewport needs a zoomed-to-fit shot of the
   whole thing plus closer shots of each section.
4. Matching code: screenshot the live page the same way and compare the
   two images.

Fix what you see through the plugin API, then screenshot again. Do not
finish on properties you have not looked at.

## Troubleshooting

If `figma` is not defined: the user needs edit permission and plugin access. A
branch of the file works if they cannot edit main. If it is still missing, have
them open any plugin and close it — the `figma` global often stays unset until a
plugin has run once in that file.
