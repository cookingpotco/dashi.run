# Handlers

Every handler returns a `Response` - HTML or anything else (JSON, a redirect,
204). The routing runtime is what executes a handler.

## Read handler

GET. `{ status }` on `html()` sets the HTTP status. Default 200.

### html()

`html()` adds layouts, DOCTYPE, and default cache headers. Skip it and a raw
`Response` is sent as-is.

```tsx page.tsx
export function Home({ html }) {
  return html(
    <main>
      <h1>Hello</h1>
    </main>,
  );
}
```

```ts json.ts
export function getJson() {
  return Response.json({ ok: true });
}
```

### Cache

Pass `{ cache }` to `html()`. `CacheStrategy` picks the policy. Omitted is
no-store. Every sealed response sets `Vary: x-slot`. Public and Immutable cannot
`Vary` on `Cookie` or `*`.

## Write handler

POST, PUT, PATCH, or DELETE. Call `patches()` or return a raw `Response`.
`{ status }` on `patches()` sets the HTTP status. Default 200. GET cannot return
patches.

### Patches

A patch is HTML aimed at an element.

- `update` - replace the target's children
- `replace` - replace the target node
- `append` / `prepend` - add children
- `before` / `after` - insert siblings
- `remove` - drop the target
- `refresh` - a route path only

`update`, `replace`, `append`, `prepend`, `before`, `after`, and `remove` take
an `#id`. `refresh` takes a route path (`/todos`), not an `#id`.

```tsx add.ts
import { patch } from "dashi";

export async function addTodo({ ctx, patches }) {
  const data = await ctx.req.formData();
  const title = data.get("title");
  return patches([
    patch.append("#todos", <li>{title}</li>),
    patch.update("#count", <>3</>),
  ]);
}
```

### Forms

See [Forms](/docs/forms) for form POST and when patches apply.

## ctx

`req`, `url`, `params`, and `state`. Mutate `state` in place. Do not replace the
object.

A handler `Ctx` types `params` from that route. Middleware and errors see
`WrapperCtx` (wide params). Layouts see `LayoutCtx` (`state` is readonly). See
[Layouts, middleware, errors](/docs/layouts-middleware-errors).
