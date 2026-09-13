# Slots

A `<RouteSlot>` GETs another route after the page lands, on connect or when it
becomes visible. Use that to keep dynamic data off a cached shell, or to defer
heavy or below-the-fold work.

## RouteSlot

`<RouteSlot src="/cart" />` fetches after the host connects. `fallback` is
optional then. The GET fills the host (`innerHTML`). The host stays, so
`patch.refresh` can re-fetch that `src`. See
[Write handler](/docs/handlers#write-handler).

`html()` on slot requests doesn't render any layouts. See
[Layouts](/docs/layouts-middleware-errors#layouts).

```tsx home.tsx
import { CacheStrategy, type ReadArgs, RouteSlot } from "dashi";

export function Home({ html }: ReadArgs) {
  return html(
    <main>
      <RouteSlot src="/cart" />
    </main>,
    { cache: { strategy: CacheStrategy.Immutable } },
  );
}
```

### visible

`fetchWhen="visible"` waits for the first intersection. `fallback` is required.
`patch.refresh` on the same `src` may fetch before the slot intersects.

```tsx components/panel.tsx
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

The same `src` is a normal document when you visit it. Layouts run on that
request.

The client sends `X-Slot` on the slot GET. You can use that header when the slot
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

A slot body can render another `<RouteSlot>`. Each waits for its parent, so a
deep nest waterfalls. A slot that includes itself, or an ancestor, loops.
