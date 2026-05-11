"use client";

interface GridBackgroundProps {
  color?: string;
  opacity?: number;
}

export default function GridBackground({
  color = "rgba(225, 6, 0, 0.2)",
  opacity = 0.5,
}: GridBackgroundProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden [perspective:1000px]">
      <div
        className="absolute inset-0"
        style={{
          opacity,
          backgroundSize: "40px 40px",
          backgroundImage: `
            linear-gradient(to right, ${color} 1px, transparent 1px),
            linear-gradient(to bottom, ${color} 1px, transparent 1px)
          `,
          maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          transform: "rotateX(60deg) scale(2) translateY(-10%)",
          transformOrigin: "center top",
        }}
      />
    </div>
  );
}
