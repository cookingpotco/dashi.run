# Slots

Same-request UI is a component import. `<RouteSlot src>` GETs that route later
and fills the host. Use it when the shell can be cached but part of the page
cannot, or when work should wait until after first paint - a heavy slot, or
content below the fold with `fetchWhen="visible"` and a `fallback`.

## RouteSlot

`<RouteSlot src="/todos" />` fetches after the host connects. `fallback` is
optional then. The GET fills the host (`innerHTML`). The host stays, so
`patch.refresh` can re-GET that `src`. See
[Write handler](/docs/handlers#write-handler).

```tsx home.tsx
import { RouteSlot } from "dashi";

export function Home() {
  return (
    <main>
      <RouteSlot src="/todos" />
    </main>
  );
}
```

### visible

`fetchWhen="visible"` waits for the first intersection. `fallback` is required.
`patch.refresh` on the same `src` may fetch before the slot intersects.

```tsx lazy.tsx
import { RouteSlot } from "dashi";

export function Panel() {
  return (
    <RouteSlot
      src="/chart"
      fetchWhen="visible"
      fallback={<p>Loading</p>}
    />
  );
}
```

### fallback

Shown until a successful body, or a nonempty error body, replaces it. On
connect, omit it and the host is empty until the GET lands.

## As a page

The same `src` is a normal document when you visit it. Layouts run on that hit
and skip the slot GET. See [Layouts](/docs/layouts-middleware-errors#layouts).

The client sends `X-Slot` on the slot GET. Check that header when the slot
markup should differ from the page.

```tsx profile.tsx
import type { ReadArgs } from "dashi";

export function Profile({ ctx, html }: ReadArgs) {
  const isSlot = ctx.req.headers.get("x-slot") !== null;
  if (isSlot) {
    return html(<Card />);
  }
  return html(<Page />);
}
```

Every sealed `html()` / `patches()` response sets `Vary: x-slot`. A custom CDN
cache key must include that header, or a slot body and a document for the same
URL can share one entry. See [Read handler](/docs/handlers#read-handler).

## Nested slots

A slot body can render another `<RouteSlot>`. Page to panel to chart is fine.

A cycle is the author's problem. The framework does not stop it. Nesting a slot
that re-fetches an ancestor, or looping the same `src`, shows up as endless GETs
in Network. Do not do that.
