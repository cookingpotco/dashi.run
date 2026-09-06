# dashi.run

Website for the [dashi](https://jsr.io/@cookingpot/dashi) web framework.

## Run locally

Requires [Deno](https://deno.com) 2.9.5 (see `.tool-versions`).

```sh
deno task dev
```

Open http://localhost:8000.

`dev` is the watch loop: hashed stylesheet plus the app.

To exercise the image you ship — healthcheck, loopback publish, KV mount:

```sh
docker compose up --build
```

## Deploy

A merge to `main` is the deploy. After CI succeeds, the Deploy workflow builds
the image (CSS in the Dockerfile), pushes `ghcr.io/cookingpotco/dashi.run:main`,
rsyncs `compose.yml` over Access SSH, and runs
`docker compose pull && docker compose up -d --wait`. `workflow_dispatch` on
Deploy retries that without an empty commit. The tunnel is a host systemd unit,
not this Compose file.

A dashi bump is a PR that updates `deno.json` and the lockfile. Revert that
commit and push to roll back.

## Environment

On the box, not in the repo:

| File                    | Keys                                                                         |
| ----------------------- | ---------------------------------------------------------------------------- |
| `/etc/dashi/tunnel.env` | `TUNNEL_TOKEN` (read by host `cloudflared`)                                  |
| `/opt/dashi.run/.env`   | `DASHI_KV_HOST=/var/lib/dashi`, `DASHI_EMAILS_USER`, `DASHI_EMAILS_PASSWORD` |

`GET /emails` is a Basic-auth list of join addresses (`text/plain`). Without
those two keys the path is 404. Bookmark `https://dashi.run/emails`.

The app also reads `DASHI_KV_PATH` (set in the image to `/var/lib/dashi/kv`) and
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
6. Host `cloudflared` 2026.8.2 as a systemd unit reading
   `/etc/dashi/tunnel.env`. `systemctl enable --now cloudflared`.
7. `/opt/dashi.run/compose.yml`, `/opt/dashi.run/.env` (see above), and
   `/var/lib/dashi` (directory owned by uid `1993`).
8. The repo secrets above. GHCR push enabled; after the first image lands, set
   `ghcr.io/cookingpotco/dashi.run` public. Cloudflare Web Analytics automatic
   injection on the zone.
