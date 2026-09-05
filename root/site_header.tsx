import { client } from "dashi";
import { Button } from "../components/mod.ts";

const NavLinkHost = client.element(
  "nav-link",
  new URL("./nav_link_client.ts", import.meta.url),
);

export function SiteHeader({ path }: { path: string }) {
  return (
    <header className="mx-auto w-full max-w-header px-4 py-4">
      <div className="flex items-center justify-between border-black md:border-b-2 md:pb-4">
        <a href="/" className="block">
          <img
            src="/static/logo-transp.png"
            alt="dashi"
            width="114"
            height="42"
          />
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          <NavLinkHost>
            <a
              href="/"
              className="relative px-0 py-1 text-nav-link no-underline after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-pink after:transition-transform after:duration-200 after:ease-out after:content-[''] hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
              aria-current={path === "/" ? "page" : undefined}
            >
              Home
            </a>
          </NavLinkHost>
          <NavLinkHost>
            <a
              href="/docs"
              className="relative px-0 py-1 text-nav-link no-underline after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-pink after:transition-transform after:duration-200 after:ease-out after:content-[''] hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
              aria-current={path === "/docs" || path.startsWith("/docs/")
                ? "page"
                : undefined}
            >
              Docs
            </a>
          </NavLinkHost>
        </nav>
        <a href="/docs" className="no-underline">
          <Button>get started</Button>
        </a>
      </div>
      <div className="hidden justify-between pt-2 md:flex">
        <a
          href="https://x.com/cookingpotco"
          className="font-mono text-code-small uppercase no-underline hover:underline"
        >
          Twitter
        </a>
        <div className="flex gap-2">
          <a
            href="https://github.com/cookingpotco/dashi"
            className="font-mono text-code-small uppercase no-underline hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://jsr.io/@cookingpot/dashi"
            className="font-mono text-code-small uppercase no-underline hover:underline"
          >
            JSR
          </a>
          <a
            href="/discord"
            className="font-mono text-code-small uppercase no-underline hover:underline"
          >
            Discord
          </a>
        </div>
      </div>
    </header>
  );
}
