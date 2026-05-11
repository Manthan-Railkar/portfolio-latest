"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ACHIEVEMENTS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Staggered cinematic reveal for achievement cards
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          { opacity: 0, y: 100, scale: 0.9, rotateX: -20 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1.2,
            delay: index * 0.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative section-padding overflow-hidden bg-[#0a0a0a]"
      style={{ perspective: "1500px" }}
    >
      {/* Background Volumetric Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150vw] h-[100vh] pointer-events-none z-0" style={{ background: "radial-gradient(ellipse at top, rgba(225,6,0,0.15) 0%, transparent 60%)" }} />

      {/* Watermark */}
      <div className="watermark text-[20vw] top-1/4 right-0 translate-x-[20%] text-white/[0.02]">
        GLORY
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div ref={headerRef} className="mb-20 text-center">
          <div className="font-display text-[10px] tracking-[0.5em] text-[var(--accent-red)] mb-4">
            // CHAPTER 04
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-black tracking-wider leading-none">
            HALL OF <span className="text-[var(--accent-red)]">FAME</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {ACHIEVEMENTS.map((achievement, index) => (
            <div
              key={achievement.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative flex flex-col items-center text-center p-8 bg-white/[0.02] border border-white/5 backdrop-blur-md overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Cinematic Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(circle at center, rgba(225,6,0,0.2) 0%, transparent 70%)" }} />
              
              {/* Top border red line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-red)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-x-0 group-hover:scale-x-100 origin-center" />

              <div className="font-display text-5xl font-black text-white/10 mb-6 relative z-10 group-hover:-translate-y-2 transition-transform duration-500">
                {achievement.id}
              </div>
              
              <h3 className="font-display text-xl font-bold text-white mb-2 relative z-10">
                {achievement.title}
              </h3>
              
              <div className="text-[var(--accent-red)] font-display text-[10px] tracking-widest mb-4 relative z-10">
                {achievement.category} // {achievement.year}
              </div>
              
              <p className="text-white/60 text-sm leading-relaxed relative z-10">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
