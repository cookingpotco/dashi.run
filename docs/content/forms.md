# Forms

Same-origin form submits are intercepted. GET navigates. POST applies patches.

## GET forms

Fields become the query string, then `navigate()`. Useful for search with URL
state - shareable, back and forward.

When `<navigation-root>` is present, that is a soft navigation. See
[Soft navigation](/docs/soft-navigation).

```tsx search.tsx
export function SearchForm() {
  return (
    <form method="GET" action="/search">
      <input name="q" />
      <button type="submit">Search</button>
    </form>
  );
}
```

```tsx results.tsx
import type { ReadArgs } from "dashi";

export function Search({ ctx, html }: ReadArgs) {
  const q = ctx.url.searchParams.get("q") ?? "";
  return html(<p>{q}</p>);
}
```

## POST forms

Intercepted. The form can sit anywhere on the page. The form gets `aria-busy`
while the write is in flight. A second submit is dropped.

### Patches

A 2xx patch list applies and the form resets. A 4xx patch list applies and the
fields stay. See [Write handler](/docs/handlers#write-handler).

```tsx add_form.tsx
export function AddForm() {
  return (
    <form method="POST" action="/todos">
      <input name="title" />
      <button type="submit">Add</button>
    </form>
  );
}
```

```tsx add.tsx
import { patch, type WriteArgs } from "dashi";

export async function addTodo({ ctx, patches }: WriteArgs) {
  const title = (await ctx.req.formData()).get("title");
  if (typeof title !== "string") {
    return patches([]);
  }
  return patches([
    patch.append("#todos", <li>{title}</li>),
  ]);
}
```

## Document load

When the result cannot stay on the page, the browser loads the document.

### Redirect

A same-origin redirect swaps in place when `<navigation-root>` is present. GET
goes through `navigate()`. POST goes through the write. Without the host, or
when the body is not HTML, the browser does a real document load. See
[Soft navigation](/docs/soft-navigation).

### hardNavigation

`hardNavigation` on the `<form>` or the submitter skips intercept and does a
real document load. On `<a>`, see [Soft navigation](/docs/soft-navigation).
