# Routing

## serve()

The root table is pathless. `route()` and `group()` values go in `routes`.
`serve()` forwards `Deno.serve` options, plus `fatal`. `/_dashi` is reserved: an
app route there throws at boot.

```tsx main.ts
import { serve } from "dashi";
import { Home } from "./home/mod.tsx";
import { add, list } from "./join/mod.tsx";
import { fatal } from "./errors.tsx";

serve(({ route }) => ({
  routes: [
    route("/", { GET: Home }),
    route("/join", { GET: list, POST: add }),
  ],
}), { fatal });
```

## route()

A path literal and per-method handlers. GET and POST share one row. Two
`route()` calls for the same joined path, or the same shape (`/posts/:id` and
`/posts/:slug`), throw when the table compiles.

GET also answers HEAD. Every matched path answers OPTIONS. Neither is a handler
key.

- static
- `:name`
- `:name?` (last only)
- `:name*` (last only, and named)

Match order is static, then param, then catch-all. Declared paths have no
trailing slash except `/`.

## group()

Pass a prefix to join onto child paths, or omit it for a pathless wrap.
`group("/")` is illegal. A prefix cannot end in `?` or `*`.

```tsx posts.ts
import { group } from "dashi";

export const posts = group("/posts", ({ route }) => ({
  routes: [
    route("/", { GET: list }),
    route("/:id", { GET: show }),
  ],
}));
```

Drop that value into the parent `routes`. Layouts, middleware, and errors on a
group are on [Layouts, middleware, errors](/docs/layouts-middleware-errors).

## params

Typed from the path literal (`ParamsOf`). Joined inside one group. A group
boundary does not type ancestor params. Shared values go on `ctx.state`.

See [Handlers](/docs/handlers) for `ctx.params`.
