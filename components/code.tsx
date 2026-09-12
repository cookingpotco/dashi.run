import type { DashiNode } from "dashi/jsx-runtime";

export function Code({ children }: { children: DashiNode }) {
  return (
    <code className="rounded-badge bg-blue/50 px-2 font-mono text-black">
      {children}
    </code>
  );
}
