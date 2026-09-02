import { Button } from "./button.tsx";

const social =
  "font-mono text-code-small uppercase no-underline hover:underline";

export function SiteHeader({ path }: { path: string }) {
  const home = path === "/";
  return (
    <header className="mx-auto w-full max-w-header px-4 py-4">
      <div className="flex items-center justify-between border-black md:border-b-2 md:pb-4">
        <a href="/" className="block">
          <img
            src="/static/logo-transp.svg"
            alt="dashi"
            width="114"
            height="42"
          />
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="/"
            className={`px-0 py-1 text-nav-link no-underline ${
              home ? "border-b-2 border-pink" : "border-b-2 border-transparent"
            }`}
          >
            Home
          </a>
          <a
            href="/docs"
            className="border-b-2 border-transparent px-0 py-1 text-nav-link no-underline"
          >
            Docs
          </a>
        </nav>
        <Button href="/docs">get started</Button>
      </div>
      <div className="hidden justify-between pt-2 md:flex">
        <a href="https://x.com/cookingpotco" className={social}>Twitter</a>
        <div className="flex gap-2">
          <a href="https://github.com/cookingpotco/dashi" className={social}>
            GitHub
          </a>
          <a href="https://jsr.io/@cookingpot/dashi" className={social}>
            JSR
          </a>
          <a href="/discord" className={social}>Discord</a>
        </div>
      </div>
    </header>
  );
}
