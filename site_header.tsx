import { Button } from "./button.tsx";

const social =
  "font-mono text-code-small uppercase no-underline hover:underline";

export function SiteHeader({ path }: { path: string }) {
  const home = path === "/";
  return (
    <header className="mx-auto w-full max-w-page px-4 py-4 lg:px-32">
      <div className="mx-auto flex max-w-header items-center justify-between border-black lg:border-b-2 lg:pb-4">
        <a href="/" className="block">
          <img
            src="/static/logo-transp.svg"
            alt="dashi"
            width="114"
            height="42"
          />
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
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
      <div className="mx-auto hidden max-w-header justify-between pt-2 lg:flex">
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
