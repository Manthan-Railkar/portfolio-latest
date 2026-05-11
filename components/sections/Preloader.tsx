"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SITE_CONFIG } from "@/lib/constants";

export default function Preloader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        onComplete();
      },
    });

    // Counter animation
    const counter = { value: 0 };
    tl.to(counter, {
      value: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(counter.value)
            .toString()
            .padStart(3, "0");
        }
      },
    });

    // Progress bar
    tl.to(
      progressRef.current,
      {
        width: "100%",
        duration: 2.5,
        ease: "power2.inOut",
      },
      0
    );

    // Flicker the text
    tl.to(
      textRef.current,
      {
        opacity: 0.3,
        duration: 0.1,
        yoyo: true,
        repeat: 5,
      },
      0.5
    );

    // Exit animation
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
      delay: 0.3,
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{ background: "#050505" }}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(225,6,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(225,6,0,0.3) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Logo / Name */}
      <div ref={textRef} className="mb-12 text-center">
        <div className="font-display text-sm tracking-[0.5em] text-[var(--accent-red)] mb-2 opacity-70">
          INITIALIZING
        </div>
        <div className="font-display text-4xl md:text-6xl font-bold tracking-wider text-white">
          PORTFOLIO
        </div>
      </div>

      {/* Counter */}
      <div className="mb-8">
        <span
          ref={counterRef}
          className="font-display text-7xl md:text-9xl font-bold text-white/10"
        >
          000
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-64 md:w-96 h-[2px] bg-white/10 relative overflow-hidden">
        <div
          ref={progressRef}
          className="absolute top-0 left-0 h-full w-0"
          style={{
            background:
              "linear-gradient(to right, var(--accent-red), var(--accent-red-bright))",
            boxShadow: "0 0 20px rgba(225,6,0,0.5)",
          }}
        />
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-8 font-display text-[10px] tracking-[0.3em] text-white/20">
        PORTFOLIO EXPERIENCE v2.0
      </div>
    </div>
  );
}
