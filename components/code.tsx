import type { DashiNode } from "dashi/jsx-runtime";

export function Code({ children }: { children: DashiNode }) {
  return (
    <code className="rounded-badge bg-blue/25 px-1 font-mono text-black">
      {children}
    </code>
  );
}
