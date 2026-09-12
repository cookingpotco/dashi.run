# Soft navigation

Soft navigation swaps the main region in place instead of reloading the whole
document. Use it when chrome outside the swap region should stay put: headers,
sidebars, and client modules that already ran.

## NavigationRoot

Wrap the swapping region once per document, usually in the root layout. Chrome
outside `<navigation-root>` survives a soft nav.

```tsx root_layout.tsx
import { type LayoutArgs, NavigationRoot } from "dashi";

export function RootLayout({ children }: LayoutArgs) {
  return (
    <html>
      <body>
        <header>App</header>
        <NavigationRoot>{children}</NavigationRoot>
      </body>
    </html>
  );
}
```

With the host present, same-origin left-clicks, GET forms, and same-origin form
redirects soft-navigate. The incoming HTML must include `<navigation-root>` or
the browser does a full load instead.

Without the host, GET is always a full load. POST and other writes can still
apply patches if the client runtime is on the page. See [Forms](/docs/forms).

While a navigation is in flight the root is `aria-busy`, and a newer navigation
aborts the old one. History updates for back and forward. Scroll position
restores, including hash targets. After the swap, focus moves to `[autofocus]`
or the host. The head merges in place: matching stylesheets and scripts stay,
new CSS loads before the swap, `lang` updates, and the title is announced to
assistive tech. Same path with a new hash only updates `location.hash`.

## Opt out

`hardNavigation` on the `<a>`, `<form>`, or submitter skips intercept and does a
real document load. Modifier keys, middle-click, `target`, and cross-origin
links stay native.

```tsx external.tsx
<a href="/report.pdf" hardNavigation>Download</a>;
```

## Client

Call `navigate()` from `dashi/client` to soft-navigate from your own modules.
After a successful commit the document fires `dashi:navigated` (`bubbles`,
`composed`) with `{ url, push }`.

```ts filter.ts
import { navigate } from "dashi/client";

select.addEventListener("change", () => {
  void navigate(`/items?tag=${select.value}`);
});
```

```ts nav_link.ts
document.addEventListener("dashi:navigated", (event) => {
  const { url, push } = event.detail;
  // sync chrome to url.pathname
});
```

GET form field details live in [Forms](/docs/forms). How client modules ship is
in [Client JS](/docs/client-js).
