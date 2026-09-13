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
      <a href={href} className="flex items-center gap-2 no-underline">
        <span
          className="h-5 w-1 shrink-0 rounded bg-pink"
          aria-hidden
        />
        <span className="text-nav-link font-bold text-black">{children}</span>
      </a>
    );
  }
  return (
    <a
      href={href}
      className="block text-nav-link font-bold text-black no-underline"
    >
      {children}
    </a>
  );
}

export function SidebarHash(
  { href, label, selected }: { href: string; label: string; selected?: boolean },
) {
  if (selected) {
    return (
      <a
        href={href}
        className="block pr-2 pl-4 text-body-small font-bold text-body-text no-underline"
      >
        # {label}
      </a>
    );
  }
  return (
    <a
      href={href}
      className="block pr-2 pl-4 text-body-small text-body-text no-underline"
    >
      # {label}
    </a>
  );
}
