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
}

export function Section(
  { badge, title, description, rotate, slide, top, left, right }: SectionProps,
) {
  return (
    <div
      data-slide={slide}
      className={`w-full lg:absolute lg:left-3 lg:w-[calc(100%-1.5rem)] ${top}`}
    >
      <section
        className={`flex flex-col gap-3 rounded-section border-2 border-black bg-card-background p-8 shadow-extra ${rotate}`}
      >
        <div className="flex items-center gap-2">
          <span className="rounded-badge border border-black bg-yellow px-2 py-1 font-mono text-code-title shadow-thin">
            {badge}
          </span>
          <h2 className="text-heading-1">{title}</h2>
        </div>
        <p className="border-b border-black/10 pb-4 text-body-small text-body-text">
          {description}
        </p>
        <div className="flex flex-col items-center pt-3 lg:flex-row lg:justify-between">
          <div className="w-full lg:min-w-0 lg:flex-1">{left}</div>
          <p className="px-6 font-mono text-nav-link font-extrabold rotate-90 lg:rotate-0">
            -&gt;
          </p>
          <div className="flex w-full justify-center lg:w-auto">{right}</div>
        </div>
      </section>
    </div>
  );
}
