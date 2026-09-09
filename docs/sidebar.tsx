import type { DashiNode } from "dashi/jsx-runtime";

export function SidebarItem(
  {
    href,
    selected,
    children,
  }: {
    href: string;
    selected?: boolean;
    children: DashiNode | DashiNode[];
  },
) {
  if (selected) {
    return (
      <div className="py-1">
        <a href={href} className="flex items-center gap-2 no-underline">
          <span
            className="h-5 w-1 shrink-0 rounded bg-pink"
            aria-hidden
          />
          <span className="text-nav-link font-bold text-black">{children}</span>
        </a>
      </div>
    );
  }
  return (
    <a
      href={href}
      className="block py-1 text-nav-link font-bold text-black no-underline"
    >
      {children}
    </a>
  );
}

export function SidebarHash(
  { href, label }: { href: string; label: string },
) {
  return (
    <a
      href={href}
      className="block pr-2 pl-4 text-body-small text-body-text no-underline"
    >
      # {label}
    </a>
  );
}
