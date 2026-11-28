import React, { useMemo } from "react";

const FLAKE_COUNT = 22;

// Decorative only - a handful of CSS-animated dots drifting down within
// whatever bounds the parent gives it (expects the parent to be `relative`
// and to clip overflow if needed).
const Snowfall = ({ className = "" }) => {
  const flakes = useMemo(
    () =>
      Array.from({ length: FLAKE_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 3 + Math.random() * 5,
        duration: 9 + Math.random() * 8,
        delay: Math.random() * 12,
        drift: Math.round((Math.random() - 0.5) * 50),
        opacity: 0.35 + Math.random() * 0.45,
      })),
    []
  );

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <style>{`
        @keyframes snowfall-drop {
          from { transform: translateY(-10%) translateX(0); }
          to { transform: translateY(1000%) translateX(var(--snow-drift)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .snowfall-flake { animation: none !important; opacity: 0 !important; }
        }
      `}</style>
      {flakes.map((f) => (
        <span
          key={f.id}
          className="snowfall-flake absolute top-0 rounded-full bg-white"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            "--snow-drift": `${f.drift}px`,
            animation: `snowfall-drop ${f.duration}s linear ${f.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default Snowfall;
