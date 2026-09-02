import type { HTMLAttributes } from "dashi/jsx-runtime";

interface ButtonProps extends HTMLAttributes {
  success?: boolean;
  type?: "button" | "submit";
  href?: string;
  name?: string;
  value?: string;
}

function classes(success: boolean | undefined, className: string | undefined) {
  const tone = success === true ? "bg-green" : "bg-pink";
  const extra = className === undefined ? "" : ` ${className}`;
  return `inline-flex cursor-pointer items-center justify-center rounded-button border-2 border-black px-2 py-1 font-mono text-button no-underline shadow-regular ${tone}${extra}`;
}

export function Button(
  { success, className, children, href, ...rest }: ButtonProps,
) {
  if (href !== undefined) {
    return (
      <a href={href} className={classes(success, className)}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes(success, className)} {...rest}>
      {children}
    </button>
  );
}
