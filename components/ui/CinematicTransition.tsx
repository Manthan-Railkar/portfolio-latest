"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CinematicTransitionProps {
  text: string;
  subtext?: string;
}

export default function CinematicTransition({ text, subtext }: CinematicTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline linked to the scroll of this container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1.5,
        },
      });

      // The massive text sweeps from right to left across the screen
      tl.fromTo(
        textRef.current,
        { x: "100%", opacity: 0, filter: "blur(20px)" },
        { x: "-50%", opacity: 1, filter: "blur(0px)", ease: "expo.out", duration: 1 }
      ).to(
        textRef.current,
        { x: "-150%", opacity: 0, filter: "blur(10px)", ease: "expo.in", duration: 1 }
      );

      // Red cinematic line burst
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.5, ease: "expo.out" },
        0.5
      ).to(
        lineRef.current,
        { scaleX: 0, opacity: 0, duration: 0.5, ease: "expo.in" },
        1.5
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[20vh] flex items-center justify-center overflow-hidden gpu-accelerated"
    >
      {/* Background cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-transparent z-0" />

      {/* Red line burst effect */}
      <div
        ref={lineRef}
        className="absolute top-1/2 left-0 right-0 h-[2px] bg-[var(--accent-red)] z-[1] gpu-accelerated"
        style={{
          boxShadow: "0 0 40px rgba(225,6,0,0.8), 0 0 100px rgba(225,6,0,0.4)",
          transformOrigin: "center",
        }}
      />

      {/* Massive Sweeping Typography */}
      <div
        ref={textRef}
        className="absolute z-[2] whitespace-nowrap flex flex-col items-center pointer-events-none gpu-accelerated"
      >
        {subtext && (
          <div className="font-display text-[12px] md:text-[14px] tracking-[1em] text-[var(--accent-red)] mb-4 animate-flicker">
            {subtext}
          </div>
        )}
        <h2
          className="font-display text-[15vw] font-black leading-none tracking-tight"
          style={{
            WebkitTextStroke: "2px rgba(255,255,255,0.1)",
            WebkitTextFillColor: "transparent",
          }}
        >
          {text}
        </h2>
      </div>
    </div>
  );
}
