# Forms

Same-origin form submits are intercepted. Use GET forms to navigate and POST to
drive UI updates through patches.

## GET forms

Fields become the query string, then
[`navigate()`](/docs/soft-navigation#client). Useful for search with URL state -
shareable, back and forward.

When `<navigation-root>` is present, that is a soft navigation. See
[Soft Navigation](/docs/soft-navigation).

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

The form can sit anywhere on the page. While the write is in flight `aria-busy`
is set and a second submit is dropped.

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
    return patches([
      patch.replace("#error", <p>Title is required</p>),
    ], { status: 400 });
  }
  return patches([
    patch.append("#todos", <li>{title}</li>),
  ]);
}
```

## Document load

When the result cannot stay on the page, the browser loads the document.

### Redirect

A same-origin redirect swaps in place when `<navigation-root>` is present.
Without the host, or when the body is not HTML, the browser does a real document
load. See [Soft Navigation](/docs/soft-navigation).

### hardNavigation

`hardNavigation` on the `<form>` or the submitter skips intercept and does a
real document load. Same as on `<a>`, see
[Soft Navigation](/docs/soft-navigation).

```tsx navigate_away.tsx
export function NavigateForm() {
  return (
    <form method="GET" action="/elsewhere" hardNavigation>
      <button type="submit">Go elsewhere</button>
    </form>
  );
}
```
