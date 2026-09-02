import { client } from "dashi";
import type { DashiNode } from "dashi/jsx-runtime";

const Host = client.element(
  "section-board",
  new URL("./section_board_client.ts", import.meta.url),
);

const dots =
  "background-image: repeating-radial-gradient(circle, var(--color-black) 0 0.075rem, transparent 0.075rem 0.75rem); background-size: 0.75rem 0.75rem; clip-path: inset(0 round 1.5rem)";

export function SectionBoard(
  { children }: { children: DashiNode | DashiNode[] },
) {
  return (
    <Host className="relative flex w-full flex-col items-center gap-8 lg:block lg:h-[133.375rem]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-4 -inset-y-4 lg:-inset-x-12 lg:-top-6 lg:-bottom-6"
        style={dots}
      />
      {children}
    </Host>
  );
}
