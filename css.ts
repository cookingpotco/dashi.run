const ROOT = import.meta.dirname;
const SOURCE = `${ROOT}/styles.css`;
const GENERATED_DIR = `${ROOT}/generated`;
const MANIFEST = `${ROOT}/styles.json`;

function runCli(outPath: string, watch: boolean): Deno.ChildProcess {
  const args = ["run", "-A"];
  if (watch) {
    args.push("--allow-scripts=npm:@parcel/watcher");
  }
  args.push(
    "npm:@tailwindcss/cli@4",
    "-i",
    SOURCE,
    "-o",
    outPath,
  );
  if (watch) {
    args.push("--watch");
  }
  return new Deno.Command(Deno.execPath(), {
    args,
    stdout: "inherit",
    stderr: "inherit",
    cwd: ROOT,
  }).spawn();
}

async function build(cssPath: string, watch: boolean): Promise<void> {
  const bytes = await Deno.readFile(cssPath);
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
  let binary = "";
  for (const byte of digest) {
    binary += String.fromCharCode(byte);
  }
  const hash = btoa(binary).replaceAll("+", "-").replaceAll("/", "_")
    .replaceAll("=", "");
  const name = `styles-${hash}.css`;
  const href = `/generated/${name}`;
  let previousHref: string | undefined;
  try {
    previousHref = JSON.parse(await Deno.readTextFile(MANIFEST)).href;
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) {
      throw error;
    }
  }
  await Deno.mkdir(GENERATED_DIR, { recursive: true });
  await Deno.writeFile(`${GENERATED_DIR}/${name}`, bytes);
  await Deno.writeTextFile(
    MANIFEST,
    `${JSON.stringify({ href }, null, 2)}\n`,
  );
  if (watch) {
    if (previousHref !== href) {
      console.log(`[css] ${href}`);
    }
    return;
  }
  for await (const entry of Deno.readDir(GENERATED_DIR)) {
    if (
      entry.isFile &&
      entry.name.startsWith("styles-") &&
      entry.name.endsWith(".css") &&
      entry.name !== name
    ) {
      await Deno.remove(`${GENERATED_DIR}/${entry.name}`);
    }
  }
}

const tempDir = await Deno.makeTempDir({ prefix: "dashi-styles-" });
const tempPath = `${tempDir}/styles.css`;
const watch = Deno.args.includes("--watch");

if (!watch) {
  const once = runCli(tempPath, false);
  const onceStatus = await once.status;
  if (!onceStatus.success) {
    Deno.exit(onceStatus.code);
  }
  await build(tempPath, false);
  await Deno.remove(tempDir, { recursive: true });
} else {
  const child = runCli(tempPath, true);
  void child.status.then((status) => Deno.exit(status.code));
  const watcher = Deno.watchFs(tempDir);
  for await (const event of watcher) {
    if (event.kind === "access") {
      continue;
    }
    try {
      await build(tempPath, true);
    } catch (error) {
      if (!(error instanceof Deno.errors.NotFound)) {
        throw error;
      }
    }
  }
}
