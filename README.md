# dashi.run

Website for the [dashi](https://jsr.io/@cookingpot/dashi) web framework.

## Run locally

Requires [Deno](https://deno.com) 2.9.5 (see `.tool-versions`).

```sh
deno task dev
```

Open http://localhost:8000.

`dev` builds the hashed stylesheet, watches it, and serves the app. `css` and
`css:watch` are the CSS pipeline on their own.
