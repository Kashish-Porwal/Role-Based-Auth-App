"use client";

import { useEffect, useState } from "react";

interface SpotlightProps {
  className?: string;
  size?: number;
  strength?: number;
}

export function Spotlight({ className = "", size = 600, strength = 0.35 }: SpotlightProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const updateOnTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      setPosition({ x: touch.clientX, y: touch.clientY });
    };

    window.addEventListener("pointermove", updatePosition, { passive: true });
    window.addEventListener("touchmove", updateOnTouch, { passive: true });

    return () => {
      window.removeEventListener("pointermove", updatePosition);
      window.removeEventListener("touchmove", updateOnTouch);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden transition-opacity duration-300 ${className}`.trim()}
      style={{
        background: `radial-gradient(${size}px at ${position.x}px ${position.y}px, rgba(255,255,255,${strength}), rgba(255,255,255,0) 70%)`,
      }}
    />
  );
}
