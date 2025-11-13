"use client";

import { useMemo } from "react";
import type { CSSProperties } from "react";

interface BackgroundBeamsProps {
  className?: string;
  beams?: number;
}

interface BeamConfig {
  id: string;
  path: string;
  width: number;
  duration: number;
  delay: number;
  opacity: number;
}

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

const createBeamPath = (index: number, beams: number): string => {
  const verticalSpacing = 100 / (beams + 1);
  const startY = verticalSpacing * (index + 1) + randomInRange(-2, 2);
  const controlOffset = randomInRange(120, 180);
  const endOffset = randomInRange(160, 220);

  return `M -160 ${startY}
    C ${controlOffset * 0.2} ${startY - randomInRange(18, 32)},
      ${controlOffset * 0.8} ${startY + randomInRange(22, 34)},
      ${controlOffset} ${startY - randomInRange(14, 22)}
    S ${endOffset * 0.85} ${startY + randomInRange(32, 44)},
      ${endOffset} ${startY + randomInRange(10, 18)}
    S ${endOffset * 1.35} ${startY - randomInRange(24, 36)},
      240 ${startY + randomInRange(-12, 12)}
  `;
};

export function BackgroundBeams({ className = "", beams = 6 }: BackgroundBeamsProps) {
  const beamConfigs = useMemo<BeamConfig[]>(() => {
    return Array.from({ length: beams }).map((_, index) => ({
      id: `beam-${index}`,
      path: createBeamPath(index, beams),
      width: randomInRange(1.25, 2.2),
      duration: randomInRange(28, 46),
      delay: randomInRange(-12, 12),
      opacity: randomInRange(0.14, 0.32),
    }));
  }, [beams]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.02)" />
            <stop offset="28%" stopColor="rgba(96, 165, 250, 0.22)" />
            <stop offset="52%" stopColor="rgba(129, 140, 248, 0.4)" />
            <stop offset="80%" stopColor="rgba(147, 197, 253, 0.26)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.02)" />
          </linearGradient>
        </defs>
        <g className="beams-svg-group">
          {beamConfigs.map((beam) => (
            <path
              key={beam.id}
              d={beam.path}
              stroke="url(#beam-gradient)"
              strokeWidth={beam.width}
              strokeLinecap="round"
              fill="none"
              className="background-beam-path"
              style={{
                animationDuration: `${beam.duration}s`,
                animationDelay: `${beam.delay}s`,
                opacity: beam.opacity,
              } as CSSProperties}
            />
          ))}
        </g>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />
    </div>
  );
}
