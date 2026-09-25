import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "./Icons";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-ink text-paper hover:bg-accent-ink active:bg-ink border border-transparent",
  secondary:
    "bg-transparent text-ink border border-ink/20 hover:border-ink/45 hover:bg-surface active:bg-paper-2",
  ghost:
    "bg-transparent text-ink-2 border border-transparent hover:text-ink px-1",
};

const baseClass =
  "group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[0.95rem] font-medium tracking-[-0.005em] transition-[background-color,border-color,color,transform,box-shadow] duration-300 ease-out-quart active:translate-y-px select-none";

function Arrow() {
  return (
    <span
      aria-hidden
      className="relative inline-flex h-4 w-4 items-center justify-center overflow-hidden"
    >
      <ArrowRight
        size={16}
        className="absolute transition-transform duration-500 ease-out-expo group-hover:translate-x-[140%]"
      />
      <ArrowRight
        size={16}
        className="absolute -translate-x-[140%] transition-transform duration-500 ease-out-expo group-hover:translate-x-0"
      />
    </span>
  );
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
};

export function LinkButton({
  variant = "primary",
  arrow = true,
  className = "",
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <a className={`${baseClass} ${styles[variant]} ${className}`} {...rest}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </a>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  arrow = false,
  className = "",
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={`${baseClass} ${styles[variant]} ${className}`} {...rest}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </button>
  );
}
