const ROOT = import.meta.dirname;

function spawn(
  args: string[],
  extraEnv?: Record<string, string>,
): Deno.ChildProcess {
  return new Deno.Command(Deno.execPath(), {
    args,
    cwd: ROOT,
    stdout: "inherit",
    stderr: "inherit",
    env: extraEnv === undefined
      ? undefined
      : { ...Deno.env.toObject(), ...extraEnv },
  }).spawn();
}

const built = spawn(["run", "-A", `${ROOT}/css.ts`]);
const builtStatus = await built.status;
if (!builtStatus.success) {
  Deno.exit(builtStatus.code);
}

const css = spawn(["run", "-A", `${ROOT}/css.ts`, "--watch"]);
const server = spawn(["run", "-A", "--watch", `${ROOT}/main.ts`], {
  DASHI_MINIFY_CLIENT: "0",
});

function stop() {
  try {
    css.kill();
  } catch {
    // already exited
  }
  try {
    server.kill();
  } catch {
    // already exited
  }
}

Deno.addSignalListener("SIGINT", stop);
Deno.addSignalListener("SIGTERM", stop);

const status = await Promise.race([css.status, server.status]);
stop();
Deno.exit(status.code);
