"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VISION } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section and animate text lines with scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        },
      });

      // Background ambient zoom
      tl.to(
        containerRef.current,
        {
          scale: 1.1,
          ease: "none",
        },
        0
      );

      // Animate each manifesto line sequentially
      linesRef.current.forEach((line, index) => {
        if (!line) return;
        
        // Fly in from bottom, scale down slightly, then fly up and fade out
        tl.fromTo(
          line,
          { y: "100vh", opacity: 0, scale: 1.2, filter: "blur(10px)" },
          {
            y: "0vh",
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.out",
          },
          index * 0.8
        ).to(
          line,
          {
            y: "-100vh",
            opacity: 0,
            scale: 0.8,
            filter: "blur(10px)",
            duration: 1,
            ease: "power2.in",
          },
          (index * 0.8) + 1.2
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="vision"
      className="relative min-h-screen overflow-hidden bg-[#050505] flex items-center justify-center"
    >
      <div
        ref={containerRef}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,6,0,0.1)_0%,transparent_70%)] opacity-50"
      />
      
      {/* Cinematic wide letterbox bars */}
      <div className="absolute top-0 left-0 right-0 h-[10vh] bg-black z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-[10vh] bg-black z-20" />

      {/* Floating particles background overlay */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 mix-blend-overlay z-10 pointer-events-none" />

      <div className="relative z-30 w-full h-full flex items-center justify-center">
        {VISION.map((text, index) => (
          <div
            key={index}
            ref={(el) => { linesRef.current[index] = el; }}
            className="absolute top-1/2 left-0 right-0 -translate-y-1/2 text-center px-4"
            style={{ willChange: "transform, opacity, filter" }}
          >
            <h2 className="font-display text-4xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter mix-blend-difference" style={{ textShadow: "0 0 40px rgba(255,255,255,0.2)" }}>
              {text}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}
