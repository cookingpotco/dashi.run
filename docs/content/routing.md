# Routing

A route is a path bound to a method handler. Handlers return `Response`, the
same as any other endpoint.

## Declaring a route

Bind the path on the root table. The handler lives in the page module; the table
is the only place that names the path and methods.

Do not call a handler from another handler. Share markup as a component instead.

### Layouts

Layouts are chrome after the route. They wrap what the handler returned; they
are not the page itself.

> Layouts wrap the route. They are chrome after the handler returns. Use
> middlewares for state manipulation auth blah blah blah

[a handbook link](/docs/getting-started)

- Nested groups own their own prefix params
- Shared values live on ctx.state, not ancestor params

## Something else

1. Export the handler from the page module
2. Bind it on the root table with route()
3. Let the router invoke it — never call it yourself
4. And another

```tsx file.tsx
export default function Hello() {
  return (
    <div className="greeting">
      <h1>Hello, World</h1>
    </div>
  );
}
```

Install once:

```bash
deno add jsr:@cookingpot/dashi
```
