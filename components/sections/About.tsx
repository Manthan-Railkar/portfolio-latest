"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STATS } from "@/lib/constants";
import TelemetryRing from "@/components/ui/TelemetryRing";

gsap.registerPlugin(ScrollTrigger);

function StatCounter({
  stat,
  index,
}: {
  stat: (typeof STATS)[0];
  index: number;
}) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counter = { value: 0 };
    const ctx = gsap.context(() => {
      // Aggressive motion blur entrance
      gsap.fromTo(
        itemRef.current,
        { y: 40, opacity: 0, filter: "blur(10px)", scale: 1.1 },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 1.5,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      ScrollTrigger.create({
        trigger: itemRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(counter, {
            value: stat.value,
            duration: 2.5,
            ease: "power4.out",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = Math.floor(
                  counter.value
                ).toString();
              }
            },
          });
        },
        once: true,
      });
    }, itemRef);
    return () => ctx.revert();
  }, [stat.value, index]);

  return (
    <div ref={itemRef} className="text-left relative pl-6 border-l border-white/10">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[1px] w-[2px] h-8 bg-[var(--accent-red)] opacity-50" />
      <div className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white mb-2 leading-none" style={{ textShadow: "0 0 20px rgba(255,255,255,0.1)" }}>
        <span ref={counterRef}>0</span>
        <span className="text-[var(--accent-red)] drop-shadow-[0_0_15px_rgba(225,6,0,0.5)]">{stat.suffix}</span>
      </div>
      <div className="font-display text-[9px] tracking-[0.4em] text-white/40">
        {stat.label}
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const textLinesRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const telemetryWrapperRef = useRef<HTMLDivElement>(null);

  const addToTextRef = (el: HTMLParagraphElement | null) => {
    if (el && !textLinesRef.current.includes(el)) {
      textLinesRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic masking reveal for header
      gsap.fromTo(
        headerRef.current,
        { clipPath: "inset(100% 0 0 0)", y: 50 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Giant Typography staggered reveal
      if (giantTextRef.current) {
        const lines = giantTextRef.current.children;
        gsap.fromTo(
          lines,
          { x: -50, opacity: 0, filter: "blur(10px)", scale: 0.95 },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            duration: 1.5,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: giantTextRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      // Text lines staggered reveal with clip path
      textLinesRef.current.forEach((line, i) => {
        gsap.fromTo(
          line,
          { clipPath: "inset(0 100% 0 0)", x: -20 },
          {
            clipPath: "inset(0 0% 0 0)",
            x: 0,
            duration: 1.5,
            delay: i * 0.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // Telemetry wrapper parallax
      gsap.to(telemetryWrapperRef.current, {
        y: -40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative section-padding overflow-hidden bg-[#050505]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a] to-[#050505]" />
      
      {/* Background massive watermark */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center pointer-events-none opacity-[0.04]">
        <span className="-translate-x-[20%] sm:-translate-x-[16%] lg:-translate-x-[12%] font-display text-[55vw] sm:text-[44vw] lg:text-[34vw] font-black leading-none" style={{ WebkitTextStroke: "2px white", WebkitTextFillColor: "transparent" }}>
          01
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 items-start gap-y-12 lg:gap-y-14 lg:gap-x-12 xl:gap-x-16 2xl:gap-x-20">
        
        {/* Left Side: Cinematic Typography & Telemetry */}
        <div className="lg:col-span-7 relative grid min-w-0 items-start gap-8 sm:gap-10 lg:gap-11 xl:gap-12 lg:pr-4 xl:pr-6">
          {/* Header */}
          <div ref={headerRef} className="relative z-20 min-w-0">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 pl-1 sm:pl-0">
              <span className="font-display text-[10px] tracking-[0.55em] text-[var(--accent-red)]">
                PROFILE
              </span>
              <span className="font-display text-[9px] tracking-[0.45em] text-white/45">
                {"// CHAPTER 01"}
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-7xl font-black tracking-wider leading-none">
              THE <span className="text-[var(--accent-red)]">DRIVER</span>
            </h2>
          </div>

          {/* Giant Typography Stack */}
          <div ref={giantTextRef} className="flex flex-col relative z-20 space-y-1 min-w-0 max-w-full overflow-hidden">
            <div className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-transparent leading-[0.85] tracking-tight hover:text-white/5 transition-colors duration-500 cursor-default max-w-full" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>
              FULL
            </div>
            <div className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.85] tracking-tight relative inline-block drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] max-w-full">
              STACK
              <div className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 w-2 h-2 bg-[var(--accent-red)] rounded-full animate-pulse shadow-[0_0_10px_rgba(225,6,0,0.8)]" />
            </div>
            <div className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-transparent leading-[0.85] tracking-tight hover:text-[var(--accent-red)]/10 transition-colors duration-500 cursor-default max-w-full" style={{ WebkitTextStroke: "1px var(--accent-red)" }}>
              ENGINEER
            </div>
          </div>

          {/* Telemetry Readouts */}
          <div ref={telemetryWrapperRef} className="relative z-20 w-full max-w-sm lg:max-w-md mt-1 lg:mt-2">
            <div className="relative w-full p-5 sm:p-6 border border-white/10 bg-black/40 backdrop-blur-md">
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[var(--accent-red)]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[var(--accent-red)]" />
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <span className="font-display text-[10px] tracking-widest text-white/50">SYS.STATUS</span>
                <span className="font-display text-[10px] tracking-widest text-[var(--accent-red)] animate-pulse">OPTIMAL</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <span className="font-display text-[10px] tracking-widest text-white/50">FRAMEWORK</span>
                <span className="font-display text-[10px] tracking-widest text-white">REACT_CORE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-display text-[10px] tracking-widest text-white/50">OUTPUT</span>
                <span className="font-display text-[10px] tracking-widest text-white">100%_SYNCHRONIZED</span>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 right-0 translate-x-[6%] xl:translate-x-[12%] -translate-y-1/2 opacity-10 pointer-events-none mix-blend-screen scale-[1.1] sm:scale-[1.35] z-0 hidden xl:block">
            <TelemetryRing />
          </div>
        </div>

        {/* Right Side: Text & Stats */}
        <div className="lg:col-span-5 grid min-w-0 items-start gap-8 sm:gap-10 lg:gap-11 xl:gap-12 relative z-20">
          <div className="space-y-6 sm:space-y-8 relative w-full p-6 sm:p-8 md:p-10 border-l-2 border-[var(--accent-red)]/40 bg-gradient-to-r from-[var(--accent-red)]/10 to-transparent group hover:border-[var(--accent-red)] transition-colors duration-500">
             
             {/* Decorative brackets */}
             <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/20 transition-colors duration-500 group-hover:border-white/50" />
             <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/20 transition-colors duration-500 group-hover:border-white/50" />

            <p ref={addToTextRef} className="text-lg md:text-2xl text-white/90 leading-relaxed font-light">
              A passionate <span className="font-bold text-white">Full Stack Developer</span> and <span className="text-[var(--accent-red)] font-bold tracking-wide">Creative Technologist</span> who thrives at the intersection of design and engineering.
            </p>
            <p ref={addToTextRef} className="text-lg text-white/60 leading-relaxed">
              I build immersive digital experiences that push the boundaries of what&apos;s possible on the web. With expertise spanning from performant React architectures to real-time 3D graphics, I craft applications that aren&apos;t just functional — they&apos;re unforgettable.
            </p>
            <p ref={addToTextRef} className="text-lg text-white/60 leading-relaxed">
              When I&apos;m not coding, you&apos;ll find me exploring creative coding, experimenting with AI-powered tools, or designing motion-heavy interfaces that make users say <span className="text-[var(--accent-red)] italic font-medium">&quot;wow&quot;</span>.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:pt-1">
            {STATS.map((stat, i) => (
              <StatCounter key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
