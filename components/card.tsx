import type { HTMLAttributes } from "dashi/jsx-runtime";

interface CardProps extends HTMLAttributes {
  className?: string;
}

export function Card({ children, className }: CardProps) {
  const extra = className === undefined ? "" : ` ${className}`;
  return (
    <div
      className={`relative flex w-[8.5rem] flex-col items-center overflow-visible rounded-card border-2 border-black bg-code-background p-4${extra}`}
    >
      {children}
    </div>
  );
}
