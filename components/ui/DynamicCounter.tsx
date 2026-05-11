"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { gsap } from "gsap";

interface DynamicCounterProps {
  value: number;
  label?: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function DynamicCounter({
  value,
  label,
  prefix = "",
  suffix = "",
  duration = 2,
  className = "",
}: DynamicCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated && numberRef.current) {
      setHasAnimated(true);

      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration: duration,
        ease: "power3.out",
        onUpdate: () => {
          if (numberRef.current) {
            // For integers, Math.floor is fine. For floats, might need `.toFixed()`
            numberRef.current.innerText = Math.floor(obj.val).toString();
          }
        },
      });
    }
  }, [isInView, value, duration, hasAnimated]);

  return (
    <div ref={containerRef} className={`flex flex-col ${className}`}>
      <div className="flex items-baseline font-display font-black tracking-tighter">
        {prefix && <span className="text-[var(--accent-red)] text-2xl mr-1">{prefix}</span>}
        <span ref={numberRef} className="text-5xl md:text-7xl text-white">
          0
        </span>
        {suffix && <span className="text-[var(--accent-red)] text-2xl ml-1">{suffix}</span>}
      </div>
      {label && (
        <div className="font-display text-xs tracking-[0.2em] text-white/50 mt-2 uppercase">
          {label}
        </div>
      )}
    </div>
  );
}
