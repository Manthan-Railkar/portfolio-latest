"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_CONFIG, STATS } from "@/lib/constants";
import Image from "next/image";
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
    <div ref={itemRef} className="text-center relative">
      <div className="font-display text-5xl md:text-6xl font-black text-white mb-2 leading-none" style={{ textShadow: "0 0 20px rgba(255,255,255,0.1)" }}>
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
  const imageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const textLinesRef = useRef<(HTMLParagraphElement | null)[]>([]);

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

      // Portrait card reveal with 3D tilt and scale
      gsap.fromTo(
        imageRef.current,
        { rotationY: 15, scale: 0.9, opacity: 0, x: -50 },
        {
          rotationY: 0,
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

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

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
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
      className="relative section-padding overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]" />
      
      {/* Background massive watermark */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-[10%] pointer-events-none opacity-5">
        <span className="font-display text-[40vw] font-black leading-none" style={{ WebkitTextStroke: "2px white", WebkitTextFillColor: "transparent" }}>
          01
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div ref={headerRef} className="mb-20 md:mb-32">
          <div className="font-display text-[10px] tracking-[0.5em] text-[var(--accent-red)] mb-4">
            // CHAPTER 01
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-black tracking-wider leading-none">
            THE <span className="text-[var(--accent-red)]">DRIVER</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Portrait Container */}
          <div className="lg:col-span-5 relative" ref={imageRef} style={{ perspective: "1000px" }}>
            <div className="relative aspect-[3/4] overflow-hidden border border-white/5 backdrop-blur-sm group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-10 mix-blend-overlay">
                 <TelemetryRing size={300} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
                 <span className="font-display text-[15vw] lg:text-[10vw] font-black tracking-tighter relative z-10">
                    MR
                 </span>
              </div>

              {/* Red overlay line moving */}
              <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-[var(--accent-red)] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-[var(--accent-red)]/50" />
              <div className="absolute top-4 right-4 w-4 h-4 border-r border-t border-[var(--accent-red)]/50" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-[var(--accent-red)]/50" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-[var(--accent-red)]/50" />

              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
            </div>

            <div className="mt-8 flex items-baseline gap-4">
              <span className="font-script text-3xl text-[var(--accent-red)] filter drop-shadow-[0_0_10px_rgba(225,6,0,0.5)]">
                {SITE_CONFIG.firstName}
              </span>
              <span className="font-display text-3xl font-black tracking-widest text-white">
                {SITE_CONFIG.lastName}
              </span>
            </div>
          </div>

          {/* Text & Stats */}
          <div className="lg:col-span-7">
            <div className="space-y-8 mb-16 relative">
               <div className="absolute -left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[var(--accent-red)] via-white/10 to-transparent hidden md:block" />

              <p ref={addToTextRef} className="text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                A passionate <span className="font-bold text-white">Full Stack Developer</span> and <span className="text-[var(--accent-red)] font-bold tracking-wide">Creative Technologist</span> who thrives at the intersection of design and engineering.
              </p>
              <p ref={addToTextRef} className="text-lg text-white/60 leading-relaxed">
                I build immersive digital experiences that push the boundaries of what&apos;s possible on the web. With expertise spanning from performant React architectures to real-time 3D graphics, I craft applications that aren&apos;t just functional — they&apos;re unforgettable.
              </p>
              <p ref={addToTextRef} className="text-lg text-white/60 leading-relaxed">
                When I&apos;m not coding, you&apos;ll find me exploring creative coding, experimenting with AI-powered tools, or designing motion-heavy interfaces that make users say <span className="text-[var(--accent-red)] italic">"wow"</span>.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat, i) => (
                <StatCounter key={stat.label} stat={stat} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
