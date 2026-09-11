# JSX

## How we use it

JSX is precompiled to static HTML on the wire. Built for fast, simple SSR.

`style` is a CSS string, not an object. There are no event-handler props - use
[Client JS](/docs/client-js).

```tsx hello.tsx
export function Field() {
  return (
    <label className="field" htmlFor="email">
      Email
    </label>
  );
}
```

↓

```html output.html
<label class="field" for="email">
  Email
</label>
```

## Types

Import these from `dashi/jsx-runtime`.

- `Element`. The HTML JSX returns.
- `DashiNode`. A JSX child: `Element`, `number`, `string`, etc.
- `HTMLAttributes` and `SVGAttributes`. Shared props for HTML and SVG tags.
