# dashi.run

Website for the [dashi](https://jsr.io/@cookingpot/dashi) web framework.

## Run locally

Requires [Deno](https://deno.com) 2.9.5 (see `.tool-versions`).

```sh
deno task css
deno task dev
```

In a second terminal:

```sh
deno task css:watch
```

Open http://localhost:8000.

`css` writes the hashed stylesheet and `styles.json`. `dev` serves the app.
`css:watch` rebuilds the sheet when source CSS or `className` usage changes.
