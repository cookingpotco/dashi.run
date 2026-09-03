import { Point, PointColor } from "./point.tsx";

export function Closer() {
  return (
    <div className="grid w-full grid-cols-2 lg:grid-cols-3">
      <Point
        label="Small"
        description="Small API with no runtime dependencies"
        color={PointColor.Pink}
        rotate="-rotate-[4deg]"
      />
      <Point
        label="Caching"
        description="Each page and fragment is cached on its own"
        color={PointColor.Yellow}
        rotate="rotate-[5deg]"
      />
      <Point
        label="Navigation"
        description="Soft navigation with in-place document swaps"
        color={PointColor.Green}
        rotate="rotate-[3deg]"
      />
      <Point
        label="SSR"
        description="HTML first, for SEO, LCP, and link previews"
        color={PointColor.Blue}
        rotate="-rotate-[2deg]"
      />
      <Point
        label="Standards"
        description="Built on web standards, not a parallel stack"
        color={PointColor.Green}
        rotate="rotate-[3deg]"
      />
      <Point
        label="Layouts"
        description="Wrap paths with layouts and middleware"
        color={PointColor.Pink}
        rotate="-rotate-[4deg]"
      />
    </div>
  );
}
