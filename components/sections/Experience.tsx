"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const entriesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { clipPath: "inset(100% 0 0 0)", y: 50 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Animate the vertical telemetry line
      const line = timelineRef.current?.querySelector(".telemetry-line");
      if (line) {
        gsap.fromTo(
          line,
          { height: 0 },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 1.5,
            },
          }
        );
      }

      // Animate each entry
      entriesRef.current.forEach((entry, i) => {
        if (!entry) return;
        
        const isLeft = i % 2 === 0;
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: entry,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        // Node glow pulse
        const node = entry.querySelector(".telemetry-node");
        if (node) {
          tl.fromTo(node, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" });
          
          // Continuous pulse
          gsap.to(node, {
            boxShadow: "0 0 20px rgba(225,6,0,0.8), 0 0 40px rgba(225,6,0,0.4)",
            scale: 1.1,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }

        // Connection line
        const connector = entry.querySelector(".telemetry-connector");
        if (connector) {
          tl.fromTo(connector, { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: "power2.out" }, "-=0.2");
        }

        // Card reveal
        const card = entry.querySelector(".telemetry-card");
        if (card) {
          tl.fromTo(
            card,
            { opacity: 0, x: isLeft ? -30 : 30, filter: "blur(5px)" },
            { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
            "-=0.2"
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative section-padding overflow-hidden bg-[#050505]"
    >
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-[radial-gradient(ellipse,rgba(225,6,0,0.03)_0%,transparent_60%)] pointer-events-none" />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="mb-20 text-center">
          <div className="font-display text-[10px] tracking-[0.5em] text-[var(--accent-red)] mb-4">
            // CHAPTER 05
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-7xl font-black tracking-wider leading-none">
            RACE <span className="text-[var(--accent-red)]">HISTORY</span>
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative mt-12 md:mt-24">
          {/* Central vertical line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px]">
            <div
              className="telemetry-line absolute top-0 left-0 w-full h-0 origin-top"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, var(--accent-red), var(--accent-red), transparent)",
                boxShadow: "0 0 15px rgba(225,6,0,0.5)",
              }}
            />
          </div>

          {/* Timeline entries */}
          <div className="space-y-16 md:space-y-32 pb-16 md:pb-24">
            {EXPERIENCE.map((exp, index) => (
              <div
                key={index}
                ref={(el) => { entriesRef.current[index] = el; }}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Node on timeline */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 z-20">
                  <div className="telemetry-node absolute inset-0 rounded-full bg-[var(--accent-red)]" />
                  <div className="absolute inset-[-4px] rounded-full border border-[var(--accent-red)]/50 animate-ping opacity-50" />
                </div>

                {/* Connector Line (Desktop only) */}
                <div 
                  className={`telemetry-connector hidden md:block absolute top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-[var(--accent-red)]/50 to-transparent w-16 z-10 origin-${index % 2 === 0 ? 'right' : 'left'}`}
                  style={{
                    [index % 2 === 0 ? 'right' : 'left']: '50%',
                  }}
                />

                {/* Content card */}
                <div
                  className={`telemetry-card ml-12 md:ml-0 md:w-[40%] bg-white/[0.02] border border-white/5 backdrop-blur-sm p-5 sm:p-8 rounded-xl hover:bg-white/[0.04] transition-colors duration-300 relative group overflow-hidden ${
                    index % 2 === 0
                      ? "md:mr-auto"
                      : "md:ml-auto"
                  }`}
                >
                  {/* Subtle red hover gradient inside card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-red)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Corner bracket decorative */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[var(--accent-red)]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="font-display text-[10px] tracking-[0.3em] text-[var(--accent-red)] border border-[var(--accent-red)]/30 px-2 py-1 rounded">
                        {exp.period}
                      </div>
                      <div className="h-[1px] flex-grow bg-white/10" />
                    </div>

                    <h3 className="font-display text-lg sm:text-2xl font-bold text-white mb-1 group-hover:text-[var(--accent-red)] transition-colors">
                      {exp.role}
                    </h3>
                    <div className="font-display text-xs tracking-wider text-white/50 mb-6">
                      {exp.company}
                    </div>

                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-display text-[9px] tracking-widest px-2 py-1 bg-white/5 text-white/60 rounded-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
