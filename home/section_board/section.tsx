import type { DashiNode } from "dashi/jsx-runtime";

const enum SectionMark {
  Arrow = "arrow",
  Versus = "versus",
}

interface SectionProps {
  badge: string;
  title: string;
  description: DashiNode;
  rotate: string;
  slide: "left" | "right";
  top: string;
  left: DashiNode;
  right: DashiNode;
  equal?: boolean;
  hug?: boolean;
  fill?: boolean;
  mark?: SectionMark;
}

export { SectionMark };

export function Section(
  {
    badge,
    title,
    description,
    rotate,
    slide,
    top,
    left,
    right,
    equal,
    hug,
    fill,
    mark = SectionMark.Arrow,
  }: SectionProps,
) {
  let main = "w-full lg:min-w-0 lg:flex-1";
  if (hug === true) {
    main = "w-full lg:w-max lg:shrink-0";
  }
  let aside =
    "flex w-full justify-center lg:w-auto lg:shrink-0 lg:self-stretch lg:items-center";
  if (equal === true) {
    aside = "flex w-full justify-center lg:min-w-0 lg:flex-1";
  } else if (fill === true) {
    aside =
      "flex w-full justify-center lg:relative lg:w-[19rem] lg:shrink-0 lg:self-stretch lg:min-h-0";
  }
  const divider = mark === SectionMark.Versus ? "vs." : "->";
  return (
    <div
      data-slide={slide}
      className={`relative z-10 w-full lg:absolute lg:left-3 lg:w-[calc(100%-1.5rem)] ${top}`}
    >
      <div data-face className="relative">
        <div
          aria-hidden
          data-plate
          className={`pointer-events-none absolute inset-0 rounded-section border-2 border-black bg-card-background shadow-extra ${rotate}`}
        />
        <section className="relative flex flex-col gap-3 p-8">
          <div className="flex items-center gap-2">
            <span className="rounded-badge border border-black bg-yellow px-2 py-1 font-mono text-code-title shadow-thin">
              {badge}
            </span>
            <h2 className="text-heading-1">{title}</h2>
          </div>
          <p className="border-b border-black/10 pb-4 text-body-small text-body-text lg:whitespace-nowrap">
            {description}
          </p>
          <div className="flex flex-col items-center pt-3 lg:flex-row lg:items-center">
            <div className={main}>{left}</div>
            <p
              className={`flex shrink-0 items-center justify-center px-6 py-6 font-mono text-nav-link font-extrabold lg:py-0 ${
                mark === SectionMark.Versus ? "" : "rotate-90 lg:rotate-0"
              }`}
            >
              {divider}
            </p>
            <div className={aside}>
              {right}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
