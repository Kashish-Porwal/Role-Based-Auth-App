"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

type MovingBorderProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  borderClassName?: string;
  glowClassName?: string;
} & HTMLAttributes<HTMLSpanElement>;

const cn = (...classes: Array<string | undefined | null | false>) =>
  classes.filter(Boolean).join(" ");

export function MovingBorder({
  children,
  className,
  innerClassName,
  borderClassName,
  glowClassName,
  ...props
}: MovingBorderProps) {
  const defaultBorderStyle: CSSProperties = {
    background:
      "conic-gradient(from 0deg, rgba(59,130,246,0), rgba(147,197,253,0.55) 25%, rgba(129,140,248,0.6) 50%, rgba(147,197,253,0.55) 75%, rgba(59,130,246,0))",
  };

  const defaultGlowStyle: CSSProperties = {
    background:
      "conic-gradient(from 0deg, rgba(59,130,246,0), rgba(147,197,253,0.45) 25%, rgba(129,140,248,0.5) 50%, rgba(147,197,253,0.45) 75%, rgba(59,130,246,0))",
  };

  return (
    <span
      className={cn(
        "moving-border relative inline-flex rounded-xl p-[1px] transition-transform duration-300 ease-out hover:scale-[1.01]",
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "moving-border-border absolute inset-0 rounded-[inherit]",
          borderClassName
        )}
        style={borderClassName ? undefined : defaultBorderStyle}
      />
      <span
        aria-hidden="true"
        className={cn(
          "moving-border-glow absolute inset-[-18%] rounded-[inherit]",
          glowClassName
        )}
        style={glowClassName ? undefined : defaultGlowStyle}
      />
      <span
        className={cn(
          "relative z-10 inline-flex min-w-[120px] items-center justify-center rounded-[inherit] px-6 py-2 text-sm font-semibold",
          innerClassName
        )}
      >
        {children}
      </span>
    </span>
  );
}
