"use client";

import { useMemo } from "react";
import type { CSSProperties } from "react";

interface BackgroundLinesProps {
  className?: string;
  count?: number;
}

interface Line {
  id: string;
  x: number;
  y: number;
  angle: number;
  length: number;
  color: string;
  opacity: number;
}

const colors = [
  "rgb(34, 197, 94)", // green
  "rgb(168, 85, 247)", // purple
  "rgb(59, 130, 246)", // light blue
  "rgb(234, 179, 8)", // yellow
  "rgb(239, 68, 68)", // red
  "rgb(249, 115, 22)", // orange
  "rgb(30, 64, 175)", // dark blue
];

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

export function BackgroundLines({ className = "", count = 60 }: BackgroundLinesProps) {
  const lines = useMemo<Line[]>(() => {
    return Array.from({ length: count }).map((_, index) => {
      const angle = randomInRange(-60, 60);
      const length = randomInRange(30, 80);
      const x = randomInRange(0, 100);
      const y = randomInRange(0, 100);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = randomInRange(0.6, 0.9);

      return {
        id: `line-${index}`,
        x,
        y,
        angle,
        length,
        color,
        opacity,
      };
    });
  }, [count]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
      style={{
        zIndex: -10,
        opacity: 0.12,
        mixBlendMode: 'screen',
      }}
      aria-hidden="true"
    >
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {lines.map((line) => {
          const rad = (line.angle * Math.PI) / 180;
          const x2 = line.x + Math.cos(rad) * line.length;
          const y2 = line.y + Math.sin(rad) * line.length;

          return (
            <line
              key={line.id}
              x1={`${line.x}%`}
              y1={`${line.y}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke={line.color}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={line.opacity}
              style={
                {
                  filter: "blur(0.3px)",
                } as CSSProperties
              }
            />
          );
        })}
      </svg>
    </div>
  );
}

