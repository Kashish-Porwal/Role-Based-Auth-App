"use client";

import { useMemo } from "react";
import type { CSSProperties } from "react";

interface MeteorsProps {
  number?: number;
  className?: string;
}

interface Meteor {
  id: string;
  left: string;
  delay: number;
  duration: number;
  size: number;
}

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

export function Meteors({ number = 20, className = "" }: MeteorsProps) {
  const meteors = useMemo<Meteor[]>(() => {
    return Array.from({ length: number }).map((_, index) => ({
      id: `meteor-${index}`,
      left: `${randomInRange(0, 100)}%`,
      delay: randomInRange(0, 8),
      duration: randomInRange(2, 5),
      size: randomInRange(1, 3),
    }));
  }, [number]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
      aria-hidden="true"
    >
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="meteor"
          style={
            {
              left: meteor.left,
              top: "-50%",
              animationDelay: `${meteor.delay}s`,
              animationDuration: `${meteor.duration}s`,
              width: `${meteor.size}px`,
              height: `${meteor.size * 200}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

