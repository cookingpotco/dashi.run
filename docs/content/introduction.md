# Introduction

## What is dashi?

dashi is a server-first web framework for Deno. JSX is precompiled to HTML with
no VDOM intermediary or hydration. Pages update by swapping server-rendered
HTML, in the spirit of [Hotwire](https://hotwired.dev/) and
[htmx](https://htmx.org/).

```tsx main.ts
import { type ReadArgs, serve } from "dashi";

function Home({ html }: ReadArgs) {
  return html(<h1>Hello</h1>);
}

serve(({ route }) => ({
  routes: [
    route("/", { GET: Home }),
  ],
}));
```

## Features

I built dashi after Next.js 16: too much magic, spending too much time fighting
the framework than shipping. I wanted a small tool that keeps the ideas I
actually like - server-rendered HTML, patches, only as much JS as you ask for.

- **Speed.** JSX is precompiled into plain HTML and sent as-is for every render.
- **Server-driven.** Update the UI through targeted HTML patches.
- **No JS bloat.** The page is HTML. You add JS only for the bits that need it.
- **Composition.** A page can include other routes, each fetched and cached on
  its own.
- **Small API.** No magic, one way to do each thing, no runtime dependencies.
- **Web APIs.** Built on standards - `Request`, `Response`, `fetch()`, etc.

## Community

Questions and suggestions are welcome.

- [Discord](/discord)
- [GitHub](https://github.com/cookingpotco/dashi)
- [Twitter](https://x.com/cookingpotco)
