"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILLS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // 3D Depth scrolling for cards
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        // Initial setup for 3D stacking
        gsap.set(card, {
          z: -1000 * (cardsRef.current.length - index),
          opacity: index === 0 ? 1 : 0.2,
          scale: index === 0 ? 1 : 0.8,
          y: index * 40,
        });

        // Timeline for each card
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${window.innerHeight * 2}`,
            scrub: 1,
            pin: index === 0 ? true : false, // Pin the section on the first card
          },
        });

        if (index === 0) {
          // First card fades back as scroll progresses
          tl.to(card, {
            z: -1000,
            opacity: 0,
            scale: 0.8,
            y: -100,
          });
        } else {
          // Subsequent cards fly forward from the background
          tl.to(card, {
            z: 0,
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "power2.out",
          }).to(card, {
            z: -1000,
            opacity: 0,
            scale: 0.8,
            y: -100,
            ease: "power2.in",
          });
        }
        
        // Animate skill bars with a glitch/stagger effect when card comes forward
        const bars = card.querySelectorAll(".skill-bar-fill");
        bars.forEach((bar, i) => {
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: bar.getAttribute("data-level") + "%",
              duration: 1,
              delay: i * 0.1,
              ease: "steps(10)", // Glitchy steps ease
              scrollTrigger: {
                trigger: sectionRef.current,
                start: () => `top+=${(index - 0.5) * window.innerHeight} top`,
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen overflow-hidden bg-[#020202]"
      style={{ perspective: "2000px" }}
    >
      <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

      {/* Grid lines background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: "rotateX(60deg) translateY(-100px)",
          transformOrigin: "top center",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 pt-24 md:pt-32">
        <div ref={headerRef} className="mb-20">
          <div className="font-display text-[10px] tracking-[0.5em] text-[var(--accent-red)] mb-4">
            // CHAPTER 02
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-7xl font-black tracking-wider leading-none">
            TECH <span className="text-[var(--accent-red)]">STACK</span>
          </h2>
        </div>

        {/* 3D Container for Cards */}
        <div ref={containerRef} className="relative h-[50vh] sm:h-[60vh] w-full max-w-3xl mx-auto transform-style-3d">
          {SKILLS.map((category, index) => (
            <div
              key={category.category}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="absolute inset-0 w-full bg-[#080808]/80 backdrop-blur-xl border border-white/10 rounded-xl p-5 sm:p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute top-0 right-8 w-[2px] h-16 bg-[var(--accent-red)] shadow-[0_0_15px_rgba(225,6,0,0.6)]" />

              <div className="font-display text-8xl font-black text-white/[0.02] absolute bottom-4 right-4 pointer-events-none select-none">
                0{index + 1}
              </div>

              <h3 className="font-display text-lg sm:text-2xl tracking-[0.3em] text-white mb-6 sm:mb-10 glitch" data-text={category.category.toUpperCase()}>
                {category.category.toUpperCase()}
              </h3>

              <div className="space-y-5 sm:space-y-8 relative z-10">
                {category.items.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between mb-3">
                      <span className="text-sm font-display tracking-widest text-white/80 group-hover:text-white transition-colors duration-300">
                        {skill.name}
                      </span>
                      <span className="font-display text-xs text-[var(--accent-red)]">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-[1px] bg-white/10 relative overflow-hidden">
                      <div
                        className="skill-bar-fill absolute top-0 left-0 h-full bg-[var(--accent-red)]"
                        data-level={skill.level}
                        style={{
                          width: "0%",
                          boxShadow: "0 0 10px rgba(225,6,0,0.5)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
