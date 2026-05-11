"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global scroll-driven cinematic effects:
 * - Light streaks that appear based on scroll velocity
 * - Motion blur overlay intensity tied to speed
 * - Ambient glow pulses on direction change
 * - Atmospheric fog layer transitions
 */
export default function ScrollCinematic() {
  const streaksRef = useRef<HTMLDivElement>(null);
  const blurOverlayRef = useRef<HTMLDivElement>(null);
  const directionFlashRef = useRef<HTMLDivElement>(null);
  const lastVelocity = useRef(0);
  const lastDirection = useRef(1);

  const updateEffects = useCallback(() => {
    // Cast to any to bypass TS error since getVelocity is valid in the GSAP runtime
    const st = ScrollTrigger as any;
    const velocity = st.getVelocity ? Math.abs(st.getVelocity(window) ?? 0) : 0;
    const direction = velocity > 0 ? 1 : -1;
    const normalizedSpeed = Math.min(velocity / 3000, 1); // 0–1

    // Light streaks opacity tied to scroll speed
    if (streaksRef.current) {
      streaksRef.current.style.opacity = `${normalizedSpeed * 0.6}`;
      // Shift Y position of streaks based on direction
      const yShift = direction * normalizedSpeed * 10;
      streaksRef.current.style.transform = `translateY(${yShift}px)`;
    }

    // Motion blur overlay
    if (blurOverlayRef.current) {
      const blurAmount = normalizedSpeed * 3;
      blurOverlayRef.current.style.backdropFilter =
        blurAmount > 0.2 ? `blur(${blurAmount}px)` : "none";
      blurOverlayRef.current.style.opacity = `${normalizedSpeed * 0.15}`;
    }

    // Flash on direction change
    if (direction !== lastDirection.current && velocity > 500) {
      if (directionFlashRef.current) {
        gsap.fromTo(
          directionFlashRef.current,
          { opacity: 0.08 },
          { opacity: 0, duration: 0.4, ease: "power2.out" }
        );
      }
      lastDirection.current = direction;
    }

    lastVelocity.current = velocity;
  }, []);

  useEffect(() => {
    // Bind to GSAP ticker for smooth updates
    gsap.ticker.add(updateEffects);
    return () => {
      gsap.ticker.remove(updateEffects);
    };
  }, [updateEffects]);

  return (
    <>
      {/* ── Light Streaks (horizontal lines that appear on fast scroll) ── */}
      <div
        ref={streaksRef}
        className="fixed inset-0 z-[9996] pointer-events-none opacity-0 transition-opacity duration-150"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0"
            style={{
              top: `${15 + i * 14}%`,
              height: "1px",
              background: `linear-gradient(to right, transparent ${10 + i * 5}%, rgba(225,6,0,${0.08 + i * 0.02}) 40%, rgba(225,6,0,${0.12 + i * 0.02}) 60%, transparent ${85 - i * 5}%)`,
              filter: "blur(0.5px)",
            }}
          />
        ))}
        {/* Additional white streaks */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`w${i}`}
            className="absolute left-0 right-0"
            style={{
              top: `${25 + i * 22}%`,
              height: "1px",
              background: `linear-gradient(to right, transparent 20%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.05) 55%, transparent 80%)`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* ── Motion Blur Overlay ── */}
      <div
        ref={blurOverlayRef}
        className="fixed inset-0 z-[9995] pointer-events-none opacity-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.1), transparent, rgba(5,5,5,0.1))",
        }}
      />

      {/* ── Direction Change Flash ── */}
      <div
        ref={directionFlashRef}
        className="fixed inset-0 z-[9994] pointer-events-none opacity-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(225,6,0,0.15), transparent 70%)",
        }}
      />
    </>
  );
}
