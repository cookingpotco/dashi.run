# dashi.run

Website for the [dashi](https://jsr.io/@cookingpot/dashi) web framework.

## Run locally

Requires [Deno](https://deno.com) 2.9.5 (see `.tool-versions`).

```sh
deno task dev
```

Open http://localhost:8000.

`dev` builds the hashed stylesheet, watches it, and serves the app. `css` and
`css:watch` are the CSS pipeline on their own. Do not use Compose on a laptop.

## Deploy

A merge to `main` (or a `workflow_dispatch` on `main`) is the deploy. CI builds
CSS, pushes `ghcr.io/cookingpotco/dashi.run:main`, rsyncs `compose.yml` over
Access SSH, and runs `docker compose pull && docker compose up -d --wait`.

A dashi bump is a PR that updates `deno.json` and the lockfile. Revert that
commit and push to roll back.

## Environment

On the box, not in the repo:

| File                    | Keys           |
| ----------------------- | -------------- |
| `/etc/dashi/tunnel.env` | `TUNNEL_TOKEN` |

The app reads `DASHI_KV_PATH` (set in the image to `/var/lib/dashi/kv`) and
`DASHI_MINIFY_CLIENT`. Repo secrets for the deploy job: `CF_ACCESS_CLIENT_ID`,
`CF_ACCESS_CLIENT_SECRET`, `SSH_PRIVATE_KEY`, `CF_API_TOKEN`, `CF_ZONE_ID`.

## Bootstrap

Once, before the first green `deploy` job:

1. Hetzner CX23, Ubuntu 24.04. Firewall: deny all inbound. Outbound open.
2. User `dashi`, Docker Engine + Compose plugin. No host Deno. sshd stays on the
   host; the firewall keeps it off the internet.
3. Named tunnel. Public hostnames: `dashi.run` → `http://127.0.0.1:8000`,
   `ssh.dashi.run` → `ssh://127.0.0.1:22`.
4. DNS: apex and `ssh` CNAME to `<tunnel-id>.cfargotunnel.com`. Single Redirect
   `www` → `https://dashi.run`.
5. Access app on `ssh.dashi.run`, policy **Service Auth**, service token.
6. `/opt/dashi.run/compose.yml`, `/etc/dashi/tunnel.env`, and
   `/var/lib/dashi/kv` (a file owned by uid `1993`, the image user).
7. The repo secrets above. GHCR push enabled; after the first image lands, set
   `ghcr.io/cookingpotco/dashi.run` public. Cloudflare Web Analytics automatic
   injection on the zone.
