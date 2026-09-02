import type { DashiNode } from "dashi/jsx-runtime";

interface SectionProps {
  badge: string;
  title: string;
  description: string;
  rotate: string;
  slide: "left" | "right";
  top: string;
  left: DashiNode;
  right: DashiNode;
  equal?: boolean;
}

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
  }: SectionProps,
) {
  const aside = equal === true
    ? "flex w-full justify-center lg:min-w-0 lg:flex-1"
    : "flex w-full justify-center lg:w-auto lg:shrink-0 lg:self-stretch lg:items-center";
  return (
    <div
      data-slide={slide}
      className={`relative z-10 w-full lg:absolute lg:left-3 lg:w-[calc(100%-1.5rem)] ${top}`}
    >
      <section
        data-face
        className={`flex flex-col gap-3 rounded-section border-2 border-black bg-card-background p-8 shadow-extra ${rotate}`}
      >
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
          <div className="w-full lg:min-w-0 lg:flex-1">{left}</div>
          <p className="flex shrink-0 items-center justify-center px-6 py-6 font-mono text-nav-link font-extrabold rotate-90 lg:rotate-0 lg:py-0">
            -&gt;
          </p>
          <div className={aside}>
            {right}
          </div>
        </div>
      </section>
    </div>
  );
}
