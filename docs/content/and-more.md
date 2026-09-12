# And More

Helpers that sit beside routing and handlers: disk files, cross-origin access,
and styling.

## Static files

`staticFile(ctx, dir, relative)` serves a file from disk. Call it from a route
handler, not middleware. The third argument is the path under `dir`, usually
from `ctx.params`.

```ts main.ts
import { CacheStrategy, route, staticFile } from "dashi";

route("/static/:file", {
  GET: ({ ctx }) =>
    staticFile(ctx, `${import.meta.dirname}/static`, ctx.params.file, {
      strategy: CacheStrategy.Immutable,
    }),
});
```

Pass `cache` for long-lived assets. Omitted paths and traversal outside `dir`
return 404.

## CORS

`cors()` is middleware for a `group()`. OPTIONS returns 204 with CORS headers;
other methods pass through and get the same headers on the response.

`credentials: true` requires an explicit `origin`. Wildcard `*` is not allowed
with credentials.

```ts api.ts
import { cors } from "dashi/cors";
import { group, route } from "dashi";

export const api = group("/api", ({ route }) => ({
  middleware: [cors({ origin: "https://app.example.com", credentials: true })],
  routes: [route("/ok", { GET: () => Response.json({ ok: true }) })],
}));
```

## CSS

Dashi is CSS-agnostic. Link a stylesheet from your layout like any other app.

For cache-friendly CSS, build to a hashed filename and serve it with
`staticFile` on a route such as `/generated/:file`. The URL changes when the
file changes, so you can set `CacheStrategy.Immutable`.
