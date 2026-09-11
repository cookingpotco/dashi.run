# Routing

## serve()

The root table is pathless. `route()` and `group()` values go in `routes`.
`serve()` forwards `Deno.serve` options, plus `fatal`.

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

`/_dashi` is reserved by the framework for compiled JS and internals.

## route()

Declare handlers for a given pattern, per HTTP method.

GET also answers HEAD. Every matched path answers OPTIONS. Neither is a handler
key.

1. `path` - static.
2. `path/:name/to` - required segment.
3. `path/to/:name?` - optional segment (last only).
4. `path/to/:name*` - catch-all segment (last only, and named).

Routes are matched in this order. Optional compiles to static and required routes.

## group()

Group routes, layouts, middleware, and errors together by a prefix.

```tsx posts.ts
import { group } from "dashi";

export const posts = group("/posts", ({ route }) => ({
  routes: [
    route("/", { GET: list }),
    route("/:id", { GET: show }),
  ],
}));
```

Drop that value into the parent `routes`, like in the root `serve()`.

## Params

Typed from the path literal (`ParamsOf`) into string records. e.g. `{ id: string }`.
Groups are not aware of ancestor params. Shared values go on `ctx.state`.

See [Handlers](/docs/handlers) for `ctx.params`.
