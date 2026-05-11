"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function GlassCard({
  children,
  className = "",
  glowColor = "rgba(225, 6, 0, 0.15)", // Default accent red glow
}: GlassCardProps) {
  const boundingRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={boundingRef}
      onMouseMove={(e) => {
        if (!boundingRef.current) return;
        const { left, top } = boundingRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group overflow-hidden bg-white/[0.02] backdrop-blur-md border border-white/5 transition-colors hover:border-white/10 ${className}`}
    >
      {/* Dynamic Cursor Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${glowColor},
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Content wrapper to ensure z-index above spotlight */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
