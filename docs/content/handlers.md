# Handlers

Every handler returns a `Response`, HTML or anything else (JSON, a redirect,
204). The routing runtime is what executes a handler.

## Read handler

A GET handler, receives `html()` in its args.

### html()

`html()` adds layouts, DOCTYPE, default cache headers, and sets the status. Skip
it and a raw `Response` is sent as-is.

```tsx page.tsx
import type { ReadArgs } from "dashi";

export function Home({ html }: ReadArgs) {
  return html(
    <main>
      <h1>Hello</h1>
    </main>,
  );
}
```

```ts json.ts
export function getJson(): Response {
  return Response.json({ ok: true });
}
```

### Status

Pass `{ status }` to set the status of the response, 200 by default.

### Cache

Pass `{ cache }` to set the `Cache-Control` headers. `CacheStrategy` picks the
policy, omitted is no-store. Every sealed response sets `Vary: x-slot`. Public
and Immutable cannot vary on `Cookie` or `*`.

## Write handler

POST, PUT, PATCH, or DELETE. Call `patches()` or return a raw `Response`.

### Patches

A patch is HTML aimed at an element. By `#id` or `/path` (refresh).

- `update` - replace the target's children
- `replace` - replace the target node
- `append` / `prepend` - add children
- `before` / `after` - insert siblings
- `remove` - drop the target
- `refresh` - re-fetch a [RouteSlot](/docs/slots) by full `src`

```tsx add.tsx
import { patch, type WriteArgs } from "dashi";

export async function addTodo({ ctx, patches }: WriteArgs) {
  const title = (await ctx.req.formData()).get("title");
  if (typeof title !== "string") {
    return patches([]);
  }
  return patches([
    patch.append("#todos", <li>{title}</li>),
    patch.update("#count", <>3</>),
  ]);
}
```

### Forms

Form submissions are the main mechanism for patches. See [forms](/docs/forms)
for more details.

## ctx

1. `req` - `Request` object.
2. `url` - `URL` object.
3. `params` - Typed params from that route. e.g. `{ id: string }`
4. `state` - Partial app defined state object, mutate in-place. e.g.
   `{ user?: MyUser }`

Middleware and errors see `WrapperCtx` (wide params). Layouts see `LayoutCtx`
(`state` is readonly). More in
[Layouts, middleware, errors](/docs/layouts-middleware-errors).
