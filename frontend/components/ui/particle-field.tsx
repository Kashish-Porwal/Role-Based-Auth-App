"use client";

import { useMemo } from "react";
import type { CSSProperties } from "react";

interface ParticleFieldProps {
  count?: number;
  className?: string;
}

type ParticleType = "base" | "bright" | "large";

type Particle = {
  id: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  translateX: number;
  translateY: number;
  left: number;
  top: number;
  type: ParticleType;
  twinkle?: boolean;
  twinkleDuration?: number;
  twinkleDelay?: number;
};

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

const createParticles = (length: number, type: ParticleType, offset: number): Particle[] => {
  return Array.from({ length }).map((_, index) => {
    const baseLeft = randomInRange(0, 100);
    const baseTop = randomInRange(0, 100);

    const size =
      type === "bright"
        ? randomInRange(1.2, 1.9)
        : type === "large"
        ? randomInRange(3, 3.6)
        : randomInRange(2.2, 3.2);

    const opacity =
      type === "bright"
        ? randomInRange(0.18, 0.28)
        : type === "large"
        ? randomInRange(0.08, 0.14)
        : randomInRange(0.06, 0.12);

    return {
      id: `${type}-${offset + index}-${baseLeft.toFixed(2)}-${baseTop.toFixed(2)}`,
      size,
      opacity,
      duration: randomInRange(30, 46),
      delay: randomInRange(0, 18),
      translateX: randomInRange(-20, 20),
      translateY: randomInRange(30, 55),
      left: baseLeft,
      top: baseTop,
      type,
    };
  });
};

export function ParticleField({ count = 24, className = "" }: ParticleFieldProps) {
  const particles = useMemo(() => {
    const baseParticles = createParticles(count, "base", 0);
    const brightParticles = createParticles(4, "bright", count);
    const largeParticles = createParticles(2, "large", count + brightParticles.length);

    const allParticles = [...baseParticles, ...brightParticles, ...largeParticles];

    const twinkleCount = Math.floor(randomInRange(3, 6));
    const twinkleIndices = new Set<number>();
    while (twinkleIndices.size < twinkleCount) {
      twinkleIndices.add(Math.floor(Math.random() * allParticles.length));
    }

    twinkleIndices.forEach((idx) => {
      const particle = allParticles[idx];
      if (!particle) return;
      particle.twinkle = true;
      particle.twinkleDuration = randomInRange(1.5, 2.1);
      particle.twinkleDelay = randomInRange(0, 4);
    });

    return allParticles;
  }, [count]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`.trim()}
      aria-hidden="true"
    >
      {particles.map((particle) => {
        const animations = [
          `particle-drift ${particle.duration}s ease-in-out infinite alternate`,
        ];

        if (particle.twinkle && particle.twinkleDuration) {
          animations.push(
            `particle-twinkle ${particle.twinkleDuration}s ease-in-out infinite`
          );
        }

        const animationDelays = [
          `${particle.delay}s`,
        ];

        if (particle.twinkle && particle.twinkleDelay !== undefined) {
          animationDelays.push(`${particle.twinkleDelay}s`);
        }

        const style = {
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          opacity: particle.opacity,
          left: `${particle.left}%`,
          top: `${particle.top}%`,
          animation: animations.join(", "),
          animationDelay: animationDelays.join(", "),
          "--translate-x": `${particle.translateX}px`,
          "--translate-y": `${particle.translateY}px`,
        } as CSSProperties & Record<string, string | number>;

        return <span key={particle.id} className="particle" style={style} />;
      })}
    </div>
  );
}
