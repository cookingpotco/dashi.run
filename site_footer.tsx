const link = "font-normal no-underline hover:underline";

export function SiteFooter() {
  return (
    <footer className="flex w-full flex-col items-center gap-4 p-4 md:flex-row md:justify-center md:gap-2">
      <div className="flex h-20 items-center gap-2 md:h-8">
        <img
          src="/static/logo-icon-transp.svg"
          alt=""
          width="42"
          height="32"
        />
        <p className="text-body-smallest">© 2026 Cooking Pot Co.</p>
      </div>
      <div className="flex w-full items-start justify-between md:w-auto md:items-center">
        <p className="w-44 text-body-smallest md:w-auto">
          dashi is{" "}
          <a
            href="https://github.com/cookingpotco/dashi"
            className="font-bold no-underline hover:underline"
          >
            free and open-source
          </a>{" "}
          under the MIT license.
        </p>
        <div className="flex gap-6 md:hidden">
          <div className="flex flex-col font-mono text-body-smallest">
            <p className="text-code-title">Sections</p>
            <a href="/" className={link}>Home</a>
            <a href="/docs" className={link}>Docs</a>
          </div>
          <div className="flex flex-col font-mono text-body-smallest">
            <p className="text-code-title">Links</p>
            <a href="https://github.com/cookingpotco/dashi" className={link}>
              GitHub
            </a>
            <a href="https://jsr.io/@cookingpot/dashi" className={link}>JSR</a>
            <a href="/discord" className={link}>Discord</a>
            <a href="https://x.com/cookingpotco" className={link}>Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
