FROM denoland/deno:2.9.5

WORKDIR /app

COPY deno.json deno.lock ./
RUN deno ci

COPY . .

ENV DASHI_MINIFY_CLIENT=1
ENV DASHI_KV_PATH=/var/lib/dashi/kv

EXPOSE 8000

CMD ["deno", "run", "-A", "main.ts"]
