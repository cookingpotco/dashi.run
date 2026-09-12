# Layouts, middleware, errors

Layouts wrap the route after it runs. Middleware runs on every request. Three
error handlers.

## Layouts

Rendered by [`html()`](/docs/handlers#read-handler) calls, outermost first. Use
for shared UI only, with no gating or state change. Slot hits skip them. See
[Slots](/docs/slots).

`ctx.state` is readonly. Set state in middleware or the handler. See
[Handlers](/docs/handlers#ctx).

```tsx root_layout.tsx
import type { LayoutArgs } from "dashi";

export function RootLayout({ children }: LayoutArgs) {
  return (
    <html>
      <body>
        <header>App</header>
        {children}
      </body>
    </html>
  );
}
```

Attach `layouts: [RootLayout]` on `serve()` or a `group()`.

## Middleware

Every request - document and slot. Mutate `state` in place. Logging, auth,
session.

```ts session.ts
import type { MiddlewareArgs } from "dashi";

export async function session({ ctx, next }: MiddlewareArgs) {
  const cookie = ctx.req.headers.get("cookie");
  if (!cookie?.includes("session=")) {
    return Response.redirect(new URL("/login", ctx.url), 303);
  }
  ctx.state.user = await loadUser(cookie);
  return next();
}
```

Attach `middleware: [session]` on `serve()` or a `group()`. Outermost first.

## Errors

`notFound` and `error` live on `serve()` or a `group()`. `fatal` is only on
`serve()` options. Just like regular handlers, they return `Response`. Directly
or sealed through `html()`.

### notFound

A document miss. Receives `ctx` and `html()`. `html()` wraps remaining layouts,
with 404 as the default status. Omitted walks to the parent.

A slot miss is an empty 404. `notFound` does not run.

### error

Receives `ctx`, `thrown`, and `html()`. `html()` wraps remaining layouts, with
500 as the default status.

1. Handler throw - this group's `error`
2. Omitted, or this `error` throws - parent
3. This group's layouts throw - skip this `error`, parent
4. Slot throw - that group's `error` if present, no layouts, no parent. No
   `fatal` fallback otherwise.

### fatal

Last-resort 500. Receives `html()` only - no `ctx`, no `thrown`, no layouts. A
slot last-resort is an empty 500, not `fatal`.

A throw in middleware skips `error` and follows the `fatal` path.

```tsx errors.tsx
import type { ErrorArgs, FatalArgs, NotFoundArgs } from "dashi";

export function notFound({ html }: NotFoundArgs) {
  return html(<p>Not found</p>);
}

export function error({ html }: ErrorArgs) {
  return html(<p>Something went wrong</p>);
}

export function fatal({ html }: FatalArgs) {
  return html(
    <html>
      <body>
        <p>The site couldn't recover</p>
      </body>
    </html>,
  );
}
```

```ts api/errors.ts
export function error() {
  return Response.json({ msg: "Something went wrong." });
}
```
