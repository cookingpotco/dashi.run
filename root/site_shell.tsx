import type { DashiNode } from "dashi/jsx-runtime";

export function SiteShell(
  { children }: { children: DashiNode | DashiNode[] },
) {
  return (
    <div className="mx-auto flex w-full max-w-page flex-1 flex-col px-4 lg:px-32">
      {children}
    </div>
  );
}
