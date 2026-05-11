"use client";

import { motion } from "framer-motion";

interface TelemetryRingProps {
  size?: number;
  className?: string;
  color?: string;
}

export default function TelemetryRing({
  size = 120,
  className = "",
  color = "var(--accent-red)",
}: TelemetryRingProps) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer Dashed Ring */}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="4 8"
          opacity="0.4"
        />
      </motion.svg>

      {/* Middle Solid Ring (Rotates opposite) */}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="20 40 10 5"
          className="text-white opacity-30"
        />
      </motion.svg>

      {/* Inner Glowing Ring */}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="50"
          cy="50"
          r="28"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray="60 40"
          style={{ filter: "drop-shadow(0 0 4px rgba(225,6,0,0.8))" }}
        />
      </motion.svg>

      {/* Center Dot */}
      <div
        className="absolute w-2 h-2 rounded-full"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
    </div>
  );
}
