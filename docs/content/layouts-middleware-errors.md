# Layouts, middleware, errors

Layouts wrap the route after it runs. Middleware runs on every request. Three
error handlers.

## Layouts

Shared UI only. No gating or state change. They run after the route, outermost
first. Document hits only - slot hits skip them. See [Slots](/docs/slots).

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
`serve()` options.

### notFound

A document miss. Receives `ctx` and `html()`. `html()` wraps remaining layouts.
Omitted walks to the parent.

A slot miss is an empty 404. `notFound` does not run.

### error

A handler throw, or an inner group's failure. Receives `ctx`, `thrown`, and
`html()`. Document `html()` wraps remaining layouts from that group. This
group's `error` does not catch this group's layouts.

A slot `error` is that group only - no layouts, and no parent `error`. If that
group has no `error`, or it throws, the slot is an empty 500.

### fatal

Last-resort 500. Receives `html()` only - no `ctx`, no `thrown`, no layouts. A
slot last-resort is an empty 500, not `fatal`.

A throw in middleware skips `error`. On a document it goes to `fatal`. On a slot
it is an empty 500.

```tsx errors.tsx
import type { ErrorArgs, FatalArgs, NotFoundArgs } from "dashi";

export function notFound({ html }: NotFoundArgs) {
  return html(<p>Not found</p>, { status: 404 });
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
