"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { PROJECTS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

import GlassCard from "@/components/ui/GlassCard";
import MagneticButton from "@/components/ui/MagneticButton";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered 3D tilt reveal
      gsap.fromTo(
        cardRef.current,
        { y: 100, opacity: 0, rotateX: 20, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={cardRef}>
      <GlassCard className="group flex flex-col md:flex-row gap-6 md:gap-8 items-center rounded-2xl p-4 sm:p-6 md:p-8 mb-8 md:mb-12 hover:bg-white/[0.04] transition-colors duration-500">

      {/* Image Container with 3D Float */}
      <div className="w-full md:w-1/2 relative z-10">
        <motion.div
          className="relative aspect-video overflow-hidden rounded-xl border border-white/10"
          whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Futuristic Overlay Pattern */}
          <div className="absolute inset-0 z-20 pointer-events-none bg-[url('/images/noise.svg')] opacity-10 mix-blend-overlay" />
          <div className="absolute inset-0 z-20 pointer-events-none border-[rgba(255,255,255,0.05)] border-[1px] mix-blend-overlay" />
          
          <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] to-transparent z-10 opacity-60" />
          
          <div
            className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]"
            style={{
              background: `radial-gradient(circle at center, ${project.color}15 0%, #0a0a0a 100%)`,
            }}
          >
            <span className="font-display text-[8vw] md:text-[5vw] font-black text-white/5 tracking-tighter mix-blend-overlay">
              {project.id}
            </span>
          </div>

          {/* Corner nodes */}
          <div className="absolute top-2 left-2 w-1 h-1 bg-white/30 z-30" />
          <div className="absolute top-2 right-2 w-1 h-1 bg-white/30 z-30" />
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-white/30 z-30" />
          <div className="absolute bottom-2 right-2 w-1 h-1 bg-[var(--accent-red)] z-30 shadow-[0_0_10px_rgba(225,6,0,0.8)]" />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="w-full md:w-1/2 relative z-10">
        <div className="font-display text-4xl md:text-6xl font-black text-white/[0.03] absolute -top-8 -left-4 pointer-events-none select-none">
          {project.id}
        </div>
        
        <h3 className="font-display text-xl sm:text-3xl font-bold text-white mb-3 md:mb-4 group-hover:text-[var(--accent-red)] transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-6 md:mb-8">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-display tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <MagneticButton className="inline-flex items-center gap-4 text-xs font-display tracking-[0.3em] text-[var(--accent-red)] hover:text-white transition-colors duration-300">
          EXPLORE
          <span className="w-12 h-[1px] bg-[var(--accent-red)] relative">
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--accent-red)]" />
          </span>
        </MagneticButton>
      </div>
      </GlassCard>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0, x: -50 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative section-padding overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div ref={headerRef} className="mb-20 md:mb-32">
          <div className="font-display text-[10px] tracking-[0.5em] text-[var(--accent-red)] mb-4">
            // CHAPTER 03
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-7xl font-black tracking-wider leading-none">
            SELECTED <span className="text-[var(--accent-red)]">WORK</span>
          </h2>
        </div>

        <div className="flex flex-col">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[radial-gradient(ellipse,rgba(225,6,0,0.05)_0%,transparent_60%)] pointer-events-none z-0" />
    </section>
  );
}
