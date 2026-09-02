const enum PointColor {
  Pink = "bg-pink",
  Yellow = "bg-yellow",
  Green = "bg-green",
  Blue = "bg-blue",
}

interface PointProps {
  label: string;
  description: string;
  color: PointColor;
  rotate: string;
}

export function Point({ label, description, color, rotate }: PointProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <span
        className={`rounded-button border-2 border-black px-3 py-1 font-mono text-base leading-5 font-extrabold uppercase shadow-regular ${color} ${rotate}`}
      >
        {label}
      </span>
      <p className="text-center text-body-smallest">{description}</p>
    </div>
  );
}

export { PointColor };
