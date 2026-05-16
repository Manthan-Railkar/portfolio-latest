"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});
const FloatingLabels = dynamic(
  () => import("@/components/ui/FloatingLabels"),
  { ssr: false }
);

/* ═══════════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════════ */

/* ─── HUD Corner Bracket ─── */
function HUDCorner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const corners: Record<string, string> = {
    tl: "top-4 left-4 border-l border-t",
    tr: "top-4 right-4 border-r border-t",
    bl: "bottom-4 left-4 border-l border-b",
    br: "bottom-4 right-4 border-r border-b",
  };
  return (
    <div
      className={`absolute w-6 h-6 ${corners[position]} border-[var(--accent-red)]/30 z-[5]`}
    />
  );
}

/* ─── Rotating Telemetry Ring ─── */
function TelemetryRing() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-none">
      <div className="w-[520px] h-[520px] md:w-[650px] md:h-[650px] lg:w-[750px] lg:h-[750px] rounded-full border border-white/[0.03] animate-spin-slow" />
      <div className="absolute inset-8 rounded-full border border-dashed border-[var(--accent-red)]/10 animate-spin-reverse" />
      <div className="absolute inset-16 rounded-full border border-white/[0.02]" />
      <div className="absolute inset-20 rounded-full">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 origin-center"
            style={{
              width: "1px",
              height: "100%",
              transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
            }}
          >
            <div className="w-[1px] h-3 mx-auto bg-[var(--accent-red)]/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Split Character — individual letter for per-char animation ─── */
function SplitChar({
  char,
  index,
  refCb,
}: {
  char: string;
  index: number;
  refCb: (el: HTMLSpanElement | null, i: number) => void;
}) {
  return (
    <span
      ref={(el) => refCb(el, index)}
      className="inline-block overflow-hidden"
      style={{ display: "inline-block" }}
    >
      <span className="split-char-inner inline-block">{char}</span>
    </span>
  );
}

/* ═══════════════════════════════════════════════
   Main Hero Component
   ═══════════════════════════════════════════════ */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Typography refs
  const surnameOutlinedRef = useRef<HTMLDivElement>(null);
  const surnameSolidRef = useRef<HTMLDivElement>(null);
  const surnameSweepRef = useRef<HTMLDivElement>(null); // red sweep overlay
  const surnameCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const firstNameRef = useRef<HTMLDivElement>(null);
  const firstNameGlowRef = useRef<HTMLDivElement>(null);
  const strokePathRef = useRef<SVGPathElement>(null);

  // Portrait + HUD refs
  const portraitRef = useRef<HTMLDivElement>(null);
  const numberLeftRef = useRef<HTMLDivElement>(null);
  const numberRightRef = useRef<HTMLDivElement>(null);
  const hudTopRef = useRef<HTMLDivElement>(null);
  const hudBottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const glowPulseRef = useRef<HTMLDivElement>(null);

  const surnameLetters = SITE_CONFIG.lastName.split("");

  const setCharRef = (el: HTMLSpanElement | null, i: number) => {
    surnameCharsRef.current[i] = el;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const master = gsap.timeline({ delay: 3.5 });

      /* ═══ PHASE 1: Outlined Surname Reveal (masking + horizontal sweep) ═══ */

      // Background outlined text — scale from 1.15 with horizontal sweep mask
      master.fromTo(
        surnameOutlinedRef.current,
        {
          opacity: 0,
          scale: 1.15,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "power3.out",
        }
      );

      // Red horizontal sweep overlay wipes across the outlined text
      master.fromTo(
        surnameSweepRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.0,
          ease: "power4.inOut",
        },
        "-=1.4"
      );
      // Sweep exits to the right
      master.to(
        surnameSweepRef.current,
        {
          clipPath: "inset(0 0% 0 100%)",
          duration: 0.6,
          ease: "power3.in",
        },
        "-=0.4"
      );

      /* ═══ PHASE 2: Portrait Entrance ═══ */
      master.fromTo(
        portraitRef.current,
        { y: 100, opacity: 0, scale: 1.08 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
        },
        "-=1.0"
      );

      /* ═══ PHASE 3: Solid Surname — Per-Character Slam ═══ */

      // Each letter slams in with scale bounce + motion blur
      surnameCharsRef.current.forEach((charEl, i) => {
        if (!charEl) return;
        const inner = charEl.querySelector(".split-char-inner");
        if (!inner) return;

        master.fromTo(
          inner,
          {
            y: 80,
            opacity: 0,
            scale: 1.4,
            filter: "blur(6px)",
            rotateX: -20,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            rotateX: 0,
            duration: 0.5,
            ease: "back.out(1.5)",
          },
          `-=${i === 0 ? 0.6 : 0.42}` // stagger overlap
        );
      });

      // After all chars land, do a unified glow pulse
      master.fromTo(
        surnameSolidRef.current,
        { textShadow: "0 0 0px rgba(255,255,255,0)" },
        {
          textShadow:
            "0 0 40px rgba(255,255,255,0.15), 0 0 80px rgba(255,255,255,0.05)",
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.1"
      );
      master.to(
        surnameSolidRef.current,
        {
          textShadow: "0 0 20px rgba(255,255,255,0.03)",
          duration: 0.8,
          ease: "power2.in",
        }
      );

      /* ═══ PHASE 4: Red Accent Line Sweep ═══ */
      master.fromTo(
        lineRef.current,
        { width: 0 },
        { width: "140px", duration: 0.5, ease: "power4.out" },
        "-=1.4"
      );

      /* ═══ PHASE 5: Script First Name — Stroke + Neon Flicker ═══ */

      // SVG stroke animation (handwritten reveal)
      if (strokePathRef.current) {
        const pathLength = strokePathRef.current.getTotalLength?.() || 600;
        gsap.set(strokePathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });
        master.to(
          strokePathRef.current,
          {
            strokeDashoffset: 0,
            duration: 1.8,
            ease: "power2.inOut",
          },
          "-=1.6"
        );
      }

      // Main first name fade-in underneath the SVG
      master.fromTo(
        firstNameRef.current,
        { opacity: 0, y: 20, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "power3.out" },
        "-=1.4"
      );

      // Neon glow flicker sequence
      const flickerTl = gsap.timeline({ delay: 0 });
      flickerTl
        .to(firstNameGlowRef.current, { opacity: 1, duration: 0.05 })
        .to(firstNameGlowRef.current, { opacity: 0.3, duration: 0.05 })
        .to(firstNameGlowRef.current, { opacity: 1, duration: 0.08 })
        .to(firstNameGlowRef.current, { opacity: 0.5, duration: 0.04 })
        .to(firstNameGlowRef.current, { opacity: 1, duration: 0.06 })
        .to(firstNameGlowRef.current, { opacity: 0.7, duration: 0.03 })
        .to(firstNameGlowRef.current, { opacity: 1, duration: 0.1 });
      master.add(flickerTl, "-=0.8");

      /* ═══ PHASE 6: Numbers + HUD ═══ */
      master.fromTo(
        [numberLeftRef.current, numberRightRef.current],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.1 },
        "-=0.8"
      );

      master.fromTo(
        [hudTopRef.current, hudBottomRef.current],
        { opacity: 0 },
        { opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out" },
        "-=0.5"
      );

      master.fromTo(
        tagRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.3"
      );

      /* ═══ PHASE 7: Background Glow Pulse ═══ */
      master.fromTo(
        glowPulseRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 0.15, scale: 1, duration: 1.2, ease: "power2.out" },
        "-=2"
      );

      /* ═══ PHASE 8: Scroll indicator ═══ */
      master.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.2"
      );

      gsap.to(scrollRef.current, {
        y: 8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 8,
      });

      /* ═══ CONTINUOUS: Outlined surname slow drift + breathe ═══ */
      gsap.to(surnameOutlinedRef.current, {
        scale: 1.02,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 6,
      });

      /* ═══ CONTINUOUS: Neon glow breathe on first name ═══ */
      gsap.to(firstNameGlowRef.current, {
        textShadow:
          "0 0 30px rgba(225,6,0,0.8), 0 0 60px rgba(225,6,0,0.4), 0 0 100px rgba(225,6,0,0.2)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 7,
      });

      /* ═══════════════════════════════════════════════════════════
         SCROLL-DRIVEN CINEMATIC PARALLAX SYSTEM
         Triggered after intro completes so baseline visibility is preserved
         ═══════════════════════════════════════════════════════════ */
      const initScrollParallax = () => {
        const scrollConfig = {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2, // smooth inertia
        };

        // Outlined surname — shifts UP faster (deep background layer)
        gsap.to(surnameOutlinedRef.current, {
          y: -200,
          scale: 1.08,
          opacity: 0,
          immediateRender: false,
          scrollTrigger: { ...scrollConfig, scrub: 0.8 },
        });

        // Solid foreground surname — shifts UP at medium speed
        gsap.to(surnameSolidRef.current, {
          y: -120,
          opacity: 0,
          immediateRender: false,
          scrollTrigger: { ...scrollConfig, scrub: 1.0 },
        });

        // Script first name — drifts left + fades
        gsap.to(firstNameRef.current, {
          x: -80,
          y: -60,
          opacity: 0,
          scale: 0.95,
          immediateRender: false,
          scrollTrigger: { ...scrollConfig, scrub: 1.2 },
        });

        // Portrait — zooms in subtly, rotates slightly, shifts up
        gsap.to(portraitRef.current, {
          y: -80,
          scale: 1.1,
          rotateZ: -1.5,
          opacity: 0,
          immediateRender: false,
          scrollTrigger: { ...scrollConfig, scrub: 1.5 },
        });

        // Number 07 (left) — drifts up-left
        gsap.to(numberLeftRef.current, {
          y: -60,
          x: -20,
          opacity: 0,
          immediateRender: false,
          scrollTrigger: { ...scrollConfig, scrub: 0.6 },
        });

        // Number 07 (right) — drifts up-right
        gsap.to(numberRightRef.current, {
          y: -60,
          x: 20,
          opacity: 0,
          immediateRender: false,
          scrollTrigger: { ...scrollConfig, scrub: 0.6 },
        });

        // Red accent line — extends then fades
        gsap.to(lineRef.current, {
          width: "300px",
          opacity: 0,
          y: -40,
          immediateRender: false,
          scrollTrigger: { ...scrollConfig, scrub: 1.0 },
        });

        // HUD bars — fade out quickly
        gsap.to(hudTopRef.current, {
          y: -30,
          opacity: 0,
          immediateRender: false,
          scrollTrigger: { ...scrollConfig, scrub: 0.5, end: "50% top" },
        });

        gsap.to(hudBottomRef.current, {
          y: 30,
          opacity: 0,
          immediateRender: false,
          scrollTrigger: { ...scrollConfig, scrub: 0.5, end: "40% top" },
        });

        // Scroll indicator — exits early
        gsap.to(scrollRef.current, {
          opacity: 0,
          y: 20,
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "15% top",
            scrub: 0.3,
          },
        });

        // Glow pulse intensifies mid-scroll then fades
        gsap.to(glowPulseRef.current, {
          opacity: 0.3,
          scale: 1.3,
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "40% top",
            scrub: 1.0,
          },
        });
        gsap.to(glowPulseRef.current, {
          opacity: 0,
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "40% top",
            end: "bottom top",
            scrub: 1.0,
          },
        });

        ScrollTrigger.refresh();
      };

      master.call(initScrollParallax);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* ──── 3D Particle Background ──── */}
      <HeroScene />

      {/* ──── Gradient overlays & Cinematic Atmosphere (F1 RED) ──── */}
      <div className="absolute inset-0 z-[1] bg-[#9b0c0f]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)] pointer-events-none mix-blend-multiply" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />

      {/* Volumetric Red Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] z-[1] pointer-events-none opacity-60 mix-blend-screen"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,50,50,0.6) 0%, transparent 60%)",
          filter: "blur(60px)",
        }} />

      {/* Atmospheric Smoke / Motion Blur Layers */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-20"
        style={{
          backgroundImage: "url('/images/noise.svg')",
          backgroundRepeat: "repeat",
          mixBlendMode: "overlay",
        }} />

      {/* ──── Background Glow Pulse ──── */}
      <div
        ref={glowPulseRef}
        className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] w-[80vw] h-[60vh] pointer-events-none opacity-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,100,100,0.2) 0%, transparent 70%)",
        }}
      />

      {/* ──── Corner Text (7) ──── */}
      <div className="absolute top-8 left-12 z-[5] font-display text-xl md:text-2xl font-black text-white tracking-[0.2em]">
        7
      </div>
      <div className="absolute top-8 right-12 z-[5] font-display text-xl md:text-2xl font-black text-white tracking-[0.2em]">
        7
      </div>
      <div className="absolute top-1/3 right-12 z-[5] font-display text-xl md:text-2xl font-black text-white tracking-[0.2em]">
        7
      </div>

      {/* ──── Side Label (CODING Style) ──── */}
      <div className="absolute top-1/2 left-12 -translate-y-1/2 z-[5] flex flex-col items-center gap-4">
        <div className="w-[1px] h-16 bg-white/30" />
        <div className="font-display text-[10px] md:text-xs tracking-[0.4em] text-white" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          CODING
        </div>
        <div className="w-[1px] h-16 bg-white/30" />
      </div>

      {/* ──── Telemetry Ring ──── */}
      <TelemetryRing />

      {/* ──── Floating Labels ──── */}
      <FloatingLabels />

      {/* ──── Oversized Outlined Surname (BEHIND portrait) ──── */}
      <div
        ref={surnameOutlinedRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] z-[2] select-none pointer-events-none opacity-0 whitespace-nowrap"
      >
        <span
          className="font-display text-[22vw] md:text-[18vw] lg:text-[16vw] font-black tracking-[0.05em] leading-none mix-blend-overlay"
          style={{
            WebkitTextStroke: "2px rgba(255,255,255,0.4)",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 20px rgba(0,0,0,0.5))",
          }}
        >
          {SITE_CONFIG.lastName}
        </span>

        {/* Red sweep overlay — clips over the outlined text */}
        <div
          ref={surnameSweepRef}
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          <span
            className="font-display text-[22vw] md:text-[18vw] lg:text-[16vw] font-black tracking-[0.05em] leading-none"
            style={{
              WebkitTextStroke: "3px rgba(255,255,255,0.8)",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(255,255,255,0.4))",
            }}
          >
            {SITE_CONFIG.lastName}
          </span>
        </div>
      </div>

      {/* ──── Giant translucent 7 ──── */}
      <div className="absolute top-1/2 left-[8%] -translate-y-1/2 z-[1] pointer-events-none select-none">
        <span
          className="font-display text-[35vw] font-black leading-none mix-blend-overlay"
          style={{
            WebkitTextStroke: "2px rgba(255,255,255,0.2)",
            WebkitTextFillColor: "transparent",
          }}
        >
          7
        </span>
      </div>

      {/* ──── Portrait ──── */}
      <div
        ref={portraitRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[3] opacity-0"
      >
        <div className="relative w-[380px] h-[520px] md:w-[480px] md:h-[660px] lg:w-[560px] lg:h-[780px]">

          {/* Blurred Echo (Left) */}
          <div className="absolute top-0 bottom-0 -left-[50%] w-full opacity-30 mix-blend-screen pointer-events-none"
            style={{
              filter: "blur(20px)",
              maskImage: "linear-gradient(to right, transparent, black 30%, black 70%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 30%, black 70%, transparent)"
            }}>
            <Image src="/images/portrait.png" alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover object-top" />
          </div>

          {/* Blurred Echo (Right) */}
          <div className="absolute top-0 bottom-0 -right-[50%] w-full opacity-30 mix-blend-screen pointer-events-none"
            style={{
              filter: "blur(20px)",
              maskImage: "linear-gradient(to right, transparent, black 30%, black 70%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 30%, black 70%, transparent)"
            }}>
            <Image src="/images/portrait.png" alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover object-top" />
          </div>

          {/* F1 Broadcast Dramatic Red Rim Light (Left) */}
          <div
            className="absolute -left-6 top-[5%] bottom-[10%] w-3 z-10 rounded-full mix-blend-screen"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(255,24,1,0.8), transparent)",
              boxShadow:
                "-15px 0 50px rgba(225,6,0,0.6), -5px 0 80px rgba(225,6,0,0.3)",
              filter: "blur(2px)",
            }}
          />
          {/* Subtle Red Rim Light (Right) */}
          <div
            className="absolute -right-2 top-[15%] bottom-[15%] w-1 z-10 rounded-full mix-blend-screen"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(225,6,0,0.4), transparent)",
              boxShadow: "5px 0 30px rgba(225,6,0,0.2)",
              filter: "blur(1px)",
            }}
          />

          {/* Portrait image with Mix Blend Screen to remove black background */}
          <Image
            src="/images/portrait.png"
            alt={SITE_CONFIG.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className="object-cover object-top filter contrast-[1.1] brightness-[0.95] mix-blend-screen"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 50%, rgba(0,0,0,0.8) 70%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 50%, rgba(0,0,0,0.8) 70%, transparent 100%)",
            }}
          />

          {/* Bottom environment fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[60%] z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, #050505 10%, rgba(5,5,5,0.6) 40%, transparent 100%)",
            }}
          />
        </div>
      </div>

      {/* ──── Foreground Typography ──── */}

      {/* Script first name — with SVG stroke animation overlay */}
      <div
        className="absolute z-[4] left-[5%] md:left-[10%]"
        style={{ bottom: "25%" }}
      >
        {/* SVG stroke reveal (draws the handwritten text) */}
        <svg
          className="absolute top-0 left-0 w-[400px] md:w-[600px] h-full pointer-events-none"
          viewBox="0 0 320 90"
          fill="none"
          style={{ overflow: "visible", filter: "drop-shadow(0 0 10px rgba(225,6,0,0.4))" }}
        >
          <path
            ref={strokePathRef}
            d="M10 70 C20 20 40 15 60 40 C75 60 55 75 45 65 C35 55 50 30 70 25 C85 22 80 50 95 45 C110 40 105 25 115 30 C125 35 120 50 130 45 L140 30 C145 25 150 30 148 40 C146 50 140 55 145 45 C150 35 155 25 165 30 C175 35 170 50 180 45 C190 40 195 25 200 30 C205 35 200 50 210 45 C218 40 225 25 235 30 C245 35 240 50 250 45 L260 30"
            stroke="rgba(255,24,1,0.8)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Actual text behind the stroke */}
        <div ref={firstNameRef} className="relative opacity-0">
          <span
            ref={firstNameGlowRef}
            className="font-script text-6xl md:text-8xl lg:text-[140px] text-[var(--accent-red)] neon-flicker"
            style={{
              lineHeight: 0.8,
              textShadow:
                "0 0 20px rgba(225,6,0,0.6), 0 0 40px rgba(225,6,0,0.3), 0 0 80px rgba(225,6,0,0.15)",
            }}
          >
            {SITE_CONFIG.firstName}
          </span>
        </div>
      </div>

      {/* Solid surname — per-character animated */}
      <div
        ref={surnameSolidRef}
        className="absolute z-[4] pointer-events-none select-none left-[50%] md:left-[60%]"
        style={{
          bottom: "18%",
          perspective: "600px",
        }}
      >
        <span className="font-display text-[10vw] md:text-7xl lg:text-[100px] font-black tracking-wider text-white inline-flex"
          style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.8))" }}>
          {surnameLetters.map((char, i) => (
            <SplitChar key={i} char={char} index={i} refCb={setCharRef} />
          ))}
        </span>
      </div>

      {/* ──── Red Accent Line ──── */}
      <div
        ref={lineRef}
        className="absolute z-[4] w-0 left-[10%] md:left-[20%]"
        style={{
          bottom: "35%",
          height: "3px",
          background:
            "linear-gradient(to right, var(--accent-red), transparent)",
          boxShadow: "0 0 20px rgba(225,6,0,0.8), 0 0 40px rgba(225,6,0,0.4)",
        }}
      />

      {/* ──── Number 7 System ──── */}
      <div ref={numberLeftRef} className="absolute top-6 left-6 z-[5] opacity-0">
        <div className="font-display text-[10px] tracking-[0.4em] text-white/20 mb-1">
          CREATIVE DEVELOPER
        </div>

      </div>

      <div
        ref={numberRightRef}
        className="absolute top-6 right-6 z-[5] text-right opacity-0"
      >
        <div className="font-display text-[10px] tracking-[0.4em] text-white/20 mb-1">
          SEASON 2024
        </div>

      </div>

      {/* ──── HUD Top Bar ──── */}
      <div
        ref={hudTopRef}
        className="absolute top-0 left-0 right-0 z-[5] flex items-center justify-between px-6 py-3 opacity-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[var(--accent-red)] animate-pulse" />
          <span className="font-display text-[9px] tracking-[0.3em] text-white/20">
            LIVE
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span className="font-display text-[9px] tracking-[0.2em] text-white/15">
            RPM 12,500
          </span>
          <span className="font-display text-[9px] tracking-[0.2em] text-white/15">
            SPEED 320
          </span>
          <span className="font-display text-[9px] tracking-[0.2em] text-white/15">
            LAP 07/58
          </span>
        </div>
        <span className="font-display text-[9px] tracking-[0.3em] text-white/20">
          2024.MR
        </span>
      </div>

      {/* ──── HUD Bottom Bar ──── */}
      <div
        ref={hudBottomRef}
        className="absolute bottom-0 left-0 right-0 z-[5] flex items-end justify-between px-6 py-4 opacity-0"
      >
        <div ref={tagRef} className="opacity-0">
          <div className="font-display text-[9px] tracking-[0.5em] text-[var(--accent-red)]/50 mb-1">
            {"// PORTFOLIO"}
          </div>
          <div className="font-display text-[10px] tracking-[0.3em] text-white/25">
            FULL STACK DEVELOPER
          </div>
        </div>

        <div
          ref={scrollRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0"
        >
          <span className="font-display text-[8px] tracking-[0.4em] text-white/25 mb-2">
            SCROLL
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--accent-red)]/60 to-transparent" />
        </div>

        <div className="text-right">
          <div className="font-display text-[9px] tracking-[0.3em] text-white/15">
            NEXT.JS — R3F — GSAP
          </div>
        </div>
      </div>

      {/* ──── Side Telemetry Bars ──── */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-[5] hidden lg:flex flex-col items-center gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-[2px] transition-all duration-500"
            style={{
              height: `${12 + Math.sin(i * 0.8) * 8}px`,
              background:
                i < 3
                  ? "var(--accent-red)"
                  : `rgba(255,255,255,${0.05 + i * 0.02})`,
              boxShadow: i < 3 ? "0 0 6px rgba(225,6,0,0.3)" : "none",
            }}
          />
        ))}
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-[5] hidden lg:flex flex-col items-center gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-[2px] transition-all duration-500"
            style={{
              height: `${12 + Math.cos(i * 0.8) * 8}px`,
              background:
                i > 5
                  ? "var(--accent-red)"
                  : `rgba(255,255,255,${0.05 + i * 0.02})`,
              boxShadow: i > 5 ? "0 0 6px rgba(225,6,0,0.3)" : "none",
            }}
          />
        ))}
      </div>

      {/* ──── Scan Line ──── */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <div className="hero-scanline" />
      </div>
    </section>
  );
}
