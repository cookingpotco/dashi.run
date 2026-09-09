import type { DashiNode } from "dashi/jsx-runtime";

export function SnippetStack(
  { children }: { children: DashiNode | DashiNode[] },
) {
  return <div className="flex w-full flex-col gap-2">{children}</div>;
}
