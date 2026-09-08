interface PrevNextLink {
  href: string;
  label: string;
}

export function PrevNext(
  { previous, next }: { previous?: PrevNextLink; next?: PrevNextLink },
) {
  return (
    <div className="flex gap-4 py-4">
      {previous !== undefined
        ? (
          <div className="flex flex-col gap-1">
            <span className="text-body-smallest text-body-text">Previous</span>
            <a
              href={previous.href}
              className="text-nav-link font-bold text-black no-underline"
            >
              ← {previous.label}
            </a>
          </div>
        )
        : <div className="flex-1" />}
      {next !== undefined && (
        <div className="ml-auto flex flex-col gap-1 text-right">
          <span className="text-body-smallest text-body-text">Next</span>
          <a
            href={next.href}
            className="text-nav-link font-bold text-black no-underline"
          >
            {next.label} →
          </a>
        </div>
      )}
    </div>
  );
}

export type { PrevNextLink };
