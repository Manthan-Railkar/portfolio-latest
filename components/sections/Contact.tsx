"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef1 = useRef<HTMLHeadingElement>(null);
  const textRef2 = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sweeping typography reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        textRef1.current,
        { x: -100, opacity: 0, filter: "blur(10px)" },
        { x: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power4.out" }
      ).fromTo(
        textRef2.current,
        { x: 100, opacity: 0, filter: "blur(10px)" },
        { x: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power4.out" },
        "-=0.8"
      ).fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { label: "GITHUB", href: SITE_CONFIG.github, icon: "GH" },
    { label: "LINKEDIN", href: SITE_CONFIG.linkedin, icon: "LI" },
    { label: "TWITTER", href: SITE_CONFIG.twitter, icon: "TW" },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative section-padding overflow-hidden min-h-screen flex items-center bg-[#000]"
    >
      {/* Intense Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] opacity-20 pointer-events-none mix-blend-screen" style={{ background: "radial-gradient(ellipse, rgba(225,6,0,0.6), transparent 70%)" }} />

      <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-15 mix-blend-overlay pointer-events-none" />

      {/* Massive Background Typography */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none overflow-hidden w-full h-full flex flex-col justify-center">
        <div className="font-display text-[25vw] font-black leading-none text-white/[0.02] whitespace-nowrap -ml-[10vw]">
          START
        </div>
        <div className="font-display text-[25vw] font-black leading-none text-transparent whitespace-nowrap ml-[10vw]" style={{ WebkitTextStroke: "2px rgba(225,6,0,0.05)" }}>
          ENGINE
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 w-full text-center">
        {/* Section label */}
        <div className="font-display text-[10px] tracking-[0.5em] text-[var(--accent-red)] mb-8">
          // FINAL LAP
        </div>

        {/* Main heading */}
        <div className="relative mb-12">
          <h2 ref={textRef1} className="font-display text-4xl sm:text-5xl md:text-8xl lg:text-[8rem] font-black tracking-tighter leading-none text-white" style={{ textShadow: "0 0 40px rgba(255,255,255,0.2)" }}>
            LET&apos;S
          </h2>
          <h2 ref={textRef2} className="font-display text-4xl sm:text-5xl md:text-8xl lg:text-[8rem] font-black tracking-tighter leading-none text-transparent" style={{ WebkitTextStroke: "2px var(--accent-red)", filter: "drop-shadow(0 0 20px rgba(225,6,0,0.5))" }}>
            RACE
          </h2>
        </div>

        <div ref={contentRef}>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-light mb-10 md:mb-16 px-2">
            Ready to build something extraordinary? I&apos;m currently available for freelance opportunities and full-time roles in high-performance engineering teams.
          </p>

          {/* Email CTA */}
          <div className="mb-20">
            <motion.a
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-block relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Outer glowing border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-red)] to-transparent opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 rounded-lg" />
              
              <div className="relative flex items-center justify-center font-display text-xl sm:text-2xl md:text-4xl font-black tracking-widest px-8 sm:px-12 py-4 sm:py-6 bg-black border border-white/10 text-white overflow-hidden" style={{ textShadow: "0 0 20px rgba(255,255,255,0.5)" }}>
                {/* Diagonal sweep effect */}
                <div className="absolute inset-0 bg-white/5 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12" />
                
                <span className="relative z-10 group-hover:text-[var(--accent-red)] transition-colors duration-300">
                  IGNITE
                </span>
              </div>
            </motion.a>
            <div className="mt-6 font-display text-xs tracking-[0.3em] text-white/40">
              {SITE_CONFIG.email.toUpperCase()}
            </div>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-4 sm:px-6 py-2.5 sm:py-3 overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-sm"
              >
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--accent-red)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <span className="font-display text-[10px] tracking-[0.2em] text-white/50 group-hover:text-white transition-colors duration-300">
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
