# syntax=docker/dockerfile:1

# Prior deploy image: hashed CSS copied below so cached HTML still resolves.
FROM ghcr.io/cookingpotco/dashi.run:main AS previous

FROM denoland/deno:2.9.5

WORKDIR /app

COPY --chown=deno:deno deno.json deno.lock ./
RUN deno ci

COPY --chown=deno:deno . .
RUN mkdir -p generated
RUN --mount=from=previous,source=/app/generated,target=/tmp/prev-generated \
  cp /tmp/prev-generated/styles-*.css generated/ 2>/dev/null || true
RUN deno task css

ENV DASHI_MINIFY_CLIENT=1
ENV DASHI_KV_PATH=/var/lib/dashi/kv

EXPOSE 8000

CMD ["deno", "run", "-A", "main.ts"]
