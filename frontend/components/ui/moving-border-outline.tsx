"use client";

import type { HTMLAttributes, ReactNode } from "react";

type MovingBorderOutlineProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  borderColor?: string;
} & HTMLAttributes<HTMLSpanElement>;

const cn = (...classes: Array<string | undefined | null | false>) =>
  classes.filter(Boolean).join(" ");

export function MovingBorderOutline({
  children,
  className,
  innerClassName,
  borderColor = "rgba(59, 130, 246, 0.6)",
  ...props
}: MovingBorderOutlineProps) {
  return (
    <span
      className={cn(
        "moving-border-outline relative inline-flex rounded-xl p-[2px] transition-transform duration-300 ease-out hover:scale-[1.01]",
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="moving-border-outline-animated absolute inset-0 rounded-[inherit]"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${borderColor}, transparent)`,
        }}
      />
      <span
        className={cn(
          "relative z-10 inline-flex min-w-[120px] items-center justify-center rounded-[inherit] px-6 py-3 text-sm font-semibold",
          innerClassName
        )}
      >
        {children}
      </span>
    </span>
  );
}

