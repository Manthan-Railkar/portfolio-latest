"use client";

import { useRef, useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export default function MagneticButton({
  children,
  strength = 0.5,
  className = "",
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
    
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative group overflow-hidden ${className}`}
      {...props}
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10 pointer-events-none">
        {children}
      </div>
    </motion.button>
  );
}
